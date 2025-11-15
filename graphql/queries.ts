export const allUsersGETquery = `query { allUsersGET }`;
export const allDaysGETquery = `query { allDaysGET }`;
export const allUsersPrivacyGETquery = `query { allUsersPrivacyGET }`;

// refreshDay(dayId: Int!): String
export const refreshDayQueryStringFunc = (dayId: number) => {
  const query = `query {
      refreshDay(
         dayId: ${dayId},          
      )
   }`;
  return query;
};

export const refreshDayCommentsQueryStringFunc = (dayId: number) => {
  const query = `query {
      refreshDayComments(
         dayId: ${dayId},          
      )
   }`;
  return query;
};

export const refreshDayBallotsQueryStringFunc = (dayId: number) => {
  const query = `query {
      refreshDayBallots(
         dayId: ${dayId},          
      )
   }`;
  return query;
};

export const getPresignedUploadURLQueryStringFunc = (
  key: string,
  contentType: string
) => {
  const query = `query {
      getPresignedUploadURL(
         key: "${key}",          
         contentType: "${contentType}",          
      )
   }`;
  return query;
};

export const getPresignedDeleteURLQueryStringFunc = (key: string) => {
  const query = `query {
      getPresignedDeleteURL(
         key: "${key}",          
      )
   }`;
  return query;
};

export const getObjKeysFromFolderS3QueryStringFunc = (folderPath: string) => {
  const query = `query {
      getObjKeysFromFolderS3(
         folderPath: "${folderPath}",          
      )
   }`;
  return query;
};

export const getLimitedUsersAndPrivacyQueryStringFunc = (
  limit: number,
  viewerId: any
) => {
  const query = `query {
         getLimitedUsersAndPrivacy(
            limit: ${limit},
            viewerId: ${viewerId},            
         )
      }`;
  return query;
};

export const allFollowersGETquery = `query { allFollowersGET { id, user_id, follower_id }}`;

export const allMyFollowersQueryStringFunc = (userId: number) => {
  const query = `query {
      allMyFollowersGET(userId: ${userId}) {
         id, user_id, follower_id
      }
   }`;
  return query;
};

export const allMyFollowedUsersQueryStringFunc = (userId: number) => {
  const query = `query {
      allMyFollowedUsersGET(userId: ${userId}) {
         id, user_id, follower_id
      }
   }`;
  return query;
};

export const addFollowerQueryStringFunc = (
  userId: number,
  followerId: number
) => {
  const query = `mutation {
      addFollower(user_id: ${userId}, follower_id: ${followerId}) {
         id, user_id, follower_id
      }
   }`;
  return query;
};

export const deleteFollowerQueryStringFunc = (
  userId: number,
  followerId: number
) => {
  const query = `mutation {
      deleteFollower(user_id: ${userId}, follower_id: ${followerId}) {
         id, user_id, follower_id
      }
   }`;
  return query;
};

export const allMyBlocksQueryStringFunc = (userId: number) => {
  const query = `query {
      allMyBlocksGET(userId: ${userId}) {
         id, user_id, blocked_id
      }
   }`;
  return query;
};

export const allMyTheyBlockedMeUsersQueryStringFunc = (userId: number) => {
  const query = `query {
      allMyTheyBlockedMeUsersGET(userId: ${userId}) {
         id, user_id, blocked_id
      }
   }`;
  return query;
};

export const addBlockedUserQueryStringFunc = (
  userId: number,
  blockedId: number
) => {
  const query = `query {
      addBlockedUser(userId: ${userId}, blockedId: ${blockedId}) {
         id, user_id, blocked_id
      }
   }`;
  return query;
};

export const deleteBlockedUserQueryStringFunc = (
  userId: number,
  blockedId: number
) => {
  const query = `query {
      deleteBlockedUser(userId: ${userId}, blockedId: ${blockedId}) {
         id, user_id, blocked_id
      }
   }`;
  return query;
};

export const dayListenersAddQueryStringFunc = (
  dayId: number,
  userId: number
) => {
  const query = `query {
      dayListenersAdd(dayId: ${dayId}, userId: ${userId}) {
         id, user_id, blocked_id
      }
   }`;
  return query;
};

export const dayListenersDeleteQueryStringFunc = (
  dayId: number,
  userId: number
) => {
  const query = `query {
      dayListenersDeletex(dayId: ${dayId}, userId: ${userId}) {
         id, user_id, blocked_id
      }
   }`;
  return query;
};

export const allListenersGETquery = `query { allListenersGET { id, user_id, day_id, profile_id, is_listening }}`;

export const allBlocksGETquery = `query { allBlocksGET { id, user_id, blocked_id, is_shadow_ban, feedback }}`;

export const allLocationsGETquery = `query { allLocationsGET { id, nickname, city, state, zip_code, country, submitting_user_id, is_approved }}`;
export const allCategoriesGETquery = `query { allCategoriesGET { id, name, rules, submitting_user_id, submitting_user_id, is_approved } }`;

export const signupQueryStringFunc = (
  username: string,
  password: string,
  email: string,
  birthday: string,
  locale: string
) => {
  // id | username | icon | password| email | birthday | has_flagged | flagged_posts | has_reported | reported_posts | location | gender | orientation | ethnicity
  const query = `mutation {
            userSignup(username: "${username}", password: "${password}", email: "${email}", birthday: "${birthday}", locale: "${locale}") {
               id, username, password, email, birthday, joinday, 
               location_id, location_text last_username_change, full_name, icon, cover_photo, gender, orientation,  
               total_followers, total_following, i_can_trash_u, trash_u_today, trash_me_today, trash_u_30, trash_me_30, total_sessions,
               ethnicity, role, no_ads, post_order, show_followers, avg_likes, avg_comments, daily_scrolling, avg_scrolling, avg_shares, total_posts,           
               sessions_this_year, vibe_u_today, spam_percent, reported_posts_me, has_reported_u, explicit_posts, has_marked_exp,
               thought_limit, comment_limit, last_vibe_gift, sus_start_date, token, weekly_promo_tally, malicious_action_tally,
               timestamp
            }
         }`;
  // timestamp
  return query;
};

