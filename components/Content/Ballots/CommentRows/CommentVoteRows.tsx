// useState:
import { useState, useRef } from "react";

// redux
import { RootState } from "@/redux/store/rootReducer";
import { useSelector, useDispatch } from "react-redux";

//  <>
import {
  Dimensions,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import VoteLikeBtnFire from "../VoteRows/VoteLikeBtnFire";
import ConsideringOption from "../VoteRows/ConsideringOption";
import VoteOptionThought from "./VoteOptionThought";
import VoteSubmitStars from "../VoteRows/VoteSubmitStars";
import LeaderboardTrophy from "../VoteRows/LeaderboardTrophy";
import ErrorSlippedUpBanana from "@/components/ErrorSlippedUpBanana";
import VoteDisplay from "../VoteRows/VoteDisplay";
import VoteControls from "../VoteRows/VoteControls/VoteControls";

// utils:
import { StarIcon } from "@/constants/Images";

interface CommentVoteRowsProps {
  day: any;
  event: any;
  currBallot: any;
  almostDoneFinishingVote: any;
  setAlmostDoneFinishingVote: any;
  showEngagementBallotOption: any;
  setShowEngagementBallotOption: any;
  showVoteOutcomes: any;
  setShowVoteOutcomes: any;
  decision: any;
  setDecision: any;
  leaderboard: any;
  setLeaderboard: any;
  ballotBin: any;
  setBallotBin: any;
  ballotBinIndex: any;
  showVoteResultsNow: any;
  setShowVoteResultsNow: any;
  ballotOptionsLikes: any;
  setBallotOptionsLikes: any;
  ballotOptionsStars: any;
  setBallotOptionsStars: any;
  usersPassLocks: any;
  setUsersPassLocks: any;
  currVotes: any;
  setCurrVotes: any;
  comments: any;
  setComments: any;
  soundComments: any;
}

const CommentVoteRows: React.FC<CommentVoteRowsProps> = ({
  day,
  event,
  currBallot,
  almostDoneFinishingVote,
  setAlmostDoneFinishingVote,
  showEngagementBallotOption,
  setShowEngagementBallotOption,
  showVoteOutcomes,
  setShowVoteOutcomes,
  decision,
  setDecision,
  leaderboard,
  setLeaderboard,
  ballotBin,
  setBallotBin,
  ballotBinIndex,
  showVoteResultsNow,
  setShowVoteResultsNow,
  ballotOptionsLikes,
  setBallotOptionsLikes,
  ballotOptionsStars,
  setBallotOptionsStars,
  usersPassLocks,
  setUsersPassLocks,
  currVotes,
  setCurrVotes,
  comments,
  setComments,
  soundComments,
}) => {
  // const options = Array.isArray(currBallot?.options) && currBallot?.options;

  // local state:
  const [checkedBoxArray, setCheckedBoxArray] = useState<any>(
    Array.from({ length: currVotes?.length }).fill(false)
  );

  // global state:
  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );

  // var definitions:
  const leaderboardStr = currBallot?.leaderboard_str;
  const leaderboardInt = currBallot?.leaderboard_int;

  let hideWaitingApprovalVotes = currBallot?.hide_waiting_on_approval_votes;
  const userSubmittedOptionsOk = currBallot?.user_submitted_options_ok || null;
  const voteType = currBallot?.type;

  const myCurrentUserVote =
    (currVotes?.length &&
      currVotes?.find(
        (votes: any) =>
          votes?.user_id === CURRENT_USER?.id &&
          votes?.ballot_id === ballotBin[ballotBinIndex]?.id
      )) ||
    null;

  const didCurrentUserVote =
    (currVotes?.length &&
      currVotes?.some(
        (votes: any) =>
          votes?.user_id === CURRENT_USER?.id &&
          votes?.ballot_id === ballotBin[ballotBinIndex]?.id
      )) ||
    null;

  const [voteFinished, setVoteFinished] = useState(false);
  const [didUserSubmit, setDidUserSubmit] = useState(false);
  const [error, setError] = useState<boolean>(false);

  // const { userWentWithVoteOptionHeartToggler } = useContentFunction();

  // starsClicked:
  const [starClickedOpenFiveStars, setStarClickedOpenFiveStars] = useState<
    number | null
  >(null);
  const [starClickedIndex, setStarClickedIndex] = useState(0);

  const didUserLikeTwoOptionsAlready =
    ballotOptionsLikes?.reduce((count: any, likes: any) => {
      if (
        likes?.liked_by_id === CURRENT_USER?.id &&
        likes?.day_id === day?.id &&
        likes?.ballot_id === currBallot?.id
      ) {
        count++;
      }
      return count;
    }, 0) >= 2;

  const didUserRateTwoOptionsAlready =
    ballotOptionsStars?.reduce((count: any, stars: any) => {
      if (
        stars?.user_id === CURRENT_USER?.id &&
        stars?.day_id === day?.id &&
        stars?.ballot_id === currBallot?.id
      ) {
        count++;
      }
      return count;
    }, 0) >= 2;

  const openStarCont = (index: number) => {
    console.log("index", index);
    setStarClickedOpenFiveStars(index);
  };

  // const userWentWithVoteOptionHeartTogglerFunc = async () => {
  //     // userWentToTheMall:
  //     await userWentWithVoteOptionHeartToggler(
  //         day?.id,
  //         event?.id,
  //         currBallot?.id,
  //         currBallot?.user_went_with_vote_update,
  //         setBallotBin,
  //         setCurrVotes,
  //         setBallotOptionsLikes,
  //         setBallotOptionsStars,
  //     );
  // };

  return (
    <View style={styles.cont}>
      {/* <TouchableOpacity onPress={test}>
                <Text> ayoo </Text>
            </TouchableOpacity> */}

      {comments?.map((mapitem: any, index: number) => {
        const isCheckedOrVoted =
          checkedBoxArray[index] || myCurrentUserVote?.vote_string === mapitem;
        const isChecked = checkedBoxArray[index];
        const isCurrentUserVoted =
          (myCurrentUserVote?.vote_string === mapitem ||
            myCurrentUserVote?.vote_int === mapitem?.id) &&
          myCurrentUserVote?.ballot_id === currBallot?.id;

        const myStarsCount =
          (Array.isArray(ballotOptionsStars) &&
            ballotOptionsStars?.filter(
              (stars: any) =>
                stars?.ballot_id === currBallot?.id &&
                stars?.user_id === CURRENT_USER?.id
            )?.length) ||
          0;
        const doesUserRateOptionAlready =
          (Array.isArray(ballotOptionsStars) &&
            ballotOptionsStars?.some(
              (stars: any) =>
                stars?.ballot_id === currBallot?.id &&
                stars?.user_id === CURRENT_USER?.id &&
                stars?.ballot_options_text === mapitem
            )) ||
          null;

        const test = () => {
          console.log("showEngagementBallotOption", showEngagementBallotOption);
        };

        return error === true ? (
          <ErrorSlippedUpBanana size="mini" setShowError={setError} />
        ) : (
          // if the comment is the VCB: "vote comment bucket", the comment specifically set for replies on the votes
          mapitem && mapitem?.thought !== "vcb-besties" && (
            // !mapitem.thought?.includes('vcb-') &&
            <View key={`cont${index}`} style={styles.voteColumns}>
              {Array.isArray(leaderboardInt) &&
                leaderboardInt?.includes(mapitem?.id) &&
                (currBallot?.decision || currBallot?.custom_decision) && (
                  // {Array.isArray(leaderboardInt) && leaderboardInt?.includes(mapitem?.id?.toString()) && (currBallot?.decision || currBallot?.custom_decision) && (
                  <LeaderboardTrophy
                    leaderboardStr={leaderboardStr}
                    mapitem={mapitem}
                    currBallot={currBallot}
                  />
                )}

              {currBallot?.litlikelove_or_stars === "stars" &&
              starClickedOpenFiveStars === index ? (
                <VoteSubmitStars
                  currBallot={currBallot}
                  mapitem={mapitem}
                  index={index}
                  setStarClickedOpenFiveStars={setStarClickedOpenFiveStars}
                  starClickedIndex={starClickedIndex}
                  setStarClickedIndex={setStarClickedIndex}
                  day={day}
                  event={null}
                  ballotOptionsStars={ballotOptionsStars}
                  setBallotOptionsStars={setBallotOptionsStars}
                  usersPassLocks={usersPassLocks}
                  setUsersPassLocks={setUsersPassLocks}
                />
              ) : (
                <VoteOptionThought
                  mapitem={mapitem}
                  currBallot={currBallot}
                  index={index}
                  soundComments={soundComments}
                  day={day}
                  usersPassLocks={usersPassLocks}
                />
              )}

              {
                // to show before the vote that user was already thiking about this option. could also be locked away
                currBallot?.user_already_considering_option === index && (
                  <ConsideringOption
                    usersPassLocks={usersPassLocks}
                    day={day}
                    currBallot={currBallot}
                  />
                )
              }

              <TouchableOpacity onPress={test}> test </TouchableOpacity>

              {currBallot?.litlikelove_or_stars === "litLikeLove" &&
                // if user already liked two options no more liking. if hideWaitingApprovals is false then show it!
                !didUserLikeTwoOptionsAlready &&
                (hideWaitingApprovalVotes === false ||
                  hideWaitingApprovalVotes === null) && (
                  <VoteLikeBtnFire
                    key={`like${index}`}
                    mapitem={mapitem}
                    index={index}
                    currBallot={currBallot}
                    ballotOptionsLikes={ballotOptionsLikes}
                    day={day}
                    event={event}
                    setBallotOptionsLikes={setBallotOptionsLikes}
                    usersPassLocks={usersPassLocks}
                    setUsersPassLocks={setUsersPassLocks}
                  />
                )}

              {currBallot?.litlikelove_or_stars === "stars" &&
                starClickedOpenFiveStars === null &&
                !didUserRateTwoOptionsAlready && (
                  <TouchableOpacity
                    style={[
                      {
                        display: doesUserRateOptionAlready ? "none" : "flex",
                        opacity: myStarsCount === 1 ? 0.5 : 1.0,
                      },
                    ]}
                    onPress={() => openStarCont(index)}
                  >
                    <Image style={styles.icon} source={StarIcon} />
                  </TouchableOpacity>
                )}

              {/* below, user_already_considering_option would already check for {ballot.decision || ballot.custom_decision || ballot.leaderboard_str} */}
              {
                // currBallot?.user_alredy_considering_option && leaderboardStr?.length > 1 && leaderboardStr[0] === mapitem && (
                //     <Image style={styles.icon} source={HeartIcon} />
                // )
              }

              {
                // show Votes container
                showVoteResultsNow && (
                  <VoteDisplay
                    index={index}
                    mapitem={mapitem}
                    voteType={voteType}
                    currVotes={currVotes}
                  />
                )
              }

              {
                <VoteControls
                  isCheckedOrVoted={isCheckedOrVoted}
                  isCurrentUserVoted={isCurrentUserVoted}
                  mapitem={mapitem}
                  index={index}
                  currBallot={currBallot}
                  checkedBoxArray={checkedBoxArray}
                  setCheckedBoxArray={setCheckedBoxArray}
                  voteFinished={voteFinished}
                  setVoteFinished={setVoteFinished}
                  didCurrentUserVote={didCurrentUserVote}
                  myCurrentUserVote={myCurrentUserVote}
                  showEngagementBallotOption={showEngagementBallotOption}
                  setShowEngagementBallotOption={setShowEngagementBallotOption}
                  voteType={voteType}
                  day={day}
                  currVotes={currVotes}
                  setCurrVotes={setCurrVotes}
                  usersPassLocks={usersPassLocks}
                  setUsersPassLocks={setUsersPassLocks}
                  ballotBin={ballotBin}
                  setBallotBin={setBallotBin}
                  setError={setError}
                  userSubmittedOptionsOk={userSubmittedOptionsOk}
                />
              }
            </View>
          )
        );
        // error === true
        //         ?
        //                             <ErrorSlippedUpBanana size="mini" setShowError={setError} />
        //                             :
        //                             <View key={`cont${index}`} style={styles.voteColumns}>
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  cont: {
    flexDirection: "column",
    width: "100%",
    gap: 10,
    marginTop: 10,
  },
  voteColumns: {
    width: "100%",
    // width: screenWidth / 1.5,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 5,
    gap: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 2,
    borderStyle: "dotted",
  },
  text: {
    fontFamily: "Fuzzy Bubbles",
    fontSize: 18,
  },
  icon: {
    height: 35,
    width: 35,
  },
  iconMini: {
    height: 15,
    width: 15,
  },
});

export default CommentVoteRows;

// text vote first.
