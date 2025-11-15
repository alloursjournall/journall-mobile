import axios from 'axios'
import { useState, useEffect, useRef } from "react";


import { Platform, Dimensions, TouchableOpacity, TextInput, Image, View, Text, StyleSheet } from 'react-native';

// utils:
import { useContentFunction } from '@/Contexts/ContentFunctions';
import { FolderUploadIcon, CameraIcon, PopcornIcon, TrashIcon } from '@/constants/Images';
import { grayphite } from '@/constants/Colors';

import * as ImagePicker from 'expo-image-picker';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { GetObjectOutputFilterSensitiveLog } from '@aws-sdk/client-s3';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

interface props {
    editDay: any,
    setEditDay: any,
    headerInput: any,
    setHeaderInput: any,
    captionInput: any,
    setCaptionInput: any,
    blob: any,
    setBlob: any,
    blobURL: any,
    setBlobURL: any,
    momentsBinIndex: any,
    setMomentsBinIndex: any,
    
    isEditingMedia: boolean,
    setIsEditingMedia: any,    
}

const PhotoOrVideoBarEdit: React.FC<props> = ({
    editDay,
    setEditDay,
    headerInput,
    setHeaderInput,
    captionInput,
    setCaptionInput,
    blob,
    setBlob,
    blobURL,
    setBlobURL,
    momentsBinIndex,
    setMomentsBinIndex,

    isEditingMedia,
    setIsEditingMedia
}) => {

    const deleteBlob = () => {
        // delete current index of day.moments;
        let clone = {...editDay}
        let momentsClone = clone?.moments;
        momentsClone[momentsBinIndex].header = ''
        momentsClone[momentsBinIndex].caption = ''
        momentsClone[momentsBinIndex].blob = null
        momentsClone[momentsBinIndex].blobURL = null
        momentsClone[momentsBinIndex].is_deleted = null
        setEditDay(clone);        

        setBlob(null);
        setHeaderInput('');
        setCaptionInput('');
    }

    const addMediaToBin = (BLOB: any) => {
        console.log('BLOB', BLOB)
        let clone = { ...editDay}
        let cloneMoments: any = clone?.moments;
        if (cloneMoments?.length === 7) { 
            return;
        }
        if (!cloneMoments) { return null; }
        let object: any = { header: headerInput, caption: captionInput, is_image: false, is_video: false, blob: null, blobURL: null }

        // blob.type 
        // if (blob.is_image) {
        //     console.log('cloneMoments', cloneMoments)
        //     // let object = { text: textInput, is_voice: false, blob: null }
        //     object.is_image = true
        //     // add object to soft copy of day.thoughts
        // } else {
        //     object.is_video = true;
        // }

        if (BLOB !== null) {
            console.log('do we run this');
            object.blob = BLOB
            object.blobURL = URL.createObjectURL(BLOB)
            if (BLOB.type.includes('image')) {
                object.is_image = true;
            } else {
                object.is_video = true;
            }
            // setBlob(URL.createObjectURL(file));
        } else {
            console.log("this is erunning");
        }

        cloneMoments.push(object);
        clone.moments = cloneMoments;
        console.log('clone after', clone)
        setEditDay(clone);

        // restore defaults after submission.
        setHeaderInput('');
        setCaptionInput('');
        setBlob(null);
    }

    const test = () => {
        console.log('momentsBinIndex', momentsBinIndex)
    }

    const uploadFile = async () => {
        if (Platform.OS === 'web') {
            // Web: Use input type="file"
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/jpeg, image/png, video/mp4, video/quicktime';
            input.multiple = false;
            input.onchange = async (event: any) => {
                const file = event.target.files[0];
                if (file) {
                    // select blob 
                    // 🚨 but then do we upload the blob or the blobURL to amazon? amazon gets regular blob <img> needs URL

                    // 🚨 🚨 this doiesn't setDay() have to do setDay()
                    // setBlob(URL.createObjectURL(file));
                    addMediaToBin(file);
                    // setSelectedFile(URL.createObjectURL(file)); // Preview
                    console.log('File selected:', file);
                    // Pass `file` to upload function
                }
            };
            input.click();
        } else {
            // Mobile: Use expo-image-picker or DocumentPicker
            try {
                // testing endpoints. MediaTypeOptions is deprecated.
                const endpointTest = ImagePicker.UIImagePickerControllerQualityType

                const result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All, // Images & Videos
                    allowsEditing: true,
                    quality: 1,
                });

                if (!result.canceled) {
                    // 🚨 but then do we upload the blob or the blobURL to amazon? amazon gets regular blob <img> needs URL
                    setBlob(result.assets[0].uri);
                    console.log('File selected:', result.assets[0]);
                }
            } catch (error) {
                console.log('Error picking file:', error);
            }
        }
    };

    const decrementMomentsBin = () => {        
        const dayMomentsLength = editDay?.moments?.length
        if (momentsBinIndex === 0) {
            setMomentsBinIndex(dayMomentsLength - 1);
        } else {
            setMomentsBinIndex(momentsBinIndex - 1);
        }
    }

    const incrementMomentsBin = () => {
        console.log('increment right?')
        console.log('momentsBinIndex', momentsBinIndex)
        const dayMomentsLength = editDay?.moments?.length
        if (momentsBinIndex === dayMomentsLength - 1) {
            setMomentsBinIndex(0);
        } else {
            setMomentsBinIndex(momentsBinIndex + 1);
        }
    }

    // header & caption @ editDay.moments[i] can already be edited with <TextInput/>. this is to edit media which would preferably be done by clicking the image.
    const startEditingFunc = () => {
        console.log("doing a nice click");
        setIsEditingMedia(!isEditingMedia)
    }

    return (

        <View style={styles.addCommentRow}>

            {
                Array.isArray(editDay?.moments) && editDay?.moments[momentsBinIndex] &&
                <TouchableOpacity onPress={deleteBlob}>
                    <Image style={styles.icon} source={TrashIcon} />
                </TouchableOpacity>
            }

            <TouchableOpacity onPress={decrementMomentsBin} style={styles.addCommentPlusInput}> &lt; </TouchableOpacity>

            <TouchableOpacity onPress={startEditingFunc} style={styles.button}>
                <Text style={styles.addCommentInputText}> edit </Text>
            </TouchableOpacity>

            {
                blob === null &&
                <TouchableOpacity onPress={uploadFile}>
                    <Image style={styles.icon} source={FolderUploadIcon} />
                </TouchableOpacity>
            }


            {
                blob !== null &&
                <TouchableOpacity onPress={addMediaToBin} style={styles.addCommentPlusInput}>
                    <Text style={styles.addCommentInputText}> + </Text>
                </TouchableOpacity>
            }

            <TouchableOpacity onPress={incrementMomentsBin} style={styles.addCommentPlusInput}> &gt; </TouchableOpacity>

            {/* <TouchableOpacity onPress={test}>
                <Text> yuh </Text>
            </TouchableOpacity> */}

        </View>

    )

}

