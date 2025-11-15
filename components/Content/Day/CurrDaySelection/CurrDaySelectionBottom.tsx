import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { CommentIcon, BallotIcon, GreenForwardArrowIcon, RedBackArrowIcon } from '@/constants/Images';

interface CurrDaySelectionProps {
    currDaySelection: string; // Replace `string` with the appropriate type for `currDaySelection`
    setCurrDaySelection: any;
    userIsActivelySelecting: boolean;
    setUserIsActivelySelecting: any;
    day: any;
}

const CurrDaySelectionBottom: React.FC<CurrDaySelectionProps> = ({ currDaySelection, setCurrDaySelection, userIsActivelySelecting, setUserIsActivelySelecting, day }) => {
    const changeCurrDaySelectionClick = (newSelection: string) => {
        console.log('newSelection', newSelection);
        if (newSelection === 'comments') {
            const thoughts = day?.thoughts;
            if (!thoughts?.some((t: any) => t?.thought?.length)) {
                // possibly delete the button?
                // return;
            }
            if (currDaySelection === 'comments') {
                if (day?.thoughts) {
                    setCurrDaySelection('thoughts');
                }
                if (day?.moments) {
                    setCurrDaySelection('moments');
                }
                if (day?.fields) {
                    setCurrDaySelection('fields');
                }
                if (day?.greatfull) {
                    setCurrDaySelection('greatfull');
                }
            } else {
                setCurrDaySelection(newSelection);
            }
        }
        if (newSelection === 'ballots') {
            if (!Array.isArray(day?.ballots) && !day?.ballots?.length) {
                return;
            }
            if (currDaySelection === 'ballots') {
                if (day?.thoughts) {
                    setCurrDaySelection('thoughts');
                }
                if (day?.moments) {
                    setCurrDaySelection('moments');
                }
                if (day?.fields) {
                    setCurrDaySelection('fields');
                }
                if (day?.greatfull) {
                    setCurrDaySelection('greatfull');
                }
            } else {
                setCurrDaySelection(newSelection);
            }
        }
    };

    const toggleUserIsActivelySelecting = () => {
        // false so <CurrDaySelectionBottom/> is removed from display
        // also currDaySelection is set to existing sections of the post so the user is not stuck without the <CurrDaySelection/> menu if they're on votes or comments
        setUserIsActivelySelecting(false);
        if (day?.thoughts) {
            setCurrDaySelection('thoughts');
            return;
        }
        if (day?.moments) {
            setCurrDaySelection('moments');
            return;
        }
        if (day?.fields) {
            setCurrDaySelection('fields');
            return;
        }
        if (day?.greatfull) {
            setCurrDaySelection('greatfull');
            return;
        }
    };

    return (
        <View style={styles.actions}>
            {
                // if ballots or comments exists and no other type of post exists then set the post to show votes/comments without having to click [th,moments,fields,gr8full]
                // day?.ballots?.some((b: any) => b?.id) ||
                //     (day?.thoughts?.some((th: any) => th?.thought?.length) && !day?.thoughts?.id && !day?.moments?.id && !day?.fields?.id && !day?.greatfullagain?.id) ||
                //     // OR if any type of post also \exists show the button.
                //     day?.thoughts?.id ||
                //     day?.moments?.id ||
                //     day?.fields?.id ||
                //     (day?.greatfullagain?.id && (
                <TouchableOpacity onPress={toggleUserIsActivelySelecting}>
                    <Image source={RedBackArrowIcon} style={[styles.currDaySelectionButton, { transform: [{ translateY: 5 }], left: 20 }]} />
                </TouchableOpacity>
                // ))z
            }

            {/* <View style={styles.actions}> */}
            <TouchableOpacity onPress={() => changeCurrDaySelectionClick('ballots')} style={styles.actionButton}>
                <Image source={BallotIcon} style={[styles.currDaySelectionButton, { transform: [{ translateY: 5 }] }]} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => changeCurrDaySelectionClick('comments')} style={styles.actionButton}>
                <Image source={CommentIcon} style={[styles.currDaySelectionButton, { transform: [{ translateY: 5 }] }]} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    currDaySelectionButton: {
        width: 25,
        height: 25,
        borderRadius: 25,
        // marginRight: 8,
        // transform: "translateY: 5"
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        // padding: 2,
        width: '100%',
        height: 10,
    },
    actionButton: {
        marginRight: 16,
    },
});

export default CurrDaySelectionBottom;
