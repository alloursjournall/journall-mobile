import {
  Dimensions,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { grayphite } from "@/constants/Colors";
import FieldsBodyItemsConstantseeCont from "./FieldsBodyItemsConstantseeCont";
import WitsFieldsIndexMenu from "./WitsFieldsIndexMenu";
import FieldsHeader from "./FieldsHeader";
import FieldsCaption from "./FieldsCaption";
import LikeList from "./LikeList";
import DecideDo from "./DecideDo";

// redux
import { RootState } from "@/redux/store/rootReducer";
import { useSelector, useDispatch } from "react-redux";

import {
  EyesIcon,
  RunningIcon,
  DecideDoIcon,
  LitFireIcon,
} from "@/constants/Images";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

interface FieldsBodyItemsProps {
  // index: number,   // fieldsBinIndex.. was formerly just index during fields.fields.map
  day: any;
  usersPassLocks: any;
  setUsersPassLocks: any;
  fieldsConstantseeIndex: number;
  setFieldsConstantseeIndex: number;
  fieldsConstantseeText: string;
  setFieldsConstantseeText: string;
  field: any;
  showLikeList: boolean;
  setShowLikeList: any;
  decideDoClick: boolean;
  setDecideDoClick: any;
  fieldLikes: any;
  setFieldLikes: any;
  witsFieldsIndex: any;
  setWitsFieldsIndex: any;
  witsFieldsAlreadyCopiedIndexArr: any;
  setWitsFieldsAlreadyCopiedIndexArr: any;
  tooManyFieldsErr: any;
  setTooManyFieldsErr: any;
  witsFieldsIndexReadyToConfirm: boolean;
  setWitsFieldsIndexReadyToConfirm: any;
  rewritePostOrNewPost: any;
  setRewritePostOrNewPost: any;
  allLikesLOCKshouldShowContent: any;
  seeLikesLOCKshouldShowContent: any;
  allWitsFieldsLOCKshouldShowContent: any;
  decideDoLOCKshouldShowContent: any;
  headerLOCKshouldShowContent: any;
  captionLOCKshouldShowContent: any;
  fieldsConstantseeClick: any;
  setFieldsConstantseeClick: any;
  fieldsBinIndex: any;
  setFieldsBinIndex: any;
  allUserProfileIcons: any;
  currentUserMostRecentPost: any;
  setCurrentUserMostRecentPost: any;
}

const FieldsBodyItems: React.FC<FieldsBodyItemsProps> = ({
  day,
  usersPassLocks,
  setUsersPassLocks,
  fieldsConstantseeIndex,
  setFieldsConstantseeIndex,
  setFieldsConstantseeText,
  field,
  showLikeList,
  setShowLikeList,
  decideDoClick,
  setDecideDoClick,
  fieldLikes,
  setFieldLikes,
  witsFieldsIndex,
  setWitsFieldsIndex,
  witsFieldsAlreadyCopiedIndexArr,
  setWitsFieldsAlreadyCopiedIndexArr,
  tooManyFieldsErr,
  setTooManyFieldsErr,
  witsFieldsIndexReadyToConfirm,
  setWitsFieldsIndexReadyToConfirm,
  rewritePostOrNewPost,
  setRewritePostOrNewPost,
  allLikesLOCKshouldShowContent,
  seeLikesLOCKshouldShowContent,
  allWitsFieldsLOCKshouldShowContent,
  decideDoLOCKshouldShowContent,
  headerLOCKshouldShowContent,
  captionLOCKshouldShowContent,
  fieldsConstantseeClick,
  setFieldsConstantseeClick,
  fieldsBinIndex,
  setFieldsBinIndex,
  allUserProfileIcons,
  currentUserMostRecentPost,
  setCurrentUserMostRecentPost,
}) => {
  const fields = day?.fields || null;
  const fieldsText = fields?.text[fieldsBinIndex];
  const fieldsArray = (Array.isArray(fields?.fields) && fields?.fields) || null;
  const currField = Array.isArray(fieldsArray) && fieldsArray[fieldsBinIndex];
  const fieldsBinLength =
    Array.isArray(fields?.fields) && fields?.fields?.length;

  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );

  const test = () => {
    const clonedArray = Array.from(witsFieldsIndex)?.fill(false);
    setWitsFieldsIndex(clonedArray);
  };

  // 🔒 🔒 🔒 LOCKS ! ! !
  const fieldsLock = fields?.lock || null;
  let fieldsLockIndex = fieldsLock?.split("-").pop() || 0;

  return (
    <View style={styles.fieldsBodyItemsCont}>
      {decideDoClick === true ? (
        <DecideDo
          day={day}
          decideDoLOCKshouldShowContent={decideDoLOCKshouldShowContent}
        />
      ) : showLikeList === true && allLikesLOCKshouldShowContent ? (
        <LikeList
          day={day}
          fieldLikes={fieldLikes}
          setFieldLikes={setFieldLikes}
          allUserProfileIcons={allUserProfileIcons}
          allLikesLOCKshouldShowContent={allLikesLOCKshouldShowContent}
          seeLikesLOCKshouldShowContent={seeLikesLOCKshouldShowContent}
        />
      ) : witsFieldsIndex == true ? (
        <WitsFieldsIndexMenu
          day={day}
          field={field}
          fields={fields}
          witsFieldsIndexArray={witsFieldsIndex}
          setWitsFieldsIndexArray={setWitsFieldsIndex}
          witsFieldsAlreadyCopiedIndexArr={witsFieldsAlreadyCopiedIndexArr}
          setWitsFieldsAlreadyCopiedIndexArr={
            setWitsFieldsAlreadyCopiedIndexArr
          }
          tooManyFieldsErr={tooManyFieldsErr}
          setTooManyFieldsErr={setTooManyFieldsErr}
          witsFieldsIndexReadyToConfirm={witsFieldsIndexReadyToConfirm}
          setWitsFieldsIndexReadyToConfirm={setWitsFieldsIndexReadyToConfirm}
          rewritePostOrNewPost={rewritePostOrNewPost}
          setRewritePostOrNewPost={setRewritePostOrNewPost}
          currentUserMostRecentPost={currentUserMostRecentPost}
          setCurrentUserMostRecentPost={setCurrentUserMostRecentPost}
        />
      ) : (
        <View style={styles.headerCaptionCont}>
          <FieldsHeader
            field={currField}
            // field={'hey'}
            tooManyFieldsErr={tooManyFieldsErr}
            setTooManyFieldsErr={setTooManyFieldsErr}
            witsFieldsAlreadyCopiedIndexArr={witsFieldsAlreadyCopiedIndexArr}
            setWitsFieldsAlreadyCopiedIndexArr={
              setWitsFieldsAlreadyCopiedIndexArr
            }
            witsFieldsIndex={witsFieldsIndex}
            setWitsFieldsIndex={setWitsFieldsIndex}
            witsFieldsIndexReadyToConfirm={witsFieldsIndexReadyToConfirm}
            setWitsFieldsIndexReadyToConfirm={setWitsFieldsIndexReadyToConfirm}
            headerLOCKshouldShowContent={headerLOCKshouldShowContent}
            fields={fields}
          />

          <FieldsCaption
            fields={fields}
            witsFieldsIndex={witsFieldsIndex}
            fieldsText={fieldsText}
            captionLOCKshouldShowContent={captionLOCKshouldShowContent}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  fieldsBodyItemsCont: {
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    // boxSizing: 'border-box',
    gap: screenHeight / 20,
  },
  headerCaptionCont: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },

  actionButton: {
    marginRight: 16,
  },
  buttonIcon: {
    height: 25,
    width: 25,
  },
});

export default FieldsBodyItems;
