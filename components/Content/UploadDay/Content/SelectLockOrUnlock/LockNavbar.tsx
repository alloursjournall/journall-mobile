import { useState } from 'react';
import { Platform, Dimensions, Image, ScrollView, TouchableOpacity, View, Text, TextInput, StyleSheet } from 'react-native';

// utils:
import { ThoughtsIcon, MomentsIcon, FieldsIcon, GreatfullIcon, LockIcon, UnlockIcon, RedBackArrowIcon, BallotIcon, CommentIcon } from '@/constants/Images';

import { grayphite, hothazel } from '@/constants/Colors';
import { specifyStringTruncate } from '@/utility/utilityValues';

interface props {
    lockOptionSelected: any;
    setLockOptionSelected: any;
    uploadDaySelection: any;
    setUploadDaySelection: any;
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const LockNavbar: React.FC<props> = ({ lockOptionSelected, setLockOptionSelected, uploadDaySelection, setUploadDaySelection }) => {
    const uploadDaySelectionFunc = (selection: string) => {
        if (uploadDaySelection === selection) {
            setUploadDaySelection('');
        } else {
            setUploadDaySelection(selection);
        }
    };

    const lockOptionSelectedFunc = (selection: string) => {
        if (lockOptionSelected === selection) {
            setLockOptionSelected('');
        } else {
            setLockOptionSelected(selection);
        }
    };

    return (
        <View style={[{ top: Platform.OS === 'web' ? 5 : 20, height: Platform.OS === 'web' ? 50 : 100 }, styles.row]}>
            {/* <TouchableOpacity onPress={() => uploadDaySelectionFunc('')}>
                <Image style={ {height: 20, width: 20}} source={RedBackArrowIcon} />
            </TouchableOpacity> */}

            {uploadDaySelection !== 'unlock' && (
                <TouchableOpacity onPress={() => uploadDaySelectionFunc('lock')}>
                    <Image style={styles.icon} source={LockIcon} />
                    {/* <Image style={[{ opacity: uploadDaySelection === 'unlock' ? 0.5 : 1.0 }, styles.icon]} source={LockIcon} /> */}
                </TouchableOpacity>
            )}

            <TouchableOpacity onPress={() => lockOptionSelectedFunc('thoughts')}>
                <Image style={styles.icon} source={ThoughtsIcon} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => lockOptionSelectedFunc('moments')}>
                <Image style={styles.icon} source={MomentsIcon} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => lockOptionSelectedFunc('fields')}>
                <Image style={styles.icon} source={FieldsIcon} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => lockOptionSelectedFunc('greatfull')}>
                <Image style={styles.icon} source={GreatfullIcon} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => lockOptionSelectedFunc('comments')}>
                <Image style={styles.icon} source={CommentIcon} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => lockOptionSelectedFunc('votes')}>
                <Image style={styles.icon} source={BallotIcon} />
            </TouchableOpacity>

            {
                <TouchableOpacity onPress={() => uploadDaySelectionFunc('unlock')}>
                    <Image style={[{ opacity: uploadDaySelection === 'lock' ? 0.5 : 1.0 }, styles.icon]} source={UnlockIcon} />
                    {/* <Image style={styles.icon} source={UnlockIcon} /> */}
                </TouchableOpacity>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginTop: 5,
        gap: screenWidth / 30,
    },
    icon: {
        height: 35,
        width: 35,
    },
});

export default LockNavbar;
