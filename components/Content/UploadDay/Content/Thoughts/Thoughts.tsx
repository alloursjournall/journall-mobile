import { useState } from "react";

import { Dimensions, ScrollView, View, Text, StyleSheet } from 'react-native';
import ThoughtsMapCont from './ThoughtsMapCont';
import TextOrAudioBar from './TextOrAudioBar';

// utils:
import { } from "@/graphql/queries";


interface props {
    day: any,
    setDay: any,
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Thoughts: React.FC<props> = ({
    day,
    setDay
}) => {

    const dayThoughts = day?.thoughts
    const [textInput, setTextInput] = useState<any>('');    
    const [blob, setBlob] = useState<any>(null);

    const [contentOrSettings, setContentOrSettings] = useState<string>('content');

    return (
        <View style={styles.thoughtsCont}>
            <TextOrAudioBar
                day={day}
                setDay={setDay}
                textInput={textInput}
                setTextInput={setTextInput}
                blob={blob}
                setBlob={setBlob}
            />

            <ScrollView contentContainerStyle={styles.textCont}>
                <Text style={styles.text}> {textInput} </Text>
            </ScrollView>

            <ThoughtsMapCont day={day} />

        </View>
    )
}

const styles = StyleSheet.create({
    thoughtsCont: {
        flexDirection: 'column',
        gap: 10,
        margin: 0,
        padding: 0,
    },    
    textCont: {
        width: screenWidth,
        // overflowY: 'auto',
        padding: 5,

    },
    text: {
        fontFamily: 'Fuzzy Bubbles',
        fontSize: 16
    },
    icon: {
        height: 85,
        width: 85,
    }
})

export default Thoughts;