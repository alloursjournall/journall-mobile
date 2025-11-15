import React, { useState, useRef } from "react";

// redux:
import { RootState } from "@/redux/store/rootReducer";
import { useSelector } from "react-redux";

// utils:
import {
  HeartIcon,
  CommentIcon,
  RedBackArrowIcon,
  ThoughtsIcon,
  MomentsIcon,
  FieldsIcon,
  GreatfullIcon,
  CheeseIcon2,
  LitFireIcon,
  SoundIcon,
} from "@/constants/Images";
import { grayphite } from "@/constants/Colors";
import {
  TextInput,
  Image,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { useContentFunction } from "@/Contexts/ContentFunctions";
// import AudioRecorderPlayer from 'react-native-audio-recorder-player';
// const audioRecorderPlayer = new AudioRecorderPlayer();

interface MainRootCommentInputBarProps {
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
  day: any;
  usersPassLocks: any;
  setUsersPassLocks: any;
  comments: any;
  setComments: any;
  allUserProfileIcons: any;
  setError: any;
  soundComments: any;
  setSoundComments: any;
  leaveCommentLockIsUnlocked: any;
  setCurrDaySelection: any;
}

const MainRootCommentInputBar: React.FC<MainRootCommentInputBarProps> = ({
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

  day,
  usersPassLocks,
  setUsersPassLocks,
  comments,
  setComments,
  allUserProfileIcons,
  setError,
  soundComments,
  setSoundComments,
  leaveCommentLockIsUnlocked,
  setCurrDaySelection,
}) => {
  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );

  const dayHasThoughts = day?.thoughts;
  const dayHasMoments = day?.fields;
  const dayHasFields = day?.moments;
  const dayHasGreatfull = day?.greatfulagain;

  const { submitTextComment, submitSoundCommentThought, returnProfileImg } =
    useContentFunction();

  const [showCommentIconMenu, setShowCommentIconMenu] = useState<any>(false);
  const iconUri = returnProfileImg(CURRENT_USER?.user_id, allUserProfileIcons);

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

  const addMainRootCommentClick = async () => {
    console.log("add main root comment click");
    if (day?.commenter_can_determine && mainCheckboxCheckpoint === false) {
      setMainCheckboxCheckpoint(true);
    } else {
      if (mainRootSoundCommentClick) {
        // save sound comment
        const newComments = await submitSoundCommentThought(
          null,
          null,
          null,
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
          day,
          usersPassLocks,
          comments,
          setComments,
          setError
        );
      } else {
        const newComments = await submitTextComment(
          null,
          null,

          null,
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
          day,
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

  const soundCommentClickToggler = () => {
    setMainRootSoundCommentClick(!mainRootSoundCommentClick);
  };

  const showCommentIconMenuToggler = () => {
    setShowCommentIconMenu(!showCommentIconMenu);
  };

  const setCommentIconFunc = (icon: string) => {
    setMainRootCommentIcon(icon);
  };

  const shouldShowLeaveCommentsLock =
    !day?.lock ||
    day?.lock !== "leave comments" ||
    (day?.lock === "leave comments" && leaveCommentLockIsUnlocked);

  const goBack = () => {
    if (day?.thoughts?.some((th: any) => th?.thoughts?.length)) {
      setCurrDaySelection("thoughts");
    }
    if (day?.moments?.id) {
      setCurrDaySelection("moments");
    }
    if (day?.fields?.id) {
      setCurrDaySelection("fields");
    }
    if (day?.greatfullagain?.id) {
      setCurrDaySelection("greatfullagain");
    }
  };

  return showCommentIconMenu ? (
    <View style={styles.inputRow}>
      <TouchableOpacity onPress={showCommentIconMenuToggler}>
        <Image
          style={styles.showCommentIconRowIcon}
          source={RedBackArrowIcon}
        />
      </TouchableOpacity>

      {dayHasThoughts && (
        <TouchableOpacity onPress={() => setCommentIconFunc("thoughts")}>
          <Image style={styles.showCommentIconRowIcon} source={ThoughtsIcon} />
        </TouchableOpacity>
      )}
      {dayHasMoments && (
        <TouchableOpacity onPress={() => setCommentIconFunc("moments")}>
          <Image style={styles.showCommentIconRowIcon} source={MomentsIcon} />
        </TouchableOpacity>
      )}
      {dayHasFields && (
        <TouchableOpacity onPress={() => setCommentIconFunc("fields")}>
          <Image style={styles.showCommentIconRowIcon} source={FieldsIcon} />
        </TouchableOpacity>
      )}
      {dayHasGreatfull && (
        <TouchableOpacity onPress={() => setCommentIconFunc("greatfull")}>
          <Image style={styles.showCommentIconRowIcon} source={GreatfullIcon} />
        </TouchableOpacity>
      )}

      <Image style={styles.showCommentIconRowIcon} source={CheeseIcon2} />
      <Image style={styles.showCommentIconRowIcon} source={LitFireIcon} />
    </View>
  ) : (
    <View style={styles.inputRow}>
      {/* // * * * * * remidner devnotes Comments/sortingFunctions.ts     sort by popularity or time. */}

      <TouchableOpacity onPress={goBack}>
        <Image source={CommentIcon} style={styles.soundIcon} />
      </TouchableOpacity>

      {shouldShowLeaveCommentsLock && (
        <View style={styles.textVoiceCommentIconCont}>
          {day?.text_comments_ok === true &&
            mainRootSoundCommentClick === false && (
              <TextInput
                maxLength={333}
                value={mainRootCommentInputValue}
                // onFocus={() => replyInputFocus(mainRootCommentIsTyping, setMainRootCommentIsTyping, mainRootCommentInputValue, setMainRootCommentInputValue)}
                // onBlur={() => replyInputUnFocus(mainRootCommentIsTyping, setMainRootCommentIsTyping)}
                onChangeText={mainRootCommentChange}
                style={styles.textInput2}
                // style={styles.textInput}
              />
            )}

          {day?.voice_comments_ok === true &&
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

          <TouchableOpacity
            onPress={showCommentIconMenuToggler}
            style={styles.showCommentIconButtonRow}
          >
            {typeof iconUri === "string" && iconUri.startsWith("http") ? (
              <Image
                source={{ uri: iconUri }}
                style={[{ borderRadius: 50 }, styles.showCommentIconRowIcon]}
              />
            ) : (
              <Image
                source={HeartIcon}
                style={[{ borderRadius: 0 }, styles.showCommentIconRowIcon]}
              />
            )}
            {/* <Image style={[{ borderRadius: 50 }, styles.showCommentIconRowIcon]} source={{ uri: returnProfileImg(CURRENT_USER?.id, allUserProfileIcons) }} /> */}

            <Image
              style={styles.showCommentIconRowIconMini}
              source={ThoughtsIcon}
            />
          </TouchableOpacity>
        </View>
      )}

      {shouldShowLeaveCommentsLock && (
        <TouchableOpacity
          style={styles.mainRootAddCommentInput}
          onPress={addMainRootCommentClick}
        >
          <Text>+</Text>
        </TouchableOpacity>
      )}
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
  textInput2: {
    width: 24, // give it realistic room for text
    maxHeight: 20, // ✅ fixes the tall-on-type issue
    // maxHeight: 30, // ✅ fixes the tall-on-type issue
    paddingVertical: 0, // remove RN’s default 5-6 px padding
    paddingHorizontal: 8,
    borderRadius: 50,
    borderTopLeftRadius: 14.5,
    borderTopRightRadius: 65.5,
    borderBottomLeftRadius: 122.5,
    borderBottomRightRadius: 30,
    color: "#444",
    fontFamily: "fuzzy",
    fontSize: 10,
    borderWidth: 1.5,
    borderColor: "#44454fea",
    textAlignVertical: "center", // ✅ keeps text centered on Android
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

  showCommentIconButtonRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
    paddingVertical: 0,
    paddingHorizontal: 2,
  },
  showCommentIconRowIcon: {
    height: 25,
    width: 25,
  },
  showCommentIconRowIconMini: {
    height: 15,
    width: 15,
  },
});

export default MainRootCommentInputBar;
