//
import { useState, useEffect } from "react";

// <>
import {
  View,
  Button,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
} from "react-native";
import Username from "./Username";
import CommentReplyInput from "./CommentReplyInput";
import SoundIconButton from "./SoundIconButton";
import LockUnlockInfoDisplayRow from "@/components/Content/Day/LockUnlockInfoDisplay/LockUnlockInfoDisplayRow/LockUnlockInfoDisplayRow";
import CommentsLeaveStars from "./CommentsLeaveStars/CommentsLeaveStars";
import ErrorSlippedUpBanana from "@/components/ErrorSlippedUpBanana";

// redux
import { RootState } from "@/redux/store/rootReducer";
import { useSelector, useDispatch, createDispatchHook } from "react-redux";
import {
  SET_CURRENT_USER,
  SET_CURRENT_USER_PRIVACY,
  SET_CURRENT_USER_MOST_RECENT_POST,
} from "@/redux/currentUser/currentUserSlice";

// utils:
import { useContentFunction } from "@/Contexts/ContentFunctions";
import {
  StarIcon,
  LockIcon,
  CommentIcon,
  RedBackArrowIcon,
  GreenForwardArrowIcon,
} from "@/constants/Images";
import { grayphite } from "@/constants/Colors";

interface CommentBodyBottomProps {
  settings: any;
  index: number;
  mapitem: any;
  indentIndex: number;
  replyInputValue: any;
  setReplyInputValue: any;
  replyInputIsTyping: any;
  setReplyInputIsTyping: any;
  soundCommentFile: any;
  setSoundCommentFile: any;
  voiceCommentClick: boolean;
  setVoiceCommentClick: any;
  soundComments: any;
  setSoundComments: any;
  day: any;
  usersPassLocks: any;
  setUsersPassLocks: any;
  commentStars: any;
  setCommentStars: any;
  comments: any;
  setComments: any;
  commentStarsQuestionClick: any;
  setCommentStarsQuestionClick: any;
  showChildComments: boolean;
  setShowChildComments: any;
}

