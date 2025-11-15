// <>
import { ScrollView, Dimensions, Image, TouchableOpacity, View, Text, StyleSheet } from 'react-native';

// redux
import { RootState } from '@/redux/store/rootReducer';
import { useSelector, useDispatch } from 'react-redux';

// utils:
import { grayphite } from '@/constants/Colors';
import { StarIcon, EmptyStarIcon, RedBackArrowIcon } from '@/constants/Images';

import { useContentFunction } from '@/Contexts/ContentFunctions';

interface StarProps {
    mapitem: any;
    index: number;
    iconBin: any;
    currentUser: any;
    setCommentStarsQuestionClick: any;
}

const StarsRatings: React.FC<StarProps> = ({ mapitem, index, iconBin, currentUser, setCommentStarsQuestionClick }) => {
    const { returnProfileImg } = useContentFunction();

    const unClickQuestionClick = () => setCommentStarsQuestionClick(false);

    return (
        <View style={styles.starShowUsersMapItemBar} key={`container${index}`}>
            <Image key={index} style={styles.starsProfilePic} source={{ uri: returnProfileImg(mapitem?.user_id, iconBin) }} alt={mapitem?.username} />

            <View style={styles.fiveStarsCont}>
                {/* <View id={styles.actualCommentsBottomRow}> */}
                {Array?.from({ length: mapitem?.stars })?.map((_, idx) => (
                    <Image style={styles.fiveStarsUsers} source={StarIcon} key={idx} alt="star" />
                ))}
            </View>

            <TouchableOpacity onPress={unClickQuestionClick}>
                <Text style={styles.usernameTextStars}> {mapitem?.username === currentUser?.username ? 'me' : mapitem?.username} </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    starShowUsersMapItemBar: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        width: '100%',
    },
    starsProfilePic: {
        height: 50,
        width: 50,
        borderRadius: 50,
    },
    fiveStarsCont: {
        flexDirection: 'row',
        gap: 1,
    },
    fiveStarsUsers: {
        height: 10,
        width: 10,
        // gap: 1,
    },
    usernameTextStars: {
        fontFamily: 'Fuzzy Bubbles',
        fontSize: 18,
        color: grayphite,
    },
});

export default StarsRatings;
