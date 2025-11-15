import { combineReducers } from "@reduxjs/toolkit";
import signupReducer, { SignupState } from "@/redux/signup/signupSlice";
import loginReducer, { LoginState } from "@/redux/login/loginSlice";
import introReducer, { IntroState } from "@/redux/intro/introSlice";
import currentUserReducer, {
  currentUserState,
} from "@/redux/currentUser/currentUserSlice";
import profileReducer, { ProfileState } from "@/redux/profile/profileSlice";
import appReducer, { AppState } from "@/redux/app/appSlice";

const rootReducer = combineReducers({
  signup: signupReducer,
  intro: introReducer,
  login: loginReducer,
  currentUser: currentUserReducer,
  profile: profileReducer,
  app: appReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
