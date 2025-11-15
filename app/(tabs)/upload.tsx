import axios from "axios";
import { useState, useEffect, useRef } from "react";

// redux
import { RootState } from "@/redux/store/rootReducer";
import { useSelector, useDispatch, createDispatchHook } from "react-redux";
import { SET_CURRENT_USER } from "@/redux/currentUser/currentUserSlice";

import {
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  View,
  Text,
  StyleSheet,
} from "react-native";
import UploadDayNavbar from "@/components/Content/UploadDay/Content/Thoughts/UploadDayNavbar";
import Thoughts from "@/components/Content/UploadDay/Content/Thoughts/Thoughts";
import Moments from "@/components/Content/UploadDay/Content/Moments/Moments";
import Fields from "@/components/Content/UploadDay/Content/Fields/Fields";
import Greatfull from "@/components/Content/UploadDay/Content/Greatfull/Greatfull";
import UploadVotes from "@/components/Content/UploadDay/Content/Votes/UploadVotes";
import SelectLock from "@/components/Content/UploadDay/Content/SelectLockOrUnlock/SelectLock/SelectLock";
import SelectUnlock from "@/components/Content/UploadDay/Content/SelectLockOrUnlock/SelectUnlock/SelectUnlock";
import Settings from "@/components/Content/UploadDay/Settings/Settings";
import { appBackground } from "@/constants/Colors";

// utils:
import {} from "@/graphql/queries";
import { useContentFunction } from "@/Contexts/ContentFunctions";
import {
  ShurikenIcon,
  PlainMsgButtonIcon,
  EyesIcon,
  SoundWaveIcon,
  SoundIcon,
  TrashIcon,
  ThoughtsIcon,
  MomentsIcon,
  FieldsIcon,
  GreatfullIcon,
} from "@/constants/Images";

import { grayphite } from "@/constants/Colors";

