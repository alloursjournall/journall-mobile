// top level imports
import React, { useState } from "react";

// @reduxjs/toolkit:
import { RootState } from "redux/store/rootReducer";
import { useSelector } from "react-redux";

import { Dimensions, View, StyleSheet } from "react-native";
import UploadEvent from "@/components/Content/Events/UploadEvent/UploadEvent";
import Event from "@/components/Content/Events/Event/Event";
import EventPreview from "./EventPreview";
import { LinearGradient } from "expo-linear-gradient";

// utils:
import { hothazel, grayphite } from "@/constants/Colors";

// utils:

interface props {
  events: any;
  setEvents: any;
  nextEvent: any;
  setNextEvent: any;
  selectedEvent: any;
  setSelectedEvent: any;
  soundComments: any;
  setSoundComments: any;
  allUserProfileIcons: any;
}

const screenWidth = Dimensions.get("window").width;

const EventsList: React.FC<props> = ({
  events,
  setEvents,
  nextEvent,
  setNextEvent,
  selectedEvent,
  setSelectedEvent,
  soundComments,
  setSoundComments,
  allUserProfileIcons,
}) => {
  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );
  const CURR_PROFILE = useSelector(
    (state: RootState) => state.profile.CURR_PROFILE
  );
  const [isAddingEvent, setIsAddingEvent] = useState(false);

  // notifications and check type === "chill" if it gets approved it becomes an event even if the event doesn't happen.

  const test = () => {
    // console.log('selectedEventObj', selectedEventObj)
  };

  const [editOrUpdateEvent, setEditOrUpdateEvent] = useState<any>({
    id: null, // number
    hosting_user_id: null, // number
    hosting_username: null, // String?
    hosting_user_profile_icon: null, // String?
    invited_user_id: null, // Int?      // chill fields. the receiving user is the invited user. not relevant during plain "ADD EVENT" but would be in edit if it applies.
    invited_username: null, // string
    invited_user_profile_icon: null, // String?
    icon: null, // string
    location_id: null, // number?      // could be linked to a location. location:events 1:M
    location_text: null, //  string?   // denormalized for quicker rendering
    category_id: null, //       Int?
    category_text: null, //    String?   // non-association denormalized for quicker rendering
    event_name: null, // String?
    event_or_activity: null, // string? // activities are private by default.
    public_event: true, // bool
    invite_only: false, // boolean
    start_date: null, //        String?
    start_time: null, //   String?
    end_date: null, //          String?
    end_time: null, //          String?
    lock: null, //              String?
    unlock: null, //            String?
    description: null, //       String?     // notes
    rules: null, //             String[]    // {emergency} i.e. COD: 'no camping',
    outcome: null, //           String[]    // finishFlags i.e. "stephanie wins!", "rave was fun, ppl kept it clean, many photographers
    address: null, //           String?     // could be an e-event or xbox live event or something
    likes_or_stars: "likes", //    String?     //
    stars_show_avg: true, //    Boolean?    // ooo also considered denormalizing stars
    stars_avg: null, //         Int?
    show_attendance: true, //   Boolean?
    //                shareable: false //         Boolean // non invited hosts can invite people
    stars_show_users: true, //  Boolean?

    //                 non_anonymous: null, //     String?    // maybe but for now no.
    commenter_can_determine: true, // Boolean
    text_comments_ok: true, //   Boolean
    voice_comments_ok: true, //  Boolean
    anonymous_comments_ok: true, // Boolean
    comment_locks_ok: true, //   Boolean?
    starrable: "yes", //          String
    thoughts_ok: "yes", //        String
    is_happening: false, //       Boolean?   // auto false other user initiates req "chill" so those events aren't public. also creates eventattendance
    is_chill_event: false, //     Boolean?
    is_archived: false, //        Boolean?     // for user memories so they don't delete record of the event.
    is_nsfw: false, //            Boolean?
  });

  return isAddingEvent ? (
    <UploadEvent
      event={editOrUpdateEvent}
      setEvent={setEditOrUpdateEvent}
      events={events}
      setEvents={setEvents}
      soundComments={soundComments}
      setSoundComments={setSoundComments}
      allUserProfileIcons={allUserProfileIcons}
    />
  ) : // <Text> ayoo </Text>
  selectedEvent?.id ? (
    <Event
      eventId={selectedEvent?.id}
      event={selectedEvent}
      setEvent={setSelectedEvent}
      events={events}
      setEvents={setEvents}
      allUserProfileIcons={allUserProfileIcons}
    />
  ) : (
    <RenderEventsList
      events={events}
      nextEvent={nextEvent}
      selectedEvent={selectedEvent}
      setSelectedEvent={setSelectedEvent}
      isAddingEvent={isAddingEvent}
      setIsAddingEvent={setIsAddingEvent}
    />
  );
};

