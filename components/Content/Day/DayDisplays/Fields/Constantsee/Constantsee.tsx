import { useState } from "react";

import { Dimensions, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import ConstantseeMap from "./ConstantseeMap"
import StarsUsers from './StarsUsers/StarsUsers'
import { EyeIcon, RedBackArrowIcon } from "@/constants/Images";
import { grayphite } from '@/constants/Colors'

interface ConstantseeProps {
    day: any,
    fields: any,
    fieldsBinIndex: number,
    setFieldsBinIndex: any,
    fieldsConstantseeText: string,
    fieldsConstantseeIndex: number,
    fieldsConstantseeStars: any,
    setFieldsConstantseeStars: any,

    usersPassLocks: any,
    setUsersPassLocks: any,

    fieldsConstantseeClick: boolean,
    setFieldsConstantseeClick: any,

    allUserProfileIcons: any,
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Constantsee: React.FC<ConstantseeProps> = ({
    day,
    fields,
    fieldsBinIndex,
    setFieldsBinIndex,
    fieldsConstantseeText,
    fieldsConstantseeIndex,
    fieldsConstantseeStars,
    setFieldsConstantseeStars,
    usersPassLocks,
    setUsersPassLocks,
    fieldsConstantseeClick,
    setFieldsConstantseeClick,
    allUserProfileIcons,
}) => {

    const [constantseeStarsOrStarsList, setConstantseeStarsOrStarsList] = useState('constantseeStars');
    const fieldsArray = Array.isArray(fields?.fields) && fields?.fields
    const currentField = fieldsArray[fieldsBinIndex] || null;

    const eyeAmClicking = () => {
        // const eyeAmClicking = (index:number) => {
        if (fields) {
            const constantsee = fields?.constantsee || null;;
            if (constantsee && constantsee.length >= 1) {
                setFieldsConstantseeClick(!fieldsConstantseeClick)
                // dispatch(TOGGLE_FIELDS_CONSTANTSEE_CLICK());
            }
        }
    };

    const test = () => {

    }

    return (
        <View style={styles.constantseeCont}>
            <View style={styles.topCont}>

                {
                    constantseeStarsOrStarsList === "starsList" 
                    ?
                    <TouchableOpacity onPress={() => setConstantseeStarsOrStarsList('constantseeStars')}>
                        <Image
                            style={styles.buttonIcon}
                            source={RedBackArrowIcon}
                        />
                    </TouchableOpacity>
                    :
                    <Text style={styles.ghost}> yh </Text>
                }

                <Text> {currentField} </Text>
                {/* <Text> {fieldsConstantseeText[fieldsConstantseeIndex]} </Text> */}

                <TouchableOpacity onPress={eyeAmClicking} style={styles.actionButton}>
                    <Image source={EyeIcon} style={styles.buttonIcon} />
                </TouchableOpacity>
            </View>

            {
                constantseeStarsOrStarsList === 'starsList'
                ?
                <StarsUsers
                    day={day}
                    fields={fields}
                    fieldsBinIndex={fieldsBinIndex}
                    setFieldsBinIndex={setFieldsBinIndex}
                    constantseeStarsOrStarsList={constantseeStarsOrStarsList}
                    setConstantseeStarsOrStarsList={setConstantseeStarsOrStarsList}
                    fieldsConstantseeStars={fieldsConstantseeStars}
                    usersPassLocks={usersPassLocks}
                    setUsersPassLocks={setUsersPassLocks}
                    allUserProfileIcons={allUserProfileIcons}
                />
                :
                <ConstantseeMap
                    fieldsConstantseeText={fieldsConstantseeText}
                    fieldsConstantseeIndex={fieldsConstantseeIndex}
                    fieldsConstantseeStars={fieldsConstantseeStars}
                    setFieldsConstantseeStars={setFieldsConstantseeStars}
                    constantseeStarsOrStarsList={constantseeStarsOrStarsList}
                    setConstantseeStarsOrStarsList={setConstantseeStarsOrStarsList}
                    day={day}
                    fields={fields}
                    usersPassLocks={usersPassLocks}
                    setUsersPassLocks={setUsersPassLocks}
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    constantseeCont: {
        height: screenHeight * 0.4, // Ensure it matches the height of the image
        // height: screenHeight * 0.4¸, // Ensure it matches the height of the image
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%', // Ensure it takes full width

        borderColor: grayphite,
        borderWidth: 3,
        paddingTop: 5,
        gap: 10
    },
    topCont: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: screenHeight / 20,
        width: '100%',

        borderColor: grayphite,
        borderWidth: 5

        // borderBottomWidth: 5
    },
    actionButton: {
        // marginRight: 16,
    },
    buttonIcon: {
        height: 30,
        width: 30,
    },
    ghost: {
        opacity: 0
    }
})

export default Constantsee