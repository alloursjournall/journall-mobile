// top level:
import { useState, useRef } from "react";
import axios from "axios";

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

// utils:
import { API } from "@env";
import deleteS3WithPresignedUrl from "@/utility/AWS/new/deleteBlobFromS3WithPresignedUrl";
import { getPresignedDeleteURLQueryStringFunc } from "@/graphql/queries";
import { useContentFunction } from "@/Contexts/ContentFunctions";
import {
  TrashIcon,
  GreenForwardArrowIcon,
  PartyIcon,
} from "@/constants/Images";
import { grayphite } from "@/constants/Colors";
import { daysGETwithDATEQueryStringFunc } from "@/graphql/queries";

interface props {
  day: any;
  mapitem: any;
  currBallot: any;
  myCurrentUserVote: any;
  isCurrentUserVoted: any;
  currVotes: any;
  setCurrVotes: any;
  index: number;

  checkedBoxArray: any;
  setCheckedBoxArray: any;
  voteType: any;
  setError: any;
  ballotBin: any;
  setBallotBin: any;
  ballotsMediaBLOBs: any;
  setBallotsMediaBLOBs: any;
}

const DeleteVoteTrashCan: React.FC<props> = ({
  day,
  mapitem,
  currBallot,
  myCurrentUserVote,
  isCurrentUserVoted,
  currVotes,
  setCurrVotes,
  index,
  checkedBoxArray,
  setCheckedBoxArray,
  voteType,
  setError,
  ballotBin,
  setBallotBin,
  ballotsMediaBLOBs,
  setBallotsMediaBLOBs,
}) => {
  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );

  const {
    isUserSubmittedOptionApprovedText,
    isUserSubmittedOptionApprovedMedia,
    deleteVote,
    deleteCommentVote,
    deleteUserSubmittedVoteButLeaveRecordOfSubmissionFunc,
  } = useContentFunction();

  const isPostingUser = currBallot?.started_by_id === CURRENT_USER?.id;
  const proposedVoteIsUnApproved =
    isUserSubmittedOptionApprovedText(mapitem, currBallot)?.isApproved ===
    false;
  const proposedVoteisCurrentUsers =
    isUserSubmittedOptionApprovedText(mapitem, currBallot)?.userId ===
    CURRENT_USER?.id;

  const proposedVoteIsUnApprovedMedia =
    isUserSubmittedOptionApprovedMedia(mapitem, currBallot)?.isApproved ===
    false;
  const proposedVoteisCurrentUsersMedia =
    isUserSubmittedOptionApprovedMedia(mapitem, currBallot)?.userId ===
    CURRENT_USER?.id;
  let hideWaitingApprovalVotes = currBallot?.hide_waiting_on_approval_votes;
  let needApprovalVotes = currBallot?.user_submitted_options_need_approval;
  let userSubmittedOptionsOk = currBallot?.user_submitted_options_ok;

  const handleDeleteVote = async (
    ballotId: number,
    voteId: number,
    dayId: number,
    setCurrVotes: (data: any) => void,
    setCheckedBoxArray: (arr: boolean[]) => void,
    checkedBoxCount: number
  ) => {
    try {
      const predata = await deleteVote(ballotId, voteId, dayId);
      console.log("predata", predata);

      if (!predata) {
        console.warn("⚠️ deleteVote returned no data");
        return null;
      }

      const data = predata?.data?.data?.deleteVote;
      if (!data) {
        console.warn("⚠️ deleteVote response missing expected structure");
        return null;
      }

      // Update state
      setCurrVotes(data);

      // Reset checkboxes
      setCheckedBoxArray(Array(checkedBoxCount).fill(false));

      console.log("✅ data", data);
      return data;
    } catch (error) {
      console.error("❌ Error in handleDeleteVote:", error);
      return null;
    }
  };

  const deleteMediaVoteFunc = async (currentUserVote: any) => {
    const myCurrentUserVoteId = myCurrentUserVote?.user_id;
    console.log("currentUserVote media", currentUserVote);
    console.log("myCurrentUserVote", myCurrentUserVote);
    console.log("myCurrentUserVote", myCurrentUserVote?.id);
    console.log("mapitem", mapitem);
    console.log("mapitem?.key?.key", mapitem?.key?.key);
    console.log("currentUserVote?.key?.key", currentUserVote?.key?.key);

    const mapitemKey = mapitem?.key?.key;

    if (
      mapitemKey?.includes(myCurrentUserVote?.vote_string) &&
      myCurrentUserVoteId === CURRENT_USER?.id
    ) {
      console.log("gals & gooners!!");
      // const deletedVotes = await handleDeleteVote(currBallotId, myCurrentUserVoteId, dayId, setCurrVotes, setCheckedBoxArray, checkedBoxCount);
      // console.log('deletedVotes', deletedVotes);
      const predata = await deleteVote(
        currBallot?.id,
        myCurrentUserVote?.id,
        day?.id
      );
      console.log("predata", predata);
      if (!predata) {
        // * * * * * reminder devnotes: error logging! make ternary on the options.map() index allow for error display. there's already success display which is changed vote!
        return;
      }
      // set that data so state responds!
      const data = predata?.data?.data?.deleteVote;
      if (!data) {
        return data;
      }
      // dispatch(SET_CURR_DAY_VOTES(data))
      setCurrVotes(data);
      // restart the checkbox so they unchecked the box they just deleted
      let clonedArray = Array(checkedBoxArray.length).fill(false);
      setCheckedBoxArray(clonedArray);
      console.log("data", data);
    }
  };

  const deleteVoteStringFunc = async (currentUserVote: any) => {
    console.log("currentUserVote", currentUserVote);
    console.log("myCurrentUserVote", myCurrentUserVote?.id);

    const voterId = currVotes?.find(
      (votes: any) =>
        votes?.user_id === CURRENT_USER?.id &&
        votes?.ballot_id === currBallot?.id
    );
    console.log("voterId", voterId);

    // return;

    if (currentUserVote === myCurrentUserVote?.vote_string) {
      console.log("we are equal!");

      const predata = await deleteVote(
        currBallot?.id,
        myCurrentUserVote?.id,
        day?.id
      );
      console.log("predata", predata);
      if (!predata) {
        // * * * * * reminder devnotes: error logging! make ternary on the options.map() index allow for error display. there's already success display which is changed vote!
        return;
      }
      // set that data so state responds!
      const data = predata?.data?.data?.deleteVote;
      if (!data) {
        return data;
      }
      // dispatch(SET_CURR_DAY_VOTES(data))
      setCurrVotes(data);
      // restart the checkbox so they unchecked the box they just deleted
      let clonedArray = Array(checkedBoxArray.length).fill(false);
      setCheckedBoxArray(clonedArray);
      console.log("data", data);
    }
    return;
  };

  const deleteCommentVoteIntFunc = async (currentUserVote: any) => {
    console.log("currentUserVote", currentUserVote);
    console.log("myCurrentUserVote", myCurrentUserVote);

    if (currentUserVote?.id === myCurrentUserVote?.vote_int) {
      const voteId: number = myCurrentUserVote?.id;
      const voteInt: number = myCurrentUserVote?.vote_int;
      const voteType: string = myCurrentUserVote?.vote_type;
      const ballotId = currBallot?.id;
      const dayId = day?.id;
      const userId = CURRENT_USER?.id;

      // deleteCommentVote: (vote_id:number, vote_int:number, vote_type:string, day_id:number, ballot_id:number, user_id:number ) => any;
      const predata = await deleteCommentVote(
        voteId,
        voteInt,
        voteType,
        dayId,
        ballotId,
        userId
      );
      console.log("predata", predata);

      if (!predata) {
        console.log("hey no predata guys");
        return;
      }

      const data = predata?.data?.data?.deleteCommentVote;
      if (!data) {
        return;
      }
      console.log("data after delete!", data);
      setCurrVotes(data);
      // dispatch(SET_CURR_DAY_VOTES(data))
    }
  };

  const deleteVoteAccordingToVoteType = (mapitem: any) => {
    console.log("voteType", voteType);
    if (voteType?.includes("comment")) {
      deleteCommentVoteIntFunc(mapitem);
    } else if (voteType.includes("joinday") || voteType === "custom") {
      // delete vote which is marked by string in (table.votes.vote_string)
      deleteVoteStringFunc(mapitem);
    } else if (voteType === "custom better media") {
      deleteMediaVoteFunc(mapitem);
    }
  };

  const test = () => {
    console.log("hey guys");
    console.log("userSubmittedOptionsOk", userSubmittedOptionsOk);
    console.log("needApprovalVotes", needApprovalVotes);
    console.log("hideWaitingApprovalVotes", hideWaitingApprovalVotes);
    console.log("proposedVoteIsUnApproved", proposedVoteIsUnApproved);
    console.log("proposedVoteIsUnApprovedMedia", proposedVoteIsUnApprovedMedia);
    console.log("proposedVoteisCurrentUsers", proposedVoteisCurrentUsers);
    console.log("isPostingUser", isPostingUser);

    // (userSubmittedOptionsOk && needApprovalVotes === true && hideWaitingApprovalVotes === false) ||
    // (hideWaitingApprovalVotes === true && proposedVoteIsUnApproved && (proposedVoteisCurrentUsers || isPostingUser))
  };

  const deleteProposedVoteFunc = async () => {
    if (mapitem?.key?.key) {
      console.log("aii this is a media one you heard");

      const presignedQuery = getPresignedDeleteURLQueryStringFunc(
        mapitem?.key?.key
      );
      const presignedPreData: any = await axios.post(
        API,
        // "https://journallapi.vercel.app/api/graphql",
        {
          query: presignedQuery,
        }
      );

      console.log("presignedPreData ballot", presignedPreData);

      if (!presignedPreData) {
        console.log("are we hiding in the presignedPredata block");
        return null;
      }

      let presignedData = presignedPreData?.data?.data?.getPresignedDeleteURL;
      const parsedPresignedData = JSON.parse(presignedData);
      console.log(
        "parsedPresignedData.signedUrl:",
        parsedPresignedData?.signedUrl
      );

      const deletedBlob = await deleteS3WithPresignedUrl(
        parsedPresignedData?.signedUrl
      );
      console.log(
        "deletedBlob value:",
        deletedBlob,
        "type:",
        typeof deletedBlob
      );
      console.log("deletedBlob", deletedBlob);

      if (deletedBlob === true) {
        console.log("🔥 entered IF block");
      } else {
        console.log("🚫 skipped IF block");
      }

      // const uploadedBlob = await uploadBlobToS3WithPresignedUrl(parsedPresignedData?.signedUrl, option?.blob, option.blobType);

      // filter the deleted blob out and reset state so it doesn't render on <MediaVoteRows>
      if (deletedBlob === true) {
        console.log("do we even get here brodie");
        console.log("ballotsMediaBLOBs type:", typeof ballotsMediaBLOBs);
        console.log(
          "Array.isArray(ballotsMediaBLOBs):",
          Array.isArray(ballotsMediaBLOBs)
        );
        console.log("ballotsMediaBLOBs value:", ballotsMediaBLOBs);

        const ballotMediaBLOBsClone = [...ballotsMediaBLOBs];
        console.log("ballotMediaBLOBsClone", ballotMediaBLOBsClone);
        const mediaBlobIndex = ballotMediaBLOBsClone?.findIndex(
          (b: any) => b?.key?.key === mapitem?.key?.key
        );
        console.log("mediaBlobIndex", mediaBlobIndex);
        console.log("ballotsMediaBLOBs before delete", ballotsMediaBLOBs);
        const filteredMediaBLOBs = ballotMediaBLOBsClone.filter(
          (b: any, index: any) => index !== mediaBlobIndex
        );
        console.log("filteredMediaBLOBs", filteredMediaBLOBs);
        setBallotsMediaBLOBs(filteredMediaBLOBs);

        // update medadata about the blob:
        let data = await deleteUserSubmittedVoteButLeaveRecordOfSubmissionFunc(
          mapitem,
          currBallot,
          day?.id,
          setError
        );
        console.log("data", data);
        let unstringifiedBallot = JSON.parse(data);
        console.log("unstringifiedBallot", unstringifiedBallot);
        setBallotBin(unstringifiedBallot);
      }

      console.log("deletedBlob", deletedBlob);

      // 🚨 DEBUG: Test the exact CloudFront URL that should work
      const testCloudfrontUrl = parsedPresignedData?.cloudfrontUrl;

      const url = new URL(parsedPresignedData?.signedUrl);
      console.log(
        "🧾 Signed headers:",
        url.searchParams.get("X-Amz-SignedHeaders")
      );

      console.log("🔄 Testing CloudFront URL:", testCloudfrontUrl);

      // Try to fetch it immediately
      try {
        const testResponse = await fetch(testCloudfrontUrl);
        console.log("🔍 CloudFront test response status:", testResponse.status);
        console.log(
          "🔍 CloudFront test response type:",
          testResponse.headers.get("content-type")
        );

        if (testResponse.ok) {
          const testBlob = await testResponse.blob();
          console.log(
            "✅ CloudFront test - blob type:",
            testBlob.type,
            "size:",
            testBlob.size
          );
        } else {
          const errorText = await testResponse.text();
          console.log("❌ CloudFront test error:", errorText.substring(0, 200));
        }
      } catch (error) {
        console.log("❌ CloudFront test fetch failed:", error);
      }
    } else {
      let data = await deleteUserSubmittedVoteButLeaveRecordOfSubmissionFunc(
        mapitem,
        currBallot,
        day?.id,
        setError
      );
      console.log("data", data);
      let unstringifiedBallot = JSON.parse(data);
      console.log("unstringifiedBallot", unstringifiedBallot);
      setBallotBin(unstringifiedBallot);
    }
  };

  return (
    <View>
      {
        // isCurrentUserVoted && currBallot?.lock !== "ballotEditResultsDuring" && // currBallot?.lock !== "ballotShowResultsDuring" &&
        // if lock restricts seeing the votes before they're done: can't submit a vote just to see results and delete (game system)

        // this needs to check for isUserSubmittedOptionsText> and the whole shebang. Have to check CURRENT_USER...

        // ((needApprovalVotes === true &&
        // hideWaitingApprovalVotes === true &&
        // (isUserSubmittedOptionApprovedText(mapitem, currBallot)?.isApproved === true ||
        //     isUserSubmittedOptionApprovedText(mapitem, currBallot)?.isApproved === null)) ||
        // day?.user_id === CURRENT_USER?.id ||
        // isUserSubmittedOptionApprovedText(mapitem, currBallot)?.userId === CURRENT_USER?.id ||
        // // hideWaitingApprovalVotes === true but hideWaitingApprovalVotes is false. have to still make the ghosts down there.
        // (needApprovalVotes === true && hideWaitingApprovalVotes === false) ||
        // // regular case for all votes. don't need approval but still capped at one submission and 2 likes.
        // needApprovalVotes === false ||
        // needAppr ovalVotes == null) &&

        // this is the condition for: deleteUserSubmittedVoteButLeaveRecordOfSubmissionFunc
        // ((hideWaitingApprovalVotes === false || hideWaitingApprovalVotes) === true && proposedVoteIsUnApproved && (proposedVoteisCurrentUsers || isPostingUser) && (

        <TouchableOpacity
          onPress={() => {
            isCurrentUserVoted
              ? deleteVoteAccordingToVoteType(mapitem)
              : (userSubmittedOptionsOk &&
                  needApprovalVotes === true &&
                  hideWaitingApprovalVotes === false) ||
                (hideWaitingApprovalVotes === true &&
                  (proposedVoteIsUnApproved || proposedVoteIsUnApprovedMedia) &&
                  (proposedVoteisCurrentUsers ||
                    proposedVoteisCurrentUsersMedia)) ||
                isPostingUser
              ? deleteProposedVoteFunc()
              : test();
            //   deleteUserSubmittedVoteButLeaveRecordOfSubmissionFunc(mapitem, currBallot, day?.id, setError);
          }}
        >
          <Image
            key={`deleteVoteIcon${index}`}
            style={styles.icons}
            source={TrashIcon}
          />
        </TouchableOpacity>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  icons: {
    height: 25,
    width: 25,
  },
});

export default DeleteVoteTrashCan;
