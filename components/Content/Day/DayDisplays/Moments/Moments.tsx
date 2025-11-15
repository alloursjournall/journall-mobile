import React, { useState } from "react";

// <>
import MomentsLockBig from "./MomentsLockBig";
import MomentsLockMini from "./MomentsLockMini";
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
// <Video> / mobile: npm i react-native-video web: npm i react-player
import { Video as ExpoVideo, ResizeMode } from "expo-av";
// import ReactPlayer from "react-player";

// ⚠️ ⚠️ ⚠️ ⚠️ ⚠️  dynamically import ReactPlayer
// import ImageResizer from 'react-native-image-resizer';
// let imageCompression: any;

// export const loadImageCompression = async () => {
//     if (Platform.OS === 'web') {
//         // 🧩 Dynamically import only on web
//         const module = await import('browser-image-compression');
//         imageCompression = module.default;
//     } else {
//         // 🧩 Native platforms use react-native-image-resizer
//         const module = await import('react-native-image-resizer');
//         imageCompression = module.default;
//     }
// };

import { PanGestureHandler } from "react-native-gesture-handler";
import { VideoPlayer } from "./VideoPlayer";

// redux:
import { RootState } from "@/redux/store/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import {
  SET_CURRENT_USER,
  SET_CURRENT_USER_PRIVACY,
  SET_CURRENT_USER_MOST_RECENT_POST,
} from "@/redux/currentUser/currentUserSlice";

// utils:
import { ShurikenIcon } from "@/constants/Images";
import { grayphite } from "@/constants/Colors";
import { useContentFunction } from "@/Contexts/ContentFunctions";
import { dayListenersDeleteQueryStringFunc } from "@/graphql/queries";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

interface MomentsProps {
  day: any;
  usersPassLocks: any;
  setUsersPassLocks: any;
}

