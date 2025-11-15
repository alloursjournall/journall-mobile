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
    editCurrProfile: any,
    setEditCurrProfile: any,
    objKey: string,
    objKeyType: string
    maxLength: number,
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const ModularStringRowInput: React.FC<props> = ({
    editCurrProfile,
    setEditCurrProfile,
    objKey,
    objKeyType,
    maxLength,
}) => {

    return (
        objKeyType === "boolean"
            ?
            <BooleanCheckboxRow
                editCurrProfile={editCurrProfile}
                setEditCurrProfile={setEditCurrProfile}
                objKey={objKey}
            />
            :
            objKeyType === "string"
                ?
                <StringCheckboxRow
                    editCurrProfile={editCurrProfile}
                    setEditCurrProfile={setEditCurrProfile}
                    objKey={objKey}
                    maxLength={maxLength}
                />
                :
                <> </>
    )
    // objKeyType === "string" show text input. 
}

interface StringCheckboxRowProps {
    editCurrProfile: any,
    setEditCurrProfile: any,
    objKey: any,
    maxLength: any,
}

const StringCheckboxRow: React.FC<StringCheckboxRowProps> = ({
    editCurrProfile,
    setEditCurrProfile,
    objKey,
    maxLength,
}) => {

    const test = () => {
        console.log('editCurrProfile', editCurrProfile)
    }


    const editCurrProfileTextOnChange = (text: string) => {
        if (text === 'nigger' || text.includes('nigger')) {
            text = ''
        } else {
            let clone = { ...editCurrProfile }
            if (text?.length === 0) {
                clone[objKey] = null;
            } else {
                clone[objKey] = text;
            }
            setEditCurrProfile(clone)
        }
    }


    // 🚨 🚨 BOOLEAN TYPES ONLY: (i.e:  event.stars_show_avg
    return (
        <View style={styles.settingsRow}>
            {
                objKey === "username"
                    ?
                    <View style={styles.slightSplitRow}>

                        <TouchableOpacity onPress={test}>
                            <Text style={styles.headerText}> username </Text>
                        </TouchableOpacity>

                        <TextInput maxLength={maxLength} onChangeText={editCurrProfileTextOnChange} value={editCurrProfile[objKey]} style={styles.input} />
                    </View>
                    :
                    objKey === "name"
                        ?
                        <View style={styles.slightSplitRow}>

                            <TouchableOpacity onPress={test}>
                                <Text style={styles.headerText}> name </Text>
                            </TouchableOpacity>

                            <TextInput maxLength={maxLength} onChangeText={editCurrProfileTextOnChange} value={editCurrProfile[objKey]} style={styles.input} />
                        </View>
                        :
                        objKey === "pronouns"
                            ?
                            <View style={styles.slightSplitRow}>
                                <Text style={styles.headerText}> pronouns </Text>
                                <TextInput maxLength={maxLength} onChangeText={editCurrProfileTextOnChange} value={editCurrProfile[objKey]} style={styles.input} />
                            </View>
                            :
                            objKey === "bio"
                                ?
                                <View style={styles.columnMini}>
                                    <View style={styles.slightSplitRow}>
                                        <Text style={styles.headerText}> bio </Text>
                                        <TextInput maxLength={maxLength} onChangeText={editCurrProfileTextOnChange} value={editCurrProfile[objKey]} style={styles.input} />
                                    </View>

                                    <ScrollView contentContainerStyle={styles.scrollTextCont}>
                                        <Text style={styles.headerText}> {editCurrProfile?.bio} </Text>
                                    </ScrollView>

                                </View>
                                :
                                objKey === "creator_acct"
                                    ?
                                    <View style={styles.slightSplitRow}>
                                        <Text style={styles.headerText}> acct type </Text>
                                        <TextInput maxLength={maxLength} onChangeText={editCurrProfileTextOnChange} value={editCurrProfile[objKey]} style={styles.input} />
                                    </View>
                                    :
                                    objKey === "location_text"
                                        ?
                                        <View style={styles.slightSplitRow}>
                                            <Image style={styles.iconMini} source={GolfLocationIcon} />
                                            <Text style={styles.headerText}> location  </Text>
                                            <TextInput maxLength={maxLength} onChangeText={editCurrProfileTextOnChange} value={editCurrProfile[objKey]} style={styles.input} />
                                        </View>
                                        :
                                        objKey === "text_1_header"
                                            ?
                                            <HeadercaptionRow num={1} headerOrCaption={"header"} maxLength={maxLength} editCurrProfileTextOnChange={editCurrProfileTextOnChange} editCurrProfile={editCurrProfile} objKey={objKey} />
                                            :
                                            objKey === "text_1_caption"
                                                ?
                                                <HeadercaptionRow num={1} headerOrCaption={"caption"} maxLength={maxLength} editCurrProfileTextOnChange={editCurrProfileTextOnChange} editCurrProfile={editCurrProfile} objKey={objKey} />
                                                :
                                                objKey === "text_2_header"
                                                    ?
                                                    <HeadercaptionRow num={2} headerOrCaption={"header"} maxLength={maxLength} editCurrProfileTextOnChange={editCurrProfileTextOnChange} editCurrProfile={editCurrProfile} objKey={objKey} />
                                                    :
                                                    objKey === "text_2_caption"
                                                        ?
                                                        <HeadercaptionRow num={2} headerOrCaption={"caption"} maxLength={maxLength} editCurrProfileTextOnChange={editCurrProfileTextOnChange} editCurrProfile={editCurrProfile} objKey={objKey} />
                                                        :
                                                        objKey === "text_3_header"
                                                            ?
                                                            <HeadercaptionRow num={3} headerOrCaption={"header"} maxLength={maxLength} editCurrProfileTextOnChange={editCurrProfileTextOnChange} editCurrProfile={editCurrProfile} objKey={objKey} />
                                                            :
                                                            objKey === "text_3_caption"
                                                                ?
                                                                <HeadercaptionRow num={3} headerOrCaption={"caption"} maxLength={maxLength} editCurrProfileTextOnChange={editCurrProfileTextOnChange} editCurrProfile={editCurrProfile} objKey={objKey} />
                                                                :
                                                                objKey === "text_4_header"
                                                                    ?
                                                                    <HeadercaptionRow num={4} headerOrCaption={"header"} maxLength={maxLength} editCurrProfileTextOnChange={editCurrProfileTextOnChange} editCurrProfile={editCurrProfile} objKey={objKey} />
                                                                    :
                                                                    objKey === "text_4_caption"
                                                                        ?
                                                                        <HeadercaptionRow num={4} headerOrCaption={"caption"} maxLength={maxLength} editCurrProfileTextOnChange={editCurrProfileTextOnChange} editCurrProfile={editCurrProfile} objKey={objKey} />
                                                                        :
                                                                        objKey === "text_5_header"
                                                                            ?
                                                                            <HeadercaptionRow num={5} headerOrCaption={"header"} maxLength={maxLength} editCurrProfileTextOnChange={editCurrProfileTextOnChange} editCurrProfile={editCurrProfile} objKey={objKey} />
                                                                            :
                                                                            objKey === "text_5_caption"
                                                                                ?
                                                                                <HeadercaptionRow num={5} headerOrCaption={"caption"} maxLength={maxLength} editCurrProfileTextOnChange={editCurrProfileTextOnChange} editCurrProfile={editCurrProfile} objKey={objKey} />
                                                                                :
                                                                                objKey === "text_6_header"
                                                                                    ?
                                                                                    <HeadercaptionRow num={6} headerOrCaption={"header"} maxLength={maxLength} editCurrProfileTextOnChange={editCurrProfileTextOnChange} editCurrProfile={editCurrProfile} objKey={objKey} />
                                                                                    :
                                                                                    objKey === "text_6_caption"
                                                                                        ?
                                                                                        <HeadercaptionRow num={6} headerOrCaption={"caption"} maxLength={maxLength} editCurrProfileTextOnChange={editCurrProfileTextOnChange} editCurrProfile={editCurrProfile} objKey={objKey} />
                                                                                        :
                                                                                        objKey === "text_7_header"
                                                                                            ?
                                                                                            <HeadercaptionRow num={7} headerOrCaption={"header"} maxLength={maxLength} editCurrProfileTextOnChange={editCurrProfileTextOnChange} editCurrProfile={editCurrProfile} objKey={objKey} />
                                                                                            :
                                                                                            objKey === "text_7_caption"
                                                                                            &&
                                                                                            <HeadercaptionRow num={7} headerOrCaption={"caption"} maxLength={maxLength} editCurrProfileTextOnChange={editCurrProfileTextOnChange} editCurrProfile={editCurrProfile} objKey={objKey} />
            }

            <Text style={styles.ghost}> yh </Text>
            {/* <View style={styles.View}>
                <input
                    onChange={checkboxChangeEventEndpoint}
                    checked={editCurrProfile[objKey] === true} // 
                    id={`booleanCheckbox-${objKey}`}
                    type="checkbox" />
                <label
                    htmlFor={`booleanCheckbox-${objKey}`}> </label>
            </View> */}
        </View>
    )
}

