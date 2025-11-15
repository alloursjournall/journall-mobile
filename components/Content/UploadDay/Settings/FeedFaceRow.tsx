import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

import {
  ThoughtsIcon,
  MomentsIcon,
  FieldsIcon,
  GreatfullIcon,
  BallotIcon,
  CommentIcon,
} from "@/constants/Images";

interface props {
  day: any;
  setDay: any;
}

const FeedFaceRow: React.FC<props> = ({ day, setDay }) => {
  const setUploadFeedFace = (imageSource: string) => {
    let clone = { ...day };
    let settingsClone = { ...clone?.settings };
    if (imageSource === "thoughts") {
      settingsClone.feedface = "thoughts";
    }
    if (imageSource === "moments") {
      settingsClone.feedface = "moments";
    }
    if (imageSource === "fields") {
      settingsClone.feedface = "fields";
    }
    if (imageSource === "greatfullagain") {
      settingsClone.feedface = "greatfullagain";
    }
    if (imageSource === "comments") {
      settingsClone.feedface = "comments";
    }
    if (imageSource === "ballots") {
      settingsClone.feedface = "ballots";
    }
    clone.settings = settingsClone;
    setDay(clone);
  };

  return (
    <View style={styles.uploadSettingsRow}>
      <Text>
        {" "}
        {day?.settings?.feedface === ""
          ? "feedface"
          : day.settings.feedface === "greatfullagain"
          ? "gr8"
          : day.settings.feedface}{" "}
      </Text>
      <View style={styles.slightSplitRow}>
        <TouchableOpacity
          onPress={() => setUploadFeedFace("thoughts")}
          style={styles.actionButton}
        >
          <Image
            style={[
              styles.icon,
              { opacity: day.settings.feedface === "thoughts" ? 1.0 : 0.5 },
            ]}
            source={ThoughtsIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setUploadFeedFace("moments")}
          style={[
            styles.actionButton,
            { opacity: day.settings.feedface === "moments" ? 1.0 : 0.5 },
          ]}
        >
          <Image style={styles.icon} source={MomentsIcon} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setUploadFeedFace("fields")}
          style={styles.actionButton}
        >
          <Image
            style={[
              styles.icon,
              { opacity: day.settings.feedface === "fields" ? 1.0 : 0.5 },
            ]}
            source={FieldsIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setUploadFeedFace("greatfullagain")}
          style={styles.actionButton}
        >
          <Image
            style={[
              styles.icon,
              {
                opacity: day.settings.feedface === "greatfullagain" ? 1.0 : 0.5,
              },
            ]}
            source={GreatfullIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setUploadFeedFace("comments")}
          style={[
            styles.actionButton,
            { opacity: day.settings.feedface === "comments" ? 1.0 : 0.5 },
          ]}
        >
          <Image style={styles.icon} source={CommentIcon} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setUploadFeedFace("ballots")}
          style={[
            styles.actionButton,
            { opacity: day.settings.feedface === "ballots" ? 1.0 : 0.5 },
          ]}
        >
          <Image style={styles.icon} source={BallotIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  columnCont: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 30,
    // padding: 10,
  },
  uploadSettingsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderColor: "green",
    // padding:
  },
  slightSplitRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  actionButton: {
    padding: 10,
  },
  icon: {
    height: 25,
    width: 25,
  },
});

export default FeedFaceRow;
