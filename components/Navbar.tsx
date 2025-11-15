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
  Platform,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
  View,
  TextInput,
  StyleSheet,
} from "react-native";
import { appBackground } from "@/constants/Colors";
import Day from "@/components/Content/Day/Day";
import NotificationList from "@/components/Content/UploadDay/Content/NotificationList";

import EditDay from "@/components/Content/EditDay/EditDay";

// utils:
import { grayphite, brownFooter } from "@/constants/Colors";
import { allDaysGETquery } from "@/graphql/queries";
import { useContentFunction } from "@/Contexts/ContentFunctions";
import {
  JournallIcon,
  HeartIcon,
  FootprintIcon,
  PhoneWithScreenIcon,
  RedBackArrowIcon,
  GreenForwardArrowIcon,
} from "@/constants/Images";

// Normalize anything (require number or string/base64/url) to a URI string

export const toUri = (input?: number | string | null): string | null => {
  if (!input) return null;

  if (typeof input === "string") {
    if (
      input.startsWith("data:") ||
      input.startsWith("http://") ||
      input.startsWith("https://") ||
      input.startsWith("file://") ||
      input.startsWith("asset://")
    ) {
      return input;
    }
    return `data:image/png;base64,${input}`;
  }

  if (typeof input === "number") {
    // ✅ Only call resolveAssetSource if it exists (mobile)
    if (typeof Image.resolveAssetSource === "function") {
      const src = Image.resolveAssetSource(input);
      return src?.uri ?? HeartIcon;
    }

    // ✅ On web, just return null (fallback handled elsewhere)
    console.warn(
      "⚠️ toUri: Image.resolveAssetSource not available on web, returning null"
    );
    return null;
  }

  return null;
};

const ProfileHeaderIcon: React.FC<Props> = ({ preLogout, iconUri }) => {
  // pick which visual we want
  const chosen = preLogout ? RedBackArrowIcon : iconUri ?? HeartIcon;

  // normalize to a uri string
  const uri = toUri(chosen) ?? toUri(HeartIcon)!;

  // key forces remount when switching “mode” just in case
  const k = preLogout
    ? "logout"
    : typeof iconUri === "string"
    ? "remote"
    : "fallback";

  return (
    <Image
      key={k}
      source={{ uri }}
      style={{ width: 28, height: 28, borderRadius: 50 }}
    />
  );
};

type Props = {
  preLogout?: boolean;
  iconUri?: string | number | null; // allow both shapes coming in
};

interface props {
  feed: any;
  setFeed: any;
  allUserProfileIcons: any;
  searchPostsInputVal: any;
  setSearchPostsInputVal: any;
  showDiscoverTool: any;
  setShowDiscoverTool: any;
  showNotifications: any;
  setShowNotifications: any;
  searchItems: any;
  setSearchItems: any;
}

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const Navbar: React.FC<props> = ({
  feed,
  setFeed,
  allUserProfileIcons,
  searchPostsInputVal,
  setSearchPostsInputVal,
  showDiscoverTool,
  setShowDiscoverTool,
  showNotifications,
  setShowNotifications,
  searchItems,
  setSearchItems,
}) => {
  const dispatch = useDispatch();

  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );
  const ALL_USERS = useSelector((state: RootState) => state.app.ALL_USERS);

  const [preLogout, setPreLogout] = useState<boolean>(false);
  const [backupFeedDuringSearch, setBackupFeedDuringSearch] =
    useState<any>(null);

  const { returnProfileImg, logout, searchContentAndUsersFunc } =
    useContentFunction();
  const iconUri = returnProfileImg(CURRENT_USER?.id, allUserProfileIcons);

  const toggleShowDiscovery = () => {
    setShowDiscoverTool(!showDiscoverTool);
  };

  const toggleShowNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const logoutFunc = () => {
    if (preLogout === false) {
      setPreLogout(true);
      return;
    } else {
      logout();
    }
  };

  const searchPostsInputValHandler = (text: string) => {
    if (text.includes("nigger")) {
      setSearchPostsInputVal("");
      return;
    } else {
      setSearchPostsInputVal(text);
      return;
    }
  };

  const searchPostsSubmit = async () => {
    let searchResults = await searchContentAndUsersFunc(
      searchPostsInputVal,
      CURRENT_USER?.id
    );
    console.log("searchResults", searchResults);
    if (!searchResults) {
      return;
    }
    // setFeed(searchResults);
    setSearchItems(searchResults);
  };

  return (
    <View style={[{ marginTop: Platform.OS === "web" ? 0 : 20 }, styles.cont]}>
      {
        // searchPostsInputVal?.length >= 1 &&
        <View style={styles.multiIconCont}>
          <TouchableOpacity onPress={logoutFunc}>
            <ProfileHeaderIcon preLogout={preLogout} iconUri={iconUri} />
          </TouchableOpacity>

          {!showDiscoverTool && (
            <TextInput
              maxLength={50}
              style={styles.input2}
              onChangeText={searchPostsInputValHandler}
              value={searchPostsInputVal}
            />
          )}
          {/* {!showDiscoverTool && <TextInput maxLength={50} style={styles.input} onChangeText={searchPostsInputValHandler} value={searchPostsInputVal} />} */}
        </View>
      }

      {searchPostsInputVal?.length >= 1 && (
        <Text style={styles.text}> {searchPostsInputVal} </Text>
      )}

      <View style={styles.multiIconCont}>
        {searchPostsInputVal?.length >= 1 && (
          <TouchableOpacity onPress={searchPostsSubmit}>
            <Image source={GreenForwardArrowIcon} style={styles.iconTiny} />
          </TouchableOpacity>
        )}
      </View>

      {searchPostsInputVal?.length < 1 && (
        <View style={styles.multiIconCont}>
          <TouchableOpacity onPress={toggleShowNotifications}>
            <Image
              style={[{ borderRadius: 50 }, styles.iconMini]}
              source={PhoneWithScreenIcon}
            />
          </TouchableOpacity>

          {/* <NotificationButton /> */}
          <TouchableOpacity onPress={toggleShowDiscovery}>
            <Image
              style={[{ borderRadius: 50 }, styles.iconMini]}
              source={JournallIcon}
            />
          </TouchableOpacity>

          {/* <button onClick={addContent} id={styles.addCommentPlusInput}> + </button> */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cont: {
    backgroundColor: brownFooter,
    flexDirection: "row",
    paddingVertical: 5,
    paddingLeft: 10,
    paddingRight: 20,
    justifyContent: "space-between",
    alignItems: "center",
    // boxSizing: 'border-box',
    width: screenWidth,
    borderRadius: 2,
  },
  multiIconCont: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 20,
  },
  icon: {
    height: 50,
    width: 50,
  },
  iconMini: {
    height: 35,
    width: 35,
  },
  iconTiny: {
    height: 25,
    width: 25,
  },
  text: {
    fontFamily: "Fuzzy Bubbles",
    color: grayphite,
    fontSize: 12,
  },
  input2: {
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
    // color: '#444',
    backgroundColor: "white",
    fontFamily: "fuzzy",
    fontSize: 10,
    borderWidth: 1.5,
    borderColor: "#44454fea",
    textAlignVertical: "center", // ✅ keeps text centered on Android
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
});

export default Navbar;
