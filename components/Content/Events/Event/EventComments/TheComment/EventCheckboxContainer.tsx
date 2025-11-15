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

// redux
import { RootState } from "@/redux/store/rootReducer";
import { useSelector } from "react-redux";

import { grayphite } from "@/constants/Colors";

import {
  StarIcon,
  SoundIcon,
  RedBackArrowIcon,
  ThoughtsIcon,
  MasqueradeIcon,
  UnlockIcon,
  LockIcon,
} from "@/constants/Images";
import { useContentFunction } from "@/Contexts/ContentFunctions";

interface CheckboxContainerProps {
  comment: any;
  index: any;
  indentIndex: any;
  newCommentLock: any;
  setNewCommentLock: any;
  setNewCommentUnlock: any;
  newCommentStarrable: any;
  setNewCommentStarrable: any;
  newCommentThoughtsOk: any;
  setNewCommentThoughtsOk: any;
  newCommentStarsShowAvg: any;
  setNewCommentStarsShowAvg: any;
  newCommentStarsShowUsers: any;
  setNewCommentStarsShowUsers: any;
  newCommentVoiceOk: any;
  setNewCommentVoiceOk: any;
  newCommentTextOk: any;
  setNewCommentTextOk: any;
  newCommentNonAnonymous: any;
  setNewCommentNonAnonymous: any;
  anonymousCommentsOk: any;
  setNewCommentCommenterCanDetermine: any;
  commenterCanDetermineCheckboxCheckpoint: any;
  setCommenterCanDetermineCheckboxCheckpoint: any;
  allUserProfileIcons: any;
  setAnonymousCommentsOk: any;
  newCommentCommenterCanDetermine: boolean;
  replyInputValue: string;
  newCommentUnlock: string | null;
  newCommentIcon: string | null;
  event: any;
  usersPassLocks: any;
  setUsersPassLocks: any;
  soundCommentFile: any;
  setSoundCommentFile: any;
  setReplyInputValue: any;
  comments: any;
  setComments: any;
  setError: any;
  voiceCommentClick: boolean;
  soundComments: any;
  setSoundComments: any;
}

