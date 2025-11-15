import { useState, useEffect, useRef } from "react";

// redux
import { RootState } from "@/redux/store/rootReducer";
import { useSelector, useDispatch } from "react-redux";

import {
  Dimensions,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  View,
  Text,
  StyleSheet,
} from "react-native";
import ModularMultiOptionRow from "./ModularMultiOptionRow";
import ErrorSlippedUpBanana from "@/components/ErrorSlippedUpBanana";
import CategoryRow from "./CategoryRow";
import LocationRow from "./LocationRow";
import InviteOnlyUsersRow from "./InviteOnlyUsersRow";
import FeedFaceRow from "./FeedFaceRow";

import { useContentFunction } from "@/Contexts/ContentFunctions";
import {
  ShurikenIcon,
  PlainMsgButtonIcon,
  EyesIcon,
  TrashIcon,
  ThoughtsIcon,
  MomentsIcon,
  FieldsIcon,
  GreatfullIcon,
  CommenterCanDetermineIcon,
  SoundIcon,
  SoundWaveIcon,
  MasqueradeIcon,
  CommentIcon,
  LockIcon,
  UnlockIcon,
  AnonymityMaskIcon,
  StarIcon,
} from "@/constants/Images";

// const { commenterCanDetermineIcon, iconSound, iconSoundWave, masquerade, commentThoughtBg, padlock, unlock } = useImage();

import { grayphite } from "@/constants/Colors";

// 🚨 🚨 🚨 these settings also become the text_comments_ok for postingUserThoughts

// SETTINGS: {
//     // comment is non_anonymous as in true:public false:anonymous
//     private: false,
//     invite_only: false,
//     non_anonymous: true,    // show icon or show groucho mask lol.
//     starrable: true,
//     thoughts_ok: true,
//     commenter_can_determine: true,
//     voice_comments_ok: true,
//     text_comments_ok: true,
//     anonymous_comment_ok: true, // show yellow mask.
//     i_can_unlock: true,
//     u_can_unlock: true,
// },

