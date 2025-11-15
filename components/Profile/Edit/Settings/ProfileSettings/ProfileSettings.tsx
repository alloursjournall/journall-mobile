// top level imports
// top level s
import axios from "axios";
import React, { useState, useEffect } from "react";

// @reduxjs/toolkit:
import { RootState } from "redux/store/rootReducer";
import { useSelector, useDispatch } from "react-redux";

import {
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  View,
  Text,
  StyleSheet,
} from "react-native";
import UserProfileIconRow from "./UserProfileIconRow";
import ModularStringRowInput from "./ModularStringRowInput";
import PrivacyModularStringRowInput from "./PrivacyModularStringRowInput";
import ProfileFollowersList from "../AllOursFollowersBlocksMenu/ProfileFollowersList";

// utils:
import { API } from "@env";
import Constants from "expo-constants";
import {
  submitUserPassCustomLocksByTableQueryStringFunc,
  updateUserProfileQueryStringFunc,
  updateUserPrivacyQueryStringFunc,
} from "@/graphql/queries";
import { grayphite } from "@/constants/Colors";
import {
  UserIcon,
  SettingsIcon,
  FollowerIcon,
  SendButtonIcon,
  HandUnderlineIcon1,
  AccountIcon,
  AnonymityMaskIcon,
  GreenForwardArrowIcon,
} from "@/constants/Images";
import { useContentFunction } from "Contexts/ContentFunctions";

