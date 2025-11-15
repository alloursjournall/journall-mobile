import { useState, useEffect } from 'react';

// <>
import { Platform, Dimensions, Image, ScrollView, TouchableOpacity, View, Text, TextInput, StyleSheet } from 'react-native';

// utils:
import { GreenForwardArrowIcon, ThoughtsIcon, MomentsIcon, FieldsIcon, GreatfullIcon, CommentIcon, BallotIcon, StarIcon } from '@/constants/Images';
import { grayphite } from '@/constants/Colors';

interface props {
    unlock: any;
    display: any;
    unlockUpdater: any;
    setUnlockUpdater: any;
    checkedBoxArray: any;
    setCheckedBoxArray: any;
    setUnlockOptionSelected: any;
    table: any;
    tablesWithLock: any;
    setTablesWithLock: any;
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const RenderUnlockOptionInput: React.FC<props> = ({
    unlock,
    display,
    unlockUpdater,
    setUnlockUpdater,
    checkedBoxArray,
    setCheckedBoxArray,
    setUnlockOptionSelected,
    table,
    tablesWithLock,
    setTablesWithLock,
}) => {
    const [inputValue, setInputValue] = useState<any>(0);

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
            clone.thoughts = `${unlock}-${inputValue}`;
            // clone.thoughts = unlock
            setUnlockUpdater(clone);
            console.log('clone after', clone);
        };
        const setUnlockUpdaterMoments = (unlock: string) => {
            clone.moments = `${unlock}-${inputValue}`;
            setUnlockUpdater(clone);
            console.log('clone after', clone);
        };
        const setUnlockUpdaterFields = (unlock: string) => {
            clone.fields = `${unlock}-${inputValue}`;
            setUnlockUpdater(clone);
            console.log('clone after', clone);
        };
        const setUnlockUpdaterGreatfull = (unlock: string) => {
            clone.greatfull = `${unlock}-${inputValue}`;
            setUnlockUpdater(clone);
            console.log('clone after', clone);
        };
        const setUnlockUpdaterComments = (unlock: string) => {
            clone.comments = `${unlock}-${inputValue}`;
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
                if (chbox?.unlock !== unlock) {
                    chbox.isChecked = false;
                }
            });
            console.log('clone after false', clone);
            setCheckedBoxArray(clone);
        };
        const setTrue = () => {
            clone.forEach((chbox) => {
                console.log('chbox', chbox);
                if (chbox?.unlock.includes(unlock)) {
                    console.log('found the chbox', chbox);

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

    const inputOnChange = (text: string) => {
        let numericValue;
        console.log('unlock before inputOnChange', unlock);
        // fieldsConstantseeStarsAvg
        if (unlock === 'postingUserThoughtStarsAvg' || unlock === 'fieldsConstantseeStarsAvg') {
            numericValue = text.replace(/[^0-5]/g, '');
        } else {
            numericValue = text.replace(/[^0-9]/g, '');
        }
        console.log('numericValue', numericValue);
        setInputValue(numericValue);
    };

    const isRelevantCheckBoxChecked = checkedBoxArray.some((chbox: any) => {
        if (chbox?.unlock === unlock && chbox?.isChecked === true) {
            return true;
        } else {
            return false;
        }
    });

    // const isRelevantCheckBoxCheckedThoughts = checkedBoxArray.some((chbox) => {
    // // const isRelevantCheckBoxCheckedThoughts = checkedBoxArray.some => {
    //     console.log('chbox',  chbox)
    //     if (chbox?.unlock === unlock && chbox?.isChecked === true) {
    //         console.log('relevant checkbox:', chbox)
    //         return true;
    //     }
    //     // else {
    //     //     return false;
    //     // }
    // })

    return (
        <View style={styles.unlockBox}>
            <View style={styles.unlockRow}>
                <View style={styles.lockRowIconRowCont}>
                    {unlock === 'postingUserThoughtStarsAvg' ||
                    unlock === 'postingUserThoughtStarsTimes' ||
                    unlock === 'fieldsConstantseeStarsAvg' ||
                    unlock === 'fieldsConstantseeStarsTimes' ? (
                        <View>
                            <Image style={styles.icons} source={StarIcon} />
                            <Text style={styles.lockRowText}>
                                {unlock === 'postingUserThoughtStarsAvg' ? 'Avg' : unlock === 'postingUserThoughtStarsTimes' && 'Times'}

                                {unlock === 'fieldsConstantseeStarsAvg' ? 'Avg' : unlock === 'fieldsConstantseeStarsTimes' && 'Times'}
                            </Text>
                        </View>
                    ) : (
                        <Text style={styles.lockRowText}> {display} </Text>
                    )}
                </View>
                import {TextInput} from 'react-native';
                <TextInput
                    maxLength={
                        // average can only be one number (1-5 stars);
                        unlock === 'postingUserThoughtStarsAvg' || unlock === 'fieldsConstantseeStarsAvg' ? 1 : 4
                    }
                    onChangeText={(text) => inputOnChange(text)}
                    value={inputValue}
                    style={styles.unlockOptionInput}
                    keyboardType="numeric" // equivalent of type="text" but numbers only
                />
                {isRelevantCheckBoxChecked && (
                    <TouchableOpacity onPress={() => submitLock(unlock)}>
                        <Image style={styles.icons} source={GreenForwardArrowIcon} />
                    </TouchableOpacity>
                )}
                <TouchableOpacity style={[{ backgroundColor: isRelevantCheckBoxChecked ? 'grey' : '' }, styles.button]} onPress={(event: any) => checkboxChange(unlock)} />
            </View>

            <View style={styles.unlockRow}>
                {/* every time useEffect updates with unlockUpdater has to be .includes() for the postingUserThoughtStarsAvg-0 */}
                <Image style={[styles.icons, { opacity: tablesWithLock.thoughts === unlock || tablesWithLock.thoughts.includes(unlock) ? 1 : 0.5 }]} source={ThoughtsIcon} />
                <Image style={[styles.icons, { opacity: tablesWithLock.moments === unlock || tablesWithLock.moments.includes(unlock) ? 1 : 0.5 }]} source={MomentsIcon} />
                <Image style={[styles.icons, { opacity: tablesWithLock.fields === unlock || tablesWithLock.fields.includes(unlock) ? 1 : 0.5 }]} source={FieldsIcon} />
                <Image
                    style={[styles.icons, { opacity: tablesWithLock.greatfull === unlock || tablesWithLock.greatfull.includes(unlock) ? 1 : 0.5 }]}
                    source={GreatfullIcon}
                />
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
    unlockOptionInput: {
        borderWidth: 2,
        borderColor: grayphite,
        backgroundColor: 'none',
        fontFamily: 'Fuzzy Bubbles',
        color: grayphite,
        width: 10,
    },
});

export default RenderUnlockOptionInput;
