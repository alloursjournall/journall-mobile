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

interface props {
  day: any;
  setDay: any;
  objKey: any;
  allUserProfileIcons: any;
}

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const ModularMultiOptionRow: React.FC<props> = ({
  day,
  setDay,
  objKey,
  allUserProfileIcons,
}) => {
  const dispatch = useDispatch();
  const settings = day?.settings;
  ``;
  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );

  const [showMore, setShowMore] = useState(false);

  const { returnProfileImg } = useContentFunction();

  const checkboxChange = (chbox: string) => {
    console.log("chbox", chbox);
    let clone = { ...day };
    let settings = { ...clone?.settings };
    if (objKey === "non_anonymous") {
      if (chbox === "yes") {
        settings.non_anonymous = "no";
        clone.settings = settings;
        setDay(clone);
        // dispatch(SET_SETTINGS(settings))
      }
      if (chbox === "no") {
        settings.non_anonymous = "yes";
        clone.settings = settings;
        setDay(clone);
        // dispatch(SET_SETTINGS(settings))
      }
      if (chbox === "followers") {
        settings.non_anonymous = "followers";
        clone.settings = settings;
        setDay(clone);
        // dispatch(SET_SETTINGS(settings))
      }
      if (chbox === "followed_users") {
        settings.non_anonymous = "followed_users";
        clone.settings = settings;
        setDay(clone);
        // dispatch(SET_SETTINGS(settings))
      }
      if (chbox === "f_f") {
        settings.non_anonymous = "f_f";
        clone.settings = settings;
        setDay(clone);
        // dispatch(SET_SETTINGS(settings))
      }
    }
    if (objKey === "starrable") {
      if (chbox === "yes") {
        settings.starrable = "yes";
        clone.settings = settings;
        setDay(clone);
        // dispatch(SET_SETTINGS(settings))
      }
      if (chbox === "no") {
        settings.starrable = "no";
        clone.settings = settings;
        setDay(clone);
        // dispatch(SET_SETTINGS(settings))
      }
      if (chbox === "followers") {
        settings.starrable = "followers";
        clone.settings = settings;
        setDay(clone);
        // dispatch(SET_SETTINGS(settings))
      }
      if (chbox === "followed_users") {
        settings.starrable = "followed_users";
        clone.settings = settings;
        setDay(clone);
        // dispatch(SET_SETTINGS(settings))
      }
      if (chbox === "f_f") {
        settings.starrable = "f_f";
        clone.settings = settings;
        setDay(clone);
        // dispatch(SET_SETTINGS(settings))
      }
    }
    if (objKey === "thoughts_ok") {
      if (chbox === "yes") {
        settings.thoughts_ok = "yes";
        clone.settings = settings;
        setDay(clone);
        // dispatch(SET_SETTINGS(settings))
      }
      if (chbox === "no") {
        settings.thoughts_ok = "no";
        clone.settings = settings;
        setDay(clone);
        // dispatch(SET_SETTINGS(settings))
      }
      if (chbox === "followers") {
        settings.thoughts_ok = "followers";
        clone.settings = settings;
        setDay(clone);
        // dispatch(SET_SETTINGS(settings))
      }
      if (chbox === "followed_users") {
        settings.thoughts_ok = "followed_users";
        clone.settings = settings;
        setDay(clone);
        // dispatch(SET_SETTINGS(settings))
      }
      if (chbox === "f_f") {
        settings.thoughts_ok = "f_f";
        clone.settings = settings;
        setDay(clone);
        // dispatch(SET_SETTINGS(settings))
      }
    }
    //   yes to anonymous so non_anonymous = false|"no" lol
  };

  const showMoreClick = () => {
    setShowMore(!showMore);
  };

  return (
    <View style={styles.columnCont}>
      <View style={styles.uploadSettingsRow}>
        <DisplayMsg
          day={day}
          objKey={objKey}
          allUserProfileIcons={allUserProfileIcons}
        />

        <View style={styles.uploadSettingsRow}>
          <Text style={styles.settingsRowText}> yes </Text>

          <TouchableOpacity
            style={[
              {
                backgroundColor:
                  (objKey === "non_anonymous" &&
                    settings?.non_anonymous === "no") ||
                  (objKey === "starrable" && settings?.starrable === "yes") ||
                  (objKey === "thoughts_ok" && settings?.thoughts_ok === "yes")
                    ? "grey"
                    : "transparent",
                // backgroundColor: objKey === "non_anonymous" || settings?.non_anonymous === "no" || objKey === "starrable" || settings?.starrable === "yes" || objKey === "thoughts_ok" || settings?.thoughts_ok === "yes" || false ? "grey" : ""
              },
              styles.button,
            ]}
            onPress={() => checkboxChange("yes")}
          />
        </View>

        <View style={styles.uploadSettingsRow}>
          <Text style={styles.settingsRowText}> no </Text>

          <TouchableOpacity
            style={[
              {
                backgroundColor:
                  (objKey === "non_anonymous" &&
                    settings?.non_anonymous === "yes") ||
                  (objKey === "starrable" && settings?.starrable === "no") ||
                  (objKey === "thoughts_ok" && settings?.thoughts_ok === "no")
                    ? "grey"
                    : "transparent",
                // backgroundColor: objKey === "non_anonymous" || settings?.non_anonymous === "yes" || objKey === "starrable" || settings?.starrable === "yes" || objKey === "thoughts_ok" || settings?.thoughts_ok === "yes" || false ? "grey" : ""
              },
              styles.button,
            ]}
            onPress={() => checkboxChange("no")}
          />
        </View>

        {/* color indicators cuz: if posting-user selects i.e. "followers" can (in this case) see content based on SETTINGS.non_anonymous */}
        <TouchableOpacity onPress={showMoreClick}>
          <Text style={[styles.settingsRowText, { fontSize: 50 }]}>
            {" "}
            &darr;{" "}
          </Text>
        </TouchableOpacity>
      </View>
      {showMore && (
        <View style={styles.uploadSettingsRow}>
          <View style={styles.uploadSettingsRow}>
            <Text style={styles.settingsRowText}> u follow </Text>

            <TouchableOpacity
              style={[
                {
                  backgroundColor:
                    (objKey === "non_anonymous" &&
                      settings?.non_anonymous === "followers") ||
                    (objKey === "starrable" &&
                      settings?.starrable === "followers") ||
                    (objKey === "thoughts_ok" &&
                      settings?.thoughts_ok === "followers")
                      ? "grey"
                      : "transparent",
                  // backgroundColor: objKey === "non_anonymous" && settings?.non_anonymous === "yes" || objKey === "starrable" && settings?.starrable === "no" || objKey === "thoughts_ok" && settings?.thoughts_ok === "no" ? "grey" : ""
                },
                styles.button,
              ]}
              onPress={() => checkboxChange("followers")}
            />
          </View>

          <View style={styles.uploadSettingsRow}>
            <Text style={styles.settingsRowText}> i follow </Text>

            <TouchableOpacity
              style={[
                {
                  backgroundColor:
                    (objKey === "non_anonymous" &&
                      settings?.non_anonymous === "followed_users") ||
                    (objKey === "starrable" &&
                      settings?.starrable === "followed_users") ||
                    (objKey === "thoughts_ok" &&
                      settings?.thoughts_ok === "followed_users")
                      ? "grey"
                      : "",
                  // backgroundColor: objKey === "non_anonymous" && settings?.non_anonymous === "yes" || objKey === "starrable" && settings?.starrable === "no" || objKey === "thoughts_ok" && settings?.thoughts_ok === "no" ? "grey" : ""
                },
                styles.button,
              ]}
              onPress={() => checkboxChange("followed_users")}
            />

            {/* objKey === "non_anonymous" ? settings?.non_anonymous === "followed_users" : objKey === "starrable" ? settings?.starrable === "followed_users" : objKey === "thoughts_ok" ? settings?.thoughts_ok === "followed_users" : false */}
          </View>

          <View style={styles.uploadSettingsRow}>
            <Text style={styles.settingsRowText}> either </Text>

            <TouchableOpacity
              style={[
                {
                  backgroundColor:
                    (objKey === "non_anonymous" &&
                      settings?.non_anonymous === "f_f") ||
                    (objKey === "starrable" && settings?.starrable === "f_f") ||
                    (objKey === "thoughts_ok" &&
                      settings?.thoughts_ok === "f_f")
                      ? "grey"
                      : "transparent",
                  // backgroundColor: objKey === "non_anonymous" && settings?.non_anonymous === "yes" || objKey === "starrable" && settings?.starrable === "no" || objKey === "thoughts_ok" && settings?.thoughts_ok === "no" ? "grey" : ""
                },
                styles.button,
              ]}
              onPress={() => checkboxChange("f_f")}
            />
          </View>
        </View>
      )}
    </View>
  );
};

