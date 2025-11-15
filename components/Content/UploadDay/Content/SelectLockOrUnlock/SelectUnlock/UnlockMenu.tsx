import { useState, useEffect } from 'react';

// <>
import { Platform, Dimensions, Image, ScrollView, TouchableOpacity, View, Text, TextInput, StyleSheet } from 'react-native';
import RenderUnlockOption from './RenderUnlockOption';
import RenderUnlockOptionInput from './RenderUnlockOptionInput';
import CustomUnlockOption from './CustomUnlockOption';
import WitsFieldsIndex from './WitsFieldsIndex';

// utils:
import { GreenForwardArrowIcon, ThoughtsIcon, MomentsIcon, FieldsIcon, GreatfullIcon, CommentIcon, BallotIcon } from '@/constants/Images';
import { grayphite } from '@/constants/Colors';

//      THOUGHTS:
// see all thoughts
// postingUserThoughtStarsAvg
// postingUserThoughtStarsTimes
// commentIcon-thoughts

//      MOMENTS:
// see all moments
// commentIcon-moments

//      FIELDS:
// see all fields
// witsFields-${index}      // have to map and make it cool!
// fieldsConstantseeStarsAvg-2
// fieldsConstantseeStarsTimes-2
// commentIcon-fields

//      GREATFULL
// see zoom
// commentIcon-greatfull

//      COMMENTS:
// "leave comment"
// "commentIcons-thoughts" (&friends;)
// 🚨 🚨 customUnlock:

//  VOTES:
// finish vote
// submit vote
// like vote
// star vote
// invitation
// winning vote

// EVENT VOTES:

