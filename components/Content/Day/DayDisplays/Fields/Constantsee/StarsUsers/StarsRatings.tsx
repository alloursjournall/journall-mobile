import { grayphite } from '@/constants/Colors';
import { ScrollView, Dimensions, Image, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { StarIcon } from '@/constants/Images';

import { useContentFunction } from '@/Contexts/ContentFunctions';

interface StarProps {
    mapitem: any;
    index: number;
    iconBin: any;
}

const StarsRatings: React.FC<StarProps> = ({ mapitem, index, iconBin }) => {
    const { returnProfileImg } = useContentFunction();
    const iconUri = returnProfileImg(mapitem?.user_id, iconBin);

    return (
        <View style={styles.starShowUsersMapItemBar}>
            <Image key={index} source={{ uri: iconUri }} alt={mapitem?.username} style={styles.profilePic} />

            <View style={styles.fiveStarsCont}>
                {Array.from({ length: mapitem?.stars }).map((_: any, idx: number) => {
                    return (
                        // <Image/>
                        <Image source={StarIcon} style={styles.userRatingStars} key={idx} alt="⭐️" />
                    );
                })}
            </View>

            <Text style={styles.text}> {mapitem?.username} </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    starShowUsersMapItemBar: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        gap: 5,
    },
    profilePic: {
        height: 35,
        width: 35,
        borderRadius: 50,
    },
    fiveStarsCont: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2.5,
    },
    // userRatingsStars is .fiveStarsUsers in days/DayDisplays/Comments

    userRatingStars: {
        height: 10,
        width: 10,
    },
    text: {
        fontSize: 16,
    },
});

export default StarsRatings;
