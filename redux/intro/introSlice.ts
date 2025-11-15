import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IntroSliceState {
    INTRO_VIEW_FORM: string;
}

const initialState: IntroSliceState = {
    INTRO_VIEW_FORM: 'login',
};

const introSlice = createSlice({
    name: 'intro',
    initialState,
    reducers: {        
        SET_INTRO_VIEW_FORM: (state, action) => { state.INTRO_VIEW_FORM = action.payload},
    },
});

export const {
    SET_INTRO_VIEW_FORM
} = introSlice.actions;

export default introSlice.reducer;
export type IntroState = IntroSliceState;
