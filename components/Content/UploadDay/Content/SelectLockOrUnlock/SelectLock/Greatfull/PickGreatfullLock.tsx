import { useState, useEffect } from 'react';

// <>
import { Platform, Dimensions, Image, ScrollView, TouchableOpacity, View, Text, TextInput, StyleSheet } from 'react-native';
import RenderGreatfullLockRow from './RenderGreatfullLockRow';

// utils:
import { GreenForwardArrowIcon, RunningIcon, DecideDoIcon, LitFireIcon, EyeIcon, StarIcon } from '@/constants/Images';
import { grayphite } from '@/constants/Colors';

// "cqc" [x]        concern criticism question but want to render it dynamically as in what the user has as content not just "cqc" with checkbox:

// allThreeWords [x]
// "threeWordsIndex" [x]      as in "threeWordsIndex-1"         <ThreeWords/>

// allGreatfull [x]
// greatfullWordsIndex [x] ---> "greatfullWordsIndex-2"

// allZoom (zoom_in/zoom_out)  (do_diff/do_over)
// doDiff
// doover

interface props {
    day: any;
    setDay: any;
    setLockOptionSelected: any;
    lockUpdater: any;
    setLockUpdater: any;
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const PickGreatfullLock: React.FC<props> = ({ day, setDay, setLockOptionSelected, lockUpdater, setLockUpdater }) => {
    const greatfull = day?.greatfull || null;

    const [checkboxArray, setCheckboxArray] = useState<any>([
        // possibly keep these locks as is and just change the text and map in the JSX:
        { lock: 'allThreeWords', display: 'words of day', indexItem: '', isChecked: false },
        { lock: 'allGreatfull', display: 'all greatfull', indexItem: '', isChecked: false },
        { lock: 'allZoom', display: 'do different, do over', indexItem: '', isChecked: false },

        ...(greatfull?.question || greatfull?.concern || greatfull?.criticism
            ? [{ lock: 'cqc', display: greatfull?.question || greatfull?.concern || greatfull?.criticism, indexItem: '', isChecked: false }]
            : []),

        ...(greatfull?.zoom_in ? [{ lock: 'doDiff', display: greatfull?.zoom_in, indexItem: '', isChecked: false }] : []),

        ...(greatfull?.zoom_out ? [{ lock: 'doOver', display: greatfull?.zoom_out, indexItem: '', isChecked: false }] : []),

        // Map over words and greatfull arrays
        ...(greatfull?.words?.map((word: any, index: number) => ({
            lock: 'threeWordsIndex',
            index: index,
            display: word,
        })) ?? []),

        ...(greatfull?.greatfull?.map((gratitude: any, index: number) => ({
            lock: 'greatfullWordsIndex',
            index: index,
            display: gratitude,
        })) ?? []),
    ]);

    const hey = (event: any, word: any) => {
        // event.stopPropagation();  // Prevents the event from bubbling up
        console.log('hey function clicked', word);
        const cloned = [...checkboxArray];
        event.stopPropagation(); // Prevents the event from bubbling up
        console.log('cloned', cloned);
        const current = cloned.find((obj) => obj.lock === 'threeWordsIndex' && obj.display === word);
        console.log('current', current);

        // restarts array back to false before setting single value to true, thus 1 at a time checkboxing.
        cloned.forEach((obj) => (obj.isChecked = false));

        if (current) {
            current.isChecked = !current.isChecked;
        }

        console.log('checkboxArray', checkboxArray);

        // Uncheck all other boxes
        setCheckboxArray(cloned);
        // setLockOptionSelected(null)
    };

    const checkboxGreatfull = (event: any, word: any) => {
        // event.stopPropagation();  // Prevents the event from bubbling up
        console.log('hey function clicked', word);
        const cloned = [...checkboxArray];
        event.stopPropagation(); // Prevents the event from bubbling up
        console.log('cloned', cloned);
        const current = cloned.find((obj) => obj.lock === 'greatfullWordsIndex' && obj.display === word);
        console.log('current', current);

        // restarts array back to false before setting single value to true, thus 1 at a time checkboxing.
        cloned.forEach((obj) => (obj.isChecked = false));

        if (current) {
            current.isChecked = !current.isChecked;
        }
        // Uncheck all other boxes
        setCheckboxArray(cloned);
        // back out of lock selection as it's already been completed.
    };

    const submitIndexLock = (lock: any, index: any) => {
        // const { uploadThoughtsBin, setUploadThoughtsBin } = uploadThoughtsBinObj;
        console.log('lock', lock);
        // wont be index that's handled in <ThoughtsIndexRenderRow/>
        const clonedLockUpdater = { ...lockUpdater };
        clonedLockUpdater.greatfull = `${lock}-${index}`;
        console.log('clonedLockUpdater', clonedLockUpdater);
        setLockUpdater(clonedLockUpdater);
        setLockOptionSelected(null);
        console.log('lets submit the lock');
    };
    // const wordsOfDayCheckboxChecked = checkboxArray.some(chbox => chbox?.lock === "threeWordsIndex" && chbox?.isChecked === true)

    const test = () => {
        console.log('greatfull', greatfull);
        console.log('lockUpdater', lockUpdater);
    };

    return (
        <View>
            {
                // checking against default ['words', 'of', 'day'] array which shows user during upload content what that data is about
                greatfull?.words && greatfull?.words?.join(',') !== 'words,of,day' && (
                    <RenderGreatfullLockRow
                        lock={'allThreeWords'}
                        display={'words of day'}
                        table={'greatfull'}
                        checkboxArray={checkboxArray}
                        setCheckboxArray={setCheckboxArray}
                        lockUpdater={lockUpdater}
                        setLockUpdater={setLockUpdater}
                        setLockOptionSelected={setLockOptionSelected}
                    />
                )
            }

            {greatfull?.greatfull && greatfull?.greatfull?.join(',') !== 'greatfull,greatfull,greatfull' && (
                <RenderGreatfullLockRow
                    lock={'allGreatfull'}
                    display={'all greatfull'}
                    table={'greatfull'}
                    checkboxArray={checkboxArray}
                    setCheckboxArray={setCheckboxArray}
                    lockUpdater={lockUpdater}
                    setLockUpdater={setLockUpdater}
                    setLockOptionSelected={setLockOptionSelected}
                />
            )}

            {((greatfull?.zoom_in && greatfull?.zoom_in !== 'do different?') || (greatfull?.zoom_out && greatfull?.zoom_out !== 'do over?')) && (
                <RenderGreatfullLockRow
                    lock={'allZoom'}
                    display={'do diff, do over'}
                    table={'greatfull'}
                    checkboxArray={checkboxArray}
                    setCheckboxArray={setCheckboxArray}
                    lockUpdater={lockUpdater}
                    setLockUpdater={setLockUpdater}
                    setLockOptionSelected={setLockOptionSelected}
                />
            )}

            {greatfull?.zoom_in && greatfull?.zoom_in !== 'do different?' && (
                <RenderGreatfullLockRow
                    lock={'doDiff'}
                    display={greatfull?.zoom_in}
                    table={'greatfull'}
                    checkboxArray={checkboxArray}
                    setCheckboxArray={setCheckboxArray}
                    lockUpdater={lockUpdater}
                    setLockUpdater={setLockUpdater}
                    setLockOptionSelected={setLockOptionSelected}
                />
            )}

            {greatfull?.zoom_out && greatfull?.zoom_out !== 'do over?' && (
                <RenderGreatfullLockRow
                    lock={'doOver'}
                    display={greatfull?.zoom_out}
                    table={'greatfull'}
                    checkboxArray={checkboxArray}
                    setCheckboxArray={setCheckboxArray}
                    lockUpdater={lockUpdater}
                    setLockUpdater={setLockUpdater}
                    setLockOptionSelected={setLockOptionSelected}
                />
            )}

            {(greatfull?.question || greatfull?.concern || greatfull?.criticism) && (
                <RenderGreatfullLockRow
                    lock={'cqc'}
                    display={greatfull?.question || greatfull?.concern || greatfull?.criticism}
                    table={'greatfull'}
                    checkboxArray={checkboxArray}
                    setCheckboxArray={setCheckboxArray}
                    lockUpdater={lockUpdater}
                    setLockUpdater={setLockUpdater}
                    setLockOptionSelected={setLockOptionSelected}
                />
            )}

            {greatfull?.words &&
                greatfull?.words?.join(',') !== 'words,of,day' &&
                // map over t.greatfull.words
                greatfull?.words?.map((word: any, index: any) => {
                    const wordsOfDayCheckboxChecked = checkboxArray.some((chbox: any) => {
                        const greatfullLock = lockUpdater?.greatfull || null;
                        console.log('greatfullLock', greatfullLock);
                        const lockText = (greatfullLock && greatfullLock.split('-').slice(0, -1).join('-')) || null;
                        console.log('lockText', lockText);
                        const lockIndex = greatfullLock?.split('-').pop() || null;
                        console.log('lockIndex', lockIndex);
                        console.log('typeof lockIndex', typeof lockIndex);
                        const checkForTrue =
                            (chbox.lock === 'threeWordsIndex' && chbox?.isChecked === true && chbox.display === word) ||
                            greatfullLock === `threeWordsIndex-${index.toString()}`;
                        // const checkForTrue = chbox.lock === "threeWordsIndex" && chbox?.isChecked === true && chbox.display === word || greatfullLock === "threeWordsIndex-0"
                        console.log('check for true', `checkForTrue: ${checkForTrue} word: ${word} index: ${index}`);
                        return checkForTrue;
                        // return (chbox.lock === "threeWordsIndex" && chbox?.isChecked === true && chbox.display === word) || lockText === "threeWordsIndex" && lockIndex === index
                    });

                    return (
                        <View key={`lockRowCont-${word}-${index}`} style={styles.lockRow}>
                            <View key={`lockRowTextCont-${word}-${index}`} style={styles.lockRowTextCont}>
                                <Text key={`lockRowText-${word}-${index}`} style={styles.lockRowText}>
                                    {' '}
                                    {word}{' '}
                                </Text>
                            </View>

                            {wordsOfDayCheckboxChecked && (
                                <TouchableOpacity onPress={(event: any) => submitIndexLock('threeWordsIndex', index)}>
                                    <Image key={`greenForwardArrow-${word}-${index}`} style={styles.icons} source={GreenForwardArrowIcon} />
                                </TouchableOpacity>
                            )}

                            <TouchableOpacity
                                // checked={(indexBoxChecked || lockUpdater?.fields?.includes(objKey) || lockUpdater?.fields === index?.toString() && itemIndex?.display === "whole field")}
                                style={[{ backgroundColor: wordsOfDayCheckboxChecked ? 'grey' : 'transparent' }, styles.button]}
                                onPress={(event: any) => hey(event, word)}
                            />

                            {/* 🚨 🚨 #428 checkboxes fire other checkboxes.. event bubbling? delete if you dare!  */}
                        </View>
                    );
                })}
            {greatfull?.greatfull &&
                greatfull?.greatfull?.join(',') !== 'greatfull,greatfull,greatfull' &&
                greatfull?.greatfull?.map((greatfull: any, index: number) => {
                    // const greatfullWordsCheckboxchecked = checkboxArray.some((chbox) => {
                    //     return chbox.lock === "greatfullWordsIndex" && chbox?.isChecked === true && chbox.display === greatfull
                    // })

                    const greatfullWordsCheckboxchecked = checkboxArray?.some((chbox: any) => {
                        const greatfullLock = lockUpdater?.greatfull || null;
                        console.log('greatfullLock', greatfullLock);
                        const lockText = (greatfullLock && greatfullLock.split('-').slice(0, -1).join('-')) || null;
                        console.log('lockText', lockText);
                        const lockIndex = greatfullLock?.split('-').pop() || null;
                        console.log('lockIndex', lockIndex);
                        console.log('typeof lockIndex', typeof lockIndex);
                        const checkForTrue =
                            (chbox.lock === 'greatfullWordsIndex' && chbox?.isChecked === true && chbox.display === greatfull) ||
                            greatfullLock === `greatfullWordsIndex-${index.toString()}`;
                        // const checkForTrue = chbox.lock === "threeWordsIndex" && chbox?.isChecked === true && chbox.display === greatfull || greatfullLock === "threeWordsIndex-0"
                        console.log('check for true', `checkForTrue: ${checkForTrue} greatfull: ${greatfull} index: ${index}`);
                        return checkForTrue;
                        // return (chbox.lock === "threeWordsIndex" && chbox?.isChecked === true && chbox.display === word) || lockText === "threeWordsIndex" && lockIndex === index
                    });

                    return (
                        <View key={`lockRowCont-${greatfull}-${index}`} style={styles.lockRow}>
                            <View key={`lockRowTextCont-${greatfull}-${index}`} style={styles.lockRowTextCont}>
                                <p key={`lockRowText-${greatfull}-${index}`} style={styles.lockRowText}>
                                    {' '}
                                    {greatfull}{' '}
                                </p>
                            </View>

                            {greatfullWordsCheckboxchecked && (
                                <TouchableOpacity onPress={(event: any) => submitIndexLock('greatfullWordsIndex', index)}>
                                    <Image
                                        key={`greenForwardArrow-${greatfull}-${index}`}
                                        style={styles.icons}
                                        // onClick={() => submitLock(index)}
                                        source={GreenForwardArrowIcon}
                                    />
                                </TouchableOpacity>
                            )}

                            <TouchableOpacity
                                // checked={(indexBoxChecked || lockUpdater?.fields?.includes(objKey) || lockUpdater?.fields === index?.toString() && itemIndex?.display === "whole field")}
                                style={[{ backgroundColor: greatfullWordsCheckboxchecked ? 'grey' : 'transparent' }, styles.button]}
                                onPress={(event: any) => checkboxGreatfull(event, greatfull)}
                            />
                        </View>
                    );
                })}
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

export default PickGreatfullLock;