const Moments: React.FC<MomentsProps> = ({
  day,
  usersPassLocks,
  setUsersPassLocks,
}) => {
  const thoughts = day?.thoughts;
  const moments = day?.moments;
  const momentLock = moments?.lock || null;
  const momentBlobs = Array.isArray(moments?.BLOBs) && moments?.BLOBs;
  const titlesArray =
    (Array.isArray(moments?.titles_array) && moments?.titles_array) || [];
  const captionsArray =
    Array.isArray(moments?.captions_array) && moments?.captions_array;

  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );

  const { didUserPassThisLockAlready, unlockFunc } = useContentFunction();

  const momentBlobsLength: number = momentBlobs?.length;
  const fields = day?.fields;
  const greatfullagain = day?.greatfullagain;

  const [momentsVisited, setMomentsVisited] = useState(() => {
    return Array.isArray(moments?.media_tags_array)
      ? moments?.media_tags_array.map((_: any, index: number) => ({
          index,
          seen: index === 0 ? true : false, // initially, all thoughts are unvisited
        }))
      : [];
  });

  const [momentsBinIndex, setMomentsBinIndex] = useState<number>(0);

  const test = () => {
    console.log("momentBlobs", momentBlobs);
    console.log("condition test", momentBlobs.length > 0);
  };

  const decrementMomentsBin = () => {
    if (momentsBinIndex === 0) {
      setMomentsBinIndex(momentBlobsLength - 1);
    } else {
      setMomentsBinIndex(momentsBinIndex - 1);
    }
  };

  const incrementMomentsBin = () => {
    if (momentsBinIndex === momentBlobsLength - 1) {
      setMomentsBinIndex(0);
    } else {
      setMomentsBinIndex(momentsBinIndex + 1);
    }
  };

  const handleGesture = (event: any) => {
    const { translationX } = event?.nativeEvent;
    if (translationX > 50) {
      // Swipe right
      decrementMomentsBin();
    } else if (translationX < -50) {
      // Swipe left
      incrementMomentsBin();
    }
  };

  const markAsVisited = (momentsVisited: any) => {
    const currIdx: any = momentsVisited[momentsBinIndex] || 0 || null;
    console.log("currIdx", currIdx);
    if (currIdx?.seen === false) {
      // Create a shallow copy of the array to avoid mutating the state directly
      const clonedArray = [...momentsVisited];

      // Update the relevant item based on the index
      clonedArray[momentsBinIndex] = {
        index: currIdx?.index,
        seen: true,
      };
      // clonedArray[THOUGHTS_BIN_INDEX] = { ...currIdx, seen: true };

      // Set the updated array into the state
      setMomentsVisited(clonedArray);

      console.log("Updated momentsVisited:", clonedArray);
    }
  };

  const seeAllMomentsUnlockHandler = (
    momentsVisited: any,
    markAsVisited: any
  ) => {
    console.log("lets seeeee");
    let doAnyBallotsApplyToLock;
    const ballotBin = (Array.isArray(day?.ballots) && day?.ballots) || null;
    if (ballotBin !== null) {
      const doAnyBallotsApplyToLock =
        ballotBin?.some(
          (ballots: any) => ballots?.unlock === "see all moments"
        ) || null;
    }
    // if no below locks apply then the momentsVisited feature is irrelevant. dont execute.
    if (
      day?.unlock === "see all moments" ||
      (Array.isArray(thoughts) && thoughts[0]?.unlock === "see all moments") ||
      moments?.unlock === "see all moments" ||
      fields?.unlock === "see all moments" ||
      greatfullagain?.unlock === "see all moments" ||
      doAnyBallotsApplyToLock
    ) {
      // there are unlocks that depend upon "see all thoughts" so unlock if the user saw all the thoughts.
      // thx chat new method. .every() checks if the condition returns true.
      const allSeen = momentsVisited.every((moment: any) => moment?.seen);
      // if every content has been seen then express markAsVisited and check index and set true if false.
      if (!allSeen) {
        markAsVisited(momentsVisited);
      }
      // const didUserPassThisLockAlready = usersPassLocks.some(locks => locks?.user_id === CURRENT_USER?.id && locks?.unlock_type === "see all thoughts")

      // if hasUserSeenAllThoughts = true then user passed lock don't proceed with passing them again.
      const hasUserSeenAllMoments = didUserPassThisLockAlready(
        "see all moments",
        usersPassLocks
      );

      console.log("allSeen", allSeen);
      console.log("hasUserSeenAllMoments", hasUserSeenAllMoments);

      if (allSeen && !hasUserSeenAllMoments) {
        console.log("do we never run this block though");
        // run function block
        unlockFunc("see all moments", "pass user", day, setUsersPassLocks);
      }
      if (allSeen && hasUserSeenAllMoments) {
        return;
      }
    } else {
      return;
    }
  };

  const noLock = !moments?.lock;
  const momentsLockIndex = momentLock?.split("-")?.pop() || null;
  const momentsLockText =
    (momentLock && momentLock?.split("-")?.slice(0, -1)?.join("-")) || null;

  // all headers, captions, blobs locked
  const allMomentsLockIsUnlocked =
    moments !== "allMoments" &&
    usersPassLocks?.some(
      (lockPass: any) =>
        // const momentsIndexCommentLockIsUnlocked = moments?.lock === MOMENTS_BIN_INDEX && usersPassLocks.some((lockPass:any) =>
        lockPass?.day_id === day?.id &&
        (lockPass?.pass_moments_all === true ||
          (lockPass?.pass_moments === true &&
            lockPass?.user_id === CURRENT_USER?.id))
    );

  const allMomentsLockNotRelevant = momentLock && momentLock !== "allMoments";
  const allMomentsLockRelevantAndUnlocked =
    momentLock === "allMoments" && allMomentsLockIsUnlocked;
  const allMomentsLOCKshouldShowContent =
    moments?.id > 0 &&
    (noLock || allMomentsLockNotRelevant || allMomentsLockRelevantAndUnlocked);

  // all blobs locked just images/videos.
  const allBlobsLockIsUnlocked =
    moments !== "allBlobs" &&
    usersPassLocks?.some(
      (lockPass: any) =>
        // const momentsIndexCommentLockIsUnlocked = moments?.lock === MOMENTS_BIN_INDEX && usersPassLocks.some((lockPass:any) =>
        lockPass?.day_id === day?.id &&
        (lockPass?.pass_moments_all === true ||
          (lockPass?.pass_moments === true &&
            lockPass?.user_id === CURRENT_USER?.id))
    );

  const allBlobsLockNotRelevant = momentLock && momentLock !== "allBlobs";
  const allBlobsLockRelevantAndUnlocked =
    momentLock === "allBlobs" && allBlobsLockIsUnlocked;
  const allBlobsLOCKshouldShowContent =
    moments?.id > 0 &&
    (noLock || allBlobsLockNotRelevant || allBlobsLockRelevantAndUnlocked);

  const allHeadersLockIsUnlocked =
    moments !== "allHeaders" &&
    usersPassLocks?.some(
      (lockPass: any) =>
        // const momentsIndexCommentLockIsUnlocked = moments?.lock === MOMENTS_BIN_INDEX && usersPassLocks.some((lockPass:any) =>
        lockPass?.day_id === day?.id &&
        (lockPass?.pass_moments_all === true ||
          (lockPass?.pass_moments === true &&
            lockPass?.user_id === CURRENT_USER?.id))
    );

  const allHeadersLockNotRelevant = momentLock && momentLock !== "allHeaders";
  const allHeadersLockRelevantAndUnlocked =
    momentLock === "allHeaders" && allHeadersLockIsUnlocked;
  const allHeadersLOCKshouldShowContent =
    moments?.id > 0 &&
    (noLock || allHeadersLockNotRelevant || allHeadersLockRelevantAndUnlocked);

  const allCaptionsLockIsUnlocked =
    moments !== "allCaptions" &&
    usersPassLocks?.some(
      (lockPass: any) =>
        // const momentsIndexCommentLockIsUnlocked = moments?.lock === MOMENTS_BIN_INDEX && usersPassLocks.some((lockPass:any) =>
        lockPass?.day_id === day?.id &&
        (lockPass?.pass_moments_all === true ||
          (lockPass?.pass_moments === true &&
            lockPass?.user_id === CURRENT_USER?.id))
    );

  const allCaptionsLockNotRelevant = momentLock && momentLock !== "allCaptions";
  const allCaptionsLockRelevantAndUnlocked =
    momentLock === "allCaptions" && allCaptionsLockIsUnlocked;
  const allCaptionsLOCKshouldShowContent =
    moments?.id > 0 &&
    (noLock ||
      allCaptionsLockNotRelevant ||
      allCaptionsLockRelevantAndUnlocked);

  const allImagesLockIsUnlocked =
    moments !== "allImages" &&
    usersPassLocks?.some(
      (lockPass: any) =>
        // const momentsIndexCommentLockIsUnlocked = moments?.lock === MOMENTS_BIN_INDEX && usersPassLocks.some((lockPass:any) =>
        lockPass?.day_id === day?.id &&
        (lockPass?.pass_moments_all === true ||
          (lockPass?.pass_moments === true &&
            lockPass?.user_id === CURRENT_USER?.id))
    );

  const allImagesLockNotRelevant = momentLock && momentLock !== "allImages";
  const allImagesLockRelevantAndUnlocked =
    momentLock === "allImages" && allImagesLockIsUnlocked;
  const allImagesLOCKshouldShowContent =
    moments?.id > 0 &&
    (noLock || allImagesLockNotRelevant || allImagesLockRelevantAndUnlocked);

  const allVideosLockIsUnlocked =
    moments !== "allVideos" &&
    usersPassLocks?.some(
      (lockPass: any) =>
        // const momentsIndexCommentLockIsUnlocked = moments?.lock === MOMENTS_BIN_INDEX && usersPassLocks.some((lockPass:any) =>
        lockPass?.day_id === day?.id &&
        (lockPass?.pass_moments_all === true ||
          (lockPass?.pass_moments === true &&
            lockPass?.user_id === CURRENT_USER?.id))
    );

  const allVideosLockNotRelevant = momentLock && momentLock !== "allVideos";
  const allVideosLockRelevantAndUnlocked =
    momentLock === "allVideos" && allVideosLockIsUnlocked;
  const allVideosLOCKshouldShowContent =
    moments?.id > 0 &&
    (noLock || allVideosLockNotRelevant || allVideosLockRelevantAndUnlocked);

  // indexMoments -> [i]: header, blob, caption []
  // indexBlobs []
  // indexHeaders []
  // indexCaptions []

  // allMoments
  // allBlobs
  // allheaders
  // allCaptions
  // allImages
  // allVideos
  const momentsIndexLOCKisUNLOCKED =
    momentLock &&
    momentsLockText?.includes("indexMoments") &&
    parseInt(momentsLockIndex) === momentsBinIndex &&
    usersPassLocks.some(
      (lockPass: any) =>
        lockPass?.day_id === day?.id &&
        (lockPass?.pass_moments_all === true ||
          (lockPass?.pass_moments === true &&
            lockPass?.user_id === CURRENT_USER?.id))
    );

  const momentsIndexLockNotRelevant =
    momentLock &&
    (!momentsLockText?.includes("indexMoments") ||
      parseInt(momentsLockIndex) !== momentsBinIndex);
  const momentsIndexLockRelevantAndUnlocked =
    momentsLockText?.includes("indexMoments") &&
    parseInt(momentsLockIndex) === momentsBinIndex &&
    momentsIndexLOCKisUNLOCKED;
  const momentsIndexLOCKshouldShowContent =
    moments?.id > 0 &&
    (noLock ||
      momentsIndexLockNotRelevant ||
      momentsIndexLockRelevantAndUnlocked);

  const blobsIndexLOCKisUNLOCKED =
    momentLock &&
    momentsLockText?.includes("indexBlobs") &&
    parseInt(momentsLockIndex) === momentsBinIndex &&
    usersPassLocks.some(
      (lockPass: any) =>
        lockPass?.day_id === day?.id &&
        (lockPass?.pass_moments_all === true ||
          (lockPass?.pass_moments === true &&
            lockPass?.user_id === CURRENT_USER?.id))
    );

  const blobsIndexLockNotRelevant =
    momentLock &&
    (!momentsLockText?.includes("indexBlobs") ||
      parseInt(momentsLockIndex) !== momentsBinIndex);
  const blobsIndexLockRelevantAndUnlocked =
    momentsLockText?.includes("indexBlobs") &&
    parseInt(momentsLockIndex) === momentsBinIndex &&
    blobsIndexLOCKisUNLOCKED;
  const blobsIndexLOCKshouldShowContent =
    moments?.id > 0 &&
    (noLock || blobsIndexLockNotRelevant || blobsIndexLockRelevantAndUnlocked);

  const headersIndexLOCKisUNLOCKED =
    momentLock &&
    momentsLockText?.includes("indexHeaders") &&
    parseInt(momentsLockIndex) === momentsBinIndex &&
    usersPassLocks.some(
      (lockPass: any) =>
        lockPass?.day_id === day?.id &&
        (lockPass?.pass_moments_all === true ||
          (lockPass?.pass_moments === true &&
            lockPass?.user_id === CURRENT_USER?.id))
    );

  const headersIndexLockNotRelevant =
    momentLock &&
    (!momentsLockText?.includes("indexHeaders") ||
      parseInt(momentsLockIndex) !== momentsBinIndex);
  const headersIndexLockRelevantAndUnlocked =
    momentsLockText?.includes("indexHeaders") &&
    parseInt(momentsLockIndex) === momentsBinIndex &&
    headersIndexLOCKisUNLOCKED;
  const headersIndexLOCKshouldShowContent =
    moments?.id > 0 &&
    (noLock ||
      headersIndexLockNotRelevant ||
      headersIndexLockRelevantAndUnlocked);

  const captionsIndexLOCKisUNLOCKED =
    momentLock &&
    momentsLockText?.includes("indexCaptions") &&
    parseInt(momentsLockIndex) === momentsBinIndex &&
    usersPassLocks.some(
      (lockPass: any) =>
        lockPass?.day_id === day?.id &&
        (lockPass?.pass_moments_all === true ||
          (lockPass?.pass_moments === true &&
            lockPass?.user_id === CURRENT_USER?.id))
    );

  const captionsIndexLockNotRelevant =
    momentLock &&
    (!momentsLockText?.includes("indexCaptions") ||
      parseInt(momentsLockIndex) !== momentsBinIndex);
  const captionsIndexLockRelevantAndUnlocked =
    momentsLockText?.includes("indexCaptions") &&
    parseInt(momentsLockIndex) === momentsBinIndex &&
    captionsIndexLOCKisUNLOCKED;
  const captionsIndexLOCKshouldShowContent =
    moments?.id > 0 &&
    (noLock ||
      captionsIndexLockNotRelevant ||
      captionsIndexLockRelevantAndUnlocked);

  //   const VideoPlayer = ({ uri }: { uri: string }) => {
  //     const isPortrait = true; // 👈 eventually detect this dynamically
  //     return (
  //       <View style={[styles.container, { maxHeight: 275, overflow: "hidden" }]}>
  //         {Platform.OS === "web" ? (
  //           <View
  //             style={{
  //               position: "relative",
  //               width: "100%",
  //               height: 275, // fixed height keeps ReactPlayer in check
  //               overflow: "hidden",
  //               borderRadius: 6,
  //             }}
  //           >
  //             <Text> nice ass </Text>
  //             {/* <ReactPlayer
  //               src={uri}
  //               controls
  //               muted
  //               width="100%"
  //               height="100%"
  //               style={{
  //                 position: "absolute",
  //                 top: 0,
  //                 left: 0,
  //                 objectFit: "cover",
  //               }}
  //             /> */}
  //           </View>
  //         ) : (
  //           <ExpoVideo
  //             source={{ uri }}
  //             useNativeControls
  //             resizeMode={ResizeMode.COVER} // ✅ valid
  //             style={{ width: "100%", height: screenHeight / 2 }}
  //           />
  //         )}
  //       </View>
  //     );
  //   };

  return !momentBlobs ? (
    // <></>
    // [styles.container, { width: '100%', alignItems: 'stretch' }]
    <View style={styles.container}> </View>
  ) : allMomentsLOCKshouldShowContent && momentsIndexLOCKshouldShowContent ? (
    <View style={styles.momentsCont}>
      <View style={styles.momentsTopCont}>
        <TouchableOpacity
          onPress={decrementMomentsBin}
          style={styles.actionButton}
        >
          <Text style={[styles.changeMomentButton, { fontSize: 50 }]}>
            {" "}
            &lt;{" "}
          </Text>
        </TouchableOpacity>

        {titlesArray && (
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.container}
          >
            {
              headersIndexLOCKshouldShowContent &&
              allHeadersLOCKshouldShowContent ? (
                <Text style={styles.text}>
                  {" "}
                  {titlesArray[momentsBinIndex]?.split("-")?.pop()}{" "}
                </Text>
              ) : (
                <MomentsLockMini unlockText={moments?.unlock} />
              )
              // <Text> ayoo </Text>
            }
          </ScrollView>
        )}

        <TouchableOpacity
          onPress={incrementMomentsBin}
          style={styles.actionButton}
        >
          <Text style={[styles.changeMomentButton, { fontSize: 50 }]}>
            {" "}
            &gt;{" "}
          </Text>
        </TouchableOpacity>
      </View>

      {moments?.media_tags_array[momentsBinIndex]?.includes("images") &&
      allImagesLOCKshouldShowContent ? (
        <View style={styles.photoContainer}>
          <Image
            source={{ uri: moments?.BLOBs[momentsBinIndex] }}
            style={styles.photo}
            resizeMode="cover"
          />
        </View>
      ) : moments?.media_tags_array[momentsBinIndex]?.includes("videos") &&
        allVideosLOCKshouldShowContent ? (
        <View style={{ maxHeight: 300, height: 200 }}>
          <VideoPlayer uri={moments?.BLOBs[momentsBinIndex]} />
        </View>
      ) : (
        // <Text> bruh </Text>

        <MomentsLockBig
          contSize={100}
          lockText={momentLock}
          unlockText={moments?.unlock}
          imageSize={100}
          textSize={16}
        />
      )}

      <View style={styles.momentsBottomCont}>
        {captionsArray && (
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.container}
          >
            <Text> {captionsArray[momentsBinIndex]?.split("-")?.pop()} </Text>
          </ScrollView>
        )}
      </View>
    </View>
  ) : (
    <TouchableOpacity onPress={test}>
      <Text> comeon bruh </Text>
    </TouchableOpacity>
  );
  // <MomentsLockBig contSize={100} lockText={momentLock} unlockText={moments?.unlock} imageSize={100} textSize={16} />
};

