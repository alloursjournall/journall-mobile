import { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { ThoughtsIcon, LockIcon, UnlockIcon } from '@/constants/Images';

// redux
import { RootState } from '@/redux/store/rootReducer';
import { useSelector, useDispatch } from 'react-redux';

interface ConsideringOptionProps {
    usersPassLocks: any;
    currBallot: any;
    day: any; // could be dayOrEventId
}

const ConsideringOption: React.FC<ConsideringOptionProps> = ({
    usersPassLocks,
    day,
    currBallot, // * * * * * * webapp didn't have this. UI should have a feature that allows click which would be able to tell the user how to unlock.
}) => {
    // local state
    const [showUnlock, setShowUnlock] = useState(false);

    // global state:
    const CURRENT_USER = useSelector((state: RootState) => state.currentUser.CURRENT_USER);

    // toggle bool to display unlock ON/OFF:
    const showHowToUnlock = () => {
        setShowUnlock(!showUnlock);
    };

    // * * * * * * * * latency wise this logic is here instead of <CommentVoteRows> because what if there is no ballot.user_already_considering_option
    // * * * * * * * * then we have this code out there when there's no need for these variables to be defined.

    const ballotLock = currBallot?.lock;

    const noLock = !ballotLock;

    const consideringOptionLOCKisUNLOCKED =
        ballotLock === 'consideringOption' &&
        usersPassLocks?.some(
            (lockPass: any) =>
                lockPass?.day_id === day?.id && (lockPass?.pass_thoughts_all === true || (lockPass?.pass_thoughts === true && lockPass?.user_id === CURRENT_USER?.id)),
        );

    const consideringOptionLockNotRelevant = ballotLock && ballotLock !== 'consideringOption';
    const consideringOptionRelevantAndUnlocked = ballotLock && ballotLock === 'consideringOption' && consideringOptionLOCKisUNLOCKED;
    const consideringOptionLOCKshouldShowContent = currBallot?.id > 0 && (noLock || consideringOptionLockNotRelevant || consideringOptionRelevantAndUnlocked);

    return (
        // could
        consideringOptionLOCKshouldShowContent ? (
            <Image source={ThoughtsIcon} style={styles.icon} />
        ) : (
            <View>
                <TouchableOpacity onPress={showHowToUnlock}>
                    <Image source={showUnlock ? UnlockIcon : LockIcon} />
                </TouchableOpacity>

                {showUnlock && <Text> {currBallot?.unlock} </Text>}
            </View>
        )
    );
};

const styles = StyleSheet.create({
    icon: {
        height: 25,
        width: 25,
    },
});

export default ConsideringOption;
