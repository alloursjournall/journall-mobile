import { useState } from 'react';

// redux
import { RootState } from '@/redux/store/rootReducer';
import { useSelector, useDispatch, createDispatchHook } from 'react-redux';

// <>
import VoteTypeMenu from '../VoteTypeMenu';
import BallotOptions from '../BallotOptions';
import { LinearGradient } from 'expo-linear-gradient';

import { Dimensions, TouchableOpacity, TextInput, Image, ScrollView, View, Text, StyleSheet } from 'react-native';
import { InfoIcon, LitFireIcon, StarIcon } from '@/constants/Images';
import { grayphite } from '@/constants/Colors';

interface props {
    litLikeLoveOrStars: any;
    setLitLikeLoveOrStars: any;
    day: any;
    setDay: any;
    ballotBinIndex: any;
    setBallotBinIndex: any;
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const LitLikeLoveOrStarsCheckboxes: React.FC<props> = ({ litLikeLoveOrStars, setLitLikeLoveOrStars, day, setDay, ballotBinIndex, setBallotBinIndex }) => {
    const ballots = day?.ballots;
    const currBallot = Array.isArray(ballots) && ballots[ballotBinIndex];

    const [showInfo, setShowInfo] = useState(false);

    const showInfoClick = () => {
        setShowInfo(true);

        setTimeout(() => {
            setShowInfo(false);
        }, 1000);
    };

    const checkLikeStarsCheckbox = (likeOrStars: string) => {
        let clone = { ...day };
        let ballotsClone = clone?.ballots || null;
        console.log('running this function');
        // const clone = [...ballotBin]
        if (likeOrStars === 'litLikeLove') {
            if (litLikeLoveOrStars === 'litLikeLove') {
                ballotsClone[ballotBinIndex].litlikelove_or_stars = '';
                setLitLikeLoveOrStars('');
            } else {
                setLitLikeLoveOrStars('litLikeLove');
                ballotsClone[ballotBinIndex].litlikelove_or_stars = 'litLikeLove';
            }
        }
        if (likeOrStars === 'stars') {
            if (litLikeLoveOrStars === 'stars') {
                ballotsClone[ballotBinIndex].litlikelove_or_stars = '';
                setLitLikeLoveOrStars('');
            } else {
                ballotsClone[ballotBinIndex].litlikelove_or_stars = 'stars';
                setLitLikeLoveOrStars('stars');
            }
        }
        clone.ballots = ballotsClone;
        setDay(clone);
        // setBallotBin(clone)
    };

    return (
        <View style={styles.uploadSettingsRow}>
            <View style={styles.slightSplitRow}>
                <Image style={styles.icons} source={LitFireIcon} />
                {showInfo ? (
                    <Text style={styles.settingsRowText}> like votes </Text>
                ) : (
                    <TouchableOpacity
                        onPress={() => checkLikeStarsCheckbox('litLikeLove')}
                        style={[{ backgroundColor: currBallot?.litlikelove_or_stars === 'litLikeLove' ? 'grey' : 'transparent' }, styles.button]}
                    />
                )}
            </View>

            <View style={styles.slightSplitRow}>
                <Image style={styles.icons} source={StarIcon} />
                {showInfo ? (
                    <Text style={styles.settingsRowText}> 1-5 ratings </Text>
                ) : (
                    <TouchableOpacity
                        onPress={() => checkLikeStarsCheckbox('stars')}
                        style={[{ backgroundColor: currBallot?.litlikelove_or_stars === 'stars' ? 'grey' : 'transparent' }, styles.button]}
                    />
                )}
            </View>

            <TouchableOpacity onPress={showInfoClick}>
                <Image style={styles.icons} source={InfoIcon} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    settingsCont: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10,
    },
    columnCont: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 5,
    },
    uploadSettingsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    slightSplitRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    settingsRowHeader: {
        fontFamily: 'Fuzzy Bubbles',
        color: grayphite,
        fontSize: 18,
    },
    settingsRowText: {
        fontFamily: 'Fuzzy Bubbles',
        color: grayphite,
        fontSize: 14,
    },
    icons: {
        height: 35,
        width: 35,
    },
    iconMini: {
        height: 20,
        width: 20,
    },
    button: {
        height: 20,
        width: 20,
        borderWidth: 2,
        borderColor: grayphite,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 8,
        //    borderTopLeftRadius: 0,
        borderTopRightRadius: 3,
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
    ghost: {
        opacity: 0,
    },
    ballotOptionsMedia: {
        height: screenHeight / 10,
        width: screenHeight / 10,
    },

    container: {
        gap: 5,
        // padding: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    centerCont: {
        flex: 1, // Allow this to take remaining space
        height: screenHeight * 0.325,
        width: '100%',
        justifyContent: 'center', // Center the content vertically
        alignItems: 'center',
    },
});

export default LitLikeLoveOrStarsCheckboxes;
