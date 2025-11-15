import { useState } from 'react';

// <>
import { Platform, Dimensions, Image, ScrollView, TouchableOpacity, View, Text, TextInput, StyleSheet } from 'react-native';
import ModularIndexLockRows from './ModularIndexLockRows';

// utils:
import { ThoughtsIcon, LitFireIcon, StarIcon, EyeIcon, RunningIcon, DecideDoIcon, GreenForwardArrowIcon } from '@/constants/Images';
import { grayphite, hothazel } from '@/constants/Colors';

// utils:

// 🔒 🔒 🔒 locks:

// likes (see or leave likes)

// see likes
// "leave likes"        // can't leave likes on all items.
// "leaveLikes"         FIELDS.lock = "leaveLikes-1"

// allWitsFields
// witsFieldsIndex      FIELDS.lock = "witsFieldsIndex-2"
// 0, 1, 2 (index)      CURR_DAY_FIELDS?.lock = "0"

// fieldsheader-
// fieldsCaption-

// allCheckbox
// checkboxIndex        FIELDS.lock = "checkboxIndex-1"

// decideDo
// decideDoFieldIndex

// allConstantsee
// constantseeIndex
// allStars
// seeStars
// leaveStars

// 🚨 🚨            has to be "leaveStarsConstantsee-do it anywhere" // dont save index save the string.
// leaveStarsConstantsee        FIELDS.lock = 'leaveStarsConstantsee-0'
// seeStarsConstantsee          FIELDS.lock = 'seeStarsConstantsee'

//          {table.commits!} saved the best for last!

