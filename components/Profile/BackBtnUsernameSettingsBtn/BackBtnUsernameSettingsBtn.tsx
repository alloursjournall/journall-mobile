import axios from 'axios';
import { useState, useEffect } from 'react';

// redux
import { RootState } from '@/redux/store/rootReducer';
import { useSelector, useDispatch, createDispatchHook } from 'react-redux';
import { SET_CURR_PROFILE, SET_PROFILE_USER_PRIVACY } from '@/redux/profile/profileSlice';

import { Platform, Dimensions, TouchableOpacity, Image, ScrollView, View, Text, StyleSheet } from 'react-native';

import { TOGGLE_SHOW_SETTINGS_MENU } from 'redux/profile/profileSlice';

// components and styleing:

// utils:
import { grayphite } from '@/constants/Colors';
import { SettingsIcon, FollowerIcon, SendButtonIcon, HandUnderlineIcon1 } from '@/constants/Images';
import { useContentFunction } from 'Contexts/ContentFunctions';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

interface props {
    allUserProfileIcons: any;
    currProfile: any;
    currPrivacy: any;
    nonAnonymousStatusToLoginUser: any;
    showEditProfile: any;
    setShowEditProfile: any;
    profileFollowers: any;
    setProfileFollowers: any;
    showProfile: any;
}

const BackBtnUsernameSettingsBtn: React.FC<props> = ({
    allUserProfileIcons,
    currProfile,
    currPrivacy,
    nonAnonymousStatusToLoginUser,
    showEditProfile,
    setShowEditProfile,
    profileFollowers,
    setProfileFollowers,
    showProfile,
}) => {
    const { returnProfileImg, addFollower, deleteFollower } = useContentFunction();

    const dispatch = useDispatch();

    const CURR_PROFILE = useSelector((state: RootState) => state.profile.CURR_PROFILE);
    const CURRENT_USER = useSelector((state: RootState) => state.currentUser.CURRENT_USER);

    const IS_CURRENT_USER_BLOCKED_BY_PROFILE_USER = useSelector((state: RootState) => state.profile.IS_CURRENT_USER_BLOCKED_BY_PROFILE_USER);
    const RELEVANT_FOLLOWER_DATA = useSelector((state: RootState) => state.profile.RELEVANT_FOLLOWER_DATA);

    const doesCurrentUserFollowProfileUser = profileFollowers?.some((f: any) => f?.follower_id === CURRENT_USER?.id);

    const ALL_USERS_ICONS = useSelector((state: RootState) => state.app.ALL_USERS_ICONS);

    const settingsClick = () => {
        console.log('settings click');
        dispatch(TOGGLE_SHOW_SETTINGS_MENU());
    };

    const test = () => {
        console.log('CURR_PROFILE', CURR_PROFILE);
        console.log('currProfile', currProfile);
        console.log('currPrivacy', currPrivacy);
    };

    const showEditProfileToggler = () => {
        // wrong this shows up the profile user to users who aren't the profile users:
        console.log('CURRENT_USER', CURRENT_USER);

        if (CURRENT_USER?.id !== currProfile?.user_id) {
            console.log("we're over here");
            // show the view for scorlling user looking at someone else's profile:
            return;
        }

        setShowEditProfile(!showEditProfile);

        // if (CURRENT_USER?.id === CURR_PROFILE?.user_id) {
        //     setShowEditProfile(!showEditProfile);
        // } else {
        //     settingsClick();
        // }
    };

    const addFollowerFunc = async () => {
        const followers = await addFollower(currProfile?.user_id, CURRENT_USER?.id);
        if (!followers) {
            return null;
        }
        setProfileFollowers(followers);
    };

    const deleteFollowerFunc = async () => {
        const followers = await deleteFollower(currProfile?.user_id, CURRENT_USER?.id);
        if (!followers) {
            return null;
        }
        setProfileFollowers(followers);
    };

    return (
        <View style={[{ marginTop: Platform.OS === 'web' ? 5 : 30 }, styles.spaceAroundRow]}>
            <Text style={styles.text}> &lt; </Text>

            {nonAnonymousStatusToLoginUser === 'blocked' || showProfile === false ? (
                <Image style={styles.underline} source={HandUnderlineIcon1} />
            ) : (
                <View style={styles.middleCont}>
                    <TouchableOpacity
                        onPress={() => {
                            doesCurrentUserFollowProfileUser ? deleteFollowerFunc() : addFollowerFunc();
                        }}
                    >
                        <Image style={[{ opacity: doesCurrentUserFollowProfileUser ? 1 : 0.5 }, styles.settingsIcon]} source={FollowerIcon} />
                    </TouchableOpacity>

                    <Text style={[{ fontSize: 20, textTransform: 'uppercase', letterSpacing: 2 }, styles.text]}> {currProfile?.username} </Text>

                    <Image style={styles.settingsIcon} source={SendButtonIcon} />

                    {
                        <TouchableOpacity onPress={showEditProfileToggler}>
                            <Image style={styles.settingsIcon} source={SettingsIcon} />
                        </TouchableOpacity>
                    }
                </View>
            )}

            {/* <TouchableOpacity onPress={settingsClick}>
                <Image style={styles.settingsIcon} source={SettingsIcon} />
            </TouchableOpacity> */}
        </View>
    );
};

const styles = StyleSheet.create({
    spaceAroundRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        // borderWidth: 2,
        // borderColor: grayphite,
        gap: 10,
        padding: 15,
        // width: '50%',
    },
    middleCont: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        // borderWidth: 2,
        // borderColor: 'blue',
        width: '75%',
    },
    text: {
        fontFamily: 'Fuzzy Bubbles',
        color: grayphite,
    },
    icon: {
        height: 50,
        width: 50,
    },
    settingsIcon: {
        height: 35,
        width: 35,
    },
    invisibleInputUsername: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: screenWidth / 5,
        color: grayphite,
    },
    underline: {
        width: screenWidth / 10,
        height: 20,
    },
});

export default BackBtnUsernameSettingsBtn;
