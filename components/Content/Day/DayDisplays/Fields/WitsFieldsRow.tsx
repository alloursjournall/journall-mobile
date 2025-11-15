// <>
import { useState } from 'react';
import { Dimensions, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import FieldsLockIconText from './FieldsLockIconText';

// utils:
import { RunningIcon, DecideDoIcon, LitFireIcon, ShoesIcon } from '@/constants/Images';
import { grayphite } from '@/constants/Colors';

interface WitsFieldsRowProps {
    day: any;
    usersPassLocks: any;
    setUsersPassLocks: any;
    fields: any;
    showLikeList: any;
    setShowLikeList: any;

    fieldLikes: any;
    setFieldLikes: any;

    allLikesLOCKshouldShowContent: any;
    seeLikesLOCKshouldShowContent: any;
    allWitsFieldsLOCKshouldShowContent: any;
    decideDoLOCKshouldShowContent: any;
    setCurrDaySelection: any;
    decideDoClick: boolean;
    setDecideDoClick: any;
    witsFieldsIndex: boolean;
    setWitsFieldsIndex: any;
    fieldsBinIndex: any;
    setFieldsBinIndex: any;
}

const WitsFieldsRow: React.FC<WitsFieldsRowProps> = ({
    day,
    usersPassLocks,
    setUsersPassLocks,
    fields,
    showLikeList,
    setShowLikeList,
    fieldLikes,
    setFieldLikes,
    allLikesLOCKshouldShowContent,
    seeLikesLOCKshouldShowContent,
    allWitsFieldsLOCKshouldShowContent,
    decideDoLOCKshouldShowContent,
    setCurrDaySelection,
    decideDoClick,
    setDecideDoClick,
    witsFieldsIndex,
    setWitsFieldsIndex,
    fieldsBinIndex,
    setFieldsBinIndex,
}) => {
    const [showWitsUsername, setShowWitsUsername] = useState(false);
    const fieldsBinLength = Array.isArray(fields?.fields) && fields?.fields?.length;

    const test = () => {};

    const incrementFieldsBin = () => {
        if (fieldsBinIndex === fieldsBinLength - 1) {
            setFieldsBinIndex(0);
        } else {
            setFieldsBinIndex(fieldsBinIndex + 1);
        }
    };

    const showLikesOrLikeList = () => {
        console.log('fieldLikes', fieldLikes);
        setShowLikeList(!showLikeList);
        if (witsFieldsIndex === true) {
            setWitsFieldsIndex(false);
        }
        if (decideDoClick === true) {
            setDecideDoClick(false);
        }
    };

    const decideDoToggleHandler = () => {
        console.log('day', day);
        console.log('day', day);
        let decideDo = day?.decidedo || null;
        if (decideDo[0]) {
            decideDo = decideDo[0];
            console.log('decideDo', decideDo);
            const decideDoId = decideDo?.id;
            if (decideDoId) {
                if (witsFieldsIndex === true) {
                    setWitsFieldsIndex(false);
                }
                if (showLikeList === true) {
                    setShowLikeList(false);
                }
                setDecideDoClick(!decideDoClick);
            }
            console.log('decideDoId', decideDoId);
        } else if (day?.decidedo) {
            const decideDoId = decideDo?.id;
            if (decideDoId) {
                if (witsFieldsIndex === true) {
                    setWitsFieldsIndex(false);
                }
                if (showLikeList === true) {
                    setShowLikeList(false);
                }
                setDecideDoClick(!decideDoClick);
            }
        }
    };

    const toggleShowWitsUsername = () => {
        setShowWitsUsername(!showWitsUsername);
    };

    return (
        <View style={styles.fieldsWitsRowCont}>
            <TouchableOpacity onPress={test} style={styles.actionButton}>
                {allWitsFieldsLOCKshouldShowContent ? (
                    // put her there young fella!
                    fields?.wits_username?.length >= 1 && (
                        <TouchableOpacity onPress={toggleShowWitsUsername} style={styles.witsFieldsUsernameRow}>
                            {showWitsUsername ? <Image source={ShoesIcon} style={styles.buttonIcon} /> : <Text style={styles.text}> {fields?.wits_username} </Text>}
                            {/* denormalize the id into the username. */}
                        </TouchableOpacity>
                    )
                ) : (
                    <FieldsLockIconText unlockText={fields?.unlock || 'unlock'} />
                )}
            </TouchableOpacity>

            {!showWitsUsername &&
                (allLikesLOCKshouldShowContent && seeLikesLOCKshouldShowContent ? (
                    <TouchableOpacity onPress={showLikesOrLikeList} style={styles.actionButton}>
                        <View style={[styles.witsFieldsUsernameRow, { gap: 0 }]}>
                            <Image source={LitFireIcon} style={styles.buttonIconMini} />
                            <Image source={LitFireIcon} style={styles.buttonIconMini} />
                            <Image source={LitFireIcon} style={styles.buttonIconMini} />
                        </View>
                    </TouchableOpacity>
                ) : (
                    <FieldsLockIconText unlockText={fields?.unlock || 'unlock'} />
                ))}

            <TouchableOpacity onPress={incrementFieldsBin} style={styles.actionButton}>
                <Text style={styles.text}> &rarr; </Text>
            </TouchableOpacity>

            {!showWitsUsername && decideDoLOCKshouldShowContent ? (
                <TouchableOpacity onPress={decideDoToggleHandler} style={styles.actionButton}>
                    <TouchableOpacity onPress={decideDoToggleHandler}>
                        <Image source={DecideDoIcon} style={styles.buttonIcon} />
                    </TouchableOpacity>
                </TouchableOpacity>
            ) : (
                <FieldsLockIconText unlockText={fields?.unlock || 'unlock'} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    fieldsWitsRowCont: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        // boxSizing: 'border-box',
    },
    witsFieldsUsernameRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    likeListCont: {},

    actionButton: {
        marginRight: 16,
        padding: 10,
    },
    buttonIcon: {
        height: 25,
        width: 25,
    },
    buttonIconMini: {
        height: 15,
        width: 15,
    },
    text: {
        fontFamily: 'Nunito Sans',
        fontSize: 50,
    },
    textSmall: {
        fontFamily: 'Nunito Sans',
        fontSize: 17,
    },
});

export default WitsFieldsRow;
