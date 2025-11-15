// <>
import { View, StyleSheet } from "react-native";
import EventTheComment from "./TheComment/EventTheComment";

// redux
import { RootState } from "@/redux/store/rootReducer";
import { useSelector } from "react-redux";

interface MainRootCommentsLoopProps {
  allUserProfileIcons: any;

  event: any;
  usersPassLocks: any;
  setUsersPassLocks: any;
  usersAllowedToUnlock: any;
  setUsersAllowedToUnlock: any;
  comments: any;
  setComments: any;
  soundComments: any;
  setSoundComments: any;
  commentStars: any;
  setCommentStars: any;
}

const EventMainRootCommentsLoop: React.FC<MainRootCommentsLoopProps> = ({
  //
  allUserProfileIcons,
  event,
  usersPassLocks,
  setUsersPassLocks,
  usersAllowedToUnlock,
  setUsersAllowedToUnlock,
  comments,
  setComments,
  soundComments,
  setSoundComments,
  commentStars,
  setCommentStars,
}) => {
  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );
  const ALL_BLOCKS = useSelector((state: RootState) => state.app.ALL_BLOCKS);

  const test = () => {
    console.log("comments", comments);
  };

  const seeCommentLockIsUnlocked =
    event?.lock === "see comments" &&
    usersPassLocks?.some(
      (lockPass: any) =>
        lockPass?.event_id === event?.id &&
        // pass_thoughts_all
        (lockPass?.pass_post_all === true ||
          (lockPass?.pass_post === true &&
            lockPass?.user_id === CURRENT_USER?.id))
    );

  return (
    <View style={styles.cont}>
      {Array.isArray(comments) &&
        comments?.map((mapitem: any, index: number) => {
          const commentIcon: string = mapitem?.comment_icon;
          const parentThoughtId = mapitem?.parent_thought_id;
          let limit = 0;
          const isVoice = mapitem?.is_voice;

          const isBlocked =
            ALL_BLOCKS?.length >= 1 &&
            ALL_BLOCKS?.some(
              (blocks) =>
                (blocks?.user_id === mapitem?.user_id &&
                  blocks?.blocked_id === CURRENT_USER?.id) ||
                (blocks?.blocked_id === mapitem?.user_id &&
                  blocks?.user_id === CURRENT_USER?.id)
            );

          const isPostingUserBlocked =
            ALL_BLOCKS?.length >= 1 &&
            ALL_BLOCKS?.some(
              (blocks) =>
                (blocks?.user_id === mapitem?.user_id &&
                  blocks?.blocked_id === event?.user_id) ||
                (blocks?.blocked_id === mapitem?.user_id &&
                  blocks?.user_id === event?.user_id)
            );

          return (
            (!event?.lock ||
              event?.lock !== "see comments" ||
              (event?.lock === "see comments" && seeCommentLockIsUnlocked)) &&
            // see comments is blocked off but passes
            // parentThoughtId === null because there won't be child comments shown in the main loop.
            parentThoughtId === null &&
            !isBlocked &&
            !isPostingUserBlocked && (
              <EventTheComment
                mapitem={mapitem}
                soundComments={soundComments}
                setSoundComments={setSoundComments}
                index={index}
                indentIndex={0}
                allUserProfileIcons={allUserProfileIcons}
                event={event}
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

export default EventMainRootCommentsLoop;
