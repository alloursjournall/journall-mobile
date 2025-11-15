import axios from "axios";

// useState:
import React, { useState, useEffect } from "react";

// redux
import { RootState } from "@/redux/store/rootReducer";
import { useSelector } from "react-redux";

//  <>
import { Dimensions, ScrollView, View, Text, StyleSheet } from "react-native";
import ShowEngagement from "./ShowEngagement/ShowEngagement";
import BallotDisplayBar from "./BallotDisplayBar";
import BallotInfo from "./BallotInfo";
import VoteRows from "./VoteRows/VoteRows";
import MediaVoteRows from "./MediaVoteRows/MediaVoteRows";
import CommentVoteRows from "./CommentRows/CommentVoteRows";
import AddMediaProposedVote from "./MediaVoteRows/AddMediaProposedVote";

// utils:
import { API } from "@env";
import { useContentFunction } from "@/Contexts/ContentFunctions";
import getDayBallotMediaFOLDERPathFromS3 from "@/utility/AWS/old/getDayBallotMediaFOLDERPathFromS3";
import getBLOBandKEYandURLfromCloudFront from "@/utility/AWS/new/cloudfront/getBLOBandKEYandURLfromCloudfront";
import getObjAudioFromCloudFront from "@/utility/AWS/new/cloudfront/getObjAudioFromCloudfront";
import { grayphite } from "@/constants/Colors";
import { getObjKeysFromFolderS3QueryStringFunc } from "@/graphql/queries";

interface BallotProps {
  day: any;
  feed: any;
  setFeed: any;
  event: any;
  ballotBin: any;
  setBallotBin: any;
  ballotBinIndex: any;
  setBallotBinIndex: any;
  currVotes: any;
  setCurrVotes: any;
  ballotOptionsLikes: any;
  setBallotOptionsLikes: any;
  ballotOptionsStars: any;
  setBallotOptionsStars: any;
  comments: any;
  setComments: any;
  soundComments: any;
  setSoundComments: any;
  allUserProfileIcons: any;
  setAllUserProfileIcons: any;
  usersPassLocks: any;
  setUsersPassLocks: any;
  ballotsMediaBlobs: any;
  setBallotsMediaBlobs: any;
  voteType: any;
  mediaVote: any;
  setCurrDaySelection: any;
  // feed: any,
  // setFeed: any,
  // currDayMomentsObj,   // day?.moments;
  // currDayPostingUserSoundThoughtsObj,
}

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

// mobile first approach: replace <CurrDaySelectiomnBottom/> with new bar but has the voters icon to toggle like comments
// top menu:        title, description, restriction   toggle between showing the vote itself and the info not at same time.
// ballot.user_went_with_vote_update will be a heart in the row not in the top toolbar

