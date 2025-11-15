// top level imports
import axios from "axios";
import React from "react";

// @reduxjs/toolkit:
import { RootState } from "redux/store/rootReducer";
import { useSelector } from "react-redux";

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
import GoingToEventStatus from "./GoingToEventStatus";

// utils:
import { hothazel, grayphite, grayfight } from "@/constants/Colors";
import { PindropBlackIcon, PartyFlagsIcon } from "@/constants/Images";

// utils:

interface props {
  // currProfile: any,
  event: any;
  setEvent: any;
  events: any;
  setEvents: any;
}

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const EventHome: React.FC<props> = ({
  // currProfile,
  event,
  setEvent,
  events,
  setEvents,
}) => {
  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );

  const test = () => {
    console.log("hey how are you guys");
    console.log("event", event);
  };
  const viewProfile = () => {};

  return (
    <View style={styles.outerEventCont}>
      <ScrollView contentContainerStyle={[styles.eventCont, { flexGrow: 1 }]}>
        <Image
          style={styles.iconWallpaper}
          source={
            event?.icon && event?.icon !== "error"
              ? event?.icon
              : PartyFlagsIcon
          }
        />

        <View style={styles.eventNameCont}>
          <Text style={styles.eventNameText}>{event?.event_name}</Text>
          <TouchableOpacity onPress={viewProfile}>
            <Text style={styles.hostingUsernameText}>
              {event?.hosting_username}
            </Text>
          </TouchableOpacity>
        </View>

        {(event?.location_text || event?.location_id) && (
          <View style={styles.slightSplitRow}>
            <Image style={styles.iconTiny} source={PindropBlackIcon} />
            <Text style={styles.headerText}>{event?.location_text}</Text>
          </View>
        )}

        <View style={styles.dateCont}>
          <View style={styles.slightSplitRow}>
            <Text style={styles.captionText}>{event?.start_date}</Text>
            <Text style={styles.captionText}>{event?.start_time}</Text>
          </View>

          <Text style={styles.captionText}>&gt;</Text>

          <View style={styles.slightSplitRow}>
            <Text style={styles.captionText}>{event?.end_date}</Text>
            <Text style={styles.captionText}>{event?.end_time}</Text>
          </View>
        </View>

        {/* Description with ScrollView */}
        <ScrollView
          contentContainerStyle={[styles.eventDescriptionCont, { flexGrow: 1 }]}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.captionText}>{event?.description}</Text>
        </ScrollView>

        {(event?.public_event ||
          CURRENT_USER?.id === event?.invited_user_id ||
          CURRENT_USER?.id === event?.hosted_user_id) && (
          <GoingToEventStatus
            event={event}
            setEvent={setEvent}
            events={events}
            setEvents={setEvents}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  outerEventCont: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: screenWidth,
  },

  eventCont: {
    height: screenHeight / 2,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
    padding: 5,
    // height: '100%',
    boxSizing: "border-box",
    // overflowY: 'auto',
  },

  iconWallpaper: {
    width: "100%",
    height: "30%",
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
    fontWeight: 400,
    fontFamily: "Fuzzy Bubbles",
    lineHeight: 1,
  },
  captionText: {
    color: grayfight,
    fontSize: 20,
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif",
    lineHeight: 1,
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
  iconTiny: {
    height: 25,
    width: 25,
  },
});

export default EventHome;
