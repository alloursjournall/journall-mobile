import axios from "axios";
import { useState, useEffect } from "react";

// redux
import { RootState } from "@/redux/store/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import {
  SET_CURRENT_USER,
  SET_CURRENT_USER_TOKEN,
} from "@/redux/currentUser/currentUserSlice";

import {
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  View,
  Text,
  StyleSheet,
} from "react-native";
import EditBackBtnUsernameSettingsBtn from "@/components/Profile/Edit/EditBackBtnUsernameSettingsBtn";
import BackBtnUsernameSettingsBtn from "@/components/Profile/BackBtnUsernameSettingsBtn/BackBtnUsernameSettingsBtn";
import ProfilePicAndData from "@/components/Profile/ProfilePicAndData/ProfilePicAndData";
import BioBox from "@/components/Profile/BioBox/BioBox";
import Content from "@/components/Profile/Content/Content";
import ProfileSettings from "@/components/Profile/Edit/Settings/ProfileSettings/ProfileSettings";

// utils:
import { useLocalSearchParams } from "expo-router";
import {
  ALLuserUploadedContentStringWithBlobsQueryStringFunc,
  allDaysGETquery,
} from "@/graphql/queries";
import { appBackground } from "@/constants/Colors";
import { AnonymityMaskIcon, HeartIcon } from "@/constants/Images";
import { useContentFunction } from "@/Contexts/ContentFunctions";
import Constants from "expo-constants";
import EditProfilePicAndData from "@/components/Profile/Edit/EditProfilePicAndData";

