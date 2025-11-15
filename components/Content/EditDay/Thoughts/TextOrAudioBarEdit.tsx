import axios from "axios";
import { useState, useEffect, useRef } from "react";

import {
  Dimensions,
  TouchableOpacity,
  TextInput,
  Image,
  View,
  Text,
  StyleSheet,
} from "react-native";
import ErrorSlippedUpBanana from "@/components/ErrorSlippedUpBanana";

// utils:
import { useContentFunction } from "@/Contexts/ContentFunctions";
import { SoundWaveIcon, SoundIcon, TrashIcon } from "@/constants/Images";

import { grayphite } from "@/constants/Colors";
// import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { getMostRecentDayPostWithUserIdQueryStringFunc } from "@/graphql/queries";
import { SET_INCORRECT_LOGIN_ATTEMPTS } from "@/redux/login/loginSlice";

interface props {
  editDay: any;
  setEditDay: any;
  textInput: any;
  setTextInput: any;
  blob: any;
  setBlob: any;
  thoughtsBinIndex: number;
  setThoughtsBinIndex: any;

  mediaDeleteError: boolean;
  setMediaDeleteError: any;
}

// const audioRecorderPlayer = new AudioRecorderPlayer();
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const TextOrAudioBarEdit: React.FC<props> = ({
  editDay,
  setEditDay,
  textInput,
  setTextInput,
  blob,
  setBlob,
  thoughtsBinIndex,
  setThoughtsBinIndex,
  mediaDeleteError,
  setMediaDeleteError,
}) => {
  const { startRecordingSound, startPlayingRecordedSound } =
    useContentFunction();

  let thoughts = editDay?.thoughts;
  let thoughtsBinLength = thoughts?.length;

  const [recording, setRecording] = useState(false);
  const [playing, setPlaying] = useState(false);
  const streamRef = useRef<any>(null); // To store the media stream
  const recorderRef = useRef<any>(null); // To store the MediaRecorder instance

  const changeTextInput = (text: any) => {
    if (text?.includes("nigger")) {
      setTextInput("");
    }
    // no dashes "-" since that character is the delimiter which distincts sound thoughts from text thoughts.
    let sanitizedText = text
      .replace(/-/g, "") // Remove all dashes
      .replace(/\s+/g, " "); // Replace multiple spaces with a single space
    setTextInput(sanitizedText);
  };

  const addCommentToBin = () => {
    let clone = { ...editDay };
    let cloneThoughts: any = clone?.thoughts;
    // limit to 7! :D
    if (cloneThoughts?.length === 7) {
      return;
    }
    if (!cloneThoughts) {
      return null;
    }
    let object = { text: "", is_voice: false, blob: null };

    if (textInput?.length) {
      console.log("cloneThoughts", cloneThoughts);
      // let object = { text: textInput, is_voice: false, blob: null }
      object.text = textInput;
      // add object to soft copy of day.thoughts
    } else {
      object.is_voice = true;
      if (blob) {
        object.blob = blob;
      }
      // const object = { text: '', is_voice: true, blob: blob }
    }
    cloneThoughts.push(object);
    clone.thoughts = cloneThoughts;
    setEditDay(clone);
    thoughtsBinLength = thoughtsBinLength - 1;
    // restore defaults after submission.
    setTextInput("");
    setBlob(null);
  };

  const test = () => {
    console.log("editDay", editDay);
  };

  const startRecordingFunc = () => {
    startRecordingSound(recorderRef, streamRef, setBlob);
  };

  const startPlayingFunc = () => {
    // startPlayingSound: (audioRecorderPlayer:any, setPlaying: any, soundCommentFile: any) => any;
    // startPlayingSound(audioRecorderPlayer, setPlaying, blob);
    startPlayingRecordedSound(blob);
  };

  const deleteBlob = () => {
    let clone = { ...editDay };
    let cloneThoughts = clone?.thoughts;
    console.log("cloneThoughts", cloneThoughts);

    if (Array.isArray(cloneThoughts)) {
      let currThought = cloneThoughts[thoughtsBinIndex];
      if (currThought?.is_voice) {
        console.log("currThought voice though!", currThought);
        // delete media coming soon!
        cloneThoughts[thoughtsBinIndex].is_deleted = true;
        cloneThoughts[thoughtsBinIndex].blob = null;
        clone.thoughts = cloneThoughts;
        // setMediaDeleteError(true);
      } else {
        const filteredCloneThoughts = cloneThoughts?.filter(
          (th: any) => th !== editDay?.thoughts[thoughtsBinIndex]
        );
        console.log("currThought", currThought);
        console.log("filteredCloneThoughts", filteredCloneThoughts);
        clone.thoughts = filteredCloneThoughts;
      }
      setEditDay(clone);
      return;
    }

    // [][ don't forget! ]
    thoughtsBinLength = thoughtsBinLength - 1;
    // setBlob(null);
  };

  const decrementThoughtsBin = () => {
    if (thoughtsBinIndex === 0) {
      setThoughtsBinIndex(thoughtsBinLength - 1);
    } else {
      setThoughtsBinIndex(thoughtsBinIndex - 1);
    }
  };

  const incrementThoughtsBin = () => {
    if (
      thoughtsBinIndex === thoughtsBinLength - 1 ||
      thoughtsBinIndex > thoughtsBinLength
    ) {
      setThoughtsBinIndex(0);
    } else {
      setThoughtsBinIndex(thoughtsBinIndex + 1);
    }
  };

  return (
    <View style={styles.addCommentRow}>
      {
        <TouchableOpacity onPress={decrementThoughtsBin}>
          <Text style={styles.addCommentInputText}> &lt; </Text>
        </TouchableOpacity>
      }

      <TouchableOpacity>
        <TextInput
          maxLength={333}
          onChangeText={changeTextInput}
          style={styles.input}
        />
      </TouchableOpacity>

      {
        <TouchableOpacity onPress={deleteBlob}>
          <Image style={styles.icon} source={TrashIcon} />
        </TouchableOpacity>
      }

      {blob === null && textInput?.length < 1 && (
        <TouchableOpacity onPress={startRecordingFunc}>
          <Image style={styles.icon} source={SoundWaveIcon} />
        </TouchableOpacity>
      )}

      {blob !== null && textInput?.length < 1 && (
        <TouchableOpacity onPress={startPlayingFunc}>
          <Image style={styles.icon} source={SoundIcon} />
        </TouchableOpacity>
      )}

      {(blob !== null || textInput?.length > 5) && (
        <TouchableOpacity
          onPress={addCommentToBin}
          style={styles.addCommentPlusInput}
        >
          <Text style={styles.addCommentInputText}> + </Text>
        </TouchableOpacity>
      )}

      {
        <TouchableOpacity onPress={incrementThoughtsBin}>
          <Text style={styles.addCommentInputText}> &gt; </Text>
        </TouchableOpacity>
      }

      <TouchableOpacity onPress={test}>
        <Text> yuh </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  addCommentRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 10,
    gap: screenWidth / 15,

    borderBottomColor: grayphite,
    borderBottomWidth: 1,
    borderStyle: "dotted",
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
  icon: {
    height: 35,
    width: 35,
  },
});

export default TextOrAudioBarEdit;
