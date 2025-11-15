// redux
import { RootState } from '@/redux/store/rootReducer';
import { useSelector, useDispatch } from 'react-redux';

//  <>
import { Dimensions, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useContentFunction } from '@/Contexts/ContentFunctions';

// utils:
import { RedBackArrowIcon, GreenForwardArrowIcon, StarIcon, EmptyStarIcon } from '@/constants/Images';

interface VoteSubmitStarsProps {
    currBallot: any;
    mapitem: any;
    index: number;
    setStarClickedOpenFiveStars: any;
    starClickedIndex: any;
    setStarClickedIndex: any;
    day: any;
    event: any;
    ballotOptionsStars: any;
    setBallotOptionsStars: any;
    usersPassLocks: any;
    setUsersPassLocks: any;
}

const VoteSubmitStars: React.FC<VoteSubmitStarsProps> = ({
    currBallot,
    mapitem,
    index,
    setStarClickedOpenFiveStars,
    starClickedIndex,
    setStarClickedIndex,
    day,
    event,
    ballotOptionsStars,
    setBallotOptionsStars,
    usersPassLocks,
    setUsersPassLocks,
}) => {
    const { userRatesBallotOptionFunc, isUserSubmittedOptionApprovedText } = useContentFunction();

    const CURRENT_USER = useSelector((state: RootState) => state.currentUser.CURRENT_USER);
    const myCount =
        (Array.isArray(ballotOptionsStars) &&
            ballotOptionsStars?.filter((stars: any) => stars?.ballot_id === currBallot?.id && stars?.liked_by_id === CURRENT_USER?.id)?.length) ||
        0;

    // const isMapItemThoughtOrText = (currBallot?.type === "best comment" || "joinday-pinnedcomment") ? mapitem?.thought : mapitem

    const doesUserRateOptionAlready =
        (Array.isArray(ballotOptionsStars) &&
            ballotOptionsStars?.some(
                (stars: any) => stars?.ballot_id === currBallot?.id && stars?.liked_by_id === CURRENT_USER?.id && stars?.ballot_options_text === mapitem,
            )) ||
        null;

    // const { userRatesBallotOptionFunc } = ALL_VOTES;

    const closeStarCont = (index: number) => {
        console.log('index', index);
        if (starClickedIndex > 0) {
            setStarClickedIndex(0);
        } else {
            setStarClickedOpenFiveStars(null);
        }
    };

    const rateVoteOptionFunc = () => {
        if (
            isUserSubmittedOptionApprovedText(mapitem, currBallot)?.isApproved === true ||
            isUserSubmittedOptionApprovedText(mapitem, currBallot)?.isApproved === null ||
            isUserSubmittedOptionApprovedText(mapitem, currBallot)?.isApproved === undefined
        ) {
            userRatesBallotOptionFunc(mapitem, 'vote', currBallot, starClickedIndex, day, event, usersPassLocks, setUsersPassLocks, setBallotOptionsStars);
        } else {
            userRatesBallotOptionFunc(mapitem, 'proposedVote', currBallot, starClickedIndex, day, event, usersPassLocks, setUsersPassLocks, setBallotOptionsStars);
        }
        setStarClickedIndex(0);
        setStarClickedOpenFiveStars(null);
    };

    return (
        <View style={styles.ballotOptionsStarsCont}>
            <TouchableOpacity onPress={() => closeStarCont(index)}>
                <Image style={styles.arrowIcons} source={RedBackArrowIcon} />
            </TouchableOpacity>

            {Array.from({ length: 5 })?.map((mapitem: any, index: number) => {
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

            <TouchableOpacity
                onPress={rateVoteOptionFunc}
                // onPress={() =>
                //     isUserSubmittedOptionApprovedText(mapitem, currBallot)?.isApproved === true || isUserSubmittedOptionApprovedText(mapitem, currBallot)?.isApproved === null
                //         ? userRatesBallotOptionFunc(mapitem, 'vote', currBallot, starClickedIndex, day, event, usersPassLocks, setUsersPassLocks, setBallotOptionsStars)
                //         :
                //         // before modularizing!!
                //           // userRatesBallotOptionFunc(mapitem, "vote")
                //           userRatesBallotOptionFunc(mapitem, 'vote', currBallot, starClickedIndex, day, event, usersPassLocks, setUsersPassLocks, setBallotOptionsStars)
                // }
            >
                <Image style={styles.arrowIcons} source={GreenForwardArrowIcon} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    ballotOptionsStarsCont: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },
    starContIcons: {
        height: 25,
        width: 25,
    },
    arrowIcons: {
        marginLeft: 2,
        marginRight: 2,
        height: 25,
        width: 25,
    },
});

export default VoteSubmitStars;
