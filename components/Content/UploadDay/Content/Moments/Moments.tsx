import { useState } from 'react';
import { Dimensions, ScrollView, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import MomentsMapCont from '@/components/Content/UploadDay/Content/Moments/MomentsMapCont';
import MomentIndex from './MomentIndex';
// import ThoughtsMapCont from './ThoughtsMapCont';
import PhotoOrVideoBar from './PhotoOrVideoBar';

// utils:

interface props {
    day: any;
    setDay: any;
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

// caption up to 300 words but then if the user "see more" it hides the photo!!!

const Moments: React.FC<props> = ({ day, setDay }) => {
    const dayMoments = day?.moments;
    const [headerInput, setHeaderInput] = useState<any>('');
    const [captionInput, setCaptionInput] = useState<any>('');
    const [blob, setBlob] = useState<any>(null);
    const [blobURL, setBlobURL] = useState<any>(null);
    const [momentsBinIndex, setMomentsBinIndex] = useState<any>(0);

    const [contentOrSettings, setContentOrSettings] = useState<string>('content');

    const test = () => {
        console.log('day', day);
        console.log('blob', blob);
    };

    return (
        <View style={styles.momentsCont}>
            <PhotoOrVideoBar
                day={day}
                setDay={setDay}
                headerInput={headerInput}
                setHeaderInput={setHeaderInput}
                captionInput={captionInput}
                setCaptionInput={setCaptionInput}
                blob={blob}
                setBlob={setBlob}
                blobURL={blobURL}
                setBlobURL={setBlobURL}
                momentsBinIndex={momentsBinIndex}
                setMomentsBinIndex={setMomentsBinIndex}
            />

            <MomentIndex day={day} setDay={setDay} momentsBinIndex={momentsBinIndex} setMomentsBinIndex={setMomentsBinIndex} />

            {/* <MomentsMapCont
                day={day}
                moments={dayMoments}
                setDay={setDay}
                momentsBinIndex={momentsBinIndex}
                setMomentsBinIndex={setMomentsBinIndex}
            /> */}
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

export default Moments;
