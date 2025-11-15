// import { nonGenericObjectKeysFunc, nonGenericObjectValsFunc } from "@/Interface/interfaceHelperFuncs"
// import crypto from "crypto"
// import crypto from "react-native-crypto";

import { Platform } from "react-native";

//
// project-root
// |-- pages
// |   |-- your-page.js
// |-- locales
// |   |-- en
// |       |-- translation.json
// |   |-- es
// |       |-- translation.json
// |-- ...

// export function findStrainFromAllStrains(strainToFind:any, allStrains:any) { return allStrains.find(s => s.strain === strainToFind) }

// export function keysAndValuesFromStrain (strain:any) {
//     const keys = objectKeysFunc(strain)
//     const values = objectValuesFunc(strain)
//     const keyValStrainObj = { strainKeys: keys, strainValues: values }
//     return keyValStrainObj
// }

// export function nonGenericKeysAndValuesFromStrain (strain:any) {
//     const keys = nonGenericObjectKeysFunc(strain)
//     const values = nonGenericObjectValsFunc(strain)
//     const keyValStrainObj = { strainKeys: keys, strainValues: values }
//     return keyValStrainObj
// }

export function nothing() {
  return;
}
export function nothingWithDummyParams(params: any) {
  return null;
}

// return random Value from non random Array specified by Param.s
export function randomValueFromArray(array: any) {
  return array[Math.floor(Math.random() * array.length)];
}

export const coinTossValues: number[] = [1, 2, 3];
export function coinTossRandomizer() {
  const randomNumber =
    coinTossValues[Math.floor(Math.random() * coinTossValues.length)];
  return randomNumber;
}

// Fisher-Yates / Fisher-Price shuffle for babies.

export function shuffleArray(array: any) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function shuffleArrayOfObjects(array: any) {
  const shuffledIndices: any = Array.from(array.keys());

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledIndices[i], shuffledIndices[j]] = [
      shuffledIndices[j],
      shuffledIndices[i],
    ];
  }

  const shuffledArray: any[] = [];
  for (const index of shuffledIndices) {
    shuffledArray.push(array[index]);
  }

  return shuffledArray;
}

// const randomStrain = strains[Math.floor(Math.random() * strains.length )]

export function jsonSTRINGIFY(json: any) {
  JSON.stringify(json);
}
export function jsonPARSE(string: any) {
  JSON.parse(string);
}

// export const JWTsecretKeyMaker = () => { return crypto.randomBytes(33).toString('hex') }

