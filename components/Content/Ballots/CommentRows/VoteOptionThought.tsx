// useState:
// import { useState, useRef } from 'react';

// redux
import { RootState } from '@/redux/store/rootReducer';
import { useSelector, useDispatch } from 'react-redux';

//  <>
import { Platform, Dimensions, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import { SoundWaveIcon } from '@/constants/Images';
import VoteOptionText from '../VoteRows/VoteOptionText';

interface VoteOptionThoughtProps {
    mapitem: any;
    currBallot: any;
    index: number;
    soundComments: any;
    day: any;
    usersPassLocks: any;
}

const VoteOptionThought: React.FC<VoteOptionThoughtProps> = ({ mapitem, currBallot, index, soundComments, day, usersPassLocks }) => {
    const playSoundComment = async (mapitem: any) => {
        console.log('mapitem', mapitem);
        console.log('soundComments', soundComments);
        try {
            // match {t.thought.thought} to soundComments?.thought?.Key
            // const soundPathMatch = soundComments?.find((s: any) => s?.thought?.Key === mapitem?.thought);
            // console.log('soundPathMatch', soundPathMatch);
            const soundPath = mapitem?.thought;
            if (!soundPath) return console.warn('No sound path in mapitem');

            // find the matching comment
            const match = soundComments.find((comment: any) => comment?.thought?.Key === soundPath);
            if (!match) return console.warn('No matching comment found');

            const fileUrl = match.blob; // CloudFront URL (public)

            if (Platform.OS === 'web') {
                // 💻 Web: use HTMLAudioElement
                const audio = new Audio(fileUrl);
                await audio.play();
                console.log('Playback started (web)');
            } else {
                // 📱 React Native: use Expo AV or similar library
                const { Audio } = await import('expo-av');
                const { sound } = await Audio.Sound.createAsync({ uri: fileUrl });
                await sound.playAsync();
                console.log('Playback started (native)');
            }
        } catch (error) {
            console.error('Playback error:', error);
        }
    };

    return mapitem?.thought.includes('/media') ? (
        // * * * * * this should maybe be dash: "-" return mapitem?.thought.includes('/media') ? (
        <TouchableOpacity onPress={() => playSoundComment(mapitem)}>
            <Image style={styles.icon} source={SoundWaveIcon} />
        </TouchableOpacity>
    ) : (
        <VoteOptionText index={index} mapitem={mapitem?.thought} currBallot={currBallot} day={day} event={null} usersPassLocks={usersPassLocks} />
    );
};

const styles = StyleSheet.create({
    icon: {
        height: 35,
        width: 35,
    },
});

export default VoteOptionThought;
