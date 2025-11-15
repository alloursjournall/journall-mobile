import axios from 'axios';
import { useState, useEffect } from 'react';

// redux
import { RootState } from '@/redux/store/rootReducer';
import { useSelector, useDispatch, createDispatchHook } from 'react-redux';
import { SET_CURR_PROFILE, SET_PROFILE_USER_PRIVACY } from '@/redux/profile/profileSlice';

import { Platform, Dimensions, TouchableOpacity, Image, ScrollView, View, Text, StyleSheet } from 'react-native';
import Video from 'react-native-video';
import ReactPlayer from 'react-player/lazy';

// utils:
import { deleteNotificationQueryStringFunc } from '@/graphql/queries';
import { grayphite, grayfight } from '@/constants/Colors';
import { EyeIcon, TrashIcon, RedBackArrowIcon, GreenForwardArrowIcon } from '@/constants/Images';
import { useContentFunction } from '@/Contexts/ContentFunctions';
import { getToday } from '@/utility/utilityValues';
import { ConfigurationSetAlreadyExistsException } from '@aws-sdk/client-ses';

interface props {
    setClickedNotificationContent: any;
    allUserProfileIcons: any;
    showNotifications: boolean;
    setShowNotifications: any;
    feed: any;
    event: any;
    // day: any,
}

const NotificationList: React.FC<props> = ({
    setClickedNotificationContent,
    allUserProfileIcons,
    showNotifications,
    setShowNotifications,
    feed,
    // day,
    event,
}) => {
    // const dispatch = useDispatch()

    const CURRENT_USER = useSelector((state: RootState) => state.currentUser.CURRENT_USER);

    const { addFollower } = useContentFunction();

    const SHOW_NOTIFICATIONS = useSelector((state: RootState) => state.app.SHOW_NOTIFICATIONS);
    // const ALL_MY_NOTIFICATIONS = useSelector((state: RootState) => state.app.ALL_MY_NOTIFICATIONS)
    const [allMyNotifications, setAllMyNotifications] = useState<any>(null);
    const ALL_USERS_ICONS = useSelector((state: RootState) => state.app.ALL_USERS_ICONS);

    const { returnProfileImg, notificationMaker } = useContentFunction();

    const test = () => {};

    const testItem = (mapitem: any) => {
        console.log('mapitem', mapitem);
    };

    // 🚨 🚨 "updated vote" from your friend ${note.username}
    const doesUserFollowMe = () => {
        return;
    };

    const seeRelevantContent = (note: any) => {
        console.log('note', note);
        const dayOrEvent = note?.day_id ? 'day' : note?.event_id ? 'event' : '';
        if (!dayOrEvent) {
            return;
        }

        if (dayOrEvent === 'day') {
            console.log(note?.day_id);

            // day will not be known!!  grab it from the feed if needed!
            const mapitemId = note?.day_id;
            const foundFeedItem = feed?.today?.find((item: any) => item?.id === mapitemId);
            if (foundFeedItem?.id) {
                setClickedNotificationContent(foundFeedItem);
            } else {
                // query GraphQL for the post.. if no post say can't find sorry (maybe it was deleted)
            }
        } else if (dayOrEvent === 'event') {
            console.log(note?.event_id);
        } else {
            return;
        }
    };

    const deleteNotification = async (note: any) => {
        console.log('note', note);
        const query = deleteNotificationQueryStringFunc(note?.id, CURRENT_USER?.id);
        console.log('query', query);
        const predata: any = await axios.post('http://localhost:4000/api/graphql', { query: query });
        console.log('predata', predata);
        if (!predata) {
            return null;
        }
        const data = predata?.data?.data?.deleteNotification;
        if (!data) {
            return null;
        }

        const unstringedData = data?.map((d: any) => {
            const unstringJson = JSON.parse(d?.notification_json_string);
            return { id: d?.id, ...unstringJson };
        });
        setAllMyNotifications(unstringedData);
        //   dispatch(SET_ALL_MY_NOTIFICATIONS(unstringedData))
    };

    const rejectFollower = async (note: any) => {
        await deleteNotification(note);
    };

    const addFollowerFromNotifications = async (note: any) => {
        const newFollower = await addFollower(CURRENT_USER?.id, note?.from_user_id);
        if (!newFollower) {
            return;
        }

        const date = getToday('en')?.date;

        const noteObj = {
            date: date,
            from_user_id: CURRENT_USER?.id,
            from_username: CURRENT_USER?.username || null,
            for_user_id: CURRENT_USER?.id || null,
            from_app: false,
            day_id: note?.day_id,
            day_icon: note?.day_icon || null,
            thought_id: null,
            moment_id: null,
            field_id: null,
            invite_id: null,
            listener_id: null,
            share_Id: null,
            like_id: null,
            star_id: null,
            reaction_id: null,
            vibe_id: null,
            payment_id: null,
            prank_id: null,
            feedgame_id: null,
            message_id: null,
            report_id: null,
            user_pass_lock_id: null,
            user_allowed_to_unlock_id: null,
            ballot_id: null,
            custom_notification: null,
            is_read: false,
            is_request: false,
            type: 'comment',
        };

        const stringedNotification = JSON.stringify(noteObj);
        const notes = await notificationMaker(CURRENT_USER?.id, stringedNotification);
        await deleteNotification(note);
        console.log('notes', notes);
    };

    return (
        <View style={styles.notificationListCont}>
            {Array.isArray(allMyNotifications) &&
                allMyNotifications?.length >= 1 &&
                allMyNotifications?.map((note, index) => {
                    return (
                        <View style={styles.notificationBox}>
                            <View style={styles.slightSplitRow}>
                                <Text style={styles.notificationText}> {note?.date} </Text>

                                <TouchableOpacity onPress={() => testItem(note)}>
                                    <Text style={styles.notificationText}> {note?.type} </Text>
                                </TouchableOpacity>
                                {/*  does userId follow me ?  */}

                                {/* <ParentContent note={note} feed={feed} setClickedNotificationContent={setClickedNotificationContent} /> */}
                            </View>

                            <View style={styles.slightSplitRow}>
                                <Image style={styles.profileImg} source={{ uri: returnProfileImg(note?.from_user_id, allUserProfileIcons) }} />

                                <TouchableOpacity onPress={() => testItem(note)}>
                                    <Text style={styles.notificationText}> {note?.from_username} </Text>
                                </TouchableOpacity>
                                {/* user is verified. */}
                            </View>

                            {/*   mark as seen!  */}

                            {note?.type === 'friend request' ? (
                                <View style={styles.deleteOrSeeCont}>
                                    <TouchableOpacity onPress={() => rejectFollower(note)}>
                                        <Image style={styles.iconMini} source={GreenForwardArrowIcon} />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => addFollowerFromNotifications(note)}>
                                        <Image style={styles.iconMini} source={GreenForwardArrowIcon} />
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <View style={styles.deleteOrSeeCont}>
                                    <TouchableOpacity onPress={() => deleteNotification(note)}>
                                        <Image style={styles.iconMini} source={TrashIcon} />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => seeRelevantContent(note)}>
                                        <Image style={[{ opacity: note?.is_read ? 1.0 : 0.5 }, styles.iconMini]} source={EyeIcon} />
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    );
                })}
        </View>
    );
};

