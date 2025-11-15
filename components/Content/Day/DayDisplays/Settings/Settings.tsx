import axios from "axios";
import { useState } from "react";
import { useRouter } from "expo-router";

import React from "react";
import { RootState } from "@/redux/store/rootReducer";
import { useSelector, useDispatch } from "react-redux";

// <>
import {
  Dimensions,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

// images, colors
import {
  FollowerIcon,
  BlockUserIcon,
  EarbudsIcon,
  refreshArrowsIcon,
  CommentIcon,
  BallotIcon,
} from "@/constants/Images";
import { grayphite, appBackground, hothazel } from "@/constants/Colors";

// utils:
import { API } from "@env";
import {
  deleteFolderQueryStringFunc,
  deletePostQueryStringFunc,
} from "@/graphql/queries";
import { useContentFunction } from "@/Contexts/ContentFunctions";
import { getToday } from "@/utility/utilityValues";
import SetFeedTool from "@/components/Feed/SetFeedTool";

interface props {
  day: any;
  followers: any;
  setFollowers: any;
  blocks: any;
  setBlocks: any;
  listeners: any;
  setListeners: any;
  privacySettings: any;
  feed: any;
  setFeed: any;
  setComments: any;
  setSoundComments: any;

  ballotBin: any;
  ballotBinIndex: number;
  setBallotBin: any;
  setCurrVotes: any;
  setBallotOptionsLikes: any;
  setBallotOptionsStars: any;
}

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const DaySettings: React.FC<props> = ({
  day,
  followers,
  setFollowers,
  blocks,
  setBlocks,
  listeners,
  setListeners,
  privacySettings,
  feed,
  setFeed,
  setComments,
  setSoundComments,
  ballotBin,
  ballotBinIndex,
  setBallotBin,
  setCurrVotes,
  setBallotOptionsLikes,
  setBallotOptionsStars,
}) => {
  const {
    addFollower,
    deleteFollower,
    addBlockedUser,
    deleteBlockedUser,
    dayListenersAddFunc,
    dayListenersDeleteFunc,
    notificationMaker,
    refreshDayFunc,
    mediaCommentsFunc,
    refreshCommentsFunc,
    refreshBallotsFunc,
  } = useContentFunction();

  const router = useRouter();
  // const { API } = Constants?.easConfig.extra || 'http://localhost:4000/api/graphql';
  const predataString = API || "http://localhost:4000/api/graphql";
  const currBallot = ballotBin[ballotBinIndex];

  const test = () => {
    console.log("test", test);
  };

  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );

  const [preDeleteClick, setPreDeleteCLick] = useState(false);

  const iFollowThem = followers?.some(
    (f: any) =>
      f?.user_id === day?.user_id && f?.follower_id === CURRENT_USER?.id
  );
  const iBlockThem = blocks?.some(
    (b: any) =>
      b?.blocked_id === day?.user_id && b?.user_id === CURRENT_USER?.id
  );
  const iListenToDay = listeners?.some(
    (l: any) => l?.user_id === CURRENT_USER?.id
  );

  // const iFollowThem: (string | null) = day?.currentUserSeeContent?.iFollowThem;
  const doWeBlockEachOther: string | null =
    day?.currentUserSeeContent?.doWeBlockEachOther;

  const iFollowThemToggler = async () => {
    if (iFollowThem) {
      const followersAfterDelete = await deleteFollower(
        day?.user_id,
        CURRENT_USER?.id
      );
      setFollowers(followersAfterDelete);
      // deleteFollower()
    } else {
      if (privacySettings?.private_acct) {
        const date = getToday("en")?.date;

        const noteObj = {
          date: date,
          from_user_id: CURRENT_USER?.id,
          from_username: CURRENT_USER?.username,
          for_user_id: day?.user_id || null,
          from_app: false,
          day_id: day?.id,
          day_icon: day?.day_icon || null,
          thought_id: null,
          moment_id: null,
          field_id: null,
          invite_id: null,
          listener_id: null,
          share_Id: null,
          like_id: null,
          star_id: null,
          reaction_id: null,
          vibe_id: null,
          payment_id: null,
          prank_id: null,
          feedgame_id: null,
          message_id: null,
          report_id: null,
          user_pass_lock_id: null,
          user_allowed_to_unlock_id: null,
          ballot_id: null,
          custom_notification: null,
          is_read: false,
          is_request: false,
          type: "friend request",
        };
        const stringedNotification = JSON.stringify(noteObj);
        const notes = await notificationMaker(
          CURRENT_USER?.id,
          stringedNotification
        );

        return;
      }
      const followersAfterFollowingPostingUser = await addFollower(
        day?.user_id,
        CURRENT_USER?.id
      );
      setFollowers(followersAfterFollowingPostingUser);
    }
  };

  const iBlockThemToggler = () => {
    if (iBlockThem) {
      const followersAfterDelete = deleteBlockedUser(
        day?.user_id,
        CURRENT_USER?.id
      );
      setFollowers(followersAfterDelete);
      // deleteFollower()
    } else {
      const followersAfterDelete = addBlockedUser(
        day?.user_id,
        CURRENT_USER?.id
      );
      setFollowers(followersAfterDelete);
    }
  };

  const iListenToDayToggler = () => {
    if (iListenToDay) {
      const listenersAfterDelete = dayListenersDeleteFunc(
        day?.id,
        CURRENT_USER?.id,
        setListeners
      );
      setFollowers(listenersAfterDelete);
    } else {
      const listenersAfterDelete = dayListenersAddFunc(
        day?.id,
        CURRENT_USER?.id,
        setListeners
      );
      setFollowers(listenersAfterDelete);
    }
  };

  const deletePost = async () => {
    console.log("apparently deleting the post you heard!");
    if (!preDeleteClick) {
      setPreDeleteCLick(true);
    } else {
      console.log("we finna delete a post");
      const deleteFolderQuery = deleteFolderQueryStringFunc(
        `media/day-${day?.id}-folder`
      );
      const deletePostQuery = deletePostQueryStringFunc(day?.id);

      const predata: any = await axios.post(predataString, {
        query: deleteFolderQuery,
      });
      console.log("predata", predata);
      // const predata: any = await axios.post("http://localhost:4000/api/graphql", { query: query })
      if (!predata) {
        return null;
      }
      let data = predata?.data?.data?.deleteFolder;
      if (!data) {
        return null;
      }

      const predataFolder: any = await axios.post(predataString, {
        query: deletePostQuery,
      });
      // const predata: any = await axios.post("http://localhost:4000/api/graphql", { query: query })
      if (!predataFolder) {
        return null;
      }

      let dataFolder = predata?.data?.data?.deleteFolder;
      console.log("dataFolder", dataFolder);

      if (!data) {
        return null;
      }
      await router.push(`/main`);

      // delete folder and delete post!
    }
  };

  const goBack = () => {
    setPreDeleteCLick(false);
  };

  const refreshDay = async () => {
    refreshDayFunc(day, feed, setFeed);
  };

  const refreshComments = async () => {
    await refreshCommentsFunc(day?.id, setComments);
    await mediaCommentsFunc(day, setSoundComments);
  };

  const refreshBallots = async () => {
    await refreshBallotsFunc(
      day?.id,
      currBallot,
      ballotBin,
      setBallotBin,
      setCurrVotes,
      setBallotOptionsLikes,
      setBallotOptionsStars
    );
  };

  return (
    // add, block, report, listen

    // preDelete ? swipe and clear preDelete. If no Predelete then back to <Main>
    <View style={styles.settingsCont}>
      {day?.title && (
        <View style={styles.settingsRow}>
          <Text style={styles.settingsRowText}> {day?.title} </Text>
        </View>
      )}

      {day?.username && (
        <View style={styles.settingsRow}>
          <Text style={[styles.settingsRowText, { color: hothazel }]}>
            {" "}
            {day?.username}{" "}
          </Text>
        </View>
      )}

      {CURRENT_USER?.id === day?.user_id && (
        <View style={styles.settingsRow}>
          <Text style={[styles.addCommentInputText, { color: "#EF4444" }]}>
            {" "}
            {preDeleteClick ? "PERMANENT CAN'T UNDO" : "DELETE THIS ENTRY"}{" "}
          </Text>

          {preDeleteClick && (
            <TouchableOpacity onPress={goBack} style={styles.arrowCont}>
              <Text style={[styles.addCommentInputText, { fontSize: 50 }]}>
                {" "}
                &larr;{" "}
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={deletePost}
            style={styles.addCommentPlusInput}
          >
            <Text
              style={[
                styles.addCommentInputText,
                { backgroundColor: "#EF4444" },
              ]}
            >
              {" "}
              X{" "}
            </Text>
          </TouchableOpacity>

          <Text style={styles.ghost}> </Text>
        </View>
      )}

      {CURRENT_USER?.id !== day?.user_id && (
        <View style={styles.settingsCont}>
          <View style={styles.settingsRow}>
            <View style={styles.slightSplitRow}>
              <TouchableOpacity onPress={test}>
                <Text style={styles.settingsRowText}> follow </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={iFollowThemToggler}>
                <Image
                  style={[
                    { opacity: iFollowThem ? 1.0 : 0.5 },
                    styles.iconMini,
                  ]}
                  source={FollowerIcon}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.settingsRow}>
            <View style={styles.slightSplitRow}>
              <Text style={styles.settingsRowText}> block </Text>
              <TouchableOpacity onPress={iBlockThemToggler}>
                <Image style={styles.iconMini} source={BlockUserIcon} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.settingsRow}>
            <View style={styles.slightSplitRow}>
              <Text style={styles.settingsRowText}> listen updates </Text>
              <TouchableOpacity onPress={iListenToDayToggler}>
                <Image style={styles.iconMini} source={EarbudsIcon} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.settingsRow}>
            <Text style={styles.settingsRowText}> refresh day : </Text>
            <TouchableOpacity onPress={refreshDay}>
              <Image style={styles.iconMini} source={refreshArrowsIcon} />
            </TouchableOpacity>
          </View>

          <View style={styles.settingsRow}>
            <View style={styles.slightSplitRow}>
              <Text style={styles.settingsRowText}> refresh comments : </Text>
              <Image style={styles.iconMini} source={CommentIcon} />
            </View>

            <TouchableOpacity onPress={refreshComments}>
              <Image style={styles.iconMini} source={refreshArrowsIcon} />
            </TouchableOpacity>
          </View>

          <View style={styles.settingsRow}>
            <View style={styles.slightSplitRow}>
              <Text style={styles.settingsRowText}> refresh ballots : </Text>
              <Image style={styles.iconMini} source={BallotIcon} />
            </View>

            <TouchableOpacity onPress={refreshBallots}>
              <Image style={styles.iconMini} source={refreshArrowsIcon} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const ScrollingUserSettings = () => {
  // block user
};

const styles = StyleSheet.create({
  settingsCont: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 20,
    minHeight: screenHeight / 3,
    marginTop: 10,
  },
  columnCont: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 5,
  },
  settingsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 10,
  },
  slightSplitRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
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
  text: {
    fontFamily: "Fuzzy Bubbles",
    fontSize: 24,
    width: "100%",
    paddingLeft: 5,
    color: grayphite,
    // boxSizing: 'border-box',
  },
  container: {
    gap: 5,
    // padding: 10,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  centerCont: {
    flex: 1, // Allow this to take remaining space
    height: screenHeight * 0.325,
    width: "100%",
    justifyContent: "center", // Center the content vertically
    alignItems: "center",
  },
  addCommentPlusInput: {
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 14,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: -1,
    borderBottomRightRadius: 11,
    borderWidth: 2,
    borderColor: grayphite,
    // backgroundColor: appBackground,
  },
  addCommentInputText: {
    fontSize: 20,
    fontWeight: "500",
    fontFamily: "Fuzzy Bubbles",
    color: grayphite,
  },
  arrowCont: {
    padding: 10,
  },
});

export default DaySettings;
