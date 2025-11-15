import axios from "axios";
import { useState, useEffect, useRef } from "react";

import {
  Platform,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Image,
  View,
  Text,
  StyleSheet,
} from "react-native";

// utils:
import { useContentFunction } from "@/Contexts/ContentFunctions";
import { SoundWaveIcon, SoundIcon, TrashIcon } from "@/constants/Images";

import { grayphite } from "@/constants/Colors";
import { Audio as ExpoAudio } from "expo-av";

interface props {
  day: any;
  setDay: any;
  textInput: any;
  setTextInput: any;
  blob: any;
  setBlob: any;
}

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const TextOrAudioBar: React.FC<props> = ({
  day,
  setDay,
  textInput,
  setTextInput,
  blob,
  setBlob,
}) => {
  const [tooLong, setTooLong] = useState<boolean>(false);

  const { startRecordingSound, startPlayingRecordedSound } =
    useContentFunction();

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

  const addCommentToBin = async () => {
    let clone = { ...day };
    let cloneThoughts: any = clone?.thoughts;
    if (cloneThoughts?.length === 5) return;
    if (!cloneThoughts) return null;

    let object: any = {
      text: "",
      is_voice: false,
      blob: null,
      contentType: null,
    };

    if (textInput?.length) {
      object.text = textInput;
    } else {
      object.is_voice = true;
      let uploadableBlob = blob;

      // 📱 Convert URI → Blob on native
      if (Platform.OS !== "web" && blob?.uri) {
        try {
          const res = await fetch(blob.uri);
          uploadableBlob = await res.blob();
          console.log("✅ Converted native URI → Blob");
        } catch (err) {
          console.error("❌ Failed to convert URI:", err);
        }
      }

      object.blob = uploadableBlob;
      object.contentType =
        uploadableBlob?.type || blob?.mimeType || "audio/mpeg";

      // 🎧 duration check
      if (Platform.OS === "web") {
        try {
          const audio = new Audio(URL.createObjectURL(uploadableBlob));
          await new Promise((res) => (audio.onloadedmetadata = res));
          const dur = audio.duration;
          console.log("🎵 Audio duration (sec):", dur);
          if (dur > 120) {
            setTooLong(true);
            setTimeout(() => setTooLong(false), 2000);
            return;
          }
        } catch (err) {
          console.warn("⚠️ Could not read duration (web):", err);
        }
      } else {
        try {
          const { sound } = await ExpoAudio.Sound.createAsync(
            { uri: blob.uri },
            { shouldPlay: false }
          );
          const status: any = await sound.getStatusAsync();
          if (status.isLoaded) {
            const durSec = status.durationMillis / 1000;
            console.log("🎵 Audio duration (sec):", durSec);
            if (durSec > 120) {
              setTooLong(true);
              setTimeout(() => setTooLong(false), 2000);
              await sound.unloadAsync();
              return;
            }
          }
          await sound.unloadAsync();
        } catch (err) {
          console.warn("⚠️ Could not read duration (native):", err);
        }
      }
    }

    cloneThoughts.push(object);
    clone.thoughts = cloneThoughts;
    setDay(clone);
    setTextInput("");
    setBlob(null);
  };

  // const addCommentToBin = () => {
  //     let clone = { ...day };
  //     let cloneThoughts: any = clone?.thoughts;
  //     // limit to 7! :D
  //     if (cloneThoughts?.length === 5) {
  //         return;
  //     }
  //     if (!cloneThoughts) {
  //         return null;
  //     }
  //     let object = { text: '', is_voice: false, blob: null };

  //     if (textInput?.length) {
  //         console.log('cloneThoughts', cloneThoughts);
  //         // let object = { text: textInput, is_voice: false, blob: null }
  //         object.text = textInput;
  //         // add object to soft copy of day.thoughts
  //     } else {
  //         object.is_voice = true;
  //         // if (blob) {
  //         //     const audio = new Audio();
  //         //     audio.src = URL.createObjectURL(blob);

  //         //     audio.onloadedmetadata = () => {
  //         //         if (audio.duration > 60) {
  //         //             console.warn('Audio too long: must be 60 seconds or less');
  //         //             setTooLong(true);
  //         //             setTimeout(() => {
  //         //                 setTooLong(false);
  //         //             }, 2000);
  //         //             // handle error (e.g. show message, return early, etc)
  //         //         } else {
  //         //             object.is_voice = true;
  //         object.blob = blob;
  //         //             // proceed with your logic
  //         //         }
  //         //     };
  //         // }

  //         // * * * * this is working!
  //         // if (blob) {
  //         //     object.blob = blob;
  //         // }
  //     }
  //     cloneThoughts.push(object);
  //     clone.thoughts = cloneThoughts;
  //     setDay(clone);
  //     // restore defaults after submission.
  //     setTextInput('');
  //     setBlob(null);
  // };

  //     console.log('adding comment!');
  //     let clone = { ...day };
  //     let cloneThoughts: any = clone?.thoughts;
  //     // limit to 7! :D
  //     if (cloneThoughts?.length === 5) {
  //         return;
  //     }
  //     if (!cloneThoughts) {
  //         return null;
  //     }
  //     let object: any = { text: '', is_voice: false, blob: null, contentType: null };

  //     if (textInput?.length) {
  //         console.log('cloneThoughts', cloneThoughts);
  //         // let object = { text: textInput, is_voice: false, blob: null }
  //         object.text = textInput;
  //         // add object to soft copy of day.thoughts
  //     } else {
  //         console.log('blob block holla!');
  //         object.is_voice = true;
  //         // if (blob) {
  //         //     const audio = new Audio();
  //         //     audio.src = URL.createObjectURL(blob);

  //         //     audio.onloadedmetadata = () => {
  //         //         if (audio.duration > 60) {
  //         //             console.warn('Audio too long: must be 60 seconds or less');
  //         //             setTooLong(true);
  //         //             setTimeout(() => {
  //         //                 setTooLong(false);
  //         //             }, 2000);
  //         //             // handle error (e.g. show message, return early, etc)
  //         //         } else {
  //         //             object.is_voice = true;

  //         object.blob = blob;
  //         // Convert local file:// URI into a real Blob so it behaves like the web version

  //         if (Platform.OS === 'web') {
  //             console.log('webbed feet!');
  //             const audio = new Audio(URL.createObjectURL(blob));
  //             await new Promise((res) => (audio.onloadedmetadata = res));
  //             if (audio.duration > 120) {
  //                 // handle too long
  //                 setTooLong(true);
  //                 setTimeout(() => {
  //                     setTooLong(false);
  //                 }, 2000);
  //                 return;
  //             }
  //             object.contentType = blob.type || 'audio/mpeg';
  //         } else {
  //             console.log('🤖 android n the boyz!');

  //             // ✅ Re-enable the URI and extension extraction
  //             const uri = blob?.uri || blob; // sometimes it's just a string path
  //             const ext = uri?.split('.').pop()?.toLowerCase();
  //             console.log('📂 after pop, ext:', ext);
  //             console.log('🎧 candidate URI:', uri);

  //             // 🧠 1️⃣ Load sound to inspect metadata (no playback)
  //             try {
  //                 if (!uri || typeof uri !== 'string' || !uri.startsWith('file://')) {
  //                     console.warn('⚠️ Invalid audio URI:', uri);
  //                     return;
  //                 }

  //                 console.log('🎵 attempting to load sound...');
  //                 const { sound } = await ExpoAudio.Sound.createAsync({ uri }, { shouldPlay: false });
  //                 const status: any = await sound.getStatusAsync();

  //                 if (status.isLoaded) {
  //                     const durationSec = status.durationMillis / 1000;
  //                     console.log('✅ Audio duration in seconds:', durationSec);

  //                     if (durationSec > 120) {
  //                         console.warn('❌ Audio too long!');
  //                         setTooLong(true);
  //                         setTimeout(() => setTooLong(false), 2000);
  //                         await sound.unloadAsync();
  //                         return; // ⛔ stop adding too-long clip
  //                     }
  //                 } else {
  //                     console.warn('⚠️ Sound not loaded, status:', status);
  //                 }

  //                 await sound.unloadAsync();
  //             } catch (err) {
  //                 console.warn('🚫 Could not get audio duration:', err);
  //             }

  //             // 🧠 2️⃣ Detect MIME type as before
  //             console.log('🧠 just before the mime block');
  //             if (blob?.mimeType) {
  //                 object.contentType = blob.mimeType;
  //             } else if (ext) {
  //                 const mimeFromExt = Mime.lookup(ext);
  //                 object.contentType = mimeFromExt || 'application/octet-stream';
  //             } else {
  //                 object.contentType = 'application/octet-stream';
  //             }
  //         }
  //     }
  //     console.log('all the way at the end:');
  //     cloneThoughts.push(object);
  //     clone.thoughts = cloneThoughts;
  //     setDay(clone);
  //     // restore defaults after submission.
  //     setTextInput('');
  //     setBlob(null);
  // };

  const test = () => {
    console.log("day", day);
    console.log("day?.thoughts", day?.thoughts);

    console.log("blob", blob);
    console.log("textInput", textInput);
  };

  const startRecordingFunc = () => {
    startRecordingSound(recorderRef, streamRef, setBlob);
  };

  const startPlayingFunc = () => {
    // startPlayingSound: (audioRecorderPlayer:any, setPlaying: any, soundCommentFile: any) => any;
    startPlayingRecordedSound(blob);
  };

  const deleteBlob = () => {
    // if textInput is empty and so is blob then delete the last saved entry
    if (textInput === "" && blob === null) {
      console.log("delete last item");
      console.log("day", day);
      let dayClone = { ...day };
      let dayCloneThoughts = [...dayClone?.thoughts];
      if (!dayCloneThoughts) {
        return;
      }
      dayCloneThoughts.pop();
      dayClone.thoughts = dayCloneThoughts;
      setDay(dayClone);
    }
    // if textInput is populated but blob is null then user is typing just clear the input.
    if (textInput !== "" && blob === null) {
      setTextInput("");
      // if blob is populated but no typing then just delete the blob.
    } else if (blob !== null && textInput === "") {
      setBlob(null);
    }
  };

  return (
    <View style={styles.addCommentRow}>
      <TouchableOpacity>
        <TextInput
          value={textInput}
          maxLength={333}
          onChangeText={changeTextInput}
          style={styles.textInput2}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={test}>
        <Text> test </Text>
      </TouchableOpacity>

      {(!!blob || textInput !== "" || !!day?.thoughts?.length) && (
        <TouchableOpacity onPress={deleteBlob}>
          <Image style={styles.icon} source={TrashIcon} />
        </TouchableOpacity>
      )}

      {blob === null && textInput?.length < 1 && (
        <TouchableOpacity onPress={startRecordingFunc}>
          {tooLong ? (
            <Text style={styles.addCommentInputText}> &lt; 60 </Text>
          ) : (
            <Image style={styles.icon} source={SoundWaveIcon} />
          )}
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
  textInput2: {
    width: 50, // give it realistic room for text
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
  // input: {
  //     width: 24, // equivalent of 1.5rem (assuming 1rem = 16px)
  //     margin: 0,
  //     alignSelf: 'center',
  //     borderRadius: 50, // makes it circular
  //     borderTopLeftRadius: 14.5,
  //     borderTopRightRadius: 65.5,
  //     borderBottomLeftRadius: 122.5,
  //     borderBottomRightRadius: 30,
  //     color: '#444', // equivalent of $grayphite
  //     fontFamily: 'fuzzy', // make sure the font is linked properly
  //     fontSize: 10, // or adjust based on design
  //     borderWidth: 1.5,
  //     borderColor: '#44454fea', // border color
  // },
  icon: {
    height: 35,
    width: 35,
  },
});

export default TextOrAudioBar;
