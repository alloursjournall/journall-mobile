// useState:
import React, { useState, useRef } from 'react';

// redux
import { RootState } from '@/redux/store/rootReducer';
import { useSelector, useDispatch } from 'react-redux';

//  <>
import { Dimensions, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { GreenForwardArrowIcon, RedBackArrowIcon, StarIcon, EmptyStarIcon } from '@/constants/Images';
import { grayphite } from '@/constants/Colors';
import { useContentFunction } from '@/Contexts/ContentFunctions';
import { ReturnUrl } from '@/utility/utilityValues';

interface props {
    currBallot: any;
    mapitem: any;
    mapitemKey: any;
    index: any;
    setStarClickedOpenFiveStars: any;
    starClickedIndex: any;
    setStarClickedIndex: any;
    day: any;
    usersPassLocks: any;
    setUsersPassLocks: any;
    setBallotOptionsStars: any;
}

const MediaVoteSubmitStars: React.FC<props> = ({
    currBallot,
    mapitem,
    mapitemKey,
    index,
    setStarClickedOpenFiveStars,
    starClickedIndex,
    setStarClickedIndex,
    day,
    usersPassLocks,
    setUsersPassLocks,
    setBallotOptionsStars,
}) => {
    const { isUserSubmittedOptionApprovedMedia, userRatesBallotOptionFunc } = useContentFunction();

    const closeStarCont = (index: number) => {
        console.log('index', index);
        if (starClickedIndex > 0) {
            setStarClickedIndex(0);
        } else {
            setStarClickedOpenFiveStars(null);
        }
    };

    const rateVoteOptionFunc = () => {
        return;
        const match = mapitemKey.match(/^(?:[^/]*\/){4}([^/].*)$/);
        const characters = match ? match[1] : '';
        console.log('characters', characters);

        if (
            isUserSubmittedOptionApprovedMedia(mapitem, currBallot)?.isApproved === true ||
            isUserSubmittedOptionApprovedMedia(mapitem, currBallot)?.isApproved === null ||
            isUserSubmittedOptionApprovedMedia(mapitem, currBallot)?.isApproved === undefined
        ) {
            userRatesBallotOptionFunc(characters, 'vote', currBallot, starClickedIndex, day, null, usersPassLocks, setUsersPassLocks, setBallotOptionsStars);
        } else {
            userRatesBallotOptionFunc(characters, 'proposedVote', currBallot, starClickedIndex, day, null, usersPassLocks, setUsersPassLocks, setBallotOptionsStars);
        }
        setStarClickedIndex(0);
        setStarClickedOpenFiveStars(null);
    };

    return (
        <View style={styles.ballotOptionStarsCont}>
            <TouchableOpacity onPress={() => closeStarCont(index)}>
                <Image style={styles.starContIcons} source={RedBackArrowIcon} />
            </TouchableOpacity>
            {Array.from({ length: 5 })?.map((mapitem, index) => {
                return (
                    <TouchableOpacity onPress={() => setStarClickedIndex(index)}>
                        <Image
                            // id={starClickedIndex > 0 ? "floatingPesterAnimation" : ""}
                            key={`star${index}`}
                            style={styles.starContIcons}
                            source={starClickedIndex >= index ? StarIcon : EmptyStarIcon}
                        />
                    </TouchableOpacity>
                );
            })}
            <TouchableOpacity onPress={rateVoteOptionFunc}>
                <Image style={styles.starContIcons} source={GreenForwardArrowIcon} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    starContIcons: {
        height: 25,
        width: 25,
    },

    ballotOptionStarsCont: {
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MediaVoteSubmitStars;