const CommentBodyBottom: React.FC<CommentBodyBottomProps> = ({
  settings,
  index,
  mapitem,
  indentIndex,
  replyInputValue,
  setReplyInputValue,
  replyInputIsTyping,
  setReplyInputIsTyping,
  soundCommentFile,
  setSoundCommentFile,
  voiceCommentClick,
  setVoiceCommentClick,
  soundComments,
  setSoundComments,
  day,
  usersPassLocks,
  setUsersPassLocks,
  commentStars,
  setCommentStars,
  comments,
  setComments,
  commentStarsQuestionClick,
  setCommentStarsQuestionClick,
  showChildComments,
  setShowChildComments,
}) => {
  const { submitTextComment, submitSoundCommentThought } = useContentFunction();

  const {
    dayCommenterCanDetermine,
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
  } = settings;

  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );
  const [commentBodyBottomLockClick, setCommentBodyBottomLockClick] =
    useState<boolean>(false);
  const [commentsLeaveStarsLockClick, setCommentsLeaveStarsLockClick] =
    useState<boolean>(false);
  const [starClicked, setStarClicked] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const dayLock = day?.lock;
  const leaveCommentLockIsUnlocked =
    dayLock === "leave replies" &&
    usersPassLocks?.some((lockPass: any) => {
      lockPass?.day_id === day?.id &&
        (lockPass?.pass_post_all === true ||
          (lockPass?.pass_post === true &&
            lockPass?.user_id === CURRENT_USER?.id));
    });

  const noLock = !dayLock;
  const dayLockNotRelevant = dayLock !== "leave replies";
  const leaveCommentLockRelevantAndUnlocked =
    dayLock === "leave replies" && leaveCommentLockIsUnlocked;
  const leaveCommentLockShouldShowContent =
    noLock || dayLockNotRelevant || leaveCommentLockRelevantAndUnlocked;

  const commentLock = mapitem?.lock;

  const lockClick = () => {
    setCommentBodyBottomLockClick(!commentBodyBottomLockClick);
  };

  const starClickFunc = () => {
    setStarClicked(true);
  };

  const submitComment = async () => {
    console.log("hey girl!");

    if (
      day?.commenter_can_determine === true &&
      commenterCanDetermineCheckboxCheckpoint === false &&
      mapitem?.commenter_can_determine === true
    ) {
      console.log("okay we did dat lol");
      setCommenterCanDetermineCheckboxCheckpoint(true);
      return;
    }

    if (voiceCommentClick === true) {
      const newComments = await submitSoundCommentThought(
        // mapitem being the
        mapitem,
        index,
        null,
        null,
        null,
        // why need the commenterCanDetermineCheckboxCheckpoint?
        commenterCanDetermineCheckboxCheckpoint,
        setCommenterCanDetermineCheckboxCheckpoint,
        soundCommentFile,
        setSoundCommentFile,
        setReplyInputValue,
        soundComments,
        setSoundComments,
        newCommentThoughtsOk,
        newCommentStarrable,
        newCommentStarsShowAvg,
        newCommentStarsShowUsers,
        newCommentNonAnonymous,
        newCommentCommenterCanDetermine,
        newCommentVoiceOk,
        newCommentTextOk,
        anonymousCommentsOk,
        false,
        false,
        newCommentLock,
        newCommentUnlock,
        day,
        usersPassLocks,
        comments,
        setComments,
        setError
      );
      if (!newComments) {
        setError(true);
        return;
      }
      // subvmitSoundCommentThought
    } else {
      console.log("else block");
      if (replyInputValue?.length <= 1) {
        return null;
      }

      console.log("running submitComment");

      return;

      const newComments = await submitTextComment(
        mapitem,
        index,
        null,
        null,
        null,
        newCommentIcon,
        commenterCanDetermineCheckboxCheckpoint,
        setCommenterCanDetermineCheckboxCheckpoint,
        replyInputValue,
        newCommentThoughtsOk,
        newCommentStarrable,
        newCommentNonAnonymous,
        newCommentStarsShowAvg,
        newCommentStarsShowUsers,
        false,
        false,
        newCommentCommenterCanDetermine,
        newCommentVoiceOk,
        newCommentTextOk,
        anonymousCommentsOk,
        newCommentLock,
        newCommentUnlock,
        day,
        setUsersPassLocks,
        setSoundCommentFile,
        setReplyInputValue,
        setComments,
        setError
      );
      if (!newComments) {
        setError(true);
        return;
      }
      console.log("newComments", newComments);
    }
  };

  const showChildCommentsClick = () => {
    setShowChildComments(!showChildComments);
  };

  const test = () => {
    console.log("indentIndex", indentIndex);
  };

  return commentBodyBottomLockClick ? (
    <LockUnlockInfoDisplayRow
      lockText={day?.lock || "lock"}
      unlockText={day?.unlock || "unlock"}
      justifyContent="flex-start"
      width="100%"
      setState={setCommentBodyBottomLockClick}
    />
  ) : starClicked ? (
    <View style={styles.starClickedCont}>
      {starClicked && (
        <CommentsLeaveStars
          comment={mapitem}
          index={index}
          day={day}
          commentStars={commentStars}
          setCommentStars={setCommentStars}
          usersPassLocks={usersPassLocks}
          setUsersPassLocks={setUsersPassLocks}
          setStarClicked={setStarClicked}
          setCommentStarsQuestionClick={setCommentStarsQuestionClick}
          commentStarsQuestionClick={commentStarsQuestionClick}
          setError={setError}
        />
      )}
    </View>
  ) : error === true ? (
    <ErrorSlippedUpBanana size="mini" setShowError={setError} />
  ) : (
    <View
      style={[{ left: indentIndex === 1 ? indentIndex * 10 : 0 }, styles.cont]}
    >
      {/* // <View style={[styles.cont]}> */}
      {/* <Text> yo </Text> */}

      {/* standard issue username of commenter */}
      <View style={styles.leftSideCont}>
        <Username
          mapitem={mapitem}
          usersPassLocks={usersPassLocks}
          indentIndex={indentIndex}
          index={index}
          day={day}
          comments={comments}
        />

        <CommentReplyInput
          day={day}
          replyInputValue={replyInputValue}
          setReplyInputValue={setReplyInputValue}
          setReplyInputIsTyping={setReplyInputIsTyping}
          mapitem={mapitem}
        />

        <SoundIconButton
          day={day}
          commentStarsQuestionClick={commentStarsQuestionClick}
          setCommentStarsQuestionClick={setCommentStarsQuestionClick}
          replyInputIsTyping={replyInputIsTyping}
          setReplyInputIsTyping={setReplyInputIsTyping}
          replyInputValue={replyInputValue}
          setReplyInputValue={setReplyInputValue}
          voiceCommentClick={voiceCommentClick}
          setVoiceCommentClick={setVoiceCommentClick}
          leaveCommentLockShouldShowContent={leaveCommentLockShouldShowContent}
        />

        {CURRENT_USER?.id > 0 && (
          <TouchableOpacity
            style={styles.addCommentPlusInput}
            onPress={submitComment}
          >
            <Text style={styles.addCommentInputText}> + </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* setReplyInput which changes <CommentBodyTop> comment: {mapitem?.thought} to reflect input value. show logged in user what their comment would be: */}

      {leaveCommentLockShouldShowContent ? (
        <View style={styles.textInputOrSoundIconRow}>
          <View style={styles.rightSideCont}>
            <TouchableOpacity onPress={starClickFunc}>
              <Image style={styles.icon} source={StarIcon} />
            </TouchableOpacity>

            <TouchableOpacity onPress={showChildCommentsClick}>
              <Image style={styles.icon} source={CommentIcon} />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity onPress={lockClick}>
          <Image source={LockIcon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cont: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 2.5,
    paddingLeft: 2.5,
    paddingRight: 5,
    paddingBottom: 1,
    // borderBottomRightRadius: 2

    // paddingBottom: 2.5
    // justifyContent: "flex-start",
    // gap: 10,
  },
  starClickedCont: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  leftSideCont: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
    // gap: 10
  },
  rightSideCont: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
    // gap: 10
  },
  lockImageTextCont: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  textInputOrSoundIconRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  icon: {
    height: 24,
    width: 24,
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
  input: {
    width: 24, // equivalent of 1.5rem (assuming 1rem = 16px)
    margin: 0,
    alignSelf: "center",
    borderRadius: 50, // makes it circular
    borderTopLeftRadius: 14.5,
    borderTopRightRadius: 65.5,
    borderBottomLeftRadius: 122.5,
    borderBottomRightRadius: 30,
    color: "#444", // equivalent of $grayphite
    fontFamily: "fuzzy", // make sure the font is linked properly
    fontSize: 10, // or adjust based on design
    borderWidth: 1.5,
    borderColor: "#44454fea", // border color
  },
});

export default CommentBodyBottom;
