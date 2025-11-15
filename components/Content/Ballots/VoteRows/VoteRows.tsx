// useState:
import { useEffect, useState, useRef } from "react";

// redux
import { RootState } from "@/redux/store/rootReducer";
import { useSelector, useDispatch } from "react-redux";

//  <>
import {
  Dimensions,
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import ConsideringOption from "./ConsideringOption";
import VoteOptionText from "./VoteOptionText";
import VoteLikeBtnFire from "./VoteLikeBtnFire";
import VoteSubmitStars from "./VoteSubmitStars";
import VoteDisplay from "./VoteDisplay";
import VoteControls from "./VoteControls/VoteControls";
import LeaderboardTrophy from "./LeaderboardTrophy";
import ErrorSlippedUpBanana from "@/components/ErrorSlippedUpBanana";

// utils:
import { GhostIcon, StarIcon } from "@/constants/Images";
import { useContentFunction } from "@/Contexts/ContentFunctions";

interface VoteRowsProps {
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
  voteType: any;
}

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const VoteRows: React.FC<VoteRowsProps> = ({
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
  voteType,
}) => {
  const options = Array.isArray(currBallot?.options) && currBallot?.options;
  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );
  let userSubmittedOptionsIsApprovedArray =
    currBallot?.user_submitted_options_is_approved_array;
  let userSubmittedOptionsOk = currBallot?.user_submitted_options_ok;
  let hideWaitingApprovalVotes = currBallot?.hide_waiting_on_approval_votes;
  let needApprovalVotes = currBallot?.user_submitted_options_need_approval;

  const leaderboardStr = currBallot?.leaderboard_str;

  const [checkedBoxArray, setCheckedBoxArray] = useState<any>(
    Array.from({ length: currVotes?.length }).fill(false)
  );
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
  // const [didUserSubmit, setDidUserSubmit] = useState(false);
  const [error, setError] = useState<boolean>(false);

  const { userWentWithVoteOptionHeartToggler } = useContentFunction();

  useEffect(() => {
    console.log("currBallot in useEffect");
    if (currBallot?.decision?.length > 1) {
      console.log("yes ballot has a decision actively!");
      setShowVoteResultsNow(true);
    }
  }, []);

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

  const test = () => {
    console.log("ballotOptionsLikes", ballotOptionsLikes);
    console.log("currVotes", currVotes);
  };

  const isUserSubmittedOptionApprovedText = (mapitem: any, currBallot: any) => {
    // console.log('mapitem', mapitem);
    // let hideWaitingApprovalVotes = currBallot?.hide_waiting_on_approval_votes;

    // console.log('hideWaitingApprovalVotes', hideWaitingApprovalVotes)
    const userSubmittedOptionsUserArray =
      currBallot?.user_submitted_options_user_array;

    // console.log('userSubmittedOptionsUserArray', userSubmittedOptionsUserArray)
    let userSubmittedOptionsIsApprovedArray =
      currBallot?.user_submitted_options_is_approved_array;
    // console.log('userSubmittedOptionsIsApprovedArray', userSubmittedOptionsIsApprovedArray)

    let needApprovalVotes = currBallot?.user_submitted_options_need_approval;
    // console.log('mapitem', mapitem);

    // Check if the posting-user isn't hiding the votes

    // return null as in everything is treated as a normal vote.
    // console.log('userSubmittedOptionsUserArray', userSubmittedOptionsUserArray)

    if (
      currBallot?.user_submitted_options_need_approval === false &&
      currBallot?.hide_waiting_on_approval_votes === false
    ) {
      return null;
    }

    // Find the user-submitted option that matches the mapitem
    const foundOption =
      userSubmittedOptionsUserArray?.find((option: any) => {
        const [userId, vote] = option.split("-");
        return mapitem === vote; // Return the option if it matches mapitem
      }) || null;

    // console.log("were over here");
    if (foundOption) {
      // console.log('foundOption', foundOption);
      console.log(
        "userSubmittedOptionsUserArray",
        userSubmittedOptionsUserArray
      );

      const foundIndex = userSubmittedOptionsUserArray?.indexOf(foundOption);
      console.log("foundIndex", foundIndex);
      console.log(
        "userSubmittedOptionsUserArray",
        userSubmittedOptionsUserArray
      );

      console.log(
        "currBallot?.user_submitted_options_is_approved_array",
        currBallot?.user_submitted_options_is_approved_array
      );
      const isApproved = userSubmittedOptionsIsApprovedArray[foundIndex];
      console.log("isApproved", isApproved);

      if (isApproved === true) {
        // console.log(`[index] === true ]if block: isApproved: true`);
        // console.log('true block')
        return {
          userId: parseInt(foundOption.split("-")[0]),
          isApproved: true,
        };
      } else if (isApproved === false) {
        return {
          userId: parseInt(foundOption.split("-")[0]),
          isApproved: false,
        };
      } else {
        // this null returning else block  might never run. if it's boolean it's true or false it won't be null it'd only be null if foundOption doesn't exist we'd be in the bottom else block.
        return {
          userId: parseInt(foundOption.split("-")[0]),
          isApproved: null,
        };
      }
    } else {
      // no foundOption hence this is a regular vote not a proposed vote.
      return { userId: null, isApproved: null };
    }
  };

  const proposedVoteAndPostingUserProposingUserOrNotAProposedVoteFunc = (
    isSubmittedOptionApprovedAndCurrentUserIsPostingUser: boolean,
    isSubmittedOptionApprovedAndCurrentUserIsProposedVoteUser: boolean,
    isSubmittedOptionReturningNullMeaningNotAProposedVote: boolean
  ) => {
    return (
      isSubmittedOptionApprovedAndCurrentUserIsPostingUser ||
      isSubmittedOptionApprovedAndCurrentUserIsProposedVoteUser ||
      isSubmittedOptionReturningNullMeaningNotAProposedVote
    );
  };

  return (
    <View style={styles.cont}>
      {/* {!didCurrentUserVote && !didUserSubmit && currBallot?.user_submitted_options_ok && (
                <TextInputForVote
                    userSubmittedOptionsInputValueObj={userSubmittedOptionsInputValueObj}
                    currBallot={currBallot}
                    setDidUserSubmit={setDidUserSubmit}
                    didCurrentUserVote={didCurrentUserVote}
                    day={day}
                    setCurrDayBallot={setCurrDayBallot}
                />
            )} */}

      {Array.isArray(options) &&
        options?.map((mapitem: any, index: number) => {
          const isCheckedOrVoted =
            checkedBoxArray[index] ||
            myCurrentUserVote?.vote_string === mapitem;
          const isChecked = checkedBoxArray[index];
          const isCurrentUserVoted =
            myCurrentUserVote?.vote_string === mapitem &&
            myCurrentUserVote?.ballot_id === currBallot?.id;

          const isSubmittedOptionApproved = isUserSubmittedOptionApprovedText(
            mapitem,
            currBallot
          )?.isApproved;
          const submittedOptionUserId = isUserSubmittedOptionApprovedText(
            mapitem,
            currBallot
          )?.userId;

          const isSubmittedOptionApprovedAndCurrentUserIsPostingUser =
            isSubmittedOptionApproved === false &&
            day?.user_id === CURRENT_USER?.id;
          const isSubmittedOptionApprovedAndCurrentUserIsProposedVoteUser =
            isSubmittedOptionApproved === false &&
            submittedOptionUserId === CURRENT_USER?.id;
          const isSubmittedOptionReturningNullMeaningNotAProposedVote =
            isUserSubmittedOptionApprovedText(mapitem, currBallot)
              ?.isApproved === null;

          const proposedVoteAndPostingUserProposingUserOrNotAProposedVote =
            isSubmittedOptionApprovedAndCurrentUserIsPostingUser ||
            isSubmittedOptionApprovedAndCurrentUserIsProposedVoteUser ||
            isSubmittedOptionReturningNullMeaningNotAProposedVote;

          const noUserOptions = !userSubmittedOptionsOk;
          const noApprovalNeeded = userSubmittedOptionsOk && !needApprovalVotes;
          const approvalNeededButVisible =
            userSubmittedOptionsOk &&
            needApprovalVotes &&
            !hideWaitingApprovalVotes;

          const approvalNeededAndHiddenButAllowed =
            userSubmittedOptionsOk &&
            needApprovalVotes &&
            hideWaitingApprovalVotes &&
            (isSubmittedOptionApproved ||
              isSubmittedOptionApprovedAndCurrentUserIsPostingUser ||
              isSubmittedOptionApprovedAndCurrentUserIsProposedVoteUser ||
              isSubmittedOptionReturningNullMeaningNotAProposedVote);

          const shouldShow =
            noUserOptions ||
            noApprovalNeeded ||
            approvalNeededButVisible ||
            approvalNeededAndHiddenButAllowed;

          console.log("mapitem", mapitem);
          console.log("noUserOptions", noUserOptions);
          console.log("noApprovalNeeded", noApprovalNeeded);
          console.log("approvalNeededButVisible", approvalNeededButVisible);
          console.log(
            "approvalNeededAndHiddenButAllowed",
            approvalNeededAndHiddenButAllowed
          );
          console.log("shouldShow", shouldShow);

          const testMapitem = async (mapitem: any) => {
            console.log("currBallot", currBallot);
            console.log("myCurrentUserVote", myCurrentUserVote);
            console.log("isCurrentUserVoted", isCurrentUserVoted);

            console.log("userSubmittedOptionsOk", userSubmittedOptionsOk);
            console.log("hideWaitingApprovalVotes", hideWaitingApprovalVotes);
            console.log("needApprovalVotes", needApprovalVotes);

            // const check = await isUserSubmittedOptionApprovedText(mapitem, currBallot);
            // console.log('check', check);
            // console.log('currBallot', currBallot);
            // console.log('mapitem', mapitem);
          };

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

          return error === true ? (
            <ErrorSlippedUpBanana size="mini" setShowError={setError} />
          ) : (
            shouldShow && (
              <View key={`cont${index}`} style={styles.voteColumns}>
                {/* <ScrollView key={`cont${index}`} contentContainerStyle={styles.voteColumns} showsVerticalScrollIndicator={false}> */}
                {needApprovalVotes === true &&
                  // if hideApprovalVotes === true then check for isUserSubmittedOptionApproved() false = no. can't check for null because that's a posting-user-provided option. wouldn't show a ghost for that. if hideApprovalVotes === yes then only current user or the user that started that vote can see it.
                  ((hideWaitingApprovalVotes === true &&
                    isUserSubmittedOptionApprovedText(mapitem, currBallot)
                      ?.isApproved === false &&
                    (currBallot?.started_by_id === CURRENT_USER?.id ||
                      isSubmittedOptionApprovedAndCurrentUserIsProposedVoteUser)) ||
                    // still on needApprovalVotes === true. but if hideWaitingApprovalVotes === false && they haven't been approved yet (forgot that) Then show the ghosts. if isApproved === null then it's a regular voting option so has to be false. if it was true it'd be approved it'd be voteable.
                    (hideWaitingApprovalVotes === false &&
                      isUserSubmittedOptionApprovedText(mapitem, currBallot)
                        ?.isApproved === false)) && (
                    // || hideWaitingApprovalVotes === false)
                    <TouchableOpacity onPress={() => testMapitem(mapitem)}>
                      <Image style={styles.icon} source={GhostIcon} />
                    </TouchableOpacity>
                  )}

                {/* <TouchableOpacity onPress={() => testMapitem(mapitem)}>
                                    <Text> haay </Text>
                                </TouchableOpacity> */}

                {
                  //
                  (currBallot?.decision || currBallot?.custom_decision) &&
                    ((Array.isArray(leaderboardStr) &&
                      leaderboardStr.includes(mapitem)) ||
                      Array.isArray(currBallot?.leader)) && (
                      <LeaderboardTrophy
                        leaderboardStr={leaderboardStr}
                        mapitem={mapitem}
                        currBallot={currBallot}
                      />
                    )
                }

                {currBallot?.litlikelove_or_stars === "stars" &&
                starClickedOpenFiveStars === index &&
                !didUserRateTwoOptionsAlready ? (
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
                  <VoteOptionText
                    key={`text${index}`}
                    day={day}
                    event={null}
                    mapitem={mapitem}
                    currBallot={currBallot}
                    index={index}
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
                {/* // if user already liked two options no more liking. if hideWaitingApprovals is false then show it! */}

                {/* CURRENT_USER is okay to see the <LikeButton> whether anyone else is.  */}

                {
                  currBallot?.litlikelove_or_stars === "litLikeLove" &&
                    !didUserLikeTwoOptionsAlready &&
                    // first handle the case where user_submitted_options is not okay.
                    (!userSubmittedOptionsOk ||
                      // now the case of user_submitted_options being okay.
                      (userSubmittedOptionsOk &&
                        // now we evaluate whether need_approval_votes is false.
                        userSubmittedOptionsOk &&
                        // or if they do need approval when do we show ghosts or not to all-users or just CURR_USER-&-proposing-vote-user
                        // * * * * * WE MIGHT NEED TO HANDLE hideWaitingOnApprovalVotes:
                        needApprovalVotes === true &&
                        // this condition checks if approval is false and if the CURRENT_USER is the posting user. as far as I Know this doesn't handle proposing-vote-user.
                        //
                        // also handle hideWaitingApprovalVotes
                        // false ? then the proposed votes aren't hidden just show them.
                        (hideWaitingApprovalVotes === false ||
                          // if hide waiting approves votes is true then show based on:
                          (hideWaitingApprovalVotes === true &&
                            // * * * * * * proposedVoteAndPostingUserProposingUserOrNotAProposedVote (this is shorthand for): isSubmittedOptionApprovedAndCurrentUserIsPostingUser || isSubmittedOptionApprovedAndCurrentUserIsProposedVoteUser || tisSubmittedOptionReturningNullMeaningNotAProposedVote÷
                            // if submitted option is approved then show!
                            (isSubmittedOptionApproved ||
                              // show based on it being a proposed option and current user being posting user who made the vote so they can see and also delete
                              isSubmittedOptionApprovedAndCurrentUserIsPostingUser ||
                              // show based on it being a proposed opion but the curent user is the proposed user so they can see too.
                              isSubmittedOptionApprovedAndCurrentUserIsProposedVoteUser ||
                              // show based on .isapproved === null meaning it's not a proposed vote it's a ballot.options vote.
                              isSubmittedOptionReturningNullMeaningNotAProposedVote))) && (
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
                        )))
                  // )
                }

                {currBallot?.litlikelove_or_stars === "stars" &&
                  starClickedOpenFiveStars === null &&
                  // first handle the case where user_submitted_options is not okay.
                  (!userSubmittedOptionsOk ||
                    // now the case of user_submitted_options being okay.
                    (userSubmittedOptionsOk &&
                      // now we evaluate whether need_approval_votes is false.
                      (needApprovalVotes === false ||
                        // or if they do need approval when do we show ghosts or not to all-users or just CURR_USER-&-proposing-vote-user
                        (needApprovalVotes === true &&
                          // also handle hideWaitingApprovalVotes
                          (hideWaitingApprovalVotes === false ||
                            (hideWaitingApprovalVotes === true &&
                              (isSubmittedOptionApproved ||
                                isSubmittedOptionApprovedAndCurrentUserIsPostingUser ||
                                isSubmittedOptionApprovedAndCurrentUserIsProposedVoteUser ||
                                isSubmittedOptionReturningNullMeaningNotAProposedVote))))))) && (
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
                    setShowEngagementBallotOption={
                      setShowEngagementBallotOption
                    }
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

            // </View>
          );
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
    // overflow: 'auto',
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
});

export default VoteRows;
