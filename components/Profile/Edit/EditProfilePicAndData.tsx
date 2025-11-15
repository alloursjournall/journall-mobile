// top level imports
// top level s
import axios from 'axios';
import React, { useState, useEffect } from 'react';

// @reduxjs/toolkit:
import { RootState } from 'redux/store/rootReducer';
import { useSelector, useDispatch } from 'react-redux';

import { Dimensions, TouchableOpacity, Image, ScrollView, View, Text, StyleSheet } from 'react-native';

// utils:
import { grayphite } from '@/constants/Colors';
import { SettingsIcon, FollowerIcon, SendButtonIcon, HandUnderlineIcon1, AccountIcon, AnonymityMaskIcon } from '@/constants/Images';
import { useContentFunction } from 'Contexts/ContentFunctions';

interface props {
    currProfile: any;
    allUserProfileIcons: any;
    isCurrentUserBlockedByProfileUser: any;
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const EditProfilePicAndData: React.FC<props> = ({ currProfile, allUserProfileIcons, isCurrentUserBlockedByProfileUser }) => {
    const CURR_PROFILE = useSelector((state: RootState) => state.profile.CURR_PROFILE);

    const IS_CURRENT_USER_BLOCKED_BY_PROFILE_USER = useSelector((state: RootState) => state.profile.IS_CURRENT_USER_BLOCKED_BY_PROFILE_USER);
    const PROFILE_USER_CONTENT_BUCKET = useSelector((state: RootState) => state.profile.PROFILE_USER_CONTENT_BUCKET);
    const USERS_FOLLOWING_PROFILE_USER_COUNT = useSelector((state: RootState) => state.profile.USERS_FOLLOWING_PROFILE_USER_COUNT);
    const USERS_THAT_PROFILE_USER_FOLLOWS_COUNT = useSelector((state: RootState) => state.profile.USERS_THAT_PROFILE_USER_FOLLOWS_COUNT);

    const ALL_USERS_ICONS = useSelector((state: RootState) => state.app.ALL_USERS_ICONS);
    const ALL_FOLLOWERS = useSelector((state: RootState) => state.app.ALL_FOLLOWERS);
    const ALL_BLOCKS = useSelector((state: RootState) => state.app.ALL_BLOCKS);

    const CURRENT_USER = useSelector((state: RootState) => state.currentUser.CURRENT_USER);

    const { returnProfileImg } = useContentFunction();

    const test = () => {};

    return (
        <View style={styles.profilePicAndDataRow}>
            <Image
                style={[{ borderRadius: isCurrentUserBlockedByProfileUser ? 0 : 50 }, styles.profileIcon]}
                source={isCurrentUserBlockedByProfileUser ? AnonymityMaskIcon : { uri: returnProfileImg(currProfile?.user_id, allUserProfileIcons) }}
            />

            {/* <Text> edit data row </Text> */}
            {/* <EditDataRow /> */}
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

export default EditProfilePicAndData;
