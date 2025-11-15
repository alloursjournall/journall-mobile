import axios from "axios";

import { Platform } from "react-native";
import { useRouter } from "expo-router";

// redux
import { RootState } from "@/redux/store/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import {
  SET_CURRENT_USER,
  SET_CURRENT_USER_PRIVACY,
  SET_CURRENT_USER_MOST_RECENT_POST,
} from "@/redux/currentUser/currentUserSlice";

import {
  SET_ALL_USERNAMES,
  SET_ALL_USERS,
  SET_ALL_LOCATIONS,
  SET_ALL_CATEGORIES,
  SET_ALL_FOLLOWERS,
  SET_ALL_BLOCKS,
} from "@/redux/app/appSlice";
import {
  SET_PROFILE_LISTENERS,
  SET_FOLLOWERS_N_FOLLOWED_USERS,
  SET_PROFILE_USER_CONTENT_BUCKET,
} from "@/redux/profile/profileSlice";

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useMemo,
} from "react";

import {
  userLikesFieldQueryStringFunc,
  copyFieldsOntoNewFieldsQueryStringFunc,
  submitOneThruFiveStarsQueryStringFunc,
  getMostRecentDayPostWithUserIdQueryStringFunc,
  getUserWithIdQueryStringFunc,
  submitCommentThoughtALLpassCommentThoughtsTrueQueryStringFunc,
  updateCommentThoughtALLpassCommentThoughtsFalseQueryStringFunc,
  submitUserPassCommentLockQueryStringFunc,
  submitAnyPassLockForPostQueryStringFunc,
  submitCommentThoughtQueryStringFunc,
  userLikesActualBallotOptionQueryStringFunc,
  userLikesActualBallotOptionEventQueryStringFunc,
  userLikesProposedBallotOptionQueryStringFunc,
  userRatesBallotOptionQueryStringFunc,
  userRatesProposedBallotOptionQueryStringFunc,
  deleteUserSubmittedVoteButLeaveRecordOfSubmissionQueryStringFunc,
  deleteCommentVoteQueryStringFunc,
  submitCommentVoteQueryStringFunc,
  submitJoinDayVoteQueryStringFunc,
  submitVoteQueryStringFunc,
  postingUserApprovesProposedVoteQueryStringFunc,
  finishVoteAndUpdateBallotQueryStringFunc,
  deleteLocationQueryStringFunc,
  addNewProposedLocationQueryStringFunc,
  ALLuserProfileDataStringQueryStringFunc,
  profileAllListenersGETQueryStringFunc,
  getPresignedUploadURLQueryStringFunc,
  deleteUserListeningQueryStringFunc,
  addUserListeningQueryStringFunc,
  allBlocksGETquery,
  getObjKeysFromFolderS3QueryStringFunc,
  profileGetAllFollowersAndFollowedUsersGETQueryStringFunc,
  doWeFollowEachOtherQueryStringFunc,
  doWeBlockEachOtherQueryStringFunc,
  sendMobileTestLinkSendgridAndroidQueryStringFunc,
  sendMobileTestLinkSendgridAppleQueryStringFunc,
  getUserUploadedContentWithUserIdQueryStringFunc,
  allUsersGETquery,
  allLocationsGETquery,
  allCategoriesGETquery,
  refreshDayQueryStringFunc,
  refreshDayCommentsQueryStringFunc,
  refreshDayBallotsQueryStringFunc,
  profileAllUserEventsGETQueryStringFunc,
  allProfileFollowersGETQueryStringFunc,
  submitOrUpdateEventAttendanceQueryStringFunc,
  deleteCommentQueryStringFunc,
  createVoteCommentBucketQueryStringFunc,
  updateSubmittedBallotOptionsAndUserArrayQueryStringFunc,
  submitJoinDayWriteContentAndUpdateBallotStringFunc,
  updateBestCommentDecisionQueryStringFunc,
  userBlocksUserQueryStringFunc,
  allMyFollowersQueryStringFunc,
  allMyFollowedUsersQueryStringFunc,
  allFollowersGETquery,
  userWentWithVoteUpdateQueryStringFunc,
  deleteFollowerQueryStringFunc,
  allMyBlocksQueryStringFunc,
  addBlockedUserQueryStringFunc,
  deleteBlockedUserQueryStringFunc,
  addFollowerQueryStringFunc,
  dayListenersAddQueryStringFunc,
  dayListenersDeleteQueryStringFunc,
  verifyEmailQueryStringFunc,
  getUserPrivacySettingsWithUserIdQueryStringFunc,
  daysGETwithDATEQueryStringFunc,
  daysGETtrendingWithMonthAndYearQueryStringFunc,
  daysGETmonthOfQueryStringFunc,
  daysGETweekOfQueryStringFunc,
  daysGETtrendingWeekOfQueryStringFunc,
  daysGETdayOfQueryStringFunc,
  daysGETtrendingDayOfQueryStringFunc,
  allUsersPrivacyGETquery,
  sendVerificationEmailSendGridQueryStringFunc,
  searchContentAndUsersQueryStringFunc,
  testQueryStringFunc,
  getLimitedUsersAndPrivacyQueryStringFunc,
  getPresignedDeleteURLQueryStringFunc,
} from "@/graphql/queries";

// utils:
import { API } from "@env";
import getObjAudioFromCloudfront from "@/utility/AWS/new/cloudfront/getObjAudioFromCloudfront";
import getDayBallotMediaFOLDERPathFromS3 from "@/utility/AWS/old/getDayBallotMediaFOLDERPathFromS3";
import getBLOBandKEYandURLfromCloudFront from "@/utility/AWS/new/cloudfront/getBLOBandKEYandURLfromCloudfront";
import * as SecureStore from "expo-secure-store";
import * as FileSystem from "expo-file-system/legacy";
import { Audio as ExpoAudio } from "expo-av";
import { HeartIcon } from "@/constants/Images";
import { getToday, nothingWithDummyParams } from "@/utility/utilityValues";
import uploadBlobToS3WithPresignedUrl from "@/utility/AWS/new/uploadBlobToS3WithPresignedUrl";
import { Z_SYNC_FLUSH } from "zlib";

type ContentFunctionTypes = {
  // example placeholder functions/values
  profileIconInitS3: (setAllUserProfileIcons: any) => any;
  returnProfileImg: (userId: number, array: any) => any;
  getUserCredentials: () => any;

  sendVerificationEmailSendGrid: (
    source: string,
    destination: string,
    userId: number
  ) => any;

  blobbifyAndReturnPosts: (posts: any) => any;
  getCurrentUserWithCurrentUserToken: (token: any) => any;

  daysGETtrendingwithMonthAndYearFunction: (month: string, year: string) => any;
  getLimitedUsersAndPrivacy: (limit: number) => any;
  getUserPrivacySettingsWithUserIdFunc: (userId: number) => any;

  seeAllThoughtsUnlockHandler: (
    thoughtsVisited: any,
    markAsVisited: any,
    day: any,
    usersPassLocks: any,
    setUsersPassLocks: any
  ) => any;

  startPlayingRecordedSound: (soundCommentFile: any) => any;

  calculateStarsAverage: (
    parentDataWithStarsId: number | null,
    eventId: number | null,
    scrollContainerId: number | null,
    scrollPos: number | null,
    starsArray: any,
    setStarState: any
  ) => any;

  submitOneThruFiveRatings: (
    day: any,
    event_id: number | null,
    postingUserThoughts: any,
    field_id: number | null,
    field_constantsee: string | null,
    postingUserId: number,
    currentUserId: number,
    currentUsername: string,
    currentUserIcon: string,
    stars: number
  ) => any;

  setCurrentUserMostRecentPostFunc: (setCurrentUserMostRecentPost: any) => any;

  notificationMaker: (
    for_user_id: number,
    notification_json_string: string
  ) => any;

  witsFieldsIndexConfirmClick: (
    day: any,
    field: any,
    fields: any,
    fieldIndex: number,
    checkIfUserAlreadyCopiedField: any,
    checkIfUserHasTooManyFields: any,
    witsFieldsIndexBackBtnClick: any,
    currentUserMostRecentPost: any,
    setCurrentUserMostRecentPost: any,
    rewritePostOrNewPost: any
  ) => any;

  likeField: (day: any, fields: any, field: string, setFieldLikes: any) => any;

  fieldsToggleCheckbox: (
    day: any,
    fields: any,
    fieldCheckboxes: any,
    fieldsBinIndex: number,
    setFieldCheckboxes: any
  ) => any;

  fieldsEyeAmClicking: (
    fields: any,
    index: number,
    setFieldsConstantseeText: any,
    setFieldsConstantseeIndex: any,
    fieldsConstantseeClick: boolean,
    setFieldsConstantseeClick: any
  ) => any;

  didUserPassThisLockAlready: (unlockType: string, usersPassLocks: any) => any;

  unlockFunc: (
    unlockType: string,
    passAllOrPassUser: string,
    day: any,
    setCurrDayUsersPassLocks: any
  ) => any;

  submitTextComment: (
    mapitemComment: any,
    mapitemCommentIndex: number | null,
    eventId: number | null,
    locationId: number | null,
    locationText: number | null,
    commentIcon: string | null,
    commenterCanDetermineCheckboxCheckpoint: any,
    setCommenterCanDetermineCheckboxCheckpoint: any,
    replyInputValue: string,
    newCommentThoughtsOk: string,
    newCommentStarrable: string,
    newCommentNonAnonymous: string,
    newCommentStarsShowAvg: boolean,
    newCommentStarsShowUsers: boolean,
    newCommentIsVideo: boolean,
    newCommentIsVoice: boolean,
    newCommentCommenterCanDetermine: boolean,
    newCommentVoiceCommentsOk: boolean,
    newCommentTextCommentsOk: boolean,
    newCommentAnonymousCommentsOk: boolean | string,
    newCommentLock: string | null,
    newCommentUnlock: string | null,

    day: any,
    setUsersPassLocks: any,
    setSoundCommentFile: any,
    setReplyInputValue: any,
    setComments: any,
    setError: any
  ) => any;

  submitSoundCommentThought: (
    mapItemComment: any | null,
    index: number | null,
    eventId: number | null,
    locationId: number | null,
    locationText: number | null,
    checkboxCheckpoint: boolean,
    setCheckboxCheckpoint: any,
    soundCommentFile: any,
    setSoundCommentFile: any,
    setReplyInputValue: any,
    // 🚨 🚨 to make this function agnostic to {days|event} {soundComments, setSoundComments} as two separate props
    soundComments: any,
    setSoundComments: any,
    newCommentThoughtsOk: string,
    newCommentStarrable: string,
    newCommentStarsShowAvg: boolean,
    newCommentStarsShowUsers: boolean,

    // voice_comment_path:string,
    non_anonymous: string,
    commenter_can_determine: boolean,
    voice_comments_ok: boolean,
    text_comments_ok: boolean,
    anonymous_comments_ok: boolean,
    i_can_unlock: boolean,
    u_can_unlock: boolean,
    lock: string | null,
    unlock: string | null,

    day: any,
    usersPassLocks: any,
    comments: any,
    setComments: any,
    setError: any
  ) => any;

  submitCommentThoughtALLpassCommentThoughtsTrueFunc: (
    day_id: number,
    thought_id: number,
    setUsersPassLocks: any,
    setError: any
  ) => any;

  updateCommentThoughtALLpassCommentThoughtsFalseFunc: (
    day_id: number,
    thought_id: number,
    setUsersPassLocks: any,
    setError: any
  ) => any;

  passCommentLockFunc: (
    comment: any,
    day: any,
    setUsersPassLocks: any,
    setError: any
  ) => any;

  startRecordingSound: (
    recorderRef: any,
    streamRef: any,
    setSoundCommentFile: any
  ) => any;

  clearRecordedSound: (setSoundCommentFile: any) => any;

  deleteComment: (
    mapitem: any,
    dayId: number,
    eventId: any,
    setComments: any
  ) => any;

  userBlocksUserFunc: (
    user_id: number | null,
    blocked_id: number,
    is_shadow_ban: boolean | null,
    feedback: string | null,
    notes: string | null
  ) => any;

  getNumberFromCommentLock: (comment: any) => any;
  commentLockTimesRatedTimesLeft: (comment: any, stars: any) => any;

  userWentWithVoteOptionHeartToggler: (
    day_id: any,
    event_id: any,
    ballotId: number,
    currentWentWithVoteUpdateStatus: boolean,
    setBallotBin: any,
    setCurrVotes: any,
    setBallotOptionsLikes: any,
    setBallotOptionsStars: any
  ) => any;

  finishVoteAndUpdateBallotFunc: (
    decision: any,
    leaderboard: any,
    voteOutcomesMsg: any,
    plainOrCustom: string,
    day: any,
    ballotBin: any,
    currBallot: any,
    setBallotBin: any,
    event: any,
    usersPassLocks: any,
    setUsersPassLocks: any,
    votes: any,
    setCurrWinningVotes: any,
    setCurrVotes: any,
    setBallotOptionsLikes: any,
    setBallotOptionsStars: any
  ) => any;

  finishJoinDayVote: (
    currBallot: any,
    setLeaderboard: any,
    setDecision: any,
    setAlmostDoneFinishingVote: any,
    ballotIsDone: any,
    day: any,
    votes: any
  ) => any;

  submitJoinDayWriteContentAndUpdateBallotFunc: (
    ballotsMediaBlobs: any,
    feed: any,
    setFeed: any,
    currBallot: any,
    // stock message for notifications
    decision: string,
    // ['winner', '2nd place of votes', '3rd place of votes', '4th place']
    leaderboard: string[] | number[] | null,
    // voteOutcomesMsg is the table.ballots.custom_decision
    voteOutcomesMsg: any,
    // local prop drilled state to go back to
    setAlmostDoneFinishingVote: any,

    day: any,
    usersPassLocks: any,
    setUsersPassLocks: any,
    currVotes: any
  ) => any;

  finishCommentVoteAndUpdateBallotFunc: (
    decision: any,
    leaderboard: any,
    voteOutcomesMsg: any,
    plainOrCustom: string,
    day: any,
    ballotBin: any,
    currBallot: any,
    setBallotBin: any,
    event: any,
    usersPassLocks: any,
    setUsersPassLocks: any,
    votes: any,
    setCurrWinningVotes: any,
    setCurrVotes: any,
    setBallotOptionsLikes: any,
    setBallotOptionsStars: any
  ) => any;

  userRatesBallotOptionFunc: (
    mapitem: any,
    voteOrProposedVote: string,
    currBallot: any,
    starClickedIndex: number,
    day: any,
    event: any,
    usersPassLocks: any,
    setUsersPassLocks: any,
    setBallotOptionsStars: any
  ) => any;

  isUserSubmittedOptionApprovedText: (mapitem: any, currBallot: any) => any;

  likeVoteOption: (
    mapitem: any,
    voteOrProposedVote: string,
    currBallot: any,
    day: any,
    event: any,
    setBallotOptionsLikes: any,
    usersPassLocks: any,
    setUsersPassLocks: any
  ) => any;

  submitUserSubmittedOption: (
    currBallot: any,
    didCurrentUserVote: any,
    // ⚠️ ⚠️ ⚠️ on media votes the userSubmittedOptionsInputValue is the mapitem.key.key (S3/cloudfront object key)
    userSubmittedOptionsInputValue: any,
    setUserSubmittedOptionsInputValue: any,
    setDidUserSubmit: any,
    day: any,
    setBallotBin: any
  ) => any;

  submitCommentVote: (
    day_id: number,
    ballot_id: number,
    user_id: number,
    username: string,
    user_profile_icon: string,
    vote_int: number,
    vote_type: string,
    vote_string: string
  ) => any;

  submitVoteUnlockChecker: (
    day: any,
    usersPassLocks: any,
    setUsersPassLocks: any
  ) => any;

  submitJoinDayVote: (
    day_id: number,
    ballot_id: number,
    user_id: number,
    username: string,
    user_profile_icon: string,
    vote_string: string | null,
    vote_type: string
  ) => any;

  submitVote: (
    day_id: number,
    ballot_id: number,
    user_id: number,
    username: string,
    user_profile_icon: string,
    vote_string: string | null,
    vote_type: string,
    non_anonymous: boolean | null,
    is_option: boolean | null
  ) => any;

  postingUserApprovesProposedVote: (
    mapitem: any,
    currBallot: any,
    dayId: any
  ) => any;

  isUserSubmittedOptionApprovedMedia: (mapitem: any, currBallot: any) => any;

  deleteVote: (ballot_id: number, vote_id: number, day_id: number) => any;

  deleteCommentVote: (
    vote_id: number,
    vote_int: number,
    vote_type: string,
    day_id: number,
    ballot_id: number,
    user_id: number
  ) => any;

  deleteUserSubmittedVoteButLeaveRecordOfSubmissionFunc: (
    mapitem: any,
    currBallot: any,
    dayId: any,
    setError: any
  ) => any;

  checkboxChangeHandler: (
    index: number,
    voteFinished: any,
    didCurrentUserVote: any,
    checkedBoxArray: any,
    setCheckedBoxArray: any
  ) => any;

  deleteCurrentUserVoteMedia: (
    currentUserVote: any,
    currBallot: any,
    myCurrentUserVote: any,
    checkedBoxArray: any,
    setCheckedBoxArray: any,
    day: any,
    currVotes: any,
    setCurrVotes: any
  ) => any;

  voteSubmitMedia: (
    currentUserVote: any,
    currBallot: any,
    day: any,
    setVotes: any
  ) => any;

  getMimeType: (filename: string) => any;

  prepareThoughtsForUpload: (
    settings: any,
    originalThoughtsBin: any,
    setPreparedThoughts: any,
    setNewThoughts: any,
    lockUpdater: any,
    unlockUpdater: any
  ) => any;

  prepareMomentsForUpload: (
    uploadMomentsBin: any,
    setPreparedMoments: any,
    setNewMoments: any,
    lockUpdater: any,
    unlockUpdater: any
  ) => any;

  prepareFieldsForUpload: (
    settings: any,
    uploadDayFields: any,
    setNewFields: any,
    lockUpdater: any,
    unlockUpdater: any
  ) => any;

  initialInitProfile: (
    userId: any,
    setCurrProfile: any,
    setCurrPrivacy: any
  ) => any;

  getAllProfileListeners: (profileId: number, setProfileListeners: any) => any;

  profileListenersDeleteFunc: (
    profileId: number,
    userId: number,
    setProfileListeners: any
  ) => any;

  allMyBlocks: (userId: number) => any;

  profileGetAllRelevantFollowersAndFollowedUsers: (userId: number) => any;

  addFollower: (userId: number, followerId: number) => any;
  deleteFollower: (userId: number, followerId: number) => any;

  addBlockedUser: (userId: number, followerId: number) => any;
  deleteBlockedUser: (userId: number, blockedId: number) => any;

  initNextEvent: (events: any, nextEvent: any, setNextEvent: any) => any;
  findNextEvent: (events: any) => any;

  profileEventsClick: (
    events: any,
    setEvents: any,
    selectedEvent: any,
    setSelectedEvent: any,
    nextEvent: any,
    setNextEvent: any,
    dataRowClicked: any,
    setDataRowClicked: any,
    setContentDisplayClicked: any,
    currProfile: any
  ) => any;

  doesCurrentUserPassPermissionWall: (
    currentUserId: number,
    setting: string,
    followers: any
  ) => any;

  profileListenersAddFunc: (
    profileId: number,
    userId: number,
    setProfileListeners: any
  ) => any;

  dayListenersAddFunc: (
    dayId: number,
    userId: number,
    setDayListeners: any
  ) => any;

  getPresignedDeleteURLFunc: (path: string) => any;

  submitOrUpdateEventAttendanceFunc: (
    event_id: number,
    event_name: string,
    profile_user_id: any,
    user_id: number,
    username: string,
    user_profile_icon: string | null,
    going: string,
    status: string | null,
    setUserEvents: any
  ) => any;

  getBlobFromUri: (uri: string) => any;

  dayListenersDeleteFunc: (
    dayId: number,
    userId: number,
    setDayListeners: any
  ) => any;

  searchContentAndUsersFunc: (searchTerm: string, viewerId: number) => any;

  logout: () => any;

  GETballotMediaS3Func: (
    fileType: string,
    day: any,
    setBallotsMediaBlobs: any
  ) => any;

  // have to be able to reset the day.
  refreshDayFunc: (day: any, feed: any, setFeed: any) => any;
  refreshCommentsFunc: (dayId: any, setComments: any) => any;
  refreshBallotsFunc: (
    dayId: any,
    currBallot: any,
    ballotBin: any,
    setBallotBin: any,
    setCurrVotes: any,
    setBallotOptionsLikes: any,
    setBallotOptionsStars: any
  ) => any;

  mediaCommentsFunc: (day: any, setSoundComments: any) => any;

  setFeedFaceFunc: (feedFace: string, setCurrDaySelection: any) => any;

  deleteLocation: (day_id: any, location_id: any) => any;

  addNewProposedLocationFunc: (
    nickname: string | null,
    city: string | null,
    state: string | null,
    zip_code: string | null,
    country: string | null,
    submitting_user_id: number
  ) => any;
};

