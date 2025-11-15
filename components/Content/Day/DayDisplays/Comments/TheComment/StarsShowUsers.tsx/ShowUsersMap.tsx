import React, { useState, useEffect } from "react";

// redux
import { RootState } from "@/redux/store/rootReducer";
import { useSelector, useDispatch } from "react-redux";

// <>
import {
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Touchable,
} from "react-native";
import StarsRatings from "./StarsRatings";

// utils:
import { useContentFunction } from "@/Contexts/ContentFunctions";
import { grayphite } from "@/constants/Colors";
import {
  StarIcon,
  EmptyStarIcon,
  RedBackArrowIcon,
  UnlockIcon,
  LockIcon,
} from "@/constants/Images";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

interface props {
  comment: any;
  commentStars: any;
  usersPassLocks: any;
  allUserProfileIcons: any;
  setCommentStarsQuestionClick: any;
}

// webapp: StarsShowUsers.tsx
const ShowUsersMap: React.FC<props> = ({
  comment,
  commentStars,
  usersPassLocks,
  allUserProfileIcons,
  setCommentStarsQuestionClick,
}) => {
  const [acknowledgeLockInfo, setAcknowledgeLockInfo] = useState<
    boolean | null
  >(null);
  const [mapitemCommentStars, setMapitemCommentStars] = useState<any>(
    (Array.isArray(comment?.stars) && comment?.stars) || null
  );

  const { getNumberFromCommentLock } = useContentFunction();

  useEffect(() => {
    let postStars = commentStars?.filter(
      (stars: any) => stars?.thought_id === comment?.id
    );
    // let postStars = commentStars.filter(stars => stars?.thought_id === comment?.id)
    postStars = postStars[0];
    setMapitemCommentStars(postStars);
    console.log("postStars", postStars);
  }, []);

  const acknowledgeLockInfoClick = (event: any) => {
    console.log("whatsup");
    const id: string = event?.target?.id;
    if (id === "lockIcon") {
      console.log("yes it does");
      setAcknowledgeLockInfo(true);
    } else {
      setAcknowledgeLockInfo(false);
      // setDoesUserPassThoughtCommentLock(null);

      // set the state to null since user acknowleges they haven't passed lock and what to do to pass if they wanted to pass lock.
      // if (CURR_DAY_COMMENTING_ALL_OURS_PASS_LOCKS_BIN[questionClickBinIndex] === false) {
      //     const updateAllOursLocksBinTrue = arrayFromBooleanUpdateIndex(CURR_DAY_COMMENTING_ALL_OURS_PASS_LOCKS_BIN, index, null)
      //     console.log('updatingIndexToTrue', updateAllOursLocksBinTrue)
      //     dispatch(SET_CURR_DAY_COMMENTING_ALL_OURS_PASS_LOCKS_BIN(updateAllOursLocksBinTrue))
      // }
    }
  };

  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );

  const { commentLockTimesRatedTimesLeft } = useContentFunction();

  const shouldShow =
    !comment?.lock || // no lock at all
    comment?.lock !== "stars show users" || // lock irrelevant
    (comment?.lock === "stars show users" &&
      usersPassLocks?.some((lock: any) => {
        const passAll =
          lock?.pass_comment_thoughts_all === true &&
          lock?.thought_id === comment?.id;
        const passIndividual =
          lock?.pass_comment_thoughts === true &&
          lock?.thought_id === comment?.id &&
          lock?.user_id === CURRENT_USER?.id;
        return passAll || passIndividual;
      }));

  return (
    <ScrollView style={styles.starShowUsersCont}>
      {
        // Check if there's no lock or if the lock is not "stars show users" - CTO-GPT

        // !comment.lock ||
        // comment.lock !== 'stars show users' ||
        // // If the lock is "stars show users", check if the lock is passed for the current index - CTO-GPT
        // (comment.lock === 'stars show users' &&
        //     usersPassLocks?.some((locks: any) => {
        //         const isPassCommentThoughtsAll = locks?.pass_comment_thoughts_all === true && locks?.thought_id === comment?.id;
        //         const isPassCommentThoughts = locks?.pass_comment_thoughts === true && locks?.thought_id === comment?.id && CURRENT_USER?.id === locks?.user_id;

        //         return isPassCommentThoughtsAll || isPassCommentThoughts;
        //     }) === true)
        shouldShow ? (
          //
          // Map through the stars if the conditions above are met
          mapitemCommentStars?.map((mapitem: any, index: number) => {
            return (
              mapitem?.thought_id === comment?.id && (
                <StarsRatings
                  key={index}
                  mapitem={mapitem}
                  index={index}
                  iconBin={allUserProfileIcons}
                  currentUser={CURRENT_USER}
                  setCommentStarsQuestionClick={setCommentStarsQuestionClick}
                />
              )
            );
          })
        ) : (
          // If the conditions are not met, render the AcknowledgeLock component

          <>
            {/* if comment?.unlock === 10 count/10ratings  & there is 1 stars in the DB then maybe say 9 more stars!  */}
            {comment?.unlock?.includes("times") && (
              <View style={styles.starsShowUsersLockCont}>
                <TouchableOpacity onPress={acknowledgeLockInfoClick}>
                  <Image
                    id="unlockIcon"
                    style={styles.starsShowUsersLockIcon}
                    source={UnlockIcon}
                  />
                </TouchableOpacity>
                <Text style={styles.starsShowUsersLockIcon}>
                  {" "}
                  {commentLockTimesRatedTimesLeft(comment, commentStars)} more
                  rating{" "}
                </Text>
              </View>
            )}

            {comment?.unlock.includes("avg") && (
              <>
                {/*  <p style={{ position: 'relative', top: '15px' }} id={styles.lockUnlockText}> </p>                                                                 */}
                <TouchableOpacity onPress={acknowledgeLockInfoClick}>
                  <Image
                    style={styles.starsShowUsersLockIcon}
                    source={UnlockIcon}
                  />
                </TouchableOpacity>

                {
                  <View style={styles.starsShowUsersAvgStarsRowCont}>
                    {Array.from({
                      length: getNumberFromCommentLock(comment),
                    }).map((_, index) => (
                      <Image
                        style={styles.starsShowUsersAvgStars}
                        key={index}
                        source={StarIcon}
                      />
                    ))}
                  </View>
                }
                <Text style={styles.starsShowUsersLockIcon}> avg </Text>
              </>
            )}

            {comment?.unlock === "submit stars" && (
              <>
                <TouchableOpacity onPress={acknowledgeLockInfoClick}>
                  <Image
                    style={styles.starsShowUsersLockIcon}
                    source={UnlockIcon}
                  />
                </TouchableOpacity>

                <Text style={styles.starsShowUsersLockIcon}>
                  {" "}
                  {comment?.unlock}{" "}
                </Text>
              </>
            )}

            {comment?.unlock !== "submit stars" &&
              !comment?.unlock.includes("times") &&
              !comment?.unlock.includes("avg") && (
                <View>
                  <TouchableOpacity onPress={acknowledgeLockInfoClick}>
                    <Image style={styles.icon} source={UnlockIcon} />
                  </TouchableOpacity>

                  <Text style={styles.lockUnlockText}> {comment?.unlock} </Text>
                </View>
              )}
          </>
        )
      }
    </ScrollView>
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
  starShowUsersCont: {
    flexDirection: "column",
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  starsShowUsersLockCont: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    height: "100%",
  },
  starsShowUsersLockIcon: {
    height: 85,
    width: 85,
  },
  starsShowUsersAvgStarsRowCont: {
    flexDirection: "row",
    gap: 5,
  },
  starsShowUsersAvgStars: {
    height: 50,
    width: 50,
  },
  lockUnlockText: {
    fontSize: 16,
    fontFamily: "Fuzzy Bubbles",
  },
});

export default ShowUsersMap;
