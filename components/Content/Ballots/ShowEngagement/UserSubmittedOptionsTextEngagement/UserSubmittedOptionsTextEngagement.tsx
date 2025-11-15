// top level:
import { useState, useEffect } from "react";

// redux
import { RootState } from "@/redux/store/rootReducer";
import { useSelector, useDispatch } from "react-redux";

//  <>
import {
  Platform,
  Dimensions,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import SubmittedOptionsUserArrayLikes from "./SubmittedOptionsUserArrayLikes";
import SubmittedOptionsUserArrayStars from "./SubmittedOptionsUserArrayStars";

// utils:
import { useContentFunction } from "@/Contexts/ContentFunctions";
import {
  RedBackArrowIcon,
  GhostIcon,
  firstPlace,
  secondPlace,
  thirdPlace,
  fourthPlaceNoiseMaker,
  SoundIcon,
  LitFireIcon,
  StarIcon,
} from "@/constants/Images";

interface props {
  currBallot: any;
  clickedOption: any;
  showEngagementBallotOption: any;
  setShowEngagementBallotOption: any;
  clickedOptionIsUnApprovedVote: any;
  unApprovedVoteItem: any;
  unApprovedVoteIndex: any;
  day: any;
  ballotOptionsStars: any;
  ballotOptionsLikes: any;
  allUserProfileIcons: any;
}

const UserSubmittedOptionsTextEngagement: React.FC<props> = ({
  currBallot,
  clickedOption,
  showEngagementBallotOption,
  setShowEngagementBallotOption,
  clickedOptionIsUnApprovedVote,
  unApprovedVoteItem,
  unApprovedVoteIndex,
  day,
  ballotOptionsStars,
  ballotOptionsLikes,
  allUserProfileIcons,
}) => {
  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );
  const { isUserSubmittedOptionApprovedText } = useContentFunction();

  const leaderboardStr = currBallot?.leaderboard_str;
  let hideWaitingApprovalVotes = currBallot?.hide_waiting_on_approval_votes;
  let needApprovalVotes = currBallot?.user_submitted_options_need_approval;

  const hideWaitingOnApprovalVotesAndVoteNotApprovedOrCurrentUserIsPostingUser =
    hideWaitingApprovalVotes === true &&
    isUserSubmittedOptionApprovedText(clickedOption, currBallot)?.isApproved ===
      false &&
    (day?.user_id === CURRENT_USER?.id ||
      isUserSubmittedOptionApprovedText(clickedOption?.key?.Key, currBallot)
        ?.userId === CURRENT_USER?.id);
  const dontHideWaitingOnApprovalVotesAndVoteNotApproved =
    hideWaitingApprovalVotes === false &&
    isUserSubmittedOptionApprovedText(clickedOption?.key?.Key, currBallot)
      ?.isApproved === false;

  const goBackToVoteRows = () => {
    setShowEngagementBallotOption(null);
  };

  return (
    <View style={styles.showEngagementColumn}>
      <View style={styles.voteColumns}>
        <View style={styles.voteColumns}>
          <TouchableOpacity onPress={goBackToVoteRows}>
            <Image style={styles.icon} source={RedBackArrowIcon} />
          </TouchableOpacity>

          {
            // hideWaitingApprovalVotes === true and only postingUser can see it. otherwise everyone can.

            // !voteIsDone &&
            needApprovalVotes === true &&
              // if hideApprovalVotes === true then check for isUserSubmittedOptionApproved() false = no. can't check for null because that's a posting-user-provided option. wouldn't show a ghost for that. if hideApprovalVotes === yes then only current user or the user that started that vote can see it.

              (hideWaitingOnApprovalVotesAndVoteNotApprovedOrCurrentUserIsPostingUser || // hideWaitingApprovalVotes === true && (isUserSubmittedOptionApproved(clickedOption)?.isApproved === false && (CURR_DAY?.user_id === CURRENT_USER?.id || isUserSubmittedOptionApproved(clickedOption)?.userId === CURRENT_USER?.id))
                // still on needApprovalVotes === true. but if hideWaitingApprovalVotes === false && they haven't been approved yet (forgot that) Then show the ghosts.
                dontHideWaitingOnApprovalVotesAndVoteNotApproved) && ( // hideWaitingApprovalVotes === false && (isUserSubmittedOptionApproved(clickedOption)?.isApproved === false)
                // || hideWaitingApprovalVotes === false)
                <Image style={styles.icon} source={GhostIcon} />
              )
          }

          {leaderboardStr.includes(clickedOption) &&
            (currBallot?.decision || currBallot?.custom_decision) && (
              <Image
                style={styles.icon}
                source={
                  leaderboardStr[0] === clickedOption
                    ? firstPlace
                    : leaderboardStr[1] === clickedOption
                    ? secondPlace
                    : leaderboardStr[2] === clickedOption
                    ? thirdPlace
                    : fourthPlaceNoiseMaker
                }
              />
            )}

          <Text
            style={[
              styles.voteLengthText,
              {
                color:
                  needApprovalVotes === true &&
                  (hideWaitingOnApprovalVotesAndVoteNotApprovedOrCurrentUserIsPostingUser ||
                    dontHideWaitingOnApprovalVotesAndVoteNotApproved)
                    ? "silver"
                    : "",
              },
            ]}
          >
            {clickedOption}
          </Text>

          {(currBallot?.litlikelove_or_stars !== null ||
            currBallot?.litlikelove_or_stars !== undefined) && (
            <Image
              id={
                currBallot?.litlikelove_or_stars === "litLikeLove"
                  ? "like"
                  : currBallot?.litlikelove_or_stars === "star"
                  ? StarIcon
                  : ""
              }
              // onClick={(event) => likeOrStarsClick(event)}
              style={styles.icon}
              source={
                currBallot?.litlikelove_or_stars === "litLikeLove"
                  ? LitFireIcon
                  : currBallot?.litlikelove_or_stars === "stars"
                  ? StarIcon
                  : ""
              }
            />
          )}
        </View>
      </View>

      {currBallot?.litlikelove_or_stars === "stars" && (
        // stars from posting-user options or for user-submitted-options.
        <SubmittedOptionsUserArrayStars
          currBallot={currBallot}
          clickedOption={clickedOption}
          showEngagementBallotOption={showEngagementBallotOption}
          setShowEngagementBallotOption={setShowEngagementBallotOption}
          clickedOptionIsUnApprovedVote={clickedOptionIsUnApprovedVote}
          unApprovedVoteIndex={unApprovedVoteIndex}
          day={day}
          ballotOptionsStars={ballotOptionsStars}
          allUserProfileIcons={allUserProfileIcons}
        />
      )}

      {currBallot?.litlikelove_or_stars === "litLikeLove" && (
        <SubmittedOptionsUserArrayLikes
          currBallot={currBallot}
          clickedOption={clickedOption}
          showEngagementBallotOption={showEngagementBallotOption}
          setShowEngagementBallotOption={setShowEngagementBallotOption}
          clickedOptionIsUnApprovedVote={clickedOptionIsUnApprovedVote}
          unApprovedVoteItem={unApprovedVoteItem}
          unApprovedVoteIndex={unApprovedVoteIndex}
          day={day}
          ballotOptionsLikes={ballotOptionsLikes}
          allUserProfileIcons={allUserProfileIcons}
        />
      )}

      {/* currBallot?.litlikelove_or_stars === "litLikeLove" && */}
    </View>
  );
};

const styles = StyleSheet.create({
  voteColumns: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  showEngagementColumn: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  userSubmittedOptionShowEngagementCont: {
    flexDirection: "column",
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    height: 25,
    width: 25,
  },
  mediaOptionImg: {},
  starContIcons: {
    height: 25,
    width: 25,
  },
  ballotOptionStarsCont: {},
  voteLengthText: {
    fontFamily: "Fuzzy Bubbles",
    fontSize: 20,
    fontWeight: 400,
  },
});

export default UserSubmittedOptionsTextEngagement;
