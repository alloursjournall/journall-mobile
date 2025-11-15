import React, { useState } from 'react';

// <>
import { ScrollView, Dimensions, Image, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import StarsHeader from './StarsHeader';
import ShowUsersMap from './ShowUsersMap';

// utils:
import { grayphite } from "@/constants/Colors"
import { StarIcon, EmptyStarIcon, RedBackArrowIcon } from '@/constants/Images';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

interface StarsShowUsersProps {
    comment: any,
    commentStars: any,
    setCommentStars: any,
    usersPassLocks: any,
    comments: any
    allUserProfileIcons: any
    setCommentStarsQuestionClick: any
}

const StarsShowUsers: React.FC<StarsShowUsersProps> = ({
    comment,
    commentStars,
    setCommentStars,
    usersPassLocks,
    comments,
    allUserProfileIcons,
    setCommentStarsQuestionClick,
}) => {

    return (
        <View style={styles.starsCont}>

            <StarsHeader
                comment={comment}
                commentStars={commentStars}
                usersPassLocks={usersPassLocks}
            />

            <ShowUsersMap
                comment={comment}
                commentStars={commentStars}
                usersPassLocks={usersPassLocks}
                allUserProfileIcons={allUserProfileIcons}
                setCommentStarsQuestionClick={setCommentStarsQuestionClick}
            />

        </View>
    )

}

const styles = StyleSheet.create({
    starsCont: {
        height: screenHeight * 0.4, // Ensure it matches the height of the image
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%', // Ensure it takes full width
        borderColor: grayphite,
        borderWidth: 3,
        padding: 10, // Add some padding to avoid content touching the edges
    },
})

export default StarsShowUsers;