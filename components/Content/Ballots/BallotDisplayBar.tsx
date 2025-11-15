import { useEffect, useState } from "react";

//  <>
import {
  Dimensions,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

// redux
import { RootState } from "@/redux/store/rootReducer";
import { useSelector, useDispatch } from "react-redux";

import TextInputProposedVote from "./VoteRows/TextInputProposedVote";

// utils:
import {
  BallotIcon,
  HeartIcon,
  FinishFlagsIcon,
  EyesIcon,
  EyeIcon,
} from "@/constants/Images";
import { grayphite } from "@/constants/Colors";
import { useContentFunction } from "@/Contexts/ContentFunctions";
import {
  specifyStringTruncate,
  nothingWithDummyParams,
} from "@/utility/utilityValues";

interface BallotDisplayBarProps {
  day: any;
  feed: any;
  setFeed: any;
  ballotBin: any;
  setBallotBin: any;
  ballotBinIndex: any;
  ballotsMediaBlobs: any;
  setBallotBinIndex: any;
  currVotes: any;
  setCurrVotes: any;
  ballotOptionsLikes: any;
  setBallotOptionsLikes: any;
  ballotOptionsStars: any;
  setBallotOptionsStars: any;
  usersPassLocks: any;
  setUsersPassLocks: any;
  showVoteResultsNow: any;
  setShowVoteResultsNow: any;
  setShowVoteInfo: any;
  voteType: any;
  decision: any;
  setDecision: any;
  leaderboard: any;
  setLeaderboard: any;
  setAlmostDoneFinishingVote: any;
  userSubmittedOptionsInputValue: any;
  setUserSubmittedOptionsInputValue: any;
  didUserSubmit: any;
  displayAddMediaMenu: any;
  setDisplayAddMediaMenu: any;
  setDidUserSubmit: any;
  comments: any;
  // do we need setComments for is_pinned vote?
  setComments: any;
  setCurrDaySelection: any;
}

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const BallotDisplayBar: React.FC<BallotDisplayBarProps> = ({
  day,
  feed,
  setFeed,
  ballotBin,
  setBallotBin,
  ballotBinIndex,
  ballotsMediaBlobs,
  setBallotBinIndex,
  currVotes,
  setCurrVotes,
  ballotOptionsLikes,
  setBallotOptionsLikes,
  ballotOptionsStars,
  setBallotOptionsStars,
  usersPassLocks,
  setUsersPassLocks,
  showVoteResultsNow,
  setShowVoteResultsNow,
  setShowVoteInfo,
  voteType,

  decision,
  setDecision,
  leaderboard,
  setLeaderboard,
  setAlmostDoneFinishingVote,
  userSubmittedOptionsInputValue,
  setUserSubmittedOptionsInputValue,
  didUserSubmit,
  setDidUserSubmit,
  displayAddMediaMenu,
  setDisplayAddMediaMenu,
  comments,
  setComments,
  setCurrDaySelection,
}) => {
  const {
    finishVoteAndUpdateBallotFunc,
    finishJoinDayVote,
    submitJoinDayWriteContentAndUpdateBallotFunc,
    finishCommentVoteAndUpdateBallotFunc,
  } = useContentFunction();

  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );

  const currBallot: any = ballotBin[ballotBinIndex] || null;
  const didCurrentUserVote =
    (currVotes?.length &&
      currVotes?.some(
        (votes: any) =>
          votes?.user_id === CURRENT_USER?.id &&
          votes?.ballot_id === ballotBin[ballotBinIndex]?.id
      )) ||
    null;
  const ballotUserId = currBallot?.user_id || null;

  useEffect(() => {
    // 🚨 🚨 ballot updating function which is originally fired from <CustomMsgAndUsersNew/> but fires from here this time instead.
  }, [decision]);

  const showVoteFunc = () => {
    setShowVoteInfo(true);
  };

  const showResultsNowClick = () => {
    setShowVoteResultsNow(!showVoteResultsNow);
  };

  // basically every non comment vote since the coments are tracked with {t.vote.vote_int} which is the {t.thought.id}
  const finishNonCommentVoteStringFunc = (
    ballotVotes: any,
    decision: any,
    setDecision: any,
    leaderboard: any,
    setLeaderboard: any,
    currBallot: any,
    setAlmostDoneFinishingVote: any,
    day: any
  ) => {
    const filteredVotes: any[] =
      ballotVotes?.filter(
        (vote: any) =>
          vote?.ballot_id === currBallot?.id && vote?.day_id === day?.id
      ) || null;
    if (!filteredVotes || filteredVotes?.length < 1) {
      return;
    }

    //    type VoteCounts because of chatGPT magic below there are typed keys.
    type VoteCounts = { [key: string]: number };

    console.log("filteredVotes", filteredVotes);

    const voteCounts: VoteCounts =
      filteredVotes.reduce((acc, vote) => {
        acc[vote?.vote_string] = (acc[vote?.vote_string] || 0) + 1;
        return acc;
      }, {} as VoteCounts) || null; // Ensure acc is typed correctly

    if (!voteCounts) {
      return;
    }

    const mostFrequentVote = Object?.keys(voteCounts)?.reduce((a, b) => {
      return voteCounts[a] > voteCounts[b] ? a : b;
    });

    const mostFrequentVoteValue = voteCounts[mostFrequentVote];

    const remainingVoteCounts: VoteCounts = { ...voteCounts };
    delete remainingVoteCounts[mostFrequentVote]; // No need to convert key to number

    // Get remaining votes & sort them by count in descending order
    const sortedVotes = Object.entries(remainingVoteCounts)?.sort(
      ([aKey, aValue], [bKey, bValue]) =>
        (bValue as number) - (aValue as number)
    );

    //    * * * * * * reminder devnotes! this decision will factor any possible
    const decisionString: string = `${mostFrequentVote} wins with ${mostFrequentVoteValue} votes!`;
    console.log("decisionString", decisionString);

    // Ensure the correct extraction and parsing of the vote options
    const followingThreeRunnerUps = sortedVotes
      ?.slice(0, 3)
      ?.map(([voteString]) => voteString); // Remove parseInt if not necessary
    const leaderboardData = [mostFrequentVote, ...followingThreeRunnerUps];
    setDecision(decisionString.trim());
    setLeaderboard(leaderboardData);

    console.log("leaderboardData", leaderboardData);
    console.log("decision", decision);

    // almostDoneFinishingVote displays <AllVotesCustomMsgAndUsersNew/> and allows posting user to create custom notification for vote end or to select a user to do that
    setAlmostDoneFinishingVote(true);

    finishVoteAndUpdateBallotFunc(
      decisionString?.trim(),
      leaderboardData,
      "vote is over",
      "plain",
      day,
      ballotBin,
      currBallot,
      setBallotBin,
      null,
      usersPassLocks,
      setUsersPassLocks,
      currVotes,
      null,
      setCurrVotes,
      setBallotOptionsLikes,
      setBallotOptionsStars
    );
    // decision: any, leaderboard: any, voteOutcomesMsg: any, plainOrCustom: string, day: any, ballotBin: any, currBallot: any, setBallotBin: any, event: any,
    // usersPassLocks: any, setUsersPassLocks: any, votes: any, setCurrWinningVotes: any,
    // setCurrVotes:any, setBallotOptionsLikes:any, setBallotOptionsStars:any

    return;
  };

  const finishCommentVoteIntFunc = (
    setDecision: any,
    setLeaderboard: any,
    setAlmostDoneFinishingVote: any,
    currBallot: any,
    comments: any,
    votes: any
  ) => {
    // if (currBallot?.decision || currBallot?.is_active === false || (CURRENT_USER?.id !== CURR_DAY?.id)) {
    //     return;
    // }
    console.log("votes", votes);
    // * * * * * reminder devnotes: notification send to all commentors and voters for vote ending! * * * * * * * * * * * * * *

    // not doing interface right now .reduce() not available don't feel like setting up helper functions too far behind on time.
    const filteredVotes: {
      id: number;
      user_id: number;
      day_id: number;
      vote_int: number;
      ballot_id: number;
    }[] =
      votes?.filter((vote: any) => vote?.ballot_id === currBallot?.id) || [];

    console.log("filteredVote", filteredVotes);

    if (!filteredVotes) {
      return null;
    }

    console.log("filteredVotes", filteredVotes);
    // const filteredVotes: { id: number, user_id: number, day_id: number, vote_int: number, ballot_id: number }[] = CURR_DAY_VOTES.filter(vote => vote?.ballot_id === CURR_DAY_BALLOT[CURR_DAY_BALLOT_BIN_INDEX]?.id);

    // Count occurrences of each vote_int
    const voteCounts = filteredVotes?.reduce((acc, vote) => {
      acc[vote?.vote_int] = (acc[vote?.vote_int] || 0) + 1;
      return acc;
    }, {} as { [key: number]: number }); // Explicitly typing as an object with number keys and values

    console.log("voteCounts", voteCounts);

    // Find the most frequent vote (winner)
    const mostFrequentVote = Object.keys(voteCounts)?.reduce((a, b) => {
      return voteCounts[+a] > voteCounts[+b] ? a : b; // Convert keys to numbers for comparison
    });
    console.log("mostFrequentVote", mostFrequentVote);

    // Remove the most frequent vote from the counts
    const remainingVoteCounts = { ...voteCounts };
    delete remainingVoteCounts[+mostFrequentVote]; // Convert key to number for correct removal

    // Get remaining votes and sort them by count in descending order
    const sortedVotes = Object?.entries(remainingVoteCounts)?.sort(
      ([aKey, aValue], [bKey, bValue]) => bValue - aValue
    );

    // Extract the top 3 runner-ups
    const followingThreeRunnerUps = sortedVotes
      ?.slice(0, 3)
      ?.map(([voteInt]) => parseInt(voteInt));

    const howManyVotes = filteredVotes?.filter(
      (comment) => comment?.id === parseInt(mostFrequentVote)
    );
    console.log("howManyVotes", howManyVotes);
    // const howManyVotes = comments?.filter(comment => comment?.id === )

    const winningVoteThought = comments?.find(
      (comments: any) => comments?.id === parseInt(mostFrequentVote)
    );
    // const winningVoteThought = CURR_DAY_COMMENTS.find(comments => comments?.id === parseInt(mostFrequentVote))
    console.log("winningVoteThought", winningVoteThought);
    const winningThought: string = winningVoteThought?.thought;

    let prepareWinningThoughtForDecision = specifyStringTruncate(
      winningThought,
      20
    );

    // const decision:string = winningVoteThought?.username + prepareWinningThoughtForDecision + with ${mostFrequentVote} votes`
    const decisionText: string = `${winningThought} wins with ${mostFrequentVote} votes`;

    setDecision(decisionText);
    // * * * * * vote_int is thought.id () =>  so the initial test data returns [5, 4, 6, null] // { 5: "pretty cool man" } { 4: "kinda lame", 6: "ur the lame..." } // so check for mapitem?.id during the <ShowEngagement/> to get the mapitem.thought which is the winner/currentItem
    const leaderboardArray: any[] = [
      parseInt(mostFrequentVote),
      followingThreeRunnerUps[0] || null,
      followingThreeRunnerUps[1] || null,
      followingThreeRunnerUps[2] || null,
    ];
    setLeaderboard(leaderboardArray);

    // set to true to display <CustomMsgAndUsers/> instead of <BestComments/>

    setAlmostDoneFinishingVote(true);

    // 🚨 🚨 ballot updating function which is originally fired from <CustomMsgAndUsersNew/> but fires from here this time instead.

    return { decision: decisionText, leaderboard: leaderboardArray };
  };

  const finishFlagsClick = async () => {
    if (CURRENT_USER?.id !== currBallot?.started_by_id) {
      return;
    }

    // console.log('voteType', voteType)
    // return;

    const ballotIsDone =
      (Array.isArray(currBallot?.decision) && currBallot?.decision?.length) ||
      (Array.isArray(currBallot?.leaderboard_str) &&
        currBallot?.leaderboard_str?.length) ||
      (Array.isArray(currBallot?.leaderboard_int) &&
        currBallot?.leaderboard_int?.length);
    if (ballotIsDone) {
      return null;
    }
    if (!currBallot?.decision) {
      // if (ballotUserId === CURRENT_USER?.id && !currBallot?.decision) {

      // 🚨 comments: null -> /Comments will be it's own ballots folder so won't handle comments here.
      // finishCommentVoteIntFunc(setDecision, setLeaderboard, setAlmostDoneFinishingVote, currBallot, null, currVotes)
      if (voteType === "custom better media") {
      } else if (voteType.includes("comment")) {
        // return decision as updatedDecision & leaderboard as updatedLeaderboard and use those as props:
        // const { decision: updatedDecision, leaderboard: updatedLeaderboard } = await finishJoinDayVote(
        // finishCommentVoteIntFunc = (setDecision: any, setLeaderboard: any, setAlmostDoneFinishingVote: any, currBallot: any, comments: any, votes: any) => {

        const result = await finishCommentVoteIntFunc(
          setDecision,
          setLeaderboard,
          setAlmostDoneFinishingVote,
          currBallot,
          comments,
          currVotes
        );
        console.log("result", result);

        if (result) {
          const { decision: updatedDecision, leaderboard: updatedLeaderboard } =
            result;
          // updateBestCommentDecision
          console.log("decision right here", decision);
          console.log("leaderboard right here too!", leaderboard);

          // DATA which comes back like this in case it's a pinned comment to update state: let returnObject: any = { updatedComment: null, ballots: null };
          const data = await finishCommentVoteAndUpdateBallotFunc(
            result.decision,
            result.leaderboard,
            decision,
            "",
            day,
            ballotBin,
            currBallot,
            setBallotBin,
            null,
            usersPassLocks,
            setUsersPassLocks,
            currVotes,
            nothingWithDummyParams,
            setCurrVotes,
            setBallotOptionsLikes,
            setBallotOptionsStars
          );
          console.log("data", data);
          // do something with them
        }

        //I think comment votes get updated the same way it's the {t.votes} that go by vote_int the {ballot.decision} {b.leaderboard} I think are the same.
      } else {
        if (voteType.includes("joinday")) {
          const bothFunctions = async () => {
            // 1)  define an objeft with finishJoinDayVote's return value: return { decision: decisionString, leaderboard: leaderboardData } 2) use those return values
            // this is done to overcome the fact that {decision, leaderboard} are not updated by the time submitJoinDayWriteContent() invokes.
            const {
              decision: updatedDecision,
              leaderboard: updatedLeaderboard,
            } = await finishJoinDayVote(
              currBallot,
              setLeaderboard,
              setDecision,
              setAlmostDoneFinishingVote,
              ballotIsDone,
              day,
              currVotes
            );

            console.log("leaderboard", updatedLeaderboard);

            // Pass the values directly — React state doesn't need to update first
            await submitJoinDayWriteContentAndUpdateBallotFunc(
              ballotsMediaBlobs,
              feed,
              setFeed,
              currBallot,
              updatedDecision,
              updatedLeaderboard, // ← guaranteed latest leaderboard
              updatedDecision,
              setAlmostDoneFinishingVote,
              day,
              usersPassLocks,
              setUsersPassLocks,
              currVotes
            );
          };

          bothFunctions();

          // const finishJoinDayVote = (currBallot:any, setLeaderboard:any, setDecision:any, setAlmostDoneFinishingVote:any, ballotIsDone:any, day:any, votes:any) => {
        } else {
          finishNonCommentVoteStringFunc(
            currVotes,
            decision,
            setDecision,
            leaderboard,
            setLeaderboard,
            currBallot,
            setAlmostDoneFinishingVote,
            day
          );
        }
      }
    } else {
      console.log("ayoo hoose");
    }
  };

  const test = () => {
    console.log("currBallot", currBallot);
  };

  const displayAddMediaMenuToggler = () => {
    setDisplayAddMediaMenu(!displayAddMediaMenu);
  };

  const backOutOfVotes = () => {
    // ⚠️ ⚠️ ⚠️ setCurrDaySelection(prevDaySelection)

    const partOfPost = day?.thoughts?.some((th: any) => th?.thoughts?.length)
      ? "thoughts"
      : day?.moments?.id
      ? "moments"
      : day?.fields?.id
      ? "greatfullagain"
      : day?.thoughts?.some((th: any) => th?.thought?.length) && "comments";

    setCurrDaySelection(partOfPost);
  };

  return (
    <View style={styles.displayCont}>
      <TouchableOpacity onPress={backOutOfVotes}>
        <Image source={BallotIcon} style={styles.icon} />
      </TouchableOpacity>

      {userSubmittedOptionsInputValue?.length < 1 && (
        <TouchableOpacity onPress={showVoteFunc}>
          <Text style={styles.text}> &darr; </Text>
        </TouchableOpacity>
      )}

      {/* 🚨 🚨 HeartIcon is now in the rows not in the <Image source={HeartIcon} style={styles.icon} /> */}

      {currBallot?.user_submitted_options_ok &&
        // is_media_vote?
        (currBallot?.is_media_vote
          ? !(currBallot?.decision && !didUserSubmit) && (
              <TouchableOpacity
                style={styles.addCommentPlusInput}
                onPress={displayAddMediaMenuToggler}
              >
                <Text style={styles.addCommentInputText}> </Text>
              </TouchableOpacity>
            )
          : !currBallot?.decision &&
            !didUserSubmit && (
              <TextInputProposedVote
                userSubmittedOptionsInputValue={userSubmittedOptionsInputValue}
                setUserSubmittedOptionsInputValue={
                  setUserSubmittedOptionsInputValue
                }
                currBallot={currBallot}
                setDidUserSubmit={setDidUserSubmit}
                didCurrentUserVote={didCurrentUserVote}
                day={day}
                setBallotBin={setBallotBin}
              />
            ))}

      {currBallot?.user_went_with_vote_update &&
        userSubmittedOptionsInputValue?.length < 1 && (
          <TouchableOpacity onPress={showResultsNowClick}>
            <Image source={HeartIcon} style={styles.iconMini} />
          </TouchableOpacity>
        )}

      {/* <TouchableOpacity onPress={test}>
                <Text> test </Text>
            </TouchableOpacity> */}

      {
        // show_vote_results_during (but current user can see)
        userSubmittedOptionsInputValue?.length < 1 && !currBallot?.decision && (
          <TouchableOpacity onPress={showResultsNowClick}>
            <Image source={EyesIcon} style={styles.icon} />
          </TouchableOpacity>
        )
      }

      {CURRENT_USER?.id === day?.user_id &&
        // vote is done logic because the flags hide after the vote is complete:
        currBallot?.decision?.length !== "" && (
          <TouchableOpacity onPress={finishFlagsClick}>
            <Image source={FinishFlagsIcon} style={styles.icon} />
          </TouchableOpacity>
        )}

      {/* <TouchableOpacity onPress={test}></TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  displayCont: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: screenWidth / 10,
  },
  icon: {
    height: 35,
    width: 35,
  },
  iconMini: {
    height: 15,
    width: 15,
  },
  text: {
    fontFamily: "Fuzzy Bubbles",
    fontSize: 16,
  },
  addCommentPlusInput: {
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
    color: "#444",
    fontFamily: "fuzzy",
    fontSize: 10,
    borderWidth: 1.5,
    borderColor: "#44454fea",
    textAlignVertical: "center", // ✅ keeps text centered on Android
  },
  addCommentInputText: {
    fontSize: 16,
    fontWeight: 500,
    fontFamily: "Fuzzy Bubbles",
    color: grayphite,
  },
});

export default BallotDisplayBar;