interface props {
    thoughts: any;
    fields: any;
    setDay: any;
    unlockUpdater: any;
    setUnlockUpdater: any;
    setUnlockOptionSelected: any;
    table: any;
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const UnlockMenu: React.FC<props> = ({
    thoughts,
    fields,
    setDay,
    unlockUpdater,
    setUnlockUpdater,
    setUnlockOptionSelected,
    table,
    // lockUpdaterObj is the ../ object that stores the lock from these actions.
}) => {
    const [showThoughtRelatedUnlocks, setShowThoughtRelatedUnlocks] = useState(false);
    const [showMomentRelatedUnlocks, setShowMomentRelatedUnlocks] = useState(false);
    const [showFieldRelatedUnlocks, setShowFieldRelatedUnlocks] = useState(false);
    const [showGreatfullRelatedUnlocks, setShowGreatfullRelatedUnlocks] = useState(false);
    const [showCommentRelatedUnlocks, setShowCommentRelatedUnlocks] = useState(false);
    const [showVoteRelatedUnlocks, setShowVoteRelatedUnlocks] = useState(false);

    // for custom unlock. limit 1.
    const [customUnlockInput, setCustomUnlockInput] = useState('');

    useEffect(() => {
        setShowThoughtRelatedUnlocks(false);
        setShowMomentRelatedUnlocks(false);
        setShowFieldRelatedUnlocks(false);
        setShowGreatfullRelatedUnlocks(false);
        setShowCommentRelatedUnlocks(false);
        setShowVoteRelatedUnlocks(false);
    }, [table]);

    // remember that vote related unlocks can only unlock for votes!

    const filteredThoughtsBin = thoughts?.filter((thoughts: any) => (thoughts.text && thoughts.is_voice === false) || thoughts.is_voice === true);

    const [tablesWithLock, setTablesWithLock] = useState<any>({
        all: '',
        thoughts: '',
        moments: '',
        fields: '',
        greatfull: '',
    });
    const tablesWithLockObj = { tablesWithLock: tablesWithLock, setTablesWithLock: setTablesWithLock };

    const [checkedBoxArray, setCheckedBoxArray] = useState<any>([
        // const [cCheckedBoxArray, checkedBoxArray] = useState<any>([
        { unlock: 'see all thoughts', display: 'see all thoughts', partOfPost: 'thoughts', isChecked: false },
        { unlock: 'postingUserThoughtStarsAvg', display: 'postingUserThoughtStarsAvg', partOfPost: 'thoughts', isChecked: false },
        { unlock: 'postingUserThoughtStarsTimes', display: 'postingUserThoughtStarsTimes', partOfPost: 'thoughts', isChecked: false },

        { unlock: 'see all moments', display: 'see all moments', partOfPost: 'moments', isChecked: false },

        { unlock: 'see all fields', display: 'see all fields', partOfPost: 'fields', isChecked: false },
        { unlock: 'fieldsConstantseeStarsAvg', display: 'fieldsConstantseeStarsAvg', partOfPost: 'fields', isChecked: false },
        { unlock: 'fieldsConstantseeStarsTimes', display: 'fieldsConstantseeStarsTimes', partOfPost: 'fields', isChecked: false },
        // fieldsConstantseeStarsAvg-2
        // fieldsConstantseeStarsTimes-2

        { unlock: 'custom-', display: 'custom-', partOfPost: 'all', isChecked: false },
        { unlock: 'commentIcon-thoughts', display: 'commentIcon-thoughts', partOfPost: 'comments', isChecked: false },
        { unlock: 'commentIcon-moments', display: 'commentIcon-moments', partOfPost: 'comments', isChecked: false },
        { unlock: 'commentIcon-fields', display: 'commentIcon-fields', partOfPost: 'comments', isChecked: false },
        { unlock: 'commentIcon-greatfull', display: 'commentIcon-greatfull', partOfPost: 'comments', isChecked: false },
        { unlock: 'leave comment', display: 'leave comment', partOfPost: 'comments', isChecked: false },

        { unlock: 'finish vote', display: 'finish vote', partOfPost: 'votes', isChecked: false },
        { unlock: 'submit vote', display: 'submit vote', partOfPost: 'votes', isChecked: false },
        { unlock: 'winning vote', display: 'winning vote', partOfPost: 'votes', isChecked: false },
        { unlock: 'star vote', display: 'star vote', partOfPost: 'votes', isChecked: false },
        { unlock: 'like vote', display: 'like vote', partOfPost: 'votes', isChecked: false },
        { unlock: 'invitation', display: 'invitation', partOfPost: 'votes', isChecked: false },
    ]);

    const [witsFieldsCheckboxes, setWitsFieldsCheckboxes] = useState<any>([
        ...fields?.fields.map((field: any, index: any) => ({
            // Conditionally include index fields only if moment.blob exists (ty chatGPT
            unlock: `witsFields-${index}`,
            display: field,
            partOfPost: 'fields',
            isChecked: false,
        })),
    ]);

    const witsFieldsCheckboxesObj = { witsFieldsCheckboxes: witsFieldsCheckboxes, setWitsFieldsCheckboxes: setWitsFieldsCheckboxes };

    const test = () => {
        console.log('witsFieldsCheckboxes', witsFieldsCheckboxes);

        // console.log('tablesWithLock', tablesWithLock)
        // console.log('table', table)
    };

    const showThoughtRelatedUnlocksClick = () => {
        setShowThoughtRelatedUnlocks(!showThoughtRelatedUnlocks);
    };
    const showMomentRelatedUnlocksClick = () => {
        setShowMomentRelatedUnlocks(!showMomentRelatedUnlocks);
    };
    const showFieldRelatedUnlocksClick = () => {
        setShowFieldRelatedUnlocks(!showFieldRelatedUnlocks);
    };
    const showGreatfullRelatedUnlocksClick = () => {
        setShowGreatfullRelatedUnlocks(!showGreatfullRelatedUnlocks);
    };
    const showCommentRelatedUnlocksClick = () => {
        setShowCommentRelatedUnlocks(!showCommentRelatedUnlocks);
    };
    const showVoteRelatedUnlocksClick = () => {
        setShowVoteRelatedUnlocks(!showVoteRelatedUnlocks);
    };

    return (
        <View style={styles.cont}>
            {/*  🚨 🚨 🚨 &darr; shows the down-arrow dropdown! only one at a time!    */}

            {!showMomentRelatedUnlocks && !showFieldRelatedUnlocks && !showGreatfullRelatedUnlocks && !showCommentRelatedUnlocks && !showVoteRelatedUnlocks && (
                <View style={styles.lockRowDropdown}>
                    <Text style={styles.lockRowHeader}> actions from Thoughts </Text>
                    <TouchableOpacity onPress={() => showThoughtRelatedUnlocksClick()}>
                        <Text style={styles.lockRowText}> &darr; </Text>
                    </TouchableOpacity>
                    <Image style={styles.icons} source={ThoughtsIcon} />
                </View>
            )}

            {!showThoughtRelatedUnlocks && !showFieldRelatedUnlocks && !showGreatfullRelatedUnlocks && !showCommentRelatedUnlocks && !showVoteRelatedUnlocks && (
                <View style={styles.lockRowDropdown}>
                    <Text style={styles.lockRowHeader}> actions from Moments </Text>

                    <TouchableOpacity onPress={() => showMomentRelatedUnlocksClick()}>
                        <Text style={styles.lockRowText}> &darr; </Text>
                    </TouchableOpacity>

                    <Image style={styles.icons} source={MomentsIcon} />
                </View>
            )}

            {!showMomentRelatedUnlocks && !showThoughtRelatedUnlocks && !showGreatfullRelatedUnlocks && !showCommentRelatedUnlocks && !showVoteRelatedUnlocks && (
                <View style={styles.lockRowDropdown}>
                    <Text style={styles.lockRowHeader}> actions from Fields </Text>
                    <TouchableOpacity onPress={() => showFieldRelatedUnlocksClick()}>
                        <Text style={styles.lockRowText}> &darr; </Text>
                    </TouchableOpacity>

                    <Image style={styles.icons} source={FieldsIcon} />
                </View>
            )}

            {!showMomentRelatedUnlocks && !showThoughtRelatedUnlocks && !showFieldRelatedUnlocks && !showCommentRelatedUnlocks && !showVoteRelatedUnlocks && (
                <View style={styles.lockRowDropdown}>
                    <Text style={styles.lockRowHeader}> actions from Greatfull </Text>

                    <TouchableOpacity onPress={() => showGreatfullRelatedUnlocksClick()}>
                        <Text style={styles.lockRowText}> &darr; </Text>
                    </TouchableOpacity>

                    <Image style={styles.icons} source={GreatfullIcon} />
                </View>
            )}

            {!showMomentRelatedUnlocks &&
                !showThoughtRelatedUnlocks &&
                !showFieldRelatedUnlocks &&
                !showGreatfullRelatedUnlocks &&
                !showCommentRelatedUnlocks &&
                !showVoteRelatedUnlocks && (
                    <View style={styles.lockRowDropdown}>
                        <Text style={styles.lockRowHeader}> actions from comments </Text>
                        <TouchableOpacity onPress={() => showGreatfullRelatedUnlocksClick()}>
                            <Text style={styles.lockRowText}> &darr; </Text>
                        </TouchableOpacity>

                        <Image style={styles.icons} source={CommentIcon} />
                    </View>
                )}

            {!showMomentRelatedUnlocks && !showThoughtRelatedUnlocks && !showFieldRelatedUnlocks && !showGreatfullRelatedUnlocks && !showCommentRelatedUnlocks && (
                <View style={styles.lockRowDropdown}>
                    <Text style={styles.lockRowHeader}> votes!!!!! </Text>
                    <TouchableOpacity onPress={() => showVoteRelatedUnlocksClick()}>
                        <Text style={styles.lockRowText}> &darr; </Text>
                    </TouchableOpacity>
                    <Image style={styles.icons} source={BallotIcon} />
                </View>
            )}

            {/*  🚨 🚨 🚨  ACTIVITIES FROM VOTES! has to loop and show which ballots are created!!! 🚨 🚨 🚨  */}

            {showThoughtRelatedUnlocks && (
                <View style={styles.cont}>
                    <RenderUnlockOption
                        unlock={'see all thoughts'}
                        display={'see all thoughts'}
                        unlockUpdater={unlockUpdater}
                        setUnlockUpdater={setUnlockUpdater}
                        checkedBoxArray={checkedBoxArray}
                        setCheckedBoxArray={setCheckedBoxArray}
                        setUnlockOptionSelected={setUnlockOptionSelected}
                        table={table}
                        tablesWithLock={tablesWithLock}
                        setTablesWithLock={setTablesWithLock}
                        // partOfPost={partOfPost}
                    />

                    <RenderUnlockOptionInput
                        unlock={'postingUserThoughtStarsAvg'}
                        display={'postingUserThoughtStarsAvg'}
                        unlockUpdater={unlockUpdater}
                        setUnlockUpdater={setUnlockUpdater}
                        checkedBoxArray={checkedBoxArray}
                        setCheckedBoxArray={setCheckedBoxArray}
                        setUnlockOptionSelected={setUnlockOptionSelected}
                        table={table}
                        tablesWithLock={tablesWithLock}
                        setTablesWithLock={setTablesWithLock}
                    />

                    <RenderUnlockOptionInput
                        unlock={'postingUserThoughtStarsTimes'}
                        display={'postingUserThoughtStarsTimes'}
                        unlockUpdater={unlockUpdater}
                        setUnlockUpdater={setUnlockUpdater}
                        checkedBoxArray={checkedBoxArray}
                        setCheckedBoxArray={setCheckedBoxArray}
                        setUnlockOptionSelected={setUnlockOptionSelected}
                        table={table}
                        tablesWithLock={tablesWithLock}
                        setTablesWithLock={setTablesWithLock}
                    />

                    <AllCommentIcons
                        table={table}
                        unlockUpdater={unlockUpdater}
                        setUnlockUpdater={setUnlockUpdater}
                        checkedBoxArray={checkedBoxArray}
                        setCheckedBoxArray={setCheckedBoxArray}
                        tablesWithLock={tablesWithLock}
                        setTablesWithLock={setTablesWithLock}
                        setUnlockOptionSelected={setUnlockOptionSelected}
                    />

                    <CustomUnlockOption
                        unlock={'custom-'}
                        unlockUpdater={unlockUpdater}
                        setUnlockUpdater={setUnlockUpdater}
                        checkedBoxArray={checkedBoxArray}
                        setCheckedBoxArray={setCheckedBoxArray}
                        setUnlockOptionSelected={setUnlockOptionSelected}
                        table={table}
                        tablesWithLock={tablesWithLock}
                        setTablesWithLock={setTablesWithLock}
                        customUnlockInput={customUnlockInput}
                        setCustomUnlockInput={setCustomUnlockInput}
                    />
                </View>
            )}

            {showMomentRelatedUnlocks && (
                <View style={styles.cont}>
                    <RenderUnlockOption
                        unlock={'see all moments'}
                        display={'see all moments'}
                        unlockUpdater={unlockUpdater}
                        setUnlockUpdater={setUnlockUpdater}
                        checkedBoxArray={checkedBoxArray}
                        setCheckedBoxArray={setCheckedBoxArray}
                        setUnlockOptionSelected={setUnlockOptionSelected}
                        table={table}
                        tablesWithLock={tablesWithLock}
                        setTablesWithLock={setTablesWithLock}
                    />

                    <AllCommentIcons
                        table={table}
                        unlockUpdater={unlockUpdater}
                        setUnlockUpdater={setUnlockUpdater}
                        checkedBoxArray={checkedBoxArray}
                        setCheckedBoxArray={setCheckedBoxArray}
                        tablesWithLock={tablesWithLock}
                        setTablesWithLock={setTablesWithLock}
                        setUnlockOptionSelected={setUnlockOptionSelected}
                    />

                    <CustomUnlockOption
                        unlock={'custom-'}
                        unlockUpdater={unlockUpdater}
                        setUnlockUpdater={setUnlockUpdater}
                        checkedBoxArray={checkedBoxArray}
                        setCheckedBoxArray={setCheckedBoxArray}
                        setUnlockOptionSelected={setUnlockOptionSelected}
                        table={table}
                        tablesWithLock={tablesWithLock}
                        setTablesWithLock={setTablesWithLock}
                        customUnlockInput={customUnlockInput}
                        setCustomUnlockInput={setCustomUnlockInput}
                    />
                </View>
            )}

            {showFieldRelatedUnlocks && (
                <View style={styles.cont}>
                    {/* // fieldsConstantseeStarsAvg-2
                // fieldsConstantseeStarsTimes-2 */}

                    <RenderUnlockOption
                        unlock={'see all fields'}
                        display={'see all fields'}
                        unlockUpdater={unlockUpdater}
                        setUnlockUpdater={setUnlockUpdater}
                        checkedBoxArray={checkedBoxArray}
                        setCheckedBoxArray={setCheckedBoxArray}
                        setUnlockOptionSelected={setUnlockOptionSelected}
                        table={table}
                        tablesWithLock={tablesWithLock}
                        setTablesWithLock={setTablesWithLock}
                    />

                    <RenderUnlockOptionInput
                        unlock={'fieldsConstantseeStarsAvg'}
                        display={'fieldsConstantseeStarsAvg'}
                        unlockUpdater={unlockUpdater}
                        setUnlockUpdater={setUnlockUpdater}
                        checkedBoxArray={checkedBoxArray}
                        setCheckedBoxArray={setCheckedBoxArray}
                        setUnlockOptionSelected={setUnlockOptionSelected}
                        table={table}
                        tablesWithLock={tablesWithLock}
                        setTablesWithLock={setTablesWithLock}
                    />

                    <RenderUnlockOptionInput
                        unlock={'fieldsConstantseeStarsTimes'}
                        display={'fieldsConstantseeStarsTimes'}
                        unlockUpdater={unlockUpdater}
                        setUnlockUpdater={setUnlockUpdater}
                        checkedBoxArray={checkedBoxArray}
                        setCheckedBoxArray={setCheckedBoxArray}
                        setUnlockOptionSelected={setUnlockOptionSelected}
                        table={table}
                        tablesWithLock={tablesWithLock}
                        setTablesWithLock={setTablesWithLock}
                    />

                    {Array.isArray(fields?.fields) &&
                        fields?.fields?.length > 1 &&
                        fields?.wits_ok &&
                        fields?.fields?.map((field: any, index: number) => {
                            return (
                                <WitsFieldsIndex
                                    unlock={`witsFields-${index}`}
                                    display={field}
                                    index={index}
                                    unlockUpdater={unlockUpdater}
                                    setUnlockUpdater={setUnlockUpdater}
                                    setUnlockOptionSelected={setUnlockOptionSelected}
                                    table={table}
                                    tablesWithLock={tablesWithLock}
                                    setTablesWithLock={setTablesWithLock}
                                    fields={fields}
                                    witsFieldsCheckboxes={witsFieldsCheckboxes}
                                    setWitsFieldsCheckboxes={setWitsFieldsCheckboxes}
                                />
                            );
                        })}

                    <AllCommentIcons
                        table={table}
                        unlockUpdater={unlockUpdater}
                        setUnlockUpdater={setUnlockUpdater}
                        checkedBoxArray={checkedBoxArray}
                        setCheckedBoxArray={setCheckedBoxArray}
                        tablesWithLock={tablesWithLock}
                        setTablesWithLock={setTablesWithLock}
                        setUnlockOptionSelected={setUnlockOptionSelected}
                    />

                    <CustomUnlockOption
                        unlock={'custom-'}
                        unlockUpdater={unlockUpdater}
                        setUnlockUpdater={setUnlockUpdater}
                        checkedBoxArray={checkedBoxArray}
                        setCheckedBoxArray={setCheckedBoxArray}
                        setUnlockOptionSelected={setUnlockOptionSelected}
                        table={table}
                        tablesWithLock={tablesWithLock}
                        setTablesWithLock={setTablesWithLock}
                        customUnlockInput={customUnlockInput}
                        setCustomUnlockInput={setCustomUnlockInput}
                    />
                </View>
            )}

            {showGreatfullRelatedUnlocks && (
                <View style={styles.cont}>
                    <AllCommentIcons
                        table={table}
                        unlockUpdater={unlockUpdater}
                        setUnlockUpdater={setUnlockUpdater}
                        checkedBoxArray={checkedBoxArray}
                        setCheckedBoxArray={setCheckedBoxArray}
                        tablesWithLock={tablesWithLock}
                        setTablesWithLock={setTablesWithLock}
                        setUnlockOptionSelected={setUnlockOptionSelected}
                    />

                    <CustomUnlockOption
                        unlock={'custom-'}
                        unlockUpdater={unlockUpdater}
                        setUnlockUpdater={setUnlockUpdater}
                        checkedBoxArray={checkedBoxArray}
                        setCheckedBoxArray={setCheckedBoxArray}
                        setUnlockOptionSelected={setUnlockOptionSelected}
                        table={table}
                        tablesWithLock={tablesWithLock}
                        setTablesWithLock={setTablesWithLock}
                        customUnlockInput={customUnlockInput}
                        setCustomUnlockInput={setCustomUnlockInput}
                    />
                </View>
            )}

            {showCommentRelatedUnlocks && (
                <View style={styles.cont}>
                    <RenderUnlockOption
                        unlock={'leave comment'}
                        display={'leave comment'}
                        unlockUpdater={unlockUpdater}
                        setUnlockUpdater={setUnlockUpdater}
                        checkedBoxArray={checkedBoxArray}
                        setCheckedBoxArray={setCheckedBoxArray}
                        setUnlockOptionSelected={setUnlockOptionSelected}
                        table={table}
                        tablesWithLock={tablesWithLock}
                        setTablesWithLock={setTablesWithLock}
                    />

                    <CustomUnlockOption
                        unlock={'custom-'}
                        unlockUpdater={unlockUpdater}
                        setUnlockUpdater={setUnlockUpdater}
                        checkedBoxArray={checkedBoxArray}
                        setCheckedBoxArray={setCheckedBoxArray}
                        setUnlockOptionSelected={setUnlockOptionSelected}
                        table={table}
                        tablesWithLock={tablesWithLock}
                        setTablesWithLock={setTablesWithLock}
                        customUnlockInput={customUnlockInput}
                        setCustomUnlockInput={setCustomUnlockInput}
                    />

                    <AllCommentIcons
                        table={table}
                        unlockUpdater={unlockUpdater}
                        setUnlockUpdater={setUnlockUpdater}
                        checkedBoxArray={checkedBoxArray}
                        setCheckedBoxArray={setCheckedBoxArray}
                        tablesWithLock={tablesWithLock}
                        setTablesWithLock={setTablesWithLock}
                        setUnlockOptionSelected={setUnlockOptionSelected}
                    />
                </View>
            )}

            {showVoteRelatedUnlocks && (
                <View style={styles.cont}>
                    <RenderUnlockOption
                        table={table}
                        unlock={'finish vote'}
                        display={'finish vote'}
                        unlockUpdater={unlockUpdater}
                        setUnlockUpdater={setUnlockUpdater}
                        checkedBoxArray={checkedBoxArray}
                        setCheckedBoxArray={setCheckedBoxArray}
                        setUnlockOptionSelected={setUnlockOptionSelected}
                        tablesWithLock={tablesWithLock}
                        setTablesWithLock={setTablesWithLock}
                    />

                    <RenderUnlockOption
                        table={table}
                        unlock={'submit vote'}
                        display={'submit vote'}
                        unlockUpdater={unlockUpdater}
                        setUnlockUpdater={setUnlockUpdater}
                        checkedBoxArray={checkedBoxArray}
                        setCheckedBoxArray={setCheckedBoxArray}
                        setUnlockOptionSelected={setUnlockOptionSelected}
                        tablesWithLock={tablesWithLock}
                        setTablesWithLock={setTablesWithLock}
                    />

                    <RenderUnlockOption
                        table={table}
                        unlock={'like vote'}
                        display={'like vote'}
                        unlockUpdater={unlockUpdater}
                        setUnlockUpdater={setUnlockUpdater}
                        checkedBoxArray={checkedBoxArray}
                        setCheckedBoxArray={setCheckedBoxArray}
                        setUnlockOptionSelected={setUnlockOptionSelected}
                        tablesWithLock={tablesWithLock}
                        setTablesWithLock={setTablesWithLock}
                    />

                    <RenderUnlockOption
                        table={table}
                        unlock={'star vote'}
                        display={'star vote'}
                        unlockUpdater={unlockUpdater}
                        setUnlockUpdater={setUnlockUpdater}
                        checkedBoxArray={checkedBoxArray}
                        setCheckedBoxArray={setCheckedBoxArray}
                        setUnlockOptionSelected={setUnlockOptionSelected}
                        tablesWithLock={tablesWithLock}
                        setTablesWithLock={setTablesWithLock}
                    />

                    <RenderUnlockOption
                        table={table}
                        unlock={'star vote'}
                        display={'star vote'}
                        unlockUpdater={unlockUpdater}
                        setUnlockUpdater={setUnlockUpdater}
                        checkedBoxArray={checkedBoxArray}
                        setCheckedBoxArray={setCheckedBoxArray}
                        setUnlockOptionSelected={setUnlockOptionSelected}
                        tablesWithLock={tablesWithLock}
                        setTablesWithLock={setTablesWithLock}
                    />

                    <RenderUnlockOption
                        table={table}
                        unlock={'winning vote'}
                        display={'winning vote'}
                        unlockUpdater={unlockUpdater}
                        setUnlockUpdater={setUnlockUpdater}
                        checkedBoxArray={checkedBoxArray}
                        setCheckedBoxArray={setCheckedBoxArray}
                        setUnlockOptionSelected={setUnlockOptionSelected}
                        tablesWithLock={tablesWithLock}
                        setTablesWithLock={setTablesWithLock}
                    />
                </View>
            )}
        </View>
    );
};

interface CommentIconProps {
    table: any;
    unlockUpdater: any;
    setUnlockUpdater: any;
    checkedBoxArray: any;
    setCheckedBoxArray: any;
    tablesWithLock: any;
    setTablesWithLock: any;
    setUnlockOptionSelected: any;
}

const AllCommentIcons: React.FC<CommentIconProps> = ({
    table,
    unlockUpdater,
    setUnlockUpdater,
    checkedBoxArray,
    setCheckedBoxArray,
    tablesWithLock,
    setTablesWithLock,
    setUnlockOptionSelected,
}) => {
    return (
        <View style={styles.cont}>
            <RenderUnlockOption
                unlock={'commentIcon-thoughts'}
                display={'commentIcon-thoughts'}
                unlockUpdater={unlockUpdater}
                setUnlockUpdater={setUnlockUpdater}
                checkedBoxArray={checkedBoxArray}
                setCheckedBoxArray={setCheckedBoxArray}
                setUnlockOptionSelected={setUnlockOptionSelected}
                table={table}
                tablesWithLock={tablesWithLock}
                setTablesWithLock={setTablesWithLock}
            />
            <RenderUnlockOption
                unlock={'commentIcon-moments'}
                display={'commentIcon-moments'}
                unlockUpdater={unlockUpdater}
                setUnlockUpdater={setUnlockUpdater}
                checkedBoxArray={checkedBoxArray}
                setCheckedBoxArray={setCheckedBoxArray}
                setUnlockOptionSelected={setUnlockOptionSelected}
                table={table}
                tablesWithLock={tablesWithLock}
                setTablesWithLock={setTablesWithLock}
            />
            <RenderUnlockOption
                unlock={'commentIcon-fields'}
                display={'commentIcon-fields'}
                unlockUpdater={unlockUpdater}
                setUnlockUpdater={setUnlockUpdater}
                checkedBoxArray={checkedBoxArray}
                setCheckedBoxArray={setCheckedBoxArray}
                setUnlockOptionSelected={setUnlockOptionSelected}
                table={table}
                tablesWithLock={tablesWithLock}
                setTablesWithLock={setTablesWithLock}
            />
            <RenderUnlockOption
                unlock={'commentIcon-greatfull'}
                display={'commentIcon-greatfull'}
                unlockUpdater={unlockUpdater}
                setUnlockUpdater={setUnlockUpdater}
                checkedBoxArray={checkedBoxArray}
                setCheckedBoxArray={setCheckedBoxArray}
                setUnlockOptionSelected={setUnlockOptionSelected}
                table={table}
                tablesWithLock={tablesWithLock}
                setTablesWithLock={setTablesWithLock}
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
    lockRowDropdown: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
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

export default UnlockMenu;