interface BooleanCheckboxRowProps {
    editCurrProfile: any,
    setEditCurrProfile: any,
    objKey: string,
}

const BooleanCheckboxRow: React.FC<BooleanCheckboxRowProps> = ({
    editCurrProfile,
    setEditCurrProfile,
    objKey
}) => {

    // const e = event

    const test = () => {
        console.log('editCurrProfile', editCurrProfile)
    }

    const checkboxChangeEventEndpoint = () => {
        // change event.endpoint (which is "objKey" string params)
        console.log('editCurrProfile', editCurrProfile)
        let clone = { ...editCurrProfile }

        console.log('clone', clone)
        clone[objKey] = !clone[objKey];
        setEditCurrProfile(clone);
    }

    // 🚨 🚨 BOOLEAN TYPES ONLY: (i.e:  event.stars_show_avg
    return (
        <View style={styles.settingsRow}>
            {
                objKey === "show_friend_count"
                    ?
                    <View style={styles.slightSplitRow}>
                        <Text style={styles.headerText}> show friend count </Text>

                        {/* <TouchableOpacity
                            style={[{ backgroundColor: editCurrProfile[objKey] ? "grey" : "" }, styles.button]}
                            onPress={checkboxChangeEventEndpoint}
                        /> */}

                    </View>
                    :
                    objKey === "show_followers_list"
                        ?
                        <View style={styles.slightSplitRow}>
                            <Text style={styles.headerText}> show followers list </Text>
                        </View>
                        :
                        objKey === "show_followed_users_list"
                            ?
                            <View style={styles.slightSplitRow}>
                                <Text style={styles.headerText}> followed users list </Text>
                            </View>
                            :

                            objKey === "users_can_listen"
                                ?
                                <View style={styles.slightSplitRow}>
                                    <Image style={styles.iconMini} source={EarbudsIcon} />
                                    <Text style={styles.headerText}> listen to {editCurrProfile?.username} </Text>
                                </View>
                                :
                                objKey === "show_attendance"
                                    ?
                                    <View style={styles.slightSplitRow}>
                                        <Image style={styles.icons} source={UserIcon} />
                                        <Text style={styles.headerText}> show attendance </Text>
                                    </View>
                                    :
                                    objKey === "show_events_current"
                                        ?
                                        <View style={styles.slightSplitRow}>
                                            <Image style={styles.icons} source={DiscoBallGoldIcon} />
                                            <Text style={styles.headerText}> show current activity </Text>
                                        </View>
                                        :
                                        objKey === "show_events_past"
                                            ?
                                            <View style={styles.slightSplitRow}>
                                                <Image style={styles.icons} source={DiscoBallGoldIcon} />
                                                <Text style={styles.headerText}> show past activity </Text>
                                            </View>
                                            :
                                            <Text style={styles.headerText}> {objKey} </Text>
            }

            <TouchableOpacity
                style={[{ backgroundColor: editCurrProfile[objKey] ? "grey" : "" }, styles.button]}
                onPress={checkboxChangeEventEndpoint}
            />

        </View>
    )
}

interface HeaderCaptionRowProps {
    num: number,
    headerOrCaption: string,
    maxLength: number,
    editCurrProfileTextOnChange: any,
    editCurrProfile: any,
    objKey: string,
}

const HeadercaptionRow: React.FC<HeaderCaptionRowProps> = ({
    num,
    headerOrCaption,
    maxLength,
    editCurrProfileTextOnChange,
    editCurrProfile,
    objKey,

}) => {
    return (
        <View style={styles.slightSplitRow}>
            <Text style={styles.headerText}> {num} </Text>
            <TextInput maxLength={maxLength} onChangeText={editCurrProfileTextOnChange} value={editCurrProfile[objKey]} style={styles.input} />
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
        // boxSizing: 'border-box',
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
        // boxSizing: 'border-box',
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

export default ModularStringRowInput;