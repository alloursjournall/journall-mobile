import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface LoginSliceState {
    EMAIL_INPUT_LOGIN: string;
    PASSWORD_INPUT_LOGIN: string;

    EMAIL_INPUT_FOCUSED: boolean;
    PASSWORD_INPUT_FOCUSED: boolean;
    SHOW_PASSWORD_INPUT: boolean;
    LOGIN_MSG: string;
    INCORRECT_LOGIN_ATTEMPTS: number;
    ATTEMPTED_LOGIN_NOT_2F_AUTHED: boolean;
    LOGGED_IN_USER_NOT_VERIFIED: boolean;
}

const initialState: LoginSliceState = {
    EMAIL_INPUT_LOGIN: "@",
    PASSWORD_INPUT_LOGIN: '* * *',

    EMAIL_INPUT_FOCUSED: false,
    PASSWORD_INPUT_FOCUSED: false,
    SHOW_PASSWORD_INPUT: false,
    LOGIN_MSG: '',
    INCORRECT_LOGIN_ATTEMPTS: 0,
    ATTEMPTED_LOGIN_NOT_2F_AUTHED: false,
    LOGGED_IN_USER_NOT_VERIFIED: false
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        SET_EMAIL_INPUT_LOGIN: (state, action) => state.EMAIL_INPUT_LOGIN = action.payload,
        SET_PASSWORD_INPUT_LOGIN: (state, action) => state.PASSWORD_INPUT_LOGIN = action.payload,
        SET_LOGIN_MSG: (state, action) => state.LOGIN_MSG = action.payload,
        SET_INCORRECT_LOGIN_ATTEMPTS: (state, action) => { state.INCORRECT_LOGIN_ATTEMPTS = action.payload },

        TOGGLE_EMAIL_INPUT_FOCUSED: (state) => { state.EMAIL_INPUT_FOCUSED = !state.EMAIL_INPUT_FOCUSED },
        TOGGLE_PASSWORD_INPUT_FOCUSED: (state) => { state.PASSWORD_INPUT_FOCUSED = !state.PASSWORD_INPUT_FOCUSED },
        TOGGLE_SHOW_PASSWORD_INPUT: (state) => { state.SHOW_PASSWORD_INPUT = !state.SHOW_PASSWORD_INPUT },
        TOGGLE_ATTEMPTED_LOGIN_NOT_2F_AUTHED: (state) => { state.ATTEMPTED_LOGIN_NOT_2F_AUTHED = !state.ATTEMPTED_LOGIN_NOT_2F_AUTHED },
        TOGGLE_LOGGED_IN_USER_NOT_VERIFIED: (state) => { state.LOGGED_IN_USER_NOT_VERIFIED = !state.LOGGED_IN_USER_NOT_VERIFIED },

        // INCREMENT_INCORRECT_LOGIN_ATTEMPTS: (state) => state.INCORRECT_LOGIN_ATTEMPTS = state.INCORRECT_LOGIN_ATTEMPTS + 1,
    }
})

export const {
    SET_EMAIL_INPUT_LOGIN,
    SET_PASSWORD_INPUT_LOGIN,
    SET_LOGIN_MSG,
    SET_INCORRECT_LOGIN_ATTEMPTS,

    TOGGLE_EMAIL_INPUT_FOCUSED,
    TOGGLE_PASSWORD_INPUT_FOCUSED,
    TOGGLE_SHOW_PASSWORD_INPUT,
    TOGGLE_ATTEMPTED_LOGIN_NOT_2F_AUTHED,
    TOGGLE_LOGGED_IN_USER_NOT_VERIFIED,
} = loginSlice.actions;

export default loginSlice.reducer;
export type LoginState = LoginSliceState;