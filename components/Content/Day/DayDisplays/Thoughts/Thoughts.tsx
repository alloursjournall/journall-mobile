import React, { useState, useEffect, useRef } from "react";

import { grayphite } from "@/constants/Colors";
import {
  Platform,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { SoundWaveIcon, RedBackArrowIcon, LockIcon } from "@/constants/Images";
import ThoughtsLockBig from "./ThoughtsLocks/ThoughtsLocksBig";
import PostingUserStars from "./PostingUserStars";

// redux
import { RootState } from "@/redux/store/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import {
  SET_CURRENT_USER,
  SET_CURRENT_USER_PRIVACY,
  SET_CURRENT_USER_MOST_RECENT_POST,
} from "@/redux/currentUser/currentUserSlice";

import StarsUsers from "./StarsUsers";

// ⚠️ ⚠️ Audio as ExpoAudio because then - javascript/web constructor: new Audio thinks it's grabbing the { import Audio } from 'expo-av' object.
import { Audio as ExpoAudio } from "expo-av";
// import { Audio } from 'expo-av';
import { useContentFunction } from "@/Contexts/ContentFunctions";
import { PanGestureHandler } from "react-native-gesture-handler";

interface ThoughtsProps {
  day: any;
  postingUserThoughts: any;
  usersPassLocks: any;
  setUsersPassLocks: any;
  allUserProfileIcons: any;
}

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const Thoughts: React.FC<ThoughtsProps> = ({
  day,
  postingUserThoughts,
  usersPassLocks,
  setUsersPassLocks,
  allUserProfileIcons,
}) => {
  const { seeAllThoughtsUnlockHandler } = useContentFunction();

  const thoughtsBin = postingUserThoughts?.thoughts;
  const soundthoughts = postingUserThoughts?.soundthoughts || null;
  const thoughtsBinLength = thoughtsBin?.length || 0;
  const [thoughtsBinIndex, setThoughtsBinIndex] = useState<any>(0);
  const [postingUserThoughtStars, setPostingUserThoughtStars] = useState<any>(
    postingUserThoughts?.stars || []
  );
  const currThought =
    (Array.isArray(thoughtsBin) && thoughtsBin[thoughtsBinIndex]) || null;
  const userThoughtLock = postingUserThoughts?.lock || null;

  // postingUserStars: tool to submit stars | userStars: the list of ratings (postingUserStars can show the average but not the users list)
  const [postingUserStarsOrStarsUsers, setPostingUserStarsOrStarsUsers] =
    useState<string>("postingUserStars");

  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );

  // state to unlock the "see all thoughts" lock.
  const [thoughtsVisited, setThoughtsVisited] = useState(() => {
    return Array.isArray(thoughtsBin)
      ? thoughtsBin.map((thought, index) => ({
          index,
          seen: index === 0 ? true : false, // initially, all thoughts are unvisited
        }))
      : [];
  });

  // mark ass seen
  const markAsVisited = (thoughtsVisited: any) => {
    // logical OR with || null
    const currIdx: any = thoughtsVisited[thoughtsBinIndex] || 0 || null;
    console.log("currIdx", currIdx);
    // if (currIdx === null) {
    //     return;
    // }

    console.log("currIdx", currIdx);
    if (currIdx?.seen === false) {
      // Create a shallow copy of the array to avoid mutating the state directly
      const clonedArray = [...thoughtsVisited];

      // Update the relevant item based on the index
      clonedArray[thoughtsBinIndex] = { index: currIdx?.index, seen: true };
      // clonedArray[THOUGHTS_BIN_INDEX] = { ...currIdx, seen: true };

      // Set the updated array into the state
      setThoughtsVisited(clonedArray);

      console.log("Updated thoughtsVisited:", clonedArray);
    }
  };

  useEffect(() => {
    // thoughtsVisited: any, markAsVisited: any, day: any, currDayUsersPassLocks, setCurrDayUsersPassLocks
    seeAllThoughtsUnlockHandler(
      thoughtsVisited,
      markAsVisited,
      day,
      usersPassLocks,
      setUsersPassLocks
    );
  }, [thoughtsBinIndex]);

  const decrementThoughtsBin = () => {
    if (thoughtsBinIndex === 0) {
      setThoughtsBinIndex(thoughtsBinLength - 1);
    } else {
      setThoughtsBinIndex(thoughtsBinIndex - 1);
    }
  };

  const incrementThoughtsBin = () => {
    if (thoughtsBinIndex === thoughtsBinLength - 1) {
      setThoughtsBinIndex(0);
    } else {
      setThoughtsBinIndex(thoughtsBinIndex + 1);
    }
  };

  const handleGesture = (event: any) => {
    const { translationX } = event?.nativeEvent;
    if (translationX > 50) {
      // Swipe right
      decrementThoughtsBin();
    } else if (translationX < -50) {
      // Swipe left
      incrementThoughtsBin();
    }
  };

  const noLock = !userThoughtLock;

  const thoughtsIndexCommentLockIsUnlocked =
    parseInt(postingUserThoughts?.lock) === thoughtsBinIndex &&
    usersPassLocks.some(
      (lockPass: any) =>
        lockPass?.day_id === day?.id &&
        (lockPass?.pass_thoughts_all === true ||
          (lockPass?.pass_thoughts === true &&
            lockPass?.user_id === CURRENT_USER?.id))
    );
  const indexLockNotRelevant = parseInt(userThoughtLock) !== thoughtsBinIndex;
  const indexLockRelevantAndUnlocked =
    parseInt(userThoughtLock) === thoughtsBinIndex &&
    thoughtsIndexCommentLockIsUnlocked;
  const indexThoughtLOCKshouldShowContent =
    noLock || indexLockNotRelevant || indexLockRelevantAndUnlocked;

  const soundCommentLockIsUnlocked =
    userThoughtLock !== "soundComments" &&
    usersPassLocks?.some(
      (lockPass: any) =>
        lockPass?.day_id === day?.id &&
        (lockPass?.pass_thoughts_all === true ||
          (lockPass?.pass_thoughts === true &&
            lockPass?.user_id === CURRENT_USER?.id))
    );
  const soundCommentLockNotRelevant = userThoughtLock !== "soundComments";
  const soundCommentRelevantAndUnlocked =
    userThoughtLock === "soundComments" && soundCommentLockIsUnlocked;
  const soundCommentLOCKshouldShowContent =
    noLock || soundCommentLockNotRelevant || soundCommentRelevantAndUnlocked;

  const textCommentLockIsUnlocked =
    userThoughtLock !== "textComments" &&
    usersPassLocks?.some(
      (lockPass: any) =>
        lockPass?.day_id === day?.id &&
        (lockPass?.pass_thoughts_all === true ||
          (lockPass?.pass_thoughts === true &&
            lockPass?.user_id === CURRENT_USER?.id))
    );
  const textCommentLockNotRelevant = userThoughtLock !== "textComments";
  const textCommentRelevantAndUnlocked =
    userThoughtLock === "textComments" && textCommentLockIsUnlocked;
  const textCommentLOCKshouldShowContent =
    noLock || textCommentLockNotRelevant || textCommentRelevantAndUnlocked;

  const test = () => {
    console.log("day", day);
    console.log("CURRENT_USER", CURRENT_USER);
  };

  return postingUserStarsOrStarsUsers === "postingUserStars" ? (
    <View style={styles.thoughtsCont}>
      <View style={styles.thoughtsTopCont}>
        <TouchableOpacity
          onPress={decrementThoughtsBin}
          style={styles.actionButton}
        >
          <Text style={styles.changeThoughtButton}> &lt; </Text>
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={test} style={styles.actionButton}>
                        <Image source={ShurikenIcon} style={styles.buttonIcon} />
                    </TouchableOpacity> */}

        <TouchableOpacity
          onPress={incrementThoughtsBin}
          style={styles.actionButton}
        >
          <Text style={styles.changeThoughtButton}> &gt; </Text>
        </TouchableOpacity>
      </View>

      <GestureHandlerRootView style={{ flex: 1 }}>
        <PanGestureHandler onGestureEvent={handleGesture}>
          <ScrollView contentContainerStyle={styles.centerCont}>
            {indexThoughtLOCKshouldShowContent ? (
              Array.isArray(thoughtsBin) &&
              thoughtsBin[thoughtsBinIndex]?.includes("-") ? (
                textCommentLOCKshouldShowContent ? (
                  <SoundThought
                    postingUserThoughts={postingUserThoughts}
                    currThought={currThought}
                    soundCommentLOCKshouldShowContent={null}
                  />
                ) : (
                  <ThoughtsLockBig
                    contSize={screenWidth * 0.5}
                    lockText={userThoughtLock}
                    unlockText={postingUserThoughts?.unlock}
                    imageSize={100}
                    textSize={30}
                  />
                )
              ) : soundCommentLOCKshouldShowContent ? (
                <TextThought
                  postingUserThoughts={postingUserThoughts}
                  textCommentLOCKshouldShowContent={null}
                  currThought={currThought}
                />
              ) : (
                <ThoughtsLockBig
                  contSize={screenWidth * 0.5}
                  lockText={userThoughtLock}
                  unlockText={postingUserThoughts?.unlock}
                  imageSize={100}
                  textSize={30}
                />
              )
            ) : (
              <ThoughtsLockBig
                contSize={screenWidth * 0.5}
                lockText={userThoughtLock}
                unlockText={postingUserThoughts?.unlock}
                imageSize={100}
                textSize={30}
              />
            )}
          </ScrollView>
        </PanGestureHandler>
      </GestureHandlerRootView>

      {
        // 🚨 🚨 also handle "followers" | "followed users" | "f_f"
        postingUserThoughts?.starrable === "yes" && (
          <View style={styles.thoughtsBottomCont}>
            {indexThoughtLOCKshouldShowContent ? (
              <PostingUserStars
                day={day}
                currThought={currThought}
                postingUserThoughts={postingUserThoughts}
                postingUserThoughtStars={postingUserThoughtStars}
                setPostingUserThoughtStars={setPostingUserThoughtStars}
                userStarsOrStarsUsers={postingUserStarsOrStarsUsers}
                setUserStarsOrStarsUsers={setPostingUserStarsOrStarsUsers}
                usersPassLocks={usersPassLocks}
                setUsersPassLocks={setUsersPassLocks}
              />
            ) : (
              <Image style={styles.buttonIcon} source={LockIcon} />
            )}
          </View>
        )
      }
    </View>
  ) : (
    // <StarsUsers/>
    <StarsUsers
      day={day}
      currThought={currThought}
      postingUserThoughts={postingUserThoughts}
      postingUserStarsOrStarsUsers={postingUserStarsOrStarsUsers}
      postingUserThoughtStars={postingUserThoughtStars}
      setPostingUserStarsOrStarsUsers={setPostingUserStarsOrStarsUsers}
      usersPassLocks={usersPassLocks}
      setUsersPassLocks={setUsersPassLocks}
      allUserProfileIcons={allUserProfileIcons}
    />
  );
};

