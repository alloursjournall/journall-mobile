import { useState } from "react";

// <>
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
import RenderLockOptionRow from "./RenderLockOptionRow";
import ModularIndexRowMoments from "./ModularIndexRowMoments";
import MomentsLockOptionRow from "./MomentsLockOptionRow";

// utils:
import {
  ThoughtsIcon,
  MomentsIcon,
  FieldsIcon,
  GreatfullIcon,
} from "@/constants/Images";
import { grayphite, hothazel } from "@/constants/Colors";
import { VideoPlayer } from "@/components/Content/Day/DayDisplays/Moments/VideoPlayer";
import { specifyStringTruncate } from "@/utility/utilityValues";

interface props {
  // day.thoughts is replacing: uploadThoughtsBinObj
  // 🚨 🚨 also: might not do setDay, {lockUpdater} and {day} merge later on.
  day: any;
  setDay: any;
  // to restore defaults when lock is submitted, take user out of the menu that picks day.thoughts.lock
  setLockOptionSelected: any;
  lockUpdater: any;
  setLockUpdater: any;
}

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const PickMomentsLock: React.FC<props> = ({
  day,
  setDay,
  setLockOptionSelected,
  lockUpdater,
  setLockUpdater,
}) => {
  const dayMoments: any = Array.isArray(day?.thoughts) && day?.moments;
  const filteredMomentsBin = dayMoments?.filter(
    (moments: any) => moments?.blob && moments?.blobURL?.length > 1
  );

  const [showDropdownMenu, setShowDropdownMenu] = useState(
    Array.from({ length: dayMoments?.blobs?.length })?.fill(false)
  );
  const [showAllMenu, setShowAllMenu] = useState(false);

  //   const VideoPlayer = ({ uri }: { uri: string }) => {
  //     return (
  //       <View style={styles.container}>
  //         {Platform.OS === "web" ? (
  //           <ReactPlayer url={uri} controls style={styles.centerCont} />
  //         ) : (
  //           // <ReactPlayer url={uri} controls width="100%" height="300px" />
  //           <Video
  //             source={{ uri: uri }}
  //             style={styles.centerCont}
  //             controls
  //             resizeMode="contain"
  //           />
  //         )}
  //       </View>
  //     );
  //   };

  const [checkboxArray, setCheckboxArray] = useState<any>([
    ...filteredMomentsBin.map((moment: any, index: number) => ({
      // Conditionally include index fields only if moment.blob exists (ty chatGPT
      ...(moment?.blob && {
        indexMoments: { lock: index, display: "all", isChecked: false },
        indexBlobs: {
          lock: `indexBlobs-${index.toString()}`,
          display: moment?.is_image ? "image" : moment?.is_video ? "video" : "",
          isChecked: false,
        },
        indexHeaders: {
          lock: `indexHeaders-${index.toString()}`,
          display: moment?.header || null,
          isChecked: false,
        },
        indexCaptions: {
          lock: `indexCaptions-${index.toString()}`,
          display: moment?.caption || null,
          isChecked: false,
        },
        blob: moment?.blob,
        blobURL: moment?.blobURL,
        //   !moment?.blob empty object.
      }),
      // } : {})
    })),
    // })) ?? [])],

    // Static fields appended after the map
    { lock: "allMoments", display: "all", isChecked: false },
    { lock: "allBlobs", display: "media", isChecked: false },
    { lock: "allHeaders", display: "titles", isChecked: false },
    { lock: "allCaptions", display: "captions", isChecked: false },
    { lock: "allImages", display: "images", isChecked: false },
    { lock: "allVideos", display: "videos", isChecked: false },
  ]);

  const submitIndexLock = (lock: any, index: number) => {
    console.log("lock", lock);
    // if (submitLockSingleClick === false) {
    //     setSubmitLockSingleClick(true);
    // } else {
    console.log("submit index lock");
    const lockUpdaterClone = { ...lockUpdater };
    console.log("lock", lock);
    console.log("index", index);
    if (lock === index) {
      // if (lock === index.toString()) {
      console.log("lets be in the first block");
      // CURR_DAY_MOMENT.lock = "0"
      lockUpdaterClone.moments = index.toString();
    } else if (lock === "indexMoments") {
      lockUpdaterClone.moments = `indexMoments-${index.toString()}`;
    } else if (lock === `indexBlobs`) {
      // else if (lock === `indexBlobs-${index.toString()}`) {
      lockUpdaterClone.moments = `indexBlobs-${index.toString()}`;
    } else if (lock === `indexHeaders`) {
      lockUpdaterClone.moments = `indexHeaders-${index.toString()}`;
    } else if (lock === `indexCaptions`) {
      lockUpdaterClone.moments = `indexCaptions-${index.toString()}`;
    }
    setLockUpdater(lockUpdaterClone);
  };

  const showDropdownByIndex = (index: number) => {
    // soft copy
    const cloned: any = [...showDropdownMenu];
    console.log("index", index);
    console.log("cloned", cloned);

    // if index is already true and clicked again, then don't affect other values just toggle back and show dropdown or not
    if (cloned[index] === true) {
      cloned[index] = !cloned[index];
    } else {
      // but if different index is clicked than truthy, or no truthy then reset to false so only 1 dropdown menu shows at a time
      cloned.fill(false);
      cloned[index] = true;
    }
    // reapply the new cloned array with index correspondent truthy value as updated state.
    setShowDropdownMenu(cloned);
  };

  const showAllMenuClick = () => {
    setShowAllMenu(!showAllMenu);
  };

  return (
    <ScrollView contentContainerStyle={styles.cont}>
      {filteredMomentsBin?.map((moment: any, index: any) => {
        return (
          moment?.blob &&
          moment?.blobURL && (
            <View style={styles.lockColumn}>
              <View key={`lockRow-${moment}-${index}`} style={styles.lockRow}>
                <View
                  key={`lockRowTextCont-${moment}-${index}`}
                  style={styles.lockRowTextCont}
                >
                  {moment?.is_image ? (
                    <Image
                      style={styles.miniMomentExample}
                      source={moment?.blobURL}
                    />
                  ) : (
                    moment?.is_vstyleeo && <VideoPlayer uri={moment?.blobURL} />
                  )}

                  {/* showLikeClick && */}
                </View>

                {/*  🚨 🚨 🚨 &darr; shows the down-arrow dropdown! only one at a time!    */}
                <TouchableOpacity onPress={() => showDropdownByIndex(index)}>
                  <Text
                    key={`lockRowText-${moment}-${index}`}
                    style={styles.lockRowText}
                  >
                    {" "}
                    &darr;{" "}
                  </Text>
                </TouchableOpacity>
              </View>

              {showDropdownMenu[index] === true && (
                <View style={styles.cont}>
                  <ModularIndexRowMoments
                    lock={"indexMoments"}
                    display={"all"}
                    index={index}
                    checkboxArray={checkboxArray}
                    setCheckboxArray={setCheckboxArray}
                    submitIndexLock={submitIndexLock}
                    lockUpdater={lockUpdater}
                    setLockUpdater={setLockUpdater}
                  />
                  <ModularIndexRowMoments
                    lock={"indexBlobs"}
                    display={
                      moment?.is_image
                        ? "image"
                        : moment?.is_video
                        ? "video"
                        : ""
                    }
                    index={index}
                    checkboxArray={checkboxArray}
                    setCheckboxArray={setCheckboxArray}
                    submitIndexLock={submitIndexLock}
                    lockUpdater={lockUpdater}
                    setLockUpdater={setLockUpdater}
                  />
                  {dayMoments[index]?.header?.length >= 1 && (
                    <ModularIndexRowMoments
                      lock={"indexHeaders"}
                      display={moment?.header || null}
                      index={index}
                      checkboxArray={checkboxArray}
                      setCheckboxArray={setCheckboxArray}
                      submitIndexLock={submitIndexLock}
                      lockUpdater={lockUpdater}
                      setLockUpdater={setLockUpdater}
                    />
                  )}
                  {dayMoments[index]?.caption?.length >= 1 && (
                    <ModularIndexRowMoments
                      lock={"indexCaptions"}
                      display={moment?.caption || null}
                      index={index}
                      checkboxArray={checkboxArray}
                      setCheckboxArray={setCheckboxArray}
                      submitIndexLock={submitIndexLock}
                      lockUpdater={lockUpdater}
                      setLockUpdater={setLockUpdater}
                    />
                  )}
                </View>
              )}
            </View>
          )
        );
      })}

      <View key={`lockRow-all`} style={styles.lockRow}>
        <View key={`lockRowTextCont-all`} style={styles.lockRowTextCont}>
          <Text style={styles.lockRowHeader} key={`lockRowText-all`}>
            {" "}
            All{" "}
          </Text>
        </View>

        {/*  🚨 🚨 🚨 &darr; shows the down-arrow dropdown! only one at a time!    */}
        <TouchableOpacity onPress={showAllMenuClick}>
          <Text key={`lockRowText-all`} style={styles.lockRowText}>
            {" "}
            &darr;{" "}
          </Text>
        </TouchableOpacity>
      </View>

      {showAllMenu && (
        <View style={styles.lockRow}>
          <MomentsLockOptionRow
            lock={"allMoments"}
            display={"all"}
            checkboxArray={checkboxArray}
            setCheckboxArray={setCheckboxArray}
            lockUpdater={lockUpdater}
            setLockUpdater={setLockUpdater}
            setLockOptionSelected={setLockOptionSelected}
          />
          <MomentsLockOptionRow
            lock={"allBlobs"}
            display={"media"}
            checkboxArray={checkboxArray}
            setCheckboxArray={setCheckboxArray}
            lockUpdater={lockUpdater}
            setLockUpdater={setLockUpdater}
            setLockOptionSelected={setLockOptionSelected}
          />
          <MomentsLockOptionRow
            lock={"allHeaders"}
            display={"titles"}
            checkboxArray={checkboxArray}
            setCheckboxArray={setCheckboxArray}
            lockUpdater={lockUpdater}
            setLockUpdater={setLockUpdater}
            setLockOptionSelected={setLockOptionSelected}
          />
          <MomentsLockOptionRow
            lock={"allCaptions"}
            display={"captions"}
            checkboxArray={checkboxArray}
            setCheckboxArray={setCheckboxArray}
            lockUpdater={lockUpdater}
            setLockUpdater={setLockUpdater}
            setLockOptionSelected={setLockOptionSelected}
          />
          <MomentsLockOptionRow
            lock={"allImages"}
            display={"images"}
            checkboxArray={checkboxArray}
            setCheckboxArray={setCheckboxArray}
            lockUpdater={lockUpdater}
            setLockUpdater={setLockUpdater}
            setLockOptionSelected={setLockOptionSelected}
          />
          <MomentsLockOptionRow
            lock={"allVideos"}
            display={"videos"}
            checkboxArray={checkboxArray}
            setCheckboxArray={setCheckboxArray}
            lockUpdater={lockUpdater}
            setLockUpdater={setLockUpdater}
            setLockOptionSelected={setLockOptionSelected}
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cont: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  lockColumn: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    gap: 5,
    // padding: 10,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  lockRowHeader: {
    textTransform: "uppercase",
    fontFamily: "Fuzzy Bubbles",
    color: grayphite,
    fontSize: 20,
  },
  centerCont: {
    flex: 1, // Allow this to take remaining space
    height: screenHeight * 0.325,
    width: "100%",
    justifyContent: "center", // Center the content vertically
    alignItems: "center",
  },
  miniMomentExample: {
    height: 40,
    width: 40,
  },

  lockRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    // justifyContent: 'space-around',
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: grayphite,
    borderStyle: "dotted",
    // flexDirection: 'row',
    width: screenWidth,
    padding: 10,
  },
  lockRowTextCont: {
    flexDirection: "row",
    // overflowY: 'auto',
  },
  lockRowText: {
    fontFamily: "Fuzzy Bubbles",
    fontSize: 16,
    fontWeight: 400,
    color: grayphite,
  },
});

export default PickMomentsLock;