export const createVoteCommentBucketQueryStringFunc = (
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
  const query = `mutation {
         createVoteCommentBucket(
            day_id: ${day_id},
            user_id: ${user_id},
            username: "${username}",
            user_profile_icon: "${user_profile_icon}",
            thought: "${thought}",
            thoughts_ok: "${thoughts_ok}",
            downloadable: "${downloadable}",
            starrable: "${starrable}",
            non_anonymous: "${non_anonymous}",
            location_id: ${location_id},
            location_text: "${location_text}",
            moment_id: ${moment_id},
            greatfullagain_id: ${greatfullagain_id},
            event_id: ${event_id},
            stars_show_avg: ${stars_show_avg},
            stars_show_users: ${stars_show_users},
            parent_thought_id: ${parent_thought_id},
            comment_icon: "${comment_icon}",
            commenter_can_determine: ${commenter_can_determine},
            voice_comments_ok: ${voice_comments_ok},
            text_comments_ok: ${text_comments_ok},
            anonymous_comments_ok: ${anonymous_comments_ok},
            lock: "${lock}",
            unlock: "${unlock}"
            ) {
               id, user_id, username, user_profile_icon, user_is_verified, day_id, location_id, moment_id, greatfullagain_id, parent_thought_id, sus_content,
                  suggestion_id, feedgame_id, meme_id, title, thought, thoughts, non_anonymous, downloadable, starrable, thoughts_ok, comment_icon, 
                  is_reported, is_in_trash, trash_tally, date, on_profile, is_voice, is_video, stars_show_avg, stars_show_users, blank_thoughts_ok, blank_thoughts_username,
                  
                  commenter_can_determine, voice_comment_path, voice_comments_ok, text_comments_ok, i_can_unlock, u_can_unlock,
                  lock, unlock
            }
         }`;
  return query;
};

export const submitJoinDayWriteContentAndUpdateBallotStringFunc = (
  day_id: number,
  posting_user_id: number,
  ballot_id: number,
  decision: string,
  custom_decision: string | null,
  writeContentType: string,
  leaderboard_str: string
) => {
  const query = `mutation {
            submitJoinDayWriteContentAndUpdateBallot(
               day_id: ${day_id},
               ballot_id: ${ballot_id},
               posting_user_id: ${posting_user_id},
               decision: "${decision}",
               custom_decision: "${custom_decision}",
               leaderboard_str: "${leaderboard_str}"
               writeContentType: "${writeContentType}",
            )
         }`;
  return query;
};

export const loginQueryStringFunc = (email: string, password: string) => {
  const query = `query {
            userLogin(email: "${email}", password: "${password}") {
               id, username, password, email, birthday, joinday, location_id, location_text last_username_change, full_name, icon, cover_photo, gender, orientation,
               ethnicity, role, no_ads, post_order, show_followers, avg_likes, avg_comments, daily_scrolling, avg_scrolling, avg_shares, total_posts,           
               total_followers, total_following, i_can_trash_u, trash_u_today, trash_me_today, trash_u_30, trash_me_30, total_sessions,
               sessions_this_year, vibe_u_today, spam_percent, reported_posts_me, has_reported_u, explicit_posts, has_marked_exp,
               thought_limit, comment_limit, last_vibe_gift, sus_start_date, token, weekly_promo_tally, malicious_action_tally,
               timestamp, is_authorized, is_verified
            }
         }`;
  // timestamp
  return query;
};

export const getUserWithIdQueryStringFunc = (id: number) => {
  const query = `query { getUserWithId(id: ${id}) }`;
  // {
  //    id, username, password, email, birthday, joinday, location_id, location_text last_username_change, full_name, icon, cover_photo, gender, orientation,
  //    ethnicity, role, no_ads, post_order, show_followers, avg_likes, avg_comments, daily_scrolling, avg_scrolling, avg_shares, total_posts,
  //    total_followers, total_following, i_can_trash_u, trash_u_today, trash_me_today, trash_u_30, trash_me_30, total_sessions,
  //    sessions_this_year, vibe_u_today, spam_percent, reported_posts_me, has_reported_u, explicit_posts, has_marked_exp,
  //    thought_limit, comment_limit, last_vibe_gift, sus_start_date, token, weekly_promo_tally, malicious_action_tally,
  //    timestamp, updatedAtBin
  // }
  // timestamp
  return query;
};

export const submitOneThruFiveStarsQueryStringFunc = (
  day_id: number | null,
  event_id: number | null,
  posting_user_id: number,
  scrolling_user_id: number,
  username: string | null,
  user_profile_icon: string | null,
  thought_id: number | null,
  field_id: number | null,
  field_constantsee: string | null,
  message_id: number | null,
  suggestion_id: number | null,
  stars: number
) => {
  const query = `mutation {
            submitOneThruFiveStars(
               event_id: ${event_id}, 
               day_id: ${day_id}, 
               scrolling_user_id: ${scrolling_user_id}, 
               posting_user_id: ${posting_user_id}, 
               username: "${username}", 
               user_profile_icon: "${user_profile_icon}", 
               thought_id: ${thought_id}, 
               field_id: ${field_id}, 
               field_constantsee: "${field_constantsee?.trim()}", 
               message_id: ${message_id}, 
               suggestion_id: ${suggestion_id}, 
               stars: ${stars}
               ) 
               {
               id, day_id, event_id, field_id, user_id, username, user_profile_icon, thought_id, message_id, suggestion_id, stars, timestamp, field_id, field_constantsee
            }
         }`;
  console.log("query", query);
  return query;
};

export const userLikesFieldQueryStringFunc = (
  day_id: number,
  field_id: number,
  field_name: string,
  liked_by_id: number,
  liked_by_username: string,
  liked_by_user_profile_icon: string
) => {
  const query = `mutation {
      userLikesField(
         day_id: ${day_id},
         field_id: ${field_id},
         field_name: "${field_name}",
         liked_by_id: ${liked_by_id},
         liked_by_username: "${liked_by_username}",
         liked_by_user_profile_icon: "${liked_by_user_profile_icon}",
      ) {
         day_id, field_id, field_name, liked_by_id, liked_by_username, liked_by_user_profile_icon, is_like
      }
   }`;
  return query;
};

export const getMostRecentDayPostWithUserIdQueryStringFunc = (
  userId: number
) => {
  const query = `query {
            getMostRecentDayPostWithUserId(userId: ${userId})
         }`;
  // title, caption, non_anonymous, thoughts_ok, shareable, downloadable,
  // id, user_id, location_id, location_text category_id,
  // show_views_ok, show_time_ok, public_likes,
  // rlly_like_ok, rlly_like_group,
  // is_reported, feedface,
  // is_in_trash, trash_tally, date, lock, unlock, sus_content
  return query;
};

