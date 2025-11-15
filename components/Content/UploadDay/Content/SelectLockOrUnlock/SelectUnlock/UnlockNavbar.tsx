import { useState } from 'react';
import { Platform, Dimensions, Image, ScrollView, TouchableOpacity, View, Text, TextInput, StyleSheet } from 'react-native';

// utils:
import { ThoughtsIcon, MomentsIcon, FieldsIcon, GreatfullIcon, LockIcon, UnlockIcon, RedBackArrowIcon, BallotIcon, CommentIcon } from '@/constants/Images';

import { grayphite, hothazel } from '@/constants/Colors';
import { specifyStringTruncate } from '@/utility/utilityValues';

interface props {
    unlockOptionSelected: any;
    setUnlockOptionSelected: any;
    uploadDaySelection: any;
    setUploadDaySelection: any;
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const UnlockNavbar: React.FC<props> = ({ unlockOptionSelected, setUnlockOptionSelected, uploadDaySelection, setUploadDaySelection }) => {
    const uploadDaySelectionFunc = (selection: string) => {
        if (uploadDaySelection === selection) {
            setUploadDaySelection('');
        } else {
            setUploadDaySelection(selection);
        }
    };

    const unlockOptionSelectedFunc = (selection: string) => {
        if (unlockOptionSelected === selection) {
            setUnlockOptionSelected('');
        } else {
            setUnlockOptionSelected(selection);
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

            <TouchableOpacity onPress={() => unlockOptionSelectedFunc('thoughts')}>
                <Image style={styles.icon} source={ThoughtsIcon} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => unlockOptionSelectedFunc('moments')}>
                <Image style={styles.icon} source={MomentsIcon} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => unlockOptionSelectedFunc('fields')}>
                <Image style={styles.icon} source={FieldsIcon} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => unlockOptionSelectedFunc('greatfull')}>
                <Image style={styles.icon} source={GreatfullIcon} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => unlockOptionSelectedFunc('comments')}>
                <Image style={styles.icon} source={CommentIcon} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => unlockOptionSelectedFunc('votes')}>
                <Image style={styles.icon} source={BallotIcon} />
            </TouchableOpacity>

            {uploadDaySelection !== 'lock' && (
                <TouchableOpacity onPress={() => uploadDaySelectionFunc('unlock')}>
                    <Image style={styles.icon} source={UnlockIcon} />
                    {/* <Image style={[{ opacity: uploadDaySelection === 'lock' ? 0.5 : 1.0 }, styles.icon]} source={UnlockIcon} /> */}
                </TouchableOpacity>
            )}
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
        gap: screenWidth / 25,
    },
    icon: {
        height: 35,
        width: 35,
    },
});

export default UnlockNavbar;
