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
import {
  FolderUploadIcon,
  CameraIcon,
  PopcornIcon,
  TrashIcon,
} from "@/constants/Images";
import { grayphite } from "@/constants/Colors";

import * as ImagePicker from "expo-image-picker";

// this version of compressImage doesn't make the android/ios version ==== to the web version/

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

interface props {
  day: any;
  setDay: any;
  headerInput: any;
  setHeaderInput: any;
  captionInput: any;
  setCaptionInput: any;
  blob: any;
  setBlob: any;
  blobURL: any;
  setBlobURL: any;
  momentsBinIndex: any;
  setMomentsBinIndex: any;
}

const PhotoOrVideoBar: React.FC<props> = ({
  day,
  setDay,
  headerInput,
  setHeaderInput,
  captionInput,
  setCaptionInput,
  blob,
  setBlob,
  blobURL,
  setBlobURL,
  momentsBinIndex,
  setMomentsBinIndex,
}) => {
  const [tooBig, setTooBig] = useState<boolean>(false);
  const { getMimeType } = useContentFunction();

  const deleteBlob = () => {
    // delete current index of day.moments;
    let clone = { ...day };
    let momentsClone = clone?.moments;
    momentsClone.pop();
    // let sortedMomentsClone = momentsClone?.filter((moments: any, index: number) => index !== momentsBinIndex);

    // clone.moments = sortedMomentsClone;
    setDay(clone);

    setBlob(null);
    setHeaderInput("");
    setCaptionInput("");
  };

  const decrementMomentsBin = () => {
    const dayMomentsLength = day?.moments?.length;
    if (momentsBinIndex === 0) {
      setMomentsBinIndex(dayMomentsLength - 1);
    } else {
      setMomentsBinIndex(momentsBinIndex - 1);
    }
  };

  const incrementMomentsBin = () => {
    console.log("increment right?");
    console.log("momentsBinIndex", momentsBinIndex);
    const dayMomentsLength = day?.moments?.length;
    if (momentsBinIndex === dayMomentsLength - 1) {
      setMomentsBinIndex(0);
    } else {
      setMomentsBinIndex(momentsBinIndex + 1);
    }
  };

  const finalizeAdd = (cloneMoments: any, clone: any, object: any) => {
    cloneMoments.push(object);
    clone.moments = cloneMoments;
    console.log("clone after", clone);
    setDay(clone);

    setHeaderInput("");
    setCaptionInput("");
    setBlob(null);

    // show the new media/blob that got uploadded.
    if (momentsBinIndex === 0) {
      return;
    } else {
      setMomentsBinIndex(momentsBinIndex + 1);
    }
  };

  // cross-platform
  const addMediaToBin = async (BLOB: any) => {
    // * * * * * * * * * * * * do we need:                  if (Platform.OS === 'web')
    console.log("BLOB", BLOB);
    let clone = { ...day };
    let cloneMoments: any = clone?.moments;

    let object: any = {
      header: headerInput,
      caption: captionInput,
      is_image: false,
      is_video: false,
      blob: null,
      blobURL: null,
      realBlob: null,
      contentType: null,
    };
    if (Platform.OS === "web") {
      object.contentType = BLOB.type || "application/octet-stream";
      if (cloneMoments?.length === 7) {
        return;
      }
      if (!cloneMoments) {
        return null;
      }

      if (BLOB !== null) {
        console.log("do we run this");

        // ✅ convert local file:// uri to a real Blob
        const uri = BLOB.uri;
        const response = await fetch(uri);
        const realBlob = await response.blob();

        object.blob = realBlob; // the actual binary blob for upload
        object.blobURL = uri; // still keep local URI for preview
        object.contentType = realBlob.type || "application/octet-stream";

        if (BLOB.type.includes("image")) {
          object.is_image = true;
          finalizeAdd(cloneMoments, clone, object);
        } else if (BLOB.type.includes("video")) {
          const video = document.createElement("video");
          video.preload = "metadata";

          video.onloadedmetadata = () => {
            // window.URL.revokeObjectURL(video.src); // Clean up
            const duration = video.duration;

            console.log("Video duration in seconds:", duration);

            // if (duration >= 90) {
            //     console.log('too long. twss.');
            //     setTooBig(true);
            //     setTimeout(() => {
            //         setTooBig(false);
            //     }, 2000);
            //     return;
            // }

            // You can reject long videos or store length if needed
            object.is_video = true;
            object.videoLength = duration; // Optional: store duration
            console.log("object", object);
            finalizeAdd(cloneMoments, clone, object); // Proceed only after length is known
          };

          video.src = object.blobURL;
        } else {
          // fallback for unknown formats
          object.is_video = true;
          finalizeAdd(cloneMoments, clone, object);
        }
      } else {
        console.log("this is running");
        // optional: handle null BLOB with a placeholder?
      }
    }

    // ✅ MOBILE (NEW, DOES NOT TOUCH WEB)
    if (Platform.OS !== "web") {
      if (!BLOB) return;

      // 👇 Add this block RIGHT HERE
      try {
        // Convert local file:// URI into a real Blob so it behaves like the web version
        const uri = BLOB.uri;
        const response = await fetch(uri);
        const realBlob = await response.blob();

        // Store both the URI (for playback/preview) and the real blob (for upload)
        object.blob = realBlob;
        object.realBlob = realBlob; // 👈 your new reupload-ready Blob
        object.blobURL = uri;
        object.contentType = realBlob.type || "application/octet-stream";
      } catch (err) {
        console.warn("Error creating real Blob from URI:", err);
        return;
      }

      const lowerUri = (BLOB.uri || "").toLowerCase();

      console.log("BLOB", BLOB);
      console.log("object android!!", object);
      console.log("lowerUri android!!", lowerUri);

      const uri = BLOB?.uri || BLOB; // sometimes it's just a string path
      const ext = uri?.split(".").pop()?.toLowerCase();

      // Try direct MIME first
      if (BLOB?.mimeType) {
        object.contentType = BLOB.mimeType;
      } else if (ext) {
        // optional: use react-native-mime-types if you installed it
        const mimeFromExt = getMimeType(ext);
        object.contentType = mimeFromExt || "application/octet-stream";
      } else {
        // fallback
        object.contentType = "application/octet-stream";
      }

      if (
        lowerUri.endsWith(".jpg") ||
        lowerUri.endsWith(".jpeg") ||
        lowerUri.endsWith(".png")
      ) {
        object.is_image = true;
        finalizeAdd(cloneMoments, clone, object);
        return;
      }

      if (lowerUri.endsWith(".mp4") || lowerUri.endsWith(".mov")) {
        object.is_video = true;
        // we’ll just skip duration validation for now — ExpoVideo handles it fine
        finalizeAdd(cloneMoments, clone, object);
        return;
      }

      // fallback (unknown type)
      object.is_video = true;
      finalizeAdd(cloneMoments, clone, object);
    }
  };

  const test = () => {
    console.log("day?.moments", day?.moments);
  };

  const uploadFile = async () => {
    if (Platform.OS === "web") {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/jpeg, image/png, video/mp4, video/quicktime";
      input.multiple = false;

      input.onchange = async (e: any) => {
        const target = e.target as HTMLInputElement;
        const file = target?.files?.[0];
        if (!file) return;

        // ✅ ALWAYS give addMediaToBin a real File/Blob
        let toAdd: any = file;
        // let toAdd: File | Blob = file;

        // --- optional compression on web ---
        // compressImage expects a uri string on web (blob: URL), and returns a File/Blob.
        // we create a temporary blob URL just for compression, then revoke it.
        // if you don't want compression, comment this block out.
        try {
          // only compress images
          if (file.type.startsWith("image/")) {
            console.log("hey starts with images");
            const tmpUri = URL.createObjectURL(file);
            try {
              toAdd = tmpUri;
              // const compressed = await compressImage(tmpUri);
              // if (compressed instanceof Blob) {
              //     toAdd = compressed;
              // }
            } finally {
              URL.revokeObjectURL(tmpUri);
            }
          }
        } catch (err) {
          console.warn(
            "Compression failed, falling back to original file:",
            err
          );
        }

        // 👇 hand the Blob/File to your working function; it will call createObjectURL
        console.log("toAdd", toAdd);
        addMediaToBin(file);
      };

      input.click();
    } else {
      // mobile: you already pass a uri; if addMediaToBin expects a Blob/File,
      // convert the uri to a Blob first so addMediaToBin can stay the same.
      // ✅ mobile
      try {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          quality: 1,
        });

        if (!result.canceled) {
          const asset = result.assets[0]; // has uri, type ("image"|"video"), fileName, etc.

          // just send the asset itself
          addMediaToBin({
            ...asset,
            blob: null, // keep same shape for consistency if you want
          });
        }
      } catch (error) {
        console.log("Error picking file:", error);
      }
    }
  };

  return (
    <View style={styles.addCommentRow}>
      <TouchableOpacity onPress={test}>
        <Text> test </Text>
      </TouchableOpacity>

      {Array.isArray(day?.moments) && day?.moments[momentsBinIndex] && (
        <TouchableOpacity onPress={deleteBlob}>
          <Image style={styles.icon} source={TrashIcon} />
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={decrementMomentsBin}
        style={styles.addCommentPlusInput}
      >
        <Text> &lt; </Text>
      </TouchableOpacity>

      {blob === null && (
        <TouchableOpacity onPress={uploadFile}>
          {tooBig ? (
            <Text style={styles.addCommentInputText}> &lt; 60 </Text>
          ) : (
            <Image style={styles.icon} source={FolderUploadIcon} />
          )}
        </TouchableOpacity>
      )}

      {blob !== null && (
        <TouchableOpacity
          onPress={addMediaToBin}
          style={styles.addCommentPlusInput}
        >
          <Text style={styles.addCommentInputText}> + </Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={incrementMomentsBin}
        style={styles.addCommentPlusInput}
      >
        <Text> &gt; </Text>
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

export default PhotoOrVideoBar;