export const copyFieldsOntoNewFieldsQueryStringFunc = async (
  fields: any,
  duplicateFields: any,
  duplicateText: any,
  duplicateConstantsee: any,
  duplicateCheckbox: any,
  duplicateUsersCheckboxes: any,
  currDay: any,
  deletingFieldsId: number,
  currUserRecentPostId: number,
  eventId: number | null,
  scrollingUserId: number,
  postingUserId: number,
  postingUsername: string
) => {
  console.log("fields", fields);
  console.log("duplicateFields", duplicateFields);
  console.log("currDay", currDay);
  console.log("deletingFieldsId", deletingFieldsId);
  console.log("currUserRecentPostId", currUserRecentPostId);
  console.log("eventId", eventId);
  console.log("scrollingUserId", scrollingUserId);
  console.log("postingUserId", postingUserId);

  // Split strings into arrays if they are received as single strings within arrays
  const processedDuplicateFields =
    Array.isArray(duplicateFields) && typeof duplicateFields[0] === "string"
      ? duplicateFields[0].split(",").join(" ")
      : duplicateFields;

  console.log("processedDuplicateFields", processedDuplicateFields);

  const processedDuplicateText =
    Array.isArray(duplicateText) && typeof duplicateText[0] === "string"
      ? duplicateText[0].split(",")
      : duplicateText;

  const processedDuplicateConstantsee =
    Array.isArray(duplicateConstantsee) &&
    typeof duplicateConstantsee[0] === "string"
      ? duplicateConstantsee[0].split(",")
      : duplicateConstantsee;

  const processedDuplicateCheckbox =
    Array.isArray(duplicateCheckbox) &&
    typeof duplicateCheckbox[0] === "boolean"
      ? duplicateCheckbox
      : [];

  const processedDuplicateUsersCheckboxes =
    Array.isArray(duplicateUsersCheckboxes) &&
    typeof duplicateUsersCheckboxes[0] === "boolean"
      ? duplicateUsersCheckboxes
      : [];

  const query = `mutation {   
            copyFieldsOntoNewFields(
                  deletingFieldsId: ${deletingFieldsId},
                  duplicateFields: "${processedDuplicateFields}",
                  duplicateText: "${processedDuplicateText}",
                  duplicateConstantsee: "${processedDuplicateConstantsee}",
                  duplicateCheckbox: [${processedDuplicateCheckbox}],   
                  duplicateUsersCheckboxes: [${processedDuplicateUsersCheckboxes}], 
                  currUserRecentPostId: ${currUserRecentPostId},
                  scrollingUserId: ${scrollingUserId},
                  postingUserId: ${postingUserId},
                  postingUsername: "${postingUsername}"
               )
            }`;
  return query;
};

export const submitCommentThoughtALLpassCommentThoughtsTrueQueryStringFunc = (
  day_id: number,
  thought_id: number
) => {
  const query = `mutation {
            submitCommentThoughtALLpassCommentThoughtsTrue(
               day_id: ${day_id},
               thought_id: ${thought_id},
            ) {
               id, unlock_type, day_id, thought_id, user_id, pass_post, pass_post_all, pass_thoughts,  pass_moments, pass_fields, pass_greatfull, pass_comment_thoughts,
                  pass_thoughts_all, pass_moments_all, pass_fields_all, pass_greatfull_all, pass_comment_thoughts_all, pass_ballot_all, pass_ballot
            }
         }`;
  return query;
};

export const updateCommentThoughtALLpassCommentThoughtsFalseQueryStringFunc = (
  day_id: number,
  thought_id: number
) => {
  const query = `mutation {
            updateCommentThoughtALLpassCommentThoughtsFalse(
               day_id: ${day_id},
               thought_id: ${thought_id},
            ) {
               id, unlock_type, day_id, thought_id, user_id, pass_post, pass_post_all, pass_thoughts,  pass_moments, pass_fields, pass_greatfull, pass_comment_thoughts,
                  pass_thoughts_all, pass_moments_all, pass_fields_all, pass_greatfull_all, pass_comment_thoughts_all, pass_ballot_all, pass_ballot
            }
         }`;
  return query;
};

export const submitUserPassCommentLockQueryStringFunc = (
  user_id: number,
  day_id: number,
  thought_id: number
) => {
  // * * * * * reminder   user_is_verified (denormalization measure)
  const query = `mutation { submitUserPassCommentLock (
            user_id: ${user_id},
            day_id: ${day_id}, 
            thought_id: ${thought_id},             
         ) {
            user_id, day_id, thought_id, pass_comment_thoughts
         }
      }`;
  return query;
};

export const getDayStarsQueryStringFunc = (dayId: number) => {
  const query = `query {
            getDayStars(dayId: ${dayId}) {
               id, day_id, stars,
               user_id, username, user_profile_icon,
               thought_id, message_id, suggestion_id,
               timestamp,                
            }
         }`;
  return query;
};

export const submitAnyPassLockForPostQueryStringFunc = (
  day_id: number,
  user_id: number | null | undefined,
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
  pass_ballot_all: boolean | null | undefined
) => {
  const query = `mutation {
            submitAnyPassLockForPost(
               day_id: ${day_id},
               user_id: ${user_id},
               unlock_type: "${unlock_type}",
               pass_post: ${pass_post},
               pass_post_all: ${pass_post_all},
               pass_thoughts: ${pass_thoughts},
               pass_thoughts_all: ${pass_thoughts_all},               
               pass_moments: ${pass_moments},
               pass_moments_all: ${pass_moments_all},
               pass_fields: ${pass_fields},
               pass_fields_all: ${pass_fields_all},
               pass_greatfull: ${pass_greatfull},
               pass_greatfull_all: ${pass_greatfull_all},
               pass_ballot: ${pass_ballot},
               pass_ballot_all: ${pass_ballot_all},
               ) {
                  id, unlock_type, day_id, thought_id, user_id, pass_post, pass_post_all, pass_thoughts,  pass_moments, pass_fields, pass_greatfull, pass_comment_thoughts,
                  pass_thoughts_all, pass_moments_all, pass_fields_all, pass_greatfull_all, pass_comment_thoughts_all, pass_ballot_all, pass_ballot
               }
            }`;
  console.log("query", query);
  return query;
};

