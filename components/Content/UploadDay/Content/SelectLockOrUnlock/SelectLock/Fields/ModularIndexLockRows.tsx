import { useState, useEffect } from 'react';

// <>
import { Platform, Dimensions, Image, ScrollView, TouchableOpacity, View, Text, TextInput, StyleSheet } from 'react-native';
import RenderGreatfullLockRow from '../Greatfull/RenderGreatfullLockRow';
import IndexWholeField from './IndexWholeField';

// utils:
import { GreenForwardArrowIcon, RunningIcon, DecideDoIcon, LitFireIcon, EyeIcon, StarIcon } from '@/constants/Images';
import { specifyStringTruncate } from '@/utility/utilityValues';
import { grayphite } from '@/constants/Colors';

interface props {
    field: any;
    index: any;
    checkboxArray: any;
    setCheckboxArray: any;
    fieldsCheckboxIndexToggle: any;
    submitIndexLock: any;
    objKey: any;
    currentLock: any;
    setCurrentLock: any;
    submitLockSingleClick: any;
    lockUpdater: any;
    fields: any;
    decideDo: any;
    // falseCheckboxFieldsObj: any,
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

// export default function ModularIndexLockRows({
const ModularIndexLockRows: React.FC<props> = ({
    field,
    index,
    checkboxArray,
    setCheckboxArray,
    fieldsCheckboxIndexToggle,
    submitIndexLock,
    objKey,
    currentLock,
    setCurrentLock,
    submitLockSingleClick,
    lockUpdater,
    fields,
    decideDo,
}) => {
    // const { falseCheckboxFields, setFalseCheckboxFields } = falseCheckboxFieldsObj;

    // currArrItem is the same for everyone it's grabbing the: uploadDayFields.map() => in const [fieldsCheckboxArray, setFieldsCheckboxArray] = useState()
    // const currArrItem = fieldsCheckboxArray[0][index] || null;

    const [currArrItem, setCurrArrItem] = useState<any>(checkboxArray[0][index]);
    const [itemIndex, setItemIndex] = useState<any>();

    useEffect(() => {
        console.log('running useEffect');
        const setFalse = () => {
            console.log('running setFalse');
            setItemIndex(null);
        };
        const setTrue = () => {
            if (objKey === 'index') {
                setItemIndex(currArrItem?.index);
            }
            if (objKey === 'leaveLikes') {
                setItemIndex(currArrItem?.leaveLikes);
            }
            if (objKey === 'witsFieldsIndex') {
                setItemIndex(currArrItem?.witsFieldsIndex);
            }
            if (objKey === 'fieldsHeader') {
                setItemIndex(currArrItem?.fieldsHeader);
            }
            if (objKey === 'fieldsCaption') {
                setItemIndex(currArrItem?.fieldsCaption);
            }
            if (objKey === 'checkboxIndex') {
                setItemIndex(currArrItem?.checkboxIndex);
            }
            if (objKey === 'decideDoFieldIndex') {
                setItemIndex(currArrItem?.decideDoFieldIndex);
            }
            if (objKey === 'constantseeIndex') {
                setItemIndex(currArrItem?.constantseeIndex);
            }
            if (objKey === 'leaveStarsConstantsee') {
                setItemIndex(currArrItem?.leaveStarsConstantsee);
            }
            if (objKey === 'seeStarsConstantsee') {
                setItemIndex(currArrItem?.seeStarsConstantsee);
            }
        };
        const handleReset = () => {
            setFalse();
            setTrue();
        };
        handleReset();
    }, [checkboxArray]);

    const indexBoxChecked = currentLock?.lock === itemIndex?.lock && currentLock?.isChecked;

    const test2 = () => {};

    const testBtn = () => {
        console.log('itemIndex', itemIndex);
        console.log('objKey', objKey);
        console.log('currentLock', currentLock);
        // setFieldsCheckboxArray(falseCheckboxFields)
        // setItemIndex(null);
    };

    return (
        <View key={`showDropdownMenulockRow-${field}-${index}`} style={styles.lockRow}>
            <View key={`showDropdownMenulockRowText-${field}-${index}`} style={styles.lockRowTextCont}>
                {
                    itemIndex?.display === 'whole field' ? (
                        <IndexWholeField key={`indexWholeField${index}`} field={field} index={index} uploadDayFields={fields} />
                    ) : itemIndex?.display === `${field} likes` ? (
                        <View key={`lockIconRowLikeCont-${itemIndex?.display}-${index}`} style={styles.lockRowIconRowCont}>
                            <Text key={`lockIconRowLikeText-${itemIndex?.display}-${index}`} style={styles.lockRowText}>
                                {' '}
                                {specifyStringTruncate(itemIndex?.display, 10)}{' '}
                            </Text>
                            <Image key={`lockIconRowLikeImg-${itemIndex?.display}-${index}`} style={styles.icons} source={LitFireIcon} />
                        </View>
                    ) : itemIndex?.display === `copy ${field}` ? (
                        <View key={`lockIconRowWitsFieldsCont-${itemIndex?.display}-${index}`} style={styles.lockRowIconRowCont}>
                            <Image key={`lockIconRowWitsFieldsImg-${itemIndex?.display}-${index}`} style={styles.icons} source={RunningIcon} />
                            <Text key={`lockIconRowWitsFieldsText-${itemIndex?.display}-${index}`} style={styles.lockRowText}>
                                {' '}
                                {specifyStringTruncate(itemIndex?.display, 10)}{' '}
                            </Text>
                        </View>
                    ) : itemIndex?.display === `hide activity` ? (
                        <View key={`lockIconRowHeaderCont-${itemIndex?.display}-${index}`} style={styles.lockRowIconRowCont}>
                            <Text key={`lockIconRowHeaderText-${itemIndex?.display}-${index}`} style={styles.lockRowHeader}>
                                {' '}
                                {specifyStringTruncate(field, 10)}{' '}
                            </Text>
                        </View>
                    ) : itemIndex?.display === `hide ${field} notes` ? (
                        <View key={`lockIconRowTextCont-${itemIndex?.display}-${index}`} style={styles.lockRowIconRowCont}>
                            <Text key={`lockIconRowTextText-${itemIndex?.display}-${index}`} style={styles.lockRowText}>
                                {' '}
                                {specifyStringTruncate(fields?.text[index] || 'notes', 10)}{' '}
                            </Text>
                        </View>
                    ) : itemIndex?.display === `hide ${field} checkbox` ? (
                        <View key={`lockIconRowCheckboxCont-${itemIndex?.display}-${index}`} style={styles.lockRowIconRowCont}>
                            <TouchableOpacity style={styles.button} />

                            <Text key={`showDropdownMenulockRowText-${field}-${index}`} style={styles.lockRowText}>
                                {' '}
                                {specifyStringTruncate(field, 10)}{' '}
                            </Text>
                        </View>
                    ) : itemIndex?.display === `${decideDo?.decide} decision` ? (
                        <View key={`lockIconRowDecideDoFieldsCont-${itemIndex?.display}-${index}`} style={styles.lockRowIconRowCont}>
                            <Text key={`lockIconRowDecideDoFieldsText-${itemIndex?.display}-${index}`} style={styles.lockRowText}>
                                {' '}
                                {specifyStringTruncate(decideDo?.decide, 10)}{' '}
                            </Text>
                            <Image key={`lockIconRowDecideDoFieldsImg-${itemIndex?.display}-${index}`} style={styles.icons} source={DecideDoIcon} />
                        </View>
                    ) : itemIndex?.display === `${field} perspectives` ? (
                        <View key={`lockIconRowConstantseeCont-${itemIndex?.display}-${index}`} style={styles.lockRowIconRowCont}>
                            <Text key={`lockIconRowConstantseeText-${itemIndex?.display}-${index}`} style={styles.lockRowText}>
                                {' '}
                                {specifyStringTruncate(fields?.constantsee[index], 10)}{' '}
                            </Text>
                            <Image key={`lockIconRowConstantseeImg-${itemIndex?.display}-${index}`} style={styles.icons} source={EyeIcon} />
                        </View>
                    ) : itemIndex?.display === `leave ${field} stars` ? (
                        <View key={`lockIconRowLeaveStarsCont-${itemIndex?.display}-${index}`} style={styles.lockRowIconRowCont}>
                            <Text key={`lockIconRowLeaveStarsText-${itemIndex?.display}-${index}`} style={styles.lockRowText}>
                                {' '}
                                leave{' '}
                            </Text>
                            <Image key={`lockIconRowLeaveStarsImg-${itemIndex?.display}-${index}`} style={styles.icons} source={StarIcon} />
                        </View>
                    ) : itemIndex?.display === `see ${field} stars` ? (
                        <View key={`lockIconRowSeeStarsCont-${itemIndex?.display}-${index}`} style={styles.lockRowIconRowCont}>
                            <Text key={`lockIconRowSeeStarsText-${itemIndex?.display}-${index}`} style={styles.lockRowText}>
                                {' '}
                                see{' '}
                            </Text>
                            <Image key={`lockIconRowSeestarsImg-${itemIndex?.display}-${index}`} style={styles.icons} source={StarIcon} />
                        </View>
                    ) : (
                        <Text key={`showDropdownMenulockRowText-${field}-${index}`} style={styles.lockRowText}>
                            {' '}
                            {itemIndex?.display}{' '}
                        </Text>
                    )
                    // <Text> hey </Text>
                }
            </View>

            {
                // indexBoxChecked is during selection. lockUpdater.fields.includes() is after and the index is just for "0"
                (indexBoxChecked || lockUpdater?.fields?.includes(objKey) || (lockUpdater?.fields === index?.toString() && itemIndex?.display === 'whole field')) && (
                    // || lockUpdater?.fields.includes(objKey) &&

                    <TouchableOpacity onPress={(event: any) => submitIndexLock(event, objKey, index)}>
                        <Image key={`greenForwardArrow-${itemIndex?.display}-${index}`} style={styles.iconMini} source={GreenForwardArrowIcon} />
                    </TouchableOpacity>
                )
            }

            <TouchableOpacity
                // checked={(indexBoxChecked || lockUpdater?.fields?.includes(objKey) || lockUpdater?.fields === index?.toString() && itemIndex?.display === "whole field")}
                style={[
                    {
                        backgroundColor:
                            indexBoxChecked || lockUpdater?.fields?.includes(objKey) || (lockUpdater?.fields === index?.toString() && itemIndex?.display === 'whole field'),
                    },
                    styles.button,
                ]}
                onPress={(event: any) => fieldsCheckboxIndexToggle(event, itemIndex, objKey, index)}
            />

            {/* <button onClick={testBtn} key={`${itemIndex?.display}-${index}-button-key-`}> t </button> */}
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

export default ModularIndexLockRows;
