import { useState } from 'react';

// redux
import { RootState } from '@/redux/store/rootReducer';
import { useSelector, useDispatch } from 'react-redux';

// <>
import { Dimensions, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import DoDiffDoOver from './DoDiffDoOver';
import ThreeWordsOfTheDay from './ThreeWordsOfTheDay';
import QuestionConcernCriticism from './QuestionConcernCriticism';
import GreatfullWords from './GreatfullWords';
import GreatfullLockMini from './GreatfullLockMini';

// utils:
import { grayphite } from '@/constants/Colors';

interface GreatfullProps {
    day: any;
    usersPassLocks: any;
    setUsersPassLocks: any;
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Greatfull: React.FC<GreatfullProps> = ({ day, usersPassLocks, setUsersPassLocks }) => {
    const greatfull = day?.greatfullagain || null;
    const greatfullLock = greatfull?.lock || null;
    const threeWords = greatfull?.words || null;

    const [showDoDiffDoOver, setShowDoDiffDoOver] = useState<boolean>(false);

    const CURRENT_USER = useSelector((state: RootState) => state.currentUser.CURRENT_USER);

    const noLock = !greatfullLock;

    const allThreeWordsLOCKisUNLOCKED =
        greatfullLock &&
        greatfullLock === 'allThreeWords' &&
        usersPassLocks?.some(
            (lockPass: any) =>
                lockPass?.day_id === day?.id && (lockPass?.pass_greatfull_all === true || (lockPass?.pass_greatfull === true && lockPass?.user_id === CURRENT_USER?.id)),
        );

    const allThreeWordsLockNotRelevant = greatfullLock && greatfullLock !== 'allThreeWords';
    const allThreeWordsLockRelevantAndUnlocked = greatfull && greatfullLock === 'allThreeWords' && allThreeWordsLOCKisUNLOCKED;
    const allThreeWordsLOCKshouldShowContent = greatfull?.id > 0 && (noLock || allThreeWordsLockNotRelevant || allThreeWordsLockRelevantAndUnlocked);

    console.log('allThreeWordsLOCKshouldShowContent', allThreeWordsLOCKshouldShowContent);
    // locks belong to moments.lock && checks for such not pass_post

    const allZoomLOCKisUNLOCKED =
        greatfullLock &&
        greatfullLock === 'allZoom' &&
        usersPassLocks?.some(
            (lockPass: any) =>
                lockPass?.day_id === day?.id && (lockPass?.pass_greatfull_all === true || (lockPass?.pass_greatfull === true && lockPass?.user_id === CURRENT_USER?.id)),
        );

    const allZoomLockNotRelevant = greatfullLock && greatfullLock !== 'allZoom';
    const allZoomLockRelevantAndUnlocked = greatfull && greatfullLock === 'allZoom' && allZoomLOCKisUNLOCKED;
    const allZoomLOCKshouldShowContent = greatfull?.id > 0 && (noLock || allZoomLockNotRelevant || allZoomLockRelevantAndUnlocked);

    const cqcLOCKisUNLOCKED =
        greatfullLock &&
        greatfullLock === 'cqc' &&
        usersPassLocks?.some(
            (lockPass: any) =>
                lockPass?.day_id === day?.id && (lockPass?.pass_greatfull_all === true || (lockPass?.pass_greatfull === true && lockPass?.user_id === CURRENT_USER?.id)),
        );

    const cqcLockNotRelevant = greatfullLock && greatfullLock !== 'cqc';
    const allcqcLockRelevantAndUnlocked = greatfull && greatfullLock === 'cqc' && cqcLOCKisUNLOCKED;
    const allcqcLOCKshouldShowContent = greatfull?.id > 0 && (noLock || cqcLockNotRelevant || allcqcLockRelevantAndUnlocked);

    const allGreatfullLOCKisUNLOCKED =
        greatfullLock &&
        greatfullLock === 'allGreatfull' &&
        usersPassLocks?.some(
            (lockPass: any) =>
                lockPass?.day_id === day?.id && (lockPass?.pass_greatfull_all === true || (lockPass?.pass_greatfull === true && lockPass?.user_id === CURRENT_USER?.id)),
        );

    const allGreatfullLockNotRelevant = greatfullLock && greatfullLock !== 'allGreatfull';
    const allGreatfullLockRelevantAndUnlocked = greatfull && greatfullLock === 'allGreatfull' && allGreatfullLOCKisUNLOCKED;
    const allGreatfullLOCKshouldShowContent = greatfull?.id > 0 && (noLock || allGreatfullLockNotRelevant || allGreatfullLockRelevantAndUnlocked);

    const showDoDiffDoOverToggle = () => {
        setShowDoDiffDoOver(!showDoDiffDoOver);
    };

    return showDoDiffDoOver ? (
        <View style={styles.greatfullContCenter}>
            {allZoomLOCKshouldShowContent ? (
                <DoDiffDoOver day={day} usersPassLocks={usersPassLocks} setShowDoDiffDoOver={setShowDoDiffDoOver} />
            ) : (
                <GreatfullLockMini unlockText={greatfull?.unlock || 'unlock'} />
            )}
        </View>
    ) : (
        <View style={styles.greatfullCont}>
            <View style={styles.threeWordsRow}>
                <TouchableOpacity onPress={showDoDiffDoOverToggle}>
                    <Text style={styles.thoughtText}> &lt; </Text>
                </TouchableOpacity>

                {allThreeWordsLOCKshouldShowContent ? (
                    <ThreeWordsOfTheDay
                        day={day}
                        words={threeWords}
                        usersPassLocks={usersPassLocks}
                        setUsersPassLocks={setUsersPassLocks}
                        showDoDiffDoOver={showDoDiffDoOver}
                        setShowDoDiffDoOver={setShowDoDiffDoOver}
                    />
                ) : (
                    <GreatfullLockMini unlockText={greatfull?.unlock || 'unlock'} />
                )}
            </View>

            {allcqcLOCKshouldShowContent ? <QuestionConcernCriticism greatfull={greatfull} /> : <GreatfullLockMini unlockText={greatfull?.unlock || 'unlock'} />}

            {allGreatfullLOCKshouldShowContent ? (
                <GreatfullWords day={day} greatfull={greatfull} usersPassLocks={usersPassLocks} setUsersPassLocks={setUsersPassLocks} />
            ) : (
                <GreatfullLockMini unlockText={greatfull?.unlock || 'unlock'} />
            )}

            {/* <Text> greatfull </Text> */}
        </View>
    );
};

const styles = StyleSheet.create({
    greatfullCont: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '100%',
        // height: screenHeight * 0.4, // Ensure it matches the height of the image
        width: '100%', // Ensure it takes full width
        // borderColor: grayphite,
        // borderWidth: 3,
        padding: 10, // Add some padding to avoid content touching the edges
        gap: 10,
    },
    greatfullContCenter: {
        alignItems: 'center',
        justifyContent: 'center',
        height: screenHeight * 0.4, // Ensure it matches the height of the image
        width: '100%', // Ensure it takes full width
        borderColor: grayphite,
        borderWidth: 3,
        padding: 10, // Add some padding to avoid content touching the edges
        gap: 10,
    },
    thoughtsTopCont: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: 50, // Set a height for the header
    },
    thoughtText: {
        fontSize: 20,
    },
    threeWordsRow: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 0,
        paddingLeft: 20,
        paddingRight: 20,
        // overflowX: 'scroll',

        // boxSizing: 'border-box',
        // borderColor: 'blue',
        // borderWidth: 3
    },

    centerCont: {
        flex: 1, // Allow this to take remaining space
        justifyContent: 'center', // Center the content vertically
        alignItems: 'center',
    },
    thoughtsBottomCont: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 2.5,
    },
    changeThoughtButton: {
        fontSize: 20,
    },
    actionButton: {
        marginRight: 16,
    },
    buttonIcon: {
        height: 25,
        width: 25,
    },

    // SoundThought:
    soundRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // gap: 5
    },
    backBtn: {
        height: 25,
        width: 25,
    },
    soundWave: {
        height: 150,
        width: 150,
    },
});

export default Greatfull;
