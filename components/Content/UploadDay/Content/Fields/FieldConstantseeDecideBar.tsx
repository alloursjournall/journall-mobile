import axios from 'axios';
import { useState, useEffect, useRef } from 'react';

import { Dimensions, TouchableOpacity, TextInput, Image, View, Text, StyleSheet } from 'react-native';

// utils:
import { useContentFunction } from '@/Contexts/ContentFunctions';
import { SoundWaveIcon, SoundIcon, TrashIcon } from '@/constants/Images';

import { grayphite } from '@/constants/Colors';
// import AudioRecorderPlayer from 'react-native-audio-recorder-player';
// const audioRecorderPlayer = new AudioRecorderPlayer();

interface props {
    day: any;
    setDay: any;
    fieldsBinIndex: number;
    setFieldsBinIndex: any;
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const FieldConstantseeDecideBar: React.FC<props> = ({ day, setDay, fieldsBinIndex, setFieldsBinIndex }) => {
    const test = () => {
        console.log('hey');
        console.log(day?.fields);
    };

    const decrementFieldsBin = () => {
        const dayMomentsLength = day?.fields?.fields?.length;
        if (fieldsBinIndex === 0) {
            setFieldsBinIndex(dayMomentsLength - 1);
        } else {
            setFieldsBinIndex(fieldsBinIndex - 1);
        }
    };

    const incrementFieldsBin = () => {
        const dayMomentsLength = day?.fields?.fields?.length;
        if (fieldsBinIndex === dayMomentsLength - 1) {
            setFieldsBinIndex(0);
        } else {
            setFieldsBinIndex(fieldsBinIndex + 1);
        }
    };

    const addField = () => {
        let dayClone = { ...day };
        let fieldsClone = { ...dayClone?.fields };

        let fieldsArr = [...fieldsClone?.fields, ''];
        if (fieldsArr?.length === 7) {
            return;
        }
        let textArr = [...fieldsClone?.text, ''];
        let checkboxArr = [...fieldsClone?.checkbox, false];

        // ie: 'diving'
        let constantseeArr = [...fieldsClone?.constantsee, ''];
        let constantseeStarrableArr = [...fieldsClone?.constantsee_starrable, ''];
        let decideDoFieldsArr = [...fieldsClone?.decide_do_fields, false];
        let usersCheckboxesArr = [...fieldsClone?.users_checkboxes, false];

        fieldsClone.fields = fieldsArr;
        fieldsClone.text = textArr;
        fieldsClone.checkbox = checkboxArr;
        fieldsClone.constantsee = constantseeArr;
        fieldsClone.constantsee_starrable = constantseeStarrableArr;
        fieldsClone.decide_do_fields = decideDoFieldsArr;
        fieldsClone.users_checkboxes = usersCheckboxesArr;

        dayClone.fields = fieldsClone;
        setDay(dayClone);
        return;
    };

    return (
        <View style={styles.addCommentRow}>
            {
                <TouchableOpacity onPress={decrementFieldsBin}>
                    <Text> &lt; </Text>
                </TouchableOpacity>
            }

            {
                <TouchableOpacity onPress={test}>
                    <Image style={styles.icon} source={TrashIcon} />
                </TouchableOpacity>
            }

            {
                <TouchableOpacity onPress={addField} style={styles.addCommentPlusInput}>
                    <Text style={styles.addCommentInputText}> + </Text>
                </TouchableOpacity>
            }

            {
                <TouchableOpacity onPress={incrementFieldsBin}>
                    <Text> &gt; </Text>
                </TouchableOpacity>
            }

            {/* <TouchableOpacity onPress={test}>
                <Text> yuh </Text>
            </TouchableOpacity> */}
        </View>
    );
};

const styles = StyleSheet.create({
    addCommentRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 10,
        gap: screenWidth / 15,

        borderBottomColor: grayphite,
        borderBottomWidth: 1,
        borderStyle: 'dotted',
    },
    addCommentPlusInput: {
        height: 20,
        width: 20,
        borderTopLeftRadius: 14,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: -1,
        borderBottomRightRadius: 11,
        borderWidth: 2,
        borderColor: grayphite,
    },
    addCommentInputText: {
        fontSize: 16,
        fontWeight: 500,
        fontFamily: 'Fuzzy Bubbles',
        color: grayphite,
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
    icon: {
        height: 35,
        width: 35,
    },
});

export default FieldConstantseeDecideBar;
