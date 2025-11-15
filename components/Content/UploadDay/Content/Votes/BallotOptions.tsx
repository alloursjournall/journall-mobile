import React, { useState, useEffect, useRef } from "react";
// redux

import { RootState } from "@/redux/store/rootReducer";
import { useSelector, useDispatch } from "react-redux";

// <>
import VideoPlayer from "@/components/Content/Ballots/MediaVoteRows/BallotsVideoPlayer";
import ShowSettingsOptionsMenuInput from "./ShowSettingsOptionsMenuInput";
import { LinearGradient } from "expo-linear-gradient";

import {
  Platform,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  View,
  Text,
  StyleSheet,
} from "react-native";
import {
  ThoughtsIcon,
  GreenForwardArrowIcon,
  FolderUploadIcon,
  SoundWaveIcon,
  TrashIcon,
} from "@/constants/Images";

import { grayphite } from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";

import { useContentFunction } from "@/Contexts/ContentFunctions";
import { nothingWithDummyParams } from "@/utility/utilityValues";
import { Audio as ExpoAudio } from "expo-av";
import { Video as ExpoVideo, ResizeMode } from "expo-av";
import * as FileSystem from "expo-file-system/legacy";

interface MediaOptionPhotoCaptionInputProps {
  mediaOption1: any;
  setMediaOption1: any;
  mediaOption2: any;
  setMediaOption2: any;
  mediaOption3: any;
  setMediaOption3: any;
  mediaOption4: any;
  setMediaOption4: any;
  index: number;
}

const MediaOptionPhotoCaptionInput: React.FC<
  MediaOptionPhotoCaptionInputProps
> = ({
  mediaOption1,
  setMediaOption1,
  mediaOption2,
  setMediaOption2,
  mediaOption3,
  setMediaOption3,
  mediaOption4,
  setMediaOption4,
  index,
}) => {
  // 2) Handy arrays to avoid giant if/else blocks

  // ⚠️ if length === 0 and index (ie) 0 so the first one then delete the other blobs

  const textChangeHandler = (text: string) => {
    console.log("fire away");
    // ⚠️ ⚠️ ⚠️ alphanumeric + spaces:
    const regexPattern = /^[a-zA-Z0-9]*$/;

    // ⚠️ ⚠️ ⚠️  alphanumeric characters only! !!!
    // const regexPattern = /^[a-zA-Z0-9]*$/;

    // Validate the input value
    if (!regexPattern.test(text)) {
      // If invalid, you can either set an error message, clear the input, or handle it as needed
      // console.error('Invalid input: only alphanumeric characters and dashes are allowed.');
      return; // Exit the function early if validation fails
    }
    console.log("aw hell nah");
    if (text === "nigger") {
      text = "";
    }

    if (
      text === mediaOption1?.photoCaption ||
      text === mediaOption2?.photoCaption ||
      text === mediaOption3?.photoCaption ||
      text === mediaOption4?.photoCaption
    ) {
      text = "";
    }

    //  hi chatGPT ^_^ 1 by 1 like this ?
    console.log("index", index);
    if (index === 0) {
      setMediaOption1((prev: any) => ({ ...prev, photoCaption: text }));

      // console.log('yes index === 0');
      // let mediaOptionClone1 = { ...mediaOption1 };
      // mediaOptionClone1.photoCaption = text;
      // setMediaOption1(mediaOptionClone1);
    }
    if (index === 1) {
      let mediaOptionClone2 = { ...mediaOption2 };
      mediaOptionClone2.photoCaption = text;
      setMediaOption2(mediaOptionClone2);
    }
    if (index === 2) {
      let mediaOptionClone3 = { ...mediaOption3 };
      mediaOptionClone3.photoCaption = text;
      setMediaOption3(mediaOptionClone3);
    }
    if (index === 3) {
      let mediaOptionClone4 = { ...mediaOption4 };
      mediaOptionClone4.photoCaption = text;
      setMediaOption4(mediaOptionClone4);
    }
  };

  return (
    <View style={styles.mediaPhotoCaptionInputCont}>
      <TextInput
        style={styles.input2}
        maxLength={20}
        value={
          index === 0
            ? mediaOption1?.photoCaption
            : index === 1
            ? mediaOption2?.photoCaption
            : index === 2
            ? mediaOption3?.photoCaption
            : index === 3
            ? mediaOption4?.photoCaption
            : ""
        }
        onChangeText={textChangeHandler}
      />
      <Text style={styles.settingsRowText}>
        {" "}
        {index === 0
          ? mediaOption1?.photoCaption
          : index === 1
          ? mediaOption2?.photoCaption
          : index === 2
          ? mediaOption3?.photoCaption
          : index === 3
          ? mediaOption4?.photoCaption
          : ""}{" "}
      </Text>
      {/* <Text style={styles.settingsRowText}> hey guys </Text> */}
    </View>
  );
};

