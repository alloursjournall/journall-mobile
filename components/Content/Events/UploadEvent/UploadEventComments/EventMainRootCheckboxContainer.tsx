import { useState } from "react";

// <>
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
// import Checkbox from '@react-native-community/checkbox';

// redux
import { RootState } from "@/redux/store/rootReducer";
import { useSelector } from "react-redux";

//
import { grayphite } from "@/constants/Colors";
import {
  StarIcon,
  SoundIcon,
  RedBackArrowIcon,
  ThoughtsIcon,
  MasqueradeIcon,
  LockIcon,
  UnlockIcon,
} from "@/constants/Images";
import { useContentFunction } from "@/Contexts/ContentFunctions";

interface CheckboxContainerProps {
  mainCommentStarrable: any;
  setMainCommentStarrable: any;
  mainCommentLock: any;
  setMainCommentLock: any;
  mainCommentUnlock: any;
  setMainCommentUnlock: any;
  mainCommentThoughtsOk: any;
  setMainCommentThoughtsOk: any;
  mainCommentStarsShowAvg: any;
  setMainCommentStarsShowAvg: any;
  mainCommentStarsShowUsers: any;
  setMainCommentStarsShowUsers: any;
  mainCommentVoiceOk: any;
  setMainCommentVoiceOk: any;
  mainCommentTextOk: any;
  setMainCommentTextOk: any;
  mainCommentIsNonAnonymous: any;
  setMainCommentIsNonAnonymous: any;
  mainCommentAnonymousCommentsOk: any;
  setMainCommentAnonymousCommentsOk: any;
  mainCommentCommenterCanDetermine: any;
  setMainCommentCommenterCanDetermine: any;
  mainCheckboxCheckpoint: any;
  setMainCheckboxCheckpoint: any;
  allUserProfileIcons: any;
  mainRootCommentIcon: any;
  setMainRootCommentIcon: any;
  mainRootCommentInputValue: any;
  setMainRootCommentInputValue: any;
  mainRootSoundCommentClick: any;
  setMainRootSoundCommentClick: any;
  mainRootSoundCommentFile: any;
  setMainRootSoundCommentFile: any;
  event: any;
  setUsersPassLocks: any;
  setComments: any;
  setError: any;
}