const styles = StyleSheet.create({
    addCommentRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        padding: 10,
        gap: screenWidth / 15,

        borderBottomColor: grayphite,
        borderBottomWidth: 1,
        borderStyle: 'dotted'
    },
    button: {
        borderWidth: 2,
        borderColor: grayphite,
        textAlign: 'center',
    },
    addCommentPlusInput: {
        height: 20,
        width: 20,
        borderTopLeftRadius: 14,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: -1,
        borderBottomRightRadius: 11,
        borderWidth: 2,
        borderColor: grayphite,
    },
    addCommentInputText: {
        fontSize: 16,
        fontWeight: 500,
        fontFamily: "Fuzzy Bubbles",
        color: grayphite,
    },
    input: {
        width: 24, // equivalent of 1.5rem (assuming 1rem = 16px)
        margin: 0,
        alignSelf: 'center',
        borderRadius: 50, // makes it circular
        borderTopLeftRadius: 14.5,
        borderTopRightRadius: 65.5,
        borderBottomLeftRadius: 122.5,
        borderBottomRightRadius: 30,
        color: '#444', // equivalent of $grayphite
        fontFamily: 'fuzzy', // make sure the font is linked properly
        fontSize: 10, // or adjust based on design
        borderWidth: 1.5,
        borderColor: '#44454fea', // border color
    },
    icon: {
        height: 35,
        width: 35
    }
})

export default PhotoOrVideoBarEdit;