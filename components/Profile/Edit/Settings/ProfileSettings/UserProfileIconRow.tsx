// top level imports
import axios from 'axios';
import React, { useState } from 'react';

// @reduxjs/toolkit:
import { RootState } from 'redux/store/rootReducer';
import { useSelector, useDispatch } from 'react-redux';

import { Dimensions, ScrollView, Text, TextInput, Platform, TouchableOpacity, Image, View, StyleSheet } from 'react-native';
import ErrorSlippedUpBanana from '@/components/ErrorSlippedUpBanana';

// utils:
import { grayphite, grayfight } from '@/constants/Colors';
import { useContentFunction } from '@/Contexts/ContentFunctions';
import * as ImagePicker from 'expo-image-picker';
import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';

interface props {
    allUserProfileIcons: any;
    editCurrProfile: any;
    currProfile: any;
    setEditCurrProfile: any;
}

const UserProfileIconRow: React.FC<props> = ({ allUserProfileIcons, editCurrProfile, currProfile, setEditCurrProfile }) => {
    const CURRENT_USER = useSelector((state: RootState) => state.currentUser.CURRENT_USER);

    const uploadFile = async () => {
        if (Platform.OS === 'web') {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/jpeg, image/png';
            input.multiple = false;
            input.onchange = async (event: any) => {
                const file = event.target.files[0];
                if (file) {
                    let clone = { ...editCurrProfile };
                    let obj = {
                        blob: file,
                        url: URL.createObjectURL(file), // Convert blob to a URL
                    };
                    clone.user_profile_icon = obj;
                    setEditCurrProfile(clone);
                }
            };
            input.click();
        } else {
            // Mobile: Use expo-image-picker or DocumentPicker
            try {
                // testing endpoints. MediaTypeOptions is deprecated.
                const endpointTest = ImagePicker.UIImagePickerControllerQualityType;

                const result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All, // Images & Videos
                    allowsEditing: true,
                    quality: 1,
                });

                if (!result.canceled) {
                    // 🚨 but then do we upload the blob or the blobURL to amazon? amazon gets regular blob <img> needs URL
                    let clone = { ...editCurrProfile };
                    clone.user_profile_icon = result.assets[0].uri;
                    setEditCurrProfile(clone);
                }
            } catch (error) {
                console.log('Error picking file:', error);
            }
        }
    };

    const test = () => {
        console.log('CURRENT_USER', CURRENT_USER);
        console.log('allUserProfileIcons', allUserProfileIcons);
        console.log('editCurrProfile', editCurrProfile);
        console.log('currProfile', currProfile);
    };

    const { returnProfileImg } = useContentFunction();

    return (
        <View style={styles.settingsRow}>
            {/* <TouchableOpacity onPress={test}>
                <Text> yup </Text>
            </TouchableOpacity> */}

            <View style={styles.slightSplitRow}>
                <Text style={styles.headerText}> icon </Text>

                {
                    // if edit profile is === currProfile then user didn't change their profile icon; show default icon.
                    editCurrProfile?.user_profile_icon === currProfile?.user_profile_icon ? (
                        // <TouchableOpacity onPress={test} style={styles.slightSplitRow}>
                        <TouchableOpacity onPress={uploadFile} style={styles.slightSplitRow}>
                            <Image style={[{ borderRadius: 50 }, styles.iconMini]} source={returnProfileImg(CURRENT_USER?.id, allUserProfileIcons)} />
                        </TouchableOpacity>
                    ) : (
                        // editCurrProfile.icon !== curProfile.icon
                        <TouchableOpacity onPress={uploadFile} style={styles.slightSplitRow}>
                            <Image
                                style={[{ borderRadius: 50 }, styles.iconMini]}
                                source={editCurrProfile?.user_profile_icon?.url || returnProfileImg(CURRENT_USER?.id, allUserProfileIcons)}
                            />
                        </TouchableOpacity>
                    )
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    settingsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 'auto',
        width: '100%',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        borderBottomColor: grayphite,
        borderStyle: 'dotted',
        boxSizing: 'border-box',
    },
    hostingUsersColumns: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 2,
        overflow: 'hidden',
        gap: 2, // React Native doesn't support "gap" yet, but you can use margin for similar effect
    },
    item: {
        flexBasis: '30%', // This will create 3 equal columns
        marginBottom: 2, // This adds spacing between items vertically
        // Add any other styles for your items, e.g., backgroundColor, padding, etc.
    },
    icons: {
        height: 50,
        width: 50,
    },
    iconMini: {
        height: 35,
        width: 35,
    },
    slightSplitRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    headerText: {
        color: grayphite,
        fontSize: 20,
        fontWeight: 400,
        fontFamily: 'Fuzzy Bubbles',
    },

    captionText: {
        color: grayfight,
        fontSize: 20,
        fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
    },
});

export default UserProfileIconRow;
