import { useState, useEffect } from "react";

// redux:
import { RootState } from "@/redux/store/rootReducer";
import { useSelector, useDispatch, createDispatchHook } from "react-redux";
import {
  SET_CURRENT_USER,
  SET_CURRENT_USER_PRIVACY,
  SET_CURRENT_USER_MOST_RECENT_POST,
} from "@/redux/currentUser/currentUserSlice";

// <>
import {
  Dimensions,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { grayphite } from "@/constants/Colors";
import WitsFieldsRow from "./WitsFieldsRow";
import FieldsBodyItemsConstantseeCont from "./FieldsBodyItems/FieldsBodyItemsConstantseeCont";
import FieldsBody from "./FieldsBody";
import FieldsLockIconText from "./FieldsLockIconText";

// utils:
import { useContentFunction } from "@/Contexts/ContentFunctions";

// 📝 📝 fields that are affected b

interface FieldsProps {
  day: any;
  fieldsBinIndex: number;
  setFieldsBinIndex: any;
  usersPassLocks: any;
  setUsersPassLocks: any;
  fieldsConstantseeIndex: number;
  setFieldsConstantseeIndex: any;
  fieldsConstantseeText: string;
  setFieldsConstantseeText: any;
  setCurrDaySelection: any;
  fieldsConstantseeClick: boolean;
  setFieldsConstantseeClick: any;
  allUserProfileIcons: any;
}

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const Fields: React.FC<FieldsProps> = ({
  day,
  fieldsBinIndex,
  setFieldsBinIndex,
  usersPassLocks,
  setUsersPassLocks,
  fieldsConstantseeIndex,
  setFieldsConstantseeIndex,
  fieldsConstantseeText,
  setFieldsConstantseeText,
  setCurrDaySelection,
  fieldsConstantseeClick,
  setFieldsConstantseeClick,
  allUserProfileIcons,
}) => {
  const { setCurrentUserMostRecentPostFunc } = useContentFunction();

  const fields = day?.fields;
  const fieldsLock: any = fields?.lock || null;
  const fieldsArray = (Array.isArray(fields?.fields) && fields?.fields) || null;
  const [fieldLikes, setFieldLikes] = useState<any>(
    (Array.isArray(fields?.likes) && fields?.likes) || null
  );
  const [fieldCheckboxes, setFieldCheckboxes] = useState<any>(
    (Array.isArray(fields?.likes) && fields?.likes) || null
  );
  const [currentUserMostRecentPost, setCurrentUserMostRecentPost] =
    useState<any>();

  // (mobile): witsFieldsIndex (webapp): witsFieldsIndexArray // now it shows 1 at a time so it's not an [i] index in a .map()
  const [witsFieldsIndex, setWitsFieldsIndex] = useState<boolean>(false);
  // const [fieldsBinIndex, setFieldsBinIndex] = useState<number>(0);

  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );

  const [showLikeList, setShowLikeList] = useState<boolean>(false);
  const [decideDoClick, setDecideDoClick] = useState<boolean>(false);

  const noLock = !fields?.lock;
  const fieldsLockIndex: any = fieldsLock?.split("-").pop();
  const fieldsLockText: any =
    (fieldsLock && fieldsLock?.split("-")?.slice(0, -1)?.join("-")) || null;

  const allLikesLOCKisUNLOCKED =
    fieldsLock &&
    fieldsLock === "likes" &&
    usersPassLocks?.some(
      (lockPass: any) =>
        lockPass?.day_id === day?.id &&
        (lockPass?.pass_fields_all === true ||
          (lockPass?.pass_fields === true &&
            lockPass?.user_id === CURRENT_USER?.id))
    );

  const allLikesLockNotRelevant = fieldsLock && fieldsLock !== "likes";
  const allLikesRelevantAndUnlocked =
    fieldsLock && fieldsLock === "likes" && allLikesLOCKisUNLOCKED;
  const allLikesLOCKshouldShowContent =
    fields?.id > 0 &&
    (noLock || allLikesLockNotRelevant || allLikesRelevantAndUnlocked);

  const seeLikesLOCKisUNLOCKED =
    fieldsLock &&
    fieldsLock === "see likes" &&
    usersPassLocks?.some(
      (lockPass: any) =>
        lockPass?.day_id === day?.id &&
        (lockPass?.pass_fields_all === true ||
          (lockPass?.pass_fields === true &&
            lockPass?.user_id === CURRENT_USER?.id))
    );

  const seeLikesLockNotRelevant = fieldsLock && fieldsLock !== "see likes";
  const seeLikesRelevantAndUnlocked =
    fieldsLock && fieldsLock === "see likes" && seeLikesLOCKisUNLOCKED;
  const seeLikesLOCKshouldShowContent =
    fields?.id > 0 &&
    (noLock || seeLikesLockNotRelevant || seeLikesRelevantAndUnlocked);

  const leaveLikeIndexLOCKisUNLOCKED =
    fieldsLock &&
    fieldsLockText?.includes("leavelikes") &&
    parseInt(fieldsLockIndex) === fieldsBinIndex &&
    usersPassLocks?.some(
      (lockPass: any) =>
        lockPass?.day_id === day?.id &&
        (lockPass?.pass_fields_all === true ||
          (lockPass?.pass_fields === true &&
            lockPass?.user_id === CURRENT_USER?.id))
    );

  const leaveLikeIndexLockNotRelevant =
    fieldsLock &&
    (!fieldsLock?.includes("leavelikes") ||
      parseInt(fieldsLockIndex) !== fieldsBinIndex);
  const leaveLikeIndexLockRelevantAndUnlocked =
    fieldsLockText?.includes("leavelikes") &&
    parseInt(fieldsLockIndex) === fieldsBinIndex &&
    leaveLikeIndexLOCKisUNLOCKED;
  const leaveLikeIndexLOCKshouldShowContent =
    fields?.id > 0 &&
    (noLock ||
      leaveLikeIndexLockNotRelevant ||
      leaveLikeIndexLockRelevantAndUnlocked);

  // 🚨 🚨 🚨
  const seeLikeIndexLOCKshouldShowContent =
    fields?.id > 0 &&
    (noLock ||
      leaveLikeIndexLockNotRelevant ||
      leaveLikeIndexLockRelevantAndUnlocked);

  const leaveAllLikesLOCKisUNLOCKED =
    fieldsLock &&
    fieldsLock === "leave likes" &&
    usersPassLocks?.some(
      (lockPass: any) =>
        lockPass?.day_id === day?.id &&
        (lockPass?.pass_fields_all === true ||
          (lockPass?.pass_fields === true &&
            lockPass?.user_id === CURRENT_USER?.id))
    );

  const leaveAllLikesLockNotRelevant =
    fieldsLock && fieldsLock !== "leave likes";
  const leaveAllLikesRelevantAndUnlocked =
    fieldsLock && fieldsLock === "leave likes" && leaveAllLikesLOCKisUNLOCKED;
  const leaveLikesLOCKshouldShowContent =
    fields?.id > 0 &&
    (noLock ||
      leaveAllLikesLockNotRelevant ||
      leaveAllLikesRelevantAndUnlocked);

  const allWitsFieldsLOCKisUNLOCKED =
    fieldsLock &&
    fieldsLockText?.includes("allWitsFields") &&
    usersPassLocks?.some(
      (lockPass: any) =>
        lockPass?.day_id === day?.id &&
        (lockPass?.pass_fields_all === true ||
          (lockPass?.pass_fields === true &&
            lockPass?.user_id === CURRENT_USER?.id))
    );

  const allWitsFieldsLockNotRelevant =
    fieldsLock && fieldsLock !== "allWitsFields";
  const allWitsFieldsLockRelevantAndUnlocked =
    fieldsLock &&
    fieldsLockText === "witsFieldsIndex" &&
    allWitsFieldsLOCKisUNLOCKED;
  const allWitsFieldsLOCKshouldShowContent =
    fields?.id > 0 &&
    (noLock ||
      allWitsFieldsLockNotRelevant ||
      allWitsFieldsLockRelevantAndUnlocked);

  const witsFieldsIndexLOCKisUNLOCKED =
    fieldsLock &&
    fieldsLockText?.includes("witsFieldsIndex") &&
    parseInt(fieldsLockIndex) === fieldsBinIndex &&
    usersPassLocks?.some(
      (lockPass: any) =>
        lockPass?.day_id === day?.id &&
        (lockPass?.pass_fields_all === true ||
          (lockPass?.pass_fields === true &&
            lockPass?.user_id === CURRENT_USER?.id))
    );

  const witsFieldsIndexLockNotRelevant =
    fieldsLock &&
    (!fieldsLock.includes("witsFieldsIndex") ||
      parseInt(fieldsLockIndex) !== fieldsBinIndex);
  const witsFieldsIndexLockRelevantAndUnlocked =
    fieldsLockText?.includes("witsFieldsIndex") &&
    parseInt(fieldsLockIndex) === fieldsBinIndex &&
    witsFieldsIndexLOCKisUNLOCKED;
  const witsFieldsIndexLOCKshouldShowContent =
    fields?.id > 0 &&
    (noLock ||
      witsFieldsIndexLockNotRelevant ||
      witsFieldsIndexLockRelevantAndUnlocked);

  const decideDoLOCKisUNLOCKED =
    fieldsLock &&
    fieldsLock === "decideDo" &&
    usersPassLocks?.some(
      (lockPass: any) =>
        lockPass?.day_id === day?.id &&
        (lockPass?.pass_fields_all === true ||
          (lockPass?.pass_fields === true &&
            lockPass?.user_id === CURRENT_USER?.id))
    );

  const decideDoLockNotRelevant = fieldsLock && fieldsLock !== "decideDo";
  const decideDoockRelevantAndUnlocked =
    fieldsLock && fieldsLock === "decideDo" && decideDoLOCKisUNLOCKED;
  const decideDoLOCKshouldShowContent =
    fields?.id > 0 &&
    (noLock || decideDoLockNotRelevant || decideDoockRelevantAndUnlocked);
  console.log("decideDoLOCKshouldShowContent", decideDoLOCKshouldShowContent);

  const decideDoFieldIndexLOCKisUNLOCKED =
    fieldsLock &&
    fieldsLockText?.includes("decideDoFieldIndex") &&
    parseInt(fieldsLockIndex) === fieldsBinIndex &&
    usersPassLocks?.some(
      (lockPass: any) =>
        lockPass?.day_id === day?.id &&
        (lockPass?.pass_fields_all === true ||
          (lockPass?.pass_fields === true &&
            lockPass?.user_id === CURRENT_USER?.id))
    );

  const decideDoFieldIndexIsNotRelevant =
    fieldsLock &&
    (!fieldsLock?.includes("decideDoFieldIndex") ||
      parseInt(fieldsLockIndex) !== fieldsBinIndex);
  const decideDoFielIndexRelevantAndUnlocked =
    fieldsLockText?.includes("decideDoFieldIndex") &&
    parseInt(fieldsLockIndex) === fieldsBinIndex &&
    decideDoFieldIndexLOCKisUNLOCKED;
  const decideDoFieldIndexLOCKshouldShowContent =
    fields?.id > 0 &&
    (noLock ||
      decideDoFieldIndexIsNotRelevant ||
      decideDoFielIndexRelevantAndUnlocked);

  console.log(
    "decideDoFieldIndexLOCKshouldShowContent",
    decideDoFieldIndexLOCKshouldShowContent
  );

  const allConstantseeLOCKisUNLOCKED =
    fieldsLock &&
    fieldsLock === "allConstantsee" &&
    usersPassLocks?.some(
      (lockPass: any) =>
        lockPass?.day_id === day?.id &&
        (lockPass?.pass_fields_all === true ||
          (lockPass?.pass_fields === true &&
            lockPass?.user_id === CURRENT_USER?.id))
    );

  const allConstantseeLockNotRelevant =
    fieldsLock && fieldsLock !== "allConstantsee";
  const allConstantseeLockRelevantAndUnlocked =
    fieldsLock &&
    fieldsLock === "allConstantsee" &&
    allConstantseeLOCKisUNLOCKED;
  const allConstantseeLOCKshouldShowContent =
    fields?.id > 0 &&
    (noLock ||
      allConstantseeLockNotRelevant ||
      allConstantseeLockRelevantAndUnlocked);

  // constantsee INDEX!
  const constantseeIndexLOCKisUNLOCKED =
    fieldsLock &&
    fieldsLockText?.includes("constantseeIndex") &&
    parseInt(fieldsLockIndex) === fieldsBinIndex &&
    usersPassLocks?.some(
      (lockPass: any) =>
        lockPass?.day_id === day?.id &&
        (lockPass?.pass_fields_all === true ||
          (lockPass?.pass_fields === true &&
            lockPass?.user_id === CURRENT_USER?.id))
    );

  const constantseeIndexNotRelevant =
    fieldsLock && fieldsLock !== "allConstantsee";
  const constantseeIndexRelevantAndUnlocked =
    fieldsLock &&
    fieldsLock === "allConstantsee" &&
    constantseeIndexLOCKisUNLOCKED;
  const constantseeIndexLOCKshouldShowContent =
    fields?.id > 0 &&
    (noLock ||
      constantseeIndexNotRelevant ||
      constantseeIndexRelevantAndUnlocked);

  const allCheckboxLOCKisUNLOCKED =
    fieldsLock &&
    fieldsLock === "allCheckbox" &&
    usersPassLocks?.some(
      (lockPass: any) =>
        lockPass?.day_id === day?.id &&
        (lockPass?.pass_fields_all === true ||
          (lockPass?.pass_fields === true &&
            lockPass?.user_id === CURRENT_USER?.id))
    );

  const allCheckboxLockNotRelevant = fieldsLock && fieldsLock !== "allCheckbox";
  const allCheckboxLockRelevantAndUnlocked =
    fieldsLock && fieldsLock === "allCheckbox" && allCheckboxLOCKisUNLOCKED;
  const allCheckboxLOCKshouldShowContent =
    fields?.id > 0 &&
    (noLock ||
      allCheckboxLockNotRelevant ||
      allCheckboxLockRelevantAndUnlocked);

  const checkboxIndexLOCKisUNLOCKED =
    fieldsLock &&
    fieldsLockText?.includes("checkboxIndex") &&
    parseInt(fieldsLockIndex) === fieldsBinIndex &&
    usersPassLocks?.some(
      (lockPass: any) =>
        lockPass?.day_id === day?.id &&
        (lockPass?.pass_fields_all === true ||
          (lockPass?.pass_fields === true &&
            lockPass?.user_id === CURRENT_USER?.id))
    );

  const checkboxIndexLockNotRelevant =
    fieldsLock &&
    (!fieldsLock.includes("checkboxIndex") ||
      parseInt(fieldsLockIndex) !== fieldsBinIndex);
  const checkboxIndexLockRelevantAndUnlocked =
    fieldsLockText?.includes("checkboxIndex") &&
    parseInt(fieldsLockIndex) === fieldsBinIndex &&
    checkboxIndexLOCKisUNLOCKED;
  const checkboxIndexLOCKshouldShowContent =
    fields?.id > 0 &&
    (noLock ||
      checkboxIndexLockNotRelevant ||
      checkboxIndexLockRelevantAndUnlocked);

  const fieldsIndexCommentLockIsUnlocked =
    fieldsLock &&
    parseInt(fieldsLock) === fieldsBinIndex &&
    usersPassLocks?.some(
      (lockPass: any) =>
        lockPass?.day_id === day?.id &&
        (lockPass?.pass_fields_all === true ||
          (lockPass?.pass_fields === true &&
            lockPass?.user_id === CURRENT_USER?.id))
    );

  // 🚨 new design: mobile doesn't .map() and scroll it shows 1 field at a time. index lock could just be the fields name now doesn't have to be fields.fields[io]
  const indexLockNotRelevant = parseInt(fieldsLock) !== fieldsBinIndex;
  const indexLockRelevantAndUnlocked =
    parseInt(fieldsLock) === fieldsBinIndex && fieldsIndexCommentLockIsUnlocked;
  const indexLOCKshouldShowContent =
    fields?.id > 0 &&
    (noLock || indexLockNotRelevant || indexLockRelevantAndUnlocked);

  const headerLOCKisUNLOCKED =
    fieldsLock &&
    parseInt(fieldsLockIndex) === fieldsBinIndex &&
    usersPassLocks?.some(
      (lockPass: any) =>
        lockPass?.day_id === day?.id &&
        (lockPass?.pass_fields_all === true ||
          (lockPass?.pass_fields === true &&
            lockPass?.user_id === CURRENT_USER?.id))
    );

  // header
  const headerLockNotRelevant =
    !fieldsLock?.includes("fieldsheader-") ||
    parseInt(fieldsLockIndex) !== fieldsBinIndex;
  const headerLockRelevantAndUnlocked =
    parseInt(fieldsLockIndex) !== fieldsBinIndex && headerLOCKisUNLOCKED;
  const headerLOCKshouldShowContent =
    fields?.id > 0 &&
    (noLock || headerLockNotRelevant || headerLockRelevantAndUnlocked);

  // captions:
  const captionLOCKisUNLOCKED =
    fieldsLock &&
    parseInt(fieldsLockIndex) === fieldsBinIndex &&
    usersPassLocks?.some(
      (lockPass: any) =>
        lockPass?.day_id === day?.id &&
        (lockPass?.pass_fields_all === true ||
          (lockPass?.pass_fields === true &&
            lockPass?.user_id === CURRENT_USER?.id))
    );

  const captionLockNotRelevant =
    !fieldsLock?.includes("fieldscaption-") ||
    parseInt(fieldsLockIndex) !== fieldsBinIndex;
  const captionLockRelevantAndUnlocked =
    parseInt(fieldsLockIndex) === fieldsBinIndex && captionLOCKisUNLOCKED;
  const captionLOCKshouldShowContent =
    fields?.id > 0 &&
    (noLock || captionLockNotRelevant || captionLockRelevantAndUnlocked);

  useEffect(() => {
    const getMostRecentPost = async () => {
      const mostRecentPost = await setCurrentUserMostRecentPostFunc(
        setCurrentUserMostRecentPost
      );
      console.log("mostRecentPost", mostRecentPost);
    };
    getMostRecentPost();
  }, []);

  const test = () => {
    console.log("usersPassLocks", usersPassLocks);
    console.log("day", day);
    console.log("indexLOCKshouldShowContent", indexLOCKshouldShowContent);
  };

  return (
    <View style={styles.fieldsCont}>
      <WitsFieldsRow
        day={day}
        usersPassLocks={usersPassLocks}
        setUsersPassLocks={setUsersPassLocks}
        fields={fields}
        showLikeList={showLikeList}
        setShowLikeList={setShowLikeList}
        decideDoClick={decideDoClick}
        setDecideDoClick={setDecideDoClick}
        witsFieldsIndex={witsFieldsIndex}
        setWitsFieldsIndex={setWitsFieldsIndex}
        fieldLikes={fieldLikes}
        setFieldLikes={setFieldLikes}
        allLikesLOCKshouldShowContent={allLikesLOCKshouldShowContent}
        seeLikesLOCKshouldShowContent={seeLikesLOCKshouldShowContent}
        allWitsFieldsLOCKshouldShowContent={allWitsFieldsLOCKshouldShowContent}
        decideDoLOCKshouldShowContent={decideDoLOCKshouldShowContent}
        setCurrDaySelection={setCurrDaySelection}
        fieldsBinIndex={fieldsBinIndex}
        setFieldsBinIndex={setFieldsBinIndex}
      />

      {
        indexLOCKshouldShowContent ? (
          <FieldsBody
            day={day}
            usersPassLocks={usersPassLocks}
            setUsersPassLocks={setUsersPassLocks}
            fields={fields}
            fieldsConstantseeIndex={fieldsConstantseeIndex}
            setFieldsConstantseeIndex={setFieldsConstantseeIndex}
            fieldsConstantseeText={fieldsConstantseeText}
            setFieldsConstantseeText={setFieldsConstantseeText}
            showLikeList={showLikeList}
            setShowLikeList={setShowLikeList}
            fieldLikes={fieldLikes}
            setFieldLikes={setFieldLikes}
            allLikesLOCKshouldShowContent={allLikesLOCKshouldShowContent}
            seeLikesLOCKshouldShowContent={seeLikesLOCKshouldShowContent}
            allWitsFieldsLOCKshouldShowContent={
              allWitsFieldsLOCKshouldShowContent
            }
            decideDoLOCKshouldShowContent={decideDoLOCKshouldShowContent}
            headerLOCKshouldShowContent={headerLOCKshouldShowContent}
            captionLOCKshouldShowContent={captionLOCKshouldShowContent}
            setCurrDaySelection={setCurrDaySelection}
            decideDoClick={decideDoClick}
            setDecideDoClick={setDecideDoClick}
            fieldsBinIndex={fieldsBinIndex}
            setFieldsBinIndex={setFieldsBinIndex}
            fieldsConstantseeClick={fieldsConstantseeClick}
            setFieldsConstantseeClick={setFieldsConstantseeClick}
            witsFieldsIndex={witsFieldsIndex}
            setWitsFieldsIndex={setWitsFieldsIndex}
            allUserProfileIcons={allUserProfileIcons}
            currentUserMostRecentPost={currentUserMostRecentPost}
            setCurrentUserMostRecentPost={setCurrentUserMostRecentPost}
          />
        ) : (
          <FieldsLockIconText unlockText={fields?.unlock} />
        )
        // <TouchableOpacity onPress={test}> hoose </TouchableOpacity>
      }

      <FieldsBodyItemsConstantseeCont
        day={day}
        // setDay={setDay}
        usersPassLocks={usersPassLocks}
        setFieldsConstantseeIndex={setFieldsConstantseeIndex}
        setFieldsConstantseeText={setFieldsConstantseeText}
        fields={fields}
        // index={index}
        field={fieldsArray?.[fieldsBinIndex] ?? null}
        // field={fieldsArray[fieldsBinIndex] || ''}
        witsFieldsIndex={witsFieldsIndex}
        setWitsFieldsIndex={setWitsFieldsIndex}
        fieldLikes={fieldLikes}
        setFieldLikes={setFieldLikes}
        fieldCheckboxes={fieldCheckboxes}
        setFieldCheckboxes={setFieldCheckboxes}
        allLikesLOCKshouldShowContent={allLikesLOCKshouldShowContent}
        leaveLikeIndexLOCKshouldShowContent={
          leaveLikeIndexLOCKshouldShowContent
        }
        allWitsFieldsLOCKshouldShowContent={allWitsFieldsLOCKshouldShowContent}
        witsFieldsIndexLOCKshouldShowContent={
          witsFieldsIndexLOCKshouldShowContent
        }
        decideDoLOCKshouldShowContent={decideDoLOCKshouldShowContent}
        decideDoFieldIndexLOCKshouldShowContent={
          decideDoFieldIndexLOCKshouldShowContent
        }
        allConstantseeLOCKshouldShowContent={
          allConstantseeLOCKshouldShowContent
        }
        constantseeIndexLOCKshouldShowContent={
          constantseeIndexLOCKshouldShowContent
        }
        checkboxIndexLOCKshouldShowContent={checkboxIndexLOCKshouldShowContent}
        allCheckboxLOCKshouldShowContent={allCheckboxLOCKshouldShowContent}
        fieldsConstantseeClick={fieldsConstantseeClick}
        setFieldsConstantseeClick={setFieldsConstantseeClick}
        fieldsBinIndex={fieldsBinIndex}
        setFieldsBinIndex={setFieldsBinIndex}
      />
      {/* <Text> hey this is fields right. </Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  fieldsCont: {
    height: "100%",
    // height: screenHeight * 0.4, // Ensure it matches the height of the image
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%", // Ensure it takes full width
    // borderColor: grayphite,
    // borderWidth: 3,
    // padding: 10, // Add some padding to avoid content touching the edges
    padding: 10,
    gap: 10,
    // borderColor: 'green',
    // borderWidth: 4,
  },
  fieldsTopCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    height: 50, // Set a height for the header
  },
});

export default Fields;
