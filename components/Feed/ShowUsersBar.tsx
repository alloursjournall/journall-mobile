import { useRouter } from 'expo-router';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

// redux
import { RootState } from '@/redux/store/rootReducer';
import { useSelector, useDispatch, createDispatchHook } from 'react-redux';

import { Dimensions, TouchableOpacity, Image, TextInput, ScrollView, View, Text, StyleSheet } from 'react-native';
import { appBackground } from '@/constants/Colors';
import Day from '@/components/Content/Day/Day';
import NotificationList from '@/components/Content/UploadDay/Content/NotificationList';
import Navbar from '@/components/Navbar';

import EditDay from '@/components/Content/EditDay/EditDay';

// utils:
import { grayphite } from '@/constants/Colors';
import { BranchIcon, GreenForwardArrowIcon, DiceIcon, StarIcon, LitFireIcon, RedBackArrowIcon, TimeIcon } from '@/constants/Images';
import { allDaysGETquery } from '@/graphql/queries';
import { useContentFunction } from '@/Contexts/ContentFunctions';

interface props {
    allUserProfileIcons: any;
}

const ShowUsersBar: React.FC<props> = ({ allUserProfileIcons }) => {
    const router = useRouter();

    const { getAllUsersAndPrivacy, returnProfileImg, visitProfile } = useContentFunction();

    // need privacy:
    const ALL_USERS = useSelector((state: RootState) => state.app.ALL_USERS);

    useEffect(() => {
        getAllUsersAndPrivacy();
    }, []);

    // const visitProfile = (userId:any) => {
    //     const stringNum = JSON.stringify(userId);
    //     const stringPath = `/profile/${stringNum}`
    //     router.push(stringPath);
    // }

    const test = () => {
        console.log('ALL_USERS', ALL_USERS);
    };

    return (
        <ScrollView contentContainerStyle={styles.cont}>
            {/* <TouchableOpacity onPress={test}> ayoo </TouchableOpacity> */}

            {Array.isArray(ALL_USERS) &&
                ALL_USERS?.map((user: any, index: number) => {
                    return (
                        <TouchableOpacity style={styles.userColumn} onPress={() => visitProfile(user?.id)}>
                            <Image style={[{ borderRadius: 50 }, styles.icon]} source={returnProfileImg(user?.id, allUserProfileIcons)} />
                            <Text style={styles.text}> {user?.username} </Text>
                        </TouchableOpacity>
                    );
                })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    cont: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        width: '80%',
        overflow: 'scroll',
        alignSelf: 'center',
        marginTop: '5%',
        paddingVertical: 20,
        paddingHorizontal: 5,
    },
    userColumn: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },

    icon: {
        height: 50,
        width: 50,
    },
    iconMini: {
        height: 35,
        width: 35,
    },
    text: {
        fontSize: 20,
        fontFamily: 'Fuzzy Bubbles',
        color: grayphite,
    },
});

export default ShowUsersBar;
