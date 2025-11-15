import axios from "axios";
import { useState, useRef } from "react";
import { useRouter } from "expo-router";

// redux:
import { RootState } from "@/redux/store/rootReducer";
import { useSelector, useDispatch, createDispatchHook } from "react-redux";

//  <>
import {
  Platform,
  Dimensions,
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import CommentProfileIcon from "./CommentProfileIcon";
import CommentText from "./CommentText";
import CommentIcon from "./CommentIcon";
import MainRootCommentsLoop from "../../MainRootCommentsLoop";

// utils:
import { API } from "@env";
import {
  submitUserPassCustomLocksByTableQueryStringFunc,
  getPresignedDeleteURLQueryStringFunc,
} from "@/graphql/queries";
import ErrorSlippedUpBanana from "@/components/ErrorSlippedUpBanana";
import {
  AccountIcon,
  RedBackArrowIcon,
  LockIcon,
  UnlockIcon,
  TrashIcon,
  FollowerIcon,
  ChocolateShakeIcon,
  BlockUserIcon,
} from "@/constants/Images";
// const { account, follower, chocolateShake, padlock, unlock, iconTrash, iconBlockUser } = useImage()
import { useContentFunction } from "@/Contexts/ContentFunctions";
import deleteS3WithPresignedUrl from "@/utility/AWS/new/deleteBlobFromS3WithPresignedUrl";
import { grayphite } from "@/constants/Colors";
// import AudioRecorderPlayer from 'react-native-audio-recorder-player';
// const audioRecorderPlayer = new AudioRecorderPlayer();
import Constants from "expo-constants";

interface props {
  mapitemComment: any;
  day: any;
  event: any;
  usersAllowedToUnlock: any;
  setUsersPassLocks: any;
  setComments: any;
}

const ProfileIconClicked: React.FC<props> = ({
  mapitemComment,
  day,
  event,
  usersAllowedToUnlock,
  setUsersPassLocks,
  setComments,
}) => {
  console.log("mapitemComment", mapitemComment);

  const router = useRouter();

  const ALL_BLOCKS = useSelector((state: RootState) => state.app.ALL_BLOCKS);

  const [showLockCont, setShowLockCont] = useState(false);
  const [showError, setShowError] = useState(false);
  const showLockContObj = {
    showLockCont: showLockCont,
    setShowLockCont: setShowLockCont,
  };

  const { deleteComment, userBlocksUserFunc } = useContentFunction();
  //   const { API } = Constants?.easConfig.extra || "http://localhost:4000/api/graphql";

  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );
  const isUserPostingUser =
    day?.user_id === CURRENT_USER?.id || event?.user_id === CURRENT_USER?.id;
  const isUserCommentingUser = CURRENT_USER?.id === mapitemComment?.user_id;

  // scrolling_user_id whose blocking the user. mapitem is the commenting user that's being blocked. false no shadow ban it's user to user. feedback is internal notes. last param is optional notes on behalf of scrolling-user  which might not be a thing but was
  const blockUserClickHandler = async (event: any, mapitem: any) => {
    console.log("mapitem", mapitem);
    console.log(mapitem?.user_id);
    if (CURRENT_USER?.id === mapitem?.user_id) {
      return;
    }

    const allBlocks: any[] = await userBlocksUserFunc(
      CURRENT_USER?.id,
      mapitem?.user_id,
      false,
      "",
      ""
    );

    console.log("allBlocks", allBlocks);
    if (!allBlocks) {
      return;
    }
  };

  const deleteCommentClick = async (mapitem: any) => {
    if (mapitem?.is_voice === true) {
      console.log("soundComment");

      const presignedQuery = getPresignedDeleteURLQueryStringFunc(
        mapitem?.key?.key
      );
      const presignedPreData: any = await axios.post(
        API,
        // 'https://journallapi.vercel.app/api/graphql'
        {
          query: presignedQuery,
        }
      );

      console.log("presignedPreData ballot", presignedPreData);

      if (!presignedPreData) {
        console.log("are we hiding in the presignedPredata block");
        return null;
      }

      let presignedData = presignedPreData?.data?.data?.getPresignedDeleteURL;
      const parsedPresignedData = JSON.parse(presignedData);
      console.log(
        "parsedPresignedData.signedUrl:",
        parsedPresignedData?.signedUrl
      );

      const deletedBlob = await deleteS3WithPresignedUrl(
        parsedPresignedData?.signedUrl
      );
      console.log(
        "deletedBlob value:",
        deletedBlob,
        "type:",
        typeof deletedBlob
      );
      console.log("deletedBlob", deletedBlob);

      if (deletedBlob === true) {
        console.log("🔥 entered IF block");
        deleteComment(mapitem, day?.id, null, setComments);
      } else {
        console.log("🚫 skipped IF block");
      }
    } else if (!mapitem?.is_voice) {
      deleteComment(mapitem, day?.id, null, setComments);
    }
  };

  const canScrollingUserUnlock = () => {
    const canUserUnlock =
      Array.isArray(usersAllowedToUnlock) &&
      usersAllowedToUnlock?.some(
        (unlocks: any) => unlocks?.user_with_key_id === CURRENT_USER?.id
      );
    return canUserUnlock;
  };

  const showLockClick = () => {
    setShowLockCont(true);
  };

  const visitProfile = () => {
    router.push(`/profile/${mapitemComment?.user_id}`);
  };

  return (
    <View style={styles.addDeleteBlockSmoothieCont}>
      {showError === true ? (
        <ErrorSlippedUpBanana size="mini" setShowError={setShowError} />
      ) : showLockCont === true ? (
        <ProfileIconClickedLockToolDay
          setShowLockCont={setShowLockCont}
          mapitemComment={mapitemComment}
          setShowError={setShowError}
          day={day}
          setUsersPassLocks={setUsersPassLocks}
        />
      ) : (
        <View style={styles.profileIconClickedCont}>
          <TouchableOpacity onPress={() => visitProfile()}>
            <Image style={styles.iconTiny} source={AccountIcon} />
          </TouchableOpacity>
          {/* <Image onClick={() => visitProfile(useRouter)} style={styles.iconTiny} source={AccountIcon} /> */}

          {/* <Image style={styles.iconTiny} source={FollowerIcon} /> */}

          {/* or you can unlock and user is on the list!!!! */}
          {(isUserPostingUser || canScrollingUserUnlock()) && (
            <TouchableOpacity onPress={showLockClick}>
              <Image style={styles.iconTiny} source={LockIcon} />
            </TouchableOpacity>
          )}

          {(isUserPostingUser ||
            CURRENT_USER?.id === mapitemComment?.user_id) && (
            <TouchableOpacity
              onPress={() => deleteCommentClick(mapitemComment)}
            >
              <Image style={styles.iconTiny} source={TrashIcon} />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={(event: any) =>
              blockUserClickHandler(event, mapitemComment)
            }
          >
            <Image style={styles.iconTiny} source={BlockUserIcon} />
          </TouchableOpacity>

          <Image style={styles.iconTiny} source={ChocolateShakeIcon} />
        </View>
      )}
    </View>
  );
};

interface LockToolDayProps {
  setShowLockCont: any;
  mapitemComment: any;
  setShowError: any;
  day: any;
  setUsersPassLocks: any;
}
const ProfileIconClickedLockToolDay: React.FC<LockToolDayProps> = ({
  setShowLockCont,
  mapitemComment,
  setShowError,
  day,
  setUsersPassLocks,
}) => {
  // const CURR_DAY = useSelector((state: RootState) => state.day.CURR_DAY);
  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );

  const thoughts = (Array.isArray(day?.thoughts) && day?.thoughts) || null;
  const postingUserThoughts =
    (Array.isArray(thoughts) &&
      thoughts?.find((thoughts) => thoughts?.thoughts?.length)) ||
    null;
  const moments = day?.moments || null;
  const fields = day?.fields || null;
  const greatfull = day?.greatfullagain || null;
  const currDayBallot = (Array.isArray(day?.ballots) && day?.ballots) || null;
  const { API } =
    Constants?.easConfig.extra || "http://localhost:4000/api/graphql";

  const goBack = () => {
    setShowLockCont(false);
  };

  const unlockCustomlock = async () => {
    // find tables that include "custom-" as the lock.
    const doAnyBallotsApplyToLock = {
      partOfPost: "ballots",
      unlock:
        (Array.isArray(currDayBallot) &&
          currDayBallot?.some((ballots) =>
            ballots?.unlock?.includes("custom-")
          )) ||
        null,
    };

    const dayUnlock = {
      partOfPost: "post",
      unlock: day?.unlock.includes("custom-") ? day?.unlock : null,
    };
    const thoughtUnlock = {
      partOfPost: "thoughts",
      unlock: postingUserThoughts[0]?.unlock?.includes("custom-")
        ? postingUserThoughts[0]?.unlock
        : null,
    };
    const momentUnlock = {
      partOfPost: "moments",
      unlock: moments.unlock?.includes("custom-") ? moments?.unlock : null,
    };
    const fieldUnlock = {
      partOfPost: "fields",
      unlock: fields?.unlock?.includes("custom-") ? fields?.unlock : null,
    };
    const greatfullUnlock = {
      partOfPost: "greatfull",
      unlock: greatfull?.unlock?.includes("custom-") ? greatfull?.unlock : null,
    };

    const preArray: any[] = [
      dayUnlock,
      thoughtUnlock,
      momentUnlock,
      fieldUnlock,
      greatfullUnlock,
    ];
    const filteredForCustomUnlocksArray = preArray?.filter(
      (items) => items?.unlock
    );

    const partsOfPostBucket = filteredForCustomUnlocksArray?.map(
      (parts) => parts?.partOfPost
    );
    if (!partsOfPostBucket) {
      return;
    }
    const unlockType: string = partsOfPostBucket[0];
    console.log("unlockType", unlockType);

    // (day_id:number, userGettingUnlocked:number, userGivingUnlocked:number, tables, unlockType:string)
    const query = submitUserPassCustomLocksByTableQueryStringFunc(
      day?.id,
      mapitemComment?.user_id,
      CURRENT_USER?.id,
      partsOfPostBucket,
      unlockType
    );

    try {
      let predata = await axios.post(API, { query: query });
      if (!predata) {
        return;
      }
      const updatedLocks =
        predata?.data?.data?.submitUserPassCustomLocksByTable;
      if (!updatedLocks) {
        return null;
      }
      console.log("updatedLocks", updatedLocks);
      setUsersPassLocks(updatedLocks);
      // dispatch(SET_CURR_DAY_USERS_PASS_LOCKS(updatedLocks))
    } catch (error) {
      console.log("error", error);
      setShowError(true);
    }
  };

  // * * * * * notification reminder!
  return (
    <View style={styles.addDeleteBlockSmoothieCont}>
      {/* i for information? */}

      <TouchableOpacity onPress={goBack}>
        <Image style={styles.iconTiny} source={RedBackArrowIcon} />
      </TouchableOpacity>

      <TouchableOpacity onPress={unlockCustomlock}>
        <Image style={styles.iconTiny} source={UnlockIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  profileIconClickedCont: {
    flexDirection: "row",
    width: "75%",
    justifyContent: "space-around",
    alignItems: "center",
    alignSelf: "center",
  },
  icons: {
    height: 50,
    width: 50,
  },
  iconMini: {
    height: 35,
    width: 35,
  },
  iconTiny: {
    height: 25,
    width: 25,
  },
  addDeleteBlockSmoothieCont: {},
});

export default ProfileIconClicked;
