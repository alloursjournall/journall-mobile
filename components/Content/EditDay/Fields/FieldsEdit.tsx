import { useState } from "react";

import {
  Dimensions,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";
import FieldConstantseeDecideBarEdit from "./FieldsConstantseeDecideBarEdit";
import FieldIndexEdit from "./FieldIndexEdit";

// utils:

interface props {
  editDay: any;
  setEditDay: any;
}

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

// caption up to 300 words but then if the user "see more" it hides the photo!!!

const FieldsEdit: React.FC<props> = ({ editDay, setEditDay }) => {
  const [fieldsBinIndex, setFieldsBinIndex] = useState<any>(0);

  const test = () => {};

  return (
    <View style={styles.momentsCont}>
      <FieldConstantseeDecideBarEdit
        editDay={editDay}
        setEditDay={setEditDay}
        fieldsBinIndex={fieldsBinIndex}
        setFieldsBinIndex={setFieldsBinIndex}
      />

      <FieldIndexEdit
        editDay={editDay}
        setEditDay={setEditDay}
        fieldsBinIndex={fieldsBinIndex}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  momentsCont: {
    flexDirection: "column",
    gap: 10,
    margin: 0,
    padding: 0,
  },
  textCont: {
    width: screenWidth,
    // overflowY: 'auto',
    padding: 5,
  },
  text: {
    fontFamily: "Fuzzy Bubbles",
    fontSize: 16,
  },
  icon: {
    height: 85,
    width: 85,
  },
});

export default FieldsEdit;
