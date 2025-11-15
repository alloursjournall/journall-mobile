import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { userINTERFACE, cookieTokenINTERFACE } from 'Interface/InterfaceTypes';

interface currentUserSliceState {
  CURRENT_USER: any, // userINTERFACE,
  CURRENT_USER_TOKEN: any // cookieTokenINTERFACE,
  CURRENT_USER_NOTIFICATIONS: any[],
  CURRENT_USER_PRIVACY: any,
  CURRENT_USER_MOST_RECENT_POST: any,
  // CURRENT_USER_PRIVACY_TABLE: 
}

//   id, location_id, username, email, password, birthday, joinday, last_username_change, full_name, profile_picture,
// icon, cover_photo, ballot_title, gender, orientation, ethnicity, role, no_ads, post_order, show_followers,
// avg_likes, avg_comments, daily_scrolling, avg_scrolling, avg_shares, total_posts, total_followers, total_following, 
// i_can_trash_u, trash_u_today, trash_me_today, trash_u_30, trash_me_30, total_sessions, sessions_this_year,
// vibe_u_today, last_vibe_gift, spam_percent, reported_posts_me, sus_start_date, has_reported_u,
// explicit_posts, has_marked_exp, thought_limit, comment_limit, timestamp

const initialState: currentUserSliceState = {
    // CURRENT_USER: {},
  CURRENT_USER: {
     id: 0,
     location_id: 0,
     username: 'me', email: '', password: '', is_verified: false,  birthday: '11-21-1992', joinday: '', last_username_change: '',
     full_name: '', icon: '', cover_photo: '', gender: '', orientation: '', ethnicity: '', role: '', 
     no_ads: false, post_order: '', show_followers: true, 
     avg_likes: 0, avg_comments: 0, daily_scrolling: 0, avg_scrolling: 0, avg_shares: 0, total_posts: 0, total_followers: 0, total_following: 0,
     i_can_trash_u: 0, trash_u_today: 0, trash_me_today: 0, trash_u_30: 0, trash_me_30: 0, total_sessions: 0, sessions_this_year: 0,
     vibe_u_today: 0, last_vibe_gift: 'never', spam_percent: 0, 
     reported_posts_me: 0, sus_start_date: '', has_reported_u: 0, 
     explicit_posts: 0, has_marked_exp: 0, thought_limit: 0, comment_limit: 30, timestamp: '', token: ''
  },
  
  CURRENT_USER_TOKEN: { id: 0, username: 'no name', token: 'no token' },
  CURRENT_USER_NOTIFICATIONS: [],
  CURRENT_USER_PRIVACY: { },
  CURRENT_USER_MOST_RECENT_POST: {}
};
                    
const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    // SET_VIEW_SELECTED_STRAIN: (state, action) => { state.VIEW_SELECTED_STRAIN = action.payload; },
    SET_CURRENT_USER: (state, action) => { state.CURRENT_USER = action.payload; },    
    SET_CURRENT_USER_TOKEN: (state, action) => { state.CURRENT_USER_TOKEN = action.payload; },    
    SET_CURRENT_USER_NOTIFICATIONS: (state, action) => { state.CURRENT_USER_NOTIFICATIONS = action.payload; },    
    SET_CURRENT_USER_PRIVACY: (state, action) => { state.CURRENT_USER_PRIVACY = action.payload; },    
    
    SET_CURRENT_USER_MOST_RECENT_POST: (state, action) => { state.CURRENT_USER_MOST_RECENT_POST = action.payload; },    
  },
});

export const 
{ 
    SET_CURRENT_USER, SET_CURRENT_USER_TOKEN, SET_CURRENT_USER_NOTIFICATIONS, SET_CURRENT_USER_MOST_RECENT_POST, SET_CURRENT_USER_PRIVACY
} = currentUserSlice.actions;

export default currentUserSlice.reducer;
export type currentUserState = currentUserSliceState;