export const JWTsecretKeyMaker = () => {
  return [...Array(66)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");
};

// clientside

// document.cookie = `token=${userLogin.token}; max-age=${7 * 24 * 60 * 60}; path=/;`;
// document.cookie = `id=${userLogin.id}; max-age=${7 * 24 * 60 * 60}; path=/;`;

export function getCookie() {
  if (Platform.OS === "web") {
    if (typeof window === "undefined") return [];

    let preCookie = document.cookie.split("; ");
    let cookie = preCookie[0] ? preCookie[0] : "";
    if (cookie === null || cookie === undefined || cookie === "") {
      return "cookie error";
    }
    return cookie;
  }
}

export function clearCookie(name: any) {
  document.cookie = `${name}=; expires=Thu, 11 Nov 1864 00:00:00 UTC; path=/;`;
}

export const remembermecookiePROMISE = new Promise((cookies, milk) => {
  // get cookie and return which will include both the token and the id.
  const precookie = getCookie();
  cookies(precookie);
  milk("spill");
});

export function iPROMISEcookies() {
  return remembermecookiePROMISE.then(async (c: any) => {
    let cookieIdString = c[1];
    const sliceID = cookieIdString.slice(3);
    return sliceID || "no id";
    // let cookieID = cookieIdString.replace(RreturnNumbers, '') // replace doesn't exist on string or object
  });
}

export function ReturnUrl(context: any) {
  if (process.env.NODE_ENV === "production") {
    return `https://${context.req.rawHeaders[1]}`;
  } else {
    return "http://localhost:3000";
  }
}

export function ThrowErrIfNoData(data: any, dataName: string) {
  if (!data) {
    throw new Error(`Error encountered. No ${dataName}`);
  } else {
    return;
  }
}

//  [usernameAtleast8, userUnique, usernameUnder20] [email, emailUnique, extension] [passUppers, special, passNums]
export const signupConstraintsTextObj = {
  unique: "unique",
  usernameAtLeast8: ">",
  usernameUnder20: "<",
  email: "@",
  extension: ".com",
  passUppers: "ABC",
  special: "special",
  passNums: "123",
};

export const emailExtensionBucket: string[] = [
  ".com",
  ".net",
  ".org",
  ".edu",
  ".gov",
];

// document.cookie = `token=${userLogin.token}; max-age=${7 * 24 * 60 * 60}; path=/;`;
export function getToday(lang: string) {
  // 'en-us'
  let today = new Date();

  let mmddyyyyFormatDate = today.toLocaleDateString(lang, {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  let dayOfWeek = today.toLocaleDateString(lang, {
    weekday: "long",
  });

  return {
    date: mmddyyyyFormatDate, //     ? mmddyyyyFormatDate : 'no date',               // overkill null safety
    weekday: dayOfWeek, //           ? dayOfWeek: 'no weekday'
  };
}

export function getTime() {
  // timezone:string param?
}

export function formatDate(mm: string, dd: string, yyyy: string) {
  let formattedDate = `${mm}-${dd}-${yyyy}`;
  return formattedDate;
}

// border-top-left-radius, etc -> dynamic styling based on random-generated value & redux-state-variable.
export const cornerNumbers: number[] = [177, 44, 38, 120, 60, 69, 77, 99];

export function isArrayEmpty(array: any) {
  if (typeof array === "object") {
    if (array === null || array === undefined || array?.length <= 0)
      return true;
    else return false;
  } else {
    return "error";
  }
}

export function isStringEmpty(string: any) {
  if (typeof string === "string") {
    if (string === null || string === undefined || string?.length <= 0)
      return true;
    else return false;
  } else {
    return "error";
  }
}

export const locales: string[] = [
  "en",
  "zh",
  "hi",
  "fr",
  "ar",
  "bn",
  "ur",
  "es",
  "pt",
  "ru",
  "id",
  "de",
];

export function isParamValidLocale(localeToCheck: string) {
  if (locales.includes(localeToCheck)) {
    return true;
  } else {
    return false;
  }
}

export function stringifyBooleanArray(array: boolean[]) {
  let stringifiedCheckbox = JSON.stringify(array);
  let checkboxArray = [stringifiedCheckbox];
  return checkboxArray;
}

export function resetBoolArrayFalseSetIndexTrue(
  index: number,
  lengthOfBoolArray: number
) {
  let boolBucket: boolean[] = new Array(lengthOfBoolArray).fill(false);
  boolBucket[index] = true;
  return boolBucket;
}

export function boolArraySetTrueIndexToFalse(index: number, array: any) {
  let boolBucket: boolean[] = Array.from(array);
  boolBucket[index] = false;
  return boolBucket;
}

export const arrayFromBooleanUpdateIndex = (
  array: any[],
  index: number,
  update: boolean | null
) => {
  let newArray: any = Array.from(array);

  // Update the specific index
  if (index >= 0 && index < newArray.length) {
    newArray[index] = update;
  }
  return newArray;
  // const updatingIndexToTrue = arrayFromBooleanUpdateIndex(CURR_DAY_ALL_OURS_PASS_LOCKS_BIN, parentCommentIndex, true)
};

export const emptyThoughtObject = {
  id: 0,
  user_id: 0,
  username: "",
  user_profile_icon: "",
  day_id: null,
  location_id: null,
  moment_id: null,
  greatfullagain_id: null,
  suggestion_id: null,
  feedgame_id: null,
  meme_id: null,
  title: null,
  thought: null,
  thoughts: null,
  date: "",
  non_anonymous: "",
  starrable: "",
  thoughts_ok: "",
  comment_icon: "",
  is_voice: false,
  is_video: false,
  stars_show_avg: false,
  stars_show_users: false,
  blank_thoughts_ok: false,
  blank_thoughts_username: null,
  downloadable: "",
  explicit: false,
  is_reported: false,
  is_in_trash: false,
  trash_tally: 0,
  on_profile: "",
  parent_thought_id: null,
  sus_content: null,
  lock: null,
  unlock: null,
};

export const specifyStringTruncate = (text: string, limit: number) => {
  if (text?.length > limit) {
    return `${text?.substring(0, limit)}...`;
  } else {
    return text;
  }
};

export function hasEventDatePassed(eventDate: any, eventEndTime = "20:00:00") {
  if (!eventDate) {
    return null;
  }

  // Parse the input date (MM-DD-YYYY) and time (24-hour format: HH:MM:SS)
  const [month, day, year] = eventDate.split("-");

  // Combine date and time
  const eventDateTime = `${year}-${month}-${day}T${eventEndTime}`;

  // Create Date object with the combined date and time
  const eventDateObj = new Date(eventDateTime);
  console.log("eventDateObj", eventDateObj);

  // Get the current date and time
  const today = new Date();
  console.log("today", today);

  // Compare event's end date-time to the current date-time
  return eventDateObj < today;
}

export const adjectives = [
  "brilliant",
  "quick",
  "fearless",
  "creative",
  "resilient",
  "thoughtful",
  "bold",
  "agile",
  "dynamic",
  "vibrant",
  "focused",
  "elegant",
  "efficient",
  "curious",
  "graceful",
  "optimistic",
  "clever",
  "meticulous",
  "insightful",
  "adaptable",
  "innovative",
  "determined",
  "sharp",
  "playful",
  "confident",
  "intuitive",
  "magnetic",
  "loyal",
  "mindful",
  "balanced",
];

export const phrases = [
  "lipbalm luck",
  "hbu",
  "feelin' froggy",
  "favorite mood",
  "luv",
  "fine.",
  "duh.",
  "off day",
  "loves me not",
  "not me loves",
  "fuck",
  "day off",
  "no title?",
  "go title!",
  "title waves!",
  "best day forever",
  "mountains",
  "colourfull",
  "dont @ me",
  "stop me",
  "-_________-",
  "lit.",
  "rizz.",
];

// {
//   "welcome": "स्वागत है",
//   "hello": "नमस्ते",
//   "goodbye": "अलविदा",
//   "home": "होम",
//   "about": "विषय",
//   "contact": "संपर्क करें",
//   "services": "सेवाएं",
//   "learnMore": "और जानें",
//   "termsAndConditions": "शर्तें और दिशा-निर्देश",
//   "privacyPolicy": "गोपनीयता नीति",
//   "error404": "पृष्ठ नहीं मिला",
//   "errorMessage": "एक त्रुटि हुई",
//   "submit": "प्रस्तुत करें",
//   "cancel": "रद्द करें",
//   "confirm": "पुष्टि करें",
//   "language": "भाषा",
//   "selectLanguage": "भाषा चुनें",
//   "next": "अगला",
//   "previous": "पिछला",
//   "loading": "लोड हो रहा है",
//   "success": "सफलता",
//   "failure": "असफलता",
//   "retry": "पुनः प्रयास करें",
//   "settings": "सेटिंग्स",
//   "profile": "प्रोफ़ाइल",
//   "logout": "लॉग आउट",
//   "signIn": "साइन इन करें",
//   "signUp": "साइन अप करें",
//   "forgotPassword": "पासवर्ड भूल गए?",
//   "resetPassword": "पासवर्ड रीसेट करें"
// }

export const curses = [
  "fag",
  "faggot",
  "dike",
  "nigger",
  "nigga",
  "nigg",
  "nig",
  "nigglet",
  "niggie",
  "niggy",
  "boobs",
  "pussy",
  "pussie",
  "blowjob",
  "spic",
  "bitch",
  "kike",
  "shit",
  "bastard",
  "retarted",
  "fuck",
  "skank",
  "cunt",
  "jizz",
  "penis",
  "cock",
];
