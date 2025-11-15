import { useState, useEffect } from 'react';

// <>
import { Platform, Dimensions, Image, ScrollView, TouchableOpacity, View, Text, TextInput, StyleSheet } from 'react-native';

// utils:
import { GreenForwardArrowIcon, RunningIcon, DecideDoIcon, LitFireIcon, EyeIcon, StarIcon } from '@/constants/Images';
import { specifyStringTruncate } from '@/utility/utilityValues';
import { grayphite } from '@/constants/Colors';

interface props {
    lock: any;
    display: any;
    table: any;
    checkboxArray: any;
    setCheckboxArray: any;
    lockUpdater: any;
    setLockUpdater: any;
    setLockOptionSelected: any;
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const RenderGreatfullLockRow: React.FC<props> = ({ lock, display, table, checkboxArray, setCheckboxArray, lockUpdater, setLockUpdater, setLockOptionSelected }) => {
    // lock: the option itself. table is the table to which it corresponds.

    const checkboxChange = (event: any, lock: string, table: string) => {
        event.stopPropagation(); // Prevents the event from bubbling up
        console.log('checkboxChange firing!');
        console.log('event', event);
        console.log('lock', lock);
        if (table === 'thoughts' || table === 'moments' || table === 'greatfull') {
            const cloned = [...checkboxArray];
            console.log('cloned', cloned);
            console.log('lock', lock);
            const current = cloned.find((obj) => obj.lock === lock);
            console.log('current', current);

            if (current) {
                current.isChecked = !current.isChecked; // Toggle current checkbox
            }

            // Uncheck all other boxes
            cloned.forEach((obj) => {
                if (obj.lock !== lock && obj.isChecked === true) {
                    obj.isChecked = false;
                }
            });
            setCheckboxArray(cloned);
        }
        if (table === 'moments') {
            console.log('how are you');
        }
    };

    //      const greatfullWordsCheckboxchecked = greatfullCheckedBoxArray.some((chbox) => {
    //         const greatfullLock = lockUpdater?.greatfull || null
    //         console.log('greatfullLock', greatfullLock)
    //         const lockText = (greatfullLock && greatfullLock.split('-').slice(0, -1).join('-')) || null;
    //         console.log('lockText', lockText)
    //         const lockIndex = greatfullLock?.split('-').pop() || null;
    //         console.log('lockIndex', lockIndex)
    //         console.log('typeof lockIndex', typeof lockIndex)
    //         const checkForTrue = chbox.lock === "greatfullWordsIndex" && chbox?.isChecked === true && chbox.display === greatfull || greatfullLock === `greatfullWordsIndex-${index.toString()}`
    //         // const checkForTrue = chbox.lock === "threeWordsIndex" && chbox?.isChecked === true && chbox.display === greatfull || greatfullLock === "threeWordsIndex-0"
    //         console.log('check for true', `checkForTrue: ${checkForTrue} greatfull: ${greatfull} index: ${index}`)
    //         return checkForTrue;
    // return (chbox.lock === "threeWordsIndex" && chbox?.isChecked === true && chbox.display === word) || lockText === "threeWordsIndex" && lockIndex === index
    //     })

    const isRelevantCheckboxChecked = checkboxArray.some((chbox: any) => (chbox?.lock === lock && chbox?.isChecked === true) || lockUpdater.greatfull === lock);
    // <input checked={isRelevantCheckboxChecked} />

    const test = () => {
        console.log('checkboxArray', checkboxArray);
    };

    const submitLock = (lock: any) => {
        if (table === 'thoughts' || table === 'greatfull') {
            // const { uploadThoughtsBin, setUploadThoughtsBin } = uploadThoughtsBinObj;
            console.log('lock', lock);
            // wont be index that's handled in <ThoughtsIndexRenderRow/>
            const clonedLockUpdater = { ...lockUpdater };
            clonedLockUpdater.greatfull = lock;
            console.log('clonedLockUpdater', clonedLockUpdater);
            setLockUpdater(clonedLockUpdater);
            setLockOptionSelected(null);
        }
        console.log('lets submit the lock');
    };

    return (
        <View style={styles.lockRow}>
            {/* <button style={styles.testBtn} onClick={test}> t </button> */}

            {/* isMedia ?  */}
            <View style={styles.lockRowTextCont}>
                <Text style={[{ color: lock === 'cqc' ? '#D86220' : grayphite }, styles.lockRowText]}> {display} </Text>
            </View>

            {isRelevantCheckboxChecked && (
                <TouchableOpacity onPress={() => submitLock(lock)}>
                    <Image style={styles.icons} source={GreenForwardArrowIcon} />
                </TouchableOpacity>
            )}

            {/* <p style={styles.lockRowText}> {indexItem ? indexItem : lock} </p> */}

            <TouchableOpacity
                // checked={(indexBoxChecked || lockUpdater?.fields?.includes(objKey) || lockUpdater?.fields === index?.toString() && itemIndex?.display === "whole field")}
                style={[{ backgroundColor: isRelevantCheckboxChecked ? 'grey' : 'transparent' }, styles.button]}
                onPress={(event: any) => checkboxChange(event, lock, table)}
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

    lockRowIconRowCont: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },
    lockRowTextCont: {
        flexDirection: 'row',
        // overflowY: 'auto',
    },
    lockRowHeader: {
        textTransform: 'uppercase',
        fontFamily: 'Fuzzy Bubbles',
        color: grayphite,
        fontSize: 20,
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

export default RenderGreatfullLockRow;
