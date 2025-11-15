import { useState, useRef } from "react";

//  <>
import {
  Platform,
  Dimensions,
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
// 🚨 🚨 CommentProfileIcon is good to go, no differences between {day} | {event}
import CommentProfileIcon from "@/components/Content/Day/DayDisplays/Comments/TheComment/CommentBodyTop/CommentProfileIcon";
// 🚨 🚨 CommentText is good to go
import CommentText from "@/components/Content/Day/DayDisplays/Comments/TheComment/CommentBodyTop/CommentText";
// 🚨 🚨 commentIcon is good to go:
import CommentIcon from "@/components/Content/Day/DayDisplays/Comments/TheComment/CommentBodyTop/CommentIcon";

// utils:
import { Audio as ExpoAudio } from "expo-av";
import { useContentFunction } from "@/Contexts/ContentFunctions";
import { SoundIcon, SoundWaveIcon } from "@/constants/Images";

interface CommentBodyTopProps {
  mapitem: any;
  index: number;
  indentIndex: number;
  settings: any;
  voiceCommentClick: boolean;
  soundCommentFile: any;
  setSoundCommentFile: any;
  // handleMouseDown: any,
  // handleMouseUp: any,
  // containerRef: any,
  // animationStarted: any,
  // playRecording: any,
  // deleteRecording: any,
  replyInputIsTyping: any;
  replyInputValue: any;
  soundComments: any;
  setSoundComments: any;
  allUserProfileIcons: any;
  event: any;
  usersPassLocks: any;
  setUsersPassLocks: any;
  usersAllowedToUnlock: any;
  setUsersAllowedToUnlock: any;
  comments: any;
  setComments: any;
}

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const EventCommentBodyTop: React.FC<CommentBodyTopProps> = ({
  mapitem,
  index,
  indentIndex,
  settings,
  voiceCommentClick,
  soundCommentFile,
  setSoundCommentFile,
  // handleMouseDown,
  // handleMouseUp,
  // containerRef,
  // animationStarted,
  // playRecording,
  // deleteRecording,
  replyInputIsTyping,
  replyInputValue,
  soundComments,
  setSoundComments,
  allUserProfileIcons,
  event,
  usersPassLocks,
  setUsersPassLocks,
  usersAllowedToUnlock,
  setUsersAllowedToUnlock,
  comments,
  setComments,
}) => {
  const [commentProfileIconClicked, setCommentProfileIconClicked] =
    useState(false);
  const [recording, setRecording] = useState(false);
  const [playing, setPlaying] = useState(false);
  const recordingRef = useRef<InstanceType<typeof ExpoAudio.Recording> | null>(
    null
  );

  // State to track if we are currently recording
  const [startVoiceRecording, setStartVoiceRecording] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false); // To track animation status

  //  Refs to handle recording state
  const streamRef = useRef<any>(null); // To store the media stream
  const recorderRef = useRef<any>(null); // To store the MediaRecorder instance
  const holdTimeoutRef = useRef<any>(null); // To store timeout for delaying the start of recording
  const animationIntervalRef = useRef<any>(null); // To store the interval for the animation

  const { startPlayingRecordedSound, startRecordingSound } =
    useContentFunction();

  const {
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
  } = settings;

  const test = () => {
    console.log("mapitem", mapitem);
    console.log(
      "mapitem?.commenter_can_determine",
      mapitem?.commenter_can_determine
    );
    console.log(
      "commenterCanDetermineCheckboxCheckpoint",
      commenterCanDetermineCheckboxCheckpoint
    );
  };

  const playSoundComment = (mapitem: any) => {
    async function playWavFile(key: any) {
      console.log("key", key);
      // Create a Blob from the base64 data
      const audioBlob = new Blob(
        [
          new Uint8Array(
            atob(key)
              .split("")
              .map((c) => c.charCodeAt(0))
          ),
        ],
        { type: "audio/mp3" }
      );
      // Create a URL for the Blob
      const audioUrl = URL.createObjectURL(audioBlob);

      const audio = new Audio(audioUrl);
      audio
        .play()
        .then(() => {
          console.log("Playback started");
        })
        .catch((error) => {
          console.error("Playback error:", error);
        });
    }
    console.log("soundComments", soundComments);

    // soundPath is the AWS key made from:  URL.createObjectURL(new Blob([preBody])) saved as {t.thought} only if {t.voice=true} || {t.voice_comment_path}
    const soundPath = mapitem?.thought; // ideally voice_comment_path  (but np for now)
    console.log("soundPath", soundPath);

    soundComments?.forEach((comment: any) => {
      // 🚨 comment.key.Key || comment.thought.Key
      const pathFromComment = comment?.key?.Key;
      console.log("comment", comment);
      if (soundPath === comment?.thought) {
        // if (soundPath === comment?.thought?.Key) {
        console.log("moneyyyy");
        // if (soundPath === comment?.key?.Key) {
        playWavFile(comment?.blob);
      }
    });
  };

  const playSoundCommentNative = () => {};

  const playSoundCommentFunc = () => {
    if (Platform.OS === "web") {
      playSoundComment(mapitem);
    }
    if (Platform.OS === "ios" || Platform.OS === "android") {
    }
  };

  // const

  return (
    <View style={styles.cont}>
      <CommentProfileIcon
        mapitem={mapitem}
        replyInputIsTyping={replyInputIsTyping}
        usersPassLocks={usersPassLocks}
        commentProfileIconClicked={commentProfileIconClicked}
        setCommentProfileIconClicked={setCommentProfileIconClicked}
        allUserProfileIcons={allUserProfileIcons}
        indentIndex={indentIndex}
        replyInputValue={replyInputValue}
      />

      {mapitem?.comment_icon && (
        <CommentIcon
          commentIcon={
            mapitem?.is_pinned
              ? "pin"
              : // CURR_DAY_MOST_POPULAR_COMMENT === mapitem ? "crown" :
                mapitem?.comment_icon
          }
          indentIndex={indentIndex}
        />
      )}

      <View style={styles.textCont}>
        {voiceCommentClick === true ? (
          <View style={styles.soundFileContainer}>
            <TouchableOpacity
              onPress={() =>
                startRecordingSound(
                  recordingRef,
                  streamRef,
                  setSoundCommentFile
                )
              }
            >
              <Image style={styles.soundWaveIcon} source={SoundWaveIcon} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => startPlayingRecordedSound(soundCommentFile)}
            >
              <Image style={styles.icon} source={SoundIcon} />
            </TouchableOpacity>

            {/* <Image style={styles.icon} source={SoundIcon} /> */}
          </View>
        ) : mapitem?.is_voice === true ? (
          <TouchableOpacity
            style={styles.soundFileContainer}
            onPress={() => playSoundComment(mapitem)}
          >
            <Image style={styles.iconMini} source={SoundIcon} />
          </TouchableOpacity>
        ) : replyInputValue?.length >= 1 &&
          replyInputValue !== "@" &&
          replyInputIsTyping ? (
          // (replyInputValue?.length >= 1 && replyInputValue !== "@" && replyInputIsTyping && commenterCanDetermineCheckboxCheckpoint === false)
          <ScrollView contentContainerStyle={styles.textContScrolling}>
            <Text style={styles.text}> {replyInputValue} </Text>
          </ScrollView>
        ) : (
          <CommentText mapitem={mapitem} indentIndex={indentIndex} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    maxHeight: screenHeight / 20,
    overflow: "scroll",
    paddingTop: 5,
    paddingLeft: 2.5,
    paddingRight: 5,
    paddingBottom: 5,
    // padding: 10,
  },
  textContScrolling: {
    padding: 10,
    maxWidth: "100%",
  },
  textCont: {
    width: screenWidth * 0.6,
  },
  text: {
    flexWrap: "wrap", // Ensure text wraps to the next line if it exceeds the width
    width: "100%", // Make sure it takes up the full width available
  },
  icon: {
    height: 35,
    width: 35,
  },
  iconMini: {
    height: 20,
    width: 20,
  },
  soundWaveIcon: {
    height: 50,
    width: 50,
  },

  soundFileContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
});

export default EventCommentBodyTop;
