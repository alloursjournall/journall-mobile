// top level:
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";

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

// utils:
import { useContentFunction } from "@/Contexts/ContentFunctions";
import {
  RedBackArrowIcon,
  GreenForwardArrowIcon,
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
  ballotOptionsStars: any;

  day: any;
  currVotes: any;
  allUserProfileIcons: any;
}

const BallotOptionsStars: React.FC<props> = ({
  currBallot,
  clickedOption,
  showEngagementBallotOption,
  setShowEngagementBallotOption,
  clickedOptionIsUnApprovedVote,
  ballotOptionsStars,
  day,
  currVotes,
  allUserProfileIcons,
}) => {
  const router = useRouter();

  const ALL_USERS_ICONS = useSelector(
    (state: RootState) => state.app.ALL_USERS_ICONS
  );
  console.log("ALL_USERS_ICONS", ALL_USERS_ICONS);
  const { returnProfileImg } = useContentFunction();
  // const iconUri = returnProfileImg(day?.user_id, allUserProfileIcons);

  const processedStarsUsers = new Set(); // Create a Set to track processed users

  const visitProfile = (userId: number) => {
    router.push(`/profile/${userId}`);
  };

  return (
    <View style={styles.ballotOptionsStarsColumn}>
      {currVotes?.map((vote: any, index: number) => {
        const isCurrentVoteThePostingUser = vote?.user_id === day?.user_id;
        console.log("vote", vote);
        const iconUriMap = returnProfileImg(vote?.user_id, allUserProfileIcons);
        return (
          vote?.vote_string === clickedOption && (
            <View key={`view${index}`} style={styles.voteColumns}>
              {/* user profile pic */}
              <TouchableOpacity
                key={`click${index}`}
                onPress={() => visitProfile(vote?.user_id)}
              >
                {/* <Image style={styles.commentingProfilePic} source={returnProfileImg(vote?.user_id, allUserProfileIcons)} /> */}
                <Image
                  key={`icon${index}`}
                  source={{ uri: iconUriMap }}
                  style={styles.commentingProfilePic}
                />
              </TouchableOpacity>

              <Text
                style={[
                  styles.ballotText,
                  {
                    color: isCurrentVoteThePostingUser
                      ? "#D86220"
                      : index % 2 === 0
                      ? "#93cbe2"
                      : "#e19db3",
                  },
                ]}
              >
                {vote?.username}
              </Text>

              <Image
                key={`submitButton${index}`}
                style={styles.starContIcons}
                source={GreenForwardArrowIcon}
              />

              {/* First map: Process users who both voted and rated */}
              {ballotOptionsStars?.map((mapitem: any, idx: number) => {
                console.log("mapitem likes", mapitem);
                if (
                  mapitem?.liked_by_id === vote?.user_id &&
                  mapitem?.ballot_options_text === clickedOption
                ) {
                  console.log(`hey: ${mapitem}`);
                  processedStarsUsers.add(mapitem?.liked_by_id); // Add the user to the Set
                  return (
                    <View key={mapitem?.user_id}>
                      <Image
                        key={idx}
                        style={styles.starContIcons}
                        source={LitFireIcon}
                      />
                    </View>
                  );
                }
                return null;
              })}

              {/* * * * * chatGPT new map goes here mate :D CURR_DAY_BALLOT_OPTIONS_STARS?.map() 
                                // return (    mapitem?.user_id was used in the above loop don't render here please!    )
                                // but still ballot_options_text === clickedOption :D 
                        */}

              {/* <p className="ghost"> yh </p> */}
            </View>
          )
        );
      })}
      {/* Second map: Process users who only rated but did not vote */}
      <View>
        {ballotOptionsStars?.map((mapitem: any, index: number) => {
          const isCurrentRatingPostingUsersRating =
            mapitem?.liked_by_id === day?.user_id;
          if (
            !processedStarsUsers.has(mapitem?.liked_by_id) &&
            mapitem?.ballot_options_text === clickedOption
          ) {
            console.log("mapitem", mapitem);
            const iconUriMap = returnProfileImg(
              mapitem?.liked_by_id,
              allUserProfileIcons
            );
            return (
              <View>
                <View style={styles.voteColumns} key={mapitem?.user_id}>
                  <TouchableOpacity
                    key={`click2${index}`}
                    onPress={() => visitProfile(mapitem?.user_id)}
                  >
                    <Image
                      key={`image2${index}`}
                      style={styles.commentingProfilePic}
                      source={{ uri: iconUriMap }}
                    />
                  </TouchableOpacity>

                  <Text
                    key={`username${index}`}
                    style={[
                      styles.ballotText,
                      {
                        color: isCurrentRatingPostingUsersRating
                          ? "#D86220"
                          : index % 2 === 0
                          ? "#93cbe2"
                          : "#e19db3",
                      },
                    ]}
                  >
                    {String(mapitem?.liked_by_username ?? "")}
                  </Text>

                  {/* <View key={mapitem?.user_id}>
                                        <Image key={index} style={styles.starContIcons} source={LitFireIcon} />
                                    </View> */}

                  {/* <p className="ghost"> yh </p> */}
                </View>
              </View>
            );
          }
          return null;
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ballotOptionsStarsColumn: {
    flexDirection: "column",
    gap: 20,
  },

  ballotOptionsStarsRow: {
    flexDirection: "row",
    gap: 20,
  },

  starContIcons: {
    height: 25,
    width: 25,
  },
  commentingProfilePic: {
    height: 25,
    width: 25,
    borderRadius: 50,
  },
  ballotText: {
    fontFamily: "Fuzzy Bubbles",
    fontSize: 20,
  },
  voteColumns: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // width: '100%',
    gap: 40,
  },
  ghost: {
    opacity: 0,
  },
});

export default BallotOptionsStars;
