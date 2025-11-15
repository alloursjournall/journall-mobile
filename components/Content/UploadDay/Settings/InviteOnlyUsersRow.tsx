import { useState, useEffect, useRef, cloneElement } from 'react';

// redux
import { RootState } from '@/redux/store/rootReducer';
import { useSelector, useDispatch } from 'react-redux';

import { Dimensions, TouchableOpacity, TextInput, Image, ScrollView, View, Text, StyleSheet } from 'react-native';
import ModularMultiOptionRow from './ModularMultiOptionRow';
import ErrorSlippedUpBanana from '@/components/ErrorSlippedUpBanana';

import { specifyStringTruncate } from '@/utility/utilityValues';
import { useContentFunction } from '@/Contexts/ContentFunctions';
import { GolfLocationIcon, EyeIcon } from '@/constants/Images';

// const { commenterCanDetermineIcon, iconSound, iconSoundWave, masquerade, commentThoughtBg, padlock, unlock } = useImage();

import { grayphite } from '@/constants/Colors';

interface props {
    day: any;
    setDay: any;
    inviteOnlyUserList: any;
    setInviteOnlyUserList: any;
    allUserProfileIcons: any;
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const InviteOnlyUsersRow: React.FC<props> = ({ day, setDay, inviteOnlyUserList, setInviteOnlyUserList, allUserProfileIcons }) => {
    // const { inviteOnlyUserList, setInviteOnlyUserList } = inviteOnlyUserListObj;

    const [showMore, setShowMore] = useState(false);
    const [userInputVal, setUserInputVal] = useState('');
    const [locationInputVal, setLocationInputVal] = useState('');
    // show followers that I follow
    const [allSearchFilter, setAllSearchFilter] = useState(true);
    const [iFollowSearchFilter, setIFollowSearchFilter] = useState(false);
    const [uFollowSearchFilter, setUFollowSearchFilter] = useState(false);
    const [showUsername, setShowUsername] = useState(Array.from({ length: inviteOnlyUserList?.length }).fill(false));
    const [showLocation, setShowLocation] = useState(Array.from({ length: inviteOnlyUserList?.length }).fill(false));

    const CURRENT_USER = useSelector((state: RootState) => state.currentUser.CURRENT_USER);

    const ALL_USERS = useSelector((state: RootState) => state.app.ALL_USERS);
    const ALL_FOLLOWERS = useSelector((state: RootState) => state.app.ALL_FOLLOWERS);
    const ALL_BLOCKS = useSelector((state: RootState) => state.app.ALL_BLOCKS);

    const { returnProfileImg } = useContentFunction();

    // faded handUnderline underneath the users?

    const locationOnchange = (text: string) => {
        if (text === 'nigger') {
            setLocationInputVal('');
        } else {
            setUserInputVal('');
            setLocationInputVal(text);
        }
    };

    const test = async () => {};

    const testIndex = (user: any, index: any) => {
        const thesome = ALL_FOLLOWERS?.some((f) => {
            console.log('f', f);
            return CURRENT_USER?.id === f?.user_id && user?.id === f?.follower_id;
        });
    };

    const inputOnChange = (text: string) => {
        if (!text) {
            setShowMore(false);
        } else {
            if (showMore === false) {
                setShowMore(true);
            }
        }
        setUserInputVal(text);
    };

    const allSearchFilterCheckboxChange = () => {
        if (iFollowSearchFilter === true) setIFollowSearchFilter(false);
        if (uFollowSearchFilter === true) setUFollowSearchFilter(false);
        setAllSearchFilter(!allSearchFilter);
    };

    const iFollowSearchFilterCheckboxChange = () => {
        if (allSearchFilter === true && iFollowSearchFilter === false) setAllSearchFilter(false);
        setIFollowSearchFilter(!iFollowSearchFilter);
    };

    const uFollowSearchFilterCheckboxChange = () => {
        if (allSearchFilter === true && uFollowSearchFilter === false) setAllSearchFilter(false);
        setUFollowSearchFilter(!uFollowSearchFilter);
    };

    const inviteUserCheckboxChange = (user: any, index: any) => {
        const clone = [...inviteOnlyUserList];
        console.log('clone', clone);

        const findUser = clone.find((cloneUsers) => cloneUsers?.username === user?.username);
        if (!findUser) {
            return;
        }
        console.log('findUser', findUser);
        findUser.isInvited = !findUser?.isInvited;
        console.log('clone after', clone);
        setInviteOnlyUserList(clone);
    };

    const showUsernameClick = (event: any, index: number) => {
        const clone = [...showUsername];
        if (clone.includes(true)) {
            clone.fill(false);
        } else {
            clone[index] = !clone[index];
        }
        setShowUsername(clone);
    };

    // could modularize but single responsibility.
    const showLocationClick = (event: any, index: number) => {
        console.log('index', index);
        const clone = [...showLocation];
        console.log('clone', clone);
        if (clone.includes(true)) {
            clone.fill(false);
        } else {
            clone[index] = !clone[index];
        }
        setShowLocation(clone);
    };

    return (
        <View style={styles.columnCont}>
            {
                // to show the View only when either input is filled out.
                (userInputVal?.length >= 1 || locationInputVal) && (
                    <View style={styles.uploadSettingsRow}>
                        <View style={styles.uploadSettingsRow}></View>
                        {inviteOnlyUserList?.map((user: any, index: number) => {
                            console.log('user', user);
                            const doesEitherSideBlock = ALL_BLOCKS?.some(
                                (block) =>
                                    (block?.user_id === CURRENT_USER?.id && block?.blocked_id === user?.id) ||
                                    (block?.user_id === user?.id && block?.blocked_id === CURRENT_USER?.id),
                            );
                            const doesCurrentUserBlock = ALL_BLOCKS?.some(
                                (block) =>
                                    (block?.user_id === day?.user_id && block?.blocked_id === user?.id) || (block?.user_id === user?.id && block?.blocked_id === day?.user_id),
                            );
                            // lmao no currentUser in uploadDay ehh well during upload yeah there would be one

                            const isRelevantBoxChecked = inviteOnlyUserList?.some((inviteUsers: any) => {
                                return inviteUsers?.isInvited === true && inviteUsers?.username === user?.username;
                            });

                            const uFollowMeFilter = ALL_FOLLOWERS.some((f) => {
                                console.log('f', f);
                                return CURRENT_USER?.id === f?.user_id && user?.id === f?.follower_id;
                            });
                            const iFollowUFilter = ALL_FOLLOWERS.some((f) => {
                                console.log('f', f);
                                return CURRENT_USER?.id === f?.follower_id && user?.id === f?.user_id;
                            });

                            // const uFollowMe = ALL_FOLLOWERS.some(followers => followers?.user_id === CURRENT_USER?.id && followers?.follower_id === user?.id)
                            // const isRelevantBoxChecked = inviteOnlyUserList.some(inviteUsers => inviteUsers?.isInvited && inviteUsers?.username === user?.username )

                            // console.log('user', user)
                            return (allSearchFilter || (uFollowSearchFilter === true && uFollowMeFilter) || (iFollowSearchFilter === true && iFollowUFilter)) &&
                                !doesEitherSideBlock &&
                                day?.id &&
                                !doesCurrentUserBlock &&
                                (userInputVal?.length === 1 ||
                                    (userInputVal?.length >= 2 && user?.username?.toLowerCase().includes(userInputVal.toLowerCase())) ||
                                    (locationInputVal?.length && user?.location_text?.toLowerCase().includes(locationInputVal.toLowerCase()))) ? (
                                // (userInputVal?.length === 1 ||
                                //     userInputVal?.length >= 2 && user?.username?.toLowerCase().includes(userInputVal.toLowerCase()) ||
                                //     (locationInputVal && user?.location_text?.toLowerCase().includes(locationInputVal.toLowerCase()))
                                // )

                                // userInputVal?.length >= 2 && user?.username?.toLowerCase().includes(userInputVal.toLowerCase())) &&
                                // doWeBlockEachOther(CURRENT_USER?.id, user?.id, ALL_BLOCKS) === false &&
                                <View style={styles.uploadSettingsRow}>
                                    {showLocation[index] === true ? (
                                        <View style={styles.uploadSettingsRow}>
                                            <View style={styles.slightSplitRow}>
                                                <Image style={styles.icons} source={GolfLocationIcon} />

                                                <TouchableOpacity onPress={(event) => showLocationClick(event, index)}>
                                                    <Text style={styles.settingsRowText}> {user?.location_text} </Text>
                                                </TouchableOpacity>
                                            </View>

                                            <Text style={styles.ghost}> y </Text>
                                        </View>
                                    ) : showUsername[index] === true ? (
                                        <TouchableOpacity onPress={(event) => showUsernameClick(event, index)}>
                                            <Text style={styles.settingsRowText}> {user?.username} </Text>
                                        </TouchableOpacity>
                                    ) : (
                                        <View style={styles.slightSplitRow}>
                                            <Text style={styles.settingsRowText}> {specifyStringTruncate(user?.username, 5)} </Text>

                                            {user?.show_loc_in_comments === 'true' && (
                                                <View style={styles.slightSplitRow}>
                                                    <Image style={styles.icons} source={GolfLocationIcon} />

                                                    <TouchableOpacity onPress={(event: any) => showLocationClick(event, index)}>
                                                        <Text style={styles.settingsRowText}> {specifyStringTruncate(user?.location_text, 5)} </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            )}

                                            <View style={styles.View}>
                                                <Text style={styles.settingsRowText}> invited: </Text>
                                            </View>
                                        </View>
                                    )}
                                </View>
                            ) : (
                                <View> </View>
                            );
                        })}
                    </View>
                )
            }
            <View style={styles.uploadSettingsRow}>
                <View style={styles.slightSplitRow}>
                    <View style={styles.View}>
                        <Text style={styles.settingsRowText}> all </Text>
                        <View style={styles.View}>
                            <TouchableOpacity style={[{ backgroundColor: allSearchFilter ? 'grey' : 'transparent' }, styles.button]} onPress={allSearchFilterCheckboxChange} />
                        </View>
                    </View>

                    <View style={styles.View}>
                        <Text style={styles.settingsRowText}> i follow </Text>
                        <View style={styles.View}>
                            <TouchableOpacity
                                style={[{ backgroundColor: iFollowSearchFilter ? 'grey' : 'transparent' }, styles.button]}
                                onPress={iFollowSearchFilterCheckboxChange}
                            />
                        </View>
                    </View>

                    <View style={styles.View}>
                        <Text style={styles.settingsRowText}> u follow </Text>
                        <View style={styles.View}>
                            <TouchableOpacity
                                style={[{ backgroundColor: uFollowSearchFilter ? 'grey' : 'transparent' }, styles.button]}
                                onPress={uFollowSearchFilterCheckboxChange}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    settingsCont: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10,
    },

    columnCont: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 5,
    },
    uploadSettingsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    slightSplitRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    settingsRowHeader: {
        fontFamily: 'Fuzzy Bubbles',
        color: grayphite,
        fontSize: 18,
    },
    settingsRowText: {
        fontFamily: 'Fuzzy Bubbles',
        color: grayphite,
        fontSize: 14,
    },
    icons: {
        height: 35,
        width: 35,
    },
    iconMini: {
        height: 20,
        width: 20,
    },
    button: {
        height: 20,
        width: 20,
        borderWidth: 2,
        borderColor: grayphite,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 8,
        //    borderTopLeftRadius: 0,
        borderTopRightRadius: 3,
    },
    input: {
        width: 24, // equivalent of 1.5rem (assuming 1rem = 16px)
        margin: 0,
        alignSelf: 'center',
        borderRadius: 50, // makes it circular
        borderTopLeftRadius: 14.5,
        borderTopRightRadius: 65.5,
        borderBottomLeftRadius: 122.5,
        borderBottomRightRadius: 30,
        color: '#444', // equivalent of $grayphite
        fontFamily: 'fuzzy', // make sure the font is linked properly
        fontSize: 10, // or adjust based on design
        borderWidth: 1.5,
        borderColor: '#44454fea', // border color
    },
    ghost: {
        opacity: 0,
    },
    ballotOptionsMedia: {
        height: screenHeight / 10,
        width: screenHeight / 10,
    },

    View: {
        gap: 5,
        // padding: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    centerCont: {
        flex: 1, // Allow this to take remaining space
        height: screenHeight * 0.325,
        width: '100%',
        justifyContent: 'center', // Center the content vertically
        alignItems: 'center',
    },
    addCommentPlusInput: {
        height: 20,
        width: 20,
        borderTopLeftRadius: 14,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: -1,
        borderBottomRightRadius: 11,
        borderWidth: 2,
        borderColor: grayphite,
    },
    addCommentInputText: {
        fontSize: 16,
        fontWeight: 500,
        fontFamily: 'Fuzzy Bubbles',
        color: grayphite,
    },
});

export default InviteOnlyUsersRow;
