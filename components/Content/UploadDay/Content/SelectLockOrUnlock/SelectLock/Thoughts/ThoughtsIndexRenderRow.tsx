import { useState } from 'react';

// <>
import { Platform, Dimensions, Image, ScrollView, TouchableOpacity, View, Text, TextInput, StyleSheet } from 'react-native';

import { GreenForwardArrowIcon, SoundWaveIcon } from '@/constants/Images';
import { grayphite } from '@/constants/Colors';

interface props {
    dayThoughts: any;
    lock: any;
    table: any;
    checkboxArray: any;
    setCheckboxArray: any;
    lockUpdater: any;
    setLockUpdater: any;
    setLockOptionSelected: any;
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const ThoughtsIndexRenderRow: React.FC<props> = ({ dayThoughts, lock, table, checkboxArray, setCheckboxArray, lockUpdater, setLockUpdater, setLockOptionSelected }) => {
    const filteredThoughtsBin = dayThoughts.filter((thoughts: any) => (thoughts.text && thoughts.is_voice === false) || thoughts.is_voice === true);

    const test = () => {
        console.log('dayThoughts', dayThoughts);
        console.log('filteredThoughtsBin', filteredThoughtsBin);
    };

    // not modularizing! this is for thoughts.
    const checkboxChangeHere = (event: any, lock: any, table: any, mapitem: any, checkboxArray: any, setCheckboxArray: any) => {
        if (table === 'thoughts') {
            const cloned = [...checkboxArray];

            // if lock === lock in this case: "index"
            const current = cloned?.find((obj) => obj?.lock === lock && obj?.indexItem === mapitem?.text);
            // const current = cloned.find(obj => obj.lock === lock && obj.indexItem === mapitem?.text);
            console.log('current', current);

            if (current) {
                current.isChecked = !current.isChecked; // Toggle current checkbox
            }

            // Uncheck all other boxes
            cloned?.forEach((obj) => {
                if (obj?.lock === lock && obj?.indexItem !== mapitem?.text && obj?.isChecked === true) {
                    obj.isChecked = false;
                }
                if (obj?.lock !== lock && obj?.isChecked === true) {
                    obj.isChecked = false;
                }
            });

            console.log('cloned', cloned);
            setCheckboxArray(cloned);
        }
    };

    const submitLock = (index: any) => {
        if (table === 'thoughts') {
            if (lock === 'index') {
                const clonedLockUpdater = { ...lockUpdater };
                console.log('clonedLockUpdater', clonedLockUpdater);
                clonedLockUpdater.thoughts = index;
                console.log('clonedLockUpdater after', clonedLockUpdater);
                setLockUpdater(clonedLockUpdater);
                setLockOptionSelected(null);
            } else {
                // gonna be index:
                console.log('no to index');
            }
            console.log('lock', lock);
            console.log('dayThoughts', dayThoughts);
            const current = checkboxArray?.find((lockOptions: any) => lockOptions?.isChecked === true);
            console.log('current', current);
        }
        console.log('hey guys how are you');
    };

    return (
        <View>
            {filteredThoughtsBin?.map((mapitem: any, index: number) => {
                console.log('mapitem', mapitem);
                const text = mapitem?.text;
                console.log('text', text);
                const isRelevantCheckboxChecked = checkboxArray?.some(
                    (chbox: any) => (chbox?.lock === lock && chbox?.index === index && chbox?.isChecked === true) || lockUpdater?.thoughts === lock,
                );

                return mapitem.text !== '' && mapitem?.is_voice === false ? (
                    <View key={`cont-${index}`} style={styles.lockRow}>
                        <View style={styles.lockRowTextCont}>
                            <p key={`${mapitem.text}-${mapitem.index}-key`} style={styles.lockRowText}>
                                {' '}
                                {mapitem?.text}{' '}
                            </p>
                        </View>

                        {isRelevantCheckboxChecked && (
                            <TouchableOpacity onPress={() => submitLock(index)}>
                                <Image style={styles.icons} source={GreenForwardArrowIcon} />
                            </TouchableOpacity>
                        )}

                        <TouchableOpacity
                            style={[{ backgroundColor: isRelevantCheckboxChecked ? 'grey' : '' }, styles.button]}
                            onPress={(event: any) => checkboxChangeHere(event, lock, table, mapitem, checkboxArray, setCheckboxArray)}
                        />

                        {/* <input
                                        key={`${index}-checkbox-key`}
                                        style={`${lock}checkbox-${index}`}
                                        onChange={(event: any) => checkboxChangeHere(event, lock, table, mapitem, checkboxArray, setCheckboxArray)}
                                        checked={isRelevantCheckboxChecked}
                                        type="checkbox" />
                                    <label key={`${index}-label-key`} htmlFor={`${lock}checkbox-${index}`}></label> */}
                    </View>
                ) : (
                    // for media!
                    !mapitem?.text && mapitem?.is_voice === true && (
                        <View key={`cont-${index}`} style={styles.lockRow}>
                            <Image style={styles.icons} source={SoundWaveIcon} />

                            <TouchableOpacity
                                style={[{ backgroundColor: isRelevantCheckboxChecked ? 'grey' : '' }, styles.button]}
                                onPress={(event: any) => checkboxChangeHere(event, lock, table, mapitem, checkboxArray, setCheckboxArray)}
                            />
                        </View>
                    )
                );
            })}
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

export default ThoughtsIndexRenderRow;
