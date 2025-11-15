import { useState, useEffect } from 'react';

// <>
import { Platform, Dimensions, Image, ScrollView, TouchableOpacity, View, Text, TextInput, StyleSheet } from 'react-native';

// utils:
import { GreenForwardArrowIcon, ThoughtsIcon, MomentsIcon, FieldsIcon, GreatfullIcon } from '@/constants/Images';
import { grayphite } from '@/constants/Colors';

interface props {
    unlock: any;
    unlockUpdater: any;
    setUnlockUpdater: any;
    checkedBoxArray: any;
    setCheckedBoxArray: any;
    setUnlockOptionSelected: any;
    table: any;
    tablesWithLock: any;
    setTablesWithLock: any;
    customUnlockInput: any;
    setCustomUnlockInput: any;
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const CustomUnlockOption: React.FC<props> = ({
    unlock,
    unlockUpdater,
    setUnlockUpdater,
    checkedBoxArray,
    setCheckedBoxArray,
    setUnlockOptionSelected,
    table,
    tablesWithLock,
    setTablesWithLock,
    customUnlockInput,
    setCustomUnlockInput,
}) => {
    useEffect(() => {
        if (unlockUpdater?.thoughts) {
            const clone = { ...tablesWithLock };
            clone.thoughts = unlockUpdater?.thoughts;
            setTablesWithLock(clone);
        }
        if (unlockUpdater?.moments) {
            const clone = { ...tablesWithLock };
            clone.moments = unlockUpdater?.moments;
            setTablesWithLock(clone);
        }
        if (unlockUpdater?.fields) {
            const clone = { ...tablesWithLock };
            clone.fields = unlockUpdater?.fields;
            setTablesWithLock(clone);
        }
        if (unlockUpdater?.greatfull) {
            const clone = { ...tablesWithLock };
            clone.greatfull = unlockUpdater?.greatfull;
            setTablesWithLock(clone);
        }
        // tablesWithLock.thoughts.includes(unlock)
        // unlockUpdaterObj.thoughts === lock ? tablesWithLock.thoughts = true;
    }, [unlockUpdater]);

    const submitLock = (unlock: any) => {
        const clone = { ...unlockUpdater };
        console.log('clone', clone);
        console.log('unlock', unlock);

        const setUnlockUpdaterThoughts = (unlock: string) => {
            clone.thoughts = `${unlock}${customUnlockInput}`;
            // only one custom unlocks at a time. to set any other "custom-" unlocks to be updated value
            if (clone?.moments?.includes('custom-')) {
                clone.moments = `${unlock}${customUnlockInput}`;
            }
            if (clone?.fields?.includes('custom-')) {
                clone.fields = `${unlock}${customUnlockInput}`;
            }
            if (clone?.greatfull?.includes('custom-')) {
                clone.greatfull = `${unlock}${customUnlockInput}`;
            }
            // clone.thoughts = unlock
            setUnlockUpdater(clone);
            console.log('clone after', clone);
        };
        const setUnlockUpdaterMoments = (unlock: string) => {
            clone.moments = `${unlock}${customUnlockInput}`;
            if (clone?.thoughts?.includes('custom-')) {
                clone.thoughts = `${unlock}${customUnlockInput}`;
            }
            if (clone?.fields?.includes('custom-')) {
                clone.fields = `${unlock}${customUnlockInput}`;
            }
            if (clone?.greatfull?.includes('custom-')) {
                clone.greatfull = `${unlock}${customUnlockInput}`;
            }
            setUnlockUpdater(clone);
            console.log('clone after', clone);
        };
        const setUnlockUpdaterFields = (unlock: string) => {
            clone.fields = `${unlock}${customUnlockInput}`;
            if (clone?.thoughts?.includes('custom-')) {
                clone.thoughts = `${unlock}${customUnlockInput}`;
            }
            if (clone?.moments?.includes('custom-')) {
                clone.moments = `${unlock}${customUnlockInput}`;
            }
            if (clone?.greatfull?.includes('custom-')) {
                clone.greatfull = `${unlock}${customUnlockInput}`;
            }
            setUnlockUpdater(clone);
            console.log('clone after', clone);
        };
        const setUnlockUpdaterGreatfull = (unlock: string) => {
            if (clone?.thoughts?.includes('custom-')) {
                clone.thoughts = `${unlock}${customUnlockInput}`;
            }
            if (clone?.moments?.includes('custom-')) {
                clone.moments = `${unlock}${customUnlockInput}`;
            }
            if (clone?.fields?.includes('custom-')) {
                clone.fields = `${unlock}${customUnlockInput}`;
            }
            clone.greatfull = `${unlock}${customUnlockInput}`;
            setUnlockUpdater(clone);
            console.log('clone after', clone);
        };
        const setUnlockUpdaterComments = (unlock: string) => {
            clone.comments = `${unlock}${customUnlockInput}`;
            if (clone?.thoughts?.includes('custom-')) {
                clone.thoughts = `${unlock}${customUnlockInput}`;
            }
            if (clone?.moments?.includes('custom-')) {
                clone.moments = `${unlock}${customUnlockInput}`;
            }
            if (clone?.fields?.includes('custom-')) {
                clone.fields = `${unlock}${customUnlockInput}`;
            }
            if (clone?.greatfull?.includes('custom-')) {
                clone.greatfull = `${unlock}${customUnlockInput}`;
            }
            setUnlockUpdater(clone);
            console.log('clone after', clone);
        };
        const setUnlockUpdaterVotes = (unlock: string) => {
            clone.votes = unlock;
            setUnlockUpdater(clone);
            console.log('clone after', clone);
        };

        if (table === 'thoughts') {
            setUnlockUpdaterThoughts(unlock);
        }
        if (table === 'moments') {
            setUnlockUpdaterMoments(unlock);
        }
        if (table === 'fields') {
            setUnlockUpdaterFields(unlock);
        }
        if (table === 'greatfull') {
            setUnlockUpdaterGreatfull(unlock);
        }
        if (table === 'comments') {
            setUnlockUpdaterComments(unlock);
        }
        if (table === 'votes') {
            setUnlockUpdaterVotes(unlock);
        }
        setUnlockOptionSelected(false);
    };

    const checkboxChange = (unlock: any) => {
        console.log('unlock', unlock);
        // if (table === "thoughts") {
        const clone = [...checkedBoxArray];
        // setCheckedBoxArray by table to know which array to go by.
        const setFalse = () => {
            clone.forEach((chbox) => {
                if (!chbox?.unlock?.includes('custom-')) {
                    chbox.isChecked = false;
                }
            });
            console.log('clone after false', clone);
            setCheckedBoxArray(clone);
        };
        const setTrue = () => {
            clone.forEach((chbox) => {
                console.log('chbox', chbox);
                if (chbox?.unlock.includes('custom-')) {
                    chbox.isChecked = !chbox?.isChecked;
                }
            });
            console.log('clone after true', clone);
            setCheckedBoxArray(clone);
        };
        const resetState = async () => {
            await setFalse();
            await setTrue();
        };
        resetState();
    };

    const inputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value: string = event.target.value;
        setCustomUnlockInput(value);
    };

