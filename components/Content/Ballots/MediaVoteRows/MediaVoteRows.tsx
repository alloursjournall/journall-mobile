// useState:
import React, { useState, useEffect, useRef } from "react";

// redux
import { RootState } from "@/redux/store/rootReducer";
import { useSelector, useDispatch } from "react-redux";

//  <>
import {
  Dimensions,
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { PartyIcon, GhostIcon, StarIcon } from "@/constants/Images";

import { grayphite } from "@/constants/Colors";

import MediaVoteLikeBtnFire from "./MediaVoteLikeBtnFire";
import ErrorSlippedUpBanana from "@/components/ErrorSlippedUpBanana";
import ConsideringOption from "../VoteRows/ConsideringOption";
import MediaVoteOption from "./MediaVoteOption";
import MediaVoteControls from "./MediaVoteControls";
import MediaVoteDisplay from "./MediaVoteDisplay";
import MediaVoteSubmitStars from "./MediaVoteSubmitStars";
import LeaderboardTrophy from "../VoteRows/LeaderboardTrophy";
import AddMediaProposedVote from "./AddMediaProposedVote";

import ShowEngagement from "../ShowEngagement/ShowEngagement";

// utility
import { useContentFunction } from "Contexts/ContentFunctions";

interface props {
  ballotVotes: any;
  ballotOptions: any;
  currBallot: any;
  ballotBin: any;
  setBallotBin: any;
  showVoteResultsNow: any;
  setShowVoteResultsNow: any;
  day: any;
  ballotsMediaBLOBs: any;
  setBallotsMediaBLOBs: any;
  currVotes: any;
  setCurrVotes: any;
  ballotOptionsStars: any;
  ballotOptionsLikes: any;
  usersPassLocks: any;
  setUsersPassLocks: any;
  setBallotOptionsStars: any;
  setBallotOptionsLikes: any;
  allUserProfileIcons: any;
  displayAddMediaMenu: boolean;
  setDisplayAddMediaMenu: any;
  ballotBinIndex: any;
}

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const MediaVoteRows: React.FC<props> = ({
  ballotVotes,
  ballotOptions,
  currBallot,
  ballotBin,
  setBallotBin,
  showVoteResultsNow,
  setShowVoteResultsNow,
  day,
  ballotsMediaBLOBs,
  setBallotsMediaBLOBs,
  currVotes,
  setCurrVotes,
  ballotOptionsStars,
  ballotOptionsLikes,
  usersPassLocks,
  setUsersPassLocks,
  setBallotOptionsStars,
  setBallotOptionsLikes,
  allUserProfileIcons,
  displayAddMediaMenu,
  setDisplayAddMediaMenu,
  ballotBinIndex,
}) => {
  // ballot relates props
  const dispatch = useDispatch();

  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );

  const ballotType = currBallot?.type;
  const leaderboardStr = currBallot?.leaderboard_str;
  const mediaOptionType = currBallot?.media_option_type;

  // [true] && the vote has been cast so the box is checked.
  const [checkedBoxArray, setCheckedBoxArray] = useState<any>(
    Array.from({ length: ballotVotes?.length }).fill(false)
  );
  const [voteFinished, setVoteFinished] = useState(false);
  const [didUserSubmit, setDidUserSubmit] = useState(false);
  const [error, setError] = useState(false);
  // const [displayAddMediaMenu, setDisplayAddMediaMenu] = useState(false);

  // starsClicked:
  const [starClickedOpenFiveStars, setStarClickedOpenFiveStars] = useState<
    number | null
  >(null);
  const [starClickedIndex, setStarClickedIndex] = useState(0);
  const currentSoundRef = useRef<any>(null);

  // ex "wendys" // ballots.options       "3-taquitos" ballots.users_submitted_options_users_array    // perform split.
  const [showEngagementBallotOption, setShowEngagementBallotOption] =
    useState<null>(null);

  const myCurrentUserVote =
    (currVotes?.length &&
      currVotes?.find(
        (votes: any) =>
          votes?.user_id === CURRENT_USER?.id &&
          votes?.ballot_id === currBallot?.id
      )) ||
    null;
  const didCurrentUserVote =
    (currVotes?.length &&
      currVotes?.some(
        (votes: any) =>
          votes?.user_id === CURRENT_USER?.id &&
          votes?.ballot_id === currBallot?.id
      )) ||
    null;

  const showEngagementBallotOptionObj = {
    showEngagementBallotOption: showEngagementBallotOption,
    setShowEngagementBallotOption: setShowEngagementBallotOption,
  };
  const checkedBoxArrayObj = {
    checkedBoxArray: checkedBoxArray,
    setCheckedBoxArray: setCheckedBoxArray,
  };
  const voteFinishedObj = {
    voteFinished: voteFinished,
    setVoteFinished: setVoteFinished,
  };

  const didUserRateTwoOptionsAlready =
    ballotOptionsStars?.reduce((count: any, stars: any) => {
      if (
        stars?.user_id === CURRENT_USER?.id &&
        stars?.day_id === day?.id &&
        stars?.ballot_id === currBallot?.id
      ) {
        count++;
      }
      return count;
    }, 0) >= 2;

  const didUserLikeTwoOptionsAlready =
    ballotOptionsLikes?.reduce((count: any, likes: any): any => {
      if (
        likes?.liked_by_id === CURRENT_USER?.id &&
        likes?.day_id === day?.id &&
        likes?.ballot_id === currBallot?.id
      ) {
        count++;
      }
      return count;
    }, 0) >= 2;

  // ballot endpoints as variable names:
  let userSubmittedOptionsUserArray =
    currBallot?.user_submitted_options_user_array || [];
  let userSubmittedOptionsIsApprovedArray: any =
    currBallot?.user_submitted_options_is_approved_array || []; // any: boolean[] || string
  const userSubmittedOptionsOk = currBallot?.user_submitted_options_ok || null;
  let hideWaitingApprovalVotes =
    currBallot?.hide_waiting_on_approval_votes || [];
  let needApprovalVotes =
    currBallot?.user_submitted_options_need_approval || [];

  // vote functions
  const { isUserSubmittedOptionApprovedMedia, GETballotMediaS3Func } =
    useContentFunction();

  useEffect(() => {
    console.log("currBallot in useEffect");
    if (currBallot?.decision?.length > 1) {
      console.log("yes ballot has a decision actively!");
      setShowVoteResultsNow(true);
    }

    if (!ballotsMediaBLOBs?.length && ballotsMediaBLOBs?.length === 0) {
      const loadBallotMedia = async () => {
        if (ballotType.includes("media")) {
          console.log("come on bruh you know it");
        }

        if (
          (ballotType.includes("media") && ballotsMediaBLOBs?.length <= 1) ||
          !ballotsMediaBLOBs
        ) {
          console.log("i mean we right here wittit no?");
          if (currBallot?.media_option_type === "images") {
            console.log("we are getting images");
            await GETballotMediaS3Func("images", day, setBallotsMediaBLOBs);
            // await GETballotMediaS3('images');
          } else if (currBallot?.media_option_type === "audio") {
            // console.log('show me some audio');
            GETballotMediaS3Func("audio", day, setBallotsMediaBLOBs);
          } else if (currBallot?.media_option_type === "videos") {
            await GETballotMediaS3Func("videos", day, setBallotsMediaBLOBs);
            // await GETballotMediaS3('videos');
          }
        }
      };
    }
  }, []);

  const test = () => {
    console.log("ballotsMediaBLOBs", ballotsMediaBLOBs);
  };

  const openStarCont = (index: number) => {
    console.log("index", index);
    setStarClickedOpenFiveStars(index);
  };

  console.log("ballotsMediaBLOBs", ballotsMediaBLOBs);

  return error === true ? (
    <ErrorSlippedUpBanana size="mini" setShowError={setError} />
  ) : // loading!
  !ballotsMediaBLOBs ? (
    // ballotsMediaBLOBs?.length < 1
    <View style={styles.cont}>
      <Image style={styles.icon} source={PartyIcon} />
    </View>
  ) : showEngagementBallotOption ? (
    <ShowEngagement
      currBallot={currBallot}
      clickedOption={showEngagementBallotOption}
      showEngagementBallotOption={showEngagementBallotOption}
      setShowEngagementBallotOption={setShowEngagementBallotOption}
      day={day}
      ballotOptionsLikes={ballotOptionsLikes}
      ballotOptionsStars={ballotOptionsStars}
      currVotes={currVotes}
      allUserProfileIcons={allUserProfileIcons}
    />
  ) : (
    // <ScrollView nestedScrollEnabled={true} style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
    <View style={styles.cont}>
      {/* {!displayAddMediaMenu && (
                    <TouchableOpacity style={styles.addCommentPlusInput} onPress={() => setDisplayAddMediaMenu(!displayAddMediaMenu)}>
                        <Text style={styles.addCommentInputText}> + </Text>
                    </TouchableOpacity>
                )} */}

      {displayAddMediaMenu &&
      // hey
      // !didCurrentUserVote &&
      // did user submit
      didUserSubmit === false &&
      currBallot?.user_submitted_options_media_ok ? (
        <AddMediaProposedVote
          currBallot={currBallot}
          didUserSubmit={didUserSubmit}
          setDidUserSubmit={setDidUserSubmit}
          setDisplayAddMediaMenu={setDisplayAddMediaMenu}
          day={day}
          ballotsMediaBLOBs={ballotsMediaBLOBs}
          setBallotsMediaBLOBs={setBallotsMediaBLOBs}
          currVotes={currVotes}
          setBallotBin={setBallotBin}
          ballotBinIndex={ballotBinIndex}
        />
      ) : (
        ballotsMediaBLOBs?.map((mapitem: any, index: number) => {
          const isSubmittedOptionApproved = isUserSubmittedOptionApprovedMedia(
            mapitem,
            currBallot
          )?.isApproved;
          const submittedOptionUserId = isUserSubmittedOptionApprovedMedia(
            mapitem,
            currBallot
          )?.userId;

          const isSubmittedOptionApprovedAndCurrentUserIsPostingUser =
            isSubmittedOptionApproved === false &&
            day?.user_id === CURRENT_USER?.id;
          const isSubmittedOptionApprovedAndCurrentUserIsProposedVoteUser =
            isSubmittedOptionApproved === false &&
            submittedOptionUserId === CURRENT_USER?.id;
          const isSubmittedOptionReturningNullMeaningNotAProposedVote =
            isUserSubmittedOptionApprovedMedia(mapitem, currBallot)
              ?.isApproved === null;

          const proposedVoteAndPostingUserProposingUserOrNotAProposedVote =
            isSubmittedOptionApprovedAndCurrentUserIsPostingUser ||
            isSubmittedOptionApprovedAndCurrentUserIsProposedVoteUser ||
            isSubmittedOptionReturningNullMeaningNotAProposedVote;

          const noUserOptions = !userSubmittedOptionsOk;
          const noApprovalNeeded = userSubmittedOptionsOk && !needApprovalVotes;
          const approvalNeededButVisible =
            userSubmittedOptionsOk &&
            needApprovalVotes &&
            !hideWaitingApprovalVotes;

          const approvalNeededAndHiddenButAllowed =
            userSubmittedOptionsOk &&
            needApprovalVotes &&
            hideWaitingApprovalVotes &&
            (isSubmittedOptionApproved ||
              isSubmittedOptionApprovedAndCurrentUserIsPostingUser ||
              isSubmittedOptionApprovedAndCurrentUserIsProposedVoteUser ||
              isSubmittedOptionReturningNullMeaningNotAProposedVote);

          const shouldShow =
            isSubmittedOptionReturningNullMeaningNotAProposedVote ||
            noUserOptions ||
            noApprovalNeeded ||
            approvalNeededButVisible ||
            approvalNeededAndHiddenButAllowed;

          // console.log('mapitem', mapitem);
          // console.log('shouldShow', shouldShow);

          // ⚠️ ⚠️ NEW WAY INSTEAD OF MATCH[0]
          const mapitemKey = mapitem?.key?.key?.includes("audio")
            ? "audio"
            : mapitem?.key?.key?.includes("images")
            ? "images"
            : mapitem?.key?.key?.includes("videos") && "videos";
          console.log("mapitemKey", mapitemKey);

          // myStarsCount and doesUserRateOptionAlready are used to show the user by {opacity}, {display:none} how many more voting options they can rate.

          const myStarsCount =
            (Array.isArray(ballotOptionsStars) &&
              ballotOptionsStars?.filter(
                (stars) =>
                  stars?.ballot_id === currBallot?.id &&
                  stars?.user_id === CURRENT_USER?.id
              )?.length) ||
            0;
          const doesUserRateOptionAlready =
            (Array.isArray(ballotOptionsStars) &&
              ballotOptionsStars?.some(
                (stars) =>
                  stars?.ballot_id === currBallot?.id &&
                  stars?.user_id === CURRENT_USER?.id &&
                  mapitem?.key?.key?.includes(stars?.ballot_options_text)
              )) ||
            null;

          let isCheckedOrVoted =
            checkedBoxArray[index] ||
            mapitem?.key?.key?.includes(myCurrentUserVote?.vote_string);
          // let isCheckedOrVoted;

          const charAfterLastSlash = mapitem?.key?.key?.match(/[^-]+$/);

          // for AWS after /images begins
          if (charAfterLastSlash) {
            if (charAfterLastSlash[0]) {
              if (
                checkedBoxArray[index] ||
                myCurrentUserVote?.vote_string === charAfterLastSlash
              ) {
                // isCheckedOrVoted = checkedBoxArray[index] || myCurrentUserVote?.vote_string === charAfterLastSlash
              }
            }
          }

          const isChecked = checkedBoxArray[index];
          const isCurrentUserVoted =
            mapitem?.key?.key?.includes(myCurrentUserVote?.vote_string) &&
            myCurrentUserVote?.ballot_id === currBallot?.id;
          const voteIsDone =
            (currBallot?.decision || currBallot?.custom_decision) &&
            currBallot?.leaderboard_str;

          const testMapitem = (mapitem: any) => {
            console.log("mapitem", mapitem);
            const yup = isUserSubmittedOptionApprovedMedia(mapitem, currBallot);
            console.log("yup", yup);
          };

          const shouldRenderFireBtn =
            currBallot?.litlikelove_or_stars === "litLikeLove" &&
            !didUserLikeTwoOptionsAlready &&
            (!userSubmittedOptionsOk ||
              (userSubmittedOptionsOk &&
                needApprovalVotes === true &&
                (hideWaitingApprovalVotes === false ||
                  (hideWaitingApprovalVotes === true &&
                    (isSubmittedOptionApproved ||
                      isSubmittedOptionApprovedAndCurrentUserIsPostingUser ||
                      isSubmittedOptionApprovedAndCurrentUserIsProposedVoteUser ||
                      isSubmittedOptionReturningNullMeaningNotAProposedVote)))));

          const shouldRenderStarBtn =
            currBallot?.litlikelove_or_stars === "stars" &&
            starClickedOpenFiveStars === null &&
            (!userSubmittedOptionsOk ||
              (userSubmittedOptionsOk &&
                (needApprovalVotes === false ||
                  (needApprovalVotes === true &&
                    (hideWaitingApprovalVotes === false ||
                      (hideWaitingApprovalVotes === true &&
                        (isSubmittedOptionApproved ||
                          isSubmittedOptionApprovedAndCurrentUserIsPostingUser ||
                          isSubmittedOptionApprovedAndCurrentUserIsProposedVoteUser ||
                          isSubmittedOptionReturningNullMeaningNotAProposedVote)))))));

          return (
            shouldShow &&
            (currBallot?.litlikelove_or_stars === "stars" &&
            starClickedOpenFiveStars === index &&
            !didUserRateTwoOptionsAlready ? (
              <MediaVoteSubmitStars
                currBallot={currBallot}
                mapitem={mapitem}
                mapitemKey={mapitem?.key?.key}
                index={index}
                setStarClickedOpenFiveStars={setStarClickedOpenFiveStars}
                starClickedIndex={starClickedIndex}
                setStarClickedIndex={setStarClickedIndex}
                day={day}
                usersPassLocks={usersPassLocks}
                setUsersPassLocks={setUsersPassLocks}
                setBallotOptionsStars={setBallotOptionsStars}
              />
            ) : (
              <View key={`voteRow${index}`} style={styles.voteRow}>
                {/* <View key={`voteColumns1${index}`} style={[{ borderColor: 'green' }, styles.voteColumns]}> */}

                <View style={styles.mediaSection}>
                  {
                    //
                    Array.isArray(leaderboardStr) &&
                      leaderboardStr.includes(mapitem) &&
                      (currBallot?.decision || currBallot?.custom_decision) && (
                        <LeaderboardTrophy
                          leaderboardStr={leaderboardStr}
                          mapitem={mapitem}
                          currBallot={currBallot}
                        />
                      )
                  }
                  <MediaVoteOption
                    currBallot={currBallot}
                    mapitem={mapitem}
                    index={index}
                    day={day}
                    usersPassLocks={usersPassLocks}
                    ballotsMediaBLOBs={ballotsMediaBLOBs}
                    currentSoundRef={currentSoundRef}
                  />

                  {/* <TouchableOpacity onPress={test}>
                    <Text> hi boys </Text>
                  </TouchableOpacity> */}

                  {needApprovalVotes === true &&
                    // if hideApprovalVotes === true then check for isUserSubmittedOptionApproved() false = no. can't check for null because that's a posting-user-provided option. wouldn't show a ghost for that. if hideApprovalVotes === yes then only current user or the user that started that vote can see it.
                    ((hideWaitingApprovalVotes === true &&
                      isUserSubmittedOptionApprovedMedia(mapitem, currBallot)
                        ?.isApproved === false &&
                      (currBallot?.started_by_id === CURRENT_USER?.id ||
                        isSubmittedOptionApprovedAndCurrentUserIsProposedVoteUser)) ||
                      // still on needApprovalVotes === true. but if hideWaitingApprovalVotes === false && they haven't been approved yet (forgot that) Then show the ghosts. if isApproved === null then it's a regular voting option so has to be false. if it was true it'd be approved it'd be voteable.
                      (hideWaitingApprovalVotes === false &&
                        isUserSubmittedOptionApprovedMedia(mapitem, currBallot)
                          ?.isApproved === false)) && (
                      // || hideWaitingApprovalVotes === false)
                      <Image style={styles.ghostIcon} source={GhostIcon} />
                    )}

                  {
                    // to show before the vote that user was already thiking about this option. could also be locked away
                    currBallot?.user_already_considering_option === index &&
                    starClickedOpenFiveStars === null ? (
                      <ConsideringOption
                        usersPassLocks={usersPassLocks}
                        day={day}
                        currBallot={currBallot}
                      />
                    ) : (
                      <View style={styles.placeholder}>
                        <Text style={styles.ghost}> hi </Text>
                      </View>
                    )

                    // <View styles={voteContent}> below
                  }
                </View>

                <View style={styles.actionsSection}>
                  <View style={styles.actionsContainer}>
                    {shouldRenderFireBtn ? (
                      <MediaVoteLikeBtnFire
                        key={`like${index}`}
                        currBallot={currBallot}
                        mapitem={mapitem}
                        mapitemKey={mapitem?.key?.key}
                        index={index}
                        day={day}
                        ballotOptionsLikes={ballotOptionsLikes}
                        setBallotOptionsLikes={setBallotOptionsLikes}
                        usersPassLocks={usersPassLocks}
                        setUsersPassLocks={setUsersPassLocks}
                      />
                    ) : (
                      <View style={styles.placeholder}>
                        <Text style={styles.ghost}> hi </Text>
                      </View>
                    )}

                    {shouldRenderStarBtn ? (
                      <TouchableOpacity
                        style={[
                          {
                            display: doesUserRateOptionAlready
                              ? "none"
                              : "flex",
                            opacity: myStarsCount === 1 ? 0.5 : 1.0,
                            alignSelf: "center", // ← Add this to the TouchableOpacity
                          },
                        ]}
                        onPress={() => openStarCont(index)}
                      >
                        <Image style={styles.starIcon} source={StarIcon} />
                      </TouchableOpacity>
                    ) : (
                      <View style={styles.placeholder}>
                        <Text style={styles.ghost}> hi </Text>
                      </View>
                    )}

                    {showVoteResultsNow ? (
                      <MediaVoteDisplay
                        mapitemKey={mapitem?.key?.key}
                        index={index}
                        currVotes={currVotes}
                      />
                    ) : (
                      <View style={styles.placeholder}> </View>
                    )}
                    {/* </View> */}

                    {
                      //
                      starClickedOpenFiveStars === null ? (
                        <MediaVoteControls
                          isCurrentUserVoted={isCurrentUserVoted}
                          isCheckedOrVoted={isCheckedOrVoted}
                          mapitem={mapitem}
                          index={index}
                          currBallot={currBallot}
                          checkedBoxArrayObj={checkedBoxArrayObj}
                          voteFinishedObj={voteFinishedObj}
                          didCurrentUserVote={didCurrentUserVote}
                          myCurrentUserVote={myCurrentUserVote}
                          showEngagementBallotOption={
                            showEngagementBallotOption
                          }
                          setShowEngagementBallotOption={
                            setShowEngagementBallotOption
                          }
                          voteType={currBallot?.type}
                          day={day}
                          currVotes={currVotes}
                          setCurrVotes={setCurrVotes}
                          ballotBin={ballotBin}
                          setError={setError}
                          userSubmittedOptionsOk={userSubmittedOptionsOk}
                          setBallotBin={setBallotBin}
                          ballotsMediaBLOBs={ballotsMediaBLOBs}
                          setBallotsMediaBLOBs={setBallotsMediaBLOBs}
                        />
                      ) : (
                        <View style={styles.placeholder}>
                          <Text style={styles.ghost}> hi </Text>
                        </View>
                      )
                    }
                  </View>
                </View>
              </View>
            ))
          );
        })
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    height: screenHeight * 0.4,
    flexDirection: "column",
    // remove maxHeight — RN scrollviews calculate content height dynamically
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 300,
    alignItems: "center",
  },
  cont: {
    flexGrow: 1, // ✅ allows rows to expand freely
    flexDirection: "column",
    alignItems: "stretch", // ✅ each row gets the full width context to flex inside
    gap: 10,
    marginTop: 10,
  },
  voteRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexGrow: 1, // ✅ ensures both sides can stretch properly
    width: "100%",
    paddingVertical: 10,

    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    // width: '100%',
    // paddingVertical: 8,

    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    borderStyle: "dotted",
  },

  mediaSection: {
    flex: 0.55,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },

  actionsSection: {
    flex: 0.45,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // borderColor: 'rebeccapurple',
    // borderWidth: 2,
    paddingHorizontal: 10, // Add some padding to ensure space distribution works
    paddingVertical: 10, // Add some padding to ensure space distribution works

    // flex: 0.45,
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    // alignItems: 'center',
    // borderColor: 'rebeccapurple',
    // borderWidth: 2,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%", // This ensures the container takes full width of actionsSection
  },

  voteActionsSubCont: {
    // width: '100%',
    // flexDirection: 'row',
    // justifyContent: 'space-evenly',
    // alignItems: 'center',
    // alignSelf: 'center',
    // borderColor: 'orange',
    // borderWidth: 3,
  },
  // voteColumns: {
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //     justifyContent: 'space-between',
  //     width: '100%',
  //     paddingVertical: 10,
  //     borderBottomColor: '#ccc',
  //     borderBottomWidth: 2,
  //     borderStyle: 'dotted',
  // },

  // mediaContainer: {
  //     flex: 1,
  //     flexDirection: 'column',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     gap: 6,
  // },

  // voteContent: {
  //     flex: 1, // instead of 0.5
  //     flexBasis: '50%', // gives it an explicit starting width
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //     justifyContent: 'flex-start',
  //     borderColor: 'green',
  //     borderWidth: 2,
  //     padding: 10,
  // },
  // voteActions: {
  //     flex: 1,
  //     flexBasis: '50%',
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //     justifyContent: 'space-evenly',
  //     borderColor: 'blue',
  //     borderWidth: 2,
  // },
  // voteActionsSubCont: {
  //     flexDirection: 'row',
  //     flex: 1,
  //     justifyContent: 'space-around',
  //     // width: '100%',
  //     minWidth: '45%',
  // },

  text: {
    fontFamily: "Fuzzy Bubbles",
    fontSize: 18,
  },
  icon: {
    height: 35,
    width: 35,
    margin: 0,
  },
  ghostIcon: {
    height: 35,
    width: 35,
    marginTop: 5,
    // margin: 0,
    alignSelf: "center",
  },

  starIcon: {
    height: 35,
    width: 35,
    margin: 0,
    alignSelf: "center",
  },
  iconMini: {
    height: 25,
    width: 25,
    margin: 0,
  },
  placeholder: {
    width: 35, // Same width as your icons
    height: 35,
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
  submitVoteBtnMini: {
    height: 20,
    width: 20,
  },
  ghost: {
    opacity: 0,
  },
});

export default MediaVoteRows;
