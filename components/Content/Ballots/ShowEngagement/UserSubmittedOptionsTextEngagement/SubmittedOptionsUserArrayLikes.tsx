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
// import BallotOptionsLikes from "./BallotOptionsLikes";
// import BallotOptionsStars from "./BallotOptionsStars";

// utils:
import { useContentFunction } from "@/Contexts/ContentFunctions";
import { LitFireIcon } from "@/constants/Images";

interface props {
  currBallot: any;
  clickedOption: any;
  showEngagementBallotOption: any;
  setShowEngagementBallotOption: any;
  clickedOptionIsUnApprovedVote: any;
  unApprovedVoteItem: any;
  unApprovedVoteIndex: any;
  day: any;
  ballotOptionsLikes: any;
  allUserProfileIcons: any;
}

const SubmittedOptionsUserArrayLikes: React.FC<props> = ({
  currBallot,
  clickedOption,
  showEngagementBallotOption,
  setShowEngagementBallotOption,
  clickedOptionIsUnApprovedVote,
  unApprovedVoteItem,
  unApprovedVoteIndex,
  day,
  ballotOptionsLikes,
  allUserProfileIcons,
}) => {
  const { returnProfileImg } = useContentFunction();
  const iconUri = returnProfileImg(day?.user_id, allUserProfileIcons);

  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );

  let hideWaitingApprovalVotes = currBallot?.hide_waiting_on_approval_votes;
  let needApprovalVotes = currBallot?.user_submitted_options_need_approval;
  let userSubmittedOptionsIsApprovedArray: any =
    currBallot?.user_submitted_options_is_approved_array || []; // any: boolean[] || string
  let userSubmittedOptionsUserArray =
    currBallot?.user_submitted_options_user_array || [];

  return (
    <View style={styles.showEngagementColumn}>
      {ballotOptionsLikes?.map((mapitem: any, index: number) => {
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

                <Image
                  key={index}
                  style={styles.starContIcons}
                  source={LitFireIcon}
                />
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
});

export default SubmittedOptionsUserArrayLikes;
