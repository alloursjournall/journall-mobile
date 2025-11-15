import { useState, useRef } from "react";

// redux:
import { RootState } from "@/redux/store/rootReducer";
import { useSelector, useDispatch, createDispatchHook } from "react-redux";

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
import CommentProfileIcon from "./CommentProfileIcon";
import ProfileIconClicked from "./ProfileIconClicked";
import CommentText from "./CommentText";
import CommentIcon from "./CommentIcon";

import MainRootCommentsLoop from "../../MainRootCommentsLoop";

// utils:
import { useContentFunction } from "@/Contexts/ContentFunctions";
import { grayphite } from "@/constants/Colors";
import { TrashIcon, SoundIcon, SoundWaveIcon } from "@/constants/Images";
import { Audio as ExpoAudio } from "expo-av";
// import AudioRecorderPlayer from 'react-native-audio-recorder-player';
// const audioRecorderPlayer = new AudioRecorderPlayer();

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
  setAllUserProfileIcons: any;
  day: any;
  usersPassLocks: any;
  setUsersPassLocks: any;
  usersAllowedToUnlock: any;
  setUsersAllowedToUnlock: any;
  comments: any;
  setComments: any;
}

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const CommentBodyTop: React.FC<CommentBodyTopProps> = ({
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
  setAllUserProfileIcons,
  day,
  usersPassLocks,
  setUsersPassLocks,
  usersAllowedToUnlock,
  setUsersAllowedToUnlock,
  comments,
  setComments,
}) => {
  const { startRecordingSound, clearRecordedSound, startPlayingRecordedSound } =
    useContentFunction();

  const [commentProfileIconClicked, setCommentProfileIconClicked] =
    useState(false);
  const [recording, setRecording] = useState(false);
  const [playing, setPlaying] = useState(false);
  const recordingRef = useRef<InstanceType<typeof ExpoAudio.Recording> | null>(
    null
  );
  const [recordingUri, setRecordingUri] = useState<string | null>(null);

  // State to track if we are currently recording
  const [startVoiceRecording, setStartVoiceRecording] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false); // To track animation status

  //  Refs to handle recording state
  const recorderRef = useRef<any>(null); // To store the MediaRecorder instance
  const streamRef = useRef<any>(null); // To store the media stream

  const holdTimeoutRef = useRef<any>(null); // To store timeout for delaying the start of recording
  const animationIntervalRef = useRef<any>(null); // To store the interval for the animation

  const [isPlaying, setIsPlaying] = useState(false);
  // this is the android playing instance it's not soundCommentFile
  const [soundObj, setSoundObj] = useState<ExpoAudio.Sound | null>(null);

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
    console.log("day?.commenter_can_determine", day?.commenter_can_determine);
    console.log(
      "commenterCanDetermineCheckboxCheckpoint",
      commenterCanDetermineCheckboxCheckpoint
    );
  };

  const playSoundComment = async (mapitem: any) => {
    console.log("mapitem", mapitem);
    console.log("soundComments", soundComments);
    try {
      // match {t.thought.thought} to soundComments?.thought?.Key
      // const soundPathMatch = soundComments?.find((s: any) => s?.thought?.Key === mapitem?.thought);
      // console.log('soundPathMatch', soundPathMatch);
      const soundPath = mapitem?.thought;
      if (!soundPath) return console.warn("No sound path in mapitem");

      // find the matching comment
      const match = soundComments.find(
        (comment: any) => comment?.thought?.key === soundPath
      );
      if (!match) return console.warn("No matching comment found");

      const fileUrl = match.blob; // CloudFront URL (public)

      if (Platform.OS === "web") {
        // 💻 Web: use HTMLAudioElement
        const audio = new Audio(fileUrl);
        await audio.play();
        console.log("Playback started (web)");
      } else {
        // 📱 React Native: use Expo AV or similar library
        const { Audio } = await import("expo-av");
        const { sound } = await Audio.Sound.createAsync({ uri: fileUrl });
        await sound.playAsync();
        console.log("Playback started (native)");
      }
    } catch (error) {
      console.error("Playback error:", error);
    }
  };

  // const playSoundComment = (mapitem: any) => {

  //     async function playWavFile(key: any) {
  //         console.log('mapitem key', key);

  //         return;
  //         // Create a Blob from the base64 data

  //         const audioBlob = new Blob(
  //             [
  //                 new Uint8Array(
  //                     atob(key)
  //                         .split('')
  //                         .map((c) => c.charCodeAt(0)),
  //                 ),
  //             ],
  //             { type: 'audio/mp3' },
  //         );
  //         // Create a URL for the Blob
  //         const audioUrl = URL.createObjectURL(audioBlob);

  //         const audio = new Audio(audioUrl);
  //         audio
  //             .play()
  //             .then(() => {
  //                 console.log('Playback started');
  //             })
  //             .catch((error) => {
  //                 console.error('Playback error:', error);
  //             });
  //     }
  //     console.log('soundComments', soundComments);

  //     // soundPath is the AWS key made from:  URL.createObjectURL(new Blob([preBody])) saved as {t.thought} only if {t.voice=true} || {t.voice_comment_path}
  //     const soundPath = mapitem?.thought; // ideally voice_comment_path  (but np for now)
  //     console.log('soundPath', soundPath);

  //     soundComments?.forEach((comment: any) => {
  //         // 🚨 comment.key.Key || comment.thought.Key
  //         const pathFromComment = comment?.key?.Key;

  //         console.log('comment', comment);
  //         console.log('soundPath', soundPath);

  //         if (soundPath === comment?.thought?.Key) {
  //             // if (soundPath === comment?.thought?.Key) {
  //             console.log('moneyyyy');
  //             // if (soundPath === comment?.key?.Key) {
  //             playWavFile(comment?.blob);
  //         }
  //     });
  // };

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
    <View style={[{ borderBottomLeftRadius: 7 }, styles.cont]}>
      <CommentProfileIcon
        mapitem={mapitem}
        replyInputIsTyping={replyInputIsTyping}
        replyInputValue={replyInputValue}
        usersPassLocks={usersPassLocks}
        commentProfileIconClicked={commentProfileIconClicked}
        setCommentProfileIconClicked={setCommentProfileIconClicked}
        allUserProfileIcons={allUserProfileIcons}
        indentIndex={indentIndex}
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
        {commentProfileIconClicked === true ? (
          <ProfileIconClicked
            mapitemComment={mapitem}
            day={day}
            event={null}
            usersAllowedToUnlock={usersAllowedToUnlock}
            setUsersPassLocks={setUsersPassLocks}
            setComments={setComments}
          />
        ) : voiceCommentClick === true ? (
          <View style={styles.soundFileContainer}>
            <TouchableOpacity
              onPress={() => clearRecordedSound(setSoundCommentFile)}
            >
              <Image style={styles.icon} source={TrashIcon} />
            </TouchableOpacity>

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
    justifyContent: "space-around",
    alignItems: "center",
    // gap: 20,
  },
});