const EventMainRootCheckboxContainer: React.FC<CheckboxContainerProps> = ({
  mainCommentStarrable,
  setMainCommentStarrable,
  mainCommentLock,
  setMainCommentLock,
  mainCommentUnlock,
  setMainCommentUnlock,
  mainCommentThoughtsOk,
  setMainCommentThoughtsOk,
  mainCommentStarsShowAvg,
  setMainCommentStarsShowAvg,
  mainCommentStarsShowUsers,
  setMainCommentStarsShowUsers,
  mainCommentVoiceOk,
  setMainCommentVoiceOk,
  mainCommentTextOk,
  setMainCommentTextOk,
  mainCommentIsNonAnonymous,
  setMainCommentIsNonAnonymous,
  mainCommentAnonymousCommentsOk,
  setMainCommentAnonymousCommentsOk,
  mainCommentCommenterCanDetermine,
  setMainCommentCommenterCanDetermine,
  mainCheckboxCheckpoint,
  setMainCheckboxCheckpoint,
  allUserProfileIcons,
  mainRootCommentIcon,
  setMainRootCommentIcon,
  mainRootCommentInputValue,
  setMainRootCommentInputValue,
  mainRootSoundCommentClick,
  setMainRootSoundCommentClick,
  mainRootSoundCommentFile,
  setMainRootSoundCommentFile,
  event,
  setUsersPassLocks,
  setComments,
  setError,
}) => {
  console.log("mainRootSoundCommentFile", mainRootSoundCommentFile);
  console.log("setMainRootSoundCommentFile", setMainRootSoundCommentFile);

  const { submitTextComment, returnProfileImg } = useContentFunction();

  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );

  const [showUnlockDropdownMenu, setShowUnlockDropdownMenu] =
    useState<boolean>(false);
  const [showLockDropdownMenu, setShowLockDropdownMenu] =
    useState<boolean>(false);
  const [starsOrAverageNum, setStarsOrAverageNum] = useState<any>(null);

  const handleCheck = (type: string) => {
    // console.log('newCommentNonAnonymous', newCommentNonAnonymous)
    if (type === "nonAnonymous") {
      setMainCommentIsNonAnonymous(
        mainCommentIsNonAnonymous === "yes" ? "no" : "yes"
      );
    }
    if (type === "thoughtsOk") {
      setMainCommentThoughtsOk(mainCommentThoughtsOk === "yes" ? "no" : "yes");
    }
    if (type === "textOk") {
      setMainCommentTextOk(!mainCommentTextOk);
    }
    if (type === "voiceOk") {
      setMainCommentVoiceOk(!mainCommentVoiceOk);
    }
    if (type === "anonymousCommentsOk") {
      setMainCommentAnonymousCommentsOk(!mainCommentAnonymousCommentsOk);
    }
    if (type === "starrable") {
      setMainCommentStarrable(mainCommentStarrable === "yes" ? "no" : "yes");
    }
    if (type === "starsShowAvg") {
      setMainCommentStarsShowAvg(!mainCommentStarsShowAvg);
    }
    if (type === "starsShowUsers") {
      setMainCommentStarsShowUsers(!mainCommentStarsShowUsers);
    }
  };

  const goBackToComment = () => {
    setMainCheckboxCheckpoint(false);
  };

  const test = () => {
    console.log("test");
    console.log("CURRENT_USER", CURRENT_USER);
  };

  const submitCommentFunc = async () => {
    if (mainRootSoundCommentClick === true) {
    }

    const newComments = await submitTextComment(
      null,
      null,

      event?.id,
      null,
      null,
      mainRootCommentIcon,
      mainCheckboxCheckpoint,
      setMainCheckboxCheckpoint,
      mainRootCommentInputValue,
      mainCommentThoughtsOk,
      mainCommentStarrable,
      mainCommentIsNonAnonymous,
      mainCommentStarsShowAvg,
      mainCommentStarsShowUsers,
      false,
      false,
      mainCommentCommenterCanDetermine,
      mainCommentVoiceOk,
      mainCommentTextOk,
      mainCommentAnonymousCommentsOk,
      mainCommentLock,
      mainCommentUnlock,
      null,
      setUsersPassLocks,
      setMainRootSoundCommentFile,
      mainRootCommentInputValue,
      setComments,
      setError
    );
    console.log("newComments", newComments);
  };

  const changeNumsHandler = (text: string) => {
    // Allow only a-z and 1-9, and limit to 1000 characters
    let sanitizedText = text.replace(/[^a-z0-9]/gi, "").slice(0, 4);
    const textNum = parseInt(sanitizedText);
    if (textNum > 1000) {
      sanitizedText = "1000";
    }
    setStarsOrAverageNum(sanitizedText);
  };

  const showLockDropdownMenuToggle = () => {
    setShowLockDropdownMenu(!showLockDropdownMenu);
  };

  const showUnlockDropdownMenuToggle = () => {
    setShowUnlockDropdownMenu(!showUnlockDropdownMenu);
  };

  return (
    <View style={styles.cont}>
      <View style={styles.row}>
        <View>
          <TouchableOpacity onPress={goBackToComment}>
            <Image style={styles.icon} source={RedBackArrowIcon} />
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.addCommentPlusInput} onPress={submitCommentFunc}>
                        <Text style={styles.addCommentInputText} > + </Text>
                    </TouchableOpacity> */}
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.leftSideRow}>
          <Text> me anonymous </Text>

          {mainCommentIsNonAnonymous === "yes" ? (
            <Image
              style={[{ borderRadius: 50 }, styles.icon]}
              source={returnProfileImg(CURRENT_USER?.id, allUserProfileIcons)}
            />
          ) : (
            <Image style={styles.icon} source={MasqueradeIcon} />
          )}
        </View>

        <TouchableOpacity
          style={[
            {
              backgroundColor:
                mainCommentIsNonAnonymous === "no" ? "#33af52" : "",
            },
            styles.button,
          ]}
          // style={[ {backgroundColor: newCommentNonAnonymous ===  "no" ? "rgba(129, 122, 122, 0.66)" : "" }, styles.button]}
          onPress={() => handleCheck("nonAnonymous")}
        />
      </View>

      <View style={styles.row}>
        <View style={styles.leftSideRow}>
          <Text> comments ok </Text>
          <Image style={styles.icon} source={ThoughtsIcon} />
        </View>
        <TouchableOpacity
          style={[
            {
              backgroundColor: mainCommentThoughtsOk === "yes" ? "#33af52" : "",
            },
            styles.button,
          ]}
          onPress={() => handleCheck("thoughtsOk")}
        />
      </View>

      <View style={styles.row}>
        <View style={styles.leftSideRow}>
          <Text> comments ok </Text>
          <TextInput style={styles.input} readOnly={true} />
        </View>

        <TouchableOpacity
          style={[
            { backgroundColor: mainCommentTextOk === true ? "#33af52" : "" },
            styles.button,
          ]}
          onPress={() => handleCheck("textOk")}
        />
      </View>

      <View style={styles.row}>
        <View style={styles.leftSideRow}>
          <Text> comments ok </Text>
          <Image style={styles.icon} source={SoundIcon} />
        </View>
        <TouchableOpacity
          style={[
            { backgroundColor: mainCommentVoiceOk === true ? "#33af52" : "" },
            styles.button,
          ]}
          onPress={() => handleCheck("voiceOk")}
        />
      </View>

      <View style={styles.row}>
        <View style={styles.leftSideRow}>
          <Text> u anonymous ok </Text>
          <Image style={styles.icon} source={SoundIcon} />
        </View>

        <TouchableOpacity
          style={[
            {
              backgroundColor:
                mainCommentAnonymousCommentsOk === true ? "#33af52" : "",
            },
            styles.button,
          ]}
          onPress={() => handleCheck("anonymousCommentsOk")}
        />
      </View>

      <View style={styles.row}>
        <View style={styles.leftSideRow}>
          <Text> 1-5 stars ok </Text>
          <Image style={styles.icon} source={StarIcon} />
        </View>

        <TouchableOpacity
          style={[
            {
              backgroundColor: mainCommentStarrable === "yes" ? "#33af52" : "",
            },
            styles.button,
          ]}
          onPress={() => handleCheck("starrable")}
        />
      </View>

      <View style={styles.row}>
        <View style={styles.leftSideRow}>
          <Text> show avg </Text>
          <Image style={styles.icon} source={StarIcon} />
        </View>

        <TouchableOpacity
          style={[
            {
              backgroundColor:
                mainCommentStarsShowAvg === true ? "#33af52" : "",
            },
            styles.button,
          ]}
          onPress={() => handleCheck("starsShowAvg")}
        />
      </View>

      <View style={styles.row}>
        <View style={styles.leftSideRow}>
          <Text> show users </Text>
          <Image style={styles.icon} source={StarIcon} />
        </View>

        <TouchableOpacity
          style={[
            {
              backgroundColor:
                mainCommentStarsShowUsers === true ? "#33af52" : "",
            },
            styles.button,
          ]}
          onPress={() => handleCheck("starsShowUsers")}
        />
      </View>

      {!showUnlockDropdownMenu && (
        <View style={styles.row}>
          <View style={styles.leftSideRow}>
            <Image style={styles.icon} source={LockIcon} />
          </View>

          <TouchableOpacity onPress={showLockDropdownMenuToggle}>
            <Text style={styles.addCommentInputText}> &darr; </Text>
          </TouchableOpacity>
        </View>
      )}

      {!showLockDropdownMenu && mainCommentLock !== "" && (
        <View style={styles.row}>
          <View style={styles.leftSideRow}>
            <Image style={styles.icon} source={UnlockIcon} />
          </View>

          <TouchableOpacity onPress={showUnlockDropdownMenuToggle}>
            <Text style={styles.addCommentInputText}> &darr; </Text>
          </TouchableOpacity>
        </View>
      )}

      {showLockDropdownMenu && mainCommentIsNonAnonymous !== "no" && (
        <View style={styles.lockRow}>
          <View style={styles.leftSideRow}>
            <Image style={styles.icon} source={LockIcon} />
            <Text style={styles.addCommentInputText}> show me </Text>
            <Image
              style={[{ borderRadius: 50 }, styles.icon]}
              source={MasqueradeIcon}
            />
            <Image
              style={[{ borderRadius: 50 }, styles.icon]}
              source={returnProfileImg(CURRENT_USER?.id, allUserProfileIcons)}
            />
          </View>

          <TouchableOpacity
            style={[
              {
                backgroundColor:
                  mainCommentLock === "reveal profile" ? "grey" : "transparent",
              },
              styles.button,
            ]}
            onPress={() => handleCheck("lock reveal profile")}
          />
        </View>
      )}

      {showLockDropdownMenu && mainCommentStarrable !== "no" && (
        <View style={styles.lockRow}>
          <View style={styles.leftSideRow}>
            <Image style={styles.icon} source={LockIcon} />
            <Text style={styles.addCommentInputText}> avg ⭐️ </Text>
          </View>

          <TouchableOpacity
            style={[
              {
                backgroundColor:
                  mainCommentLock === "stars show avg" ? "grey" : "transparent",
              },
              styles.button,
            ]}
            onPress={() => handleCheck("lock stars show avg")}
          />
        </View>
      )}

      {showLockDropdownMenu && mainCommentStarrable !== "no" && (
        <View style={styles.lockRow}>
          <View style={styles.leftSideRow}>
            <Image style={styles.icon} source={LockIcon} />
            <Text style={styles.addCommentInputText}> us ⭐️ </Text>
          </View>

          <TouchableOpacity
            style={[
              {
                backgroundColor:
                  mainCommentLock === "stars show users"
                    ? "grey"
                    : "transparent",
              },
              styles.button,
            ]}
            onPress={() => handleCheck("lock stars show users")}
          />
        </View>
      )}

      {showUnlockDropdownMenu && mainCommentStarrable !== "no" && (
        <View style={styles.lockRow}>
          <View style={styles.leftSideRow}>
            <Image style={styles.icon} source={UnlockIcon} />
          </View>

          <Text style={styles.addCommentInputText}> submit ⭐️ </Text>

          <TouchableOpacity
            style={[
              {
                backgroundColor:
                  mainCommentUnlock === "submit ⭐️" ? "grey" : "transparent",
              },
              styles.button,
            ]}
            onPress={() => handleCheck("unlockSubmitStars")}
          />
        </View>
      )}

      {showUnlockDropdownMenu && mainCommentStarrable !== "no" && (
        <View style={styles.lockRow}>
          <View style={styles.leftSideRow}>
            <Image style={styles.icon} source={UnlockIcon} />
          </View>

          {starsOrAverageNum ? (
            <Text style={styles.addCommentInputText}>
              {" "}
              {starsOrAverageNum} times starred ⭐️{" "}
            </Text>
          ) : (
            <Text style={styles.addCommentInputText}> times starred ⭐️ </Text>
          )}

          <TextInput style={styles.input} onChangeText={changeNumsHandler} />

          <TouchableOpacity
            style={[
              {
                backgroundColor: mainCommentUnlock?.includes("times")
                  ? "grey"
                  : "transparent",
              },
              styles.button,
            ]}
            onPress={() => handleCheck("unlockTimesStarred")}
          />
        </View>
      )}

      {showUnlockDropdownMenu && mainCommentStarrable !== "no" && (
        <View style={styles.lockRow}>
          <View style={styles.leftSideRow}>
            <Image style={styles.icon} source={UnlockIcon} />
          </View>

          {starsOrAverageNum ? (
            <Text style={styles.addCommentInputText}>
              {" "}
              {starsOrAverageNum} avg stars ⭐️{" "}
            </Text>
          ) : (
            <Text style={styles.addCommentInputText}> avg stars ⭐️ </Text>
          )}

          <TextInput style={styles.input} onChangeText={changeNumsHandler} />

          <TouchableOpacity
            style={[
              {
                backgroundColor: mainCommentUnlock?.includes("avg")
                  ? "grey"
                  : "transparent",
              },
              styles.button,
            ]}
            onPress={() => handleCheck("unlockAvgStars")}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cont: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "75%",
    width: "100%",
    borderWidth: 2,
    borderColor: grayphite,
    padding: 5,
    gap: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    borderBottomColor: "#ccc",
    borderBottomWidth: 2,
    padding: 5,
    gap: 10,
  },
  lockRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    borderBottomColor: "#ccc",
    borderBottomWidth: 2,
    padding: 5,
    paddingLeft: 20,
    // paddingTop: 5,
    // paddingRight: 5,
    // paddingBottom: 5,
    // paddingLeft: 20,
    gap: 10,
    maxHeight: 25,
  },

  leftSideRow: {
    flexDirection: "row",
    gap: 10,
  },
  text: {
    fontFamily: "Fuzzy Bubbles",
    fontSize: 16,
  },
  icon: {
    height: 20,
    width: 20,
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
  // checkbox: {
  //     borderWidth: 2,
  //     color: grayphite,
  // }
});

export default EventMainRootCheckboxContainer;
