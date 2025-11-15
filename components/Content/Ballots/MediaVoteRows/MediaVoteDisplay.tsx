// @reduxjs/toolkit:
import { RootState } from 'redux/store/rootReducer';
import { useSelector, useDispatch } from 'react-redux';

//  <>
import { Dimensions, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { PartyIcon, GhostIcon, ThoughtsIcon, StarIcon, FirstPlaceIcon, SecondPlaceIcon, ThirdPlaceIcon, FourthPlaceNoiseMakerIcon } from '@/constants/Images';
import { grayphite } from '@/constants/Colors';
import React from 'react';

interface props {
    mapitemKey: any;
    index: any;
    currVotes: any;
}

const MediaVoteDisplay: React.FC<props> = ({ mapitemKey, index, currVotes }) => {
    return (
        // to keep track of votes the votes?.vote_string === 'mapitem' itself string to string equality.
        currVotes?.some((votes: any) => mapitemKey?.includes(votes?.vote_string)) && (
            <Text key={`numOfVotes${index}`} style={styles.voteLengthText}>
                {currVotes?.filter((votes: any) => mapitemKey?.includes(votes?.vote_string))?.length}
                {/* before .includes() {CURR_DAY_VOTES.filter(votes => votes?.vote_string === mapitemKey)?.length} */}
            </Text>
        )
    );
};

const styles = StyleSheet.create({
    voteLengthText: {
        color: grayphite,
        fontFamily: 'Fuzzy Bubbles',
        fontSize: 16,
    },
});

export default MediaVoteDisplay;