interface TextThoughtProps {
  postingUserThoughts: any;
  textCommentLOCKshouldShowContent: boolean | null;
  currThought: any;
}

const TextThought: React.FC<TextThoughtProps> = ({
  postingUserThoughts,
  textCommentLOCKshouldShowContent,
  currThought,
}) => {
  return (
    // handle lock

    <Text style={styles.thoughtText}> {currThought} </Text>
  );
};

interface SoundThoughtProps {
  postingUserThoughts: any;
  currThought: any;
  soundCommentLOCKshouldShowContent: any;
}

const SoundThought: React.FC<SoundThoughtProps> = ({
  postingUserThoughts,
  currThought,
  soundCommentLOCKshouldShowContent,
}) => {
  console.log("currThought", currThought);

  const { startPlayingRecordedSound } = useContentFunction();
  const soundthoughts = postingUserThoughts?.soundthoughts || null;

  const currentSoundRef = useRef<ExpoAudio.Sound | null>(null); // Store reference to current sound

  const playSoundClick = (currThought: any) => {
    // event.stopPropagation(); // Prevent event bubbling

    console.log("currThought", currThought);
    if (!currThought || !postingUserThoughts?.soundthoughts) {
      return;
    }

    console.log("soundthoughts", soundthoughts);
    console.log("currThought", currThought);
    let regex = /(?<=audio\/).*/;
    let currThoughtMatch = currThought?.match(/[^-]+$/);
    if (currThoughtMatch !== null) {
      currThoughtMatch = currThoughtMatch[0];
    }

    console.log("currThoughtMatch", currThoughtMatch);
    console.log("postingUserThoughts", postingUserThoughts);

    Array.isArray(postingUserThoughts?.soundthoughts) &&
      postingUserThoughts?.soundthoughts?.forEach((blob: any) => {
        console.log("blob", blob);
        console.log("hey girl");
        if (blob?.key?.key?.includes(currThought) && blob?.blob !== null) {
          // if (blob?.key?.Key?.includes(currThoughtMatch) && blob?.blob !== null) {
          console.log(`${blob?.key?.key} includes ${currThoughtMatch}`);
          startPlayingRecordedSound(blob?.blob);
          // playSoundFile(blob?.blob);
        }
      });
  };

  const test = () => {};

  return (
    <View style={styles.soundRow}>
      <TouchableOpacity onPress={test} style={styles.actionButton}>
        <Image source={RedBackArrowIcon} style={styles.backBtn} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => playSoundClick(currThought)}
        style={styles.actionButton}
      >
        {/* <TouchableOpacity onPress={(event:any) => playSoundClick(event)} style={styles.actionButton}> */}
        <Image source={SoundWaveIcon} style={styles.soundWave} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  thoughtsCont: {
    height: "100%",
    // height: screenHeight * 0.4, // Ensure it matches the height of the image
    width: "100%", // Ensure it takes full width
    // borderColor: grayphite,
    // borderWidth: 3,
    padding: 10, // Add some padding to avoid content touching the edges
  },
  thoughtsTopCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    height: 50, // Set a height for the header
  },
  thoughtText: {
    fontSize: 20,
    fontFamily: "Fuzzy Bubbles",
    color: grayphite,
  },
  centerCont: {
    flex: 1, // Allow this to take remaining space
    justifyContent: "center", // Center the content vertically
    alignItems: "center",
  },
  thoughtsBottomCont: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    gap: 2.5,
  },
  changeThoughtButton: {
    fontSize: 20,
  },
  actionButton: {
    marginRight: 16,
  },
  buttonIcon: {
    height: 25,
    width: 25,
  },

  // SoundThought:
  soundRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // gap: 5
  },
  backBtn: {
    height: 25,
    width: 25,
  },
  soundWave: {
    height: 150,
    width: 150,
  },
});

export default Thoughts;
