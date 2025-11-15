import { useState } from "react";

import {
  Dimensions,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import FieldsBodyItemsConstantseeCont from "./FieldsBodyItems/FieldsBodyItemsConstantseeCont";
import { grayphite } from "@/constants/Colors";

import { RunningIcon, DecideDoIcon, LitFireIcon } from "@/constants/Images";
import FieldsBodyItems from "./FieldsBodyItems/FieldsBodyItems";

// 🚨  <FieldsBody> looks like it does nothing but exists because it's easier to create a "lock" since it's just 1 <>, no ternaries to get tangled with.
interface FieldsBodyProps {
  day: any;
  usersPassLocks: any;
  setUsersPassLocks: any;
  fields: any;
  fieldsConstantseeIndex: any;
  setFieldsConstantseeIndex: any;
  fieldsConstantseeText: any;
  setFieldsConstantseeText: any;
  showLikeList: any;
  setShowLikeList: any;
  fieldLikes: any;
  setFieldLikes: any;
  allLikesLOCKshouldShowContent: any;
  seeLikesLOCKshouldShowContent: any;
  allWitsFieldsLOCKshouldShowContent: any;
  decideDoLOCKshouldShowContent: any;
  headerLOCKshouldShowContent: any;
  captionLOCKshouldShowContent: any;
  setCurrDaySelection: any;
  decideDoClick: any;
  setDecideDoClick: any;
  fieldsBinIndex: any;
  setFieldsBinIndex: any;
  fieldsConstantseeClick: any;
  setFieldsConstantseeClick: any;
  witsFieldsIndex: any;
  setWitsFieldsIndex: any;
  allUserProfileIcons: any;
  currentUserMostRecentPost: any;
  setCurrentUserMostRecentPost: any;
}

const FieldsBody: React.FC<FieldsBodyProps> = ({
  day,
  usersPassLocks,
  setUsersPassLocks,
  fields,
  fieldsConstantseeIndex,
  setFieldsConstantseeIndex,
  fieldsConstantseeText,
  setFieldsConstantseeText,
  showLikeList,
  setShowLikeList,
  fieldLikes,
  setFieldLikes,
  allLikesLOCKshouldShowContent,
  seeLikesLOCKshouldShowContent,
  allWitsFieldsLOCKshouldShowContent,
  decideDoLOCKshouldShowContent,
  headerLOCKshouldShowContent,
  captionLOCKshouldShowContent,
  setCurrDaySelection,
  decideDoClick,
  setDecideDoClick,
  fieldsBinIndex,
  setFieldsBinIndex,
  fieldsConstantseeClick,
  setFieldsConstantseeClick,
  witsFieldsIndex,
  setWitsFieldsIndex,
  allUserProfileIcons,
  currentUserMostRecentPost,
  setCurrentUserMostRecentPost,
}) => {
  const fieldsArray = fields?.fields;
  const fieldsBinLength =
    (Array.isArray(fieldsArray) && fieldsArray?.length) || 0;
  const currField = fieldsArray[fieldsBinIndex] || null;

  //  when scrolling-user is copying 1 field from posted-content.
  const [witsFieldsAlreadyCopiedIndexArr, setWitsFieldsAlreadyCopiedIndexArr] =
    useState(Array.from({ length: fields?.fields?.length }).fill(false));
  const [tooManyFieldsErr, setTooManyFieldsErr] = useState(
    Array.from({ length: fields?.fields?.length }).fill(false)
  );
  const [witsFieldsIndexReadyToConfirm, setWitsFieldsIndexReadyToConfirm] =
    useState<boolean>(false);
  const [rewritePostOrNewPost, setRewritePostOrNewPost] = useState("");

  const test = () => {};

  const incrementFieldsBin = () => {
    if (fieldsBinIndex === fieldsBinLength - 1) {
      setFieldsBinIndex(0);
    } else {
      setFieldsBinIndex(fieldsBinIndex + 1);
    }
  };

  return (
    <View style={styles.fieldsBodyCont}>
      <FieldsBodyItems
        day={day}
        usersPassLocks={usersPassLocks}
        setUsersPassLocks={setUsersPassLocks}
        fieldsConstantseeIndex={fieldsConstantseeIndex}
        setFieldsConstantseeIndex={setFieldsConstantseeIndex}
        fieldsConstantseeText={fieldsConstantseeText}
        setFieldsConstantseeText={setFieldsConstantseeText}
        field={currField}
        showLikeList={showLikeList}
        setShowLikeList={setShowLikeList}
        decideDoClick={decideDoClick}
        setDecideDoClick={setDecideDoClick}
        fieldLikes={fieldLikes}
        setFieldLikes={setFieldLikes}
        witsFieldsIndex={witsFieldsIndex}
        setWitsFieldsIndex={setWitsFieldsIndex}
        witsFieldsAlreadyCopiedIndexArr={witsFieldsAlreadyCopiedIndexArr}
        setWitsFieldsAlreadyCopiedIndexArr={setWitsFieldsAlreadyCopiedIndexArr}
        tooManyFieldsErr={tooManyFieldsErr}
        setTooManyFieldsErr={setTooManyFieldsErr}
        witsFieldsIndexReadyToConfirm={witsFieldsIndexReadyToConfirm}
        setWitsFieldsIndexReadyToConfirm={setWitsFieldsIndexReadyToConfirm}
        rewritePostOrNewPost={rewritePostOrNewPost}
        setRewritePostOrNewPost={setRewritePostOrNewPost}
        allLikesLOCKshouldShowContent={allLikesLOCKshouldShowContent}
        seeLikesLOCKshouldShowContent={seeLikesLOCKshouldShowContent}
        allWitsFieldsLOCKshouldShowContent={allWitsFieldsLOCKshouldShowContent}
        decideDoLOCKshouldShowContent={decideDoLOCKshouldShowContent}
        headerLOCKshouldShowContent={headerLOCKshouldShowContent}
        captionLOCKshouldShowContent={captionLOCKshouldShowContent}
        fieldsConstantseeClick={fieldsConstantseeClick}
        setFieldsConstantseeClick={setFieldsConstantseeClick}
        fieldsBinIndex={fieldsBinIndex}
        setFieldsBinIndex={setFieldsBinIndex}
        allUserProfileIcons={allUserProfileIcons}
        currentUserMostRecentPost={currentUserMostRecentPost}
        setCurrentUserMostRecentPost={setCurrentUserMostRecentPost}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fieldsBodyCont: {
    flexDirection: "column",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    // boxSizing: 'border-box',
  },
  actionButton: {
    marginRight: 16,
  },
  buttonIcon: {
    height: 25,
    width: 25,
  },
});

export default FieldsBody;
