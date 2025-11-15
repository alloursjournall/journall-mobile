// top level imports
import axios from "axios";
import React, { useState, useEffect } from "react";

// @reduxjs/toolkit:
import { RootState } from "redux/store/rootReducer";
import { useSelector, useDispatch } from "react-redux";

import {
  Platform,
  Pressable,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// utils:
import { hothazel, grayphite, grayfight } from "@/constants/Colors";
import { RedBackArrowIcon, GreenForwardArrowIcon } from "@/constants/Images";
import { useContentFunction } from "Contexts/ContentFunctions";
import { hasEventDatePassed } from "@/utility/utilityValues";

interface GoingToEventStatus {
  // currProfile: any,
  event: any;
  setEvent: any;
  events: any;
  setEvents: any;
}

const GoingToEventStatus: React.FC<GoingToEventStatus> = ({
  // currProfile,
  event,
  setEvent,
  events,
  setEvents,
}) => {
  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );

  const CURR_PROFILE = useSelector(
    (state: RootState) => state.profile.CURR_PROFILE
  );

  const [currentSelection, setCurrentSelection] = useState<any>(null);
  const [noSelectionSubmitError, setNoSelectionSubmitError] =
    useState<boolean>(false);
  const [statusVal, setStatusVal] = useState<any>(null);
  const [readyToConfirm, setReadyToConfirm] = useState(false);
  const [isEventOver, setIsEventOver] = useState(false);
  const [myEventAttendance, setMyEventAttendance] = useState<any>(null);

  const { submitOrUpdateEventAttendanceFunc } = useContentFunction();

  useEffect(() => {
    // did event happen already ? if so lock the buttons.
    const isEventOver = hasEventDatePassed(event.end_date);
    // if the event is over disable it!
    if (isEventOver) {
      // setIsEventOver(true);
    }
    const myAttendance = event?.eventattendance?.find(
      (a: any) => a?.user_id === CURRENT_USER?.id
    );
    if (!myAttendance) {
      return;
    }
    setMyEventAttendance(myAttendance);
    console.log("myAttendance", myAttendance);
  }, [event]);

  const selectSelection = (selection: string) => {
    console.log("event", event);
    setCurrentSelection(selection);

    // if error triggered for no entry, remove animation.
    if (noSelectionSubmitError) {
      setNoSelectionSubmitError(false);
    }

    console.log("isEventOver", isEventOver);
  };

  const submitAttendance = async () => {
    // 🚨 🚨 TO DELETE EVENTS: cant be profile user then invited users can delete other events. has to be hosting_user, but if user says no they have option to "DELETE" and eliminate themselves from {t.eventattendance} to permanently remove
    if (currentSelection === null) {
      setNoSelectionSubmitError(true);
      return;
    }
    if (!readyToConfirm) {
      setReadyToConfirm(true);
    } else {
      // submit data!

      const eventId = event?.id;
      const eventName = event?.event_name;
      const userId = CURRENT_USER?.id;
      const username = CURRENT_USER?.username;
      const userIcon = CURRENT_USER?.icon;
      const going = currentSelection;
      const status = statusVal;

      const newEvents = await submitOrUpdateEventAttendanceFunc(
        eventId,
        eventName,
        CURR_PROFILE?.user_id,
        userId,
        username,
        userIcon,
        going,
        status,
        setEvents
      );
      const findSelectEvent = newEvents.find((e: any) => e?.id === event?.id);
      // soft copy of object
      const clone = { ...event };
      // keep the icon! just update the associated {t.eventattendance} data with the newly added record.
      clone.eventattendance = findSelectEvent?.eventattendance;
      console.log("newEvents", newEvents);

      if (findSelectEvent) {
        setEvent(clone);
      }
      setReadyToConfirm(false);

      console.log("findSelectEvent", findSelectEvent);
    }
  };

  const goBack = () => {
    setReadyToConfirm(false);
    setStatusVal("");
  };

  const statusInputOnChange = (text: string) => {
    const alphaNumericValue = text.replace(/[^a-zA-Z0-9\s]/g, "");
    if (text.includes("nigger")) {
      setStatusVal("");
    } else {
      setStatusVal(alphaNumericValue);
    }
  };

  const getButtonStyle = (option: any, selectedStyle: any) =>
    currentSelection === option || myEventAttendance?.going === option
      ? selectedStyle
      : styles.mightGoBtn;

  return (
    <View style={[{ opacity: isEventOver ? 0.5 : 1.0 }, styles.mightGoBtnCont]}>
      {readyToConfirm ? (
        <>
          <TouchableOpacity onPress={goBack}>
            <Image style={styles.icons} source={RedBackArrowIcon} />
          </TouchableOpacity>

          <TextInput
            maxLength={30}
            onChangeText={statusInputOnChange}
            style={styles.input}
          />

          <View style={styles.statusValInputTextCont}>
            {statusVal?.length >= 1 && (
              <Text style={styles.captionText}> {statusVal} </Text>
            )}
          </View>
        </>
      ) : (
        <View style={styles.updateButtonCont}>
          <Pressable
            disabled={isEventOver}
            onPress={() => selectSelection("go")}
            style={({ pressed }) => [
              getButtonStyle("go", styles.selectedGoBtn),
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.text}>Go</Text>
          </Pressable>

          <Pressable
            disabled={isEventOver}
            onPress={() => selectSelection("might")}
            style={({ pressed }) => [
              getButtonStyle("might", styles.selectedMightBtn),
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.text}>Might</Text>
          </Pressable>

          <Pressable
            disabled={isEventOver}
            onPress={() => selectSelection("not")}
            style={({ pressed }) => [
              getButtonStyle("not", styles.selectedNoBtn),
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.text}>No Go</Text>
          </Pressable>
        </View>
      )}

      <TouchableOpacity onPress={submitAttendance}>
        <Image style={styles.iconMini} source={GreenForwardArrowIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  updateButtonCont: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "70%",
    padding: 10,
    gap: 5,
  },

  mightGoBtnCont: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    padding: 5,
  },

  container: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
  },
  mightGoBtn: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  selectedGoBtn: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
  },
  selectedMightBtn: {
    backgroundColor: "yellow",
    padding: 10,
    borderRadius: 5,
  },
  selectedNoBtn: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    color: grayphite,
    fontWeight: "bold",
    textAlign: "center",
  },

  statusValInputTextCont: {
    maxWidth: 100,
    margin: 0,
    padding: 5,
  },

  captionText: {
    color: hothazel,
    fontSize: 20,
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif",
  },

  icons: {
    height: 50,
    width: 50,
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

export default GoingToEventStatus;
