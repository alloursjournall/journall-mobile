import { grayphite } from '@/constants/Colors';
// <>
import { ScrollView, Dimensions, Image, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { RedBackArrowIcon } from '@/constants/Images';
import StarsRatings from './StarsRatings';


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

interface PostingUserStars {
    day: any,
    fields: any,
    fieldsBinIndex: any,
    setFieldsBinIndex: any,
    constantseeStarsOrStarsList: string
    setConstantseeStarsOrStarsList: any
    fieldsConstantseeStars: any,
    usersPassLocks: any,
    setUsersPassLocks: any,
    allUserProfileIcons: any,
}

const StarsUsers: React.FC<PostingUserStars> = ({
    day, fields, fieldsBinIndex, setFieldsBinIndex,
    fieldsConstantseeStars,
    constantseeStarsOrStarsList, setConstantseeStarsOrStarsList, 
    usersPassLocks, setUsersPassLocks, allUserProfileIcons
}) => {

    const goBackToPostingUserStars = () => {
        setConstantseeStarsOrStarsList('constantseeStars');
    }

    return (
        <View style={styles.starsCont}>
            {/* <TouchableOpacity style={styles.buttonCont} onPress={goBackToPostingUserStars}>
                    <Image source={RedBackArrowIcon} style={styles.backButton} />
            </TouchableOpacity> */}

                <ScrollView contentContainerStyle={styles.starsMap}>

                    {
                        Array.isArray(fieldsConstantseeStars) &&
                        fieldsConstantseeStars?.map((mapitem: any, index: number) => {
                            return (
                                <StarsRatings
                                    mapitem={mapitem}
                                    index={index}
                                    iconBin={allUserProfileIcons}
                                />
                            )
                        })
                    }

                </ScrollView>


        </View>
    )
}

const styles = StyleSheet.create({
    starsCont: {
        height: screenHeight * 0.3, // Ensure it matches the height of the image
        width: '100%', // Ensure it takes full width
        // borderWidth: 3,

        // justifyContent: 'flex-start',
        // borderColor: grayphite,
    },
    starsMap: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        // alignSelf: 'center',
        marginTop: 10,
        gap: 20,
        height: screenHeight * 0.355, // Ensure it matches the height of the image
        padding: 10,
        width: '100%',
        // borderWidth: 3,
        // borderColor: grayphite
    },
    buttonCont: {
        height: 20,
        width: '100%',
        display: 'flex',

        // alignSelf: 'center',
        // justifyContent: 'center',
        // alignItems: 'center',

        // borderWidth: 3,
    },
    backButton: {
        height: 25,
        width: 25,
        alignSelf: 'flex-start',
        // justifyContent: 'center',
        // marginRight: 16,
        marginLeft: 5,
        marginTop: 2.5
        // margin: 5,
    }
});

// thoughtsCont: {
//         height: screenHeight * 0.4, // Ensure it matches the height of the image
//         width: '100%', // Ensure it takes full width
//         borderColor: 'gray',
//         borderWidth: 5,
//         padding: 10, // Add some padding to avoid content touching the edges
//     },

export default StarsUsers;