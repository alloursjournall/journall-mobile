// top level imports
import React from "react";

import {
  Text,
  TextInput,
  Platform,
  TouchableOpacity,
  Image,
  View,
  StyleSheet,
} from "react-native";

// utils:
import { grayphite, grayfight } from "@/constants/Colors";
import {
  GolfLocationIcon,
  LitFireIcon,
  StarIcon,
  SoundIcon,
  CommenterCanDetermineIcon,
  AnonymityMaskIcon,
  LockIcon,
  UserIcon,
  PeaceIcon,
  GhostIcon,
} from "@/constants/Images";

interface props {
  eventOrActivity: any;
  setEvent: any;
  objKey: string;
  objKeyType: string;
}

const EventKeyUpdateModular: React.FC<props> = ({
  eventOrActivity,
  setEvent,
  objKey,
  objKeyType,
}) => {
  return objKeyType === "boolean" ? (
    <BooleanCheckboxRow
      eventOrActivity={eventOrActivity}
      setEvent={setEvent}
      objKey={objKey}
    />
  ) : objKeyType === "string" ? (
    <StringCheckboxRow
      eventOrActivity={eventOrActivity}
      setEvent={setEvent}
      objKey={objKey}
    />
  ) : (
    <> </>
  );
  // objKeyType === "string" show text input.
};

interface StringCheckboxRowProps {
  eventOrActivity: any;
  setEvent: any;
  objKey: any;
}

const StringCheckboxRow: React.FC<StringCheckboxRowProps> = ({
  eventOrActivity,
  setEvent,
  objKey,
}) => {
  const test = () => {
    console.log("eventOrActivity", eventOrActivity);
  };

  const eventOrActivityTextOnChange = (text: string) => {
    if (text === "nigger" || text.includes("nigger")) {
      text = "";
    } else {
      let clone = { ...eventOrActivity };
      if (text?.length === 0) {
        clone[objKey] = null;
      } else {
        clone[objKey] = text;
      }
      setEvent(clone);
    }
  };

  const checkboxToggleEventLikesOrStars = (likesOrStars: string) => {
    console.log("likesOrStars", likesOrStars);
    let clone = { ...eventOrActivity };
    if (eventOrActivity?.likes_or_stars === likesOrStars) {
      clone.likes_or_stars = "";
      clone.starrable = "no";
    } else {
      clone.likes_or_stars = likesOrStars;
      if (likesOrStars === "stars") {
        clone.starrable = "yes";
      }
    }
    setEvent(clone);
  };

  // 🚨 🚨 BOOLEAN TYPES ONLY: (i.e:  event.stars_show_avg
  return (
    <View style={styles.settingsRow}>
      {objKey === "category_text" ? (
        <View style={styles.slightSplitRow}>
          <Text style={styles.headerText}> category </Text>
          <TextInput
            onChangeText={eventOrActivityTextOnChange}
            value={eventOrActivity[objKey]}
            style={styles.input}
          />
        </View>
      ) : objKey === "likes_or_stars" ? (
        <View style={styles.slightSplitRow}>
          <View style={styles.slightSplitRow}>
            <Image style={styles.icons} source={LitFireIcon} />

            <TouchableOpacity
              // checked={(indexBoxChecked || lockUpdater?.fields?.includes(objKey) || lockUpdater?.fields === index?.toString() && itemIndex?.display === "whole field")}
              style={[
                {
                  backgroundColor:
                    eventOrActivity?.likes_or_stars === "litLikeLove"
                      ? "grey"
                      : "",
                },
                styles.button,
              ]}
              onPress={() => checkboxToggleEventLikesOrStars("litLikeLove")}
            />
          </View>
          <View style={styles.slightSplitRow}>
            <Image style={styles.icons} source={StarIcon} />

            <TouchableOpacity
              // checked={(indexBoxChecked || lockUpdater?.fields?.includes(objKey) || lockUpdater?.fields === index?.toString() && itemIndex?.display === "whole field")}
              style={[
                {
                  backgroundColor:
                    eventOrActivity?.likes_or_stars === "stars" ? "grey" : "",
                },
                styles.button,
              ]}
              onPress={() => checkboxToggleEventLikesOrStars("stars")}
            />
          </View>
        </View>
      ) : objKey === "location_text" ? (
        <View style={styles.slightSplitRow}>
          <Image style={styles.icons} source={GolfLocationIcon} />
          <TextInput
            onChangeText={eventOrActivityTextOnChange}
            value={eventOrActivity[objKey]}
            style={styles.input}
          />
        </View>
      ) : (
        <View style={styles.slightSplitRow}>
          <Text style={styles.headerText}>
            {objKey === "start_date"
              ? "start date"
              : objKey === "start_time"
              ? "start time"
              : objKey === "end_date"
              ? "end date"
              : objKey === "end_time"
              ? "end time"
              : objKey === "event_name"
              ? "event name"
              : objKey === "location_text"
              ? "place"
              : objKey === "address"
              ? "address"
              : objKey}
          </Text>
          <TextInput
            onChangeText={eventOrActivityTextOnChange}
            value={eventOrActivity[objKey]}
            style={styles.input}
          />
        </View>
      )}

      <Text style={styles.ghost}> yh </Text>
      {/* <View style={styles.View}>
                <input
                    onChange={checkboxChangeEventEndpoint}
                    checked={eventOrActivity[objKey] === true} // 
                    id={`booleanCheckbox-${objKey}`}
                    type="checkbox" />
                <label
                    htmlFor={`booleanCheckbox-${objKey}`}> </label>
            </View> */}
    </View>
  );
};

