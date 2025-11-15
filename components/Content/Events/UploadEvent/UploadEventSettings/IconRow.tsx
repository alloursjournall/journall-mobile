// top level imports
import React, { useState } from "react";

import {
  Platform,
  TouchableOpacity,
  Image,
  View,
  StyleSheet,
} from "react-native";
import ErrorSlippedUpBanana from "@/components/ErrorSlippedUpBanana";

// utils:
import { grayphite, grayfight } from "@/constants/Colors";
import { RedBackArrowIcon, FolderUploadIcon } from "@/constants/Images";
import * as ImagePicker from "expo-image-picker";

interface props {
  event: any;
  setEvent: any;
}

const IconRow: React.FC<props> = ({ event, setEvent }) => {
  const [wrongFileTypeError, setWrongFileTypeError] = useState(false);

  const uploadMediaHandler = async (event: any) => {
    if (Platform.OS === "web") {
      // Web: Use input type="file"
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/jpeg, image/png, video/mp4, video/quicktime";
      input.multiple = false;
      input.onchange = async (event: any) => {
        const file = event.target.files[0];

        if (file) {
          const fileType = file.type;

          // Check if the file type is JPEG or PNG
          if (fileType === "image/jpeg" || fileType === "image/png") {
            const clone = { ...event };
            clone.icon = URL.createObjectURL(file);
            setEvent(clone);
            console.log("File accepted:", file);
            // Proceed with file upload logic here
          } else {
            alert("Please select a JPEG or PNG file.");
            setWrongFileTypeError(true);
          }
        } else {
          alert("No file selected.");
        }
      };
      input.click();
    } else {
      // Mobile: Use expo-image-picker or DocumentPicker
      try {
        // Launch the image picker
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All, // Images & Videos
          allowsEditing: true,
          quality: 1,
        });

        if (!result.canceled && result.assets[0]) {
          const uri = result.assets[0].uri;
          const fileType = uri.split(".").pop();

          // Check file type
          if (fileType === "jpeg" || fileType === "jpg" || fileType === "png") {
            let clone: any = { ...result };
            clone.icon = uri; // You can directly use the URI as an icon here
            setEvent(clone);
            console.log("File accepted:", result.assets[0]);
            // Proceed with file upload logic here
          } else {
            alert("Please select a JPEG or PNG file.");
            setWrongFileTypeError(true);
          }
        }
      } catch (error) {
        console.log("Error picking file:", error);
      }
    }
  };

  const unselectPhoto = () => {
    let clone: any = { ...event };
    clone.icon = null; // You can directly use the URI as an icon here
    setEvent(clone);
  };

  return (
    <View style={styles.settingsRow}>
      {event?.icon && event?.icon !== "no" && (
        <TouchableOpacity onPress={unselectPhoto}>
          <Image style={styles.icons} source={RedBackArrowIcon} />
        </TouchableOpacity>
      )}

      {wrongFileTypeError ? (
        <ErrorSlippedUpBanana
          size="mini"
          setShowError={setWrongFileTypeError}
        />
      ) : (
        // <p style={{ color: "#E01115" }} style={styles.dateText}> jpg/png </p>
        <View style={styles.slightSplitRow}>
          <TouchableOpacity onPress={uploadMediaHandler}>
            <Image
              style={styles.icons}
              source={
                event?.icon && event?.icon !== "no"
                  ? event?.icon
                  : FolderUploadIcon
              }
            />
          </TouchableOpacity>
        </View>
      )}

      {/* {
                event?.icon && event?.icon !== "no"
                    ?
                    <View style={styles.container}>
                        <input
                            checked={event?.icon && event?.icon !== "no"}
                            id={`iFollowInviteOnlyCheckbox`}
                            type="checkbox" />
                        <label
                            htmlFor={`iFollowInviteOnlyCheckbox`}></label>
                    </View>
                    :
                    <p style="ghost"> yh </p>
            } */}
    </View>
  );
};

const styles = StyleSheet.create({
  settingsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "auto",
    width: "100%",
    paddingVertical: 4,
    paddingHorizontal: 8,
    boxSizing: "border-box",
  },
  icons: {
    height: 50,
    width: 50,
  },
  iconMini: {
    height: 35,
    width: 35,
  },
  slightSplitRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  headerText: {
    color: grayphite,
    fontSize: 20,
    fontWeight: 400,
    fontFamily: "Fuzzy Bubbles",
  },

  captionText: {
    color: grayfight,
    fontSize: 20,
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif",
  },
});

export default IconRow;
