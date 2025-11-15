import { useState, useEffect } from "react";
import {
  Platform,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";

// utils:
import {
  DecideDoIcon,
  EyeIcon,
  GreenForwardArrowIcon,
  TrashIcon,
  StarIcon,
  EmptyStarIcon,
} from "@/constants/Images";
import { grayphite } from "@/constants/Colors";
import { specifyStringTruncate } from "@/utility/utilityValues";

interface props {
  day: any;
  setDay: any;
  fieldsBinIndex: number;
}

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const FieldIndex: React.FC<props> = ({ day, setDay, fieldsBinIndex }) => {
  const i = fieldsBinIndex;
  const fields = day?.fields || null;
  const currField = Array.isArray(fields?.fields) && fields?.fields[i];
  const currText = Array.isArray(fields?.text) && fields?.text[i];
  const currCheckbox = Array.isArray(fields?.checkbox) && fields?.checkbox[i];
  const currUserCheckbox =
    Array.isArray(fields?.users_checkboxes) && fields?.users_checkboxes[i];
  const currConstantsee =
    Array.isArray(fields?.constantsee) && fields?.constantsee[i];
  const currConstantseeStarrable =
    Array.isArray(fields?.fields) && fields?.constantsee_starrable[i];
  const currDecideDoFields =
    Array.isArray(fields?.fields) && fields?.decide_do_fields[i];

  const decidedo = day?.decidedo || null;
  const currDecision = decidedo?.decide;
  const currDidDoSummary = decidedo?.did_do_summary;

  const [showDecideDo, setShowDecideDo] = useState<boolean>(false);
  const [showConstantsee, setShowConstantsee] = useState<boolean>(false);
  const [currentConstantsee, setCurrentConstantsee] = useState<any>("");

  useEffect(() => {
    if (currentConstantsee === "") {
      console.log("Cleared input state");
      setCurrentConstantsee("");
    }
  }, [currentConstantsee]);

  // endpoint is fields.fields || fields.checkbox: --> 'fields', 'checkbox', 'usersCheckboxes',
  const updateField = (endpoint: string, value: any) => {
    let dayClone = { ...day };
    let fieldsClone: any = { ...dayClone?.fields };
    let decideDoClone: any = { ...dayClone?.decidedo };

    if (endpoint === "fields") {
      if (value === "nigger") {
        fieldsClone.fields[fieldsBinIndex] = "";
      } else {
        fieldsClone.fields[fieldsBinIndex] = value;
        dayClone.fields = fieldsClone;
      }
    }
    if (endpoint === "text") {
      if (value === "nigger") {
        fieldsClone.fields[fieldsBinIndex] = "";
      } else {
        fieldsClone.text[fieldsBinIndex] = value;
        dayClone.fields = fieldsClone;
      }
    }

    if (endpoint === "usersCheckboxes") {
      fieldsClone.users_checkboxes[fieldsBinIndex] = value;
      dayClone.fields = fieldsClone;
    }

    if (endpoint === "checkbox") {
      fieldsClone.checkbox[fieldsBinIndex] = value;
      dayClone.fields = fieldsClone;
    }

    if (endpoint === "decideDoDecision") {
      console.log("lmao wadsdup");
      if (value === "nigger") {
        fieldsClone.fields[fieldsBinIndex] = "";
      } else {
        decideDoClone.decide = value;
        dayClone.decidedo = decideDoClone;
      }
    }

    if (endpoint === "decideDoDidDoSummary") {
      if (value === "nigger") {
        fieldsClone.fields[fieldsBinIndex] = "";
      } else {
        decideDoClone.did_do_summary = value;
        dayClone.decidedo = decideDoClone;
      }
    }

    setDay(dayClone);
  };

  const updateConstantsee = (text: any) => {
    if (text?.includes("nigger")) {
      setCurrentConstantsee("");
    } else {
      setCurrentConstantsee(text);
    }
  };

  const submitCurrentConstantseeToDayClone = () => {
    let dayClone = { ...day };
    let fieldsClone = { ...day.fields };
    let fieldsCloneConstantsee = [...fieldsClone.constantsee]; // Clone array

    if (fieldsCloneConstantsee.length === 7) return; // Prevent overflow

    const currC = fieldsCloneConstantsee[fieldsBinIndex] || ""; // Ensure it's a string
    let splitC = currC ? currC.split(", ") : [];

    if (currentConstantsee.trim() !== "") {
      splitC.push(currentConstantsee); // Append new entry
    }

    fieldsCloneConstantsee[fieldsBinIndex] = splitC?.join(", ");
    fieldsClone.constantsee = fieldsCloneConstantsee;
    dayClone.fields = fieldsClone;

    setDay(dayClone);

    setTimeout(() => {
      setCurrentConstantsee(""); // ✅ Reset input field
      console.log("hey guys");
    }, 1000);
  };

  // const submitCurrentConstantseeToDayClone = () => {
  //     let dayClone = { ...day };
  //     let fieldsClone = { ...day?.fields };
  //     let fieldsCloneConstantsee = [...fieldsClone?.constantsee]; // Clone the array

  //     if (fieldsCloneConstantsee?.length === 7) {
  //         return;
  //     }

  //     const c = fieldsClone?.constantsee;
  //     const currC = c?.[fieldsBinIndex] || ''; // Ensure it's a string

  //     console.log('currentConstantsee', currentConstantsee);
  //     console.log('currC', currC);

  //     if (typeof currC === 'string') {
  //         let splitC = currC ? currC.split(', ') : []; // Convert CSV string to array or use empty array
  //         console.log('splitC before', splitC);

  //         if (currentConstantsee.trim() !== '') {
  //             splitC.push(currentConstantsee); // ✅ Append new value
  //         }

  //         console.log('splitC after', splitC);

  //         fieldsCloneConstantsee[fieldsBinIndex] = splitC.join(', '); // Convert back to CSV
  //         fieldsClone.constantsee = fieldsCloneConstantsee;
  //         dayClone.fields = fieldsClone;

  //         setDay(dayClone); // ✅ Correct way to update state
  //         setCurrentConstantsee(''); // Reset local state
  //     }
  // };

  const deleteLastConstantsee = () => {
    let dayClone = { ...day };
    let fieldsClone = { ...day?.fields };
    let fieldsCloneConstantsee = [...fieldsClone?.constantsee]; // Clone the array

    if (fieldsCloneConstantsee[fieldsBinIndex]) {
      let splitC = fieldsCloneConstantsee[fieldsBinIndex].split(", "); // Convert CSV to array
      console.log("splitC before delete", splitC);

      splitC.pop(); // ✅ Remove last item

      console.log("splitC after delete", splitC);

      fieldsCloneConstantsee[fieldsBinIndex] = splitC.join(", "); // Convert back to CSV
      fieldsClone.constantsee = fieldsCloneConstantsee;
      dayClone.fields = fieldsClone;

      setDay(dayClone); // ✅ Update state
    }
  };

  const updateBoolean = (endpoint: string) => {
    let dayClone = { ...day };
    let fieldsClone: any = { ...dayClone?.fields };

    // if (endpoint === "checkbox") {
    //     fieldsClone.checkbox[fieldsBinIndex] = !fieldsClone.checkbox[fieldsBinIndex]
    //     dayClone.checkbox = fieldsClone;
    // }
    if (endpoint === "usersCheckboxes") {
      fieldsClone.users_checkboxes[fieldsBinIndex] =
        !fieldsClone.users_checkboxes[fieldsBinIndex];
      dayClone.fields = fieldsClone;
    }

    if (endpoint === "decideDoFields") {
      fieldsClone.decide_do_fields[fieldsBinIndex] =
        !fieldsClone.decide_do_fields[fieldsBinIndex];
      dayClone.fields = fieldsClone;
    }

    setDay(dayClone);
  };

  const updateString = (content: string) => {
    let dayClone = { ...day };
    let fieldsClone: any = { ...dayClone?.fields };

    console.log("fieldsClone", fieldsClone);

    if (fieldsClone.decide_do_fields?.includes(content)) {
      // Properly remove `content`
      let filteredDDF = fieldsClone?.decide_do_fields?.filter(
        (ddf: any) => ddf !== content
      );
      fieldsClone.decide_do_fields = filteredDDF;
    } else {
      fieldsClone?.decide_do_fields?.push(content);
    }

    dayClone.fields = fieldsClone;
    setDay(dayClone);
  };

  const showDecideDoToggle = () => {
    setShowDecideDo(!showDecideDo);
    if (showConstantsee === true) {
      setShowConstantsee(false);
    }
  };

  const showConstantseeToggle = () => {
    console.log("ayoo we hitting that");
    setShowConstantsee(!showConstantsee);
    if (showDecideDo === true) {
      setShowDecideDo(false);
    }
  };

  const constantseeStarrableToggle = (mapitem: any) => {
    let dayClone = { ...day };
    let fieldsClone = { ...day?.fields };
    let constStar = [...fieldsClone?.constantsee_starrable];
    console.log("constStar", constStar);

    if (constStar.includes(mapitem)) {
      constStar = constStar.filter((item) => item !== mapitem); // Remove if exists
    } else {
      constStar.push(mapitem.trim()); // Add if not exists
    }

    fieldsClone.constantsee_starrable = constStar;
    dayClone.fields = fieldsClone;

    setDay(dayClone); // Update state
  };

  return (
    <ScrollView
      contentContainerStyle={[
        { height: Platform.OS === "web" ? 100 : screenHeight * 0.8 },
        styles.cont,
      ]}
    >
      {/* <View style={[{ height: Platform.OS === 'web' ? 100 : screenHeight * 0.8 }, styles.cont]}> */}
      {/* fields: */}

      <ScrollView contentContainerStyle={styles.inputOutputCont}>
        {/* <View style={styles.inputOutputCont}> */}
        <View style={styles.inputOutputContRow}>
          <Text style={styles.text}> activity: </Text>
          <TextInput
            maxLength={20}
            value={currField}
            onChangeText={(text: any) => updateField("fields", text)}
            style={styles.input2}
          />
        </View>

        {currField && <Text style={styles.textLeft}> {currField} </Text>}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.inputOutputCont}>
        <View style={styles.inputOutputContRow}>
          <Text style={styles.text}> notes: </Text>
          <TextInput
            maxLength={300}
            value={currText}
            onChangeText={(text: any) => updateField("text", text)}
            style={styles.input2}
          />
        </View>

        {currText && <Text style={styles.textLeft}> {currText} </Text>}
      </ScrollView>

      <View style={styles.inputOutputContRow}>
        <Text style={styles.text}> activity checkbox: </Text>
        <TouchableOpacity
          style={[
            { backgroundColor: currUserCheckbox ? "grey" : "transparent" },
            styles.button,
          ]}
          onPress={() => updateBoolean("usersCheckboxes")}
        />
      </View>

      <View style={styles.inputOutputContRow}>
        <Text style={styles.text}> decision </Text>
        <Image style={styles.icon} source={DecideDoIcon} />
        <TouchableOpacity onPress={showDecideDoToggle}>
          <Text style={styles.text}> &darr; </Text>
        </TouchableOpacity>
      </View>

      {showDecideDo && (
        <View style={styles.inputOutputCont}>
          <View
            style={[
              { borderBottomColor: "", borderBottomWidth: 0 },
              styles.inputOutputCont,
            ]}
          >
            <View style={styles.inputOutputContRow}>
              <Text style={styles.text}> decision: </Text>
              <TextInput
                maxLength={60}
                value={currDecision}
                onChangeText={(text: any) =>
                  updateField("decideDoDecision", text)
                }
                style={styles.input2}
              />
            </View>

            <Text style={styles.textLeft}> {currDecision} </Text>
          </View>

          <View
            style={[
              { borderBottomColor: "", borderBottomWidth: 0 },
              styles.inputOutputCont,
            ]}
          >
            <View style={styles.inputOutputContRow}>
              <Text style={styles.text}> notes about decision: </Text>
              <TextInput
                maxLength={60}
                value={currDidDoSummary}
                onChangeText={(text: any) =>
                  updateField("decideDoDidDoSummary", text)
                }
                style={styles.input2}
              />
            </View>

            <Text style={styles.textLeft}> {currDidDoSummary} </Text>
          </View>

          {currField?.length >= 2 && (
            <View style={styles.inputOutputContRow}>
              <Text style={styles.text}> activity is about decision </Text>

              <TouchableOpacity
                style={[
                  {
                    backgroundColor: day?.fields?.decide_do_fields?.includes(
                      currField
                    )
                      ? "grey"
                      : "transparent",
                  },
                  styles.button,
                ]}
                onPress={() => updateString(currField)}
              />
            </View>
          )}
        </View>
      )}

      <View style={styles.inputOutputContRow}>
        <Text style={styles.text}> viewpoints/slogans/reminders </Text>
        <Image style={styles.icon} source={EyeIcon} />
        <TouchableOpacity onPress={showConstantseeToggle}>
          <Text style={styles.text}> &darr; </Text>
        </TouchableOpacity>
      </View>

      {showConstantsee && (
        <View style={styles.inputOutputCont}>
          <View
            style={[
              { borderBottomColor: "", borderBottomWidth: 0 },
              styles.inputOutputCont,
            ]}
          >
            <View style={styles.inputOutputCont}>
              <View style={styles.inputOutputContRow}>
                <TouchableOpacity onPress={deleteLastConstantsee}>
                  <Image
                    style={[{ marginLeft: 20 }, styles.icon]}
                    source={TrashIcon}
                  />
                </TouchableOpacity>

                <TextInput
                  maxLength={75}
                  value={currentConstantsee}
                  onChangeText={(text: any) => updateConstantsee(text)}
                  style={styles.input2}
                />

                <TouchableOpacity onPress={submitCurrentConstantseeToDayClone}>
                  <Image
                    style={[{ marginLeft: 20 }, styles.icon]}
                    source={GreenForwardArrowIcon}
                  />
                </TouchableOpacity>
              </View>

              {Array.isArray(fields?.constantsee) &&
                typeof fields?.constantsee[fieldsBinIndex] === "string" &&
                fields?.constantsee[fieldsBinIndex]
                  ?.split(", ")
                  ?.map((mapitem: any, index: any) => {
                    return (
                      <View style={styles.inputOutputContRow}>
                        <Text key={index}> {mapitem} </Text>

                        <TouchableOpacity
                          onPress={() => constantseeStarrableToggle(mapitem)}
                        >
                          <Image
                            style={styles.icon}
                            source={
                              Array.isArray(fields?.constantsee_starrable) &&
                              fields?.constantsee_starrable?.includes(
                                mapitem.trim()
                              )
                                ? StarIcon
                                : EmptyStarIcon
                            }
                          />
                        </TouchableOpacity>
                      </View>
                    );
                  })}
            </View>

            {/* <Text style={styles.textLeft}> {currDecision} </Text> */}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cont: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    // borderColor: 'blue',
    // borderWidth: 2,
  },
  inputOutputContRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    borderBottomColor: grayphite,
    borderBottomWidth: 1,
    borderStyle: "dotted",
    margin: 0,
    padding: 2.5,
    width: screenWidth,
  },
  inputOutputCont: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    borderBottomColor: grayphite,
    borderBottomWidth: 1,
    borderStyle: "dotted",
    margin: 0,
    padding: 2.5,
    width: screenWidth,
  },
  text: {
    fontFamily: "Fuzzy Bubbles",
    textAlign: "center",
    fontSize: 16,
  },
  textLeft: {
    fontFamily: "Fuzzy Bubbles",
    textAlign: "left",
    fontSize: 16,
  },
  input2: {
    width: 24, // give it realistic room for text
    maxHeight: 20, // ✅ fixes the tall-on-type issue
    // maxHeight: 30, // ✅ fixes the tall-on-type issue
    paddingVertical: 0, // remove RN’s default 5-6 px padding
    paddingHorizontal: 8,
    borderRadius: 50,
    borderTopLeftRadius: 14.5,
    borderTopRightRadius: 65.5,
    borderBottomLeftRadius: 122.5,
    borderBottomRightRadius: 30,
    color: "#444",
    fontFamily: "fuzzy",
    fontSize: 10,
    borderWidth: 1.5,
    borderColor: "#44454fea",
    textAlignVertical: "center", // ✅ keeps text centered on Android
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
  icon: {
    height: 20,
    width: 20,
  },
});

export default FieldIndex;
