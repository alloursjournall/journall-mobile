import { useState, useRef } from 'react';

import { View, Image, StyleSheet } from 'react-native';

interface SoundFileControlsProps {
    soundCommentFile: any;
    setSoundCommentFile: any;
}

const SoundFileControls: React.FC<SoundFileControlsProps> = ({ soundCommentFile, setSoundCommentFile }) => {
    const holdTimeoutRef = useRef<any>(null);
    const streamRef = useRef<any>(null); // let stream;
    const recorderRef = useRef<any>(null); // let recorder;
    const containerRef = useRef<any>(null);
    const [startVoiceRecording, setStartVoiceRecording] = useState<boolean>(false);
    const [animationStarted, setAnimationStarted] = useState<boolean>(false);
    let animationIndex: number = 0;
    let animationInterval: any = null;

    const setBarState = (direction: any) => {
        console.log('thats your favorite part huh');
    };

    // const setBarState = (direction:any) => {
    //     if (animationInterval === null) {
    //         return;
    //     }
    //     const nextAnimationIndex = animationIndex + 1;
    //     // * * * * * dev notes          nextAnimationIndex should maybe be state.
    //     const elem = document.querySelector(`.${styles[`bar${nextAnimationIndex}`]}`);
    //     if (elem) {
    //         if (direction === 'in') {
    //             elem.classList.add(styles.BOBblackoutbar);
    //         } else if (direction === 'out') {
    //             elem.classList.remove(styles.BOBblackoutbar);
    //         }
    //     }
    // };

    const startAnimation = (direction: any) => {
        clearInterval(animationInterval); // Ensure any existing interval is cleared before starting a new one

        if (direction === 'out') animationIndex = 0;

        animationInterval = setInterval(
            () => {
                if (animationIndex < 9) {
                    setBarState(direction);
                    animationIndex++;
                } else {
                    clearInterval(animationInterval);
                    animationInterval = null; // Clear the reference after stopping
                }
            },
            direction === 'in' ? 1000 : 100,
        );

        setTimeout(
            () => {
                setAnimationStarted(false);
                setStartVoiceRecording(false);
                if (animationInterval) {
                    clearInterval(animationInterval);
                    animationInterval = null; // Clear the reference after stopping
                }
            },
            direction === 'in' ? 9000 : 100,
        );
    };

    // const startRecording = async () => {
    //     console.log("startRecording is firing");

    //     streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
    //     recorderRef.current = new MediaRecorder(streamRef.current);

    //     recorderRef.current.start();

    //     recorderRef.current.ondataavailable = async (e) => {
    //         const recordedBlob = new Blob([e.data], { type: 'audio/mp3' });
    //         setSoundCommentFile(recordedBlob);
    //     };

    //     setTimeout(() => {
    //         if (recorderRef?.current?.state !== 'inactive') {
    //             recorderRef?.current?.stop();
    //         }
    //         streamRef.current?.getTracks()?.forEach((track:any) => track?.stop);
    //     }, 9000);
    // };

    const startRecording = () => {
        console.log('start recording');
        return;
    };

    const deleteRecording = () => {
        console.log('delete recording');
    };
    // const deleteRecording = () => {
    //     // startAnimation('out');
    //     // startAnimation('out');

    //     let animationIndex = 1;
    //     const numBars = 10;

    //     const intervalId = setInterval(() => {
    //         const elem: any = document.querySelector(`.${styles[`bar${animationIndex}`]}`);

    //         if (elem) {
    //             elem.classList.remove(styles.BOBblackoutbar);
    //         }

    //         animationIndex++;

    //         // Clear interval once all elements are processed
    //         if (animationIndex > numBars) {
    //             clearInterval(intervalId);
    //         }
    //     }, 200);  // Adjust the interval timing as necessary (200ms example)
    //     setSoundCommentFile(null);
    // };

    const stopRecording = () => {
        if (animationInterval) {
            clearInterval(animationInterval);
            animationInterval = null; // Clear the reference after stopping
        }

        if (recorderRef.current?.state !== 'inactive') {
            console.log('yes not equal to inactive');
            recorderRef?.current?.stop();
        }

        streamRef?.current?.getTracks()?.forEach((track: any) => track?.stop());
        setStartVoiceRecording(false);
        setAnimationStarted(false);
    };

    const handleMouseDown = () => {
        console.log('handle mouse down');
    };
    // const handleMouseDown = () => {
    //     let animationIndex = 1;
    //     const numBars = 10;

    //     const intervalId = setInterval(() => {
    //         const elem: any = document.querySelector(`.${styles[`bar${animationIndex}`]}`);

    //         if (elem) {
    //             elem.classList.add(styles.BOBblackoutbar);
    //         }

    //         animationIndex++;

    //         // Clear interval once all elements are processed
    //         if (animationIndex > numBars) {
    //             clearInterval(intervalId);
    //         }
    //     }, 1000);  // Adjust the interval timing as necessary (200ms example)

    //     setStartVoiceRecording(true);
    //     holdTimeoutRef.current = setTimeout(startRecording, 1000);

    //     setStartVoiceRecording(true);
    //     holdTimeoutRef.current = setTimeout(startRecording, 1000);
    // };

    const handleMouseUp = () => {
        console.log('handle mouse up');
        return;
    };
    // const handleMouseUp = () => {
    //     let animationIndex = 1;
    //     const numBars = 10;
    //     const intervalId = setInterval(() => {
    //         const elem: any = document.querySelector(`.${styles[`bar${animationIndex}`]}`);
    //         if (elem) {
    //             elem.classList?.remove(styles.BOBblackoutbar);
    //         }
    //         animationIndex++;
    //         // Clear interval once all elements are processed
    //         if (animationIndex > numBars) {
    //             clearInterval(intervalId);
    //         }
    //     }, 100);  // Adjust the interval timing as necessary (200ms example)

    //     console.log('mouseup func');
    //     clearTimeout(holdTimeoutRef.current);
    //     if (startVoiceRecording) {
    //         console.log('yes startVoiceRecording before stopRecording');
    //         stopRecording();
    //     }
    // };

    const playRecording = () => {
        if (soundCommentFile) {
            const audioUrl = URL?.createObjectURL(soundCommentFile);
            const audio = new Audio(audioUrl);
            audio.play();
        }
    };

    return <View></View>;
};

const styles = StyleSheet.create({
    cont: {
        flexDirection: 'row',
    },
});

export default SoundFileControls;