// obviously dynamic routing but for right now...
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const Profile: React.FC = () => {
  const dispatch = useDispatch();

  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );

  const CURR_PROFILE = useSelector(
    (state: RootState) => state.profile.CURR_PROFILE
  );

  const CONTENT_DISPLAY_CLICKED = useSelector(
    (state: RootState) => state.profile.CONTENT_DISPLAY_CLICKED
  );

  const EDIT_CONTENT_DISPLAY_CLICKED = useSelector(
    (state: RootState) => state.profile.EDIT_CONTENT_DISPLAY_CLICKED
  );
  const SHOW_SETTINGS_MENU = useSelector(
    (state: RootState) => state.profile.SHOW_SETTINGS_MENU
  );
  const SHOW_EDIT_PROFILE = useSelector(
    (state: RootState) => state.profile.SHOW_EDIT_PROFILE
  );

  // was: IS_CURRENT_USER_BLOCKED_BY_PROFILE_USER
  const [nonAnonymousStatusToLoginUser, setNonAnonymousStatusToLoginUser] =
    useState<any>("");
  const [
    isCurrentUserBlockedByProfileUser,
    setIsCurrentUserBlockedByProfileUser,
  ] = useState<boolean>(false);
  const [profileFollowers, setProfileFollowers] = useState<any>(null);
  const [profileFollowedUsers, setProfileFollowedUsers] = useState<any>(null);
  const [profileUsersBlocks, setProfileUsersBlocks] = useState<any>(null);
  const [showProfile, setShowProfile] = useState<boolean>(true);
  const [blocked, setBlocked] = useState<boolean>(false);

  const [currProfile, setCurrProfile] = useState<any>({});
  const [editCurrProfile, setEditCurrProfile] = useState<any>({});
  const [currPrivacy, setCurrPrivacy] = useState<any>({});
  const [editCurrPrivacy, setEditCurrPrivacy] = useState<any>({});

  const [showEditProfile, setShowEditProfile] = useState<boolean>(false);

  const [dataRowClicked, setDataRowClicked] = useState<string>("");
  const [contentDisplayClicked, setContentDisplayClicked] =
    useState<string>("");
  const [editDataRowClicked, setEditDataRowClicked] = useState<string>("");
  const [profileListeners, setProfileListeners] = useState<any>([]);

  const [relevantFollowerData, setRelevantFollowerData] = useState<any>(null);
  const [usersFollowingProfileUserCount, setUsersFollowingProfileUserCount] =
    useState<number>(0);
  const [
    usersThatProfileUserFollowsCount,
    setUsersThatProfileUserFollowsCount,
  ] = useState<number>(0);

  const [allPosts, setAllPosts] = useState<any>([]);
  const [allUserProfileIcons, setAllUserProfileIcons] = useState<any>([]);

  // blobs:
  const [events, setEvents] = useState<any>([]);
  const [nextEvent, setNextEvent] = useState<any>({});
  const [selectedEvent, setSelectedEvent] = useState<any>({});
  const [selectedContent, setSelectedContent] = useState<any>({});
  const [editDayContent, setEditDayContent] = useState<any>({});

  const [profileUserContentBucket, setProfileUserContentBucket] = useState<any>(
    []
  );

  const { returnProfileImg } = useContentFunction();
  const iconUri = returnProfileImg(currProfile?.user_id, allUserProfileIcons);

  const {
    initialInitProfile,
    getAllProfileListeners,
    profileIconInitS3,
    profileGetAllRelevantFollowersAndFollowedUsers,
    blobbifyAndReturnPosts,
    allMyBlocks,
    getUserCredentials,
    getCurrentUserWithCurrentUserToken,
  } = useContentFunction();

  const { id } = useLocalSearchParams(); // Get the dynamic user ID from the URL
  const numericId = Array.isArray(id) ? parseInt(id[0]) : parseInt(id); // Ensure it's a single number

  const API = "https://journallapi.vercel.app/api/graphql";
  // const { API } = Constants?.easConfig.extra || 'http://localhost:4000/api/graphql';

  useEffect(() => {
    console.log("numericId", numericId);
    if (numericId) {
      const asyncProfileLoader = async () => {
        try {
          const profileData = await initialInitProfile(
            numericId,
            setCurrProfile,
            setCurrPrivacy
          );

          if (profileData?.profile) {
            await getAllProfileListeners(
              profileData?.profile?.id,
              setProfileListeners
            );
          }
          // if (profileData?.privacy) {
          // }
        } catch (error) {}
      };
      asyncProfileLoader();
    }

    const getAllIcons = async () => {
      if (allUserProfileIcons?.length < 1) {
        const icons = await profileIconInitS3(setAllUserProfileIcons);
      }
      // console.log('icons', icons)
    };
    getAllIcons();

    const currentUserInit = async () => {
      const tokenDetails = await getUserCredentials();
      console.log("tokenDetails", tokenDetails);
      if (parseInt(tokenDetails?.userId) > 0) {
        const currentUser = await getCurrentUserWithCurrentUserToken(
          tokenDetails
        );

        dispatch(SET_CURRENT_USER(currentUser));
        const currentUserToken = {
          id: currentUser?.id,
          username: currentUser?.username,
          token: currentUser?.token,
        };
        console.log("currentUserToken", currentUserToken);
        dispatch(SET_CURRENT_USER(currentUser));
        dispatch(SET_CURRENT_USER_TOKEN(currentUserToken));

        console.log("currentUser clientside", currentUser);
      } else {
        console.log("nope didnt go through");
      }
      console.log("tokenDetails", tokenDetails);
    };
    currentUserInit();
  }, [id]); // Added dependency

  useEffect(() => {
    console.log("hey firing this function");
    console.log("currProfile", currProfile);

    if (!currProfile?.user_id) {
      // if (!currProfile?.user_id && allPosts?.length < 1) {
      return;
    }

    const loadProfilePosts = async () => {
      console.log("show me dat please");

      console.log("currProfile before invoke!", currProfile);

      // if (allPosts?.length >= 1) {
      //     return;
      // }

      const query = ALLuserUploadedContentStringWithBlobsQueryStringFunc(
        currProfile?.user_id
      );

      console.log("query for content", query);
      const predata: any = await axios.post(API, { query: query });
      console.log("predata for content", predata);
      if (!predata) {
        return;
      }
      const data = predata?.data?.data?.ALLuserUploadedContentStringWithBlobs;
      let parsedData: any = JSON.parse(data);
      console.log("parsedData", parsedData);

      if (allPosts?.length === parsedData?.length) {
        return;
      }

      const blobbedPosts = await blobbifyAndReturnPosts(parsedData);
      console.log("blobbedPosts", blobbedPosts);
      setAllPosts(blobbedPosts);
    };
    // loadProfilePosts();

    const loadProfileFollowersAndFollowedUsers = async () => {
      const FF = await profileGetAllRelevantFollowersAndFollowedUsers(
        currProfile?.user_id
      );
      console.log("FF", FF);
      if (FF?.followers) {
        setProfileFollowers(FF.followers);
      }
      if (FF?.followedUsers) {
        setProfileFollowedUsers(FF.followedUsers);
      }
    };
    // loadProfileFollowersAndFollowedUsers()

    const loadProfileBlocks = async () => {
      const blocks = await allMyBlocks(currProfile?.user_id);
      console.log("blocks", blocks);
      if (blocks) {
        setProfileUsersBlocks(blocks);
      }
    };
    // loadProfileBlocks();

    const initProfile = async () => {
      let showUserProfile = true;
      // * * * * * loadProfilePosts has to be near the top.

      console.log("ere firing this function");
      console.log("currPrivacy", currPrivacy);

      const initFollowers = async () => {
        loadProfileFollowersAndFollowedUsers();
        // loadProfilePosts();
        loadProfileBlocks();
      };

      // 🚨 🚨 check the current profile!
      const checkShowProfile = () => {
        if (currPrivacy?.private_acct) {
          console.log("yes private acct");
          const doesCurrentUserFollowProfileUser = profileFollowers?.some(
            (f: any) => f?.follower_id === CURRENT_USER?.id
          );
          console.log(
            "doesCurrentUserFollowProfileUser",
            doesCurrentUserFollowProfileUser
          );
          if (doesCurrentUserFollowProfileUser) {
            return;
          } else {
            showUserProfile = false;
            setShowProfile(false);
          }
        }

        if (profileUsersBlocks) {
          const doesCurrentUserBlockProfileUser = profileUsersBlocks?.some(
            (b: any) =>
              b?.user_id === CURRENT_USER?.id &&
              b?.blocked_id === currProfile?.user_id
          );
          const doesProfileUserBlockProfileUser = profileUsersBlocks?.some(
            (b: any) =>
              b?.user_id === currProfile?.user_id &&
              b?.blocked_id === CURRENT_USER?.id
          );
          if (
            doesCurrentUserBlockProfileUser ||
            doesProfileUserBlockProfileUser
          ) {
            showUserProfile = false;
            setShowProfile(false);
          }
        }
      };

      await initFollowers();
      await checkShowProfile();

      if (showUserProfile) {
        loadProfilePosts();
      }
    };

    // if (!currProfile?.id) {
    initProfile();
    // }
  }, [currProfile]);

  const test = () => {
    console.log("profileFollowers", profileFollowers);
    console.log("showProfile", showProfile);
    console.log("currProfile", currProfile);
  };

  return (
    <View style={styles.scrollView}>
      {/* <ScrollView contentContainerStyle={styles.scrollView}> */}

      {
        // 🚨 this shows even if showProfile === false
        <BackBtnUsernameSettingsBtn
          allUserProfileIcons={allUserProfileIcons}
          currProfile={currProfile}
          currPrivacy={currPrivacy}
          nonAnonymousStatusToLoginUser={nonAnonymousStatusToLoginUser}
          showEditProfile={showEditProfile}
          setShowEditProfile={setShowEditProfile}
          profileFollowers={profileFollowers}
          setProfileFollowers={setProfileFollowers}
          showProfile={showProfile}
        />
      }

      {!showEditProfile && !selectedContent?.id ? (
        // {!showEditProfile && !selectedContent?.id && currProfile?.id ? (
        // !showEditProfile && !selectedContent?.id &&

        <ProfilePicAndData
          events={events}
          setEvents={setEvents}
          nextEvent={nextEvent}
          setNextEvent={setNextEvent}
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
          selectedContent={selectedContent}
          setSelectedContent={setSelectedContent}
          nonAnonymousStatusToLoginUser={nonAnonymousStatusToLoginUser}
          currProfile={currProfile}
          allUserProfileIcons={allUserProfileIcons}
          profileListeners={profileListeners}
          setProfileListeners={setProfileListeners}
          dataRowClicked={dataRowClicked}
          setDataRowClicked={setDataRowClicked}
          profileUserContentBucket={profileUserContentBucket}
          usersFollowingProfileUserCount={usersFollowingProfileUserCount}
          usersThatProfileUserFollowsCount={usersThatProfileUserFollowsCount}
          relevantFollowerData={relevantFollowerData}
          contentDisplayClicked={contentDisplayClicked}
          setContentDisplayClicked={setContentDisplayClicked}
          showProfile={showProfile}
          allPostsLength={allPosts?.length}
          profileFollowers={profileFollowers}
          setProfileFollowers={setProfileFollowers}
          profileFollowedUsers={profileFollowedUsers}
          blocked={blocked}
        />
      ) : (
        <View>
          {
            dataRowClicked !== "peacechill" &&
              contentDisplayClicked !== "eventactivities" &&
              // <TouchableOpacity onPress={test}>
              (nonAnonymousStatusToLoginUser === "blocked" ? (
                // 🧱 local asset image
                <Image
                  style={[{ borderRadius: 0 }, styles.profileIcon]}
                  source={AnonymityMaskIcon}
                />
              ) : // 🌐 remote URI image
              // <TouchableOpacity onPress={test}>
              //     <Text> hi </Text>
              // </TouchableOpacity>
              typeof iconUri === "string" && iconUri.startsWith("http") ? (
                <Image
                  source={{ uri: iconUri }}
                  style={[{ borderRadius: 50 }, styles.profileIcon]}
                />
              ) : (
                <Image
                  source={HeartIcon}
                  style={[{ borderRadius: 0 }, styles.profileIcon]}
                />
              ))
            // </TouchableOpacity>
          }
        </View>
        // <EditProfilePicAndData
        //     currProfile={currProfile}
        //     allUserProfileIcons={allUserProfileIcons}
        //     isCurrentUserBlockedByProfileUser={isCurrentUserBlockedByProfileUser}
        // />
      )}

      {contentDisplayClicked !== "eventactivities" &&
        contentDisplayClicked !== "selectedEvent" &&
        !selectedContent?.id &&
        !showEditProfile && (
          <BioBox
            currProfile={currProfile}
            contentDisplayClicked={contentDisplayClicked}
            setContentDisplayClicked={setContentDisplayClicked}
            showProfile={showProfile}
          />
        )}

      {showEditProfile && (
        <ProfileSettings
          allUserProfileIcons={allUserProfileIcons}
          setAllUserProfileIcons={setAllUserProfileIcons}
          currProfile={currProfile}
          setCurrProfile={setCurrProfile}
          editCurrProfile={editCurrProfile}
          setEditCurrProfile={setEditCurrProfile}
          currPrivacy={currPrivacy}
          setCurrPrivacy={setCurrPrivacy}
          editCurrPrivacy={editCurrPrivacy}
          setEditCurrPrivacy={setEditCurrPrivacy}
          profileFollowers={profileFollowers}
          setProfileFollowers={setProfileFollowers}
          profileFollowedUsers={profileFollowedUsers}
          profileUsersBlocks={profileUsersBlocks}
          setProfileUsersBlocks={setProfileUsersBlocks}
          setProfileFollowedUsers={setProfileFollowedUsers}
          showProfile={showProfile}
        />
      )}

      {/* <TouchableOpacity onPress={test}>
                <Text> test </Text>
            </TouchableOpacity> */}

      {!showEditProfile && (
        <Content
          currProfile={currProfile}
          events={events}
          setEvents={setEvents}
          nextEvent={nextEvent}
          setNextEvent={setNextEvent}
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
          selectedContent={selectedContent}
          setSelectedContent={setSelectedContent}
          allPosts={allPosts}
          setAllPosts={setAllPosts}
          editDayContent={editDayContent}
          setEditDayContent={setEditDayContent}
          allUserProfileIcons={allUserProfileIcons}
          setAllUserProfileIcons={setAllUserProfileIcons}
          contentDisplayClicked={contentDisplayClicked}
          setContentDisplayClicked={setContentDisplayClicked}
          showProfile={showProfile}
        />
      )}

      {/* <TouchableOpacity onPress={test}> <Text> hey </Text> </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
    backgroundColor: appBackground,
    height: screenHeight,
    gap: 5,

    margin: 0,
    padding: 0,
    borderWidth: 2,
  },
  profileIcon: {
    height: 85,
    width: 85,
  },
  test: {
    height: 50,
    width: 50,
  },
});

export default Profile;
