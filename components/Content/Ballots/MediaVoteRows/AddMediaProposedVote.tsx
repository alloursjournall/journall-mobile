import { useState, useEffect, useRef } from "react";
import axios from "axios";

// <>
import {
  Dimensions,
  Platform,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";

import BallotsVideoPlayer from "./BallotsVideoPlayer";

// redux
import { RootState } from "@/redux/store/rootReducer";
import { useSelector, useDispatch } from "react-redux";

// utils:
import { API } from "@env";
import * as ImagePicker from "expo-image-picker";
import { Audio as ExpoAudio, Video as ExpoVideo, ResizeMode } from "expo-av";
import { getPresignedUploadURLQueryStringFunc } from "@/graphql/queries";
import uploadBlobToS3WithPresignedUrl from "@/utility/AWS/new/uploadBlobToS3WithPresignedUrl";
import { grayphite } from "@/constants/Colors";
import { useContentFunction } from "@/Contexts/ContentFunctions";
import { FolderUploadIcon, SoundIcon, SoundWaveIcon } from "@/constants/Images";
// import * as Mime from "react-native-mime-types"; // yarn add react-native-m
import { GreenForwardArrowIcon, RedBackArrowIcon } from "@/constants/Images";
import Ballots from "../Ballots";
// import LinearGradient from 'react-native-linear-gradient';

interface AddMediaProps {
  currBallot: any;
  didUserSubmit: any;
  setDidUserSubmit: any;
  setDisplayAddMediaMenu: any;
  day: any;
  ballotsMediaBLOBs: any;
  setBallotsMediaBLOBs: any;
  currVotes: any;
  setBallotBin: any;
  ballotBinIndex: number;
}

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const AddMediaProposedVote: React.FC<AddMediaProps> = ({
  currBallot,
  didUserSubmit,
  setDidUserSubmit,
  setDisplayAddMediaMenu,
  day,
  ballotsMediaBLOBs,
  setBallotsMediaBLOBs,
  currVotes,
  setBallotBin,
  ballotBinIndex,
}) => {
  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );

  const { submitUserSubmittedOption, getMimeType } = useContentFunction();

  // don't need this it gets reached with submitUserSubmittedOptions:
  // const { updateSubmittedBallotOptionsAndUserArrayFunc } = useContentFunction();

  const [mediaIsUploaded, setMediaIsUploaded] = useState(false);
  const [uploadedMediaFile, setUploadedMediaFile] = useState<any | null>(null);
  const [userSubmittedOptionsInputValue, setUserSubmittedOptionsInputValue] =
    useState("photo-caption");

  // not destructuring for readability. redefined currBallot endpoints:
  const didCurrentUserVote =
    (currVotes?.length &&
      currVotes?.some(
        (votes: any) =>
          votes?.user_id === CURRENT_USER?.id &&
          votes?.ballot_id === currBallot?.id
      )) ||
    null;
  let userSubmittedOptionsUserArray =
    currBallot?.user_submitted_options_user_array || [];
  let userSubmittedOptionsIsApprovedArray: any =
    currBallot?.user_submitted_options_is_approved_array || []; // any: boolean[] || string
  let hideWaitingApprovalVotes = currBallot?.hide_waiting_on_approval_votes;
  let needApprovalVotes = currBallot?.user_submitted_options_need_approval;
  let mediaOptionType: string = currBallot?.media_option_type;

  // audio capturing state!
  const [startVoiceRecording, setStartVoiceRecording] =
    useState<boolean>(false);
  const [animationStarted, setAnimationStarted] = useState<boolean>(false);
  const [soundCommentFile, setSoundCommentFile] = useState<Blob | null>(null);
  const [voiceCommentClick, setVoiceCommentClick] = useState<boolean>(false);
  const [newCommentIsVoice, setNewCommentIsVoice] = useState<boolean>(false);
  const [newCommentIsVideo, setNewCommentIsVideo] = useState<boolean>(false);

  const holdTimeoutRef = useRef<any>(null);
  const streamRef = useRef<any>(null); // let stream;
  const recorderRef = useRef<any>(null); // let recorder;
  const containerRef = useRef<any>(null);
  let animationIndex: number = 0;
  let animationInterval: any = null;

  const test = () => {
    console.log("uploadedMediaFile", uploadedMediaFile);
    console.log("hideWaitingApprovalVotes", hideWaitingApprovalVotes);
    console.log("needApprovalVotes", needApprovalVotes);
    console.log("userSubmittedOptionsUserArray", userSubmittedOptionsUserArray);
    console.log(
      "userSubmittedOptionsIsApprovedArray",
      userSubmittedOptionsIsApprovedArray
    );
  };

  // non cross-platform: uploadImageFunction();
  // const uploadImageFunction = (event: any) => {

  const pickImage = async (event?: any) => {
    if (Platform.OS === "web") {
      // 🖥️ WEB VERSION — works in Expo Web, no event.target needed
      return new Promise<void>((resolve) => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.style.display = "none";

        input.onchange = () => {
          const file = input.files?.[0];
          if (!file) {
            resolve();
            return;
          }

          const fileType =
            file.type || getMimeType(file.name) || "application/octet-stream";

          setUploadedMediaFile({
            uri: URL.createObjectURL(file),
            blob: file,
            name: file.name,
            contentType: fileType,
          });

          resolve();
        };

        document.body.appendChild(input);
        input.click();
        document.body.removeChild(input);
      });
    } else {
      // 📱 Native (iOS/Android)
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access media library is required!");
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        const asset = result.assets[0];
        const fileName = asset.uri.split("/").pop() || "image.jpg";
        const fileType = getMimeType(fileName) || "image/jpeg";

        // 👇 Fetch blob directly for S3 upload
        const response = await fetch(asset.uri);
        const blob = await response.blob();

        setUploadedMediaFile({
          uri: asset.uri,
          name: fileName,
          contentType: fileType,
          blob: blob, // ✅ now non-null, ready for upload
        });
      }
    }
  };

  const uploadVideoFunction = async (event?: any) => {
    if (Platform.OS === "web") {
      // 🖥️ Web: <input type="file" accept="video/*" />
      const file = event?.target?.files?.[0];
      if (!file) return;

      if (!file.type.startsWith("video/")) {
        console.error("The selected file is not a video.");
        return;
      }

      const fileType = file.type || getMimeType(file.name) || "video/mp4";
      const blobURL = URL.createObjectURL(file);

      setUploadedMediaFile({
        uri: blobURL, // for preview
        blob: file, // ready for upload
        name: file.name,
        contentType: fileType,
      });
    } else {
      // 📱 Native (iOS / Android)
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access media library is required!");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled) {
        const asset = result.assets[0];
        const fileName = asset.uri.split("/").pop() || "video.mp4";
        const fileType = getMimeType(fileName) || "video/mp4";

        // 👇 Fetch blob directly for S3 upload
        const response = await fetch(asset.uri);
        const blob = await response.blob();

        setUploadedMediaFile({
          uri: asset.uri,
          name: fileName,
          contentType: fileType,
          blob: blob, // ✅ non-null blob ready for upload
        });
      } else {
        console.error("No video selected.");
      }
    }
  };

  const uploadAudio = () => {};

  // click green arrow to confirm media selection. Then set caption. then
  const confirmSelection = () => {
    // no JQUERY RN in react native but had an animation in nextJS.

    // if (mediaIsUploaded === false && uploadedMediaFile === null) {
    //     $(`#${styles.customFileInputLabel}`).addClass('floatingPesterAnimation');
    //     return;
    // }
    setMediaIsUploaded(true);
  };

  const captionInputFocus = () => {
    if (userSubmittedOptionsInputValue === "photo-caption") {
      setUserSubmittedOptionsInputValue("");
    }
    return;
  };

  const handleOnchange = (text: string) => {
    // table.ballots.user_submitted_options_user_array: i.e. --> ['3-taquitos', '4-wendys'] userId & their submitted Vote.

    // check if user submitted a vote and prevent a second submission by setting setDidUserSubmit(true) if they did.
    currBallot?.user_submitted_options_user_array?.length &&
      currBallot?.user_submitted_options_user_array?.some(
        (options: any, index: any) => {
          // split i.e. ['3-taquitos'] split 3, t.users.id from the string and if the user that is executing input right now exists in that array return. NO EDITS during votes! that's why green submit button. "are you sure?"
          let [userId, vote] = options.split("-");

          const id = parseInt(userId);
          if (id === CURRENT_USER?.id) {
            // if user voted get out of dodge.
            // setDisplayAddMediaMenu(false)
            setDidUserSubmit(true);
          }
        }
      );

    // const regexPattern = /^[a-zA-Z0-9-]*$/; // Regex pattern to match alphanumeric characters and dashes

    const regexPattern = /^[a-zA-Z0-9 ]*$/;

    // ⚠️ ⚠️ ⚠️  alphanumeric characters only! !!!
    // const regexPattern = /^[a-zA-Z0-9]*$/;

    // Validate the input value
    if (!regexPattern.test(text)) {
      // If invalid, you can either set an error message, clear the input, or handle it as needed
      // console.error('Invalid input: only alphanumeric characters and dashes are allowed.');
      return; // Exit the function early if validation fails
    }

    let ballotKey = `ballot${ballotBinIndex ?? 0}-${
      currBallot?.media_option_type
    }-${userSubmittedOptionsInputValue}`;

    setUserSubmittedOptionsInputValue(text);

    // if (isAlphaWithSpaces) {
    // } else {
    //     console.log('Input contains non-alphabetic characters');
    //     // Optionally, you can clear the input or provide feedback to the user

    //     // setUserSubmittedOptionsInputValue(''); // or leave it unchanged
    // }
  };

  const makeMediaBlob = async (uploadedMediaFile: any, path: string) => {
    let BLOBdata: any;

    if (Platform.OS === "web") {
      // 🖥️ Web: create a local blob URL for preview
      BLOBdata = URL.createObjectURL(
        uploadedMediaFile instanceof Blob
          ? uploadedMediaFile
          : new Blob([uploadedMediaFile])
      );
    } else {
      // 📱 Native (iOS / Android): use the actual file URI
      // Optionally fetch the blob if you need to upload to S3
      if (uploadedMediaFile.blob) {
        // If you already have a blob (from pickers)
        BLOBdata = uploadedMediaFile.blob;
      } else {
        // Fallback: fetch it manually from the file uri
        const response = await fetch(uploadedMediaFile.uri);
        BLOBdata = await response.blob();
      }
    }

    const mediaBLOB = {
      key: { key: path },
      blob: BLOBdata,
    };

    return mediaBLOB;
  };

  const uploadS3updateDB = async () => {
    console.log("running this function");

    const doesValueAlreadyExist = ballotsMediaBLOBs.some((blobs: any) => {
      console.log("blobs", blobs);
      console.log("ballotBinIndex", ballotBinIndex);
      const blobKey = blobs?.key?.key;

      // *** photoCaption in ballotsMediaBLOBs ***
      // const photoCaption = // regex after 'folder/ballots/ will return the photoCaption.
      let photoCaption = "";

      if (photoCaption === userSubmittedOptionsInputValue) {
        setUserSubmittedOptionsInputValue("need-unique");
      }
    });

    if (
      userSubmittedOptionsInputValue === "photo-caption" ||
      userSubmittedOptionsInputValue === ""
    ) {
      setUserSubmittedOptionsInputValue("empty-heart");
      return;
    }

    const doesKeyExistAlready = ballotsMediaBLOBs?.some((blob: any) => {
      // 1️⃣  Make sure you actually have a string to work with

      console.log("blob", blob);
      const ballotKey = blob?.key?.key || blob?.key || "";
      console.log("ballotKey", ballotKey);

      // 2️⃣  Grab the substring after the 4th slash
      // e.g. "something/a/b/c/d/e" → "d/e"
      const match = ballotKey.match(/^(?:[^/]*\/){4}([^/].*)$/);
      const characters = match ? match[1] : "";

      // 3️⃣  Compare it to your input value
      if (userSubmittedOptionsInputValue === characters) {
        console.log("yes they equal that");
        setUserSubmittedOptionsInputValue("");
        return true; // stop .some() early if needed
      }

      // return false;
    });

    if (doesKeyExistAlready) {
      setUserSubmittedOptionsInputValue("");
      return;
    }

    if (userSubmittedOptionsInputValue?.length < 3) {
      return;
    }

    let key = `ballot${ballotBinIndex ?? 0}-${
      currBallot?.media_option_type
    }-${userSubmittedOptionsInputValue}`;
    console.log("key", key);
    // return;

    const submittedOption = await submitUserSubmittedOption(
      currBallot,
      didCurrentUserVote,
      // for media: 'ballot0-images-2' instead of the actual photoCaption so maybe remove the photo caption part since it doesn't matter.
      key,
      setUserSubmittedOptionsInputValue,
      setDidUserSubmit,
      day,
      setBallotBin
    );
    console.log("submittedOption", submittedOption);

    // for images but now reassigning to use this function again:s
    let compressedImage;
    if (currBallot?.media_option_type === "images") {
      // ⚠️ COMPRESS IMAGE FOR VOTES!
      // setUploadedMediaFile(compressedImage);
      // compressedImage = await compressImage(uploadedMediaFile);
      // setUploadedMediaFile(compressedImage);
    }
    // * * * * *
    let compressedVideo;

    const path = `media/day-${day?.id}-folder/ballots/${
      currBallot?.media_option_type
    }/ballot${ballotBinIndex ?? 0}-${
      currBallot?.media_option_type
    }-${userSubmittedOptionsInputValue}`;

    // const path = `media/day-${day?.id}-folder/ballots/${currBallot?.media_option_type}/ballot${currBallot?.id}-${currBallot?.media_option_type}-${userSubmittedOptionsInputValue}`;
    console.log("path", path);

    // return;

    // working for images! now re-doing with ternary to accommodate media types.
    // const ballotMedia = await uploadBallotMediaS3(compressedImage, path, currBallot?.media_option_type)

    // ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ S3 ! ! !
    const presignedQuery = getPresignedUploadURLQueryStringFunc(
      path,
      uploadedMediaFile?.contentType
    );
    console.log("presignedQuery", presignedQuery);

    // for presignedURL to update S3 with the new sound comment
    const presignedPreData: any = await axios.post(API, {
      query: presignedQuery,
    });

    console.log("presignedPreData", presignedPreData);

    if (!presignedPreData) {
      return null;
    }

    let presignedData = presignedPreData?.data?.data?.getPresignedUploadURL;
    const parsedPresignedData = JSON.parse(presignedData);
    console.log("parsedPresignedData", parsedPresignedData);

    // const uploadedBlob = await uploadBlobToS3(path, moment?.blob, moment?.fileType);
    const uploadedBlob = await uploadBlobToS3WithPresignedUrl(
      parsedPresignedData?.signedUrl,
      uploadedMediaFile?.blob,
      uploadedMediaFile?.contentType
    );

    // 🚨 DEBUG: Test the exact CloudFront URL that should work
    const testCloudfrontUrl = parsedPresignedData?.cloudfrontUrl;

    const url = new URL(parsedPresignedData?.signedUrl);
    console.log(
      "🧾 Signed headers:",
      url.searchParams.get("X-Amz-SignedHeaders")
    );

    console.log("🔄 Testing CloudFront URL:", testCloudfrontUrl);

    // Try to fetch it immediately
    try {
      const testResponse = await fetch(testCloudfrontUrl);
      console.log("🔍 CloudFront test response status:", testResponse.status);
      console.log(
        "🔍 CloudFront test response type:",
        testResponse.headers.get("content-type")
      );

      if (testResponse.ok) {
        const testBlob = await testResponse.blob();
        console.log(
          "✅ CloudFront test - blob type:",
          testBlob.type,
          "size:",
          testBlob.size
        );
      } else {
        const errorText = await testResponse.text();
        console.log("❌ CloudFront test error:", errorText.substring(0, 200));
      }
    } catch (error) {
      console.log("❌ CloudFront test fetch failed:", error);
    }

    // ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ S3 ! ! !

    const mediaBLOB = {
      key: { key: path, url: parsedPresignedData?.cloudfrontUrl },
      blob: parsedPresignedData?.cloudfrontUrl, // no need to keep heavy blob data in state
      contentType: uploadedMediaFile?.contentType,
    };

    // pessimistic data upload. just wait for S3 to confirm before setting state. although if S3 didn't work maybe they deserve their moment of fame.

    setBallotsMediaBLOBs([...ballotsMediaBLOBs, mediaBLOB]);
    setDisplayAddMediaMenu(false);
  };

  const recordAudioFunction = async (
    recorderRef: any,
    streamRef: any,
    setUploadedMediaFile: any
  ) => {
    console.log("🎙️ recordAudioFunction firing");

    // 🧠 STOP branch (shared)
    const isWebRecording =
      Platform.OS === "web" &&
      recorderRef.current &&
      recorderRef.current.state === "recording";
    const isMobileRecording =
      (Platform.OS === "ios" || Platform.OS === "android") &&
      recorderRef.current;

    if (isWebRecording || isMobileRecording) {
      console.log("🛑 Stopping current recording...");

      if (Platform.OS === "web") {
        recorderRef.current.stop();
        streamRef.current?.getTracks()?.forEach((t: any) => t?.stop());
      } else {
        try {
          await recorderRef.current.stopAndUnloadAsync();
          const uri = recorderRef.current.getURI();
          if (uri) {
            console.log("recording URI after stop:", uri);
            const response = await fetch(uri);
            const recordedBlob = await response.blob();

            const fileName = uri.split("/").pop() || "audio.m4a";
            const fileType = getMimeType(fileName) || "audio/m4a";

            // ✅ Ready for upload
            setUploadedMediaFile({
              uri,
              name: fileName,
              contentType: fileType,
              blob: recordedBlob,
            });
          }
        } catch (err) {
          console.error("Error stopping recording (mobile):", err);
        }
      }

      recorderRef.current = null;
      return;
    }

    // 🧠 START branch
    if (Platform.OS === "web") {
      console.log("🎧 Starting web recording...");
      streamRef.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      recorderRef.current = new MediaRecorder(streamRef.current);
      recorderRef.current.start();

      recorderRef.current.ondataavailable = async (e: any) => {
        const recordedBlob = new Blob([e.data], { type: "audio/webm" });
        const fileName = `recording-${Date.now()}.webm`;
        const fileType = "audio/webm";

        setUploadedMediaFile({
          uri: URL.createObjectURL(recordedBlob),
          name: fileName,
          contentType: fileType,
          blob: recordedBlob,
        });
      };
    } else {
      try {
        const { granted } = await ExpoAudio.requestPermissionsAsync();
        if (!granted) return;

        await ExpoAudio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        const recording = new ExpoAudio.Recording();
        await recording.prepareToRecordAsync({
          android: {
            extension: ".m4a",
            outputFormat: ExpoAudio.AndroidOutputFormat.MPEG_4,
            audioEncoder: ExpoAudio.AndroidAudioEncoder.AAC,
            sampleRate: 44100,
            numberOfChannels: 2,
            bitRate: 128000,
          },
          ios: {
            extension: ".m4a",
            audioQuality: ExpoAudio.IOSAudioQuality.HIGH,
            sampleRate: 44100,
            numberOfChannels: 2,
            bitRate: 128000,
            outputFormat: ExpoAudio.IOSOutputFormat.MPEG4AAC,
          },
          web: {
            mimeType: "audio/webm",
            bitsPerSecond: 128000,
          },
        });

        await recording.startAsync();
        recorderRef.current = recording;
        console.log("🎙️ Recording started (mobile)");
      } catch (err) {
        console.error("Error starting recording (mobile):", err);
      }
    }
  };

  // const handleMouseDown = () => {
  //     setStartVoiceRecording(true);
  //     // holdTimeoutRef.current = setTimeout(recordAudioFunction, 1000);
  //     setTimeout(() => {
  //         recordAudioFunction(recorderRef, streamRef, setUploadedMediaFile);
  //     }, 1000);
  // };

  // const handleMouseUp = () => {
  //     console.log('mouseup func');
  //     clearTimeout(holdTimeoutRef.current);
  //     if (startVoiceRecording) {
  //         console.log('yes startVoiceRecording before stopRecording');
  //         // stopRecording();
  //     }
  // };

  const playRecording = async () => {
    if (!uploadedMediaFile) return;

    if (Platform.OS === "web") {
      // Web: HTMLAudioElement
      // const audioUrl = URL.createObjectURL(uploadedMediaFile);
      const audio = new Audio(uploadedMediaFile?.uri);
      audio.play();
    } else {
      // Android / iOS: Expo AV
      const { sound } = await ExpoAudio.Sound.createAsync({
        uri: uploadedMediaFile.uri,
      });
      await sound.playAsync();
    }
  };

  //   const VideoPlayer = ({ uri }: { uri: string }) => {
  //     // console.log('uri', uri);
  //     return (
  //       <View
  //         style={[styles.mediaContainer, { maxHeight: 150, overflow: "hidden" }]}
  //       >
  //         {Platform.OS === "web" ? (
  //           <ReactPlayer url={uri} controls width="100%" height="100%" muted />
  //         ) : (
  //           <ExpoVideo
  //             source={{ uri }}
  //             useNativeControls
  //             resizeMode={ResizeMode.CONTAIN} // ✅ valid
  //             style={{ width: "100%", height: 150 }}
  //           />
  //         )}
  //       </View>
  //     );
  //   };

  const goBackFromMediaIsUploaded = () => {
    setMediaIsUploaded(false);
  };

  return (
    <View
      style={[
        { width: Platform.OS === "web" ? 400 : "100%" },
        styles.outerCont,
      ]}
    >
      <View style={styles.voteAndInputSettingsRow}>
        {mediaIsUploaded === true ? (
          <View style={styles.mediaCaptionColumn}>
            <View style={styles.mediaCaptionCont}>
              <TouchableOpacity
                style={styles.addCommentPlusInput}
                onPress={goBackFromMediaIsUploaded}
              >
                {/* <TouchableOpacity style={styles.addCommentPlusInput} onPress={test}> */}
                <Image style={styles.icon} source={RedBackArrowIcon} />
              </TouchableOpacity>

              <TextInput
                style={styles.mediaCaptionInput}
                onFocus={captionInputFocus}
                onChangeText={handleOnchange} // RN uses onChangeText instead of onChange
                value={userSubmittedOptionsInputValue}
                maxLength={20}
                placeholder="Caption..." // optional placeholder
              />

              <TouchableOpacity
                style={styles.addCommentPlusInput}
                onPress={uploadS3updateDB}
              >
                <Image style={styles.icon} source={GreenForwardArrowIcon} />
              </TouchableOpacity>
            </View>
            {userSubmittedOptionsInputValue?.length >= 1 && (
              <Text style={styles.text}>
                {" "}
                {userSubmittedOptionsInputValue}{" "}
              </Text>
            )}

            {userSubmittedOptionsInputValue?.length >= 1 &&
              currBallot?.media_option_type === "images" && (
                <Image
                  style={styles.previewImg}
                  source={{ uri: uploadedMediaFile.uri }} // RN expects { uri: ... }
                  alt="Uploaded"
                  resizeMode="contain"
                />

                // <Image style={styles.previewImg} source={URL.createObjectURL(uploadedMediaFile)} alt="Uploaded" />
              )}

            {userSubmittedOptionsInputValue?.length >= 1 &&
              currBallot?.media_option_type === "audio" && (
                <TouchableOpacity
                  style={styles.customSoundFile}
                  onPress={playRecording}
                >
                  <Image source={SoundWaveIcon} />
                </TouchableOpacity>
              )}

            {userSubmittedOptionsInputValue?.length >= 1 &&
              currBallot?.media_option_type === "videos" && (
                <BallotsVideoPlayer uri={uploadedMediaFile} />
                // <VideoPlayer uri={uploadedMediaFile} />
              )}

            {/* { userSubmittedOptionsInputValue?.length >= 1 && currBallot?.media_option_type === "video" && <Image style={styles.previewImg} source={URL.createObjectURL(uploadedMediaFile)} alt="Uploaded" /> } */}
          </View>
        ) : mediaOptionType === "images" ? (
          <View
            style={[
              { width: Platform.OS === "web" ? 300 : "100%" },
              styles.uploadMediaInputCont,
            ]}
          >
            <View style={styles.cameraCont}>
              <TouchableOpacity onPress={() => setDisplayAddMediaMenu(false)}>
                <Image style={styles.icon} source={RedBackArrowIcon} />
              </TouchableOpacity>
              {/*                 ⚠️⚠️⚠️⚠️⚠️⚠️ type="file" fix ⚠️⚠️⚠️⚠️⚠️⚠️ */}
              <TouchableOpacity onPress={pickImage}>
                <Image style={styles.icon} source={FolderUploadIcon} />
              </TouchableOpacity>

              <TouchableOpacity onPress={confirmSelection}>
                <Image style={styles.icon} source={GreenForwardArrowIcon} />
              </TouchableOpacity>
            </View>

            {uploadedMediaFile !== null && (
              <Image
                style={styles.previewImg}
                source={{ uri: uploadedMediaFile.uri }}
                alt="upload"
              />
            )}
          </View>
        ) : mediaOptionType === "videos" ? (
          <View
            style={[
              { width: Platform.OS === "web" ? 300 : "100%" },
              styles.uploadMediaInputCont,
            ]}
          >
            <View style={styles.cameraCont}>
              <TouchableOpacity onPress={() => setDisplayAddMediaMenu(false)}>
                <Image style={styles.icon} source={RedBackArrowIcon} />
              </TouchableOpacity>

              <TouchableOpacity onPress={uploadVideoFunction}>
                <Image style={styles.icon} source={FolderUploadIcon} />
              </TouchableOpacity>

              {/* <input value="" style={styles.addPhotoOrVideoInput} type="file" accept="video/*" onChange={uploadVideoFunction} /> */}

              <TouchableOpacity onPress={confirmSelection}>
                <Image style={styles.icon} source={GreenForwardArrowIcon} />
              </TouchableOpacity>
            </View>
            {uploadedMediaFile !== null && (
              <BallotsVideoPlayer uri={uploadedMediaFile} />
              //   <VideoPlayer uri={uploadedMediaFile} />
            )}
          </View>
        ) : mediaOptionType === "audio" ? (
          <View
            style={[
              { width: Platform.OS === "web" ? 300 : "100%" },
              styles.uploadMediaInputCont,
            ]}
          >
            <View style={styles.cameraCont}>
              <TouchableOpacity onPress={() => setDisplayAddMediaMenu(false)}>
                <Image style={styles.icon} source={RedBackArrowIcon} />
              </TouchableOpacity>

              {/* ⚠️ ⚠️ ⚠️ uploadAudioFunction!! */}
              <TouchableOpacity onPress={() => setDisplayAddMediaMenu(false)}>
                <Image style={styles.icon} source={RedBackArrowIcon} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  recordAudioFunction(
                    recorderRef,
                    streamRef,
                    setUploadedMediaFile
                  )
                }
              >
                {/* <TouchableOpacity onPressIn={handleMouseDown} onPressOut={handleMouseUp}> */}
                <Image style={styles.iconBigger} source={SoundWaveIcon} />
              </TouchableOpacity>

              <TouchableOpacity onPress={confirmSelection}>
                <Image style={styles.icon} source={GreenForwardArrowIcon} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={playRecording}>
              <Image style={styles.icon} source={SoundIcon} />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerCont: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    // width: 300,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    borderStyle: "dotted",
    alignSelf: "center",
  },
  uploadMediaInputCont: {
    margin: 0,
    // width: 200,
    padding: 20,
    gap: 20,
    justifyContent: "space-around",
    alignItems: "center",
  },
  mediaContainer: {
    gap: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  mediaVideo: {
    flex: 1, // Allow this to take remaining space
    // height: screenHeight * 0.325,
    width: "100%",
    justifyContent: "center", // Center the content vertically
    alignItems: "center",
    // borderWidth: 2,
    // borderColor: 'blue',
  },
  text: {
    fontFamily: "Fuzzy Bubbles",
    fontSize: 24,
    width: "100%",
    paddingLeft: 5,
    color: grayphite,
    // boxSizing: 'border-box',
  },
  mediaCaptionInput: {
    margin: 0,
    marginBottom: 4, // 0.25rem ≈ 4px
    width: 160, // 10rem
    alignSelf: "center",
    borderTopLeftRadius: 65.5,
    borderBottomRightRadius: 122.5,
    borderWidth: 2.5,
    // borderColor: '#FF69B4', // $pinkCake
    color: "#555555", // $grayphite
    fontFamily: "Fuzzy Bubbles", // $fuzzy
    paddingHorizontal: 10, // optional: for comfortable text input
  },
  mediaCaptionColumn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start", // maps to justify-content
    alignItems: "flex-start", // maps to align-items
    width: "100%",
    padding: 5,
    borderColor: grayphite,
    borderWidth: 2,
  },
  voteAndInputSettingsRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    alignSelf: "center",
    // position: 'relative',
    // height: screenHeight / 1,
    resizeMode: "contain",
    // left: -12, // ~-0.75rem ≈ -12px
  },
  cameraCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
    zIndex: 1,
    width: "100%",
  },
  customFileInputLabelImages: {
    height: 30,
    width: 30,
    margin: 8,
    left: 32,
  },
  addPhotoOrVideoInput: {
    opacity: 0,
    height: 25,
    width: 55,
    borderWidth: 2,
    borderColor: "#FF69B4", // $pinkCake
    borderTopLeftRadius: 65.5,
    borderBottomRightRadius: 122.5,
    alignSelf: "center",
  },
  previewImg: {
    alignSelf: "center",
    height: 200,
    width: 200,
    borderRadius: 6,
    shadowRadius: 3,
    marginTop: 10,
  },
  mediaCaptionCont: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: 20,
    marginTop: 10,

    // borderColor: 'red',
    // borderWidth: 5,
  },
  addCommentPlusInput: {
    height: 25,
    width: 25,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: grayphite,
    justifyContent: "center",
    alignItems: "center",
    top: -1,
  },
  addCommentInputText: {
    fontSize: 16,
    fontWeight: 500,
    fontFamily: "Fuzzy Bubbles",
    color: grayphite,
  },
  plusText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555555", // $grayphite
  },
  customSoundFile: {
    width: 100,
    height: 35,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
  },
  bar: {
    width: 5,
    borderRadius: 20,
    marginHorizontal: 0.5,
  },
  iconBigger: {
    height: 50,
    width: 50,
  },
  icon: {
    height: 35,
    width: 35,
  },
  iconMini: {
    height: 15,
    width: 15,
  },
});

export default AddMediaProposedVote;
