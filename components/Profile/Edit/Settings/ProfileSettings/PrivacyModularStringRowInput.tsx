// top level imports
import axios from 'axios'
import React, { useState } from "react"

// @reduxjs/toolkit:
import { RootState } from "redux/store/rootReducer"
import { useSelector, useDispatch } from "react-redux"

import { Dimensions, ScrollView, Text, TextInput, Platform, TouchableOpacity, Image, View, StyleSheet } from 'react-native';
import ErrorSlippedUpBanana from '@/components/ErrorSlippedUpBanana';

// utils:
import { grayphite, grayfight } from '@/constants/Colors';
import {
    PartyFlagsIcon, RedBackArrowIcon, GreenForwardArrowIcon, FolderUploadIcon, GolfLocationIcon, LitFireIcon, StarIcon,
    SoundIcon, CommenterCanDetermineIcon, AnonymityMaskIcon, LockIcon, UserIcon, PeaceIcon, GhostIcon, EarbudsIcon,
    DiscoBallGoldIcon
} from '@/constants/Images';
import { useContentFunction } from '@/Contexts/ContentFunctions';

// modularize it further by having keys: table: 'privacy' | '
interface props {
    editCurrPrivacy: any,
    setEditCurrPrivacy: any,
    objKey: string,
    objKeyType: string
    maxLength: number,
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const PrivacyModularStringRowInput: React.FC<props> = ({
    editCurrPrivacy,
    setEditCurrPrivacy,
    objKey,
    objKeyType,
    maxLength,
}) => {

    return (
        objKeyType === "boolean"
            ?
            <BooleanCheckboxRow
                editCurrPrivacy={editCurrPrivacy}
                setEditCurrPrivacy={setEditCurrPrivacy}
                objKey={objKey}
            />
            :
            objKeyType === "string"
                ?
                <StringCheckboxRow
                    editCurrPrivacy={editCurrPrivacy}
                    setEditCurrPrivacy={setEditCurrPrivacy}
                    objKey={objKey}
                    maxLength={maxLength}
                />
                :
                <> </>
    )
    // objKeyType === "string" show text input. 
}

interface StringCheckboxRowProps {
    editCurrPrivacy: any,
    setEditCurrPrivacy: any,
    objKey: any,
    maxLength: any,
}

const StringCheckboxRow: React.FC<StringCheckboxRowProps> = ({
    editCurrPrivacy,
    setEditCurrPrivacy,
    objKey,
    maxLength,
}) => {

    const test = () => {
        console.log('editCurrPrivacy', editCurrPrivacy)
    }


    const editCurrPrivacyTextOnChange = (text: string) => {
        if (text === 'nigger' || text.includes('nigger')) {
            text = ''
        } else {
            let clone = { ...editCurrPrivacy }
            if (text?.length === 0) {
                clone[objKey] = null;
            } else {
                clone[objKey] = text;
            }
            setEditCurrPrivacy(clone)
        }
    }


    return (
        <View style={styles.settingsRow}>
            {
                objKey === "username"
                    ?
                    <View style={styles.slightSplitRow}>

                        <TouchableOpacity onPress={test}>
                            <Text style={styles.headerText}> username </Text>
                        </TouchableOpacity>

                        <TextInput maxLength={maxLength} onChangeText={editCurrPrivacyTextOnChange} value={editCurrPrivacy[objKey]} style={styles.input} />
                    </View>
                    :
                    objKey === "text_7_caption"
                    &&
                    <HeadercaptionRow num={7} headerOrCaption={"caption"} maxLength={maxLength} editCurrPrivacyTextOnChange={editCurrPrivacyTextOnChange} editCurrPrivacy={editCurrPrivacy} objKey={objKey} />
            }

            <Text style={styles.ghost}> yh </Text>
            {/* <View style={styles.View}>
                <input
                    onChange={checkboxChangeEventEndpoint}
                    checked={editCurrPrivacy[objKey] === true} // 
                    id={`booleanCheckbox-${objKey}`}
                    type="checkbox" />
                <label
                    htmlFor={`booleanCheckbox-${objKey}`}> </label>
            </View> */}
        </View>
    )
}

interface BooleanCheckboxRowProps {
    editCurrPrivacy: any,
    setEditCurrPrivacy: any,
    objKey: string,
}

const BooleanCheckboxRow: React.FC<BooleanCheckboxRowProps> = ({
    editCurrPrivacy,
    setEditCurrPrivacy,
    objKey
}) => {

    // const e = event

    const test = () => {
        console.log('editCurrPrivacy', editCurrPrivacy)
    }

    const checkboxChangeEventEndpoint = () => {
        // change event.endpoint (which is "objKey" string params)
        console.log('editCurrPrivacy', editCurrPrivacy)
        let clone = { ...editCurrPrivacy }

        console.log('clone', clone)
        clone[objKey] = !clone[objKey];
        setEditCurrPrivacy(clone);
    }

    // 🚨 🚨 BOOLEAN TYPES ONLY: (i.e:  event.stars_show_avg
    return (
        <View style={styles.settingsRow}>
            {
                objKey === "private_acct"
                    ?
                    <View style={styles.slightSplitRow}>
                        <TouchableOpacity onPress={test}>
                            <Text style={styles.headerText}> private acct </Text>
                        </TouchableOpacity>

                        {/* <TouchableOpacity
                            style={[{ backgroundColor: editCurrPrivacy[objKey] ? "grey" : "" }, styles.button]}
                            onPress={checkboxChangeEventEndpoint}
                        /> */}

                    </View>
                    :
                    objKey === "share_data"
                        ?
                        <View style={styles.slightSplitRow}>
                            <Text style={styles.headerText}> data donations (not yet) </Text>
                        </View>
                        :
                        objKey === "prankable"
                            ?
                            <View style={styles.slightSplitRow}>
                                <Text style={styles.headerText}> prankable (not yet) </Text>
                            </View>
                            :

                            objKey === "opt_in_feedgame"
                                ?
                                <View style={styles.slightSplitRow}>
                                    <Text style={styles.headerText}> feedgame: </Text>
                                </View>
                                :
                                objKey === "opt_in_thoughtblank"
                                    ?
                                    <View style={styles.slightSplitRow}>
                                        <Text style={styles.headerText}> thought blank pranks (not yet) </Text>
                                    </View>
                                    :
                                    objKey === "show_history"
                                        ?
                                        <View style={styles.slightSplitRow}>
                                            <Text style={styles.headerText}> history </Text>
                                        </View>
                                        :
                                        objKey === "show_on_followers_list"
                                            ?
                                            <View style={styles.slightSplitRow}>
                                                <Text style={styles.headerText}> i show on follower lists </Text>
                                            </View>
                                            :
                                            objKey === "show_on_followed_users_list"
                                                ?
                                                <View style={styles.slightSplitRow}>
                                                    <Text style={styles.headerText}> i show on followed user lists </Text>
                                                </View>
                                                :
                                                objKey === "can_request_chill"
                                                    ?
                                                    <View style={styles.slightSplitRow}>
                                                        <Image style={styles.icons} source={PeaceIcon} />
                                                        <Text style={styles.headerText}> can request chill </Text>
                                                    </View>
                                                    :
                                                    objKey === "show_chill_ppl_me"
                                                        ?
                                                        <View style={styles.slightSplitRow}>
                                                            <Image style={styles.icons} source={PeaceIcon} />
                                                            <Text style={styles.headerText}> show me chill </Text>
                                                        </View>
                                                        :
                                                        objKey === "show_chill_ppl_u"
                                                            ?
                                                            <View style={styles.slightSplitRow}>
                                                                <Image style={styles.icons} source={PeaceIcon} />
                                                                <Text style={styles.headerText}> show u chill </Text>
                                                            </View>
                                                            :
                                                            objKey === "chill_msg_ok"
                                                                ?
                                                                <View style={styles.slightSplitRow}>
                                                                    <Image style={styles.icons} source={PeaceIcon} />
                                                                    <Text style={styles.headerText}> chill msg ok </Text>
                                                                </View>
                                                                :
                                                                objKey === "can_mention"
                                                                &&
                                                                <View style={styles.slightSplitRow}>
                                                                    <Text style={styles.headerText}> @ (can mention) </Text>
                                                                </View>
            }

            <TouchableOpacity
                style={[{ backgroundColor: editCurrPrivacy[objKey] ? "grey" : "" }, styles.button]}
                onPress={checkboxChangeEventEndpoint}
            />

        </View>
    )
}

interface HeaderCaptionRowProps {
    num: number,
    headerOrCaption: string,
    maxLength: number,
    editCurrPrivacyTextOnChange: any,
    editCurrPrivacy: any,
    objKey: string,
}

const HeadercaptionRow: React.FC<HeaderCaptionRowProps> = ({
    num,
    headerOrCaption,
    maxLength,
    editCurrPrivacyTextOnChange,
    editCurrPrivacy,
    objKey,

}) => {
    return (
        <View style={styles.slightSplitRow}>
            <Text style={styles.headerText}> {num} </Text>
            <TextInput maxLength={maxLength} onChangeText={editCurrPrivacyTextOnChange} value={editCurrPrivacy[objKey]} style={styles.input} />
        </View>
    )
}

const styles = StyleSheet.create({
    settingsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 'auto',
        width: '100%',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        borderBottomColor: grayphite,
        borderStyle: 'dotted',
        boxSizing: 'border-box',
    },
    scrollTextCont: {
        maxHeight: screenHeight / 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingVertical: 2,
        paddingHorizontal: 4,
    },
    columnMini: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        height: 'auto',
        width: '100%',
        paddingVertical: 4,
        paddingHorizontal: 8,
        gap: 2.5,
        boxSizing: 'border-box',
    },
    hostingUsersColumns: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 2,
        overflow: 'hidden',
        gap: 2, // React Native doesn't support "gap" yet, but you can use margin for similar effect
    },
    item: {
        flexBasis: '30%', // This will create 3 equal columns
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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
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
        width: screenWidth / 2, // 5rem equivalent in React Native (1rem ~ 16px, so 5rem = 80px)
        flexDirection: 'row', // Flexbox for layout
        justifyContent: 'flex-start',
        marginHorizontal: 4, // 0.25rem in margin
        // borderWidth: 0, // No border
        padding: 2,
        borderWidth: 1,
        borderColor: grayphite,
        borderRadius: 6,
        fontFamily: 'Fuzzy Bubbles', // Replace with your actual font name
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
})

export default PrivacyModularStringRowInput;