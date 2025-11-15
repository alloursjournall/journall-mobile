import axios from 'axios';
import { useState, useEffect, useRef } from 'react';

// redux
import { RootState } from '@/redux/store/rootReducer';
import { useSelector, useDispatch, createDispatchHook } from 'react-redux';

import { Dimensions, TouchableOpacity, TextInput, Image, ScrollView, View, Text, StyleSheet } from 'react-native';
import { appBackground } from '@/constants/Colors';

// utils:
import {} from '@/graphql/queries';
import { useContentFunction } from '@/Contexts/ContentFunctions';
import { ShurikenIcon, PlainMsgButtonIcon, EyesIcon, SoundWaveIcon, SoundIcon, TrashIcon, ThoughtsIcon, MomentsIcon, FieldsIcon, GreatfullIcon } from '@/constants/Images';

import { grayphite } from '@/constants/Colors';
import { specifyStringTruncate } from '@/utility/utilityValues';
// import AudioRecorderPlayer from 'react-native-audio-recorder-player';
// const audioRecorderPlayer = new AudioRecorderPlayer();

interface props {
    day: any;
}
const ThoughtsMapCont: React.FC<props> = ({ day }) => {
    const dayThoughts = day?.thoughts || null;
    const [showTextInputAll, setShowTextInputAll] = useState<any>(Array.from({ length: dayThoughts?.length || 0 }).fill(false));
    const [playing, setPlaying] = useState(false);

    const { startPlayingRecordedSound } = useContentFunction();

    const showTextInputAllHandler = (showAll: boolean, index: number) => {
        let showTextInputAllClone = [...showTextInputAll];
        if (showAll === true) {
            showTextInputAllClone[index] = true;
        } else if (showAll === false) {
            showTextInputAllClone[index] = false;
        }
        setShowTextInputAll(showTextInputAllClone);
    };

    const startPlayingFunc = (blob: any) => {
        // startPlayingRecordedSound: (audioRecorderPlayer:any, setPlaying: any, soundCommentFile: any) => any;
        startPlayingRecordedSound(blob);
    };

    return (
        <ScrollView contentContainerStyle={styles.thoughtsMapCont}>
            {day?.thoughts?.map((mapitem: any, index: number) => {
                return mapitem?.is_voice === true ? (
                    <TouchableOpacity key={`cont${index}`} onPress={() => startPlayingFunc(mapitem?.blob)}>
                        <Image key={`image${index}`} style={styles.icon} source={SoundIcon} />
                    </TouchableOpacity>
                ) : (
                    // showTextInputAll[index]
                    //     ?
                    <TouchableOpacity key={`cont2${index}`} onPress={() => showTextInputAllHandler(false, index)}>
                        <Text key={`text${index}`} style={styles.text}>
                            {' '}
                            {mapitem?.text}{' '}
                        </Text>
                    </TouchableOpacity>
                );
                // :
                // <TouchableOpacity onPress={() => showTextInputAllHandler(true, index)}>
                // </TouchableOpacity>
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    thoughtsMapCont: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '100%',
        gap: 20,
        margin: 0,
        padding: 10,
    },
    text: {
        fontFamily: 'Fuzzy Bubbles',
        fontSize: 16,
    },
    icon: {
        height: 50,
        width: 50,
    },
});

export default ThoughtsMapCont;
