// top level:
import { useState, useEffect } from "react";

// redux
import { RootState } from "@/redux/store/rootReducer";
import { useSelector } from "react-redux";

//  <>
import { View, Text, Image, StyleSheet } from "react-native";

// utils:
import { useContentFunction } from "@/Contexts/ContentFunctions";
import { StarIcon } from "@/constants/Images";

interface props {
  currBallot: any;
  clickedOption: any;
  showEngagementBallotOption: any;
  setShowEngagementBallotOption: any;
  clickedOptionIsUnApprovedVote: any;
  unApprovedVoteIndex: any;
  day: any;
  ballotOptionsStars: any;
  allUserProfileIcons: any;
}

const SubmittedOptionsUserArrayStars: React.FC<props> = ({
  currBallot,
  clickedOption,
  showEngagementBallotOption,
  setShowEngagementBallotOption,
  clickedOptionIsUnApprovedVote,
  unApprovedVoteIndex,
  day,
  ballotOptionsStars,
  allUserProfileIcons,
}) => {
  const { returnProfileImg } = useContentFunction();
  const iconUri = returnProfileImg(day?.user_id, allUserProfileIcons);

  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );

  return (
    <View style={styles.showEngagementColumn}>
      {ballotOptionsStars?.map((mapitem: any, index: number) => {
        const isCurrentVoteThePostingUser =
          mapitem?.liked_by_id === CURRENT_USER?.id;
        return (
          mapitem?.ballot_user_submitted_options_users_array_idx ===
            unApprovedVoteIndex && (
            <View key={`cont1${index}`} style={styles.voteColumns}>
              <View key={`cont2${index}`} style={styles.voteColumns}>
                <Image
                  key={`image${index}`}
                  source={{ uri: iconUri }}
                  style={styles.commentingProfilePic}
                />

                <Text
                  key={`text${index}`}
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
                  {mapitem?.liked_by_username}
                </Text>

                <View style={styles.starContRow} key={mapitem?.user_id}>
                  {Array.from({ length: mapitem?.stars })?.map((_, idx) => (
                    <Image
                      key={idx}
                      style={styles.starContIcons}
                      source={StarIcon}
                    />
                  ))}
                </View>
              </View>
            </View>
          )
        );
      })}
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
  commentingProfilePic: {
    height: 35,
    width: 35,
    borderRadius: 50,
  },
  ballotText: {
    fontFamily: "Fuzzy Bubbles",
    fontSize: 20,
  },
  starContRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 2.5,
  },
});

export default SubmittedOptionsUserArrayStars;
