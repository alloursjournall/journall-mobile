import { useState } from "react";
import axios from "axios";

// redux
import { RootState } from "@/redux/store/rootReducer";
import { useSelector, useDispatch, createDispatchHook } from "react-redux";
import {
  SET_CURRENT_USER,
  SET_CURRENT_USER_PRIVACY,
  SET_CURRENT_USER_MOST_RECENT_POST,
} from "@/redux/currentUser/currentUserSlice";

import {
  Dimensions,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { grayphite } from "@/constants/Colors";
import { RedBackArrowIcon, GreenForwardArrowIcon } from "@/constants/Images";

// graphql:
import { copyFieldsOntoNewFieldsQueryStringFunc } from "@/graphql/queries";

// utils:
import { useContentFunction } from "@/Contexts/ContentFunctions";

// phone: swipe L see the post that has the fields added. alternate between
interface WitsFieldsIndexMenuProps {
  day: any;
  field: string;
  fields: any;
  witsFieldsIndexArray: any;
  setWitsFieldsIndexArray: any;
  witsFieldsAlreadyCopiedIndexArr: any;
  setWitsFieldsAlreadyCopiedIndexArr: any;
  tooManyFieldsErr: any;
  setTooManyFieldsErr: any;
  witsFieldsIndexReadyToConfirm: boolean;
  setWitsFieldsIndexReadyToConfirm: any;
  rewritePostOrNewPost: string;
  setRewritePostOrNewPost: any;
  currentUserMostRecentPost: any;
  setCurrentUserMostRecentPost: any;
}

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const WitsFieldsIndexMenu: React.FC<WitsFieldsIndexMenuProps> = ({
  day,
  field,
  fields,
  witsFieldsAlreadyCopiedIndexArr,
  setWitsFieldsAlreadyCopiedIndexArr,
  tooManyFieldsErr,
  setTooManyFieldsErr,
  witsFieldsIndexReadyToConfirm,
  setWitsFieldsIndexReadyToConfirm,
  rewritePostOrNewPost,
  setRewritePostOrNewPost,
  currentUserMostRecentPost,
  setCurrentUserMostRecentPost,
}) => {
  const dispatch = useDispatch();

  const { notificationMaker, witsFieldsIndexConfirmClick } =
    useContentFunction();

  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );
  const CURRENT_USER_MOST_RECENT_POST = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER_MOST_RECENT_POST
  );
  const [showRecentPost, setShowRecentPost] = useState<boolean>(false);

  const fieldsArray = (Array.isArray(fields?.fields) && fields?.fields) || null;
  const fieldIndex = fieldsArray?.findIndex((f: any) => f === field);
  console.log("fieldsArray", fieldsArray);
  console.log("fieldIndex", fieldIndex);

  //   const acknowledgeTooManyFieldsErr = () => {
  //     const clonedArray = Array.from(tooManyFieldsErr).fill(false);
  //     setTooManyFieldsErr(clonedArray);
  //   };

  const witsFieldsIndexBackBtnClick = () => {
    // reset index:
    setRewritePostOrNewPost("");
    setWitsFieldsIndexReadyToConfirm(false);
  };

  const rewriteNewPostClick = (startFreshOrKeepAdding: string) => {
    console.log("fiirng rewriteNewPostClick1");
    console.log("startFreshOrKeepAdding", startFreshOrKeepAdding);

    setWitsFieldsIndexReadyToConfirm(true);
    if (startFreshOrKeepAdding === "startFresh") {
      setRewritePostOrNewPost("startFresh");
    } else if (startFreshOrKeepAdding === "keepAdding") {
      setRewritePostOrNewPost("keepAdding");
    }
  };

  const checkIfUserAlreadyCopiedField = () => {
    if (CURRENT_USER_MOST_RECENT_POST?.fields?.fields?.includes(field)) {
      setWitsFieldsAlreadyCopiedIndexArr(true);
      return true;
    }
  };

  const checkIfUserHasTooManyFields = () => {
    const userRecentPostFieldsLen =
      CURRENT_USER_MOST_RECENT_POST?.fields?.fields?.length;
    console.log("userRecentPostFieldsLen", userRecentPostFieldsLen);
    if (userRecentPostFieldsLen === 9) {
      setTooManyFieldsErr(true);
      return true;
    }
  };

  const test = async () => {
    console.log("test");
    console.log("CURRENT_USER_MOST_RECENT_POST", CURRENT_USER_MOST_RECENT_POST);
    console.log("CURRENT_USER", CURRENT_USER);
  };

  return (
    <View>
      {
        // inform user they are trying to make too many fields for 1 post which could be 9 fields max so check for === 9;
        tooManyFieldsErr === true ? (
          <Text> too many fields </Text>
        ) : // if user tried to copy fields they already have then inform them!
        witsFieldsAlreadyCopiedIndexArr === true ? (
          <Text> already copied this field </Text>
        ) : witsFieldsIndexReadyToConfirm === true ? (
          <View style={styles.row}>
            <TouchableOpacity onPress={witsFieldsIndexBackBtnClick}>
              <Image style={styles.actionButton} source={RedBackArrowIcon} />
            </TouchableOpacity>

            <TouchableOpacity onPress={test}>
              <Text style={styles.text}> {field} </Text>
            </TouchableOpacity>

            <TouchableOpacity
              // (day: any, field: any, fields: any,
              // fieldIndex: number, checkIfUserAlreadyCopiedField: any, checkIfUserHasTooManyFields: any,
              //  witsFieldsIndexBackBtnClick: any, currentUserMostRecentPost: any, setCurrentUserMostRecentPost: any,
              //  rewritePostOrNewPost: any) => any
              onPress={() =>
                witsFieldsIndexConfirmClick(
                  day,
                  field,
                  fields,
                  fieldIndex,
                  checkIfUserAlreadyCopiedField,
                  checkIfUserHasTooManyFields,
                  witsFieldsIndexBackBtnClick,
                  currentUserMostRecentPost,
                  setCurrentUserMostRecentPost,
                  rewritePostOrNewPost
                )
              }
            >
              <Image
                style={styles.actionButton}
                source={GreenForwardArrowIcon}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.row}>
            <TouchableOpacity onPress={() => rewriteNewPostClick("startFresh")}>
              <Text style={[styles.text, { opacity: 0.25 }]}>
                {" "}
                start fresh?{" "}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => rewriteNewPostClick("keepAdding")}>
              <Text style={styles.text}> keep adding? </Text>
            </TouchableOpacity>
          </View>
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    height: screenHeight * 0.2,
    width: "100%",
    // borderWidth: 2,
    // borderColor: grayphite,
  },
  column: {
    flexDirection: "column",
    justifyContent: "center",
    gap: "50%",
    alignItems: "center",
    height: screenHeight * 0.2,
    width: "100%",
  },
  text: {
    fontSize: 20,
    alignSelf: "center",
    color: grayphite,
  },
  actionButton: {
    height: 20,
    width: 20,
    resizeMode: "contain", // Ensures the image scales properly
    // marginLeft: 20,
    // marginRight: 20,
  },
});

export default WitsFieldsIndexMenu;
