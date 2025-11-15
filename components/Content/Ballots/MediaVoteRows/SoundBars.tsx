import axios from "axios";
import React, { useState } from "react";

// @reduxjs/toolkit:
import { RedBackArrowIcon, SoundWaveIcon } from "@/constants/Images";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";

// utility:
import { useContentFunction } from "Contexts/ContentFunctions";
import { Audio } from "expo-av";

interface Props {
  audioOrIcon: string;
  mapitemSoundBLOB: any;
  ballotsMediaBLOBs: any;
  index: any;
  currentSoundRef: any;
}

// export default function SoundBars(props:Props) {
const SoundBars: React.FC<Props> = ({
  audioOrIcon,
  mapitemSoundBLOB,
  ballotsMediaBLOBs,
  index,
  currentSoundRef,
}) => {
  return (
    <STATICICONRENDER
      mapitemSoundBLOB={mapitemSoundBLOB}
      ballotsMediaBLOBs={ballotsMediaBLOBs}
      index={index}
      currentSoundRef={currentSoundRef}
    />
  );
};

interface StaticIconRenderProps {
  mapitemSoundBLOB: any;
  ballotsMediaBLOBs: any;
  index: any;
  currentSoundRef: any;
}

const STATICICONRENDER: React.FC<StaticIconRenderProps> = ({
  mapitemSoundBLOB,
  ballotsMediaBLOBs,
  index,
  currentSoundRef,
}) => {
  const { startPlayingRecordedSound } = useContentFunction();

  const [sound, setSound] = useState<Audio.Sound | null>(null);

  // const playSoundFile = async (base64Audio: string) => {
  //     try {
  //         const base64Prefix = 'data:audio/mpeg;base64,';
  //         const fullBase64 = base64Audio.startsWith(base64Prefix) ? base64Audio : base64Prefix + base64Audio;

  //         // 🚨 stop whatever’s currently playing
  //         if (currentSoundRef.current) {
  //             if (Platform.OS === 'web') {
  //                 currentSoundRef.current.pause?.();
  //                 currentSoundRef.current.currentTime = 0;
  //             } else {
  //                 await currentSoundRef.current.stopAsync?.();
  //                 await currentSoundRef.current.unloadAsync?.();
  //             }
  //             currentSoundRef.current = null;
  //         }

  //         // 🚀 start a new playback
  //         if (Platform.OS === 'web') {
  //             const base64Response = await fetch(fullBase64);
  //             const blob = await base64Response.blob();
  //             const audioURL = URL.createObjectURL(blob);

  //             const audio = new window.Audio(audioURL);
  //             audio.onended = () => {
  //                 URL.revokeObjectURL(audioURL);
  //                 currentSoundRef.current = null;
  //             };

  //             currentSoundRef.current = audio;
  //             await audio.play();
  //         } else {
  //             const filePath = FileSystem.cacheDirectory + 'temp_audio.mp3';
  //             await FileSystem.writeAsStringAsync(filePath, fullBase64.replace('data:audio/mpeg;base64,', ''), { encoding: FileSystem.EncodingType.Base64 });

  //             const { sound } = await Audio.Sound.createAsync({ uri: filePath });
  //             currentSoundRef.current = sound;
  //             await sound.playAsync();

  //             sound.setOnPlaybackStatusUpdate((status: any) => {
  //                 if (status.didJustFinish) {
  //                     sound.unloadAsync();
  //                     currentSoundRef.current = null;
  //                 }
  //             });
  //         }
  //     } catch (err) {
  //         console.error('Error playing sound:', err);
  //         currentSoundRef.current = null;
  //     }
  // };

  const playSoundWave = async () => {
    console.log("mapitemSoundBLOB", mapitemSoundBLOB);
    if (!mapitemSoundBLOB?.blob && !mapitemSoundBLOB?.key?.url) {
      console.warn("No audio blob found");
      return;
    }
    // await playSoundFile(mapitemSoundBLOB?.key?.url || mapitemSoundBLOB.blob);
    await startPlayingRecordedSound(mapitemSoundBLOB?.key?.url);
    // await playSoundFile(mapitemSoundBLOB.blob || mapitemSoundBLOB?.key?.url);
  };

  // const soundBLOBclick = async (mapitem: any, currDayBallotsMediaBLOBs: any) => {
  //     console.log('mapitem', mapitem);

  //     // State to track the currently playing sound

  //     async function playWavFile(comment: any) {
  //         try {
  //             if (sound) {
  //                 await sound.stopAsync();
  //                 await sound.unloadAsync();
  //                 setSound(null);
  //             }

  //             const { sound: newSound } = await Audio.Sound.createAsync(
  //                 { uri: comment?.blob },
  //                 { shouldPlay: true }
  //             );

  //             setSound(newSound);
  //         } catch (error) {
  //             console.error('Playback error:', error);
  //         }
  //     }

  //     async function stopAudio() {
  //         if (sound) {
  //             await sound.stopAsync();
  //             await sound.unloadAsync();
  //             setSound(null);
  //         }
  //     }

  //     const soundPath = mapitem?.key?.Key;

  //     for (const comment of currDayBallotsMediaBLOBs) {
  //         console.log('comment', comment);
  //         const pathFromComment = comment?.key?.Key;
  //         console.log('pathFromComment', pathFromComment);

  //         if (soundPath === pathFromComment) {
  //             await setCurrentSound(comment);

  //             if (!sound) {
  //                 await playWavFile(comment);
  //             } else {
  //                 await stopAudio();
  //             }
  //         }
  //     }

  // };

  const test = () => {
    async function stopAudio() {
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
        setSound(null);
      }
    }
  };

  return (
    <View style={styles.cont}>
      <TouchableOpacity onPress={test}>
        <Image style={styles.iconTiny} source={RedBackArrowIcon} />
      </TouchableOpacity>

      <TouchableOpacity onPress={playSoundWave}>
        {/* <TouchableOpacity onPress={() => soundBLOBclick(mapitemSoundBLOB, ballotsMediaBLOBs)}> */}
        <Image style={styles.icon} source={SoundWaveIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cont: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
  },
  icon: {
    width: 50,
    height: 50,
  },
  iconTiny: {
    width: 25,
    height: 25,
  },
});

export default SoundBars;