interface props {
  day: any;
  setDay: any;
  ballotBinIndex: any;
  setBallotBinIndex: any;
  showBallotOptionsMenu: any;
  setShowBallotOptionsMenu: any;
}

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const BallotOptions: React.FC<props> = ({
  day,
  setDay,
  ballotBinIndex,
  setBallotBinIndex,
  showBallotOptionsMenu,
  setShowBallotOptionsMenu,
}) => {
  const [titleInputValue, setTitleInputValue] = useState("title");
  const ballots = day?.ballots || null;
  const currBallot = Array.isArray(ballots) && ballots[ballotBinIndex];
  const currentSoundRef = useRef<any>(null);
  // const currentSoundRef = useRef<Audio.Sound | null>(null);

  const showBallotOptionsMenuClick = () => {
    setShowBallotOptionsMenu(!showBallotOptionsMenu);
  };

  const titleInputOnChange = (text: string) => {
    console.log("text", text);

    let clone = { ...day };
    let cloneBallots = clone?.ballots;

    if (text.includes("nigger")) {
      setTitleInputValue("");
      cloneBallots[ballotBinIndex].title = text;
      return;
    } else {
      cloneBallots[ballotBinIndex].title = text;
    }
    clone.ballots = cloneBallots;
    setDay(clone);
    setTitleInputValue(text);
  };

  const modularShowInfo = (state: any, setState: any, value: any) => {
    // keep original value:
    const currentValue = state;
    // set State to show the user which input, like "title" they are typing into.
    setState(value);

    // set the state back to whatever they had it before as they probably only wanted a reminder of what they're typing into.
    setTimeout(() => {
      setState(currentValue);
    }, 1000);
  };

  const test = () => {
    // console.log('day', day);
    console.log("day?.ballots[0]?.options", day?.ballots[0]?.options);
  };

  return (
    <View style={styles.columnCont}>
      <View style={styles.uploadSettingsRow}>
        <View style={styles.slightSplitRow}>
          {/* #814c89, #f85d94 */}
          <LinearGradient
            colors={["#814c89", "#f85d94"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              height: 15,
              width: 15,
              marginHorizontal: 2,
              transform: [{ rotate: "25deg" }],
              borderWidth: 2,
              borderColor: "#814c89",
              shadowColor: "#4a4a4a",
              shadowOffset: { width: 2, height: 2 },
              shadowOpacity: 0.5,
              shadowRadius: 2,
            }}
          />
          <TouchableOpacity onPress={test}>
            <Text style={styles.settingsRowText}> BALLOT OPTIONS </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={showBallotOptionsMenuClick}>
          <Text style={styles.settingsRowText}> &darr; </Text>
        </TouchableOpacity>
      </View>
      {showBallotOptionsMenu &&
        (currBallot?.type?.includes("media") ? (
          <View style={styles.columnCont}>
            <ShowSettingsOptionsMenuInput
              day={day}
              ballotBinIndex={ballotBinIndex}
              inputValue={titleInputValue}
              setInputValue={setTitleInputValue}
              inputOnChange={titleInputOnChange}
              infoKey="title"
              modularShowInfo={modularShowInfo}
            />

            {currBallot?.type === "custom better media" ? (
              <BallotOptionsMedia
                day={day}
                setDay={setDay}
                ballotBinIndex={ballotBinIndex}
                setBallotBinIndex={setBallotBinIndex}
                currentSoundRef={currentSoundRef}
                permittedMediaTypes="all"
              />
            ) : currBallot?.type === "new-media-joinday-soundThought" ? (
              <BallotOptionsMedia
                day={day}
                setDay={setDay}
                ballotBinIndex={ballotBinIndex}
                setBallotBinIndex={setBallotBinIndex}
                currentSoundRef={currentSoundRef}
                permittedMediaTypes="audio"
              />
            ) : (
              currBallot?.type === "new-media-joinday-moment" && (
                <BallotOptionsMedia
                  day={day}
                  setDay={setDay}
                  ballotBinIndex={ballotBinIndex}
                  setBallotBinIndex={setBallotBinIndex}
                  currentSoundRef={null}
                  permittedMediaTypes="img/video"
                />
              )
            )}
          </View>
        ) : (
          <View>
            <ShowSettingsOptionsMenuInput
              day={day}
              ballotBinIndex={ballotBinIndex}
              inputValue={titleInputValue}
              setInputValue={setTitleInputValue}
              inputOnChange={titleInputOnChange}
              infoKey="title"
              modularShowInfo={modularShowInfo}
            />

            <BallotOptionsText
              day={day}
              setDay={setDay}
              ballotBinIndex={ballotBinIndex}
              setBallotBinIndex={setBallotBinIndex}
            />
          </View>
        ))}
    </View>
  );
};

