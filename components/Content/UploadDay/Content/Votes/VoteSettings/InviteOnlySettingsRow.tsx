import { useState } from 'react';

// redux
import { RootState } from '@/redux/store/rootReducer';
import { useSelector, useDispatch, createDispatchHook } from 'react-redux';

// <>
import VoteTypeMenu from '../VoteTypeMenu';
import BallotOptions from '../BallotOptions';
import { LinearGradient } from 'expo-linear-gradient';

import { Dimensions, TouchableOpacity, TextInput, Image, ScrollView, View, Text, StyleSheet } from 'react-native';
import { InfoIcon, GhostIcon, EyeIcon, TrashIcon, GolfLocationIcon } from '@/constants/Images';
import { grayphite } from '@/constants/Colors';
import { useContentFunction } from '@/Contexts/ContentFunctions';
import { specifyStringTruncate } from '@/utility/utilityValues';

interface props {
    day: any;
    inviteOnlyVoteUsers: any;
    setInviteOnlyVoteUsers: any;
    allUserProfileIcons: any;
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const InviteOnlySettingsRow: React.FC<props> = ({ day, inviteOnlyVoteUsers, setInviteOnlyVoteUsers, allUserProfileIcons }) => {
    // const { inviteOnlyUserList, setInviteOnlyUserList } = inviteOnlyUserListObj;

    const [showMore, setShowMore] = useState(false);
    const [userInputVal, setUserInputVal] = useState('');
    const [locationInputVal, setLocationInputVal] = useState('');
    // show followers that I follow
    const [allSearchFilter, setAllSearchFilter] = useState(true);
    const [iFollowSearchFilter, setIFollowSearchFilter] = useState(false);
    const [uFollowSearchFilter, setUFollowSearchFilter] = useState(false);
    const [showUsername, setShowUsername] = useState(Array.from({ length: inviteOnlyVoteUsers?.length }).fill(false));
    const [showLocation, setShowLocation] = useState(Array.from({ length: inviteOnlyVoteUsers?.length }).fill(false));

    const CURRENT_USER = useSelector((state: RootState) => state.currentUser.CURRENT_USER);

    const ALL_FOLLOWERS = useSelector((state: RootState) => state.app.ALL_FOLLOWERS);
    const ALL_BLOCKS = useSelector((state: RootState) => state.app.ALL_BLOCKS);

    const { returnProfileImg } = useContentFunction();
    // const { doWeBlockEachOther, returnProfileImg } = useContentFunction()

    // faded handUnderline underneath the users?

    const locationOnchange = (text: string) => {
        // const value: string = event?.target?.value
        setUserInputVal('');
        setLocationInputVal(text);
    };

    const test = async () => {
        console.log('uFollowSearchFilter', uFollowSearchFilter);
    };

    const testIndex = (user: any, index: any) => {
        console.log('index', index);

        const thesome = ALL_FOLLOWERS.some((f) => {
            console.log('f', f);
            return CURRENT_USER?.id === f?.user_id && user?.id === f?.follower_id;
        });
        console.log('thesome', thesome);
    };

    const inputOnChange = (text: string) => {
        // const value: string = event.target.value;
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
        const clone = [...inviteOnlyVoteUsers];
        console.log('clone', clone);

        const findUser = clone.find((cloneUsers) => cloneUsers?.username === user?.username);
        if (!findUser) {
            return;
        }
        console.log('findUser', findUser);
        findUser.isInvited = !findUser?.isInvited;
        console.log('clone after', clone);
        setInviteOnlyVoteUsers(clone);
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
        <View style={styles.settingsCont}>
            {
                // to show the container only when either input is filled out.
                (userInputVal?.length >= 1 || locationInputVal) && (
                    <View style={styles.columnCont}>
                        <View style={styles.columnCont}>{/* <p style={{ fontSize: '0.75rem' }} style={styles.settingsRowText}> {userInputVal} </p> */}</View>
                        {inviteOnlyVoteUsers?.map((user: any, index: number) => {
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

                            const isRelevantBoxChecked = inviteOnlyVoteUsers?.some((inviteUsers: any) => {
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
                                <View style={styles.columnCont}>
                                    <Image style={styles.profileIconMini} source={returnProfileImg(user?.id, allUserProfileIcons)} />
                                    {showLocation[index] === true ? (
                                        <View style={styles.uploadSettingsRow}>
                                            <View style={styles.slightSplitRow}>
                                                <Image style={styles.icons} source={GolfLocationIcon} />

                                                <TouchableOpacity onPress={(event: any) => showLocationClick(event, index)}>
                                                    <Text style={styles.settingsRowText}> {user?.location_text} </Text>
                                                </TouchableOpacity>
                                            </View>
                                            <Text style={styles.ghost}> y </Text>
                                        </View>
                                    ) : showUsername[index] === true ? (
                                        <TouchableOpacity onPress={(event: any) => showUsernameClick(event, index)}>
                                            <Text style={styles.settingsRowText}> {user?.username} </Text>
                                        </TouchableOpacity>
                                    ) : (
                                        <View style={styles.uploadSettingsRow}>
                                            <TouchableOpacity onPress={(event: any) => showUsernameClick(event, index)}>
                                                <Text style={styles.settingsRowText}> {specifyStringTruncate(user?.username, 5)} </Text>
                                            </TouchableOpacity>
                                            {user?.show_loc_in_comments === 'true' && (
                                                <View style={styles.slightSplitRow}>
                                                    <Image style={styles.icons} source={GolfLocationIcon} />

                                                    <TouchableOpacity onPress={(event: any) => showLocationClick(event, index)}>
                                                        <Text style={styles.settingsRowText}> {specifyStringTruncate(user?.location_text, 5)} </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            )}

                                            <Text style={styles.settingsRowText}> invited: </Text>
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
            <View style={styles.columnCont}>
                {!userInputVal?.length ? (
                    <Text style={styles.settingsRowText}> invite only: </Text>
                ) : (
                    <View>
                        <View style={styles.uploadSettingsRow}>
                            <Text style={styles.settingsRowText}> all </Text>

                            <TouchableOpacity style={[{ backgroundColor: allSearchFilter ? 'grey' : 'transparent' }, styles.button]} onPress={allSearchFilterCheckboxChange} />
                        </View>

                        <View style={styles.uploadSettingsRow}>
                            <Text style={styles.settingsRowText}> i follow </Text>

                            <TouchableOpacity
                                style={[{ backgroundColor: iFollowSearchFilter ? 'grey' : 'transparent' }, styles.button]}
                                onPress={iFollowSearchFilterCheckboxChange}
                            />
                        </View>

                        <View style={styles.uploadSettingsRow}>
                            <Text style={styles.settingsRowText}> u follow </Text>

                            <TouchableOpacity
                                style={[{ backgroundColor: uFollowSearchFilter ? 'grey' : 'transparent' }, styles.button]}
                                onPress={uFollowSearchFilterCheckboxChange}
                            />
                        </View>
                    </View>
                )}

                {/* <input style={styles.commentInput} onChange={inputOnChange} value={userInputVal} /> */}
            </View>

            {
                // showMore &&
                <View style={styles.uploadSettingsRowSubMini}>
                    <View style={styles.slightSplitRow}>
                        <Image style={styles.icons} source={GolfLocationIcon} />
                        <TextInput style={styles.input} onChangeText={(text: string) => locationOnchange(text)} value={locationInputVal} />
                    </View>

                    <View style={styles.slightSplitRow}>
                        <Image style={styles.icons} source={EyeIcon} />
                        <TextInput style={styles.input} onChangeText={(text: string) => inputOnChange(text)} value={userInputVal} />
                    </View>
                </View>
            }
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
        maxHeight: 30,
    },
    uploadSettingsRowSubMini: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        maxHeight: 15,
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
    profileIconMini: {
        height: 35,
        width: 35,
        borderRadius: 50,
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

    container: {
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
});

export default InviteOnlySettingsRow;
