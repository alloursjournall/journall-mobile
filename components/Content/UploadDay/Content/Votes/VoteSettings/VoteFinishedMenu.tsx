import { useState, useEffect } from 'react';

// redux
import { RootState } from '@/redux/store/rootReducer';
import { useSelector, useDispatch } from 'react-redux';

// <>
import { LinearGradient } from 'expo-linear-gradient';

import { Platform, TouchableOpacity, TextInput, Image, ScrollView, View, Text, StyleSheet } from 'react-native';
import { InfoIcon, TanPostitIcon, EmergencyIcon, HeartIcon } from '@/constants/Images';

import { grayphite } from '@/constants/Colors';

// INSERT INTO ballots (id, day_id, started_by_id, title, type, start_datetime, end_datetime, show_results_during, edit_results_during, is_active, options)
// VALUES (2, 2, 2, 'new thought new me' 'joinday-newthought', '', '', true, true, true, ARRAY['painting', 'kayaking', 'COD/L4D2', 'weed/food']);

// 🚨 EDIT/writeContent deals with: resolver:{submitJoinDayWriteContentAndUpdateBallot} ContentFunctions:submitJoinDayWriteContentAndUpdateBallotStringFunc

interface props {
    day: any;
    setDay: any;
    showVoteFinishedMenu: any;
    setShowVoteFinishedMenu: any;
}

const VoteFinishedMenu: React.FC<props> = ({ day, setDay, showVoteFinishedMenu, setShowVoteFinishedMenu }) => {
    const [showCommentVoteTypeMenu, setShowCommentVoteTypeMenu] = useState(false);
    const [showEditContentVoteTypeMenu, setShowEditContentVoteTypeMenu] = useState(false);

    return (
        <View style={styles.columnCont}>
            <View style={styles.uploadSettingsRow}>
                <View style={styles.slightSplitRow}>
                    {/* dodgerblue, #6ad0f8 */}

                    <LinearGradient
                        colors={['dodgerblue', '#6ad0f8']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{
                            height: 15,
                            width: 15,
                            marginHorizontal: 2,
                            transform: [{ rotate: '25deg' }],
                            borderWidth: 2,
                            borderColor: '#9dcee1',
                            shadowColor: '#4a4a4a',
                            shadowOffset: { width: 2, height: 2 },
                            shadowOpacity: 0.5,
                            shadowRadius: 2,
                        }}
                    />

                    <Text style={styles.settingsRowText}> VOTE FINISHED </Text>
                </View>

                <Text style={styles.settingsRowText}> &darr; </Text>
            </View>

            {showVoteFinishedMenu && (
                <View style={styles.columnCont}>
                    {/* 
                    user went with update,
                    custom_decision user & message
                    showResults with the <VoteDisplay/> sort of <> just the (17) $grayphite VOTES.length
                */}
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
        padding: 10,
    },
    columnCont: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 5,
        padding: 10,
    },
    uploadSettingsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
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

export default VoteFinishedMenu;