export const submitCommentThoughtQueryStringFunc = (
  dayId: number,
  user_id: number,
  username: string,
  event_id: number | null,
  location_text: string | null,
  user_profile_icon: string | null,
  thought: string | null,
  parent_thought_id: number | null,
  comment_icon: string | null,
  greatfullagain_id: number | null,
  moment_id: number | null,
  location_id: number | null,
  thoughts_ok: string | null,
  starrable: string | null,
  stars_show_avg: boolean | null,
  stars_show_users: boolean | null,
  is_voice: boolean | null,
  is_video: boolean | null,
  //
  voice_comments_path: string | null,
  non_anonymous: string | null,
  commenter_can_determine: boolean,
  voice_comments_ok: boolean,
  text_comments_ok: boolean,
  anonymous_comments_ok: boolean,
  i_can_unlock: boolean | null,
  u_can_unlock: boolean | null,
  lock: string | null,
  unlock: string | null
  // downloadable: string|null, non_anonymous:
) => {
  // downloadable: ${downloadable},
  // non_anonymous: "${newCommentNonAnonymous}",
  const query = `mutation { submitComment (
               day_id: ${dayId}, 
               user_id: ${user_id}, username: "${username}", 
               user_profile_icon: "${user_profile_icon || ""}",
               thought: "${thought || null}", 
               thoughts_ok: "${thoughts_ok || ""}", 
               starrable: "${starrable || ""}", 
               location_id: ${location_id || null}, 
               location_text: ${location_text || null}, 
               moment_id: ${moment_id || null}, 
               event_id: ${event_id || null},
               greatfullagain_id: ${greatfullagain_id || null}, 
               stars_show_avg: ${stars_show_avg || null}, 
               stars_show_users: ${stars_show_users || null},
               parent_thought_id: ${parent_thought_id}, 
               comment_icon: "${comment_icon || ""}" ,
               is_video: ${is_video || null},
               is_voice: ${is_voice || null},
               
               voice_comments_path: "${voice_comments_path}",
               non_anonymous: "${non_anonymous || "yes"}",
               commenter_can_determine: ${commenter_can_determine || null},
               voice_comments_ok: ${voice_comments_ok || null},
               text_comments_ok: ${text_comments_ok || null},
               anonymous_comments_ok: ${anonymous_comments_ok || false},
               i_can_unlock: ${i_can_unlock || null},
               u_can_unlock: ${u_can_unlock || null}, 
               lock: "${lock || ""}",
               unlock: "${unlock || ""}" 

               ) { 
                  id, user_id, username, user_profile_icon, user_is_verified, day_id, location_id, location_text, moment_id, greatfullagain_id, parent_thought_id, sus_content,
                  suggestion_id, feedgame_id, meme_id, title, thought, thoughts, non_anonymous, downloadable, starrable, thoughts_ok, comment_icon, 
                  is_reported, is_in_trash, trash_tally, date, on_profile, is_voice, is_video, stars_show_avg, stars_show_users, blank_thoughts_ok, blank_thoughts_username,
                  
                  commenter_can_determine, voice_comment_path, voice_comments_ok, text_comments_ok, i_can_unlock, u_can_unlock,
                  lock, unlock
               } }`;

  // no voice com
  // voice_comment_path: ${voice_comment_path || null},
  return query;
};

export const userLikesActualBallotOptionQueryStringFunc = (
  day_id: number,
  ballot_id: number,
  liked_by_id: number,
  liked_by_username: string,
  liked_by_user_profile_icon: string | null,
  ballot_options_text: number
) => {
  const query = `mutation {
            userLikesActualBallotOption(
               day_id: ${day_id || null},
               ballot_id: ${ballot_id},
               liked_by_id: ${liked_by_id},
               liked_by_username: "${liked_by_username}",
               liked_by_user_profile_icon: "${liked_by_user_profile_icon}",
               ballot_options_text: "${ballot_options_text}",               
            ) {
               day_id, ballot_id, liked_by_id, liked_by_username, liked_by_user_profile_icon, ballot_options_text, ballot_user_submitted_options_users_array_idx, is_like
            }
         }`;
  console.log("query", query);
  return query;
};

export const userLikesActualBallotOptionEventQueryStringFunc = (
  event_id: number,
  ballot_id: number,
  liked_by_id: number,
  liked_by_username: string,
  liked_by_user_profile_icon: string | null,
  ballot_options_text: number
) => {
  const query = `mutation {
            userLikesActualBallotOption(
               event_id: ${event_id || null},
               ballot_id: ${ballot_id},
               liked_by_id: ${liked_by_id},
               liked_by_username: "${liked_by_username}",
               liked_by_user_profile_icon: "${liked_by_user_profile_icon}",
               ballot_options_text: "${ballot_options_text}",               
            ) {
               day_id, event_id, ballot_id, liked_by_id, liked_by_username, liked_by_user_profile_icon, ballot_options_text, ballot_user_submitted_options_users_array_idx, is_like
            }
         }`;
  console.log("query", query);
  return query;
};

export const userLikesProposedBallotOptionQueryStringFunc = (
  day_id: number,
  ballot_id: number,
  liked_by_id: number,
  liked_by_username: string,
  liked_by_user_profile_icon: string | null,
  ballot_user_submitted_options_users_array_idx: number
) => {
  console.log(
    "ballot_user_submitted_options_user_array_idx",
    ballot_user_submitted_options_users_array_idx
  );
  console.log("typeof ", typeof ballot_user_submitted_options_users_array_idx);
  const query = `mutation {
            userLikesProposedBallotOption(
               day_id: ${day_id},
               ballot_id: ${ballot_id},
               liked_by_id: ${liked_by_id},
               liked_by_username: "${liked_by_username}",
               liked_by_user_profile_icon: "${liked_by_user_profile_icon}",
               ballot_user_submitted_options_users_array_idx: ${ballot_user_submitted_options_users_array_idx}
            ) {
               day_id, ballot_id, liked_by_id, liked_by_username, liked_by_user_profile_icon,  ballot_options_text, ballot_user_submitted_options_users_array_idx, is_like
            }
         }`;
  console.log("query", query);
  return query;
};

export const userRatesBallotOptionQueryStringFunc = (
  day_id: number,
  ballot_id: number,
  ballot_options_text: string,
  user_id: number,
  username: string,
  icon: string | null,
  stars: number
) => {
  const query = `mutation {
            userRatesBallotOption(
               day_id: ${day_id},
               ballot_id: ${ballot_id},
               user_id: ${user_id},                              
               username: "${username}",
               icon: "${icon}",
               ballot_options_text: "${ballot_options_text}",
               stars: ${stars},                              
            ) {
               id, day_id, ballot_id, user_id, username, user_profile_icon, thought_id, message_id, suggestion_id, stars, timestamp,
               ballot_options_text, ballot_user_submitted_options_users_array_idx
            }
         }`;
  console.log("query", query);
  return query;
};

export const userRatesProposedBallotOptionQueryStringFunc = (
  day_id: number,
  ballot_id: number,
  ballot_user_submitted_options_users_array_idx: number,
  user_id: number,
  username: string,
  icon: string | null,
  stars: number
) => {
  const query = `mutation {
            userRatesProposedBallotOption(
               day_id: ${day_id},
               ballot_id: ${ballot_id},
               user_id: ${user_id},                              
               username: "${username}",
               icon: "${icon}",
               ballot_user_submitted_options_users_array_idx: ${ballot_user_submitted_options_users_array_idx},
               stars: ${stars},                              
            ) {
               id, day_id, ballot_id, user_id, username, user_profile_icon, thought_id, message_id, suggestion_id, stars, timestamp,
               ballot_options_text, ballot_user_submitted_options_users_array_idx
            }
         }`;
  console.log("query", query);
  return query;
};