interface RenderEventsListProps {
  events: any;
  nextEvent: any;
  selectedEvent: any;
  setSelectedEvent: any;
  isAddingEvent: any;
  setIsAddingEvent: any;
}

const RenderEventsList: React.FC<RenderEventsListProps> = ({
  events,
  nextEvent,
  selectedEvent,
  setSelectedEvent,
  isAddingEvent,
  setIsAddingEvent,
}) => {
  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );
  const CURR_PROFILE = useSelector(
    (state: RootState) => state.profile.CURR_PROFILE
  );

  const isCurrentUserProfileUser = CURRENT_USER?.id === CURR_PROFILE?.user_id;

  const test = () => {};

  const addingEventClick = () => {
    setIsAddingEvent(!isAddingEvent);
  };

  return (
    <View style={styles.eventsListCont}>
      <View style={styles.eventListTopBar}>
        <View style={styles.slightSplitRow}>
          <p onClick={test} style={styles.headerTextFun}>
            {" "}
            FUN{" "}
          </p>

          <LinearGradient
            colors={["#f29d21", "#f4c240"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              height: 15,
              width: 15,
              marginHorizontal: 2,
              transform: [{ rotate: "25deg" }],
              borderWidth: 2,
              borderColor: "#e47e25",
              shadowColor: "#4a4a4a",
              shadowOffset: { width: 2, height: 2 },
              shadowOpacity: 0.5,
              shadowRadius: 2,
            }}
          />
        </View>

        {/* event button to create event from profile:  */}

        {isCurrentUserProfileUser && (
          <button onClick={addingEventClick} style={styles.addCommentPlusInput}>
            {" "}
            +{" "}
          </button>
        )}
      </View>

      <>
        {
          // 🚨 🚨 notifications.type === "chill" show the current user awaiting requests!!!

          Array.isArray(events) &&
            events?.map((event, index) => {
              return (
                // condition prevents duplicate rendering of next event which is shown above this in <DataRow/> as:    <DataRowCurrentEvent/>
                event?.id !== nextEvent?.id &&
                ((!isCurrentUserProfileUser &&
                  event?.public_event &&
                  event?.is_happening) ||
                  isCurrentUserProfileUser) && (
                  <EventPreview
                    eventActivity={event}
                    nextEvent={false}
                    selectedEvent={selectedEvent}
                    setSelectedEvent={setSelectedEvent}
                  />
                )
              );
            })
        }
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  eventsListCont: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 10,
    padding: 5,
    boxSizing: "border-box",
  },
  eventListTopBar: {
    padding: 0,
    margin: 0,
    width: screenWidth,
  },
  slightSplitRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  addCommentPlusInput: {
    height: 20,
    width: 20,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: -1,
    borderBottomRightRadius: 11,
    borderWidth: 2,
    borderColor: grayphite,
  },
  addCommentInputText: {
    fontSize: 16,
    fontWeight: 500,
    fontFamily: "Fuzzy Bubbles",
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
  headerTextFun: {
    fontFamily: "Fuzzy Bubbles",
    fontWeight: 400,
    color: hothazel,
    fontSize: 22,
  },
});

export default EventsList;
