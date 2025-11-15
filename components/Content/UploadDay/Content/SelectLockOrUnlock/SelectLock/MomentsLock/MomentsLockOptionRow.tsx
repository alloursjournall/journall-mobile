import { useState } from 'react';

// <>
import { Platform, Dimensions, Image, ScrollView, TouchableOpacity, View, Text, TextInput, StyleSheet } from 'react-native';

import { GreenForwardArrowIcon, SoundWaveIcon } from '@/constants/Images';
import { grayphite } from '@/constants/Colors';

interface props {
    lock: any;
    display: any;
    checkboxArray: any;
    setCheckboxArray: any;
    lockUpdater: any;
    setLockUpdater: any;
    setLockOptionSelected: any;
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const MomentsLockOptionRow: React.FC<props> = ({ lock, display, checkboxArray, setCheckboxArray, lockUpdater, setLockUpdater, setLockOptionSelected }) => {
    // const {
    //     lock, display, checkboxArray, setCheckboxArray,
    //      currDayMoments, lockUpdaterObj, setLockOptionSelected
    // } = props;

    const test = () => {
        console.log('checkboxArray', checkboxArray);
    };

    const checkboxChange = (event: any, lock: any) => {
        const clone = [...checkboxArray];
        const current = clone.find((items) => items?.lock === lock);
        if (current) {
            current.isChecked = !current?.isChecked;
        }
        // Uncheck all other boxes
        clone?.forEach((obj) => {
            if (obj.lock !== lock && obj.isChecked === true) {
                obj.isChecked = false;
            }
        });
        setCheckboxArray(clone);
    };

    const submitLock = (lock: any) => {
        const clonedLockUpdater = { ...lockUpdater };
        if (lock === 'allMoments') {
            clonedLockUpdater.all = 'all moments';
        } else {
            clonedLockUpdater.moments = lock;
            console.log('clonedLockUpdater', clonedLockUpdater);
        }
        setLockUpdater(clonedLockUpdater);
        setLockOptionSelected(null);
    };

    const isRelevantCheckboxChecked = checkboxArray?.some((chbox: any) => (chbox?.lock === lock && chbox?.isChecked === true) || lockUpdater.greatfull === lock);

    return (
        <View style={styles.lockRow}>
            <View key={`lockRowTextCont-${lock}`} style={styles.lockRowTextCont}>
                <Text key={`lockRowText-${lock}`} style={styles.lockRowText}>
                    {' '}
                    {display}{' '}
                </Text>
            </View>

            {isRelevantCheckboxChecked && (
                <TouchableOpacity onPress={() => submitLock(lock)}>
                    <Image style={styles.iconMini} source={GreenForwardArrowIcon} />
                </TouchableOpacity>
            )}

            <TouchableOpacity
                style={[{ backgroundColor: isRelevantCheckboxChecked ? 'grey' : 'transparent' }, styles.button]}
                onPress={(event: any) => checkboxChange(event, lock)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    lockRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // justifyContent: 'space-around',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: grayphite,
        borderStyle: 'dotted',
        // flexDirection: 'row',
        width: screenWidth,
        padding: 10,
    },
    lockRowTextCont: {
        flexDirection: 'row',
        // overflowY: 'auto',
    },
    lockRowText: {
        fontFamily: 'Fuzzy Bubbles',
        fontSize: 16,
        fontWeight: 400,
        color: grayphite,
    },
    mainLockIcon: {
        height: 50,
        width: 50,
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
});

export default MomentsLockOptionRow;