export const deleteUserSubmittedVoteButLeaveRecordOfSubmissionQueryStringFunc =
  (
    day_id: number,
    ballot_id: number,
    udatedOptionsAfterDeletingUserSubmittedVote: string,
    user_submitted_options_user_array: string
  ) => {
    const query = `mutation {
            deleteUserSubmittedVoteButLeaveRecordOfSubmission(                
               day_id: ${day_id},
               ballot_id: ${ballot_id},
               udatedOptionsAfterDeletingUserSubmittedVote: "${udatedOptionsAfterDeletingUserSubmittedVote}",
               userSubmittedOptionsUserArray: "${user_submitted_options_user_array}",
           )
         }`;
    console.log("query", query);
    return query;
  };

export const updateBestCommentDecisionQueryStringFunc = (
  day_id: number,
  ballot_id: number,
  decision: string,
  custom_decision: string | null,
  leaderboard_int: any,
  is_pinned_comment: boolean
) => {
  const customDecisionValue =
    custom_decision === null ? "null" : `"${custom_decision}"`;
  const query = `mutation {
            updateBestCommentDecision(
               day_id: ${day_id},
               ballot_id: ${ballot_id},
               decision: "${decision}",
               custom_decision: ${customDecisionValue},
               leaderboard_int: [${leaderboard_int}],
               is_pinned_comment: ${is_pinned_comment},
            ) 
         }`;
  // {
  //    id, day_id, started_by_id, title, description, decision, notes, option,
  //    restriction, options, start_datetime, end_datetime
  // }
  return query;
};

export const deleteCommentVoteQueryStringFunc = (
  vote_id: number,
  vote_int: number,
  vote_type: string,
  day_id: number | null,
  ballot_id: number,
  user_id: number
) => {
  const query = `mutation {
            deleteCommentVote (
               vote_id: ${vote_id},
               vote_int: ${vote_int},
               vote_type: "${vote_type}",            
               day_id: ${day_id},
               ballot_id: ${ballot_id},
               user_id: ${user_id},
            ) {
               id, user_id, username, user_profile_icon, day_id, ballot_id, vote_int, vote_type, vote_string
            }
         }`;
  return query;
};

export const submitCommentVoteQueryStringFunc = (
  user_id: number,
  username: string,
  user_profile_icon: string,
  day_id: number,
  ballot_id: number,
  vote_int: number,
  vote_type: string,
  vote_string: string
) => {
  const query = `mutation {
            submitCommentVote (
               user_id: ${user_id},
               username: "${username}",
               user_profile_icon: "${user_profile_icon}",
               day_id: ${day_id},
               ballot_id: ${ballot_id},
               vote_int: ${vote_int},
               vote_type: "${vote_type}",
               vote_string: "${vote_string}",
            ) {
               id, user_id, username, user_profile_icon, day_id, ballot_id, vote_int, vote_type, vote_string
            }
         }`;
  return query;
};

export const submitJoinDayVoteQueryStringFunc = (
  day_id: number,
  ballot_id: number,
  user_id: number,
  username: string,
  user_profile_icon: string,
  vote_string: string | null,
  vote_type: string
) => {
  const query = `mutation {
            submitJoinDayVote(
               day_id: ${day_id}
               ballot_id: ${ballot_id}
               user_id: ${user_id}
               username: "${username}"
               user_profile_icon: "${user_profile_icon}"
               vote_string: "${vote_string}"
               vote_type: "${vote_type}"               
            ) {
               id, day_id, ballot_id, user_id, username, user_profile_icon, vote_string, vote_int, vote_type
            }
         }`;
  return query;
};

export const submitVoteQueryStringFunc = (
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
  const query = `mutation {
            submitVote(
               day_id: ${day_id}
               ballot_id: ${ballot_id}
               user_id: ${user_id}
               username: "${username}"
               user_profile_icon: "${user_profile_icon}"
               vote_string: "${vote_string}"
               vote_type: "${vote_type}"               
               non_anonymous: ${non_anonymous}              
               is_option: ${is_option}               
            ) {
               id, day_id, ballot_id, user_id, username, user_profile_icon, vote_string, vote_int, vote_type,
               non_anonymous, is_option
            }
         }`;
  return query;
};

export const postingUserApprovesProposedVoteQueryStringFunc = (
  day_id: number,
  ballot_id: number,
  user_submitted_options_is_approved_array: string
) => {
  console.log(
    "user_submitted_options_is_approved_array",
    user_submitted_options_is_approved_array
  );
  const query = `mutation {
            postingUserApprovesProposedVote(
               day_id: ${day_id},
               ballot_id: ${ballot_id},
               user_submitted_options_is_approved_array: "${user_submitted_options_is_approved_array}",
            )
         }`;
  console.log("query", query);
  return query;
};

export const updateSubmittedBallotOptionsAndUserArrayQueryStringFunc = (
  day_id: number,
  ballot_id: number,
  options: string,
  user_submitted_options_user_array: string,
  user_submitted_options_is_approved_array: string | null
) => {
  const query = `mutation {
            updateUserSubmittedBallotOptionsAndUserArray(
               day_id: ${day_id},
               ballot_id: ${ballot_id},
               options: "${options}",
               user_submitted_options_user_array: "${user_submitted_options_user_array}",
               user_submitted_options_is_approved_array: "${user_submitted_options_is_approved_array}"
            )
         }`;
  console.log("query", query);
  return query;
};

export const finishVoteAndUpdateBallotQueryStringFunc = (
  day_id: number,
  ballot_id: number,
  decision: string,
  custom_decision: string | null,
  leaderboard: string[] | number[] | null
) => {
  const query = `mutation {
            finishVoteAndUpdateBallot(
               day_id: ${day_id},
               ballot_id: ${ballot_id},
               decision: "${decision}",
               custom_decision: "${custom_decision}",
               leaderboard_str: "${leaderboard}"
            )
         }`;
  return query;
};

export const deleteLocationQueryStringFunc = (
  day_id: number,
  location_id: number
) => {
  const query = `mutation {
      deleteLocation(
         day_id: ${day_id},
         location_id: ${location_id},         
      ) {
         id, nickname, city, state, zip_code, country, submitting_user_id, is_approved
      }
   }`;
  return query;
};

