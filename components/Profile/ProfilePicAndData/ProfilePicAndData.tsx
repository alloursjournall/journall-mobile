// top level imports
// top level s
import axios from 'axios';
import React, { useState, useEffect } from 'react';

// @reduxjs/toolkit:
import { RootState } from 'redux/store/rootReducer';
import { useSelector, useDispatch } from 'react-redux';

import { Dimensions, TouchableOpacity, Image, ScrollView, View, Text, StyleSheet } from 'react-native';
import DataRow from './DataRow/DataRow';

// utils:
import { grayphite } from '@/constants/Colors';
import { JournallIcon, HeartIcon, UserIcon, AnonymityMaskIcon } from '@/constants/Images';
import { useContentFunction } from 'Contexts/ContentFunctions';

interface props {
    events: any;
    setEvents: any;
    nextEvent: any;
    setNextEvent: any;
    selectedEvent: any;
    setSelectedEvent: any;
    selectedContent: any;
    setSelectedContent: any;
    nonAnonymousStatusToLoginUser: any;
    currProfile: any;
    allUserProfileIcons: any;
    profileListeners: any;
    setProfileListeners: any;

    dataRowClicked: any;
    setDataRowClicked: any;
    profileUserContentBucket: any;
    usersFollowingProfileUserCount: any;
    usersThatProfileUserFollowsCount: any;
    relevantFollowerData: any;
    contentDisplayClicked: any;
    setContentDisplayClicked: any;
    showProfile: boolean;
    allPostsLength: number;
    profileFollowers: any;
    setProfileFollowers: any;
    profileFollowedUsers: any;
    blocked: any;
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const ProfilePicAndData: React.FC<props> = ({
    events,
    setEvents,
    nextEvent,
    setNextEvent,
    selectedEvent,
    setSelectedEvent,
    selectedContent,
    setSelectedContent,
    nonAnonymousStatusToLoginUser,
    currProfile,
    allUserProfileIcons,
    profileListeners,
    setProfileListeners,
    dataRowClicked,
    setDataRowClicked,
    profileUserContentBucket,
    usersFollowingProfileUserCount,
    usersThatProfileUserFollowsCount,
    relevantFollowerData,
    contentDisplayClicked,
    setContentDisplayClicked,
    showProfile,
    allPostsLength,
    profileFollowers,
    setProfileFollowers,
    profileFollowedUsers,
    blocked,
}) => {
    const CURR_PROFILE = useSelector((state: RootState) => state.profile.CURR_PROFILE);

    const IS_CURRENT_USER_BLOCKED_BY_PROFILE_USER = useSelector((state: RootState) => state.profile.IS_CURRENT_USER_BLOCKED_BY_PROFILE_USER);
    const PROFILE_USER_CONTENT_BUCKET = useSelector((state: RootState) => state.profile.PROFILE_USER_CONTENT_BUCKET);
    const USERS_FOLLOWING_PROFILE_USER_COUNT = useSelector((state: RootState) => state.profile.USERS_FOLLOWING_PROFILE_USER_COUNT);
    const USERS_THAT_PROFILE_USER_FOLLOWS_COUNT = useSelector((state: RootState) => state.profile.USERS_THAT_PROFILE_USER_FOLLOWS_COUNT);

    const ALL_USERS_ICONS = useSelector((state: RootState) => state.app.ALL_USERS_ICONS);
    const ALL_FOLLOWERS = useSelector((state: RootState) => state.app.ALL_FOLLOWERS);
    const ALL_BLOCKS = useSelector((state: RootState) => state.app.ALL_BLOCKS);

    const CURRENT_USER = useSelector((state: RootState) => state.currentUser.CURRENT_USER);

    const test = () => {
        console.log('currProfile?.user_id', currProfile?.user_id);
        console.log('allUserProfileIcons', allUserProfileIcons);
        let iconUri2 = returnProfileImg(currProfile?.user_id, allUserProfileIcons);
        console.log('iconUri2', iconUri2);
    };

    const { returnProfileImg } = useContentFunction();
    const iconUri = returnProfileImg(currProfile?.user_id, allUserProfileIcons);

    return (
        <View style={styles.profilePicAndDataRow}>
            {
                dataRowClicked !== 'peacechill' &&
                    contentDisplayClicked !== 'eventactivities' &&
                    // <TouchableOpacity onPress={test}>
                    (nonAnonymousStatusToLoginUser === 'blocked' ? (
                        // 🧱 local asset image
                        <Image style={[{ borderRadius: 0 }, styles.profileIcon]} source={AnonymityMaskIcon} />
                    ) : // 🌐 remote URI image
                    // <TouchableOpacity onPress={test}>
                    //     <Text> hi </Text>
                    // </TouchableOpacity>
                    typeof iconUri === 'string' && iconUri.startsWith('http') ? (
                        <Image source={{ uri: iconUri }} style={[{ borderRadius: 50 }, styles.profileIcon]} />
                    ) : (
                        <Image source={HeartIcon} style={[{ borderRadius: 0 }, styles.profileIcon]} />
                    ))
                // </TouchableOpacity>
            }

            {nonAnonymousStatusToLoginUser === 'blocked' || showProfile === false ? (
                <Image style={styles.accountBanner} source={UserIcon} />
            ) : (
                <DataRow
                    events={events}
                    setEvents={setEvents}
                    nextEvent={nextEvent}
                    setNextEvent={setNextEvent}
                    selectedEvent={selectedEvent}
                    setSelectedEvent={setSelectedEvent}
                    selectedContent={selectedContent}
                    setSelectedContent={setSelectedContent}
                    currProfile={currProfile}
                    dataRowClicked={dataRowClicked}
                    setDataRowClicked={setDataRowClicked}
                    profileUserContentBucket={profileUserContentBucket}
                    usersFollowingProfileUserCount={usersFollowingProfileUserCount}
                    usersThatProfileUserFollowsCount={usersThatProfileUserFollowsCount}
                    relevantFollowerData={relevantFollowerData}
                    profileListeners={profileListeners}
                    setProfileListeners={setProfileListeners}
                    contentDisplayClicked={contentDisplayClicked}
                    setContentDisplayClicked={setContentDisplayClicked}
                    allPostsLength={allPostsLength}
                    showProfile={showProfile}
                    profileFollowers={profileFollowers}
                    setProfileFollowers={setProfileFollowers}
                    profileFollowedUsers={profileFollowedUsers}
                    blocked={blocked}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    profilePicAndDataRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 5,
        paddingRight: 5,
        alignItems: 'center',
        // boxSizing: 'border-box',
        width: '100%',
    },
    profileIcon: {
        height: 85,
        width: 85,
    },
    icons: {
        height: 50,
        width: 50,
    },
    accountBanner: {
        height: screenHeight / 10,
        width: screenHeight / 3,
    },
});

export default ProfilePicAndData;