const EventCheckboxContainer: React.FC<CheckboxContainerProps> = ({
  comment,
  index,
  indentIndex,
  newCommentLock,
  setNewCommentLock,
  setNewCommentUnlock,
  newCommentStarrable,
  setNewCommentStarrable,
  newCommentThoughtsOk,
  setNewCommentThoughtsOk,
  newCommentStarsShowAvg,
  setNewCommentStarsShowAvg,
  newCommentStarsShowUsers,
  setNewCommentStarsShowUsers,
  newCommentVoiceOk,
  setNewCommentVoiceOk,
  newCommentTextOk,
  setNewCommentTextOk,
  newCommentNonAnonymous,
  setNewCommentNonAnonymous,
  anonymousCommentsOk,
  setAnonymousCommentsOk,
  setNewCommentCommenterCanDetermine,
  commenterCanDetermineCheckboxCheckpoint,
  setCommenterCanDetermineCheckboxCheckpoint,
  allUserProfileIcons,

  newCommentCommenterCanDetermine,
  replyInputValue,
  newCommentUnlock,
  newCommentIcon,
  event,
  usersPassLocks,
  setUsersPassLocks,
  soundCommentFile,
  setSoundCommentFile,
  setReplyInputValue,
  comments,
  setComments,
  setError,
  voiceCommentClick,
  soundComments,
  setSoundComments,
}) => {
  const { submitTextComment, submitSoundCommentThought, returnProfileImg } =
    useContentFunction();

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
      setNewCommentNonAnonymous(
        newCommentNonAnonymous === "yes" ? "no" : "yes"
      );
    }
    if (type === "thoughtsOk") {
      setNewCommentThoughtsOk(newCommentThoughtsOk === "yes" ? "no" : "yes");
    }
    if (type === "textOk") {
      setNewCommentTextOk(!newCommentTextOk);
    }
    if (type === "voiceOk") {
      setNewCommentVoiceOk(!newCommentVoiceOk);
    }
    if (type === "anonymousCommentsOk") {
      setAnonymousCommentsOk(!anonymousCommentsOk);
    }
    if (type === "starrable") {
      setNewCommentStarrable(newCommentStarrable === "yes" ? "no" : "yes");
    }
    if (type === "starsShowAvg") {
      setNewCommentStarsShowAvg(!newCommentStarsShowAvg);
    }
    if (type === "starsShowUsers") {
      setNewCommentStarsShowUsers(!newCommentStarsShowUsers);
    }
    if (type == "lock reveal profile") {
      if (newCommentLock === "reveal profile") {
        setNewCommentLock("");
      } else {
        setNewCommentLock("reveal profile");
      }
    }
    if (type == "lock stars show avg") {
      if (newCommentLock === "stars show avg") {
        setNewCommentLock("");
      } else {
        setNewCommentLock("stars show avg");
      }
    }
    if (type == "lock stars show users") {
      if (newCommentLock === "stars show users") {
        setNewCommentLock("");
      } else {
        setNewCommentLock("stars show users");
      }
    }
    if (type === "unlockSubmitStars") {
      if (newCommentUnlock === "submit ⭐️") {
        setNewCommentUnlock("");
      } else {
        setNewCommentUnlock("submit ⭐️");
      }
    }
    if (type === "unlockTimesStarred") {
      if (newCommentUnlock?.includes("times")) {
        setNewCommentUnlock("");
      } else {
        // if starsOrAverageNum
        setNewCommentUnlock(`${starsOrAverageNum} times`);
      }
    }
    if (type === "unlockAvgStars") {
      if (newCommentUnlock?.includes("avg")) {
        setNewCommentUnlock("");
      } else {
        setNewCommentUnlock(`${starsOrAverageNum} avg`);
      }
    }
  };

  const goBackToComment = () => {
    setCommenterCanDetermineCheckboxCheckpoint(false);
  };

  const test = () => {
    console.log("test");
    console.log("newCommentNonAnonymous", newCommentNonAnonymous);
    console.log("CURRENT_USER", CURRENT_USER);
  };

  const submitCommentFunc = async () => {
    if (voiceCommentClick === true) {
      const newComments = await submitSoundCommentThought(
        // mapitem being the
        comment,
        index,
        event?.id,
        null,
        null,
        // why need the commenterCanDetermineCheckboxCheckpoint?
        commenterCanDetermineCheckboxCheckpoint,
        setCommenterCanDetermineCheckboxCheckpoint,
        soundCommentFile,
        setSoundCommentFile,
        setReplyInputValue,
        soundComments,
        setSoundComments,
        newCommentThoughtsOk,
        newCommentStarrable,
        newCommentStarsShowAvg,
        newCommentStarsShowUsers,
        newCommentNonAnonymous,
        newCommentCommenterCanDetermine,
        newCommentVoiceOk,
        newCommentTextOk,
        anonymousCommentsOk,
        false,
        false,
        newCommentLock,
        newCommentUnlock,
        null,
        usersPassLocks,
        comments,
        setComments,
        setError
      );
      if (!newComments) {
        setError(true);
        return;
      }
    } else {
      const newComments = await submitTextComment(
        comment,
        index,
        event?.id,
        null,
        null,
        newCommentIcon,
        commenterCanDetermineCheckboxCheckpoint,
        setCommenterCanDetermineCheckboxCheckpoint,
        replyInputValue,
        newCommentThoughtsOk,
        newCommentStarrable,
        newCommentNonAnonymous,
        newCommentStarsShowAvg,
        newCommentStarsShowUsers,
        false,
        false,
        newCommentCommenterCanDetermine,
        newCommentVoiceOk,
        newCommentTextOk,
        anonymousCommentsOk,
        newCommentLock,
        newCommentUnlock,
        null,
        setUsersPassLocks,
        setSoundCommentFile,
        setReplyInputValue,
        setComments,
        setError
      );
      console.log("newComments", newComments);
    }
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
        <TouchableOpacity onPress={goBackToComment}>
          <Image style={styles.icon} source={RedBackArrowIcon} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.addCommentPlusInput}
          onPress={submitCommentFunc}
        >
          <Text style={styles.addCommentInputText}> + </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <View style={styles.leftSideRow}>
          <Text> me anonymous </Text>

          {newCommentNonAnonymous === "yes" ? (
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
                newCommentNonAnonymous === "no" ? "grey" : "transparent",
            },
            styles.button,
          ]}
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
              backgroundColor:
                newCommentThoughtsOk === "yes" ? "grey" : "transparent",
            },
            styles.button,
          ]}
          onPress={() => handleCheck("thoughtsOk")}
        />
      </View>

      {newCommentThoughtsOk !== "no" && newCommentThoughtsOk !== "no" && (
        // event?.thoughts_ok !== "no" && newCommentThoughtsOk !== 'no' && newCommentThoughtsOk !== "no" &&
        <View style={styles.column}>
          <View style={styles.row}>
            <View style={styles.leftSideRow}>
              <Text> text ok </Text>
              <TextInput style={styles.input} readOnly={true} />
            </View>

            <TouchableOpacity
              style={[
                {
                  backgroundColor:
                    newCommentTextOk === true ? "grey" : "transparent",
                },
                styles.button,
              ]}
              onPress={() => handleCheck("textOk")}
            />
          </View>

          <View style={styles.row}>
            <View style={styles.leftSideRow}>
              <Text> voice ok </Text>
              <Image style={styles.icon} source={SoundIcon} />
            </View>
            <TouchableOpacity
              style={[
                {
                  backgroundColor:
                    newCommentVoiceOk === true ? "grey" : "transparent",
                },
                styles.button,
              ]}
              onPress={() => handleCheck("voiceOk")}
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
                  backgroundColor:
                    newCommentStarrable === "yes" ? "grey" : "transparent",
                },
                styles.button,
              ]}
              onPress={() => handleCheck("starrable")}
            />
          </View>
        </View>
      )}

      {event?.anonymous_comments_ok && newCommentThoughtsOk !== "no" && (
        <View style={styles.row}>
          <View style={styles.leftSideRow}>
            <Text> u anonymous ok </Text>
            <Image style={styles.icon} source={SoundIcon} />
          </View>

          <TouchableOpacity
            style={[
              {
                backgroundColor:
                  anonymousCommentsOk === true ? "grey" : "transparent",
              },
              styles.button,
            ]}
            onPress={() => handleCheck("anonymousCommentsOk")}
          />
        </View>
      )}

      {event?.starrable !== "no" &&
        newCommentStarrable !== "no" &&
        newCommentThoughtsOk !== "no" && (
          <View style={styles.column}>
            <View style={styles.row}>
              <View style={styles.leftSideRow}>
                <Text> show avg </Text>
                <Image style={styles.icon} source={StarIcon} />
              </View>

              <TouchableOpacity
                style={[
                  {
                    backgroundColor:
                      newCommentStarsShowAvg === true ? "grey" : "transparent",
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
                      newCommentStarsShowUsers === true
                        ? "grey"
                        : "transparent",
                  },
                  styles.button,
                ]}
                onPress={() => handleCheck("starsShowUsers")}
              />
            </View>
          </View>
        )}

      {/* 
            locks:              submit ⭐️       2 times         4 avg
            unlocks:            
             */}

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

      {!showLockDropdownMenu && newCommentLock !== "" && (
        <View style={styles.row}>
          <View style={styles.leftSideRow}>
            <Image style={styles.icon} source={UnlockIcon} />
          </View>

          <TouchableOpacity onPress={showUnlockDropdownMenuToggle}>
            <Text style={styles.addCommentInputText}> &darr; </Text>
          </TouchableOpacity>
        </View>
      )}

      {showLockDropdownMenu && newCommentNonAnonymous !== "no" && (
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
                  newCommentLock === "reveal profile" ? "grey" : "transparent",
              },
              styles.button,
            ]}
            onPress={() => handleCheck("lock reveal profile")}
          />
        </View>
      )}

      {showLockDropdownMenu && newCommentStarrable !== "no" && (
        <View style={styles.lockRow}>
          <View style={styles.leftSideRow}>
            <Image style={styles.icon} source={LockIcon} />
            <Text style={styles.addCommentInputText}> avg ⭐️ </Text>
          </View>

          <TouchableOpacity
            style={[
              {
                backgroundColor:
                  newCommentLock === "stars show avg" ? "grey" : "transparent",
              },
              styles.button,
            ]}
            onPress={() => handleCheck("lock stars show avg")}
          />
        </View>
      )}

      {showLockDropdownMenu && newCommentStarrable !== "no" && (
        <View style={styles.lockRow}>
          <View style={styles.leftSideRow}>
            <Image style={styles.icon} source={LockIcon} />
            <Text style={styles.addCommentInputText}> us ⭐️ </Text>
          </View>

          <TouchableOpacity
            style={[
              {
                backgroundColor:
                  newCommentLock === "stars show users"
                    ? "grey"
                    : "transparent",
              },
              styles.button,
            ]}
            onPress={() => handleCheck("lock stars show users")}
          />
        </View>
      )}

      {showUnlockDropdownMenu && newCommentStarrable !== "no" && (
        <View style={styles.lockRow}>
          <View style={styles.leftSideRow}>
            <Image style={styles.icon} source={UnlockIcon} />
          </View>

          <Text style={styles.addCommentInputText}> submit ⭐️ </Text>

          <TouchableOpacity
            style={[
              {
                backgroundColor:
                  newCommentUnlock === "submit ⭐️" ? "grey" : "transparent",
              },
              styles.button,
            ]}
            onPress={() => handleCheck("unlockSubmitStars")}
          />
        </View>
      )}

      {showUnlockDropdownMenu && newCommentStarrable !== "no" && (
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
                backgroundColor: newCommentUnlock?.includes("times")
                  ? "grey"
                  : "transparent",
              },
              styles.button,
            ]}
            onPress={() => handleCheck("unlockTimesStarred")}
          />
        </View>
      )}

      {showUnlockDropdownMenu && newCommentStarrable !== "no" && (
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
                backgroundColor: newCommentUnlock?.includes("avg")
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
    height: "100%",
    width: "100%",
    borderWidth: 2,
    borderColor: grayphite,
    padding: 5,
    // boxSizing: 'border-box',
    gap: 10,
  },
  column: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
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
    maxHeight: 25,

    // boxSizing: 'border-box',
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

    // boxSizing: 'border-box',
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
  // ghost: {
  //     opacity: 0,
  // }

  // checkbox: {
  //     borderWidth: 2,
  //     color: grayphite,
  // }
});

export default EventCheckboxContainer;
