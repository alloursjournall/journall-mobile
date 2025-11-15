// useState:
import { useState, useRef } from 'react';

//  <>
import { Dimensions, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ThoughtsIcon, HeartIcon } from '@/constants/Images';

// redux
import { RootState } from '@/redux/store/rootReducer';
import { useSelector, useDispatch } from 'react-redux';

// utils:
import { BallotIcon } from '@/constants/Images';
import { grayphite } from '@/constants/Colors';
import { useContentFunction } from '@/Contexts/ContentFunctions';

interface VoteOptionText {
    day: any;
    event: any;
    mapitem: any;
    currBallot: any;
    index: number;
    usersPassLocks: any;
}

const VoteOptionText: React.FC<VoteOptionText> = ({ day, event, mapitem, currBallot, index, usersPassLocks }) => {
    const CURRENT_USER = useSelector((state: RootState) => state.currentUser.CURRENT_USER);
    const { isUserSubmittedOptionApprovedText } = useContentFunction();

    let hideWaitingApprovalVotes = currBallot?.hide_waiting_on_approval_votes;
    let needApprovalVotes = currBallot?.user_submitted_options_need_approval;

    const ballotLock = currBallot?.lock;
    const noLock = !ballotLock;
    const consideringOptionLOCKisUNLOCKED =
        ballotLock &&
        ballotLock === 'consideringOption' &&
        usersPassLocks?.some(
            (lockPass: any) =>
                lockPass?.day_id === day?.id && (lockPass?.pass_ballot_all === true || (lockPass?.pass_ballot === true && lockPass?.user_id === CURRENT_USER?.id)),
        );

    const consideringOptionLockNotRelevant = ballotLock && ballotLock !== 'consideringOption';
    const consideringOptionRelevantAndUnlocked = ballotLock && ballotLock === 'consideringOption' && consideringOptionLOCKisUNLOCKED;
    const consideringOptionLOCKshouldShowContent = currBallot?.id > 0 && (noLock || consideringOptionLockNotRelevant || consideringOptionRelevantAndUnlocked);

    return (
        <View style={styles.cont}>
            {/* as far as I know {mapitem} is good for comments as well as regular votes. */}
            <Text
                style={[
                    {
                        color:
                            needApprovalVotes === true &&
                            // if hideApprovalVotes === true then check for isUserSubmittedOptionApproved() false = no. can't check for null because that's a posting-user-provided option. wouldn't show a ghost for that. if hideApprovalVotes === yes then only current user or the user that started that vote can see it.
                            ((hideWaitingApprovalVotes === true &&
                                isUserSubmittedOptionApprovedText(mapitem, currBallot)?.isApproved === false &&
                                (day?.user_id === CURRENT_USER?.id || isUserSubmittedOptionApprovedText(mapitem, currBallot)?.userId === CURRENT_USER?.id)) ||
                                // still on needApprovalVotes === true. but if hideWaitingApprovalVotes === false && they haven't been approved yet (forgot that) Then show the ghosts.
                                (hideWaitingApprovalVotes === false && isUserSubmittedOptionApprovedText(mapitem, currBallot)?.isApproved === false))
                                ? 'silver'
                                : // color: !voteIsDone && (hideWaitingApprovalVotes === true && (isUserSubmittedOptionApproved(mapitem)?.isApproved === false && (CURR_DAY?.user_id === CURRENT_USER?.id || isUserSubmittedOptionApproved(mapitem)?.userId === CURRENT_USER?.id) )) ? "silver" :
                                index % 2 === 0
                                ? '#93cbe2'
                                : '#e19db3',
                    },
                    styles.text,
                ]}
            >
                {' '}
                {mapitem}{' '}
            </Text>

            {/* {
                // parsing for mapitem?.id (comment) or index (vote)
                (currBallot?.user_already_considering_option === mapitem?.id || currBallot?.user_already_considering_option === index) &&
                consideringOptionLOCKshouldShowContent &&
                // to show before the vote that user was already thiking about this option. could also be locked away
                <Image source={ThoughtsIcon} style={styles.submitVoteBtnMini} />
            } */}
        </View>
    );
};

const styles = StyleSheet.create({
    cont: {
        flexDirection: 'row',
        // width: '100%',
        justifyContent: 'flex-start',
        paddingLeft: 5,
        gap: 10,
    },
    submitVoteBtnMini: {
        height: 20,
        width: 20,
    },
    submitVoteBtn: {
        height: 35,
        width: 35,
    },
    text: {
        fontFamily: 'Fuzzy Bubbles',
        fontSize: 20,
    },
});

export default VoteOptionText;
