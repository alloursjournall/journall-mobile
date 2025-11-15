import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import {
  kylie,
  me,
  ThoughtsIcon,
  MomentsIcon,
  FieldsIcon,
  GreatfullIcon,
  BallotIcon,
  CommentIcon,
} from "@/constants/Images";

interface CurrDaySelectionProps {
  currDaySelection: string; // Replace `string` with the appropriate type for `currDaySelection`
  setCurrDaySelection: any;
  userIsActivelySelecting: boolean;
  setUserIsActivelySelecting: any;
  day: any;
}

const CurrDaySelection: React.FC<CurrDaySelectionProps> = ({
  currDaySelection,
  setCurrDaySelection,
  userIsActivelySelecting,
  setUserIsActivelySelecting,
  day,
}) => {
  const changeCurrDaySelectionClick = (newSelection: string) => {
    if (!userIsActivelySelecting) {
      setUserIsActivelySelecting(true);
    }
    if (newSelection === "thoughts") {
      if (!day?.thoughts) {
        // possibly delete the button?
      }
      setCurrDaySelection(newSelection);
    }
    if (newSelection === "moments") {
      if (!day?.moments) {
      }
      setCurrDaySelection(newSelection);
    }
    if (newSelection === "fields") {
      if (!day?.fields) {
      }
      setCurrDaySelection(newSelection);
    }
    if (newSelection === "greatfullagain") {
      if (!day?.greatfullagain) {
      }
      setCurrDaySelection(newSelection);
    }
    if (newSelection === "ballots") {
      if (!day?.ballots?.some((b: any) => b?.id)) {
      }
      setCurrDaySelection(newSelection);
    }
    if (newSelection === "comments") {
      if (!day?.thoughts?.some((th: any) => th?.thought?.length)) {
      }
      setCurrDaySelection(newSelection);
    }
  };

  const test = () => {};

  const toggleUserIsActivelySelecting = () => {
    setUserIsActivelySelecting(true);
    console.log("day", day);
    console.log("userIsActivelySelecting", userIsActivelySelecting);
  };

  return (
    <TouchableOpacity
      onPress={toggleUserIsActivelySelecting}
      style={styles.actions}
    >
      {/* <View style={styles.actions}> */}

      {/* <TouchableOpacity onPress={test}>
                <Text> yes </Text>
            </TouchableOpacity> */}

      {Array.isArray(day?.thoughts) && (
        // day?.thoughts?.id &&
        <TouchableOpacity
          onPress={() => changeCurrDaySelectionClick("thoughts")}
          style={styles.actionButton}
        >
          <Image source={ThoughtsIcon} style={styles.currDaySelectionButton} />
        </TouchableOpacity>
      )}

      {day?.moments?.id && (
        <TouchableOpacity
          onPress={() => changeCurrDaySelectionClick("moments")}
          style={styles.actionButton}
        >
          <Image source={MomentsIcon} style={styles.currDaySelectionButton} />
        </TouchableOpacity>
      )}

      {day?.fields?.id && (
        <TouchableOpacity
          onPress={() => changeCurrDaySelectionClick("fields")}
          style={styles.actionButton}
        >
          <Image source={FieldsIcon} style={styles.currDaySelectionButton} />
        </TouchableOpacity>
      )}

      {day?.greatfullagain?.id && (
        // day?.greatfullagain?.id &&
        <TouchableOpacity
          onPress={() => changeCurrDaySelectionClick("greatfullagain")}
          style={styles.actionButton}
        >
          <Image source={GreatfullIcon} style={styles.currDaySelectionButton} />
        </TouchableOpacity>
      )}

      {day?.ballots?.some((b: any) => b?.id) && (
        // day?.greatfullagain?.id &&
        <TouchableOpacity
          onPress={() => changeCurrDaySelectionClick("ballots")}
          style={styles.actionButton}
        >
          <Image source={BallotIcon} style={styles.currDaySelectionButton} />
        </TouchableOpacity>
      )}

      {day?.thoughts?.some((th: any) => th?.thought?.length) && (
        // day?.greatfullagain?.id &&
        <TouchableOpacity
          onPress={() => changeCurrDaySelectionClick("comments")}
          style={styles.actionButton}
        >
          <Image source={CommentIcon} style={styles.currDaySelectionButton} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  currDaySelectionButton: {
    width: 35,
    height: 35,
    borderRadius: 25,
    marginRight: 8,
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
    padding: 10,
  },
});

export default CurrDaySelection;
