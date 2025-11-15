import { useState, useEffect, useRef, cloneElement } from "react";

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
}

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const CategoryRow: React.FC<props> = ({ day, setDay }) => {
  const settings = day?.settings;

  const ALL_CATEGORIES = useSelector(
    (state: RootState) => state.app.ALL_CATEGORIES
  );

  const [categoryInputVal, setCategoryInputVal] = useState("");
  const [searchInputVal, setSearchInputVal] = useState<any>("");

  const test = () => {};

  const categoryInputOnchange = (text: string) => {
    const value: string = text.replace(/[^a-zA-Z-]/g, "");

    if (value?.includes("nigger")) {
      setCategoryInputVal("");
    } else {
      setCategoryInputVal(value);
    }
  };

  const searchInputOnchange = (text: string) => {
    const value: string = text.replace(/[^a-zA-Z-]/g, "");
    if (value?.includes("nigger")) {
      setSearchInputVal("");
    } else {
      setSearchInputVal(value);
    }
  };

  // to add the new one
  const addCategoryCheckboxChange = () => {
    let clone = { ...day };
    let settingsClone = clone?.settings;
    if (settingsClone?.category !== "" || settingsClone?.category !== null) {
      // category exists. reset to false.
      settingsClone.category = "";
    } else {
      settingsClone.category = categoryInputVal;
    }
    clone.settings = settingsClone;
    setDay(clone);
  };

  const categoryCheckboxChange = (event: any, category: any, index: any) => {
    let clone = { ...day };
    let settingsClone = clone?.settings || null;

    if (settingsClone?.category === "") {
      // || ALL_CATEGORIES.some(categories => categories?.name
      console.log("oh wow were in here");
      console.log("were over here");
      settingsClone.category_id = category?.id;
      settingsClone.category = category?.name;
      // category exists. reset to false.
    } else {
      if (category?.name === settingsClone?.category) {
        settingsClone.category = "";
        settingsClone.category_id = null;
      } else {
        settingsClone.category_id = category?.id;
        settingsClone.category = category?.name;
      }
    }

    clone.settings = settingsClone;
    setDay(clone);
    // dispatch(SET_SETTINGS(clone))
  };

  return (
    <View style={styles.columnCont}>
      <View style={styles.uploadSettingsRow}>
        <View style={styles.slightSplitRow}>
          <TextInput
            maxLength={23}
            onChangeText={categoryInputOnchange}
            style={styles.input}
          />

          <Text style={styles.settingsRowText}>
            {" "}
            {categoryInputVal || "new category"}{" "}
          </Text>
        </View>

        <TouchableOpacity style={styles.addCommentPlusInput}>
          <Text> + </Text>
        </TouchableOpacity>
      </View>

      {searchInputVal?.length >= 1 &&
        ALL_CATEGORIES?.map((category: any, index: number) => {
          return (
            // <-- Make sure to add this return statement
            <View key={index} style={styles.uploadSettingsRow}>
              <Text style={styles.settingsRowText}> {category?.name} </Text>

              <TouchableOpacity
                onPress={(event: any) =>
                  categoryCheckboxChange(event, category, index)
                }
                style={[
                  {
                    backgroundColor:
                      settings?.category === category?.name ? "grey" : "",
                  },
                  styles.button,
                ]}
              />
            </View>
          );
        })}
      <View style={styles.uploadSettingsRow}>
        <View style={styles.slightSplitRow}>
          <TextInput
            maxLength={23}
            onChangeText={searchInputOnchange}
            style={styles.input}
          />

          <Text style={styles.settingsRowText}>
            {" "}
            {searchInputVal || "search"}{" "}
          </Text>
        </View>
      </View>
    </View>
  );
};

{
  /* <View className={styles.uploadSettingsSubRowMini}></View> */
}

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
    width: "80%",
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
  addCommentPlusInput: {
    height: 20,
    width: 20,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: -1,
    borderBottomRightRadius: 11,
    borderWidth: 2,
    borderColor: grayphite,
  },
  addCommentInputText: {
    fontSize: 16,
    fontWeight: 500,
    fontFamily: "Fuzzy Bubbles",
    color: grayphite,
  },
});

export default CategoryRow;
