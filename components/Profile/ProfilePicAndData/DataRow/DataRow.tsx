// top level imports
import { useState, useEffect } from "react";
import axios from "axios";

// @reduxjs/toolkit:
import { RootState } from "redux/store/rootReducer";
import { useSelector, useDispatch } from "react-redux";

// components and styleing:
import {
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  View,
  Text,
  StyleSheet,
} from "react-native";
import DataRowFollowUsers from "./DataRowFollowUsers";
import DataRowVibe from "./DataRowVibe";
import DataRowPeaceChill from "./DataRowPeaceChill";

// utils:
import { API } from "@env";
import { getObjKeysFromFolderS3QueryStringFunc } from "graphql/queries";
import Constants from "expo-constants";
import { grayphite } from "@/constants/Colors";
import {
  DiscoBallGoldIcon,
  PeaceIcon,
  ArtSplashIcon,
} from "@/constants/Images";
import { useContentFunction } from "Contexts/ContentFunctions";
import { profileAllUserEventsGETQueryStringFunc } from "graphql/queries";
import EventPreview from "../../Content/EventsList/EventPreview";

interface props {
  events: any;
  setEvents: any;
  nextEvent: any;
  setNextEvent: any;
  selectedEvent: any;
  setSelectedEvent: any;
  selectedContent: any;
  setSelectedContent: any;
  dataRowClicked: any;
  setDataRowClicked: any;
  currProfile: any;

  profileUserContentBucket: any;
  usersFollowingProfileUserCount: any;
  usersThatProfileUserFollowsCount: any;
  profileListeners: any;
  setProfileListeners: any;
  relevantFollowerData: any;
  contentDisplayClicked: any;
  setContentDisplayClicked: any;
  allPostsLength: number;
  showProfile: any;
  profileFollowers: any;
  setProfileFollowers: any;
  profileFollowedUsers: any;
  blocked: any;
}