    const isRelevantCheckBoxChecked = checkedBoxArray.some((chbox: any) => {
        if (chbox?.unlock.includes('custom-') && chbox?.isChecked === true) {
            return true;
        } else {
            return false;
        }
    });

    return (
        <View style={styles.unlockBox}>
            <View style={styles.unlockRow}>
                <View style={styles.lockRowTextCont}>
                    <Text style={styles.lockRowText}> {customUnlockInput} </Text>
                </View>

                <TextInput maxLength={33} onChangeText={(text: any) => inputOnChange(text)} value={customUnlockInput} style={styles.customUnlockOptionInput} />

                {isRelevantCheckBoxChecked && <Image style={styles.icons} source={GreenForwardArrowIcon} />}

                {customUnlockInput?.length > 0 ? (
                    <TouchableOpacity style={[{ backgroundColor: isRelevantCheckBoxChecked ? 'grey' : '' }, styles.button]} onPress={(event: any) => checkboxChange(unlock)} />
                ) : (
                    <Text style={styles.ghost}> y </Text>
                )}
            </View>

            <View style={styles.unlockRow}>
                {/* every time useEffect updates with unlockUpdater has to be .includes() for the postingUserThoughtStarsAvg-0 */}
                <Image style={[styles.icons, { opacity: tablesWithLock.thoughts?.includes('custom-') ? 1.0 : 0.5 }]} source={ThoughtsIcon} />
                <Image style={[styles.icons, { opacity: tablesWithLock.moments?.includes('custom-') ? 1.0 : 0.5 }]} source={MomentsIcon} />
                <Image style={[styles.icons, { opacity: tablesWithLock.fields?.includes('custom-') ? 1.0 : 0.5 }]} source={FieldsIcon} />
                <Image style={[styles.icons, { opacity: tablesWithLock.greatfull?.includes('custom-') ? 1.0 : 0.5 }]} source={GreatfullIcon} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    unlockRow: {
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

    unlockBox: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    lockRowIconRowCont: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },
    lockRowTextCont: {
        flexDirection: 'row',
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
    customUnlockOptionInput: {
        borderWidth: 2,
        borderColor: grayphite,
        backgroundColor: 'none',
        fontFamily: 'Fuzzy Bubbles',
        color: grayphite,
        width: 10,
    },
    ghost: {
        opacity: 0,
    },
});

export default CustomUnlockOption;
