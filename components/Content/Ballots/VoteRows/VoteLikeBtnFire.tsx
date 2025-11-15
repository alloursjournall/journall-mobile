// redux
import { RootState } from '@/redux/store/rootReducer';
import { useSelector, useDispatch } from 'react-redux';

//  <>
import { Dimensions, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useContentFunction } from '@/Contexts/ContentFunctions';

// utils:
import { LitFireIcon } from '@/constants/Images';

interface props {
    mapitem: any;
    index: any;
    currBallot: any;
    ballotOptionsLikes: any;
    day: any;
    event: any;
    setBallotOptionsLikes: any;
    usersPassLocks: any;
    setUsersPassLocks: any;
}

const VoteLikeBtnFire: React.FC<props> = ({ mapitem, index, currBallot, ballotOptionsLikes, day, event, setBallotOptionsLikes, usersPassLocks, setUsersPassLocks }) => {
    const { likeVoteOption, isUserSubmittedOptionApprovedText } = useContentFunction();

    const CURRENT_USER = useSelector((state: RootState) => state.currentUser.CURRENT_USER);
    const myCount =
        (Array.isArray(ballotOptionsLikes) && ballotOptionsLikes?.filter((likes) => likes?.ballot_id === currBallot?.id && likes?.liked_by_id === CURRENT_USER?.id)?.length) ||
        0;

    // 🚨 🚨 currDayBallotOptionsLikes || currEventBallotOptionsLikes
    const doesUserLikeOptionAlready =
        (Array.isArray(ballotOptionsLikes) &&
            ballotOptionsLikes?.some(
                (likes: any) => likes?.ballot_id === currBallot?.id && likes?.liked_by_id === CURRENT_USER?.id && likes?.ballot_options_text === mapitem,
            )) ||
        null;

    return (
        <TouchableOpacity
            onPress={() => {
                const isApproved = isUserSubmittedOptionApprovedText(mapitem, currBallot)?.isApproved;
                return isApproved === true || isApproved === null || isApproved === undefined
                    ? likeVoteOption(mapitem, 'vote', currBallot, day, null, setBallotOptionsLikes, usersPassLocks, setUsersPassLocks)
                    : likeVoteOption(mapitem, 'proposedVote', currBallot, day, null, setBallotOptionsLikes, usersPassLocks, setUsersPassLocks);
            }}
        >
            <Image
                style={[styles.icon, { display: doesUserLikeOptionAlready ? 'none' : 'flex', opacity: myCount === 1 ? 0.5 : 1.0 }]}
                // style={[styles.icon, { display: doesUserLikeOptionAlready ? "none" : "", opacity: myCount === 1 ? 0.5 : 1.0 }]}
                source={LitFireIcon}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    icon: {
        height: 35,
        width: 35,
    },
});

export default VoteLikeBtnFire;
