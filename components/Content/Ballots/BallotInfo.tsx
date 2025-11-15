// useState:
import { useState, useRef } from "react";

// redux
import { RootState } from "@/redux/store/rootReducer";
import { useSelector, useDispatch } from "react-redux";

//  <>
import {
  Dimensions,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { HeartIcon } from "@/constants/Images";
import BallotDisplayBar from "./BallotDisplayBar";

// utils:
import { BallotIcon } from "@/constants/Images";
import { grayphite } from "@/constants/Colors";
import { useContentFunction } from "@/Contexts/ContentFunctions";

interface BallotInfoProps {
  currBallot: any;
  day: any;
  event: any;
  setShowVoteInfo: any;
  setBallotBin: any;
  setCurrVotes: any;
  setBallotOptionsLikes: any;
  setBallotOptionsStars: any;
}

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const BallotInfo: React.FC<BallotInfoProps> = ({
  setShowVoteInfo,
  currBallot,
  day,
  event,
  setBallotBin,
  setCurrVotes,
  setBallotOptionsLikes,
  setBallotOptionsStars,
}) => {
  const goBackToBallot = () => {
    setShowVoteInfo(false);
  };

  const { userWentWithVoteOptionHeartToggler } = useContentFunction();

  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );
  const voteIsDone =
    currBallot?.decision?.length > 1 ||
    currBallot?.custom_decision?.length > 1 ||
    currBallot?.leaderboard_str?.length > 1 ||
    currBallot?.leaderboard_int?.length > 1;

  const userWentWithVoteOptionHeartTogglerFunc = async () => {
    console.log("day?.id", day?.id);
    console.log("currBallot?.id", currBallot?.id);
    console.log(
      "currBallot?.user_went_with_vote_update",
      currBallot?.user_went_with_vote_update
    );

    // return;
    // userWentToTheMall:
    await userWentWithVoteOptionHeartToggler(
      day?.id,
      event?.id || null,
      currBallot?.id,
      currBallot?.user_went_with_vote_update || false,
      setBallotBin,
      setCurrVotes,
      setBallotOptionsLikes,
      setBallotOptionsStars
    );
  };

  return (
    <View style={styles.cont}>
      <TouchableOpacity style={styles.arrowCont} onPress={goBackToBallot}>
        <Text style={styles.text}> &larr; </Text>
      </TouchableOpacity>

      {currBallot?.description && (
        <Text style={styles.text}> {currBallot?.description} </Text>
      )}

      {currBallot?.restriction && (
        <Text style={styles.text}> {currBallot?.restriction} </Text>
      )}

      {CURRENT_USER?.id === currBallot?.started_by_id &&
        voteIsDone &&
        !currBallot?.user_went_with_vote_update && (
          <TouchableOpacity onPress={userWentWithVoteOptionHeartTogglerFunc}>
            <Image
              source={HeartIcon}
              style={[
                styles.icon,
                { opacity: currBallot?.user_went_with_vote_update ? 1.0 : 0.5 },
              ]}
            />
          </TouchableOpacity>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  cont: {
    height: screenHeight * 0.4, // Ensure it matches the height of the image
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    // alignItems: "space-around",
    width: "100%", // Ensure it takes full width
    // borderColor: grayphite,
    // borderWidth: 3,
    // padding: 10, // Add some padding to avoid content touching the edges
    // paddingTop: 5,
    gap: screenHeight / 20,
    // boxSizing: 'border-box',
  },
  arrowCont: {
    width: "100%",
    justifyContent: "flex-start",
  },
  text: {
    fontFamily: "Fuzzy Bubbles",
    fontSize: 24,
    borderBottomColor: "#ccc",
    borderBottomWidth: 2,
    borderStyle: "dotted",
    width: "100%",
    paddingLeft: 5,
    // boxSizing: 'border-box',
  },
  icon: {
    height: 35,
    width: 35,
  },
});

export default BallotInfo;
