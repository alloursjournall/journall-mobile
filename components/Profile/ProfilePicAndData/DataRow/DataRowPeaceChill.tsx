// top level imports
import { useState, useEffect } from "react";
import axios from "axios";

// @reduxjs/toolkit:
import { RootState } from "redux/store/rootReducer";
import { useSelector, useDispatch } from "react-redux";

// components and styleing:
import {
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  View,
  Text,
  StyleSheet,
} from "react-native";
import ErrorSlippedUpBanana from "@/components/ErrorSlippedUpBanana";

// utils:
import { grayphite } from "@/constants/Colors";
import { RedBackArrowIcon, GreenForwardArrowIcon } from "@/constants/Images";
import { createChillRequestEventQueryStringFunc } from "graphql/queries";
import { useContentFunction } from "Contexts/ContentFunctions";

interface props {
  currProfile: any;
  relevantFollowerData: any;
}

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const DataRowPeaceChill: React.FC<props> = ({
  currProfile,
  relevantFollowerData,
}) => {
  const { doesCurrentUserPassPermissionWall } = useContentFunction();

  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );

  const privacySettings = currProfile?.privacy;
  const chillMsgOk = privacySettings?.chill_msg_ok;

  const FOLLOWERS_N_FOLLOWED_USERS = useSelector(
    (state: RootState) => state.profile.FOLLOWERS_N_FOLLOWED_USERS
  );
  const USERS_FOLLOWING_PROFILE_USER_COUNT = useSelector(
    (state: RootState) => state.profile.USERS_FOLLOWING_PROFILE_USER_COUNT
  );
  const USERS_THAT_PROFILE_USER_FOLLOWS_COUNT = useSelector(
    (state: RootState) => state.profile.USERS_THAT_PROFILE_USER_FOLLOWS_COUNT
  );
  const RELEVANT_FOLLOWER_DATA = useSelector(
    (state: RootState) => state.profile.RELEVANT_FOLLOWER_DATA
  );

  const myChillFields =
    (Array.isArray(currProfile?.my_chill_fields) &&
      currProfile?.my_chill_fields) ||
    [];

  const [readyToConfirm, setReadyToConfirm] = useState(false);
  const [preConfirmNoSelectionErr, setPreConfirmNoSelectionErr] =
    useState(false);
  const [chillMessage, setChillMessage] = useState("");
  const [showChillMessageInput, setShowChillMessageInput] = useState(false);

  const [confirmedFields, setConfirmedFields] = useState<any>([
    ...(myChillFields?.map((field: any, index: number) => ({
      field: field,
      index: index,
      isChecked: false,
    })) ?? []),
  ]);

  const goBack = () => {
    setReadyToConfirm(false);
  };

  const preConfirm = async () => {
    const areFieldsConfirmed = confirmedFields?.some(
      (fields: any) => fields?.isChecked
    );
    // if no fields are selected then toggle the error to true so user knows to select an option.
    if (!areFieldsConfirmed) {
      setPreConfirmNoSelectionErr(true);
    } else {
      // if privacy.chill_msg_ok === "yes" then all users can send a custom notification along with activity they selected.
      if (chillMsgOk === "yes") {
        console.log("chill message ok");
        setShowChillMessageInput(true);
        // if privacy.chill is not === no && not equal to yes then it is either: "followers", "followed users" or "f_f" (either followers | followed users)
      } else if (chillMsgOk !== "no" && chillMsgOk !== "yes") {
        // run the test which checks: {loggedInUserId} along w/ privacy.chill_msg_ok & the followers array which can handle "followers", "followed users", "f_f"
        const doesUserPass = await doesCurrentUserPassPermissionWall(
          CURRENT_USER?.id,
          chillMsgOk,
          RELEVANT_FOLLOWER_DATA
        );
        console.log("doesUserPass", doesUserPass);
        // if user passes show the input
        if (doesUserPass === true) {
          setShowChillMessageInput(true);
          // if user fails no input and if it's true somehow then set it false.
        } else {
          if (showChillMessageInput === true) {
            setShowChillMessageInput(false);
          }
        }
        // if chillMsgOk is no flat out keep it false
      } else if (chillMsgOk !== "no") {
        if (showChillMessageInput === true) {
          setShowChillMessageInput(false);
        }
        setReadyToConfirm(false);
      }
    }
    // whether or not input is shown, proceed to confirm the selection of fields through which to potentially "chill" with profile user.
    setReadyToConfirm(true);
  };

  const selectActivityToggler = (field: string, index: number) => {
    const clone = [...confirmedFields];
    console.log("clone", clone);
    const foundField = clone?.find((fields) => fields?.field === field);
    foundField.isChecked = !foundField?.isChecked;
    setConfirmedFields(clone);
    console.log("foundField", foundField);
    // .find() to mutate value
  };

  const test = () => {
    console.log("confirmedFields", confirmedFields);
    console.log("currProfile", currProfile);
    console.log("FOLLOWERS_N_FOLLOWED_USERS", FOLLOWERS_N_FOLLOWED_USERS);
    console.log("showChillMessageInput", showChillMessageInput);
    console.log("privacySettings", privacySettings);
    console.log("showChillMessageInput", showChillMessageInput);
    console.log("chillMsgOk", chillMsgOk);
  };

  const chillMsgOnChange = (text: string) => {
    if (text?.includes("nigger")) {
      setChillMessage("text");
    }
    setChillMessage(text);
  };

  const confirmSelection = async () => {
    console.log("confirmedFields", confirmedFields);
    console.log("chillMessage", chillMessage);

    // can request chill:

    const chillFields = confirmedFields
      ?.filter((field: any) => field?.isChecked) // Filter only checked fields
      .map((field: any) => field?.field); // Then map to the actual field value

    const fieldsString = chillFields?.join(",  ");
    console.log("fieldsString", fieldsString);

    const description: string = `down for: ${fieldsString}`;

    const query = createChillRequestEventQueryStringFunc(
      CURRENT_USER?.id,
      CURRENT_USER?.username,
      CURRENT_USER?.icon,
      currProfile?.user_id,
      currProfile?.username,
      currProfile?.user_profile_icon,
      chillMessage,
      description
    );
    console.log("query", query);

    const predata: any = await axios.post("/api/graphql", { query: query });
    if (!predata) {
      return null;
    }
    console.log("predata", predata);

    const data = predata?.data?.data?.createChillRequestEvent;
    console.log("data", data);
    if (!data) {
    }

    // 🚨 🚨 🚨 table.events.event_or_activity = event;
    console.log("chillFields", chillFields);
  };

  return (
    <View style={styles.dataRowBottomToolBar}>
      {preConfirmNoSelectionErr ? (
        <ErrorSlippedUpBanana
          size="mini"
          setShowError={setPreConfirmNoSelectionErr}
        />
      ) : readyToConfirm ? (
        <View style={styles.peaceChillInputCont}>
          <TouchableOpacity onPress={goBack}>
            <Image style={styles.iconMini} source={RedBackArrowIcon} />
          </TouchableOpacity>

          {showChillMessageInput && (
            <View style={styles.peaceChillInputCont}>
              <TextInput
                maxLength={50}
                onChangeText={chillMsgOnChange}
                style={styles.input}
              />
              <ScrollView contentContainerStyle={styles.chillMessageTextCont}>
                <Text style={styles.headerText}> {chillMessage} </Text>
              </ScrollView>
            </View>
          )}

          <TouchableOpacity onPress={confirmSelection}>
            <Image style={styles.iconMini} source={GreenForwardArrowIcon} />
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.peaceChillInputCont}>
          {Array.isArray(currProfile?.my_chill_fields) &&
            currProfile?.my_chill_fields?.map((field: any, index: number) => {
              // const fieldConfirmed = confirmedFields?.field === field && confirmedFields?.isChecked === true
              const fieldConfirmed = confirmedFields?.some(
                (fields: any) =>
                  fields?.field === field && fields?.isChecked == true
              );
              console.log("fieldConfirmed", fieldConfirmed);
              return (
                <TouchableOpacity
                  onPress={() => selectActivityToggler(field, index)}
                >
                  <Text
                    key={`chillFields-${field}`}
                    style={[
                      { color: fieldConfirmed ? "#D86220" : "" },
                      styles.profilePicAndDataText,
                    ]}
                  >
                    {field}
                  </Text>
                </TouchableOpacity>
              );
            })}
          <TouchableOpacity onPress={preConfirm}>
            <Image style={styles.iconMini} source={GreenForwardArrowIcon} />
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dataRowBottomToolBar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: screenWidth * 0.8,
    paddingLeft: 2,
    paddingRight: 2,
    borderWidth: 2,
    borderColor: "blue",
    // gap: 10
  },
  peaceChillInputCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    borderWidth: 2,
    borderColor: grayphite,
    gap: 5,
  },
  chillMessageTextCont: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  profilePicAndDataText: {
    fontFamily: "Fuzzy Bubbles",
    fontSize: 20,
    fontWeight: 200,
    color: grayphite,
  },
  bottomToolBarRightCont: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  dataRowTopToolBarIcon: {
    height: 50,
    width: 50,
  },
  headerText: {
    fontFamily: "Fuzzy Bubbles",
    color: grayphite,
    fontSize: 20,
  },
  iconMini: {
    height: 35,
    width: 35,
  },
  input: {
    width: 24, // equivalent of 1.5rem (assuming 1rem = 16px)
    margin: 0,
    alignSelf: "center",
    borderRadius: 50, // makes it circular
    borderTopLeftRadius: 14.5,
    borderTopRightRadius: 65.5,
    borderBottomLeftRadius: 122.5,
    borderBottomRightRadius: 30,
    color: "#444", // equivalent of $grayphite
    fontFamily: "fuzzy", // make sure the font is linked properly
    fontSize: 10, // or adjust based on design
    borderWidth: 1.5,
    borderColor: "#44454fea", // border color
  },
});

export default DataRowPeaceChill;
