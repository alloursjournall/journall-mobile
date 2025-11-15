// @reduxjs/toolkit:
import { RootState } from "redux/store/rootReducer";
import { useSelector, useDispatch } from "react-redux";

// <> styles:
import {
  Dimensions,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import DeleteVoteTrashCan from "../VoteRows/VoteControls/DeleteVoteTrashCan";
import {
  GreenForwardArrowIcon,
  TrashIcon,
  PartyIcon,
  PartyFlagsIcon,
} from "@/constants/Images";

// utils:
import { useContentFunction } from "Contexts/ContentFunctions";
import { nothing, nothingWithDummyParams } from "utility/utilityValues";
import { grayphite } from "@/constants/Colors";

// VoteControls submits the vote and deletes them. simple but:
// comment votes, i.e. ("Best Comment") are saved with table.votes.vote_int (vote_int being the thought of id)
// there is also a "pinned comment" vote with comments as the options but works as JoinDay/WriteContent. it decides comment is pinned
// JoinDay/WriteContent is with string like custom votes, and could decide i.e. {table.fields} "Kayaking" as the new activity.
// also posting-user-specified custom votes which are string votes like: "what to eat for dinner?" "movies or mini golf tonight?"
// media votes: like "what mood are you in drop photo" "who got rizz" "do i look better blonde or brown" "which background music for video?"

interface props {
  isCurrentUserVoted: any;
  isCheckedOrVoted: any;
  mapitem: any;
  index: any;
  currBallot: any;
  checkedBoxArrayObj: any;
  voteFinishedObj: any;
  didCurrentUserVote: any;
  myCurrentUserVote: any;
  showEngagementBallotOption: any;
  setShowEngagementBallotOption: any;
  voteType: any;
  day: any;
  currVotes: any;
  setCurrVotes: any;
  ballotBin: any;
  setBallotBin: any;
  setError: any;
  userSubmittedOptionsOk: any;
  ballotsMediaBLOBs: any;
  setBallotsMediaBLOBs: any;
}

const MediaVoteControls: React.FC<props> = ({
  isCurrentUserVoted,
  isCheckedOrVoted,
  mapitem,
  index,
  currBallot,
  checkedBoxArrayObj,
  voteFinishedObj,
  didCurrentUserVote,
  myCurrentUserVote,
  showEngagementBallotOption,
  setShowEngagementBallotOption,
  voteType,
  day,
  currVotes,
  setCurrVotes,
  ballotBin,
  setBallotBin,
  setError,
  userSubmittedOptionsOk,
  ballotsMediaBLOBs,
  setBallotsMediaBLOBs,
  // event!!!!!!!!!!!
}) => {
  const dispatch = useDispatch();

  const {
    deleteUserSubmittedVoteButLeaveRecordOfSubmissionFunc,
    postingUserApprovesProposedVote,
    checkboxChangeHandler,
    isUserSubmittedOptionApprovedMedia,
    deleteCurrentUserVoteMedia,
    voteSubmitMedia,
  } = useContentFunction();

  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );

  let userSubmittedOptionsUserArray =
    currBallot?.user_submitted_options_user_array || [];
  // console.log('userSubmittedOptionsUserArray', userSubmittedOptionsUserArray);
  let userSubmittedOptionsIsApprovedArray: any =
    currBallot?.user_submitted_options_is_approved_array || []; // any: boolean[] || string
  // console.log('userSubmittedOptionsIsApprovedArray', userSubmittedOptionsIsApprovedArray);
  let hideWaitingApprovalVotes = currBallot?.hide_waiting_on_approval_votes;
  // console.log('hideWaitingApprovalVotes', hideWaitingApprovalVotes);
  let needApprovalVotes = currBallot?.user_submitted_options_need_approval;
  // console.log('needApprovalVotes', needApprovalVotes);

  const notProposedVote =
    isUserSubmittedOptionApprovedMedia(mapitem, currBallot)?.isApproved ===
      null ||
    isUserSubmittedOptionApprovedMedia(mapitem, currBallot)?.isApproved ===
      undefined;
  const proposedVoteIsUnApproved =
    isUserSubmittedOptionApprovedMedia(mapitem, currBallot)?.isApproved ===
    false;
  const proposedVoteisCurrentUsers =
    isUserSubmittedOptionApprovedMedia(mapitem, currBallot)?.userId ===
    CURRENT_USER?.id;

  const isPostingUser = currBallot?.started_by_id === CURRENT_USER?.id;

  let leaderboardStr = currBallot?.leaderboard_str || null;

  const { checkedBoxArray, setCheckedBoxArray } = checkedBoxArrayObj;
  const { voteFinished, setVoteFinished } = voteFinishedObj;

  const deleteCurrentUserVoteFunc = (currentUserVote: any) => {
    // const deleteCurrentUserVoteMedia = async (currentUserVote: any, currBallot, myCurrentUserVote, checkedBoxArrayObj) => {
    deleteCurrentUserVoteMedia(
      currentUserVote,
      currBallot,
      myCurrentUserVote,
      checkedBoxArray,
      setCheckedBoxArray,
      day,
      currVotes,
      setCurrVotes
    );
  };

  const voteSubmitFunc = async (currentUserVote: any) => {
    // const voteSubmitMedia = async (currentUserVote: any, currBallot) => {

    const vote = await voteSubmitMedia(
      currentUserVote,
      currBallot,
      day,
      setCurrVotes
    );
    console.log("vote", vote);

    // if (voteType === "custom") {
    //     voteSubmitMedia(currentUserVote, currBallot, day, setCurrVotes)
    // } else if (voteType.includes("joinday")) {
    //     voteSubmitMedia(currentUserVote, currBallot, day, setCurrVotes)
    // }
  };

  const checkboxChangeHandlerFunc = (index: number) => {
    // const checkboxChangeHandler = (index: number, voteFinished, didCurrentUserVote, checkedBoxArrayObj) => {
    checkboxChangeHandler(
      index,
      voteFinished,
      didCurrentUserVote,
      checkedBoxArray,
      setCheckedBoxArray
    );
  };

  const showVoteEngagementClick = (mapitem: any) => {
    console.log("mapitem", mapitem);
    setShowEngagementBallotOption(mapitem);
  };

  const postingUserApprovesProposedVoteClick = async (mapitem: any) => {
    // invoke function udpate ballot.
    console.log("mapitem before invoke", mapitem);
    const predata = await postingUserApprovesProposedVote(
      mapitem,
      currBallot,
      day?.id
    );
    // const predata = await postingUserApprovesProposedVote(mapitem?.key.key, currBallot, day?.id);
    if (!predata) {
      return null;
    }
    console.log(predata);
    const data = predata?.data?.data?.postingUserApprovesProposedVote;
    console.log("data", data);

    if (!data) {
      console.log("oops");
      return null;
    }
    const unstringedData = JSON.parse(data);
    console.log("unstringedData", unstringedData);
    setBallotBin(unstringedData);
    // dispatch(SET_CURR_DAY_BALLOT(unstringedData))
  };

  const deleteUserSubmittedVoteButLeaveRecordFunc = async (mapitem: any) => {
    // was set up with just mapitem() this is sharing the function with text. text appears as {mapitem} BLOB has S3 {mapitem.key.Key}
    const ballotAfterUpdate =
      await deleteUserSubmittedVoteButLeaveRecordOfSubmissionFunc(
        mapitem?.key?.Key,
        currBallot,
        day?.id,
        nothingWithDummyParams
      );
    console.log("ballotAfterUpdate", ballotAfterUpdate);
    if (!ballotAfterUpdate) {
      return null;
    }
    const data =
      ballotAfterUpdate?.data?.data
        ?.deleteUserSubmittedVoteButLeaveRecordOfSubmission;
    if (!data) {
      return null;
    }
    console.log("data", data);
    const unstringedData = JSON.parse(data);
    setBallotBin(unstringedData);
    // dispatch(SET_CURR_DAY_BALLOT(unstringedData))
  };

  const isSubmittedOptionApproved = isUserSubmittedOptionApprovedMedia(
    mapitem,
    currBallot
  )?.isApproved;
  const submittedOptionUserId = isUserSubmittedOptionApprovedMedia(
    mapitem,
    currBallot
  )?.userId;

  const isSubmittedOptionApprovedAndCurrentUserIsPostingUser =
    isSubmittedOptionApproved === false && day?.user_id === CURRENT_USER?.id;
  const isSubmittedOptionApprovedAndCurrentUserIsProposedVoteUser =
    isSubmittedOptionApproved === false &&
    submittedOptionUserId === CURRENT_USER?.id;
  const isSubmittedOptionReturningNullMeaningNotAProposedVote =
    isUserSubmittedOptionApprovedMedia(mapitem, currBallot)?.isApproved ===
      null ||
    isUserSubmittedOptionApprovedMedia(mapitem, currBallot)?.isApproved ===
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

  const test = () => {
    console.log("shouldShow", shouldShow);
    console.log("notProposedVote", notProposedVote);
  };

  return (
    <View style={styles.cont}>
      {/* <TouchableOpacity onPress={test}>
                {' '}
                <Text> hey </Text>{' '}
            </TouchableOpacity> */}

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
          ballotsMediaBLOBs={ballotsMediaBLOBs}
          setBallotsMediaBLOBs={setBallotsMediaBLOBs}
        />
      ) : (
        (userSubmittedOptionsOk &&
          needApprovalVotes === true &&
          hideWaitingApprovalVotes === false) ||
        (hideWaitingApprovalVotes === true &&
          proposedVoteIsUnApproved &&
          (proposedVoteisCurrentUsers || isPostingUser) && (
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
              ballotsMediaBLOBs={ballotsMediaBLOBs}
              setBallotsMediaBLOBs={setBallotsMediaBLOBs}
            />
          ))
      )}

      {
        // * * * * * * SUBMIT BUTTON:

        // 1️⃣ Ghost/proposed vote first (more complex conditions)
        userSubmittedOptionsOk &&
        // only the postingUser will see the green arrow it's to approve that. the confusion was that if: {proposedVoteIsCurrentUsers} then click forward arrow to submit that proposed vote. nope. that's done in <MediaInputProposedVote/>
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
            <Image style={styles.icon} source={GreenForwardArrowIcon} />
          </TouchableOpacity>
        ) : // 2️⃣ Fallback: box is checked / user voted
        isCheckedOrVoted ? (
          <TouchableOpacity
            onPress={
              isCurrentUserVoted ? nothing : () => voteSubmitFunc(mapitem)
            }
          >
            <Image
              key={`voteYesForPedro${index}`}
              style={styles.icon}
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
              <Image style={styles.icon} source={PartyIcon} />
            </TouchableOpacity>
          )
      }

      {
        // leaderboardStr || leaderboard_int indicates that the vote is done so don't show a checkbox if the vote is done.
        leaderboardStr.length > 1 || currBallot?.leaderboard_int?.length > 1
          ? null // double negative: if it's not not a proposed vote then it is a proposed vote and there's no checkbox. // didCurrentUserVote // didCurrentUserVote ?
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
                onPress={() => checkboxChangeHandlerFunc(index)}
              />
            )
      }

      {/* <TouchableOpacity onPress={test}> yh </TouchableOpacity> */}

      {/* submit arrow is the user checked or voted to show this is where the vote is cast. if user voted show the partyFlags if they didn't show button submit which would show partyFlags. */}
      {/* {(isCheckedOrVoted && (
                <TouchableOpacity onPress={() => voteSubmitFunc(mapitem)}>
                    <Image key={`voteYesForPedro${index}`} style={styles.iconMini} source={isCurrentUserVoted ? PartyFlagsIcon : GreenForwardArrowIcon} />
                </TouchableOpacity>
            )) ||
                (needApprovalVotes === true &&
                    // hideWaitingApprovalVotes === true &&
                    isUserSubmittedOptionApprovedMedia(mapitem, currBallot)?.isApproved === false &&
                    day?.user_id === CURRENT_USER?.id && (
                        <TouchableOpacity onPress={() => postingUserApprovesProposedVoteClick(mapitem)}>
                            <Image style={styles.icon} source={GreenForwardArrowIcon} />
                        </TouchableOpacity>
                    ))}

            {
                // if the game is done show the mask that shows the users:
                leaderboardStr.length > 1 ? (
                    <TouchableOpacity onPress={() => showVoteEngagementClick(mapitem)}>
                        <Image style={styles.icon} source={PartyIcon} />
                    </TouchableOpacity>
                ) : // if currentUser didn't vote then show chkbox to select vote. && if userSubmittedOptionApproved for this mapitem === null ? meaning it's a posting-user-provided default option? show checkbox or if submittedOptionApproved(mapitem) === true ? then it's been approved as vote. show checkbox. or if ballots.hideWaitingApprovalVotes === false then it's saying show all options. so show checkbox.
                !isCurrentUserVoted &&
                  needApprovalVotes === true &&
                  // if hideApprovalVotes === true then check for isUserSubmittedOptionApprovedMedia(), currBallot false = no. can't check for null because that's a posting-user-provided option. wouldn't show a ghost for that. if hideApprovalVotes === yes then only current user or the user that started that vote can see it.
                  ((hideWaitingApprovalVotes === true &&
                      isUserSubmittedOptionApprovedMedia(mapitem, currBallot)?.isApproved === false &&
                      (day?.user_id === CURRENT_USER?.id || isUserSubmittedOptionApprovedMedia(mapitem, currBallot)?.userId === CURRENT_USER?.id)) ||
                      // still on needApprovalVotes === true. but if hideWaitingApprovalVotes === false && they haven't been approved yet (forgot that) Then show the ghosts.
                      (hideWaitingApprovalVotes === false && isUserSubmittedOptionApprovedMedia(mapitem, currBallot)?.isApproved === false)) ? null : (
                    // * * * * * version:
                    // !isCurrentUserVoted && (isUserSubmittedOptionApprovedMedia(mapitem, currBallot)?.isApproved === null || isUserSubmittedOptionApprovedMedia(mapitem, currBallot)?.isApproved === true || hideWaitingApprovalVotes === false) ?

                    <TouchableOpacity style={[{ backgroundColor: checkedBoxArray[index] ? grayphite : '' }, styles.button]} onPress={() => checkboxChangeHandlerFunc(index)} />
                )
            } */}
    </View>
  );
};

const styles = StyleSheet.create({
  cont: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "50%",
    gap: 10,
    // marginTop: 10,
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
    height: 25,
    width: 25,
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
    fontFamily: "Fuzzy Bubbles",
    color: grayphite,
  },
  submitVoteBtnMini: {
    height: 20,
    width: 20,
  },
  button: {
    height: 20,
    width: 20,
    borderWidth: 2,
    borderColor: grayphite,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 8,
    //    borderTopLeftRadius: 0,
    borderTopRightRadius: 3,
  },
});

export default MediaVoteControls;
