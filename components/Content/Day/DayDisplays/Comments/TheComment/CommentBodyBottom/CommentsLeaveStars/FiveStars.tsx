import { useState, useEffect } from "react";

// <>
import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";

// redux
import { RootState } from "@/redux/store/rootReducer";
import { useSelector, useDispatch, createDispatchHook } from "react-redux";
import {
  SET_CURRENT_USER,
  SET_CURRENT_USER_PRIVACY,
  SET_CURRENT_USER_MOST_RECENT_POST,
} from "@/redux/currentUser/currentUserSlice";

// utils:
import { API } from "@env";
import {
  EmptyStarIcon,
  StarIcon,
  LockIcon,
  CommentIcon,
  QuestionIcon,
  RedBackArrowIcon,
  GreenForwardArrowIcon,
} from "@/constants/Images";
import { useContentFunction } from "@/Contexts/ContentFunctions";
import { submitOneThruFiveStarsQueryStringFunc } from "@/graphql/queries";
import axios from "axios";

interface FiveStarsProps {
  comment: any;
  index: number; // commentIndex in the original.
  setStarClicked: any;

  day: any;
  commentStars: any;
  setCommentStars: any;
  usersPassLocks: any;
  setUsersPassLocks: any;
  starClickedIndex: any;
  setStarClickedIndex: any;
  commentStarsQuestionClick: any;
  setCommentStarsQuestionClick: any;
  setError: any;
  doesUserPassThoughtCommentLock: any;
  setDoesUserPassThoughtCommentLock: any;
}

