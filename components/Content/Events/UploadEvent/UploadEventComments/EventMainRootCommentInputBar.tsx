import React, { useState, useRef } from "react";

// utils:
import { grayphite } from "@/constants/Colors";
import {
  TextInput,
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { RedBackArrowIcon, SoundIcon } from "@/constants/Images";
import { useContentFunction } from "@/Contexts/ContentFunctions";

interface props {
  mainRootCommentInputValue: any;
  setMainRootCommentInputValue: any;
  mainRootCommentIsTyping: any;
  setMainRootCommentIsTyping: any;
  mainRootCommentIcon: any;
  setMainRootCommentIcon: any;
  mainRootSoundCommentFile: any;
  setMainRootSoundCommentFile: any;
  mainRootSoundCommentClick: any;
  setMainRootSoundCommentClick: any;
  mainCommentLock: any;
  setMainCommentLock: any;
  mainCommentUnlock: any;
  setMainCommentUnlock: any;
  mainCommentStarrable: any;
  setMainCommentStarrable: any;
  mainCommentThoughtsOk: any;
  setMainCommentThoughtsOk: any;
  mainCommentStarsShowAvg: any;
  setMainCommentStarsShowAvg: any;
  mainCommentStarsShowUsers: any;
  setMainCommentStarsShowUsers: any;
  mainCommentVoiceOk: any;
  setMainCommentVoiceOk: any;
  mainCommentTextOk: any;
  setMainCommentTextOk: any;
  mainCommentAnonymousCommentsOk: any;
  setMainCommentAnonymousCommentsOk: any;
  mainCommentCommenterCanDetermine: any;
  setMainCommentCommenterCanDetermine: any;
  mainCheckboxCheckpoint: any;
  setMainCheckboxCheckpoint: any;
  customNotificationMsg: any;
  setCustomNotificationMsg: any;
  mainCommentIsNonAnonymous: any;
  setMainCommentIsNonAnonymous: any;
  event: any;
  usersPassLocks: any;
  setUsersPassLocks: any;
  comments: any;
  setComments: any;
  allUserProfileIcons: any;
  setError: any;
  soundComments: any;
  setSoundComments: any;
}

const EventMainRootCommentInputBar: React.FC<props> = ({
  mainRootCommentInputValue,
  setMainRootCommentInputValue,
  mainRootCommentIsTyping,
  setMainRootCommentIsTyping,
  mainRootCommentIcon,
  setMainRootCommentIcon,
  mainRootSoundCommentFile,
  setMainRootSoundCommentFile,
  mainRootSoundCommentClick,
  setMainRootSoundCommentClick,
  mainCommentLock,
  setMainCommentLock,
  mainCommentUnlock,
  setMainCommentUnlock,
  mainCommentStarrable,
  setMainCommentStarrable,
  mainCommentThoughtsOk,
  setMainCommentThoughtsOk,
  mainCommentStarsShowAvg,
  setMainCommentStarsShowAvg,
  mainCommentStarsShowUsers,
  setMainCommentStarsShowUsers,
  mainCommentVoiceOk,
  setMainCommentVoiceOk,
  mainCommentTextOk,
  setMainCommentTextOk,
  mainCommentAnonymousCommentsOk,
  setMainCommentAnonymousCommentsOk,
  mainCommentCommenterCanDetermine,
  setMainCommentCommenterCanDetermine,
  mainCheckboxCheckpoint,
  setMainCheckboxCheckpoint,
  customNotificationMsg,
  setCustomNotificationMsg,
  mainCommentIsNonAnonymous,
  setMainCommentIsNonAnonymous,
  event,
  usersPassLocks,
  setUsersPassLocks,
  comments,
  setComments,
  allUserProfileIcons,
  setError,
  soundComments,
  setSoundComments,
}) => {
  const { submitTextComment, submitSoundCommentThought } = useContentFunction();

  const [recording, setRecording] = useState(false);
  const [playing, setPlaying] = useState(false);

  // State to track if we are currently recording
  const [startVoiceRecording, setStartVoiceRecording] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false); // To track animation status

  //  Refs to handle recording state
  const streamRef = useRef<any>(null); // To store the media stream
  const recorderRef = useRef<any>(null); // To store the MediaRecorder instance
  const holdTimeoutRef = useRef<any>(null); // To store timeout for delaying the start of recording
  const animationIntervalRef = useRef<any>(null); // To store the interval for the animation

  const mainRootCommentChange = (text: string) => {
    if (text?.includes("nigger")) {
      setMainRootCommentInputValue("");
    }
    setMainRootCommentInputValue(text);
  };

  const soundCommentClickToggler = () => {
    setMainRootSoundCommentClick(!mainRootSoundCommentClick);
  };

  const addMainRootCommentClick = async () => {
    console.log("add main root comment click");
    if (event?.commenter_can_determine && mainCheckboxCheckpoint === false) {
      setMainCheckboxCheckpoint(true);
    } else {
      if (mainRootSoundCommentClick) {
        // save sound comment
        const newComments = await submitSoundCommentThought(
          null,
          null,
          event?.id,
          null,
          null,
          mainCheckboxCheckpoint,
          setMainCheckboxCheckpoint,
          mainRootSoundCommentFile,
          setMainRootSoundCommentFile,
          setMainRootCommentInputValue,
          soundComments,
          setSoundComments,
          mainCommentThoughtsOk,
          mainCommentStarrable,
          mainCommentStarsShowAvg,
          mainCommentStarsShowUsers,
          mainCommentIsNonAnonymous,
          mainCommentCommenterCanDetermine,
          mainCommentVoiceOk,
          mainCommentTextOk,
          mainCommentAnonymousCommentsOk,
          false,
          false,
          mainCommentLock,
          mainCommentUnlock,
          null,
          usersPassLocks,
          comments,
          setComments,
          setError
        );
      } else {
        const newComments = await submitTextComment(
          null,
          null,

          event?.id,
          null,
          null,
          mainRootCommentIcon,
          mainCheckboxCheckpoint,
          setMainCheckboxCheckpoint,
          mainRootCommentInputValue,
          mainCommentThoughtsOk,
          mainCommentStarrable,
          mainCommentIsNonAnonymous,
          mainCommentStarsShowAvg,
          mainCommentStarsShowUsers,
          false,
          false,
          mainCommentCommenterCanDetermine,
          mainCommentVoiceOk,
          mainCommentTextOk,
          mainCommentAnonymousCommentsOk,
          mainCommentLock,
          mainCommentUnlock,
          null,
          setUsersPassLocks,
          setMainRootSoundCommentFile,
          setMainRootCommentInputValue,
          setComments,
          setError
        );
        console.log("newComments", newComments);
      }
    }
  };

  return (
    <View style={styles.inputRow}>
      {/* // * * * * * remidner devnotes Comments/sortingFunctions.ts     sort by popularity or time. */}

      <View style={styles.textVoiceCommentIconCont}>
        {event?.text_comments_ok === true &&
          mainRootSoundCommentClick === false && (
            <TextInput
              maxLength={333}
              value={mainRootCommentInputValue}
              // onFocus={() => replyInputFocus(mainRootCommentIsTyping, setMainRootCommentIsTyping, mainRootCommentInputValue, setMainRootCommentInputValue)}
              // onBlur={() => replyInputUnFocus(mainRootCommentIsTyping, setMainRootCommentIsTyping)}
              onChangeText={mainRootCommentChange}
              style={styles.textInput}
            />
          )}

        {event?.voice_comments_ok === true &&
          mainRootCommentInputValue?.length < 1 && (
            // onClick={mainRootSoundCommentClick}

            <TouchableOpacity onPress={soundCommentClickToggler}>
              <Image
                // id={mainRootSoundCommentFile !== null ? "floatingPesterAnimation" : ""}
                style={styles.soundIcon}
                source={
                  mainRootSoundCommentClick ? RedBackArrowIcon : SoundIcon
                }
              />
            </TouchableOpacity>
          )}
      </View>

      <TouchableOpacity
        style={styles.mainRootAddCommentInput}
        onPress={addMainRootCommentClick}
      >
        {" "}
        +{" "}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 20,
    borderBottomColor: "#ccc",
    borderBottomWidth: 2,
    borderStyle: "dotted",
    padding: 2.5,
  },

  textVoiceCommentIconCont: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 50,
  },

  mainRootAddCommentInput: {
    height: 20,
    width: 20,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: -1,
    borderBottomRightRadius: 11,
    borderWidth: 2,
    borderColor: grayphite,
    fontSize: 16,
    fontWeight: 500,
    fontFamily: "Fuzzy Bubbles",
    color: grayphite,
  },
  soundIcon: {
    height: 20,
    width: 20,
  },
  textInput: {
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

export default EventMainRootCommentInputBar;
