import axios from 'axios';
import { useState, useEffect } from 'react';

// redux
import { RootState } from '@/redux/store/rootReducer';
import { useSelector, useDispatch, createDispatchHook } from 'react-redux';
import { SET_CURRENT_USER, SET_CURRENT_USER_TOKEN, SET_CURRENT_USER_PRIVACY, SET_CURRENT_USER_MOST_RECENT_POST } from '@/redux/currentUser/currentUserSlice';

import { FlatList, Dimensions, Text, TouchableOpacity, Image, View, TextInput, StyleSheet } from 'react-native';
import { appBackground } from '@/constants/Colors';
import Day from '@/components/Content/Day/Day';
import NotificationList from '@/components/Content/UploadDay/Content/NotificationList';

import EditDay from '@/components/Content/EditDay/EditDay';

// utils:
import { grayphite } from '@/constants/Colors';
import { allDaysGETquery } from '@/graphql/queries';
import { useContentFunction } from '@/Contexts/ContentFunctions';
import { ShurikenIcon, FootprintIcon, PhoneWithScreenIcon, RedBackArrowIcon, GreenForwardArrowIcon } from '@/constants/Images';
import S3 from '@/utility/AWS/S3';
import getFOLDERfromS3 from '@/utility/AWS/old/DONTgetSHITfromS3';

interface props {
    feed: any;
    setFeed: any;
    allUserProfileIcons: any;
    setAllUserProfileIcons: any;
    searchPostsInputVal: any;
    searchItems: any;
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const TheFeed: React.FC<props> = ({ feed, setFeed, allUserProfileIcons, setAllUserProfileIcons, searchPostsInputVal, searchItems }) => {
    const dispatch = useDispatch();

    const CURRENT_USER = useSelector((state: RootState) => state.currentUser.CURRENT_USER);
    const [preLogout, setPreLogout] = useState<boolean>(false);

    const { returnProfileImg, logout, visitProfile } = useContentFunction();
    const data = searchPostsInputVal ? searchItems : feed?.filter((day: any) => day?.id);

    const renderItem = ({ item, index }: { item: any; index: number }) => {
        // user results vs day results
        if (!item?.user_id) {
            return (
                <UserRow
                    key={`userRow${index}`}
                    username={item?.username}
                    userProfileIcon={item?.user_profile_icon}
                    userId={item?.id}
                    allUserProfileIcons={allUserProfileIcons}
                />
            );
        }

        return <Day key={`day-${index}`} day={item} feed={feed} setFeed={setFeed} allUserProfileIcons={allUserProfileIcons} setAllUserProfileIcons={setAllUserProfileIcons} />;
    };

    return (
        <View style={styles.feedContainer}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => String(item?.id ?? `idx-${index}`)}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                // allow inner ballot scroll when MediaVoteRows uses a ScrollView
                nestedScrollEnabled
                ListEmptyComponent={
                    <View style={styles.emptyCont}>
                        <Text style={styles.text}>{searchPostsInputVal ? 'No matching posts or users.' : 'No posts yet.'}</Text>
                    </View>
                }
                // Optional perf tuning for media-heavy feeds:
                removeClippedSubviews
                initialNumToRender={4}
                maxToRenderPerBatch={6}
                windowSize={8}
            />
        </View>
    );
};

interface UserRowProps {
    username: string;
    userProfileIcon: any;
    userId: number;
    allUserProfileIcons: any;
}

const UserRow: React.FC<UserRowProps> = ({ username, userProfileIcon, userId, allUserProfileIcons }) => {
    const { visitProfile, returnProfileImg } = useContentFunction();

    return (
        <TouchableOpacity onPress={() => visitProfile(userId)} style={styles.userRow}>
            <Image source={returnProfileImg(userId, allUserProfileIcons)} style={styles.userIcon} />
            <Text style={styles.text}> {username} </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    feedContainer: {
        flex: 1,
        backgroundColor: appBackground,
    },
    listContent: {
        paddingVertical: 10,
        alignItems: 'center',
        // if your RN version doesn't support `gap`, swap for marginBottom on item wrappers
        gap: 25,
    },
    emptyCont: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 200,
    },

    scrollView: {
        flex: 1, // Ensures the ScrollView takes full available height
        backgroundColor: appBackground,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
        padding: 0,
        gap: 25,
        width: '100%',
    },
    userRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 5,

        // borderBottomColor: 'green',
        // borderBottomWidth: 5
    },
    userIcon: {
        height: 35,
        width: 35,
        borderRadius: 50,
    },
    text: {
        fontFamily: 'Fuzzy Bubbles',
        fontSize: 16,
        color: grayphite,
    },
});

export default TheFeed;

//     return (
//         <View style={styles.scrollView}>
//             {searchPostsInputVal
//                 ? // <p> currently searching </p>

//                   searchItems?.map((content: any, index: number) => {
//                       return (
//                           // have to distinct user from day. probably with one of the non-nullable day values like comments_ok
//                           content?.user_id ? (
//                               <UserRow
//                                   key={`userRow${index}`}
//                                   username={content?.username}
//                                   userProfileIcon={content?.user_profile_icon}
//                                   userId={content?.id}
//                                   allUserProfileIcons={allUserProfileIcons}
//                               />
//                           ) : (
//                               <Day
//                                   key={`content${index}`}
//                                   day={content}
//                                   feed={feed}
//                                   setFeed={setFeed}
//                                   allUserProfileIcons={allUserProfileIcons}
//                                   setAllUserProfileIcons={setAllUserProfileIcons}
//                               />
//                           )
//                           // <Text> {content?.username} </Text>
//                       );
//                   })
//                 : Array.isArray(feed) &&
//                   feed?.some((day: any) => day?.id) &&
//                   feed?.map((content: any, index: number) => {
//                       return (
//                           // user bar based on index / 30
//                           content?.user_id && (
//                               <Day
//                                   key={`content${index}`}
//                                   day={content}
//                                   feed={feed}
//                                   setFeed={setFeed}
//                                   allUserProfileIcons={allUserProfileIcons}
//                                   setAllUserProfileIcons={setAllUserProfileIcons}
//                               />
//                           )
//                       );
//                   })}
//         </View>
//     );
// };
