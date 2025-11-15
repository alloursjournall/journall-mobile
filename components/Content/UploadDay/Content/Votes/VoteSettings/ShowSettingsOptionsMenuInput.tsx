import { useState } from 'react';

// redux
import { RootState } from '@/redux/store/rootReducer';
import { useSelector, useDispatch, createDispatchHook } from 'react-redux';

// <>
import VoteTypeMenu from '../VoteTypeMenu';
import BallotOptions from '../BallotOptions';
import LitLikeLoveOrStarsCheckboxes from './LitLikeLoveOrStarsCheckboxes';
import ShowSettingsOptionsMenuCheckbox from './ShowSettingsOptionsMenuCheckbox';
import InviteOnlySettingsRow from './InviteOnlySettingsRow';
import { LinearGradient } from 'expo-linear-gradient';

import { Dimensions, TouchableOpacity, TextInput, Image, ScrollView, View, Text, StyleSheet } from 'react-native';
import { EmergencyIcon, InfoIcon, TanPostitIcon } from '@/constants/Images';
import { grayphite } from '@/constants/Colors';

interface props {
    inputValue: any;
    setInputValue: any;
    inputOnChange: any;
    infoKey: any;
    modularShowInfo: any;
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const ShowSettingsOptionsMenuInput: React.FC<props> = ({ inputValue, setInputValue, inputOnChange, infoKey, modularShowInfo }) => {
    return (
        <View style={styles.uploadSettingsRow}>
            {/* could also take maxLength as params but for now leaving:  */}

            <TextInput maxLength={35} onChange={inputOnChange} style={styles.input2} value={inputValue} />

            {
                infoKey === 'restriction' || infoKey === 'description' ? (
                    <View style={styles.slightSplitRow}>
                        {infoKey === 'restriction' ? (
                            <Image style={styles.icons} source={EmergencyIcon} />
                        ) : (
                            infoKey === 'description' && <Image style={styles.icons} source={TanPostitIcon} />
                        )}
                        <Text style={styles.settingsRowText}> {inputValue} </Text>
                    </View>
                ) : (
                    <Text style={styles.settingsRowText}> {inputValue} </Text>
                )
                // <p className={styles.ballotOptionsText}> {inputValue} </p>
            }

            {
                inputValue?.length > 1 && inputValue !== infoKey ? (
                    <TouchableOpacity onPress={() => modularShowInfo(inputValue, setInputValue, infoKey)}>
                        <Image style={styles.icons} source={InfoIcon} />
                    </TouchableOpacity>
                ) : null
                // (
                //     <Text style={styles.ghost}> yh </Text>
                // )
            }
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
    uploadSettingsRow: {
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
        color: '#444',
        fontFamily: 'fuzzy',
        fontSize: 10,
        borderWidth: 1.5,
        borderColor: '#44454fea',
        textAlignVertical: 'center', // ✅ keeps text centered on Android
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

export default ShowSettingsOptionsMenuInput;
