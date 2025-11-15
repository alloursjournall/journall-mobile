import React, { useState } from 'react';

// <>
import { ScrollView, Dimensions, Image, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import ErrorSlippedUpBanana from '@/components/ErrorSlippedUpBanana';

import { StarIcon, EmptyStarIcon, ShurikenIcon, RedBackArrowIcon, GreenForwardArrowIcon, QuestionIcon } from '@/constants/Images';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

import { useContentFunction } from '@/Contexts/ContentFunctions';

interface PostingUserStarsProps {
    day: any,
    currThought: any,
    postingUserThoughts: any,
    postingUserThoughtStars: any,
    setPostingUserThoughtStars: any,
    userStarsOrStarsUsers: any,
    setUserStarsOrStarsUsers: any,
    usersPassLocks: any,
    setUsersPassLocks: any,
}

interface StarsMapProps {
    starClickedIndex: any,
    setStarClickedIndex: any,
}

const PostingUserStars: React.FC<PostingUserStarsProps> = ({
    day, currThought, postingUserThoughts, postingUserThoughtStars, setPostingUserThoughtStars, userStarsOrStarsUsers, setUserStarsOrStarsUsers,
    usersPassLocks, setUsersPassLocks
}) => {

    const { submitOneThruFiveRatings, calculateStarsAverage } = useContentFunction();

    const [containerOpen, setContainerOpen] = useState<boolean>(false)
    const [starClickedIndex, setStarClickedIndex] = useState<number>(0);
    const [postingUserStarsAverage, setPostingUserStarsAverage] = useState<number>(0)
    const [error, setError] = useState<boolean>(false)

    const openContainerFunc = () => {
        setContainerOpen(true);
    }

    const closeContainer = () => {
        if (starClickedIndex !== 0) {
            setStarClickedIndex(0);
        } else if (starClickedIndex === 0) {
            setContainerOpen(false);
        }
    }

    const calculateStarsAverageHandler = () => {
        const stars = calculateStarsAverage(postingUserThoughts?.id, null, null, null, postingUserThoughtStars, setPostingUserStarsAverage)
        // const stars = calculateStarsAverage(day?.id, null, null, null, postingUserThoughtStars, setPostingUserStarsAverage)
        return stars;
        console.log('stars', stars)
    }

    // 🚨 🚨 🚨 quick fix if needed! check stars!
    // const calculateStarsAverageHandler = (dayId: number | null, eventId: number | null, scrollContainerId: number | null, scrollPos: number | null, starsArray: any, setStarState: any) => {
    // // const postingUserThoughtsCalculateStarsAverage = (dayId: number | null, eventId: number | null, scrollContainerId: number | null, scrollPos: number | null, starsArray: any, setStarState: any) => {
    //     let totalStars: number = 0;
    //     const stars = starsArray?.filter((stars: any) => stars?.thought_id === dayId || stars?.thought_id === eventId);
    //     const starsNumbs = stars?.map((stars: any) => stars?.stars)

    //     if (!starsNumbs) { setError(true); }
    //     // increment and get the total of stars berfore dividing
    //     starsNumbs?.forEach((starRating:number) => totalStars +=  starRating)

    //     // divide: (total from incrementing) / (number of star submissions)
    //     const average = totalStars / stars?.length;
    //     setStarState(average);     
    //     return average;    
    // }

    // 🚨 🚨 const questionClick = (dayId:number|null, eventId:number|null, scrollContainerId:number|null, scrollPos:number|null, starsArray:any, setStarState:any) => {
    const questionClick = () => {
        if (postingUserThoughts?.stars_show_users) {
            // show stars users which displays <StarsUsers/> looping oiver postingUserThoughtStars to show stars?.username, stars.user_profile_icon and stars.stars (name, icon, rating)        
            setUserStarsOrStarsUsers('starsUsers')
        }
        if (postingUserThoughts?.stars_show_avg && !postingUserThoughts?.stars_show_users) {
            // show average
            const userThoughtStarsAverage = calculateStarsAverageHandler()
            // const userThoughtStarsAverage = postingUserThoughtsCalculateStarsAverage(day?.id, null, null, null, postingUserThoughtStars, setPostingUserStarsAverage)
            setStarClickedIndex(userThoughtStarsAverage);
            console.log('userThoughtStarsAverage', userThoughtStarsAverage)
        }
        if (!postingUserThoughts?.stars_show_users && !postingUserThoughts?.stars_show_avg) {
            // error handler
            setError(true);        
        }

        // if (postingUserThoughts?.stars_show_avg || postingUserThoughts?.stars_show_users) {
        //     if (postingUserThoughts?.stars_show_avg && !postingUserThoughts?.stars_show_users) {
        //     // don't show the users list just show the average and change the same stars UI for submitting the ratings to reflect current avg

        //     }
        // }

        // if (postingUserThoughts?.stars_show_avg || postingUserThoughts?.stars_show_users) {
        // }
    }

    const submitStars = async () => {
        console.log('starClickedIndex', starClickedIndex)
        // day postingUserThoughts postingUserId currentUserId currentUserIcon stars        
        const newStars = await submitOneThruFiveRatings(day, null, postingUserThoughts, null, null, day?.user_id, 3, 'puregold', 'journall-user-3', starClickedIndex)
        // const newStars = await submitOneThruFiveRatings(day, null, postingUserThoughts, null, day?.user_id, 3, 'puregold', 'journall-user-3', postingUserThoughtStars)

        console.log('newStars', newStars)
    }

    return (
        error
        ?
        <ErrorSlippedUpBanana size="mini" setShowError={setError}/>
        :
        containerOpen
            ?
            <>
                <TouchableOpacity onPress={questionClick} style={styles.actionButton}>
                    <Image source={QuestionIcon} style={styles.iconMini} />
                </TouchableOpacity>

                <TouchableOpacity onPress={closeContainer} style={styles.actionButton}>
                    <Image source={RedBackArrowIcon} style={styles.iconMini} />
                </TouchableOpacity>

                <StarsMap starClickedIndex={starClickedIndex} setStarClickedIndex={setStarClickedIndex} />

                <TouchableOpacity onPress={submitStars} style={styles.actionButton}>
                    <Image source={GreenForwardArrowIcon} style={styles.iconMini} />
                </TouchableOpacity>
            </>
            :
            <TouchableOpacity onPress={openContainerFunc} style={styles.actionButton}>
                <Image source={StarIcon} style={styles.starButton} />
            </TouchableOpacity>
    )
}

const StarsMap: React.FC<StarsMapProps> = ({
    starClickedIndex,
    setStarClickedIndex
}) => {

    const updateStarBeforeSubmission = (index: number) => {
        setStarClickedIndex(index + 1);
    }

    return (
        Array.from({ length: 5 }).map((mapitem, index) => {
            return (
                <TouchableOpacity onPress={() => updateStarBeforeSubmission(index)} style={styles.actionButton}>
                    <Image
                        source={starClickedIndex >= index + 1 ? StarIcon : EmptyStarIcon}
                        style={styles.iconMini}
                    />
                </TouchableOpacity>
            )
        })
        // <></>
    )
}


const styles = StyleSheet.create({
    actionButton: {
        marginRight: 16,
    },
    starButton: {
        height: 50,
        width: 50
    },
    iconMini: {
        height: 15,
        width: 15,
        // marginLeft: 2,
        // marginRight: 2,
    },
})

export default PostingUserStars;