import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface appSliceState {
  SHOW_NEW_CONTENT_OR_ACTIVITY: boolean;
  CURRENT_PAGE: string;
  CURRENT_PAGE_WIDTH: number;
  CURRENT_PAGE_HEIGHT: number;

  TRANSLATABLE_MESSAGES: any;
  CURRENT_LOCALE: string;
  CURRENT_LANGUAGE: string;

  ALL_USERS: any[];
  ALL_USERS_ICONS: any[];
  ALL_FOLLOWERS: any[];
  ALL_BLOCKS: any[];
  ALL_LOCATIONS: any[]
  ALL_CATEGORIES: any[]
  ALL_MY_NOTIFICATIONS: any[];
  
  ALL_USERNAMES: string[];
  ALL_EMAILS: string[];
  
  LOADING: boolean;
  
  // might have the app error (i) icon in the toolbar like a CRM
  APP_ERROR: any
  TODAY_IS_WEEKEND: boolean;
  LOCALE: string;
  SHOW_NOTIFICATIONS: boolean;
  SHOW_SELECTED_CONTENT_FROM_NOTIFICATIONS: boolean;
  CURR_DAY_FROM_NOTIFICATION_CLICK: any
  CURR_EVENT_FROM_NOTIFICATION_CLICK: any
}

const initialState: appSliceState = {
  SHOW_NEW_CONTENT_OR_ACTIVITY: false,
  CURRENT_PAGE: '',
  CURRENT_PAGE_WIDTH: 0,
  CURRENT_PAGE_HEIGHT: 0, 

  TRANSLATABLE_MESSAGES: {},
  CURRENT_LOCALE: '',
  CURRENT_LANGUAGE: '',

  ALL_USERS: [],
  ALL_USERS_ICONS: [],
  ALL_FOLLOWERS: [],
  ALL_BLOCKS: [],
  ALL_LOCATIONS: [],
  ALL_CATEGORIES: [],
  ALL_MY_NOTIFICATIONS: [],

  ALL_USERNAMES: [],
  ALL_EMAILS: [],

  LOADING: false,

  APP_ERROR: { has_error: false, msg: '' },
  TODAY_IS_WEEKEND: false,
  LOCALE: '',
  SHOW_NOTIFICATIONS: false,
  SHOW_SELECTED_CONTENT_FROM_NOTIFICATIONS: false,
  CURR_DAY_FROM_NOTIFICATION_CLICK: null,
  CURR_EVENT_FROM_NOTIFICATION_CLICK: null,
};
                    
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    // SET_VIEW_SELECTED_STRAIN: (state, action) => { state.VIEW_SELECTED_STRAIN = action.payload; },
    TOGGLE_SHOW_NEW_CONTENT_OR_ACTIVITY: (state) => { state.SHOW_NEW_CONTENT_OR_ACTIVITY = !state.SHOW_NEW_CONTENT_OR_ACTIVITY },
    SET_CURRENT_PAGE: (state, action) => { state.CURRENT_PAGE = action.payload; },
    SET_CURRENT_PAGE_WIDTH: (state, action) => { state.CURRENT_PAGE_WIDTH = action.payload; },
    SET_CURRENT_PAGE_HEIGHT: (state, action) => { state.CURRENT_PAGE_HEIGHT = action.payload; },

    SET_TRANSLATABLE_MESSAGES: (state, action) => { state.TRANSLATABLE_MESSAGES = action.payload; },
    SET_CURRENT_LOCALE: (state, action) => { state.CURRENT_LOCALE = action.payload; },
    SET_CURRENT_LANGUAGE: (state, action) => { state.CURRENT_LANGUAGE = action.payload; },
  

    SET_ALL_USERS: (state, action) => { state.ALL_USERS = action.payload; },    
    SET_ALL_USERS_ICONS: (state, action) => { state.ALL_USERS_ICONS = action.payload; },    
    SET_ALL_FOLLOWERS: (state, action) => { state.ALL_FOLLOWERS = action.payload; },    
    SET_ALL_BLOCKS: (state, action) => { state.ALL_BLOCKS = action.payload; },    
    SET_ALL_LOCATIONS: (state, action) => { state.ALL_LOCATIONS = action.payload; },    
    SET_ALL_CATEGORIES: (state, action) => { state.ALL_CATEGORIES = action.payload; },    
    SET_ALL_MY_NOTIFICATIONS: (state, action) => { state.ALL_MY_NOTIFICATIONS = action.payload; },    

    SET_ALL_USERNAMES: (state, action) => { state.ALL_USERNAMES = action.payload; },
    SET_ALL_EMAILS: (state, action) => { state.ALL_EMAILS = action.payload; },    
  
    TOGGLE_LOADING: (state) => { state.LOADING = !state.LOADING },
    SET_APP_ERROR: (state, action) => { state.APP_ERROR = action.payload; },    
    TOGGLE_TODAY_IS_WEEKEND: (state, action) => { state.TODAY_IS_WEEKEND = !state.TODAY_IS_WEEKEND},
    SET_LOCALE: (state, action) => { state.LOCALE = action.payload; },    
    TOGGLE_SHOW_NOTIFICATIONS: (state) => { state.SHOW_NOTIFICATIONS = !state.SHOW_NOTIFICATIONS},
    TOGGLE_SHOW_SELECTED_CONTENT_FROM_NOTIFICATIONS: (state) => { state.SHOW_SELECTED_CONTENT_FROM_NOTIFICATIONS = !state.SHOW_SELECTED_CONTENT_FROM_NOTIFICATIONS},
    SET_CURR_DAY_FROM_NOTIFICATION_CLICK: (state, action) => { state.CURR_DAY_FROM_NOTIFICATION_CLICK = action.payload; },    
    SET_CURR_EVENT_FROM_NOTIFICATION_CLICK: (state, action) => { state.CURR_EVENT_FROM_NOTIFICATION_CLICK = action.payload; },    
  },
});

export const 
{ 

    TOGGLE_SHOW_NEW_CONTENT_OR_ACTIVITY, SET_CURRENT_PAGE, SET_CURRENT_PAGE_HEIGHT, SET_CURRENT_PAGE_WIDTH, 
    SET_TRANSLATABLE_MESSAGES, SET_CURRENT_LOCALE, SET_CURRENT_LANGUAGE, 
    SET_ALL_USERS, SET_ALL_USERS_ICONS, SET_ALL_FOLLOWERS, SET_ALL_BLOCKS, SET_ALL_LOCATIONS, SET_ALL_CATEGORIES, 
    SET_ALL_MY_NOTIFICATIONS,
    
    SET_ALL_USERNAMES, SET_ALL_EMAILS,
    TOGGLE_LOADING, SET_APP_ERROR, TOGGLE_TODAY_IS_WEEKEND,
    SET_LOCALE,
    TOGGLE_SHOW_NOTIFICATIONS, 
    TOGGLE_SHOW_SELECTED_CONTENT_FROM_NOTIFICATIONS, SET_CURR_DAY_FROM_NOTIFICATION_CLICK, SET_CURR_EVENT_FROM_NOTIFICATION_CLICK,

} = appSlice.actions;

export default appSlice.reducer;
export type AppState = appSliceState;
