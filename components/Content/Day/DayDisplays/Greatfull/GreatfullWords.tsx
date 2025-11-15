// redux
import { RootState } from '@/redux/store/rootReducer';
import { useSelector, useDispatch } from 'react-redux';

// <>
import { Dimensions, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import ThreeWordsOfTheDay from './ThreeWordsOfTheDay';
import GreatfullLockMini from './GreatfullLockMini';
import QuestionConcernCriticism from './QuestionConcernCriticism';

// utils:
import { DecideDoIcon } from '@/constants/Images';
import { grayphite } from '@/constants/Colors';

interface GreatfullWordsProps {
    day: any;
    greatfull: any;
    usersPassLocks: any;
    setUsersPassLocks: any;
}

const GreatfullWords: React.FC<GreatfullWordsProps> = ({ day, greatfull, usersPassLocks, setUsersPassLocks }) => {
    const greatfullWords = (Array.isArray(greatfull?.greatfull) && greatfull?.greatfull) || null;

    const noLock = !greatfull?.lock;
    const greatfullLock = greatfull?.lock || null;
    const greatfullLockIndex = greatfullLock?.split('-').pop();
    const greatfullLockText = (greatfullLock && greatfullLock?.split('-')?.slice(0, -1)?.join('-')) || null;

    const CURRENT_USER = useSelector((state: RootState) => state.currentUser.CURRENT_USER);

    return (
        <View style={styles.greatfullWordsCont}>
            {greatfullWords.map((mapitem: any, index: number) => {
                const greatfullWordsIndexLOCKisUNLOCKED =
                    greatfullLock &&
                    greatfullLock?.includes('greatfullWordsIndex') &&
                    parseInt(greatfullLockIndex) === index &&
                    usersPassLocks?.some(
                        (lockPass: any) =>
                            lockPass?.day_id === day?.id &&
                            (lockPass?.pass_greatfull_all === true || (lockPass?.pass_greatfull === true && lockPass?.user_id === CURRENT_USER?.id)),
                    );

                const greatfullWordsIndexLockNotRelevant = greatfullLock && (!greatfullLock?.includes('greatfullWordsIndex') || parseInt(greatfullLockIndex) !== index);
                const greatfullWordsIndexLockRelevantAndUnlocked =
                    greatfullLockText?.includes('greatfullWordsIndex') && parseInt(greatfullLockIndex) === index && greatfullWordsIndexLOCKisUNLOCKED;
                const greatfullWordsIndexLOCKshouldShowContent =
                    greatfull?.id > 0 && (noLock || greatfullWordsIndexLockNotRelevant || greatfullWordsIndexLockRelevantAndUnlocked);

                return greatfullWordsIndexLOCKshouldShowContent ? (
                    <View key={`container${index}`} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text
                            key={`mapitem${index}`}
                            style={[
                                styles.greatfullWordsText,
                                {
                                    color: greatfull?.greatfull_cqc_link?.includes(mapitem) ? '#D86220' : undefined,
                                    fontSize: 18,
                                },
                            ]}
                        >
                            {mapitem}
                        </Text>

                        {greatfull?.decide_do_gratitude?.includes(mapitem) && <Image source={DecideDoIcon} key={`decideDo${index}`} style={styles.icons} />}
                    </View>
                ) : (
                    <GreatfullLockMini key={`greatfullLockMini${index}`} unlockText={greatfull?.unlock} />
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    greatfullWordsCont: {
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10,
        //         display: flex;
        //    flex-direction: column;
        //    // flex-direction: row;
        //    justify-content: center;
        //    align-items: center;
        //    width: 100%;
        //    height: 120px;
        //    margin-top: 0.75rem;
    },
    greatfullWordsRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
    greatfullWordsText: {
        fontSize: 20,
        textAlignVertical: 'center', // Ensures text is centered
    },
    icons: {
        height: 20,
        width: 20,
        left: 5,
    },
});

export default GreatfullWords;
