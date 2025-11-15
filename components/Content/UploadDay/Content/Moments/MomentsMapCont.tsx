import axios from "axios";
import { useState, useEffect, useRef } from "react";

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

import { VideoPlayer } from "@/components/Content/Day/DayDisplays/Moments/VideoPlayer";

// utils:

import { grayphite } from "@/constants/Colors";

interface props {
  moments: any;
  day: any;
  setDay: any;
  momentsBinIndex: any;
  setMomentsBinIndex: any;
}

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const MomentsMapCont: React.FC<props> = ({
  moments,
  day,
  setDay,
  momentsBinIndex,
  setMomentsBinIndex,
}) => {
  //   const VideoPlayer = ({ uri }: { uri: string }) => {
  //     return Platform.OS === "web" ? (
  //       <ReactPlayer url={uri} controls style={styles.media} />
  //     ) : (
  //       // <ReactPlayer url={uri} controls width="100%" height="300px" />
  //       <Video
  //         source={{ uri: uri }}
  //         style={styles.media}
  //         controls
  //         resizeMode="contain"
  //       />
  //     );
  //   };

  const MediaHeaderCaption = ({
    moments,
    day,
    setDay,
    momentsBinIndex,
  }: any) => {
    console.log("moments", moments);
    const currentMoment = moments[momentsBinIndex];

    const mediaType = currentMoment?.is_image ? "image" : "video";
    const blobURL = currentMoment?.blobURL;
    console.log("currentMoment", currentMoment);

    const [header, setHeader] = useState<any>("");
    const [caption, setCaption] = useState<any>("");

    const changeHeader = (text: string) => {
      let dayClone2 = { ...day };
      console.log("dayClone2", dayClone2);

      //   return;
      // Clone the day object
      let dayClone = { ...day }; // Clone the main object

      // Clone the moments array
      let momentsClone = [...dayClone.moments];

      // Make sure you are targeting the correct index
      momentsClone[momentsBinIndex].header = text; // Update the header for the correct moment

      // Set the updated moments array back into the day clone
      dayClone.moments = momentsClone; // Reflect the changes

      // Set the new state (this triggers a re-render with updated data)
      setDay(dayClone);
    };

    const changeCaption = (text: string) => {
      setCaption(text);
    };

    return (
      <View style={styles.mediaCont}>
        <TextInput
          value={day?.moments[momentsBinIndex]?.header}
          onChangeText={changeHeader}
          style={styles.input}
        />
        <View style={styles.textCont}>
          <Text style={styles.text}>
            {" "}
            {day?.moments[momentsBinIndex]?.header}{" "}
          </Text>
        </View>
        {mediaType === "image" ? (
          <Text> yeah sure </Text>
        ) : (
          <VideoPlayer uri={day?.moments[momentsBinIndex]?.blobURL} />
        )}

        <TextInput
          value={day?.moments[momentsBinIndex]?.caption}
          onChangeText={changeCaption}
          style={styles.input}
        />
        <View style={styles.textCont}>
          <Text> {day?.moments[momentsBinIndex]?.caption} </Text>
        </View>
      </View>
    );
  };

  const test = () => {};

  return (
    <ScrollView contentContainerStyle={styles.momentsMapCont}>
      {
        // moments?.map((mapitem: any, momentsBinIndex: number) => {
        // return (

        <MediaHeaderCaption
          moments={moments}
          day={day}
          setDay={setDay}
          // mediaType={mapitem?.is_image ? 'image' : 'video'}
          // blob={mapitem?.blobURL}
          index={momentsBinIndex}
        />

        // )
        // })
      }
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mediaCont: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 2.5,
  },

  momentsMapCont: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
    gap: 20,
    margin: 0,
    padding: 10,
  },
  inputTextCont: {
    height: 200,
    width: 300,
    // borderColor: 'blue',
    borderWidth: 5,
  },
  textCont: {
    width: "100%",
    borderColor: grayphite,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "Fuzzy Bubbles",
    fontSize: 16,
    color: grayphite,
  },
  icon: {
    height: 50,
    width: 50,
  },
  media: {
    height: screenHeight / 5,
    width: screenWidth / 2,
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

export default MomentsMapCont;