export default function Upload() {
  const { returnProfileImg } = useContentFunction();

  const dispatch = useDispatch();
  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );
  const ALL_USERS = useSelector((state: RootState) => state.app.ALL_USERS);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const [allUserProfileIcons, setAllUserProfileIcons] = useState<any>([]);
  const [showPreview, setShowPreview] = useState<boolean>(false);

  const [uploadDaySelection, setUploadDaySelection] = useState<string>("");

  const {
    profileIconInitS3,
    getUserCredentials,
    getCurrentUserWithCurrentUserToken,
  } = useContentFunction();

  const [day, setDay] = useState<any>({
    // 🚨 thoughts.content & thoughts.settings. upload settings at the end but they're set up as if it's not necessary.
    thoughts: [
      // { text: '', is_voice: false, blob: null },
      // also settings?
    ],
    moments: [
      // { header: '', caption: '', is_image: false, is_video: false, blob: null, blobURL: null, fileType},
    ],
    fields: {
      upload_fields: false,
      checkbox: [],
      // CSV 'clean vs sloppy, flipping fast, water, cuties', 'clean vs sloppy, world is playground'
      constantsee: [],
      //
      constantsee_show_stars_avg: true,
      constantsee_show_stars_users: true,
      constantsee_starrable: [],
      // day_id upon submission.
      day_id: null,
      // {iconDecideDo} right in the <ConstantseeCont/> to indicate this field corresponds to decision.
      decide_do_fields: [],
      dream: "",

      fields: [],
      // fields: [],

      // upon submission
      id: null,
      // shoes fire-icon/like button.
      likeable: "yes",
      likeable_show_users: true,
      lock: null,
      unlock: null,
      on_profile: "no",
      stars: "",

      text: [],
      // text: [],

      user_id: CURRENT_USER?.id,
      users_checkboxes: [],
      wits_ok: true,
    },
    decidedo: {
      decide: null,
      did_do_summary: null,
    },
    greatfull: {
      concern: null,
      criticism: null,
      // day_id: null,
      decide_do_gratitude: [],
      did_do_different: "",
      greatfull: [],
      greatfull_cqc_link: [],
      // id: null,
      lock: null,
      on_profile: null,
      question: null,
      show_cqc: null,
      unlock: null,
      // user_id:    null,
      words: [],
      zoom_in: "do different?",
      zoom_in_msg: null,
      zoom_out: "do over?",
      zoom_out_msg: null,
    },
    ballots: [
      ...(Array.from({ length: 3 })?.map((_, index) => ({
        // possible: use previous vote settings?
        title: "", // possibly settings possibly first row.
        type: "", // set by VoteTypeMenu
        description: "", // settings
        decision: "", // set by finishing the vote and becomes the notifciation
        custom_decision: "", // custom notification
        is_active: false, // create the vote and set true.

        lock: "", // deal
        unlock: "",
        custom_decision_by: "", // not used initially.

        is_media_vote: false,
        media_option_type: "", // images | videos
        invite_only_vote: false, // settings:
        anonymous_to_non_invited_voters: false,
        non_invited_users_can_like_or_stars: false,
        anonymous_votes_ok: false,
        user_submitted_options_need_approval: false,
        user_submitted_options_limit: null,
        user_submitted_options_ok: false,
        user_submitted_options_media_ok: false, // goes by media vote.
        user_submitted_options_user_array: [], // during submission of options
        user_submitted_options_is_approved_array: [], // not now a {false} record is created when user submits the option in <AddMedia/>
        hide_waiting_on_approval_votes: false,
        user_already_considering_option: null, // corresponds to ballot.options by [i]

        is_anonymous_vote: false, // later after an update.
        posting_user_considering_submitted_option_array: [], // irrelevant?
        posting_user_likes_submitted_option_array: [], // irrelevant? just likes that belong to votes
        posting_user_rates_submitted_option_array: [], // irrelevant? just stars that belongs to votes.
        after_vote_show_list: true, // probably ignoring for now
        after_vote_show_rejected_user_options: true, // later updates

        voter_can_determine: true, // no need
        user_went_with_vote_update: false, // <VoteFinishedMenu/
        litlikelove_or_stars: "litLikeLove", // likes or stars.

        notes: "",
        // option:   always ballots.optionS plural array with ballots[0] in case of 1 option Yes|No
        restriction: "", // settings

        leaderboard_int: [], // for best comments and pinned comment. ids from table.thoughts
        leaderboard_str: [], //
        show_results_during: true, // {eyes}
        edit_results_during: true, // iconTrash
        custom_decision_user_id: 0,
        custom_decision_username: "",
        custom_decision_usericon: "",
        options: [
          {
            text: "",
            blob: null,
            blobURL: null,
            blobType: null,
            dbURLblob: "",
          },
          {
            text: "",
            blob: null,
            blobURL: null,
            blobType: null,
            dbURLblob: "",
          },
          {
            text: "",
            blob: null,
            blobURL: null,
            blobType: null,
            dbURLblob: "",
          },
          {
            text: "",
            blob: null,
            blobURL: null,
            blobType: null,
            dbURLblob: "",
          },
        ],
      })) ?? []),
    ],
    settings: {
      user_id: CURRENT_USER?.id || 0,
      title: "",
      caption: "",
      day_icon: { blob: null, blobURL: null },
      private: false,
      invite_only: false,
      non_anonymous: "yes", // show icon or show groucho mask lol.
      starrable: "yes",
      stars_show_avg: true,
      stars_show_users: true,
      thoughts_ok: "yes",
      commenter_can_determine: true,
      voice_comments_ok: true,
      text_comments_ok: true,
      anonymous_comments_ok: true, // show yellow mask.
      i_can_unlock: false,
      u_can_unlock: false,
      comment_locks_ok: true,
      location_id: null,
      location: "",
      category_id: null,
      category: "",
      event_id: null,
      show_views_ok: true,
      show_time_ok: true,
      feedface: "",
    },
  });

  const [ballotBinIndex, setBallotBinIndex] = useState<any>(0);

  const [inviteOnlyUserList, setInviteOnlyUserList] = useState<any>([
    ...(ALL_USERS?.map((user: any, index: number) => ({
      id: user?.id,
      icon: user?.icon,
      username: user?.username,
      location_text: user?.location_text,
      location_id: user?.location_id,

      show_loc_in_comments: user?.privacy?.show_loc_in_comments,
      // isInvited === isChecked (checkbox yes as in they are invited to the (days.invite_only = true) content.
      isInvited: false,
    })) ?? []),
  ]);

  const [inviteOnlyVoteUsers, setInviteOnlyVoteUsers] = useState<any>([
    ...(ALL_USERS?.map((user: any, index: number) => ({
      id: user?.id,
      icon: user?.icon,
      username: user?.username,
      location_text: user?.location_text,
      location_id: user?.location_id,

      show_loc_in_comments: user?.privacy?.show_loc_in_comments,
      // isInvited === isChecked (checkbox yes as in they are invited to the (days.invite_only = true) content.
      isInvited: false,
    })) ?? []),
  ]);

  const [lockUpdater, setLockUpdater] = useState<any>({
    all: "",
    thoughts: "",
    moments: "",
    fields: "",
    greatfull: "",
    ballots: "",
  });

  const [unlockUpdater, setUnlockUpdater] = useState<any>({
    all: "",
    thoughts: "",
    moments: "",
    fields: "",
    greatfull: "",
    ballots: "",
  });

  useEffect(() => {
    const currentUserInit = async () => {
      const tokenDetails = await getUserCredentials();
      console.log("tokenDetails", tokenDetails);
      if (parseInt(tokenDetails?.userId) > 0) {
        const currentUser = await getCurrentUserWithCurrentUserToken(
          tokenDetails
        );
        dispatch(SET_CURRENT_USER(currentUser));
        setCurrentUser(currentUser);
        let clone = { ...day };
        let settingsClone = clone?.settings;
        settingsClone.user_id = currentUser?.id;
        clone.settings = settingsClone;
        setDay(clone);
        console.log("currentUser clientside", currentUser);
      }
      console.log("tokenDetails", tokenDetails);
    };
    currentUserInit();

    const getAllIcons = async () => {
      const icons = await profileIconInitS3(setAllUserProfileIcons);
      // console.log('icons', icons)
    };
    getAllIcons();
  }, [dispatch]);
  // }, [])

  return (
    <View style={styles.scrollView}>
      {/* <ScrollView contentContainerStyle={styles.scrollView}> */}

      {uploadDaySelection !== "lock" && uploadDaySelection !== "unlock" && (
        <UploadDayNavbar
          day={day}
          allUserProfileIcons={allUserProfileIcons}
          showPreview={showPreview}
          setShowPreview={setShowPreview}
          uploadDaySelection={uploadDaySelection}
          setUploadDaySelection={setUploadDaySelection}
          lockUpdater={lockUpdater}
          unlockUpdater={unlockUpdater}
        />
      )}

      <ScrollView contentContainerStyle={styles.scrollView}>
        {uploadDaySelection === "thoughts" ? (
          <Thoughts day={day} setDay={setDay} />
        ) : uploadDaySelection === "moments" ? (
          <Moments day={day} setDay={setDay} />
        ) : uploadDaySelection === "fields" ? (
          <Fields day={day} setDay={setDay} />
        ) : uploadDaySelection === "greatfull" ? (
          <Greatfull day={day} setDay={setDay} />
        ) : uploadDaySelection === "votes" ? (
          <UploadVotes
            day={day}
            setDay={setDay}
            ballotBinIndex={ballotBinIndex}
            setBallotBinIndex={setBallotBinIndex}
            inviteOnlyVoteUsers={inviteOnlyVoteUsers}
            setInviteOnlyVoteUsers={setInviteOnlyVoteUsers}
            allUserProfileIcons={allUserProfileIcons}
          />
        ) : uploadDaySelection === "settings" ? (
          <Settings
            day={day}
            setDay={setDay}
            inviteOnlyUsersList={inviteOnlyUserList}
            setInviteOnlyUsersList={setInviteOnlyUserList}
            unlockUpdater={unlockUpdater}
            setUnlockUpdater={setUnlockUpdater}
            allUserProfileIcons={allUserProfileIcons}
          />
        ) : // <Text> yo </Text>
        uploadDaySelection === "lock" ? (
          <SelectLock
            day={day}
            setDay={setDay}
            lockUpdater={lockUpdater}
            setLockUpdater={setLockUpdater}
            setUploadDaySelection={setUploadDaySelection}
            uploadDaySelection={uploadDaySelection}
          />
        ) : (
          uploadDaySelection === "unlock" && (
            <SelectUnlock
              day={day}
              setDay={setDay}
              unlockUpdater={unlockUpdater}
              setUnlockUpdater={setUnlockUpdater}
              setUploadDaySelection={setUploadDaySelection}
              uploadDaySelection={uploadDaySelection}
            />
          )
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1, // Ensures the ScrollView takes full available height
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    backgroundColor: appBackground,
  },
  navbar: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,

    borderColor: "blue",
    // borderWidth: 3
  },
  leftSideCont: {
    gap: 0,
  },
  rightSideCont: {
    flexDirection: "row",
    gap: 20,
  },
  navbarIcon: {
    height: 35,
    width: 35,
  },
  container: {
    gap: 5,
    padding: 10,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  addCommentRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    padding: 10,
    gap: 20,
    // height:
  },
  addCommentPlusInput: {
    height: 20,
    width: 20,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: -1,
    borderBottomRightRadius: 11,
    borderWidth: 2,
    borderColor: grayphite,
  },
  addCommentInputText: {
    fontSize: 16,
    fontWeight: 500,
    fontFamily: "Fuzzy Bubbles",
    color: grayphite,
  },
  input: {
    width: 24, // equivalent of 1.5rem (assuming 1rem = 16px)
    margin: 0,
    alignSelf: "center",
    borderRadius: 50, // makes it circular
    borderTopLeftRadius: 14.5,
    borderTopRightRadius: 65.5,
    borderBottomLeftRadius: 122.5,
    borderBottomRightRadius: 30,
    color: "#444", // equivalent of $grayphite
    fontFamily: "fuzzy", // make sure the font is linked properly
    fontSize: 10, // or adjust based on design
    borderWidth: 1.5,
    borderColor: "#44454fea", // border color
  },
  icon: {
    height: 35,
    width: 35,
  },
});
