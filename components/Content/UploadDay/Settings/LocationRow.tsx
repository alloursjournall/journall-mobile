import { useState, useEffect, useRef, cloneElement } from "react";

// redux
import { RootState } from "@/redux/store/rootReducer";
import { useSelector, useDispatch } from "react-redux";

import {
  Dimensions,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  View,
  Text,
  StyleSheet,
} from "react-native";
import ModularMultiOptionRow from "./ModularMultiOptionRow";
import ErrorSlippedUpBanana from "@/components/ErrorSlippedUpBanana";

import { useContentFunction } from "@/Contexts/ContentFunctions";
import { specifyStringTruncate } from "@/utility/utilityValues";
import {
  InfoIcon,
  GolfLocationIcon,
  GreenForwardArrowIcon,
  GhostIcon,
  TrashIcon,
} from "@/constants/Images";

// const { commenterCanDetermineIcon, iconSound, iconSoundWave, masquerade, commentThoughtBg, padlock, unlock } = useImage();

import { grayphite } from "@/constants/Colors";

interface LocationRowProps {
  day: any;
  setDay: any;
}

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const LocationRow: React.FC<LocationRowProps> = ({ day, setDay }) => {
  let settings = day?.settings || null;

  const CURRENT_USER = useSelector(
    (state: RootState) => state.currentUser.CURRENT_USER
  );

  const ALL_LOCATIONS = useSelector(
    (state: RootState) => state.app.ALL_LOCATIONS
  );
  const foundLocation = ALL_LOCATIONS.find(
    (location) =>
      location?.is_approved === false &&
      location?.submitting_user_id === CURRENT_USER?.id
  );

  const { deleteLocation, addNewProposedLocationFunc } = useContentFunction();

  const [locationInput, setLocationInput] = useState("u r here");
  const [nicknameInput, setNicknameInput] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [stateInput, setStateInput] = useState("");
  const [zipInput, setZipInput] = useState("");
  const [countryInput, setCountryInput] = useState("");

  const [searchInput, setSearchInput] = useState("");

  const [toggleLocaleDropdown, setToggleLocaleDropdown] = useState(false);
  const [locationSet, setLocationSet] = useState(false);
  const [showWholeLocation, setShowWholeLocation] = useState(false);

  const isLocationCheckboxChecked = false;

  const checkboxChange = () => {
    let clone = { ...day };
    let settingsClone = clone?.settings || null;

    if (locationSet === false) {
      settingsClone.location = locationInput;

      setLocationSet(true);
    } else {
      settingsClone.location = "";
      setLocationInput("");
      setLocationSet(false);
    }
    clone.settings = settingsClone;
    setDay(clone);
  };

  const toggleShowLocation = () => {
    setShowWholeLocation(!showWholeLocation);
  };

  const locationInputOnchange = (text: string) => {
    if (text?.includes("nigger")) {
      setLocationInput("");
    } else {
      setLocationInput(text);
    }
  };

  const nicknameInputOnchange = (text: string) => {
    if (text?.includes("nigger")) {
      setNicknameInput("");
    } else {
      setNicknameInput(text);
    }
  };

  const cityInputOnchange = (text: string) => {
    if (text?.includes("nigger")) {
      setCityInput("");
    } else {
      setCityInput(text);
    }
  };

  const stateInputOnchange = (text: string) => {
    if (text?.includes("nigger")) {
      setStateInput("");
    } else {
      setStateInput(text);
    }
  };

  const zipInputOnchange = (text: string) => {
    if (text?.includes("nigger")) {
      setZipInput("");
    } else {
      setZipInput(text);
    }
  };

  const countryInputOnchange = (text: string) => {
    if (text?.includes("nigger")) {
      setCountryInput("");
    } else {
      setCountryInput(text);
    }
  };

  const searchInputOnchange = (text: string) => {
    if (text?.includes("nigger")) {
      setSearchInput("");
    } else {
      setSearchInput(text);
    }
  };

  const test = () => {};

  const deleteLocationClick = () => {
    if (foundLocation?.submitting_user_id === CURRENT_USER?.id) {
      deleteLocation(null, foundLocation?.id);
    }
    console.log("foundLocation", foundLocation);
  };

  const toggleNewLocaleDropdown = () => {
    setToggleLocaleDropdown(!toggleLocaleDropdown);
  };

  const addNewProposedLocation = async () => {
    // const addNewProposedLocationFunc = async (
    //     nickname:string|null, city:string|null, state:string|null, zip_code:string|null, country:string|null,
    //     submitting_user_id:number,
    if (CURRENT_USER?.id) {
      const addNewLocation = await addNewProposedLocationFunc(
        nicknameInput,
        cityInput,
        stateInput,
        zipInput,
        countryInput,
        CURRENT_USER?.id
      );
      if (addNewLocation) {
        toggleNewLocaleDropdown();
      }
      console.log("addNewLocation", addNewLocation);
    }
  };

  const searchCheckboxOnchange = (event: any, loc: any, index: any) => {
    console.log("event", event);
    console.log("loc", loc);
    console.log("index", index);
    let clone = { ...day };
    let settingsClone = clone?.settings;
    if (
      (settingsClone.location_text =
        loc?.nickname ||
        loc?.city ||
        loc?.state ||
        loc?.zip_code ||
        loc?.country)
    ) {
      settingsClone.location_id = null;
      settingsClone.location_text = "";
    } else {
      settingsClone.location_id = loc?.id;
      settingsClone.location_text =
        loc?.nickname ||
        loc?.city ||
        loc?.state ||
        loc?.zip_code ||
        loc?.country;
    }
    clone.settings = settingsClone;
    setDay(clone);
  };

  return (
    <View style={styles.columnCont}>
      <View style={styles.uploadSettingsRow}>
        {/* .uploadSettingsSubRowMini */}
        <View style={styles.slightSplitRow}>
          <Image style={styles.icons} source={GolfLocationIcon} />
          {!showWholeLocation && (
            <TextInput
              onChangeText={locationInputOnchange}
              maxLength={20}
              style={styles.input}
            />
          )}
        </View>

        {locationInput?.length <= 10 || showWholeLocation ? (
          <TouchableOpacity onPress={toggleShowLocation}>
            <Text style={styles.settingsRowText}> {locationInput} </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={toggleShowLocation}>
            <Text style={styles.settingsRowText}>
              {" "}
              {specifyStringTruncate(locationInput, 7)}{" "}
            </Text>
          </TouchableOpacity>
        )}

        {/* {
                    🚨 🚨 NOT needed. only checkboxes for the search items that come up!
                    !showWholeLocation
                        ?
                        <View className={styles.checkboxcontainer}>
                            <input onChange={checkboxChange} checked={locationSet} id={`location-checkbox`} type="checkbox" />

                            <label htmlFor={`location-checkbox`}></label>
                        </View>
                        :
                        <p style={styles.ghost}> yh </p>
                } */}
      </View>

      {locationInput?.length ? (
        <View style={styles.uploadSettingsRow}>
          {ALL_LOCATIONS?.map((loc, index) => {
            const searchBoxChecked =
              settings?.location_text === loc?.nickname ||
              settings?.location_text === loc?.city ||
              settings?.location_text === loc?.state ||
              settings?.location_text === loc?.zip_code ||
              settings?.location_text === loc?.country;

            return (
              // search {table.locations} endpoitns by: nickname, city, state, zip_code, country
              locationInput?.length === 1 ||
              (locationInput?.length >= 2 &&
                (loc?.nickname
                  ?.toLowerCase()
                  .includes(locationInput.toLowerCase()) ||
                  loc?.city
                    ?.toLowerCase()
                    .includes(locationInput.toLowerCase()) ||
                  loc?.state
                    ?.toLowerCase()
                    .includes(locationInput.toLowerCase()) ||
                  loc?.zip_code
                    ?.toLowerCase()
                    .includes(locationInput.toLowerCase()) ||
                  loc?.country
                    ?.toLowerCase()
                    .includes(locationInput.toLowerCase())) && (
                  // ||
                  // (locationInput?.length >= 2 && (loc?.nickname?.includes(locationInput) || loc?.city?.includes(locationInput) || loc?.state?.includes(locationInput) || loc?.zip_code?.includes(locationInput) || loc?.country?.includes(locationInput))) &&

                  <View style={styles.uploadSettingsRow}>
                    <Text key={`text-${index}`} style={styles.settingsRowText}>
                      {" "}
                      {loc?.nickname ||
                        loc?.city ||
                        loc?.state ||
                        loc?.zip_code ||
                        loc?.country}{" "}
                    </Text>

                    <TouchableOpacity
                      style={[
                        { backgroundColor: searchBoxChecked ? "grey" : "" },
                        styles.button,
                      ]}
                      onPress={(event: any) =>
                        searchCheckboxOnchange(event, loc, index)
                      }
                    ></TouchableOpacity>
                  </View>
                ))
            );
          })}
        </View>
      ) : (
        <View> `</View>
      )}

      {
        // if user submitted a location already restrict that action again unless they delete it. might do a 3-5 location limit but initially just 1.
        !locationInput?.length &&
          !ALL_LOCATIONS?.some(
            (locations) =>
              locations?.is_approved === false &&
              locations?.submitting_user_id === CURRENT_USER?.id
          ) && (
            <View style={styles.columnCont}>
              <View style={styles.uploadSettingsRow}>
                <Text style={styles.settingsRowText}> new locale </Text>

                {(nicknameInput?.length > 1 ||
                  cityInput?.length > 1 ||
                  stateInput?.length > 1 ||
                  zipInput?.length > 1 ||
                  countryInput?.length > 1) && (
                  <TouchableOpacity onPress={addNewProposedLocation}>
                    <Image
                      style={styles.icons}
                      source={GreenForwardArrowIcon}
                    />
                  </TouchableOpacity>
                )}

                <TouchableOpacity onPress={toggleNewLocaleDropdown}>
                  <Text style={styles.settingsRowText}> &darr; </Text>
                </TouchableOpacity>
              </View>
              {toggleLocaleDropdown && (
                <View style={styles.columnCont}>
                  <View style={styles.uploadSettingsRow}>
                    <TextInput
                      onChangeText={nicknameInputOnchange}
                      maxLength={17}
                      style={styles.input}
                    />
                    <Text style={styles.settingsRowText}>
                      {" "}
                      {(nicknameInput?.length > 1 && nicknameInput) ||
                        "nickname"}{" "}
                    </Text>

                    {nicknameInput?.length >= 1 ? (
                      <Image style={styles.icons} source={InfoIcon} />
                    ) : (
                      <Text style={styles.ghost}> y </Text>
                    )}
                  </View>
                  <View style={styles.uploadSettingsRow}>
                    <TextInput
                      onChangeText={cityInputOnchange}
                      maxLength={17}
                      style={styles.input}
                    />
                    <Text style={styles.settingsRowText}>
                      {" "}
                      {(cityInput?.length > 1 && cityInput) || "city"}{" "}
                    </Text>
                    {cityInput?.length >= 1 ? (
                      <Image style={styles.icons} source={InfoIcon} />
                    ) : (
                      <Text style={styles.icons}> y </Text>
                    )}
                  </View>

                  <View style={styles.uploadSettingsRow}>
                    <TextInput
                      onChangeText={stateInputOnchange}
                      maxLength={20}
                      style={styles.input}
                    />
                    <Text style={styles.settingsRowText}>
                      {" "}
                      {(stateInput?.length > 1 && stateInput) || "state"}{" "}
                    </Text>

                    {stateInput?.length >= 1 ? (
                      <Image style={styles.icons} source={InfoIcon} />
                    ) : (
                      <Text style={styles.ghost}> y </Text>
                    )}
                  </View>

                  <View style={styles.uploadSettingsRow}>
                    <TextInput
                      onChangeText={zipInputOnchange}
                      maxLength={20}
                      style={styles.input}
                    />
                    <Text style={styles.settingsRowText}>
                      {" "}
                      {(zipInput?.length > 1 && zipInput) || "zip"}{" "}
                    </Text>

                    {zipInput?.length >= 1 ? (
                      <Image style={styles.icons} source={InfoIcon} />
                    ) : (
                      <Text style={styles.ghost}> y </Text>
                    )}
                  </View>
                  <View style={styles.uploadSettingsRow}>
                    <TextInput
                      onChangeText={countryInputOnchange}
                      maxLength={20}
                      style={styles.input}
                    />
                    <Text style={styles.settingsRowText}>
                      {" "}
                      {(countryInput?.length > 1 && countryInput) ||
                        "country"}{" "}
                    </Text>

                    {countryInput?.length >= 1 ? (
                      <Image style={styles.icons} source={InfoIcon} />
                    ) : (
                      <Text style={styles.ghost}> y </Text>
                    )}
                  </View>
                </View>
              )}
            </View>
          )
      }

      {
        // if user has a submitted location waiting to be approved, show it so it can be deleted.
        ALL_LOCATIONS?.some(
          (locations) =>
            locations?.is_approved === false &&
            locations?.submitting_user_id === CURRENT_USER?.id
        ) && (
          <View style={styles.uploadSettingsRow}>
            <View style={styles.slightSplitRow}>
              <Image style={styles.icons} source={GhostIcon} />
              <Text style={styles.settingsRowText}>
                {" "}
                {foundLocation?.nickname ||
                  foundLocation?.city ||
                  foundLocation?.state ||
                  foundLocation?.country}{" "}
              </Text>
            </View>

            <TouchableOpacity onPress={deleteLocationClick}>
              <Image style={styles.icons} source={TrashIcon} />
            </TouchableOpacity>
          </View>
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  settingsCont: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
    borderWidth: 2,
    borderColor: "green",
  },
  columnCont: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 5,
  },
  uploadSettingsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
  },
  slightSplitRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  settingsRowHeader: {
    fontFamily: "Fuzzy Bubbles",
    color: grayphite,
    fontSize: 18,
  },
  settingsRowText: {
    fontFamily: "Fuzzy Bubbles",
    color: grayphite,
    fontSize: 14,
  },
  icons: {
    height: 35,
    width: 35,
  },
  iconMini: {
    height: 20,
    width: 20,
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
  input: {
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
  ghost: {
    opacity: 0,
  },
  ballotOptionsMedia: {
    height: screenHeight / 10,
    width: screenHeight / 10,
  },

  container: {
    gap: 5,
    // padding: 10,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  centerCont: {
    flex: 1, // Allow this to take remaining space
    height: screenHeight * 0.325,
    width: "100%",
    justifyContent: "center", // Center the content vertically
    alignItems: "center",
  },
});

export default LocationRow;