const styles = StyleSheet.create({
  momentsCont: {
    flexDirection: "column",
    justifyContent: "flex-start",

    width: "100%", // Ensure it takes full width
    height: "100%",
    // gap: 0,
    padding: 5, // Add some padding to avoid content touching the edges

    borderColor: grayphite,
    borderWidth: 3,
  },

  momentsTopCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // height: 30, // Set a height for the header
    // borderColor: grayphite,
    // borderWidth: 1,
    // marginTop: 2,
    padding: 5,
    marginBottom: 5,
  },
  scrollView: {
    flex: 1, // Ensures the ScrollView takes full available height
    // backgroundColor: appBackground,
  },
  container: {
    gap: 5,
    // padding: 10,
    justifyContent: "flex-start",
    // alignItems: 'center',
  },

  centerCont: {
    flex: 1, // Allow this to take remaining space
    // height: screenHeight * 0.325,
    width: "100%",
    justifyContent: "center", // Center the content vertically
    alignItems: "center",
    borderWidth: 2,
    borderColor: "blue",
  },

  momentsMiddleCont: {
    flex: 1, // take up all available space between top & bottom
    width: screenWidth * 0.4,
    justifyContent: "center",
    alignItems: "flex-start",

    // borderColor: "green",
    borderWidth: 2,
  },
  photoContainer: {
    width: "100%",
    maxHeight: 300,
    overflow: "hidden",
    alignItems: "stretch",

    // borderColor: "green",
    borderWidth: 2,
  },
  photo: {
    width: "100%",
    minWidth: 300,
    height: screenHeight / 3,
    maxHeight: 300,
    alignSelf: "stretch", // ensures it expands even inside centered parents
  },

  // photo: {
  //     flex: 1,
  //     // height: 100,
  //     width: '100%',
  //     justifyContent: 'center',
  //     alignItems: 'center',
  // },

  momentsBottomCont: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // height: 30,
    width: screenWidth * 0.1,
  },

  changeMomentButton: {
    fontSize: 20,
  },
  actionButton: {
    marginRight: 16,
  },
  buttonIcon: {
    height: 25,
    width: 25,
  },
  text: {
    fontFamily: "Fuzzy Bubbles",
    fontSize: 12,
    width: "100%",
    paddingLeft: 5,
    color: grayphite,
    // boxSizing: 'border-box',
  },
});

export default Moments;
