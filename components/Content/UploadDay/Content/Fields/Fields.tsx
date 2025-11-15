import { useState } from 'react';

import { Dimensions, ScrollView, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import FieldConstantseeDecideBar from './FieldConstantseeDecideBar';
import FieldIndex from './FieldIndex';

// utils:

interface props {
    day: any;
    setDay: any;
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

// caption up to 300 words but then if the user "see more" it hides the photo!!!

const Fields: React.FC<props> = ({ day, setDay }) => {
    const [fieldsBinIndex, setFieldsBinIndex] = useState<any>(0);

    const test = () => {};

    return (
        <View style={styles.momentsCont}>
            <FieldConstantseeDecideBar day={day} setDay={setDay} fieldsBinIndex={fieldsBinIndex} setFieldsBinIndex={setFieldsBinIndex} />

            <FieldIndex day={day} setDay={setDay} fieldsBinIndex={fieldsBinIndex} />
        </View>
    );
};

const styles = StyleSheet.create({
    momentsCont: {
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
        fontSize: 16,
    },
    icon: {
        height: 85,
        width: 85,
    },
});

export default Fields;