interface DisplayMsgProps {
  day: any;
  objKey: string;
  allUserProfileIcons: any;
}

const DisplayMsg: React.FC<DisplayMsgProps> = ({
  day,
  objKey,
  allUserProfileIcons,
}) => {
  const settings = day?.settings;

  const dispatch = useDispatch();
  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );

  const { returnProfileImg } = useContentFunction();

  console.log("objKey displayMsg", objKey);

  return objKey === "non_anonymous" ? (
    <View style={styles.uploadSettingsRow}>
      {settings?.non_anonymous === "yes" ? (
        <Text style={styles.settingsRowText}> anonymous </Text>
      ) : settings?.non_anonymous === "yes" ||
        settings?.non_anonymous === "followers" ||
        settings?.non_anonymous === "followed_users" ||
        settings?.non_anonymous === "f_f" ? (
        <Image
          style={styles.icons}
          source={returnProfileImg(CURRENT_USER?.id, allUserProfileIcons)}
        />
      ) : (
        <Image style={styles.icons} source={AnonymityMaskIcon} />
      )}
    </View>
  ) : objKey === "starrable" ? (
    <Image style={styles.icons} source={StarIcon} />
  ) : (
    objKey === "thoughts_ok" && (
      <Image style={styles.icons} source={CommentIcon} />
    )
  );
};

const styles = StyleSheet.create({
  settingsCont: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
  },
  columnCont: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 5,
  },
  uploadSettingsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // width: screenWidth,
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
});

export default ModularMultiOptionRow;
