import axios from "axios";

// @reduxjs/toolkit:
import { RootState } from "redux/store/rootReducer";
import { useSelector, useDispatch } from "react-redux";

// <>
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from "react-native";
import { VideoPlayer } from "./BallotsVideoPlayer";

// <>, styles:
import SoundBars from "./SoundBars";

// utils:

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

interface props {
  currBallot: any;
  mapitem: any;
  index: any;
  day: any;
  usersPassLocks: any;
  ballotsMediaBLOBs: any;
  currentSoundRef: any;
}

const MediaVoteOption: React.FC<props> = ({
  currBallot,
  mapitem,
  index,
  day,
  usersPassLocks,
  ballotsMediaBLOBs,
  currentSoundRef,
}) => {
  // console.log('mapitem in media vote option', mapitem);

  console.log("mapitem", mapitem);

  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );

  // const CURR_DAY = useSelector( (state:RootState) => state.day.CURR_DAY);
  // const CURR_DAY_USERS_PASS_LOCKS = useSelector( (state:RootState) => state.day.CURR_DAY_USERS_PASS_LOCKS);

  const ballotLock = currBallot?.lock;
  const noLock = !ballotLock;
  const consideringOptionLOCKisUNLOCKED =
    ballotLock &&
    ballotLock === "consideringOption" &&
    usersPassLocks?.some(
      (lockPass: any) =>
        lockPass?.day_id === day?.id &&
        (lockPass?.pass_ballot_all === true ||
          (lockPass?.pass_ballot === true &&
            lockPass?.user_id === CURRENT_USER?.id))
    );

  const consideringOptionLockNotRelevant =
    ballotLock && ballotLock !== "consideringOption";
  const consideringOptionRelevantAndUnlocked =
    ballotLock &&
    ballotLock === "consideringOption" &&
    consideringOptionLOCKisUNLOCKED;
  const consideringOptionLOCKshouldShowContent =
    currBallot?.id > 0 &&
    (noLock ||
      consideringOptionLockNotRelevant ||
      consideringOptionRelevantAndUnlocked);

  const imageUri =
    typeof mapitem?.blob === "string" && mapitem?.blob?.startsWith("http")
      ? mapitem.blob
      : typeof mapitem?.key?.url === "string"
      ? mapitem.key.url
      : null;

  if (!imageUri) {
    console.warn("⚠️ Invalid imageUri for mapitem:", mapitem);
    return <Text>⚠️ bad uri</Text>;
  }

  // const VideoPlayer = ({ uri }: { uri: string }) => {
  //     // console.log('uri', uri);
  //     return (
  //         <View style={[styles.container, { maxHeight: 200, height: 200, width: 200 }]}>
  //             {Platform.OS === 'web' ? (
  //                 <ReactPlayer url={uri} controls width="100%" height="100%" muted />
  //             ) : (
  //                 <ExpoVideo
  //                     source={{ uri }}
  //                     useNativeControls
  //                     resizeMode={ResizeMode.CONTAIN}
  //                     shouldPlay={false}
  //                     style={{ width: '100%', height: 220, backgroundColor: 'black' }}
  //                     onError={(e) => console.log('🎥 video error', JSON.stringify(e, null, 2))}
  //                     onLoadStart={() => console.log('loading video...')}
  //                     onLoad={() => console.log('✅ loaded')}
  //                     onPlaybackStatusUpdate={(status) => console.log('status', status)}
  //                 />
  //                 // <ExpoVideo
  //                 //     source={{ uri: `${uri}/mp4` }}
  //                 //     useNativeControls
  //                 //     resizeMode={ResizeMode.CONTAIN} // ✅ valid
  //                 //     style={{ width: '100%', height: 220, backgroundColor: 'black' }}
  //                 // />
  //             )}
  //         </View>
  //     );
  // };

  // const VideoPlayer = ({ uri }: { uri: string }) => {
  //     // console.log('uri', uri);
  //     return (
  //         <View style={[styles.container, { maxHeight: 100 }]}>
  //             {Platform.OS === 'web' ? (
  //                 <ReactPlayer url={uri} controls width="100%" height="100%" muted />
  //             ) : (
  //                 <ExpoVideo
  //                     source={{
  //                         uri: `${uri}/mp4`,
  //                         // overrideFileExtensionAndroid: 'mp4',
  //                     }}
  //                     useNativeControls
  //                     resizeMode={ResizeMode.CONTAIN}
  //                     shouldPlay={false}
  //                     style={{ width: '100%', height: 200, backgroundColor: 'black' }}
  //                     onError={(e) => console.log('🎥 Video error:', e)}
  //                 />
  //             )}
  //         </View>
  //     );
  // };

  const test = () => {
    console.log("ballotsMediaBLOBs", ballotsMediaBLOBs);
    console.log("mapitem", mapitem);
  };

  return currBallot?.media_option_type === "images" ? (
    <Image
      key={mapitem?.key?.url}
      style={[styles.optionImg, { resizeMode: "contain" }]}
      source={{ uri: mapitem?.key?.url || mapitem?.blob }}
      onLoad={() => console.log("✅ image loaded")}
      onError={(e) => console.log("❌ image error", e.nativeEvent.error)}
    />
  ) : // </View>
  currBallot?.media_option_type === "audio" ? (
    <View style={styles.soundBarsCont}>
      <SoundBars
        index={index}
        audioOrIcon={"icon"}
        mapitemSoundBLOB={mapitem}
        ballotsMediaBLOBs={ballotsMediaBLOBs}
        currentSoundRef={currentSoundRef}
      />
    </View>
  ) : (
    currBallot?.media_option_type === "videos" && (
      // <TouchableOpacity onPress={test}>
      //     <Text> ayoo </Text>
      // </TouchableOpacity>

      <VideoPlayer uri={mapitem?.key?.url || mapitem?.blob} />
      // <VideoPlayer uri={mapitem?.key?.url || mapitem?.blob} />
    )
  );
  // return
};

const styles = StyleSheet.create({
  container: {
    gap: 5,
    // padding: 10,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  soundBarsCont: {
    top: screenHeight / 45,
  },
  centerCont: {
    flex: 1, // Allow this to take remaining space
    height: screenHeight * 0.325,
    width: "100%",
    justifyContent: "center", // Center the content vertically
    alignItems: "center",
  },
  optionImg: {
    width: "100%",
    // height: undefined,
    aspectRatio: 1, // keeps it square
    resizeMode: "cover", // or 'contain' if you prefer
    // flexGrow: 1, // 👈 key on react-native-web
    // alignSelf: 'stretch', // 👈 makes browser honor parent width
  },
});

export default MediaVoteOption;
