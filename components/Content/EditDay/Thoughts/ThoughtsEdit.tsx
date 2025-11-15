import { useState } from 'react';

import { Dimensions, ScrollView, View, Text, StyleSheet } from 'react-native';
import TextOrAudioBarEdit from './TextOrAudioBarEdit';
import ThoughtsMapContEdit from './ThoughtsMapContEdit';
import ThoughtsIndexEdit from './ThoughtsIndexEdit';
// import ThoughtsMapCont from './ThoughtsMapCont';
// import TextOrAudioBar from './TextOrAudioBar';

// utils:
import {} from '@/graphql/queries';

interface props {
    editDay: any;
    setEditDay: any;
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const ThoughtsEdit: React.FC<props> = ({ editDay, setEditDay }) => {
    const dayThoughts = editDay?.thoughts;
    console.log('dayThoughts thoughtsEdit', dayThoughts);

    const [textInput, setTextInput] = useState<any>('');
    const [blob, setBlob] = useState<any>(null);
    const [mediaDeleteError, setMediaDeleteError] = useState<boolean>(false);

    const [thoughtsBinIndex, setThoughtsBinIndex] = useState<number>(0);
    const [contentOrSettings, setContentOrSettings] = useState<string>('content');

    return (
        <View style={styles.thoughtsCont}>
            <TextOrAudioBarEdit
                editDay={editDay}
                setEditDay={setEditDay}
                textInput={textInput}
                setTextInput={setTextInput}
                blob={blob}
                setBlob={setBlob}
                thoughtsBinIndex={thoughtsBinIndex}
                setThoughtsBinIndex={setThoughtsBinIndex}
                mediaDeleteError={mediaDeleteError}
                setMediaDeleteError={setMediaDeleteError}
            />

            <ScrollView contentContainerStyle={styles.textCont}>
                <Text style={styles.text}> {textInput} </Text>
            </ScrollView>

            {/* ThoughtsIndex instead of MomentsIndex */}

            <ThoughtsIndexEdit editDay={editDay} thoughtsBinIndex={thoughtsBinIndex} mediaDeleteError={mediaDeleteError} setMediaDeleteError={setMediaDeleteError} />
            {/* <ThoughtsMapContEdit editDay={editDay} /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    thoughtsCont: {
        flexDirection: 'column',
        gap: 10,
        margin: 0,
        padding: 0,
    },
    textCont: {
        width: screenWidth,
        padding: 5,
    },
    text: {
        fontFamily: 'Fuzzy Bubbles',
        fontSize: 16,
    },
    icon: {
        height: 85,
        width: 85,
    },
});

export default ThoughtsEdit;
