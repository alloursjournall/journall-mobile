// top level imports
import { useState, useEffect } from "react";
import axios from "axios";

// @reduxjs/toolkit:
import { RootState } from "redux/store/rootReducer";
import { useSelector, useDispatch } from "react-redux";

// components and styleing:
import {
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  View,
  Text,
  StyleSheet,
} from "react-native";
import DataRowFollowUsers from "./DataRowFollowUsers";
import DataRowVibe from "./DataRowVibe";
import DataRowPeaceChill from "./DataRowPeaceChill";
import EventPreview from "../../Content/EventsList/EventPreview";

// utils:
import { grayphite } from "@/constants/Colors";
import {
  DiscoBallGoldIcon,
  PeaceIcon,
  ArtSplashIcon,
} from "@/constants/Images";

// utils:
import { useContentFunction } from "Contexts/ContentFunctions";
import { specifyStringTruncate } from "utility/utilityValues";

interface props {
  nextEvent: any;
  setNextEvent: any;
  selectedEvent: any;
  setSelectedEvent: any;
}

// webapp: this <> initialized {nextEvent} but now that's done in <DataRow/> so in <DataRowBottom/> just render <EventPreview/> when dataRowClicked === 'eventActivities'
const DataRowCurrentEvent: React.FC<props> = ({
  nextEvent,
  setNextEvent,
  selectedEvent,
  setSelectedEvent,
}) => {
  const dispatch = useDispatch();

  const USER_EVENTS = useSelector(
    (state: RootState) => state.profile.USER_EVENTS
  );
  const NEXT_EVENT = useSelector(
    (state: RootState) => state.profile.NEXT_EVENT
  );
  const [noUpcomingEvents, setNoUpcomingEvents] = useState(false);

  const [showMoreDescription, setShowMoreDescription] = useState(false);

  // const initNextEvent = async (events, nextEvent, setNextEvent) => {

  const description = nextEvent?.description;

  return (
    // <Text> ayoo </Text>
    <EventPreview
      eventActivity={nextEvent}
      nextEvent={true}
      selectedEvent={selectedEvent}
      setSelectedEvent={setSelectedEvent}
    />
  );
};