const DataRow: React.FC<props> = ({
  events,
  setEvents,
  nextEvent,
  setNextEvent,
  selectedEvent,
  setSelectedEvent,
  selectedContent,
  setSelectedContent,
  dataRowClicked,
  setDataRowClicked,
  currProfile,
  profileUserContentBucket,
  usersFollowingProfileUserCount,
  usersThatProfileUserFollowsCount,
  profileListeners,
  setProfileListeners,
  relevantFollowerData,
  contentDisplayClicked,
  setContentDisplayClicked,
  allPostsLength,
  showProfile,
  profileFollowers,
  setProfileFollowers,
  profileFollowedUsers,
  blocked,
}) => {
  const dispatch = useDispatch();

  const predataString = API;

  // const { peace, artsplash, discoBallGold } = useImage();

  const ALL_USERS = useSelector((state: RootState) => state.app.ALL_USERS);

  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );
  const CURRENT_USER_TOKEN = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER_TOKEN
  );

  const CURR_PROFILE = useSelector(
    (state: RootState) => state.profile.CURR_PROFILE
  );

  const CONTENT_DISPLAY_CLICKED = useSelector(
    (state: RootState) => state.profile.CONTENT_DISPLAY_CLICKED
  );

  const privacySettings = CURR_PROFILE?.privacy || null;
  const PROFILE_USER_CONTENT_BUCKET = useSelector(
    (state: RootState) => state.profile.PROFILE_USER_CONTENT_BUCKET
  );
  const USERS_FOLLOWING_PROFILE_USER_COUNT = useSelector(
    (state: RootState) => state.profile.USERS_FOLLOWING_PROFILE_USER_COUNT
  );
  const USERS_THAT_PROFILE_USER_FOLLOWS_COUNT = useSelector(
    (state: RootState) => state.profile.USERS_THAT_PROFILE_USER_FOLLOWS_COUNT
  );
  const FOLLOWERS_N_FOLLOWED_USERS = useSelector(
    (state: RootState) => state.profile.FOLLOWERS_N_FOLLOWED_USERS
  );
  const DATA_ROW_CLICKED = useSelector(
    (state: RootState) => state.profile.DATA_ROW_CLICKED
  );

  // 🚨 🚨 NO USER_EVENTS. serializable error if they have icons!
  const USER_EVENTS = useSelector(
    (state: RootState) => state.profile.USER_EVENTS
  );

  const { profileEventsClick, initNextEvent, findNextEvent } =
    useContentFunction();

  useEffect(() => {
    if (currProfile?.current_vibe) {
      setDataRowClicked("vibe");
    }
  }, []);

  // pulls up (i.e.);             ( 7 posts, 39 followers 2 following )

  const peaceChillClick = () => {
    if (dataRowClicked !== "peacechill") {
      setDataRowClicked("peacechill");
      setContentDisplayClicked("peacechilll");
      // dispatch(SET_DATA_ROW_CLICKED("peacechill"))
      // dispatch(SET_CONTENT_DISPLAY_CLICKED("peacechill"))
    } else {
      setDataRowClicked("");
      setContentDisplayClicked("");
      // dispatch(SET_DATA_ROW_CLICKED(""))
      // dispatch(SET_CONTENT_DISPLAY_CLICKED(""))
    }
    // restore event defaults:
    setSelectedEvent({});
    // resetEventReduxState()
    if (selectedContent?.id) setSelectedContent(null);
  };

  const downArrowClick = () => {
    if (dataRowClicked !== "downArrow") {
      setDataRowClicked("downArrow");
      setContentDisplayClicked("downArrow");
      // dispatch(SET_DATA_ROW_CLICKED("downArrow"))
      // dispatch(SET_CONTENT_DISPLAY_CLICKED("downArray"))
    } else {
      setDataRowClicked("");
      setContentDisplayClicked("");
      // dispatch(SET_DATA_ROW_CLICKED(""))
      // dispatch(SET_CONTENT_DISPLAY_CLICKED(""))
    }
    // restore event defaults:
    setSelectedEvent({});
    // resetEventReduxState()
    if (selectedContent?.id) setSelectedContent(null);
  };

  const vibeClick = () => {
    if (dataRowClicked !== "vibe") {
      setDataRowClicked("vibe");
      setContentDisplayClicked("vibe");
      // dispatch(SET_DATA_ROW_CLICKED("vibe"))
      // dispatch(SET_CONTENT_DISPLAY_CLICKED("vibe"))
    } else {
      setDataRowClicked("");
      setContentDisplayClicked("");
      // dispatch(SET_DATA_ROW_CLICKED(""))
      // dispatch(SET_CONTENT_DISPLAY_CLICKED(""))
    }
    // restore event defaults:
    setSelectedEvent({});
    // resetEventReduxState()
    if (selectedContent?.id) setSelectedContent(null);
  };

  const profileAllUserEventsClick = async (userId: number, setEvents: any) => {
    // export const profileAllUser?
    ///     = EventsGETQueryStringFunc = (userId:number) => {
    const query = profileAllUserEventsGETQueryStringFunc(userId);
    // resetEventReduxState()
    // let predata: any = await AllOursRequestDATA(query, {}, CURRENT_USER_TOKEN)

    let predata: any = await axios.post(predataString, { query: query });
    // let predata:any = await axios.post('http://localhost:4000/api/graphql', { query: query })
    console.log("predata", predata);
    if (!predata) {
      return null;
    }
    let data = predata?.data?.data?.profileAllUserEventsGET;
    console.log("data", data);
    if (!data) {
      return null;
    }
    const parsedData = JSON.parse(data);
    parsedData.forEach(async (event: any) => {
      const path = `icons/event-icons/event-${event?.id}-icon`;

      const query = getObjKeysFromFolderS3QueryStringFunc(path);

      console.log("query", query);

      const predata: any = await axios.post(
        API,
        // "https://journallapi.vercel.app/api/graphql",
        {
          query: query,
        }
      );
      if (!predata) {
        return null;
      }

      console.log("predata", predata);
      let data = predata?.data?.data?.getObjKeysFromFolderS3;
      console.log("data", data);
      const parsedData = JSON.parse(data);
      // const getPresignedDataFunc = async (path: string, fileType: string) => {

      // const blob = await getBLOBfromS3(path);
      if (!parsedData?.key?.url) {
        console.log("no parsedData?.key?.url");
        // dispatch(SET_NEXT_EVENT(clone))
        event.icon = null;
        // setNextEvent(event)
        return;
      } else {
        event.icon = parsedData?.key?.url;
        console.log("parsedData?.key?.url", parsedData?.key?.url);
        // setNextEvent(clone)
        // dispatch(SET_NEXT_EVENT(clone))
      }
    });

    // 🚨 🚨 SET_USER_EVENTS non serializable value (icon) for redux
    // dispatch(SET_USER_EVENTS(parsedData))
    setEvents(parsedData);
    return parsedData;
    if (selectedContent?.id) setSelectedContent(null);
  };

  const test = async () => {
    const events = await profileAllUserEventsClick(
      CURR_PROFILE?.user_id,
      setEvents
    );
    console.log("events", events);
  };
  const test2 = () => {
    console.log("events", events);
    console.log("nextEvent", nextEvent);
  };

  const profileEventsClickFunc = async () => {
    const newEvents = await profileEventsClick(
      events,
      setEvents,
      selectedEvent,
      setSelectedEvent,
      nextEvent,
      setNextEvent,
      dataRowClicked,
      setDataRowClicked,
      setContentDisplayClicked,
      currProfile
    );
    console.log("newEvents", newEvents);

    if (!newEvents) {
      return null;
    } else {
      initNextEvent(newEvents, nextEvent, setNextEvent);

      const upcomingEvent = findNextEvent(events);
      console.log("nextEvent", nextEvent);
      console.log("events", events);
      // if (nextEvent?.icon?.length) {
      //   return;
      // }
      console.log("upcomingEvent", upcomingEvent);

      if (upcomingEvent?.public_event) {
        const clone = { ...upcomingEvent };
        if (!upcomingEvent?.icon) {
          // const path = `icons/event-icons/event-${upcomingEvent?.id}-icon`;
          // const blob = await getBLOBfromS3(path);
          console.log("no blob");
          // dispatch(SET_NEXT_EVENT(clone))
          setNextEvent(clone);
          return;
        } else {
          // clone.icon = blob
          // console.log('blob', blob);
          setNextEvent(clone);
          // dispatch(SET_NEXT_EVENT(clone))
        }
      } else {
        console.log("it better be sauce!");
      }
    }
  };

  return (
    <View style={styles.dataRow}>
      <View style={styles.dataRowTopToolBar}>
        {currProfile?.current_vibe && currProfile?.current_vibe !== "no" && (
          <TouchableOpacity onPress={vibeClick}>
            <Image
              style={[
                {
                  opacity:
                    dataRowClicked && dataRowClicked !== "vibe" ? 0.5 : 1.0,
                },
                styles.dataRowTopToolBarIcons,
              ]}
              source={ArtSplashIcon}
            />
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={profileEventsClickFunc}>
          <Image
            style={[
              {
                opacity:
                  dataRowClicked && dataRowClicked !== "eventactivities"
                    ? 0.5
                    : 1.0,
              },
              styles.dataRowTopToolBarIcons,
            ]}
            source={DiscoBallGoldIcon}
          />
        </TouchableOpacity>

        {currProfile?.show_chill_ppl_me && (
          <TouchableOpacity onPress={peaceChillClick}>
            <Image
              style={[
                {
                  opacity:
                    dataRowClicked && dataRowClicked !== "peacechill"
                      ? 0.5
                      : 1.0,
                },
                styles.dataRowTopToolBarIcons,
              ]}
              source={PeaceIcon}
            />
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={downArrowClick}>
          <Text
            style={[
              {
                color: "#D86220",
                opacity:
                  dataRowClicked && dataRowClicked !== "downArrow" ? 0.5 : 1.0,
                fontSize: 50,
              },
              styles.headerText,
            ]}
          >
            {" "}
            &darr;{" "}
          </Text>
        </TouchableOpacity>
      </View>

      {!selectedEvent?.id && (
        <DataRowBottom
          events={events}
          setEvents={setEvents}
          nextEvent={nextEvent}
          setNextEvent={setNextEvent}
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
          selectedContent={selectedContent}
          setSelectedContent={setSelectedContent}
          dataRowClicked={dataRowClicked}
          setDataRowClicked={setDataRowClicked}
          currProfile={currProfile}
          profileUserContentBucket={profileUserContentBucket}
          usersFollowingProfileUserCount={usersFollowingProfileUserCount}
          usersThatProfileUserFollowsCount={usersThatProfileUserFollowsCount}
          profileListeners={profileListeners}
          setProfileListeners={setProfileListeners}
          relevantFollowerData={relevantFollowerData}
          contentDisplayClicked={contentDisplayClicked}
          setContentDisplayClicked={setContentDisplayClicked}
          allPostsLength={allPostsLength}
          showProfile={showProfile}
          profileFollowers={profileFollowers}
          setProfileFollowers={setProfileFollowers}
          profileFollowedUsers={profileFollowedUsers}
          blocked={blocked}
        />
      )}

      {/* discoBallGold       discoBallGold for IRL events!*/}
      {/* <p id={styles.profilePicAndDataText}> {USERS_THAT_PROFILE_USER_FOLLOWS_COUNT} followed </p>              */}
    </View>
  );
};

interface props {
  events: any;
  setEvents: any;
  nextEvent: any;
  setNextEvent: any;
  selectedEvent: any;
  setSelectedEvent: any;
  profileUserContentBucket: any;
  usersFollowingProfileUserCount: any;
  usersThatProfileUserFollowsCount: any;
  currProfile: any;
  profileListeners: any;
  setProfileListeners: any;
  relevantFollowerData: any;
  allPostsLength: number;
  showProfile: any;
  profileFollowers: any;
  setProfileFollowers: any;
  profileFollowedUsers: any;
  blocked: any;
}

const DataRowBottom: React.FC<props> = ({
  events,
  setEvents,
  nextEvent,
  setNextEvent,
  selectedEvent,
  setSelectedEvent,
  dataRowClicked,

  profileUserContentBucket,
  usersFollowingProfileUserCount,
  usersThatProfileUserFollowsCount,
  currProfile,
  profileListeners,
  setProfileListeners,
  relevantFollowerData,
  allPostsLength,
  showProfile,
  profileFollowers,
  setProfileFollowers,
  profileFollowedUsers,
  blocked,
}) => {
  const DATA_ROW_CLICKED = useSelector(
    (state: RootState) => state.profile.DATA_ROW_CLICKED
  );

  return dataRowClicked === "downArrow" ? (
    <DataRowFollowUsers
      currProfile={currProfile}
      profileUserContentBucket={profileUserContentBucket}
      usersFollowingProfileUserCount={usersFollowingProfileUserCount}
      usersThatProfileUserFollowsCount={usersThatProfileUserFollowsCount}
      allPostsLength={allPostsLength}
      showProfile={showProfile}
      profileFollowers={profileFollowers}
      setProfileFollowers={setProfileFollowers}
      profileFollowedUsers={profileFollowedUsers}
      blocked={blocked}
    />
  ) : dataRowClicked === "vibe" ? (
    <DataRowVibe
      currProfile={currProfile}
      profileListeners={profileListeners}
      setProfileListeners={setProfileListeners}
    />
  ) : dataRowClicked === "peacechill" ? (
    <DataRowPeaceChill
      currProfile={currProfile}
      relevantFollowerData={relevantFollowerData}
    />
  ) : (
    dataRowClicked === "eventactivities" && (
      <EventPreview
        eventActivity={nextEvent}
        nextEvent={true}
        selectedEvent={selectedEvent}
        setSelectedEvent={setSelectedEvent}
      />
    )
  );
  // no need for <DataRowCurrentEvent> since nextEvent, selectEvent handled in <DataRow<>
};

const styles = StyleSheet.create({
  dataRow: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: 10,
  },
  dataRowTopToolBar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  dataRowTopToolBarIcons: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  headerText: {
    fontWeight: 400,
    fontFamily: "Fuzzy Bubbles",
    color: grayphite,
  },
});

export default DataRow;
