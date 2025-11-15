import { useState } from "react";

import {
  Dimensions,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";
import MomentsMapCont from "@/components/Content/UploadDay/Content/Moments/MomentsMapCont";
import MomentIndexEdit from "./MomentIndexEdit";
import PhotoOrVideoBarEdit from "./PhotoOrVideoBarEdit";

// utils:

interface props {
  editDay: any;
  setEditDay: any;
}

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

// caption up to 300 words but then if the user "see more" it hides the photo!!!

const MomentsEdit: React.FC<props> = ({ editDay, setEditDay }) => {
  const dayMoments = editDay?.moments;
  const [headerInput, setHeaderInput] = useState<any>("");
  const [captionInput, setCaptionInput] = useState<any>("");
  const [blob, setBlob] = useState<any>(null);
  const [blobURL, setBlobURL] = useState<any>(null);
  const [momentsBinIndex, setMomentsBinIndex] = useState<any>(0);
  const [isEditingMedia, setIsEditingMedia] = useState<boolean>(false);

  const [mediaDeleteError, setMediaDeleteError] = useState<boolean>(false);

  const [contentOrSettings, setContentOrSettings] = useState<string>("content");

  const test = () => {
    console.log("blob", blob);
  };

  return (
    <View style={styles.momentsCont}>
      <PhotoOrVideoBarEdit
        editDay={editDay}
        setEditDay={setEditDay}
        headerInput={headerInput}
        setHeaderInput={setHeaderInput}
        captionInput={captionInput}
        setCaptionInput={setCaptionInput}
        blob={blob}
        setBlob={setBlob}
        blobURL={blobURL}
        setBlobURL={setBlobURL}
        momentsBinIndex={momentsBinIndex}
        setMomentsBinIndex={setMomentsBinIndex}
        // likely to delete. just click the <Image> in <MomentIndexEdit/> and it'll allow editing media (when it does)
        isEditingMedia={isEditingMedia}
        setIsEditingMedia={setIsEditingMedia}
      />

      <MomentIndexEdit
        editDay={editDay}
        setEditDay={setEditDay}
        momentsBinIndex={momentsBinIndex}
        setMomentsBinIndex={setMomentsBinIndex}
        // likely to delete. just click the <Image> in <MomentIndexEdit/> and it'll allow editing media (when it does)
        isEditingMedia={isEditingMedia}
        setIsEditingMedia={setIsEditingMedia}
      />

      {/* <MomentsMapCont
                day={day}
                moments={dayMoments}
                setDay={setDay}
                momentsBinIndex={momentsBinIndex}
                setMomentsBinIndex={setMomentsBinIndex}
            /> */}
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

export default MomentsEdit;
