// top level imports
import axios from 'axios';
import React, { useState, useEffect } from 'react';

// @reduxjs/toolkit:
import { RootState } from 'redux/store/rootReducer';
import { useSelector, useDispatch } from 'react-redux';

import { Dimensions, TouchableOpacity, Image, ScrollView, View, Text, StyleSheet } from 'react-native';

// utils:
import { RedBackArrowIcon } from '@/constants/Images';
import { useContentFunction } from 'Contexts/ContentFunctions';
import { grayphite } from '@/constants/Colors';

interface props {
    currProfile: any;
    profileUserContentBucket: any;
    usersFollowingProfileUserCount: any;
    usersThatProfileUserFollowsCount: any;
    allPostsLength: any;
    showProfile: any;
    profileFollowers: any;
    setProfileFollowers: any;
    profileFollowedUsers: any;
    blocked: any;
}

const DataRowFollowUsers: React.FC<props> = ({
    currProfile,
    profileUserContentBucket,
    usersFollowingProfileUserCount,
    usersThatProfileUserFollowsCount,
    allPostsLength,
    showProfile,
    profileFollowers,
    setProfileFollowers,
    profileFollowedUsers,
    blocked,
}) => {
    const CURRENT_USER = useSelector((state: RootState) => state.currentUser.CURRENT_USER);

    const CURR_PROFILE = useSelector((state: RootState) => state.profile.CURR_PROFILE);
    const PROFILE_USER_CONTENT_BUCKET = useSelector((state: RootState) => state.profile.PROFILE_USER_CONTENT_BUCKET);
    const DATA_ROW_CLICKED = useSelector((state: RootState) => state.profile.DATA_ROW_CLICKED);
    const USERS_FOLLOWING_PROFILE_USER_COUNT = useSelector((state: RootState) => state.profile.USERS_FOLLOWING_PROFILE_USER_COUNT);
    const USERS_THAT_PROFILE_USER_FOLLOWS_COUNT = useSelector((state: RootState) => state.profile.USERS_THAT_PROFILE_USER_FOLLOWS_COUNT);

    const { addFollower, deleteFollower } = useContentFunction();

    const [doesCurrentUserFollowProfileUser, setDoesCurrentUserFollowProfileUser] = useState(profileFollowers?.some((f: any) => f?.follower_id === CURRENT_USER?.id));

    const [currentlyShowing, setCurrentlyShowing] = useState(0);

    const currentlyShowingToggle = () => {
        if (currentlyShowing === 3) {
            setCurrentlyShowing(0);
        } else {
            const nextNum = currentlyShowing + 1;
            setCurrentlyShowing(nextNum);
        }
    };

    const test = () => {
        console.log('profileFollowers', profileFollowers);
        // console.log(doesCurrentUserFollowProfileUser)
    };

    const addFollowerFunc = () => {
        const newFollower = addFollower(currProfile?.user_id, CURRENT_USER?.id);
        console.log('newFollower', newFollower);
        if (newFollower) {
            console.log('nothin brodie');
            return;
        }

        const setProfileFollowersFunc = () => {
            let profileFollowersClone = [...profileFollowers];
            profileFollowersClone.push(newFollower);
            setProfileFollowers(profileFollowersClone);
            return profileFollowersClone;
        };

        const profileFollowersArray = setProfileFollowersFunc();
        if (profileFollowersArray?.some((f: any) => f?.follower_id === CURRENT_USER?.id)) {
            setDoesCurrentUserFollowProfileUser(true);
        }
    };

    const FollowUnFollowButton = () => {
        const doesCurrentUserFollowProfileUser = profileFollowers?.some((f: any) => f?.follower_id === CURRENT_USER?.id);

        return blocked ? (
            <View style={styles.addCommentPlusInput}>
                <Text style={[styles.addCommentInputText, { backgroundColor: '#EF4444' }]}> X </Text>
            </View>
        ) : doesCurrentUserFollowProfileUser ? (
            <View style={[styles.dataRowBottomToolBar, { gap: 25 }]}>
                <TouchableOpacity onPress={test}>
                    <Text> unfollow </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={test}>
                    <Text> block </Text>
                </TouchableOpacity>
            </View>
        ) : (
            <View style={[styles.dataRowBottomToolBar, { gap: 25 }]}>
                <TouchableOpacity onPress={addFollowerFunc}>
                    <Text> follow </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={test}>
                    <Text> block </Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.dataRowBottomToolBar}>
            {currentlyShowing < 1 ? (
                <FollowUnFollowButton />
            ) : (
                currentlyShowing >= 1 && (
                    <Text style={[styles.profilePicAndDataText]}>
                        {
                            // 3, 4, 5 at this spot. 1, 2 is follow or block!
                            showProfile &&
                                !blocked &&
                                (currentlyShowing === 1
                                    ? allPostsLength === 1
                                        ? `${allPostsLength} entry`
                                        : `${allPostsLength} entries`
                                    : currentlyShowing === 2
                                    ? `${usersFollowingProfileUserCount} followers`
                                    : currentlyShowing === 3 && `${usersThatProfileUserFollowsCount} followed`)
                        }
                    </Text> //
                )
            )}

            <TouchableOpacity onPress={currentlyShowingToggle}>
                <Text style={[styles.profilePicAndDataText, { fontSize: 50 }]}> &rarr; </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    dataRowBottomToolBar: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    profilePicAndDataText: {
        fontFamily: 'Nunito Sans',
        fontSize: 20,
        color: grayphite,
    },
    bottomToolBarRightCont: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },
    iconBig: {
        height: 85,
        width: 85,
    },
    addCommentPlusInput: {
        height: 30,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 14,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: -1,
        borderBottomRightRadius: 11,
        borderWidth: 2,
        borderColor: grayphite,
        // backgroundColor: appBackground,
    },
    addCommentInputText: {
        fontSize: 20,
        fontWeight: '500',
        fontFamily: 'Fuzzy Bubbles',
        color: grayphite,
    },
});

export default DataRowFollowUsers;
