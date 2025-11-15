//
import { useState } from "react";

//  <>
import { Text, TouchableOpacity, View, Image, StyleSheet } from "react-native";
import EventFiveStars from "./EventFiveStars";

// utils:
import { LockIcon, UnlockIcon } from "@/constants/Images";

interface CommentsLeaveStarsProps {
  comment: any;
  index: number;
  event: any;
  commentStars: any;
  setCommentStars: any;
  usersPassLocks: any;
  setUsersPassLocks: any;
  setStarClicked: any;
  commentStarsQuestionClick: any;
  setCommentStarsQuestionClick: any;
  setError: any;
  // commentsLeaveStarsLockClick: boolean,
  // setCommentsLeaveStarsLockClick: boolean,
}

const EventCommentsLeaveStars: React.FC<CommentsLeaveStarsProps> = ({
  comment,
  index,
  event,
  commentStars,
  setCommentStars,
  usersPassLocks,
  setUsersPassLocks,
  setStarClicked,
  commentStarsQuestionClick,
  setCommentStarsQuestionClick,
  setError,

  // commentsLeaveStarsLockClick,
  // setCommentsLeaveStarsLockClick,
}) => {
  const commentLock = comment?.lock;
  const commentUnlock = comment?.unlock;
  const commentIndex: number = index || 0;

  const [starClickedIndex, setStarClickedIndex] = useState(0);
  // index + 1 turn it into a halfStar if starIsCLicked it's over (i.e.) 3.5 stars. next star will be the half star.
  const [totalAvgStars, setTotalAvgStars] = useState(0);
  const [halfStarIndex, setHalfStarIndex] = useState(0);
  const [doesUserPassThoughtCommentLock, setDoesUserPassThoughtCommentLock] =
    useState<any>(null);

  // "cutesy" trick of showing user their own profile icon when they go to make a duplicate 1-5 stars rating. as in "I did this" just override data value instead.
  // const [manInMirror, setManInMirror] = useState(false);
  const [mirrorImg, setMirrorImg] = useState();

  // dayId:, eventId:, scrollContainerId: , scrollPos:, starsArray: , setStarState

  const goBackToComment = () => {
    setDoesUserPassThoughtCommentLock(null);
  };

  return doesUserPassThoughtCommentLock === false ? (
    <View style={styles.cont}>
      <View style={[styles.lockCont]}>
        <View style={styles.lockImageTextCont}>
          <TouchableOpacity onPress={goBackToComment}>
            <Image source={LockIcon} />
          </TouchableOpacity>
          <Text>{comment?.lock}</Text>
        </View>

        <View style={styles.lockImageTextCont}>
          <TouchableOpacity onPress={goBackToComment}>
            <Image source={UnlockIcon} />
          </TouchableOpacity>
          <Text> {comment?.unlock} </Text>
        </View>
      </View>
    </View>
  ) : (
    <View style={styles.cont}>
      <EventFiveStars
        comment={comment}
        index={index}
        setStarClicked={setStarClicked}
        event={event}
        commentStars={commentStars}
        setCommentStars={setCommentStars}
        usersPassLocks={usersPassLocks}
        setUsersPassLocks={setUsersPassLocks}
        starClickedIndex={starClickedIndex}
        setStarClickedIndex={setStarClickedIndex}
        commentStarsQuestionClick={commentStarsQuestionClick}
        setCommentStarsQuestionClick={setCommentStarsQuestionClick}
        setError={setError}
        doesUserPassThoughtCommentLock={doesUserPassThoughtCommentLock}
        setDoesUserPassThoughtCommentLock={setDoesUserPassThoughtCommentLock}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cont: {},
  icon: {
    height: 30,
    width: 30,
  },
  lockCont: {
    flexDirection: "row",
    gap: 10,
  },
  lockImageTextCont: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
});

export default EventCommentsLeaveStars;
