// top level imports
import React from "react";

// @reduxjs/toolkit:
import { RootState } from "redux/store/rootReducer";
import { useSelector } from "react-redux";

import {
  Platform,
  TouchableOpacity,
  Image,
  View,
  Text,
  StyleSheet,
} from "react-native";
// import GoingToEventStatus from '../../Event/GoingToEventStatus';

// utils:
import { hothazel, grayphite } from "@/constants/Colors";
import { PindropBlackIcon, PartyFlagsIcon } from "@/constants/Images";

interface props {
  event: any;
  setEvent: any;
  events: any;
  setEvents: any;
}

const UploadEventHome: React.FC<props> = ({
  event,
  setEvent,
  events,
  setEvents,
}) => {
  // const { redBackArrow, stagelight, partyFlags, pindropBlack, commentThoughtBg, user, home } = useImage();

  const test = () => {
    console.log("hey how are you guys");
    console.log("event", event);
  };
  const viewProfile = () => {};

  return (
    <>
      <Image
        style={styles.iconWallpaper}
        source={
          event?.icon && event?.icon !== "error" ? event?.icon : PartyFlagsIcon
        }
      />

      <View style={styles.eventNameCont}>
        <Text style={styles.eventNameText}> {event?.event_name} </Text>

        <TouchableOpacity onPress={viewProfile}>
          <Text style={styles.hostingUsernameText}>
            {" "}
            {event?.hosting_username}{" "}
          </Text>
        </TouchableOpacity>
      </View>

      {(event?.location_text || event?.location_id) && (
        <View style={styles.slightSplitRow}>
          <Image style={styles.icons} source={PindropBlackIcon} />
          <Text style={styles.headerText}> {event?.location_text} </Text>
        </View>
      )}

      <View style={styles.dateCont}>
        <View style={styles.slightSplitRow}>
          <Text style={styles.captionText}> {event?.start_date} </Text>
          <Text style={styles.captionText}> {event?.start_time} </Text>
        </View>

        <Text style={styles.captionText}> &gt; </Text>

        <View style={styles.slightSplitRow}>
          <Text style={styles.captionText}> {event?.end_date} </Text>
          <Text style={styles.captionText}> {event?.end_time} </Text>
        </View>
      </View>

      <View style={styles.eventDescriptionCont}>
        <Text style={styles.captionText}> {event?.description} </Text>
      </View>

      {/* {
                (event?.public_event || CURRENT_USER?.id === event?.invited_user_id || CURRENT_USER?.id === event?.hosted_user_id) &&
                <GoingToEventStatus event={event} setEvent={setEvent} events={events} setEvents={setEvents} />
            } */}
    </>
  );
};

const styles = StyleSheet.create({
  eventCont: {
    flexDirection: "column",
    justifyContent: "flex-start",
    // justifyContent: 'center',
    alignItems: "center",
    gap: 10,
    padding: 5,
  },

  iconWallpaper: {
    width: "100%",
    height: "10%",
    margin: 0,
    padding: 0,
  },
  eventNameCont: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 20,
    borderBottomWidth: 1,
    borderBottomColor: grayphite,
    borderStyle: "dotted",
    paddingLeft: 10,
    paddingTop: 2.5,
    paddingBottom: 2.5,
  },

  eventNameText: {
    color: hothazel,
    fontSize: 20,
    fontFamily: "Fuzzy Bubbles",
    // fontFamily: Platform.OS === "ios" ? "System" : "sans-serif",
  },

  headerText: {
    color: grayphite,
    fontSize: 20,
    fontFamily: "Fuzzy Bubbles",
  },

  captionText: {
    color: grayphite,
    fontSize: 20,
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif",
  },

  hostingUsernameText: {},

  dateCont: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },

  eventDescriptionCont: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  slightSplitRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  icons: {
    height: 50,
    width: 50,
  },

  iconMini: {
    height: 35,
    width: 35,
  },
});

export default UploadEventHome;
