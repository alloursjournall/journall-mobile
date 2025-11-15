// useState:
import { useState } from "react";

//  <>
import { View, StyleSheet } from "react-native";
import EventMainRootCommentsLoop from "../EventMainRootCommentsLoop";
import EventCommentBodyTop from "./EventCommentBodyTop";
import EventCommentBodyBottom from "./CommentBodyBottom/EventCommentBodyBottom";
import EventChildCommentsLoop from "./EventChildCommentsLoop";
import StarsShowUsers from "@/components/Content/Day/DayDisplays/Comments/TheComment/StarsShowUsers.tsx/StarsShowUsers";
import EventCheckboxContainer from "./EventCheckboxContainer";

// utils:
import { grayphite } from "@/constants/Colors";
import { useContentFunction } from "@/Contexts/ContentFunctions";

interface TheCommentProps {
  mapitem: any;
  index: number;
  indentIndex: any;
  allUserProfileIcons: any;
  event: any;
  usersPassLocks: any;
  setUsersPassLocks: any;
  usersAllowedToUnlock: any;
  setUsersAllowedToUnlock: any;
  comments: any;
  setComments: any;
  commentStars: any;
  soundComments: any;
  setSoundComments: any;
  setCommentStars: any;
}

const EventTheComment: React.FC<TheCommentProps> = ({
  mapitem,
  index,
  indentIndex,
  allUserProfileIcons,
  event,
  usersPassLocks,
  setUsersPassLocks,
  usersAllowedToUnlock,
  setUsersAllowedToUnlock,
  comments,
  setComments,
  soundComments,
  setSoundComments,
  commentStars,
  setCommentStars,
}) => {
  const { submitTextComment, submitSoundCommentThought } = useContentFunction();

  const eventCommenterCanDetermine = event?.commenter_can_determine;

  // comment settings when user replies.
  const [newCommentStarrable, setNewCommentStarrable] = useState("yes");
  const [newCommentThoughtsOk, setNewCommentThoughtsOk] = useState("yes");
  const [newCommentStarsShowAvg, setNewCommentStarsShowAvg] = useState(true);
  const [newCommentStarsShowUsers, setNewCommentStarsShowUsers] =
    useState(true);
  const [newCommentLock, setNewCommentLock] = useState("");
  const [newCommentUnlock, setNewCommentUnlock] = useState("");
  const [anonymousCommentsOk, setAnonymousCommentsOk] = useState(true);
  const [newCommentNonAnonymous, setNewCommentNonAnonymous] = useState("yes");
  const [newCommentVoiceOk, setNewCommentVoiceOk] = useState<boolean>(true);
  const [newCommentTextOk, setNewCommentTextOk] = useState<boolean>(true);
  const [newCommentCommenterCanDetermine, setNewCommentCommenterCanDetermine] =
    useState(false);
  const [newCommentIcon, setNewCommentIcon] = useState<any>(null); // newCommentIcon being thoughts.commentIcon for the new, mid-made comment
  const [error, setError] = useState<boolean>(false);

  // 🚨 🚨
  const [
    commenterCanDetermineCheckboxCheckpoint,
    setCommenterCanDetermineCheckboxCheckpoint,
  ] = useState<any>(false);
  // const [commenterCanDetermineCheckboxCheckpoint, setCommenterCanDetermineCheckboxCheckpoint] = useState<any>( (day?.commenter_can_determine === true && mapitem?.commenter_can_determine === true) ? true : false);

  // webapp: COMMENTING_STARS_QUESTION_CLICK_BIN[comments.length] not global state array[i] just a local state boolean. also webapp: <Comments> not <TheComment/Comment> mobile app: <Stars> is in <TheComment/> itself not <Comments/> the outer loop.
  const [commentStarsQuestionClick, setCommentStarsQuestionClick] =
    useState<boolean>(false);
  // webapp: CURR_DAY_COMMENTING_USERS_SHOW_CHILD_COMMENTS_BIN
  const [showChildComments, setShowChildComments] = useState<boolean>(false);

  const [replyInputValue, setReplyInputValue] = useState(``);
  const [replyInputIsTyping, setReplyInputIsTyping] = useState(false);

  // voice comment state!
  // const [stopVoiceRecording, setStopVoiceRecording] = useState<boolean>(false)         // would've used stopVoiceRecording as a boolean to be toggled within {startRecording}. think there's no need.
  const [soundCommentFile, setSoundCommentFile] = useState<Blob | null>(null);
  const [voiceCommentClick, setVoiceCommentClick] = useState<boolean>(false);

  return commentStarsQuestionClick ? (
    <View style={styles.commentCont}>
      <StarsShowUsers
        comment={mapitem}
        commentStars={commentStars}
        setCommentStars={setCommentStars}
        usersPassLocks={usersPassLocks}
        comments={comments}
        allUserProfileIcons={allUserProfileIcons}
        setCommentStarsQuestionClick={setCommentStarsQuestionClick}
      />
    </View>
  ) : commenterCanDetermineCheckboxCheckpoint ? (
    <EventCheckboxContainer
      comment={mapitem}
      index={index}
      indentIndex={indentIndex}
      newCommentLock={newCommentLock}
      setNewCommentLock={setNewCommentLock}
      setNewCommentUnlock={setNewCommentUnlock}
      newCommentStarrable={newCommentStarrable}
      setNewCommentStarrable={setNewCommentStarrable}
      newCommentThoughtsOk={newCommentThoughtsOk}
      setNewCommentThoughtsOk={setNewCommentThoughtsOk}
      newCommentStarsShowAvg={newCommentStarsShowAvg}
      setNewCommentStarsShowAvg={setNewCommentStarsShowAvg}
      newCommentStarsShowUsers={newCommentStarsShowUsers}
      setNewCommentStarsShowUsers={setNewCommentStarsShowUsers}
      newCommentVoiceOk={newCommentVoiceOk}
      setNewCommentVoiceOk={setNewCommentVoiceOk}
      newCommentTextOk={newCommentTextOk}
      setNewCommentTextOk={setNewCommentTextOk}
      newCommentNonAnonymous={newCommentNonAnonymous}
      setNewCommentNonAnonymous={setNewCommentNonAnonymous}
      anonymousCommentsOk={anonymousCommentsOk}
      setAnonymousCommentsOk={setAnonymousCommentsOk}
      setNewCommentCommenterCanDetermine={setNewCommentCommenterCanDetermine}
      commenterCanDetermineCheckboxCheckpoint={
        commenterCanDetermineCheckboxCheckpoint
      }
      setCommenterCanDetermineCheckboxCheckpoint={
        setCommenterCanDetermineCheckboxCheckpoint
      }
      allUserProfileIcons={allUserProfileIcons}
      newCommentCommenterCanDetermine={newCommentCommenterCanDetermine}
      replyInputValue={replyInputValue}
      newCommentUnlock={newCommentUnlock}
      newCommentIcon={newCommentIcon}
      event={event}
      usersPassLocks={usersPassLocks}
      setUsersPassLocks={setUsersPassLocks}
      soundCommentFile={soundCommentFile}
      setSoundCommentFile={setSoundCommentFile}
      soundComments={soundComments}
      setSoundComments={setSoundComments}
      setReplyInputValue={setReplyInputValue}
      comments={comments}
      setComments={setComments}
      setError={setError}
      voiceCommentClick={voiceCommentClick}
    />
  ) : (
    <View style={styles.commentCont}>
      <EventCommentBodyTop
        mapitem={mapitem}
        index={index}
        indentIndex={indentIndex}
        settings={{
          eventCommenterCanDetermine,
          commenterCanDetermineCheckboxCheckpoint,
          setCommenterCanDetermineCheckboxCheckpoint,
          newCommentLock,
          setNewCommentLock,
          newCommentUnlock,
          setNewCommentUnlock,
          newCommentStarrable,
          setNewCommentStarrable,
          setNewCommentThoughtsOk,
          newCommentStarsShowAvg,
          setNewCommentStarsShowAvg,
          newCommentStarsShowUsers,
          setNewCommentStarsShowUsers,
          newCommentVoiceOk,
          setNewCommentVoiceOk,
          newCommentTextOk,
          setNewCommentTextOk,
          newCommentNonAnonymous,
          setNewCommentNonAnonymous,
          anonymousCommentsOk,
          setAnonymousCommentsOk,
          newCommentCommenterCanDetermine,
          setNewCommentCommenterCanDetermine,
        }}
        // handleMouseDown={handleMouseDown}
        // handleMouseUp={handleMouseUp}
        // containerRef={containerRef}
        // animationStarted={animationStarted}
        // playRecording={playRecording}
        // deleteRecording={deleteRecording}
        voiceCommentClick={voiceCommentClick}
        soundCommentFile={soundCommentFile}
        setSoundCommentFile={setSoundCommentFile}
        replyInputIsTyping={replyInputIsTyping}
        replyInputValue={replyInputValue}
        soundComments={soundComments}
        setSoundComments={setSoundComments}
        allUserProfileIcons={allUserProfileIcons}
        event={event}
        usersPassLocks={usersPassLocks}
        setUsersPassLocks={setUsersPassLocks}
        usersAllowedToUnlock={usersAllowedToUnlock}
        setUsersAllowedToUnlock={setUsersAllowedToUnlock}
        comments={comments}
        setComments={setComments}
      />

      <EventCommentBodyBottom
        settings={{
          eventCommenterCanDetermine,
          commenterCanDetermineCheckboxCheckpoint,
          setCommenterCanDetermineCheckboxCheckpoint,
          newCommentLock,
          setNewCommentLock,
          newCommentUnlock,
          setNewCommentUnlock,
          newCommentStarrable,
          setNewCommentStarrable,
          newCommentThoughtsOk,
          setNewCommentThoughtsOk,
          newCommentStarsShowAvg,
          setNewCommentStarsShowAvg,
          newCommentStarsShowUsers,
          setNewCommentStarsShowUsers,
          newCommentVoiceOk,
          setNewCommentVoiceOk,
          newCommentTextOk,
          setNewCommentTextOk,
          newCommentNonAnonymous,
          setNewCommentNonAnonymous,
          anonymousCommentsOk,
          setAnonymousCommentsOk,
          newCommentCommenterCanDetermine,
          setNewCommentCommenterCanDetermine,
          newCommentIcon,
        }}
        index={index}
        mapitem={mapitem}
        indentIndex={indentIndex}
        replyInputValue={replyInputValue}
        setReplyInputValue={setReplyInputValue}
        replyInputIsTyping={replyInputIsTyping}
        setReplyInputIsTyping={setReplyInputIsTyping}
        soundCommentFile={soundCommentFile}
        setSoundCommentFile={setSoundCommentFile}
        voiceCommentClick={voiceCommentClick}
        setVoiceCommentClick={setVoiceCommentClick}
        soundComments={soundComments}
        setSoundComments={setSoundComments}
        event={event}
        usersPassLocks={usersPassLocks}
        setUsersPassLocks={setUsersPassLocks}
        commentStars={commentStars}
        setCommentStars={setCommentStars}
        comments={comments}
        setComments={setComments}
        commentStarsQuestionClick={commentStarsQuestionClick}
        setCommentStarsQuestionClick={setCommentStarsQuestionClick}
        showChildComments={showChildComments}
        setShowChildComments={setShowChildComments}
      />

      {/* // if comments array has parent_thought_id of the current comment, and the SHOW_CHILD_COMMENTS state has [i] (mapitem) = true, then show the <ChildComments/> */}
      {showChildComments &&
        comments?.some(
          (comments: any) => comments?.parent_thought_id === mapitem?.id
        ) === true && (
          <EventChildCommentsLoop
            parentThought={mapitem}
            indentIndex={indentIndex}
            soundComments={soundComments}
            setSoundComments={setSoundComments}
            allUserProfileIcons={allUserProfileIcons}
            event={event}
            usersPassLocks={usersPassLocks}
            setUsersPassLocks={setUsersPassLocks}
            usersAllowedToUnlock={usersAllowedToUnlock}
            setUsersAllowedToUnlock={setUsersAllowedToUnlock}
            comments={comments}
            setComments={setComments}
            commentStars={commentStars}
            setCommentStars={setCommentStars}
          />
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  commentCont: {
    flexDirection: "column",
    gap: 0,
    justifyContent: "center",
    alignItems: "flex-start",
    borderWidth: 2,
    borderColor: grayphite,
    padding: 5,
    boxSizing: "border-box",
  },

  BOBblackoutbar: {
    borderWidth: 1,
    borderColor: grayphite,
    backgroundColor: "white",
  },
});

export default EventTheComment;