interface BallotOptionsMediaProps {
  day: any;
  setDay: any;
  ballotBinIndex: any;
  setBallotBinIndex: any;
  currentSoundRef: any;
  permittedMediaTypes: any;
}

const BallotOptionsMedia: React.FC<BallotOptionsMediaProps> = ({
  day,
  setDay,
  ballotBinIndex,
  setBallotBinIndex,
  currentSoundRef,
  permittedMediaTypes,
}) => {
  const [fileType, setFileType] = useState("");

  const [mediaOption1, setMediaOption1] = useState<any>({
    blob: null,
    blobURL: null,
    fileType: "",
    photoCaption: "",
  });
  const [mediaOption2, setMediaOption2] = useState<any>({
    blob: null,
    blobURL: null,
    fileType: "",
    photoCaption: "",
  });
  const [mediaOption3, setMediaOption3] = useState<any>({
    blob: null,
    blobURL: null,
    fileType: "",
    photoCaption: "",
  });
  const [mediaOption4, setMediaOption4] = useState<any>({
    blob: null,
    blobURL: null,
    fileType: "",
    photoCaption: "",
  });

  // const currentSoundRef = useRef<any>(null);
  // const currentSoundRef = useRef<Audio.Sound | null>(null);

  const mediaOptionsArray: any[] = [
    mediaOption1,
    mediaOption2,
    mediaOption3,
    mediaOption4,
  ];
  const setMediaOptionsArray: any[] = [
    setMediaOption1,
    setMediaOption2,
    setMediaOption3,
    setMediaOption4,
  ];

  useEffect(() => {
    const isMediaOptionsArrayEmpty = !mediaOptionsArray?.some(
      (options) => options?.blob
    );
    if (isMediaOptionsArrayEmpty) {
      setFileType("");
    }
  }, [mediaOption1, mediaOption2, mediaOption3, mediaOption4]);

  const clearOption = (option: number) => {
    const index = mediaOptionsArray[option];
    console.log("option", option);
    // setState as index can invoke directly from array.
    const clearedOptionObj = {
      text: "",
      blob: null,
      blobURL: null,
      blobType: null,
    };

    let clone = { ...day };
    let cloneBallots = clone?.ballots;

    console.log("clone", clone);
    // { text: '', blob: null, blobURL: null, blobType: null },
    cloneBallots[ballotBinIndex].options[option] = clearedOptionObj;
    // reset media_option_type
    cloneBallots[ballotBinIndex].media_option_type = "";
    clone.ballots = cloneBallots;
    setDay(clone);

    setMediaOptionsArray[option](clearedOptionObj);
  };

  const playSoundFile = async (blob: Blob) => {
    if (!blob) {
      console.error("No blob provided");
      return;
    }

    // Stop and clean up previous audio if playing
    if (currentSoundRef.current) {
      console.log("Stopping previous sound...");
      currentSoundRef.current.pause();
      currentSoundRef.current.currentTime = 0;
      currentSoundRef.current = null;
    }

    try {
      if (Platform.OS === "web") {
        // Web: Reuse currentSoundRef if it exists
        if (!currentSoundRef.current) {
          const audioURL = URL.createObjectURL(blob);
          currentSoundRef.current = new window.Audio(audioURL);

          // Cleanup on end
          currentSoundRef.current.onended = () => {
            URL.revokeObjectURL(audioURL);
            currentSoundRef.current = null;
          };
        }

        // Play existing instance
        currentSoundRef.current.play();
      } else {
        // Mobile: Convert Blob to Base64, then save & play
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = async () => {
          const base64Audio = reader.result?.toString().split(",")[1];
          if (!base64Audio) return;

          const filePath = FileSystem.cacheDirectory + "temp_audio.wav";
          await FileSystem.writeAsStringAsync(filePath, base64Audio, {
            encoding: FileSystem.EncodingType.Base64,
          });

          if (!currentSoundRef.current) {
            const { sound } = await ExpoAudio.Sound.createAsync(
              { uri: filePath },
              { shouldPlay: true }
            );
            currentSoundRef.current = sound;
          } else {
            await currentSoundRef.current.replayAsync();
          }

          currentSoundRef.current.setOnPlaybackStatusUpdate((status: any) => {
            if (!status.isLoaded) return;

            if ("didJustFinish" in status && status.didJustFinish) {
              currentSoundRef.current.unloadAsync();
              currentSoundRef.current = null;
            }
          });
        };
      }
    } catch (error) {
      console.error("Error playing sound file:", error);
    }
  };

  // 🚨 playSundWave to match the <Moments/> function()
  const playSoundWave = async (index: number) => {
    console.log("index", index);
    console.log("mediaOptionsArray", mediaOptionsArray);
    console.log("mediaOptionsArray?.[index]", mediaOptionsArray?.[index]);
    await playSoundFile(mediaOptionsArray?.[index]?.blob);
  };

  const uploadFile = async (index: number) => {
    if (Platform.OS === "web") {
      const input = document.createElement("input");
      input.type = "file";
      input.accept =
        "image/jpeg,image/png,video/mp4,video/quicktime,audio/mpeg,audio/wav,audio/mp4,audio/x-m4a";
      // input.accept = 'image/jpeg, image/png, video/mp4, video/quicktime, audio/mpeg, audio/wav, audio/m4a';
      input.multiple = false;

      input.onchange = async (event: any) => {
        const file = event.target.files[0];
        if (!file) return;

        let selectedFile: any = file;
        if (selectedFile instanceof Blob && !(selectedFile instanceof File)) {
          selectedFile = new File([selectedFile], "file", {
            type: selectedFile.type,
          });
        }

        const uploadFileType: string = selectedFile?.type;
        let clone = { ...day };
        let cloneBallots = clone?.ballots;

        const setMediaAndState = (blobURL: string) => {
          const blobObject = {
            blob: selectedFile,
            blobURL,
            blobType: uploadFileType,
            dbURLblob: `ballot${ballotBinIndex}-*${cloneBallots[ballotBinIndex]?.media_option_type}*-${index}`,
          };

          setMediaOptionsArray[index](blobObject);
          mediaOptionsArray[index] = blobObject;
          cloneBallots[ballotBinIndex].options[index] = blobObject;
          clone.ballots = cloneBallots;
          setDay(clone);

          console.log("Updated mediaOption", blobObject);
        };

        if (uploadFileType.includes("image")) {
          if (fileType !== "image") clearOption(index);
          cloneBallots[ballotBinIndex].media_option_type = "images";
          setFileType("image");
          const blobURL = URL.createObjectURL(selectedFile);
          setMediaAndState(blobURL);
        } else if (
          uploadFileType.includes("video") ||
          uploadFileType.includes("audio")
        ) {
          if (
            uploadFileType.includes("video") &&
            fileType !== "video" &&
            fileType !== ""
          ) {
            mediaOptionsArray.forEach((_, idx) => clearOption(idx));
            return;
          }
          if (uploadFileType.includes("audio") && fileType !== "audio")
            clearOption(index);

          const isVideo = uploadFileType.includes("video");
          cloneBallots[ballotBinIndex].media_option_type = isVideo
            ? "videos"
            : "audio";
          setFileType(isVideo ? "video" : "audio");

          const mediaElement = document.createElement(
            isVideo ? "video" : "audio"
          );
          mediaElement.preload = "metadata";
          mediaElement.src = URL.createObjectURL(selectedFile);
          mediaElement.onloadedmetadata = () => {
            if (mediaElement.duration > 90) {
              alert("Media must be 90 seconds or less.");
              return;
            }
            setMediaAndState(mediaElement.src);
          };
        } else {
          console.log("Unsupported file type:", uploadFileType);
        }
      };
      input.click();
    } else {
      // Mobile: Use expo-document-picker for audio support
      try {
        // const result = await DocumentPicker.getDocumentAsync({
        //     type: ['image/*', 'video/*', 'audio/mpeg', 'audio/wav', 'audio/x-m4a'], // Includes mp3 & wav
        // });
        const result = await DocumentPicker.getDocumentAsync({
          type: ["image/*", "video/*", "audio/*"],
        });

        if (result.canceled) return;

        const selectedFile = result.assets[0];
        const uploadFileType =
          selectedFile.mimeType || "application/octet-stream"; // Default type

        const response = await fetch(selectedFile.uri);
        const blob = await response.blob();

        console.log("blob", blob);

        // Generate Blob URL for displaying preview
        const blobURL = selectedFile.uri;

        let clone = { ...day };
        let cloneBallots = clone?.ballots;
        let blobObject: any = {};

        if (uploadFileType.includes("image")) {
          if (fileType !== "image") clearOption(index);
          cloneBallots[ballotBinIndex].media_option_type = "images";
          setFileType("image");

          blobObject = {
            blob,
            blobURL,
            blobType: uploadFileType,
            dbURLblob: `ballot${ballotBinIndex}-${cloneBallots[ballotBinIndex]?.media_option_type}-${index}`,
          };
        } else if (uploadFileType.includes("video")) {
          if (fileType !== "video" && fileType !== "") {
            mediaOptionsArray.forEach((_, idx) => clearOption(idx));
            return;
          }
          cloneBallots[ballotBinIndex].media_option_type = "videos";
          setFileType("video");

          // ✅ COPY the file to a persistent, accessible location
          const fileName = selectedFile.name || `upload-${Date.now()}.mp4`;
          const destPath = `${FileSystem.documentDirectory}${fileName}`;

          await FileSystem.copyAsync({
            from: selectedFile.uri,
            to: destPath,
          });

          blobObject = {
            blob,
            blobURL: destPath, // ✅ use destPath here instead
            blobType: uploadFileType,
            dbURLblob: `ballot${ballotBinIndex}-${cloneBallots[ballotBinIndex]?.media_option_type}-${index}`,
          };
          console.log("blobObject", blobObject);
        } else if (uploadFileType.includes("audio")) {
          console.log("at least we get here");
          if (fileType !== "audio") clearOption(index);
          cloneBallots[ballotBinIndex].media_option_type = "audio";
          setFileType("audio");

          blobObject = {
            blob,
            blobURL,
            blobType: uploadFileType,
            dbURLblob: `ballot${ballotBinIndex}-${cloneBallots[ballotBinIndex]?.media_option_type}-${index}`,
          };
        } else {
          console.log("Unsupported file type:", uploadFileType);
          return;
        }

        console.log("blobObject", blobObject);

        setMediaOptionsArray[index](blobObject);
        cloneBallots[ballotBinIndex].options[index] = blobObject;
        clone.ballots = cloneBallots;
        setDay(clone);

        console.log("Updated mediaOption", blobObject);
      } catch (error) {
        console.log("Error picking file:", error);
      }
    }
  };

  //   const VideoPlayer = ({ uri }: { uri: string }) => {
  //     // console.log('uri', uri);
  //     return (
  //       <View style={[styles.ballotOptionsMedia, { maxHeight: 100 }]}>
  //         {Platform.OS === "web" ? (
  //           <ReactPlayer url={uri} controls width="100%" height="100%" muted />
  //         ) : (
  //           <ExpoVideo
  //             source={{ uri }}
  //             useNativeControls
  //             resizeMode={ResizeMode.CONTAIN} // ✅ valid
  //             style={{ width: "100%", height: 100 }}
  //           />
  //         )}
  //       </View>
  //     );
  //   };

  interface MediaBallotOptionsProps {
    index: any;
  }

  const test = () => {
    console.log("mediaOptionsArray", mediaOptionsArray);
    console.log("mediaOption1", mediaOption1);
    // <VideoPlayer uri={[mediaOption1, mediaOption2, mediaOption3, mediaOption4][index]?.blobURL} />
    console.log([mediaOption1, mediaOption2, mediaOption3, mediaOption4]);
  };

  const MediaBallotOption: React.FC<MediaBallotOptionsProps> = ({ index }) => {
    return (
      <View style={styles.uploadSettingsRow}>
        {/* <button onClick={test}> test </button> */}

        <TouchableOpacity onPress={() => uploadFile(index)}>
          <Image style={styles.icons} source={FolderUploadIcon} />
        </TouchableOpacity>

        {mediaOptionsArray[index]?.blobURL &&
          // [mediaOption1, mediaOption2, mediaOption3, mediaOption4][index]?.blobURL && (
          (mediaOptionsArray[index]?.blobType.includes("image") ? (
            // <TouchableOpacity onPress={test}>
            //     <Text> test </Text>
            // </TouchableOpacity>
            <Image
              style={styles.ballotOptionsMedia}
              source={{
                uri: [mediaOption1, mediaOption2, mediaOption3, mediaOption4][
                  index
                ]?.blobURL,
              }}
            />
          ) : mediaOptionsArray[index]?.blobType.includes("video") ? (
            <View>
              <VideoPlayer
                uri={
                  [mediaOption1, mediaOption2, mediaOption3, mediaOption4][
                    index
                  ]?.blobURL
                }
              />
              {/* <VideoPlayer uri={mediaOption1?.blobURL} /> */}
            </View>
          ) : (
            <View>
              <TouchableOpacity onPress={() => playSoundWave(index)}>
                <Image
                  style={styles.ballotOptionsMedia}
                  source={SoundWaveIcon}
                />
              </TouchableOpacity>
            </View>
          ))}

        {
          [mediaOption1, mediaOption2, mediaOption3, mediaOption4][index]
            ?.blobURL ? (
            // [mediaOption1, mediaOption2, mediaOption3, mediaOption4][index - 1]?.blobURL
            <TouchableOpacity onPress={() => clearOption(index)}>
              <Image style={styles.icons} source={TrashIcon} />
            </TouchableOpacity>
          ) : null
          // (
          // <Text style={styles.ghost}> y </Text>
          // )
        }
      </View>
    );
  };

  return (
    <View style={styles.columnContMediaBallotOption}>
      {/* <View style={styles.columnContMediaBallotOption}> */}
      <MediaBallotOption index={0} />
      <MediaOptionPhotoCaptionInput
        mediaOption1={mediaOption1}
        setMediaOption1={setMediaOption1}
        mediaOption2={mediaOption2}
        setMediaOption2={setMediaOption2}
        mediaOption3={mediaOption3}
        setMediaOption3={setMediaOption3}
        mediaOption4={mediaOption4}
        setMediaOption4={setMediaOption4}
        index={0}
      />
      {/* <Text> dotted line to separate </Text> */}

      {mediaOption1?.blob && mediaOption1?.photoCaption?.length && (
        <MediaBallotOption index={1} />
      )}

      {mediaOption1?.blob && mediaOption1?.photoCaption?.length >= 3 && (
        <MediaOptionPhotoCaptionInput
          mediaOption1={mediaOption1}
          setMediaOption1={setMediaOption1}
          mediaOption2={mediaOption2}
          setMediaOption2={setMediaOption2}
          mediaOption3={mediaOption3}
          setMediaOption3={setMediaOption3}
          mediaOption4={mediaOption4}
          setMediaOption4={setMediaOption4}
          index={1}
        />
      )}

      {mediaOption2?.blob && mediaOption2?.photoCaption?.length && (
        <MediaBallotOption index={2} />
      )}

      {mediaOption2?.blob && mediaOption2?.photoCaption?.length >= 3 && (
        <MediaOptionPhotoCaptionInput
          mediaOption1={mediaOption1}
          setMediaOption1={setMediaOption1}
          mediaOption2={mediaOption2}
          setMediaOption2={setMediaOption2}
          mediaOption3={mediaOption3}
          setMediaOption3={setMediaOption3}
          mediaOption4={mediaOption4}
          setMediaOption4={setMediaOption4}
          index={2}
        />
      )}

      {mediaOption3?.blob && mediaOption3?.photoCaption?.length && (
        <MediaBallotOption index={3} />
      )}

      {mediaOption3?.blob && mediaOption3?.photoCaption?.length >= 3 && (
        <MediaOptionPhotoCaptionInput
          mediaOption1={mediaOption1}
          setMediaOption1={setMediaOption1}
          mediaOption2={mediaOption2}
          setMediaOption2={setMediaOption2}
          mediaOption3={mediaOption3}
          setMediaOption3={setMediaOption3}
          mediaOption4={mediaOption4}
          setMediaOption4={setMediaOption4}
          index={3}
        />
      )}
    </View>
  );
};