const FiveStars: React.FC<FiveStarsProps> = ({
  comment,
  index,
  setStarClicked,

  day,
  commentStars,
  setCommentStars,
  usersPassLocks,
  setUsersPassLocks,
  starClickedIndex,
  setStarClickedIndex,
  commentStarsQuestionClick,
  setCommentStarsQuestionClick,
  setError,
  doesUserPassThoughtCommentLock,
  setDoesUserPassThoughtCommentLock,
}) => {
  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );

  // const { API } = Constants?.easConfig.extra || 'http://localhost:4000/api/graphql';
  const predataString = "https://journallapi.vercel.app/api/graphql";

  // submitCommentThoughtALLpassCommentThoughtsTrueFunc
  // updateCommentThoughtALLpassCommentThoughtsFalseFunc

  const {
    calculateStarsAverage,
    submitCommentThoughtALLpassCommentThoughtsTrueFunc,
    updateCommentThoughtALLpassCommentThoughtsFalseFunc,
    passCommentLockFunc,
  } = useContentFunction();

  const goBackToCommentBodyBottom = () => {
    if (starClickedIndex > 0) {
      setStarClickedIndex(0);
    } else {
      setStarClicked(false);
    }
  };

  const doesLockNotExistOrDoesUserPassExistingLock = (comment: any) => {
    const { lock, unlock } = comment;

    if (!lock) return true;

    if (unlock.includes("times") || unlock.includes("avg")) {
      console.log("were getting oxytocin right now");
      // handles for case that applies for all users. i.e. lock needs 2 (1-5 ratings) a 3rd user can come along who didn't star & see unlocked content. not the same for submit stars or respond to comment where only those contributing users who submit or respond can see.

      const doesAllUsersPass = usersPassLocks?.some(
        (passLockUsers: any) => passLockUsers?.pass_comment_thoughts_all
      );
      console.log("doesAllUsersPass", doesAllUsersPass);
      if (!doesAllUsersPass) {
        setDoesUserPassThoughtCommentLock(false);
        return doesAllUsersPass;
      } else {
        return true;
      }
    } else if (unlock === "submit ⭐️") {
      // } else if (unlock.includes("submit")) {
      const doesLoggedInUserPassLock = usersPassLocks?.some(
        (passLockUsers: any) =>
          passLockUsers?.user_id === CURRENT_USER?.id &&
          passLockUsers?.pass_comment_thoughts === true
      );

      // if user doesn't pass olock
      if (!doesLoggedInUserPassLock) {
        console.log("somehow getting in here");
        setDoesUserPassThoughtCommentLock(false);
        return false;
        // user does not pass lock. toggle display to show lock in place of stars, but then back without user action so they can still post 1-5 stars (unless that's the restriction set comment.lock)
      } else {
        return true;
      }
    }
  };

  const commentUnlockHandlerSetUserPassLocks = async (
    comment: any,
    stars: any
  ) => {
    console.log("running from function !");

    if (comment?.unlock === "submit ⭐️") {
      // const didUserSubmit = currDayUsersPassLocks?.some(userPasses => userPasses?.thought_id === comment?.id && userPasses?.user_id === CURRENT_USER?.id)
      const didUserSubmit = usersPassLocks?.some(
        (userPasses: any) =>
          userPasses?.thought_id === comment?.id &&
          userPasses?.user_id === CURRENT_USER?.id
      );
      if (didUserSubmit) {
        return;
      } else {
        console.log(
          "user didn't submit yet and the lock is submit stars so add to the DB"
        );
        passCommentLockFunc(comment, day, setUsersPassLocks, setError);
      }
    }

    // i.e. "2 times" regex the 2 to know how many CURR_DAY_STARS?.length there is.
    // could be fun for revealing anonymous commenter
    if (comment?.unlock?.includes("times")) {
      const numberFromCommentUnlock: any | null =
        comment?.unlock?.match(/(\d+)/);
      // if there is no extractable number from the string than
      if (numberFromCommentUnlock === null) {
        return;
      }

      const unlockNum = parseInt(numberFromCommentUnlock[1], 10);
      const starsLength = stars?.length;

      // performance reducer:     if (unlockNum >= starsLength)  the function would be run
      if (starsLength >= unlockNum) {
        // this updates table.userpasslocks to have {userpasslocks.pass_comment_thoughts_all} so all users pass. again because if "2 times" if 2 users submit stars then all users pass, even a third user coming along to see previously locked content doesn't have to rate 1-5 stars the content to pass. unlike an unlock like: "submit stars" only submitting user passes.
        const locksAfterSubmitTrue =
          await submitCommentThoughtALLpassCommentThoughtsTrueFunc(
            day?.id,
            comment?.id,
            setUsersPassLocks,
            setError
          );
      } else {
        // set it to false which would really only apply for avg where a new star can throw the average below the unlocking average rating.
        const locksAfterUpdatingFailed =
          await updateCommentThoughtALLpassCommentThoughtsFalseFunc(
            day?.id,
            comment?.id,
            setUsersPassLocks,
            setError
          );
        console.log("locksAfterUpdatingFailed", locksAfterUpdatingFailed);
      }
    }

    if (comment?.unlock?.includes("avg")) {
      // so the lock is maintained
      console.log("average handler!");
      const unlock = comment?.unlock || "";
      if (!unlock) {
        return "hey";
      }

      const numberFromCommentUnlock = comment?.unlock?.match(/(\d+)/);
      console.log("numberFromCommentUnlock", numberFromCommentUnlock);

      if (numberFromCommentUnlock === null) {
        return "sorry!";
      }
      const unlockNum = parseInt(numberFromCommentUnlock[1], 10);
      console.log("unlockNum to unlock the lock", unlockNum);
      const ratings = stars
        ?.filter((item: any) => item?.thought_id === comment?.id)
        .map((item: any) => item?.stars);
      const starsAverage =
        ratings.reduce((acc: any, val: any) => acc + val, 0) / ratings.length;
      // const starsAverage = ratings.reduce((acc, val) => acc + val, 0) / ratings.length;
      if (
        starsAverage === null ||
        starsAverage === undefined ||
        Number.isNaN(starsAverage)
      ) {
        console.log("atleast were over here");
        return "NaN";
      }
      // const returnStars = unlockNum === 1 ? star1 : unlockNum === 2 ? star2 : unlockNum === 3 ? star3 : unlockNum === 4 ? star4 : unlockNum === 5 ? star5 : emptyStar
      //  below condition shouldn't exist because (we're clientside now) but invoking clientside wouldn't let this component <> render.

      if (starsAverage >= unlockNum) {
        const locksAfterSubmitting =
          await submitCommentThoughtALLpassCommentThoughtsTrueFunc(
            day?.id,
            comment?.id,
            setUsersPassLocks,
            setError
          );
        console.log("locksAfterSubmitting", locksAfterSubmitting);
        if (!locksAfterSubmitting) {
          return null;
        }
      } else if (starsAverage < unlockNum) {
        console.log("starsAverage", starsAverage);
        const locksAfterUpdatingFailed =
          await updateCommentThoughtALLpassCommentThoughtsFalseFunc(
            day?.id,
            comment?.id,
            setUsersPassLocks,
            setError
          );
        console.log("locksAfterUpdatingFailed", locksAfterUpdatingFailed);
        // new rating brings total average to below what is needed for the content to be unlocked so it is back to being locked content!
        // console.log('locksAfterUpdatingFailed', locksAfterUpdatingFailed)
        return unlockNum;
      } else {
        return `sorry!`;
      }
    }
  };

  const questionClick = () => {
    console.log("commentStars", commentStars);
    console.log("comment", comment);
    console.log("comment?.id", comment?.id);
    console.log("comment?.stars_show_avg", comment?.stars_show_avg);
    console.log("comment?.stars_show_users", comment?.stars_show_users);

    const mapitemCommentStars = commentStars?.filter(
      (stars: any) => stars?.thought_id === comment?.id
    );
    console.log("mapitemCommentStars", mapitemCommentStars);
    if (!commentStars) {
      return null;
    }

    const doesCommentHaveStars = mapitemCommentStars?.some(
      (star: any) => star?.id
    );
    if (!doesCommentHaveStars) {
      return null;
    }

    const lockDoesntExistOrUserPassesLock =
      doesLockNotExistOrDoesUserPassExistingLock(comment);
    if (!lockDoesntExistOrUserPassesLock) {
      return null;
    }

    if (comment?.stars_show_users === true) {
      // show stars users which displays <StarsUsers/> looping oiver postingUserThoughtStars to show stars?.username, stars.user_profile_icon and stars.stars (name, icon, rating)
      setCommentStarsQuestionClick(true);
    }
    if (comment?.stars_show_avg && !comment?.stars_show_users) {
      // show average
      const userThoughtStarsAverage = calculateStarsAverage(
        comment?.id,
        null,
        null,
        null,
        mapitemCommentStars,
        setStarClickedIndex
      );
      // const userThoughtStarsAverage = commentCalculateStarsAverage(day?.id, null, null, null, postingUserThoughtStars, setPostingUserStarsAverage)
      setStarClickedIndex(userThoughtStarsAverage);
    }
    if (!comment?.stars_show_users && !comment?.stars_show_avg) {
      // error handler
      setError(true);
    }
  };

  const setStarClickedIndexFunc = (index: number) => {
    setStarClickedIndex(index);
  };

  const submitOneThruFiveStarsRating = async () => {
    // 🚨 🚨 * * * * * reminder: allowing user to add a star review to their own comment.
    // if (commentStars?.some((stars:any) => stars?.thought_id === comment?.id && stars?.user_id === CURRENT_USER?.id)) { }
    // return;

    console.log("comment?.id", comment?.id);
    const query = submitOneThruFiveStarsQueryStringFunc(
      day?.id,
      null,
      comment?.user_id,
      CURRENT_USER?.id,
      CURRENT_USER?.username,
      CURRENT_USER?.icon,
      comment?.id,
      null,
      null,
      null,
      null,
      starClickedIndex + 1
    );

    const predata: any = await axios.post(predataString, { query: query });
    // const predata: any = await axios.post('http://localhost:4000/api/graphql', { query: query })
    console.log("predata", predata);
    if (!predata) {
      return null;
    }

    const data: any = predata?.data?.data?.submitOneThruFiveStars;
    console.log("data", data);
    if (!data) {
      return null;
    }

    const doStarsExist = data?.some((stars: any) => stars?.id);
    console.log("doStarsExist", doStarsExist);
    if (!doStarsExist) {
      setError(true);
      return null;
    }
    // update UI with updated star count & setState
    setCommentStars(data);
    // check for locks
    commentUnlockHandlerSetUserPassLocks(comment, data);
  };

  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={questionClick}>
        <Image style={styles.icon} source={QuestionIcon} />
      </TouchableOpacity>

      <TouchableOpacity onPress={goBackToCommentBodyBottom}>
        <Image style={styles.icon} source={RedBackArrowIcon} />
      </TouchableOpacity>

      {Array.from({ length: 5 }).map((_: any, index: number) => {
        return (
          <TouchableOpacity
            key={`touchable${index}`}
            onPress={() => setStarClickedIndexFunc(index)}
          >
            <Image
              key={`star${index}`}
              style={styles.icon}
              source={starClickedIndex >= index ? StarIcon : EmptyStarIcon}
            />
          </TouchableOpacity>
        );
      })}

      <TouchableOpacity onPress={submitOneThruFiveStarsRating}>
        <Image style={styles.icon} source={GreenForwardArrowIcon} />
      </TouchableOpacity>

      {commentStarsQuestionClick === true &&
        commentStars?.filter((star: any) => star?.thought_id === comment?.id)
          ?.length > 0 && (
          <Text style={styles.numberText}>
            {" "}
            {commentStars?.filter(
              (star: any) => star?.thought_id === comment?.id?.length
            )}{" "}
          </Text>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    // gap: 10
  },
  icon: {
    height: 20,
    width: 20,
  },
  numberText: {
    fontSize: 16,
    fontFamily: "Fuzzy Bubbles",
  },
});

export default FiveStars;
