import { Image, StyleSheet } from "react-native";

import {
  firstPlace,
  secondPlace,
  thirdPlace,
  fourthPlaceNoiseMaker,
} from "@/constants/Images";

interface LeaderboardTrophyProps {
  leaderboardStr: any;
  mapitem: any;
  currBallot: any;
}

const LeaderboardTrophy: React.FC<LeaderboardTrophyProps> = ({
  leaderboardStr,
  mapitem,
  currBallot,
}) => {
  const leaderboardInt = currBallot?.leaderboard_int;
  console.log("leaderboardInt", leaderboardInt);
  console.log("mapitem", mapitem);

  return currBallot?.type?.includes("comment") ? (
    <Image
      style={styles.icon}
      source={
        leaderboardInt[0] === mapitem?.id
          ? firstPlace
          : leaderboardStr[1] === mapitem?.id
          ? secondPlace
          : leaderboardStr[2] === mapitem?.id
          ? thirdPlace
          : leaderboardStr[3] === mapitem?.id
          ? fourthPlaceNoiseMaker
          : null
      }
    />
  ) : (
    <Image
      style={styles.icon}
      source={
        leaderboardStr[0] === mapitem
          ? firstPlace
          : leaderboardStr[1] === mapitem
          ? secondPlace
          : leaderboardStr[2] === mapitem
          ? thirdPlace
          : leaderboardStr[3] === mapitem
          ? fourthPlaceNoiseMaker
          : null
      }
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    height: 25,
    width: 25,
  },
});

export default LeaderboardTrophy;
