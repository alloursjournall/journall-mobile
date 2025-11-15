import { useState } from 'react';

// redux
import { RootState } from '@/redux/store/rootReducer';
import { useSelector, useDispatch, createDispatchHook } from 'react-redux';

// <>
import VoteTypeMenu from '../VoteTypeMenu';
import BallotOptions from '../BallotOptions';
import LitLikeLoveOrStarsCheckboxes from './LitLikeLoveOrStarsCheckboxes';
import ShowSettingsOptionsMenuCheckbox from './ShowSettingsOptionsMenuCheckbox';
import InviteOnlySettingsRow from './InviteOnlySettingsRow';
import ShowSettingsOptionsMenuInput from '../ShowSettingsOptionsMenuInput';
import { LinearGradient } from 'expo-linear-gradient';

import { Dimensions, TouchableOpacity, TextInput, Image, ScrollView, View, Text, StyleSheet } from 'react-native';
import { SettingsIcon, InfoIcon } from '@/constants/Images';
import { grayphite } from '@/constants/Colors';

interface VotesSettingsProps {
    day: any;
    setDay: any;
    inviteOnlyVoteUsers: any;
    setInviteOnlyVoteUsers: any;
    ballotBinIndex: any;
    setBallotBinIndex: any;
    showSettingsOptionsMenu: any;
    setShowSettingsOptionsMenu: any;
    allUserProfileIcons: any;
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const VoteSettings: React.FC<VotesSettingsProps> = ({
    day,
    setDay,
    inviteOnlyVoteUsers,
    setInviteOnlyVoteUsers,
    ballotBinIndex,
    setBallotBinIndex,
    showSettingsOptionsMenu,
    setShowSettingsOptionsMenu,
    allUserProfileIcons,
}) => {
    // redux state (definitions and props)

    const ballots = day?.ballots;
    const currBallot = Array.isArray(ballots) && ballots[ballotBinIndex];
    const [showBallotOptionSettingsMenu, setShowBallotOptionSettingsMenu] = useState(false);
    const [showInviteOnlyUsersMenu, setShowInviteOnlyUsersMenu] = useState(false);
    const [titleInputValue, setTitleInputValue] = useState('title');
    const [descriptionInputValue, setDescriptionInputValue] = useState('description');
    const [restrictionInputValue, setRestrictionInputValue] = useState('restriction');

    const [litLikeLoveOrStars, setLitLikeLoveOrStars] = useState('');
    const litLikeLoveOrStarsObj = { litLikeLoveOrStars: litLikeLoveOrStars, setLitLikeLoveOrStars: setLitLikeLoveOrStars };

    const showSettingsOptionsMenuClick = () => {
        setShowSettingsOptionsMenu(!showSettingsOptionsMenu);
    };

    const showBallotOptionSettingsMenuClick = () => {
        setShowBallotOptionSettingsMenu(!showBallotOptionSettingsMenu);
    };

    const showInviteOnlyUsersMenuClick = () => {
        setShowInviteOnlyUsersMenu(!showInviteOnlyUsersMenu);
    };

    const descriptionInputOnChange = (text: string) => {
        const value = text.replace(/[^a-zA-Z0-9 ]/g, '');
        let clone = { ...day };
        let ballotsClone = clone?.ballots;
        ballotsClone.description = value;
        clone.ballots = ballotsClone;
        setDay(clone);
        setDescriptionInputValue(value);
    };

    const restrictionInputOnChange = (text: string) => {
        const value = text.replace(/[^a-zA-Z0-9 ]/g, '');
        let clone = { ...day };
        let ballotsClone = clone?.ballots;
        ballotsClone.restriction = value;
        clone.ballots = ballotsClone;
        setDay(clone);
        setRestrictionInputValue(value);
    };

    // const modularInputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {}

    // keeping for understanding.
    const showTitleInfo = () => {
        const currentValue = titleInputValue;
        setTitleInputValue('title');

        setTimeout(() => {
            setTitleInputValue(currentValue);
        }, 1000);
    };

    const modularShowInfo = (state: any, setState: any, value: any) => {
        // keep original value:
        const currentValue = state;
        // set State to show the user which input, like "title" they are typing into.
        setState(value);

        // set the state back to whatever they had it before as they probably only wanted a reminder of what they're typing into.
        setTimeout(() => {
            setState(currentValue);
        }, 1000);
    };

    const userSubmittedOptionsOkCheckboxToggler = () => {
        console.log('day', day);
        console.log('running');

        if (currBallot?.is_media_vote) {
            setDay((prevDay: any) => ({
                ...prevDay,
                ballots: prevDay.ballots.map((ballot: any, i: number) =>
                    i === ballotBinIndex
                        ? {
                              ...ballot,
                              user_submitted_options_ok: !ballot.user_submitted_options_ok,
                              user_submitted_options_media_ok: !ballot.user_submitted_options_media_ok,
                          }
                        : ballot,
                ),
            }));
        } else {
            setDay((prevDay: any) => ({
                ...prevDay,
                ballots: prevDay.ballots.map((ballot: any, i: number) =>
                    i === ballotBinIndex
                        ? {
                              ...ballot,
                              user_submitted_options_ok: !ballot.user_submitted_options_ok,
                          }
                        : ballot,
                ),
            }));
        }
    };

    const userSubmittedOptionsNeedApprovalCheckboxToggler = () => {
        setDay((prevDay: any) => ({
            ...prevDay,
            ballots: prevDay.ballots.map((ballot: any, i: number) =>
                i === ballotBinIndex
                    ? {
                          ...ballot,
                          user_submitted_options_need_approval: !ballot.user_submitted_options_need_approval,
                      }
                    : ballot,
            ),
        }));
    };

    const hideWaitingOnApprovalOptionsCheckboxToggler = () => {
        setDay((prevDay: any) => ({
            ...prevDay,
            ballots: prevDay.ballots.map((ballot: any, i: number) =>
                i === ballotBinIndex
                    ? {
                          ...ballot,
                          hide_waiting_on_approval_votes: !ballot.hide_waiting_on_approval_votes,
                      }
                    : ballot,
            ),
        }));
    };

    const showResultsDuringCheckboxToggler = () => {
        setDay((prevDay: any) => ({
            ...prevDay,
            ballots: prevDay.ballots.map((ballot: any, i: number) =>
                i === ballotBinIndex
                    ? {
                          ...ballot,
                          show_results_during: !ballot.show_results_during,
                      }
                    : ballot,
            ),
        }));
    };

    const editResultsDuringCheckboxToggler = () => {
        setDay((prevDay: any) => ({
            ...prevDay,
            ballots: prevDay.ballots.map((ballot: any, i: number) =>
                i === ballotBinIndex
                    ? {
                          ...ballot,
                          edit_results_during: !ballot.edit_results_during,
                      }
                    : ballot,
            ),
        }));
    };

    const test = () => {
        console.log('day.ballots[0]', day.ballots[0]);
    };

    // UX:  if the user goes to submit the ballot as content without creating title or description than open the Settings.
    return (
        <View>
            <View style={styles.uploadSettingsRow}>
                <View style={styles.slightSplitRow}>
                    <Image style={styles.iconMini} source={SettingsIcon} />
                    <TouchableOpacity onPress={test}>
                        <Text style={styles.settingsRowText}> SETUP </Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={showSettingsOptionsMenuClick}>
                    <Text style={styles.settingsRowText}> &darr; </Text>
                </TouchableOpacity>
            </View>
            {showSettingsOptionsMenu && (
                <View>
                    <View style={styles.uploadSettingsRow}>
                        <View style={styles.slightSplitRow}>
                            <LinearGradient
                                colors={['#814c89', '#f85d94']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={{
                                    height: 15,
                                    width: 15,
                                    marginHorizontal: 2,
                                    transform: [{ rotate: '25deg' }],
                                    borderWidth: 2,
                                    borderColor: '#814c89',
                                    shadowColor: '#4a4a4a',
                                    shadowOffset: { width: 2, height: 2 },
                                    shadowOpacity: 0.5,
                                    shadowRadius: 2,
                                }}
                            />
                            <Text style={styles.settingsRowText}> ballot option settings </Text>
                        </View>

                        <TouchableOpacity onPress={showBallotOptionSettingsMenuClick}>
                            <Text style={styles.settingsRowText}> &darr; </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.uploadSettingsRow}>
                        <View style={styles.slightSplitRow}>
                            <Text style={styles.settingsRowText}> invite only vote?! </Text>
                        </View>

                        <TouchableOpacity onPress={showInviteOnlyUsersMenuClick}>
                            <Text style={styles.settingsRowText}> &darr; </Text>
                        </TouchableOpacity>
                    </View>

                    {showBallotOptionSettingsMenu && (
                        <View style={styles.columnCont}>
                            <LitLikeLoveOrStarsCheckboxes
                                litLikeLoveOrStars={litLikeLoveOrStars}
                                setLitLikeLoveOrStars={setLitLikeLoveOrStars}
                                day={day}
                                setDay={setDay}
                                ballotBinIndex={ballotBinIndex}
                                setBallotBinIndex={setBallotBinIndex}
                            />

                            <ShowSettingsOptionsMenuCheckbox
                                checkboxChecked={Array.isArray(day?.ballots) && day?.ballots[ballotBinIndex]?.user_submitted_options_ok}
                                checkboxOnChange={userSubmittedOptionsOkCheckboxToggler}
                                infoKey={'voters can submit options'}
                                modularShowInfo={modularShowInfo}
                                borderBottomHexCode={'#f4c420'}
                            />

                            {currBallot?.user_submitted_options_ok && (
                                <ShowSettingsOptionsMenuCheckbox
                                    checkboxChecked={Array.isArray(day?.ballots) && day?.ballots[ballotBinIndex]?.user_submitted_options_need_approval}
                                    checkboxOnChange={userSubmittedOptionsNeedApprovalCheckboxToggler}
                                    infoKey={'submitted options hide till approval'}
                                    modularShowInfo={modularShowInfo}
                                    borderBottomHexCode={'#f4c420'}
                                />
                            )}

                            {currBallot?.user_submitted_options_ok && (
                                <ShowSettingsOptionsMenuCheckbox
                                    checkboxChecked={Array.isArray(day?.ballots) && day?.ballots[ballotBinIndex]?.hide_waiting_on_approval_votes}
                                    checkboxOnChange={hideWaitingOnApprovalOptionsCheckboxToggler}
                                    infoKey={'hide waiting votes'}
                                    modularShowInfo={modularShowInfo}
                                    borderBottomHexCode={'#f4c420'}
                                />
                            )}

                            <ShowSettingsOptionsMenuCheckbox
                                checkboxChecked={Array.isArray(day?.ballots) && day?.ballots[ballotBinIndex]?.show_results_during}
                                checkboxOnChange={showResultsDuringCheckboxToggler}
                                infoKey={'show results during'}
                                modularShowInfo={modularShowInfo}
                                borderBottomHexCode={'#f4c420'}
                            />

                            <ShowSettingsOptionsMenuCheckbox
                                checkboxChecked={Array.isArray(day?.ballots) && day?.ballots[ballotBinIndex]?.edit_results_during}
                                checkboxOnChange={editResultsDuringCheckboxToggler}
                                infoKey={'edit results during'}
                                modularShowInfo={modularShowInfo}
                                borderBottomHexCode={'#f4c420'}
                            />
                        </View>
                    )}

                    {showInviteOnlyUsersMenu && (
                        <InviteOnlySettingsRow
                            day={day}
                            inviteOnlyVoteUsers={inviteOnlyVoteUsers}
                            setInviteOnlyVoteUsers={setInviteOnlyVoteUsers}
                            allUserProfileIcons={allUserProfileIcons}
                        />
                    )}

                    <ShowSettingsOptionsMenuInput
                        day={day}
                        ballotBinIndex={ballotBinIndex}
                        inputValue={descriptionInputValue}
                        setInputValue={setDescriptionInputValue}
                        inputOnChange={descriptionInputOnChange}
                        infoKey="description"
                        modularShowInfo={modularShowInfo}
                    />

                    <ShowSettingsOptionsMenuInput
                        day={day}
                        ballotBinIndex={ballotBinIndex}
                        inputValue={restrictionInputValue}
                        setInputValue={setRestrictionInputValue}
                        inputOnChange={restrictionInputOnChange}
                        infoKey="restriction"
                        modularShowInfo={modularShowInfo}
                    />
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
    settingsRowHeader: {
        fontFamily: 'Fuzzy Bubbles',
        color: grayphite,
        fontSize: 18,
    },
    settingsRowText: {
        fontFamily: 'Fuzzy Bubbles',
        color: grayphite,
        fontSize: 14,
    },
    icons: {
        height: 35,
        width: 35,
    },
    iconMini: {
        height: 25,
        width: 25,
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
    ghost: {
        opacity: 0,
    },
    ballotOptionsMedia: {
        height: screenHeight / 10,
        width: screenHeight / 10,
    },

    container: {
        gap: 5,
        // padding: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    centerCont: {
        flex: 1, // Allow this to take remaining space
        height: screenHeight * 0.325,
        width: '100%',
        justifyContent: 'center', // Center the content vertically
        alignItems: 'center',
    },
});

export default VoteSettings;