interface props {
  day: any;
  setDay: any;
  inviteOnlyUsersList: any;
  setInviteOnlyUsersList: any;
  unlockUpdater: any;
  setUnlockUpdater: any;
  allUserProfileIcons: any;
}

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const Settings: React.FC<props> = ({
  day,
  setDay,
  inviteOnlyUsersList,
  setInviteOnlyUsersList,
  unlockUpdater,
  setUnlockUpdater,
  allUserProfileIcons,
}) => {
  // let settings = day?.settings || null;

  const checkIfCustomLockExists = (unlockUpdater: any) => {
    // return bool
    if (
      unlockUpdater?.thoughts?.includes("custom") ||
      unlockUpdater?.moments?.includes("custom") ||
      unlockUpdater?.fields?.includes("custom") ||
      unlockUpdater?.greatfull?.includes("custom") ||
      unlockUpdater?.comments?.includes("custom") ||
      unlockUpdater?.votes?.includes("custom")
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.settingsCont}>
      {/* <View style={styles.settingsCont}> */}
      <Text style={styles.settingsRowHeader}> Settings: </Text>

      <FeedFaceRow day={day} setDay={setDay} />

      <SettingsRow
        allUserProfileIcons={allUserProfileIcons}
        day={day}
        setDay={setDay}
        unlockUpdater={unlockUpdater}
        setUnlockUpdater={setUnlockUpdater}
        objKey={"private"}
      />
      <InviteOnlyUsersRow
        day={day}
        setDay={setDay}
        inviteOnlyUserList={inviteOnlyUsersList}
        setInviteOnlyUserList={setInviteOnlyUsersList}
        allUserProfileIcons={allUserProfileIcons}
      />
      {/* <SettingsRow allUserProfileIcons={allUserProfileIcons} theUnlockUpdater={theUnlockUpdater} objKey={"invite_only"} /> */}

      {!day?.settings?.private && !day?.settings?.invite_only && (
        <ModularMultiOptionRow
          day={day}
          setDay={setDay}
          allUserProfileIcons={allUserProfileIcons}
          objKey={"non_anonymous"}
        />
      )}

      <ModularMultiOptionRow
        day={day}
        setDay={setDay}
        allUserProfileIcons={allUserProfileIcons}
        objKey={"starrable"}
      />

      {day?.settings?.starrable !== "no" && (
        <StarsAvgUsersRow day={day} setDay={setDay} />
      )}
      {/* <SettingsRow allUserProfileIcons={allUserProfileIcons} theUnlockUpdater={theUnlockUpdater} objKey={"starrable"} /> */}
      {!day?.settings?.private && (
        <ModularMultiOptionRow
          day={day}
          setDay={setDay}
          allUserProfileIcons={allUserProfileIcons}
          objKey={"thoughts_ok"}
        />
      )}

      {/* <SettingsRow allUserProfileIcons={allUserProfileIcons} theUnlockUpdater={theUnlockUpdater} objKey={"thoughts_ok"} /> */}
      {!day?.settings?.private && (
        <SettingsRow
          allUserProfileIcons={allUserProfileIcons}
          day={day}
          setDay={setDay}
          unlockUpdater={unlockUpdater}
          setUnlockUpdater={setUnlockUpdater}
          objKey={"commenter_can_determine"}
        />
      )}

      {day?.settings?.thoughts_ok !== "no" && !day?.settings?.private && (
        <View style={styles.columnCont}>
          <SettingsRow
            allUserProfileIcons={allUserProfileIcons}
            day={day}
            setDay={setDay}
            unlockUpdater={unlockUpdater}
            setUnlockUpdater={setUnlockUpdater}
            objKey={"voice_comments_ok"}
          />
          <SettingsRow
            allUserProfileIcons={allUserProfileIcons}
            day={day}
            setDay={setDay}
            unlockUpdater={unlockUpdater}
            setUnlockUpdater={setUnlockUpdater}
            objKey={"text_comments_ok"}
          />
          <SettingsRow
            allUserProfileIcons={allUserProfileIcons}
            day={day}
            setDay={setDay}
            unlockUpdater={unlockUpdater}
            setUnlockUpdater={setUnlockUpdater}
            objKey={"anonymous_comments_ok"}
          />
          <SettingsRow
            allUserProfileIcons={allUserProfileIcons}
            day={day}
            setDay={setDay}
            unlockUpdater={unlockUpdater}
            setUnlockUpdater={setUnlockUpdater}
            objKey={"comment_locks_ok"}
          />

          {checkIfCustomLockExists(unlockUpdater) && (
            <View style={styles.columnCont}>
              <SettingsRow
                allUserProfileIcons={allUserProfileIcons}
                day={day}
                setDay={setDay}
                unlockUpdater={unlockUpdater}
                setUnlockUpdater={setUnlockUpdater}
                objKey={"i_can_unlock"}
              />
              <SettingsRow
                allUserProfileIcons={allUserProfileIcons}
                day={day}
                setDay={setDay}
                unlockUpdater={unlockUpdater}
                setUnlockUpdater={setUnlockUpdater}
                objKey={"u_can_unlock"}
              />
            </View>
          )}
        </View>
      )}
      <CategoryRow day={day} setDay={setDay} />
      <LocationRow day={day} setDay={setDay} />
      {/* <SettingsRow allUserProfileIcons={allUserProfileIcons} theUnlockUpdater={theUnlockUpdater} objKey={"location"} /> */}
    </ScrollView>
    // </View>
  );
};

interface SettingsRowProps {
  objKey: any;
  unlockUpdater: any;
  setUnlockUpdater: any;
  day: any;
  setDay: any;
  allUserProfileIcons: any;
}

