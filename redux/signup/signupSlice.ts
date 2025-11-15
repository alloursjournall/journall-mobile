import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SignupSliceState {
    USERNAME_INPUT: String;
    EMAIL_INPUT: String;
    PASSWORD_INPUT: String;
    MM_INPUT: any;
    DD_INPUT: any;
    YYYY_INPUT: any;
    FULL_BDAY: String;

    USERNAME_INPUT_FOCUSED_SIGNUP: boolean;
    EMAIL_INPUT_FOCUSED_SIGNUP: boolean;
    PASSWORD_INPUT_FOCUSED_SIGNUP: boolean;
    MM_INPUT_FOCUSED_SIGNUP: boolean;
    DD_INPUT_FOCUSED_SIGNUP: boolean;
    YYYY_INPUT_FOCUSED_SIGNUP: boolean;
    SHOW_PASSWORD_INPUT_SIGNUP: boolean;
    AGE_BDAY_TEXT_BOOL: boolean; // for signing up on your birthday no need.

    SIGNUP_MSG: string;
    SIGNUP_STATUS: string;
    READY_FOR_PHOTO_SELECTION: boolean;

    // redux/signupConstraints

    USERNAME_INPUT_CLICKED: boolean;
    EMAIL_INPUT_CLICKED: boolean;
    PASSWORD_INPUT_CLICKED: boolean;
    AGE_INPUT_CLICKED: boolean;
    USER_EMAIL_EXTENSION: string;

    USERNAME_OVER_OR_8: boolean;
    USERNAME_UNDER_OR_23: boolean;
    USERNAME_FAILS_UNIQUE: boolean;
    USERNAME_FAILS_NO_CURSES: boolean;

    EMAIL_EXTENSION: string;
    EMAIL_HAS_AT_CHAR: boolean;
    EMAIL_HAS_EXTENSION: boolean;
    EMAIL_FAILS_UNIQUE: boolean;

    PASSWORD_HAS_CAPS: boolean;
    PASSWORD_HAS_NUMS: boolean;
    PASSWORD_HAS_SPECIAL: boolean;

    PASSWORD_FAILS_TOO_EZ: boolean;
    PASSWORD_FAILS_NO_CURSES: boolean;

    AGE_FAILS_TOO_YOUNG: boolean;

    INPUTS_CLICKED_YET: boolean;
}

const initialState: SignupSliceState = {
    USERNAME_INPUT: 'u name',
    EMAIL_INPUT: '@',
    PASSWORD_INPUT: '* * *',
    MM_INPUT: '', // 'mm/
    DD_INPUT: '', // 'dd
    YYYY_INPUT: '', // 'yyyy'
    FULL_BDAY: '',

    USERNAME_INPUT_FOCUSED_SIGNUP: false,
    EMAIL_INPUT_FOCUSED_SIGNUP: false,
    PASSWORD_INPUT_FOCUSED_SIGNUP: false,
    MM_INPUT_FOCUSED_SIGNUP: false,
    DD_INPUT_FOCUSED_SIGNUP: false,
    YYYY_INPUT_FOCUSED_SIGNUP: false,
    SHOW_PASSWORD_INPUT_SIGNUP: false,
    AGE_BDAY_TEXT_BOOL: false, // for signing up on your birthday no need.

    SIGNUP_MSG: '',
    SIGNUP_STATUS: 'not tried',
    READY_FOR_PHOTO_SELECTION: false,

    // redux/signupConstraints

    USERNAME_INPUT_CLICKED: false,
    EMAIL_INPUT_CLICKED: false,
    PASSWORD_INPUT_CLICKED: false,
    AGE_INPUT_CLICKED: false,
    USER_EMAIL_EXTENSION: '',

    USERNAME_OVER_OR_8: false,
    USERNAME_UNDER_OR_23: false,
    USERNAME_FAILS_UNIQUE: false,
    USERNAME_FAILS_NO_CURSES: false,

    EMAIL_EXTENSION: '',
    EMAIL_HAS_AT_CHAR: false,
    EMAIL_HAS_EXTENSION: false,
    EMAIL_FAILS_UNIQUE: false,

    PASSWORD_HAS_CAPS: false,
    PASSWORD_HAS_NUMS: false,
    PASSWORD_HAS_SPECIAL: false,

    PASSWORD_FAILS_TOO_EZ: false,
    PASSWORD_FAILS_NO_CURSES: false,

    AGE_FAILS_TOO_YOUNG: false,

    INPUTS_CLICKED_YET: false,
};

