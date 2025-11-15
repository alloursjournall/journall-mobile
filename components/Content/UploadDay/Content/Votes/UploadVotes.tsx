import { useState, useEffect } from 'react';

// redux
import { RootState } from '@/redux/store/rootReducer';
import { useSelector, useDispatch, createDispatchHook } from 'react-redux';

// <>
import VoteTypeMenu from './VoteTypeMenu';
import BallotOptions from './BallotOptions';
import VoteSettings from './VoteSettings/VoteSettings';
import VoteFinishedMenu from './VoteSettings/VoteFinishedMenu';

import { TouchableOpacity, TextInput, Image, ScrollView, View, Text, StyleSheet } from 'react-native';
import { grayphite } from '@/constants/Colors';

interface props {
    day: any;
    setDay: any;
    ballotBinIndex: any;
    setBallotBinIndex: any;
    inviteOnlyVoteUsers: any;
    setInviteOnlyVoteUsers: any;
    allUserProfileIcons: any;
}

const UploadVotes: React.FC<props> = ({ day, setDay, ballotBinIndex, setBallotBinIndex, inviteOnlyVoteUsers, setInviteOnlyVoteUsers, allUserProfileIcons }) => {
    const thoughts = day?.thoughts || null;
    const moments = day?.moments || null;
    const fields = day?.fields || null;
    const greatfull = day?.greatfull || null;
    const ballots = day?.ballots;

    // redux state:

    // menu / dropdown state:
    const [showVoteTypeMenu, setShowVoteTypeMenu] = useState(false);
    const [showBallotOptionsMenu, setShowBallotOptionsMenu] = useState(false);
    const [showSettingsOptionsMenu, setShowSettingsOptionsMenu] = useState(false);
    const [showVoteFinishedMenu, setShowVoteFinishedMenu] = useState(false);

    const [showCommentVoteTypeMenu, setShowCommentVoteTypeMenu] = useState(false);
    const [showEditContentVoteTypeMenu, setShowEditContentVoteTypeMenu] = useState(false);

    //

    const currBallot = Array.isArray(ballots) && ballots[ballotBinIndex];

    // DROPDOWNS v v v
    //  Vote Types: v v v
    // comments -> (vote types)
    // best comment (vote types)
    // choose pinned comment (can schedule @ 8:00 or so for example (vote types)

    // write content: (vote types) but also it's own dropdown to select which type
    // {...} // media or not:

    // custom

    //  OPTIONS v v v (gear settings)

    const test = () => {};

    return (
        <View style={styles.settingsCont}>
            {/* style={{ borderTop: '5px solid #94d46c', borderBottom: "5px solid #e19db3", borderLeft: '10px solid #9dcee1' }} */}

            <View style={styles.uploadSettingsRow}>
                <Text style={styles.settingsRowHeader}> &lt; </Text>
                <Text style={styles.settingsRowHeader}> Votes: </Text>
                <Text style={styles.settingsRowHeader}> &gt; </Text>
            </View>

            {!showBallotOptionsMenu && !showSettingsOptionsMenu && !showVoteFinishedMenu && (
                // !showBallotOptionsMenu && !showSettingsOptionsMenu &&
                <VoteTypeMenu
                    day={day}
                    setDay={setDay}
                    ballotBinIndex={ballotBinIndex}
                    setBallotBinIndex={setBallotBinIndex}
                    showVoteTypeMenu={showVoteTypeMenu}
                    setShowVoteTypeMenu={setShowVoteTypeMenu}
                />
            )}

            {!showVoteTypeMenu && !showSettingsOptionsMenu && !showVoteFinishedMenu && currBallot?.type && (
                // !showVoteTypeMenu && !showSettingsOptionsMenu &&  ballotBin[ballotBinIndex]?.type &&
                <BallotOptions
                    day={day}
                    setDay={setDay}
                    ballotBinIndex={ballotBinIndex}
                    setBallotBinIndex={setBallotBinIndex}
                    showBallotOptionsMenu={showBallotOptionsMenu}
                    setShowBallotOptionsMenu={setShowBallotOptionsMenu}
                />
            )}

            {!showBallotOptionsMenu && !showVoteTypeMenu && !showVoteFinishedMenu && (
                <VoteSettings
                    day={day}
                    setDay={setDay}
                    inviteOnlyVoteUsers={inviteOnlyVoteUsers}
                    setInviteOnlyVoteUsers={setInviteOnlyVoteUsers}
                    ballotBinIndex={ballotBinIndex}
                    setBallotBinIndex={setBallotBinIndex}
                    showSettingsOptionsMenu={showSettingsOptionsMenu}
                    setShowSettingsOptionsMenu={setShowSettingsOptionsMenu}
                    allUserProfileIcons={allUserProfileIcons}
                />
            )}

            {!showVoteTypeMenu && !showBallotOptionsMenu && !showSettingsOptionsMenu && (
                <VoteFinishedMenu day={day} setDay={setDay} showVoteFinishedMenu={showVoteFinishedMenu} setShowVoteFinishedMenu={setShowVoteFinishedMenu} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    settingsCont: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 20,
        padding: 10,
    },
    uploadSettingsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    settingsRowHeader: {
        fontFamily: 'Fuzzy Bubbles',
        color: grayphite,
        fontSize: 18,
    },
});

export default UploadVotes;
