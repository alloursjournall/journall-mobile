// top level imports
import React, { useState, useEffect } from "react";

// @reduxjs/toolkit:
import { RootState } from "redux/store/rootReducer";
import { useSelector } from "react-redux";

import {
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  View,
  Text,
  StyleSheet,
} from "react-native";

import EventsList from "./EventsList/EventsList";
import EditDay from "@/components/Content/EditDay/EditDay";
import Day from "@/components/Content/Day/Day";
import ProfilePost from "./ProfilePost";

// utils:
import { grayphite } from "@/constants/Colors";
import {
  RedBackArrowIcon,
  EyeIcon,
  UserIcon,
  AccountIcon,
} from "@/constants/Images";
import { useContentFunction } from "Contexts/ContentFunctions";

interface props {
  currProfile: any;
  events: any;
  setEvents: any;
  nextEvent: any;
  setNextEvent: any;
  selectedEvent: any;
  setSelectedEvent: any;
  selectedContent: any;
  setSelectedContent: any;
  allPosts: any;
  setAllPosts: any;
  editDayContent: any;
  setEditDayContent: any;
  allUserProfileIcons: any;
  setAllUserProfileIcons: any;

  contentDisplayClicked: any;
  setContentDisplayClicked: any;
  showProfile: any;
}

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const Content: React.FC<props> = ({
  currProfile,
  events,
  setEvents,
  nextEvent,
  setNextEvent,
  selectedEvent,
  setSelectedEvent,
  selectedContent,
  setSelectedContent,
  allPosts,
  setAllPosts,
  editDayContent,
  setEditDayContent,
  allUserProfileIcons,
  setAllUserProfileIcons,
  contentDisplayClicked,
  setContentDisplayClicked,
  showProfile,
}) => {
  const { blobbifyAndReturnPosts } = useContentFunction();

  const [soundComments, setSoundComments] = useState([]);
  const [showEditDayContent, setShowEditDayContent] = useState<boolean>(false);
  const [preSelectContent, setPreSelectContent] = useState<any>(null);

  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );
  const CURR_PROFILE = useSelector(
    (state: RootState) => state.profile.CURR_PROFILE
  );

  useEffect(() => {}, [currProfile]);

  const clickCont = (selectedEvent: number) => {
    console.log("selectedEvent", selectedEvent);
    setPreSelectContent(selectedEvent);
    // setSelectedContent(selectedEvent)
  };

  const unselectEvent = () => {
    if (contentDisplayClicked) {
      setContentDisplayClicked("");
      // dispatch(SET_CONTENT_DISPLAY_CLICKED(''))
    }
    if (showEditDayContent) {
      setShowEditDayContent(false);
    }
    setSelectedContent(null);
    setPreSelectContent(null);
  };

  const selectContent = () => {
    setSelectedContent(preSelectContent);
  };

  const test = () => {
    console.log("allPosts", allPosts);
  };

  return showProfile === false ? (
    <Image style={styles.showProfileFalseUserIconBanner} source={UserIcon} />
  ) : (
    <View style={styles.contentCont}>
      {contentDisplayClicked === "eventactivities" && (
        // <Text> ayoo </Text>
        <EventsList
          events={events}
          setEvents={setEvents}
          nextEvent={nextEvent}
          setNextEvent={setNextEvent}
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
          soundComments={soundComments}
          setSoundComments={setSoundComments}
          allUserProfileIcons={allUserProfileIcons}
        />
      )}

      {contentDisplayClicked !== "eventactivities" &&
        contentDisplayClicked !== "headercaptions" && (
          <View style={styles.outerUploadedContentCont}>
            {(showEditDayContent ||
              (preSelectContent && preSelectContent?.id)) && (
              <View style={styles.uploadedContentTopBarRow}>
                <TouchableOpacity onPress={unselectEvent}>
                  <Image style={styles.icons} source={RedBackArrowIcon} />
                </TouchableOpacity>

                {CURRENT_USER?.id === CURR_PROFILE?.user_id && (
                  <TouchableOpacity
                    style={styles.editBtn}
                    onPress={unselectEvent}
                  >
                    <Text style={styles.editText}> edit </Text>
                  </TouchableOpacity>
                )}

                {/* see post */}
                <TouchableOpacity onPress={selectContent}>
                  <Image style={styles.icons} source={EyeIcon} />
                </TouchableOpacity>
              </View>
            )}

            {showEditDayContent ? (
              //   <Text> editday </Text>
              <EditDay
                day={selectedContent}
                allUserProfileIcons={allUserProfileIcons}
                setAllUserProfileIcons={setAllUserProfileIcons}
              />
            ) : selectedContent && selectedContent?.id ? (
              <ScrollView
                contentContainerStyle={styles.selectedContentContainer}
              >
                `
                <Day
                  day={selectedContent}
                  allUserProfileIcons={allUserProfileIcons}
                  setAllUserProfileIcons={setAllUserProfileIcons}
                  feed={allPosts}
                  setFeed={setAllPosts}
                />
              </ScrollView>
            ) : (
              <ScrollView
                contentContainerStyle={styles.uploadedContentContainer}
              >
                {showProfile ? (
                  allPosts?.map((post: any, index: number) => {
                    return (
                      <TouchableOpacity
                        key={`cont${index}`}
                        onPress={() => clickCont(post)}
                      >
                        <ProfilePost
                          key={`post${index}`}
                          clickCont={clickCont}
                          post={post}
                          allUserProfileIcons={allUserProfileIcons}
                        />
                      </TouchableOpacity>
                    );
                  })
                ) : (
                  <Image source={AccountIcon} />
                )}
              </ScrollView>
            )}
          </View>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  contentCont: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    // boxSizing: 'border-box',
    flex: 1,
    margin: 0,
    padding: 0,
    height: "100%",
    width: "100%",
    // borderWidth: 2,
    // borderColor: 'rebeccapurple',
  },

  outerUploadedContentCont: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    // boxSizing: 'border-box',
    flex: 1,
    width: "100%",
    margin: 0,
    paddingHorizontal: 10,
  },
  uploadedContentTopBarRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    padding: 5,
    margin: 0,
  },

  profileIcon: {
    height: 85,
    width: 85,
  },
  icons: {
    height: 50,
    width: 50,
  },
  accountBanner: {
    height: screenHeight / 10,
    width: screenHeight / 3,
  },
  editBtn: {
    padding: 10,
    textAlign: "center",
    borderWidth: 2,
    borderColor: grayphite,
  },
  editText: {
    fontFamily: "Fuzzy Bubbles",
    color: grayphite,
    fontSize: 14,
  },

  uploadedContentContainer: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start", // Spaces items evenly
    alignItems: "flex-start",
    padding: 10,
    overflow: "scroll",
  },
  // profilePost with 32%  width instead of:  grid-template-columns: repeat(3, 1fr);
  item: {
    width: "32%", // Ensures three items per row (accounting for space)
    aspectRatio: 1, // Keeps items square, adjust as needed
    backgroundColor: "lightgray", // Placeholder, change as needed
    borderRadius: 8, // Optional, for rounded corners
  },
  selectedContentContainer: {
    flexDirection: "column",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    overflow: "scroll",
  },
  showProfileFalseUserIconBanner: {
    height: screenHeight / 3,
    width: screenWidth / 2,
  },
});

export default Content;
