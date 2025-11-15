import axios from "axios";
import { useState, useEffect } from "react";

// redux
import { RootState } from "@/redux/store/rootReducer";
import { useSelector, useDispatch, createDispatchHook } from "react-redux";
import {
  SET_CURRENT_USER,
  SET_CURRENT_USER_TOKEN,
  SET_CURRENT_USER_PRIVACY,
  SET_CURRENT_USER_MOST_RECENT_POST,
} from "@/redux/currentUser/currentUserSlice";

import {
  TouchableOpacity,
  Image,
  ScrollView,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { appBackground } from "@/constants/Colors";
import Day from "@/components/Content/Day/Day";
// import Event from "@/components/Content/Events/Event/Event";
import TheFeed from "@/components/Feed/TheFeed";
import SetFeedTool from "@/components/Feed/SetFeedTool";
import ShowUsersBar from "@/components/Feed/ShowUsersBar";
import NotificationList from "@/components/NotificationList";
import Navbar from "@/components/Navbar";

// utils:
import { useContentFunction } from "@/Contexts/ContentFunctions";
import { RedBackArrowIcon } from "@/constants/Images";

export default function Main() {
  const dispatch = useDispatch();
  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [allUserProfileIcons, setAllUserProfileIcons] = useState<any>([]);
  const [post, setPost] = useState<any>(null);
  const [feed, setFeed] = useState<any>(null);
  const [eventsFeed, setEventsFeed] = useState<any>(null);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [showDiscoverTool, setShowDiscoverTool] = useState<boolean>(false);
  const [clickedNotificationContent, setClickedNotificationContent] =
    useState<any>("");

  const [searchPostsInputVal, setSearchPostsInputVal] = useState<string>("");
  const [searchItems, setSearchItems] = useState<any>(null);
  const [feedBeforeSearch, setFeedBeforeSearch] = useState<any>(null);

  const {
    profileIconInitS3,
    blobbifyAndReturnPosts,
    getUserCredentials,
    getCurrentUserWithCurrentUserToken,
    daysGETtrendingwithMonthAndYearFunction,
    getLimitedUsersAndPrivacy,
  } = useContentFunction();

  useEffect(() => {
    const currentUserInit = async () => {
      const tokenDetails = await getUserCredentials();
      // console.log('tokenDetails', tokenDetails);
      if (parseInt(tokenDetails?.userId) > 0) {
        const currentUser = await getCurrentUserWithCurrentUserToken(
          tokenDetails
        );
        dispatch(SET_CURRENT_USER(currentUser));
        // CURRENT_USER_TOKEN: { id: 0, username: 'no name', token: 'no token' },
        const currentUserToken = {
          id: currentUser?.id,
          username: currentUser?.username,
          token: currentUser?.token,
        };
        dispatch(SET_CURRENT_USER_TOKEN(currentUserToken));
        setCurrentUser(currentUser);
        // console.log('currentUser clientside', currentUser);
      }
      // console.log('tokenDetails', tokenDetails);
    };
    currentUserInit();

    const getTrendingPostsForCurrentMonth = async () => {
      // const predata: any = await axios.post(predataString, { query: allDaysGETquery })

      const now = new Date();
      const month = String(now.getMonth() + 1).padStart(2, "0"); // '05'
      const year = now.getFullYear().toString();

      // console.log('month', month);
      // console.log('year', year);

      const data = await daysGETtrendingwithMonthAndYearFunction(month, year);
      // console.log('data', data);

      if (!data) {
        return null;
      }
      const blobbedPosts = await blobbifyAndReturnPosts(data);
      // console.log('blobbedPosts', blobbedPosts);
      setPost(blobbedPosts[0]);
      setFeed(blobbedPosts);
      if (!data) {
        return null;
      }
    };
    getTrendingPostsForCurrentMonth();

    // getAllPosts();

    const getAllIcons = async () => {
      const icons = await profileIconInitS3(setAllUserProfileIcons);
    };

    getAllIcons();

    const getUsers = async () => {
      // chat I've got a question. scale wise you said: "don't do queries that retrieve all this data" but what about for blocks ? every user should be fetched?
      // is there a way to make it so that only needed blocks are retrieved? when you think that any users could've blocked anyone seems impossible.

      const users = await getLimitedUsersAndPrivacy(20);
      console.log("users", users);
    };
    getUsers();
  }, [dispatch]);

  // back out of display notification
  const unclickNotification = () => {
    setClickedNotificationContent(null);
  };

  const test = async () => {};

  return (
    <View style={styles.container}>
      {/* <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}> */}
      <Navbar
        allUserProfileIcons={allUserProfileIcons}
        searchPostsInputVal={searchPostsInputVal}
        setSearchPostsInputVal={setSearchPostsInputVal}
        feed={feed}
        setFeed={setFeed}
        showDiscoverTool={showDiscoverTool}
        setShowDiscoverTool={setShowDiscoverTool}
        showNotifications={showNotifications}
        setShowNotifications={setShowNotifications}
        searchItems={searchItems}
        setSearchItems={setSearchItems}
      />

      {/* {
        searchPostsInputVal?.length >= 1 &&        
        <Text> search posts by title, username, category_text ? </Text>
      } */}

      {showNotifications ? (
        clickedNotificationContent?.id ? (
          <View style={styles.container}>
            <Image
              style={[{ borderRadius: 50 }, styles.icon]}
              source={RedBackArrowIcon}
            />

            {clickedNotificationContent?.thoughts ||
            clickedNotificationContent?.moments ||
            clickedNotificationContent?.fields ||
            clickedNotificationContent?.greatfullagain ? (
              <Day
                feed={feed}
                setFeed={setFeed}
                day={clickedNotificationContent}
                allUserProfileIcons={allUserProfileIcons}
                setAllUserProfileIcons={setAllUserProfileIcons}
              />
            ) : (
              <Text> Event </Text>
              //   <Event
              //     eventId={clickedNotificationContent?.id}
              //     event={clickedNotificationContent}
              //     setEvent={setClickedNotificationContent}
              //     events={eventsFeed}
              //     setEvents={setEventsFeed}
              //     allUserProfileIcons={allUserProfileIcons}
              //   />
            )}
          </View>
        ) : (
          <NotificationList
            setClickedNotificationContent={setClickedNotificationContent}
            allUserProfileIcons={allUserProfileIcons}
            showNotifications={showNotifications}
            setShowNotifications={setShowNotifications}
            feed={feed}
            event={null}
          />
        )
      ) : showDiscoverTool ? (
        <View style={styles.container}>
          <SetFeedTool feed={feed} setFeed={setFeed} />
          <ShowUsersBar allUserProfileIcons={allUserProfileIcons} />
        </View>
      ) : (
        // <Text> ayoo </Text>
        Array.isArray(feed) &&
        feed?.some((day: any) => day?.id) && (
          <TheFeed
            feed={feed}
            setFeed={setFeed}
            allUserProfileIcons={allUserProfileIcons}
            setAllUserProfileIcons={setAllUserProfileIcons}
            searchPostsInputVal={searchPostsInputVal}
            searchItems={searchItems}
          />
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1, // Ensures the ScrollView takes full available height
    backgroundColor: appBackground,
    margin: 0,
    paddingVertical: 5,
  },
  container: {
    flex: 1,
    gap: 5,
    // padding: 5,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: appBackground,
  },
  icon: {
    height: 50,
    width: 50,
  },
});
