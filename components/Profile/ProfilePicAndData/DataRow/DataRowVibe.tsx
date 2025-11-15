// top level imports
import axios from 'axios';
import React, { useState, useEffect } from 'react';

// @reduxjs/toolkit:
import { RootState } from 'redux/store/rootReducer';
import { useSelector, useDispatch } from 'react-redux';

import { Dimensions, TouchableOpacity, Image, ScrollView, View, Text, StyleSheet } from 'react-native';

// utils:
import { EarbudsIcon, AirpodsIcon } from '@/constants/Images';
import { grayphite } from '@/constants/Colors';
import { useContentFunction } from 'Contexts/ContentFunctions';

interface props {
    currProfile: any;
    profileListeners: any;
    setProfileListeners: any;
}

const DataRowVibe: React.FC<props> = ({ currProfile, profileListeners, setProfileListeners }) => {
    const CURRENT_USER = useSelector((state: RootState) => state.currentUser.CURRENT_USER);

    // const PROFILE_LISTENERS = useSelector((state: RootState) => state.profile.PROFILE_LISTENERS)

    const { profileListenersDeleteFunc, profileListenersAddFunc } = useContentFunction();

    const isCurrentUserListening = profileListeners?.some((listeners: any) => listeners?.user_id === CURRENT_USER?.id);

    const test = () => {
        console.log('isCurrentUserListening', isCurrentUserListening);
    };

    const addCurrentUserListening = () => {
        profileListenersAddFunc(currProfile?.id, CURRENT_USER?.id, setProfileListeners);
    };

    const deleteCurrentUserListening = () => {
        profileListenersDeleteFunc(currProfile?.id, CURRENT_USER?.id, setProfileListeners);
    };

    return (
        <View style={styles.dataRowBottomToolBar}>
            <Text style={styles.headerText}> {currProfile?.current_vibe} </Text>
            {/*  considered current activity? but ppl could use curr_vibe as curr_activity as well? */}

            {
                // {table.listeners} -> profile.current_vibe is updated ? (basically user updates their status/mood?) signup for notifications!
                isCurrentUserListening ? (
                    <TouchableOpacity onPress={deleteCurrentUserListening}>
                        <Image style={styles.dataRowTopToolBarIcon} source={EarbudsIcon} />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={addCurrentUserListening}>
                        <Image style={styles.dataRowTopToolBarIcon} source={AirpodsIcon} />
                    </TouchableOpacity>
                )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    dataRowBottomToolBar: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        width: '100%',
    },
    profilePicAndDataText: {
        fontFamily: 'Fuzzy Bubbles',
        fontSize: 20,
        fontWeight: 200,
        color: grayphite,
    },
    bottomToolBarRightCont: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },
    dataRowTopToolBarIcon: {
        height: 50,
        width: 50,
    },
    headerText: {
        fontFamily: 'Fuzzy Bubbles',
        color: grayphite,
        fontSize: 20,
    },
});

export default DataRowVibe;
