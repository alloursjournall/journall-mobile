import axios from 'axios'
import { useState, useEffect, useRef } from "react";

// redux
import { RootState } from "@/redux/store/rootReducer"
import { useSelector, useDispatch, createDispatchHook } from "react-redux"

import { Dimensions, TouchableOpacity, TextInput, Image, ScrollView, View, Text, StyleSheet } from 'react-native';
import { appBackground } from "@/constants/Colors";

// utils:
import { } from "@/graphql/queries";
import { useContentFunction } from '@/Contexts/ContentFunctions';
import {
    ShurikenIcon, PlainMsgButtonIcon, EyesIcon, SoundWaveIcon, SoundIcon, TrashIcon,
    ThoughtsIcon, MomentsIcon, FieldsIcon, GreatfullIcon
} from '@/constants/Images';

import { grayphite } from '@/constants/Colors';
import { specifyStringTruncate } from '@/utility/utilityValues';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

interface props {
    editDay: any,
}
const audioRecorderPlayer = new AudioRecorderPlayer();

const ThoughtsMapContEdit: React.FC<props> = ({
    editDay,
}) => {



    const dayThoughts = editDay?.thoughts || null;
    const soundthoughts = dayThoughts?.soundthoughts;
    const [showTextInputAll, setShowTextInputAll] = useState<any>(Array?.from({ length: dayThoughts?.length || 0 })?.fill(false))
    const [playing, setPlaying] = useState(false);

    const { startPlayingSound, startPlayingSoundWithUrlAlready } = useContentFunction();

    const showTextInputAllHandler = (showAll: boolean, index: number) => {
        let showTextInputAllClone = [...showTextInputAll]
        if (showAll === true) {
            showTextInputAllClone[index] = true;
        } else if (showAll === false) {
            showTextInputAllClone[index] = false;
        }
        setShowTextInputAll(showTextInputAllClone)
    }

    const startPlayingFunc = (mapitem:any) => {        
        startPlayingSoundWithUrlAlready(audioRecorderPlayer, setPlaying, mapitem?.blob?.url)        
    }

    const startEditing = () => {
        console.log('hey');
    }

    return (
        <ScrollView contentContainerStyle={styles.thoughtsMapCont}>
            {
                editDay?.thoughts?.map((mapitem: any, index: number) => {
                    return (

                        mapitem?.is_voice === true
                            ?
                            <TouchableOpacity onPress={() => startPlayingFunc(mapitem)}>
                            <Image style={styles.icon} source={SoundIcon} />
                            </TouchableOpacity>
                            :
                            // showTextInputAll[index]
                            //     ?

                                <ScrollView contentContainerStyle={styles.textCont}>
                                {/* <TouchableOpacity onPress={() => showTextInputAllHandler(false, index)}> */}
                                <TouchableOpacity onPress={startEditing}>
                                    <Text style={styles.text}> {mapitem?.text} </Text>
                                </TouchableOpacity>
                                </ScrollView>

                                // :
                                // <TouchableOpacity onPress={() => showTextInputAllHandler(true, index)}>
                                // </TouchableOpacity>
                    )
                })
            }
        </ScrollView>
    )
}

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
    textCont: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        height: '100%',
        width: '100%',
        overflowY: 'auto',
    },
    text: {
        fontFamily: 'Fuzzy Bubbles',
        fontSize: 16
    },
    icon: {
        height: 50,
        width: 50,
    }
})

export default ThoughtsMapContEdit;