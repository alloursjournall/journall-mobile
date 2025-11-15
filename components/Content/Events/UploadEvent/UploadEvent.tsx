import React, { useState, useEffect } from "react";

// @reduxjs/toolkit:
import { useDispatch } from "react-redux";

import { TouchableOpacity, Image, View, Text, StyleSheet } from "react-native";
import UploadEventHome from "./UploadEventHome/UploadEventHome";
import UploadEventAttendance from "./UploadEventAttendance";
import UploadEventComments from "./UploadEventComments/EventComments";
import UploadEventSettings from "./UploadEventSettings/UploadEventSettings";

// utils:
import {
  SettingsIcon,
  HomeIcon,
  UserIcon,
  CommentIcon,
  BallotIcon,
} from "@/constants/Images";

// utils:
// 🚨 🚨 {interface EventComponent} is better because the actual {interface Event} is way more than this.
interface props {
  event: any | null;
  setEvent: any | null;
  events: any | null;
  setEvents: any | null;
  soundComments: any | null;
  setSoundComments: any | null;
  allUserProfileIcons: any;
}

const UploadEvent: React.FC<props> = ({
  event,
  setEvent,
  events,
  setEvents,
  soundComments,
  setSoundComments,
  allUserProfileIcons,
}) => {
  const dispatch = useDispatch();

  // considering redux or not with the icons, why not just keep them as local state?
  // const CURR_PROFILE = useSelector((state: RootState) => state.profile.CURR_PROFILE)

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
  const [ballotBinIndex, setBallotBinIndex] = useState(0);
  const [votes, setVotes] = useState<any>(null);
  const [stars, setStars] = useState<any>(null);
  const [ballotOptionsLikes, setBallotOptionsLikes] = useState<any>(null);
  const [ballotOptionsStars, setBallotOptionsStars] = useState<any>(null);
  const [mediaBLOBs, setMediaBLOBs] = useState<any>(null);

  const [comments, setComments] = useState<any>(null);
  const [commentStars, setCommentStars] = useState<any>(null);

  const [ballotBin, setBallotBin] = useState<any>([
    ...(Array.from({ length: 3 })?.map((_, index) => ({
      // possible: use previous vote settings?
      title: "", // possibly settings possibly first row.
      type: "", // set by VoteTypeMenu
      description: "", // settings
      decision: "", // set by finishing the vote and becomes the notifciation
      custom_decision: "", // custom notification
      is_active: false, // create the vote and set true.

      lock: "", // deal
      unlock: "",
      custom_decision_by: "", // not used initially.

      is_media_vote: false,
      media_option_type: "", // images | videos
      invite_only_vote: false, // settings:
      anonymous_to_non_invited_voters: false,
      non_invited_users_can_like_or_stars: false,
      anonymous_votes_ok: false,
      user_submitted_options_need_approval: false,
      user_submitted_options_limit: null,
      user_submitted_options_ok: false,
      user_submitted_options_media_ok: false, // goes by media vote.
      user_submitted_options_user_array: [], // during submission of options
      user_submitted_options_is_approved_array: [], // not now a {false} record is created when user submits the option in <AddMedia/>
      hide_waiting_on_approval_votes: false,
      user_already_considering_option: null, // corresponds to ballot.options by [i]

      is_anonymous_vote: false, // later after an update.
      posting_user_considering_submitted_option_array: [], // irrelevant?
      posting_user_likes_submitted_option_array: [], // irrelevant? just likes that belong to votes
      posting_user_rates_submitted_option_array: [], // irrelevant? just stars that belongs to votes.
      after_vote_show_list: true, // probably ignoring for now
      after_vote_show_rejected_user_options: true, // later updates

      voter_can_determine: true, // no need
      user_went_with_vote_update: false, // <VoteFinishedMenu/
      litlikelove_or_stars: "litLikeLove", // likes or stars.

      notes: "",
      // option:   always ballots.optionS plural array with ballots[0] in case of 1 option Yes|No
      restriction: "", // settings

      leaderboard_int: [], // for best comments and pinned comment. ids from table.thoughts
      leaderboard_str: [], //
      show_results_during: true, // {eyes}
      edit_results_during: true, // iconTrash
      custom_decision_user_id: 0,
      custom_decision_username: "",
      custom_decision_usericon: "",
      options: [
        { text: "", blob: null, blobURL: null, blobType: null, dbURLblob: "" },
        { text: "", blob: null, blobURL: null, blobType: null, dbURLblob: "" },
        { text: "", blob: null, blobURL: null, blobType: null, dbURLblob: "" },
        { text: "", blob: null, blobURL: null, blobType: null, dbURLblob: "" },
      ],
    })) ?? []),
  ]);
  const ballotBinObj = { ballotBin: ballotBin, setBallotBin: setBallotBin };

  useEffect(() => {
    console.log("event", event);
    if (event?.id) {
      console.log("yerr");
      const eventBallots =
        (Array.isArray(event?.ballots) && event?.ballots) || null;

      if (!eventBallots) {
        return;
      }
      console.log("eventBallots", eventBallots);
      if (eventBallots?.length >= 1) {
        if (eventBallots[ballotBinIndex]) {
          const eventBallotVotes =
            (Array.isArray(eventBallots[ballotBinIndex]?.votes) &&
              eventBallots[ballotBinIndex]?.votes) ||
            null;
          const eventBallotLikes =
            (Array.isArray(eventBallots[ballotBinIndex]?.likes) &&
              eventBallots[ballotBinIndex]?.likes) ||
            null;
          const eventBallotStars =
            (Array.isArray(eventBallots[ballotBinIndex]?.stars) &&
              eventBallots[ballotBinIndex]?.stars) ||
            null;
          if (eventBallotVotes) {
            setVotes(eventBallotVotes);
          }
          if (eventBallotLikes) {
            setBallotOptionsLikes(eventBallotLikes);
          }
          if (eventBallotStars) {
            setBallotOptionsStars(eventBallotStars);
          }
        }
      } else {
        // reset ballot if no ballot to prevent false positives (event that has no vote but can see other event's votes)
        setBallotBucket(null);
        setVotes(null);
        setBallotOptionsLikes(null);
        setBallotOptionsStars(null);
      }
    }

    const eventThoughts =
      (Array.isArray(event?.thought) && event?.thought) || null;
    if (eventThoughts) {
      // {t.events} -> {t.thoughts} 1:M   {t.thoughts} -> {t.stars} 1:M   event.thoughts.stars 2 .somes() to return true if stars.id
      const doesEventThoughtsHaveStars = eventThoughts.some(
        (thoughts: any, index: number) =>
          thoughts?.stars.some((stars: any) => stars.id)
      );

      if (doesEventThoughtsHaveStars) {
        // return a collection of table.thoughts.stars data
        const flattenedStarsForAllThoughts = eventThoughts?.flatMap(
          (thought: any) => thought?.stars || []
        );
        // simple set and check.
        if (flattenedStarsForAllThoughts) {
          setCommentStars(flattenedStarsForAllThoughts);
          // dispatch(SET_CURR_EVENT_STARS(flattenedStarsForAllThoughts))
        }
      }
    }
  }, []);

  // useEffect(() => {
  //     console.log('event', event)
  //     if (event?.id) {
  //         console.log('yerr');
  //         const eventBallots = Array.isArray(event?.ballots) && event?.ballots || null;
  //         console.log('eventBallots', eventBallots)
  //         dispatch(SET_CURR_EVENT(event))
  //         if (eventBallots) {
  //             if (eventBallots[CURR_EVENT_BALLOT_BIN_INDEX]) {
  //                 const eventBallotVotes = Array.isArray(eventBallots[CURR_EVENT_BALLOT_BIN_INDEX]?.votes) && eventBallots[CURR_EVENT_BALLOT_BIN_INDEX]?.votes || null;
  //                 dispatch(SET_CURR_EVENT_BALLOT(eventBallots[CURR_EVENT_BALLOT_BIN_INDEX]))
  //                 if (eventBallotVotes) {
  //                     dispatch(SET_CURR_EVENT_VOTES(eventBallotVotes))
  //                 }
  //             }
  //         }
  //     }

  //     const eventThoughts = Array.isArray(event?.thought) && event?.thought || null;
  //     if (eventThoughts) {
  //         // {t.events} -> {t.thoughts} 1:M   {t.thoughts} -> {t.stars} 1:M   event.thoughts.stars 2 .somes() to return true if stars.id
  //         const doesEventThoughtsHaveStars = eventThoughts.some((thoughts, index) => thoughts?.stars.some(stars => stars.id))

  //         if (doesEventThoughtsHaveStars) {
  //             // return a collection of table.thoughts.stars data
  //             const flattenedStarsForAllThoughts = eventThoughts?.flatMap(thought => thought?.stars || []);
  //             // simple set and check.
  //             if (flattenedStarsForAllThoughts) {
  //                 dispatch(SET_CURR_EVENT_STARS(flattenedStarsForAllThoughts))
  //             }
  //         }
  //     }

  // }, [])

  // const { currDaySoundComments, setCurrDaySoundComments } = currDaySoundCommentsObj
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
          //         currentEventPage === "comment" ? styles.contentComment :
          //             currentEventPage === "settings" ? styles.settingsCont :
          //                 currentEventPage === "ballot" ? styles.contentComment : styles.contentComment
        }
      >
        {currentEventPage === "home" ? (
          <UploadEventHome
            event={event}
            setEvent={setEvent}
            events={events}
            setEvents={setEvents}
          />
        ) : currentEventPage === "comment" ? (
          <UploadEventComments
            event={event}
            soundComments={soundComments}
            setSoundComments={setSoundComments}
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
          <UploadEventAttendance
            event={event}
            allUserProfileIcons={allUserProfileIcons}
          />
        ) : currentEventPage === "settings" ? (
          <UploadEventSettings
            currProfile={null}
            event={event}
            setEvent={setEvent}
          />
        ) : currentEventPage === "ballot" ? (
          <Text> Event Votes coming soon! </Text>
        ) : (
          // <UploadEventVotes ballotBinObj={ballotBinObj} />
          <></>
        )}

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
  },

  bottomCont: {
    margin: 0,
    padding: 15,
    width: "100%",
    height: 40,
    flexDirection: "row",
    alignSelf: "flex-end",
    justifyContent: "space-around",
  },
  bottomBarIcons: {
    height: 30,
    width: 30,
  },
});

export default UploadEvent;
