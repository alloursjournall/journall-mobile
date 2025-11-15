// top level imports
import React, { useState } from "react";

// @reduxjs/toolkit:
import { RootState } from "redux/store/rootReducer";
import { useSelector } from "react-redux";

import {
  Platform,
  TouchableOpacity,
  Image,
  ScrollView,
  View,
  Text,
  StyleSheet,
} from "react-native";
import IconRow from "./IconRow";
import HostingUsersRow from "./HostingUsersRow";
import InvitingUsersRow from "./InvitingUsersRow";
import EventKeyUpdateModular from "./EventKeyUpdateModular";

// utils:
import { grayphite, grayfight } from "@/constants/Colors";
import { CommentIcon } from "@/constants/Images";

interface props {
  currProfile: any;
  event: any;
  setEvent: any;
}

const UploadEventSettings: React.FC<props> = ({
  currProfile,
  event,
  setEvent,
}) => {
  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );
  const CURR_PROFILE = useSelector(
    (state: RootState) => state.profile.CURR_PROFILE
  );
  const [showCommentSettings, setShowCommentSettings] = useState(false);
  const currentUserIsProfileUser = CURRENT_USER?.id === CURR_PROFILE?.user_id;

  const [test, setTest] = useState<any>({
    id: null, // number

    // hosting_user_id: null,   // number
    // hosting_username: null, // String?
    // hosting_user_profile_icon: null, // String?
    // invited_user_id: null, // Int?      // chill fields. the receiving user is the invited user. not relevant during plain "ADD EVENT" but would be in edit if it applies.
    // invited_username: null, // string
    // invited_user_profile_icon: null, // String?
    // icon: null, // string

    location_id: null, // number?      // could be linked to a location. location:events 1:Md
    location_text: null, //  string?   // denormalized for quicker rendering
    address: null, //           String?     // could be an e-event or xbox live event or something
    category_id: null, //       Int?
    category_text: null, //    String?   // non-association denormalized for quicker rendering
    event_name: null, // String?
    event_or_activity: null, // string? // activities are private by default.
    start_date: null, //        String?
    start_time: null, //   String?
    end_date: null, //          String?
    end_time: null, //          String?
    lock: null, //              String?
    unlock: null, //            String?
    description: null, //       String?     // notes
    // rules: null, //             String[]    // {emergency} i.e. COD: 'no camping',
    outcome: null, //           String[]    // finishFlags i.e. "stephanie wins!", "rave was fun, ppl kept it clean, many photographers
    likes_or_stars: null, //    String?     //
    stars_avg: null, //         Int?
    //                shareable: false //         Boolean // non invited hosts can invite people

    //                 non_anonymous: null, //     String?    // maybe but for now no.
    invite_only: false, // boolean
    public_event: true, // bool
    stars_show_users: true, //  Boolean?
    stars_show_avg: true, //    Boolean?    // ooo also considered denormalizing stars
    commenter_can_determine: true, // Boolean
    text_comments_ok: true, //   Boolean
    voice_comments_ok: true, //  Boolean
    anonymous_comments_ok: true, // Boolean
    comment_locks_ok: true, //   Boolean?
    starrable: "yes", //          String
    thoughts_ok: "yes", //        String
    show_attendance: false, //   Boolean?
    is_happening: false, //       Boolean?   // auto false other user initiates req "chill" so those events aren't public. also creates eventattendance
    is_chill_event: false, //     Boolean?
    is_archived: false, //        Boolean?     // for user memories so they don't delete record of the event.
    is_nsfw: false, //            Boolean?
  });

  const showCommentSettingsClick = () => {
    setShowCommentSettings(!showCommentSettings);
  };

  return (
    <ScrollView contentContainerStyle={styles.settingsColumns}>
      {/* <View style={styles.settingsRow}></View> */}

      <IconRow event={event} setEvent={setEvent} />
      {event?.hosting_user_id ||
        (currentUserIsProfileUser && (
          <HostingUsersRow eventOrActivity={event} setEvent={setEvent} />
        ))}
      {event?.inviting_user_id && (
        <InvitingUsersRow event={event} setEvent={setEvent} />
      )}

      {/* <EventKeyUpdateModular objKey={"thoughts_ok"} objKeyType={"string"} eventOrActivity={event} setEvent={setEvent} /> */}

      <EventKeyUpdateModular
        objKey={"event_name"}
        objKeyType={"string"}
        eventOrActivity={event}
        setEvent={setEvent}
      />
      <EventKeyUpdateModular
        objKey={"description"}
        objKeyType={"string"}
        eventOrActivity={event}
        setEvent={setEvent}
      />
      {/* 🚨 🚨 event_or_activity a "string" but toggled "like" "stars" so more like boolaen. custom component.  */}
      {/* 🚨 🚨 starrable  */}
      {/* 🚨 🚨 thoughts_ok  */}
      <ThoughtsOkCheckboxRow
        eventOrActivity={event}
        setEvent={setEvent}
        objKey={"thoughts_ok"}
      />
      <EventKeyUpdateModular
        objKey={"likes_or_stars"}
        objKeyType={"string"}
        eventOrActivity={event}
        setEvent={setEvent}
      />
      <EventKeyUpdateModular
        objKey={"location_text"}
        objKeyType={"string"}
        eventOrActivity={event}
        setEvent={setEvent}
      />
      <EventKeyUpdateModular
        objKey={"address"}
        objKeyType={"string"}
        eventOrActivity={event}
        setEvent={setEvent}
      />
      <EventKeyUpdateModular
        objKey={"category_text"}
        objKeyType={"string"}
        eventOrActivity={event}
        setEvent={setEvent}
      />
      <EventKeyUpdateModular
        objKey={"start_date"}
        objKeyType={"string"}
        eventOrActivity={event}
        setEvent={setEvent}
      />
      <EventKeyUpdateModular
        objKey={"start_time"}
        objKeyType={"string"}
        eventOrActivity={event}
        setEvent={setEvent}
      />
      <EventKeyUpdateModular
        objKey={"end_date"}
        objKeyType={"string"}
        eventOrActivity={event}
        setEvent={setEvent}
      />
      <EventKeyUpdateModular
        objKey={"end_time"}
        objKeyType={"string"}
        eventOrActivity={event}
        setEvent={setEvent}
      />
      <EventKeyUpdateModular
        objKey={"outcome"}
        objKeyType={"string"}
        eventOrActivity={event}
        setEvent={setEvent}
      />
      <EventKeyUpdateModular
        objKey={"show_attendance"}
        objKeyType={"boolean"}
        eventOrActivity={event}
        setEvent={setEvent}
      />
      <EventKeyUpdateModular
        objKey={"is_happening"}
        objKeyType={"boolean"}
        eventOrActivity={event}
        setEvent={setEvent}
      />
      <EventKeyUpdateModular
        objKey={"is_chill_event"}
        objKeyType={"boolean"}
        eventOrActivity={event}
        setEvent={setEvent}
      />
      {/* 🚨 🚨  lock     handled on bottom with lock icon. */}
      {/* 🚨 🚨  unlock   */}

      <View style={styles.settingsRow}>
        <Text style={styles.headerText}> COMMENT SETTINGS </Text>

        <TouchableOpacity onPress={showCommentSettingsClick}>
          <Text style={styles.captionText}> &darr; </Text>
        </TouchableOpacity>
      </View>

      {showCommentSettings && (
        <>
          <EventKeyUpdateModular
            objKey={"voice_comments_ok"}
            objKeyType={"boolean"}
            eventOrActivity={event}
            setEvent={setEvent}
          />
          <EventKeyUpdateModular
            objKey={"text_comments_ok"}
            objKeyType={"boolean"}
            eventOrActivity={event}
            setEvent={setEvent}
          />
          <EventKeyUpdateModular
            objKey={"public_event"}
            objKeyType={"boolean"}
            eventOrActivity={event}
            setEvent={setEvent}
          />
          <EventKeyUpdateModular
            objKey={"stars_show_avg"}
            objKeyType={"boolean"}
            eventOrActivity={event}
            setEvent={setEvent}
          />
          <EventKeyUpdateModular
            objKey={"stars_show_users"}
            objKeyType={"boolean"}
            eventOrActivity={event}
            setEvent={setEvent}
          />
          <EventKeyUpdateModular
            objKey={"commenter_can_determine"}
            objKeyType={"boolean"}
            eventOrActivity={event}
            setEvent={setEvent}
          />
          <EventKeyUpdateModular
            objKey={"anonymous_comments_ok"}
            objKeyType={"boolean"}
            eventOrActivity={event}
            setEvent={setEvent}
          />
          <EventKeyUpdateModular
            objKey={"comment_locks_ok"}
            objKeyType={"boolean"}
            eventOrActivity={event}
            setEvent={setEvent}
          />
        </>
      )}
    </ScrollView>
  );
};

