// top level imports
import axios from 'axios';
import React, { useState, useEffect } from 'react';

// @reduxjs/toolkit:
import { RootState } from 'redux/store/rootReducer';
import { useSelector, useDispatch } from 'react-redux';

import { Dimensions, TouchableOpacity, Image, ScrollView, View, Text, StyleSheet } from 'react-native';

// utils:
import { submitUserPassCustomLocksByTableQueryStringFunc, updateUserProfileQueryStringFunc, updateUserPrivacyQueryStringFunc } from '@/graphql/queries';
import { grayphite } from '@/constants/Colors';

import {
    UserIcon,
    SettingsIcon,
    FollowerIcon,
    SendButtonIcon,
    HandUnderlineIcon1,
    AccountIcon,
    AnonymityMaskIcon,
    GreenForwardArrowIcon,
    RedBackArrowIcon,
    TrashIcon,
    BlockUserIcon,
} from '@/constants/Images';

import { useContentFunction } from 'Contexts/ContentFunctions';

interface props {
    currProfile: any;
    profileFollowers: any;
    setProfileFollowers: any;
    profileFollowedUsers: any;
    setProfileFollowedUsers: any;
    profileUsersBlocks: any;
    setProfileUsersBlocks: any;
    allUserProfileIcons: any;
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const ProfileFollowersList: React.FC<props> = ({
    currProfile,
    profileFollowers,
    setProfileFollowers,
    profileFollowedUsers,
    setProfileFollowedUsers,
    profileUsersBlocks,
    setProfileUsersBlocks,
    allUserProfileIcons,
}) => {
    const { returnProfileImg } = useContentFunction();

    const [showFollowers, setShowFollowers] = useState<boolean>(false);
    const [showFollowedUsers, setShowFollowedUsers] = useState<boolean>(false);
    const [showBlockedUsers, setShowBlockedUsers] = useState<boolean>(false);

    const showFollowersMenu = () => {
        setShowFollowers(!showFollowers);
        if (showFollowedUsers) setShowFollowedUsers(false);
        if (showBlockedUsers) setShowBlockedUsers(false);
    };

    const showFollowedUsersMenu = () => {
        setShowFollowedUsers(!showFollowedUsers);
        if (showBlockedUsers) setShowBlockedUsers(false);
        if (showFollowers) setShowFollowers(false);
    };

    const showBlockedUsersMenu = () => {
        setShowBlockedUsers(!showBlockedUsers);
        if (showFollowers) setShowFollowers(false);
        if (showFollowedUsers) setShowFollowedUsers(false);
    };

    const test = () => {
        console.log('showFollowers', showFollowers);
        console.log('profileFollowers', profileFollowers);
    };

    return (
        <View style={styles.settingsCont}>
            <TouchableOpacity onPress={test}></TouchableOpacity>

            {!showFollowedUsers && !showBlockedUsers && (
                <View style={styles.settingsRow}>
                    <View style={styles.slightSplitRow}>
                        <Text style={styles.settingsRowHeader}> Followers </Text>
                    </View>

                    <TouchableOpacity onPress={showFollowersMenu}>
                        <Text style={styles.settingsRowHeader}> &darr; </Text>
                    </TouchableOpacity>
                </View>
            )}

            {!showFollowers && !showBlockedUsers && (
                <View style={styles.settingsRow}>
                    <View style={styles.slightSplitRow}>
                        <Text style={styles.settingsRowHeader}> Followed Users </Text>
                    </View>

                    <TouchableOpacity onPress={showFollowedUsersMenu}>
                        <Text style={styles.settingsRowHeader}> &darr; </Text>
                    </TouchableOpacity>
                </View>
            )}

            {!showFollowers && !showFollowedUsers && (
                <View style={styles.settingsRow}>
                    <View style={styles.slightSplitRow}>
                        <Text style={styles.settingsRowHeader}> Blocked Users </Text>
                    </View>

                    <TouchableOpacity onPress={showBlockedUsersMenu}>
                        <Text style={styles.settingsRowHeader}> &darr; </Text>
                    </TouchableOpacity>
                </View>
            )}

            {showFollowers &&
                profileFollowers?.map((follower: any, index: number) => {
                    return (
                        <View style={styles.settingsRow}>
                            <Follower
                                key={index}
                                userId={currProfile?.user_id}
                                follower={follower}
                                followerOrFollowed={'follower'}
                                allUserProfileIcons={allUserProfileIcons}
                                setProfileFollowers={setProfileFollowers}
                                setProfileFollowedUsers={setProfileFollowedUsers}
                            />
                        </View>
                    );
                })}

            {showFollowedUsers &&
                profileFollowedUsers?.map((follower: any, index: number) => {
                    return (
                        <View style={styles.settingsRow}>
                            <Follower
                                key={index}
                                userId={currProfile?.user_id}
                                follower={follower}
                                followerOrFollowed={'followed'}
                                allUserProfileIcons={allUserProfileIcons}
                                setProfileFollowers={setProfileFollowers}
                                setProfileFollowedUsers={setProfileFollowedUsers}
                            />
                        </View>
                    );
                })}

            {}
        </View>
    );
};

interface FollowerProps {
    userId: number;
    follower: any;
    followerOrFollowed: string;
    allUserProfileIcons: any;
    setProfileFollowers: any;
    setProfileFollowedUsers: any;
}

const Follower: React.FC<FollowerProps> = ({ userId, follower, followerOrFollowed, allUserProfileIcons, setProfileFollowers, setProfileFollowedUsers }) => {
    const [preDelete, setPreDelete] = useState<boolean>(false);
    const { returnProfileImg, deleteFollower } = useContentFunction();

    const preDeleteToggler = () => {
        setPreDelete(!preDelete);
    };

    const deleteFollowerFunc = async () => {
        // they folow me. delete that they follow me:
        const followersAfterDeleting = await deleteFollower(userId, follower?.id);

        if (followerOrFollowed === 'followers') {
            setProfileFollowers(followersAfterDeleting);
        } else {
            setProfileFollowedUsers(followersAfterDeleting);
        }
    };

    return (
        <View style={styles.profileRow}>
            <Image style={[{ borderRadius: 50 }, styles.icon]} source={returnProfileImg(follower?.id, allUserProfileIcons)} />
            {!preDelete ? (
                <View style={styles.profileRow}>
                    <Text> {follower?.username} </Text>

                    <TouchableOpacity onPress={preDeleteToggler}>
                        <Image style={styles.icon} source={TrashIcon} />
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.profileRow}>
                    <TouchableOpacity onPress={preDeleteToggler}>
                        <Image style={styles.icon} source={RedBackArrowIcon} />
                    </TouchableOpacity>

                    {/* <TouchableOpacity onPress={preDeleteToggler}>
                            <Image style={styles.icon} source={BlockUserIcon} />
                        </TouchableOpacity> */}

                    <TouchableOpacity onPress={deleteFollowerFunc}>
                        <Image style={styles.icon} source={TrashIcon} />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

interface BlockedProps {
    userId: number;
    blockedUser: any;
    setProfileUserBlocks: any;
    allUserProfileIcons: any;
}

const BlockedUser: React.FC<BlockedProps> = ({ userId, blockedUser, setProfileUserBlocks, allUserProfileIcons }) => {
    const [preDelete, setPreDelete] = useState<boolean>(false);
    const { returnProfileImg, deleteBlockedUser } = useContentFunction();

    const preDeleteToggler = () => {
        setPreDelete(!preDelete);
    };

    const deleteBlockedUserFunc = async () => {
        // they folow me. delete that they follow me:
        const blockedUsersAfterDeleting = await deleteBlockedUser(userId, blockedUser?.id);
        setProfileUserBlocks(blockedUsersAfterDeleting);
    };

    return (
        <View style={styles.profileRow}>
            <Image style={[{ borderRadius: 50 }, styles.icon]} source={returnProfileImg(blockedUser?.id, allUserProfileIcons)} />
            {!preDelete ? (
                <View style={styles.profileRow}>
                    <Text> {blockedUser?.username} </Text>

                    <TouchableOpacity onPress={preDeleteToggler}>
                        <Image style={styles.icon} source={TrashIcon} />
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.profileRow}>
                    <TouchableOpacity onPress={preDeleteToggler}>
                        <Image style={styles.icon} source={RedBackArrowIcon} />
                    </TouchableOpacity>

                    {/* <TouchableOpacity onPress={preDeleteToggler}>
                            <Image style={styles.icon} source={BlockUserIcon} />
                        </TouchableOpacity> */}

                    <TouchableOpacity onPress={deleteBlockedUserFunc}>
                        <Image style={styles.icon} source={TrashIcon} />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    settingsCont: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: screenHeight * 0.8,
        width: screenWidth,
        // borderWidth: 2,
        // borderColor: grayphite,
        gap: 10,
        paddingVertical: 2.5,
        paddingHorizontal: 5,
    },
    columnCont: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 5,
        width: '100%',
    },
    settingsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: grayphite,
        borderStyle: 'dotted',
    },
    profileRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 5,
        paddingLeft: 5,
        paddingRight: 20,
        boxSizing: 'border-box',
        // borderBottomWidth: 1,
        // borderBottomColor: grayphite,
        // borderStyle: 'dotted',
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
    icon: {
        height: 35,
        width: 35,
    },
});

export default ProfileFollowersList;
