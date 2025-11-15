import axios from "axios";
import { useState, useEffect } from "react";

// redux
import { RootState } from "@/redux/store/rootReducer";
import { useSelector, useDispatch, createDispatchHook } from "react-redux";
import {
  SET_CURR_PROFILE,
  SET_PROFILE_USER_PRIVACY,
} from "@/redux/profile/profileSlice";

import {
  Platform,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { VideoPlayer } from "@/components/Content/Day/DayDisplays/Moments/VideoPlayer";

// utils:
import { grayphite, grayfight } from "@/constants/Colors";
import { SoundWaveIcon } from "@/constants/Images";
import { useContentFunction } from "@/Contexts/ContentFunctions";

interface props {
  clickCont: any;
  post: any;
  allUserProfileIcons: any;
}

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const ProfilePost: React.FC<props> = ({
  clickCont,
  post,
  allUserProfileIcons,
}) => {
  const ALL_USERS_ICONS = useSelector(
    (state: RootState) => state.app.ALL_USERS_ICONS
  );
  const feedface: string = post?.feedface || "";
  const thoughts = Array.isArray(post?.thoughts) && post?.thoughts;
  const postingUserThoughts =
    Array.isArray(thoughts) &&
    thoughts?.find((thoughts) => thoughts?.thoughts?.length >= 1);
  const { returnProfileImg } = useContentFunction();

  const test = () => {
    console.log("post", post);
  };

  function ShowThoughts() {
    const t = postingUserThoughts?.thoughts;
    const firstThought = t[0] || t[1] || t[2];

    return (
      <TouchableOpacity onPress={() => clickCont(post)}>
        <View style={styles.centerColumnCont}>
          {firstThought?.includes("-") ? (
            <Image style={styles.iconBig} source={SoundWaveIcon} />
          ) : (
            <Text style={styles.profilePostText}>
              {" "}
              {firstThought || "the oughts"}{" "}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  }

  function ShowMoments() {
    const m = post?.moments;
    const momentBlobs = Array.isArray(m?.blobs) && m?.blobs;
    const mediaTags = Array.isArray(m?.media_tags_array) && m?.media_tags_array;

    const firstMediaTag = mediaTags[0];
    const firstMomentMedia = momentBlobs[0] || null;

    const { returnProfileImg } = useContentFunction();

    const test = () => {
      console.log("m", m);
      console.log("firstMomentMedia", firstMomentMedia);
    };

    // const VideoPlayer = ({ uri }: { uri: string }) => {
    //     return (
    //         <View style={styles.momentContainer}>
    //             {Platform.OS === 'web' ? (
    //                 <ReactPlayer url={uri} controls style={styles.momentCenterCont} />
    //             ) : (
    //                 // <ReactPlayer url={uri} controls width="100%" height="300px" />
    //                 <Video source={{ uri: uri }} style={styles.momentCenterCont} controls resizeMode="contain" />
    //             )}
    //         </View>
    //     );
    // };

    return (
      <View>
        {firstMediaTag?.includes("*images*") ? (
          <Image
            style={styles.profilePostMediaBackground}
            source={firstMomentMedia}
          />
        ) : (
          firstMediaTag?.includes("*videos*") && (
            <VideoPlayer uri={firstMomentMedia} />
          )
        )}
        {/* <p onClick={test}> show dat </p> */}
      </View>
    );
  }

  function ShowFields() {
    const fields = post?.fields;
    const fieldActivities: string[] =
      Array.isArray(fields?.fields) && fields?.fields;
    const fieldText: string[] = Array.isArray(fields?.text) && fields?.text;

    return (
      <View style={styles.centerColumnCont}>
        <Text style={styles.profilePostFieldsHeader}>
          {" "}
          {fieldActivities[0] || fieldText[0]}{" "}
        </Text>
      </View>
    );
  }

  function ShowGreatfull() {
    const greatfull = post?.greatfullagain;
    const greatfullItems =
      Array.isArray(greatfull?.greatfull) && greatfull?.greatfull;
    const stringWords =
      Array.isArray(greatfull?.words) && greatfull?.words.join(", ");

    const test = () => {
      console.log("post", post);
      console.log("greatfull", greatfull);
    };

    return (
      <View style={styles.centerColumnCont}>
        <Text style={styles.profilePostText}>
          {" "}
          {greatfullItems[0] ||
            stringWords ||
            greatfullItems[0] ||
            greatfull.question ||
            greatfull.concern ||
            greatfull.criticism ||
            greatfull.zoom_in ||
            greatfull.zoom_out}{" "}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.profilePost}>
      {feedface === "thoughts" ? (
        <ShowThoughts />
      ) : feedface === "moments" ? (
        <ShowMoments />
      ) : feedface === "fields" ? (
        <ShowFields />
      ) : feedface === "greatfull" ? (
        <ShowGreatfull />
      ) : (
        <Image
          style={styles.iconBig}
          source={{ uri: returnProfileImg(post?.user_id, allUserProfileIcons) }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  centerColumnCont: {
    flexDirection: "column",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  iconBig: {
    height: 175,
    width: 175,
  },

  profilePost: {
    width: screenWidth / 3,
    height: screenHeight / 5,
    justifyContent: "center",
    alignItems: "center",
    // width: '30%',
    borderWidth: 2,
    borderColor: grayphite,
  },

  profilePostText: {
    fontSize: 20,
    fontFamily: "Fuzzy Bubbles",
    fontWeight: 400,
    color: grayphite,
  },
  profilePostMediaBackground: {
    height: "100%",
    width: "100%",
  },
  momentContainer: {
    gap: 5,
    // padding: 10,
    justifyContent: "flex-start",
    alignItems: "center",
  },

  momentCenterCont: {
    flex: 1, // Allow this to take remaining space
    height: screenHeight * 0.325,
    width: "100%",
    justifyContent: "center", // Center the content vertically
    alignItems: "center",
  },

  profilePostFieldsHeader: {
    backgroundColor: "white",
    margin: 0,
    padding: 10,
    lineHeight: 1,
    fontSize: 46,
    borderBottomRightRadius: 105,
    borderBottomLeftRadius: 105,
    // For fuzzyGrayphiteText, define it in a similar way using React Native styles
    color: "gray", // assuming fuzzyGrayphiteText is a grayish color (you can replace this with the actual value)
  },
});

export default ProfilePost;