export const addNewProposedLocationQueryStringFunc = async (
  nickname: string | null,
  city: string | null,
  state: string | null,
  zip_code: string | null,
  country: string | null,
  submitting_user_id: number
) => {
  const query = `mutation {
      addNewProposedLocationFunc(
         nickname: "${nickname}",
         city: "${city}",
         state: "${state}",
         zip_code: "${zip_code}",
         country: "${country}",
         submitting_user_id: ${submitting_user_id}
      ) {
         id, nickname, city, state, zip_code, country, submitting_user_id, is_approved
      }
   }`;
  return query;
};

export const uploadContentQueryStringFunc = (
  username: string,
  stringedDayObj: any,
  stringedThoughts: any,
  stringedMoments: any,
  stringedFields: any,
  stringedGreatfull: any,
  stringedUploadDayDecideDo: any,
  stringedBallots: any
) => {
  const query = `mutation {
       uploadContent(
         username:        "${username}"  
         stringedDayObj: "${stringedDayObj.replace(/"/g, '\\"')}",
         stringedThoughts: "${stringedThoughts.replace(/"/g, '\\"')}",
         stringedMoments: "${stringedMoments.replace(/"/g, '\\"')}",
         stringedFields: "${stringedFields.replace(/"/g, '\\"')}",
         stringedUploadDayDecideDo: "${stringedUploadDayDecideDo.replace(
           /"/g,
           '\\"'
         )}",
         stringedGreatfull: "${stringedGreatfull.replace(/"/g, '\\"')}"
         stringedBallots: "${stringedBallots.replace(/"/g, '\\"')}"
         )
   }`;
  console.log("query", query);
  return query;
};

export const updateEditedContentQueryStringFunc = (
  stringedDayObj: any,
  stringedThoughts: any,
  stringedMoments: any,
  stringedFields: any,
  stringedGreatfull: any,
  stringedUploadDayDecideDo: any,
  stringedBallots: any
) => {
  const query = `mutation {
       updateEditedContent(
         stringedDayObj: "${stringedDayObj.replace(/"/g, '\\"')}",
         stringedThoughts: "${stringedThoughts.replace(/"/g, '\\"')}",
         stringedMoments: "${stringedMoments.replace(/"/g, '\\"')}",
         stringedFields: "${stringedFields.replace(/"/g, '\\"')}",
         stringedUploadDayDecideDo: "${stringedUploadDayDecideDo.replace(
           /"/g,
           '\\"'
         )}",
         stringedGreatfull: "${stringedGreatfull.replace(/"/g, '\\"')}"
         stringedBallots: "${stringedBallots.replace(/"/g, '\\"')}"
         )
   }`;
  console.log("query", query);
  return query;
};

export const submitOrUpdateEventAttendanceQueryStringFunc = (
  event_id: number,
  event_name: string,
  profile_user_id: number,
  user_id: number,
  username: string,
  user_profile_icon: string | null,
  going: string,
  status: string | null
) => {
  const statusString = status === null ? "null" : `${status}`;

  const query = `mutation {
      submitOrUpdateEventAttendance(
         event_id: ${event_id},
         event_name: "${event_name}",
         profile_user_id: ${profile_user_id},
         user_id: ${user_id},
         username: "${username}",
         user_profile_icon: "${user_profile_icon}",
         going: "${going}"
         status: "${statusString}"
      )
   }`;
  return query;
};

export const profileAllUserEventsGETQueryStringFunc = (userId: number) => {
  const query = `query {
      profileAllUserEventsGET(userId: ${userId})
   }`;
  return query;
};

export const allProfileFollowersGETQueryStringFunc = (userId: number) => {
  const query = `query {
      allProfileFollowersGET(userId: ${userId}) {
         user_id, follower_id, 
      }
   }`;
  return query;
};

export const profileGetAllFollowersAndFollowedUsersGETQueryStringFunc = (
  userId: number
) => {
  const query = `query {
      profileGetAllFollowersAndFollowedUsersGET(userId:${userId})
   }`;
  return query;
};

export const ALLuserUploadedContentStringWithBlobsQueryStringFunc = (
  user_id: number
) => {
  const query = `query {
      ALLuserUploadedContentStringWithBlobs(user_id: ${user_id})
      }`;
  return query;
};

export const ALLuserProfileDataStringQueryStringFunc = (userId: number) => {
  const query = `query {
      ALLuserProfileDataString(userId: ${userId}) 
   }`;
  return query;
};

export const getUserPrivacySettingsWithUserIdQueryStringFunc = (
  userId: number
) => {
  const query = `query {
            getUserPrivacySettingsWithUserId(userId: ${userId}) {
               id, user_id, private_acct,
               share_data, prankable, opt_in_feedgame, opt_in_thoughtblank, opt_in_allours,
               show_history, show_friends, 
               can_msg, anon_msg, can_mention
            }
         }`;
  return query;
};

export const doWeFollowEachOtherQueryStringFunc = (
  meId: number,
  youId: number
) => {
  const query = `query {
            doWeFollowEachOther(meId: ${meId}, youId: ${youId}) {
               iFollowThem, theyFollowMe
            }
         }`;
  return query;
};

export const doWeBlockEachOtherQueryStringFunc = (
  meId: number,
  youId: number
) => {
  const query = `query {
            doWeBlockEachOther(meId: ${meId}, youId: ${youId}) {
               iBlockThem, theyBlockMe
            }
         }`;
  return query;
};

export const profileAllListenersGETQueryStringFunc = (profileId: number) => {
  const query = `query {
      profileAllListenersGET(profileId: ${profileId}) {
      id
      day_id
      user_id
      profile_id
      is_listening
   }
   }`;
  return query;
};

export const deleteUserListeningQueryStringFunc = (
  profileId: number,
  userId: number
) => {
  const query = `query {
      profileListenersDelete(
         profileId: ${profileId}
         userId: ${userId}
      ) {
      id
      day_id
      user_id
      profile_id
      is_listening
   }
   }`;
  return query;
};

export const addUserListeningQueryStringFunc = (
  profileId: number,
  userId: number
) => {
  const query = `query {
      profileListenersAdd(
         profileId: ${profileId}
         userId: ${userId}
      ) {
      id
      day_id
      user_id
      profile_id
      is_listening
   }
   }`;
  return query;
};

export const getUserUploadedContentWithUserIdQueryStringFunc = (
  userId: number
) => {
  const query = `query {
      getUserUploadedContentWithUserId(userId:${userId})
   }`;
  return query;
};

const escape = (val: string | null | undefined) =>
  val != null ? JSON.stringify(val) : "null";