interface ParentContentProps {
    note: any;
    setClickedNotificationContent: any;
    feed: any;
}

const ParentContent: React.FC<ParentContentProps> = ({ note, setClickedNotificationContent, feed }) => {
    const dispatch = useDispatch();
    const { blobbifyAndReturnPosts, addFollower } = useContentFunction();

    const testItem = (mapitem: any) => {
        console.log('mapitem', mapitem);
    };

    const selectContent = async (mapitem: any) => {
        console.log('mapitem', mapitem);
        console.log('feed', feed);

        // 🚨 🚨 find out whether it's feed.today or feed.month take that as <NotificationList feedKey="today"/>

        const mapitemId = mapitem?.day_id;
        const foundFeedItem = feed?.today?.find((item: any) => item?.id === mapitemId);
        if (foundFeedItem?.id) {
            const preparedFeedItem = await blobbifyAndReturnPosts(foundFeedItem);
            setClickedNotificationContent(preparedFeedItem);
        } else {
            // query GraphQL for the post.. if no post say can't find sorry (maybe it was deleted)
        }
        console.log('foundFeedItem', foundFeedItem);

        // if not find the content!
        // const foundFeedItem = feed[feedKey]

        // day | event?
        // retrieve posts from day?.id from feed

        // setClickedNotificationContent()
    };

    return (
        <View>
            {/* 🚨 note?.day_title // denormalize day title, vote title, event title! */}
            {/* 🚨 possibly get the day_icon and show that instead! */}
            <TouchableOpacity onPress={() => selectContent(note)}>
                <Text style={styles.notificationText}> {note?.day_id} </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    notificationListCont: {},
    notificationBox: {
        width: '100%',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: grayphite,
        borderStyle: 'dotted',
    },
    notificationText: {
        fontFamily: 'Fuzzy Bubbles',
        color: grayphite,
        fontSize: 14,
        fontWeight: 400,
    },
    slightSplitRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    profileImg: {
        height: 50,
        width: 50,
        borderRadius: 50,
    },
    deleteOrSeeCont: {
        width: '20%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 0,
        paddingHorizontal: 5,
    },
    iconMini: {
        height: 35,
        width: 35,
    },
});

export default NotificationList;
