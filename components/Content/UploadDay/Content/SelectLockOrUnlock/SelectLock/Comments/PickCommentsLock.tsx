import { useState, useEffect } from 'react';

// <>
import { Platform, Dimensions, Image, ScrollView, TouchableOpacity, View, Text, TextInput, StyleSheet } from 'react-native';

// utils:
import { GreenForwardArrowIcon, CrownIcon } from '@/constants/Images';
import { grayphite } from '@/constants/Colors';

// comments
// see comments
// leave comments
// popular comment crown

interface props {
    lockUpdater: any;
    setLockUpdater: any;
    setLockOptionSelected: any;
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const PickCommentsLock: React.FC<props> = ({ lockUpdater, setLockUpdater, setLockOptionSelected }) => {
    const [checkboxArray, setCheckboxArray] = useState<any>([
        // possibly keep these locks as is and just change the text and map in the JSX:
        { lock: 'comments', display: 'comments', indexItem: '', isChecked: false },
        { lock: 'see comments', display: 'see comments', indexItem: '', isChecked: false },
        { lock: 'leave comments', display: 'leave comments', indexItem: '', isChecked: false },
        { lock: 'popular comment crown', display: 'popular comment crown', indexItem: '', isChecked: false },
    ]);

    return (
        <View>
            <RenderCommentLockRow
                lock={'comments'}
                display={'comments'}
                checkboxArray={checkboxArray}
                setCheckboxArray={setCheckboxArray}
                lockUpdater={lockUpdater}
                setLockUpdater={setLockUpdater}
                setLockOptionSelected={setLockOptionSelected}
            />
            <RenderCommentLockRow
                lock={'see comments'}
                display={'see comments'}
                checkboxArray={checkboxArray}
                setCheckboxArray={setCheckboxArray}
                lockUpdater={lockUpdater}
                setLockUpdater={setLockUpdater}
                setLockOptionSelected={setLockOptionSelected}
            />
            <RenderCommentLockRow
                lock={'leave comments'}
                display={'leave comments'}
                checkboxArray={checkboxArray}
                setCheckboxArray={setCheckboxArray}
                lockUpdater={lockUpdater}
                setLockUpdater={setLockUpdater}
                setLockOptionSelected={setLockOptionSelected}
            />
            <RenderCommentLockRow
                lock={'popular comment crown'}
                display={'popular comment crown'}
                checkboxArray={checkboxArray}
                setCheckboxArray={setCheckboxArray}
                lockUpdater={lockUpdater}
                setLockUpdater={setLockUpdater}
                setLockOptionSelected={setLockOptionSelected}
            />
            <RenderCommentLockRow
                lock={'pinned comment'}
                display={'pinned comment'}
                checkboxArray={checkboxArray}
                setCheckboxArray={setCheckboxArray}
                lockUpdater={lockUpdater}
                setLockUpdater={setLockUpdater}
                setLockOptionSelected={setLockOptionSelected}
            />
        </View>
    );
};

interface CommentLockProps {
    lock: any;
    display: any;
    checkboxArray: any;
    setCheckboxArray: any;
    lockUpdater: any;
    setLockUpdater: any;
    setLockOptionSelected: any;
}

const RenderCommentLockRow: React.FC<CommentLockProps> = ({ lock, display, checkboxArray, setCheckboxArray, lockUpdater, setLockUpdater, setLockOptionSelected }) => {
    // lock: the option itself. table is the table to which it corresponds.

    const checkboxChange = (event: any, lock: string) => {
        event.stopPropagation(); // Prevents the event from bubbling up
        console.log('checkboxChange firing!');
        console.log('event', event);
        console.log('lock', lock);
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
    };

    const isRelevantCheckboxChecked = checkboxArray.some((chbox: any) => (chbox?.lock === lock && chbox?.isChecked === true) || lockUpdater.all === lock);
    // <input checked={isRelevantCheckboxChecked} />

    const test = () => {
        console.log('checkboxArray', checkboxArray);
    };

    const submitLock = (lock: any) => {
        // const { uploadThoughtsBin, setUploadThoughtsBin } = uploadThoughtsBinObj;
        console.log('lock', lock);
        // wont be index that's handled in <ThoughtsIndexRenderRow/>
        const clonedLockUpdater = { ...lockUpdater };
        console.log('clonedLockUpdater', clonedLockUpdater);
        clonedLockUpdater.all = lock;
        console.log('clonedLockUpdater', clonedLockUpdater);
        setLockUpdater(clonedLockUpdater);
        setLockOptionSelected(null);
        console.log('lets submit the lock');
    };

    return (
        <View style={styles.lockRow}>
            {/* <button style={styles.testBtn} onClick={test}> t </button> */}

            {/* isMedia ?  */}
            <View style={styles.lockRowTextCont}>
                {display === 'popular comment crown' ? (
                    <View style={styles.lockRowIconRowCont}>
                        <Text style={styles.lockRowText}> popular </Text>
                        <Image style={styles.icons} source={CrownIcon} />
                    </View>
                ) : (
                    <Text style={styles.lockRowText}> {display} </Text>
                )}
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
                onPress={(event: any) => checkboxChange(event, lock)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    cont: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    lockRowIconRowCont: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    lockColumn: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        gap: 5,
        // padding: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    lockRowHeader: {
        textTransform: 'uppercase',
        fontFamily: 'Fuzzy Bubbles',
        color: grayphite,
        fontSize: 20,
    },
    icons: {
        height: 35,
        width: 35,
    },
    iconMini: {
        height: 20,
        width: 20,
    },
    centerCont: {
        flex: 1, // Allow this to take remaining space
        height: screenHeight * 0.325,
        width: '100%',
        justifyContent: 'center', // Center the content vertically
        alignItems: 'center',
    },
    miniMomentExample: {
        height: 40,
        width: 40,
    },

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

export default PickCommentsLock;
