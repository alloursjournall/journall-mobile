// top level:
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
import DeleteVoteTrashCan from "./DeleteVoteTrashCan";

// utils:
import { specifyStringTruncate } from "@/utility/utilityValues";
import { useContentFunction } from "@/Contexts/ContentFunctions";
import {
  GreenForwardArrowIcon,
  PartyIcon,
  PartyFlagsIcon,
} from "@/constants/Images";
import { grayphite } from "@/constants/Colors";

interface VoteControlsProps {
  isCheckedOrVoted: any;
  isCurrentUserVoted: any;
  mapitem: any;
  index: any;
  currBallot: any;
  checkedBoxArray: any;
  setCheckedBoxArray: any;
  voteFinished: any;
  setVoteFinished: any;
  didCurrentUserVote: any;
  myCurrentUserVote: any;
  showEngagementBallotOption: any;
  setShowEngagementBallotOption: any;
  voteType: any;
  day: any;
  currVotes: any;
  setCurrVotes: any;
  usersPassLocks: any;
  setUsersPassLocks: any;
  ballotBin: any;
  setBallotBin: any;
  setError: any;
  userSubmittedOptionsOk: any;
}

const VoteControls: React.FC<VoteControlsProps> = ({
  isCheckedOrVoted,
  isCurrentUserVoted,
  mapitem,
  index,
  currBallot,
  checkedBoxArray,
  setCheckedBoxArray,
  voteFinished,
  setVoteFinished,
  didCurrentUserVote,
  myCurrentUserVote,
  showEngagementBallotOption,
  setShowEngagementBallotOption,
  voteType,
  day,
  currVotes,
  setCurrVotes,
  usersPassLocks,
  setUsersPassLocks,
  ballotBin,
  setBallotBin,
  setError,
  userSubmittedOptionsOk,
}) => {
  const {
    isUserSubmittedOptionApprovedText,
    submitCommentVote,
    submitVoteUnlockChecker,
    submitJoinDayVote,
    submitVote,
    postingUserApprovesProposedVote,
  } = useContentFunction();

  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );

  let leaderboardStr = currBallot?.leaderboard_str || null;
  let userSubmittedOptionsUserArray =
    currBallot?.user_submitted_options_user_array || [];
  let userSubmittedOptionsIsApprovedArray: any =
    currBallot?.user_submitted_options_is_approved_array || []; // any: boolean[] || string
  let hideWaitingApprovalVotes = currBallot?.hide_waiting_on_approval_votes;
  let needApprovalVotes = currBallot?.user_submitted_options_need_approval;

  const proposedVoteIsApproved =
    isUserSubmittedOptionApprovedText(mapitem, currBallot)?.isApproved === true;
  const notProposedVote =
    isUserSubmittedOptionApprovedText(mapitem, currBallot)?.isApproved === null;
  const proposedVoteIsUnApproved =
    isUserSubmittedOptionApprovedText(mapitem, currBallot)?.isApproved ===
    false;
  const proposedVoteisCurrentUsers =
    isUserSubmittedOptionApprovedText(mapitem, currBallot)?.userId ===
    CURRENT_USER?.id;

  const isPostingUser = currBallot?.started_by_id === CURRENT_USER?.id;

  const checkboxChangeHandler = (index: number) => {
    if (voteFinished || didCurrentUserVote) {
      return;
    }
    // Clone the current state of the checkboxes
    let clonedArray = Array(checkedBoxArray.length).fill(false);
    // Set the checkbox at the given index to true
    if (!clonedArray[index]) {
      clonedArray[index] = true;
    }
    // Update the state with the new array
    setCheckedBoxArray(clonedArray);
  };

  const showVoteEngagementClick = (mapitem: any) => {
    console.log("mapitem", mapitem);
    console.log("voteType", voteType);

    if (voteType?.includes("comment")) {
      // goes for pinned comment vote as well!
      setShowEngagementBallotOption(mapitem?.thought);
    } else {
      setShowEngagementBallotOption(mapitem);
    }
  };

  const submitCommentVoteFunc = async (mapitem: any) => {
    const didUserVoteAlready = currVotes?.some(
      (dayVotes: any) =>
        dayVotes?.user_id === CURRENT_USER?.id &&
        dayVotes?.ballot_id === currBallot?.id
    );

    // if game is over (either ballot.decision exists or explicitly is_active = false) OR if userAlreadyVoted don't proceed to vote again.
    if (
      currBallot?.decision ||
      currBallot?.is_active === false ||
      didUserVoteAlready
    ) {
      console.log("hey were over here!");
      setVoteFinished(true);

      return;
    }

    const thoughtId: number = mapitem?.id;

    const prepareThought = specifyStringTruncate(mapitem?.thought, 20);

    // vote_int type vote not a vote_string type vote this is one of the few where it won't just be: {submitVote} it has it's own function!

    try {
      const predata: any = await submitCommentVote(
        day?.id,
        currBallot?.id,
        CURRENT_USER?.id,
        CURRENT_USER?.username,
        CURRENT_USER?.icon || "",
        thoughtId,
        currBallot?.type,
        prepareThought
      );
      if (!predata) {
        return;
      }
      const data: any = predata?.data?.data.submitCommentVote;
      console.log("data over here!", data);
      if (!data) {
        return;
      }

      if (data?.some((d: any) => d?.id)) {
        setCurrVotes(data);
        submitVoteUnlockChecker(day, usersPassLocks, setUsersPassLocks);
      }
    } catch (error) {
      console.log("error", error);
      setError(true);
    }
  };

  const submitJoindayVoteFunc = async (mapitem: any) => {
    console.log("mapitem", mapitem);

    if (currBallot?.decision || currBallot?.custom_decision) {
      console.log("game is done dont submit vote");
      return;
    }

    const allVotesAfterSubmittingVotes = await submitJoinDayVote(
      day?.id,
      currBallot?.id,
      CURRENT_USER?.id,
      CURRENT_USER?.username,
      CURRENT_USER?.icon || "",
      mapitem,
      currBallot?.type
      // "joinday-newfield"
    );
    console.log("allVotesAfterSubmittingVotes", allVotesAfterSubmittingVotes);

    if (!allVotesAfterSubmittingVotes) {
      // * * * * * reminder devnotes COMMENT WENT WRONG! update!
      return;
    }
    const currVotes =
      allVotesAfterSubmittingVotes?.data?.data?.submitJoinDayVote;
    console.log("currVotes", currVotes);
    if (!currVotes) {
      return;
    }
    submitVoteUnlockChecker(day, usersPassLocks, setUsersPassLocks);
    setCurrVotes(currVotes);
    // dispatch(SET_CURR_DAY_VOTES(currVotes))
    // setCurrBallotVotesState(currVotes)
  };

  const customVoteSubmitFunc = async (currentUserVote: any) => {
    console.log("currentUserVote", currentUserVote);

    if (currBallot?.decision || currBallot?.custom_decision) {
      console.log("game is done dont submit vote");
      return;
    }

    const allVotesAfterSubmittingVotes = await submitVote(
      day?.id,
      currBallot?.id,
      CURRENT_USER?.id,
      CURRENT_USER?.username,
      CURRENT_USER?.icon || "",
      currentUserVote,
      "custom",
      true,
      false
    );

    if (!allVotesAfterSubmittingVotes) {
      // * * * * * reminder devnotes COMMENT WENT WRONG! update!
      return;
    }
    const currVotes = allVotesAfterSubmittingVotes?.data?.data?.submitVote;
    console.log("currVotes", currVotes);
    if (!currVotes) {
      return;
    }

    setCurrVotes(currVotes);
  };

  const submitVoteAccordingToVoteType = (mapitem: any) => {
    console.log("mapitem", mapitem);
    if (
      voteType === "best comment" ||
      voteType === "pinned comment" ||
      voteType?.includes("comment")
    ) {
      submitCommentVoteFunc(mapitem);
    } else if (voteType.includes("joinday")) {
      submitJoindayVoteFunc(mapitem);
    } else if (voteType === "custom") {
      // submits string vote"
      customVoteSubmitFunc(mapitem);
    } else {
      return;
    }
  };

  const postingUserApprovesProposedVoteClick = async (mapitem: any) => {
    console.log("mapitem before invoke", mapitem);
    // invoke function udpate ballot.
    const predata = await postingUserApprovesProposedVote(
      mapitem,
      currBallot,
      day?.id
    );
    if (!predata) {
      setError(true);
      return;
    }
    const data = predata?.data?.data?.postingUserApprovesProposedVote;

    if (!data) {
      setError(true);
      return;
    }

    const unstringedData = JSON.parse(data);
    console.log("unstringedData", unstringedData);
    setBallotBin(unstringedData);
    // dispatch(SET_CURR_DAY_BALLOT(unstringedData))
  };

  const testNothing = () => {
    console.log("hey nothing is happenin");
  };

  const test = () => {};

  const isSubmittedOptionApproved = isUserSubmittedOptionApprovedText(
    mapitem,
    currBallot
  )?.isApproved;
  const submittedOptionUserId = isUserSubmittedOptionApprovedText(
    mapitem,
    currBallot
  )?.userId;

  const isSubmittedOptionApprovedAndCurrentUserIsPostingUser =
    isSubmittedOptionApproved === false && day?.user_id === CURRENT_USER?.id;
  const isSubmittedOptionApprovedAndCurrentUserIsProposedVoteUser =
    isSubmittedOptionApproved === false &&
    submittedOptionUserId === CURRENT_USER?.id;
  const isSubmittedOptionReturningNullMeaningNotAProposedVote =
    isUserSubmittedOptionApprovedText(mapitem, currBallot)?.isApproved ===
      null ||
    isUserSubmittedOptionApprovedText(mapitem, currBallot)?.isApproved ===
      undefined;

  const noUserOptions = !userSubmittedOptionsOk;
  const noApprovalNeeded = userSubmittedOptionsOk && !needApprovalVotes;
  const approvalNeededButVisible =
    userSubmittedOptionsOk && needApprovalVotes && !hideWaitingApprovalVotes;

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

  return (
    <View style={styles.cont}>
      {/* // (proposedVoteIsUnApproved && (proposedVoteisCurrentUsers || isPostingUser) && ( */}

      {/* // !userSubmittedOptionsOk && // !isCurrentUserVoted) || // (userSubmittedOptionsOk && */}

      {isCurrentUserVoted ? (
        <DeleteVoteTrashCan
          day={day}
          mapitem={mapitem}
          currBallot={currBallot}
          myCurrentUserVote={myCurrentUserVote}
          isCurrentUserVoted={isCurrentUserVoted}
          currVotes={currVotes}
          setCurrVotes={setCurrVotes}
          index={index}
          checkedBoxArray={checkedBoxArray}
          setCheckedBoxArray={setCheckedBoxArray}
          voteType={voteType}
          setError={setError}
          ballotBin={ballotBin}
          setBallotBin={setBallotBin}
          ballotsMediaBLOBs={null}
          setBallotsMediaBLOBs={null}
        />
      ) : (
        userSubmittedOptionsOk &&
        needApprovalVotes === true &&
        (hideWaitingApprovalVotes === false ||
          (hideWaitingApprovalVotes === true &&
            proposedVoteIsUnApproved &&
            (proposedVoteisCurrentUsers || isPostingUser))) && (
          <DeleteVoteTrashCan
            day={day}
            mapitem={mapitem}
            currBallot={currBallot}
            myCurrentUserVote={myCurrentUserVote}
            isCurrentUserVoted={isCurrentUserVoted}
            currVotes={currVotes}
            setCurrVotes={setCurrVotes}
            index={index}
            checkedBoxArray={checkedBoxArray}
            setCheckedBoxArray={setCheckedBoxArray}
            voteType={voteType}
            setError={setError}
            ballotBin={ballotBin}
            setBallotBin={setBallotBin}
            ballotsMediaBLOBs={null}
            setBallotsMediaBLOBs={null}
          />
        )
      )}

      {/* <TouchableOpacity onPress={test}> hey </TouchableOpacity> */}

      {
        // * * * * * * SUBMIT BUTTON:

        // 1️⃣ Ghost/proposed vote first (more complex conditions)
        userSubmittedOptionsOk &&
        // only the postingUser will see the green arrow it's to approve that. the confusion was that if: {proposedVoteIsCurrentUsers} then click forward arrow to submit that proposed vote. nope. that's done in <TextInputProposedVote/>
        // handle hideWaitingApprovalVotes === true
        needApprovalVotes === true &&
        hideWaitingApprovalVotes === true &&
        proposedVoteIsUnApproved &&
        // * * * * * CHECK ONLY FOR isPostingUser they're the only ones who can see this green button.
        isPostingUser ? (
          // isCheckedOrVoted &&
          // <Text> A.V. </Text>
          <TouchableOpacity
            onPress={() => postingUserApprovesProposedVoteClick(mapitem)}
          >
            <Image style={styles.icons} source={GreenForwardArrowIcon} />
          </TouchableOpacity>
        ) : // 2️⃣ Fallback: box is checked / user voted
        isCheckedOrVoted ? (
          <TouchableOpacity
            onPress={
              isCurrentUserVoted
                ? testNothing
                : () => submitVoteAccordingToVoteType(mapitem)
            }
          >
            <Image
              key={`voteYesForPedro${index}`}
              style={styles.icons}
              source={
                isCurrentUserVoted ? PartyFlagsIcon : GreenForwardArrowIcon
              }
            />
          </TouchableOpacity>
        ) : null // 3️⃣ Render nothing if neither condition matches
      }

      {
        // show engagement:
        (leaderboardStr.length > 1 ||
          currBallot?.leaderboard_int?.length > 1) &&
          !showEngagementBallotOption && (
            <TouchableOpacity onPress={() => showVoteEngagementClick(mapitem)}>
              <Image style={styles.icons} source={PartyIcon} />
            </TouchableOpacity>
          )
      }

      {
        leaderboardStr?.length > 1 ||
        currBallot?.leaderboard_int?.length > 1 ||
        didCurrentUserVote
          ? null
          : (notProposedVote || shouldShow) && (
              <TouchableOpacity
                style={[
                  {
                    backgroundColor: checkedBoxArray[index]
                      ? "grey"
                      : "transparent",
                  },
                  styles.button,
                ]}
                onPress={() => checkboxChangeHandler(index)}
              />
            )

        // // leaderboardStr || leaderboard_int indicates that the vote is done so don't show a checkbox if the vote is done.
        // leaderboardStr.length > 1 ||
        // currBallot?.leaderboard_int?.length > 1 ||
        // // didCurrentUserVote ?
        // didCurrentUserVote // double negative: if it's not not a proposed vote then it is a proposed vote and there's no checkbox.
        //     ? // !notProposedVote ?
        //       null
        //     : notProposedVote ||
        //       (shouldShow && (
        //           <TouchableOpacity
        //               style={[{ backgroundColor: checkedBoxArray[index] ? 'grey' : 'transparent' }, styles.button]}
        //               onPress={() => checkboxChangeHandler(index)}
        //           />
        //       ))
      }
    </View>
  );
};

const styles = StyleSheet.create({
  cont: {
    flexDirection: "row",
    gap: 10,
  },
  icons: {
    height: 25,
    width: 25,
  },
  ghost: {
    opacity: 0,
  },
  button: {
    height: 20,
    width: 20,
    borderWidth: 2,
    borderColor: grayphite,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 3,
  },
});

export default VoteControls;
