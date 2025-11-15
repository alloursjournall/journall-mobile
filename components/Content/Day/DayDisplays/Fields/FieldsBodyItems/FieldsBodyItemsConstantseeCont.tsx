import axios from "axios";

// <>
import {
  Dimensions,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import FieldsLockIconText from "../FieldsLockIconText";

// redux
import { RootState } from "@/redux/store/rootReducer";
import { useSelector, useDispatch } from "react-redux";

// utils:
import Constants from "expo-constants";
import {
  EyesIcon,
  EyeIcon,
  TrashIcon,
  ShoesIcon,
  RunningIcon,
  DecideDoIcon,
  LitFireIcon,
  RedBackArrowIcon,
} from "@/constants/Images";
import { userLikesFieldQueryStringFunc } from "@/graphql/queries";
import { grayphite } from "@/constants/Colors";
import { useContentFunction } from "@/Contexts/ContentFunctions";

interface FieldsBodyItemsConstantseeContProps {
  day: any;
  usersPassLocks: any;
  setFieldsConstantseeIndex: any;
  setFieldsConstantseeText: any;
  fields: any;
  // index: number, // fieldsBinIndex (index before was the index in CURR_DAY_FIELDS.map(fields, index))
  field: any;
  witsFieldsIndex: any;
  setWitsFieldsIndex: any;
  fieldLikes: any;
  fieldCheckboxes: any;
  setFieldCheckboxes: any;
  setFieldLikes: any;
  allLikesLOCKshouldShowContent: any;
  leaveLikeIndexLOCKshouldShowContent: any;
  allWitsFieldsLOCKshouldShowContent: any;
  witsFieldsIndexLOCKshouldShowContent: any;
  decideDoLOCKshouldShowContent: any;
  decideDoFieldIndexLOCKshouldShowContent: any;
  allConstantseeLOCKshouldShowContent: any;
  constantseeIndexLOCKshouldShowContent: any;
  checkboxIndexLOCKshouldShowContent: any;
  allCheckboxLOCKshouldShowContent: any;
  fieldsConstantseeClick: boolean;
  setFieldsConstantseeClick: boolean;

  fieldsBinIndex: any;
  setFieldsBinIndex: any;
}

const FieldsBodyItemsConstantseeCont: React.FC<
  FieldsBodyItemsConstantseeContProps
> = ({
  day,
  usersPassLocks,
  setFieldsConstantseeIndex,
  setFieldsConstantseeText,
  fields,
  // index,
  field,
  witsFieldsIndex,
  setWitsFieldsIndex,
  fieldLikes,
  setFieldLikes,
  fieldCheckboxes,
  setFieldCheckboxes,
  allLikesLOCKshouldShowContent,
  leaveLikeIndexLOCKshouldShowContent,
  allWitsFieldsLOCKshouldShowContent,
  witsFieldsIndexLOCKshouldShowContent,
  decideDoLOCKshouldShowContent,
  decideDoFieldIndexLOCKshouldShowContent,
  allConstantseeLOCKshouldShowContent,
  constantseeIndexLOCKshouldShowContent,
  checkboxIndexLOCKshouldShowContent,
  allCheckboxLOCKshouldShowContent,
  fieldsConstantseeClick,
  setFieldsConstantseeClick,

  fieldsBinIndex,
  setFieldsBinIndex,
}) => {
  // (fields: any, index: number, setFieldsConstantseeText: any, setFieldsConstantseeIndex: any, fieldsConstantseeClick: boolean, setFieldsConstantseeClick: any)
  const { fieldsEyeAmClicking, likeField } = useContentFunction();

  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );
  const fieldsBinLength =
    Array.isArray(fields?.fields) && fields?.fields?.length;

  const test = () => {
    console.log("fieldLikes", fieldLikes);
  };

  const eyeAmClickingHandler = () => {
    fieldsEyeAmClicking(
      fields,
      fieldsBinIndex,
      setFieldsConstantseeText,
      setFieldsConstantseeIndex,
      fieldsConstantseeClick,
      setFieldsConstantseeClick
    );
  };

  const addWitsFieldsIndex = (field: any, index: any) => {
    setWitsFieldsIndex(true);
  };

  const deleteField = () => {
    console.log("fieldLikes", fieldLikes);
    // perhaps not now.
  };

  const goBackToFieldsFromWitsFieldsIndex = () => {
    setWitsFieldsIndex(false);
  };

  const fieldsToggleCheckbox = async () => {
    // const fieldsToggleCheckbox = async (index:number, dayId:number, fields:any) => {
    if (CURRENT_USER?.id !== day?.id) {
      return;
    }

    // 📝 📝 probably currentCheckboxes = [...fields?.checkbox] soft copy of checkboxes to avoid the loop
    let currentCheckboxes = fieldCheckboxes;
    let updatedCheckboxes: boolean[] = [];

    const checkCheckboxPromise = await new Promise((resolve) => {
      currentCheckboxes?.forEach((box: boolean, i: number) => {
        // if i === index that means the loop met the checkbox clicked by user.
        if (i === fieldsBinIndex) {
          // box === true ? then it's already checked.
          box === true
            ? updatedCheckboxes.push(false)
            : updatedCheckboxes.push(true);
        } else {
          // the else block leaves the checkbox alone because it's the [i] of every checkbox NOT clicked by user.
          updatedCheckboxes.push(box);
        }
      });
      // Promise resolves/returns the updated array of all checkboxes. the only box altered is the clicked one, in the if block.
      setFieldCheckboxes(updatedCheckboxes);
      resolve(updatedCheckboxes);
    });

    const toggleCheckboxDataPromise = await new Promise(async (resolve) => {
      let newArray = checkCheckboxPromise;
      // const query = await toggleFieldsCheckboxIndexQuery(CURR_DAY_FIELDS.id, checkCheckboxPromise)
      // CURR_DAY_FIELDS?.id
      const query = `mutation { toggleFieldsCheckboxIndex(fieldId: ${
        fields?.id
      }, newCheckboxes: ${JSON.stringify(
        checkCheckboxPromise
      )} ) { checkbox }}`;

      const predata = await axios.post("http://localhost:4000/api/graphql", {
        query: query,
      });
      const data = predata?.data?.data?.toggleFieldsCheckboxIndex;

      axios
        .post("http://localhost:4000/api/graphql", { query: query })
        .then((toggledCheckbox: any) => {
          if (toggledCheckbox?.data?.data) {
            toggledCheckbox =
              toggledCheckbox?.data?.data?.toggleFieldsCheckboxIndex;
            //  if the new array first value [0] is either false or true, then the above function worked/should've-worked and we can update state
            if (
              (toggledCheckbox[0] && toggledCheckbox[0] == true) ||
              toggledCheckbox[0] == false
            ) {
              // UPDATE_FIELDS_CHECKBOX   grabs the CURR_DAY_FIELDS and uses redux state to change CURR_DAY_FIELDS
              // dispatch(UPDATE_FIELDS_CHECKBOX(toggledCheckbox))
            }
            resolve(toggledCheckbox);
          }
        })
        .catch((error: any) => {
          resolve(error);
          // setError(true)
          console.log("error block!!", error);
        });
    });
  };

  return (
    <View style={styles.mapitemTopContCheckboxHeaderConstantsee}>
      {witsFieldsIndex === true ? (
        <TouchableOpacity
          onPress={goBackToFieldsFromWitsFieldsIndex}
          style={styles.actionButton}
        >
          <Image source={RedBackArrowIcon} style={styles.buttonIcon} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => addWitsFieldsIndex(field, fieldsBinIndex)}
          style={styles.actionButton}
        >
          {allWitsFieldsLOCKshouldShowContent &&
          witsFieldsIndexLOCKshouldShowContent ? (
            <Image source={ShoesIcon} style={styles.buttonIcon} />
          ) : (
            <FieldsLockIconText unlockText={fields?.unlock || "unlock"} />
          )}
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={() => likeField(day, fields, field, setFieldLikes)}
        style={styles.actionButton}
      >
        {allLikesLOCKshouldShowContent &&
        leaveLikeIndexLOCKshouldShowContent ? (
          <Image source={LitFireIcon} style={styles.buttonIcon} />
        ) : (
          <FieldsLockIconText unlockText={fields?.unlock || "unlock"} />
        )}
      </TouchableOpacity>

      {allCheckboxLOCKshouldShowContent &&
      checkboxIndexLOCKshouldShowContent ? (
        <TouchableOpacity
          style={[
            {
              backgroundColor:
                fieldCheckboxes[fieldsBinIndex] &&
                fieldCheckboxes[fieldsBinIndex] === true
                  ? "grey"
                  : "transparent",
            },
            styles.button,
          ]}
          // style={[{ backgroundColor: fields.checkbox[fieldsBinIndex] && fields?.checkbox[fieldsBinIndex] === true ? "grey" : "" }, styles.button]}
          onPress={fieldsToggleCheckbox}
        />
      ) : (
        <FieldsLockIconText unlockText={fields?.unlock || "unlock"} />
      )}

      <TouchableOpacity
        onPress={eyeAmClickingHandler}
        style={styles.actionButton}
      >
        {allConstantseeLOCKshouldShowContent &&
        constantseeIndexLOCKshouldShowContent ? (
          <Image source={EyesIcon} style={styles.buttonIcon} />
        ) : (
          <FieldsLockIconText unlockText={fields?.unlock || "unlock"} />
        )}
      </TouchableOpacity>

      {Array.isArray(fields?.decide_do_fields) &&
        fields?.decide_do_fields?.includes(field) && (
          <DecideDoConstantseeIcon
            unlockText={fields?.unlock || "unlock"}
            decideDoLOCKshouldShowContent={decideDoLOCKshouldShowContent}
            decideDoFieldIndexLOCKshouldShowContent={
              decideDoFieldIndexLOCKshouldShowContent
            }
          />
        )}

      {CURRENT_USER?.id === day?.id && (
        <TouchableOpacity onPress={deleteField} style={styles.actionButton}>
          <Image source={TrashIcon} style={styles.buttonIcon} />
        </TouchableOpacity>
      )}

      {
        // 🚨 🚨 <Sparks/> <GithubCommit/> <Heatmap/>
        // <TouchableOpacity onPress={deleteField} style={styles.actionButton}>
        //     <Image source={TrashIcon} style={styles.buttonIcon} />
        // </TouchableOpacity>
      }
    </View>
  );
};

interface DecideDoConstantseeIconProps {
  unlockText: string;
  decideDoLOCKshouldShowContent: any;
  decideDoFieldIndexLOCKshouldShowContent: any;
}

const DecideDoConstantseeIcon: React.FC<DecideDoConstantseeIconProps> = ({
  unlockText,
  decideDoLOCKshouldShowContent,
  decideDoFieldIndexLOCKshouldShowContent,
}) => {
  return decideDoLOCKshouldShowContent &&
    decideDoFieldIndexLOCKshouldShowContent ? (
    <Image source={DecideDoIcon} style={styles.buttonIcon} />
  ) : (
    <FieldsLockIconText unlockText={unlockText} />
  );
};

const styles = StyleSheet.create({
  mapitemTopContCheckboxHeaderConstantsee: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    alignSelf: "flex-end",
    // alignSelf: 'flex-end',
    gap: 10,
    // boxSizing: 'border-box',
    marginTop: 10,
  },

  actionButton: {
    marginRight: 16,
  },
  buttonIcon: {
    height: 25,
    width: 25,
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
});

export default FieldsBodyItemsConstantseeCont;