interface ThoughtsOkCheckboxRowProps {
  eventOrActivity: any;
  setEvent: any;
  objKey: string;
}

const ThoughtsOkCheckboxRow: React.FC<ThoughtsOkCheckboxRowProps> = ({
  eventOrActivity,
  setEvent,
  objKey,
}) => {
  const toggleThoughtsOkCheckbox = () => {
    let clone = { ...eventOrActivity };
    console.log("clone", clone);
    if (
      clone?.thoughts_ok === "no" ||
      clone?.thoughts_ok === "" ||
      clone?.thoughts_ok === null
    ) {
      console.log("=== no");
      clone.thoughts_ok = "yes";
      setEvent(clone);
    } else {
      console.log("YES block thats the S block!");
      clone.thoughts_ok = "no";
      setEvent(clone);
    }
  };

  const test = () => {
    return;
  };

  return (
    <View style={styles.settingsRow}>
      <View style={styles.slightSplitRow}>
        <Image style={styles.icons} source={CommentIcon} />
        <Text style={styles.captionText}> comments ok </Text>
      </View>

      <TouchableOpacity
        // checked={(indexBoxChecked || lockUpdater?.fields?.includes(objKey) || lockUpdater?.fields === index?.toString() && itemIndex?.display === "whole field")}
        style={[
          {
            backgroundColor:
              eventOrActivity?.thoughts_ok !== "no" ? "grey" : "",
          },
          styles.button,
        ]}
        onPress={toggleThoughtsOkCheckbox}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  settingsColumns: {
    flexDirection: "column",
    justifyContent: "flex-start",
    margin: 0,
    marginTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },

  settingsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "auto",
    width: "100%",
    paddingVertical: 4,
    paddingHorizontal: 8,
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
  icons: {
    height: 50,
    width: 50,
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
});

export default UploadEventSettings;
