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

// utils:
import { BananaIcon } from "@/constants/Images";
import { grayphite } from "@/constants/Colors";
import { VideoPlayer } from "../../Day/DayDisplays/Moments/VideoPlayer";
import ErrorSlippedUpBanana from "@/components/ErrorSlippedUpBanana";

interface props {
  editDay: any;
  setEditDay: any;
  momentsBinIndex: any;
  setMomentsBinIndex: any;

  isEditingMedia: any;
  setIsEditingMedia: any;
}

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const MomentIndexEdit: React.FC<props> = ({
  editDay,
  setEditDay,
  momentsBinIndex,
  setMomentsBinIndex,

  isEditingMedia,
  setIsEditingMedia,
}) => {
  let dayMoments = editDay?.moments;
  let currMoment = dayMoments[momentsBinIndex];
  let mediaType = currMoment ? "image" : currMoment ? "video" : "hoose";

  // const VideoPlayer = ({ uri }: { uri: string }) => {
  //     return (
  //         Platform.OS === 'web' ? (
  //             <ReactPlayer url={uri} controls style={styles.media} />
  //             // <ReactPlayer url={uri} controls width="100%" height="300px" />
  //         ) : (
  //             <Video source={{ uri: uri }} style={styles.media} controls resizeMode="contain" />
  //         )
  //     );
  // };

  const test = () => {
    console.log("mediaType", mediaType);
    console.log("momentsBinIndex", momentsBinIndex);
  };

  const changeMediaText = (text: string, type: string) => {
    // Clone the day object
    let dayClone = { ...editDay }; // Clone the main object

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
    setEditDay(dayClone);
  };

  return (
    <View style={styles.cont}>
      <TextInput
        maxLength={75}
        value={currMoment?.header}
        onChangeText={(text: any) => changeMediaText(text, "header")}
        style={styles.input}
      />
      <ScrollView contentContainerStyle={styles.textCont}>
        {/* <TouchableOpacity onPress={test}> yup </TouchableOpacity> */}
        <Text style={styles.text}> {currMoment?.header} </Text>
      </ScrollView>

      {
        isEditingMedia ? (
          <TouchableOpacity
            onPress={() => setIsEditingMedia(false)}
            style={styles.errorCont}
          >
            <Image source={BananaIcon} style={styles.banana} />
            <Text> Slipped up! </Text>
          </TouchableOpacity>
        ) : mediaType === "image" ? (
          <Image
            source={editDay?.moments[momentsBinIndex]?.blobURL}
            style={styles.media}
          />
        ) : (
          // <Image source={day?.moments[momentsBinIndex]?.blobURL} style={styles.media} />
          // mediaType === 'video'
          //     ?
          <VideoPlayer uri={editDay?.moments[momentsBinIndex]?.blobURL} />
        )
        // :
      }

      <TextInput
        maxLength={300}
        value={currMoment?.caption}
        onChangeText={(text: any) => changeMediaText(text, "caption")}
        style={styles.input}
      />
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
  errorCont: {
    flex: 1,
    flexDirection: "row",
    height: "100%",
    width: screenWidth,
    justifyContent: "center",
    alignItems: "center",
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
    // overflowY: "auto",
  },
  text: {
    fontFamily: "Fuzzy Bubbles",
    fontSize: 16,
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
  banana: {
    height: screenHeight / 10,
    width: screenWidth / 10,
    marginBottom: 50,
  },
});

export default MomentIndexEdit;