const Ballots: React.FC<BallotProps> = ({
  day,
  feed,
  setFeed,
  event,
  ballotBin,
  setBallotBin,
  ballotBinIndex,
  setBallotBinIndex,
  currVotes,
  setCurrVotes,
  ballotOptionsLikes,
  setBallotOptionsLikes,
  ballotOptionsStars,
  setBallotOptionsStars,
  comments,
  setComments,
  soundComments,
  setSoundComments,
  allUserProfileIcons,
  setAllUserProfileIcons,
  usersPassLocks,
  setUsersPassLocks,
  ballotsMediaBlobs,
  setBallotsMediaBlobs,
  voteType,
  mediaVote,
  setCurrDaySelection,
  // feed,
  // setFeed,
  // currDayMomentsObj,   // day?.moments;
  // currDayPostingUserSoundThoughtsObj,
}) => {
  const currBallot = ballotBin[ballotBinIndex];

  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );

  const [decision, setDecision] = useState<any | null>(null);
  const [leaderboard, setLeaderboard] = useState<any | null>(null);
  const [almostDoneFinishingVote, setAlmostDoneFinishingVote] =
    useState<boolean>(false);
  const [showVoteOutcomes, setShowVoteOutcomes] = useState<boolean>(false);
  const [showVoteResultsNow, setShowVoteResultsNow] = useState(false);
  const [showEngagementBallotOption, setShowEngagementBallotOption] =
    useState<any>(null);
  const [didUserSubmit, setDidUserSubmit] = useState<boolean>(false);
  const [userSubmittedOptionsInputValue, setUserSubmittedOptionsInputValue] =
    useState<string>("");
  const [displayAddMediaMenu, setDisplayAddMediaMenu] = useState(false);

  const { GETballotMediaS3Func } = useContentFunction();

  const leaderboardStr = currBallot?.leaderboard_str;
  let hideWaitingApprovalVotes = currBallot?.hide_waiting_on_approval_votes;
  let needApprovalVotes = currBallot?.user_submitted_options_need_approval;
  let userSubmittedOptionsIsApprovedArray: any =
    currBallot?.user_submitted_options_is_approved_array || []; // any: boolean[] || string
  let userSubmittedOptionsUserArray =
    currBallot?.user_submitted_options_user_array || [];
  let ballotType = currBallot?.type;

  const [showVoteInfo, setShowVoteInfo] = useState<any>(false);

  // 👍 👍 👍 NORMALIZE MEDIA FUNC SOLVES obj.key.Key || obj.key.Key issues:

  // const normalizeMedia = (obj) => ({
  //     key: obj?.key?.key || obj?.key?.Key || obj?.Key,
  //     blob: obj?.blob || obj?.base64Data,
  //     url: obj?.url || obj?.blobURL,
  // });

  // const GETballotMediaS3Func = async (fileType: string) => {
  //   // const GETballotMediaS3Func = async (fileType: string) => {

  //   let ballotCommentsPathS3 =
  //     fileType === "images"
  //       ? await getDayBallotMediaFOLDERPathFromS3(day?.id, "images")
  //       : fileType === "audio"
  //       ? await getDayBallotMediaFOLDERPathFromS3(day?.id, "audio")
  //       : fileType === "videos" &&
  //         (await getDayBallotMediaFOLDERPathFromS3(day?.id, "videos"));

  //   // console.log('ballotCommentsPathS3 now', ballotCommentsPathS3);

  //   if (!ballotCommentsPathS3) {
  //     return null;
  //   }

  //   const query = getObjKeysFromFolderS3QueryStringFunc(ballotCommentsPathS3);

  //   console.log("query", query);

  //   const predata: any = await axios.post(API, {
  //     query: query,
  //   });
  //   if (!predata) {
  //     return null;
  //   }

  //   console.log("predata", predata);
  //   let data = predata?.data?.data?.getObjKeysFromFolderS3;

  //   console.log("data here", data);

  //   if (!data) {
  //     return null;
  //   }

  //   const ballotMedia = JSON.parse(data);
  //   console.log("ballotMedia", ballotMedia);

  //   console.log("fileType", fileType);
  //   if (fileType === "audio") {
  //     const mediaPromises = ballotMedia?.map(async (item: any) => {
  //       console.log("item", item);
  //       const key = item?.key || item?.Key;
  //       // return;

  //       // const blob: any = await getBLOBfromS3(key);
  //       const preBlob = await getObjAudioFromCloudFront(key);
  //       // const preBlob: any = await getBLOBandKEYandURLfromCloudFront(key);

  //       const blob = preBlob?.base64Data;
  //       const reuploadBlob = await getBlobFromUri(item?.url);
  //       // const reuploadBlob = "test";
  //       console.log("reuploadBlob", reuploadBlob);
  //       // creates key.Key
  //       return { key: item, blob, reuploadBlob };
  //     });
  //     const mediaArray = await Promise.all(mediaPromises);
  //     console.log("mediaArray", mediaArray);
  //     setBallotsMediaBlobs(mediaArray);
  //   }
  //   if (fileType === "images" || fileType === "videos") {
  //     const mediaPromises = ballotMedia?.map(async (item: any) => {
  //       // console.log('item', item);
  //       const key = item?.key || item?.Key;
  //       // return;

  //       // const blob: any = await getBLOBfromS3(key);
  //       // const preBlob = await getObjAudioFromCloudFront(key);

  //       // ⚠️ ⚠️ not needed for the URL that's why {blob = item.url} but this is needed for JoindayVotes to sent back to S3 ⚠️ ⚠️ ⚠️
  //       const preBlob: any = await getBLOBandKEYandURLfromCloudFront(key);

  //       // console.log('preBlob', preBlob);

  //       const blob = item?.url;
  //       // const blob = preBlob?.base64Data;
  //       const reuploadBlob = await getBlobFromUri(item?.url);
  //       console.log("reuploadBlob", reuploadBlob);
  //       // creates key.Key
  //       return { key: item, blob, reuploadBlob };
  //     });
  //     const mediaArray = await Promise.all(mediaPromises);
  //     // console.log('mediaArray', mediaArray);
  //     setBallotsMediaBlobs(mediaArray);
  //   }
  // };

  // const GETballotMediaS3 = async (fileType: string) => {
  //     let mediaCommentsPathS3 =
  //         fileType === 'images'
  //             ? await getDayBallotMediaFOLDERPathFromS3(day?.id, 'images')
  //             : fileType === 'audio'
  //             ? await getDayBallotMediaFOLDERPathFromS3(day?.id, 'audio')
  //             : fileType === 'videos' && (await getDayBallotMediaFOLDERPathFromS3(day?.id, 'videos'));

  //     if (!mediaCommentsPathS3) {
  //         return null;
  //     }

  //     let ballotMedia: any;
  //     ballotMedia = await getObjKeysFromFolderS3(mediaCommentsPathS3);
  //     console.log('ballotMedia', ballotMedia);

  //     if (fileType === 'images' || fileType === 'videos') {
  //         // Create an array of promises
  //         const mediaPromises = ballotMedia?.map(async (item: any) => {
  //             console.log('item', item);
  //             const key = item?.Key;
  //             // const blob: any = await getBLOBfromS3(key);
  //             const preBlob: any = await getBLOBandKEYandURLfromS3(key);
  //             // const preBlob: any = await getObjBlobFromS3(key);
  //             console.log('preBlob', preBlob);
  //             const blob = preBlob?.base64Data;
  //             const reuploadBlob = preBlob?.blob;
  //             // creates key.Key
  //             return { key: item, blob, reuploadBlob };
  //         });

  //         const mediaArray = await Promise.all(mediaPromises);
  //         setBallotsMediaBlobs(mediaArray);
  //     } else {
  //         const mediaPromises = ballotMedia?.map(async (item: any) => {
  //             console.log('item', item);
  //             const key = item?.Key;
  //             const preBlob: any = await getObjAudioFromS3(key);
  //             console.log('preBlob', preBlob);
  //             const blob = preBlob?.base64Data;
  //             const reuploadBlob = preBlob?.buffer;

  //             return { key: item, blob, reuploadBlob };
  //         });

  //         console.log('mediaPromises', mediaPromises);

  //         const mediaArray = await Promise.all(mediaPromises);
  //         console.log('mediaArray', mediaArray);

  //         // Update the state with all media
  //         setBallotsMediaBlobs(mediaArray);
  //     }

  //     console.log('ballotMedia', ballotMedia);
  // };

  // }, [currDaySoundComments])

  const loadBallotMedia = async () => {
    if (ballotType.includes("media")) {
      console.log("come on bruh you know it");
    }

    if (
      (ballotType.includes("media") && ballotsMediaBlobs?.length <= 1) ||
      !ballotsMediaBlobs
    ) {
      console.log("i mean we right here wittit no?");
      if (currBallot?.media_option_type === "images") {
        console.log("we are getting images");
        await GETballotMediaS3Func("images", day, setBallotsMediaBlobs);
        // await GETballotMediaS3('images');
      } else if (currBallot?.media_option_type === "audio") {
        // console.log('show me some audio');
        GETballotMediaS3Func("audio", day, setBallotsMediaBlobs);
      } else if (currBallot?.media_option_type === "videos") {
        await GETballotMediaS3Func("videos", day, setBallotsMediaBlobs);
        // await GETballotMediaS3('videos');
      }
    }
  };

  useEffect(() => {
    if (!ballotBin) {
      return;
    }

    const allVotes = ballotBin?.flatMap((ballots: any) => ballots?.votes);
    const allLikes = ballotBin?.flatMap((ballots: any) => ballots?.likes);
    const allStars = ballotBin?.flatMap((ballots: any) => ballots?.stars);

    setCurrVotes(allVotes);
    setBallotOptionsLikes(allLikes);
    setBallotOptionsStars(allStars);

    // handle media BLOBS. if the BLOBs correspond to CURR_DAY_BALLOT[CURR_DAY_BALLOT_BIN_INDEX] don't requery AWS S3.

    if (
      currBallot?.media_option_type &&
      (ballotsMediaBlobs?.length === 0 || !ballotsMediaBlobs)
    ) {
      loadBallotMedia();
    }
  }, [ballotBin]);

  const goBackToUploadedContent = () => {
    if (day?.thoughts?.id) {
      setCurrDaySelection("thoughts");
    }
    if (day?.moments?.id) {
      setCurrDaySelection("moments");
    }
    if (day?.fields?.id) {
      setCurrDaySelection("fields");
    }
    if (day?.greatfullagain?.id) {
      setCurrDaySelection("greatfullagain");
    }
  };

  const test = () => {
    console.log("comments", comments);
    console.log("showEngagementBallotOption", showEngagementBallotOption);
  };

  return (
    <ScrollView
      nestedScrollEnabled={true}
      contentContainerStyle={styles.ballotsCont}
    >
      {currBallot?.title && (
        <Text style={styles.text}> {currBallot?.title} </Text>
      )}

      {showVoteInfo ? (
        <BallotInfo
          currBallot={currBallot}
          day={day}
          event={event}
          setShowVoteInfo={setShowVoteInfo}
          setBallotBin={setBallotBin}
          setCurrVotes={setCurrVotes}
          setBallotOptionsLikes={setBallotOptionsLikes}
          setBallotOptionsStars={setBallotOptionsStars}
        />
      ) : (
        <BallotDisplayBar
          day={day}
          feed={feed}
          setFeed={setFeed}
          ballotsMediaBlobs={ballotsMediaBlobs}
          ballotBin={ballotBin}
          setBallotBin={setBallotBin}
          ballotBinIndex={ballotBinIndex}
          setBallotBinIndex={setBallotBinIndex}
          currVotes={currVotes}
          setCurrVotes={setCurrVotes}
          ballotOptionsLikes={ballotOptionsLikes}
          setBallotOptionsLikes={setBallotOptionsLikes}
          ballotOptionsStars={ballotOptionsStars}
          setBallotOptionsStars={setBallotOptionsStars}
          usersPassLocks={usersPassLocks}
          setUsersPassLocks={setUsersPassLocks}
          showVoteResultsNow={showVoteResultsNow}
          setShowVoteResultsNow={setShowVoteResultsNow}
          setShowVoteInfo={setShowVoteInfo}
          voteType={voteType}
          decision={decision}
          setDecision={setDecision}
          leaderboard={leaderboard}
          setLeaderboard={setLeaderboard}
          setAlmostDoneFinishingVote={setAlmostDoneFinishingVote}
          userSubmittedOptionsInputValue={userSubmittedOptionsInputValue}
          setUserSubmittedOptionsInputValue={setUserSubmittedOptionsInputValue}
          // also gonna need MediaBlob.
          didUserSubmit={didUserSubmit}
          setDidUserSubmit={setDidUserSubmit}
          displayAddMediaMenu={displayAddMediaMenu}
          setDisplayAddMediaMenu={setDisplayAddMediaMenu}
          comments={comments}
          setComments={setComments}
          setCurrDaySelection={setCurrDaySelection}
        />
      )}

      {showEngagementBallotOption && (
        // <View style={{ gap: 20 }}>
        //     <TouchableOpacity onPress={() => setShowEngagementBallotOption(false)}>
        //         <Text> hey </Text>
        //     </TouchableOpacity>

        //     <TouchableOpacity onPress={test}>
        //         <Text> test </Text>
        //     </TouchableOpacity>
        // </View>

        <ShowEngagement
          currBallot={currBallot}
          clickedOption={showEngagementBallotOption}
          // no difference between clickedOption && showEngagementBallotOption.
          showEngagementBallotOption={showEngagementBallotOption}
          setShowEngagementBallotOption={setShowEngagementBallotOption}
          day={day}
          ballotOptionsLikes={ballotOptionsLikes}
          ballotOptionsStars={ballotOptionsStars}
          currVotes={currVotes}
          allUserProfileIcons={allUserProfileIcons}
        />
      )}

      {
        // handle text first:
        userSubmittedOptionsInputValue?.length > 1 &&
          !currBallot?.is_media_vote && (
            <View style={styles.voteColumns}>
              <Text style={styles.text}>{userSubmittedOptionsInputValue}</Text>
            </View>
          )
      }

      {currBallot?.is_media_viote && displayAddMediaMenu && (
        <AddMediaProposedVote
          currBallot={currBallot}
          didUserSubmit={didUserSubmit}
          setDidUserSubmit={setDidUserSubmit}
          setDisplayAddMediaMenu={setDisplayAddMediaMenu}
          day={day}
          ballotsMediaBLOBs={ballotsMediaBlobs}
          setBallotsMediaBLOBs={setBallotsMediaBlobs}
          currVotes={currVotes}
          setBallotBin={setBallotBin}
          ballotBinIndex={ballotBinIndex}
        />
      )}

      {!showVoteInfo && !showEngagementBallotOption && (
        <VoteRowsOrVoteRowsMedia
          day={day}
          event={event}
          currBallot={currBallot}
          almostDoneFinishingVote={almostDoneFinishingVote}
          setAlmostDoneFinishingVote={setAlmostDoneFinishingVote}
          showEngagementBallotOption={showEngagementBallotOption}
          setShowEngagementBallotOption={setShowEngagementBallotOption}
          showVoteOutcomes={showVoteOutcomes}
          setShowVoteOutcomes={setShowVoteOutcomes}
          decision={decision}
          setDecision={setDecision}
          leaderboard={leaderboard}
          setLeaderboard={setLeaderboard}
          ballotBin={ballotBin}
          setBallotBin={setBallotBin}
          ballotBinIndex={ballotBinIndex}
          showVoteResultsNow={showVoteResultsNow}
          setShowVoteResultsNow={setShowVoteResultsNow}
          ballotOptionsLikes={ballotOptionsLikes}
          setBallotOptionsLikes={setBallotOptionsLikes}
          ballotOptionsStars={ballotOptionsStars}
          setBallotOptionsStars={setBallotOptionsStars}
          usersPassLocks={usersPassLocks}
          setUsersPassLocks={setUsersPassLocks}
          currVotes={currVotes}
          setCurrVotes={setCurrVotes}
          voteType={voteType}
          mediaVote={mediaVote}
          ballotsMediaBLOBs={ballotsMediaBlobs}
          setBallotsMediaBLOBs={setBallotsMediaBlobs}
          allUserProfileIcons={allUserProfileIcons}
          comments={comments}
          setComments={setComments}
          soundComments={soundComments}
          displayAddMediaMenu={displayAddMediaMenu}
          setDisplayAddMediaMenu={setDisplayAddMediaMenu}
        />
      )}
    </ScrollView>
  );
};

