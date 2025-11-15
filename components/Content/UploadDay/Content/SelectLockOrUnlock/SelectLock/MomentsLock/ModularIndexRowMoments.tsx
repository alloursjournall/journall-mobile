import { useState, useEffect } from 'react';

// <>
import { Platform, Dimensions, Image, ScrollView, TouchableOpacity, View, Text, TextInput, StyleSheet } from 'react-native';

import { GreenForwardArrowIcon } from '@/constants/Images';
import { grayphite } from '@/constants/Colors';

interface props {
    lock: any;
    display: any;
    index: any;
    checkboxArray: any;
    setCheckboxArray: any;
    submitIndexLock: any;
    lockUpdater: any;
    setLockUpdater: any;

    // falseCheckboxesObj: any,

    // submitLockSingleClickObj: any,
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const ModularIndexRowMoments: React.FC<props> = ({
    lock,
    display,
    index,
    checkboxArray,
    setCheckboxArray,
    submitIndexLock,
    lockUpdater,
    setLockUpdater,

    // falseCheckboxesObj,
    // submitLockSingleClickObj
}) => {
    console.log(`lock: ${lock} index: ${index} display: ${display}`);

    useEffect(() => {
        // 🚨 🚨 lock === "indexMoments" means currDayMoments.lock = "0" / index  🚨 🚨
    }, []);

    const test = () => {
        console.log('atleast were testing');
        console.log('lock', lock);
        console.log('index', index);
        console.log('lockUpdater', lockUpdater);
        console.log('checkboxArray', checkboxArray);
    };

    const momentsCheckboxIndexToggle = (event: any, lock: any, index: any) => {
        event.stopPropagation();
        // setSubmitLockSinsgleClick(false)

        const setFalse = async () => {
            // await setCheckboxArray(falseCheckboxes)
            console.log('momentsCheckedBox after false!', checkboxArray);
        };

        const setTrue = async () => {
            let clone = [...checkboxArray];
            // filter against the static values to only have array of index items to check against (index) params.
            clone = clone
                ?.filter((items) => !items?.lock)
                .sort((a, b) => {
                    // Sort populated objects (those that have keys) to the front
                    const aHasKeys = Object.keys(a).length > 0;
                    const bHasKeys = Object.keys(b).length > 0;
                    return aHasKeys === bHasKeys ? 0 : aHasKeys ? -1 : 1;
                });
            console.log('clone', clone);
            console.log('lock', lock);
            console.log('index', index);

            if (lock === 'indexMoments') {
                clone[index].indexMoments.isChecked = !clone[index].indexMoments.isChecked;

                clone[index].indexHeaders.isChecked = false;
                clone[index].indexCaptions.isChecked = false;
                clone[index].indexBlobs.isChecked = false;
                setCheckboxArray(clone);
                console.log('clone after', clone);
            }
            if (lock === 'indexBlobs') {
                console.log('clone', clone);
                clone[index].indexBlobs.isChecked = !clone[index].indexBlobs.isChecked;
                clone[index].indexMoments.isChecked = false;
                clone[index].indexHeaders.isChecked = false;
                clone[index].indexCaptions.isChecked = false;
                setCheckboxArray(clone);
            }
            if (lock === 'indexHeaders') {
                clone[index].indexHeaders.isChecked = !clone[index].indexHeaders.isChecked;

                clone[index].indexCaptions.isChecked = false;
                clone[index].indexBlobs.isChecked = false;
                clone[index].indexMoments.isChecked = false;
                setCheckboxArray(clone);
            }

            if (lock === 'indexCaptions') {
                clone[index].indexCaptions.isChecked = !clone[index].indexCaptions.isChecked;

                clone[index].indexHeaders.isChecked = false;
                clone[index].indexBlobs.isChecked = false;
                clone[index].indexMoments.isChecked = false;
                setCheckboxArray(clone);
            }
        };

        const resetCheckedBoxArrayState = async () => {
            await setFalse();
            await setTrue();
        };
        resetCheckedBoxArrayState();
    };

    // const isRelevantCheckboxChecked = checkboxArray.some(chbox => chbox?.lock === lock && chbox?.isChecked === true || lockUpdater.moment === lock)
    const isRelevantCheckboxChecked = checkboxArray?.some((chbox: any, someIndex: number) => {
        // console.log('chbox', chbox)
        if (someIndex !== index) {
            console.log('isolate to clicked type!');
            return;
        }

        if (lock === 'indexMoments') {
            if (chbox?.indexMoments?.isChecked === true) {
                return true;
            }
        }
        if (lock === 'indexBlobs') {
            if (chbox?.indexBlobs?.isChecked === true) {
                return true;
            }
        }
        if (lock === 'indexHeaders') {
            if (chbox?.indexHeaders?.isChecked === true) {
                return true;
            }
        }
        if (lock === 'indexCaptions') {
            if (chbox?.indexCaptions?.isChecked === true) {
                return true;
            }
        }
        if (lockUpdater.moments === `${lock}-${index.toString()}`) {
            // if (lockUpdater.moment === `${lock}-${index.toString()}` || lockUpdater.moment === `${index.toString()}`) {
            return true;
        }
    });
    // const isRelevantCheckboxChecked = checkboxArray.some(chbox => chbox?.isChecked === true || lockUpdater.moment === lock)

    return (
        <View style={styles.lockRow}>
            <View key={`lockRowTextCont-${lock}`} style={styles.lockRowTextCont}>
                <Text key={`lockRowText-${lock}`} style={styles.lockRowText}>
                    {' '}
                    {display}{' '}
                </Text>
            </View>

            {isRelevantCheckboxChecked && (
                <TouchableOpacity onPress={() => submitIndexLock(lock, index)}>
                    <Image style={styles.iconMini} source={GreenForwardArrowIcon} />
                </TouchableOpacity>
            )}

            <TouchableOpacity
                style={[{ backgroundColor: isRelevantCheckboxChecked ? 'grey' : 'transparent' }, styles.button]}
                onPress={(event: any) => momentsCheckboxIndexToggle(event, lock, index)}
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

export default ModularIndexRowMoments;
