// <>
import { Dimensions, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import GreatfullLockMini from './GreatfullLockMini';

// redux
import { RootState } from '@/redux/store/rootReducer';
import { useSelector, useDispatch } from 'react-redux';

// utils:
import { grayphite } from '@/constants/Colors';

interface ThreeWordsOfTheDayProps {
    day: any;
    words: any; // string[]
    usersPassLocks: any;
    setUsersPassLocks: any;
    showDoDiffDoOver: any;
    setShowDoDiffDoOver: any;
}

const ThreeWordsOfTheDay: React.FC<ThreeWordsOfTheDayProps> = ({ day, words, usersPassLocks, setUsersPassLocks, showDoDiffDoOver, setShowDoDiffDoOver }) => {
    const greatfull = day?.greatfullagain || null;
    const noLock = !greatfull?.lock;
    const greatfullLock = greatfull?.lock || null;
    const greatfullLockIndex = greatfullLock?.split('-').pop();
    const greatfullLockText = (greatfullLock && greatfullLock?.split('-')?.slice(0, -1)?.join('-')) || null;

    console.log('noLock', noLock);

    const CURRENT_USER = useSelector((state: RootState) => state.currentUser.CURRENT_USER);

    return (
        <View style={styles.threeWordsRowCont}>
            {Array.isArray(words) &&
                words?.map((word: string, index: number) => {
                    const threeWordsIndexLOCKisUNLOCKED =
                        greatfullLock &&
                        greatfullLock?.includes('threeWordsIndex') &&
                        parseInt(greatfullLockIndex) === index &&
                        usersPassLocks?.some(
                            (lockPass: any) =>
                                lockPass?.day_id === day?.id &&
                                (lockPass?.pass_greatfull_all === true || (lockPass?.pass_greatfull === true && lockPass?.user_id === CURRENT_USER?.id)),
                        );

                    const threeWordsIndexLockNotRelevant = greatfullLock && (!greatfullLock?.includes('threeWordsIndex') || parseInt(greatfullLockIndex) !== index);
                    const threeWordsIndexLockRelevantAndUnlocked =
                        greatfullLockText?.includes('threeWordsIndex') && parseInt(greatfullLockIndex) === index && threeWordsIndexLOCKisUNLOCKED;
                    const threeWordsIndexLOCKshouldShowContent = greatfull?.id > 0 && (noLock || threeWordsIndexLockNotRelevant || threeWordsIndexLockRelevantAndUnlocked);

                    return threeWordsIndexLOCKshouldShowContent ? (
                        <Text key={`text${index}`} style={styles.text}>
                            {' '}
                            {word}{' '}
                        </Text>
                    ) : (
                        <GreatfullLockMini key={`greatfullLockMini${index}`} unlockText={greatfull?.unlock || 'unlock'} />
                    );
                })}
        </View>
    );
};

const styles = StyleSheet.create({
    threeWordsRowCont: {
        flexDirection: 'row',
        height: 25,
        width: '100%',
        gap: 20,
        fontFamily: 'Fuzzy Bubbles',
        color: grayphite,
        justifyContent: 'flex-end',
        alignItems: 'center',
        // boxSizing: 'border-box',
    },
    text: {
        fontSize: 20,
        fontFamily: 'FuzzyBubbles',
    },
});

export default ThreeWordsOfTheDay;
