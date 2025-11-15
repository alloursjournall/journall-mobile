import React, { useState } from 'react';
import axios from 'axios';

// redux
import { RootState } from '@/redux/store/rootReducer';
import { useSelector, useDispatch, createDispatchHook } from 'react-redux';
import { SET_CURRENT_USER, SET_CURRENT_USER_PRIVACY, SET_CURRENT_USER_MOST_RECENT_POST } from '@/redux/currentUser/currentUserSlice';

// <>
import { Dimensions, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import FieldsLockIconText from '../FieldsLockIconText';

// utils:
import { grayphite } from '@/constants/Colors';
import { RedBackArrowIcon, GreenForwardArrowIcon, TrashIcon } from '@/constants/Images';
import { useContentFunction } from '@/Contexts/ContentFunctions';

interface LikeListProps {
    day: any;
    fieldLikes: any;
    setFieldLikes: any;
    allUserProfileIcons: any;
    allLikesLOCKshouldShowContent: any;
    seeLikesLOCKshouldShowContent: any;
}

const LikeList: React.FC<LikeListProps> = ({ day, fieldLikes, setFieldLikes, allUserProfileIcons, allLikesLOCKshouldShowContent, seeLikesLOCKshouldShowContent }) => {
    const fields = day?.fields || null;

    const CURRENT_USER = useSelector((state: RootState) => state.currentUser.CURRENT_USER);
    const { returnProfileImg } = useContentFunction();
    // const { iconTrash } = useImage()

    return (
        <View>
            {Array.isArray(fieldLikes) && allLikesLOCKshouldShowContent && seeLikesLOCKshouldShowContent ? (
                fieldLikes.map((like: any, index: number) => {
                    return (
                        <View style={styles.fieldLikesUserIconUsernameRow}>
                            <Image source={{ uri: returnProfileImg(like?.liked_by_user, allUserProfileIcons) }} />
                            <Text style={styles.likeListUsername}> {like?.liked_by_username} </Text>
                            {like?.liked_by_id === CURRENT_USER?.id && <Image style={styles.likeListUserIcon} source={TrashIcon} />}
                        </View>
                    );
                })
            ) : (
                <FieldsLockIconText unlockText={fields?.unlock || 'unlock'} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    fieldLikesUserIconUsernameRow: {
        gap: '10%',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    likeListUserIcon: {
        height: 35,
        width: 35,
        borderRadius: 50,
    },
    likeListUsername: {
        fontSize: 16,
    },
});

export default LikeList;
