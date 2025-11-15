import { useState } from 'react';

// redux
import { RootState } from '@/redux/store/rootReducer';
import { useSelector, useDispatch, createDispatchHook } from 'react-redux';

// <>
import VoteTypeMenu from '../VoteTypeMenu';
import BallotOptions from '../BallotOptions';
import { LinearGradient } from 'expo-linear-gradient';

import { Dimensions, TouchableOpacity, TextInput, Image, ScrollView, View, Text, StyleSheet } from 'react-native';
import { InfoIcon, GhostIcon, EyeIcon, TrashIcon } from '@/constants/Images';
import { grayphite } from '@/constants/Colors';

interface props {
    checkboxChecked: any;
    checkboxOnChange: any;
    infoKey: any;
    modularShowInfo: any;
    borderBottomHexCode: any;
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const ShowSettingsOptionsMenuCheckbox: React.FC<props> = ({
    // inputValue,
    // setInputValue,
    checkboxChecked,
    checkboxOnChange,
    infoKey,
    modularShowInfo,
    borderBottomHexCode,
}) => {
    const test = () => {
        console.log('hey');
    };

    return (
        <View style={styles.uploadSettingsRow}>
            {infoKey === 'hide waiting votes' ? (
                <View style={styles.slightSplitRow}>
                    {checkboxChecked === false ? (
                        <Text style={styles.settingsRowText}> hide waiting approval votes selected </Text>
                    ) : (
                        <View style={styles.slightSplitRow}>
                            <Text style={styles.settingsRowText}> public ghost vote selected </Text>
                            <Image style={styles.icons} source={GhostIcon} />
                        </View>
                    )}
                </View>
            ) : infoKey === 'show results during' ? (
                <View style={styles.slightSplitRow}>
                    <Text style={styles.settingsRowText}> show vote count during </Text>
                    <Image style={styles.icons} source={EyeIcon} />
                    {/* <p style={styles.settingsRowText}> {infoKey} </p> */}
                </View>
            ) : infoKey === 'edit results during' ? (
                <View style={styles.slightSplitRow}>
                    <Text> toss out vote </Text>
                    <Image style={styles.icons} source={TrashIcon} />
                    {/* <p style={styles.settingsRowText}> {infoKey} </p>                         */}
                </View>
            ) : (
                <Text style={styles.settingsRowText}> {infoKey} </Text>
            )}

            <TouchableOpacity
                // checked={(indexBoxChecked || lockUpdater?.fields?.includes(objKey) || lockUpdater?.fields === index?.toString() && itemIndex?.display === "whole field")}
                style={[{ backgroundColor: checkboxChecked ? 'grey' : 'transparent' }, styles.button]}
                onPress={checkboxOnChange}
            />
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

export default ShowSettingsOptionsMenuCheckbox;
