import axios from "axios";
import { useState, useEffect } from "react";

// redux
import { RootState } from "@/redux/store/rootReducer";
import { useSelector, useDispatch, createDispatchHook } from "react-redux";
import {
  SET_CURRENT_USER,
  SET_CURRENT_USER_TOKEN,
  SET_CURRENT_USER_PRIVACY,
  SET_CURRENT_USER_MOST_RECENT_POST,
} from "@/redux/currentUser/currentUserSlice";

import {
  TouchableOpacity,
  Image,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { appBackground, grayphite } from "@/constants/Colors";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export default function Info() {
  return (
    <View style={styles.page}>
      <Text style={styles.text}>
        {" "}
        Journall uses the camera only when users choose to capture photos or
        videos. No images or recordings are stored or shared. For questions
        contact allours@journall.me.{" "}
      </Text>

      {/* videos as well like possibly the speech: */}
      {/* some of these should be graphics we stroll through: */}

      <Text style={styles.text}> find friends & fun through journaling </Text>

      <Text style={styles.text}>
        {" "}
        journaling maybe IRL or creator/art/hobby maybe everything app custom
        app of apps like roblox.{" "}
      </Text>

      <Text style={styles.text}>
        {" "}
        we're malleable. we can keep making this.{" "}
      </Text>

      <Text style={styles.text}>
        {" "}
        thoughts. moments/media. fields/areas-of-life. greatfull. locks. votes.{" "}
      </Text>

      <Text style={styles.text}>
        {" "}
        sales manager: "2-3 trinkets show character of the sales turf" me: 2-3
        moments show character of our days & lives{" "}
      </Text>

      <Text style={styles.text}>
        {" "}
        we do journaling IRL & social site so our words weave our will & way{" "}
      </Text>

      <Text style={styles.text}>
        {" "}
        ❤️ SOCIAL MEDIA SUPERSPIKES DOPAMINE LIKE WEED, ALCOHOL, SUGAR,
        NORPOGRAPHY BE RESPONSIBLE FAM ❤️{" "}
      </Text>

      <Text style={styles.text}>
        {" "}
        let's publicly try journaling & social media at the speed of light.{" "}
      </Text>

      <Text style={styles.text}>
        {" "}
        trillion users is trivial. trust & trying together is triumph.{" "}
      </Text>

      <Text style={styles.text}>
        {" "}
        this was super fun, interesting, challenging to create.{" "}
      </Text>

      <Text style={styles.text}>
        {" "}
        social media should be led by social media-people ... not social-media
        people.{" "}
      </Text>

      <Text style={styles.text}>
        {" "}
        ❤️ open source. we can share more than just content. ❤️{" "}
      </Text>

      <Text style={styles.text}>
        {" "}
        I also ❤️ ❤️ ❤️ making music & content @ linktr.ee/chasegogh AKA
        cheekbuster chase{" "}
      </Text>

      <Text style={styles.text}> allours@journall.me </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    height: screenHeight,
    width: screenWidth,
    backgroundColor: appBackground,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    // boxSizing: 'border-box',
  },
  text: {
    fontFamily: "Fuzzy Bubbles",
    color: grayphite,
    fontSize: 16,
  },
});
