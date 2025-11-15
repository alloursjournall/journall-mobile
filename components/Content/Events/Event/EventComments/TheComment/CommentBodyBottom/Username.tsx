import { Text, View, Image, StyleSheet } from "react-native";

// redux
import { RootState } from "@/redux/store/rootReducer";
import { useSelector } from "react-redux";

// utils:
import { PartyFlagsIcon } from "@/constants/Images";

interface UsernameProps {
  mapitem: any;
  usersPassLocks: any;
  indentIndex: number;
  index: number;
  event: any;
  comments: any;
}

const Username: React.FC<UsernameProps> = ({
  mapitem,
  usersPassLocks,
  indentIndex,
  event,
  comments,
  index,
}) => {
  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );

  const returnParentCommentUsername = (comment: any) => {
    return comments?.find(
      (c: any) =>
        c?.id === comment?.parent_thought_id &&
        comments?.username === comment?.username
    );
    // return comments.find(comments =>
    //     comments?.id === comment?.parent_thought_id && comments?.username === comment?.username
    // );
  };

  const getUsernameColor = () => {
    if (!mapitem?.parent_thought_id) return "#a06b51";
    if (returnParentCommentUsername(mapitem)?.username === mapitem?.username)
      return "#a06b51";
    if (mapitem?.username === event?.username) return "#D86220";
    return ""; // Default color if no conditions met
  };

  return mapitem?.non_anonymous !== "no" ||
    (mapitem?.non_anonymous === "no" &&
      mapitem?.lock === "non anonymous" &&
      usersPassLocks?.some(
        (locks: any) =>
          (locks?.pass_comment_thoughts_all === true &&
            locks?.thought_id === mapitem?.id) ||
          (locks?.pass_comment_thoughts === true &&
            locks?.thought_id === mapitem?.id &&
            CURRENT_USER?.id === locks?.user_id)
      ) === true) ? (
    !mapitem?.thought.includes("vcb-") ? (
      <Text
        style={[
          styles.usernameText,
          {
            position: "relative",
            left: indentIndex * 20,
            color: getUsernameColor(),
          },
        ]}
        key={`username${index}`}
      >
        {mapitem?.username}
      </Text>
    ) : (
      <View
        style={[
          styles.pinkDiscoSquare,
          { position: "relative", left: indentIndex * 20 },
        ]}
      ></View>
    )
  ) : (
    <Image
      style={[styles.icon, { position: "relative", left: indentIndex * 20 }]}
      source={PartyFlagsIcon}
    />
  );
};

const styles = StyleSheet.create({
  pinkDiscoSquare: {
    borderWidth: 2,
    borderColor: "#814c89",
    backgroundColor: "#814c89", // Fallback solid color
    height: 15,
    width: 15,
    transform: [{ rotate: "25deg" }],
    shadowColor: "#555", // Replace `$grayphite` with an actual color
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 4, // Android shadow
  },
  usernameText: {
    fontFamily: "Fuzzy Bubbles",
    fontSize: 16,
  },
  icon: {
    height: 20,
    width: 50,
  },
});

export default Username;
