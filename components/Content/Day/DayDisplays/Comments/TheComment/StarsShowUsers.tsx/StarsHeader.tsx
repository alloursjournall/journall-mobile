import React, { useState } from "react";

// redux:
import { RootState } from "@/redux/store/rootReducer";
import { useSelector, useDispatch, createDispatchHook } from "react-redux";

// <>
import {
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";

// utils:
import { useContentFunction } from "@/Contexts/ContentFunctions";
import { grayphite } from "@/constants/Colors";
import {
  StarIcon,
  LockIcon,
  UnlockIcon,
  RedBackArrowIcon,
} from "@/constants/Images";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

interface props {
  comment: any;
  commentStars: any;
  usersPassLocks: any;
}

const StarsHeader: React.FC<props> = ({
  comment,
  commentStars,
  usersPassLocks,
}) => {
  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );

  const { commentLockTimesRatedTimesLeft } = useContentFunction();
  const [ratingsAverage, setRatingsAverage] = useState<any>(0);
  const [acknowledgeUnlock, setAcknowledgeUnlock] = useState(false); // no need for null since code block wouldn't even express the code that interacts with this if there was no lock.

  const test = () => {
    console.log("comment", comment);
  };

  const acknowledgeUnlockFunc = (event: any) => {
    setAcknowledgeUnlock(!acknowledgeUnlock);
  };

  const shouldShowStarsAvg =
    // 1️⃣ show if avg is active and there's no lock
    (comment?.stars_show_avg === true && !comment?.lock) ||
    // 2️⃣ show if avg is active AND lock is "stars show avg" but user has passed it
    (comment?.stars_show_avg === true &&
      comment?.lock === "stars show avg" &&
      usersPassLocks?.some((lock: any) => {
        const passAll =
          lock?.pass_comment_thoughts_all === true &&
          lock?.thought_id === comment?.id;
        const passIndividual =
          lock?.pass_comment_thoughts === true &&
          lock?.thought_id === comment?.id &&
          lock?.user_id === CURRENT_USER?.id;
        return passAll || passIndividual;
      })) ||
    // 3️⃣ show if the lock is irrelevant or absent
    comment?.lock !== "stars show avg" ||
    !comment?.lock;

  return (
    <View style={styles.row}>
      {
        // // if there is no lock and the comment.stars_show_avg === true ...       then surely show the stars average below instead of the comment!
        // (comment?.stars_show_avg === true && !comment?.lock) ||
        // // actual lock handler. t.thoughts.stars_show_avg && lock === stars show avg ? then check the table.userpasslocks
        // (comment?.stars_show_avg === true &&
        //   comment?.lock === "stars show avg" &&
        //   usersPassLocks?.some((locks: any) => {
        //     const isPassCommentThoughtsAll =
        //       locks?.pass_comment_thoughts_all === true &&
        //       locks?.thought_id === comment?.id;
        //     const isPassCommentThoughts =
        //       locks?.pass_comment_thoughts === true &&
        //       locks?.thought_id === comment?.id &&
        //       CURRENT_USER?.id === locks?.user_id;

        //     return isPassCommentThoughtsAll || isPassCommentThoughts;
        //   }) === true) ||
        // // usersPassLocks?.some(locks => (locks?.pass_comment_thoughts_all === true && locks?.thought_id === comment?.id) || (locks?.pass_comment_thoughts === true && locks?.thought_id === comment?.id && CURRENT_USER?.id === locks?.user_id)) === true)
        // //  comment has a lock but doesn't hide the average? then ignore and show stars avg here.       no lock at all? same thing
        // // * * * * * dev notes:     pretty sure COMMENT?.starrable is okay here but might have to do !== "no"

        // // or if there's a lock but the satrs show avg isn't locked or no lock at all
        // comment?.lock !== "stars show avg" ||
        // !comment?.lock

        shouldShowStarsAvg ? (
          Array?.from({ length: ratingsAverage })?.map((mapitem, index) => (
            <Image style={styles.icon} source={StarIcon} />
          ))
        ) : (
          <View style={styles.starsHeaderUnlockTextCont}>
            <TouchableOpacity onPress={acknowledgeUnlockFunc}>
              <Image style={styles.icon} source={UnlockIcon} />
            </TouchableOpacity>
            {comment?.unlock?.includes("times") ? (
              // instead of saying: "2 times" say:
              <TouchableOpacity onPress={acknowledgeUnlockFunc}>
                <Text
                  style={[
                    { opacity: acknowledgeUnlock === true ? 1.0 : 0.0 },
                    styles.starsHeaderUnlockText,
                  ]}
                >
                  onClick={acknowledgeUnlockFunc} className="text"
                  {commentLockTimesRatedTimesLeft(comment, commentStars)} more
                  rating
                </Text>
              </TouchableOpacity>
            ) : (
              // comment?.unlock.includes("avg") "avg ⭐️"
              <Text
                style={[
                  { opacity: acknowledgeUnlock === true ? 1.0 : 0.0 },
                  styles.starsHeaderUnlockText,
                ]}
              >
                {" "}
                {comment?.unlock}{" "}
              </Text>
            )}
          </View>
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 10,
  },
  icon: {
    height: 30,
    width: 30,
  },
  starsHeaderUnlockTextCont: {
    flexDirection: "row",
    gap: 5,
  },
  starsHeaderUnlockText: {
    fontSize: 16,
    fontFamily: "Fuzzy Bubbleas",
  },
});

export default StarsHeader;