export const updateUserProfileQueryStringFunc = (c: any) => {
  return `
mutation {
  updateUserProfile(
    profile_id: ${c.profile_id},
    user_id: ${c.user_id},
    username: ${escape(c.username)},
    user_profile_icon: ${escape(c.user_profile_icon)},
    name: ${escape(c.name)},
    pronouns: ${escape(c.pronouns)},
    bio: ${escape(c.bio)},
    creator_acct: ${escape(c.creator_acct)},
    linkleafs: ${JSON.stringify(c.linkleafs || [])},
    current_vibe: ${escape(c.current_vibe)},
    location_id: ${c.location_id},
    location_text: ${escape(c.location_text)},
    user_is_verified: ${c.user_is_verified},

    text_1_header: ${escape(c.text_1_header)},
    text_1_caption: ${escape(c.text_1_caption)},
    text_2_header: ${escape(c.text_2_header)},
    text_2_caption: ${escape(c.text_2_caption)},
    text_3_header: ${escape(c.text_3_header)},
    text_3_caption: ${escape(c.text_3_caption)},
    text_4_header: ${escape(c.text_4_header)},
    text_4_caption: ${escape(c.text_4_caption)},
    text_5_header: ${escape(c.text_5_header)},
    text_5_caption: ${escape(c.text_5_caption)},
    text_6_header: ${escape(c.text_6_header)},
    text_6_caption: ${escape(c.text_6_caption)},
    text_7_header: ${escape(c.text_7_header)},
    text_7_caption: ${escape(c.text_7_caption)},

    show_friend_count: ${c.show_friend_count},
    show_events_current: ${escape(c.show_events_current)},
    show_events_past: ${escape(c.show_events_past)}
  ) {
    id
    username
    name
    bio
    user_profile_icon
    pronouns
    creator_acct
    linkleafs
    current_vibe
    location_id
    location_text
    user_is_verified

    text_1_header
    text_1_caption
    text_2_header
    text_2_caption
    text_3_header
    text_3_caption
    text_4_header
    text_4_caption
    text_5_header
    text_5_caption
    text_6_header
    text_6_caption
    text_7_header
    text_7_caption

    show_friend_count
    show_events_current
    show_events_past
  }
}`;
};

export const updateUserPrivacyQueryStringFunc = (
  profile_id: number,
  user_id: number,
  private_acct: boolean,
  can_msg: string,
  anon_msg: string,
  anon_comment_icon: string | null,
  custom_notification_me: string | null,
  custom_notification_u: string | null,
  wits_fields_notes_ok: boolean | null,
  show_fasting_field_ok: boolean | null,
  share_data: boolean | null,
  prankable: boolean | null,
  opt_in_feedgame: boolean | null,
  opt_in_thoughtblank: boolean | null,
  opt_in_allours: boolean | null,
  show_history: boolean | null,
  show_loc_in_comments: string | null,
  commenting_from_location: string | null,
  show_on_followers_list: boolean | null,
  show_on_followed_users_list: boolean | null,
  can_request_chill: string | null,
  show_chill_ppl_me: boolean | null,
  show_chill_ppl_u: boolean | null,
  chill_list_me: boolean | null,
  chill_list_u: boolean | null,
  chill_msg_ok: string | null,
  can_mention: string | null
) => {
  const query = `mutation {
      updateUserPrivacy
         profile_id
         user_id: ${user_id}
         private_acct: ${private_acct}
         can_msg: "${can_msg}"
         anon_msg: "${anon_msg}"
         anon_comment_icon: "${anon_comment_icon}"
         custom_notification_me: "${custom_notification_me}"
         custom_notification_u: "${custom_notification_u}"
         wits_fields_notes_ok: ${wits_fields_notes_ok}
         show_fasting_field_ok: ${show_fasting_field_ok}
         share_data: ${share_data}
         prankable: ${prankable}
         opt_in_feedgame: ${opt_in_feedgame}
         opt_in_thoughtblank: ${opt_in_thoughtblank}
         opt_in_allours: ${opt_in_allours}
         show_history: ${show_history}
         show_loc_in_comments: "${show_loc_in_comments}"
         commenting_from_location: "${commenting_from_location}"
         show_on_followers_list: ${show_on_followers_list}
         show_on_followed_users_list: ${show_on_followed_users_list}
         can_request_chill: ${can_request_chill}
         show_chill_ppl_me: ${show_chill_ppl_me}
         show_chill_ppl_u: ${show_chill_ppl_u}
         chill_list_me: ${chill_list_me}
         chill_list_u: ${chill_list_u}
         chill_msg_ok: "${chill_msg_ok}"
         can_mention: "${can_mention}"
      )
   }`;
  console.log("query", query);
  return query;
};

export const createChillRequestEventQueryStringFunc = (
  hosting_user_id: number,
  hosting_username: string,
  hosting_user_profile_icon: string | null,
  invited_user_id: number,
  invited_username: string,
  invited_user_profile_icon: string | null,
  event_name: string,
  description: string
) => {
  const query = `mutation {
      createChillRequestEvent(
         hosting_user_id: ${hosting_user_id},
         hosting_username: "${hosting_username}",
         hosting_user_profile_icon: "${hosting_user_profile_icon}",
         invited_user_id: ${invited_user_id},
         invited_username: "${invited_username}",
         invited_user_profile_icon: "${invited_user_profile_icon}",
         event_name: "${event_name}",
         description: "${description}"
      )
   }`;
  return query;
};

export const deleteNotificationQueryStringFunc = (
  notificationId: number,
  userId: number
) => {
  const query = `mutation {
      deleteNotification (
        notificationId: ${notificationId}           
        userId: ${userId}           
      ) {    
        id, for_user_id, date, notification_json_string        
      }      
    }
    `;
  return query;
};

export const getMyNotificationsWithUserIDqueryStringFunc = (userId: number) => {
  const query = `query {
      getMyNotificationsWithUserID(
         userId: ${userId}
      ) {
         id, for_user_id, notification_json_string
      }
   }`;
  return query;
};

export const getCurrentUserNotificationsQueryStringFunc = (userId: number) => {
  const query = `query {
            getCurrentUserNotifications (
              userId: ${userId}           
            ) {              
              from_user_id, for_user_id, from_app, day_id, day_icon, 
              thought_id, moment_id, field_id, invite_id, listener_id, 
              share_id, like_id, star_id, reaction_id, vibe_id,
              payment_id, prank_id, feedgame_id, message_id, 
              report_id, user_pass_lock_id, user_allowed_to_unlock_id,
              user_allowed_to_unlock_id, ballot_id, custom_notification,
              is_read, is_request, type
            }      
          }
          `;
  return query;
};

export const deleteCommentQueryStringFunc = (
  day_id: number | null,
  event_id: number | null,
  thought_id: number,
  is_voice: boolean | null,
  voice_comment_path: string | null
) => {
  const customVoiceCommentPathVal =
    voice_comment_path === null ? "null" : `"${voice_comment_path}"`;

  console.log("thought_id construction", thought_id);

  const query = `mutation {
            deleteComment(
               day_id: ${day_id},
               event_id: ${event_id},
               thought_id: ${thought_id},
               is_voice: ${is_voice},
               voice_comment_path: ${customVoiceCommentPathVal}
            )
         }`;
  return query;
};

