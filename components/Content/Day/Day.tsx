import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";

// <>
import {
  Dimensions,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
// import CurrDaySelectionBottom from './CurrDaySelection/CurrDaySelectionBottom';
import Thoughts from "./DayDisplays/Thoughts/Thoughts";
import Moments from "./DayDisplays/Moments/Moments";
import Fields from "./DayDisplays/Fields/Fields";
import Constantsee from "./DayDisplays/Fields/Constantsee/Constantsee";
import Greatfull from "./DayDisplays/Greatfull/Greatfull";
import Comments from "./DayDisplays/Comments/Comments";
import Ballots from "../Ballots/Ballots";
import DaySettings from "./DayDisplays/Settings/Settings";
import CurrDaySelection from "./CurrDaySelection/CurrDaySelection";

// images, colors
import {
  HeartIcon,
  AnonymityMaskIcon,
  QuestionIcon,
  SettingsIcon,
} from "@/constants/Images";
import { grayphite, hothazel } from "@/constants/Colors";

// utils:
import { useContentFunction } from "@/Contexts/ContentFunctions";

interface DayProps {
  day: any;
  allUserProfileIcons: any;
  setAllUserProfileIcons: any;
  feed: any;
  setFeed: any;
}

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const Day: React.FC<DayProps> = ({
  day,
  allUserProfileIcons,
  setAllUserProfileIcons,
  feed,
  setFeed,
}) => {
  const {
    returnProfileImg,
    getUserPrivacySettingsWithUserIdFunc,
    setFeedFaceFunc,
  } = useContentFunction();

  // * * * * * * THIS WORKS!!!! const [day, setDay] and {dayProps}

  const thoughts = Array.isArray(day?.thoughts) && day?.thoughts;
  const [followers, setFollowers] = useState<any>(day?.followers);
  const [blocks, setBlocks] = useState<any>(day?.blocks);
  const [listeners, setListeners] = useState<any>(day?.listeners);

  const fields = day?.fields;

  const [usersPassLocks, setUsersPassLocks] = useState<any>(
    (Array.isArray(day?.userpasslocks) && day?.userpasslocks) || null
  );
  // console.log('thoughts', thoughts);
  const postingUserThoughts = thoughts?.find(
    (th: any) => th?.thoughts?.length || null
  );
  const commentThoughts = thoughts?.filter(
    (th: any) => th?.thought?.length || null
  );

  // currDaySelection defaults to day.feedface
  const [currDaySelection, setCurrDaySelection] = useState<any>("");
  // to hide the profile and username so comments, votes doesn't have to be under the content making media smaller.
  const [userIsActivelySelecting, setUserIsActivelySelecting] =
    useState<boolean>(false);

  const [privacySettings, setPrivacySettings] = useState<any>(null);

  // these should be endpoints added onto the post during <Main/> because it uses ALL_FOLLOWERS which could become a big list
  // more performant to interact with big lists in one go reduce redundancies:

  // (mobile): commentStars (webapp): currDayStars v v v
  const [commentStars, setCommentStars] = useState<any>(
    (Array.isArray(day?.stars) && day?.stars) || null
  );
  const [fieldsBinIndex, setFieldsBinIndex] = useState<number>(0);
  const [fieldsConstantseeStars, setFieldsConstantseeStars] = useState<any>(
    (Array.isArray(fields?.stars) && fields?.stars) || null
  );
  const [usersAllowedToUnlock, setUsersAllowedToUnlock] = useState<any>(
    day?.userallowedtounlock
  );
  const [fieldsConstantseeClick, setFieldsConstantseeClick] =
    useState<boolean>(false);
  const [fieldsConstantseeIndex, setFieldsConstantseeIndex] =
    useState<number>(0);
  const [fieldsConstantseeText, setFieldsConstantseeText] =
    useState<string>("");
  const router = useRouter();

  // ballots:
  const [ballotBin, setBallotBin] = useState(
    (Array.isArray(day?.ballots) && day?.ballots) || null
  );
  const [ballotBinIndex, setBallotBinIndex] = useState(0);
  const [currVotes, setCurrVotes] = useState<any>(null);
  const [ballotOptionsLikes, setBallotOptionsLikes] = useState<any>(null);
  const [ballotOptionsStars, setBallotOptionsStars] = useState<any>(null);
  const [ballotsMediaBlobs, setBallotsMediaBlobs] = useState<any>(null);
  // const [showDayTitleIfItsLong, setShowDayTitleIfItsLong] = useState<boolean>(day?.title?.length >= )

  const ballotMediaVote =
    (Array.isArray(ballotBin) &&
      ballotBin[ballotBinIndex] &&
      ballotBin[ballotBinIndex]?.is_media_vote) ||
    false;
  const ballotType =
    (Array.isArray(ballotBin) &&
      ballotBin[ballotBinIndex] &&
      ballotBin[ballotBinIndex]?.type) ||
    "";
  const iconUri = returnProfileImg(day?.user_id, allUserProfileIcons);

  // comments:
  const [comments, setComments] = useState<any>(
    thoughts?.filter((th: any) => th?.thought?.length || null)
  );
  const [soundComments, setSoundComments] = useState<any>([]);

  useEffect(() => {
    const userPrivacySettings = async () => {
      const privacySettings = await getUserPrivacySettingsWithUserIdFunc(
        day?.user_id
      );
      if (!privacySettings) {
        return;
      }
      setPrivacySettings(privacySettings);
    };
    userPrivacySettings();

    setFeedFaceFunc(day?.feedface, setCurrDaySelection);
    // 🚨 🚨 doWeFollowEachOther, doWeBlockEachOther
  }, []);

  const toggleCurrDaySelectionSettings = () => {
    if (currDaySelection === "settings") {
      if (day?.thoughts) {
        setCurrDaySelection("thoughts");
        return;
      }
      if (day?.moments) {
        setCurrDaySelection("moments");
        return;
      }
      if (day?.fields) {
        setCurrDaySelection("fields");
        return;
      }
      if (day?.greatfullagain) {
        setCurrDaySelection("greatfull");
        return;
      }
      setCurrDaySelection("");
    } else {
      setCurrDaySelection("settings");
    }
  };

  const profileIconClick = () => {
    router.push(`/profile/${day?.user_id}`);
  };

  const test = () => {
    console.log("hey that's a good test lmaoo");
  };

  return day?.canCurrentUserSeeContent?.meSeeContent === false ? (
    <View style={styles.postContainer}>
      <View style={styles.header}>
        <Image
          style={[{ borderRadius: 0 }, styles.profilePic]}
          source={AnonymityMaskIcon}
        />
      </View>

      <View style={styles.contentContainer}>
        <Image
          style={[{ borderRadius: 0 }, styles.profilePic]}
          source={QuestionIcon}
        />
      </View>

      <TouchableOpacity onPress={toggleCurrDaySelectionSettings}>
        <Image style={styles.iconTiny} source={SettingsIcon} />
      </TouchableOpacity>
    </View>
  ) : (
    <View style={styles.postContainer}>
      {/* {!userIsActivelySelecting ? ( */}
      <View style={styles.header}>
        <View style={styles.slightSplitRow}>
          <TouchableOpacity onPress={profileIconClick}>
            <Image
              source={iconUri ? { uri: iconUri } : HeartIcon}
              style={styles.profilePic}
            />
          </TouchableOpacity>

          <Text
            style={[
              { color: hothazel, fontFamily: "Fuzzy Bubbles" },
              styles.username,
            ]}
          >
            {" "}
            {day?.title || day?.username} {/* {day?.username}{" "} */}
          </Text>

          {/* <TouchableOpacity onPress={test}>
            <Text> hi </Text>
          </TouchableOpacity> */}

          {/* title will either be here or in the settings if no space.  */}
          {/* <Text style={[{ color: hothazel }, styles.username]}> {day?.title} </Text> */}
        </View>

        <TouchableOpacity onPress={toggleCurrDaySelectionSettings}>
          <Image style={styles.iconTiny} source={SettingsIcon} />
        </TouchableOpacity>
      </View>
      {/* ) : ( */}
      {/* <View style={[{ marginBottom: 10 }, styles.header]}>
                <CurrDaySelectionBottom
                    currDaySelection="currDaySelection"
                    setCurrDaySelection={setCurrDaySelection}
                    day={day}
                    userIsActivelySelecting={userIsActivelySelecting}
                    setUserIsActivelySelecting={setUserIsActivelySelecting}
                />
            </View> */}
      {/* )} */}

      {currDaySelection !== "comments" && currDaySelection !== "ballots" && (
        <CurrDaySelection
          currDaySelection="currDaySelection"
          setCurrDaySelection={setCurrDaySelection}
          day={day}
          userIsActivelySelecting={userIsActivelySelecting}
          setUserIsActivelySelecting={setUserIsActivelySelecting}
        />
      )}

      <View style={styles.contentContainer}>
        {
          currDaySelection === "thoughts" ? (
            <Thoughts
              day={day}
              allUserProfileIcons={allUserProfileIcons}
              postingUserThoughts={postingUserThoughts}
              usersPassLocks={usersPassLocks}
              setUsersPassLocks={setUsersPassLocks}
            />
          ) : currDaySelection === "moments" ? (
            <Moments
              day={day}
              usersPassLocks={usersPassLocks}
              setUsersPassLocks={setUsersPassLocks}
            />
          ) : currDaySelection === "fields" ? (
            fieldsConstantseeClick === true ? (
              <Constantsee
                day={day}
                fields={fields}
                fieldsBinIndex={fieldsBinIndex}
                setFieldsBinIndex={setFieldsBinIndex}
                fieldsConstantseeText={fieldsConstantseeText}
                fieldsConstantseeIndex={fieldsConstantseeIndex}
                fieldsConstantseeStars={fieldsConstantseeStars}
                setFieldsConstantseeStars={setFieldsConstantseeStars}
                usersPassLocks={usersPassLocks}
                setUsersPassLocks={setUsersPassLocks}
                fieldsConstantseeClick={fieldsConstantseeClick}
                setFieldsConstantseeClick={setFieldsConstantseeClick}
                allUserProfileIcons={allUserProfileIcons}
              />
            ) : (
              <Fields
                day={day}
                fieldsBinIndex={fieldsBinIndex}
                setFieldsBinIndex={setFieldsBinIndex}
                usersPassLocks={usersPassLocks}
                setUsersPassLocks={setUsersPassLocks}
                fieldsConstantseeIndex={fieldsConstantseeIndex}
                fieldsConstantseeText={fieldsConstantseeText}
                setFieldsConstantseeIndex={setFieldsConstantseeIndex}
                setFieldsConstantseeText={setFieldsConstantseeText}
                setCurrDaySelection={setCurrDaySelection}
                fieldsConstantseeClick={fieldsConstantseeClick}
                setFieldsConstantseeClick={setFieldsConstantseeClick}
                allUserProfileIcons={allUserProfileIcons}
              />
            )
          ) : currDaySelection === "greatfullagain" ? (
            // <Text> Greatfull </Text>
            <Greatfull
              day={day}
              usersPassLocks={usersPassLocks}
              setUsersPassLocks={setUsersPassLocks}
            />
          ) : currDaySelection === "comments" ? (
            <Comments
              soundComments={soundComments}
              setSoundComments={setSoundComments}
              allUserProfileIcons={allUserProfileIcons}
              setAllUserProfileIcons={setAllUserProfileIcons}
              day={day}
              usersPassLocks={usersPassLocks}
              setUsersPassLocks={setUsersPassLocks}
              usersAllowedToUnlock={usersAllowedToUnlock}
              setUsersAllowedToUnlock={setUsersAllowedToUnlock}
              comments={comments}
              setComments={setComments}
              commentStars={commentStars}
              setCommentStars={setCommentStars}
              setCurrDaySelection={setCurrDaySelection}
            />
          ) : // <Greatfull day={day} usersPassLocks={usersPassLocks} setUsersPassLocks={setUsersPassLocks} />
          currDaySelection === "ballots" ? (
            <Ballots
              day={day}
              feed={feed}
              setFeed={setFeed}
              event={null}
              ballotBin={ballotBin}
              setBallotBin={setBallotBin}
              ballotBinIndex={ballotBinIndex}
              setBallotBinIndex={setBallotBinIndex}
              currVotes={currVotes}
              setCurrVotes={setCurrVotes}
              ballotOptionsLikes={ballotOptionsLikes}
              setBallotOptionsLikes={setBallotOptionsLikes}
              ballotOptionsStars={ballotOptionsStars}
              setBallotOptionsStars={setBallotOptionsStars}
              comments={
                ballotBin &&
                ballotBin[ballotBinIndex]?.type?.includes("comment")
                  ? comments
                  : []
              }
              setComments={
                ballotBin &&
                ballotBin[ballotBinIndex]?.type?.includes("comment")
                  ? setComments
                  : null
              }
              soundComments={soundComments}
              setSoundComments={setSoundComments}
              allUserProfileIcons={allUserProfileIcons}
              setAllUserProfileIcons={setAllUserProfileIcons}
              usersPassLocks={usersPassLocks}
              setUsersPassLocks={setUsersPassLocks}
              ballotsMediaBlobs={ballotsMediaBlobs}
              setBallotsMediaBlobs={setBallotsMediaBlobs}
              voteType={ballotType}
              mediaVote={ballotMediaVote}
              setCurrDaySelection={setCurrDaySelection}
            />
          ) : currDaySelection === "settings" ? (
            // <Text> Settings </Text>
            <DaySettings
              day={day}
              followers={followers}
              setFollowers={setFollowers}
              blocks={blocks}
              setBlocks={setBlocks}
              listeners={listeners}
              setListeners={setListeners}
              privacySettings={privacySettings}
              feed={feed}
              setFeed={setFeed}
              setComments={setComments}
              setSoundComments={setSoundComments}
              ballotBin={ballotBin}
              ballotBinIndex={ballotBinIndex}
              setBallotBin={setBallotBin}
              setCurrVotes={setCurrVotes}
              setBallotOptionsLikes={setBallotOptionsLikes}
              setBallotOptionsStars={setBallotOptionsStars}
            />
          ) : (
            <Image
              source={iconUri ? { uri: iconUri } : HeartIcon}
              style={[{ opacity: 0.3 }, styles.postImage]}
            />
            // <Image source={returnProfileImg(day?.user_id, allUserProfileIcons)} style={[{ opacity: 0.3 }, styles.postImage]} />
          )
          // <Image source={returnProfileImg(Kylie} style={styles.postImage} />
        }
      </View>

      {/* Footer: Buttons and Caption */}

      {/* <View style={styles.footer}> */}

      {
        // <CurrDaySelectionBottom currDaySelection="currDaySelection" setCurrDaySelection={setCurrDaySelection} day={day} userIsActivelySelecting={userIsActivelySelecting} setUserIsActivelySelecting={setUserIsActivelySelecting} />
      }

      {/* 
                    <Text style={styles.caption}>
                        This is an example caption for the post.
                    </Text> 
                */}

      {/* </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    // flex: 1,
    height: screenHeight * 0.6, // .575, .6,
    width: screenWidth * 0.95,
    borderWidth: 3,
    borderColor: grayphite,
    paddingVertical: 2.5,

    borderTopLeftRadius: 50,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 10,
    gap: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // paddingLeft: 5,
    paddingRight: 10,
    width: "100%",
    padding: 8,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 8,
  },
  currDaySelectionButton: {
    width: 25,
    height: 25,
    borderRadius: 25,
    marginRight: 8,
  },
  username: {
    // fontWeight: 'bold',
    // fontFamily: 'Fuzzy Bubbles',
    fontSize: 22,
  },
  contentContainer: {
    flex: 1,
    height: screenHeight * 0.5,
    margin: 0,
    padding: 0,
  },
  postImage: {
    flex: 1,
    width: "100%",
    height: screenHeight * 0.5,
  },
  footer: {
    height: 25,
    width: "100%",
    // borderWidth: 1,
    borderColor: "green",
    justifyContent: "center",
    alignSelf: "center",
    // marginTop: 10
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 8,
    padding: 2,
    height: 10,
  },
  actionButton: {
    marginRight: 16,
  },
  caption: {
    fontSize: 14,
    height: 10,
    textAlign: "center",
  },
  iconMini: {
    height: 35,
    width: 35,
  },
  iconTiny: {
    height: 25,
    width: 25,
  },
  slightSplitRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    // gap: 10,
  },
});

export default Day;