interface VoteRowsOrVoteRowsMediaProps {
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
  mediaVote: boolean;
  ballotsMediaBLOBs: any;
  setBallotsMediaBLOBs: any;
  allUserProfileIcons: any;
  comments: any;
  setComments: any;
  soundComments: any;
  displayAddMediaMenu: any;
  setDisplayAddMediaMenu: any;
}

const VoteRowsOrVoteRowsMedia: React.FC<VoteRowsOrVoteRowsMediaProps> = ({
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
  mediaVote,
  ballotsMediaBLOBs,
  setBallotsMediaBLOBs,
  allUserProfileIcons,
  comments,
  setComments,
  soundComments,
  displayAddMediaMenu,
  setDisplayAddMediaMenu,
}) => {
  const test = () => {
    console.log("comments", comments);
    console.log("test", test);
  };

  return voteType.includes("comment") ? (
    <CommentVoteRows
      day={day}
      event={event}
      currBallot={currBallot}
      almostDoneFinishingVote={almostDoneFinishingVote}
      setAlmostDoneFinishingVote={setAlmostDoneFinishingVote}
      showEngagementBallotOption={showEngagementBallotOption}
      setShowEngagementBallotOption={setShowEngagementBallotOption}
      showVoteOutcomes={showVoteOutcomes}
      setShowVoteOutcomes={setShowVoteOutcomes}
      decision={decision}
      setDecision={setDecision}
      leaderboard={leaderboard}
      setLeaderboard={setLeaderboard}
      ballotBin={ballotBin}
      setBallotBin={setBallotBin}
      ballotBinIndex={ballotBinIndex}
      showVoteResultsNow={showVoteResultsNow}
      setShowVoteResultsNow={setShowVoteResultsNow}
      ballotOptionsLikes={ballotOptionsLikes}
      setBallotOptionsLikes={setBallotOptionsLikes}
      ballotOptionsStars={ballotOptionsStars}
      setBallotOptionsStars={setBallotOptionsStars}
      usersPassLocks={usersPassLocks}
      setUsersPassLocks={setUsersPassLocks}
      currVotes={currVotes}
      setCurrVotes={setCurrVotes}
      comments={comments}
      setComments={setComments}
      soundComments={soundComments}
    />
  ) : mediaVote ? (
    <MediaVoteRows
      ballotVotes={currBallot?.votes}
      ballotOptions={currBallot?.options}
      currBallot={currBallot}
      ballotBin={ballotBin}
      setBallotBin={setBallotBin}
      showVoteResultsNow={showVoteResultsNow}
      setShowVoteResultsNow={setShowVoteResultsNow}
      day={day}
      ballotsMediaBLOBs={ballotsMediaBLOBs}
      setBallotsMediaBLOBs={setBallotsMediaBLOBs}
      currVotes={currVotes}
      setCurrVotes={setCurrVotes}
      ballotOptionsStars={ballotOptionsStars}
      ballotOptionsLikes={ballotOptionsLikes}
      usersPassLocks={usersPassLocks}
      setUsersPassLocks={setUsersPassLocks}
      setBallotOptionsStars={setBallotOptionsStars}
      setBallotOptionsLikes={setBallotOptionsLikes}
      allUserProfileIcons={allUserProfileIcons}
      displayAddMediaMenu={displayAddMediaMenu}
      setDisplayAddMediaMenu={setDisplayAddMediaMenu}
      ballotBinIndex={ballotBinIndex}
    />
  ) : (
    <VoteRows
      day={day}
      event={event}
      currBallot={currBallot}
      almostDoneFinishingVote={almostDoneFinishingVote}
      setAlmostDoneFinishingVote={setAlmostDoneFinishingVote}
      showEngagementBallotOption={showEngagementBallotOption}
      setShowEngagementBallotOption={setShowEngagementBallotOption}
      showVoteOutcomes={showVoteOutcomes}
      setShowVoteOutcomes={setShowVoteOutcomes}
      decision={decision}
      setDecision={setDecision}
      leaderboard={leaderboard}
      setLeaderboard={setLeaderboard}
      ballotBin={ballotBin}
      setBallotBin={setBallotBin}
      ballotBinIndex={ballotBinIndex}
      showVoteResultsNow={showVoteResultsNow}
      setShowVoteResultsNow={setShowVoteResultsNow}
      ballotOptionsLikes={ballotOptionsLikes}
      setBallotOptionsLikes={setBallotOptionsLikes}
      ballotOptionsStars={ballotOptionsStars}
      setBallotOptionsStars={setBallotOptionsStars}
      usersPassLocks={usersPassLocks}
      setUsersPassLocks={setUsersPassLocks}
      currVotes={currVotes}
      setCurrVotes={setCurrVotes}
      voteType={voteType}
    />
  );
};

const styles = StyleSheet.create({
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
  ballotsCont: {
    flexGrow: 1, // allow content to expand beyond viewport
    // height: screenHeight * 0.4,
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "100%",
    // borderColor: grayphite,
    // borderWidth: 3,
    paddingTop: 5,
  },
  text: {
    fontFamily: "Fuzzy Bubbles",
    fontSize: 24,
    width: "100%",
    paddingLeft: 5,
    color: grayphite,
    // boxSizing: 'border-box',
  },
  topBarRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    padding: 2,
    height: 10,
  },
  icon: {
    height: 20,
    width: 20,
  },
});

export default Ballots;