export const userBlocksUserQueryStringFunc = (
  user_id: number | null,
  blocked_id: number,
  is_shadow_ban: boolean | null,
  feedback: string | null,
  notes: string | null
) => {
  const query = `mutation {
            blockUser (
               user_id: ${user_id || null},
               blocked_id: ${blocked_id || null},
               is_shadow_ban: ${is_shadow_ban || null},
               feedback: ${feedback || null},
               notes: ${notes || null},
            ) {
               user_id, blocked_id, is_shadow_ban, feedback, notes
            }
         }`;
  return query;
};

export const submitUserPassCustomLocksByTableQueryStringFunc = (
  day_id: number,
  userGettingUnlocked: number,
  userGivingUnlocked: number,
  tables: any,
  unlockType: string
) => {
  const query = `mutation {
      submitUserPassCustomLocksByTable(
         day_id: ${day_id},
         userGettingUnlocked: ${userGettingUnlocked},
         userGivingUnlocked: ${userGivingUnlocked},
         tables: "${tables}",
         unlockType: "${unlockType}",
      ) {
         id, unlock_type, day_id, thought_id, user_id, pass_post, pass_post_all, pass_thoughts,  pass_moments, pass_fields, pass_greatfull, pass_comment_thoughts,
                  pass_thoughts_all, pass_moments_all, pass_fields_all, pass_greatfull_all, pass_comment_thoughts_all, pass_ballot_all, pass_ballot
      }
   }`;
  console.log("query", query);
  return query;
};

export const userWentWithVoteUpdateQueryStringFunc = (
  day_id: number,
  event_id: number,
  ballot_id: number,
  currentWentWithVoteUpdateStatus: boolean
) => {
  const query = `mutation {
      userWentWithVoteUpdate(
         day_id: ${day_id},
         event_id: ${event_id},
         ballot_id: ${ballot_id},
         currentWentWithVoteUpdateStatus: ${currentWentWithVoteUpdateStatus},
      )
   }`;
  return query;
};

export const verifyEmailQueryStringFunc = (userId: number) => {
  const query = `mutation {
      verifyEmail(
         userId: ${userId}
      ) {
          id, username, password, email, birthday, joinday, 
         location_id, last_username_change, full_name, icon, cover_photo, gender, orientation,  
         total_followers, total_following, i_can_trash_u, trash_u_today, trash_me_today, trash_u_30, trash_me_30, total_sessions,
         ethnicity, role, no_ads, post_order, show_followers, avg_likes, avg_comments, daily_scrolling, avg_scrolling, avg_shares, total_posts,           
         sessions_this_year, vibe_u_today, spam_percent, reported_posts_me, has_reported_u, explicit_posts, has_marked_exp,
         thought_limit, comment_limit, last_vibe_gift, sus_start_date, token, weekly_promo_tally, malicious_action_tally,
         timestamp, 
      }
   }`;
  console.log("query", query);
  return query;
};

// export const allUsersGETquery = `query { allUsersGET }`

export const testQueryStringFunc = () => {
  const query = `query { test }`;
  return query;
};

export const daysGETwithDATEQueryStringFunc = (date: string) => {
  const query = `query { daysGETwithDATE (
      date: ${date}
   )
   }`;
  return query;
};

export const daysGETmonthOfQueryStringFunc = (month: string, year: string) => {
  const query = `query { daysGETmonthOf (
      month: "${month}",
      year: "${year}"
   )
   }`;
  return query;
};

export const daysGETtrendingWithMonthAndYearQueryStringFunc = (
  month: string,
  year: string
) => {
  const query = `query { daysGETtrendingWithMonthAndYear (
      month: "${month}",
      year: "${year}"
   )
   }`;
  return query;
};

export const daysGETtrendingWeekOfQueryStringFunc = (
  day: string,
  month: string,
  year: string
) => {
  const query = `query { daysGETtrendingWeekOf } (
      day: "${day}",
      month: "${month}",
      year: "${year}",
   )`;
  return query;
};

export const daysGETweekOfQueryStringFunc = (
  day: string,
  month: string,
  year: string
) => {
  const query = `query { daysGETweekOf } (
      day: "${day}",
      month: "${month}",
      year: "${year}",
   )`;
  return query;
};

export const daysGETtrendingDayOfQueryStringFunc = (
  day: string,
  month: string,
  year: string
) => {
  const query = `query { daysGETtrendingDayOf } (
      day: "${day}",
      month: "${month}",
      year: "${year}",
   )`;
  return query;
};

export const daysGETdayOfQueryStringFunc = (
  day: string,
  month: string,
  year: string
) => {
  const query = `query { daysGETdayOf } (
      day: "${day}",
      month: "${month}",
      year: "${year}",
   )`;
  return query;
};

export const daysGETtrendingRandomQueryStringFunc = (num: number) => {
  const query = `query { daysGETtrendingRandom } (
      num: "${num}",      
   )`;
  return query;
};

export const sendVerificationEmailSendGridQueryStringFunc = (
  destination: string,
  userId: number
) => {
  const query = `mutation {
      sendVerificationEmailSendGrid(
         destination: "${destination}",
         userId: ${userId}
      )
   }`;
  return query;
};

export const sendMobileTestLinkSendgridAndroidQueryStringFunc = (
  destination: string,
  userId: number
) => {
  const query = `mutation {
      sendMobileTestLinkSendgridAndroid(
         destination: "${destination}",
         userId: ${userId}
      )
   }`;
  return query;
};

export const sendMobileTestLinkSendgridAppleQueryStringFunc = (
  destination: string,
  userId: number
) => {
  const query = `mutation {
      sendMobileTestLinkSendgridApple(
         destination: "${destination}",
         userId: ${userId}
      )
   }`;
  return query;
};

export const deleteFolderQueryStringFunc = (prefix: string) => {
  const query = `mutation {
      deleteFolder(
         prefix: "${prefix}",         
      )
   }`;
  return query;
};

export const deletePostQueryStringFunc = (dayId: number) => {
  const query = `mutation {
      deletePost(
         dayId: ${dayId},         
      )
   }`;
  return query;
};

export const searchContentAndUsersQueryStringFunc = (
  searchTerm: string,
  viewerId: number
) => {
  const query = `query {
      searchContentAndUsers(
         searchTerm: "${searchTerm}",         
         viewerId: ${viewerId},         
      )
   }`;
  return query;
};
