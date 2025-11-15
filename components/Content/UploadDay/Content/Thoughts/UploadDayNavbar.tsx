import axios from "axios";
import { useState, useEffect, useRef } from "react";

// redux
import { RootState } from "@/redux/store/rootReducer";
import { useSelector, useDispatch, createDispatchHook } from "react-redux";
import { SET_CURRENT_USER } from "@/redux/currentUser/currentUserSlice";

import {
  Platform,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { appBackground } from "@/constants/Colors";

// utils:
import { API } from "@env";
import { useContentFunction } from "@/Contexts/ContentFunctions";
import {
  ShurikenIcon,
  PlainMsgButtonIcon,
  EyesIcon,
  GreenForwardArrowIcon,
  ThoughtsIcon,
  MomentsIcon,
  FieldsIcon,
  GreatfullIcon,
  LockIcon,
  UnlockIcon,
  BallotIcon,
  SettingsIcon,
} from "@/constants/Images";
import uploadBlobToS3WithPresignedUrl from "@/utility/AWS/new/uploadBlobToS3WithPresignedUrl";
import { getPresignedUploadURLQueryStringFunc } from "@/graphql/queries";

import { uploadContentQueryStringFunc } from "@/graphql/queries";

import { grayphite } from "@/constants/Colors";

interface props {
  day: any;
  allUserProfileIcons: any;
  showPreview: any;
  setShowPreview: any;
  uploadDaySelection: any;
  setUploadDaySelection: any;
  lockUpdater: any;
  unlockUpdater: any;
}

const UploadDayNavbar: React.FC<props> = ({
  day,
  allUserProfileIcons,
  showPreview,
  setShowPreview,
  uploadDaySelection,
  setUploadDaySelection,
  lockUpdater,
  unlockUpdater,
}) => {
  const {
    prepareThoughtsForUpload,
    prepareMomentsForUpload,
    prepareFieldsForUpload,
  } = useContentFunction();

  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );

  // const API = "https://journallapi.vercel.app/api/graphql";
  // const { API } = Constants?.easConfig.extra
  const predataString = API || "http://localhost:4000/api/graphql";

  const { returnProfileImg } = useContentFunction();

  const [preConfirmUpload, setPreConfirmUpload] = useState<boolean>(false);
  const [preparedThoughts, setPreparedThoughts] = useState<any>(null);
  const [preparedMoments, setPreparedMoments] = useState<any>(null);
  const [newThoughts, setNewThoughts] = useState<any>(null);
  const [newMoments, setNewMoments] = useState<any>(null);
  const [newFields, setNewFields] = useState<any>(null);
  const [newGreatfull, setNewGreatfull] = useState<any>(null);

  const showPreviewToggle = () => {
    setShowPreview(!showPreview);
  };

  const uploadDaySelectionHandler = (selection: string) => {
    if (uploadDaySelection === selection) {
      setUploadDaySelection("");
    } else {
      setUploadDaySelection(selection);
    }
  };

  const uploadContent = async () => {
    if (!preConfirmUpload) {
      setPreConfirmUpload(true);
    } else {
      // upload content then go back to main.

      let thoughts = day?.thoughts;
      let moments = day?.moments;
      let fields = day?.fields;
      let greatfull = day?.greatfull;
      let settings = day?.settings;
      let decideDo = day?.decidedo;
      let ballots = day?.ballots;
      let filteredBallotOptions = ballots?.options?.filter(
        (o: any) => o?.text === "" && o?.blob === null
      );
      ballots.options = filteredBallotOptions;

      // lockupdater:
      // unlockUpdater if not in the resolvers.ts:

      console.log("moments", moments);

      const newThoughtsObj = await prepareThoughtsForUpload(
        settings,
        thoughts,
        setPreparedThoughts,
        setNewThoughts,
        lockUpdater,
        unlockUpdater
      );
      const newFieldsObj = await prepareFieldsForUpload(
        settings,
        fields,
        setNewFields,
        lockUpdater,
        unlockUpdater
      );
      const newMomentsObj = await prepareMomentsForUpload(
        moments,
        setPreparedMoments,
        setNewMoments,
        lockUpdater,
        unlockUpdater
      );

      console.log("newThoughtsObj", newThoughtsObj);
      console.log("newFieldsObj", newFieldsObj);
      console.log("newMomentsObj", newMomentsObj);

      const stringedDayObj = JSON.stringify(day?.settings);
      const stringedThoughts = JSON.stringify(
        newThoughts || newThoughtsObj?.newThoughts
      );
      const stringedMoments = JSON.stringify(
        newMoments || newMomentsObj?.newMoments
      );

      // console.log('stringedMoments', stringedMoments)

      const stringedFields = JSON.stringify(newFields || newFieldsObj);

      const stringedBallots = JSON.stringify(ballots);
      const stringedGreatfull = JSON.stringify(greatfull);
      // const stringedGreatfull = JSON.stringify(updatedGreatfull)
      const stringedUploadDayDecideDo = JSON.stringify(decideDo);

      // return;

      const query = uploadContentQueryStringFunc(
        CURRENT_USER?.username,
        stringedDayObj,
        stringedThoughts,
        stringedMoments,
        stringedFields,
        stringedGreatfull,
        stringedUploadDayDecideDo,
        stringedBallots
      );

      const predata = await axios.post(predataString, { query: query });
      console.log("predata", predata);

      if (!predata) {
        return;
      }

      let data = predata?.data?.data?.uploadContent;
      if (!data) {
        return;
      }
      let parsedData = JSON.parse(data);
      console.log("parsedData", parsedData);
      // console.log('parsedData', parsedData)

      const filteredPrepareMoments = newMomentsObj?.preparedMoments?.filter(
        (moments: any) => moments?.blob
      );
      console.log("filteredPrepareMoments", filteredPrepareMoments);
      if (filteredPrepareMoments && Array.isArray(filteredPrepareMoments)) {
        filteredPrepareMoments?.forEach(async (moment: any) => {
          const prepath: string = `media/day-${parsedData?.id}-folder/moments/`;
          const path = `${prepath}${moment?.media_tags_array}`;
          // `media/day-${CURR_DAY?.id}-folder/ballots/${currBallot?.media_option_type}/ballot${currBallot?.id}-*${currBallot?.media_option_type}*-${userSubmittedOptionsInputValue}`

          const presignedQuery = getPresignedUploadURLQueryStringFunc(
            path,
            moment?.fileType
          );
          console.log("presignedQuery", presignedQuery);

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

          console.log("moment right here", moment);

          let presignedData =
            presignedPreData?.data?.data?.getPresignedUploadURL;
          const parsedPresignedData = JSON.parse(presignedData);
          console.log("parsedPresignedData", parsedPresignedData);

          // const uploadedBlob = await uploadBlobToS3(path, moment?.blob, moment?.fileType);
          const uploadedBlob = await uploadBlobToS3WithPresignedUrl(
            parsedPresignedData?.signedUrl,
            moment?.blob,
            moment?.fileType
          );
          console.log("uploadedBlob", uploadedBlob);
        });
      }

      const filteredPrepareThoughts = newThoughtsObj?.preparedThoughts?.filter(
        (thoughts: any) => thoughts?.blob
      );
      console.log("filteredPrepareThoughts", filteredPrepareThoughts);
      if (filteredPrepareThoughts && Array.isArray(filteredPrepareThoughts)) {
        filteredPrepareThoughts?.forEach(async (thought: any) => {
          const prepath: string = `media/day-${parsedData?.id}-folder/thoughts/`;
          const path = `${prepath}${thought?.path}`;

          const presignedQuery = getPresignedUploadURLQueryStringFunc(
            path,
            thought?.contentType
          );
          console.log("presignedQuery", presignedQuery);

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

          let presignedData =
            presignedPreData?.data?.data?.getPresignedUploadURL;
          const parsedPresignedData = JSON.parse(presignedData);

          // const uploadedBlob = await uploadBlobToS3(path, thought?.blob, 'audio/mp3');
          const uploadedBlob = await uploadBlobToS3WithPresignedUrl(
            parsedPresignedData?.signedUrl,
            thought?.blob,
            thought?.contentType
          );
          console.log("uploadedBlob", uploadedBlob);
        });
      }

      const checkIfBallotBlobs =
        Array.isArray(ballots) &&
        ballots?.some((ballots: any, index: number) => {
          const doesBlobExist = ballots?.options?.some(
            (options: any) => options?.blob && options?.blobURL
          );
          return doesBlobExist;
          console.log("doesBlobExist", doesBlobExist);
          // return ballots?.options?.blob
        });

      if (Array.isArray(ballots) && checkIfBallotBlobs) {
        // const indexOfBallot = ballotBin?.findIndex(ballots => ballots?.options?.blob && ballots?.options?.blobURL)
        const indexOfBallot = ballots?.findIndex((b: any) => {
          const blobExists = b?.options.some(
            (options: any) => options?.blob && options?.blobURL
          );
          return blobExists;
        });

        const mediaBallot = ballots[indexOfBallot];

        const mediaOptionType = mediaBallot?.media_option_type;
        if (!mediaBallot) {
          return;
        }
        let blobIndexBallots = 0;
        mediaBallot?.options?.forEach(async (option: any) => {
          console.log(option);

          // 🚨 🚨 🚨 🚨 also not ballotBin but the updated votes so the ballot is sent back with submitted dayData;
          // 🚨 🚨 🚨    ${userSubmittedOptionsInputValue} --->

          if (option?.blob && option?.blobURL) {
            const prepath: string = `media/day-${parsedData?.id}-folder/ballots/${mediaBallot?.media_option_type}/`;
            const path = `${prepath}${option?.dbURLblob}`;

            console.log("option?.blobType", option?.blobType);
            // console.log('option?.blobType', option?.blobType);
            const presignedQuery = getPresignedUploadURLQueryStringFunc(
              path,
              option?.blobType
            );
            const presignedPreData: any = await axios.post(
              "https://journallapi.vercel.app/api/graphql",
              {
                query: presignedQuery,
              }
            );

            console.log("presignedPreData ballot", presignedPreData);

            if (!presignedPreData) {
              return null;
            }

            let presignedData =
              presignedPreData?.data?.data?.getPresignedUploadURL;
            const parsedPresignedData = JSON.parse(presignedData);

            const uploadedBlob = await uploadBlobToS3WithPresignedUrl(
              parsedPresignedData?.signedUrl,
              option?.blob,
              option?.blobType
            );
            // const uploadedBlob = await uploadBlobToS3WithPresignedUrl(parsedPresignedData?.signedUrl, option?.blob, option.blobType);

            console.log("uploadedBlob", uploadedBlob);

            // 🚨 DEBUG: Test the exact CloudFront URL that should work
            const testCloudfrontUrl = parsedPresignedData?.cloudfrontUrl;

            const url = new URL(parsedPresignedData?.signedUrl);
            console.log(
              "🧾 Signed headers:",
              url.searchParams.get("X-Amz-SignedHeaders")
            );

            console.log("🔄 Testing CloudFront URL:", testCloudfrontUrl);

            // Try to fetch it immediately
            try {
              const testResponse = await fetch(testCloudfrontUrl);
              console.log(
                "🔍 CloudFront test response status:",
                testResponse.status
              );
              console.log(
                "🔍 CloudFront test response type:",
                testResponse.headers.get("content-type")
              );

              if (testResponse.ok) {
                const testBlob = await testResponse.blob();
                console.log(
                  "✅ CloudFront test - blob type:",
                  testBlob.type,
                  "size:",
                  testBlob.size
                );
              } else {
                const errorText = await testResponse.text();
                console.log(
                  "❌ CloudFront test error:",
                  errorText.substring(0, 200)
                );
              }
            } catch (error) {
              console.log("❌ CloudFront test fetch failed:", error);
            }

            // const uploadedBlob = await uploadBlobToS3(path, option?.blob, option?.blobType);
            console.log("uploadedBlob", uploadedBlob);
          }
          // ballot${mediaBallot?.id}-*${mediaBallot?.media_option_type}*-${blobIndexBallots}`
          // const prepath:string = `media/day-${parsedData?.id}-folder/ballots/${mediaBallot?.media_option_type}/ballot${mediaBallot?.id}-*${mediaBallot?.media_option_type}*-${blobIndexBallots}`
          blobIndexBallots += 1;
        });
      }
    }
  };

  const test = () => {
    console.log("day", day);
    console.log("day?.thoughts", day?.thoughts);
    // console.log('day?.ballots', day?.ballots);
  };

  return (
    <View
      style={[
        {
          top: Platform.OS === "web" ? 5 : 20,
          height: Platform.OS === "web" ? 50 : 100,
        },
        styles.navbar,
      ]}
    >
      {/* row mode or preview mode */}
      {/* <Image style={styles.icon} source={returnProfileImg(CURRENT_USER?.id, allUserProfileIcons)} /> */}

      <TouchableOpacity onPress={() => uploadDaySelectionHandler("settings")}>
        <Image style={styles.icon} source={SettingsIcon} />
      </TouchableOpacity>

      {uploadDaySelection === "settings" ? (
        <View style={styles.leftSideCont}>
          {/* <TouchableOpacity onPress={test}>
                                <Text> test </Text>
                            </TouchableOpacity> */}

          {(day?.thoughts?.length >= 1 ||
            day?.moments?.length >= 1 ||
            day?.fields?.fields?.length >= 1 ||
            day?.greatfull?.greatfull?.length >= 1) && (
            <TouchableOpacity onPress={uploadContent}>
              <Image
                style={[{ opacity: preConfirmUpload ? 1 : 0.5 }, styles.icon]}
                source={GreenForwardArrowIcon}
              />
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={test}></TouchableOpacity>
        </View>
      ) : (
        <View style={styles.rightSideCont}>
          <TouchableOpacity
            onPress={() => uploadDaySelectionHandler("thoughts")}
          >
            <Image style={styles.icon} source={ThoughtsIcon} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => uploadDaySelectionHandler("moments")}
          >
            <Image style={styles.icon} source={MomentsIcon} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => uploadDaySelectionHandler("fields")}>
            <Image style={styles.icon} source={FieldsIcon} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => uploadDaySelectionHandler("greatfull")}
          >
            <Image style={styles.icon} source={GreatfullIcon} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => uploadDaySelectionHandler("votes")}>
            <Image style={styles.icon} source={BallotIcon} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => uploadDaySelectionHandler("lock")}>
            <View style={styles.column}>
              <Image style={styles.lockIconMini} source={LockIcon} />
              <Image style={styles.lockIconMini} source={UnlockIcon} />
            </View>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity onPress={showPreviewToggle}>
        <Image
          style={styles.icon}
          source={showPreview ? PlainMsgButtonIcon : EyesIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    marginBottom: 10,
    borderColor: "blue",
    // borderWidth: 3
  },
  column: {
    flexDirection: "column",
    gap: 0,
  },
  leftSideCont: {
    gap: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rightSideCont: {
    flexDirection: "row",
    gap: 20,
  },
  icon: {
    height: 35,
    width: 35,
  },
  lockIconMini: {
    height: 20,
    width: 20,
  },
});

export default UploadDayNavbar;
