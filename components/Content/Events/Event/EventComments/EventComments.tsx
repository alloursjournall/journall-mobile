// top level imports
import React, { useState, useEffect } from "react";

// @reduxjs/toolkit:
import { RootState } from "redux/store/rootReducer";
import { useSelector } from "react-redux";

import { Dimensions, View, StyleSheet } from "react-native";
import EventMainRootCommentInputBar from "./EventMainRootCommentInputBar";
import EventMainRootTestComment from "./EventMainRootTestComment";
import EventMainRootCommentsLoop from "./EventMainRootCommentsLoop";

// utils:
import { API } from "@env";
import axios from "axios";
import { getObjKeysFromFolderS3QueryStringFunc } from "@/graphql/queries";

interface props {
  event: any;
  usersPassLocks: any;
  setUsersPassLocks: any;
  usersAllowedToUnlock: any;
  setUsersAllowedToUnlock: any;
  comments: any;
  setComments: any;
  commentStars: any;
  setCommentStars: any;
  stars: any;
  setStars: any;
  allUserProfileIcons: any;
}

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const EventComments: React.FC<props> = ({
  event,
  usersPassLocks,
  setUsersPassLocks,
  usersAllowedToUnlock,
  setUsersAllowedToUnlock,
  comments,
  setComments,
  commentStars,
  setCommentStars,
  stars,
  setStars,
  allUserProfileIcons,
}) => {
  const [mainRootCommentIsTyping, setMainRootCommentIsTyping] = useState(false);
  const [mainRootCommentInputValue, setMainRootCommentInputValue] =
    useState("");
  let [mainRootCommentIcon, setMainRootCommentIcon] = useState(null);

  const [mainCommentStarrable, setMainCommentStarrable] = useState("yes");
  const [mainCommentThoughtsOk, setMainCommentThoughtsOk] = useState("yes");
  const [mainCommentLock, setMainCommentLock] = useState("");
  const [mainCommentUnlock, setMainCommentUnlock] = useState("");
  const [mainCommentIsNonAnonymous, setMainCommentIsNonAnonymous] =
    useState("yes");
  const [mainCommentStarsShowAvg, setMainCommentStarsShowAvg] = useState(true);
  const [mainCommentStarsShowUsers, setMainCommentStarsShowUsers] =
    useState(true);
  const [mainCommentVoiceOk, setMainCommentVoiceOk] = useState(true);
  const [mainCommentTextOk, setMainCommentTextOk] = useState(true);
  // const [mainCommentVideoOk, setMainCommentVideoOk] = useState(false)
  const [mainCommentAnonymousCommentsOk, setMainCommentAnonymousCommentsOk] =
    useState(false);
  const [
    mainCommentCommenterCanDetermine,
    setMainCommentCommenterCanDetermine,
  ] = useState(true);
  //  mainCheckboxCheckpoint is like commenterCanDetermineCheckboxCheckpoint, defined in <Comment.tsx/> which renders <CheckboxContainer/>
  const [mainCheckboxCheckpoint, setMainCheckboxCheckpoint] = useState(false);

  // custom notifications state which appears on ,MainRootCheckboxContainer/>, isn't a feature for replies, but only direct comments to posts.
  const [customNotificationMsg, setCustomNotificationMsg] = useState("");

  const [soundComments, setSoundComments] = useState<any>(null);

  const [startVoiceRecording, setStartVoiceRecording] =
    useState<boolean>(false);
  const [animationStarted, setAnimationStarted] = useState<boolean>(false);
  const [mainRootSoundCommentFile, setMainRootSoundCommentFile] =
    useState<Blob | null>(null);
  const [mainRootSoundCommentClick, setMainRootSoundCommentClick] =
    useState<boolean>(false);
  const [mainRootCommentIsVoice, setMainRootCommentIsVoice] =
    useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );

  console.log("well this is working");

  useEffect(() => {
    const mediaCommentsFunc = async () => {
      console.log("media comments func");

      const mediaCommentsStringS3 = `media/day-${event?.id}-folder/media-comments`;
      // const mediaCommentKeys: any = await getObjKeysFromFolderS3(mediaCommentsStringS3);

      const query = getObjKeysFromFolderS3QueryStringFunc(
        mediaCommentsStringS3
      );

      const predata: any = await axios.post(
        API,
        // "https://journallapi.vercel.app/api/graphql",
        {
          query: query,
        }
      );
      if (!predata) {
        return null;
      }

      console.log("predata", predata);
      let data = predata?.data?.data?.getObjKeysFromFolderS3;
      const mediaCommentKeys = JSON.parse(data);

      console.log("mediaCommentKeys", mediaCommentKeys);

      if (!mediaCommentKeys || mediaCommentKeys === "error") {
        return;
      }

      const mediaComments = await Promise.all(
        mediaCommentKeys?.map(async (keys: any) => {
          try {
            const key = keys?.Key;
            console.log("key", key);
            // ⚠️ hitting S3 direct:
            // const soundBLOB = await getObjAudioFromS3(key);
            // console.log('soundBLOB', soundBLOB);
            // if (!soundBLOB) {
            //     return;
            // }
            const soundComment: any = {
              thought: { key: keys?.key },
              blob: keys?.url,
            };

            return soundComment;
          } catch (err) {
            console.error(`Error fetching blob for blob: ${keys}`, err);
            return null; // Handle failures gracefully
          }
        })
      );
      console.log("mediaComments", mediaComments);
      setSoundComments(mediaComments);
    };
    mediaCommentsFunc();
  }, []);

  const leaveCommentLockIsUnlocked =
    event?.lock === "leave comments" &&
    usersPassLocks?.some((lockPass: any) => {
      return (
        lockPass?.event_id === event?.id &&
        (lockPass?.pass_post_all === true ||
          (lockPass?.pass_post === true &&
            lockPass?.user_id === CURRENT_USER?.id))
      );
    });

  return (
    <View style={styles.commentsCont}>
      <EventMainRootCommentInputBar
        mainRootCommentInputValue={mainRootCommentInputValue}
        setMainRootCommentInputValue={setMainRootCommentInputValue}
        mainRootCommentIsTyping={mainRootCommentIsTyping}
        setMainRootCommentIsTyping={setMainRootCommentIsTyping}
        mainRootCommentIcon={mainRootCommentIcon}
        setMainRootCommentIcon={setMainRootCommentIcon}
        mainRootSoundCommentFile={mainRootSoundCommentFile}
        setMainRootSoundCommentFile={setMainRootSoundCommentFile}
        mainRootSoundCommentClick={mainRootSoundCommentClick}
        setMainRootSoundCommentClick={setMainRootSoundCommentClick}
        mainCommentLock={mainCommentLock}
        setMainCommentLock={setMainCommentLock}
        mainCommentUnlock={mainCommentUnlock}
        setMainCommentUnlock={setMainCommentUnlock}
        mainCommentStarrable={mainCommentStarrable}
        setMainCommentStarrable={setMainCommentStarrable}
        mainCommentThoughtsOk={mainCommentThoughtsOk}
        setMainCommentThoughtsOk={setMainCommentThoughtsOk}
        mainCommentStarsShowAvg={mainCommentStarsShowAvg}
        setMainCommentStarsShowAvg={setMainCommentStarsShowAvg}
        mainCommentStarsShowUsers={mainCommentStarsShowUsers}
        setMainCommentStarsShowUsers={setMainCommentStarsShowUsers}
        mainCommentVoiceOk={mainCommentVoiceOk}
        setMainCommentVoiceOk={setMainCommentVoiceOk}
        mainCommentTextOk={mainCommentTextOk}
        setMainCommentTextOk={setMainCommentTextOk}
        mainCommentAnonymousCommentsOk={mainCommentAnonymousCommentsOk}
        setMainCommentAnonymousCommentsOk={setMainCommentAnonymousCommentsOk}
        mainCommentCommenterCanDetermine={mainCommentCommenterCanDetermine}
        setMainCommentCommenterCanDetermine={
          setMainCommentCommenterCanDetermine
        }
        mainCheckboxCheckpoint={mainCheckboxCheckpoint}
        setMainCheckboxCheckpoint={setMainCheckboxCheckpoint}
        customNotificationMsg={customNotificationMsg}
        setCustomNotificationMsg={setCustomNotificationMsg}
        mainCommentIsNonAnonymous={mainCommentIsNonAnonymous}
        setMainCommentIsNonAnonymous={setMainCommentIsNonAnonymous}
        event={event}
        usersPassLocks={usersPassLocks}
        setUsersPassLocks={setUsersPassLocks}
        comments={comments}
        setComments={setComments}
        allUserProfileIcons={allUserProfileIcons}
        setError={setError}
        soundComments={soundComments}
        setSoundComments={setSoundComments}
      />

      {(mainRootCommentInputValue?.length >= 1 ||
        mainRootSoundCommentClick) && (
        <EventMainRootTestComment
          mainCommentStarrable={mainCommentStarrable}
          setMainCommentStarrable={setMainCommentStarrable}
          mainCommentThoughtsOk={mainCommentThoughtsOk}
          setMainCommentThoughtsOk={setMainCommentThoughtsOk}
          mainCommentLock={mainCommentLock}
          setMainCommentLock={setMainCommentLock}
          mainCommentUnlock={mainCommentUnlock}
          setMainCommentUnlock={setMainCommentUnlock}
          mainCommentIsNonAnonymous={mainCommentIsNonAnonymous}
          setMainCommentIsNonAnonymous={setMainCommentIsNonAnonymous}
          mainCommentStarsShowAvg={mainCommentStarsShowAvg}
          setMainCommentStarsShowAvg={setMainCommentStarsShowAvg}
          mainCommentStarsShowUsers={mainCommentStarsShowUsers}
          setMainCommentStarsShowUsers={setMainCommentStarsShowUsers}
          mainCommentVoiceOk={mainCommentVoiceOk}
          setMainCommentVoiceOk={setMainCommentVoiceOk}
          mainCommentTextOk={mainCommentTextOk}
          setMainCommentTextOk={setMainCommentTextOk}
          mainCommentAnonymousCommentsOk={mainCommentAnonymousCommentsOk}
          setMainCommentAnonymousCommentsOk={setMainCommentAnonymousCommentsOk}
          mainCheckboxCheckpoint={mainCheckboxCheckpoint}
          setMainCheckboxCheckpoint={setMainCheckboxCheckpoint}
          mainCommentCommenterCanDetermine={mainCommentCommenterCanDetermine}
          setMainCommentCommenterCanDetermine={
            setMainCommentCommenterCanDetermine
          }
          customNotificationMsg={customNotificationMsg}
          setCustomNotificationMsg={setCustomNotificationMsg}
          mainRootCommentIcon={mainRootCommentIcon}
          setMainRootCommentIcon={setMainRootCommentIcon}
          mainRootCommentInputValue={mainRootCommentInputValue}
          setMainRootCommentInputValue={setMainRootCommentInputValue}
          mainRootSoundCommentClick={mainRootSoundCommentClick}
          setMainRootSoundCommentClick={setMainRootSoundCommentClick}
          event={event}
          allUserProfileIcons={allUserProfileIcons}
          comments={comments}
          setComments={setComments}
          soundComments={soundComments}
          setSoundComments={setSoundComments}
          usersPassLocks={usersPassLocks}
          setUsersPassLocks={setUsersPassLocks}
        />
      )}

      {(!event?.lock ||
        event?.lock !== "leave comments" ||
        (event?.lock === "leave comments" && leaveCommentLockIsUnlocked)) && (
        <EventMainRootCommentsLoop
          allUserProfileIcons={allUserProfileIcons}
          event={event}
          usersPassLocks={usersPassLocks}
          setUsersPassLocks={setUsersPassLocks}
          usersAllowedToUnlock={usersAllowedToUnlock}
          setUsersAllowedToUnlock={setUsersAllowedToUnlock}
          comments={comments}
          setComments={setComments}
          soundComments={soundComments}
          setSoundComments={setSoundComments}
          commentStars={commentStars}
          setCommentStars={setCommentStars}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  commentsCont: {
    height: screenHeight * 0.4,
    width: "100%", // Ensure it takes full widt
    padding: 10, // Add some padding to avoid content touching the edges
  },
});

export default EventComments;