interface BallotOptionsTextProps {
  day: any;
  setDay: any;
  ballotBinIndex: any;
  setBallotBinIndex: any;
}

const BallotOptionsText: React.FC<BallotOptionsTextProps> = ({
  day,
  setDay,
  ballotBinIndex,
  setBallotBinIndex,
}) => {
  const ballots = day?.ballots;

  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");

  const setInputValue = (text: string, option: number) => {
    if (text === "nigger") {
      text = "";
    }

    // ⚠️ ⚠️ ⚠️ alphanumeric + spaces:
    const regexPattern = /^[a-zA-Z0-9]*$/;

    // ⚠️ ⚠️ ⚠️  alphanumeric characters only! !!!
    // const regexPattern = /^[a-zA-Z0-9]*$/;

    // Validate the input value
    if (!regexPattern.test(text)) {
      // If invalid, you can either set an error message, clear the input, or handle it as needed
      // console.error('Invalid input: only alphanumeric characters and dashes are allowed.');
      return; // Exit the function early if validation fails
    }

    setDay((prevDay: any) => ({
      ...prevDay,
      ballots: prevDay.ballots.map((ballot: any, i: number) =>
        i === ballotBinIndex
          ? {
              ...ballot,
              options: ballot.options.map((opt: any, j: number) =>
                j === option - 1 ? { ...opt, text } : { ...opt }
              ),
            }
          : ballot
      ),
    }));
  };

  return (
    <View style={styles.columnCont}>
      <View style={styles.uploadSettingsRow}>
        {/* <div style={{ height: '7.5px', width: '7.5px', marginLeft: '1 rem' }} id={styles.pinkDiscoSquare2}></div> */}

        <TextInput
          style={styles.input2}
          maxLength={100}
          onChangeText={(text) => setInputValue(text, 1)} // event -> string
          value={day?.ballots[ballotBinIndex]?.options[0]?.text}
        />

        <Text style={styles.settingsRowText}>
          {" "}
          {day?.ballots[ballotBinIndex]?.options[0]?.text}{" "}
        </Text>
        {/* <Text style={styles.settingsRowText}> {option1} </Text> */}
        <Text style={styles.ghost}> y </Text>
      </View>

      <View style={styles.uploadSettingsRow}>
        <TextInput
          style={styles.input2}
          maxLength={100}
          onChangeText={(text) => setInputValue(text, 2)} // event -> string
          value={day?.ballots[ballotBinIndex]?.options[1]?.text}
        />
        <Text style={styles.settingsRowText}>
          {" "}
          {day?.ballots[ballotBinIndex]?.options[1]?.text}{" "}
        </Text>
        {/* <Text style={styles.settingsRowText}> {option2} </Text> */}
        <Text style={styles.ghost}> y </Text>
      </View>

      <View style={styles.uploadSettingsRow}>
        <TextInput
          style={styles.input2}
          maxLength={100}
          onChangeText={(text) => setInputValue(text, 3)} // event -> string
          value={day?.ballots[ballotBinIndex]?.options[2]?.text}
        />
        <Text style={styles.settingsRowText}>
          {" "}
          {day?.ballots[ballotBinIndex]?.options[2]?.text}{" "}
        </Text>
        {/* <Text style={styles.settingsRowText}> {option3} </Text> */}
        <Text style={styles.ghost}> y </Text>
      </View>

      <View style={styles.uploadSettingsRow}>
        <TextInput
          style={styles.input2}
          maxLength={100}
          onChangeText={(text) => setInputValue(text, 4)} // event -> string
          value={day?.ballots[ballotBinIndex]?.options[3]?.text}
        />
        <Text style={styles.settingsRowText}>
          {" "}
          {day?.ballots[ballotBinIndex]?.options[3]?.text}{" "}
        </Text>
        {/* <Text style={styles.settingsRowText}> {option4} </Text> */}
        <Text style={styles.ghost}> y </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  settingsCont: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
  },
  columnCont: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 20,
  },
  columnContMediaBallotOption: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 5,
  },
  uploadSettingsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 10,
    gap: 5,
  },
  slightSplitRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  mediaPhotoCaptionInputCont: {
    width: screenWidth / 2,
    flexDirection: "row",
    // borderColor: 'green',
    // borderWidth: 2,
  },
  settingsRowHeader: {
    fontFamily: "Fuzzy Bubbles",
    color: grayphite,
    fontSize: 18,
  },
  settingsRowText: {
    fontFamily: "Fuzzy Bubbles",
    color: grayphite,
    fontSize: 14,
  },
  icons: {
    height: 35,
    width: 35,
  },
  iconMini: {
    height: 20,
    width: 20,
  },
  button: {
    height: 20,
    width: 20,
    borderWidth: 2,
    borderColor: grayphite,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 8,
    //    borderTopLeftRadius: 0,
    borderTopRightRadius: 3,
  },
  input2: {
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
  ballotOptionsMedia: {
    height: screenHeight / 10,
    width: screenHeight / 10,
  },

  container: {
    gap: 5,
    // padding: 10,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  videoCont: {
    gap: 5,
    // padding: 10,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  centerCont: {
    // flex: 1, // Allow this to take remaining space
    height: screenHeight / 10,
    width: "50%",
    borderColor: "green",
    borderWidth: 2,
    // height: 100,
    // width: "100%",
    justifyContent: "center", // Center the content vertically
    alignItems: "center",
  },
});

export default BallotOptions;
