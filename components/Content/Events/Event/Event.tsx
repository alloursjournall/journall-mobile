// top level imports
import React, { useState, useEffect } from "react";

// @reduxjs/toolkit:
import { useDispatch } from "react-redux";

import { TouchableOpacity, Image, View, Text, StyleSheet } from "react-native";
import EventHome from "./EventHome";
import EventAttendance from "./EventAttendance";
import EventComments from "./EventComments/EventComments";

// utils:
import {
  SettingsIcon,
  HomeIcon,
  UserIcon,
  CommentIcon,
  BallotIcon,
} from "@/constants/Images";

interface props {
  eventId: number;
  event: any;
  setEvent: any;
  events: any;
  setEvents: any;
  allUserProfileIcons: any;
}

const Event: React.FC<props> = ({
  eventId,
  event,
  setEvent,
  events,
  setEvents,
  allUserProfileIcons,
}) => {
  const dispatch = useDispatch();

  // considering redux or not with the icons, why not just keep them as local state?

  const [usersPassLocks, setUsersPassLocks] = useState(
    (Array.isArray(event?.userspasslocks) && event?.userspasslocks) || null
  );
  // 🚨 🚨 there is no usersAllowedToUnlock so far that's okay!
  const [usersAllowedToUnlock, setUsersAllowedToUnlock] = useState(
    (Array.isArray(event?.usersallowedtounlock) &&
      event?.usersallowedtounlock) ||
      null
  );

  const [ballotBucket, setBallotBucket] = useState(
    (Array.isArray(event.ballots) && event.ballots) || null
  );

  const [stars, setStars] = useState<any>(null);
  // 🚨
  const [comments, setComments] = useState<any>(null);
  const [commentStars, setCommentStars] = useState<any>(null);

  useEffect(() => {
    console.log("event", event);
    if (event?.id) {
      if (Array.isArray(event?.thought) && event?.thought?.length >= 1) {
        setComments(event?.thoughts);
      }
      const eventBallots =
        (Array.isArray(event?.ballots) && event?.ballots) || null;
      if (!eventBallots) {
        return;
      }
      setEvent(event);
    }

    const eventThoughts =
      (Array.isArray(event?.thought) && event?.thought) || null;
    if (eventThoughts) {
      const doesEventThoughtsHaveStars = eventThoughts?.some(
        (thoughts: any, index: number) =>
          thoughts?.stars?.some((stars: any) => stars.id)
      );

      if (doesEventThoughtsHaveStars) {
        const flattenedStarsForAllThoughts = eventThoughts?.flatMap(
          (thought: any) => thought?.stars || []
        );
        setCommentStars(flattenedStarsForAllThoughts);
        if (flattenedStarsForAllThoughts) {
          // dispatch(SET_CURR_EVENT_STARS(flattenedStarsForAllThoughts))
        }
      }
    }
  }, []);

  const [currentEventPage, setCurrentEventPage] = useState("home");

  const test = () => {
    console.log("events", events);
    console.log("event", event);
  };

  const changePage = (page: string) => {
    setCurrentEventPage(page);
  };

  const ballotClick = () => {
    console.log("event", event);
    // 🚨 🚨 if private vote ->
    setCurrentEventPage("ballot");
  };

  return (
    <View style={styles.eventCont}>
      <View
        style={
          styles.eventCont
          // currentEventPage === "home" ? styles.contentHome :
          //     currentEventPage === "eventattendance" ? styles.contentComment :
          //         currentEventPage === "comment" ? styles.contentComment : styles.contentComment
        }
      >
        {
          currentEventPage === "home" ? (
            <EventHome
              event={event}
              setEvent={setEvent}
              events={events}
              setEvents={setEvents}
            />
          ) : currentEventPage === "comment" ? (
            <EventComments
              event={event}
              usersPassLocks={usersPassLocks}
              setUsersPassLocks={setUsersPassLocks}
              usersAllowedToUnlock={usersAllowedToUnlock}
              setUsersAllowedToUnlock={setUsersAllowedToUnlock}
              comments={comments}
              setComments={setComments}
              commentStars={commentStars}
              setCommentStars={setCommentStars}
              stars={stars}
              setStars={setStars}
              allUserProfileIcons={allUserProfileIcons}
            />
          ) : currentEventPage === "eventattendance" ? (
            <EventAttendance
              event={event}
              allUserProfileIcons={allUserProfileIcons}
            />
          ) : (
            currentEventPage === "ballot" && <Text> ballots coming soon! </Text>
          )
          //     <EventBallot
          //         event={event}
          //         setEvent={setEvent}
          //         soundComments={soundComments}
          //         setSoundComments={setSoundComments}

          //         ballotBucket={ballotBucket}
          //         setBallotBucket={setBallotBucket}
          //         ballotBinIndex={ballotBinIndex}
          //         setBallotBinIndex={setBallotBinIndex}
          //         votes={votes}
          //         setVotes={setVotes}
          //         ballotOptionsLikes={ballotOptionsLikes}
          //         setBallotOptionsLikes={setBallotOptionsLikes}
          //         ballotOptionsStars={ballotOptionsStars}
          //         setBallotOptionsStars={setBallotOptionsStars}
          //         comments={comments}
          //         setComments={setComments}
          //         userProfileIcons={userProfileIcons}
          //         usersPassLocks={usersPassLocks}
          //         setUsersPassLocks={setUsersPassLocks}
          //         mediaBLOBs={mediaBLOBs}
          //         setMediaBLOBs={setMediaBLOBs}
          //     />
          // :
          // <></>
        }

        <View style={styles.bottomCont}>
          <TouchableOpacity onPress={() => changePage("home")}>
            <Image style={styles.bottomBarIcons} source={HomeIcon} />
          </TouchableOpacity>

          {Array.isArray(ballotBucket) &&
            ballotBucket?.some((ballots) => ballots?.id) && (
              <TouchableOpacity onPress={ballotClick}>
                <Image style={styles.bottomBarIcons} source={BallotIcon} />
              </TouchableOpacity>
            )}
          {/* { Array.isArray(CURR_EVENT_BALLOT) && CURR_EVENT_BALLOT.length >= 1 && CURR_EVENT_BALLOT.some(ballots => ballots?.id) && <img onClick={ballotClick} id={styles.buttonBarIcon} source={'dojo-img/partyFlagBallot.png'} /> } */}

          <TouchableOpacity onPress={() => changePage("eventattendance")}>
            <Image style={styles.bottomBarIcons} source={UserIcon} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => changePage("commment")}>
            <Image style={styles.bottomBarIcons} source={CommentIcon} />
          </TouchableOpacity>

          {
            // was thinking of doing settings only if CURRENT_USER = event?.hosting_user_id but there can be other settings for posts\ like listening and stuff.
            <TouchableOpacity onPress={() => changePage("settings")}>
              <Image style={styles.bottomBarIcons} source={SettingsIcon} />
            </TouchableOpacity>
          }
        </View>
      </View>
    </View>
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
    // borderWidth: 2,
    // borderColor: grayphite,
  },
  bottomCont: {
    margin: 0,
    width: "100%",
    height: 40,
    flexDirection: "row",
    alignSelf: "flex-end",
    justifyContent: "center",
    gap: "10%",
    // boxSizing: 'border-box',
  },
  bottomBarIcons: {
    height: 30,
    width: 30,
  },
});

export default Event;
