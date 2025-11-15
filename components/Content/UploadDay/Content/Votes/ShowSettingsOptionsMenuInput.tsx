import { useState, useEffect } from 'react';

// redux
import { RootState } from '@/redux/store/rootReducer';
import { useSelector, useDispatch } from 'react-redux';

// <>
import VoteTypeMenu from './VoteTypeMenu';
import { LinearGradient } from 'expo-linear-gradient';

import { Platform, TouchableOpacity, TextInput, Image, ScrollView, View, Text, StyleSheet } from 'react-native';
import { InfoIcon, TanPostitIcon, EmergencyIcon } from '@/constants/Images';

import { grayphite } from '@/constants/Colors';

interface props {
    day: any;
    ballotBinIndex: number;
    inputValue: any;
    setInputValue: any;
    inputOnChange: any;
    infoKey: any;
    modularShowInfo: any;
}

const ShowSettingsOptionsMenuInput: React.FC<props> = ({ day, ballotBinIndex, inputValue, setInputValue, inputOnChange, infoKey, modularShowInfo }) => {
    const ballots = day?.ballots || null;
    const currBallot = Array.isArray(ballots) && ballots[ballotBinIndex];

    return (
        <View style={styles.uploadSettingsRow}>
            {/* could also take maxLength as params but for now leaving:  */}

            <TextInput maxLength={35} onChangeText={inputOnChange} style={styles.input2} value={inputValue} />

            {infoKey === 'restriction' || infoKey === 'description' ? (
                <View style={styles.slightSplitRow}>
                    {infoKey === 'restriction' ? (
                        <Image style={styles.icons} source={EmergencyIcon} />
                    ) : (
                        infoKey === 'description' && <Image style={styles.icons} source={TanPostitIcon} />
                    )}

                    <Text style={styles.settingsRowText}> {inputValue || infoKey === 'restriction' ? currBallot?.restriction : currBallot?.description} </Text>
                </View>
            ) : (
                <Text style={styles.settingsRowText}> {currBallot?.title || inputValue} </Text>
            )}

            {
                inputValue?.length > 1 && inputValue !== infoKey ? (
                    <TouchableOpacity onPress={() => modularShowInfo(inputValue, setInputValue, infoKey)}>
                        <Image style={styles.iconMini} source={InfoIcon} />
                    </TouchableOpacity>
                ) : (
                    <Text style={{ opacity: 0 }}> yh </Text>
                )
                // <p className="ghost"> yh </p>
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
        padding: 10,
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
        padding: 10,
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
});

export default ShowSettingsOptionsMenuInput;
