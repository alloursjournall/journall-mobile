import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface profileSliceState {
    CURR_PROFILE: any
    PROFILE_USER_PRIVACY: any
    USERS_FOLLOWING_PROFILE_USER_COUNT: number;
    USERS_THAT_PROFILE_USER_FOLLOWS_COUNT: number
    PROFILE_USER_CONTENT_BUCKET: any[];
    PROFILE_LISTENERS: any[]
    FIELD_SPARKS: any;
    IS_CURRENT_USER_BLOCKED_BY_PROFILE_USER: boolean;
    DATA_ROW_CLICKED: string;
    CONTENT_DISPLAY_CLICKED: string;
    // t.followers
    RELEVANT_FOLLOWER_DATA: any[]
    // t.users from the followers and followed users (maybe less confusing way to do this)
    FOLLOWERS_N_FOLLOWED_USERS: any[]
    SELECTED_UPLOADED_CONTENT: any;
    
    USER_EVENTS: any[]
    NEXT_EVENT: any;
    // LOGGED_IN_USER_CAN_SEE_PROFILE: boolean;
    
    // 🚨 🚨 edit settings        also: (i.e):  DATA_ROW -> EDIT_DATA_ROW
    EDIT_CURR_PROFILE: any;
    SHOW_EDIT_PROFILE: boolean;
    EDIT_CONTENT_DISPLAY_CLICKED: string;
    SHOW_SETTINGS_MENU: boolean;
    EDIT_DATA_ROW_CLICKED: string; // not editing the row, the DATA_ROW state on the <EditProfile> section
    SHOW_EDIT_DAY_CONTENT: boolean;
}

const initialState: profileSliceState = {
    CURR_PROFILE: {},
    PROFILE_USER_PRIVACY: {},
    PROFILE_USER_CONTENT_BUCKET: [],
    USERS_FOLLOWING_PROFILE_USER_COUNT: 0,
    USERS_THAT_PROFILE_USER_FOLLOWS_COUNT: 0,
    PROFILE_LISTENERS: [],
    FIELD_SPARKS: [],
    IS_CURRENT_USER_BLOCKED_BY_PROFILE_USER: false,
    DATA_ROW_CLICKED: '',
    CONTENT_DISPLAY_CLICKED: '',
    RELEVANT_FOLLOWER_DATA: [],
    FOLLOWERS_N_FOLLOWED_USERS: [],

    SELECTED_UPLOADED_CONTENT: null,

    USER_EVENTS: [],
    NEXT_EVENT: {},

    EDIT_CURR_PROFILE: {},
    SHOW_SETTINGS_MENU: false,
    EDIT_CONTENT_DISPLAY_CLICKED: '',
    SHOW_EDIT_PROFILE: false,
    EDIT_DATA_ROW_CLICKED: '',
    SHOW_EDIT_DAY_CONTENT: false
};
                    
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    SET_CURR_PROFILE: (state, action) => { state.CURR_PROFILE = action.payload },
    SET_PROFILE_USER_PRIVACY: (state, action) => { state.PROFILE_USER_PRIVACY = action.payload },
    SET_PROFILE_USER_CONTENT_BUCKET: (state, action) => { state.PROFILE_USER_CONTENT_BUCKET = action.payload },
    SET_USERS_FOLLOWING_PROFILE_USER_COUNT: (state, action) => { state.USERS_FOLLOWING_PROFILE_USER_COUNT = action.payload },
    SET_USERS_THAT_PROFILE_USER_FOLLOWS_COUNT: (state, action) => { state.USERS_THAT_PROFILE_USER_FOLLOWS_COUNT = action.payload },

    SET_PROFILE_LISTENERS: (state, action) => { state.PROFILE_LISTENERS = action.payload },
    SET_FIELD_SPARKS: (state, action) => { state.FIELD_SPARKS = action.payload },
    TOGGLE_IS_CURRENT_USER_BLOCKED_BY_PROFILE_USER: (state) => { state.IS_CURRENT_USER_BLOCKED_BY_PROFILE_USER = !state.IS_CURRENT_USER_BLOCKED_BY_PROFILE_USER },
    SET_DATA_ROW_CLICKED: (state, action) => { state.DATA_ROW_CLICKED = action.payload },
    SET_CONTENT_DISPLAY_CLICKED: (state, action) => { state.CONTENT_DISPLAY_CLICKED = action.payload },
    SET_RELEVANT_FOLLOWER_DATA: (state, action) => { state.RELEVANT_FOLLOWER_DATA = action.payload },
    SET_FOLLOWERS_N_FOLLOWED_USERS: (state, action) => { state.FOLLOWERS_N_FOLLOWED_USERS = action.payload },
    
    SET_SELECTED_UPLOADED_CONTENT: (state, action) => { state.SELECTED_UPLOADED_CONTENT = action.payload },
    SET_USER_EVENTS: (state, action) => { state.USER_EVENTS = action.payload },
    SET_NEXT_EVENT: (state, action) => { state.NEXT_EVENT = action.payload },


    SET_EDIT_CURR_PROFILE: (state, action) => { state.EDIT_CURR_PROFILE = action.payload },
    SET_EDIT_CONTENT_DISPLAY_CLICKED: (state, action) => { state.EDIT_CONTENT_DISPLAY_CLICKED = action.payload },
    TOGGLE_SHOW_SETTINGS_MENU: (state) => { state.SHOW_SETTINGS_MENU = !state.SHOW_SETTINGS_MENU },
    TOGGLE_SHOW_EDIT_PROFILE: (state) => { state.SHOW_EDIT_PROFILE = !state.SHOW_EDIT_PROFILE },
    SET_EDIT_DATA_ROW_CLICKED: (state, action) => { state.EDIT_DATA_ROW_CLICKED = action.payload },
    TOGGLE_SHOW_EDIT_DAY_CONTENT: (state) => { state.SHOW_EDIT_DAY_CONTENT = !state.SHOW_EDIT_DAY_CONTENT },
    
  },
});

export const 
{ 
    SET_CURR_PROFILE, SET_PROFILE_USER_PRIVACY, SET_PROFILE_USER_CONTENT_BUCKET, 
    SET_PROFILE_LISTENERS, SET_FIELD_SPARKS, TOGGLE_IS_CURRENT_USER_BLOCKED_BY_PROFILE_USER, 
    SET_USERS_FOLLOWING_PROFILE_USER_COUNT, SET_USERS_THAT_PROFILE_USER_FOLLOWS_COUNT,
    SET_CONTENT_DISPLAY_CLICKED, SET_DATA_ROW_CLICKED, 
    SET_RELEVANT_FOLLOWER_DATA, SET_FOLLOWERS_N_FOLLOWED_USERS,
    SET_SELECTED_UPLOADED_CONTENT,
    SET_USER_EVENTS, SET_NEXT_EVENT, TOGGLE_SHOW_SETTINGS_MENU,

    SET_EDIT_CURR_PROFILE, SET_EDIT_CONTENT_DISPLAY_CLICKED, 
    TOGGLE_SHOW_EDIT_PROFILE, SET_EDIT_DATA_ROW_CLICKED,    

    TOGGLE_SHOW_EDIT_DAY_CONTENT
    
} = profileSlice.actions;

export default profileSlice.reducer;
export type ProfileState = profileSliceState;
