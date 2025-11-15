import { useState } from 'react';
import { Dimensions, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { StarIcon, EmptyStarIcon, RedBackArrowIcon, GreenForwardArrowIcon, QuestionIcon } from '@/constants/Images';
import { grayphite } from '@/constants/Colors';

import { useContentFunction } from '@/Contexts/ContentFunctions';

interface ConstantseeLeaveStarsProps {
    index: number;
    currentConstantsee: any;
    constantseeStarsOrStarsList: string;
    setConstantseeStarsOrStarsList: any;
    fieldsConstantseeStars: any;
    setFieldsConstantseeStars: any;
    day: any;
    fields: any;
    usersPassLocks: any;
    setUsersPassLocks: any;
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const ConstantseeLeaveStars: React.FC<ConstantseeLeaveStarsProps> = ({
    index,
    currentConstantsee,
    constantseeStarsOrStarsList,
    setConstantseeStarsOrStarsList,
    fieldsConstantseeStars,
    setFieldsConstantseeStars,
    day,
    fields,
    usersPassLocks,
    setUsersPassLocks,
}) => {
    const { calculateStarsAverage, submitOneThruFiveRatings } = useContentFunction();

    const [containerOpen, setContainerOpen] = useState<boolean>(false);
    const [starClickedIndex, setStarClickedIndex] = useState<number>(0);
    const [starsError, setStarsError] = useState<boolean>(false);

    const test = () => {
        console.log('hey guys');
        console.log('fieldsConstantseeStars', fieldsConstantseeStars);
    };

    const calculateStarsAverageHandler = () => {
        return calculateStarsAverage(day?.id, null, null, null, fieldsConstantseeStars, setFieldsConstantseeStars) || null;
    };

    const questionClick = () => {
        if (fields?.constantsee_show_stars_users) {
            // show stars users which displays <StarsUsers/> looping oiver postingUserThoughtStars to show stars?.username, stars.user_profile_icon and stars.stars (name, icon, rating)
            setConstantseeStarsOrStarsList('starsList');
        }
        if (fields?.constantsee_show_stars_avg && !fields?.constantsee_show_stars_users) {
            // show average
            const userThoughtStarsAverage = calculateStarsAverageHandler();
            // const userThoughtStarsAverage = postingUserThoughtsCalculateStarsAverage(day?.id, null, null, null, postingUserThoughtStars, setPostingUserStarsAverage)
            setStarClickedIndex(userThoughtStarsAverage);
            console.log('userThoughtStarsAverage', userThoughtStarsAverage);
        }
        if (!fields?.constantsee_show_stars_users && !fields?.constantsee_show_stars_avg) {
            // error handler
            setStarsError(true);
        }
    };

    const starBackBtnClick = () => {
        if (starClickedIndex > 0) {
            setStarClickedIndex(0);
        } else {
            setContainerOpen(false);
        }
    };

    const submitOneThruFiveRatingsHandler = async () => {
        // const submitOneThruFiveRatings = async (
        // day: any, event_id: number | null, postingUserThoughts: any, field_id: number | null, postingUserId: number,
        // currentUserId: number, currentUserIcon: string, stars: number
        console.log('starClickedIndex', starClickedIndex);
        // return;
        const starsData = await submitOneThruFiveRatings(day, null, null, fields?.id, currentConstantsee, day?.user_id, 3, 'puregold', 'journall-user-3', starClickedIndex);
        console.log('starsData', starsData);
        if (!starsData) {
            return null;
        }
        setFieldsConstantseeStars(starsData);
        // const data = predata?.data?.data?.submitOneThruFiveStars
    };

    // 🚨 🚨 🚨 submitOneThruFiveRatings (from ContentFunctions)
    // const submitConstantseeStars = async (day) => {

    //     const fields = day?.fields || null;

    //     const rating = starClickedIndex;
    //     console.log('currentConstantsee', currentConstantsee)

    //     const query = submitFieldConstantseeStarsQueryStringFunc(
    //         day?.id, day?.user_id, CURRENT_USER?.id, CURRENT_USER?.username, CURRENT_USER?.icon,
    //         fields?.id, currentConstantsee.trim(), rating
    //     )
    //     console.log('query', query)

    //     await axios.post("/api/graphql", { query: query })
    //         // const submitRatingGetStars = await axios.post("/api/graphql", { query: query })
    //         .then((predata) => {
    //             console.log('predata', predata)
    //             const updatedStarsAfterSubmitting = predata?.data?.data?.submitOneThruFiveStars
    //             if (!updatedStarsAfterSubmitting) { return null; }

    //             console.log('updatedStarsAfterSubmitting', updatedStarsAfterSubmitting);
    //             dispatch(SET_CURR_DAY_FIELDS_CONSTANTSEE_STARS(updatedStarsAfterSubmitting));
    //             setCurrDayFieldStars(updatedStarsAfterSubmitting);

    //             setStarClickedIndex(0);
    //             setContainerOpen(false);

    //         }).catch((error) => {
    //             console.log('error', error)
    //         })
    // }

    const openContainer = () => setContainerOpen(true);

    return containerOpen ? (
        <View style={styles.starsMapOuterCont}>
            <TouchableOpacity key={`mapTouchableQuestion${index}`} onPress={questionClick} style={styles.actionButtonRow}>
                <Image key={`mapStar${index}`} source={QuestionIcon} style={styles.buttonIconMini} />
            </TouchableOpacity>

            <TouchableOpacity key={`mapTouchableTest${index}`} onPress={test} style={styles.actionButtonRow}>
                <Text> test </Text>
            </TouchableOpacity>

            <TouchableOpacity key={`mapTouchableBack${index}`} onPress={starBackBtnClick} style={styles.actionButtonRow}>
                <Image key={`mapStar${index}`} source={RedBackArrowIcon} style={styles.buttonIconMini} />
            </TouchableOpacity>

            {/* click empty stars and they color code to show the 1-5 rating about to be submitted. */}

            {<StarsMap starClickedIndex={starClickedIndex} setStarClickedIndex={setStarClickedIndex} />}

            <TouchableOpacity key={`mapTouchableSubmit${index}`} onPress={submitOneThruFiveRatingsHandler} style={styles.actionButtonRow}>
                <Image key={`mapStar${index}`} source={GreenForwardArrowIcon} style={styles.buttonIconMini} />
            </TouchableOpacity>
        </View>
    ) : (
        <TouchableOpacity key={`mapTouchableStar${index}`} onPress={openContainer} style={styles.actionButtonRow}>
            <Image key={`mapStar${index}`} source={StarIcon} style={styles.buttonIconMini} />
        </TouchableOpacity>
    );
};

interface StarsMapProps {
    starClickedIndex: number;
    setStarClickedIndex: any;
}

const StarsMap: React.FC<StarsMapProps> = ({ starClickedIndex, setStarClickedIndex }) => {
    // function StarsMap({ starClickedIndexObj, }) {

    return (
        <View style={styles.starsMapRow}>
            {/* <View style={styles.actionButtonRow}> */}
            {Array.from({ length: 5 })?.map((mapitem, index) => (
                <TouchableOpacity onPress={() => setStarClickedIndex(index + 1)}>
                    <Image key={`star${index}`} style={styles.buttonIconMini} source={starClickedIndex >= index + 1 ? StarIcon : EmptyStarIcon} />
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    starsMapOuterCont: {
        flexDirection: 'row', // Ensure horizontal layout
        justifyContent: 'center', // Optional: Centers the stars inside the container
        alignItems: 'center', // Keeps items aligned properly
        height: screenHeight / 25,
        gap: 5,
    },
    starsMapRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
    },
    actionButtonRow: {
        // margi`nRight: 16,
        flexDirection: 'row',
        // width: '100%',
        justifyContent: 'center',
        // borderColor: grayphite,
        // borderWidth: 1
    },
    buttonIconMini: {
        height: 10,
        width: 10,
    },
});

export default ConstantseeLeaveStars;
