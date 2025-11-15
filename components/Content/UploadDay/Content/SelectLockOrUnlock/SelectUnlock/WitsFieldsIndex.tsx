import { useState, useEffect } from 'react';

// <>
import { Platform, Dimensions, Image, ScrollView, TouchableOpacity, View, Text, TextInput, StyleSheet } from 'react-native';
import RenderUnlockOption from './RenderUnlockOption';
import RenderUnlockOptionInput from './RenderUnlockOptionInput';
import CustomUnlockOption from './CustomUnlockOption';

// utils:
import { GreenForwardArrowIcon, ThoughtsIcon, MomentsIcon, FieldsIcon, GreatfullIcon, CommentIcon, BallotIcon } from '@/constants/Images';
import { grayphite } from '@/constants/Colors';

interface props {
    unlock: any;
    display: any;
    index: any;
    unlockUpdater: any;
    setUnlockUpdater: any;
    setUnlockOptionSelected: any;
    table: any;
    tablesWithLock: any;
    setTablesWithLock: any;
    fields: any;
    witsFieldsCheckboxes: any;
    setWitsFieldsCheckboxes: any;
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const WitsFieldsIndex: React.FC<props> = ({
    unlock,
    display,
    index,
    unlockUpdater,
    setUnlockUpdater,
    setUnlockOptionSelected,
    table,
    tablesWithLock,
    setTablesWithLock,
    fields,
    witsFieldsCheckboxes,
    setWitsFieldsCheckboxes,
}) => {
    useEffect(() => {
        // tablesWithLock.thoughts.includes(unlock)
        // unlockUpdaterObj.thoughts === lock ? tablesWithLock.thoughts = true;
        console.log('firing unlockUpdater!');
        if (unlockUpdater?.thoughts) {
            const clone = { ...tablesWithLock };
            clone.thoughts = unlockUpdater?.thoughts;
            console.log('clone after updating', clone);
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
    }, [unlockUpdater]);

    const checkboxChange = (event: any, unlock: any) => {
        console.log('unlock', unlock);
        const clone = [...witsFieldsCheckboxes];
        console.log('clone', clone);
        // by table to know which array to go by.
        const setFalse = () => {
            clone.forEach((chbox) => {
                if (chbox?.unlock !== unlock) {
                    chbox.isChecked = false;
                }
            });
            console.log('clone after false', clone);
            setWitsFieldsCheckboxes(clone);
        };
        const setTrue = () => {
            clone.forEach((chbox) => {
                console.log('chbox', chbox);
                if (chbox?.unlock === unlock) {
                    console.log('found the chbox', chbox);

                    chbox.isChecked = !chbox?.isChecked;
                }
            });
            console.log('clone after true', clone);
            setWitsFieldsCheckboxes(clone);
        };
        const resetState = async () => {
            await setFalse();
            await setTrue();
        };
        resetState();
    };

    const submitLock = (unlock: any) => {
        const clone = { ...unlockUpdater };
        console.log('clone', clone);
        console.log('table', table);
        const setUnlockUpdaterThoughts = (unlock: string) => {
            clone.thoughts = unlock;
            unlockUpdater(clone);
            console.log('clone after', clone);
        };
        const setUnlockUpdaterMoments = (unlock: string) => {
            clone.moments = unlock;
            unlockUpdater(clone);
            console.log('clone after', clone);
        };
        const setUnlockUpdaterFields = (unlock: string) => {
            clone.fields = unlock;
            unlockUpdater(clone);
            console.log('clone after', clone);
        };
        const setUnlockUpdaterGreatfull = (unlock: string) => {
            clone.greatfull = unlock;
            unlockUpdater(clone);
            console.log('clone after', clone);
        };
        const setUnlockUpdaterComments = (unlock: string) => {
            clone.comments = unlock;
            unlockUpdater(clone);
            console.log('clone after', clone);
        };
        const setUnlockUpdaterVotes = (unlock: string) => {
            clone.votes = unlock;
            unlockUpdater(clone);
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
        // setUnlockOptionSelected(false);
    };

    const isRelevantCheckBoxChecked = witsFieldsCheckboxes.some((chbox: any, chboxIndex: any) => {
        // console.log('chbox',  chbox)
        if (chbox?.unlock === unlock && chbox?.isChecked === true) {
            return true;
        }
        // else {
        //     return false;
        // }
    });

    const test = () => {
        console.log('fields', fields);
        console.log('witsFieldsCheckboxes', witsFieldsCheckboxes);
        console.log('unlock', unlock);
    };

    return (
        <View style={styles.unlockBox}>
            <View style={styles.unlockRow}>
                <View style={styles.unlockRowTextCont}>
                    <Text style={styles.unlockRowHeader}> {display} </Text>
                </View>

                {isRelevantCheckBoxChecked && (
                    <TouchableOpacity onPress={() => submitLock(unlock)}>
                        <Image style={styles.icons} source={GreenForwardArrowIcon} />
                    </TouchableOpacity>
                )}

                <TouchableOpacity
                    style={[{ backgroundColor: isRelevantCheckBoxChecked ? 'grey' : '' }, styles.button]}
                    onPress={(event: any) => checkboxChange(event, unlock)}
                />
            </View>

            <View style={styles.unlockBoxTableTopBar}>
                {/* every time useEffect updates with unlockUpdater has to be .includes() for the postingUserThoughtStarsAvg-0 */}
                <Image
                    style={[{ opacity: tablesWithLock.thoughts === unlock || tablesWithLock.thoughts.includes(unlock) ? 1 : 0.5 }, styles.iconMini]}
                    source={ThoughtsIcon}
                />
                <Image style={[{ opacity: tablesWithLock.moments === unlock || tablesWithLock.moments.includes(unlock) ? 1 : 0.5 }, styles.iconMini]} source={MomentsIcon} />
                <Image style={[{ opacity: tablesWithLock.fields === unlock || tablesWithLock.fields.includes(unlock) ? 1 : 0.5 }, styles.iconMini]} source={FieldsIcon} />
                <Image
                    style={[{ opacity: tablesWithLock.greatfull === unlock || tablesWithLock.greatfull.includes(unlock) ? 1 : 0.5 }, styles.iconMini]}
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
    unlockRowIconRowCont: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },
    unlockRowTextCont: {
        flexDirection: 'row',
    },
    unlockRowHeader: {
        textTransform: 'uppercase',
        fontFamily: 'Fuzzy Bubbles',
        color: grayphite,
        fontSize: 20,
    },
    unlockBoxTableTopBar: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        gap: 10,
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

export default WitsFieldsIndex;