interface BooleanCheckboxRowProps {
  eventOrActivity: any;
  setEvent: any;
  objKey: string;
}

const BooleanCheckboxRow: React.FC<BooleanCheckboxRowProps> = ({
  eventOrActivity,
  setEvent,
  objKey,
}) => {
  // const e = event

  const test = () => {
    console.log("eventOrActivity", eventOrActivity);
  };

  const checkboxChangeEventEndpoint = () => {
    // change event.endpoint (which is "objKey" string params)
    console.log("eventOrActivity", eventOrActivity);
    let clone = { ...eventOrActivity };

    console.log("clone", clone);
    clone[objKey] = !clone[objKey];
    setEvent(clone);
  };

  // 🚨 🚨 BOOLEAN TYPES ONLY: (i.e:  event.stars_show_avg
  return (
    <View style={styles.settingsRow}>
      {objKey === "is_happening" ? (
        <View style={styles.slightSplitRow}>
          <Text style={styles.headerText}> is happening </Text>

          {/* <TouchableOpacity
                            style={[{ backgroundColor: eventOrActivity[objKey] ? "grey" : "" }, styles.button]}
                            onPress={checkboxChangeEventEndpoint}
                        /> */}
        </View>
      ) : objKey === "is_chill_event" ? (
        <View style={styles.slightSplitRow}>
          <Image style={styles.icons} source={PeaceIcon} />
          <Text style={styles.headerText}> chill </Text>
        </View>
      ) : objKey === "show_attendance" ? (
        <View style={styles.slightSplitRow}>
          <Image style={styles.icons} source={UserIcon} />
          <Text style={styles.headerText}> show attendance </Text>
        </View>
      ) : objKey === "comment_locks_ok" ? (
        <View style={styles.slightSplitRow}>
          <Image style={styles.icons} source={LockIcon} />
          <Text style={styles.headerText}> comment locks ok </Text>
        </View>
      ) : objKey === "anonymous_comments_ok" ? (
        <View style={styles.slightSplitRow}>
          <Image style={styles.icons} source={AnonymityMaskIcon} />
          <Text style={styles.headerText}> anonymous comments ok </Text>
        </View>
      ) : objKey === "stars_show_users" ? (
        <View style={styles.slightSplitRow}>
          <Image style={styles.icons} source={StarIcon} />
          <Text style={styles.headerText}> show users </Text>
        </View>
      ) : objKey === "stars_show_avg" ? (
        <View style={styles.slightSplitRow}>
          <Image style={styles.icons} source={StarIcon} />
          <Text style={styles.headerText}> show avg </Text>
        </View>
      ) : objKey === "public_event" ? (
        <View style={styles.slightSplitRow}>
          <Image style={styles.icons} source={GhostIcon} />
          <Text style={styles.headerText}> public </Text>
        </View>
      ) : // if comments aren't okay than don't let user decide on voice or text comments.
      eventOrActivity?.thoughts_ok !== "no" &&
        objKey === "voice_comments_ok" ? (
        <View style={styles.slightSplitRow}>
          <Image style={styles.icons} source={SoundIcon} />
          <Text style={styles.headerText}> voice ok </Text>
        </View>
      ) : objKey === "text_comments_ok" ? (
        <View style={styles.slightSplitRow}>
          <TextInput readOnly={true} style={styles.commentInput} />
          <Text style={styles.headerText}> text ok </Text>
        </View>
      ) : objKey === "commenter_can_determine" ? (
        <View style={styles.slightSplitRow}>
          <Image style={styles.icons} source={CommenterCanDetermineIcon} />
          <Text style={styles.headerText}> commenter can determine: </Text>
        </View>
      ) : (
        <Text style={styles.headerText}> {objKey} </Text>
      )}

      <TouchableOpacity
        style={[
          { backgroundColor: eventOrActivity[objKey] ? "grey" : "" },
          styles.button,
        ]}
        onPress={checkboxChangeEventEndpoint}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  settingsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "auto",
    width: "100%",
    paddingVertical: 4,
    paddingHorizontal: 8,
    boxSizing: "border-box",
  },
  hostingUsersColumns: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 2,
    overflow: "hidden",
    gap: 2, // React Native doesn't support "gap" yet, but you can use margin for similar effect
  },
  item: {
    flexBasis: "30%", // This will create 3 equal columns
    marginBottom: 2, // This adds spacing between items vertically
    // Add any other styles for your items, e.g., backgroundColor, padding, etc.
  },
  icons: {
    height: 50,
    width: 50,
  },
  iconMini: {
    height: 35,
    width: 35,
  },
  slightSplitRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  headerText: {
    color: grayphite,
    fontSize: 20,
    fontWeight: 400,
    fontFamily: "Fuzzy Bubbles",
  },

  captionText: {
    color: grayfight,
    fontSize: 20,
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif",
  },

  input: {
    width: 80, // 5rem equivalent in React Native (1rem ~ 16px, so 5rem = 80px)
    flexDirection: "row", // Flexbox for layout
    justifyContent: "flex-start",
    marginHorizontal: 4, // 0.25rem in margin
    borderWidth: 0, // No border
    padding: 2,
    borderRadius: 6,
    fontFamily: "Fuzzy Bubbles", // Replace with your actual font name
    color: grayphite, // Replace with your grayphite color value
  },
  button: {
    height: 20,
    width: 20,
    borderWidth: 2,
    borderColor: grayphite,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 8,
    //    borderTopLeftRadius: 0,
    borderTopRightRadius: 3,
  },
  ghost: {
    opacity: 0,
  },
  commentInput: {
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

export default EventKeyUpdateModular;