interface props {
    day: any;
    setDay: any;
    setLockOptionSelected: any;
    lockUpdater: any;
    setLockUpdater: any;
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const PickFieldsLock: React.FC<props> = ({ day, setDay, setLockOptionSelected, lockUpdater, setLockUpdater }) => {
    const fields = day?.fields || null;
    const decideDo = day?.decidedo || null;
    const [showDropdownMenu, setShowDropdownMenu] = useState(Array.from({ length: fields?.fields?.length }).fill(false));

    const [showAllMenu, setShowAllMenu] = useState(false);

    const [submitLockSingleClick, setSubmitLockSingleClick] = useState(false);
    const [showLikeLocks, setShowLikeLocks] = useState(false);
    const [currentLock, setCurrentLock] = useState('');

    const showLikeLocksClick = () => {
        setShowLikeLocks(!showLikeLocks);
    };

    // chatGPT and I
    const [falseCheckboxFields, setFalseCheckboxFields] = useState<any>([
        // possibly keep these locks as is and just change the text and map in the JSX:

        // so index[0] is the fields themselves. need [0][i] to access. they originally shared scope w/ the static locks: "likes", "see likes"  which are below the .map() This works either way but for safety want all dynamic locks to share [0]
        [
            ...(fields?.fields?.map((field: any, index: any) => ({
                // maybe not needed
                displayfield: field,
                // i.e. CURR_DAY_FIELDS.lock = "0" // hides everything: header, caption, likes, checkbox, constantsee, witsfields/copy-activity
                index: { lock: index, display: 'whole field', isChecked: false },
                // individually leave a like on the activity
                leaveLikes: { lock: `leaveLikes-${index.toString()}`, display: `${field} likes`, isChecked: false },
                // individually copy
                witsFieldsIndex: { lock: `witsFieldsIndex-${index.toString()}`, display: `copy ${field}`, isChecked: false },
                // table.fields.field (the activity itself which is the header)
                fieldsHeader: { lock: `fieldsHeader-${index.toString()}`, display: `hide activity`, isChecked: false },
                // table.fields.text so hide the notes for the activity
                fieldsCaption: { lock: `fieldsCaption-${index.toString()}`, display: `hide ${field} notes`, isChecked: false },
                // table.fields.checkbox hidden.
                checkboxIndex: { lock: `checkboxIndex-${index.toString()}`, display: `hide ${field} checkbox`, isChecked: false },
                // {table.decide_do} to which {t.fields} belongs. hide the judge-gavel-icon which means field/activity corresponds to the decision
                decideDoFieldIndex: { lock: `decideDoFieldIndex-${index.toString()}`, display: `hide ${field} ${decideDo?.decide} link`, isChecked: false },
                // restrict see and leave stars
                constantseeIndex: { lock: `constantseeIndex-${index.toString()}`, display: `${field} perspectives`, isChecked: false },
                // leave stars but for field only unlike "leaveStars"
                leaveStarsConstantsee: { lock: `leaveStarsConstantsee-${index.toString()}`, display: `leave ${field} stars`, isChecked: false },
                // see stars, field only unlike "seeStars"
                seeStarsConstantsee: { lock: `seeStarsConstantsee-${index.toString()}`, display: `see ${field} stars`, isChecked: false },
            })) ?? []),
        ],

        { lock: 'likes', display: 'see & leave likes', indexItem: '', isChecked: false },
        { lock: 'see likes', display: 'see likes', indexItem: '', isChecked: false },
        { lock: 'leave likes', display: 'leave likes', indexItem: '', isChecked: false },

        { lock: 'allWitsFields', display: 'all 👠', indexItem: '', isChecked: false },
        { lock: 'allCheckbox', display: 'all checkboxes', indexItem: '', isChecked: false },

        { lock: 'decideDo', display: 'all decide do', indexItem: '', isChecked: false },

        { lock: 'all Constantsee', display: 'all 👀', indexItem: '', isChecked: false },
        { lock: 'allStars', display: 'all ⭐️', indexItem: '', isChecked: false },
        { lock: 'seeStars', display: 'see ⭐️', indexItem: '', isChecked: false },
        { lock: 'leaveStars', display: 'leave ⭐️', indexItem: '', isChecked: false },
    ]);

    const falseCheckboxFieldsObj = { falseCheckboxFields: falseCheckboxFields, setFalseCheckboxFields: setFalseCheckboxFields };

    const [checkboxArray, setCheckboxArray] = useState<any>([
        // possibly keep these locks as is and just change the text and map in the JSX:

        // so index[0] is the fields themselves. need [0][i] to access. they originally shared scope w/ the static locks: "likes", "see likes"  which are below the .map() This works either way but for safety want all dynamic locks to share [0]
        [
            ...(fields?.fields?.map((field: any, index: number) => ({
                // maybe not needed
                displayfield: field,
                // i.e. CURR_DAY_FIELDS.lock = "0" // hides everything: header, caption, likes, checkbox, constantsee, witsfields/copy-activity
                index: { lock: index, display: 'whole field', isChecked: false },
                // individually leave a like on the activity
                leaveLikes: { lock: `leaveLikes-${index.toString()}`, display: `${field} likes`, isChecked: false },
                // individually copy
                witsFieldsIndex: { lock: `witsFieldsIndex-${index.toString()}`, display: `copy ${field}`, isChecked: false },
                // table.fields.field (the activity itself which is the header)
                fieldsHeader: { lock: `fieldsHeader-${index.toString()}`, display: `hide activity`, isChecked: false },
                // table.fields.text so hide the notes for the activity
                fieldsCaption: { lock: `fieldsCaption-${index.toString()}`, display: `hide ${field} notes`, isChecked: false },
                // table.fields.checkbox hidden.
                checkboxIndex: { lock: `checkboxIndex-${index.toString()}`, display: `hide ${field} checkbox`, isChecked: false },
                // {table.decide_do} to which {t.fields} belongs. hide the judge-gavel-icon which means field/activity corresponds to the decision
                decideDoFieldIndex: { lock: `decideDoFieldIndex-${index.toString()}`, display: `${decideDo?.decide} decision`, isChecked: false },
                // restrict see and leave stars
                constantseeIndex: { lock: `constantseeIndex-${index.toString()}`, display: `${field} perspectives`, isChecked: false },
                // leave stars but for field only unlike "leaveStars"
                leaveStarsConstantsee: { lock: `leaveStarsConstantsee-${index.toString()}`, display: `leave ${field} stars`, isChecked: false },
                // see stars, field only unlike "seeStars"
                seeStarsConstantsee: { lock: `seeStarsConstantsee-${index.toString()}`, display: `see ${field} stars`, isChecked: false },
            })) ?? []),
        ],

        { lock: 'likes', display: 'see & leave likes', indexItem: '', isChecked: false },
        { lock: 'see likes', display: 'see likes', indexItem: '', isChecked: false },
        { lock: 'leave likes', display: 'leave likes', indexItem: '', isChecked: false },

        { lock: 'allWitsFields', display: 'all 👠', indexItem: '', isChecked: false },
        { lock: 'allCheckbox', display: 'all checkboxes', indexItem: '', isChecked: false },

        { lock: 'decideDo', display: 'all decide do', indexItem: '', isChecked: false },

        { lock: 'all Constantsee', display: 'all 👀', indexItem: '', isChecked: false },
        { lock: 'allStars', display: 'all ⭐️', indexItem: '', isChecked: false },
        { lock: 'seeStars', display: 'see ⭐️', indexItem: '', isChecked: false },
        { lock: 'leaveStars', display: 'leave ⭐️', indexItem: '', isChecked: false },
    ]);

    const chBoxArr = checkboxArray;

    const test = () => {};

    const showDropdownByIndex = (index: number) => {
        // soft copy
        const cloned: any = [...showDropdownMenu];
        console.log('index', index);
        console.log('cloned', cloned);

        // if index is already true and clicked again, then don't affect other values just toggle back and show dropdown or not
        if (cloned[index] === true) {
            cloned[index] = !cloned[index];
        } else {
            // but if different index is clicked than truthy, or no truthy then reset to false so only 1 dropdown menu shows at a time
            cloned.fill(false);
            cloned[index] = true;
        }
        // reapply the new cloned array with index correspondent truthy value as updated state.
        setShowDropdownMenu(cloned);
    };

    // itemIndex is the checkboxArray[0][i] which is the fields.map()
    const fieldsCheckboxIndexToggle = async (event: any, itemIndex: number, lock: any, index: any) => {
        event.stopPropagation();
        console.log('fire this function right now');
        // 🔥🚨 🔥🚨 🔥🚨 🔥🚨 🔥🚨 🔥🚨 🔥🚨 FALSE CHECKBOX ARRAY so no need to play with object.s
        const setFalse = async () => {
            await setCheckboxArray(falseCheckboxFields);
        };

        const setTrue = () => {
            const clone = [...checkboxArray];
            const cloneIndex = clone[0][index];
            console.log('clone', clone);
            console.log('lock', lock);
            console.log('cloneIndex', cloneIndex);

            if (lock === 'index') {
                console.log('cloneIndex', cloneIndex);
                // 🔥🚨 🔥🚨 🔥🚨 🔥🚨 🔥🚨 🔥🚨 🔥🚨 have to setCheckboxArray(false);
                console.log('clone[0][index]', clone[0][index]);
                console.log('clone[0][index].index', clone[0][index].index);

                // clone[0][index].index.isChecked = true;
                clone[0][index].index.isChecked = !clone[0][index].index.isChecked;
                setCurrentLock(clone[0][index].index);
                setCheckboxArray(clone);
                console.log('clone after truthiness', clone);
            }
            if (lock === 'leaveLikes') {
                setCurrentLock(clone[0][index].leaveLikes);
                clone[0][index].leaveLikes.isChecked = !clone[0][index].leaveLikes.isChecked;
                setCheckboxArray(clone);
            }
            if (lock === 'witsFieldsIndex') {
                setCurrentLock(clone[0][index].witsFieldsIndex);
                clone[0][index].witsFieldsIndex.isChecked = !clone[0][index].witsFieldsIndex.isChecked;
                setCheckboxArray(clone);
            }
            if (lock === 'fieldsHeader') {
                setCurrentLock(clone[0][index].fieldsHeader);
                clone[0][index].fieldsHeader.isChecked = !clone[0][index].fieldsHeader.isChecked;
                setCheckboxArray(clone);
            }
            if (lock === 'fieldsCaption') {
                setCurrentLock(clone[0][index].fieldsCaption);
                clone[0][index].fieldsCaption.isChecked = !clone[0][index].fieldsCaption.isChecked;
                setCheckboxArray(clone);
            }
            if (lock === 'checkboxIndex') {
                setCurrentLock(clone[0][index].checkboxIndex);
                clone[0][index].checkboxIndex.isChecked = !clone[0][index].checkboxIndex.isChecked;
                setCheckboxArray(clone);
            }
            if (lock === 'decideDoFieldIndex') {
                setCurrentLock(clone[0][index].decideDoFieldIndex);
                clone[0][index].decideDoFieldIndex.isChecked = !clone[0][index].decideDoFieldIndex.isChecked;
                setCheckboxArray(clone);
            }
            if (lock === 'constantseeIndex') {
                setCurrentLock(clone[0][index].constantseeIndex);
                clone[0][index].constantseeIndex.isChecked = !clone[0][index].constantseeIndex.isChecked;
                setCheckboxArray(clone);
            }
            if (lock === 'leaveStarsConstantsee') {
                setCurrentLock(clone[0][index].leaveStarsConstantsee);
                clone[0][index].leaveStarsConstantsee.isChecked = !clone[0][index].leaveStarsConstantsee.isChecked;
                setCheckboxArray(clone);
            }
            if (lock === `seeStarsConstantsee`) {
                setCurrentLock(clone[0][index].seeStarsConstantsee);
                clone[0][index].seeStarsConstantsee.isChecked = !clone[0][index].seeStarsConstantsee.isChecked;
                setCurrentLock(clone[0][index].seeStarsConstantsee.isChecked);
                setCheckboxArray(clone);
            }
        };
        const handleValueChange = async () => {
            await setFalse();
            await setTrue();
        };
        handleValueChange();
    };

    const submitIndexLock = (event: any, lock: string, index: number) => {
        // to force double click to properly update state.
        if (submitLockSingleClick === false) {
            setSubmitLockSingleClick(true);
        } else {
            const lockUpdaterClone = { ...lockUpdater };
            console.log('lock', lock);
            if (lock === 'index') {
                lockUpdaterClone.fields = index.toString();
            } else if (lock === 'leaveLikes') {
                lockUpdaterClone.fields = `leaveLikes-${index.toString()}`;
            } else if (lock === 'witsFieldsIndex') {
                lockUpdaterClone.fields = `witsFieldsIndex-${index.toString()}`;
            } else if (lock === 'fieldsHeader') {
                lockUpdaterClone.fields = `fieldsHeader-${index.toString()}`;
            } else if (lock === 'fieldsCaption') {
                lockUpdaterClone.fields = `fieldsCaption-${index.toString()}`;
            } else if (lock === 'checkboxIndex') {
                lockUpdaterClone.fields = `checkboxIndex-${index.toString()}`;
            } else if (lock === 'decideDoFieldIndex') {
                lockUpdaterClone.fields = `decideDoFieldIndex-${index.toString()}`;
            } else if (lock === 'constantseeIndex') {
                lockUpdaterClone.fields = `constantseeIndex-${index.toString()}`;
            } else if (lock === 'leaveStarsConstantsee') {
                lockUpdaterClone.fields = `leaveStarsConstantsee-${index.toString()}`;
            } else if (lock === 'seeStarsConstantsee') {
                lockUpdaterClone.fields = `seeStarsConstantsee-${index.toString()}`;
            }
            // fieldsHeader-${index}

            setLockUpdater(lockUpdaterClone);
            setSubmitLockSingleClick(false);
            setLockOptionSelected(null);
            console.log('lockUpdater', lockUpdater);
        }
    };

    const showAllMenuClick = () => {
        setShowAllMenu(!showAllMenu);
    };

    // 🔒 🔒 🔒 locks:

    // likes (see or leave likes)

    // see likes
    // "leave likes"        // can't leave likes on all items.
    // "leaveLikes"         FIELDS.lock = "leaveLikes-1"

    // allWitsFields
    // witsFieldsIndex      FIELDS.lock = "witsFieldsIndex-2"
    // 0, 1, 2 (index)      CURR_DAY_FIELDS?.lock = "0"

    // fieldsheader-
    // fieldsCaption-

    // allCheckbox
    // checkboxIndex        FIELDS.lock = "checkboxIndex-1"

    // decideDo
    // decideDoFieldIndex

    // allConstantsee
    // constantseeIndex
    // allStars
    // seeStars
    // leaveStars
    // leaveStarsConstantsee        FIELDS.lock = 'leaveStarsConstantsee-0'
    // seeStarsConstantsee          FIELDS.lock = 'seeStarsConstantsee'

    // const likesLockRelevant =

    return (
        <View>
            {Array.isArray(fields.fields) &&
                fields.fields.map((field: any, index: number) => {
                    const currArrItem = chBoxArr[0][index] || null;
                    const itemIndex = currArrItem?.index || null;
                    const indexBoxChecked = itemIndex?.isChecked;

                    return (
                        <View style={styles.cont}>
                            <View key={`lockRow-${field}-${index}`} style={styles.lockRow}>
                                <View key={`lockRowTextCont-${field}-${index}`} style={styles.lockRowTextCont}>
                                    <Text style={styles.lockRowHeader} key={`lockRowText-${field}-${index}`}>
                                        {' '}
                                        {field}{' '}
                                    </Text>
                                    {/* showLikeClick && */}
                                </View>

                                {/*  🚨 🚨 🚨 &darr; shows the down-arrow dropdown! only one at a time!    */}
                                <TouchableOpacity onPress={() => showDropdownByIndex(index)}>
                                    <Text key={`lockRowText-${field}-${index}`} style={styles.lockRowText}>
                                        {' '}
                                        &darr;{' '}
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            {
                                // index items so user can actually see the content they would be looking off correspondent to activity.
                                showDropdownMenu[index] === true && (
                                    <View style={styles.cont}>
                                        <ModularIndexLockRows
                                            // <IndexWholeField
                                            field={field}
                                            index={index}
                                            //
                                            checkboxArray={checkboxArray}
                                            setCheckboxArray={setCheckboxArray}
                                            // functions
                                            fieldsCheckboxIndexToggle={fieldsCheckboxIndexToggle}
                                            lockUpdater={lockUpdater}
                                            submitIndexLock={submitIndexLock}
                                            objKey={'index'}
                                            currentLock={currentLock}
                                            setCurrentLock={setCurrentLock}
                                            fields={fields}
                                            decideDo={decideDo}
                                            submitLockSingleClick={submitLockSingleClick}
                                        />

                                        {/* 🚨 🚨 🚨 🚨 conditions for constantsee and likes. has to be fields.likeable | fields.constantsee 🚨 🚨 🚨 */}
                                        {fields?.wits_ok && (
                                            <ModularIndexLockRows
                                                fields={fields}
                                                decideDo={decideDo}
                                                lockUpdater={lockUpdater}
                                                currentLock={currentLock}
                                                setCurrentLock={setCurrentLock}
                                                objKey={'witsFieldsIndex'}
                                                field={field}
                                                submitLockSingleClick={submitLockSingleClick}
                                                index={index}
                                                checkboxArray={checkboxArray}
                                                setCheckboxArray={setCheckboxArray}
                                                fieldsCheckboxIndexToggle={fieldsCheckboxIndexToggle}
                                                submitIndexLock={submitIndexLock}
                                            />
                                        )}

                                        {fields?.likeable && (
                                            <ModularIndexLockRows
                                                fields={fields}
                                                decideDo={decideDo}
                                                lockUpdater={lockUpdater}
                                                currentLock={currentLock}
                                                setCurrentLock={setCurrentLock}
                                                objKey={'leaveLikes'}
                                                field={field}
                                                submitLockSingleClick={submitLockSingleClick}
                                                index={index}
                                                checkboxArray={checkboxArray}
                                                setCheckboxArray={setCheckboxArray}
                                                fieldsCheckboxIndexToggle={fieldsCheckboxIndexToggle}
                                                submitIndexLock={submitIndexLock}
                                            />
                                        )}
                                        <ModularIndexLockRows
                                            fields={fields}
                                            decideDo={decideDo}
                                            lockUpdater={lockUpdater}
                                            currentLock={currentLock}
                                            setCurrentLock={setCurrentLock}
                                            objKey={'fieldsHeader'}
                                            field={field}
                                            submitLockSingleClick={submitLockSingleClick}
                                            index={index}
                                            checkboxArray={checkboxArray}
                                            setCheckboxArray={setCheckboxArray}
                                            fieldsCheckboxIndexToggle={fieldsCheckboxIndexToggle}
                                            submitIndexLock={submitIndexLock}
                                        />
                                        <ModularIndexLockRows
                                            fields={fields}
                                            decideDo={decideDo}
                                            lockUpdater={lockUpdater}
                                            currentLock={currentLock}
                                            setCurrentLock={setCurrentLock}
                                            objKey={'fieldsCaption'}
                                            field={field}
                                            submitLockSingleClick={submitLockSingleClick}
                                            index={index}
                                            checkboxArray={checkboxArray}
                                            setCheckboxArray={setCheckboxArray}
                                            fieldsCheckboxIndexToggle={fieldsCheckboxIndexToggle}
                                            submitIndexLock={submitIndexLock}
                                        />

                                        {Array.isArray(fields?.users_checkboxes) && fields?.users_checkboxes[index] && (
                                            <ModularIndexLockRows
                                                fields={fields}
                                                decideDo={decideDo}
                                                lockUpdater={lockUpdater}
                                                currentLock={currentLock}
                                                setCurrentLock={setCurrentLock}
                                                objKey={'checkboxIndex'}
                                                field={field}
                                                submitLockSingleClick={submitLockSingleClick}
                                                index={index}
                                                checkboxArray={checkboxArray}
                                                setCheckboxArray={setCheckboxArray}
                                                fieldsCheckboxIndexToggle={fieldsCheckboxIndexToggle}
                                                submitIndexLock={submitIndexLock}
                                            />
                                        )}

                                        {Array.isArray(fields?.decide_do_fields) && fields?.decide_do_fields[index] && (
                                            <ModularIndexLockRows
                                                fields={fields}
                                                decideDo={decideDo}
                                                lockUpdater={lockUpdater}
                                                currentLock={currentLock}
                                                setCurrentLock={setCurrentLock}
                                                objKey={'decideDoFieldIndex'}
                                                field={field}
                                                submitLockSingleClick={submitLockSingleClick}
                                                index={index}
                                                checkboxArray={checkboxArray}
                                                setCheckboxArray={setCheckboxArray}
                                                fieldsCheckboxIndexToggle={fieldsCheckboxIndexToggle}
                                                submitIndexLock={submitIndexLock}
                                            />
                                        )}

                                        {Array.isArray(fields?.constantsee) && fields?.constantsee[index] && (
                                            <ModularIndexLockRows
                                                fields={fields}
                                                decideDo={decideDo}
                                                lockUpdater={lockUpdater}
                                                currentLock={currentLock}
                                                setCurrentLock={setCurrentLock}
                                                objKey={'constantseeIndex'}
                                                field={field}
                                                submitLockSingleClick={submitLockSingleClick}
                                                index={index}
                                                checkboxArray={checkboxArray}
                                                setCheckboxArray={setCheckboxArray}
                                                fieldsCheckboxIndexToggle={fieldsCheckboxIndexToggle}
                                                submitIndexLock={submitIndexLock}
                                            />
                                        )}
                                        {/* { Array.isArray(fields?.constantstee) && fields?.constantstee[index] && <ModularIndexLockRows fields={fields} decideDo={decideDo} lockUpdater={lockUpdater} currentLock={currentLock} setCurrentLock={setCurrentLock} objKey={"constantseeIndex"} field={field} submitLockSingleClick={submitLockSingleClick} index={index} checkboxArray={checkboxArray} setCheckboxArray={setCheckboxArray} fieldsCheckboxIndexToggle={fieldsCheckboxIndexToggle} submitIndexLock={submitIndexLock} /> } */}
                                        {/* <ModularIndexLockRows fields={fields} decideDo={decideDo} lockUpdater={lockUpdater} currentLock={currentLock} setCurrentLock={setCurrentLock} objKey={"constantseeIndex"} field={field} submitLockSingleClick={submitLockSingleClick} index={index} checkboxArray={checkboxArray} setCheckboxArray={setCheckboxArray} fieldsCheckboxIndexToggle={fieldsCheckboxIndexToggle} submitIndexLock={submitIndexLock} />  */}

                                        {Array.isArray(fields?.constantsee) &&
                                            fields?.constantsee[index] &&
                                            Array.isArray(fields?.constantsee_starrable) &&
                                            fields?.constantsee_starrable[index] && (
                                                <View style={styles.cont}>
                                                    <ModularIndexLockRows
                                                        fields={fields}
                                                        decideDo={decideDo}
                                                        lockUpdater={lockUpdater}
                                                        currentLock={currentLock}
                                                        setCurrentLock={setCurrentLock}
                                                        objKey={'leaveStarsConstantsee'}
                                                        field={field}
                                                        submitLockSingleClick={submitLockSingleClick}
                                                        index={index}
                                                        checkboxArray={checkboxArray}
                                                        setCheckboxArray={setCheckboxArray}
                                                        fieldsCheckboxIndexToggle={fieldsCheckboxIndexToggle}
                                                        submitIndexLock={submitIndexLock}
                                                    />
                                                    <ModularIndexLockRows
                                                        fields={fields}
                                                        decideDo={decideDo}
                                                        lockUpdater={lockUpdater}
                                                        currentLock={currentLock}
                                                        setCurrentLock={setCurrentLock}
                                                        objKey={'seeStarsConstantsee'}
                                                        field={field}
                                                        submitLockSingleClick={submitLockSingleClick}
                                                        index={index}
                                                        checkboxArray={checkboxArray}
                                                        setCheckboxArray={setCheckboxArray}
                                                        fieldsCheckboxIndexToggle={fieldsCheckboxIndexToggle}
                                                        submitIndexLock={submitIndexLock}
                                                    />
                                                </View>
                                            )}
                                    </View>
                                )
                            }
                        </View>
                    );
                })}

            {/*  🚨 🚨 these don't correspond to any of the fields these are the static i.e. "likes", "witsFields" blocks feature. 🚨 🚨  */}
            <View key={`lockRow-all`} style={styles.lockRow}>
                <View key={`lockRowTextCont-all`} style={styles.lockRowTextCont}>
                    <Text style={styles.lockRowHeader} key={`lockRowText-all`}>
                        {' '}
                        All{' '}
                    </Text>
                    {/* showLikeClick && */}
                </View>

                {/*  🚨 🚨 🚨 &darr; shows the down-arrow dropdown! only one at a time!    */}
                <TouchableOpacity onPress={showAllMenuClick}>
                    <Text key={`lockRowText-all`} style={styles.lockRowText}>
                        {' '}
                        &darr;{' '}
                    </Text>
                </TouchableOpacity>
            </View>

            {showAllMenu && (
                <View style={styles.cont}>
                    {fields?.likeable && (
                        <View style={styles.cont}>
                            <FieldsLockOptionRow
                                lockUpdater={lockUpdater}
                                setLockUpdater={setLockUpdater}
                                lock={'likes'}
                                display={'see & leave likes'}
                                checkboxArray={checkboxArray}
                                setCheckboxArray={setCheckboxArray}
                                setLockOptionSelected={setLockOptionSelected}
                            />
                            <FieldsLockOptionRow
                                lockUpdater={lockUpdater}
                                setLockUpdater={setLockUpdater}
                                lock={'see likes'}
                                display={'see likes'}
                                checkboxArray={checkboxArray}
                                setCheckboxArray={setCheckboxArray}
                                setLockOptionSelected={setLockOptionSelected}
                            />
                            <FieldsLockOptionRow
                                lockUpdater={lockUpdater}
                                setLockUpdater={setLockUpdater}
                                lock={'leave likes'}
                                display={'leave likes'}
                                checkboxArray={checkboxArray}
                                setCheckboxArray={setCheckboxArray}
                                setLockOptionSelected={setLockOptionSelected}
                            />
                        </View>
                    )}

                    {fields?.wits_ok && (
                        <FieldsLockOptionRow
                            lockUpdater={lockUpdater}
                            setLockUpdater={setLockUpdater}
                            lock={'allWitsFields'}
                            display={'all 👠'}
                            checkboxArray={checkboxArray}
                            setCheckboxArray={setCheckboxArray}
                            setLockOptionSelected={setLockOptionSelected}
                        />
                    )}

                    {Array.isArray(fields?.users_checkboxes) && fields?.users_checkboxes?.some((boxes: any) => boxes === true) && (
                        <FieldsLockOptionRow
                            lockUpdater={lockUpdater}
                            setLockUpdater={setLockUpdater}
                            lock={'allCheckbox'}
                            display={'all checkboxes'}
                            checkboxArray={checkboxArray}
                            setCheckboxArray={setCheckboxArray}
                            setLockOptionSelected={setLockOptionSelected}
                        />
                    )}

                    {decideDo?.decide && decideDo?.decide !== 'none' && (
                        <FieldsLockOptionRow
                            lockUpdater={lockUpdater}
                            setLockUpdater={setLockUpdater}
                            lock={'decideDo'}
                            display={'all decide do'}
                            checkboxArray={checkboxArray}
                            setCheckboxArray={setCheckboxArray}
                            setLockOptionSelected={setLockOptionSelected}
                        />
                    )}

                    {
                        // fields.constantsee (activity related reminders) for data. if deleted, before DB submission, they're empty strings. check those as well.
                        Array.isArray(fields?.constantsee) && fields?.constantsee.filter((items: any) => items !== '')?.length >= 1 && (
                            // (Array.isArray(fields?.constantsee) && fields?.constantsee?.length >= 1) &&
                            <View style={styles.cont}>
                                <FieldsLockOptionRow
                                    lockUpdater={lockUpdater}
                                    setLockUpdater={setLockUpdater}
                                    lock={'all Constantsee'}
                                    display={'all 👀'}
                                    checkboxArray={checkboxArray}
                                    setCheckboxArray={setCheckboxArray}
                                    setLockOptionSelected={setLockOptionSelected}
                                />
                                <FieldsLockOptionRow
                                    lockUpdater={lockUpdater}
                                    setLockUpdater={setLockUpdater}
                                    lock={'allStars'}
                                    display={'all ⭐️'}
                                    checkboxArray={checkboxArray}
                                    setCheckboxArray={setCheckboxArray}
                                    setLockOptionSelected={setLockOptionSelected}
                                />
                                <FieldsLockOptionRow
                                    lockUpdater={lockUpdater}
                                    setLockUpdater={setLockUpdater}
                                    lock={'seeStars'}
                                    display={'see ⭐️'}
                                    checkboxArray={checkboxArray}
                                    setCheckboxArray={setCheckboxArray}
                                    setLockOptionSelected={setLockOptionSelected}
                                />
                                <FieldsLockOptionRow
                                    lockUpdater={lockUpdater}
                                    setLockUpdater={setLockUpdater}
                                    lock={'leaveStars'}
                                    display={'leave ⭐️'}
                                    checkboxArray={checkboxArray}
                                    setCheckboxArray={setCheckboxArray}
                                    setLockOptionSelected={setLockOptionSelected}
                                />
                            </View>
                        )
                    }
                </View>
            )}
        </View>
    );
};

interface fieldsLockOptionRowProps {
    lock: any;
    display: any;
    checkboxArray: any;
    setCheckboxArray: any;
    lockUpdater: any;
    setLockUpdater: any;
    setLockOptionSelected: any;
}

const FieldsLockOptionRow: React.FC<fieldsLockOptionRowProps> = ({ lock, display, checkboxArray, setCheckboxArray, lockUpdater, setLockUpdater, setLockOptionSelected }) => {
    // lock: the option itself. table is the table to which it corresponds.

    console.log('lock', lock);

    const checkboxChange = (event: any, lock: string) => {
        const cloned = [...checkboxArray];
        // const current = cloned.find(obj => obj.lock === lock);

        console.log('cloned', cloned);
        console.log('lock before loop', lock);
        // const found = Object.values(cloned).find(vals => vals?.lock === lock)
        // console.log('found', found)

        Object.values(cloned)?.find((value, index) => {
            if (value?.lock === lock) {
                console.log(`found lock: ${lock}`);
                console.log('index', index);
                // if (lock === "likes") {
                console.log('cloned[index]', cloned[index]);
                cloned[index].isChecked = !cloned[index]?.isChecked;
                console.log('cloned after reassignment', cloned);
                setCheckboxArray(cloned);
                // }
            }
        });
    };
    //  const isRelevantCheckboxChecked = checkboxArray.some(chbox => chbox?.lock === lock && chbox?.isChecked === true || lockUpdater.greatfull === lock)
    const isRelevantCheckboxChecked = checkboxArray?.some((chbox: any) => (chbox?.lock === lock && chbox?.isChecked === true) || lockUpdater?.fields === lock);
    // <input checked={isRelevantCheckboxChecked} />

    const test = () => {
        console.log('checkboxArray', checkboxArray);
        console.log('lockUpdater', lockUpdater);
    };

    const submitLock = (lock: any) => {
        const clonedLockUpdater = { ...lockUpdater };
        clonedLockUpdater.fields = lock;
        console.log('clonedLockUpdater', clonedLockUpdater);
        setLockUpdater(clonedLockUpdater);
        setLockOptionSelected(null);
        // }
        console.log('lets submit the lock');
    };

    return (
        <View style={styles.lockRow}>
            {/* <View style={styles.lockRow}> */}
            {/* <button style={styles.testBtn}> t </button> */}

            {lock === 'likes' && (
                <View key={`see&LeaveLikes`} style={styles.lockRowIconRowCont}>
                    <Text key={`seeLeaveLikesText-${display}`} style={styles.lockRowText}>
                        {' '}
                        see & leave{' '}
                    </Text>
                    <Image key={`seeLeaveLikesImg-${display}`} style={styles.icons} source={LitFireIcon} />
                </View>
            )}

            {lock === 'see likes' && (
                <View key={`seeLikes`} style={styles.lockRowIconRowCont}>
                    <Text key={`seeLikesText-${display}`} style={styles.lockRowText}>
                        {' '}
                        see{' '}
                    </Text>
                    <Image key={`seeLikesImg-${display}`} style={styles.icons} source={LitFireIcon} />
                </View>
            )}

            {lock === 'leave likes' && (
                <View key={`leaveLikes`} style={styles.lockRowIconRowCont}>
                    <Text key={`leaveLikesText-${display}`} style={styles.lockRowText}>
                        {' '}
                        leave{' '}
                    </Text>
                    <Image key={`leaveLikesImg-${display}`} style={styles.icons} source={LitFireIcon} />
                </View>
            )}

            {lock === 'allWitsFields' && (
                <View key={`witsFields`} style={styles.lockRowIconRowCont}>
                    <Text key={`witsFieldsText-${display}`} style={styles.lockRowText}>
                        {' '}
                        copy{' '}
                    </Text>
                    <Image key={`witsFieldsImg-${display}`} style={styles.icons} source={RunningIcon} />
                </View>
            )}

            {lock === 'allCheckbox' && <TouchableOpacity style={styles.button} />}

            {lock === 'decideDo' && (
                <View key={`decideDoCont`} style={styles.lockRowIconRowCont}>
                    <Text key={`decideDoText-${display}`} style={styles.lockRowText}>
                        {' '}
                        decide{' '}
                    </Text>
                    <Image key={`decideDoImg-${display}`} style={styles.icons} source={DecideDoIcon} />
                </View>
            )}

            {lock === 'all Constantsee' && (
                <View key={`allConstantseeCont`} style={styles.lockRowIconRowCont}>
                    <Text key={`allConstantseeContText-${display}`} style={styles.lockRowText}>
                        {' '}
                        all{' '}
                    </Text>
                    <Image key={`allConstantseeContImg-${display}`} style={styles.icons} source={EyeIcon} />
                </View>
            )}

            {lock === 'allStars' && (
                <View key={`allConstantseeCont`} style={styles.lockRowIconRowCont}>
                    <Text key={`allConstantseeContText-${display}`} style={styles.lockRowText}>
                        {' '}
                        all{' '}
                    </Text>
                    <Image key={`allConstantseeContImg-${display}`} style={styles.icons} source={StarIcon} />
                </View>
            )}

            {lock === 'seeStars' && (
                <View key={`allConstantseeCont`} style={styles.lockRowIconRowCont}>
                    <Text key={`seeStarsText-${display}`} style={styles.lockRowText}>
                        {' '}
                        see{' '}
                    </Text>
                    <Image key={`seeStarsImg-${display}`} style={styles.icons} source={StarIcon} />
                </View>
            )}

            {lock === 'leaveStars' && (
                <View key={`allConstantseeCont`} style={styles.lockRowIconRowCont}>
                    <Text key={`seeStarsText-${display}`} style={styles.lockRowText}>
                        {' '}
                        leave{' '}
                    </Text>
                    <Image key={`seeStarsImg-${display}`} style={styles.icons} source={StarIcon} />
                </View>
            )}

            {isRelevantCheckboxChecked && (
                <TouchableOpacity onPress={() => submitLock(lock)}>
                    <Image style={styles.iconMini} source={GreenForwardArrowIcon} />
                </TouchableOpacity>
            )}

            {/* <p style={styles.lockRowText}> {indexItem ? indexItem : lock} </p> */}

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

export default PickFieldsLock;
