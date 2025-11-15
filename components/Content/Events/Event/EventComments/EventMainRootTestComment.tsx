import { useState, useEffect, useRef } from "react";

// <>
import {
  TextInput,
  Platform,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";
// import EventCheckboxContainer from './EventCheckboxContainer';
import EventMainRootCheckboxContainer from "./EventMainRootCheckboxContainer";
import CommentIcon from "@/components/Content/Day/DayDisplays/Comments/TheComment/CommentBodyTop/CommentIcon";

// @reduxjs/toolkit:
import { RootState } from "@/redux/store/rootReducer";
import { useSelector } from "react-redux";

// utils:
import { grayphite } from "@/constants/Colors";
import { useContentFunction } from "@/Contexts/ContentFunctions";
import { SoundIcon, StarIcon } from "@/constants/Images";

interface MainRootTestCommentProps {
  mainCommentStarrable: any;
  setMainCommentStarrable: any;
  mainCommentThoughtsOk: any;
  setMainCommentThoughtsOk: any;
  mainCommentLock: any;
  setMainCommentLock: any;
  mainCommentUnlock: any;
  setMainCommentUnlock: any;
  mainCommentIsNonAnonymous: any;
  setMainCommentIsNonAnonymous: any;
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
  mainCheckboxCheckpoint: any;
  setMainCheckboxCheckpoint: any;
  mainCommentCommenterCanDetermine: any;
  setMainCommentCommenterCanDetermine: any;
  customNotificationMsg: any;
  setCustomNotificationMsg: any;
  mainRootCommentIcon: any;
  setMainRootCommentIcon: any;
  mainRootCommentInputValue: any;
  setMainRootCommentInputValue: any;
  mainRootSoundCommentClick: any;
  setMainRootSoundCommentClick: any;
  event: any;
  allUserProfileIcons: any;
  comments: any;
  setComments: any;
  usersPassLocks: any;
  setUsersPassLocks: any;
  soundComments: any;
  setSoundComments: any;
}

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const EventMainRootTestComment: React.FC<MainRootTestCommentProps> = ({
  mainCommentStarrable,
  setMainCommentStarrable,
  mainCommentThoughtsOk,
  setMainCommentThoughtsOk,
  mainCommentLock,
  setMainCommentLock,
  mainCommentUnlock,
  setMainCommentUnlock,
  mainCommentIsNonAnonymous,
  setMainCommentIsNonAnonymous,
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
  mainCheckboxCheckpoint,
  setMainCheckboxCheckpoint,
  mainCommentCommenterCanDetermine,
  setMainCommentCommenterCanDetermine,
  customNotificationMsg,
  setCustomNotificationMsg,
  mainRootCommentIcon,
  setMainRootCommentIcon,
  mainRootCommentInputValue,
  setMainRootCommentInputValue,
  mainRootSoundCommentClick,
  setMainRootSoundCommentClick,
  event,
  allUserProfileIcons,
  comments,
  setComments,
  usersPassLocks,
  setUsersPassLocks,
  soundComments,
  setSoundComments,
}) => {
  const { submitTextComment, submitSoundCommentThought } = useContentFunction();

  // hooks:
  const { returnProfileImg } = useContentFunction();

  // state:
  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );
  // const CURR_DAY = useSelector( (state:RootState) => state.day.CURR_DAY)

  const [startVoiceRecording, setStartVoiceRecording] =
    useState<boolean>(false);
  const [animationStarted, setAnimationStarted] = useState<boolean>(false);
  const [mainRootSoundCommentFile, setMainRootSoundCommentFile] =
    useState<Blob | null>(null);
  const [error, setError] = useState<boolean>(false);

  const holdTimeoutRef = useRef<any>(null);
  const streamRef = useRef<any>(null); // let stream;
  const recorderRef = useRef<any>(null); // let recorder;
  const containerRef = useRef<any>(null);
  let animationIndex: number = 0;
  let animationInterval: any = null;

  const test = () => {
    console.log("well thats my favorite part");
  };

  const submitCommentFunc = async () => {
    if (event?.commenter_can_determine && mainCheckboxCheckpoint === false) {
      setMainCheckboxCheckpoint(true);
    }

    if (mainRootSoundCommentClick === true) {
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
    }

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
      null,
      setUsersPassLocks,
      mainRootSoundCommentFile,
      mainRootCommentInputValue,
      setComments,
      setError
    );
    console.log("newComments", newComments);
  };

  return event?.commenter_can_determine && mainCheckboxCheckpoint === true ? (
    <EventMainRootCheckboxContainer
      mainCommentStarrable={mainCommentStarrable}
      setMainCommentStarrable={setMainCommentStarrable}
      mainCommentLock={mainCommentLock}
      setMainCommentLock={setMainCommentLock}
      mainCommentUnlock={mainCommentUnlock}
      setMainCommentUnlock={setMainCommentUnlock}
      mainCommentThoughtsOk={mainCommentThoughtsOk}
      setMainCommentThoughtsOk={setMainCommentThoughtsOk}
      mainCommentStarsShowAvg={mainCommentStarsShowAvg}
      setMainCommentStarsShowAvg={setMainCommentStarsShowAvg}
      mainCommentStarsShowUsers={mainCommentStarsShowUsers}
      setMainCommentStarsShowUsers={setMainCommentStarsShowUsers}
      mainCommentVoiceOk={mainCommentVoiceOk}
      setMainCommentVoiceOk={setMainCommentVoiceOk}
      mainCommentTextOk={mainCommentTextOk}
      setMainCommentTextOk={setMainCommentTextOk}
      mainCommentIsNonAnonymous={mainCommentIsNonAnonymous}
      setMainCommentIsNonAnonymous={setMainCommentIsNonAnonymous}
      mainCommentAnonymousCommentsOk={mainCommentAnonymousCommentsOk}
      setMainCommentAnonymousCommentsOk={setMainCommentAnonymousCommentsOk}
      mainCommentCommenterCanDetermine={mainCommentCommenterCanDetermine}
      setMainCommentCommenterCanDetermine={setMainCommentCommenterCanDetermine}
      mainCheckboxCheckpoint={mainCheckboxCheckpoint}
      setMainCheckboxCheckpoint={setMainCheckboxCheckpoint}
      allUserProfileIcons={allUserProfileIcons}
      mainRootCommentIcon={mainRootCommentIcon}
      setMainRootCommentIcon={setMainRootCommentIcon}
      mainRootCommentInputValue={mainRootCommentInputValue}
      setMainRootCommentInputValue={setMainRootCommentInputValue}
      mainRootSoundCommentClick={mainRootSoundCommentClick}
      setMainRootSoundCommentClick={setMainRootSoundCommentClick}
      mainRootSoundCommentFile={mainRootSoundCommentFile}
      setMainRootSoundCommentFile={setMainRootSoundCommentFile}
      event={event}
      setUsersPassLocks={setUsersPassLocks}
      setError={setError}
      setComments={setComments}
    />
  ) : (
    <View style={styles.commentCont}>
      {/* className={styles.actualCommentsTopIndentIndexZeroBorder} */}
      <View style={styles.actualCommentsTop}>
        <Image
          style={styles.commentingProfileIcon}
          source={returnProfileImg(CURRENT_USER?.id, allUserProfileIcons)}
        />

        {mainRootCommentIcon?.length >= 1 && (
          <CommentIcon commentIcon={mainRootCommentIcon} indentIndex={0} />
        )}

        {mainRootSoundCommentClick === true ? (
          <View></View>
        ) : (
          <ScrollView contentContainerStyle={styles.textContScrolling}>
            <Text style={styles.text}> {mainRootCommentInputValue} </Text>
          </ScrollView>
        )}
      </View>

      <View style={styles.actualCommentsBottom}>
        <Text style={styles.usernameText}> {CURRENT_USER?.username} </Text>

        <View style={styles.leftSideCont}>
          {event?.thoughts_ok !== "no" &&
            event?.text_comments_ok &&
            mainCommentThoughtsOk !== "no" &&
            mainCommentTextOk && (
              <TextInput readOnly={true} style={styles.input} />
            )}

          {event?.thoughts_ok !== "no" &&
            event?.text_comments_ok &&
            mainCommentThoughtsOk !== "no" &&
            mainCommentVoiceOk && (
              <Image style={styles.icon} source={SoundIcon} />
            )}

          <TouchableOpacity
            style={styles.addCommentPlusInput}
            onPress={submitCommentFunc}
          >
            <Text style={styles.addCommentInputText}> + </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.ghost}> + </Text>

        {event?.thoughts_ok !== "no" &&
          event?.text_comments_ok &&
          mainCommentThoughtsOk !== "no" &&
          mainCommentVoiceOk && <Image style={styles.icon} source={StarIcon} />}

        {event?.thoughts_ok !== "no" && mainCommentThoughtsOk !== "no" && (
          <Image
            style={styles.icon}
            source={require("@/assets/images/dojo-img/iconComments.png")}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  commentCont: {
    flexDirection: "column",
    gap: 0,
    justifyContent: "center",
    alignItems: "flex-start",
    borderWidth: 2,
    borderColor: grayphite,
    padding: 5,
    // boxSizing: 'border-box',
    alignSelf: "center",
    width: "95%",
  },
  BOBblackoutbar: {
    borderWidth: 1,
    borderColor: grayphite,
    backgroundColor: "white",
  },

  actualCommentsTop: {
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

  commentingProfileIcon: {
    height: 25,
    width: 25,
    borderRadius: 50,
  },

  // bottom:x
  actualCommentsBottom: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 2.5,
    paddingRight: 5,
  },

  leftSideCont: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
    // gap: 10
  },
  rightSideCont: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
    // gap: 10
  },
  addCommentPlusInput: {
    height: 20,
    width: 20,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: -1,
    borderBottomRightRadius: 11,
    borderWidth: 2,
    borderColor: grayphite,
  },
  addCommentInputText: {
    fontSize: 16,
    fontWeight: 500,
    fontFamily: "Fuzzy Bubbles",
    color: grayphite,
  },
  icon: {
    height: 20,
    width: 20,
  },
  usernameText: {
    color: "#a06b51",
    fontFamily: "Fuzzy Bubbles",
    fontSize: 16,
  },
  input: {
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
  ghost: {
    opacity: 0,
  },
});

export default EventMainRootTestComment;
