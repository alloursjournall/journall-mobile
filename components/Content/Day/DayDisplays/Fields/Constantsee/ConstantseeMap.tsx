import { Dimensions, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import ConstantseeLeaveStars from "./ConstantseeLeaveStars"

import { StarIcon } from "@/constants/Images"
import { grayphite } from '@/constants/Colors'

interface ConstantseeMapProps {
    fieldsConstantseeText: any,
    fieldsConstantseeIndex: any,
    fieldsConstantseeStars: any,
    setFieldsConstantseeStars: any,
    constantseeStarsOrStarsList: string,
    setConstantseeStarsOrStarsList: any,
    day: any,
    fields: any,
    usersPassLocks: any,
    setUsersPassLocks: any
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const ConstantseeMap: React.FC<ConstantseeMapProps> = ({
    fieldsConstantseeText,
    fieldsConstantseeIndex,
    fieldsConstantseeStars,
    setFieldsConstantseeStars,
    constantseeStarsOrStarsList,
    setConstantseeStarsOrStarsList,
    day,
    fields,
    usersPassLocks,
    setUsersPassLocks,
}) => {

    const constancy = Array.isArray(fields?.constantsee) && fields?.constantsee || [];
    const constantseeStarrable = fields?.constantsee_starrable || null;

    const test = () => {    
        console.log('fieldsConstantseeStars', fieldsConstantseeStars)
    }

    return (
        Array.isArray(fieldsConstantseeText) &&
        fieldsConstantseeText?.map((constantsee: any, index: number) => {
            // this loop sets t.fields.constantsee_starrable[] to have a string item which is the curr t.fields.constantsee string item to upload 1-5
            const hasStarrable = Array?.isArray(constantseeStarrable) && constantseeStarrable?.some((starrables) => {
                if (starrables.trim() === constantsee.trim()) {
                    return true;
                }
            });

            return (
                <View style={styles.starsTextCont} key={`mapView${index}`}>
                    <Text key={`mapText${index}`} onPress={test}> {constantsee} </Text>
                    {hasStarrable &&
                        (
                            // allConstantseeLOCKshouldShowContent
                            <ConstantseeLeaveStars
                                index={index}
                                currentConstantsee={constantsee}
                                constantseeStarsOrStarsList={constantseeStarsOrStarsList}
                                setConstantseeStarsOrStarsList={setConstantseeStarsOrStarsList}
                                fieldsConstantseeStars={fieldsConstantseeStars}
                                setFieldsConstantseeStars={setFieldsConstantseeStars}
                                day={day}
                                fields={fields}
                                usersPassLocks={usersPassLocks}
                                setUsersPassLocks={setUsersPassLocks}
                            />
                        )
                    }
                </View>

            )

        })
    )
}

const styles = StyleSheet.create({
    starsTextCont: {
        height: screenHeight / 20,
        width: screenWidth / 2,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        gap: 0,
    },
    actionButtonRow: {
        // margi`nRight: 16,
        flexDirection: "row",
        width: '100%',
        justifyContent: 'center',
        borderColor: 'green',
    },
    buttonIcon: {
        height: 30,
        width: 30,
    },
    buttonIconMini: {
        height: 20,
        width: 20,
    }
})

export default ConstantseeMap;