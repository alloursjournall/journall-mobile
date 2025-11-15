import { useState, useEffect } from 'react';

// <>
import { Platform, Dimensions, Image, ScrollView, TouchableOpacity, View, Text, TextInput, StyleSheet } from 'react-native';

// utils:
import {
    GreenForwardArrowIcon,
    RunningIcon,
    DecideDoIcon,
    LitFireIcon,
    EyeIcon,
    StarIcon,
    FinishFlagsIcon,
    ThoughtsIcon,
    MomentsIcon,
    FieldsIcon,
    GreatfullIcon,
    CommentIcon,
} from '@/constants/Images';

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

const RenderUnlockOption: React.FC<props> = ({
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

    const submitLock = (unlock: any) => {
        const clone = { ...unlockUpdater };
        console.log('clone', clone);
        console.log('table', table);
        const setUnlockUpdaterThoughts = (unlock: string) => {
            clone.thoughts = unlock;
            setUnlockUpdater(clone);
            console.log('clone after', clone);
        };
        const setUnlockUpdaterMoments = (unlock: string) => {
            clone.moments = unlock;
            setUnlockUpdater(clone);
            console.log('clone after', clone);
        };
        const setUnlockUpdaterFields = (unlock: string) => {
            clone.fields = unlock;
            setUnlockUpdater(clone);
            console.log('clone after', clone);
        };
        const setUnlockUpdaterGreatfull = (unlock: string) => {
            clone.greatfull = unlock;
            setUnlockUpdater(clone);
            console.log('clone after', clone);
        };
        const setUnlockUpdaterComments = (unlock: string) => {
            clone.comments = unlock;
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

    const checkboxChange = (event: any, unlock: any) => {
        const clone = [...checkedBoxArray];
        // by table to know which array to go by.
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
                if (chbox?.unlock === unlock) {
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

    // if (someIndex !== index) {
    //     console.log("isolate to clicked type!");
    //     return;
    // }

    // if (lock === "indexMoments") {
    //     if (chbox?.indexMoments?.isChecked === true) {
    //         return true;
    //     }
    // }
    // if (lock === "indexBlobs") {
    //     if (chbox?.indexBlobs?.isChecked === true) {
    //         return true;
    //     }
    // }
    // if (lock === "indexHeaders") {
    //     if (chbox?.indexHeaders?.isChecked === true) {
    //         return true;
    //     }
    // }
    // if (lock === "indexCaptions") {
    //     if (chbox?.indexCaptions?.isChecked === true) {
    //         return true;
    //     }
    // }
    // if (lockUpdater.moments === `${lock}-${index.toString()}`) {
    // // if (lockUpdater.moment === `${lock}-${index.toString()}` || lockUpdater.moment === `${index.toString()}`) {
    //     return true;
    // }
    const isRelevantCheckBoxChecked = checkedBoxArray.some((chbox: any) => {
        // console.log('chbox',  chbox)
        if (chbox?.unlock === unlock && chbox?.isChecked === true) {
            return true;
        }
        // else {
        //     return false;
        // }
    });

    return (
        <View style={styles.unlockBox}>
            <View style={styles.unlockRow}>
                {/* <img style={styles.lockRowIcon} source={eyes} /> */}

                <View style={styles.lockRowTextCont}>
                    {
                        // display.includes("commentIcon") but just for explicity.
                        display === 'commentIcon-thoughts' || display === 'commentIcon-moments' || display === 'commentIcon-fields' || display === 'commentIcon-greatfull' ? (
                            <CommentIconUnlockDisplay display={display} />
                        ) : display === 'star vote' ? (
                            <View style={styles.lockRowIconRowCont}>
                                <Image style={styles.icons} source={StarIcon} />
                                <Text style={styles.lockRowText}> vote </Text>
                            </View>
                        ) : display === 'like vote' ? (
                            <View style={styles.lockRowIconRowCont}>
                                <Image style={styles.icons} source={LitFireIcon} />
                                <Text style={styles.lockRowText}> vote </Text>
                            </View>
                        ) : display === 'finish vote' ? (
                            <View style={styles.lockRowIconRowCont}>
                                <Image style={styles.icons} source={FinishFlagsIcon} />
                                <Text style={styles.lockRowText}> finish vote </Text>
                            </View>
                        ) : (
                            <Text
                                style={[
                                    {
                                        color: display === 'finish vote' ? '#9dcee1' : display === 'submit vote' ? '#e19db3' : display === 'invitation' ? '#9dcee1' : '',
                                    },
                                    styles.lockRowText,
                                ]}
                            >
                                {' '}
                                {display}{' '}
                            </Text>
                        )
                    }
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

interface UnlockDisplayProps {
    display: any;
}

const CommentIconUnlockDisplay: React.FC<UnlockDisplayProps> = ({ display }) => {
    return (
        // row | column ?
        <View style={styles.unlockRow}>
            <Image style={styles.icons} source={CommentIcon} />

            <Image
                style={styles.icons}
                source={
                    display === 'commentIcon-thoughts'
                        ? ThoughtsIcon
                        : display === 'commentIcon-moments'
                        ? MomentsIcon
                        : display === 'commentIcon-fields'
                        ? FieldsIcon
                        : display === 'commentIcon-greatfull'
                        ? GreatfullIcon
                        : ''
                }
            />
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

export default RenderUnlockOption;
