// <>
import { View, StyleSheet } from "react-native";
import TheComment from "./TheComment/TheComment";

// redux
import { RootState } from "@/redux/store/rootReducer";
import { useSelector } from "react-redux";

interface ChildCommentsLoopProps {
  parentThought: any;
  indentIndex: any;
  soundComments: any;
  setSoundComments: any;
  allUserProfileIcons: any;
  setAllUserProfileIcons: any;
  day: any;
  usersPassLocks: any;
  setUsersPassLocks: any;
  usersAllowedToUnlock: any;
  setUsersAllowedToUnlock: any;
  comments: any;
  setComments: any;
  commentStars: any;
  setCommentStars: any;
}

const ChildCommentsLoop: React.FC<ChildCommentsLoopProps> = ({
  parentThought,
  indentIndex,
  soundComments,
  setSoundComments,
  allUserProfileIcons,
  setAllUserProfileIcons,
  day,
  usersPassLocks,
  setUsersPassLocks,
  usersAllowedToUnlock,
  setUsersAllowedToUnlock,
  comments,
  setComments,
  commentStars,
  setCommentStars,
}) => {
  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );
  const ALL_BLOCKS = useSelector((state: RootState) => state.app.ALL_BLOCKS);

  return (
    <View style={styles.cont}>
      {comments?.map((childMapItem: any, index: number) => {
        const isBlocked = ALL_BLOCKS?.some(
          (blocks) =>
            (blocks?.user_id === childMapItem?.user_id &&
              blocks?.blocked_id === CURRENT_USER?.id) ||
            (blocks?.blocked_id === childMapItem?.user_id &&
              blocks?.user_id === CURRENT_USER?.id)
        );

        return (
          // could even join MainRootCommentsLoop & ChildCommentsLoop just make param to say if parent or child level.
          childMapItem?.parent_thought_id === parentThought?.id &&
          !isBlocked && (
            <TheComment
              key={`theComment${index}`}
              soundComments={soundComments}
              mapitem={childMapItem}
              setSoundComments={setSoundComments}
              index={index}
              indentIndex={indentIndex}
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
            />
          )
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  cont: {
    flexDirection: "column",
    gap: 10,
    // gap: 300,
  },
});

export default ChildCommentsLoop;
