// <> displays either login | signup
import axios from "axios";
import { useState } from "react";
import { useRouter } from "expo-router";
// import postmark from 'postmark';

import {
  Dimensions,
  Platform,
  TouchableOpacity,
  TextInput,
  Pressable,
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";

import {
  BranchIcon,
  JournallIcon,
  WoodIcon,
  HeartIcon,
} from "@/constants/Images";

import SignupInput from "@/components/LoginSignup/Signup/SignupInput";
import LoginInput from "@/components/LoginSignup/Login/LoginInput";

// redux:
import { RootState } from "@/redux/store/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import { SET_INTRO_VIEW_FORM } from "@/redux/intro/introSlice";

import {
  SET_DD_INPUT_SIGNUP,
  SET_MM_INPUT_SIGNUP,
  SET_YYYY_INPUT_SIGNUP,
  TOGGLE_USERNAME_OVER_OR_8,
  TOGGLE_USERNAME_UNDER_OR_23,
  TOGGLE_USERNAME_FAILS_NO_CURSES,
  SET_EMAIL_INPUT_SIGNUP,
  TOGGLE_EMAIL_HAS_EXTENSION,
  TOGGLE_PASSWORD_HAS_CAPS,
  TOGGLE_PASSWORD_HAS_NUMS,
  TOGGLE_PASSWORD_HAS_SPECIAL,
} from "@/redux/signup/signupSlice";

import { grayphite } from "@/constants/Colors";

// utils:
import { API } from "@env";
import Constants from "expo-constants";
import {
  allUsersGETquery,
  loginQueryStringFunc,
  signupQueryStringFunc,
  getPresignedUploadURLQueryStringFunc,
} from "@/graphql/queries";
import * as SecureStore from "expo-secure-store";
import * as ImagePicker from "expo-image-picker";
import { curses } from "@/utility/utilityValues";
import { useContentFunction } from "@/Contexts/ContentFunctions";
import uploadBlobToS3WithPresignedUrl from "@/utility/AWS/new/uploadBlobToS3WithPresignedUrl";

let imageCompression: any;

// const loadImageCompression = async () => {
//     if (!imageCompression) {
//         const module = await import('browser-image-compression'); // Dynamic import
//         imageCompression = module.default;
//     }
// };

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const LoginSignupForm = () => {
  // const { API } = Constants?.easConfig.extra;
  const predataString = API;
  // const predataString = API || 'https://journallapi.vercel.app/api/graphql';

  // const predataString = REACT_APP_API || 'http://localhost:4000/api/graphql'

  const dispatch = useDispatch();
  const router = useRouter();

  const INTRO_VIEW_FORM = useSelector(
    (state: RootState) => state.intro.INTRO_VIEW_FORM
  );
  const MM_INPUT = useSelector((state: RootState) => state.signup.MM_INPUT);
  const DD_INPUT = useSelector((state: RootState) => state.signup.DD_INPUT);
  const YYYY_INPUT = useSelector((state: RootState) => state.signup.YYYY_INPUT);

  // * this or <SignupInputs/> ? (check signupconstraints on submit!)
  const USERNAME_INPUT_SIGNUP = useSelector(
    (state: RootState) => state.signup.USERNAME_INPUT
  );
  const EMAIL_INPUT_SIGNUP = useSelector(
    (state: RootState) => state.signup.EMAIL_INPUT
  );
  const PASSWORD_INPUT_SIGNUP = useSelector(
    (state: RootState) => state.signup.PASSWORD_INPUT
  );

  const USERNAME_OVER_OR_8 = useSelector(
    (state: RootState) => state.signup.USERNAME_OVER_OR_8
  );
  const USERNAME_UNDER_OR_23 = useSelector(
    (state: RootState) => state.signup.USERNAME_UNDER_OR_23
  );
  const USERNAME_FAILS_UNIQUE = useSelector(
    (state: RootState) => state.signup.USERNAME_FAILS_UNIQUE
  );
  const USERNAME_FAILS_NO_CURSES = useSelector(
    (state: RootState) => state.signup.USERNAME_FAILS_NO_CURSES
  );

  const EMAIL_EXTENSION = useSelector(
    (state: RootState) => state.signup.EMAIL_EXTENSION
  );
  const EMAIL_HAS_AT_CHAR = useSelector(
    (state: RootState) => state.signup.EMAIL_HAS_AT_CHAR
  );
  const EMAIL_HAS_EXTENSION = useSelector(
    (state: RootState) => state.signup.EMAIL_HAS_EXTENSION
  );
  const EMAIL_FAILS_UNIQUE = useSelector(
    (state: RootState) => state.signup.EMAIL_FAILS_UNIQUE
  );

  const PASSWORD_HAS_CAPS = useSelector(
    (state: RootState) => state.signup.PASSWORD_HAS_CAPS
  );
  const PASSWORD_HAS_NUMS = useSelector(
    (state: RootState) => state.signup.PASSWORD_HAS_NUMS
  );
  const PASSWORD_HAS_SPECIAL = useSelector(
    (state: RootState) => state.signup.PASSWORD_HAS_SPECIAL
  );

  // web app: <LoginInputs/>
  const EMAIL_INPUT_LOGIN = useSelector(
    (state: RootState) => state.login.EMAIL_INPUT_LOGIN
  );
  const PASSWORD_INPUT_LOGIN = useSelector(
    (state: RootState) => state.login.PASSWORD_INPUT_LOGIN
  );

  const {
    // sendVerificationEmail,
    sendVerificationEmailSendGrid,
    // compressImage,
  } = useContentFunction();

  const [userId, setUserId] = useState<any>(null);
  const [emailInputLogin, setEmailInputLogin] = useState<string>("");
  const [passwordInputLogin, setPasswordInputLogin] = useState<string>("");
  const [profilePic, setProfilePic] = useState<any>("");
  const [userNotVerified, setUserNotVerified] = useState<any>(false);

  const checkSignup = () => {
    const usernameCheck = () => {
      const usernameSignupLength = USERNAME_INPUT_SIGNUP?.length;
      if (usernameSignupLength < 8) {
        if (USERNAME_OVER_OR_8 === true) dispatch(TOGGLE_USERNAME_OVER_OR_8());
        // const doesItFail = true? if it fails don't permit signup.
        return false;
      } else if (usernameSignupLength >= 8) {
        if (USERNAME_OVER_OR_8 === false) dispatch(TOGGLE_USERNAME_OVER_OR_8());
        // return false;
      }

      if (usernameSignupLength > 23) {
        if (USERNAME_UNDER_OR_23 === true)
          dispatch(TOGGLE_USERNAME_UNDER_OR_23());
        return false;
        // return true;
      } else if (usernameSignupLength <= 23) {
        if (USERNAME_UNDER_OR_23 === false)
          dispatch(TOGGLE_USERNAME_UNDER_OR_23());
      }

      if (curses?.includes(String(USERNAME_INPUT_SIGNUP))) {
        if (USERNAME_FAILS_NO_CURSES === false)
          dispatch(TOGGLE_USERNAME_FAILS_NO_CURSES());
        return false;
      } else if (!curses?.includes(String(USERNAME_INPUT_SIGNUP))) {
        if (USERNAME_FAILS_NO_CURSES === true)
          dispatch(TOGGLE_USERNAME_FAILS_NO_CURSES());
      }
      return true;
      // 🚨 🚨 🚨 username fails unique
    };
    const emailCheck = () => {
      // 🚨 email extension
      const extensionRegex = /(\.\w+)$/;
      const emailExtension = extensionRegex?.test(String(EMAIL_INPUT_SIGNUP));
      // email doesnt have extension
      if (!emailExtension) {
        if (EMAIL_HAS_EXTENSION === true)
          dispatch(TOGGLE_EMAIL_HAS_EXTENSION());
        return false;
      } else {
        console.log("emailExtension", emailExtension);
        if (EMAIL_HAS_EXTENSION === false)
          dispatch(TOGGLE_EMAIL_HAS_EXTENSION());
      }
      if (EMAIL_INPUT_SIGNUP?.includes("@")) {
        if (EMAIL_HAS_EXTENSION === false)
          dispatch(TOGGLE_USERNAME_FAILS_NO_CURSES());
      } else if (!EMAIL_INPUT_SIGNUP?.includes("@")) {
        if (EMAIL_HAS_EXTENSION === true)
          dispatch(TOGGLE_USERNAME_FAILS_NO_CURSES());
        return false;
      }
      return true;
      // 🚨 email unique
    };

    const passwordCheck = () => {
      const RhasCaps = /[A-Z]/g;
      const RhasNums = /\d+/g;
      const RhasSpecialChar = /[!@#$%^&*()?<>,.=+-]/g;

      const hasCaps = RhasCaps.test(String(PASSWORD_INPUT_SIGNUP)); // true if at least one uppercase
      const hasNums = RhasNums.test(String(PASSWORD_INPUT_SIGNUP)); // true if at least one number
      const hasSpecialChar = RhasSpecialChar.test(
        String(PASSWORD_INPUT_SIGNUP)
      ); // true if at least one special character

      if (hasCaps) {
        if (PASSWORD_HAS_CAPS === false) dispatch(TOGGLE_PASSWORD_HAS_CAPS());
      } else if (!hasCaps) {
        if (PASSWORD_HAS_CAPS === true) dispatch(TOGGLE_PASSWORD_HAS_CAPS());
        return false;
      }

      if (hasNums) {
        if (PASSWORD_HAS_NUMS === false) dispatch(TOGGLE_PASSWORD_HAS_NUMS());
      } else if (!hasNums) {
        if (PASSWORD_HAS_NUMS === true) dispatch(TOGGLE_PASSWORD_HAS_NUMS());
        return false;
      }

      if (hasSpecialChar) {
        if (PASSWORD_HAS_SPECIAL === false)
          dispatch(TOGGLE_PASSWORD_HAS_SPECIAL());
      } else if (!hasSpecialChar) {
        if (PASSWORD_HAS_SPECIAL === true)
          dispatch(TOGGLE_PASSWORD_HAS_SPECIAL());
        return false;
      }
      return true;
    };

    // 🚨 signupConstraintsChecker would want to know whether password hasCaps or email hasExtension fails
    // 🚨 for quicker mobile version just setting up: username | email | password fail but leaving open for constraintsChecker

    const doesUsernamePass = usernameCheck();
    console.log("doesUsernamePass", doesUsernamePass);
    const doesEmailPass = emailCheck();
    console.log("doesEmailPass", doesEmailPass);
    const doesPasswordPass = passwordCheck();
    console.log("doesPasswordPass", doesPasswordPass);

    if (!doesUsernamePass || !doesEmailPass || !doesPasswordPass) {
      return false;
    } else {
      return true;
    }
    // check USERNAME_FAILS_NO_CURSES in the input
  };

  const submitSignup = async () => {
    console.log("Constants", Constants);

    const doesSignupPass = checkSignup();
    if (!profilePic?.url) {
      console.log("u finna do dat?");
      return;
    }
    console.log("doesSignupPass", doesSignupPass);

    const fullBday = `${YYYY_INPUT}-${MM_INPUT}-${DD_INPUT}`;
    const signupQueryString = signupQueryStringFunc(
      String(USERNAME_INPUT_SIGNUP),
      String(PASSWORD_INPUT_SIGNUP),
      String(EMAIL_INPUT_SIGNUP),
      String(fullBday),
      "en-us"
    );

    console.log("predataString", predataString);
    const predata = await axios.post(predataString, {
      query: signupQueryString,
    });
    // const predata = await axios.post('http://localhost:4000/api/graphql', { query: signupQueryString })
    if (!predata) {
      return null;
    }
    console.log("predata", predata);
    const data = predata?.data?.data?.userSignup;
    if (!data) {
      return null;
    }
    setUserId(data?.id);

    const pathForS3 = `icons/profile_icons/journall-user-${data?.id}`;

    console.log("profilePic", profilePic);

    // handle the presigned URL:
    const presignedQuery = getPresignedUploadURLQueryStringFunc(
      pathForS3,
      profilePic.type
      // "image/png"
    );
    // for presignedURL to update S3 with the new sound comment
    const presignedPreData: any = await axios.post(
      "https://journallapi.vercel.app/api/graphql",
      {
        query: presignedQuery,
      }
    );

    console.log("presignedPreData", presignedPreData);

    if (!presignedPreData) {
      return null;
    }

    let presignedData = presignedPreData?.data?.data?.getPresignedUploadURL;
    const parsedPresignedData = JSON.parse(presignedData);
    console.log("parsedPresignedData", parsedPresignedData);

    // upload the blob
    const uploadedBlob = await uploadBlobToS3WithPresignedUrl(
      parsedPresignedData?.signedUrl,
      profilePic.blob,
      profilePic.type
    );
    console.log("uploadedBlob", uploadedBlob);

    // sendVerificationEmailPostmark('allours@journall.me', String(EMAIL_INPUT_SIGNUP), data?.id)

    await sendVerificationEmailSendGrid(
      "allours@journall.me",
      String(EMAIL_INPUT_SIGNUP),
      data?.id
    );

    // export default async function uploadBlobToS3(key: string, blob: Blob, fileType: string|null) {
  };

  async function saveUserCredentials(userId: any, token: string) {
    try {
      const userIdString =
        typeof userId === "string" ? userId : JSON.stringify(userId);

      if (Platform.OS === "web") {
        // Fallback to localStorage for web
        localStorage.setItem("userId", userIdString);
        localStorage.setItem("userToken", token);
        console.log("User credentials stored in localStorage for web");
      } else {
        // Use SecureStore for native apps
        await SecureStore.setItemAsync("userId", userIdString);
        await SecureStore.setItemAsync("userToken", token);
        console.log("User credentials stored successfully");
      }
    } catch (error) {
      console.error("Error storing user credentials", error);
    }
  }

  async function getUserCredentials() {
    try {
      if (Platform.OS === "web") {
        const userId = await localStorage.getItem("userId");
        const userToken = await localStorage.getItemn("userId");
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
  }

  const submitLogin = async () => {
    try {
      const loginQueryString = loginQueryStringFunc(
        String(emailInputLogin),
        String(passwordInputLogin)
      );
      console.log("🧩 loginQueryString:", loginQueryString);

      const predata = await axios.post(predataString, {
        query: loginQueryString,
      });
      console.log("📬 predata response:", predata);

      if (!predata) {
        console.error(
          "❌ No response from axios.post() – predata is undefined or null"
        );
        return null;
      }

      const loginData = predata?.data?.data?.userLogin;
      console.log("🔑 loginData:", loginData);

      if (!loginData) {
        console.error(
          "❌ loginData missing from response – check GraphQL resolver/userLogin field"
        );
        return null;
      }

      if (!loginData?.is_authorized) {
        console.warn("⚠️ User not verified! loginData:", loginData);
        setUserId(loginData?.id);
        setUserNotVerified(true);
        return;
      }

      console.log("✅ Authorized user, proceeding to save creds");

      try {
        await saveUserCredentials(loginData?.id, loginData?.token);
        console.log("💾 Saved user credentials successfully");
        router.push("/main");
      } catch (storageError) {
        console.error("💥 Error storing the token:", storageError);
      }
    } catch (networkError: any) {
      console.error(
        "🚨 submitLogin caught exception (axios/network/etc):",
        networkError
      );
      if (networkError?.response) {
        console.error("📡 Server responded with:", networkError.response.data);
      }
    }
  };

  const go = () => {
    console.log("hey how are you guys");
  };

  const toggleLoginSignupClick = () => {
    if (INTRO_VIEW_FORM === "login") {
      dispatch(SET_INTRO_VIEW_FORM("signup"));
    } else {
      dispatch(SET_INTRO_VIEW_FORM("login"));
    }
  };

  const loginOrSignupSubmit = async () => {
    console.log("well thats pretty cool");
    if (INTRO_VIEW_FORM === "login") {
      submitLogin();
    } else {
      submitSignup();
    }
  };

  const dayChangeHandler = (nums: any) => {
    console.log("nums:", nums);
    console.log("DD_INPUT:", DD_INPUT);
    console.log("DD_INPUT length:", DD_INPUT?.length);

    // Ensure DD_INPUT is a valid number string before parsing
    if (nums && /^[0-9]+$/.test(nums)) {
      const parsedInput = parseInt(nums, 10); // Safely parse to a number
      if (parsedInput > 31) {
        console.log("Input exceeds 31, resetting to empty");
        dispatch(SET_DD_INPUT_SIGNUP(""));
        return;
      }
    }

    const isValid = /^[0-9]*$/.test(nums);
    if (isValid) {
      console.log("Valid input:", nums);
      dispatch(SET_DD_INPUT_SIGNUP(nums));
    } else {
      console.error("Invalid input: only numbers (0-9) are allowed");
    }
  };

  const monthChangeHandler = (nums: any) => {
    // Ensure DD_INPUT is a valid number string before parsing
    if (nums && /^[0-9]+$/.test(nums)) {
      const parsedInput = parseInt(nums, 10); // Safely parse to a number
      if (parsedInput > 12) {
        console.log("Input exceeds 12, resetting to empty");
        dispatch(SET_MM_INPUT_SIGNUP(""));
        return;
      }
    }

    const isValid = /^[0-9]*$/.test(nums);
    if (isValid) {
      console.log("Valid input:", nums);
      dispatch(SET_MM_INPUT_SIGNUP(nums));
    } else {
      console.error("Invalid input: only numbers (0-9) are allowed");
    }
  };

  const yearChangeHandler = (nums: any) => {
    // Ensure DD_INPUT is a valid number string before parsing
    if (nums && /^[0-9]+$/.test(nums)) {
      const parsedInput = parseInt(nums, 10); // Safely parse to a number
      if (parsedInput > 2025) {
        console.log("fake year... fake news!");
        dispatch(SET_YYYY_INPUT_SIGNUP(""));
        return;
      }
    }

    const isValid = /^[0-9]*$/.test(nums);
    if (isValid) {
      console.log("Valid input:", nums);
      dispatch(SET_YYYY_INPUT_SIGNUP(nums));
    } else {
      console.error("Invalid input: only numbers (0-9) are allowed");
    }
  };

  function inferMimeType(uri: any) {
    if (!uri) return "application/octet-stream";
    const ext = uri.split(".").pop().toLowerCase();
    switch (ext) {
      case "jpg":
      case "jpeg":
        return "image/jpeg";
      case "png":
        return "image/png";
      case "heic":
        return "image/heic";
      case "gif":
        return "image/gif";
      default:
        return "image/jpeg"; // fallback
    }
  }

  const uploadFile = async () => {
    if (Platform.OS === "web") {
      // 🌐 Web: file input flow
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/jpeg,image/png";
      input.onchange = async (event: any) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const blob = file instanceof Blob ? file : new Blob([file]);
        const url = URL.createObjectURL(blob);

        const iconObj = {
          blob,
          url,
          type: inferMimeType(file.name) || "image",
          name: file.name,
          size: file.size,
        };

        console.log("Web file selected:", iconObj);
        setProfilePic(iconObj);
      };
      input.click();
    } else {
      // 📱 Native: use expo-image-picker
      try {
        // Request permissions first
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Permission to access media library is required!");
          return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 0.9,
        });

        if (!result.canceled) {
          const asset = result.assets[0];
          const uri = asset.uri;

          // optional: convert to blob (for S3 or Firebase)
          const blob = await uriToBlob(uri);

          const iconObj = {
            blob,
            url: uri,
            type: asset.type || "image/jpeg",
            name: asset.fileName || uri.split("/").pop(),
            size: asset.fileSize || 0,
          };

          console.log("Mobile file selected:", iconObj);
          setProfilePic(iconObj);
        }
      } catch (err) {
        console.error("Error selecting image:", err);
      }
    }
  };

  // Helper: convert a file URI to blob (for uploads)
  async function uriToBlob(uri: string): Promise<Blob> {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  }

  const resendVerificationEmail = async () => {
    const resend = await sendVerificationEmailSendGrid(
      "allours@journall.me",
      String(EMAIL_INPUT_SIGNUP),
      userId
    );
    console.log("resend", resend);
  };

  const test = () => {};

  return (
    <View style={styles.form}>
      <TouchableOpacity onPress={test}>
        <Image source={BranchIcon} style={{ width: 150, height: 75 }} />
      </TouchableOpacity>

      {INTRO_VIEW_FORM === "login" && (
        // userNotVerified

        // <TouchableOpacity onPress={resendVerificationEmail} style={styles.resendVerifyEmailCont}>
        //     <Text style={ { color: 'white' } }> resend verify email </Text>
        // </TouchableOpacity>
        // :
        <View style={styles.inputCont}>
          {userNotVerified ? (
            <TouchableOpacity
              onPress={resendVerificationEmail}
              style={styles.resendVerifyEmailCont}
            >
              <Text style={{ color: "white" }}> resend verify email </Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.inputCont}>
              <LoginInput
                inputType={"LoginEmail"}
                emailInputLogin={emailInputLogin}
                passwordInputLogin={passwordInputLogin}
                setEmailInputLogin={setEmailInputLogin}
                setPasswordInputLogin={setPasswordInputLogin}
              />
              <LoginInput
                inputType={"LoginPassword"}
                emailInputLogin={emailInputLogin}
                passwordInputLogin={passwordInputLogin}
                setEmailInputLogin={setEmailInputLogin}
                setPasswordInputLogin={setPasswordInputLogin}
              />
              <View style={styles.mobileButtonRow}>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.toggleTextBlack}> android </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.toggleTextBlack}> apple </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      )}

      {INTRO_VIEW_FORM === "signup" && (
        <View style={styles.inputCont}>
          <SignupInput inputType={"SignupUsername"} />
          <SignupInput inputType={"SignupEmail"} />
          <SignupInput inputType={"SignupPassword"} />

          {/*  users.birthday -(ie): "11-21-1992"  */}
          <View style={styles.birthdayCont}>
            <TextInput
              maxLength={2}
              style={[styles.dayOrMonthInput]}
              value={String(MM_INPUT)}
              onChangeText={monthChangeHandler}
            />

            <TextInput
              maxLength={2}
              style={styles.dayOrMonthInput}
              value={String(DD_INPUT)}
              onChangeText={dayChangeHandler}
            />

            <TextInput
              maxLength={4}
              style={styles.yearInput}
              value={String(YYYY_INPUT)}
              onChangeText={yearChangeHandler}
            />
          </View>

          <TouchableOpacity onPress={uploadFile}>
            {profilePic?.url ? (
              <Image
                style={[{ borderRadius: 50 }, styles.icon]}
                source={{ uri: profilePic?.url }}
                resizeMode="contain"
              />
            ) : (
              <Image
                style={[{ borderRadius: 50 }, styles.icon]}
                source={HeartIcon}
                resizeMode="contain"
              />
            )}
          </TouchableOpacity>
        </View>
      )}

      {/* Toggle View */}
      <Pressable
        onPress={toggleLoginSignupClick}
        style={styles.toggleLoginSignupWood}
      >
        <Image source={WoodIcon} style={styles.woodBackground} />
        <Text style={styles.toggleText}>
          {" "}
          {INTRO_VIEW_FORM === "login" ? "Signup Instead" : "Login"} ?
        </Text>
      </Pressable>

      <Pressable
        onPress={loginOrSignupSubmit}
        style={styles.toggleLoginSignupWood}
      >
        <Image source={JournallIcon} style={{ width: 50, height: 50 }} />
      </Pressable>

      <Image source={BranchIcon} style={{ width: 150, height: 75 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    padding: 5,
    // height: 700,
  },
  toggleLoginSignupWood: {
    width: 250,
    height: 50,
    justifyContent: "center",
    alignItems: "center", // Center both horizontally and vertically
  },
  resendVerifyEmailCont: {
    backgroundColor: "green",
    borderRadius: 6,
    padding: 10,
  },
  woodBackground: {
    position: "absolute", // Make it the background
    width: "100%",
    height: "100%",
    zIndex: -1, // Place it behind the text
  },
  toggleText: {
    fontFamily: "Nunito Sans",
    color: "white", // Adjust color for contrast
    fontSize: 16,
    zIndex: 1, // Place text above the image
  },
  toggleTextBlack: {
    fontFamily: "Nunito Sans",
    color: grayphite, // Adjust color for contrast
    fontSize: 16,
    zIndex: 1, // Place text above the image
  },
  birthdayCont: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  dayOrMonthInput: {
    height: 40,
    borderColor: grayphite,
    borderWidth: 1,
    // padding: 2,
    width: 30,
    // width: "50%",
    borderRadius: 6,
    // marginTop: 2.5,
    color: grayphite,
    textAlign: "center",
  },
  yearInput: {
    height: 40,
    borderColor: grayphite,
    borderWidth: 1,
    // padding: 2,
    width: 60,
    // width: "50%",
    borderRadius: 6,
    marginTop: 2.5,
    color: grayphite,
    textAlign: "center",
  },
  inputCont: {
    padding: 5,
    margin: 5,
    gap: 20,
    // borderColor: 'blue',
    // borderWidth: 5,
    height: screenHeight / 4,
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // alignItems: 'center',
  },
  mobileButtonRow: {
    flexDirection: "row",
    width: "50%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  icon: {
    height: 35,
    width: 35,
  },
  actionButton: {
    padding: 10,
  },
});

export default LoginSignupForm;