export default CommentBodyTop;

// const startRecording = async () => {
//     console.log('startRecording is firing');

//     // Check if we are running on the web or mobile platform
//     if (Platform.OS === 'web') {
//         // Stop the existing recording if active
//         if (recorderRef.current && recorderRef.current.state === 'recording') {
//             console.log('Stopping existing recording...');
//             recorderRef.current.stop();
//             streamRef.current?.getTracks()?.forEach((track: any) => track?.stop());
//             return; // Exit early to prevent starting a new recording
//         }

//         streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
//         recorderRef.current = new MediaRecorder(streamRef.current);

//         recorderRef.current.start();

//         recorderRef.current.ondataavailable = async (e: any) => {
//             const recordedBlob = new Blob([e.data], { type: 'audio/mp3' });
//             recordedBlob;
//             setSoundCommentFile(recordedBlob);
//         };

//         // Automatically stop recording after 9 seconds
//         setTimeout(() => {
//             if (recorderRef?.current?.state !== 'inactive') {
//                 recorderRef?.current?.stop();
//             }
//             streamRef.current?.getTracks()?.forEach((track: any) => track?.stop());
//             // streamRef.current?.getTracks()?.forEach(track => track?.stop());
//         }, 9000);
//     } // 📱 Mobile (Android / iOS)
//     else {
//         try {
//             const { granted } = await ExpoAudio.requestPermissionsAsync();
//             if (!granted) return;

//             await ExpoAudio.setAudioModeAsync({
//                 allowsRecordingIOS: true,
//                 playsInSilentModeIOS: true,
//             });

//             const recording = new ExpoAudio.Recording();
//             await recording.prepareToRecordAsync({
//                 android: {
//                     extension: '.m4a',
//                     outputFormat: ExpoAudio.AndroidOutputFormat.MPEG_4,
//                     audioEncoder: ExpoAudio.AndroidAudioEncoder.AAC,
//                     sampleRate: 44100,
//                     numberOfChannels: 2,
//                     bitRate: 128000,
//                 },
//                 ios: {
//                     extension: '.m4a',
//                     audioQuality: ExpoAudio.IOSAudioQuality.HIGH,
//                     sampleRate: 44100,
//                     numberOfChannels: 2,
//                     bitRate: 128000,
//                     outputFormat: ExpoAudio.IOSOutputFormat.MPEG4AAC,
//                 },
//                 web: {
//                     // 👈 required for type compatibility, ignored in native
//                     mimeType: 'audio/webm',
//                     bitsPerSecond: 128000,
//                 },
//             });

//             await recording.startAsync();
//             recordingRef.current = recording;
//             console.log('🎙️ recording started');
//         } catch (err) {
//             console.error('Error starting recording:', err);
//         }
//     }
// };

// const stopPlaying = async () => {
//     try {
//         await audioRecorderPlayer.stopPlayer();
//         setPlaying(false);
//     } catch (error) {
//         console.error('Error stopping playback:', error);
//     }
// };
