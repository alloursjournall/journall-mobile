// top level imports
import axios from "axios";
import { useState, useEffect } from "react";

//
import {
  Platform,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";

// @reduxjs/toolkit:
import { RootState } from "redux/store/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import {
  TOGGLE_SHOW_EDIT_PROFILE,
  SET_CURR_PROFILE,
  SET_EDIT_CURR_PROFILE,
} from "redux/profile/profileSlice";

// components and styleing:

// utils:
import * as ImagePicker from "expo-image-picker";
import { updateUserProfileQueryStringFunc } from "graphql/queries";
import {
  FollowerIcon,
  SettingsIcon,
  GreenForwardArrowIcon,
} from "@/constants/Images";

import { grayphite } from "@/constants/Colors";
import { useContentFunction } from "Contexts/ContentFunctions";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

interface props {
  allUserProfileIcons: any;
  currProfile: any;
  currPrivacy: any;
}

const EditBackBtnUsernameSettingsBtn: React.FC<props> = ({
  allUserProfileIcons,
  currProfile,
  currPrivacy,
}) => {
  const dispatch = useDispatch();

  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );

  const ALL_USERNAMES = useSelector(
    (state: RootState) => state.app.ALL_USERNAMES
  );

  const EDIT_CURR_PROFILE = useSelector(
    (state: RootState) => state.profile.EDIT_CURR_PROFILE
  );
  const IS_CURRENT_USER_BLOCKED_BY_PROFILE_USER = useSelector(
    (state: RootState) => state.profile.IS_CURRENT_USER_BLOCKED_BY_PROFILE_USER
  );
  const RELEVANT_FOLLOWER_DATA = useSelector(
    (state: RootState) => state.profile.RELEVANT_FOLLOWER_DATA
  );

  const [readyToConfirmChanges, setReadyToConfirmChanges] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [updateProfileIcon, setUpdateProfileIcon] = useState<any>(null);

  const SHOW_EDIT_PROFILE = useSelector(
    (state: RootState) => state.profile.SHOW_EDIT_PROFILE
  );

  const {
    // getAllUsernames,
    returnProfileImg,
  } = useContentFunction();

  useEffect(() => {
    // if (ALL_USERNAMES?.length > 0) {
    //   return;
    // } else {
    //   getAllUsernames();
    // }
  }, []);

  const settingsClick = () => {
    if (SHOW_EDIT_PROFILE) {
      dispatch(TOGGLE_SHOW_EDIT_PROFILE());
    } else {
      // back out from seeing profile back into feed!
    }
  };

  const backOutFromEditProfile = () => {
    if (SHOW_EDIT_PROFILE) {
      dispatch(TOGGLE_SHOW_EDIT_PROFILE());
    } else {
      // back out from seeing profile back into feed!
    }
  };

  const editProfileOnChangeWithKey = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    let value: string = event?.target?.value;
    if (value === "nigger" || value?.includes("nigger")) {
      value = "";
    }

    if (ALL_USERNAMES.includes(value)) {
      setUsernameError(true);
    } else {
      setUsernameError(false);
    }

    if (value?.length === 0) {
      if (key === "username") {
        value = currProfile[key];
      } else {
        value = "";
      }
    }
    const clone = { ...EDIT_CURR_PROFILE };
    clone[key] = value;
    dispatch(SET_EDIT_CURR_PROFILE(clone));
  };

  const confirmSettingsChangeClick = async () => {
    console.log("clicking");
    console.log("ALL_USERNAMES", ALL_USERNAMES);
    if (usernameError) {
      return;
    }

    if (!readyToConfirmChanges) {
      setReadyToConfirmChanges(true);
    } else {
      const c = { ...EDIT_CURR_PROFILE };

      const query = updateUserProfileQueryStringFunc(c);

      const predata: any = await axios.post("/api/graphql", { query: query });
      console.log("predata", predata);
      if (!predata) {
        return null;
      }

      const data: any = predata?.data?.data?.updateUserProfile;
      console.log("data", data);
      if (!data) {
        return null;
      }

      const parsedData = JSON.parse(data);
      console.log("parsedData", parsedData);
      dispatch(SET_CURR_PROFILE(parsedData));
    }
  };

  const updateProfilePic = async () => {
    if (Platform.OS === "web") {
      // Web: Use input type="file"
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/jpeg, image/png";
      input.multiple = false;
      input.onchange = async (event: any) => {
        const file = event.target.files[0];
        if (file) {
          // select blob
          // 🚨 but then do we upload the blob or the blobURL to amazon? amazon gets regular blob <img> needs URL

          // 🚨 🚨 this doiesn't setDay() have to do setDay()
          // setBlob(URL.createObjectURL(file));
          setUpdateProfileIcon(file);
          // setSelectedFile(URL.createObjectURL(file)); // Preview
          console.log("File selected:", file);
          // Pass `file` to upload function
        }
      };
      input.click();
    } else {
      // Mobile: Use expo-image-picker or DocumentPicker
      try {
        // testing endpoints. MediaTypeOptions is deprecated.
        const endpointTest = ImagePicker.UIImagePickerControllerQualityType;

        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All, // Images & Videos
          allowsEditing: true,
          quality: 1,
        });

        if (!result.canceled) {
          // 🚨 but then do we upload the blob or the blobURL to amazon? amazon gets regular blob <img> needs URL
          setUpdateProfileIcon(result.assets[0].uri);
          console.log("File selected:", result.assets[0]);
        }
      } catch (error) {
        console.log("Error picking file:", error);
      }
    }
  };

  return (
    <View
      style={[
        { marginTop: Platform.OS === "web" ? 20 : 30 },
        styles.spaceAroundRow,
      ]}
    >
      <TouchableOpacity onPress={backOutFromEditProfile}>
        <Text style={styles.backBtnText}> &lt; </Text>
      </TouchableOpacity>

      {CURRENT_USER?.id === currProfile?.user_id ? (
        <TouchableOpacity onPress={updateProfilePic}>
          <Image
            style={styles.settingsIcon}
            source={{
              uri: returnProfileImg(CURRENT_USER?.id, allUserProfileIcons``),
            }}
          />
        </TouchableOpacity>
      ) : (
        <Image style={styles.settingsIcon} source={FollowerIcon} />
      )}

      {
        // if profile?.last_username_change allows then show input, if not p tag can't be changed. click p tag and "can change name by: {date}" "
        <TextInput
          maxLength={30}
          onChange={(event: any) =>
            editProfileOnChangeWithKey(event, "username")
          }
          style={styles.invisibleInputUsername}
          value={EDIT_CURR_PROFILE?.username}
        />
      }

      <TouchableOpacity onPress={confirmSettingsChangeClick}>
        <Image style={styles.settingsIcon} source={GreenForwardArrowIcon} />
      </TouchableOpacity>

      <TouchableOpacity onPress={settingsClick}>
        <Image style={styles.settingsIcon} source={SettingsIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  spaceAroundRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    // borderWidth: 2,
    // borderColor: grayphite,
    gap: 10,
    padding: 15,
    // width: '50%',
  },
  backBtnText: {
    fontFamily: "Fuzzy Bubbles",
    color: grayphite,
  },
  settingsIcon: {
    height: 35,
    width: 35,
  },
  invisibleInputUsername: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: screenWidth / 5,
    color: grayphite,
  },
});

export default EditBackBtnUsernameSettingsBtn;