const ContentFunctionDefaults: ContentFunctionTypes = {
  profileIconInitS3: (setAllUserProfileIcons: any) => {},
  returnProfileImg: (userId: number, array: any) => {},
  sendVerificationEmailSendGrid: (
    source: string,
    destination: string,
    userId: number
  ) => {},

  blobbifyAndReturnPosts: (posts: any) => {},
  getUserCredentials: () => {},
  getCurrentUserWithCurrentUserToken: (token: any) => {},
  daysGETtrendingwithMonthAndYearFunction: (month: string, year: string) => {},
  getLimitedUsersAndPrivacy: (limit: number) => {},
  getUserPrivacySettingsWithUserIdFunc: (userId: number) => {},
  seeAllThoughtsUnlockHandler: (
    thoughtsVisited: any,
    markAsVisited: any,
    day: any,
    usersPassLocks: any,
    setUsersPassLocks: any
  ) => {},

  startPlayingRecordedSound: (soundCommentFile: any) => {},

  calculateStarsAverage: (
    parentDataWithStarsId: number | null,
    eventId: number | null,
    scrollContainerId: number | null,
    scrollPos: number | null,
    starsArray: any,
    setStarState: any
  ) => {},

  submitOneThruFiveRatings: (
    day: any,
    event_id: number | null,
    postingUserThoughts: any,
    field_id: number | null,
    field_constantsee: string | null,
    postingUserId: number,
    currentUserId: number,
    currentUsername: string,
    currentUserIcon: string,
    stars: number
  ) => {},

  setCurrentUserMostRecentPostFunc: (setCurrentUserMostRecentPost: any) => {},
  notificationMaker: (
    for_user_id: number,
    notification_json_string: string
  ) => {},

  witsFieldsIndexConfirmClick: (
    day: any,
    field: any,
    fields: any,
    fieldIndex: number,
    checkIfUserAlreadyCopiedField: any,
    checkIfUserHasTooManyFields: any,
    witsFieldsIndexBackBtnClick: any,
    currentUserMostRecentPost: any,
    setCurrentUserMostRecentPost: any,
    rewritePostOrNewPost: any
  ) => {},

  likeField: (day: any, fields: any, field: string, setFieldLikes: any) => {},

  fieldsToggleCheckbox: (
    day: any,
    fields: any,
    fieldCheckboxes: any,
    fieldsBinIndex: number,
    setFieldCheckboxes: any
  ) => {},

  fieldsEyeAmClicking: (
    fields: any,
    index: number,
    setFieldsConstantseeText: any,
    setFieldsConstantseeIndex: any,
    fieldsConstantseeClick: boolean,
    setFieldsConstantseeClick: any
  ) => {},

  didUserPassThisLockAlready: (unlockType: string, usersPassLocks: any) => {},

  unlockFunc: (
    unlockType: string,
    passAllOrPassUser: string,
    day: any,
    setCurrDayUsersPassLocks: any
  ) => {},

  submitTextComment: (
    mapitemComment: any,
    mapitemCommentIndex: number | null,
    eventId: number | null,
    locationId: number | null,
    locationText: number | null,
    commentIcon: string | null,
    commenterCanDetermineCheckboxCheckpoint: any,
    setCommenterCanDetermineCheckboxCheckpoint: any,
    replyInputValue: string,
    newCommentThoughtsOk: string,
    newCommentStarrable: string,
    newCommentNonAnonymous: string,
    newCommentStarsShowAvg: boolean,
    newCommentStarsShowUsers: boolean,
    newCommentIsVideo: boolean,
    newCommentIsVoice: boolean,
    newCommentCommenterCanDetermine: boolean,
    newCommentVoiceCommentsOk: boolean,
    newCommentTextCommentsOk: boolean,
    newCommentAnonymousCommentsOk: boolean | string,
    newCommentLock: string | null,
    newCommentUnlock: string | null,

    day: any,
    setUsersPassLocks: any,
    setSoundCommentFile: any,
    setReplyInputValue: any,
    setComments: any,
    setError: any
  ) => {},

  submitSoundCommentThought: (
    mapItemComment: any | null,
    index: number | null,
    eventId: number | null,
    locationId: number | null,
    locationText: number | null,
    checkboxCheckpoint: boolean,
    setCheckboxCheckpoint: any,
    soundCommentFile: any,
    setSoundCommentFile: any,
    setReplyInputValue: any,
    // 🚨 🚨 to make this function agnostic to {days|event} {soundComments, setSoundComments} as two separate props
    soundComments: any,
    setSoundComments: any,
    newCommentThoughtsOk: string,
    newCommentStarrable: string,
    newCommentStarsShowAvg: boolean,
    newCommentStarsShowUsers: boolean,

    // voice_comment_path:string,
    non_anonymous: string,
    commenter_can_determine: boolean,
    voice_comments_ok: boolean,
    text_comments_ok: boolean,
    anonymous_comments_ok: boolean,
    i_can_unlock: boolean,
    u_can_unlock: boolean,
    lock: string | null,
    unlock: string | null,

    day: any,
    usersPassLocks: any,
    comments: any,
    setComments: any,
    setError: any
  ) => {},

  submitCommentThoughtALLpassCommentThoughtsTrueFunc: (
    day_id: number,
    thought_id: number,
    setUsersPassLocks: any,
    setError: any
  ) => {},

  updateCommentThoughtALLpassCommentThoughtsFalseFunc: (
    day_id: number,
    thought_id: number,
    setUsersPassLocks: any,
    setError: any
  ) => {},

  passCommentLockFunc: (
    comment: any,
    day: any,
    setUsersPassLocks: any,
    setError: any
  ) => {},

  startRecordingSound: (
    recorderRef: any,
    streamRef: any,
    setSoundCommentFile: any
  ) => {},

  clearRecordedSound: (setSoundCommentFile: any) => {},

  deleteComment: (
    mapitem: any,
    dayId: number,
    eventId: any,
    setComments: any
  ) => {},

  userBlocksUserFunc: (
    user_id: number | null,
    blocked_id: number,
    is_shadow_ban: boolean | null,
    feedback: string | null,
    notes: string | null
  ) => {},

  getNumberFromCommentLock: (comment: any) => {},
  commentLockTimesRatedTimesLeft: (comment: any, stars: any) => {},

  userWentWithVoteOptionHeartToggler: (
    day_id: any,
    event_id: any,
    ballotId: number,
    currentWentWithVoteUpdateStatus: boolean,
    setBallotBin: any,
    setCurrVotes: any,
    setBallotOptionsLikes: any,
    setBallotOptionsStars: any
  ) => {},

  finishVoteAndUpdateBallotFunc: (
    decision: any,
    leaderboard: any,
    voteOutcomesMsg: any,
    plainOrCustom: string,
    day: any,
    ballotBin: any,
    currBallot: any,
    setBallotBin: any,
    event: any,
    usersPassLocks: any,
    setUsersPassLocks: any,
    votes: any,
    setCurrWinningVotes: any,
    setCurrVotes: any,
    setBallotOptionsLikes: any,
    setBallotOptionsStars: any
  ) => {},

  finishJoinDayVote: (
    currBallot: any,
    setLeaderboard: any,
    setDecision: any,
    setAlmostDoneFinishingVote: any,
    ballotIsDone: any,
    day: any,
    votes: any
  ) => {},

  submitJoinDayWriteContentAndUpdateBallotFunc: (
    ballotsMediaBlobs: any,
    feed: any,
    setFeed: any,
    currBallot: any,
    // stock message for notifications
    decision: string,
    // ['winner', '2nd place of votes', '3rd place of votes', '4th place']
    leaderboard: string[] | number[] | null,
    // voteOutcomesMsg is the table.ballots.custom_decision
    voteOutcomesMsg: any,
    // local prop drilled state to go back to
    setAlmostDoneFinishingVote: any,

    day: any,
    usersPassLocks: any,
    setUsersPassLocks: any,
    currVotes: any
  ) => {},

  finishCommentVoteAndUpdateBallotFunc: (
    decision: any,
    leaderboard: any,
    voteOutcomesMsg: any,
    plainOrCustom: string,
    day: any,
    ballotBin: any,
    currBallot: any,
    setBallotBin: any,
    event: any,
    usersPassLocks: any,
    setUsersPassLocks: any,
    votes: any,
    setCurrWinningVotes: any,
    setCurrVotes: any,
    setBallotOptionsLikes: any,
    setBallotOptionsStars: any
  ) => {},

  userRatesBallotOptionFunc: (
    mapitem: any,
    voteOrProposedVote: string,
    currBallot: any,
    starClickedIndex: number,
    day: any,
    event: any,
    usersPassLocks: any,
    setUsersPassLocks: any,
    setBallotOptionsStars: any
  ) => {},

  isUserSubmittedOptionApprovedText: (mapitem: any, currBallot: any) => {},

  likeVoteOption: (
    mapitem: any,
    voteOrProposedVote: string,
    currBallot: any,
    day: any,
    event: any,
    setBallotOptionsLikes: any,
    usersPassLocks: any,
    setUsersPassLocks: any
  ) => {},

  submitUserSubmittedOption: (
    currBallot: any,
    didCurrentUserVote: any,
    // ⚠️ ⚠️ ⚠️ on media votes the userSubmittedOptionsInputValue is the mapitem.key.key (S3/cloudfront object key)
    userSubmittedOptionsInputValue: any,
    setUserSubmittedOptionsInputValue: any,
    setDidUserSubmit: any,
    day: any,
    setBallotBin: any
  ) => {},

  submitCommentVote: (
    day_id: number,
    ballot_id: number,
    user_id: number,
    username: string,
    user_profile_icon: string,
    vote_int: number,
    vote_type: string,
    vote_string: string
  ) => {},

  submitVoteUnlockChecker: (
    day: any,
    usersPassLocks: any,
    setUsersPassLocks: any
  ) => {},

  submitJoinDayVote: (
    day_id: number,
    ballot_id: number,
    user_id: number,
    username: string,
    user_profile_icon: string,
    vote_string: string | null,
    vote_type: string
  ) => {},

  submitVote: (
    day_id: number,
    ballot_id: number,
    user_id: number,
    username: string,
    user_profile_icon: string,
    vote_string: string | null,
    vote_type: string,
    non_anonymous: boolean | null,
    is_option: boolean | null
  ) => {},

  postingUserApprovesProposedVote: (
    mapitem: any,
    currBallot: any,
    dayId: any
  ) => {},

  isUserSubmittedOptionApprovedMedia: (mapitem: any, currBallot: any) => {},

  deleteVote: (ballot_id: number, vote_id: number, day_id: number) => {},

  deleteCommentVote: (
    vote_id: number,
    vote_int: number,
    vote_type: string,
    day_id: number,
    ballot_id: number,
    user_id: number
  ) => {},

  deleteUserSubmittedVoteButLeaveRecordOfSubmissionFunc: (
    mapitem: any,
    currBallot: any,
    dayId: any,
    setError: any
  ) => {},

  checkboxChangeHandler: (
    index: number,
    voteFinished: any,
    didCurrentUserVote: any,
    checkedBoxArray: any,
    setCheckedBoxArray: any
  ) => {},

  deleteCurrentUserVoteMedia: (
    currentUserVote: any,
    currBallot: any,
    myCurrentUserVote: any,
    checkedBoxArray: any,
    setCheckedBoxArray: any,
    day: any,
    currVotes: any,
    setCurrVotes: any
  ) => {},

  voteSubmitMedia: (
    currentUserVote: any,
    currBallot: any,
    day: any,
    setVotes: any
  ) => {},

  getMimeType: (filename: string) => {},

  prepareThoughtsForUpload: (
    settings: any,
    originalThoughtsBin: any,
    setPreparedThoughts: any,
    setNewThoughts: any,
    lockUpdater: any,
    unlockUpdater: any
  ) => {},

  prepareMomentsForUpload: (
    uploadMomentsBin: any,
    setPreparedMoments: any,
    setNewMoments: any,
    lockUpdater: any,
    unlockUpdater: any
  ) => {},

  prepareFieldsForUpload: (
    settings: any,
    uploadDayFields: any,
    setNewFields: any,
    lockUpdater: any,
    unlockUpdater: any
  ) => {},

  initialInitProfile: (
    userId: any,
    setCurrProfile: any,
    setCurrPrivacy: any
  ) => {},

  getAllProfileListeners: (profileId: number, setProfileListeners: any) => {},

  profileListenersDeleteFunc: (
    profileId: number,
    userId: number,
    setProfileListeners: any
  ) => {},

  allMyBlocks: (userId: number) => {},

  profileGetAllRelevantFollowersAndFollowedUsers: (userId: number) => {},

  addFollower: (userId: number, followerId: number) => {},
  deleteFollower: (userId: number, followerId: number) => {},

  addBlockedUser: (userId: number, followerId: number) => {},
  deleteBlockedUser: (userId: number, blockedId: number) => {},

  initNextEvent: (events: any, nextEvent: any, setNextEvent: any) => {},
  findNextEvent: (events: any) => {},

  profileEventsClick: (
    events: any,
    setEvents: any,
    selectedEvent: any,
    setSelectedEvent: any,
    nextEvent: any,
    setNextEvent: any,
    dataRowClicked: any,
    setDataRowClicked: any,
    setContentDisplayClicked: any,
    currProfile: any
  ) => {},

  doesCurrentUserPassPermissionWall: (
    currentUserId: number,
    setting: string,
    followers: any
  ) => {},

  profileListenersAddFunc: (
    profileId: number,
    userId: number,
    setProfileListeners: any
  ) => {},

  dayListenersAddFunc: (
    dayId: number,
    userId: number,
    setDayListeners: any
  ) => {},

  getPresignedDeleteURLFunc: (path: string) => {},

  submitOrUpdateEventAttendanceFunc: (
    event_id: number,
    event_name: string,
    profile_user_id: any,
    user_id: number,
    username: string,
    user_profile_icon: string | null,
    going: string,
    status: string | null,
    setUserEvents: any
  ) => {},

  getBlobFromUri: (uri: string) => {},

  dayListenersDeleteFunc: (
    dayId: number,
    userId: number,
    setDayListeners: any
  ) => {},

  searchContentAndUsersFunc: (searchTerm: string, viewerId: number) => {},

  logout: () => {},

  GETballotMediaS3Func: (
    fileType: string,
    day: any,
    setBallotsMediaBlobs: any
  ) => {},

  refreshDayFunc: (day: any, feed: any, setFeed: any) => {},
  refreshCommentsFunc: (dayId: any, setComments: any) => {},
  refreshBallotsFunc: (
    dayId: any,
    currBallot: any,
    ballotBin: any,
    setBallotBin: any,
    setCurrVotes: any,
    setBallotOptionsLikes: any,
    setBallotOptionsStars: any
  ) => {},

  mediaCommentsFunc: (day: any, setSoundComments: any) => {},

  setFeedFaceFunc: (feedFace: string, setCurrDaySelection: any) => {},

  deleteLocation: (day_id: any, location_id: any) => {},

  addNewProposedLocationFunc: (
    nickname: string | null,
    city: string | null,
    state: string | null,
    zip_code: string | null,
    country: string | null,
    submitting_user_id: number
  ) => {},
};

const ContentContext = createContext<ContentFunctionTypes>(
  ContentFunctionDefaults
);

export function useContentFunction() {
  return useContext(ContentContext);
}

type Props = { children: ReactNode };

