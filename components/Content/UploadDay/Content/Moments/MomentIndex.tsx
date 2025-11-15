import { useState } from "react";
import {
  Platform,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";
import { VideoPlayer } from "@/components/Content/Day/DayDisplays/Moments/VideoPlayer";

// utils:
import { grayphite } from "@/constants/Colors";
import { Video as ExpoVideo, ResizeMode } from "expo-av";

interface props {
  day: any;
  setDay: any;
  momentsBinIndex: any;
  setMomentsBinIndex: any;
}

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const MomentIndex: React.FC<props> = ({
  day,
  setDay,
  momentsBinIndex,
  setMomentsBinIndex,
}) => {
  let dayMoments = day?.moments;
  let currMoment = dayMoments[momentsBinIndex];
  let mediaType = currMoment?.is_image
    ? "image"
    : currMoment?.is_video
    ? "video"
    : null;

  const [isEditingMedia, setIsEditingMedia] = useState<boolean>(false);

  const toggleEditMediaFunc = () => {
    console.log("togggler");
    setIsEditingMedia(!isEditingMedia);
  };

  // const VideoPlayer = ({ uri }: { uri: string }) => {
  //     console.log('uri from VideoPlayer', uri);
  //     return (
  //         <View style={[styles.media, { maxHeight: 300, overflow: 'hidden' }]}>
  //             {Platform.OS === 'web' ? (
  //                 <ReactPlayer url={uri} controls width="100%" height="100%" muted />
  //             ) : (
  //                 day?.moments[momentsBinIndex]?.blobURL && (
  //                     <ExpoVideo
  //                         source={{ uri }}
  //                         useNativeControls
  //                         resizeMode={ResizeMode.CONTAIN} // ✅ valid
  //                         style={{ width: '100%', height: 300 }}
  //                     />
  //                 )
  //             )}
  //         </View>
  //     );
  // };

  // const VideoPlayer = ({ uri }: { uri: string }) => {
  //     return Platform.OS === 'web' ? (
  //         <ReactPlayer url={uri} controls style={styles.media} />
  //     ) : (
  //         // <ReactPlayer url={uri} controls width="100%" height="300px" />
  //         <Video source={{ uri: uri }} style={styles.media} controls resizeMode="contain" />
  //     );
  // };

  const test = () => {
    console.log("mediaType", mediaType);
    console.log("momentsBinIndex", momentsBinIndex);
  };

  const changeMediaText = (text: string, type: string) => {
    // Clone the day object
    let dayClone = { ...day }; // Clone the main object

    // Clone the moments array
    let momentsClone = [...dayClone.moments];

    // Make sure you are targeting the correct index
    if (type === "header") {
      momentsClone[momentsBinIndex].header = text; // Update the header for the correct moment
    } else if (type === "caption") {
      momentsClone[momentsBinIndex].caption = text; // Update the header for the correct moment
    }

    // Set the updated moments array back into the day clone
    dayClone.moments = momentsClone; // Reflect the changes

    // Set the new state (this triggers a re-render with updated data)
    setDay(dayClone);
  };

  return (
    <View style={styles.cont}>
      {currMoment?.blobURL && (
        <TextInput
          maxLength={75}
          value={currMoment?.header}
          onChangeText={(text: any) => changeMediaText(text, "header")}
          style={styles.input2}
        />
      )}
      <ScrollView contentContainerStyle={styles.textCont}>
        {/* <TouchableOpacity onPress={test}> yup </TouchableOpacity> */}
        <Text style={styles.text}> {currMoment?.header} </Text>
      </ScrollView>

      {
        mediaType === "image" ? (
          <Image
            source={{ uri: day?.moments[momentsBinIndex]?.blobURL }}
            style={styles.media}
            resizeMode="contain"
          />
        ) : (
          <VideoPlayer uri={day?.moments[momentsBinIndex]?.blobURL} />
        )
        // :
      }

      {currMoment?.blobURL && (
        <TextInput
          maxLength={300}
          value={currMoment?.caption}
          onChangeText={(text: any) => changeMediaText(text, "caption")}
          style={styles.input2}
        />
      )}

      <ScrollView contentContainerStyle={styles.textCont}>
        <Text style={styles.text}> {currMoment?.caption} </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  cont: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    width: screenWidth,
    // width: '100%',
    gap: 5,
    margin: 0,
    padding: 10,
  },
  media: {
    height: screenHeight / 2,
    width: screenWidth,
  },
  textCont: {
    width: screenWidth,
    // width: screenWidth / 2,
    maxHeight: screenHeight / 5,
    borderBottomColor: grayphite,
    borderBottomWidth: 1,
    borderStyle: "dotted",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // overflowY: 'auto',
  },
  text: {
    fontFamily: "Fuzzy Bubbles",
    fontSize: 16,
    color: grayphite,
  },
  input2: {
    width: 24, // give it realistic room for text
    maxHeight: 20, // ✅ fixes the tall-on-type issue
    // maxHeight: 30, // ✅ fixes the tall-on-type issue
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
});

export default MomentIndex;
