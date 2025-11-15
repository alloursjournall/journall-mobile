// @reduxjs/toolkit:
import { RootState } from "redux/store/rootReducer";
import { useSelector } from "react-redux";

import { Image, TouchableOpacity, StyleSheet } from "react-native";
import { LitFireIcon } from "@/constants/Images";

// utils:
import { useContentFunction } from "Contexts/ContentFunctions";
import React from "react";

interface props {
  currBallot: any;
  mapitem: any;
  mapitemKey: any;
  index: any;
  day: any;
  ballotOptionsLikes: any;
  setBallotOptionsLikes: any;
  usersPassLocks: any;
  setUsersPassLocks: any;
}

const MediaVoteLikeBtnFire: React.FC<props> = ({
  currBallot,
  mapitem,
  mapitemKey,
  index,
  day,
  ballotOptionsLikes,
  setBallotOptionsLikes,
  usersPassLocks,
  setUsersPassLocks,
}) => {
  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );
  const myCount =
    (Array.isArray(ballotOptionsLikes) &&
      ballotOptionsLikes?.filter(
        (likes) =>
          likes?.ballot_id === currBallot?.id &&
          likes?.liked_by_id === CURRENT_USER?.id
      )?.length) ||
    0;

  const { likeVoteOption, isUserSubmittedOptionApprovedMedia } =
    useContentFunction();

  const doesUserLikeOptionAlready =
    (Array.isArray(ballotOptionsLikes) &&
      ballotOptionsLikes?.some(
        (likes) =>
          likes?.ballot_id === currBallot?.id &&
          likes?.liked_by_id === CURRENT_USER?.id &&
          mapitemKey?.includes(likes?.ballot_options_text)
      )) ||
    null;

  const didUserLikeTwoOptionsAlready =
    ballotOptionsLikes?.reduce((count: any, likes: any) => {
      if (
        likes?.liked_by_id === CURRENT_USER?.id &&
        likes?.day_id === day?.id &&
        likes?.ballot_id === currBallot?.id
      ) {
        count++;
      }
      return count;
    }, 0) >= 2;

  const clickLike = () => {
    const match = mapitemKey.match(/^(?:[^/]*\/){4}([^/].*)$/);
    const characters = match ? match[1] : "";
    console.log("characters", characters);

    const isApproved = isUserSubmittedOptionApprovedMedia(
      mapitem,
      currBallot
    )?.isApproved;

    if (
      isApproved === true ||
      isApproved === null ||
      isApproved === undefined
    ) {
      likeVoteOption(
        characters,
        "vote",
        currBallot,
        day,
        null,
        setBallotOptionsLikes,
        usersPassLocks,
        setUsersPassLocks
      );
    } else {
      likeVoteOption(
        characters,
        "proposedVote",
        currBallot,
        day,
        null,
        setBallotOptionsLikes,
        usersPassLocks,
        setUsersPassLocks
      );
    }
  };

  return (
    // user can like votes that they didn't like.
    currBallot?.litlikelove_or_stars === "litLikeLove" && (
      // if user already liked two options no more liking. if hideWaitingApprovals is false then show it!

      // (!didUserLikeTwoOptionsAlready || hideWaitingApprovalVotes === false) && (

      <TouchableOpacity
        onPress={clickLike}
        // onPress={
        //     // () =>
        //     //     isUserSubmittedOptionApprovedMedia(mapitem, currBallot)?.isApproved === true ||
        //     //     isUserSubmittedOptionApprovedMedia(mapitem, currBallot)?.isApproved === null ||
        //     //     isUserSubmittedOptionApprovedMedia(mapitem, currBallot)?.isApproved === undefined
        //     //         ? likeVoteOption(mapitemKey, 'vote', currBallot, day, null, setBallotOptionsLikes, usersPassLocks, setUsersPassLocks)
        //     //         : likeVoteOption(mapitemKey, 'proposedVote', currBallot, day, null, setBallotOptionsLikes, usersPassLocks, setUsersPassLocks)
        // }
      >
        <Image
          style={[
            styles.icon,
            {
              display: doesUserLikeOptionAlready ? "none" : "flex",
              opacity: myCount === 1 ? 0.5 : 1.0,
            },
          ]}
          key={`likes${index}`}
          source={LitFireIcon}
        />
      </TouchableOpacity>
    )
  );
  // );
};

const styles = StyleSheet.create({
  icon: {
    height: 35,
    width: 35,
  },
});

export default MediaVoteLikeBtnFire;
