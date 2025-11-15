// top level imports
// top level s
import axios from 'axios';
import React, { useState, useEffect } from 'react';

// @reduxjs/toolkit:
import { RootState } from 'redux/store/rootReducer';
import { useSelector, useDispatch } from 'react-redux';

import { Dimensions, TouchableOpacity, Image, ScrollView, View, Text, StyleSheet } from 'react-native';

// utils:
import { grayphite } from '@/constants/Colors';
import { ArtSplashIcon, DiscoBallGoldIcon, PeaceIcon } from '@/constants/Images';
import { useContentFunction } from 'Contexts/ContentFunctions';

interface props {
    allUserProfileIcons: any;
    setAllUserProfileIcons: any;
    currProfile: any;
    setCurrProfile: any;
    editCurrProfile: any;
    setEditCurrProfile: any;
    currPrivacy: any;
    setCurrPrivacy: any;
    editCurrPrivacy: any;
    setEditCurrPrivacy: any;
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const EditDataRowCheckboxes: React.FC<props> = ({
    allUserProfileIcons,
    setAllUserProfileIcons,
    currProfile,
    setCurrProfile,
    editCurrProfile,
    setEditCurrProfile,
    currPrivacy,
    setCurrPrivacy,
    editCurrPrivacy,
    setEditCurrPrivacy,
}) => {
    const dispatch = useDispatch();

    const CURR_PROFILE = useSelector((state: RootState) => state.profile.CURR_PROFILE);
    const EDIT_CURR_PROFILE = useSelector((state: RootState) => state.profile.EDIT_CURR_PROFILE);

    const [showSubRows, setShowSubRows] = useState(false);

    const toggleShowSubRows = () => {
        setShowSubRows(!showSubRows);
    };

    const currentVibeToggle = () => {
        let clone = { ...editCurrProfile };

        if (clone.current_vibe) {
            clone.current_vibe = null;
        } else {
            clone.current_vibe = editCurrProfile?.current_vibe;
        }
        setEditCurrProfile(clone);
        // dispatch(SET_EDIT_CURR_PROFILE(clone))
    };

    const showChillPeopleMeToggle = (key: string) => {
        let clone = { ...editCurrProfile };

        if (clone[key]) {
            clone[key] = false;
        } else {
            // 🚨 🚨 but then if (i.e): CURR_PROFILE?.show_events_current = false can never set true.
            clone[key] = true;
        }
        setEditCurrProfile(clone);
        // dispatch(SET_EDIT_CURR_PROFILE(clone))
    };

    // modular iteration which uses array indexing to access objects.
    const currentKeyToggle = (key: string) => {
        let clone = { ...editCurrProfile };

        if (clone[key]) {
            clone[key] = null;
        } else {
            // 🚨 🚨 but then if (i.e): CURR_PROFILE?.show_events_current = false can never set true.
            clone[key] = editCurrProfile[key];
        }
        setEditCurrProfile(clone);
        // dispatch(SET_EDIT_CURR_PROFILE(clone))
    };

    // boolean toggler which takes key:     show_events_current | show_events_past
    const currentEventToggle = (key: string) => {
        let clone = { ...editCurrProfile };
        if (clone[key]) {
            clone[key] = false;
        } else {
            clone[key] = true;
        }
        setEditCurrProfile(clone);
        // dispatch(SET_EDIT_CURR_PROFILE(clone))
    };

    const showFriendCountToggle = (key: string) => {
        console.log('show friend count toggle');
        let clone = { ...EDIT_CURR_PROFILE };
        if (clone[key]) {
            clone[key] = false;
        } else {
            clone[key] = true;
        }
        setEditCurrProfile(clone);
        // dispatch(SET_EDIT_CURR_PROFILE(clone))
    };

    const test = () => {
        console.log('EDIT_CURR_PROFILE', EDIT_CURR_PROFILE);
    };

    return (
        <View style={styles.settingsCont}>
            <View style={styles.settingsRow}>
                <View style={styles.slightSplitRow}>
                    <Image style={styles.iconMini} source={ArtSplashIcon} />
                    <Image style={styles.iconMini} source={DiscoBallGoldIcon} />
                    <Image style={styles.iconMini} source={PeaceIcon} />
                    <Text style={[{ color: '#D86220' }, styles.settingsRowHeader]}> &darr; </Text>
                </View>

                <TouchableOpacity onPress={toggleShowSubRows}>
                    <Text style={styles.settingsRowHeader}> &darr; </Text>
                </TouchableOpacity>
            </View>

            {showSubRows && (
                <View style={styles.settingsCont}>
                    <View style={styles.settingsRow}>
                        <View style={styles.slightSplitRow}>
                            {/* <button onClick={test}> test </button> */}

                            <Image style={styles.iconMini} source={ArtSplashIcon} />

                            <TouchableOpacity
                                style={[{ backgroundColor: editCurrProfile?.current_vibe?.length >= 1 ? 'grey' : '' }, styles.button]}
                                onPress={currentVibeToggle}
                            />
                        </View>

                        {/* <p style={{ color: "#D86220" }} style={styles.downArrowBIG}> &darr; </p> */}
                    </View>

                    <View style={styles.settingsRow}>
                        <View style={styles.slightSplitRow}>
                            <Image style={styles.iconMini} source={DiscoBallGoldIcon} />

                            <Text style={styles.settingsRowText}> current: </Text>
                        </View>

                        <TouchableOpacity
                            style={[{ backgroundColor: editCurrProfile?.show_events_current ? 'grey' : '' }, styles.button]}
                            onPress={() => currentEventToggle('show_events_current')}
                        />

                        <View style={styles.slightSplitRow}>
                            <Text style={styles.iconMini}> past: </Text>

                            <TouchableOpacity
                                style={[{ backgroundColor: editCurrProfile?.show_events_past ? 'grey' : '' }, styles.button]}
                                onPress={() => currentEventToggle('show_events_past')}
                            />
                        </View>
                    </View>

                    <View style={styles.settingsRow}>
                        <View style={styles.slightSplitRow}>
                            <Image style={styles.iconMini} source={PeaceIcon} />

                            <TouchableOpacity
                                style={[{ backgroundColor: editCurrProfile?.show_chill_ppl_me ? 'grey' : '' }, styles.button]}
                                onPress={() => showChillPeopleMeToggle('show_chill_ppl_me')}
                            />
                        </View>
                    </View>

                    <View style={styles.settingsRow}>
                        <View style={styles.slightSplitRow}>
                            <Text style={[{ color: '#D86220' }, styles.settingsRowHeader]}> show friend count </Text>
                            {/* <Text style={[{ color: "#D86220" }, styles.settingsRowHeader]}> &darr; </Text> */}

                            <TouchableOpacity
                                style={[{ backgroundColor: editCurrProfile?.show_friend_count ? 'grey' : '' }, styles.button]}
                                onPress={() => showFriendCountToggle('show_friend_count')}
                            />
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    settingsCont: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10,
    },
    columnCont: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 5,
    },
    settingsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    slightSplitRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    settingsRowHeader: {
        fontFamily: 'Fuzzy Bubbles',
        color: grayphite,
        fontSize: 18,
    },
    settingsRowText: {
        fontFamily: 'Fuzzy Bubbles',
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
        width: 24, // equivalent of 1.5rem (assuming 1rem = 16px)
        margin: 0,
        alignSelf: 'center',
        borderRadius: 50, // makes it circular
        borderTopLeftRadius: 14.5,
        borderTopRightRadius: 65.5,
        borderBottomLeftRadius: 122.5,
        borderBottomRightRadius: 30,
        color: '#444', // equivalent of $grayphite
        fontFamily: 'fuzzy', // make sure the font is linked properly
        fontSize: 10, // or adjust based on design
        borderWidth: 1.5,
        borderColor: '#44454fea', // border color
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
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    centerCont: {
        flex: 1, // Allow this to take remaining space
        height: screenHeight * 0.325,
        width: '100%',
        justifyContent: 'center', // Center the content vertically
        alignItems: 'center',
    },
});