const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        // markAsCompleted(state) { state.completed = true; },
        // resetIntro(state) { state.completed = false; },
        SET_USERNAME_INPUT_SIGNUP: (state, action) => { state.USERNAME_INPUT = action.payload },
        SET_EMAIL_INPUT_SIGNUP: (state, action) => { state.EMAIL_INPUT = action.payload },
        SET_PASSWORD_INPUT_SIGNUP: (state, action) => { state.PASSWORD_INPUT = action.payload },
        SET_MM_INPUT_SIGNUP: (state, action) => { state.MM_INPUT = action.payload },
        SET_DD_INPUT_SIGNUP: (state, action) => { state.DD_INPUT = action.payload },
        SET_YYYY_INPUT_SIGNUP: (state, action) => { state.YYYY_INPUT = action.payload },

        TOGGLE_USERNAME_INPUT_FOCUSED_SIGNUP: (state) => { state.USERNAME_INPUT_FOCUSED_SIGNUP = !state.USERNAME_INPUT_FOCUSED_SIGNUP },
        TOGGLE_EMAIL_INPUT_FOCUSED_SIGNUP: (state) => { state.EMAIL_INPUT_FOCUSED_SIGNUP = !state.EMAIL_INPUT_FOCUSED_SIGNUP },
        TOGGLE_PASSWORD_INPUT_FOCUSED_SIGNUP: (state) => { state.PASSWORD_INPUT_FOCUSED_SIGNUP = !state.PASSWORD_INPUT_FOCUSED_SIGNUP },
        TOGGLE_MM_INPUT_FOCUSED_SIGNUP: (state) => { state.MM_INPUT_FOCUSED_SIGNUP = !state.MM_INPUT_FOCUSED_SIGNUP },
        TOGGLE_DD_INPUT_FOCUSED_SIGNUP: (state) => { state.DD_INPUT_FOCUSED_SIGNUP = !state.DD_INPUT_FOCUSED_SIGNUP },
        TOGGLE_YYYY_INPUT_FOCUSED_SIGNUP: (state) => { state.YYYY_INPUT_FOCUSED_SIGNUP = !state.YYYY_INPUT_FOCUSED_SIGNUP },
        SET_FULL_BDAY: (state, action) => { state.FULL_BDAY = action.payload },
        SET_SIGNUP_MSG: (state, action) => { state.SIGNUP_MSG = action.payload },
        SET_SIGNUP_STATUS: (state, action) => { state.SIGNUP_STATUS = action.payload },

        TOGGLE_SHOW_PASSWORD_INPUT_SIGNUP: (state) => { state.SHOW_PASSWORD_INPUT_SIGNUP = !state.SHOW_PASSWORD_INPUT_SIGNUP },
        TOGGLE_AGE_BDAY_TEXT_BOOL: (state) => { state.AGE_BDAY_TEXT_BOOL = !state.AGE_BDAY_TEXT_BOOL },
        TOGGLE_READY_FOR_PHOTO_SELECTION: (state) => { state.READY_FOR_PHOTO_SELECTION = !state.READY_FOR_PHOTO_SELECTION },

        TOGGLE_USERNAME_INPUT_CLICKED: (state) => { state.USERNAME_INPUT_CLICKED = !state.USERNAME_INPUT_CLICKED },
        TOGGLE_EMAIL_INPUT_CLICKED: (state) => { state.EMAIL_INPUT_CLICKED = !state.EMAIL_INPUT_CLICKED },
        TOGGLE_PASSWORD_INPUT_CLICKED: (state) => { state.PASSWORD_INPUT_CLICKED = !state.PASSWORD_INPUT_CLICKED },
        TOGGLE_AGE_INPUT_CLICKED: (state) => { state.AGE_INPUT_CLICKED = !state.AGE_INPUT_CLICKED },

        SET_USER_EMAIL_EXTENSION: (state, action) => { state.USER_EMAIL_EXTENSION = action.payload },
        TOGGLE_USERNAME_OVER_OR_8: (state) => { state.USERNAME_OVER_OR_8 = !state.USERNAME_OVER_OR_8 },
        TOGGLE_USERNAME_UNDER_OR_23: (state) => { state.USERNAME_UNDER_OR_23 = !state.USERNAME_UNDER_OR_23 },
        TOGGLE_USERNAME_FAILS_UNIQUE: (state) => { state.USERNAME_FAILS_UNIQUE = !state.USERNAME_FAILS_UNIQUE },
        TOGGLE_USERNAME_FAILS_NO_CURSES: (state) => { state.USERNAME_FAILS_NO_CURSES = !state.USERNAME_FAILS_NO_CURSES },

        SET_EMAIL_EXTENSION: (state, action) => { state.EMAIL_EXTENSION = action.payload },
        TOGGLE_EMAIL_HAS_AT_CHAR: (state) => { state.EMAIL_HAS_AT_CHAR = !state.EMAIL_HAS_AT_CHAR },
        TOGGLE_EMAIL_HAS_EXTENSION: (state) => { state.EMAIL_HAS_EXTENSION = !state.EMAIL_HAS_EXTENSION },
        TOGGLE_EMAIL_FAILS_UNIQUE: (state) => { state.EMAIL_FAILS_UNIQUE = !state.EMAIL_FAILS_UNIQUE },

        TOGGLE_PASSWORD_HAS_CAPS: (state) => { state.PASSWORD_HAS_CAPS = !state.PASSWORD_HAS_CAPS },
        TOGGLE_PASSWORD_HAS_NUMS: (state) => { state.PASSWORD_HAS_NUMS = !state.PASSWORD_HAS_NUMS },
        TOGGLE_PASSWORD_HAS_SPECIAL: (state) => { state.PASSWORD_HAS_SPECIAL = !state.PASSWORD_HAS_SPECIAL },
        TOGGLE_PASSWORD_FAILS_TOO_EZ: (state) => { state.PASSWORD_FAILS_TOO_EZ = !state.PASSWORD_FAILS_TOO_EZ },
        TOGGLE_PASSWORD_FAILS_NO_CURSES: (state) => { state.PASSWORD_FAILS_NO_CURSES = !state.PASSWORD_FAILS_NO_CURSES },
        TOGGLE_AGE_FAILS_TOO_YOUNG: (state) => { state.AGE_FAILS_TOO_YOUNG = !state.AGE_FAILS_TOO_YOUNG },

        TOGGLE_INPUTS_CLICKED_YET: (state) => { state.INPUTS_CLICKED_YET = !state.INPUTS_CLICKED_YET },
    },
});

