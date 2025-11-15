import axios from "axios";
import { useState, useEffect } from "react";

// redux
import { RootState } from "@/redux/store/rootReducer";
import { useSelector } from "react-redux";

import {
  Dimensions,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  View,
  Text,
  StyleSheet,
} from "react-native";
import CurrDaySelectionEdit from "./CurrDaySelectionEdit";
import ThoughtsEdit from "./Thoughts/ThoughtsEdit";
import MomentsEdit from "./Moments/MomentsEdit";
import FieldsEdit from "./Fields/FieldsEdit";
import GreatfullEdit from "./Greatfull/GreatfullEdit";

// utils:
import { API } from "@env";
import {
  updateEditedContentQueryStringFunc,
  getPresignedUploadURLQueryStringFunc,
} from "@/graphql/queries";
import deleteS3WithPresignedUrl from "@/utility/AWS/new/deleteBlobFromS3WithPresignedUrl";
import uploadBlobToS3WithPresignedUrl from "@/utility/AWS/new/uploadBlobToS3WithPresignedUrl";

import { useContentFunction } from "@/Contexts/ContentFunctions";
import {
  ShurikenIcon,
  PlainMsgButtonIcon,
  EyesIcon,
  SoundWaveIcon,
  SoundIcon,
  TrashIcon,
  GreenForwardArrowIcon,
} from "@/constants/Images";
import { appBackground } from "@/constants/Colors";
import { grayphite } from "@/constants/Colors";
import { CLIENT_RENEG_WINDOW } from "tls";