const SettingsRow: React.FC<SettingsRowProps> = ({
  objKey,
  unlockUpdater,
  setUnlockUpdater,
  day,
  setDay,
  allUserProfileIcons,
}) => {
  const settings = day?.settings;

  const [noCustomLockErr, setNoCustomLockErr] = useState(false);
  //     private: false,
  //     invite_only: false,
  //     non_anonymous: true,    // show icon or show groucho mask lol.
  //     starrable: true,
  //     thoughts_ok: true,
  //     commenter_can_determine: true,
  //     voice_comments_ok: true,
  //     text_comments_ok: true,
  //     anonymous_comment_ok: true, // show yellow mask.
  //     i_can_unlock: true,
  //     u_can_unlock: true,
  // },

  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );

  const { returnProfileImg } = useContentFunction();

  const checkIfCustomLockExists = (unlockUpdater: any) => {
    // return bool
    if (
      unlockUpdater?.thoughts?.includes("custom") ||
      unlockUpdater?.moments?.includes("custom") ||
      unlockUpdater?.fields?.includes("custom") ||
      unlockUpdater?.greatfull?.includes("custom") ||
      unlockUpdater?.comments?.includes("custom") ||
      unlockUpdater?.votes?.includes("custom")
    ) {
      return true;
    } else {
      return false;
    }
  };

  const checkboxChange = (objKey: string) => {
    let clone = { ...day };
    let settingsClone = { ...clone?.settings };
    console.log("clone", clone);
    console.log("settingsClone", settingsClone);

    console.log("objKey here", objKey);

    if (objKey === "private") {
      // if (settingsClone?.private === true) {
      //     settingsClone.non_anonymous = "yes"
      //     settingsClone.thoughts_ok = "no"
      //     settingsClone.comment_locks_ok = false;
      //     settingsClone.voice_comments_ok = false;
      //     settingsClone.text_comments_ok = false;
      //     settingsClone.anonymous_comments_ok = false
      //     settingsClone.starrable = "no"
      //     settingsClone.commenter_can_determine = false
      //     settingsClone.show_views_ok = false
      //     settingsClone.stars_show_avg = false
      //     settingsClone.stars_show_users = false
      // }

      if (settingsClone.private === true) {
        settingsClone.private = false;
      } else {
        settingsClone.private = true;
      }
      clone.settings = settingsClone;
      console.log("clone after", clone);
      setDay(clone);
      // dispatch(SET_SETTINGS(clone))
    }
    if (objKey === "invite_only") {
      if (settingsClone.invite_only === true) {
        settingsClone.invite_only = false;
      } else {
        settingsClone.invite_only = true;
      }

      clone.settings = settingsClone;
      setDay(clone);
      // dispatch(SET_SETTINGS(settingsClone))
    }
    if (objKey === "text_comments_ok") {
      if (settingsClone.text_comments_ok === true) {
        settingsClone.text_comments_ok = false;
      } else {
        settingsClone.text_comments_ok = true;
      }
      clone.settings = settingsClone;
      setDay(clone);
      // dispatch(SET_SETTINGS(settingsClone))
    }
    if (objKey === "voice_comments_ok") {
      if (settingsClone.voice_comments_ok === true) {
        settingsClone.voice_comments_ok = false;
      } else {
        settingsClone.voice_comments_ok = true;
      }
      // settingsClone.voice_comments_ok = !settingsClone.voice_comments_ok
      clone.settings = settingsClone;
      setDay(clone);
      // dispatch(SET_SETTINGS(settingsClone))
    }
    if (objKey === "commenter_can_determine") {
      settingsClone.commenter_can_determine =
        !settingsClone.commenter_can_determine;
      clone.settings = settingsClone;
      setDay(clone);
      // dispatch(SET_SETTINGS(settingsClone))
    }
    if (objKey === "anonymous_comments_ok") {
      settingsClone.anonymous_comments_ok =
        !settingsClone.anonymous_comments_ok;
      clone.settings = settingsClone;
      setDay(clone);
      // dispatch(SET_SETTINGS(clone))
    }
    if (objKey === "comment_locks_ok") {
      settingsClone.comment_locks_ok = !settingsClone.comment_locks_ok;
      clone.settings = settingsClone;
      setDay(clone);
      // dispatch(SET_SETTINGS(clone))
    }
    if (objKey === "i_can_unlock") {
      const doesCustomLockExist = checkIfCustomLockExists(unlockUpdater);
      console.log("doesCustomLockExist", doesCustomLockExist);
      if (doesCustomLockExist) {
        settingsClone.i_can_unlock = !settingsClone.i_can_unlock;
        clone.settings = settingsClone;
        setDay(clone);
        // dispatch(SET_SETTINGS(settingsClone))
      } else {
        setNoCustomLockErr(true);
      }
    }
    if (objKey === "u_can_unlock") {
      const doesCustomLockExist = checkIfCustomLockExists(unlockUpdater);
      console.log("doesCustomLockExist", doesCustomLockExist);
      if (doesCustomLockExist) {
        settingsClone.u_can_unlock = !settingsClone.u_can_unlock;
        clone.settings = settingsClone;
        setDay(clone);
        // dispatch(SET_SETTINGS(clone))
      } else {
        setNoCustomLockErr(true);
      }
    }
  };

  const test = () => {};

  return (
    <View style={styles.columnCont}>
      <View style={styles.uploadSettingsRow}>
        {objKey === "commenter_can_determine" ? (
          <View style={styles.uploadSettingsRow}>
            <Text style={styles.settingsRowText}> commenter settings </Text>
            <Image style={styles.icons} source={CommenterCanDetermineIcon} />
          </View>
        ) : objKey === "text_comments_ok" ? (
          <View style={styles.uploadSettingsRow}>
            <Text style={styles.settingsRowText}> text comment ok </Text>
            <TextInput style={styles.input} readOnly={true} />
          </View>
        ) : objKey === "voice_comments_ok" ? (
          <View style={styles.uploadSettingsRow}>
            <Text style={styles.settingsRowText}> voice ok </Text>
            <Image style={styles.icons} source={SoundIcon} />
            <Image style={styles.icons} source={SoundWaveIcon} />
          </View>
        ) : objKey === "anonymous_comments_ok" ? (
          <View style={styles.uploadSettingsRow}>
            <Image style={styles.icons} source={AnonymityMaskIcon} />
            <Text style={styles.settingsRowText}> anonymous comments </Text>
            <Image style={styles.icons} source={MasqueradeIcon} />
          </View>
        ) : objKey === "i_can_unlock" ? (
          noCustomLockErr ? (
            <ErrorSlippedUpBanana
              size="mini"
              setShowError={setNoCustomLockErr}
            />
          ) : (
            <View style={styles.slightSplitRow}>
              <Text style={styles.settingsRowText}> i can </Text>
              <Image style={styles.icons} source={UnlockIcon} />
            </View>
          )
        ) : objKey === "u_can_unlock" ? (
          noCustomLockErr ? (
            <ErrorSlippedUpBanana
              size="mini"
              setShowError={setNoCustomLockErr}
            />
          ) : (
            <View style={styles.slightSplitRow}>
              <Text style={styles.settingsRowText}> u can </Text>
              <Image style={styles.icons} source={UnlockIcon} />
            </View>
          )
        ) : objKey === "comment_locks_ok" ? (
          <View style={styles.slightSplitRow}>
            <Image style={styles.icons} source={CommentIcon} />
            <Image style={styles.icons} source={LockIcon} />
          </View>
        ) : (
          <Text style={styles.settingsRowText}> {objKey} </Text>
        )}

        <TouchableOpacity
          style={[
            {
              backgroundColor:
                (objKey === "private" && settings?.private) ||
                (objKey === "invite_only" && settings?.invite_only) ||
                (objKey === "anonymous_comments_ok" &&
                  settings?.anonymous_comments_ok) ||
                (objKey === "commenter_can_determine" &&
                  settings?.commenter_can_determine) ||
                (objKey === "text_comments_ok" && settings?.text_comments_ok) ||
                (objKey === "voice_comments_ok" &&
                  settings?.voice_comments_ok) ||
                (objKey === "i_can_unlock" && settings?.i_can_unlock) ||
                (objKey === "u_can_unlock" && settings?.u_can_unlock) ||
                (objKey === "comment_locks_ok" && settings?.comment_locks_ok)
                  ? "grey"
                  : "transparent",
              // backgroundColor: objKey === "non_anonymous" || settings?.non_anonymous === "no" || objKey === "starrable" || settings?.starrable === "yes" || objKey === "thoughts_ok" || settings?.thoughts_ok === "yes" || false ? "grey" : ""
            },
            styles.button,
          ]}
          onPress={() => checkboxChange(objKey)}
        />
      </View>
      {objKey === "invite_only" && (
        // keep in mind people can comment as well.
        <Text> users search bar for invites </Text>
      )}
    </View>
  );
};

