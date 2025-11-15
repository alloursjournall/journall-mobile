import { useState, useEffect } from 'react';

import { TouchableOpacity, TextInput, Image, ScrollView, View, Text, StyleSheet } from 'react-native';

// utils:
import { ThoughtsIcon, MomentsIcon, FieldsIcon, GreatfullIcon, PindropIcon, SoundWaveIcon } from '@/constants/Images';
import { LinearGradient } from 'expo-linear-gradient';
import { specifyStringTruncate } from '@/utility/utilityValues';
import { grayphite } from '@/constants/Colors';

interface props {
    day: any;
    setDay: any;
    ballotBinIndex: any;
    setBallotBinIndex: any;
    showVoteTypeMenu: any;
    setShowVoteTypeMenu: any;
}

const VoteTypeMenu: React.FC<props> = ({ day, setDay, ballotBinIndex, setBallotBinIndex, showVoteTypeMenu, setShowVoteTypeMenu }) => {
    const thoughts = day?.thoughts;
    const moments = day?.moments;
    const fields = day?.fields;
    const greatfull = day?.greatfull;
    const ballots = day?.ballots || null;
    const currBallot = Array.isArray(ballots) && ballots[ballotBinIndex];

    const [showCommentVoteTypeMenu, setShowCommentVoteTypeMenu] = useState(false);
    const [showEditContentVoteTypeMenu, setShowEditContentVoteTypeMenu] = useState(false);

    const showVoteTypeMenuClick = () => {
        console.log('firing showVoteMenuType');
        setShowVoteTypeMenu(!showVoteTypeMenu);
    };

    const showCommentVoteTypeMenuClick = () => {
        if (showEditContentVoteTypeMenu) setShowEditContentVoteTypeMenu(false);
        setShowCommentVoteTypeMenu(!showCommentVoteTypeMenu);
    };

    const showEditContentVoteTypeMenuClick = () => {
        if (showCommentVoteTypeMenu) setShowCommentVoteTypeMenu(false);
        setShowEditContentVoteTypeMenu(!showEditContentVoteTypeMenu);
    };

    const customVoteTypeCheckboxToggle = () => {
        let clone = { ...day };
        let ballotClone = clone?.ballots;

        console.log('clone', clone);
        console.log('ballotClone', ballotClone);

        // return;

        if (ballotClone[ballotBinIndex]?.type === 'custom') {
            ballotClone[ballotBinIndex].type = '';
        } else {
            // user already selected blob options for a media based vote and is switching to text vote? delete blobs and file types.
            ballotClone[ballotBinIndex].media_option_type = '';

            if (Array.isArray(ballotClone[ballotBinIndex]?.options) && ballotClone[ballotBinIndex]?.options?.length) {
                ballotClone[ballotBinIndex]?.options?.forEach((option: any) => {
                    option.text = '';
                    option.blob = null;
                    option.blobURL = null;
                    option.blobType = null;
                });
                ballotClone[ballotBinIndex].type = 'custom';
            }
        }
        clone.ballots = ballotClone;
        setDay(clone);
    };

    const customMediaVoteTypeCheckboxToggle = () => {
        let clone = { ...day };
        let ballotClone = clone?.ballots;

        if (ballotClone[ballotBinIndex]?.type === 'custom better media') {
            ballotClone[ballotBinIndex].type = '';
            ballotClone[ballotBinIndex].is_media_vote = false;
        } else {
            // if user was selecting text options before and switched to options then delete their text entries to restore defaults.
            ballotClone[ballotBinIndex].options.forEach((option: any) => (option.text = ''));
            ballotClone[ballotBinIndex].type = 'custom better media';
            ballotClone[ballotBinIndex].is_media_vote = true;
        }
        clone.ballots = ballotClone;
        setDay(clone);
    };

    // could modularize with (key:string)      ballotBin.type === "key" but leaving separated for single responsibility for now.;
    const bestCommentCheckboxToggle = () => {
        let clone = { ...day };
        let ballotClone = clone?.ballots;

        if (ballotClone[ballotBinIndex]?.type === 'best comment') {
            ballotClone[ballotBinIndex].type = '';
        } else {
            ballotClone[ballotBinIndex].type = 'best comment';
        }
        clone.ballots = ballotClone;
        setDay(clone);
    };

    const pinnedCommentCheckboxToggle = () => {
        let clone = { ...day };
        let ballotClone = clone?.ballots;

        if (ballotClone[ballotBinIndex]?.type === 'pinned comment') {
            ballotClone[ballotBinIndex].type = '';
        } else {
            ballotClone[ballotBinIndex].type = 'pinned comment';
        }
        clone.ballots = ballotClone;
        setDay(clone);
    };

    const newFieldCheckboxToggle = () => {
        let clone = { ...day };
        let ballotClone = clone?.ballots;

        if (ballotClone[ballotBinIndex]?.type === 'joinday-newfield') {
            ballotClone[ballotBinIndex].type = '';
        } else {
            ballotClone[ballotBinIndex].type = 'joinday-newfield';
        }

        clone.ballots = ballotClone;
        setDay(clone);
    };

    const newThoughtTextCheckboxToggle = () => {
        let clone = { ...day };
        let ballotClone = clone?.ballots;

        if (ballotClone[ballotBinIndex]?.type === 'joinday-newthought') {
            ballotClone[ballotBinIndex].type = '';
        } else {
            ballotClone[ballotBinIndex].type = 'joinday-newthought';
        }

        clone.ballots = ballotClone;
        setDay(clone);
    };

    const newThoughtAudioCheckboxToggle = () => {
        let clone = { ...day };
        let ballotClone = clone?.ballots;

        if (ballotClone[ballotBinIndex]?.type === 'new-media-joinday-soundThought') {
            ballotClone[ballotBinIndex].type = '';
        } else {
            ballotClone[ballotBinIndex].type = 'new-media-joinday-soundThought';
        }

        clone.ballots = ballotClone;
        setDay(clone);
    };

    const newMediaJoindayMomentCheckboxToggle = () => {
        let clone = { ...day };
        let ballotClone = clone?.ballots;

        if (ballotClone[ballotBinIndex]?.type === 'new-media-joinday-moment') {
            ballotClone[ballotBinIndex].type = '';
        } else {
            ballotClone[ballotBinIndex].type = 'new-media-joinday-moment';
        }

        clone.ballots = ballotClone;
        setDay(clone);
    };

    const joindayGreatfullOneWordOfTheDayCheckboxToggle = () => {
        let clone = { ...day };
        let ballotClone = clone?.ballots;

        if (ballotClone[ballotBinIndex]?.type === 'joinday-gr8-oneword') {
            ballotClone[ballotBinIndex].type = '';
        } else {
            ballotClone[ballotBinIndex].type = 'joinday-gr8-oneword';
        }

        clone.ballots = ballotClone;
        setDay(clone);
    };

    const joindayGreatfullAllWordsOfTheDayCheckboxToggle = () => {
        let clone = { ...day };
        let ballotClone = clone?.ballots;

        if (ballotClone[ballotBinIndex]?.type === 'joinday-gr8-threewords') {
            ballotClone[ballotBinIndex].type = '';
        } else {
            ballotClone[ballotBinIndex].type = 'joinday-gr8-threewords';
        }

        clone.ballots = ballotClone;
        setDay(clone);
    };

    const joindayTitleDayCheckboxTitle = () => {
        let clone = { ...day };
        let ballotClone = clone?.ballots;

        console.log('clone', clone);
        console.log('ballotClone', ballotClone);
        // return;

        if (ballotClone[ballotBinIndex]?.type === 'joinday-titleday') {
            ballotClone[ballotBinIndex].type = '';
        } else {
            console.log("okay we're getting to this block");
            ballotClone[ballotBinIndex].type = 'joinday-titleday';
        }

        clone.ballots = ballotClone;
        setDay(clone);
    };

    return (
        // click dropdowns

        <View>
            {
                <View style={styles.uploadSettingsRow}>
                    <View style={styles.slightSplitRow}>
                        <LinearGradient
                            colors={['#a1f36e', '#c0fc9b']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={{
                                height: 15,
                                width: 15,
                                marginHorizontal: 2,
                                transform: [{ rotate: '25deg' }],
                                borderWidth: 2,
                                borderColor: '#94d46c',
                                shadowColor: '#4a4a4a',
                                shadowOffset: { width: 2, height: 2 },
                                shadowOpacity: 0.5,
                                shadowRadius: 2,
                            }}
                        />

                        <Text style={styles.settingsRowText}> VOTE TYPES </Text>
                    </View>

                    <TouchableOpacity onPress={showVoteTypeMenuClick}>
                        <Text style={styles.settingsRowText}> &darr; </Text>
                    </TouchableOpacity>
                </View>
            }

            {showVoteTypeMenu && (
                <View style={styles.columnCont}>
                    {!showEditContentVoteTypeMenu && (
                        <View style={styles.uploadSettingsRow}>
                            <View style={styles.slightSplitRow}>
                                {/* <div style={{ height: '7.5px', width: '7.5px' }} style={styles.greenDiscoSquare}></div> */}
                                <Text style={styles.settingsRowText}> COMMENTS </Text>
                            </View>
                            {/* 🚨 vote types are initially custom only so these will be updated! */}

                            <TouchableOpacity onPress={showCommentVoteTypeMenuClick}>
                                <Text style={styles.settingsRowText}> &darr; </Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {!showCommentVoteTypeMenu && (
                        <View style={styles.uploadSettingsRow}>
                            <View style={styles.slightSplitRow}>
                                <Text style={styles.settingsRowText}> EDIT </Text>
                            </View>

                            <View style={styles.slightSplitRow}>
                                {/* <Image style={styles.icons} source={PindropIcon} />
                                <Image style={styles.icons} source={PindropIcon} />
                                <Image style={styles.icons} source={PindropIcon} />
                                <Image style={styles.icons} source={PindropIcon} /> */}
                            </View>

                            <TouchableOpacity onPress={showEditContentVoteTypeMenuClick}>
                                <Text style={styles.settingsRowText}> &darr; </Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {!showEditContentVoteTypeMenu && !showCommentVoteTypeMenu && (
                        <View style={styles.uploadSettingsRow}>
                            <View style={styles.slightSplitRow}>
                                {/* <div style={{ height: '7.5px', width: '7.5px' }} style={styles.greenDiscoSquare}></div> */}
                                <Text style={styles.settingsRowText}> CUSTOM </Text>
                            </View>

                            <TouchableOpacity
                                style={[{ backgroundColor: currBallot?.type === 'custom' ? 'grey' : 'transparent' }, styles.button]}
                                onPress={customVoteTypeCheckboxToggle}
                            />
                        </View>
                    )}

                    {!showEditContentVoteTypeMenu && !showCommentVoteTypeMenu && (
                        <View style={styles.uploadSettingsRow}>
                            <View style={styles.slightSplitRow}>
                                {/* <div style={{ height: '7.5px', width: '7.5px' }} style={styles.greenDiscoSquare}></div> */}
                                <Text style={styles.settingsRowText}> CUSTOM MEDIA </Text>
                            </View>

                            <TouchableOpacity
                                style={[{ backgroundColor: currBallot?.type === 'custom better media' ? 'grey' : 'transparent' }, styles.button]}
                                onPress={customMediaVoteTypeCheckboxToggle}
                            />
                        </View>
                    )}

                    {showCommentVoteTypeMenu && (
                        <View style={styles.columnCont}>
                            <View style={styles.uploadSettingsRow}>
                                <View style={styles.slightSplitRow}>
                                    <LinearGradient
                                        colors={['#a1f36e', '#c0fc9b']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        style={{
                                            height: 15,
                                            width: 15,
                                            marginHorizontal: 2,
                                            transform: [{ rotate: '25deg' }],
                                            borderWidth: 2,
                                            borderColor: '#94d46c',
                                            shadowColor: '#4a4a4a',
                                            shadowOffset: { width: 2, height: 2 },
                                            shadowOpacity: 0.5,
                                            shadowRadius: 2,
                                        }}
                                    />

                                    <Text style={styles.settingsRowText}> best comment </Text>
                                </View>

                                <TouchableOpacity
                                    style={[{ backgroundColor: currBallot?.type === 'best comment' ? 'grey' : 'transparent' }, styles.button]}
                                    onPress={bestCommentCheckboxToggle}
                                />
                            </View>

                            <View style={styles.uploadSettingsRow}>
                                <View style={styles.slightSplitRow}>
                                    <LinearGradient
                                        colors={['#a1f36e', '#c0fc9b']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        style={{
                                            height: 15,
                                            width: 15,
                                            marginHorizontal: 2,
                                            transform: [{ rotate: '25deg' }],
                                            borderWidth: 2,
                                            borderColor: '#94d46c',
                                            shadowColor: '#4a4a4a',
                                            shadowOffset: { width: 2, height: 2 },
                                            shadowOpacity: 0.5,
                                            shadowRadius: 2,
                                        }}
                                    />

                                    <Text style={styles.settingsRowText}> pinned comment </Text>
                                    <Image style={styles.icons} source={PindropIcon} />
                                </View>

                                <TouchableOpacity
                                    style={[{ backgroundColor: currBallot?.type === 'pinned comment' ? 'grey' : 'transparent' }, styles.button]}
                                    onPress={pinnedCommentCheckboxToggle}
                                />
                            </View>
                        </View>
                    )}

                    {showEditContentVoteTypeMenu && (
                        <View style={styles.columnCont}>
                            {/* <Text> ayoo </Text> */}

                            <View style={styles.uploadSettingsRow}>
                                <View style={styles.slightSplitRow}>
                                    <LinearGradient
                                        colors={['#a1f36e', '#c0fc9b']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        style={{
                                            height: 15,
                                            width: 15,
                                            marginHorizontal: 2,
                                            transform: [{ rotate: '25deg' }],
                                            borderWidth: 2,
                                            borderColor: '#94d46c',
                                            shadowColor: '#4a4a4a',
                                            shadowOffset: { width: 2, height: 2 },
                                            shadowOpacity: 0.5,
                                            shadowRadius: 2,
                                        }}
                                    />

                                    {/* contentFunctions: joinday-newfield resolvers: (submitJoinDayWriteContentAndUpdateBallot) "new field" */}
                                    <Text style={styles.settingsRowText}> new </Text>
                                    <Image style={styles.icons} source={FieldsIcon} />
                                </View>

                                <TouchableOpacity
                                    style={[{ backgroundColor: currBallot?.type === 'joinday-newfield' ? 'grey' : 'transparent' }, styles.button]}
                                    onPress={newFieldCheckboxToggle}
                                />
                            </View>
                            <View style={styles.uploadSettingsRow}>
                                <View style={styles.slightSplitRow}>
                                    <LinearGradient
                                        colors={['#a1f36e', '#c0fc9b']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        style={{
                                            height: 15,
                                            width: 15,
                                            marginHorizontal: 2,
                                            transform: [{ rotate: '25deg' }],
                                            borderWidth: 2,
                                            borderColor: '#94d46c',
                                            shadowColor: '#4a4a4a',
                                            shadowOffset: { width: 2, height: 2 },
                                            shadowOpacity: 0.5,
                                            shadowRadius: 2,
                                        }}
                                    />

                                    {/* contentFunctions: joinday-newthought resolvers: (submitJoinDayWriteContentAndUpdateBallot) "new thought" */}
                                    <Text style={styles.settingsRowText}> new </Text>
                                    <Image style={styles.icons} source={ThoughtsIcon} />
                                    <TextInput style={styles.input} readOnly={true} />
                                </View>

                                <TouchableOpacity
                                    style={[{ backgroundColor: currBallot?.type === 'joinday-newthought' ? 'grey' : 'transparent' }, styles.button]}
                                    onPress={newThoughtTextCheckboxToggle}
                                />
                            </View>

                            <View style={styles.uploadSettingsRow}>
                                <View style={styles.slightSplitRow}>
                                    <LinearGradient
                                        colors={['#a1f36e', '#c0fc9b']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        style={{
                                            height: 15,
                                            width: 15,
                                            marginHorizontal: 2,
                                            transform: [{ rotate: '25deg' }],
                                            borderWidth: 2,
                                            borderColor: '#94d46c',
                                            shadowColor: '#4a4a4a',
                                            shadowOffset: { width: 2, height: 2 },
                                            shadowOpacity: 0.5,
                                            shadowRadius: 2,
                                        }}
                                    />

                                    <Text style={styles.settingsRowText}> new </Text>
                                    <Image style={styles.icons} source={ThoughtsIcon} />
                                    <Image style={[styles.icons, { transform: 'scale(1.5)', left: '10%' }]} source={SoundWaveIcon} />

                                    {/* <Image style={styles.icons} source={PindropIcon} /> */}
                                    {/* <Image style={{ height: '35px', width: '35px', margin: '0 0.25rem' }} style={styles.icons} source={PindropIcon} /> */}
                                </View>

                                <TouchableOpacity
                                    style={[{ backgroundColor: currBallot?.type === 'new-media-joinday-soundThought' ? 'grey' : 'transparent' }, styles.button]}
                                    onPress={newThoughtAudioCheckboxToggle}
                                />
                            </View>

                            <View style={styles.uploadSettingsRow}>
                                <View style={styles.slightSplitRow}>
                                    <LinearGradient
                                        colors={['#a1f36e', '#c0fc9b']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        style={{
                                            height: 15,
                                            width: 15,
                                            marginHorizontal: 2,
                                            transform: [{ rotate: '25deg' }],
                                            borderWidth: 2,
                                            borderColor: '#94d46c',
                                            shadowColor: '#4a4a4a',
                                            shadowOffset: { width: 2, height: 2 },
                                            shadowOpacity: 0.5,
                                            shadowRadius: 2,
                                        }}
                                    />

                                    <Text style={styles.settingsRowText}> new media </Text>
                                    <Image style={styles.icons} source={MomentsIcon} />
                                </View>

                                {/* contentFunctions: new-media-joinday-moment resolvers: (submitJoinDayWriteContentAndUpdateBallot) "new-media-joinday-moment" */}
                                <TouchableOpacity
                                    style={[{ backgroundColor: currBallot?.type === 'new-media-joinday-moment' ? 'grey' : 'transparent' }, styles.button]}
                                    onPress={newMediaJoindayMomentCheckboxToggle}
                                />
                            </View>

                            {Array.isArray(greatfull?.words) && greatfull?.words && greatfull?.words?.join(',') !== 'words,of,day' && (
                                <View style={styles.columnCont}>
                                    <View style={styles.uploadSettingsRow}>
                                        <View style={styles.slightSplitRow}>
                                            <LinearGradient
                                                colors={['#a1f36e', '#c0fc9b']}
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 1, y: 1 }}
                                                style={{
                                                    height: 15,
                                                    width: 15,
                                                    marginHorizontal: 2,
                                                    transform: [{ rotate: '25deg' }],
                                                    borderWidth: 2,
                                                    borderColor: '#94d46c',
                                                    shadowColor: '#4a4a4a',
                                                    shadowOffset: { width: 2, height: 2 },
                                                    shadowOpacity: 0.5,
                                                    shadowRadius: 2,
                                                }}
                                            />

                                            <Text style={styles.settingsRowText}> 1 word of day </Text>
                                            <Image style={[styles.icons, { left: '-5%' }]} source={GreatfullIcon} />
                                        </View>

                                        <TouchableOpacity
                                            style={[{ backgroundColor: currBallot?.type === 'joinday-gr8-oneword' ? 'grey' : 'transparent' }, styles.button]}
                                            onPress={joindayGreatfullOneWordOfTheDayCheckboxToggle}
                                        />
                                    </View>

                                    <View style={styles.uploadSettingsRow}>
                                        {greatfull?.words[0] && <Text style={styles.settingsRowText}> {specifyStringTruncate(greatfull?.words[0], 10)} </Text>}
                                        {greatfull?.words[1] && <Text style={styles.settingsRowText}> {specifyStringTruncate(greatfull?.words[1], 10)} </Text>}
                                        {/* the opacity shows this will be the word that is replaced! */}
                                        <View style={styles.slightSplitRow}>
                                            {greatfull?.words[2] && <Text style={styles.settingsRowText}> {specifyStringTruncate(greatfull?.words[2], 10)} </Text>}
                                        </View>
                                    </View>
                                </View>
                            )}

                            <View style={styles.uploadSettingsRow}>
                                <View style={styles.slightSplitRow}>
                                    <LinearGradient
                                        colors={['#a1f36e', '#c0fc9b']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        style={{
                                            height: 15,
                                            width: 15,
                                            marginHorizontal: 2,
                                            transform: [{ rotate: '25deg' }],
                                            borderWidth: 2,
                                            borderColor: '#94d46c',
                                            shadowColor: '#4a4a4a',
                                            shadowOffset: { width: 2, height: 2 },
                                            shadowOpacity: 0.5,
                                            shadowRadius: 2,
                                        }}
                                    />

                                    <Text style={styles.settingsRowText}> all words of day </Text>
                                    <Image style={[styles.icons, { left: '-5%' }]} source={GreatfullIcon} />
                                </View>

                                <TouchableOpacity
                                    style={[{ backgroundColor: currBallot?.type === 'joinday-gr8-threewords' ? 'grey' : 'transparent' }, styles.button]}
                                    onPress={joindayGreatfullAllWordsOfTheDayCheckboxToggle}
                                />
                            </View>
                            <View style={styles.uploadSettingsRow}>
                                {greatfull?.words[0] && <Text style={styles.settingsRowText}> {greatfull?.words[0]} </Text>}
                                {greatfull?.words[1] && <Text style={styles.settingsRowText}> {greatfull?.words[1]} </Text>}
                                {greatfull?.words[2] && <Text style={styles.settingsRowText}> {greatfull?.words[2]} </Text>}
                            </View>

                            <View style={styles.uploadSettingsRow}>
                                <View style={styles.slightSplitRow}>
                                    <LinearGradient
                                        colors={['#a1f36e', '#c0fc9b']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        style={{
                                            height: 15,
                                            width: 15,
                                            marginHorizontal: 2,
                                            transform: [{ rotate: '25deg' }],
                                            borderWidth: 2,
                                            borderColor: '#94d46c',
                                            shadowColor: '#4a4a4a',
                                            shadowOffset: { width: 2, height: 2 },
                                            shadowOpacity: 0.5,
                                            shadowRadius: 2,
                                        }}
                                    />

                                    <Text style={styles.settingsRowText}> new title! </Text>
                                    {/* <Text style={styles.settingsRowText}> {day?.title} </Text> */}
                                </View>

                                <TouchableOpacity
                                    style={[{ backgroundColor: currBallot?.type === 'joinday-titleday' ? 'grey' : 'transparent' }, styles.button]}
                                    onPress={joindayTitleDayCheckboxTitle}
                                />
                            </View>
                        </View>
                    )}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    settingsCont: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10,
    },
    columnCont: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 20,
    },
    uploadSettingsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 10,
        gap: 5,
    },
    slightSplitRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    // settingsCont: {
    //     flexDirection: 'column',
    //     justifyContent: 'flex-start',
    //     alignItems: 'center',
    //     gap: 10,
    //     // padding: 10,
    // },
    // columnCont: {
    //     flexDirection: 'column',
    //     justifyContent: 'flex-start',
    //     alignItems: 'center',
    //     gap: 10,
    //     // padding: 10,
    // },
    // uploadSettingsRow: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     alignItems: 'center',
    //     width: '100%',
    // },
    // slightSplitRow: {
    //     flexDirection: 'row',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     gap: 10,
    //     padding: 10,
    // },
    settingsRowHeader: {
        fontFamily: 'Fuzzy Bubbles',
        color: grayphite,
        fontSize: 18,
    },
    settingsRowText: {
        fontFamily: 'Fuzzy Bubbles',
        color: grayphite,
        fontSize: 14,
        marginVertical: 10,
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
    input: {
        width: 24, // equivalent of 1.5rem (assuming 1rem = 16px)
        margin: 0,
        alignSelf: 'center',
        borderRadius: 50, // makes it circular
        borderTopLeftRadius: 14.5,
        borderTopRightRadius: 65.5,
        borderBottomLeftRadius: 122.5,
        borderBottomRightRadius: 30,
        color: '#444', // equivalent of $grayphite
        fontFamily: 'fuzzy', // make sure the font is linked properly
        fontSize: 10, // or adjust based on design
        borderWidth: 1.5,
        borderColor: '#44454fea', // border color
    },
});

export default VoteTypeMenu;