interface props {
  day: any;
  allUserProfileIcons: any;
  setAllUserProfileIcons: any;
}

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const EditDay: React.FC<props> = ({
  day,
  allUserProfileIcons,
  setAllUserProfileIcons,
}) => {
  // const API = "https://journallapi.vercel.app/api/graphql";
  // const { API } = Constants?.easConfig.extra
  const predataString = API;

  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );

  const {
    prepareThoughtsForUpload,
    prepareMomentsForUpload,
    prepareFieldsForUpload,
    getPresignedDeleteURLFunc,
  } = useContentFunction();

  const [preConfirmUpload, setPreConfirmUpload] = useState<boolean>(false);
  const [preparedThoughts, setPreparedThoughts] = useState<any>(null);
  const [preparedMoments, setPreparedMoments] = useState<any>(null);
  const [newThoughts, setNewThoughts] = useState<any>(null);
  const [newMoments, setNewMoments] = useState<any>(null);
  const [newFields, setNewFields] = useState<any>(null);
  const [newGreatfull, setNewGreatfull] = useState<any>(null);

  const thoughts = day?.thoughts;
  const fields = day?.fields;

  const [currDaySelection, setCurrDaySelection] = useState<any>("");
  const postingUserThoughts = thoughts?.find(
    (th: any) => th?.thoughts?.length || null
  );
  const commentThoughts = thoughts?.filter(
    (th: any) => th?.thought?.length || null
  );

  // (mobile): commentStars (webapp): currDayStars v v v
  const [commentStars, setCommentStars] = useState<any>(
    (Array.isArray(day?.stars) && day?.stars) || null
  );
  const [fieldsBinIndex, setFieldsBinIndex] = useState<number>(0);
  const [fieldsConstantseeStars, setFieldsConstantseeStars] = useState<any>(
    (Array.isArray(fields?.stars) && fields?.stars) || null
  );
  const [usersAllowedToUnlock, setUsersAllowedToUnlock] = useState<any>(
    day?.userallowedtounlock
  );
  const [fieldsConstantseeClick, setFieldsConstantseeClick] =
    useState<boolean>(false);
  const [fieldsConstantseeIndex, setFieldsConstantseeIndex] =
    useState<number>(0);
  const [fieldsConstantseeText, setFieldsConstantseeText] =
    useState<string>("");

  // ballots:
  const [ballotBin, setBallotBin] = useState(
    (Array.isArray(day?.ballots) && day?.ballots) || null
  );
  const [ballotBinIndex, setBallotBinIndex] = useState(0);
  const [currVotes, setCurrVotes] = useState<any>(null);
  const [ballotOptionsLikes, setBallotOptionsLikes] = useState<any>(null);
  const [ballotOptionsStars, setBallotOptionsStars] = useState<any>(null);
  const [ballotsMediaBlobs, setBallotsMediaBlobs] = useState<any>(null);
  const ballotMediaVote =
    (Array.isArray(ballotBin) &&
      ballotBin[ballotBinIndex] &&
      ballotBin[ballotBinIndex]?.is_media_vote) ||
    false;
  const ballotType =
    (Array.isArray(ballotBin) &&
      ballotBin[ballotBinIndex] &&
      ballotBin[ballotBinIndex]?.type) ||
    "";

  // comments:
  const [comments, setComments] = useState<any>(
    thoughts?.filter((th: any) => th?.thought?.length || null)
  );
  const [soundComments, setSoundComments] = useState<any>();

  const [editDay, setEditDay] = useState<any>({
    // 🚨 thoughts.content & thoughts.settings. upload settings at the end but they're set up as if it's not necessary.
    thoughts: [
      // { text: '', is_voice: false, blob: null },
      // also settings?
    ],
    moments: [
      // { header: '', caption: '', is_image: false, is_video: false, blob: null, blobURL: null, },
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
    id: {
      thoughts: { id: 0, needUpdate: false },
      moments: { id: 0, needUpdate: false },
      fields: { id: 0, needUpdate: false },
      greatfull: { id: 0, needUpdate: false },
      bvallots: { id: 0, needUpdate: false },
      ballots: { id: 0, needUpdate: false },
    },
  });

  useEffect(() => {
    // thoughts init first:
    console.log("postingUserThoughts", postingUserThoughts);
    let soundthoughts = postingUserThoughts?.soundthoughts;
    console.log("soundthoughts", soundthoughts);
    let clone = { ...editDay };

    if (postingUserThoughts) {
      let cloneThoughts = postingUserThoughts;
      cloneThoughts.soundthoughts = postingUserThoughts?.soundthoughts;

      cloneThoughts = postingUserThoughts?.thoughts?.map(
        (thought: any, index: number) => {
          let isVoice = thought.includes("-"); // Checking if it's an audio thought
          let soundthought = postingUserThoughts?.soundthoughts?.find(
            (s: any) => s.key.Key.includes(thought)
          );

          return {
            text: thought,
            is_voice: isVoice,
            is_deleted: false,
            ...(soundthought
              ? { blob: { key: soundthought.key.Key, url: soundthought.blob } }
              : {}),
            // blob
          };
        }
      );
      clone.thoughts = cloneThoughts;
      clone.id.thoughts = postingUserThoughts?.id;
    }

    if (day.moments?.id) {
      let cloneMoments = day?.moments;
      console.log("cloneMoments", cloneMoments);
      // captions_array: (2) ['', ':D']

      let momentsArray =
        cloneMoments.captions_array?.map((moment: string, index: number) => ({
          header: cloneMoments.titles_array?.[index] || "", // Fallback to empty string if undefined
          caption: cloneMoments.captions_array?.[index] || "", // Keep empty strings
          is_image:
            cloneMoments.BLOBs?.[index]?.startsWith("data:image") ?? false,
          is_video:
            cloneMoments.BLOBs?.[index]?.startsWith("data:video") ?? false,
          media_tags_array: cloneMoments.media_tags_array?.[index],
          blob: cloneMoments.BLOBs?.[index] || null, // Preserve the blob URL or null
          blobURL: cloneMoments.BLOBs?.[index] || null, // Assuming this is the same for now
          is_deleted: false,
        })) || [];

      console.log("momentsArray", momentsArray);

      if (momentsArray) {
        clone.moments = momentsArray;
        clone.id.moments = cloneMoments?.id;
      }
    }

    if (day?.fields?.id) {
      let cloneFields = editDay?.fields;
      cloneFields.checkbox = day?.fields?.checkbox;
      cloneFields.constantsee = day?.fields?.constantsee;
      cloneFields.constantsee_show_stars_avg =
        day?.fields?.constantsee_show_stars_avg;
      cloneFields.constantsee_show_stars_users =
        day?.fields?.constantsee_show_stars_users;
      cloneFields.constantsee_starrable = day?.fields?.constantsee_starrable;
      cloneFields.id = day?.fields?.id;
      cloneFields.decide_do_fields = day?.fields?.decide_do_fields;
      cloneFields.dream = day?.fields?.dream;
      cloneFields.fields = day?.fields?.fields;
      cloneFields.id = day?.fields?.id;
      cloneFields.likeable = day?.fields?.likeable;
      cloneFields.likeable_show_users = day?.fields?.likeable_show_users;
      cloneFields.lock = day?.fields?.lock;
      cloneFields.unlock = day?.fields?.unlock;
      cloneFields.on_profile = day?.fields?.on_profile;
      cloneFields.stars = day?.fields?.stars;
      cloneFields.text = day?.fields?.text;
      cloneFields.user_id = day?.fields?.user_id;
      cloneFields.users_checkboxes = day?.fields?.users_checkboxes;
      cloneFields.wits_ok = day?.fields?.wits_ok;

      clone.fields = cloneFields;
      clone.id.fields = day?.fields?.id;
      console.log("day?.fields?.id", day?.fields?.id);
    }

    if (day?.greatfullagain.id) {
      let cloneGreatfull = editDay?.greatfull;
      cloneGreatfull.concern = day?.greatfullagain?.concern;
      cloneGreatfull.criticism = day?.greatfullagain?.criticism;
      cloneGreatfull.day_id = day?.greatfullagain?.day_id;
      cloneGreatfull.decide_do_gratitude =
        day?.greatfullagain?.decide_do_gratitude;
      cloneGreatfull.did_do_different = day?.greatfullagain?.did_do_different;
      cloneGreatfull.greatfull = day?.greatfullagain?.greatfull;
      cloneGreatfull.greatfull_cqc_link =
        day?.greatfullagain?.greatfull_cqc_link;
      cloneGreatfull.id = day?.greatfullagain?.id;
      cloneGreatfull.lock = day?.greatfullagain?.lock;
      cloneGreatfull.on_profile = day?.greatfullagain?.on_profile;
      cloneGreatfull.question = day?.greatfullagain?.question;
      cloneGreatfull.show_cqc = day?.greatfullagain?.show_cqc;
      cloneGreatfull.unlock = day?.greatfullagain?.unlock;
      cloneGreatfull.user_id = day?.greatfullagain?.user_id;
      cloneGreatfull.words = day?.greatfullagain?.words;
      cloneGreatfull.zoom_in = day?.greatfullagain?.zoom_in;
      cloneGreatfull.zoom_in_msg = day?.greatfullagain?.zoom_in_msg;
      cloneGreatfull.zoom_out = day?.greatfullagain?.zoom_out;
      cloneGreatfull.zoom_out_msg = day?.greatfullagain?.zoom_out_msg;
      clone.greatfull = cloneGreatfull;

      clone.id.greatfull = day?.gretatfullagain?.id;
    }
    if (day?.ballots?.some((b: any) => b?.id)) {
      // Create a deep copy of day.ballots
      const clonedBallots = day.ballots.map((ballot: any) => ({
        ...ballot,
        options: ballot.options.map((option: any) => ({ ...option })),
        // id: ballot?.id
      }));

      // Update the state with the cloned ballots
      setEditDay((prevEditDay: any) => ({
        ...prevEditDay,
        ballots: clonedBallots,
      }));
      // let cloneBallots = editDay?.ballots;
      // cloneBallots = day?.ballots;
    }
    setEditDay(clone);
  }, []);

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

  const test = () => {
    console.log("editDay", editDay);
    console.log("day", day);
  };

  const updateEditedContent = async () => {
    let thoughts = day?.thoughts;
    let moments = day?.moments;
    let fields = day?.fields;
    let greatfull = day?.greatfull;
    let settings = day?.settings;
    let decideDo = day?.decidedo;
    let ballots = day?.ballots;

    // lockupdater:
    // unlockUpdater if not in the resolvers.ts:

    console.log("moments", moments);

    const newThoughtsObj = await prepareThoughtsForUpload(
      settings,
      thoughts,
      setPreparedThoughts,
      setNewThoughts,
      lockUpdater,
      unlockUpdater
    );
    const newFieldsObj = await prepareFieldsForUpload(
      settings,
      fields,
      setNewFields,
      lockUpdater,
      unlockUpdater
    );
    const newMomentsObj = await prepareMomentsForUpload(
      moments,
      setPreparedMoments,
      setNewMoments,
      lockUpdater,
      unlockUpdater
    );

    console.log("fields", fields);
    console.log("newMomentsObj", newMomentsObj);
    console.log("newFieldsObj", newFieldsObj);

    const stringedDayObj = JSON.stringify(day?.settings);
    const stringedThoughts = JSON.stringify(
      newThoughts || newThoughtsObj?.newThoughts
    );
    const stringedMoments = JSON.stringify(
      newMoments || newMomentsObj?.newMoments
    );

    // console.log('stringedMoments', stringedMoments)

    const stringedFields = JSON.stringify(newFields || newFieldsObj);

    const stringedBallots = JSON.stringify(ballots);
    const stringedGreatfull = JSON.stringify(greatfull);
    // const stringedGreatfull = JSON.stringify(updatedGreatfull)
    const stringedUploadDayDecideDo = JSON.stringify(decideDo);

    const query = updateEditedContentQueryStringFunc(
      stringedDayObj,
      stringedThoughts,
      stringedMoments,
      stringedFields,
      stringedGreatfull,
      stringedUploadDayDecideDo,
      stringedBallots
    );

    const predata = await axios.post("/api/graphql", { query: query });
    console.log("predata", predata);

    if (!predata) {
      return;
    }

    let data = predata?.data?.data?.updateEditedContent;
    console.log("data", data);
    if (!data) {
      return;
    }

    // delete the BLOBS!!
    thoughts?.forEach(async (thought: any) => {
      if (thought?.deleted === true) {
        const presignedData = await getPresignedDeleteURLFunc(thought?.key);
        await deleteS3WithPresignedUrl(presignedData?.signedUrl);
      }
    });

    // delete the BLOBS!!
    moments?.forEach(async (moment: any) => {
      if (moment?.deleted === true) {
        const presignedData = await getPresignedDeleteURLFunc(moment?.key);
        await deleteS3WithPresignedUrl(presignedData?.signedUrl);
        // const deletedBlob = await deleteBlobFromS3(moment?.key);
        // console.log("deletedBlob", deletedBlob);
      }
    });

    let parsedData = JSON.parse(data);
    console.log("parsedData", parsedData);
    // delete blobs:
  };

  const uploadContent = async () => {
    if (!preConfirmUpload) {
      setPreConfirmUpload(true);
    } else {
      // upload content then go back to main.

      let thoughts = day?.thoughts;
      let moments = day?.moments;
      let fields = day?.fields;
      let greatfull = day?.greatfull;
      let settings = day?.settings;
      let decideDo = day?.decidedo;
      let ballots = day?.ballots;
      let filteredBallotOptions = ballots?.options?.filter(
        (o: any) => o?.text === "" && o?.blob === null
      );
      ballots.options = filteredBallotOptions;

      // lockupdater:
      // unlockUpdater if not in the resolvers.ts:

      console.log("moments", moments);

      const newThoughtsObj = await prepareThoughtsForUpload(
        settings,
        thoughts,
        setPreparedThoughts,
        setNewThoughts,
        lockUpdater,
        unlockUpdater
      );
      const newFieldsObj = await prepareFieldsForUpload(
        settings,
        fields,
        setNewFields,
        lockUpdater,
        unlockUpdater
      );
      const newMomentsObj = await prepareMomentsForUpload(
        moments,
        setPreparedMoments,
        setNewMoments,
        lockUpdater,
        unlockUpdater
      );

      console.log("newThoughtsObj", newThoughtsObj);
      console.log("newFieldsObj", newFieldsObj);
      console.log("newMomentsObj", newMomentsObj);

      const stringedDayObj = JSON.stringify(day?.settings);
      const stringedThoughts = JSON.stringify(
        newThoughts || newThoughtsObj?.newThoughts
      );
      const stringedMoments = JSON.stringify(
        newMoments || newMomentsObj?.newMoments
      );

      // console.log('stringedMoments', stringedMoments)

      const stringedFields = JSON.stringify(newFields || newFieldsObj);

      const stringedBallots = JSON.stringify(ballots);
      const stringedGreatfull = JSON.stringify(greatfull);
      // const stringedGreatfull = JSON.stringify(updatedGreatfull)
      const stringedUploadDayDecideDo = JSON.stringify(decideDo);

      // return;

      const query = updateEditedContentQueryStringFunc(
        stringedDayObj,
        stringedThoughts,
        stringedMoments,
        stringedFields,
        stringedGreatfull,
        stringedUploadDayDecideDo,
        stringedBallots
      );

      const predata = await axios.post(predataString, { query: query });
      console.log("predata", predata);

      if (!predata) {
        return;
      }

      let data = predata?.data?.data?.uploadContent;
      if (!data) {
        return;
      }
      let parsedData = JSON.parse(data);
      console.log("parsedData", parsedData);
      // console.log('parsedData', parsedData)

      const filteredPrepareMoments = newMomentsObj?.preparedMoments?.filter(
        (moments: any) => moments?.blob
      );
      console.log("filteredPrepareMoments", filteredPrepareMoments);
      if (filteredPrepareMoments && Array.isArray(filteredPrepareMoments)) {
        filteredPrepareMoments?.forEach(async (moment: any) => {
          const prepath: string = `media/day-${parsedData?.id}-folder/moments/`;
          const path = `${prepath}${moment?.media_tags_array}`;
          // `media/day-${CURR_DAY?.id}-folder/ballots/${currBallot?.media_option_type}/ballot${currBallot?.id}-*${currBallot?.media_option_type}*-${userSubmittedOptionsInputValue}`

          const presignedQuery = getPresignedUploadURLQueryStringFunc(
            path,
            moment?.fileType
          );
          console.log("presignedQuery", presignedQuery);

          // for presignedURL to update S3 with the new sound comment
          const presignedPreData: any = await axios.post(
            API,
            // "https://journallapi.vercel.app/api/graphql",
            {
              query: presignedQuery,
            }
          );

          console.log("presignedPreData", presignedPreData);

          if (!presignedPreData) {
            return null;
          }

          console.log("moment right here", moment);

          let presignedData =
            presignedPreData?.data?.data?.getPresignedUploadURL;
          const parsedPresignedData = JSON.parse(presignedData);
          console.log("parsedPresignedData", parsedPresignedData);

          // const uploadedBlob = await uploadBlobToS3(path, moment?.blob, moment?.fileType);
          const uploadedBlob = await uploadBlobToS3WithPresignedUrl(
            parsedPresignedData?.signedUrl,
            moment?.blob,
            moment?.fileType
          );
          console.log("uploadedBlob", uploadedBlob);
        });
      }

      const filteredPrepareThoughts = newThoughtsObj?.preparedThoughts?.filter(
        (thoughts: any) => thoughts?.blob
      );
      console.log("filteredPrepareThoughts", filteredPrepareThoughts);
      if (filteredPrepareThoughts && Array.isArray(filteredPrepareThoughts)) {
        filteredPrepareThoughts?.forEach(async (thought: any) => {
          const prepath: string = `media/day-${parsedData?.id}-folder/thoughts/`;
          const path = `${prepath}${thought?.path}`;

          const presignedQuery = getPresignedUploadURLQueryStringFunc(
            path,
            thought?.contentType
          );
          console.log("presignedQuery", presignedQuery);

          // for presignedURL to update S3 with the new sound comment
          const presignedPreData: any = await axios.post(
            API,
            // "https://journallapi.vercel.app/api/graphql",
            {
              query: presignedQuery,
            }
          );

          console.log("presignedPreData", presignedPreData);

          if (!presignedPreData) {
            return null;
          }

          let presignedData =
            presignedPreData?.data?.data?.getPresignedUploadURL;
          const parsedPresignedData = JSON.parse(presignedData);

          // const uploadedBlob = await uploadBlobToS3(path, thought?.blob, 'audio/mp3');
          const uploadedBlob = await uploadBlobToS3WithPresignedUrl(
            parsedPresignedData?.signedUrl,
            thought?.blob,
            thought?.contentType
          );
          console.log("uploadedBlob", uploadedBlob);
        });
      }

      const checkIfBallotBlobs =
        Array.isArray(ballots) &&
        ballots?.some((ballots: any, index: number) => {
          const doesBlobExist = ballots?.options?.some(
            (options: any) => options?.blob && options?.blobURL
          );
          return doesBlobExist;
          console.log("doesBlobExist", doesBlobExist);
          // return ballots?.options?.blob
        });

      if (Array.isArray(ballots) && checkIfBallotBlobs) {
        // const indexOfBallot = ballotBin?.findIndex(ballots => ballots?.options?.blob && ballots?.options?.blobURL)
        const indexOfBallot = ballots?.findIndex((b: any) => {
          const blobExists = b?.options.some(
            (options: any) => options?.blob && options?.blobURL
          );
          return blobExists;
        });

        const mediaBallot = ballots[indexOfBallot];

        const mediaOptionType = mediaBallot?.media_option_type;
        if (!mediaBallot) {
          return;
        }
        let blobIndexBallots = 0;
        mediaBallot?.options?.forEach(async (option: any) => {
          console.log(option);

          // 🚨 🚨 🚨 🚨 also not ballotBin but the updated votes so the ballot is sent back with submitted dayData;
          // 🚨 🚨 🚨    ${userSubmittedOptionsInputValue} --->

          if (option?.blob && option?.blobURL) {
            const prepath: string = `media/day-${parsedData?.id}-folder/ballots/${mediaBallot?.media_option_type}/`;
            const path = `${prepath}${option?.dbURLblob}`;

            console.log("option?.blobType", option?.blobType);
            // console.log('option?.blobType', option?.blobType);
            const presignedQuery = getPresignedUploadURLQueryStringFunc(
              path,
              option?.blobType
            );
            const presignedPreData: any = await axios.post(
              API,
              // "https://journallapi.vercel.app/api/graphql",
              {
                query: presignedQuery,
              }
            );

            console.log("presignedPreData ballot", presignedPreData);

            if (!presignedPreData) {
              return null;
            }

            let presignedData =
              presignedPreData?.data?.data?.getPresignedUploadURL;
            const parsedPresignedData = JSON.parse(presignedData);

            const uploadedBlob = await uploadBlobToS3WithPresignedUrl(
              parsedPresignedData?.signedUrl,
              option?.blob,
              option?.blobType
            );
            // const uploadedBlob = await uploadBlobToS3WithPresignedUrl(parsedPresignedData?.signedUrl, option?.blob, option.blobType);

            console.log("uploadedBlob", uploadedBlob);

            // 🚨 DEBUG: Test the exact CloudFront URL that should work
            const testCloudfrontUrl = parsedPresignedData?.cloudfrontUrl;

            const url = new URL(parsedPresignedData?.signedUrl);
            console.log(
              "🧾 Signed headers:",
              url.searchParams.get("X-Amz-SignedHeaders")
            );

            console.log("🔄 Testing CloudFront URL:", testCloudfrontUrl);

            // Try to fetch it immediately
            try {
              const testResponse = await fetch(testCloudfrontUrl);
              console.log(
                "🔍 CloudFront test response status:",
                testResponse.status
              );
              console.log(
                "🔍 CloudFront test response type:",
                testResponse.headers.get("content-type")
              );

              if (testResponse.ok) {
                const testBlob = await testResponse.blob();
                console.log(
                  "✅ CloudFront test - blob type:",
                  testBlob.type,
                  "size:",
                  testBlob.size
                );
              } else {
                const errorText = await testResponse.text();
                console.log(
                  "❌ CloudFront test error:",
                  errorText.substring(0, 200)
                );
              }
            } catch (error) {
              console.log("❌ CloudFront test fetch failed:", error);
            }

            // const uploadedBlob = await uploadBlobToS3(path, option?.blob, option?.blobType);
            console.log("uploadedBlob", uploadedBlob);
          }
          // ballot${mediaBallot?.id}-*${mediaBallot?.media_option_type}*-${blobIndexBallots}`
          // const prepath:string = `media/day-${parsedData?.id}-folder/ballots/${mediaBallot?.media_option_type}/ballot${mediaBallot?.id}-*${mediaBallot?.media_option_type}*-${blobIndexBallots}`
          blobIndexBallots += 1;
        });
      }
    }
  };

  return (
    <View style={styles.postContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={test}>
          <Image source={GreenForwardArrowIcon} style={styles.iconMini} />
        </TouchableOpacity>
      </View>

      <CurrDaySelectionEdit
        day={day}
        currDaySelection={currDaySelection}
        setCurrDaySelection={setCurrDaySelection}
      />

      <View style={styles.contentContainer}>
        {
          currDaySelection === "thoughts" ? (
            <ThoughtsEdit editDay={editDay} setEditDay={setEditDay} />
          ) : currDaySelection === "moments" ? (
            <MomentsEdit editDay={editDay} setEditDay={setEditDay} /> // usersPassLocks={usersPassLocks} setUsersPassLocks={setUsersPassLocks}  />
          ) : // <Text> moments </Text>
          currDaySelection === "fields" ? (
            <FieldsEdit editDay={editDay} setEditDay={setEditDay} /> // usersPassLocks={usersPassLocks} setUsersPassLocks={setUsersPassLocks}  />
          ) : (
            // <Text> moments </Text>
            currDaySelection === "greatfullagain" && (
              <GreatfullEdit editDay={editDay} setEditDay={setEditDay} />
            )
          ) // usersPassLocks={usersPassLocks} setUsersPassLocks={setUsersPassLocks}  />
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    flex: 1, // Ensures the ScrollView takes full available height
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    backgroundColor: appBackground,
    gap: 10,
  },
  // postContainer: {
  //     flex: 1,
  //     height: screenHeight * 0.6, // .575, .6,
  //     width: screenWidth * 0.8,
  //     borderWidth: 3,
  //     borderColor: grayphite,
  //     // paddingBottom: 16,
  // },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 8,
  },
  currDaySelectionButton: {
    width: 25,
    height: 25,
    borderRadius: 25,
    marginRight: 8,
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
  },
  contentContainer: {
    flex: 1,
    height: screenHeight * 0.5,
    margin: 0,
    padding: 0,
  },
  postImage: {
    flex: 1,
    width: "100%",
    height: screenHeight * 0.5,
  },
  footer: {
    height: 25,
    width: "100%",
    // borderWidth: 1,
    borderColor: "green",
    justifyContent: "center",
    alignSelf: "center",
    // marginTop: 10
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
    marginRight: 16,
  },
  caption: {
    fontSize: 14,
    height: 10,
    textAlign: "center",
  },
  iconMini: {
    height: 35,
    width: 35,
  },
});

export default EditDay;
//