export function ContentProvider({ children }: Props) {
  const dispatch = useDispatch();
  const router = useRouter();

  // const API = "https://journallapi.vercel.app/api/graphql";
  // const { API } = Constants?.easConfig.extra || 'http://localhost:4000/api/graphql';
  const predataString = API || "https://journallapi.vercel.app/api/graphql";

  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );

  const [recordingUri, setRecordingUri] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  // this is the android playing instance it's not soundCommentFile
  const [soundObj, setSoundObj] = useState<ExpoAudio.Sound | null>(null);

  const updateFeedWithNewDayData = (feedClone: any, setFeed: any, day: any) => {
    if (feedClone?.length) {
      let feedCloneDayIndex = feedClone?.findIndex(
        (days: any) => days?.id === day?.id
      );
      feedClone[feedCloneDayIndex] = day;
      setFeed(feedClone);
    }
  };

  const getBlobFileTypeFromBlobURI = (blobParam: any) => {
    const mimeMatch = blobParam.blob.match(/^data:(.*?);base64,/);
    const mimeType = mimeMatch ? mimeMatch[1] : "application/octet-stream";
    return mimeType;
  };

  // utils/mimeLookup.ts
  const getMimeType = (filename: string): string => {
    const mimeMap: Record<string, string> = {
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      mp4: "video/mp4",
      mov: "video/quicktime",
      mp3: "audio/mpeg",
      wav: "audio/wav",
      webm: "video/webm",
    };

    const ext = filename?.split(".").pop()?.toLowerCase();
    return mimeMap[ext || ""] || "application/octet-stream";
  };

  /**
   * Fetches presigned S3 upload data from your GraphQL endpoint.
   * @param {string} path - The S3 path to upload to
   * @param {string} fileType - The file type (e.g. "image/jpeg", "video/mp4")
   * @returns {Promise<any|null>} - Returns presigned data or null if it fails
   */

  const getPresignedDataFunc = async (path: string, fileType: string) => {
    try {
      // 🧩 Build the GraphQL query
      const presignedQuery = getPresignedUploadURLQueryStringFunc(
        path,
        fileType
      );
      console.log("📡 presignedQuery", presignedQuery);

      // 🪣 Request presigned URL
      const presignedPreData = await axios.post(predataString, {
        query: presignedQuery,
      });

      console.log("✅ presignedPreData", presignedPreData);

      // 🧱 Extract presigned data safely
      const presignedData =
        presignedPreData?.data?.data?.getPresignedUploadURL ?? null;

      if (!presignedData) {
        console.warn("⚠️ No presigned data returned from API");
        return null;
      }

      return presignedData;
    } catch (err: any) {
      console.error(
        "❌ Error fetching presigned upload data:",
        err.message || err
      );
      return null;
    }
  };

  const getPresignedDeleteURLFunc = async (path: string) => {
    try {
      // 🧩 Build the GraphQL query
      const presignedQuery = getPresignedDeleteURLQueryStringFunc(path);
      console.log("📡 presignedQuery", presignedQuery);

      // 🪣 Request presigned URL
      const presignedPreData = await axios.post(predataString, {
        query: presignedQuery,
      });

      console.log("✅ presignedPreData", presignedPreData);

      // 🧱 Extract presigned data safely
      const presignedData =
        presignedPreData?.data?.data?.getPresignedDeleteURL ?? null;

      if (!presignedData) {
        console.warn("⚠️ No presigned data returned from API");
        return null;
      }

      return presignedData;
    } catch (err: any) {
      console.error(
        "❌ Error fetching presigned upload data:",
        err.message || err
      );
      return null;
    }
  };

  const getUserCredentials = async () => {
    try {
      if (Platform.OS === "web") {
        const userId = await localStorage.getItem("userId");
        const userToken = await localStorage.getItem("userToken");
        return { userId, userToken };
      } else {
        const userId = await SecureStore.getItemAsync("userId");
        const userToken = await SecureStore.getItemAsync("userToken");
        // SET_CURRENT_USER:
        return { userId, userToken };
      }
    } catch (error) {
      console.error("Error retrieving user credentials", error);
      return null;
    }
  };

  const getCurrentUserWithCurrentUserToken = async (token: any) => {
    // function getCurrentUserWithCurrentUserToken(token: cookieTokenINTERFACE) {
    console.log("token content functions", token);
    if (!token?.userId) {
      return null;
    }

    const getUserWithIdQuery = getUserWithIdQueryStringFunc(token?.userId);
    // const getUserWithIdQuery = getUserWithIdQueryStringFunc(token?.id)
    const predata: any = await axios.post(predataString, {
      query: getUserWithIdQuery,
    });
    // const predata: any = await axios.post('http://localhost:4000/api/graphql', { query: getUserWithIdQuery })
    if (!predata) {
      return null;
    }

    const userAndPrivacy = predata?.data?.data?.getUserWithId;
    if (!userAndPrivacy) {
      console.log("somehow were in here");
      return null;
    }
    const parsedUser = JSON.parse(userAndPrivacy);
    dispatch(SET_CURRENT_USER(parsedUser));
    return parsedUser;
  };

  const returnProfileImg = (userId: number, array: any) => {
    // console.log('profile icon array', array);
    if (array?.length === 0) {
      return HeartIcon;
    }
    const foundIcon = array?.find((icon: any) => {
      return icon?.id === userId;
    });
    if (foundIcon) {
      return foundIcon?.icon;
    } else {
      return HeartIcon;
    }
  };

  const profileIconInitS3 = async (setAllUserProfileIcons: any) => {
    try {
      // Get all object keys in the folder

      const query = getObjKeysFromFolderS3QueryStringFunc(
        "icons/profile_icons/"
      );

      const predata: any = await axios.post(predataString, { query: query });
      console.log("profile icon predata", predata);
      if (!predata) {
        return null;
      }

      let data = predata?.data?.data?.getObjKeysFromFolderS3;
      const parsedData = JSON.parse(data);

      if (!parsedData || !Array.isArray(parsedData)) {
        return null;
      }
      const allIcons = await Promise.all(
        parsedData?.map(async (iconFromS3: any) => {
          try {
            const userIdReplaceString = iconFromS3?.key?.replace(/[^0-9]/g, "");
            const userId = parseInt(userIdReplaceString);
            const url = iconFromS3?.url;
            const obj = { id: userId, icon: url };

            return obj;
          } catch (err) {
            console.error(`Error fetching blob for blob: ${iconFromS3}`, err);
            return null; // Handle failures gracefully
          }
        })
      );

      const validIcons = allIcons?.filter(
        (iconObj: any) => iconObj?.userId !== null
      );
      setAllUserProfileIcons(validIcons);
      return validIcons;
    } catch (error) {
      console.log("error", error);
      return "error";
    }
  };

  const sendVerificationEmailSendGrid = async (
    source: string,
    destination: string,
    userId: number
  ) => {
    console.log("destination", destination);
    console.log("userId", userId);

    const query = sendVerificationEmailSendGridQueryStringFunc(
      destination,
      userId
    );

    const predata: any = await axios.post(predataString, { query: query });
    const data: any = predata?.data?.data?.sendVerificationEmailSendGrid;
    if (!data) {
      return null;
    }
    // void function: just send the email.
    console.log("emaildata", data);
  };

  const sendMobileTestLinkSendgridAndroidFunc = async (
    destination: string,
    userId: number
  ) => {
    console.log("destination", destination);
    console.log("userId", userId);

    const query = sendMobileTestLinkSendgridAndroidQueryStringFunc(
      destination,
      userId
    );

    const predata: any = await axios.post(predataString, { query: query });
    const data: any = predata?.data?.data?.sendMobileTestLinkSendgridAndroid;
    if (!data) {
      return null;
    }
    // void function: just send the email.
    console.log("emaildata", data);
  };

  const sendMobileTestLinkSendgridAppleFunc = async (
    destination: string,
    userId: number
  ) => {
    console.log("destination", destination);
    console.log("userId", userId);

    const query = sendMobileTestLinkSendgridAppleQueryStringFunc(
      destination,
      userId
    );

    const predata: any = await axios.post(predataString, { query: query });
    const data: any = predata?.data?.data?.sendMobileTestLinkSendgridApple;
    if (!data) {
      return null;
    }
    // void function: just send the email.
    console.log("emaildata", data);
  };

  const getAllMyFollowers = async (userId: number) => {
    const query = allMyFollowersQueryStringFunc(userId);
    const predata: any = await axios.post(predataString, { query: query });
    // const predata: any = await axios.post("http://localhost:4000/api/graphql", { query: query })
    if (!predata) {
      return null;
    }
    let data = predata?.data?.data?.allMyFollowersGET;
    if (!data) {
      return null;
    }
    return data;
  };

  const getAllMyFollowedUsers = async (userId: number) => {
    const query = allMyFollowedUsersQueryStringFunc(userId);

    const predataString = API || "http://localhost:4000/api/graphql";
    const predata: any = await axios.post(predataString, { query: query });
    // const predata: any = await axios.post("http://localhost:4000/api/graphql", { query: query })
    if (!predata) {
      return null;
    }
    let data = predata?.data?.data?.allMyFollowedUsersGET;
    if (!data) {
      return null;
    }
    return data;
  };

  const getAllMyBlocks = async (userId: number) => {
    const query = allMyBlocksQueryStringFunc(userId);
    const predata: any = await axios.post(predataString, { query: query });
    // const predata: any = await axios.post("http://localhost:4000/api/graphql", { query: query })
    if (!predata) {
      return null;
    }
    let data = predata?.data?.data?.allMyBlocksGET;
    if (!data) {
      return null;
    }
    return data;
  };

  const getAllMyTheyBlockedMeUsers = async (userId: number) => {
    const query = allMyBlocksQueryStringFunc(userId);

    const predata: any = await axios.post(predataString, { query: query });
    // const predata: any = await axios.post("http://localhost:4000/api/graphql", { query: query })
    if (!predata) {
      return null;
    }
    let data = predata?.data?.data?.allMyTheyBlockedMeUsers;
    if (!data) {
      return null;
    }
    return data;
  };

  const fetchMoments = async (dayId: number, moments: any) => {
    let momentsObj: {
      id: number | null;
      media_tags_array: string[] | null;
      titles_array: string[] | null;
      captions_array: string[] | null;
      moment_is_vote_array: boolean[] | null;
      part_of_post_icon_array: string[] | null;
      on_profile_array: boolean[] | null;
      lock: string | null;
      unlock: string | null;
      BLOBs: any[] | null;
      timestamp: string | null;
    } = {
      id: moments?.id,
      media_tags_array: moments?.media_tags_array
        ? [...moments.media_tags_array]
        : null,
      titles_array: moments?.titles_array ? [...moments.titles_array] : null,
      captions_array: moments?.captions_array
        ? [...moments.captions_array]
        : null,
      moment_is_vote_array: moments?.moment_is_vote_array
        ? [...moments.moment_is_vote_array]
        : null,
      part_of_post_icon_array: moments?.part_of_post_icon_array
        ? [...moments.part_of_post_icon_array]
        : null,
      on_profile_array: moments?.on_profile_array
        ? [...moments.on_profile_array]
        : null,
      lock: moments?.lock || null,
      unlock: moments?.unlock || null,
      BLOBs: null,
      timestamp: moments?.timestamp || null,
    };

    try {
      const dayMomentsStringS3 = `media/day-${dayId}-folder/moments/`;

      const query = getObjKeysFromFolderS3QueryStringFunc(dayMomentsStringS3);

      const predata: any = await axios.post(
        API,
        // "https://journallapi.vercel.app/api/graphql",
        {
          query: query,
        }
      );
      if (!predata) {
        return null;
      }

      console.log("predata", predata);
      let data = predata?.data?.data?.getObjKeysFromFolderS3;
      const momentsKeysBLOBS = JSON.parse(data);
      console.log("momentsKeysBLOBS", momentsKeysBLOBS);

      if (!momentsKeysBLOBS) {
        return null;
      }

      const actualBlobs = momentsKeysBLOBS?.map((b: any) => b?.url);
      momentsObj.BLOBs = actualBlobs;
      // setMoments(momentsObj);
      return momentsObj;
    } catch (error) {
      console.error("Error fetching moments:", error);
      return null;
    }
  };

  const checkSoundThoughts = async (dayId: number) => {
    const dayThoughtsStringS3 = `media/day-${dayId}-folder/thoughts/`;

    const query = getObjKeysFromFolderS3QueryStringFunc(dayThoughtsStringS3);

    const predata: any = await axios.post(
      API,
      // "https://journallapi.vercel.app/api/graphql",
      {
        query: query,
      }
    );
    if (!predata) {
      return null;
    }

    console.log("predata soundComments", predata);
    let data = predata?.data?.data?.getObjKeysFromFolderS3;
    const S3thoughtsKeysBLOBS = JSON.parse(data);

    if (!S3thoughtsKeysBLOBS || S3thoughtsKeysBLOBS === "error") {
      return null;
    }

    const S3promiseBLOB = await S3thoughtsKeysBLOBS?.map(
      async (S3media: any) => {
        return {
          key: { key: S3media?.key },
          blob: S3media?.url,
        };
      }
    );
    const blobPromise = await Promise.all(S3promiseBLOB);
    return blobPromise;
  };

  const canCurrentUserSeeContent = async (
    content: any,
    allMyFollowers: any,
    allMyFollowedUsers: any,
    allMyBlocks: any,
    allMyTheyBlockedMe: any
  ) => {
    const doesCurrentUserFollowPoster = allMyFollowers?.some(
      (followers: any) =>
        followers?.user_id === content?.user_id &&
        followers?.follower_id === CURRENT_USER?.id
    );
    const doesPosterFollowCurrentUser = allMyFollowedUsers?.some(
      (followers: any) =>
        followers?.user_id === CURRENT_USER?.id &&
        followers?.follower_id === content?.user_id
    );

    const doesPosterBlockMe = allMyBlocks?.some(
      (blocks: any) =>
        blocks?.user_id === content?.user_id &&
        blocks?.blocked_id === CURRENT_USER?.id
    );
    const isPostingUserBlockedByMe = allMyTheyBlockedMe?.some(
      (blocks: any) =>
        blocks?.user_id === CURRENT_USER?.id &&
        blocks?.blocked_id === content?.user_id
    );

    const nonAnonymous = content?.non_anonymous;

    let meSeeContent: boolean = true;

    if (nonAnonymous === "private") {
      meSeeContent = false;
    }
    if (nonAnonymous === "yes") {
      meSeeContent = true;
    }
    if (nonAnonymous === "no") {
      meSeeContent = false;
    }
    if (nonAnonymous === "followers") {
      meSeeContent = doesCurrentUserFollowPoster;
    }
    if (nonAnonymous === "followed users") {
      meSeeContent = doesPosterFollowCurrentUser;
    }

    if (nonAnonymous === "f_f") {
      meSeeContent = doesPosterFollowCurrentUser || doesCurrentUserFollowPoster;
    }

    let canCurrentUserSeeContent = {
      ifollowThem: doesCurrentUserFollowPoster,
      theyFollowMe: doesPosterFollowCurrentUser,
      theyBlockMe: doesPosterBlockMe,
      iBlockMe: isPostingUserBlockedByMe,
      meSeeContent: meSeeContent,
    };
    return canCurrentUserSeeContent;
  };

  const blobbifyAndReturnPosts = async (posts: any) => {
    if (!posts) {
      return null;
    }

    const blobbedPosts = await Promise.all(
      posts?.map(async (post: any) => {
        const clone = {
          ...post,
          thoughts: [...(post?.thoughts || [])],
          moments: { ...(post?.moments || []) },
        };

        if (post?.moments) {
          if (post?.id && post?.moments) {
            console.log("post?.moments", post?.moments);

            if (post?.moments?.BLOBs?.length > 1) {
              console.log("really guys?");
              // retrieved!
            } else {
              console.log("come on bro lol");
              try {
                const moments: any =
                  (await fetchMoments(post?.id, post?.moments)) || [];
                console.log("moments", moments);
                if (moments?.id) {
                  clone.moments = moments;
                }
              } catch (error) {
                console.log("error yuherd", error);
              }
            }
          }
        }

        if (post?.id && post?.userpasslocks) {
          // dispatch(SET_CURR_DAY_USERS_PASS_LOCKS(post?.userpasslocks));
        }

        if (post?.id && post?.userallowedtounlock) {
          //   dispatch(SET_CURR_DAY_USERS_ALLOWED_TO_UNLOCK(post?.userallowedtounlock));
        }

        if (post?.id && post?.thoughts) {
          let postingUserThoughts = post?.thoughts?.filter(
            (thoughts: any) => thoughts?.thoughts?.length
          );
          if (!postingUserThoughts) {
          }
          postingUserThoughts = postingUserThoughts[0];

          const doThoughtsHaveDelimiterDashes =
            postingUserThoughts?.thoughts?.some((thoughts: any) => {
              return thoughts?.includes("-");
            });

          if (
            doThoughtsHaveDelimiterDashes &&
            !post?.thoughts?.soundthoughts?.length
          ) {
            const BLOBS = (await checkSoundThoughts(post?.id)) || null;
            console.log("BLOBS", BLOBS);
            if (BLOBS) {
              let thoughts = [...(clone?.thoughts || [])];
              let findPostingUserThoughts = {
                ...thoughts?.find((thoughts) => thoughts?.thoughts?.length),
              };
              let postingUserThoughtsIndex = thoughts?.findIndex(
                (thoughts) => thoughts?.thoughts?.length
              );
              thoughts[postingUserThoughtsIndex] = findPostingUserThoughts;

              if (findPostingUserThoughts) {
                findPostingUserThoughts.soundthoughts = BLOBS;
                clone.thoughts = thoughts;
              }
            }
          }
        }

        const allMyFollowers = await getAllMyFollowers(post?.user_id);
        const allMyFollowedUsers = await getAllMyFollowedUsers(post?.user_id);

        const allMyBlocks = (await getAllMyBlocks(post?.user_id)) || [];
        const allMyTheyBlockedMe =
          (await getAllMyTheyBlockedMeUsers(post?.user_id)) || [];

        const seeContent = await canCurrentUserSeeContent(
          post,
          allMyFollowers,
          allMyFollowedUsers,
          allMyBlocks,
          allMyTheyBlockedMe
        );

        clone.followers = [...allMyFollowers, ...allMyFollowedUsers];
        clone.blocks = [...allMyBlocks, ...allMyTheyBlockedMe];

        clone.canCurrentUserSeeContent = seeContent;

        console.log("clone down here", clone);
        return clone;
      })
    );
    return blobbedPosts;
  };

  const daysGETtrendingwithMonthAndYearFunction = async (
    month: string,
    year: string
  ) => {
    const query = daysGETtrendingWithMonthAndYearQueryStringFunc(month, year);

    const predataString = API || "http://localhost:4000/api/graphql";
    let predata: any = await axios.post(predataString, { query: query });
    // let predata: any = await axios.post("http://localhost:4000/api/graphql", { query: query })
    // let predata: any = await AllOursRequestDATA(query, {}, CURRENT_USER_TOKEN)
    // console.log('predata getAllDays', predata);
    let data = predata?.data?.data?.daysGETtrendingWithMonthAndYear;
    data = JSON.parse(data);
    if (!predata || !data) {
      return null;
    }

    return data;
  };

  const getLimitedUsersAndPrivacy = async (limit: number) => {
    const query = getLimitedUsersAndPrivacyQueryStringFunc(
      limit,
      CURRENT_USER?.id
    );
    const predata: any = await axios.post(predataString, { query: query });
    console.log("query", query);

    // console.log('predata privacyUsers', predata);
    const data: any = predata?.data?.data?.getLimitedUsersAndPrivacy;
    // console.log('data', data);

    if (!predata || !data) {
      return null;
    }

    const parsedUsers = JSON.parse(data);

    // console.log('parsedUsers', parsedUsers);

    dispatch(SET_ALL_USERS(parsedUsers));
    return parsedUsers;
  };

  const getUserPrivacySettingsWithUserIdFunc = async (userId: number) => {
    const query = getUserPrivacySettingsWithUserIdQueryStringFunc(userId);

    const predata = await axios.post(predataString, { query });
    // const predata = await axios.post("http://localhost:4000/api/graphql", { query });

    // console.log('FULL API RESPONSE:', predata);

    const data = predata?.data?.data?.getUserPrivacySettingsWithUserId;
    if (!data) return;
  };

  const didUserPassThisLockAlready = (
    unlockType: string,
    usersPassLocks: any
  ) => {
    const userPassed = usersPassLocks?.some(
      (locks: any) =>
        locks?.user_id === CURRENT_USER?.id && locks?.unlock_type === unlockType
    );
    // const userPassed = CURR_DAY_USERS_PASS_LOCKS.some(locks => locks?.user_id === CURRENT_USER?.id && locks?.unlock_type === unlockType)
    // true means they passed lock so don't proceed with updating DB with a duplicate lock. true is restrictive, not permissive.
    return userPassed;
  };

  const doesPostPassThisLockAlready = (
    unlockType: string,
    day: any,
    usersPassLocks: any
  ) => {
    const passHasLocks = usersPassLocks?.some(
      (locks: any) =>
        locks?.unlock_type === unlockType && locks?.day_id === day?.id
    );
    return passHasLocks;
  };

  const submitAnyLockForPostFunc = async (
    day_id: number,
    user_id: number | null | undefined,
    //  unlock_type as in CURR_DAY?.unlock === "see all thoughts" so unlock_type = "see all thoughts"
    unlock_type: string,
    pass_post: boolean | null | undefined,
    pass_post_all: boolean | null | undefined,
    pass_thoughts: boolean | null | undefined,
    pass_thoughts_all: boolean | null | undefined,
    pass_moments: boolean | null | undefined,
    pass_moments_all: boolean | null | undefined,
    pass_fields: boolean | null | undefined,
    pass_fields_all: boolean | null | undefined,
    pass_greatfull: boolean | null | undefined,
    pass_greatfull_all: boolean | null | undefined,
    pass_ballot: boolean | null | undefined,
    pass_ballot_all: boolean | null | undefined,

    setUsersPassLocks: any
  ) => {
    const query = submitAnyPassLockForPostQueryStringFunc(
      day_id,
      user_id,
      unlock_type,
      pass_post,
      pass_post_all,
      pass_thoughts,
      pass_thoughts_all,
      pass_moments,
      pass_moments_all,
      pass_fields,
      pass_fields_all,
      pass_greatfull,
      pass_greatfull_all,
      pass_ballot,
      pass_ballot_all
    );

    const predata: any = await axios.post(predataString, { query: query });
    if (!predata) {
      return null;
    }
    const data = predata?.data?.data?.submitAnyPassLockForPost;
    if (!data) {
      return null;
    }
    setUsersPassLocks(data);
    return data;
  };

  const unlockFunc = (
    unlockType: string,
    passAllOrPassUser: string,
    day: any,
    setCurrDayUsersPassLocks: any
  ) => {
    const thoughts = day?.thoughts || null;
    const moments = day?.moments || null;
    const fields = day?.fields || null;
    const greatfull = day?.greatfullagain || null;
    const postingUserThoughts = Array.isArray(thoughts)
      ? thoughts?.find((thoughts) => thoughts?.thoughts?.length)
      : [];
    const ballotBin = (Array.isArray(day?.ballots) && day?.ballots) || null;
    let doAnyBallotsApplyToLock: any;

    if (passAllOrPassUser === "pass user") {
      // pass user is (i.e): t.userpasslocks.pass_post || pass_thoughts. goes by user unlike: pass_post_all | pass_thoughts_all
      // if user has to "see all thoughts" then only users that see all thoughts pass.
      const pass_post =
        day?.unlock === unlockType || day?.unlock?.includes(unlockType)
          ? true
          : false;
      const pass_thoughts =
        postingUserThoughts?.unlock === unlockType ||
        postingUserThoughts?.unlock?.includes(unlockType)
          ? true
          : false;
      const pass_moments =
        moments?.unlock === unlockType || moments?.unlock?.includes(unlockType)
          ? true
          : false;
      const pass_fields =
        fields?.unlock === unlockType || fields?.unlock?.includes(unlockType)
          ? true
          : false;
      const pass_greatfull =
        greatfull?.unlock === unlockType ||
        greatfull?.unlock?.includes(unlockType)
          ? true
          : false;

      if (ballotBin !== null) {
        doAnyBallotsApplyToLock =
          ballotBin?.some(
            (ballots: any) => ballots?.unlock === "commentIcon"
          ) || null;
        // doAnyBallotsApplyToLock = ballotBin?.some(ballots => ballots?.unlock === "commentIcon") || null;
      }

      // booleans. doesn't save for id the unlock doesn't care what the ID is there would only be 1 lock per topic
      submitAnyLockForPostFunc(
        day?.id,
        CURRENT_USER?.id,
        unlockType,
        pass_post,
        false,
        pass_thoughts,
        false,
        pass_moments,
        false,
        pass_fields,
        false,
        pass_greatfull,
        false,
        doAnyBallotsApplyToLock ? true : false,
        false,
        setCurrDayUsersPassLocks
      );

      // if lock is "20 comments" then by the 20th comment 21st user could've not commented and seen the unlocked content. "pass all"
    } else if (passAllOrPassUser === "pass all") {
      // has to be includes too.
      const pass_post_all =
        day?.unlock === unlockType || day?.unlock?.includes(unlockType)
          ? true
          : false;
      const pass_thoughts_all =
        postingUserThoughts?.unlock === unlockType ||
        postingUserThoughts?.unlock?.includes(unlockType)
          ? true
          : false;
      const pass_moments_all =
        moments?.unlock === unlockType || moments?.unlock?.includes(unlockType)
          ? true
          : false;
      const pass_fields_all =
        fields?.unlock === unlockType || fields?.unlock?.includes(unlockType)
          ? true
          : false;
      const pass_greatfull_all =
        greatfull?.unlock === unlockType ||
        greatfull?.unlock?.includes(unlockType)
          ? true
          : false;

      if (ballotBin !== null) {
        doAnyBallotsApplyToLock =
          ballotBin?.some(
            (ballots: any) => ballots?.unlock === "commentIcon"
          ) || null;
        // doAnyBallotsApplyToLock = ballotBin?.some(ballots => ballots?.unlock === "commentIcon") || null;
      }

      submitAnyLockForPostFunc(
        day?.id,
        CURRENT_USER?.id,
        unlockType,
        false,
        pass_post_all,
        false,
        pass_thoughts_all,
        false,
        pass_moments_all,
        false,
        pass_fields_all,
        false,
        pass_greatfull_all,
        false,
        doAnyBallotsApplyToLock ? true : false,
        setCurrDayUsersPassLocks
      );
    }
  };

  const seeAllThoughtsUnlockHandler = (
    thoughtsVisited: any,
    markAsVisited: any,
    day: any,
    usersPassLocks: any,
    setUsersPassLocks: any
  ) => {
    const thoughts = day?.thoughts;
    const moments = day?.moments;
    const fields = day?.fields;
    const greatfull = day?.greatfullagain;
    const postingUserThoughts = thoughts?.find(
      (thoughts: any) => thoughts?.thoughts?.length
    );
    const ballotBin = (Array.isArray(day?.ballots) && day?.ballots) || null;

    let doAnyBallotsApplyToLock;
    if (ballotBin !== null) {
      doAnyBallotsApplyToLock =
        ballotBin.some(
          (ballots: any) => ballots?.unlock === "see all thoughts"
        ) || null;
    }

    // if no below locks apply then the thoughtsVisited feature is irrelevant. dont execute.
    if (
      day?.unlock === "see all thoughts" ||
      (Array.isArray(thoughts) &&
        postingUserThoughts?.unlock === "see all thoughts") ||
      moments?.unlock === "see all thoughts" ||
      fields?.unlock === "see all thoughts" ||
      greatfull?.unlock === "see all thoughts" ||
      doAnyBallotsApplyToLock
    ) {
      // there are unlocks that depend upon "see all thoughts" so unlock if the user saw all the thoughts.
      // thx chat new method. .every() checks if the condition returns true.
      const allSeen = thoughtsVisited?.every((thought: any) => thought?.seen);
      // if every content has been seen then express markAsVisited and check index and set true if false.
      if (!allSeen) {
        markAsVisited(thoughtsVisited);
      }
      // const didUserPassThisLockAlready = CURR_DAY_USERS_PASS_LOCKS.some(locks => locks?.user_id === CURRENT_USER?.id && locks?.unlock_type === "see all thoughts")

      // if hasUserSeenAllThoughts = true then user passed lock don't proceed with passing them again.
      const hasUserSeenAllThoughts = didUserPassThisLockAlready(
        "see all thoughts",
        usersPassLocks
      );

      console.log("allSeen", allSeen);
      console.log("hasUserSeenAllThoughts", hasUserSeenAllThoughts);

      if (allSeen && !hasUserSeenAllThoughts) {
        console.log("do we never run this block though");
        // run function block
        unlockFunc("see all thoughts", "pass user", day, setUsersPassLocks);
      }
      if (allSeen && hasUserSeenAllThoughts) {
        return;
      }
    } else {
      return;
    }
  };

  const startPlayingRecordedSound = async (soundCommentFile: any) => {
    console.log("soundCommentFile", soundCommentFile);
    try {
      if (Platform.OS === "web") {
        if (!soundCommentFile) {
          console.warn("No recording Blob available");
          return;
        }

        // Create a temporary URL and play it
        let playableUrl: string;

        if (typeof soundCommentFile === "string") {
          // already a remote URL
          playableUrl = soundCommentFile;
        } else {
          // local Blob (still works for mobile web recording)
          playableUrl = URL.createObjectURL(soundCommentFile);
        }

        const audioEl = new Audio(playableUrl);
        audioEl.play();

        // Optional: cleanup when finished
        audioEl.onended = () => {
          URL.revokeObjectURL(playableUrl);
          setIsPlaying(false);
        };

        setIsPlaying(true);
        return;
      }

      // 🧱 native branch (works as before)
      if (!recordingUri && !soundCommentFile) {
        console.warn("No recording to play");
        return;
      }

      if (soundObj) {
        await soundObj.stopAsync();
        await soundObj.unloadAsync();
        setSoundObj(null);
        setIsPlaying(false);
        return;
      }

      console.log("🎧 playing audio from:", recordingUri);
      const { sound } = await ExpoAudio.Sound.createAsync(
        { uri: recordingUri || soundCommentFile },
        { shouldPlay: true }
      );

      setSoundObj(sound);
      setIsPlaying(true);

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && !status.isPlaying && status.didJustFinish) {
          sound.unloadAsync();
          setSoundObj(null);
          setIsPlaying(false);
        }
      });
    } catch (error) {
      console.error("Error playing sound:", error);
      setIsPlaying(false);
    }
  };

  const submitOneThruFiveRatings = async (
    day: any,
    event_id: number | null,
    postingUserThoughts: any,
    field_id: number | null,
    field_constantsee: string | null,
    postingUserId: number,
    currentUserId: number,
    currentUsername: string,
    currentUserIcon: string,
    stars: number
  ) => {
    if (stars === 0) {
      return;
    }

    const query = submitOneThruFiveStarsQueryStringFunc(
      // 🚨 🚨 CURRENT_USER!
      day?.id,
      null,
      day?.user_id,
      3,
      "puregold",
      "journall-user-3",
      postingUserThoughts?.id || null,
      field_id || null,
      field_constantsee || null,
      null,
      null,
      stars
    );

    try {
      const predata: any = await axios.post(predataString, {
        query: query,
      });
      // const predata = await axios.post('http://localhost:4000/api/graphql', { query: query })
      if (!predata) {
        return null;
      }
      const data = predata?.data?.data?.submitOneThruFiveStars;
      if (!data) {
        return null;
      }
      return data;
    } catch (error) {
      console.log("error", error);
      // console.throw(error);
      return "error";
    }
  };

  const calculateStarsAverage = (
    parentDataWithStarsId: number | null,
    eventId: number | null,
    scrollContainerId: number | null,
    scrollPos: number | null,
    starsArray: any,
    setStarState: any
  ) => {
    // const postingUserThoughtsCalculateStarsAverage = (dayId: number | null, eventId: number | null, scrollContainerId: number | null, scrollPos: number | null, starsArray: any, setStarState: any) => {
    let totalStars: number = 0;
    console.log("starsArray", starsArray);
    const stars = starsArray?.filter(
      (stars: any) =>
        stars?.thought_id === parentDataWithStarsId ||
        stars?.thought_id === eventId
    );

    const starsNumbs = stars?.map((stars: any) => stars?.stars);

    if (!starsNumbs) {
      // setError(true);
      return;
    }

    // increment and get the total of stars berfore dividing
    starsNumbs?.forEach((starRating: number) => (totalStars += starRating));

    // divide: (total from incrementing) / (number of star submissions)
    const average = totalStars / stars?.length;
    setStarState(average);
    return average;
  };

  const setCurrentUserMostRecentPostFunc = async (
    setCurrentUserMostRecentPost: any
  ) => {
    const query = getMostRecentDayPostWithUserIdQueryStringFunc(
      CURRENT_USER?.id
    );

    return axios
      .post(predataString, {
        query: query,
      })
      .then((data: any) => {
        if (!data?.data?.data?.getMostRecentDayPostWithUserId) {
          return null;
        }
        data = JSON.parse(data?.data?.data?.getMostRecentDayPostWithUserId);
        console.log("WitsFields.tsx: data", data);
        if (!data) {
          return null;
        }
        setCurrentUserMostRecentPost(data);
        // dispatch(SET_CURRENT_USER_MOST_RECENT_POST(data));
        return data;
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const notificationMaker = async (
    for_user_id: number,
    notification_json_string: string // JSON.string() of the below object to avoid caching issue:
  ) => {
    console.log("firing notificationmaker");

    const query = `mutation {
            submitNotification (
              for_user_id: ${for_user_id},
              notification_json_string: "${notification_json_string.replace(
                /"/g,
                '\\"'
              )}"
            ) {              
              from_user_id, for_user_id, is_read, notification_json_string
            }      
          }
          `;

    let predata: any = await axios.post(API, { query: query });
    const data = predata?.data?.data?.submitNotificationMaker;
    if (!data) {
      return null;
    }
  };

  const witsFieldsIndexConfirmClick = async (
    day: any,
    field: any,
    fields: any,
    fieldIndex: number,
    checkIfUserAlreadyCopiedField: any,
    checkIfUserHasTooManyFields: any,
    witsFieldsIndexBackBtnClick: any,
    currentUserMostRecentPost: any,
    setCurrentUserMostRecentPost: any,
    rewritePostOrNewPost: any
  ) => {
    // check if the user already copied the fields regardless of whether they are attempting to use the activity for new/old post.
    const checkIfCopied = checkIfUserAlreadyCopiedField();
    console.log("checkIfCopied", checkIfCopied);
    const checkIfTooMany = checkIfUserHasTooManyFields();
    console.log("checkIfTooMany", checkIfTooMany);
    if (checkIfCopied || checkIfTooMany) {
      return;
    }

    const witsFieldsNotificationObject = {
      from_user_id: CURRENT_USER?.id || null,
      from_username: CURRENT_USER?.username || null,
      for_user_id: day?.user_id || null,
      from_app: false,
      day_id: day?.id, // for example sake so we only return notes for current post.
      day_icon: day?.day_icon || null,
      thought_id: null,
      moment_id: null,
      field_id: fields?.id,
      invite_id: null,
      listener_id: null,
      share_Id: null,
      like_id: null,
      star_id: null,
      reaction_id: null,
      vibe_id: null,
      payment_id: null,
      prank_id: null,
      feedgame_id: null,
      message_id: null,
      report_id: null,
      user_pass_lock_id: null,
      user_allowed_to_unlock_id: null,
      ballot_id: null,
      // custom_notification: customNotificationMsg?.length > 1 ? customNotificationMsg : null,
      is_read: false,
      is_request: false,
      type: "user copied your witsfields",
    };
    console.log("witsFieldsNotificationObject", witsFieldsNotificationObject);

    const newFieldsObj = {
      // id: no id. creates field with new id
      // day_id   only if rewriting a post.
      id: null,
      user_id: CURRENT_USER?.id,
      // constantsee: this should be the fun of constantsee. copying user can copy but not by defaults. constantsee opens up brain to see what associations does person draw with an activity: diving: taking breaths or breath taking?
      fields: [`${field}`],
      text: "", // text: fields?.text[index] || undefined,
      dream: fields?.dream || undefined,
      likeable: fields?.likeable || undefined,
      thoughts_ok: fields?.thoughts_ok || undefined,
      wits_ok: fields?.wits_ok || undefined, // might have to check users privacy settings
      wits_username: day?.username, // also point of fields to respect "open-sourcery" and to give credit to magic contributor who inspired the copied fields.
      checkbox: [false], // the user is doing the field or not so it wouldn't start checked that's the fun of copying the fields go check the box! also should send notification to user who made the posts. tell them their copiers did it!
      users_checkboxes:
        Array.isArray(fields?.users_checkboxes) &&
        fields?.users_checkboxes[fieldIndex], // users_checkboxes: fields?.users_checkboxes[index] || undefined,
      constantsee: [""],
    };

    if (rewritePostOrNewPost === "keepAdding") {
      const copyFields = [
        `${field}`,
        ...(currentUserMostRecentPost?.fields?.fields ?? []),
      ];
      const copyText = [
        fields?.text[fieldIndex] ?? [],
        ...(currentUserMostRecentPost?.fields?.text ?? []),
      ];
      const copyConstantsee = [
        `${fields?.constantsee[fieldIndex] ?? []}`,
        ...(currentUserMostRecentPost?.fields?.constantsee ?? []),
      ];
      const copyCheckbox = [
        fields?.checkbox[fieldIndex] ?? [],
        ...(currentUserMostRecentPost?.fields?.checkbox ?? []),
      ];
      const copyUsersCheckbox = [
        fields?.users_checkboxes[fieldIndex] ?? [],
        ...(currentUserMostRecentPost?.fields?.users_checkboxes ?? []),
      ];

      const copyFieldsObj = {
        id: currentUserMostRecentPost?.id,
        user_id: CURRENT_USER?.id,
        // constantsee: this should be the fun of constantsee. copying user can copy but not by defaults. constantsee opens up brain to see what associations does person draw with an activity: diving: taking breaths or breath taking?
        fields: JSON.stringify(copyFields).replace(/"/g, '\\"'),
        text: JSON.stringify(copyText).replace(/"/g, '\\"'),
        dream: fields?.dream || null,
        likeable: fields?.likeable || true,
        thoughts_ok: fields?.thoughts_ok || true,
        wits_ok: fields?.wits_ok || true, // might have to check users privacy settings
        wits_username: day?.username, // also point of fields to respect "open-sourcery" and to give credit to magic contributor who inspired the copied fields.

        constantsee: copyConstantsee,
        checkbox: copyCheckbox, // the user is doing the field or not so it wouldn't start checked that's the fun of copying the fields go check the box! also should send notification to user who made the posts. tell them their copiers did it!
        users_checkboxes: copyUsersCheckbox,
        // constantsee: copyUsersCheckbox
      };
      console.log("copyFieldsObj", copyFieldsObj);
      console.log("newFieldsObj", newFieldsObj);
      // JSON.stringify(leaderboard).replace(/"/g, '\\"')

      // return;

      const query = await copyFieldsOntoNewFieldsQueryStringFunc(
        // * * * * * * * copyFieldsObj the fields.fields comes back as one string which we only want for constantsee!!!!!! 15 minutes!
        //              leaderboard.json() handles the same way.. LAYNE & AMANDA

        JSON.stringify(copyFieldsObj),
        copyFieldsObj?.fields,
        copyFieldsObj?.text,
        copyFieldsObj?.constantsee,
        copyFieldsObj?.checkbox,
        copyFieldsObj?.users_checkboxes,
        day,
        currentUserMostRecentPost?.fields?.id,
        currentUserMostRecentPost?.id,
        null,
        CURRENT_USER?.id,
        day?.id,
        day?.username
      );
      axios
        .post(predataString, { query: query })
        .then(async (predata) => {
          console.log("predata", predata);
          let data = predata?.data?.data?.copyFieldsOntoNewFields;
          data = JSON.parse(data);
          console.log("data", data);
          if (!data) {
            return;
          }

          // locks 🔒 🔒 🔒
          // passWitsFieldsUnlock();

          // set state to activities which are referenced in CURR_USER_RECENT_POST can know if user duplicating copied activities.
          dispatch(SET_CURRENT_USER_MOST_RECENT_POST(data));

          await notificationMaker(
            day?.user_id,
            JSON.stringify(witsFieldsNotificationObject)
          );

          witsFieldsIndexBackBtnClick();
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
    return null;
  };

  const likeField = async (
    day: any,
    fields: any,
    field: string,
    setFieldLikes: any
  ) => {
    console.log("day", day);
    console.log("fields", fields);
    console.log("field", field);

    // return;
    const query = userLikesFieldQueryStringFunc(
      day?.id,
      fields?.id,
      field,
      3,
      CURRENT_USER?.username,
      CURRENT_USER?.icon
    );

    const predata = await axios.post(predataString, { query: query });
    console.log("predata", predata);
    if (!predata) {
      return null;
    }
    const likesDataAfterFieldsLikeUpdate = predata?.data?.data?.userLikesField;
    setFieldLikes(likesDataAfterFieldsLikeUpdate);
  };

  const fieldsToggleCheckbox = async (
    day: any,
    fields: any,
    fieldCheckboxes: any,
    fieldsBinIndex: number,
    setFieldCheckboxes: any
  ) => {
    // const fieldsToggleCheckbox = async (index:number, dayId:number, fields:any) => {
    if (CURRENT_USER?.id !== day?.id) {
      return;
    }

    // 📝 📝 probably currentCheckboxes = [...fields?.checkbox] soft copy of checkboxes to avoid the loop
    let currentCheckboxes = fieldCheckboxes;
    let updatedCheckboxes: boolean[] = [];

    const checkCheckboxPromise = await new Promise((resolve) => {
      currentCheckboxes?.forEach((box: boolean, i: number) => {
        // if i === index that means the loop met the checkbox clicked by user.
        if (i === fieldsBinIndex) {
          // box === true ? then it's already checked.
          box === true
            ? updatedCheckboxes.push(false)
            : updatedCheckboxes.push(true);
        } else {
          // the else block leaves the checkbox alone because it's the [i] of every checkbox NOT clicked by user.
          updatedCheckboxes.push(box);
        }
      });
      // Promise resolves/returns the updated array of all checkboxes. the only box altered is the clicked one, in the if block.
      setFieldCheckboxes(updatedCheckboxes);
      resolve(updatedCheckboxes);
    });

    const query = `mutation { toggleFieldsCheckboxIndex(fieldId: ${
      fields?.id
    }, newCheckboxes: ${JSON.stringify(checkCheckboxPromise)} ) { checkbox }}`;

    try {
      const response = await axios.post(predataString, { query: query });

      if (response?.data?.data) {
        let toggledCheckbox = response.data.data.toggleFieldsCheckboxIndex;

        // Check if the first value is either true or false
        if (toggledCheckbox?.[0] === true || toggledCheckbox?.[0] === false) {
          // dispatch(UPDATE_FIELDS_CHECKBOX(toggledCheckbox))
        }
      }
    } catch (error) {
      console.log("error block!!", error);
      // setError(true)
    }
  };

  const fieldsEyeAmClicking = (
    fields: any,
    index: number,
    setFieldsConstantseeText: any,
    setFieldsConstantseeIndex: any,
    fieldsConstantseeClick: boolean,
    setFieldsConstantseeClick: any
  ) => {
    // click on the eye and it brings up <ConstantSee/> which is just am activity correspondent reminder/catch-phrase list
    if (fields) {
      const constantsee = fields.constantsee;
      if (constantsee?.length >= 1) {
        // if (CURR_DAY_FIELDS.contstantsee && CURR_DAY_FIELDS.constantsee.length > 1) {
        if (constantsee[index]) {
          //
          const splitText = constantsee[index]?.split(",");
          // .split because we have to iterate. fields.constantsee is a string array that corresponds to each field which is an array as well.
          setFieldsConstantseeText(splitText);
          setFieldsConstantseeIndex(index);
          setFieldsConstantseeClick(!fieldsConstantseeClick);
        } else {
          const dummyText: string[] = ["nothing to", "see here"];
          setFieldsConstantseeText(dummyText);
          setFieldsConstantseeIndex(index);
        }
      }
    }
    // return 'hey'
  };

  const backOutOfComment = (
    setSoundCommentFile: any,
    setReplyInputValue: any,
    setCommenterCanDetermineCheckboxCheckpoint: any
  ) => {
    setSoundCommentFile(null);
    setReplyInputValue("");
    setCommenterCanDetermineCheckboxCheckpoint(false);
  };

  const commentLeaveCommentUnlockHandler = (
    day: any,
    setUsersPassLocks: any
  ) => {
    const thoughts = Array.isArray(day?.thoughts) && day?.thoughts;
    const moments = day?.moments || null;
    const fields = day?.fields || null;
    const greatfull = day?.greatfullagain || null;
    const ballots = Array.isArray(day?.ballots) && day?.ballots;

    const doAnyBallotsApplyToLock =
      (Array.isArray(ballots) &&
        ballots?.some((ballots) => ballots?.unlock === "leave comment")) ||
      null;

    const postingUserThoughts = thoughts?.find(
      (thougths: any) => thoughts?.thoughts?.length
    );
    // const postingUserThoughts = thoughts?.find(thoughts => thoughts?.thoughts?.length);
    const dayUnlock = day?.unlock;
    const thoughtUnlock = postingUserThoughts?.unlock || null;
    const momentUnlock = moments?.unlock;
    const fieldUnlock = fields?.unlock;
    const greatfullUnlock = greatfull?.unlock;
    const unlockArray: any[] = [
      dayUnlock,
      thoughtUnlock,
      momentUnlock,
      fieldUnlock,
      greatfullUnlock,
    ];
    const isUnlockArrayRelevantToLock = unlockArray?.some(
      (unlocks) =>
        unlocks === "leave comment" || doAnyBallotsApplyToLock === true
    );
    if (!isUnlockArrayRelevantToLock) {
      return null;
    }

    unlockFunc("leave comment", "pass user", day, setUsersPassLocks);
  };

  const commentIconUnlockHandler = (
    commentIcon: string | null,
    day: any,
    setUsersPassLocks: any
  ) => {
    const thoughts = Array.isArray(day?.thoughts) && day?.thoughts;
    const moments = day?.moments;
    const fields = day?.fields;
    const greatfull = day?.greatfullagain;
    const ballotBin = (Array.isArray(day?.ballots) && day?.ballots) || null;

    let doAnyBallotsApplyToLock: any;
    if (ballotBin !== null) {
      doAnyBallotsApplyToLock =
        ballotBin?.some((ballots: any) => ballots?.unlock === "commentIcon") ||
        null;
      // doAnyBallotsApplyToLock = ballotBin?.some(ballots => ballots?.unlock === "commentIcon") || null;
    }

    // let doAnyBallotsApplyToLock = .some(ballots => ballots?.unlock === "commentIcon") || null;
    const postingUserThoughts = Array.isArray(thoughts)
      ? thoughts?.find((thoughts) => thoughts?.thoughts?.length)
      : [];
    const dayUnlock = day?.unlock;
    const thoughtUnlock = postingUserThoughts?.unlock || null;
    const momentUnlock = moments?.unlock;
    const fieldUnlock = fields?.unlock;
    const greatfullUnlock = greatfull?.unlock;
    const unlockArray: any[] = [
      dayUnlock,
      thoughtUnlock,
      momentUnlock,
      fieldUnlock,
      greatfullUnlock,
    ];
    // feature: {t.unlock} w.o delimited required avg. i.e. feature: "postingUserThoughtStarsAvg" unlock: "postingUserThoughtStarsAvg-2"
    // if (unlockArray.some((unlocks) => {return unlocks?.unlock?.includes("commentIcon")}) || doAnyBallotsApplyToLock === true ) {
    const isUnlockArrayRelevantToLock = unlockArray.some(
      (unlocks) => unlocks === "commentIcon" || doAnyBallotsApplyToLock === true
    );
    if (!isUnlockArrayRelevantToLock) {
      return null;
    }

    if (
      (dayUnlock === "commentIcon-thoughts" ||
        thoughtUnlock === "commentIcon-thoughts" ||
        momentUnlock === "commentIcon-thoughts" ||
        fieldUnlock === "commentIcon-thoughts" ||
        greatfullUnlock === "commentIcon-thoughts") &&
      commentIcon === "Thoughts"
    ) {
      console.log("commentIcon-thoughts block!");
      unlockFunc(`commentIcon-thoughts`, "pass user", day, setUsersPassLocks);
    }
    if (
      (dayUnlock === "commentIcon-moments" ||
        thoughtUnlock === "commentIcon-moments" ||
        momentUnlock === "commentIcon-moments" ||
        fieldUnlock === "commentIcon-moments" ||
        greatfullUnlock === "commentIcon-moments") &&
      commentIcon === "Moments"
    ) {
      console.log("commentIcon-moments block!");
      unlockFunc(`commentIcon-moments`, "pass user", day, setUsersPassLocks);
    }
    if (
      (dayUnlock === "commentIcon-fields" ||
        thoughtUnlock === "commentIcon-fields" ||
        momentUnlock === "commentIcon-fields" ||
        fieldUnlock === "commentIcon-fields" ||
        greatfullUnlock === "commentIcon-fields") &&
      commentIcon === "Fields"
    ) {
      console.log("commentIcon-fields block!");
      unlockFunc(`commentIcon-fields`, "pass user", day, setUsersPassLocks);
    }
    if (
      (dayUnlock === "commentIcon-greatfull" ||
        thoughtUnlock === "commentIcon-greatfull" ||
        momentUnlock === "commentIcon-greatfull" ||
        fieldUnlock === "commentIcon-greatfull" ||
        greatfullUnlock === "commentIcon-greatfull") &&
      commentIcon === "Greatfull"
    ) {
      console.log("commentIcon-greatfull block!");
      unlockFunc(`commentIcon-greatfull`, "pass user", day, setUsersPassLocks);
    }
    // irrelevant. dont execute.
  };

  const submitSoundCommentThought = async (
    mapItemComment: any | null,
    index: number | null,
    eventId: number | null,
    locationId: number | null,
    locationText: number | null,
    checkboxCheckpoint: boolean,
    setCheckboxCheckpoint: any,
    soundCommentFile: any,
    setSoundCommentFile: any,
    setReplyInputValue: any,
    // 🚨 🚨 to make this function agnostic to {days|event} {soundComments, setSoundComments} as two separate props
    soundComments: any,
    setSoundComments: any,
    newCommentThoughtsOk: string,
    newCommentStarrable: string,
    newCommentStarsShowAvg: boolean,
    newCommentStarsShowUsers: boolean,

    // voice_comment_path:string,
    non_anonymous: string,
    commenter_can_determine: boolean,
    voice_comments_ok: boolean,
    text_comments_ok: boolean,
    anonymous_comments_ok: boolean,
    i_can_unlock: boolean,
    u_can_unlock: boolean,
    lock: string | null,
    unlock: string | null,

    day: any,
    usersPassLocks: any,
    comments: any,
    setComments: any,
    setError: any
  ) => {
    // if sound file is null don't let user start selecting interaction settings like (1-5 stars ok, replies ok) for a null comment
    //  * * * * TESTING FOR NOW LEAVE COMMENTED ! * * * *

    console.log("aii we get over here though");
    if (soundCommentFile === null) {
      setError(true);
      return;
    }

    const soundCommentsArrayLength: number = soundComments?.length;

    //  add the new soundCommentFile BLOB to local state because redux allows store and play but returns a serializable error

    const soundCommentPath = `media/day-${day?.id}-folder/media-comments/user${
      CURRENT_USER?.id
    }-voice${soundCommentsArrayLength + 1}-parent${mapItemComment?.id}`;
    // BLOB url so that the object doesn't say { blob: {...} type: {...} } it's the actual BLOB which is ready to be played.
    console.log("soundCommentPath", soundCommentPath);

    // const BLOBdata: any = URL.createObjectURL(new Blob([soundCommentFile]));
    let BLOBdata: any = null;

    if (Platform.OS === "web") {
      BLOBdata = URL.createObjectURL(new Blob([soundCommentFile]));
      console.log("BLOBdata", BLOBdata);
    } else {
      console.log("📱 Mobile upload block");
      console.log("recordingUri", recordingUri);
      console.log("soundCommentFile", soundCommentFile);

      if (recordingUri) {
        // Use the file saved by Expo (simplest + most reliable)
        BLOBdata = recordingUri;
      } else if (soundCommentFile?.uri) {
        BLOBdata = soundCommentFile.uri;
      } else {
        console.warn("No valid recordingUri or soundCommentFile.uri found");
        return;
      }

      console.log("Using BLOBdata from", BLOBdata);
    }
    const soundComment = {
      thought: { key: soundCommentPath },
      blob: BLOBdata,
    };

    const presignedQuery = getPresignedUploadURLQueryStringFunc(
      soundCommentPath,
      "audio/m4a"
    );
    console.log("presignedQuery", presignedQuery);

    // for presignedURL to update S3 with the new sound comment
    const presignedPreData: any = await axios.post(predataString, {
      query: presignedQuery,
    });

    console.log("presignedPreData", presignedPreData);

    if (!presignedPreData) {
      return null;
    }

    let presignedData = presignedPreData?.data?.data?.getPresignedUploadURL;
    const parsedData = JSON.parse(presignedData);

    console.log("parsedData?.signedUrl", parsedData?.signedUrl);

    console.log("soundComment", soundComment);
    setSoundComments([...soundComments, soundComment]);
    // const blob = await uploadBlobToS3(soundCommentPath, soundCommentFile, 'audio/m4a');
    const blob = await uploadBlobToS3WithPresignedUrl(
      parsedData?.signedUrl,
      soundCommentFile,
      "audio/m4a"
    );
    console.log("blob", blob);

    const query = submitCommentThoughtQueryStringFunc(
      day?.id,
      CURRENT_USER?.id,
      CURRENT_USER?.username,
      eventId || null, // event_id: null
      null, // location_text "lazy location" user could put in "hell" "heaven" "friends house" "xbox live" "tiktok" lol
      CURRENT_USER?.icon || null,
      soundCommentPath, // this is {thoughts.thought} and will be the voice_comments_path
      mapItemComment?.id || null,
      mapItemComment?.comment_icon || null,
      mapItemComment?.comment_icon === "greatfullagain"
        ? mapItemComment?.greatfullagain_id
        : null,
      mapItemComment?.comment_icon === "moment"
        ? mapItemComment?.moment_id
        : null,
      null, // loc id
      newCommentThoughtsOk,
      newCommentStarrable,
      newCommentStarsShowAvg,
      newCommentStarsShowUsers,
      true,
      null,
      // voice_comment_path,
      soundCommentPath,
      non_anonymous || "yes",
      commenter_can_determine,
      voice_comments_ok,
      text_comments_ok,
      anonymous_comments_ok, // testing // anonymous_comments_ok,
      // these fields are for chatrooms no custom locks on commentLocks, maybe hold a vote for that.
      null,
      null,
      lock,
      unlock
    );

    const predata: any = await axios.post(predataString, { query: query });

    if (!predata) {
      setError(true);
      return null;
    }
    const data = predata?.data?.data?.submitComment;
    console.log("data", data);
    if (!data) {
      setError(true);
      return null;
    }

    setComments(data);
    // clear comment and checkboxContainer
    backOutOfComment(
      setSoundCommentFile,
      nothingWithDummyParams,
      setCheckboxCheckpoint
    );

    // check for unlocks, in case a user asks that people just leave a comment to unlock.
    commentIconUnlockHandler(mapItemComment?.comment_icon, day, usersPassLocks);
    commentLeaveCommentUnlockHandler(day, usersPassLocks);

    const today = getToday("en");
    const todaysDate = today.date;

    const commentNotificationObject = {
      date: todaysDate,
      from_user_id: CURRENT_USER?.id || null,
      from_username: CURRENT_USER?.username || null,
      for_user_id: day?.user_id || null,
      from_app: false,
      day_id: day?.id,
      day_icon: day?.day_icon || null,
      thought_id: null,
      moment_id: null,
      field_id: null,
      invite_id: null,
      listener_id: null,
      share_Id: null,
      like_id: null,
      star_id: null,
      reaction_id: null,
      vibe_id: null,
      payment_id: null,
      prank_id: null,
      feedgame_id: null,
      message_id: null,
      report_id: null,
      user_pass_lock_id: null,
      user_allowed_to_unlock_id: null,
      ballot_id: null,
      custom_notification: null,
      is_read: false,
      is_request: false,
      type: "comment",
    };

    const stringifiedObject = JSON.stringify(commentNotificationObject);

    notificationMaker(day?.user_id, stringifiedObject);
  };

  const submitTextComment = (
    mapitemComment: any,
    mapitemCommentIndex: number | null,
    eventId: number | null,
    locationId: number | null,
    locationText: number | null,
    commentIcon: string | null,
    commenterCanDetermineCheckboxCheckpoint: any,
    setCommenterCanDetermineCheckboxCheckpoint: any,
    replyInputValue: string,
    newCommentThoughtsOk: string,
    newCommentStarrable: string,
    newCommentNonAnonymous: string,
    newCommentStarsShowAvg: boolean,
    newCommentStarsShowUsers: boolean,
    newCommentIsVideo: boolean,
    newCommentIsVoice: boolean,
    newCommentCommenterCanDetermine: boolean,
    newCommentVoiceCommentsOk: boolean,
    newCommentTextCommentsOk: boolean,
    newCommentAnonymousCommentsOk: boolean | string,
    newCommentLock: string | null,
    newCommentUnlock: string | null,

    day: any,
    setUsersPassLocks: any,
    setSoundCommentFile: any,
    setReplyInputValue: any,
    setComments: any,
    setError: any
  ) => {
    console.log("setSoundCommentFile from functions:", setSoundCommentFile);

    console.log("hey guys how are you");
    if (
      replyInputValue === null ||
      replyInputValue?.length < 1 ||
      replyInputValue === "" ||
      replyInputValue === "@"
    ) {
      setError(true);
      return;
    }

    //  have to restore defaults again();
    // if (day?.commenter_can_determine === true && commenterCanDetermineCheckboxCheckpoint === false && mapitemComment?.commenter_can_determine === true) {
    //     setCommenterCanDetermineCheckboxCheckpoint(true);
    //     return;
    // }

    const query = `mutation { submitComment (
        day_id: ${day?.id}, 
        user_id: ${CURRENT_USER?.id}, username: "${
      CURRENT_USER?.username
    }", user_profile_icon: "${CURRENT_USER?.icon}",
        thought: "${replyInputValue}", 
        thoughts_ok: "${newCommentThoughtsOk || ""}", downloadable: "", 
        starrable: "${newCommentStarrable}", non_anonymous: "${newCommentNonAnonymous}",
        location_id: ${locationId || null}, 
        location_text: ${locationText || null},
        moment_id: ${mapitemComment?.moment_id || null}, 
        greatfullagain_id: ${mapitemComment?.greatfullagain_id || null}, 
        event_id: ${eventId || null}
        stars_show_avg: ${newCommentStarsShowAvg}, 
        stars_show_users: ${newCommentStarsShowUsers},
        parent_thought_id: ${mapitemComment?.id || null}, 
        comment_icon: "${
          commentIcon !== null
            ? commentIcon
            : mapitemComment?.comment_icon || null
        }",
        is_video: ${newCommentIsVideo || null}, 
        is_voice: ${newCommentIsVoice || null},
        commenter_can_determine: ${newCommentCommenterCanDetermine || null},
        voice_comments_ok: ${newCommentVoiceCommentsOk || null},
        text_comments_ok: ${newCommentTextCommentsOk || null},
        anonymous_comments_ok: ${newCommentAnonymousCommentsOk || false},
        lock: "${newCommentLock || null}",
        unlock: "${newCommentUnlock || null}",
    ) { 
        id, user_id, username, user_profile_icon, day_id, location_id, moment_id, greatfullagain_id, parent_thought_id, sus_content,
        suggestion_id, feedgame_id, meme_id, title, thought, thoughts, non_anonymous, downloadable, starrable, thoughts_ok, comment_icon, 
        is_reported, is_in_trash, trash_tally, date, on_profile, is_voice, is_video, stars_show_avg, stars_show_users, blank_thoughts_ok, blank_thoughts_username,

        commenter_can_determine, voice_comments_ok, text_comments_ok, anonymous_comments_ok, i_can_unlock, u_can_unlock, lock, unlock
    }}`;

    // console.log('query life!!!!', query)

    // const predataString = API || 'http://localhost:4000/api/graphql';
    return (
      axios
        .post(predataString, { query: query })
        // return axios.post('http://localhost:4000/api/graphql', { query: query })
        .then(async (response: any) => {
          console.log("response", response);
          const data = response?.data?.data?.submitComment;
          console.log("data", data);
          console.log("data HOW ARE YOU !!! ", data);

          if (!data) {
            return;
          }
          backOutOfComment(
            setSoundCommentFile,
            setReplyInputValue,
            setCommenterCanDetermineCheckboxCheckpoint
          );

          // Promise.all() no because unlock the one that gets all associated ballot childs doesn't need to return data. just update.

          commentIconUnlockHandler(commentIcon, day, setUsersPassLocks);
          commentLeaveCommentUnlockHandler(day, setUsersPassLocks);

          let today = getToday("en");
          let todaysDate = today.date;

          const commentNotificationObject = {
            date: todaysDate,
            from_user_id: CURRENT_USER?.id || null,
            from_username: CURRENT_USER?.username || null,
            for_user_id: day?.user_id || null,
            from_app: false,
            day_id: day?.id,
            day_icon: day?.day_icon || null,
            thought_id: null,
            moment_id: null,
            field_id: null,
            invite_id: null,
            listener_id: null,
            share_Id: null,
            like_id: null,
            star_id: null,
            reaction_id: null,
            vibe_id: null,
            payment_id: null,
            prank_id: null,
            feedgame_id: null,
            message_id: null,
            report_id: null,
            user_pass_lock_id: null,
            user_allowed_to_unlock_id: null,
            ballot_id: null,
            custom_notification: null,
            is_read: false,
            is_request: false,
            type: "comment",
          };

          const stringifiedObject = JSON.stringify(commentNotificationObject);

          notificationMaker(day?.user_id, stringifiedObject);

          //  if user skipped comment settings then commenting profile icon became skip button. reset. that's handled thru this array

          // testing if logic handled with backOutOfComment
          // if (CURR_DAY_CHECKBOX_CONTAINER_ACTIVE_BIN.includes(true)) {
          //     const resetSkipButtonCommentProfileIconArr = arrayFromBooleanUpdateIndex(CURR_DAY_CHECKBOX_CONTAINER_ACTIVE_BIN, mapitemCommentIndex, false)
          //     dispatch(SET_CURR_DAY_CHECKBOX_CONTAINER_ACTIVE_BIN(resetSkipButtonCommentProfileIconArr))
          // }
          setComments(data);
          return data;
        })
        .catch((error) => {
          console.log("error", error);
          return "error";
        })
    );
  };

  const submitCommentThoughtALLpassCommentThoughtsTrueFunc = async (
    day_id: number,
    thought_id: number,
    setUsersPassLocks: any,
    setError: any
  ) => {
    const query = submitCommentThoughtALLpassCommentThoughtsTrueQueryStringFunc(
      day_id,
      thought_id
    );
    try {
      // let predata: any = await AllOursRequestDATA(query, {}, CURRENT_USER_TOKEN)
      const predata: any = await axios.post(predataString, {
        query: query,
      });
      // let predata: any = await axios.post('http://localhost:4000/api/graphql', { query: query })
      console.log("predata", predata);
      if (!predata) {
        return null;
      }
      const allDayLocksAfterSubmittingPassedLockForAll =
        predata?.data?.data?.submitCommentThoughtALLpassCommentThoughtsTrue;
      if (!allDayLocksAfterSubmittingPassedLockForAll) {
        return null;
      }
      console.log(
        "allDayLocksAfterSubmittingPassedLockForAll",
        allDayLocksAfterSubmittingPassedLockForAll
      );
      // dispatch(SET_CURR_DAY_USERS_PASS_LOCKS(allDayLocksAfterSubmittingPassedLockForAll))
      setUsersPassLocks(allDayLocksAfterSubmittingPassedLockForAll);
      return allDayLocksAfterSubmittingPassedLockForAll;
    } catch (error) {
      console.log("error", error);
      setError(true);
      return error;
    }
  };

  const updateCommentThoughtALLpassCommentThoughtsFalseFunc = async (
    day_id: number,
    thought_id: number,
    setUsersPassLocks: any,
    setError: any
  ) => {
    const query =
      updateCommentThoughtALLpassCommentThoughtsFalseQueryStringFunc(
        day_id,
        thought_id
      );
    try {
      // let predata: any = await AllOursRequestDATA(query, {}, CURRENT_USER_TOKEN)
      const predata: any = await axios.post(predataString, {
        query: query,
      });
      // let predata: any = await axios.post('http://localhost:4000/api/graphql', { query: query })
      console.log("predata", predata);
      const allDayLocksAfterUpdatedFailedLockForAll =
        predata?.data?.data?.updateCommentThoughtALLpassCommentThoughtsFalse;
      if (!allDayLocksAfterUpdatedFailedLockForAll) {
        return null;
      }
      console.log(
        "allDayLocksAfterUpdatedFailedLockForAll",
        allDayLocksAfterUpdatedFailedLockForAll
      );
      // dispatch(SET_CURR_DAY_USERS_PASS_LOCKS(allDayLocksAfterUpdatedFailedLockForAll))
      setUsersPassLocks(allDayLocksAfterUpdatedFailedLockForAll);
      return allDayLocksAfterUpdatedFailedLockForAll;
    } catch (error) {
      console.log("error", error);
      // dispatch(TOGGLE_CURR_DAY_ERROR())
      setError(true);
      // dispatch(SET_CURR_DAY_SELECTION('error'))
      return;
    }
  };

  const passCommentLockFunc = (
    comment: any,
    day: any,
    setUsersPassLocks: any,
    setError: any
  ) => {
    const userPassLocksQuery = submitUserPassCommentLockQueryStringFunc(
      CURRENT_USER?.id,
      day?.id,
      comment?.id
    );
    // const predata: any = await axios.post(predataString, { query: query })
    axios
      .post(predataString, { query: userPassLocksQuery })

      .then((data) => {
        const allUsersPassCommentLock =
          data?.data?.data?.submitUserPassCommentLock;
        if (!allUsersPassCommentLock) {
          return;
        }
        console.log("allUsersPassCommentLock", allUsersPassCommentLock);
        setUsersPassLocks(allUsersPassCommentLock);
      })
      .catch((error) => {
        setError(true);
        console.log("error", error);
      });
  };

  const startRecordingSound = async (
    recorderRef: any,
    streamRef: any,
    setSoundCommentFile: any
  ) => {
    console.log("🎙️ startRecording firing");

    // 🧠 STOP branch shared between web + mobile
    const isWebRecording =
      Platform.OS === "web" &&
      recorderRef.current &&
      recorderRef.current.state === "recording";

    const isMobileRecording =
      (Platform.OS === "ios" || Platform.OS === "android") &&
      recorderRef.current;

    if (isWebRecording || isMobileRecording) {
      console.log("🛑 Stopping current recording...");

      if (Platform.OS === "web") {
        recorderRef.current.stop();
        streamRef.current?.getTracks()?.forEach((t: any) => t?.stop());
      } else {
        try {
          await recorderRef.current.stopAndUnloadAsync();
          const uri = recorderRef.current.getURI();
          console.log("uri", uri);

          if (uri) {
            console.log("recording URI after stop:", uri);
            const response = await fetch(uri);
            const recordedBlob = await response.blob();
            setSoundCommentFile(recordedBlob); // ✅ same behavior as web
            setRecordingUri(uri);
          }
        } catch (err) {
          console.error("Error stopping recording (mobile):", err);
        }
      }

      recorderRef.current = null;
      return; // exit early
    }

    // 🧠 START branch
    if (Platform.OS === "web") {
      console.log("🎧 Starting web recording...");
      streamRef.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      recorderRef.current = new MediaRecorder(streamRef.current);
      recorderRef.current.start();

      recorderRef.current.ondataavailable = async (e: any) => {
        const recordedBlob = new Blob([e.data], { type: "audio/mp3" });
        setSoundCommentFile(recordedBlob);
      };
    } else {
      try {
        const { granted } = await ExpoAudio.requestPermissionsAsync();
        if (!granted) return;

        await ExpoAudio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        const recording = new ExpoAudio.Recording();
        await recording.prepareToRecordAsync({
          android: {
            extension: ".m4a",
            outputFormat: ExpoAudio.AndroidOutputFormat.MPEG_4,
            audioEncoder: ExpoAudio.AndroidAudioEncoder.AAC,
            sampleRate: 44100,
            numberOfChannels: 2,
            bitRate: 128000,
          },
          ios: {
            extension: ".m4a",
            audioQuality: ExpoAudio.IOSAudioQuality.HIGH,
            sampleRate: 44100,
            numberOfChannels: 2,
            bitRate: 128000,
            outputFormat: ExpoAudio.IOSOutputFormat.MPEG4AAC,
          },
          web: {
            mimeType: "audio/webm",
            bitsPerSecond: 128000,
          },
        });

        await recording.startAsync();
        recorderRef.current = recording;
        console.log("🎙️ Recording started (mobile)");
      } catch (err) {
        console.error("Error starting recording (mobile):", err);
      }
    }
  };

  const clearRecordedSound = async (setSoundCommentFile: any) => {
    setRecordingUri(null);
    setSoundCommentFile(null);
    setSoundObj(null);
    setIsPlaying(false);
  };

  const deleteComment = async (
    mapitem: any,
    dayId: number,
    eventId: any,
    setComments: any
  ) => {
    if (mapitem?.is_voice === true) {
      // if is_voice === true then AWS-S3 is deleted in the resolver but have to sort the deleted comment out of currDaySoundComments
    } else {
      console.log("text comment");
      // split between empty string and null for the query constructor:
      let query;

      if (dayId) {
        query = deleteCommentQueryStringFunc(
          dayId,
          null,
          mapitem?.id,
          false,
          ""
        );
      } else if (eventId) {
        query = deleteCommentQueryStringFunc(
          null,
          eventId,
          mapitem?.id,
          false,
          ""
        );
      }

      // const query = deleteCommentQueryStringFunc(CURR_DAY?.id, mapitem?.id, false, null)
      console.log("query", query);

      try {
        const predata = await axios.post(predataString, {
          query: query,
        });
        // const predata = await axios.post("http://localhost:4000/api/graphql", { query: query })
        if (!predata) {
          return;
        }
        console.log("predata", predata);
        let allCommentsAfterDeleting = predata?.data?.data?.deleteComment;
        if (!allCommentsAfterDeleting) {
          return;
        }
        allCommentsAfterDeleting = JSON.parse(allCommentsAfterDeleting);
        console.log("allCommentsAfterDeleting", allCommentsAfterDeleting);

        setComments(allCommentsAfterDeleting);
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const userBlocksUserFunc = async (
    user_id: number | null,
    blocked_id: number,
    is_shadow_ban: boolean | null,
    feedback: string | null,
    notes: string | null
  ) => {
    const query = userBlocksUserQueryStringFunc(
      user_id,
      blocked_id,
      false,
      feedback,
      notes
    );
    try {
      const addUserGetAllBlocksToUpdateState = await axios.post(predataString, {
        query: query,
      });
      if (!addUserGetAllBlocksToUpdateState) {
        return;
      }
      const blocks = addUserGetAllBlocksToUpdateState?.data?.data?.blockUser;
      console.log(
        "addUserGetAllBlocksToUpdateState",
        addUserGetAllBlocksToUpdateState
      );
      dispatch(SET_ALL_BLOCKS(blocks));
      return addUserGetAllBlocksToUpdateState;
    } catch (error) {
      console.log("error", error);
      return null;
    }
  };

  const getNumberFromCommentLock = (comment: any) => {
    const unlock = comment?.unlock || "";
    if (!unlock) {
      return 3;
    }

    const numberFromCommentUnlock = comment?.unlock?.match(/(\d+)/);

    if (numberFromCommentUnlock === null) {
      return 0;
    }
    const unlockNum = parseInt(numberFromCommentUnlock[1], 10);
    console.log("unlockNum", unlockNum);
    return unlockNum;
  };

  const commentLockTimesRatedTimesLeft = (comment: any, stars: any) => {
    // const commentLockTimesRatedTimesLeft = () => {

    const numberFromCommentUnlock: any | null = comment?.unlock?.match(/(\d+)/);

    if (numberFromCommentUnlock === null) {
      return "?";
    }
    const unlockNum = parseInt(numberFromCommentUnlock[1], 10);

    const starsForComment = stars?.map(
      (stars: any) => stars?.thought_id === comment?.id
    );
    const starsLength = starsForComment?.length;
    const ratingsLeftToPassLock: number = unlockNum - starsLength;
    return ratingsLeftToPassLock;
  };

  const GETballotMediaS3Func = async (
    fileType: string,
    day: any,
    setBallotsMediaBlobs: any
  ) => {
    // const GETballotMediaS3Func = async (fileType: string) => {

    let ballotCommentsPathS3 =
      fileType === "images"
        ? await getDayBallotMediaFOLDERPathFromS3(day?.id, "images")
        : fileType === "audio"
        ? await getDayBallotMediaFOLDERPathFromS3(day?.id, "audio")
        : fileType === "videos" &&
          (await getDayBallotMediaFOLDERPathFromS3(day?.id, "videos"));

    // console.log('ballotCommentsPathS3 now', ballotCommentsPathS3);

    if (!ballotCommentsPathS3) {
      return null;
    }

    const query = getObjKeysFromFolderS3QueryStringFunc(ballotCommentsPathS3);

    console.log("query", query);

    const predata: any = await axios.post(predataString, {
      query: query,
    });
    if (!predata) {
      return null;
    }

    console.log("predata", predata);
    let data = predata?.data?.data?.getObjKeysFromFolderS3;

    console.log("data here", data);

    if (!data) {
      return null;
    }

    const ballotMedia = JSON.parse(data);
    console.log("ballotMedia", ballotMedia);

    console.log("is this version even running");
    if (fileType === "audio") {
      const mediaPromises = ballotMedia?.map(async (item: any) => {
        console.log("item", item);
        const key = item?.key || item?.Key;
        console.log("item", item);
        // return;

        // const blob: any = await getBLOBfromS3(key);
        // const preBlob = await getObjAudioFromCloudfront(key);
        const preBlob = { base64Data: "ayoo" };
        console.log("preBlob", preBlob);
        // const preBlob: any = await getBLOBandKEYandURLfromCloudFront(key);

        const blob = preBlob?.base64Data;
        const reuploadBlob = getBlobFromUri(item?.url);
        // const reuploadBlob = "test";
        console.log("reuploadBlob", reuploadBlob);
        // creates key.Key
        return { key: item, blob, reuploadBlob };
      });
      const mediaArray = await Promise.all(mediaPromises);
      // console.log('mediaArray', mediaArray);
      setBallotsMediaBlobs(mediaArray);
    }
    if (fileType === "images" || fileType === "videos") {
      const mediaPromises = ballotMedia?.map(async (item: any) => {
        // console.log('item', item);
        const key = item?.key || item?.Key;
        // return;

        // const blob: any = await getBLOBfromS3(key);
        // const preBlob = await getObjAudioFromCloudFront(key);

        // ⚠️ ⚠️ not needed for the URL that's why {blob = item.url} but this is needed for JoindayVotes to sent back to S3 ⚠️ ⚠️ ⚠️
        const preBlob: any = await getBLOBandKEYandURLfromCloudFront(key);

        // console.log('preBlob', preBlob);

        const blob = item?.url;
        // const blob = preBlob?.base64Data;
        // const reuploadBlob = preBlob?.blob;
        const reuploadBlob = getBlobFromUri(item?.url);
        console.log("reuploadBlob", reuploadBlob);
        // creates key.Key
        return { key: item, blob, reuploadBlob };
      });
      const mediaArray = await Promise.all(mediaPromises);
      // console.log('mediaArray', mediaArray);
      setBallotsMediaBlobs(mediaArray);
    }
  };

  const setBallotVotesLikesStars = (
    ballotBin: any,
    ballot: any,
    setCurrVotes: any,
    setBallotOptionsLikes: any,
    setBallotOptionsStars: any
  ) => {
    console.log("balloBin", ballotBin);
    const allVotes = ballotBin?.flatMap((ballot: any) => ballot?.votes);
    const allLikes = ballotBin?.flatMap((ballot: any) => ballot?.likes);
    const allStars = ballotBin?.flatMap((ballot: any) => ballot?.stars);

    // dispatch(SET_CURR_DAY_VOTES(allVotes))
    setCurrVotes(allVotes);
    setBallotOptionsLikes(allLikes);
    setBallotOptionsStars(allStars);
  };

  const createVoteCommentBucket = (
    day_id: number,
    user_id: number,
    username: string,
    user_profile_icon: string,
    thought: string,
    thoughts_ok: string,
    downloadable: string,
    starrable: string,
    non_anonymous: string,
    location_id: number | null,
    location_text: string | null,
    moment_id: number | null,
    greatfullagain_id: number | null,
    event_id: number | null,
    stars_show_avg: boolean,
    stars_show_users: boolean,
    parent_thought_id: number | null,
    comment_icon: string | null,
    is_video: boolean | null,
    is_voice: boolean | null,
    commenter_can_determine: boolean | null,
    voice_comments_ok: boolean | null,
    text_comments_ok: boolean | null,
    // nope
    anonymous_comments_ok: boolean | null,
    lock: string | null,
    unlock: string | null
  ) => {
    // have to check if CURR_DAY?.thoughts_ok !== 'no'
    const query = createVoteCommentBucketQueryStringFunc(
      day_id,
      user_id,
      username,
      user_profile_icon,
      thought,
      thoughts_ok,
      downloadable,
      starrable,
      non_anonymous,
      location_id,
      location_text,
      moment_id,
      greatfullagain_id,
      event_id,
      stars_show_avg,
      stars_show_users,
      parent_thought_id,
      comment_icon,
      is_video,
      is_voice,
      commenter_can_determine,
      voice_comments_ok,
      text_comments_ok,
      anonymous_comments_ok,
      lock,
      unlock
    );

    // const predataString = API || 'http://localhost:4000/api/graphql'

    axios
      .post(predataString, { query: query })
      .then((data) => {
        console.log("VCB brodie", data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const userWentWithVoteOptionHeartToggler = async (
    day_id: any,
    event_id: any,
    ballotId: number,
    currentWentWithVoteUpdateStatus: boolean,
    setBallotBin: any,
    setCurrVotes: any,
    setBallotOptionsLikes: any,
    setBallotOptionsStars: any
  ) => {
    const query = userWentWithVoteUpdateQueryStringFunc(
      day_id,
      event_id,
      ballotId,
      currentWentWithVoteUpdateStatus
    );

    const predata: any = await axios.post(predataString, { query: query });
    console.log("predata", predata);
    if (!predata) {
      return null;
    }
    const data: any = predata?.data?.data?.userWentWithVoteUpdate;
    if (!data) {
      return null;
    }
    console.log("data", data);
    const jsonParseData = JSON.parse(data);
    console.log("jsonParseData", jsonParseData);
    setBallotBin(jsonParseData);

    setBallotVotesLikesStars(
      jsonParseData,
      jsonParseData[0],
      setCurrVotes,
      setBallotOptionsLikes,
      setBallotOptionsStars
    );

    // 🔒 🔒 locks / LOCKS:
  };

  const createVCB = (currBallot: any, day: any, comments: any) => {
    console.log("firing the VCB!");
    console.log("comments", comments);
    // * * * * * * modularization  refactor opportunity
    // posting_users comment so {thought} not {thoughts}
    if (
      comments?.some((comments: any) => comments?.thought?.includes("vcb-")) ===
      false
    ) {
      console.log(
        'associated thoughts to this post dont have a t.thoughts which includes "vcb" ex: vcb-joinday-fields'
      );
      const newVoteCommentBucket = createVoteCommentBucket(
        day?.id,
        day?.user_id,
        day?.username,
        day?.user_profile_icon,
        `vcb-${currBallot?.title}`,
        "yes",
        "no",
        "yes",
        "yes",
        null,
        null,
        null,
        null,
        null,
        true,
        true,
        null,
        "vote",
        false,
        false,
        false,
        true,
        true,
        false,
        null,
        null
      );
      console.log("newVoteCommentBucket", newVoteCommentBucket);
    }
  };

  const getDayThoughtCommentsFunc = (day: any) => {
    const dayThoughts = day?.thoughts;
    const dayThoughtComments = dayThoughts?.filter(
      (th: any) => th?.thought?.length
    );
    return dayThoughtComments;
  };

  const createVoteNotification = (
    day: any,
    currBallot: any,
    forUserID: number,
    voteType: string,
    voteOutcomesMsg: string,
    decision: string
  ) => {
    const msg =
      voteType === "joinday-newfield"
        ? "new fields from vote!"
        : voteType === "joinday-newthought"
        ? "new thoughts from vote!"
        : "vote finished!";
    if (!forUserID) {
      return;
    }
    const date = getToday("en")?.date;

    const commentNotificationObject = {
      date: date,
      from_user_id: CURRENT_USER?.id || null,
      from_username: CURRENT_USER?.username || null,
      for_user_id: forUserID || null,
      from_app: false,
      day_id: day?.id,
      day_icon: day?.day_icon || null,
      thought_id: null,
      moment_id: null,
      field_id: null,
      invite_id: null,
      listener_id: null,
      share_Id: null,
      like_id: null,
      star_id: null,
      reaction_id: null,
      vibe_id: null,
      payment_id: null,
      prank_id: null,
      feedgame_id: null,
      message_id: null,
      report_id: null,
      user_pass_lock_id: null,
      user_allowed_to_unlock_id: null,
      ballot_id: currBallot?.id,
      custom_notification: voteOutcomesMsg
        ? voteOutcomesMsg
        : `results are in! ${decision}`,
      is_read: false,
      is_request: false,
      type: msg,
    };
    const stringedNotification = JSON.stringify(commentNotificationObject);
    notificationMaker(forUserID, stringedNotification);
  };

  const winningVoteUnlockChecker = (
    currBallot: any,
    leaderboardStr: any,
    day: any,
    usersPassLocks: any,
    setUsersPassLocks: any,
    votes: any
  ) => {
    const thoughts = day?.thoughts;
    const postingUserThoughts = thoughts?.find((t: any) => t?.thoughts?.length);
    const moments = day?.moments;
    const fields = day?.fields;
    const greatfull = day?.greatfullagain;
    const ballots = day?.ballots;

    const dayUnlock = day?.unlock;
    const thoughtUnlock = thoughts?.unlock || null;
    const momentUnlock = moments?.unlock;
    const fieldUnlock = fields?.unlock;
    const greatfullUnlock = greatfull?.unlock;

    const doAnyBallotsApplyToLock =
      (Array.isArray(ballots) &&
        ballots?.some((ballots) => ballots?.unlock === "winning vote")) ||
      null;

    const unlockArray: any[] = [
      dayUnlock,
      thoughtUnlock,
      momentUnlock,
      fieldUnlock,
      greatfullUnlock,
      doAnyBallotsApplyToLock,
    ];
    console.log("unlockArray", unlockArray);
    console.log("winningVoteUnlockChecker", winningVoteUnlockChecker);

    const doesUnlockArrayHaveTheUnlock = unlockArray?.some(
      (unlocks) => unlocks === "winning vote" || unlocks === true
    );

    console.log(
      "winning vote: doesUnlockArrayHaveTheUnlock",
      doesUnlockArrayHaveTheUnlock
    );

    if (!doesUnlockArrayHaveTheUnlock) {
      return;
    }
    const doesPostPassAlready = doesPostPassThisLockAlready(
      "winning vote",
      day,
      usersPassLocks
    );
    if (doesPostPassAlready) {
      return;
    }

    // const votes = currBallot?.votes || CURR_DAY_VOTES
    // const leaderboardStr = CURR_DAY_BALLOT[CURR_DAY_BALLOT_BIN_INDEX]?.leaderboard_str || null;
    const winningVoters =
      votes?.filter(
        (votes: any) =>
          votes?.vote_string === leaderboardStr[0] &&
          votes?.ballot_id === currBallot?.id
      ) || null;
    if (!winningVoters) {
      return;
    }

    console.log("doAnyBallotsApplyToLock", doAnyBallotsApplyToLock);

    console.log("winningVoters", winningVoters);
    winningVoters?.forEach((vote: any) => {
      // pass user is (i.e): t.userpasslocks.pass_post || pass_thoughts. goes by user unlike: pass_post_all | pass_thoughts_all
      // if user has to "see all thoughts" then only users that see all thoughts pass.
      const pass_post =
        day?.unlock === "winning vote" || day?.unlock?.includes("winning vote")
          ? true
          : false;
      const pass_thoughts =
        (Array.isArray(thoughts) &&
          postingUserThoughts?.unlock === "winning vote") ||
        (Array.isArray(thoughts) &&
          postingUserThoughts?.unlock?.includes("winning vote"))
          ? true
          : false;
      const pass_moments =
        moments?.unlock === "winning vote" ||
        moments?.unlock?.includes("winning vote")
          ? true
          : false;
      const pass_fields =
        fields?.unlock === "winning vote" ||
        fields?.unlock?.includes("winning vote")
          ? true
          : false;
      const pass_greatfull =
        greatfull?.unlock === "winning vote" ||
        greatfull?.unlock?.includes("winning vote")
          ? true
          : false;

      const doAnyBallotsApplyToLock =
        (Array.isArray(ballots) &&
          ballots?.some((ballots) => ballots?.unlock === "winning vote")) ||
        null;

      // booleans. doesn't save for id the unlock doesn't care what the ID is there would only be 1 lock per topic
      submitAnyLockForPostFunc(
        day?.id,
        // not current user id it's for the voters not posting user. this is posting user i.e. {finishCustomVote} by clicking the {eyes} in i.e. <BallotDisplayBarJoindayNew/>
        vote?.user_id,
        "winning vote",
        pass_post,
        false,
        pass_thoughts,
        false,
        pass_moments,
        false,
        pass_fields,
        false,
        pass_greatfull,
        false,
        doAnyBallotsApplyToLock ? true : false,
        false,

        setUsersPassLocks
      );
    });
  };

  const finishVotesUnlockChecker = (
    currBallot: any,
    day: any,
    usersPassLocks: any,
    setUsersPassLocks: any
  ) => {
    const thoughts = day?.thoughts || null;
    const postingUserThoughts =
      Array.isArray(thoughts) &&
      thoughts?.find((thoughts) => thoughts?.thoughts?.length);
    const moments = day?.moments || null;
    const fields = day?.fields || null;
    const greatfull = day?.greatfullagain || null;
    const ballots = day?.ballots;

    const doAnyBallotsApplyToLock =
      (Array.isArray(ballots) &&
        ballots?.some((ballots) => ballots?.unlock === "submit vote")) ||
      null;
    console.log("doAnyBallotsApplyToLock", doAnyBallotsApplyToLock);
    const dayUnlock = day?.unlock;
    const thoughtUnlock = postingUserThoughts?.unlock || null;
    const momentUnlock = moments?.unlock;
    const fieldUnlock = fields?.unlock;
    const greatfullUnlock = greatfull?.unlock;

    const unlockArray: any[] = [
      dayUnlock,
      thoughtUnlock,
      momentUnlock,
      fieldUnlock,
      greatfullUnlock,
      doAnyBallotsApplyToLock,
    ];

    const doesUnlockArrayHaveTheUnlock = unlockArray?.some(
      (unlocks) => unlocks === "finish vote" || true
    );
    if (!doesUnlockArrayHaveTheUnlock) {
      return;
    }

    const doesPostPassAlready = doesPostPassThisLockAlready(
      "winning vote",
      day,
      usersPassLocks
    );
    if (doesPostPassAlready) {
      return;
    }

    unlockFunc("finish vote", "pass all", day, setUsersPassLocks);
  };

  const finishJoinDayVote = (
    currBallot: any,
    setLeaderboard: any,
    setDecision: any,
    setAlmostDoneFinishingVote: any,
    ballotIsDone: any,
    day: any,
    votes: any
  ) => {
    const filteredVotes: any[] = votes?.filter(
      (vote: any) =>
        vote?.ballot_id === currBallot?.id && vote?.day_id === day?.id
    );
    // const filteredVotes: any[] = CURR_DAY_VOTES.filter(vote => vote?.ballot_id === currBallot?.id && vote?.day_id === CURR_DAY?.id);

    type VoteCounts = { [key: string]: number };

    // console.log('filteredVotes', filteredVotes);

    const voteCounts: VoteCounts =
      filteredVotes.reduce((acc, vote) => {
        acc[vote?.vote_string] = (acc[vote?.vote_string] || 0) + 1;
        return acc;
      }, {} as VoteCounts) || null; // Ensure acc is typed correctly

    // console.log('voteCounts', voteCounts);
    if (!voteCounts) {
      // console.log("aiii with that lol")
      return;
    }

    const mostFrequentVote = Object.keys(voteCounts)?.reduce((a, b) => {
      return voteCounts[a] > voteCounts[b] ? a : b;
    });

    const mostFrequentVoteValue = voteCounts[mostFrequentVote];

    const remainingVoteCounts: VoteCounts = { ...voteCounts };
    delete remainingVoteCounts[mostFrequentVote]; // No need to convert key to number

    // Get remaining votes & sort them by count in descending order
    const sortedVotes = Object?.entries(remainingVoteCounts)?.sort(
      ([aKey, aValue], [bKey, bValue]) =>
        (bValue as number) - (aValue as number)
    );

    //    * * * * * * reminder devnotes! this decision will factor any possible
    const decisionString: string = `${mostFrequentVote} with ${mostFrequentVoteValue} votes! can check ${
      (currBallot?.type.includes("thought") && "thoughts!") ||
      (currBallot?.type.includes("moment") && "moments!") ||
      (currBallot?.type.includes("field") && "fields!!") ||
      (currBallot?.type.includes("greatfull") && "greatfull!") ||
      (currBallot?.type.includes("day") && "Day!!")
    }`;
    // console.log('decisionString', decisionString)

    // Ensure the correct extraction and parsing of the vote options
    const followingThreeRunnerUps = sortedVotes
      ?.slice(0, 3)
      ?.map(([voteString]) => voteString); // Remove parseInt if not necessary
    const leaderboardData = [mostFrequentVote, ...followingThreeRunnerUps];
    setDecision(decisionString.trim());
    setLeaderboard(leaderboardData);

    // console.log('leaderboardData', leaderboardData)

    setAlmostDoneFinishingVote(true);

    // winningVoteUnlockChecker(currBallot, leaderboardStr);

    return { decision: decisionString, leaderboard: leaderboardData };
  };

  const finishVoteAndUpdateBallotFunc = async (
    decision: any,
    leaderboard: any,
    voteOutcomesMsg: any,
    plainOrCustom: string,
    day: any,
    ballotBin: any,
    currBallot: any,
    setBallotBin: any,
    event: any,
    usersPassLocks: any,
    setUsersPassLocks: any,
    votes: any,
    setCurrWinningVotes: any,
    setCurrVotes: any,
    setBallotOptionsLikes: any,
    setBallotOptionsStars: any
  ) => {
    console.log("decision", decision);
    console.log("leaderboard", leaderboard);

    console.log("finishVoteAndUpdateBallotFunc");

    let query = "";
    if (day?.id) {
      query = finishVoteAndUpdateBallotQueryStringFunc(
        day?.id,
        currBallot?.id,
        decision,
        plainOrCustom === "custom" ? voteOutcomesMsg : null,
        leaderboard
      );
    }

    console.log("query", query);

    const predata: any = await axios.post(predataString, { query: query });
    if (!predata) {
      return null;
    }
    const data: any = predata?.data?.data?.finishVoteAndUpdateBallot;
    if (!data) {
      return null;
    }

    const dayThoughtsComments = getDayThoughtCommentsFunc(day);
    createVCB(currBallot, day, dayThoughtsComments);

    const jsonParseData = JSON.parse(data);

    if (day?.id) {
      winningVoteUnlockChecker(
        currBallot,
        leaderboard,
        day,
        usersPassLocks,
        setUsersPassLocks,
        votes
      );
      finishVotesUnlockChecker(
        currBallot,
        day,
        usersPassLocks,
        setUsersPassLocks
      );

      setBallotBin(jsonParseData);
    }
    const date = getToday("en")?.date;
    setBallotVotesLikesStars(
      ballotBin,
      jsonParseData,
      setCurrVotes,
      setBallotOptionsLikes,
      setBallotOptionsStars
    );

    // send notifications:
    if (day?.id) {
      votes?.forEach(async (item: any) => {
        // CURR_DAY_VOTES.forEach((item) => {
        const commentNotificationObject = {
          date: date,
          from_user_id: day?.user_id || null,
          from_username: day?.username || null,
          for_user_id: item?.user_id || null,
          from_app: false,
          day_id: day?.id,
          day_icon: day?.day_icon || null,
          thought_id: null,
          moment_id: null,
          field_id: null,
          invite_id: null,
          listener_id: null,
          share_Id: null,
          like_id: null,
          star_id: null,
          reaction_id: null,
          vibe_id: null,
          payment_id: null,
          prank_id: null,
          feedgame_id: null,
          message_id: null,
          report_id: null,
          user_pass_lock_id: null,
          user_allowed_to_unlock_id: null,
          ballot_id: currBallot?.id,
          custom_notification: null,
          is_read: false,
          is_request: false,
          type: voteOutcomesMsg
            ? voteOutcomesMsg
            : `results are in! ${decision}`,
        };
        const stringedNotification = JSON.stringify(commentNotificationObject);
        await notificationMaker(item?.user_id, stringedNotification);
      });
      console.log("data", data);
    }
  };

  const submitJoinDayWriteContentAndUpdateBallotFunc = (
    ballotsMediaBlobs: any,
    feed: any,
    setFeed: any,
    currBallot: any,
    // stock message for notifications
    decision: string,
    // ['winner', '2nd place of votes', '3rd place of votes', '4th place']
    leaderboard: string[] | number[] | null,
    // voteOutcomesMsg is the table.ballots.custom_decision
    voteOutcomesMsg: any,
    // local prop drilled state to go back to
    setAlmostDoneFinishingVote: any,

    day: any,
    usersPassLocks: any,
    setUsersPassLocks: any,
    currVotes: any
  ) => {
    // this will also be the "plain" function for votes with no custom_decision:

    // 8 of these as far as I see:      new/editIndex "fields" * thoughts,moments...    NEW|EDIT so 2 for each part of post + custom.

    const postingUserId = day?.user_id;
    const day_id = day?.id;
    const ballot_id = currBallot?.id;

    let writeContentType = "";

    // title | type here right now it's set for title but that will likely change.
    switch (true) {
      //  fields can be 7 or 10 max strong so it has to be 1 under max at time of vote.
      // case currBallot?.title.includes("field"):
      // submissionData = CURR_DAY_FIELDS     // was going to send the data first but querying it on the other side.
      case currBallot?.type === "joinday-newfield":
        writeContentType = "new field";
        break;
      case currBallot?.type === "joinday-newthought":
        writeContentType = "new thought";
        break;
      case currBallot?.type === "new-media-joinday-moment":
        writeContentType = "new-media-joinday-moment";
        break;
      case currBallot?.type === "new-media-joinday-soundThought":
        writeContentType = "new-media-joinday-soundThought";
        break;
      // to pick 1
      // 3 words of the day i.e. ----> "its me" ----> user votes on 3rd word: (i.e.): "biotch!"
      case currBallot?.type === "joinday-gr8-oneword":
        writeContentType = "gr8 one word";
        break;
      // 3 words of the day but the vote decides all three words (i.e.) "need more vacays" // like after family trip show pics of beach/woods-hiking
      case currBallot?.type === "joinday-gr8-threewords":
        writeContentType = "gr8 three words";
        break;
      // 🚨 🚨 not confirmed yet just quick template!
      case currBallot?.type === "joinday-gr8-onegreatfull":
        writeContentType = "gr8 one greatfull";
        break;
      // NOT RIGHT NOW! user holds vote which are 2-4 options as letters: in case of "e" winning -> consult chatGPT return array of i.e. ['extra', 'energy', 'everyday'] || i.e. ['ever', 'expect', 'everything']
      case currBallot?.type === "joinday-gr8-lettervote-threewords-ai":
        writeContentType = "gr8 lettervote threewords ai";
        break;
      case currBallot?.type === "joinday-titleday":
        writeContentType = "titleday";
        break;
      // th is typeday lol.
      // case currBallot?.type === "joinday-typeday":
      //     writeContentType = "typeday"
      //     break;
      case currBallot?.type === "joinday-pinnedcomment":
        writeContentType = "pinned comment";
        break;
      // 2-4 photos as options.
      case currBallot?.type === "pick photo": // pick profile picture
        writeContentType = "pick photo";
        break;
      default:
        writeContentType = "";
    }

    console.log("writeContentType", writeContentType);

    const query = submitJoinDayWriteContentAndUpdateBallotStringFunc(
      day?.id,
      day?.user_id,
      currBallot?.id,
      decision,
      voteOutcomesMsg,
      // voteOutcomesMsg === ("vote outcomes msg..." || !voteOutcomesMsg) ? null : voteOutcomesMsg,

      writeContentType,
      JSON.stringify(leaderboard).replace(/"/g, '\\"')
      // last field which is the data to update and depends on writeContentType
      // submissionData
    );

    console.log("query", query);

    return axios
      .post(predataString, { query: query })
      .then(async (predata) => {
        console.log("predata", predata);
        const data =
          predata?.data?.data.submitJoinDayWriteContentAndUpdateBallot;
        if (!data) {
          return;
        }
        const parsedData = JSON.parse(data);
        const updatedBallot = parsedData?.ballot || null;
        let dayClone = { ...day };
        let feedClone = [...feed];

        const updateDayCloneWithUpdatedBallot = () => {
          const dayCloneBallotIndex = day?.ballots?.findIndex(
            (b: any) => b?.id === parsedData?.id
          );
          const updatedBallot = parsedData?.ballot;
          if (dayClone.ballots[dayCloneBallotIndex]) {
            dayClone.ballots[dayCloneBallotIndex] = updatedBallot;
          }
        };

        const updateFeedWithDayClone = (dayCloneParam: any) => {
          if (feedClone?.length) {
            let feedCloneDayIndex = feedClone?.findIndex(
              (days: any) => days?.id === day?.id
            );
            feedClone[feedCloneDayIndex] = dayCloneParam;
            setFeed(feedClone);
          }
        };

        // console.log('data', data)

        // create vote comment bucket:
        const dayThoughtsComments = getDayThoughtCommentsFunc(day);
        createVCB(currBallot, day, dayThoughtsComments);

        // send notification to every user
        currVotes?.forEach((item: any) => {
          // CURR_DAY_VOTES.forEach((item) => {
          createVoteNotification(
            day,
            currBallot,
            item?.user_id,
            currBallot?.type,
            voteOutcomesMsg,
            decision
          );
        });

        if (writeContentType === "new thought") {
          console.log("we are in the new thought");

          // clone {t.days} and day.thoughts
          // let dayClone = {...day}
          // postingUserThoughts is [0] but if the user never uploaded thoughts with the post then default down
          let dayCloneThoughts = dayClone?.thoughts[0] || dayClone?.thoughts;
          // filter for day.thoughts.THOUGHTS (plural, the postingUserThoughts) ---> (self-referencing comments would be) day.thoughts.THOUGHT (singular)
          console.log("dayCloneThoughts", dayCloneThoughts);

          let dayClonePostingUserThoughts = data?.thoughts?.thoughts || [];
          // WORKS SOMEHOW!!!!
          // let dayClonePostingUserThoughts = dayCloneThoughts?.thoughts || [];
          console.log(
            "dayClonePostingUserThoughts",
            dayClonePostingUserThoughts
          ); // ['mexican', 'i think']

          // return;
          if (leaderboard) {
            // add the winning value to the front of the array.
            dayClonePostingUserThoughts?.unshift(leaderboard[0]);
            // dayCloneThoughts.thoughts = dayClonePostingUserThoughts;

            // grab the ballot by .findIndex() performing === strict equality against currBallot?.id && data?.ballot?.id

            console.log(currBallot?.id);
            // change day.thoughts to have the new thoughts.
            dayClone.thoughts.thoughts = dayClonePostingUserThoughts;

            updateDayCloneWithUpdatedBallot();
            updateFeedWithDayClone(dayClone);

            // we also need day.thoughts to show the updated ballot which has the decision (winning vote) and leaderboard. this shows that the vote completes

            // let feedClone = [...feed]
          }
        } else if (writeContentType === "new field") {
          // let dayClone = {...day}
          let dayCloneFields = dayClone?.fields;

          if (leaderboard) {
            // day.fields (table) so day.fields.fields (is the actual activity)
            dayCloneFields.fields.unshift(leaderboard[0]);
            updateDayCloneWithUpdatedBallot();
            updateFeedWithDayClone(dayClone);
          }
        } else if (writeContentType === "new-media-joinday-soundThought") {
          if (leaderboard) {
            const pathS3: string = `media/day-${day?.id}-folder/thoughts/${leaderboard[0]}`;

            const winningBlob = ballotsMediaBlobs?.find((blob: any) =>
              blob?.key?.Key?.includes(leaderboard[0])
            );

            const mimeType = getBlobFileTypeFromBlobURI(winningBlob);
            let updatedThought = parsedData.thoughts;
            updatedThought.soundthoughts = winningBlob;

            dayClone.thoughts = updatedThought;

            const presignedData = await getPresignedDataFunc(pathS3, mimeType);
            // const getPresignedDataFunc = async (path: string, fileType: string) => {

            await uploadBlobToS3WithPresignedUrl(
              presignedData?.signedUrl,
              winningBlob?.reuploadBlob,
              mimeType
            );

            updateDayCloneWithUpdatedBallot();
            updateFeedWithDayClone(dayClone);
          }
        } else if (writeContentType === "new-media-joinday-moment") {
          // const ballots
          const updatedMoment = parsedData?.moments;

          console.log("updatedMoment", updatedMoment);

          if (!updatedMoment) {
            return null;
          }

          if (leaderboard) {
            const pathS3: string = `media/day-${day?.id}-folder/moments/${leaderboard[0]}`;

            const winningBlob = ballotsMediaBlobs?.find((blob: any) =>
              blob?.key?.Key?.includes(leaderboard[0])
            );
            if (
              typeof winningBlob.blob === "string" &&
              winningBlob.blob.startsWith("data:")
            ) {
              const mimeType = getBlobFileTypeFromBlobURI(winningBlob);
              dayClone.moments = updatedMoment;
              let blobs = [...(dayClone?.moments?.BLOBs || [winningBlob.blob])];
              dayClone.moments.BLOBs = blobs;

              const presignedData = await getPresignedDataFunc(
                pathS3,
                mimeType
              );
              // const getPresignedDataFunc = async (path: string, fileType: string) => {

              await uploadBlobToS3WithPresignedUrl(
                presignedData?.signedUrl,
                winningBlob?.reuploadBlob,
                mimeType
              );

              updateDayCloneWithUpdatedBallot();
              updateFeedWithDayClone(dayClone);
            }
          }
        } else if (writeContentType === "joinday-titleday") {
          if (leaderboard) {
            parsedData.title = leaderboard[0];
            updateDayCloneWithUpdatedBallot();
            updateFeedWithDayClone(dayClone);
          }
        }

        // create VoteComment and notifications for all participating voters except yourself if the posting user voted! or send those notes and say Journall loves you!
        // 🚨 🚨 🚨 might not do the update right now. The post will update the second people look at it and reload it.
        console.log("data", data);
        // if (writeContentType.includes("field")) {
        //     const fieldBallotObj = JSON.parse(data)
        //     console.log('fieldBallotObj', fieldBallotObj)
        //     console.log('fieldBallotObj.fields', fieldBallotObj.fields)
        //     dispatch(SET_CURR_DAY_FIELDS(fieldBallotObj?.fields))
        //     dispatch(SET_CURR_DAY_BALLOT(JSON.parse(fieldBallotObj?.ballot)))
        //     return fieldBallotObj;
        // } else if (writeContentType.includes("thought")) {
        //     console.log("getting thoughts back");
        //     const thoughtBallotObj = JSON.parse(data);
        //     console.log(thoughtBallotObj?.thoughts)
        //     dispatch(SET_CURR_DAY_THOUGHTS(thoughtBallotObj))
        //     dispatch(SET_THOUGHTS_BIN(thoughtBallotObj?.thoughts))

        //     // JSON.parse or not?
        //     dispatch(CURR_DAY_BALLOT(JSON.parse(thoughtBallotObj?.ballot)))
        //     // dispatch(CURR_DAY_BALLOT(thoughtBallotObj?.ballot))

        //     const allVotes = CURR_DAY_BALLOT.flatMap(ballots => ballots?.votes);
        //     const allLikes = CURR_DAY_BALLOT.flatMap(ballots => ballots?.likes);
        //     const allStars = CURR_DAY_BALLOT.flatMap(ballots => ballots?.stars);
        //     dispatch(SET_CURR_DAY_VOTES(allVotes))
        //     dispatch(SET_CURR_DAY_BALLOT_OPTIONS_LIKES(allLikes))
        //     dispatch(SET_CURR_DAY_BALLOT_OPTIONS_STARS(allStars))
        //     return thoughtBallotObj
        // }

        // // this else block makes a new moment "header" so that if people vote on a moment the user can go out, find it, show them!
        // else if (writeContentType === "new-media-joinday-moment") {
        //     console.log("moments yuherd");
        //     const momentBallotObj = JSON.parse(data)
        //     console.log('momentBallotObj', momentBallotObj)
        //     // const ballots
        //     const updatedMoment = momentBallotObj?.moments
        //     console.log('updatedMoment', updatedMoment)
        //     if (!updatedMoment) {
        //         return null;
        //     }

        //     // moments: [unStringedLeaderboard[0], ...copyMomentHeaders], // moments is the full array
        //     dispatch(SET_CURR_DAY_BALLOT(JSON.parse(momentBallotObj?.ballot)))
        //     const allVotes = CURR_DAY_BALLOT.flatMap(ballots => ballots?.votes);
        //     const allLikes = CURR_DAY_BALLOT.flatMap(ballots => ballots?.likes);
        //     const allStars = CURR_DAY_BALLOT.flatMap(ballots => ballots?.stars);
        //     dispatch(SET_CURR_DAY_VOTES(allVotes))
        //     dispatch(SET_CURR_DAY_BALLOT_OPTIONS_LIKES(allLikes))
        //     dispatch(SET_CURR_DAY_BALLOT_OPTIONS_STARS(allStars))
        //     // check modularize. that they rewrite if so delete SET_CURR_DAY_VOTES BALLOT_OPTIONS_LIKES, BALLOT_OPTIONS_STARS.
        //     // resetBallotsLikesVotesStarsState(ballot)

        //     return updatedMoment;
        // }
        // else if (writeContentType === "new-media-joinday-soundThought") {
        //     console.log('writeContentType === new-media-joinday-soundThought')
        //     const thoughtBallotObj = JSON.parse(data);
        //     console.log('thoughtBallotObj', thoughtBallotObj)
        //     const updatedThought = thoughtBallotObj?.thoughts;
        //     console.log('updatedThought', updatedThought)
        //     const ballot = JSON.parse(thoughtBallotObj?.ballot)
        //     console.log('ballot', ballot)
        //     console.log('updatedThought', updatedThought)
        //     // let postingUserThoughts = updatedThought?.filter(thought => thought?.thoughts?.length)
        //     // console.log('postingUserThoughts', postingUserThoughts)

        //     resetBallotsLikesVotesStarsState(ballot)
        //     if (updatedThought) {
        //         dispatch(SET_CURR_DAY_THOUGHTS(updatedThought))
        //         dispatch(SET_THOUGHTS_BIN(updatedThought?.thoughts))
        //         // dispatch(SET_THOUGHTS_BIN(updatedThought[0]?.thoughts))
        //     }
        //     return updatedThought;
        // }
        // // handle the vote that writes to {model greatfullagain}
        // else if (writeContentType.includes("gr8")) {
        //     // writes to greatfullagain.words ("3 words of the day") posting-user held vote to write 1 or three of those words.
        //     if (writeContentType === "gr8-oneword" || writeContentType === "gr8-3words") {
        //         const greatfullBallotObj = JSON.parse(data);
        //         const greatfull = greatfullBallotObj?.greatfull
        //         if (!greatfull) {
        //             return;
        //         }
        //         dispatch(SET_CURR_DAY_BALLOT(JSON.parse(greatfullBallotObj?.ballot)))
        //         dispatch(SET_CURR_DAY_GREATFULL(greatfull))
        //     }
        // }
        // else if (writeContentType.includes("titleday")) {
        //     const dayBallotObj = JSON.parse(data);
        //     console.log('dayBallotObj', dayBallotObj)
        //     const day = dayBallotObj?.days;
        //     const ballot = dayBallotObj?.ballot;
        //     console.log('ballot', ballot)
        //     dispatch(SET_CURR_DAY(day))
        //     dispatch(SET_CURR_DAY_BALLOT(JSON.parse(ballot)))
        // }

        winningVoteUnlockChecker(
          currBallot,
          currBallot?.leaderboard,
          day,
          usersPassLocks,
          setUsersPassLocks,
          currVotes
        );
        finishVotesUnlockChecker(
          currBallot,
          day,
          usersPassLocks,
          setUsersPassLocks
        );
        setAlmostDoneFinishingVote(false);

        // take user back to mainpart of vote so undo voteAlmostFinished()
        // custom_decision||decision (if exists) restricts the flag.
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const finishCommentVoteAndUpdateBallotFunc = async (
    decision: any,
    leaderboard: any,
    voteOutcomesMsg: any,
    plainOrCustom: string,
    day: any,
    ballotBin: any,
    currBallot: any,
    setBallotBin: any,
    event: any,
    usersPassLocks: any,
    setUsersPassLocks: any,
    votes: any,
    setCurrWinningVotes: any,
    setCurrVotes: any,
    setBallotOptionsLikes: any,
    setBallotOptionsStars: any
  ) => {
    let query = "";
    if (day?.id) {
      query = updateBestCommentDecisionQueryStringFunc(
        day?.id,
        currBallot?.id,
        decision,
        plainOrCustom === "custom" ? voteOutcomesMsg : null,
        leaderboard,
        currBallot?.vote_type?.includes("pinned") ? true : false
      );

      const predata: any = await axios.post(predataString, { query: query });
      // const predata: any = await axios.post("http://localhost:4000/api/graphql", { query: query })
      if (!predata) {
        return null;
      }
      const data: any = predata?.data?.data?.updateBestCommentDecision;
      if (!data) {
        return null;
      }

      const dayThoughtsComments = getDayThoughtCommentsFunc(day);
      createVCB(currBallot, day, dayThoughtsComments);

      const jsonParseData = JSON.parse(data);
      let parsedBallots = JSON.parse(jsonParseData?.ballots);
      console.log("jsonParseData", jsonParseData);

      const date = getToday("en")?.date;

      votes?.forEach(async (item: any) => {
        // CURR_DAY_VOTES.forEach((item) => {
        const commentNotificationObject = {
          date: date,
          from_user_id: day?.user_id || null,
          from_username: day?.username || null,
          for_user_id: item?.user_id || null,
          from_app: false,
          day_id: day?.id,
          day_icon: day?.day_icon || null,
          thought_id: null,
          moment_id: null,
          field_id: null,
          invite_id: null,
          listener_id: null,
          share_Id: null,
          like_id: null,
          star_id: null,
          reaction_id: null,
          vibe_id: null,
          payment_id: null,
          prank_id: null,
          feedgame_id: null,
          message_id: null,
          report_id: null,
          user_pass_lock_id: null,
          user_allowed_to_unlock_id: null,
          ballot_id: currBallot?.id,
          custom_notification: null,
          is_read: false,
          is_request: false,
          type: voteOutcomesMsg
            ? voteOutcomesMsg
            : `results are in! ${decision}`,
        };
        const stringedNotification = JSON.stringify(commentNotificationObject);
        await notificationMaker(item?.user_id, stringedNotification);
      });

      winningVoteUnlockChecker(
        currBallot,
        leaderboard,
        day,
        usersPassLocks,
        setUsersPassLocks,
        votes
      );
      finishVotesUnlockChecker(
        currBallot,
        day,
        usersPassLocks,
        setUsersPassLocks
      );

      setBallotBin(parsedBallots);

      return { ballots: parsedBallots, comment: jsonParseData?.updatedComment };
    }
  };

  const starVotesUnlockChecker = (
    day: any,
    usersPassLocks: any,
    setUsersPassLocks: any
  ) => {
    const thoughts = day?.thoughts || null;
    const moments = day?.moments || null;
    const fields = day?.fields || null;
    const greatfull = day?.greatfullagain || null;
    const postingUserThoughts =
      thoughts?.find((thoughts: any) => thoughts?.thoughts?.length) || null;
    const ballots = day?.ballots;

    const didPass = didUserPassThisLockAlready("star vote", usersPassLocks);
    console.log("didPass", didPass);
    if (didPass) {
      return null;
    }

    const doAnyBallotsApplyToLock =
      (Array.isArray(ballots) &&
        ballots?.some((ballots) => ballots?.unlock === "star vote")) ||
      null;
    console.log("doAnyBallotsApplyToLock", doAnyBallotsApplyToLock);
    const dayUnlock = day?.unlock;
    const thoughtUnlock = postingUserThoughts?.unlock || null;
    const momentUnlock = moments?.unlock;
    const fieldUnlock = fields?.unlock;
    const greatfullUnlock = greatfull?.unlock;

    const unlockArray: any[] = [
      dayUnlock,
      thoughtUnlock,
      momentUnlock,
      fieldUnlock,
      greatfullUnlock,
      doAnyBallotsApplyToLock,
    ];

    const doesUnlockArrayhaveTheUnlock = unlockArray?.some(
      (unlocks) => unlocks === "star vote" || unlocks === true
    );
    if (doesUnlockArrayhaveTheUnlock) {
      // lock is in there but check if duplicate first.
      const didPass = didUserPassThisLockAlready("star vote", usersPassLocks);
      if (didPass) {
        console.log("how do we end up in here");
        return;
      }
      unlockFunc("star vote", "pass user", day, setUsersPassLocks);
    }
  };

  const userRatesBallotOptionFunc = async (
    mapitem: any,
    voteOrProposedVote: string,
    currBallot: any,
    starClickedIndex: number,
    day: any,
    event: any,
    usersPassLocks: any,
    setUsersPassLocks: any,
    setBallotOptionsStars: any
  ) => {
    let userSubmittedOptionsUserArray =
      currBallot?.user_submitted_options_user_array || [];

    if (voteOrProposedVote === "vote") {
      // day_id:number, ballot_id:number, ballot_option:string, user_id:number, username:string, icon:string|null, stars:number
      let query = "";
      if (day?.id) {
        query = userRatesBallotOptionQueryStringFunc(
          day?.id,
          currBallot?.id,
          mapitem,
          CURRENT_USER?.id,
          CURRENT_USER?.username,
          CURRENT_USER?.icon,
          starClickedIndex + 1
        );
      }
      if (event?.id) {
        query = userRatesBallotOptionQueryStringFunc(
          event?.id,
          currBallot?.id,
          mapitem,
          CURRENT_USER?.id,
          CURRENT_USER?.username,
          CURRENT_USER?.icon,
          starClickedIndex + 1
        );
      }
      // userRatesBallotOptionEventQueryStringFunc

      return await axios
        .post(predataString, { query: query })
        // return await axios.post("http://localhost:4000/api/graphql", { query: query })
        .then((predata) => {
          console.log("predata", predata);
          const data = predata?.data?.data?.userRatesBallotOption;

          if (!data) {
            return null;
          }
          let starsData;
          if (day?.id) {
            starsData = data?.filter(
              (stars: any) =>
                stars?.day_id === day?.id && stars?.ballot_id === currBallot?.id
            );
          }
          if (event?.id) {
            starsData = data?.filter(
              (stars: any) =>
                stars?.event_id === event?.id &&
                stars?.ballot_id === currBallot?.id
            );
          }
          // const starsData = data?.filter(stars => stars?.day_id === day?.id && stars?.ballot_id === currBallot?.id)
          setBallotOptionsStars(starsData);
          starVotesUnlockChecker(day, usersPassLocks, setUsersPassLocks);
          console.log("data", data);
          return data;
        })
        .catch((error) => {
          console.log("error", error);
        });
    } else if (voteOrProposedVote === "proposedVote") {
      // the user is sumiting proposed vote which is tracked with ballots.user_submitted_options_user_array
      console.log("something");

      let indexOfUserArray = 0;
      const findUsersArrayIndex = userSubmittedOptionsUserArray?.find(
        (option: any, index: number) => {
          const [userId, vote] = option?.split("-");
          if (vote === mapitem) {
            indexOfUserArray = index;
          }
        }
      );
      console.log("indexOfUserArray", indexOfUserArray);

      // const query = userLikesProposedBallotOptionQueryStringFunc(CURR_DAY?.id, currBallot?.id, CURRENT_USER?.id, indexOfUserArray)
      const query = userRatesProposedBallotOptionQueryStringFunc(
        day?.id,
        currBallot?.id,
        indexOfUserArray,
        CURRENT_USER?.id,
        CURRENT_USER?.username,
        CURRENT_USER?.icon,
        starClickedIndex + 1
      );

      return await axios
        .post(predataString, { query: query })
        // return await axios.post('http://localhost:4000/api/graphql', { query: query })
        .then((predata) => {
          console.log("predata", predata);
          if (!predata) {
            return null;
          }

          const data = predata?.data?.data?.userRatesProposedBallotOption;
          if (!data) {
            return null;
          }
          console.log("data", data);
          // dont filter for this mapitem just update all of them filter during click!
          // const likeData = data?.filter(likes => likes?.forEach(likes => likes?.day_id === CURR_DAY?.day_id && likes?.ballot_id === currBallot?.id))
          const starsData = data?.filter(
            (stars: any) =>
              stars?.day_id === day?.id && stars?.ballot_id === currBallot?.id
          );
          setBallotOptionsStars(starsData);
          return starsData;
          console.log("starsData", starsData);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  };

  const isUserSubmittedOptionApprovedText = (mapitem: any, currBallot: any) => {
    const userSubmittedOptionsUserArray =
      currBallot?.user_submitted_options_user_array;
    let userSubmittedOptionsIsApprovedArray =
      currBallot?.user_submitted_options_is_approved_array;

    if (
      currBallot?.user_submitted_options_need_approval === false &&
      currBallot?.hide_waiting_on_approval_votes === false
    ) {
      return null;
    }

    // Find the user-submitted option that matches the mapitem
    const foundOption =
      userSubmittedOptionsUserArray?.find((option: any) => {
        const [userId, vote] = option.split("-");
        return mapitem === vote; // Return the option if it matches mapitem
      }) || null;

    if (foundOption) {
      const foundIndex = userSubmittedOptionsUserArray?.indexOf(foundOption);
      const isApproved = userSubmittedOptionsIsApprovedArray[foundIndex];

      if (isApproved === true) {
        return {
          userId: parseInt(foundOption.split("-")[0]),
          isApproved: true,
        };
      } else if (isApproved === false) {
        return {
          userId: parseInt(foundOption.split("-")[0]),
          isApproved: false,
        };
      } else {
        return {
          userId: parseInt(foundOption.split("-")[0]),
          isApproved: null,
        };
      }
    } else {
      return { userId: null, isApproved: null };
    }
  };

  const likeVotesUnlockChecker = (
    day: any,
    usersPassLocks: any,
    setUsersPassLocks: any
  ) => {
    const thoughts = day?.thoughts;
    const moments = day?.moments;
    const postingUserThoughts =
      Array.isArray(thoughts) &&
      thoughts?.find((thoughts) => thoughts?.thoughts?.length);
    const fields = day?.fields;
    const greatfull = day?.greatfullagain;
    const ballots = day?.ballots;

    console.log("ballots right here!", ballots);
    const didPass = didUserPassThisLockAlready("like vote", usersPassLocks);
    console.log("didPass", didPass);
    if (didPass) {
      return null;
    }

    const doAnyBallotsApplyToLock =
      (Array.isArray(ballots) &&
        ballots?.some((ballots) => ballots?.unlock === "like vote")) ||
      null;
    console.log("doAnyBallotsApplyToLock", doAnyBallotsApplyToLock);
    const dayUnlock = day?.unlock;
    const thoughtUnlock = postingUserThoughts?.unlock || null;
    const momentUnlock = moments?.unlock;
    const fieldUnlock = fields?.unlock;
    const greatfullUnlock = greatfull?.unlock;

    const unlockArray: any[] = [
      dayUnlock,
      thoughtUnlock,
      momentUnlock,
      fieldUnlock,
      greatfullUnlock,
      doAnyBallotsApplyToLock,
    ];

    const doesUnlockArrayhaveTheUnlock = unlockArray?.some(
      (unlocks) => unlocks === "like vote" || true
    );
    if (doesUnlockArrayhaveTheUnlock) {
      // lock is in there but check if duplicate first.
      const didPass = didUserPassThisLockAlready("like vote", usersPassLocks);
      if (didPass) {
        console.log("how do we end up in here");
        return;
      }

      unlockFunc("like vote", "pass user", day, setUsersPassLocks);
    }
  };

  const likeVoteOption = async (
    mapitem: any,
    voteOrProposedVote: string,
    currBallot: any,
    day: any,
    event: any,
    setBallotOptionsLikes: any,
    usersPassLocks: any,
    setUsersPassLocks: any
  ) => {
    console.log("pushing the button");
    // probably applying to all votes but might just be custom vote:
    const ballotOptions = currBallot?.options;
    let userSubmittedOptionsUserArray =
      currBallot?.user_submitted_options_user_array || [];
    if (voteOrProposedVote === "vote") {
      console.log("hey we got a regular vote dude");
      // vote is already a vote and part of options. prevent duplicates:
      let didCurrentUserLikeOptionAlready;
      console.log("mapitem", mapitem);
      console.log("ballotOptions", ballotOptions);
      let query = "";
      if (day?.id) {
        query = userLikesActualBallotOptionQueryStringFunc(
          day?.id || null,
          currBallot?.id,
          CURRENT_USER?.id,
          CURRENT_USER?.username,
          CURRENT_USER?.icon,
          mapitem
        );
      } else if (event?.id) {
        query = userLikesActualBallotOptionEventQueryStringFunc(
          event?.id || null,
          currBallot?.id,
          CURRENT_USER?.id,
          CURRENT_USER?.username,
          CURRENT_USER?.icon,
          mapitem
        );
      }
      // const query = userLikesActualBallotOptionQueryStringFunc(CURR_DAY?.id || null, currBallot?.id, CURRENT_USER?.id, CURRENT_USER?.username, CURRENT_USER?.icon, mapitem)
      console.log("query", query);

      return await axios
        .post(predataString, { query: query })
        // await axios.post('http://localhost:4000/api/graphql', { query: query })
        .then((predata) => {
          console.log("predata", predata);
          if (!predata) {
            return null;
          }
          const data = predata?.data?.data?.userLikesActualBallotOption;
          if (!data) {
            return null;
          }
          console.log("data", data);
          // const likeData = data?.filter(likes => likes?.day_id === CURR_DAY?.id && likes?.ballot_id === currBallot?.id)
          const likeData = data?.filter(
            (likes: any) =>
              (likes?.day_id === day?.id || likes?.event_id === event?.id) &&
              likes?.ballot_id === currBallot?.id
          );
          if (day?.id) {
            // dispatch(SET_CURR_DAY_BALLOT_OPTIONS_LIKES(likeData))

            likeVotesUnlockChecker(day, usersPassLocks, setUsersPassLocks);

            console.log("likeData", likeData);
          }
          if (event?.id) {
            // likeVotesUnlockCheckerEvent(day, usersPassLocks, setUsersPassLocks)
            // dispatch(SET_CURR_EVENT_BALLOT_OPTIONS_LIKES(likeData))
          }
          setBallotOptionsLikes(likeData);
          // const likeData = data?.filter(likes => likes?.event_id === CURR_DAY?.id && likes?.ballot_id === currBallot?.id)
        })
        .catch((error) => {
          console.log("error", error);
        });
    } else if (voteOrProposedVote === "proposedVote") {
      console.log("got that proposed vote you heard!");
      // day_id:number, ballot_id:number, liked_by_id:number, ballot_options_text: number
      // ballot_user_submitted_options_users_array_idx
      console.log("mapitem", mapitem);
      let indexOfUserArray = 0;
      const findUsersArrayIndex = userSubmittedOptionsUserArray?.find(
        (option: any, index: number) => {
          const [userId, vote] = option?.split("-");
          if (vote === mapitem) {
            indexOfUserArray = index;
          }
        }
      );
      console.log("indexOfUserArray", indexOfUserArray);
      const query = userLikesProposedBallotOptionQueryStringFunc(
        day?.id,
        currBallot?.id,
        CURRENT_USER?.id,
        CURRENT_USER?.username,
        CURRENT_USER?.icon,
        indexOfUserArray
      );

      await axios
        .post(predataString, { query: query })
        // await axios.post('http://localhost:4000/api/graphql', { query: query })
        .then(async (predata) => {
          console.log("predata", predata);
          if (!predata) {
            return null;
          }
          const data = predata?.data?.data?.userLikesActualBallotOption;
          if (!data) {
            return null;
          }
          console.log("data", data);
          // dont filter for this mapitem just update all of them filter during click!
          // const likeData = data?.filter(likes => likes?.forEach(likes => likes?.day_id === CURR_DAY?.day_id && likes?.ballot_id === currBallot?.id))
          const likeData = data?.filter(
            (likes: any) =>
              likes?.day_id === day?.id && likes?.ballot_id === currBallot?.id
          );
          const likeDataDay = likeData?.some((likes: any) => likes?.day_id);
          const likeDataEvent = likeData?.some((likes: any) => likes?.event_id);
          if (!likeData) {
            return null;
          }
          if (likeDataDay) {
            setBallotOptionsLikes(likeData);
          } else if (likeDataEvent) {
            setBallotOptionsLikes(likeData);
          }
          // await dispatch(SET_CURR_DAY_BALLOT_OPTIONS_LIKES(likeData))
          console.log("likeData", likeData);
        })
        .catch((error) => {
          console.log("error", error);
        });
      // find index and update
    } else {
      return;
    }
  };

  const updateSubmittedBallotOptionsAndUserArrayFunc = (
    day_id: number,
    ballot_id: number,
    options: string,
    user_submitted_options_user_array: string,
    user_submitted_options_is_approved_array: string | null
  ) => {
    const query = updateSubmittedBallotOptionsAndUserArrayQueryStringFunc(
      day_id,
      ballot_id,
      options,
      user_submitted_options_user_array,
      user_submitted_options_is_approved_array
    );
    return axios
      .post(predataString, { query: query })
      .then((predata) => {
        console.log("predata", predata);
        return predata;
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const submitUserSubmittedOption = async (
    currBallot: any,
    didCurrentUserVote: any,
    // ⚠️ ⚠️ ⚠️ on media votes the userSubmittedOptionsInputValue is the mapitem.key.key (S3/cloudfront object key)
    userSubmittedOptionsInputValue: any,
    setUserSubmittedOptionsInputValue: any,
    setDidUserSubmit: any,
    day: any,
    setBallotBin: any
  ) => {
    console.log(
      "userSubmittedOptionsInputValue from function:",
      userSubmittedOptionsInputValue
    );

    // handle anonymous_votes or invited_votes too! or that would be done at the button.
    // anonymous_votes_ok || voterCanDetermine

    // check user_submitted_options_user_array to prevent duplicate submissions before proceeding with below logic which submits.
    // handle locks if only 10 are allowed then the user has to approve them before they count for the total.
    let hideWaitingApprovalVotes = currBallot?.hide_waiting_on_approval_votes;
    const userSubmittedOptionsUserArray =
      currBallot?.user_submitted_options_user_array;
    let userSubmittedOptionsIsApprovedArray =
      currBallot?.user_submitted_options_is_approved_array;

    const userIdAndThought = `${CURRENT_USER?.id}-${userSubmittedOptionsInputValue}`;

    let options = currBallot?.options;

    // add the input data to the current options list which prevents server-side requery to find this information.
    // for ballots.options
    const newOptions = [...options, userSubmittedOptionsInputValue];
    // const newOptions = [...options, userSubmittedOptionsInputValue];

    // for ballots.user_submitted_options_user_array
    const newUserArray = [...userSubmittedOptionsUserArray, userIdAndThought];

    if (currBallot?.hide_waiting_on_approval_votes) {
      // if option apprv. it's kinda no longer a submitted option just a regular vote. still track it but below handles show_waiting_apprved votes
      userSubmittedOptionsIsApprovedArray = [
        ...userSubmittedOptionsIsApprovedArray,
        false,
      ];
    }

    // return;

    const replacedNewOptions = JSON.stringify(newOptions).replace(/"/g, '\\"');
    console.log("replacedNewOptions", replacedNewOptions);

    const predata: any = await updateSubmittedBallotOptionsAndUserArrayFunc(
      day?.id,
      currBallot?.id,
      JSON.stringify(newOptions).replace(/"/g, '\\"'),
      JSON.stringify(newUserArray).replace(/"/g, '\\"'),
      // if hideWaitingApprovalVotes is true then only posting user can see the proposed vote. so send the array. if hideWaiting votes is false then send it null because all users can see proposed votes.
      userSubmittedOptionsIsApprovedArray
        ? JSON.stringify(userSubmittedOptionsIsApprovedArray)?.replace(
            /"/g,
            '\\"'
          )
        : null
      // hideWaitingApprovalVotes || null
    );

    // if return value is null then error handle & return;
    if (!predata) {
      // * * * * * reminder devnotes error handling
      return null;
    }
    //
    console.log("predata", predata);
    const data =
      predata?.data?.data?.updateUserSubmittedBallotOptionsAndUserArray;
    if (!data) {
      // * * * * * reminder devnotes error handle. SET_CURR_DAY_BALLOT_ERROR
      return null;
    }
    const unstringedBallotData = JSON.parse(data);
    setUserSubmittedOptionsInputValue("");
    setDidUserSubmit(true);
    setBallotBin(unstringedBallotData);
    // dispatch(SET_CURR_DAY_BALLOT(unstringedBallotData));
    return unstringedBallotData;
  };

  const submitCommentVote = async (
    day_id: number,
    ballot_id: number,
    user_id: number,
    username: string,
    user_profile_icon: string,
    vote_int: number,
    vote_type: string,
    vote_string: string
  ) => {
    console.log("this might be my favorite part");

    // (user_id:number,day_id:number,ballot_id:number,vote_int:number,vote_type:number) => {
    const query = submitCommentVoteQueryStringFunc(
      user_id,
      username,
      user_profile_icon,
      day_id,
      ballot_id,
      vote_int,
      vote_type,
      vote_string
    );
    console.log("query", query);
    const allVotesAfterSubmittingVotes = await axios.post(predataString, {
      query: query,
    });
    // const allVotesAfterSubmittingVotes = await axios.post('http://localhost:4000/api/graphql', { query: query })
    if (!allVotesAfterSubmittingVotes) {
      console.log("allVotesAfterSubmittingVotes", allVotesAfterSubmittingVotes);
    }

    // allVotes retrieved after submitting, time to setState() so all votes are accessible so everyone can participate in ballot / vote.
    // const data = allVotesAfterSubmittingVotes?.data?.data.submitCommentVote
    if (!allVotesAfterSubmittingVotes) {
      return "no data";
    }
    return allVotesAfterSubmittingVotes;
  };

  const submitVoteUnlockChecker = (
    day: any,
    usersPassLocks: any,
    setUsersPassLocks: any
  ) => {
    const thoughts = day?.thoughts || null;
    const moments = day?.moments || null;
    const fields = day?.fields || null;
    const greatfull = day?.greatfullagain || null;
    const ballots = day?.ballots;
    const postingUserThoughts =
      Array.isArray(thoughts) && thoughts?.find((t) => t?.thoughts?.length);
    const didPass = didUserPassThisLockAlready("submit vote", usersPassLocks);
    console.log("didPass", didPass);
    if (didPass) {
      return null;
    }

    const doAnyBallotsApplyToLock =
      (Array.isArray(ballots) &&
        ballots?.some((ballots) => ballots?.unlock === "submit vote")) ||
      null;
    console.log("doAnyBallotsApplyToLock", doAnyBallotsApplyToLock);
    const dayUnlock = day?.unlock;
    const thoughtUnlock = postingUserThoughts?.unlock || null;
    const momentUnlock = moments?.unlock;
    const fieldUnlock = fields?.unlock;
    const greatfullUnlock = greatfull?.unlock;

    const unlockArray: any[] = [
      dayUnlock,
      thoughtUnlock,
      momentUnlock,
      fieldUnlock,
      greatfullUnlock,
      doAnyBallotsApplyToLock,
    ];

    const doesUnlockArrayhaveTheUnlock = unlockArray?.some(
      (unlocks) => unlocks === "submit vote" || true
    );
    if (doesUnlockArrayhaveTheUnlock) {
      // lock is in there but check if duplicate first.
      const didPass = didUserPassThisLockAlready("submit vote", usersPassLocks);
      if (didPass) {
        console.log("how do we end up in here");
        return;
      }
      unlockFunc("submit vote", "pass user", day, setUsersPassLocks);
    }
  };

  const submitJoinDayVote = (
    day_id: number,
    ballot_id: number,
    user_id: number,
    username: string,
    user_profile_icon: string,
    vote_string: string | null,
    vote_type: string
  ) => {
    // (day_id:number, ballot_id:number, user_id:number, username:string, user_profile_icon:string, vote_string:string, vote_type:string)
    const query = submitJoinDayVoteQueryStringFunc(
      day_id,
      ballot_id,
      user_id,
      username,
      user_profile_icon,
      vote_string,
      vote_type
    );

    return axios
      .post(predataString, { query: query })
      .then((data) => {
        console.log("data", data);
        if (data) {
          return data;
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const submitVote = async (
    day_id: number,
    ballot_id: number,
    user_id: number,
    username: string,
    user_profile_icon: string,
    vote_string: string | null,
    vote_type: string,
    non_anonymous: boolean | null,
    is_option: boolean | null
  ) => {
    // (day_id:number, ballot_id:number, user_id:number, username:string, user_profile_icon:string, vote_string:string, vote_type:string)
    const query = submitVoteQueryStringFunc(
      day_id,
      ballot_id,
      user_id,
      username,
      user_profile_icon,
      vote_string,
      vote_type,
      non_anonymous,
      is_option
    );

    return await axios
      .post(predataString, { query: query })
      // return axios.post('http://localhost:4000/api/graphql', { query: query })
      .then((data) => {
        console.log("data", data);
        if (data) {
          return data;
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const postingUserApprovesProposedVote = (
    mapitem: any,
    currBallot: any,
    dayId: any
  ) => {
    let userSubmittedOptionsUserArray =
      currBallot?.user_submitted_options_user_array || [];
    let userSubmittedOptionsIsApprovedArray: any =
      currBallot?.user_submitted_options_is_approved_array || []; // any: boolean[] || string
    // let userSubmittedOptionsUserArray = [...currBallot?.user_submitted_options_user_array] || [];
    // let userSubmittedOptionsIsApprovedArray: any = [...currBallot?.user_submitted_options_is_approved_array] || [];   // any: boolean[] || string

    interface proposedVote {
      proposedVote: string;
      index: number;
    }
    let foundVote: proposedVote = { proposedVote: "", index: 0 };

    // get the vote to check by string and then the index to update ballots.user_submitted_options_is_approved_array by that index from false to true.
    const loopAndPush = () => {
      let findItem = "";
      const blobKey = mapitem?.key?.key;
      console.log("blobKey", blobKey);
      console.log("mapitem", mapitem);

      if (mapitem?.key?.key) {
        console.log(
          "mapitem?.key?.key in the deleteUserSubmittedVotButLeaveRecordOfSubmissionFunc"
        );
        userSubmittedOptionsUserArray?.filter((item: any, index: number) => {
          console.log("item", item);
          const [userId, vote] = item?.split("-");
          if (vote === mapitem || blobKey?.includes(vote)) {
            console.log(`gottit: mapitem: ${mapitem} item: ${item}`);
            // keep the vote so after the vote people could see proposed options.
            foundVote = { proposedVote: vote, index: index };
            userSubmittedOptionsIsApprovedArray[index] = true;
          }
        });
      } else {
        userSubmittedOptionsUserArray?.find((option: any, index: any) => {
          const [userId, vote] = option?.split("-");
          if (mapitem === vote) {
            foundVote = { proposedVote: vote, index: index };
            userSubmittedOptionsIsApprovedArray[index] = true;
          }
        });
      }
    };

    console.log(
      "userSubmittedOptionsIsApprovedArray",
      userSubmittedOptionsIsApprovedArray
    );
    const updateDB = (dayId: any) => {
      const query = postingUserApprovesProposedVoteQueryStringFunc(
        dayId,
        currBallot?.id,
        JSON.stringify(userSubmittedOptionsIsApprovedArray).replace(/"/g, '\\"')
      );
      return axios
        .post(predataString, { query: query })
        .then((predata) => {
          console.log("predata", predata);
          return predata;
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    const loopPushUpdate = async () => {
      await loopAndPush();
      return updateDB(dayId);
    };
    return loopPushUpdate();
  };

  const isUserSubmittedOptionApprovedMedia = (
    mapitem: any,
    currBallot: any
  ) => {
    const userSubmittedOptionsUserArray =
      currBallot?.user_submitted_options_user_array || [];
    const userSubmittedOptionsIsApprovedArray =
      currBallot?.user_submitted_options_is_approved_array || [];
    const hideWaitingApprovalVotes = currBallot?.hide_waiting_on_approval_votes;

    // console.log('mapitem', mapitem);

    console.log("we get here");

    if (
      currBallot?.user_submitted_options_need_approval === false &&
      hideWaitingApprovalVotes === false
    ) {
      return null;
    }

    const blobKey = mapitem?.key?.key;
    console.log("blobKey", blobKey);
    if (!blobKey) return;

    // ✅ simplified: match last dash piece only for readability
    const blobKeyAfter = blobKey.split("-").pop();

    // find the matching option (user_id + vote string)
    const foundOption = userSubmittedOptionsUserArray?.find(
      (option: string) => {
        const [userId, ...rest] = option.split("-");
        const vote = rest.join("-"); // joins everything after the first dash
        return blobKey.includes(vote);
      }
    );

    if (foundOption) {
      const foundIndex = userSubmittedOptionsUserArray.indexOf(foundOption);
      const isApproved = userSubmittedOptionsIsApprovedArray[foundIndex];

      // ✅ consistently parse userId only once using rest.join
      const [userIdStr] = foundOption.split("-");
      const userId = parseInt(userIdStr, 10);

      if (isApproved === true) {
        return { userId, isApproved: true };
      } else if (isApproved === false) {
        return { userId, isApproved: false };
      } else {
        return { userId, isApproved: null };
      }
    } else {
      return { userId: null, isApproved: null };
    }
  };

  const deleteVote = async (
    ballot_id: number,
    vote_id: number,
    day_id: number
  ) => {
    const query = `mutation {
            deleteVote(
                ballot_id: ${ballot_id},
                vote_id: ${vote_id},
                day_id: ${day_id},
                
            ) {
               id, user_id, username, user_profile_icon, day_id, ballot_id, vote_int, vote_type, vote_string,
               non_anonymous, is_option
            }
        }`;
    console.log("query", query);

    return (
      axios
        .post(predataString, { query: query })
        // return axios.post('http://localhost:4000/api/graphql', { query: query })
        .then((predata) => {
          if (!predata) {
            console.log("hey no predata guys");
            return;
          }
          return predata;
        })
        .catch((error) => {
          console.log("error", error);
        })
    );
  };

  const deleteCommentVote = async (
    vote_id: number,
    vote_int: number,
    vote_type: string,
    day_id: number,
    ballot_id: number,
    user_id: number
  ) => {
    if (!vote_id) {
      console.log("missing a thumb here!");
      return null;
    }
    const query = deleteCommentVoteQueryStringFunc(
      vote_id,
      vote_int,
      vote_type,
      day_id,
      ballot_id,
      user_id
    );
    console.log("query", query);

    const allVotesAfterDeletingVotes = await axios.post(predataString, {
      query: query,
    });

    console.log("allVotesAfterDeletingVotes", allVotesAfterDeletingVotes);

    if (!allVotesAfterDeletingVotes) {
      return null;
    }
    return allVotesAfterDeletingVotes;
  };

  const deleteUserSubmittedVoteButLeaveRecordOfSubmissionFunc = (
    mapitem: any,
    currBallot: any,
    dayId: any,
    setError: any
  ) => {
    console.log("mapitem", mapitem);
    let ballotOptions = [...currBallot?.options];
    console.log("ballotOptions", ballotOptions);
    let userSubmittedOptionsUserArray: any =
      currBallot?.user_submitted_options_user_array || [];
    // let userSubmittedOptionsUserArray:any = [...currBallot?.user_submitted_options_user_array] || [];

    let userSubmittedOptionsIsApprovedArray: any =
      currBallot?.user_submitted_options_is_approved_array || []; // any: boolean[] || string
    let hideWaitingApprovalVotes = currBallot?.hide_waiting_on_approval_votes;
    let removeItem;

    // filter so  delete option from t.ballots.options which is the pool of string data from which UI renders the available votes as JSX
    const loopAndPush = () => {
      ballotOptions = ballotOptions?.filter((options) => options !== mapitem);
      console.log("removeItem", removeItem);

      // user_submitted_options_user_array[i] corresponds to: user_submitted_options_is_approved_array[i] CANT DELETE! have to update as 'userid-deleted' instead of 'userid-taquitos' also to prevent duplicates so user can't keep proposing votes after one gets deleted.

      const blobKey = mapitem?.key?.key;

      if (mapitem?.key?.key) {
        console.log(
          "mapitem?.key?.key in the deleteUserSubmittedVotButLeaveRecordOfSubmissionFunc"
        );
        userSubmittedOptionsUserArray?.filter((item: any, index: number) => {
          console.log("item", item);
          const [userId, vote] = item?.split("-");
          if (vote === mapitem || blobKey?.includes(vote)) {
            console.log(`gottit: mapitem: ${mapitem} item: ${item}`);
            // keep the vote so after the vote people could see proposed options.
            userSubmittedOptionsUserArray[index] = `${userId}-deleted-${vote}`;
          }
        });
      } else {
        userSubmittedOptionsUserArray?.filter((item: any, index: number) => {
          console.log("item", item);
          const [userId, vote] = item?.split("-");
          if (vote === mapitem) {
            console.log(`gottit: mapitem: ${mapitem} item: ${item}`);
            // keep the vote so after the vote people could see proposed options.
            userSubmittedOptionsUserArray[index] = `${userId}-deleted-${vote}`;
          }
        });
      }
    };
    const updateDB = async (dayId: any) => {
      console.log("ballotOptions", ballotOptions);
      const query =
        deleteUserSubmittedVoteButLeaveRecordOfSubmissionQueryStringFunc(
          dayId,
          currBallot?.id,
          JSON.stringify(ballotOptions).replace(/"/g, '\\"'),
          JSON.stringify(userSubmittedOptionsUserArray).replace(/"/g, '\\"')
        );
      // console.log(query)
      return await axios
        .post(predataString, { query: query })
        // return axios.post("http://localhost:4000/api/graphql", { query: query })
        .then((predata) => {
          console.log("predata", predata);
          let data =
            predata?.data?.data
              ?.deleteUserSubmittedVoteButLeaveRecordOfSubmission;
          return data;
        })
        .catch((error) => {
          console.log("error", error);
          setError(true);
        });
    };

    const loopPushUpdate = async () => {
      await loopAndPush();
      return updateDB(dayId);
    };
    return loopPushUpdate();
  };

  const checkboxChangeHandler = (
    index: number,
    voteFinished: any,
    didCurrentUserVote: any,
    checkedBoxArray: any,
    setCheckedBoxArray: any
  ) => {
    // check if user already voted or the vote is finished. if either is true then no more checking boxes, no more voting.

    if (voteFinished || didCurrentUserVote) {
      return;
    }
    // Clone the current state of the checkboxes
    let clonedArray = Array(checkedBoxArray.length).fill(false);

    // Set the checkbox at the given index to true
    clonedArray[index] = true;

    // Update the state with the new array
    setCheckedBoxArray(clonedArray);
  };

  const deleteCurrentUserVoteMedia = async (
    currentUserVote: any,
    currBallot: any,
    myCurrentUserVote: any,
    checkedBoxArray: any,
    setCheckedBoxArray: any,
    day: any,
    currVotes: any,
    setCurrVotes: any
  ) => {
    // return;
    // console.log('currentUserVote', currentUserVote)
    const voterId = currVotes?.find(
      (votes: any) =>
        votes?.user_id === CURRENT_USER?.id &&
        votes?.ballot_id === currBallot?.id
    );
    // console.log('voterId', voterId)

    // return;

    if (currentUserVote?.key?.Key?.includes(myCurrentUserVote?.vote_string)) {
      const predata = await deleteVote(
        currBallot?.id,
        myCurrentUserVote?.id,
        day?.id
      );
      console.log("predata", predata);
      if (!predata) {
        // * * * * * reminder devnotes: error logging! make ternary on the options.map() index allow for error display. there's already success display which is changed vote!
        return;
      }
      // set that data so state responds!
      const data = predata?.data?.data?.deleteVote;
      if (!data) {
        // * * * * * error handling reminder!
        return;
      }
      setCurrVotes(data);
      // dispatch(SET_CURR_DAY_VOTES(data))
      // restart the checkbox so they unchecked the box they just deleted
      let clonedArray = Array(checkedBoxArray.length).fill(false);
      setCheckedBoxArray(clonedArray);
      console.log("data", data);
    }
    return;
  };

  const voteSubmitMedia = async (
    currentUserVote: any,
    currBallot: any,
    day: any,
    setVotes: any
  ) => {
    console.log("currentUserVote", currentUserVote);
    // mapitem?.key (BLOB) not mapitem

    if (currBallot?.decision || currBallot?.custom_decision) {
      console.log("game is done dont submit vote");
      return;
    }
    // "media/day-2-folder/ballots/images/ballot1-*images*-billgates"
    console.log("currentUserVote?.key.key", currentUserVote?.key.key);
    const charAfterSlash = currentUserVote?.key?.key?.match(/[^/]+$/);
    if (charAfterSlash === null) {
      return;
    }

    const allVotesAfterSubmittingVotes = await submitVote(
      day?.id,
      currBallot?.id,
      CURRENT_USER?.id,
      CURRENT_USER?.username,
      CURRENT_USER?.icon || "",
      // ballot media Key from AWS S3.
      charAfterSlash,
      // ballot type
      currBallot?.type,
      // non_anonymous
      true,
      false
    );

    console.log("allVotesAfterSubmittingVotes", allVotesAfterSubmittingVotes);

    if (!allVotesAfterSubmittingVotes) {
      // * * * * * reminder devnotes COMMENT WENT WRONG! update!
      return;
    }
    const currVotes = allVotesAfterSubmittingVotes?.data?.data?.submitVote;
    console.log("currVotes", currVotes);
    if (!currVotes) {
      return;
    }
    setVotes(currVotes);
    // dispatch(SET_CURR_DAY_VOTES(currVotes))
  };

  const prepareThoughtsForUpload = (
    settings: any,
    originalThoughtsBin: any,
    setPreparedThoughts: any,
    setNewThoughts: any,
    lockUpdater: any,
    unlockUpdater: any
  ) => {
    const newThoughtsBin =
      originalThoughtsBin?.filter(
        (thoughts: any) => thoughts?.text !== "" || thoughts?.blob !== null
      ) || [];

    let blobIndexThoughts = 0;
    const thoughtsPrep =
      newThoughtsBin?.map((thought: any, index: any) => {
        if (thought.is_voice && thought.blob) {
          // It's a BLOB, format as audio

          // actually goal is to create new endpoint to keep the blob.
          const audioPath = `thought${blobIndexThoughts}-audio-userThoughts`;
          blobIndexThoughts += 1; // Increment for the next audio blob
          return {
            path: audioPath,
            blob: thought?.blob,
            contentType: thought?.contentType,
          };
          // return audioPath; // Store the audio path
        } else {
          // It's a text entry, return the text
          return { text: thought.text, contentType: thought?.contentType };
          // return thought.text;
        }
      }) ?? [];

    const actualThoughts = thoughtsPrep?.map((thoughts: any) => {
      console.log("thoughts", thoughts);
      return thoughts?.text || thoughts?.path;
    });
    console.log("actualThoughts", actualThoughts);
    // const actualThoughts = thoughtsPrep?.map((thoughts) => thoughts?.text || thoughts?.path)

    const newThoughts = {
      // id:  handled server side by autoincrement()
      user_id: CURRENT_USER?.id,
      username: CURRENT_USER?.username,
      user_profile_icon: CURRENT_USER?.icon || null,
      // user_is_verified:
      // day_id:
      location_id: settings?.location_id || null,
      location_text: settings?.location || null,
      event_id: settings?.event_id || null,
      thoughts: actualThoughts || [],
      // thoughts: thoughtsPrep || [],
      non_anonymous: settings?.non_anonymous || "yes",
      starrable: settings?.starrable || "yes",
      stars_show_avg: settings?.stars_show_avg || true,
      stars_show_users: settings?.stars_show_users || true,
      thoughts_ok: settings?.thoughts_ok || "yes",
      voice_comments_ok: settings?.voice_comments_ok || true,
      text_comments_ok: settings?.text_comments_ok || true,
      commenter_can_determine: settings?.commenter_can_determine || true,
      anonymous_comments_ok: settings?.anonymous_comments_ok || true,
      i_can_unlock: settings?.i_can_unlock || null,
      u_can_unlock: settings?.u_can_unlock || null,
      lock: lockUpdater?.thoughts || null,
      unlock: unlockUpdater?.thoughts || null,
    };

    if (!newThoughts) {
      return;
    }

    setPreparedThoughts(thoughtsPrep);
    setNewThoughts(newThoughts);
    return { preparedThoughts: thoughtsPrep, newThoughts: newThoughts };
  };

  const prepareMomentsForUpload = (
    uploadMomentsBin: any,
    setPreparedMoments: any,
    setNewMoments: any,
    lockUpdater: any,
    unlockUpdater: any
  ) => {
    //  no longer needed because moments are added one by one so don't filter them out!
    // const newMomentsBin = uploadMomentsBin?.filter((moments:any) => moments?.header !== "" && moments?.caption !== "" && moments?.blob !== null) || []

    let blobIndexMoments = 0;
    const prepareMoments =
      uploadMomentsBin?.map((moment: any, index: any) => {
        if (moment?.is_image) {
          const audioPath = `moment${blobIndexMoments}-images-userMoments`;
          blobIndexMoments += 1;
          return {
            blob: moment?.blob,
            realBlob: moment?.realBlob,
            blobURL: moment?.blobURL,
            titles_array: moment?.header,
            captions_array: moment?.caption,
            media_tags_array: audioPath,
            fileType: moment?.contentType,
          };
          // return { blob: moment?.blob, blobURL: moment?.blobURL, titles_array: moment?.header, captions_array: moment?.caption, media_tags_array: audioPath }
        } else {
          const audioPath = `moment${blobIndexMoments}-videos-userMoments`;
          blobIndexMoments += 1;
          return {
            blob: moment?.blob,
            realBlob: moment?.realBlob,
            blobURL: moment?.blobURL,
            titles_array: moment?.header,
            captions_array: moment?.caption,
            media_tags_array: audioPath,
            fileType: moment?.contentType,
          };
          // return { blob: moment?.blob, blobURL: moment?.blobURL, titles_array: moment?.header, captions_array: moment?.caption, media_tags_array: audioPath }
        }
      }) ?? [];

    console.log("prepareMoments", prepareMoments);

    const newMoments = {
      // id:      tbd
      // 🚨 day_id:  tbd
      user_id: CURRENT_USER?.id,
      username: CURRENT_USER?.username,
      user_profile_icon: CURRENT_USER?.icon || null,
      titles_array:
        Array.isArray(prepareMoments) &&
        prepareMoments?.flatMap((moments) => moments?.titles_array),
      captions_array:
        Array.isArray(prepareMoments) &&
        prepareMoments?.flatMap((moments) => moments?.captions_array),
      media_tags_array:
        Array.isArray(prepareMoments) &&
        prepareMoments?.flatMap((moments) => moments?.media_tags_array),
      lock: lockUpdater?.moments,
      unlock: unlockUpdater?.moments,
    };
    if (!newMoments) {
      return;
    }
    setPreparedMoments(prepareMoments);
    setNewMoments(newMoments);
    return { preparedMoments: prepareMoments, newMoments: newMoments };
  };

  const prepareFieldsForUpload = (
    settings: any,
    uploadDayFields: any,
    setNewFields: any,
    lockUpdater: any,
    unlockUpdater: any
  ) => {
    const filteredFields =
      uploadDayFields?.fields?.filter(
        (field: any) => field !== "" && field !== "test"
      ) || [];

    const filteredConstantsee = uploadDayFields?.constantsee?.map(
      (see: any) => {
        console.log("see", see);

        if (see?.includes("test")) {
          console.log(`yes: ${see}`);

          // Split by commas
          let splitSee = see?.split(", ");
          console.log("splitSee", splitSee);

          // Filter out the word "test"
          const filterEmpties = splitSee?.filter(
            (see: any) => see?.trim() !== "" && see?.trim() !== "test"
          );

          console.log("filterEmpties", filterEmpties);

          // Use .map() to trim spaces from each item
          const trimmedStrings = filterEmpties?.map((item: any) =>
            item?.trim()
          );

          // Rejoin the strings back together
          const backToStrings = trimmedStrings?.join(", ");
          console.log("backToStrings", backToStrings);

          return backToStrings;
        } else {
          return see;
        }
      }
    );

    // const filteredConstantsee = uploadDayFields?.constantsee?.filter(see => see !== "" && see !== "test") || []
    const filteredConstantseeStarrable =
      uploadDayFields?.constantsee_starrable?.filter(
        (starrables: any) => starrables !== "" && starrables !== "test"
      ) || [];
    const filteredText =
      uploadDayFields?.text?.filter(
        (text: any) => text !== "" && text !== "test"
      ) || [];
    const filteredDecideDoFields = uploadDayFields?.decide_do_fields?.filter(
      (ddf: any) => typeof ddf === "string"
    );

    // 🚨 dont filter text the same way because perhaps there are intentionally empty text fields. onyl {fields.fields should be checked}

    // 🚨 decide_do first to get decide_do id!
    const fieldsObj = {
      // id       no id
      user_id: CURRENT_USER?.id,
      location_id: settings?.location_id || null,
      // 🚨  day_id: after.
      event_id: settings?.event_id || null,
      wits_ok: uploadDayFields?.wits_ok || false,
      // wits_username:   (during scrolling user interaction with uploaded field)
      // 🚨 decidedo_id:
      fields: filteredFields,
      // 🚨 🚨 do we filter checkbox to be fields length so there are no more items than there are fields?
      checkbox: uploadDayFields?.checkbox,
      constantsee: filteredConstantsee,
      users_checkboxes: uploadDayFields?.users_checkboxes,
      text: filteredText,
      decide_do_fields: filteredDecideDoFields,

      // 🚨 sora style dream reader + haiku: dream: uploadDayFields?.dream
      // 🚨 lit_like_love_icon        // nvm it's always the fire emoji used to decide "thumb" | "fire" especially ith "sparks" feature
      likeable: uploadDayFields?.likeable || false,
      likeable_show_users: uploadDayFields?.likeable_show_users || true,
      constantsee_starrable: filteredConstantseeStarrable,
      constantsee_show_stars_avg:
        uploadDayFields?.constantsee_show_stars_avg || true,
      constantsee_show_stars_users:
        uploadDayFields?.constantsee_show_stars_users || true,
      lock: lockUpdater?.fields,
      unlock: unlockUpdater?.fields,
      on_profile: uploadDayFields?.on_profile || "no",
    };

    if (!fieldsObj) {
      return;
    }
    setNewFields(fieldsObj);
    return fieldsObj;
  };

  const initialInitProfile = async (
    userId: any,
    setCurrProfile: any,
    setCurrPrivacy: any
  ) => {
    try {
      const query = ALLuserProfileDataStringQueryStringFunc(userId);
      const predata = await axios.post(predataString, { query });

      const data = predata?.data?.data?.ALLuserProfileDataString;
      if (!data) return;

      const stringifiedData = JSON.parse(data);

      if (stringifiedData?.profile) {
        setCurrProfile((prev: any) => ({
          ...prev,
          ...stringifiedData.profile,
        }));
      }
      if (stringifiedData?.privacy) {
        setCurrPrivacy((prev: any) => ({
          ...prev,
          ...stringifiedData.privacy,
        }));
      }

      return stringifiedData;
    } catch (error) {
      console.error("Error loading profile data:", error);
    }
  };

  const getAllProfileListeners = async (
    profileId: number,
    setProfileListeners: any
  ) => {
    const query = profileAllListenersGETQueryStringFunc(profileId);

    const predata: any = await axios.post(predataString, { query: query });
    // const predata: any = await axios.post("http://localhost:4000/api/graphql", { query: query })

    // const predata: any = await AllOursRequestDATA(query, {}, CURRENT_USER_TOKEN)
    console.log("predata listeners", predata);
    if (!predata) {
      return null;
    }
    const data = predata?.data?.data?.profileAllListenersGET;
    if (!data) {
      return null;
    }
    // const parsedData = JSON.parse(data)
    setProfileListeners(data);
    // dispatch(SET_PROFILE_LISTENERS(data))
    return data;
  };

  const profileListenersDeleteFunc = async (
    profileId: number,
    userId: number,
    setProfileListeners: any
  ) => {
    const query = deleteUserListeningQueryStringFunc(profileId, userId);

    const predata: any = await axios.post(predataString, { query: query });
    // const predata: any = await axios.post("http://localhost:4000/api/graphql", { query: query })
    console.log("predata listeners", predata);
    if (!predata) {
      return null;
    }
    const data = predata?.data?.data?.profileListenersDelete;
    if (!data) {
      return null;
    }
    setProfileListeners(data);
    // dispatch(SET_PROFILE_LISTENERS(data))
    return data;
  };

  const allMyBlocks = async (userId: number) => {
    const query = allMyBlocksQueryStringFunc(userId);
    const predata: any = await axios.post(predataString, { query: query });
    // const predata: any = await axios.post("http://localhost:4000/api/graphql", { query: query })
    if (!predata) {
      return null;
    }
    let data = predata?.data?.data?.allMyBlocksGET;
    if (!data) {
      return null;
    }
    return data;
  };

  const profileGetAllFollowersAndFollowedUsers = async (userId: number) => {
    const query =
      profileGetAllFollowersAndFollowedUsersGETQueryStringFunc(userId);

    const predata: any = await axios.post(predataString, { query: query });
    // const predata: any = await axios.post("http://localhost:4000/api/graphql", { query: query })
    // const predata: any = await AllOursRequestDATA(query, {}, CURRENT_USER_TOKEN)
    if (!predata) {
      return null;
    }
    const data = predata?.data?.data?.profileGetAllFollowersAndFollowedUsersGET;
    if (!data) {
      return null;
    }
    const predataFollowers: any = await axios.post(predataString, {
      query: query,
    });
    // const predataFollowers: any = await axios.post("http://localhost:4000/api/graphql", { query: query })
    // let predataFollowers: any = await AllOursRequestDATA(allFollowersGETquery, {}, CURRENT_USER_TOKEN)
    console.log("predata", predata);
    if (!predata) {
      return null;
    }
    let followers = predataFollowers?.data?.data?.allFollowersGET;
    const parsedData = JSON.parse(data);
    dispatch(SET_FOLLOWERS_N_FOLLOWED_USERS(parsedData));
    return data;
  };

  const profileGetAllRelevantFollowersAndFollowedUsers = async (
    userId: number
  ) => {
    console.log("userId right now", userId);
    const followersQuery = allMyFollowersQueryStringFunc(userId);

    const predataString = API || "http://localhost:4000/api/graphql";
    const predata: any = await axios.post(predataString, {
      query: followersQuery,
    });
    // const predata: any = await axios.post("http://localhost:4000/api/graphql", { query: followersQuery });

    console.log("predata followers here", predata);

    if (!predata) {
      return null;
    }
    let data = predata?.data?.data?.allMyFollowersGET;

    console.log("data cool", data);

    const followedUsersQuery = allMyFollowedUsersQueryStringFunc(userId);
    console.log("followedUsersQuery ", followedUsersQuery);

    const predata2: any = await axios.post(predataString, {
      query: followedUsersQuery,
    });
    // const predata2: any = await axios.post("http://localhost:4000/api/graphql", { query: followedUsersQuery });
    const data2 = predata2?.data?.data?.allMyFollowedUsersGET;

    console.log("data2", data2);

    return { followers: data, followedUsers: data2 };
  };

  const deleteFollower = async (userId: number, followerId: number) => {
    const query = deleteFollowerQueryStringFunc(userId, followerId);

    const predata: any = await axios.post(predataString, { query: query });
    // const predata: any = await axios.post("http://localhost:4000/api/graphql", { query: query })
    if (!predata) {
      return null;
    }
    let data = predata?.data?.data?.deleteFollower;
    if (!data) {
      return null;
    }
    return data;
  };

  const addBlockedUser = async (userId: number, followerId: number) => {
    const query = addBlockedUserQueryStringFunc(userId, followerId);

    const predata: any = await axios.post(predataString, { query: query });
    // const predata: any = await axios.post("http://localhost:4000/api/graphql", { query: query })
    if (!predata) {
      return null;
    }
    let data = predata?.data?.data?.addBlockedUser;
    if (!data) {
      return null;
    }
    return data;
  };

  const deleteBlockedUser = async (userId: number, blockedId: number) => {
    const query = deleteBlockedUserQueryStringFunc(userId, blockedId);

    const predata: any = await axios.post(predataString, { query: query });
    // const predata: any = await axios.post("http://localhost:4000/api/graphql", { query: query })
    if (!predata) {
      return null;
    }
    let data = predata?.data?.data?.deleteBlockedUser;
    if (!data) {
      return null;
    }
    return data;
  };

  const findNextEvent = (events: any) => {
    console.log("events", events);

    if (!Array.isArray(events)) {
      console.log("error");
      console.log("events", events);
      return;
    }
    const today = new Date(); // Get today's date

    // Convert the event dates into Date objects and filter future events
    const futureEvents = events
      .map((event) => ({
        ...event, // Keep the rest of the event object
        parsedStartDate: new Date(event.start_date), // Parse the start_date to Date object
      }))
      .filter((event) => event.parsedStartDate >= today); // Only keep future events

    console.log("futureEvents", futureEvents);

    // Sort events by the nearest start_date
    futureEvents.sort((a, b) => a.parsedStartDate - b.parsedStartDate);

    // Return the nearest future event, or null if none are found
    return futureEvents.length > 0 ? futureEvents[0] : null;
  };

  const initNextEvent = async (
    events: any,
    nextEvent: any,
    setNextEvent: any
  ) => {
    const upcomingEvent = findNextEvent(events);
    console.log("nextEvent", nextEvent);
    console.log("events", events);
    // if (nextEvent?.icon?.length) {
    //   return;
    // }
    console.log("upcomingEvent", upcomingEvent);

    if (upcomingEvent?.public_event) {
      const clone = { ...upcomingEvent };
      if (!upcomingEvent?.icon) {
        // const path = `icons/event-icons/event-${upcomingEvent?.id}-icon`;
        // const blob = await getBLOBfromS3(path);
        console.log("no blob");
        // dispatch(SET_NEXT_EVENT(clone))
        setNextEvent(clone);
        return;
      } else {
        // clone.icon = blob
        // console.log('blob', blob);
        setNextEvent(clone);
        // dispatch(SET_NEXT_EVENT(clone))
      }
    } else {
      console.log("it better be sauce!");
    }
  };

  const profileAllUserEventsFunc = async (
    userId: number,
    setEvents: Function
  ) => {
    const query = profileAllUserEventsGETQueryStringFunc(userId);

    let predata: any = await axios.post(predataString, { query: query });
    // let predata: any = await axios.post('http://localhost:4000/api/graphql', { query: query })

    // let predata: any = await AllOursRequestDATA(query, {}, CURRENT_USER_TOKEN);
    console.log("predata", predata);

    if (!predata) return null;

    let data = predata?.data?.data?.profileAllUserEventsGET;

    if (!data) return null;

    let parsedData = JSON.parse(data);

    // Modify each event object directly
    parsedData = await Promise.all(
      parsedData?.map(async (event: any) => {
        // Clone event object before modifying it
        const eventClone = { ...event };
        const path = `icons/event-icons/event-${eventClone?.id}-icon`;

        const query = getObjKeysFromFolderS3QueryStringFunc(path);

        console.log("query", query);

        const predata: any = await axios.post(
          API,
          // "https://journallapi.vercel.app/api/graphql",
          {
            query: query,
          }
        );
        if (!predata) {
          return null;
        }

        console.log("predata", predata);
        let data = predata?.data?.data?.getObjKeysFromFolderS3;
        console.log("data", data);
        const parsedData = JSON.parse(data);

        if (!parsedData) {
          console.log("no parsedData");
          eventClone.icon = null; // Assign null if no parsedData
        } else {
          eventClone.icon = parsedData?.blobURL; // Assign the blob if found
        }

        return eventClone; // Return the modified clone
      })
    );

    // Update state and dispatch
    // dispatch(SETs_USER_EVENTS(parsedData));  // Dispatch with the modified array
    setEvents(parsedData); // Update events with modified array

    return parsedData;
  };

  const profileEventsClick = async (
    events: any,
    setEvents: any,
    selectedEvent: any,
    setSelectedEvent: any,
    nextEvent: any,
    setNextEvent: any,
    dataRowClicked: any,
    setDataRowClicked: any,
    setContentDisplayClicked: any,
    currProfile: any
  ) => {
    const toggleEventActivities = () => {
      if (dataRowClicked !== "eventactivities") {
        setDataRowClicked("eventactivities");
        setContentDisplayClicked("eventactivities");
      } else {
        if (selectedEvent?.id) {
          setSelectedEvent({});
        }
        setDataRowClicked("");
        setContentDisplayClicked("");
      }
    };

    if (events?.length) {
      toggleEventActivities();
    } else {
      const events = await profileAllUserEventsFunc(
        currProfile?.user_id,
        setEvents
      );
      // const events = await profileAllUserEventsClick(CURR_PROFILE?.user_id, setEvents)
      console.log("events from over here!", events);
      setEvents(events);
      // wait for the data before initially retrieving the items.
      toggleEventActivities();
      if (!nextEvent?.id) {
        // console
        console.log("there is no nextEvent?.id", nextEvent?.id);
        initNextEvent(events, nextEvent, setNextEvent);
      } else {
        console.log("nextEvent?.id", nextEvent?.id);
      }
      console.log("events", events);
      return events;
    }
  };

  const addFollower = async (userId: number, followerId: number) => {
    const query = addFollowerQueryStringFunc(userId, followerId);

    const predata: any = await axios.post(predataString, { query: query });
    console.log("predata", predata);
    if (!predata) {
      return null;
    }
    let data = predata?.data?.data?.addFollower;
    console.log("data", data);
    if (!data) {
      return null;
    }
    return data;
  };

  const doesCurrentUserPassPermissionWall = (
    currentUserId: number,
    setting: string,
    followers: any
  ) => {
    console.log("currentUserId", currentUserId);
    console.log("followers", followers);

    const doesUserPassFollowers = followers?.some(
      (f: any) => f?.follower_id === currentUserId
    );
    const doesUserPassFollowedUsers = followers?.some(
      (f: any) => f?.user_id === currentUserId
    );
    if (setting === "followers") {
      return doesUserPassFollowers;
    } else if (setting === "followed users") {
      return doesUserPassFollowedUsers;
    } else if (setting === "f_f") {
      return doesUserPassFollowers || doesUserPassFollowedUsers;
    }
  };

  const profileListenersAddFunc = async (
    profileId: number,
    userId: number,
    setProfileListeners: any
  ) => {
    const query = addUserListeningQueryStringFunc(profileId, userId);

    const predata: any = await axios.post(predataString, { query: query });
    console.log("predata listeners", predata);
    if (!predata) {
      return null;
    }
    const data = predata?.data?.data?.profileListenersAdd;
    if (!data) {
      return null;
    }
    setProfileListeners(data);
    // dispatch(SET_PROFILE_LISTENERS(data))
    return data;
  };

  const dayListenersAddFunc = async (
    dayId: number,
    userId: number,
    setDayListeners: any
  ) => {
    const query = dayListenersAddQueryStringFunc(dayId, userId);

    const predataString = API || "http://localhost:4000/api/graphql";
    const predata: any = await axios.post(predataString, { query: query });
    // const predata: any = await axios.post("http://localhost:4000/api/graphql", { query: query })
    console.log("predata listeners", predata);
    if (!predata) {
      return null;
    }
    const data = predata?.data?.data?.dayListenersAdd;
    if (!data) {
      return null;
    }
    setDayListeners(data);
    // dispatch(SET_PROFILE_LISTENERS(data))
    return data;
  };

  const dayListenersDeleteFunc = async (
    dayId: number,
    userId: number,
    setDayListeners: any
  ) => {
    const query = dayListenersDeleteQueryStringFunc(dayId, userId);

    const predata: any = await axios.post(predataString, { query: query });
    // const predata: any = await axios.post("http://localhost:4000/api/graphql", { query: query })
    console.log("predata listeners", predata);
    if (!predata) {
      return null;
    }
    const data = predata?.data?.data?.dayListenersDelete;
    if (!data) {
      return null;
    }
    setDayListeners(data);
    return data;
  };

  const submitOrUpdateEventAttendanceFunc = async (
    event_id: number,
    event_name: string,
    profile_user_id: any,
    user_id: number,
    username: string,
    user_profile_icon: string | null,
    going: string,
    status: string | null,
    setUserEvents: any
  ) => {
    const query = submitOrUpdateEventAttendanceQueryStringFunc(
      event_id,
      event_name,
      profile_user_id,
      user_id,
      username,
      user_profile_icon,
      going,
      status
    );
    // const predata: any = await AllOursRequestDATA(query, {}, CURRENT_USER_TOKEN)
    const predata: any = await axios.post(predataString, { query: query });
    // const predata: any = await axios.post("http://localhost:4000/api/graphql", { query: query })
    console.log("predata", predata);
    if (!predata) {
      return null;
    }
    const data = predata?.data?.data?.submitOrUpdateEventAttendance;
    if (!data) {
      return null;
    }
    console.log("data", data);
    // parsed for events/eventattendance
    const parsedData = JSON.parse(data);
    setUserEvents(parsedData);
    return parsedData;
  };

  const getBlobFromUri = async (uri: string): Promise<Blob> => {
    try {
      console.log("uri", uri);
      console.log("JSON.stringify(uri)", JSON.stringify(uri));
      console.log("Platform:", Platform.OS);
      console.log("Origin header:", window.location.origin);

      // 🌐 Web
      if (Platform.OS === "web") {
        const response = await fetch(uri);
        if (!response.ok) throw new Error(`Network error: ${response.status}`);
        return await response.blob();
      }

      console.log("uri", uri);
      // 📱 Native (Expo, RN)
      if (uri.startsWith("file://")) {
        // For file URIs, read as base64 and convert to Blob
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        console.log("base64", base64);

        // Convert base64 to Blob more reliably
        const response = await fetch(
          `data:application/octet-stream;base64,${base64}`
        );
        console.log("response", response);
        return await response.blob();
      }

      // Remote https:// or blob: URLs
      const response = await fetch(uri);
      console.log("response down here!", response);
      if (!response.ok) throw new Error(`Network error: ${response.status}`);
      return await response.blob();
    } catch (error) {
      console.error("❌ getBlobFromUri error:", error);
      throw error;
    }
  };

  const searchContentAndUsersFunc = async (
    searchTerm: string,
    viewerId: number
  ) => {
    const query = searchContentAndUsersQueryStringFunc(searchTerm, viewerId);
    const predataString = API || "http://localhost:4000/api/graphql";
    let predata: any = await axios.post(predataString, { query: query });
    console.log("predata", predata);
    if (!predata) {
      return null;
    }
    const data: any = predata?.data?.data?.searchContentAndUsers;
    if (!data) {
      return null;
    }
    const parsedData = JSON.parse(data);
    return parsedData;
  };

  const logout = async () => {
    try {
      if (Platform.OS === "web") {
        // Remove credentials from localStorage for web
        localStorage.removeItem("userId");
        localStorage.removeItem("userToken");
        console.log("User logged out (web)");
      } else {
        // Remove credentials from SecureStore for native apps
        await SecureStore.deleteItemAsync("userId");
        await SecureStore.deleteItemAsync("userToken");
        console.log("User logged out (native)");
      }
      router.push("/");
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  const refreshDayFunc = async (day: any, feed: any, setFeed: any) => {
    const query = refreshDayQueryStringFunc(day?.id);
    const predata: any = await axios.post(predataString, {
      query: query,
    });
    if (!predata) {
      return null;
    }

    let data: any = predata?.data?.data?.refreshDay;
    if (!data) {
      return null;
    }
    const parsedData = JSON.parse(data);
    const feedClone = [...feed];
    updateFeedWithNewDayData(feedClone, setFeed, parsedData);
  };

  const refreshCommentsFunc = async (dayId: any, setComments: any) => {
    const query = refreshDayCommentsQueryStringFunc(dayId);
    const predata: any = await axios.post(predataString, {
      query: query,
    });
    if (!predata) {
      return null;
    }

    let data: any = predata?.data?.data?.refreshDayComments;
    if (!data) {
      return null;
    }
    const parsedData = JSON.parse(data);
    setComments(parsedData);
  };

  const refreshBallotsFunc = async (
    dayId: any,
    currBallot: any,
    ballotBin: any,
    setBallotBin: any,
    setCurrVotes: any,
    setBallotOptionsLikes: any,
    setBallotOptionsStars: any
  ) => {
    const query = refreshDayBallotsQueryStringFunc(dayId);
    const predata: any = await axios.post(predataString, {
      query: query,
    });
    if (!predata) {
      return null;
    }

    let data: any = predata?.data?.data?.refreshDayBallots;
    if (!data) {
      return null;
    }
    const parsedData = JSON.parse(data);

    setBallotBin(parsedData);

    setBallotVotesLikesStars(
      ballotBin,
      currBallot,
      setCurrVotes,
      setBallotOptionsLikes,
      setBallotOptionsStars
    );
  };

  const mediaCommentsFunc = async (day: any, setSoundComments: any) => {
    console.log("media comments func");

    const mediaCommentsStringS3 = `media/day-${day?.id}-folder/media-comments`;
    // const mediaCommentKeys: any = await getObjKeysFromFolderS3(mediaCommentsStringS3);

    const query = getObjKeysFromFolderS3QueryStringFunc(mediaCommentsStringS3);

    const predata: any = await axios.post(
      API,
      // "https://journallapi.vercel.app/api/graphql",
      {
        query: query,
      }
    );
    if (!predata) {
      return null;
    }

    console.log("predata", predata);
    let data = predata?.data?.data?.getObjKeysFromFolderS3;
    const mediaCommentKeys = JSON.parse(data);

    console.log("mediaCommentKeys", mediaCommentKeys);

    if (!mediaCommentKeys || mediaCommentKeys === "error") {
      return;
    }

    const mediaComments = await Promise.all(
      mediaCommentKeys?.map(async (keys: any) => {
        try {
          const key = keys?.Key;
          console.log("key", key);
          // ⚠️ hitting S3 direct:
          // const soundBLOB = await getObjAudioFromS3(key);
          // console.log('soundBLOB', soundBLOB);
          // if (!soundBLOB) {
          //     return;
          // }
          const soundComment: any = {
            thought: { key: keys?.key },
            blob: keys?.url,
          };

          return soundComment;
        } catch (err) {
          console.error(`Error fetching blob for blob: ${keys}`, err);
          return null; // Handle failures gracefully
        }
      })
    );
    console.log("mediaComments", mediaComments);
    setSoundComments(mediaComments);
  };

  const setFeedFaceFunc = (feedFace: string, setCurrDaySelection: any) => {
    if (feedFace === "thoughts") {
      setCurrDaySelection("thoughts");
    }
    if (feedFace === "moments") {
      setCurrDaySelection("moments");
    }
    if (feedFace === "fields") {
      setCurrDaySelection("fields");
    }
    if (feedFace === "greatfullagain") {
      setCurrDaySelection("greatfullagain");
    }
    if (feedFace === "comments") {
      setCurrDaySelection("comments");
    }
    if (feedFace === "ballots") {
      setCurrDaySelection("ballots");
    }
  };

  const deleteLocation = async (day_id: any, location_id: any) => {
    const query = deleteLocationQueryStringFunc(day_id, location_id);
    const predata: any = await axios.post(predataString, { query: query });
    // const predata: any = await axios.post('http://localhost:4000/api/graphql', { query: query })
    // const predata: any = await AllOursRequestDATA(query, {}, CURRENT_USER_TOKEN)
    if (!predata) {
      return null;
    }
    const data = await predata?.data?.data?.deleteLocation;
    if (!data) {
      return null;
    }
    dispatch(SET_ALL_LOCATIONS(data));
  };

  const addNewProposedLocationFunc = async (
    nickname: string | null,
    city: string | null,
    state: string | null,
    zip_code: string | null,
    country: string | null,
    submitting_user_id: number
  ) => {
    const query = await addNewProposedLocationQueryStringFunc(
      nickname,
      city,
      state,
      zip_code,
      country,
      submitting_user_id
    );

    const predata: any = await axios.post(predataString, { query: query });

    // const predata: any = await axios.post('http://localhost:4000/api/graphql', { query: query })
    // const predata: any = await AllOursRequestDATA(query, {}, CURRENT_USER_TOKEN);
    console.log("predata", predata);
    if (!predata) {
      return null;
    }
    const data = predata?.data?.data?.addNewProposedLocationFunc;
    console.log("data", data);
    if (!data) {
      return null;
    }
    dispatch(SET_ALL_LOCATIONS(data));
  };

  // useMemo to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      profileIconInitS3,
      returnProfileImg,
      sendVerificationEmailSendGrid,
      blobbifyAndReturnPosts,
      getUserCredentials,
      getCurrentUserWithCurrentUserToken,
      daysGETtrendingwithMonthAndYearFunction,
      getLimitedUsersAndPrivacy,
      getUserPrivacySettingsWithUserIdFunc,
      seeAllThoughtsUnlockHandler,
      startPlayingRecordedSound,
      calculateStarsAverage,
      submitOneThruFiveRatings,
      setCurrentUserMostRecentPostFunc,
      notificationMaker,
      witsFieldsIndexConfirmClick,
      likeField,
      fieldsToggleCheckbox,
      fieldsEyeAmClicking,
      didUserPassThisLockAlready,
      unlockFunc,
      submitTextComment,
      submitSoundCommentThought,
      submitCommentThoughtALLpassCommentThoughtsTrueFunc,
      updateCommentThoughtALLpassCommentThoughtsFalseFunc,
      passCommentLockFunc,
      startRecordingSound,
      clearRecordedSound,
      deleteComment,
      userBlocksUserFunc,
      getNumberFromCommentLock,
      commentLockTimesRatedTimesLeft,
      userWentWithVoteOptionHeartToggler,
      finishVoteAndUpdateBallotFunc,
      finishJoinDayVote,
      submitJoinDayWriteContentAndUpdateBallotFunc,
      finishCommentVoteAndUpdateBallotFunc,
      userRatesBallotOptionFunc,
      isUserSubmittedOptionApprovedText,
      likeVoteOption,
      submitUserSubmittedOption,
      submitCommentVote,
      submitVoteUnlockChecker,
      submitJoinDayVote,
      submitVote,
      postingUserApprovesProposedVote,
      isUserSubmittedOptionApprovedMedia,
      deleteVote,
      deleteCommentVote,
      deleteUserSubmittedVoteButLeaveRecordOfSubmissionFunc,
      checkboxChangeHandler,
      deleteCurrentUserVoteMedia,
      voteSubmitMedia,
      getMimeType,
      prepareThoughtsForUpload,
      prepareMomentsForUpload,
      prepareFieldsForUpload,
      initialInitProfile,
      getAllProfileListeners,
      profileListenersDeleteFunc,
      allMyBlocks,
      profileGetAllRelevantFollowersAndFollowedUsers,
      addFollower,
      deleteFollower,
      addBlockedUser,
      deleteBlockedUser,
      initNextEvent,
      findNextEvent,
      profileEventsClick,
      doesCurrentUserPassPermissionWall,
      profileListenersAddFunc,
      dayListenersAddFunc,
      getPresignedDeleteURLFunc,
      submitOrUpdateEventAttendanceFunc,
      getBlobFromUri,
      dayListenersDeleteFunc,
      searchContentAndUsersFunc,
      logout,
      GETballotMediaS3Func,
      refreshDayFunc,
      refreshCommentsFunc,
      refreshBallotsFunc,
      mediaCommentsFunc,
      setFeedFaceFunc,
      deleteLocation,
      addNewProposedLocationFunc,
    }),

    [
      profileIconInitS3,
      returnProfileImg,
      sendVerificationEmailSendGrid,
      blobbifyAndReturnPosts,
      getUserCredentials,
      getCurrentUserWithCurrentUserToken,
      daysGETtrendingwithMonthAndYearFunction,
      getLimitedUsersAndPrivacy,
      getUserPrivacySettingsWithUserIdFunc,
      seeAllThoughtsUnlockHandler,
      startPlayingRecordedSound,
      calculateStarsAverage,
      submitOneThruFiveRatings,
      setCurrentUserMostRecentPostFunc,
      notificationMaker,
      witsFieldsIndexConfirmClick,
      likeField,
      fieldsToggleCheckbox,
      fieldsEyeAmClicking,
      didUserPassThisLockAlready,
      unlockFunc,
      submitTextComment,
      submitSoundCommentThought,
      submitCommentThoughtALLpassCommentThoughtsTrueFunc,
      updateCommentThoughtALLpassCommentThoughtsFalseFunc,
      passCommentLockFunc,
      startRecordingSound,
      clearRecordedSound,
      deleteComment,
      userBlocksUserFunc,
      getNumberFromCommentLock,
      commentLockTimesRatedTimesLeft,
      userWentWithVoteOptionHeartToggler,
      finishVoteAndUpdateBallotFunc,
      finishJoinDayVote,
      submitJoinDayWriteContentAndUpdateBallotFunc,
      finishCommentVoteAndUpdateBallotFunc,
      userRatesBallotOptionFunc,
      isUserSubmittedOptionApprovedText,
      likeVoteOption,
      submitUserSubmittedOption,
      submitCommentVote,
      submitVoteUnlockChecker,
      submitJoinDayVote,
      submitVote,
      postingUserApprovesProposedVote,
      isUserSubmittedOptionApprovedMedia,
      deleteVote,
      deleteCommentVote,
      deleteUserSubmittedVoteButLeaveRecordOfSubmissionFunc,
      checkboxChangeHandler,
      deleteCurrentUserVoteMedia,
      voteSubmitMedia,
      getMimeType,
      prepareThoughtsForUpload,
      prepareMomentsForUpload,
      prepareFieldsForUpload,
      initialInitProfile,
      getAllProfileListeners,
      profileListenersDeleteFunc,
      allMyBlocks,
      profileGetAllRelevantFollowersAndFollowedUsers,
      addFollower,
      deleteFollower,
      addBlockedUser,
      deleteBlockedUser,
      initNextEvent,
      findNextEvent,
      profileEventsClick,
      doesCurrentUserPassPermissionWall,
      profileListenersAddFunc,
      dayListenersAddFunc,
      getPresignedDeleteURLFunc,
      submitOrUpdateEventAttendanceFunc,
      getBlobFromUri,
      dayListenersDeleteFunc,
      searchContentAndUsersFunc,
      logout,
      GETballotMediaS3Func,
      refreshDayFunc,
      refreshCommentsFunc,
      refreshBallotsFunc,
      mediaCommentsFunc,
      setFeedFaceFunc,
      deleteLocation,
      addNewProposedLocationFunc,
    ]
  );

  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
}