export const {
    SET_USERNAME_INPUT_SIGNUP,
    SET_EMAIL_INPUT_SIGNUP,
    SET_PASSWORD_INPUT_SIGNUP,
    SET_MM_INPUT_SIGNUP,
    SET_DD_INPUT_SIGNUP,
    SET_YYYY_INPUT_SIGNUP,

    TOGGLE_USERNAME_INPUT_FOCUSED_SIGNUP,
    TOGGLE_EMAIL_INPUT_FOCUSED_SIGNUP,
    TOGGLE_PASSWORD_INPUT_FOCUSED_SIGNUP,
    TOGGLE_MM_INPUT_FOCUSED_SIGNUP,
    TOGGLE_DD_INPUT_FOCUSED_SIGNUP,
    TOGGLE_YYYY_INPUT_FOCUSED_SIGNUP,
    SET_FULL_BDAY,
    SET_SIGNUP_MSG,
    SET_SIGNUP_STATUS,

    TOGGLE_SHOW_PASSWORD_INPUT_SIGNUP,
    TOGGLE_AGE_BDAY_TEXT_BOOL,
    TOGGLE_READY_FOR_PHOTO_SELECTION,
    
    TOGGLE_USERNAME_INPUT_CLICKED,
    TOGGLE_EMAIL_INPUT_CLICKED,
    TOGGLE_PASSWORD_INPUT_CLICKED,
    TOGGLE_AGE_INPUT_CLICKED,
    SET_USER_EMAIL_EXTENSION,
    TOGGLE_USERNAME_OVER_OR_8,
    TOGGLE_USERNAME_UNDER_OR_23,
    TOGGLE_USERNAME_FAILS_UNIQUE,
    TOGGLE_USERNAME_FAILS_NO_CURSES,
    SET_EMAIL_EXTENSION,
    TOGGLE_EMAIL_HAS_AT_CHAR,
    TOGGLE_EMAIL_HAS_EXTENSION,
    TOGGLE_EMAIL_FAILS_UNIQUE,
    TOGGLE_PASSWORD_HAS_CAPS,
    TOGGLE_PASSWORD_HAS_NUMS,
    TOGGLE_PASSWORD_HAS_SPECIAL,
    TOGGLE_PASSWORD_FAILS_TOO_EZ,
    TOGGLE_PASSWORD_FAILS_NO_CURSES,
    TOGGLE_AGE_FAILS_TOO_YOUNG,
    TOGGLE_INPUTS_CLICKED_YET,
} = signupSlice.actions;

export default signupSlice.reducer;
export type SignupState = SignupSliceState;