interface StarsAvgUsersRowProps {
  day: any;
  setDay: any;
}

const StarsAvgUsersRow: React.FC<StarsAvgUsersRowProps> = ({ day, setDay }) => {
  const settings = day?.settings;

  const dispatch = useDispatch();

  const checkboxChange = (key: string) => {
    let clone = { ...day };
    let settingsClone = clone?.settings;
    if (key === "show-avg") {
      if (settingsClone.stars_show_avg === true) {
        settingsClone.stars_show_avg = false;
      } else {
        settingsClone.stars_show_avg = true;
      }
      // settingsClone.stars_show_avg = !settingsClone?.stars_show_avg
      clone.settings = settingsClone;
      setDay(clone);
    }
    if (key === "show-users") {
      if (settingsClone.stars_show_users === true) {
        settingsClone.stars_show_users = false;
      } else {
        settingsClone.stars_show_users = true;
      }
      // clone.stars_show_users = !clone.stars_show_users
      clone.settings = settingsClone;
      setDay(clone);
    }
  };

  return (
    <View style={styles.uploadSettingsRow}>
      {/* // onClick={test} */}
      <Image style={styles.icons} source={StarIcon} />

      <Text style={styles.settingsRowText}> show avg </Text>

      <TouchableOpacity
        style={[
          {
            backgroundColor: settings?.stars_show_avg ? "grey" : "transparent",
          },
          styles.button,
        ]}
        onPress={() => checkboxChange("show-avg")}
      />

      <Text style={styles.settingsRowText}> show users </Text>

      <TouchableOpacity
        style={[
          {
            backgroundColor: settings?.stars_show_users
              ? "grey"
              : "transparent",
          },
          styles.button,
        ]}
        onPress={() => checkboxChange("show-users")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  settingsCont: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 20,
    // padding: 20,
    width: screenWidth,
    // width: screenWidth / 1.5
  },
  columnCont: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 30,
    // padding: 10,
  },
  uploadSettingsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    borderColor: "green",
    // padding:
  },
  slightSplitRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  settingsRowHeader: {
    fontFamily: "Nunito SanS",
    color: grayphite,
    fontSize: 18,
  },
  settingsRowText: {
    fontFamily: "Nunito SanS",
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
    marginLeft: 5,
  },
  input: {
    width: 24, // give it realistic room for text
    maxHeight: 20, // ✅ fixes the tall-on-type issue
    // maxHeight: 30, // ✅ fixes the tall-on-type issue
    paddingVertical: 0, // remove RN’s default 5-6 px padding
    paddingHorizontal: 8,
    borderRadius: 50,
    borderTopLeftRadius: 14.5,
    borderTopRightRadius: 65.5,
    borderBottomLeftRadius: 122.5,
    borderBottomRightRadius: 30,
    color: "#444",
    fontFamily: "fuzzy",
    fontSize: 10,
    borderWidth: 1.5,
    borderColor: "#44454fea",
    textAlignVertical: "center", // ✅ keeps text centered on Android
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
});

export default Settings;
