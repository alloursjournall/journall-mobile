// top level:
import { useState, useEffect } from "react";

// redux
import { RootState } from "@/redux/store/rootReducer";
import { useSelector, useDispatch } from "react-redux";

//  <>
import {
  Platform,
  Dimensions,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import BallotOptionsLikes from "./BallotOptionsLikes";
import BallotOptionsStars from "./BallotOptionsStars";

// utils:
import { Audio } from "expo-av";
// import * as FileSystem from 'expo-file-system';
import { useContentFunction } from "@/Contexts/ContentFunctions";
import {
  RedBackArrowIcon,
  GhostIcon,
  firstPlace,
  secondPlace,
  thirdPlace,
  fourthPlaceNoiseMaker,
  SoundIcon,
  LitFireIcon,
  StarIcon,
} from "@/constants/Images";

import { grayphite } from "@/constants/Colors";

interface props {
  currBallot: any;
  clickedOption: any;
  showEngagementBallotOption: any;
  setShowEngagementBallotOption: any;
  clickedOptionIsUnApprovedVote: any;
  setClickedOptionIsUnApprovedVote: any;
  day: any;
  ballotOptionsLikes: any;
  ballotOptionsStars: any;
  currVotes: any;
  allUserProfileIcons: any;
}

const BallotOptionsTextEngagement: React.FC<props> = ({
  currBallot,
  clickedOption,
  showEngagementBallotOption,
  setShowEngagementBallotOption,
  clickedOptionIsUnApprovedVote,
  setClickedOptionIsUnApprovedVote,
  day,
  ballotOptionsLikes,
  ballotOptionsStars,
  currVotes,
  allUserProfileIcons,
}) => {
  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );
  const { isUserSubmittedOptionApprovedText, startPlayingRecordedSound } =
    useContentFunction();

  const leaderboardStr = currBallot?.leaderboard_str;
  let hideWaitingApprovalVotes = currBallot?.hide_waiting_on_approval_votes;
  let needApprovalVotes = currBallot?.user_submitted_options_need_approval;
  let userSubmittedOptionsIsApprovedArray: any =
    currBallot?.user_submitted_options_is_approved_array || []; // any: boolean[] || string
  let userSubmittedOptionsUserArray =
    currBallot?.user_submitted_options_user_array || [];

  const hideWaitingOnApprovalVotesAndVoteNotApprovedOrCurrentUserIsPostingUser =
    hideWaitingApprovalVotes === true &&
    isUserSubmittedOptionApprovedText(clickedOption, currBallot)?.isApproved ===
      false &&
    (day?.user_id === CURRENT_USER?.id ||
      isUserSubmittedOptionApprovedText(clickedOption?.key?.Key, currBallot)
        ?.userId === CURRENT_USER?.id);
  const dontHideWaitingOnApprovalVotesAndVoteNotApproved =
    hideWaitingApprovalVotes === false &&
    isUserSubmittedOptionApprovedText(clickedOption?.key?.Key, currBallot)
      ?.isApproved === false;

  // const [clickedOptionIsUnApprovedVote, setClickedOptionIsUnApprovedVote] = useState(false)
  const [unApprovedVoteItem, setUnApprovedVoteItem] = useState<any | null>(
    null
  );
  const [unApprovedVoteIndex, setUnApprovedVoteIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    // check if it's a posting-user vote or an APPROVED user-submitted-option for vote.  !apporoved && toggle bool how to check ? UNAPPROVED OPTIONS  ballots.user_submitted_optoins_users_array i.e. [3-taquitos] split user ID out.
    userSubmittedOptionsUserArray.forEach((item: any, index: number) => {
      // get that ex: ['3-taquitos'] item from the loop to match for string equality in <AllUserSubmittedIndexesEngagement/>
      setUnApprovedVoteItem(item);
      const [userId, vote] = item?.split("-");
      if (vote === clickedOption) {
        console.log("yuuuup");
        setClickedOptionIsUnApprovedVote(true);
        // send that index too because it'll be the index in ballots.user_submitted_options_user_array
        setUnApprovedVoteIndex(index);
      }
      console.log("item", item);
    });
  }, []);

  //   const playSoundFile = async (base64Audio: string) => {
  //     try {
  //       const base64Prefix = "data:audio/mp3;base64,";
  //       const fullBase64 = base64Audio.startsWith(base64Prefix)
  //         ? base64Audio
  //         : base64Prefix + base64Audio;

  //       if (Platform.OS === "web") {
  //         // Convert Base64 to Blob for the HTMLAudioElement
  //         const base64Response = await fetch(fullBase64);
  //         const blob = await base64Response.blob();
  //         const audioURL = URL.createObjectURL(blob);

  //         const audio = new window.Audio(audioURL); // HTMLAudioElement
  //         audio
  //           .play()
  //           .then(() => console.log("Playing audio on web..."))
  //           .catch((err) => console.error("Error playing audio on web:", err));
  //       } else {
  //         // MOBILE: Decode Base64 and play using expo-av
  //         const filePath = FileSystem.cacheDirectory + "temp_audio.mp3";

  //         await FileSystem.writeAsStringAsync(
  //           filePath,
  //           fullBase64.replace(base64Prefix, ""),
  //           {
  //             encoding: FileSystem.EncodingType.Base64,
  //           }
  //         );

  //         const { sound } = await Audio.Sound.createAsync(
  //           { uri: filePath },
  //           { shouldPlay: true }
  //         );

  //         console.log("Playing audio on mobile...");

  //         // Cleanup after playback finishes
  //         sound.setOnPlaybackStatusUpdate((status) => {
  //           if (
  //             status.isLoaded &&
  //             !status.isPlaying &&
  //             status.positionMillis === status.durationMillis
  //           ) {
  //             sound.unloadAsync();
  //           }
  //         });
  //       }
  //     } catch (error) {
  //       console.error("Error playing sound file:", error);
  //     }
  //   };

  const playSoundClick = () => {
    if (!clickedOption) {
      return;
    }
    // playSoundFile(clickedOption?.blob);
    startPlayingRecordedSound(clickedOption?.blob);
  };

  const calculateStarsAverage = () => {
    let totalStars: number = 0;
    let starsLength: number = 0;
    const starsBin = [];
    let userID: number;

    const key = clickedOption?.key?.Key;
    console.log("key", key);

    const clickOptionStars = ballotOptionsStars?.filter((stars: any) =>
      key?.includes(stars?.ballot_options_text)
    );
    console.log("clickOptionStars", clickOptionStars);
    const starsNumbs = clickOptionStars?.map((stars: any) => stars?.stars);
    starsLength = starsNumbs?.length;
    starsNumbs.forEach(
      (oneThruFiveRating: any) =>
        (totalStars += oneThruFiveRating ? oneThruFiveRating : 0)
    );

    const returnAverage = () => {
      console.log("totalStars", totalStars);
      const average = totalStars / starsLength;
      return average;
    };
    return returnAverage();
  };

  const goBackToVoteRows = () => {
    setShowEngagementBallotOption(null);
  };

  return (
    <View style={styles.showEngagementColumn}>
      <View style={styles.voteColumns}>
        <TouchableOpacity onPress={goBackToVoteRows}>
          <Image style={styles.icon} source={RedBackArrowIcon} />
        </TouchableOpacity>

        {
          // hideWaitingApprovalVotes === true and only postingUser can see it. otherwise everyone can.

          // !voteIsDone &&
          needApprovalVotes === true &&
            // if hideApprovalVotes === true then check for isUserSubmittedOptionApproved() false = no. can't check for null because that's a posting-user-provided option. wouldn't show a ghost for that. if hideApprovalVotes === yes then only current user or the user that started that vote can see it.

            (hideWaitingOnApprovalVotesAndVoteNotApprovedOrCurrentUserIsPostingUser || // hideWaitingApprovalVotes === true && (isUserSubmittedOptionApproved(clickedOption)?.isApproved === false && (CURR_DAY?.user_id === CURRENT_USER?.id || isUserSubmittedOptionApproved(clickedOption)?.userId === CURRENT_USER?.id))
              // still on needApprovalVotes === true. but if hideWaitingApprovalVotes === false && they haven't been approved yet (forgot that) Then show the ghosts.
              dontHideWaitingOnApprovalVotesAndVoteNotApproved) && ( // hideWaitingApprovalVotes === false && (isUserSubmittedOptionApproved(clickedOption)?.isApproved === false)
              // || hideWaitingApprovalVotes === false)
              <Image style={styles.icon} source={GhostIcon} />
            )
        }

        {leaderboardStr?.includes(clickedOption?.key?.Key) &&
          (currBallot?.decision || currBallot?.custom_decision) && (
            <Image
              style={styles.icon}
              source={
                leaderboardStr[0] === clickedOption?.key?.Key
                  ? firstPlace
                  : leaderboardStr[1] === clickedOption?.key?.Key
                  ? secondPlace
                  : leaderboardStr[2] === clickedOption?.key?.Key
                  ? thirdPlace
                  : fourthPlaceNoiseMaker
              }
            />
          )}

        {currBallot?.media_option_type === "images" ? (
          <Image
            // onClick={calculateStarsAverage}
            style={styles.mediaOptionImg}
            source={clickedOption?.blob}
          />
        ) : currBallot?.media_option_type === "audio" ? (
          <TouchableOpacity onPress={playSoundClick}>
            <Image style={styles.mediaOptionImg} source={SoundIcon} />
          </TouchableOpacity>
        ) : (
          currBallot?.media_option_type === "videos" && <Text> video </Text>
        )}

        {(currBallot?.litlikelove_or_stars !== null ||
          currBallot?.litlikelove_or_stars !== undefined) &&
        currBallot?.litlikelove_or_stars === "litLikeLove" ? (
          <View style={styles.userSubmittedOptionShowEngagementCont}>
            <View style={styles.ballotOptionStarsCont}>
              <Image style={styles.starContIcons} source={LitFireIcon} />
              <Text style={styles.voteLengthText}>
                {" "}
                {ballotOptionsLikes?.length}{" "}
              </Text>
            </View>
          </View>
        ) : (
          currBallot?.litlikelove_or_stars === "stars" && (
            <View style={styles.userSubmittedOptionShowEngagementCont}>
              <View style={styles.ballotOptionStarsCont}>
                {Array.from({ length: calculateStarsAverage() })?.map(
                  (_, index) => {
                    return (
                      <Image
                        style={styles.starContIcons}
                        key={`star${index}`}
                        source={StarIcon}
                      />
                    );
                  }
                )}
              </View>
            </View>
          )
        )}
      </View>

      {currBallot?.litlikelove_or_stars === "stars" && (
        // stars from posting-user options or for user-submitted-options.
        <BallotOptionsStars
          currBallot={currBallot}
          clickedOption={clickedOption}
          showEngagementBallotOption={showEngagementBallotOption}
          setShowEngagementBallotOption={setShowEngagementBallotOption}
          clickedOptionIsUnApprovedVote={clickedOptionIsUnApprovedVote}
          ballotOptionsStars={ballotOptionsStars}
          day={day}
          currVotes={currVotes}
          allUserProfileIcons={allUserProfileIcons}
        />
      )}

      {currBallot?.litlikelove_or_stars === "litLikeLove" && (
        <View>
          <BallotOptionsLikes
            currBallot={currBallot}
            clickedOption={clickedOption}
            showEngagementBallotOption={showEngagementBallotOption}
            setShowEngagementBallotOption={setShowEngagementBallotOption}
            clickedOptionIsUnApprovedVote={clickedOptionIsUnApprovedVote}
            ballotOptionsLikes={ballotOptionsLikes}
            day={day}
            currVotes={currVotes}
            allUserProfileIcons={allUserProfileIcons}
          />
        </View>
      )}

      {/* currBallot?.litlikelove_or_stars === "litLikeLove" && */}
    </View>
  );
};

const styles = StyleSheet.create({
  voteColumns: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  showEngagementColumn: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  userSubmittedOptionShowEngagementCont: {
    flexDirection: "column",
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    height: 25,
    width: 25,
  },
  mediaOptionImg: {},
  starContIcons: {
    height: 25,
    width: 25,
  },
  ballotOptionStarsCont: {},
  voteLengthText: {
    fontFamily: "Fuzzy Bubbles",
    fontSize: 20,
    fontWeight: 400,
  },
});

export default BallotOptionsTextEngagement;
