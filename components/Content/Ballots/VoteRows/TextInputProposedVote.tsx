import axios from 'axios';
import { useState, useEffect } from 'react';

import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';

// @reduxjs/toolkit:
import { RootState } from 'redux/store/rootReducer';
import { useSelector, useDispatch } from 'react-redux';

// utils:
import { useContentFunction } from 'Contexts/ContentFunctions';
import { grayphite } from '@/constants/Colors';

interface TextInputProposedVoteProps {
    userSubmittedOptionsInputValue: any;
    setUserSubmittedOptionsInputValue: any;
    currBallot: any;
    setDidUserSubmit: any;
    didCurrentUserVote: any;
    day: any;
    setBallotBin: any;
}

const TextInputProposedVote: React.FC<TextInputProposedVoteProps> = ({
    userSubmittedOptionsInputValue,
    setUserSubmittedOptionsInputValue,
    currBallot,
    setDidUserSubmit,
    didCurrentUserVote,
    day,
    setBallotBin,
}) => {
    const dispatch = useDispatch();

    const CURRENT_USER = useSelector((state: RootState) => state.currentUser.CURRENT_USER);

    const { submitUserSubmittedOption } = useContentFunction();

    const handleOnchange = (text: string) => {
        // if user submitted values then don't allow resubmission
        // this might change if these endpoints/feature get added: // {t.ballots.canUserReproposeVote} && to protect against spam -> {reproposingVoteLimit}
        currBallot?.user_submitted_options_user_array?.some((options: any, index: number) => {
            let [userId, vote] = options?.split('-');
            const id = parseInt(userId);
            // return id === CURRENT_USER?.id ? true : false
            if (id === CURRENT_USER?.id) {
                setDidUserSubmit(true);
            }
        });
        if (text?.includes('nigger')) {
            setUserSubmittedOptionsInputValue('');
        }

        const isAlphaWithSpaces = /^[A-Za-z\s]+$/.test(text);

        if (isAlphaWithSpaces) {
            setUserSubmittedOptionsInputValue(text);
        } else {
            console.log('Input contains non-alphabetic characters');
            // Optionally, you can clear the input or provide feedback to the user
            setUserSubmittedOptionsInputValue(''); // or leave it unchanged
        }
    };

    const submitUserSubmittedOptionClick = () => {
        // const submitUserSubmittedOption =
        // async (currBallot:any, didCurrentUserVote, userSubmittedOptionsInputValue) => {
        submitUserSubmittedOption(currBallot, didCurrentUserVote, userSubmittedOptionsInputValue, setUserSubmittedOptionsInputValue, setDidUserSubmit, day, setBallotBin);
    };

    return (
        <View style={[styles.inputButtonCont, { width: userSubmittedOptionsInputValue?.length > 1 ? '25%' : 10 }]}>
            <TextInput maxLength={100} onChangeText={handleOnchange} style={styles.input} />

            {userSubmittedOptionsInputValue?.length > 1 && (
                <TouchableOpacity style={styles.addCommentPlusInput} onPress={submitUserSubmittedOptionClick}>
                    <Text style={styles.addCommentInputText}> + </Text>
                </TouchableOpacity>
            )}
        </View>
    );
    // <Container id={styles.voteAndInputSettingsRow}>
    //     <input onChange={handleOnchange} value={userSubmittedOptionsInputValue} maxLength={20} id={styles.userSubmittedOptionsInput} type="text" />
    //     <button onClick={submitUserSubmittedOptionClick} id={styles.addUserSubmittedVoteOptionBtn}>
    //         {' '}
    //         +{' '}
    //     </button>
    // </Container>
};

const styles = StyleSheet.create({
    inputButtonCont: {
        // width: '25%',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
    },
    input: {
        width: 24, // give it realistic room for text
        maxHeight: 20, // ✅ fixes the tall-on-type issue
        // maxHeight: 30, // ✅ fixes the tall-on-type issue
        paddingVertical: 0, // remove RN’s default 5-6 px padding
        paddingHorizontal: 8,
        borderRadius: 50,
        borderTopLeftRadius: 14.5,
        borderTopRightRadius: 65.5,
        borderBottomLeftRadius: 122.5,
        borderBottomRightRadius: 30,
        color: '#444',
        fontFamily: 'fuzzy',
        fontSize: 10,
        borderWidth: 1.5,
        borderColor: '#44454fea',
        textAlignVertical: 'center', // ✅ keeps text centered on Android
    },
    addCommentPlusInput: {
        height: 20,
        width: 20,
        borderTopLeftRadius: 14,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: -1,
        borderBottomRightRadius: 11,
        borderWidth: 2,
        borderColor: grayphite,
    },
    addCommentInputText: {
        fontSize: 16,
        fontWeight: 500,
        fontFamily: 'Fuzzy Bubbles',
        color: grayphite,
    },
});

export default TextInputProposedVote;