interface props {
  currProfile: any;
  setCurrProfile: any;
  allUserProfileIcons: any;
  setAllUserProfileIcons: any;
  editCurrProfile: any;
  setEditCurrProfile: any;
  currPrivacy: any;
  setCurrPrivacy: any;
  editCurrPrivacy: any;
  setEditCurrPrivacy: any;
  profileFollowers: any;
  setProfileFollowers: any;
  profileFollowedUsers: any;
  profileUsersBlocks: any;
  setProfileUsersBlocks: any;
  setProfileFollowedUsers: any;
  showProfile: any;
}

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const ProfileSettings: React.FC<props> = ({
  allUserProfileIcons,
  setAllUserProfileIcons,
  currProfile,
  setCurrProfile,
  editCurrProfile,
  setEditCurrProfile,
  currPrivacy,
  setCurrPrivacy,
  editCurrPrivacy,
  setEditCurrPrivacy,
  profileFollowers,
  setProfileFollowers,
  profileFollowedUsers,
  profileUsersBlocks,
  setProfileUsersBlocks,
  setProfileFollowedUsers,
  showProfile,
}) => {
  const dispatch = useDispatch();

  const CURR_PROFILE = useSelector(
    (state: RootState) => state.profile.CURR_PROFILE
  );
  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );
  const SHOW_SETTINGS_MENU = useSelector(
    (state: RootState) => state.profile.SHOW_SETTINGS_MENU
  );

  // const { API } = Constants?.easConfig.extra;
  const predataString = API;

  const [showProfileRows, setShowProfileRows] = useState(false);
  const [showPrivacyRows, setShowPrivacyRows] = useState(false);
  const [showHeaderCaptionMenu, setShowHeaderCaptionMenu] =
    useState<boolean>(false);

  // followers | blocks
  const [showAllOursRows, setShowAllOursRows] = useState<boolean>(false);

  const [
    submitProfileAndOrPrivacyPreConfirm,
    setSubmitProfileAndOrPrivacyPreConfirm,
  ] = useState<boolean>(false);

  const { returnProfileImg } = useContentFunction();

  useEffect(() => {
    console.log("editCurrProfile", editCurrProfile);
    console.log("editCurrPrivacy", editCurrPrivacy);
    // if currProfile id exists but edirtCurrProfile doesn't.
    if (!editCurrProfile?.id && currProfile?.id) {
      // set the curr profile so the boxes that should be checked i.e. <EditDataRowCheckboxes/> correspond to current: {table.privacy} statu s.
      let profileClone = { ...currProfile };
      console.log("profileClone", profileClone);
      setEditCurrProfile(profileClone);
    }
    if (!editCurrPrivacy?.id && currPrivacy?.id) {
      let privacyClone = { ...currPrivacy };
      console.log("privacyClone", privacyClone);
      setEditCurrPrivacy(privacyClone);
      // dispatch(SET_PROFILE_USER_PRIVACY({...CURR_PROFILE?.privacy}))
    }
  }, []);

  const goBack = () => {
    // dispatch(TOGGLE_SHOW_SETTINGS_MENU())
  };

  const test = () => {
    console.log("showAllOursRows", showAllOursRows);
  };

  const showProfileMenu = () => {
    console.log("CURRENT_USER", CURRENT_USER);
    console.log("CURR_PROFILE", CURR_PROFILE);
    console.log("currProfile", currProfile);

    if (CURRENT_USER?.id !== currProfile?.user_id) {
      return;
    }

    setShowProfileRows(!showProfileRows);
    if (showPrivacyRows) setShowPrivacyRows(false);
    if (showAllOursRows) setShowAllOursRows(false);
  };

  const showPrivacyMenu = () => {
    if (CURRENT_USER?.id !== currProfile?.user_id) {
      return;
    }

    setShowPrivacyRows(!showPrivacyRows);
    if (showProfileRows) setShowPrivacyRows(false);
    if (showAllOursRows) setShowAllOursRows(false);
    if (showHeaderCaptionMenu) setShowHeaderCaptionMenu(false);
  };

  const showAllOursMenu = () => {
    setShowAllOursRows(!showAllOursRows);
    if (showPrivacyRows) setShowPrivacyRows(false);
    if (showProfileRows) setShowPrivacyRows(false);
  };

  const showHeaderCaptionMenuToggle = () => {
    setShowHeaderCaptionMenu(!showHeaderCaptionMenu);
    if (showHeaderCaptionMenu) setShowHeaderCaptionMenu(false);
  };

  const submitEditPrivacy = async () => {
    const p = { ...editCurrPrivacy };

    const query = updateUserPrivacyQueryStringFunc(
      currProfile?.id,
      currProfile?.user_id,
      p?.private_acct,
      p?.can_msg,
      p?.anon_msg,
      p?.anon_comment_icon,
      p?.custom_notification_me,
      p?.custom_notification_u,
      p?.wits_fields_notes_ok,
      p?.show_fasting_field_ok,
      p?.share_data,
      p?.prankable,
      p?.opt_in_feedgame,
      p?.opt_in_thoughtblank,
      p?.opt_in_allours,
      p?.show_history,
      p?.show_loc_in_comments,
      p?.commenting_from_location,
      p?.show_on_followers_list,
      p?.show_on_followed_users_list,
      p?.can_request_chill,
      p?.show_chill_ppl_me,
      p?.show_chill_ppl_u,
      p?.chill_list_me,
      p?.chill_list_u,
      p?.chill_msg_ok,
      p?.can_mention
    );

    const predata: any = await axios.post(predataString, { query: query });
    // const predata: any = await axios.post("http://localhost:4000/api/graphql", { query: query })

    console.log("predata", predata);
    if (!predata) {
      return null;
    }

    const data: any = predata?.data?.data?.updateUserPrivacy;
    console.log("data", data);
    if (!data) {
      return null;
    }

    setCurrPrivacy(data);
  };

  const submitEditProfile = async () => {
    let c = { ...editCurrProfile };
    c.profile_id = currProfile?.id;
    const query = updateUserProfileQueryStringFunc(c);

    const predataString = API || "http://localhost:4000/api/graphql";

    console.log("query", query);
    const predata: any = await axios.post(predataString, { query: query });
    // const predata: any = await axios.post("http://localhost:4000/api/graphql", { query: query })
    console.log("predata", predata);
    if (!predata) {
      return null;
    }

    const data: any = predata?.data?.data?.updateUserProfile;

    console.log("currProfile", currProfile);
    // console.log('data after the updatedProfile', data);
    if (!data) {
      return null;
    }

    const newData: any = {
      ...data,
      privacy: currProfile?.privacy,
      user_id: currProfile?.user_id,
    };

    console.log("newData", newData);

    // return;
    setCurrProfile(newData);
  };

  return showProfile === false ? (
    <View style={styles.settingsCont}>
      <Image style={styles.underline} source={HandUnderlineIcon1} />
    </View>
  ) : (
    <View style={styles.settingsCont}>
      {!showPrivacyRows && !showAllOursRows && (
        <View style={styles.columnCont}>
          <View style={styles.settingsRow}>
            <View style={styles.slightSplitRow}>
              <Image
                style={[{ borderRadius: 50 }]}
                source={{
                  uri: returnProfileImg(
                    currProfile?.user_id,
                    allUserProfileIcons
                  ),
                }}
              />
              <Text style={styles.settingsRowHeader}> Profile: </Text>
            </View>

            <TouchableOpacity onPress={() => showProfileMenu()}>
              <Text style={[styles.settingsRowHeader, { fontSize: 50 }]}>
                {" "}
                &darr;{" "}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {!showProfileRows && !showAllOursRows && (
        <View style={styles.columnCont}>
          <View style={styles.settingsRow}>
            <View style={styles.slightSplitRow}>
              <Image style={styles.icons} source={UserIcon} />
              <Text style={styles.settingsRowText}> Privacy: </Text>
            </View>

            <TouchableOpacity onPress={() => showPrivacyMenu()}>
              <Text style={[styles.settingsRowHeader, { fontSize: 50 }]}>
                {" "}
                &darr;{" "}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {!showProfileRows && !showPrivacyRows && (
        <View style={styles.settingsRow}>
          <View style={styles.slightSplitRow}>
            <TouchableOpacity onPress={test}>
              <Text style={styles.settingsRowText}> all ours </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={showAllOursMenu}>
            <Text style={[styles.settingsRowHeader, { fontSize: 50 }]}>
              {" "}
              &darr;{" "}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {showProfileRows && !showPrivacyRows && !showAllOursRows && (
        <ScrollView contentContainerStyle={styles.settingsCont}>
          <View style={styles.settingsRow}>
            <Text style={styles.settingsRowHeader}> update </Text>

            <TouchableOpacity onPress={submitEditProfile}>
              <Image style={styles.iconMini} source={GreenForwardArrowIcon} />
            </TouchableOpacity>
          </View>

          {!showHeaderCaptionMenu ? (
            <ScrollView contentContainerStyle={styles.settingsCont}>
              <UserProfileIconRow
                allUserProfileIcons={allUserProfileIcons}
                editCurrProfile={editCurrProfile}
                currProfile={currProfile}
                setEditCurrProfile={setEditCurrProfile}
              />

              <ModularStringRowInput
                editCurrProfile={editCurrProfile}
                setEditCurrProfile={setEditCurrProfile}
                objKey="username"
                objKeyType="string"
                maxLength={30}
              />
              <ModularStringRowInput
                editCurrProfile={editCurrProfile}
                setEditCurrProfile={setEditCurrProfile}
                objKey="name"
                objKeyType="string"
                maxLength={30}
              />
              <ModularStringRowInput
                editCurrProfile={editCurrProfile}
                setEditCurrProfile={setEditCurrProfile}
                objKey="pronouns"
                objKeyType="string"
                maxLength={10}
              />

              <ModularStringRowInput
                editCurrProfile={editCurrProfile}
                setEditCurrProfile={setEditCurrProfile}
                objKey="bio"
                objKeyType="string"
                maxLength={333}
              />

              <ModularStringRowInput
                editCurrProfile={editCurrProfile}
                setEditCurrProfile={setEditCurrProfile}
                objKey="creator_acct"
                objKeyType="string"
                maxLength={15}
              />
              <ModularStringRowInput
                editCurrProfile={editCurrProfile}
                setEditCurrProfile={setEditCurrProfile}
                objKey="location_text"
                objKeyType="string"
                maxLength={20}
              />

              <ModularStringRowInput
                editCurrProfile={editCurrProfile}
                setEditCurrProfile={setEditCurrProfile}
                objKey="show_friend_count"
                objKeyType="boolean"
                maxLength={0}
              />
              <ModularStringRowInput
                editCurrProfile={editCurrProfile}
                setEditCurrProfile={setEditCurrProfile}
                objKey="show_followed_users_list"
                objKeyType="boolean"
                maxLength={0}
              />
              <ModularStringRowInput
                editCurrProfile={editCurrProfile}
                setEditCurrProfile={setEditCurrProfile}
                objKey="users_can_listen"
                objKeyType="boolean"
                maxLength={0}
              />

              <View style={styles.settingsRow}>
                <View style={styles.slightSplitRow}>
                  <Text style={styles.settingsRowText}> me: </Text>
                </View>

                <TouchableOpacity onPress={showHeaderCaptionMenuToggle}>
                  <Text style={styles.settingsRowText}> &darr; </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          ) : (
            <ScrollView contentContainerStyle={styles.settingsCont}>
              <TouchableOpacity onPress={showHeaderCaptionMenuToggle}>
                <Text style={styles.settingsRowText}> &darr; </Text>
              </TouchableOpacity>

              <ModularStringRowInput
                editCurrProfile={editCurrProfile}
                setEditCurrProfile={setEditCurrProfile}
                objKey="text_1_header"
                objKeyType="string"
                maxLength={75}
              />
              <ModularStringRowInput
                editCurrProfile={editCurrProfile}
                setEditCurrProfile={setEditCurrProfile}
                objKey="text_1_caption"
                objKeyType="string"
                maxLength={75}
              />
              <ModularStringRowInput
                editCurrProfile={editCurrProfile}
                setEditCurrProfile={setEditCurrProfile}
                objKey="text_2_header"
                objKeyType="string"
                maxLength={75}
              />
              <ModularStringRowInput
                editCurrProfile={editCurrProfile}
                setEditCurrProfile={setEditCurrProfile}
                objKey="text_2_caption"
                objKeyType="string"
                maxLength={75}
              />
              <ModularStringRowInput
                editCurrProfile={editCurrProfile}
                setEditCurrProfile={setEditCurrProfile}
                objKey="text_3_header"
                objKeyType="string"
                maxLength={75}
              />
              <ModularStringRowInput
                editCurrProfile={editCurrProfile}
                setEditCurrProfile={setEditCurrProfile}
                objKey="text_3_caption"
                objKeyType="string"
                maxLength={75}
              />
              <ModularStringRowInput
                editCurrProfile={editCurrProfile}
                setEditCurrProfile={setEditCurrProfile}
                objKey="text_4_header"
                objKeyType="string"
                maxLength={75}
              />
              <ModularStringRowInput
                editCurrProfile={editCurrProfile}
                setEditCurrProfile={setEditCurrProfile}
                objKey="text_4_caption"
                objKeyType="string"
                maxLength={75}
              />
              <ModularStringRowInput
                editCurrProfile={editCurrProfile}
                setEditCurrProfile={setEditCurrProfile}
                objKey="text_5_header"
                objKeyType="string"
                maxLength={75}
              />
              <ModularStringRowInput
                editCurrProfile={editCurrProfile}
                setEditCurrProfile={setEditCurrProfile}
                objKey="text_5_caption"
                objKeyType="string"
                maxLength={75}
              />
              <ModularStringRowInput
                editCurrProfile={editCurrProfile}
                setEditCurrProfile={setEditCurrProfile}
                objKey="text_6_header"
                objKeyType="string"
                maxLength={75}
              />
              <ModularStringRowInput
                editCurrProfile={editCurrProfile}
                setEditCurrProfile={setEditCurrProfile}
                objKey="text_6_caption"
                objKeyType="string"
                maxLength={75}
              />
              <ModularStringRowInput
                editCurrProfile={editCurrProfile}
                setEditCurrProfile={setEditCurrProfile}
                objKey="text_7_header"
                objKeyType="string"
                maxLength={75}
              />
              <ModularStringRowInput
                editCurrProfile={editCurrProfile}
                setEditCurrProfile={setEditCurrProfile}
                objKey="text_7_caption"
                objKeyType="string"
                maxLength={75}
              />
            </ScrollView>
          )}
        </ScrollView>
      )}

      {showPrivacyRows && !showProfileRows && !showAllOursRows && (
        // showPrivacyRows &&
        <View style={styles.settingsCont}>
          <View style={styles.settingsRow}>
            <Text style={styles.settingsRowHeader}> update </Text>

            <TouchableOpacity onPress={submitEditPrivacy}>
              <Image style={styles.iconMini} source={GreenForwardArrowIcon} />
            </TouchableOpacity>
          </View>
          <PrivacyModularStringRowInput
            editCurrPrivacy={editCurrPrivacy}
            setEditCurrPrivacy={setEditCurrPrivacy}
            objKey={"private_acct"}
            objKeyType={"boolean"}
            maxLength={0}
          />
          <PrivacyModularStringRowInput
            editCurrPrivacy={editCurrPrivacy}
            setEditCurrPrivacy={setEditCurrPrivacy}
            objKey={"can_request_chill"}
            objKeyType={"boolean"}
            maxLength={0}
          />
          <PrivacyModularStringRowInput
            editCurrPrivacy={editCurrPrivacy}
            setEditCurrPrivacy={setEditCurrPrivacy}
            objKey={"show_chill_ppl_me"}
            objKeyType={"boolean"}
            maxLength={0}
          />
          <PrivacyModularStringRowInput
            editCurrPrivacy={editCurrPrivacy}
            setEditCurrPrivacy={setEditCurrPrivacy}
            objKey={"show_chill_ppl_u"}
            objKeyType={"boolean"}
            maxLength={0}
          />
          {/* <PrivacyModularStringRowInput editCurrPrivacy={editCurrPrivacy} setEditCurrPrivacy={setEditCurrPrivacy} objKey={"chill_list_me"} objKeyType={"boolean"} maxLength={0} /> */}
          <PrivacyModularStringRowInput
            editCurrPrivacy={editCurrPrivacy}
            setEditCurrPrivacy={setEditCurrPrivacy}
            objKey={"chill_msg_ok"}
            objKeyType={"boolean"}
            maxLength={0}
          />
          <PrivacyModularStringRowInput
            editCurrPrivacy={editCurrPrivacy}
            setEditCurrPrivacy={setEditCurrPrivacy}
            objKey={"can_mention"}
            objKeyType={"boolean"}
            maxLength={0}
          />
        </View>
      )}

      {showAllOursRows && (
        // && !showProfileRows && !showPrivacyRows &&

        <ProfileFollowersList
          currProfile={currProfile}
          profileFollowers={profileFollowers}
          setProfileFollowers={setProfileFollowers}
          profileFollowedUsers={profileFollowedUsers}
          setProfileFollowedUsers={setProfileFollowedUsers}
          profileUsersBlocks={profileUsersBlocks}
          setProfileUsersBlocks={setProfileUsersBlocks}
          allUserProfileIcons={allUserProfileIcons}
        />
      )}

      {/*      <p style={styles.profilePicAndDataText} onClick={goBack}> hey how are you </p>     */}
    </View>
  );
};

const styles = StyleSheet.create({
  settingsCont: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    height: screenHeight * 0.8,
    width: screenWidth,
    // borderWidth: 2,
    // borderColor: grayphite,
    gap: 10,
    // paddingVertical: 2.5,
    paddingHorizontal: 5,
  },
  columnCont: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 5,
    width: "100%",
  },
  settingsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: grayphite,
    borderStyle: "dotted",
  },
  slightSplitRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  settingsRowHeader: {
    fontFamily: "Fuzzy Bubbles",
    color: grayphite,
    fontSize: 18,
  },
  settingsRowText: {
    fontFamily: "Fuzzy Bubbles",
    color: grayphite,
    fontSize: 14,
  },
  icons: {
    height: 35,
    width: 35,
  },
  iconMini: {
    height: 20,
    width: 20,
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
  ghost: {
    opacity: 0,
  },
  ballotOptionsMedia: {
    height: screenHeight / 10,
    width: screenHeight / 10,
  },

  container: {
    gap: 5,
    // padding: 10,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  centerCont: {
    flex: 1, // Allow this to take remaining space
    height: screenHeight * 0.325,
    width: "100%",
    justifyContent: "center", // Center the content vertically
    alignItems: "center",
  },
  underline: {
    height: 20,
    width: screenWidth / 2,
  },
});

export default ProfileSettings;
