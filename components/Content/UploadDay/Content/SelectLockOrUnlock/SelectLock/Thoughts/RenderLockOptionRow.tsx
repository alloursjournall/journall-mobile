import { useState } from "react";

// <>
import { Platform, Dimensions, Image, ScrollView, TouchableOpacity, View, Text, TextInput, StyleSheet } from 'react-native';

import { GreenForwardArrowIcon, SoundWaveIcon } from "@/constants/Images"
import { grayphite } from "@/constants/Colors"

interface props {
    lock: any,
    table: any,
    item: any,
    checkboxArray: any,
    setCheckboxArray: any,
    lockUpdater: any,
    setLockUpdater: any,
    setLockOptionSelected: any
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const RenderLockOptionRow: React.FC<props> = ({
    lock,
    table,
    item,
    checkboxArray,
    setCheckboxArray,
    lockUpdater,
    setLockUpdater,
    setLockOptionSelected,
}) => {

    // lock: the option itself. table is the table to which it corresponds.

    const checkboxChange = (event: any, lock: string) => {
        if (table === "thoughts" || table === "greatfull" || table === "fields") {
            const cloned = [...checkboxArray];
            console.log('cloned', cloned)
            console.log('lock', lock)

            const current = cloned?.find((obj: any) => obj.lock === lock);

            console.log('current', current)

            if (current) {
                current.isChecked = !current.isChecked; // Toggle current checkbox
            }

            // Uncheck all other boxes
            cloned.forEach(obj => {
                if (obj.lock !== lock && obj.isChecked === true) {
                    obj.isChecked = false;
                }
            });
            setCheckboxArray(cloned);
        } if (table === "moments") {
            console.log('how are you');
        }
    }
    //  const isRelevantCheckboxChecked = checkboxArray.some((chbox:any) => chbox?.lock === lock && chbox?.isChecked === true || lockUpdater.greatfull === lock)
    const isRelevantCheckboxChecked = checkboxArray?.some((chbox: any) => chbox?.lock === lock && chbox?.isChecked === true || lockUpdater?.thoughts === lock)
    // <input checked={isRelevantCheckboxChecked} />


    const submitLock = (lock: any) => {
        console.log('table', table)
        if (table === "thoughts" || table === "greatfull") {
            // const { uploadThoughtsBin, setUploadThoughtsBin } = uploadThoughtsBinObj;            
            console.log('lock', lock)
            const currCheckedBox = checkboxArray?.find((lockOptions: any) => lockOptions?.isChecked === true)
            // wont be index that's handled in <ThoughtsIndexRenderRow/>
            if (lock === "index") {
                console.log("yesp index")

            } else {
                const clonedLockUpdater = { ...lockUpdater }
                if (lock === "all thoughts") {
                    clonedLockUpdater.all = lock;
                } else {
                    clonedLockUpdater.thoughts = lock;
                }
                console.log('clonedLockUpdater', clonedLockUpdater)
                setLockUpdater(clonedLockUpdater)
                setLockOptionSelected(null);
            }
        }
        console.log("lets submit the lock")
    }

    const test = () => {
        console.log('lockUpdater', lockUpdater)
        console.log('checkboxArray', checkboxArray)

    }

    return (
        <View style={styles.lockRow}>
            {/* <button className={styles.testBtn} onClick={test}> t </button> */}

            {/* isMedia ?  */}

            {/* {
                item && (typeof item === "string")
                    ?
                    <ScrollView contentContainerStyle={styles.lockRowTextCont}>
                        <TouchableOpacity onPress={test}>
                            <Text style={styles.lockRowText}> {item} </Text>
                        </TouchableOpacity>

                    </ScrollView>
                    :
                    item && (typeof item !== "string") ?
                        <Image style={styles.mainLockIcon} source={SoundWaveIcon} />
                        :
                        // in case of empty strings:
                        <View style={styles.lockRowTextCont}>
                            <TouchableOpacity onPress={test}>
                                <Text style={styles.lockRowText}> {lock} </Text>
                            </TouchableOpacity>
                        </View>
            } */}

            {
                lock === "soundComments"
                    ?
                    <ScrollView contentContainerStyle={styles.lockRowTextCont}>
                        <Text style={styles.lockRowText}> all </Text>
                        <Image style={styles.mainLockIcon} source={SoundWaveIcon} />
                    </ScrollView>
                    :
                    <View style={styles.lockRowTextCont}>
                        <TouchableOpacity onPress={test}>
                            <Text style={styles.lockRowText}> {lock} </Text>
                        </TouchableOpacity>
                    </View>
            }

            {
                isRelevantCheckboxChecked &&
                <TouchableOpacity onPress={() => submitLock(lock)}>
                    <Image style={styles.iconMini} source={GreenForwardArrowIcon} />
                </TouchableOpacity>
            }

            {/* <p className={styles.lockRowText}> {indexItem ? indexItem : lock} </p> */}

            <TouchableOpacity
                style={[{ backgroundColor: isRelevantCheckboxChecked ? "grey" : "" }, styles.button]}
                onPress={(event: any) => checkboxChange(event, "all thoughts")}
            />

            {/* <input
                    id={`${lock}checkbox`}
                    onChange={(event: any) => checkboxChange(event, lock, table)}
                    checked={isRelevantCheckboxChecked}
                    // onChange={(event: any) => checkboxChangeHandler(index)}
                    type="checkbox" />
                <label htmlFor={`${lock}checkbox`}></label> */}

        </View>
    )
}

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
        overflowY: 'auto',
    },
    lockRowText: {
        fontFamily: "Fuzzy Bubbles",
        fontSize: 16,
        fontWeight: 400,
        color: grayphite
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
        width: 20
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
})

export default RenderLockOptionRow;

