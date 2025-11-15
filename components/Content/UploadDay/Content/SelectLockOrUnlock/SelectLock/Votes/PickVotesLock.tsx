import { useState, useEffect } from 'react';

// <>
import { Platform, Dimensions, Image, ScrollView, TouchableOpacity, View, Text, TextInput, StyleSheet } from 'react-native';

// utils:
import { GreenForwardArrowIcon, BallotIcon, ThoughtsIcon } from '@/constants/Images';
import { grayphite } from '@/constants/Colors';

// consideringOption

interface props {
    lockUpdater: any;
    setLockUpdater: any;
    setLockOptionSelected: any;
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const PickVotesLock: React.FC<props> = ({ lockUpdater, setLockUpdater, setLockOptionSelected }) => {
    const [voteCheckedBoxArray, setVoteCheckedBoxArray] = useState<any>([
        // possibly keep these locks as is and just change the text and map in the JSX:

        { lock: 'consideringOption', display: 'considering option', indexItem: '', isChecked: false },
        { lock: 'join vote', display: 'join vote', indexItem: '', isChecked: false },
        { lock: 'see vote', display: 'see vote', indexItem: '', isChecked: false },

        // { lock: "add option", display: 'add option', indexItem: '', isChecked: false },
        // { lock: "show results during", display: 'show results during', indexItem: '', isChecked: false },
        // { lock: "like option", display: 'like option', indexItem: '', isChecked: false },
        // { lock: "star option", display: 'star option', indexItem: '', isChecked: false },
        // { lock: "show engagement", display: 'show engagement', indexItem: '', isChecked: false },

        // i.e.
        // 🔥 🔥 { lock: "vote", display: 'considering option', indexItem: '', isChecked: false },
    ]);

    return (
        <View>
            <RenderVoteLockRow
                lock={'consideringOption'}
                display={'considering option'}
                checkboxArray={voteCheckedBoxArray}
                setCheckboxArray={setVoteCheckedBoxArray}
                lockUpdater={lockUpdater}
                setLockUpdater={setLockUpdater}
                setLockOptionSelected={setLockOptionSelected}
            />
            <RenderVoteLockRow
                lock={'join vote'}
                display={'join vote'}
                checkboxArray={voteCheckedBoxArray}
                setCheckboxArray={setVoteCheckedBoxArray}
                lockUpdater={lockUpdater}
                setLockUpdater={setLockUpdater}
                setLockOptionSelected={setLockOptionSelected}
            />
            <RenderVoteLockRow
                lock={'see vote'}
                display={'see vote'}
                checkboxArray={voteCheckedBoxArray}
                setCheckboxArray={setVoteCheckedBoxArray}
                lockUpdater={lockUpdater}
                setLockUpdater={setLockUpdater}
                setLockOptionSelected={setLockOptionSelected}
            />
        </View>
    );
};

interface RenderVoteLockRowProps {
    lock: any;
    display: any;
    checkboxArray: any;
    setCheckboxArray: any;
    lockUpdater: any;
    setLockUpdater: any;
    setLockOptionSelected: any;
}

const RenderVoteLockRow: React.FC<RenderVoteLockRowProps> = ({ lock, display, checkboxArray, setCheckboxArray, lockUpdater, setLockUpdater, setLockOptionSelected }) => {
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

    const isRelevantCheckboxChecked = checkboxArray.some((chbox: any) => (chbox?.lock === lock && chbox?.isChecked === true) || lockUpdater.ballots === lock);
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
        clonedLockUpdater.ballots = lock;
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
                {display === 'considering option' ? (
                    <View style={styles.lockRowIconRowCont}>
                        <Text style={styles.lockRowText}> thinkin of.. </Text>
                        <Image style={styles.icons} source={ThoughtsIcon} />
                    </View>
                ) : display === 'join vote' ? (
                    <View style={styles.lockRowIconRowCont}>
                        <Text style={styles.lockRowText}> join </Text>
                        <Image style={styles.icons} source={BallotIcon} />
                    </View>
                ) : display === 'see vote' ? (
                    <View style={styles.lockRowIconRowCont}>
                        <Text style={styles.lockRowText}> see </Text>
                        <Image style={styles.icons} source={BallotIcon} />
                    </View>
                ) : (
                    // 🚨 🚨 maybe params as color: $pinkCake: #e19db3;
                    // $blueCake: #9dcee1;
                    <Text style={styles.lockRowText}> {display} </Text>
                )}
            </View>

            {isRelevantCheckboxChecked && (
                <TouchableOpacity onPress={() => submitLock(lock)}>
                    <Image style={styles.icons} source={GreenForwardArrowIcon} />
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

export default PickVotesLock;
