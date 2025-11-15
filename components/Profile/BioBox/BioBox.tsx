// top level imports
import { useState, useEffect } from 'react';
import axios from 'axios';

// @reduxjs/toolkit:
import { RootState } from 'redux/store/rootReducer';
import { useSelector, useDispatch } from 'react-redux';

// components and styleing:
import { Platform, Dimensions, TouchableOpacity, Image, ScrollView, View, Text, StyleSheet } from 'react-native';
import HeaderCaptions from './HeaderCaptions';

// utils:
import { grayphite, hothazel } from '@/constants/Colors';
import { HandUnderlineIcon1 } from '@/constants/Images';
import { useContentFunction } from 'Contexts/ContentFunctions';

interface props {
    currProfile: any;
    contentDisplayClicked: any;
    setContentDisplayClicked: any;
    showProfile: any;
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const BioBox: React.FC<props> = ({ currProfile, contentDisplayClicked, setContentDisplayClicked, showProfile }) => {
    const dispatch = useDispatch();

    const CONTENT_DISPLAY_CLICKED = useSelector((state: RootState) => state.profile.CONTENT_DISPLAY_CLICKED);

    const name = currProfile?.name;
    const pronouns = currProfile?.pronouns;
    const creator_acct = currProfile?.creator_acct;
    const location_text = currProfile?.location_text;
    const location_id = currProfile?.location_id;
    const text_1_header = currProfile?.text_1_header || '';
    const text_1_caption = currProfile?.text_1_caption || '';
    const text_2_header = currProfile?.text_2_header || '';
    const text_2_caption = currProfile?.text_2_caption || '';
    const text_3_header = currProfile?.text_3_header || '';
    const text_3_caption = currProfile?.text_3_caption || '';
    const text_4_header = currProfile?.text_4_header || '';
    const text_4_caption = currProfile?.text_4_caption || '';
    const text_5_header = currProfile?.text_5_header || '';
    const text_5_caption = currProfile?.text_5_caption || '';
    const text_6_header = currProfile?.text_6_header || '';
    const text_6_caption = currProfile?.text_6_caption || '';
    const text_7_header = currProfile?.text_7_header || '';
    const text_7_caption = currProfile?.text_7_caption || '';

    const bio = currProfile?.bio;

    const headerCaptionsClick = () => {
        if (contentDisplayClicked !== 'headerCaptions') {
            setContentDisplayClicked('headerCaptions');
            // dispatch(SET_CONTENT_DISPLAY_CLICKED('headerCaptions'))
        } else {
            setContentDisplayClicked('');
            // dispatch(SET_CONTENT_DISPLAY_CLICKED(''))
        }
    };

    return showProfile === false ? (
        <View style={styles.bioBoxCont}>
            <Image style={styles.underline} source={HandUnderlineIcon1} />
        </View>
    ) : (
        <View style={styles.bioBoxCont}>
            {/* <ScrollView contentContainerStyle={styles.bioBoxCont}> */}

            <View style={styles.bioBoxRowNamePronoun}>
                <View style={styles.slightSplitRow}>
                    {name && <Text style={[{ color: hothazel }, styles.bioBoxName]}> {name} </Text>}
                    {creator_acct && <Text style={styles.bioBoxPronoun}> {creator_acct} </Text>}
                </View>

                {location_text && <View style={styles.slightSplitRow}>{location_text && <Text style={styles.bioBoxPronoun}> {location_text} </Text>}</View>}

                {pronouns && <Text style={styles.bioBoxPronoun}> {pronouns} </Text>}
            </View>

            <View style={styles.bioBoxRowBio}>{bio && <Text style={styles.bioBoxRowText}> {bio} </Text>}</View>
            {/* <View style={styles.bioBoxRowBio}>{bio && <Text style={styles.bioBoxRowText}> {bio} </Text>}</View> */}

            <View style={styles.bioBoxRowNamePronoun}>
                <View style={styles.slightSplitRow}>
                    {text_1_header && <Text style={styles.bioBoxText}> {text_1_header} </Text>}
                    {/* {<Text style={styles.bioBoxText}> cool </Text>} */}
                    {(text_1_header ||
                        text_1_caption ||
                        text_2_header ||
                        text_2_caption ||
                        text_3_header ||
                        text_3_caption ||
                        text_4_header ||
                        text_4_caption ||
                        text_5_header ||
                        text_5_caption ||
                        text_6_header ||
                        text_6_caption ||
                        text_7_header ||
                        text_7_caption) && (
                        <TouchableOpacity onPress={headerCaptionsClick}>
                            <Text style={[styles.bioBoxRowHazel, { fontSize: 50 }]}> &darr; </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            <View style={styles.bioBoxRowNamePronoun}>{text_1_caption && <Text style={styles.bioBoxPronoun}> {text_1_caption} </Text>}</View>

            {contentDisplayClicked === 'headerCaptions' &&
                (text_1_header ||
                    text_1_caption ||
                    text_2_header ||
                    text_2_caption ||
                    text_3_header ||
                    text_3_caption ||
                    text_4_header ||
                    text_4_caption ||
                    text_5_header ||
                    text_5_caption ||
                    text_6_header ||
                    text_6_caption ||
                    text_7_header ||
                    text_7_caption) && <HeaderCaptions currProfile={currProfile} />}
        </View>
    );
    // </ScrollView>
};

const styles = StyleSheet.create({
    bioBoxCont: {
        display: 'flex', // Implicit in RN but keeping it for clarity
        flexDirection: 'column',
        justifyContent: 'flex-start', // Mimics `grid-template-rows: auto auto;`
        width: screenWidth, // No `vw`, but this keeps it responsive
        // width: '100%', // No `vw`, but this keeps it responsive
        // alignItems: 'stretch', // Makes rows take full width
        gap: 0, // Not native, but margins/padding can replace it

        borderWidth: 2,
        // borderColor: 'orange',
        margin: 0,
    },

    bioBoxName: {
        color: hothazel,
        fontFamily: 'Fuzzy Bubbles',
        letterSpacing: 2,
        textTransform: 'uppercase',
        fontSize: 18,
        fontWeight: 400,
        margin: 0,
    },
    bioBoxText: {
        color: grayphite,
        fontFamily: 'Fuzzy Bubbles',
        letterSpacing: 2,
        textTransform: 'uppercase',
        fontSize: 18,
        fontWeight: 400,
        margin: 0,
    },

    bioBoxRowNamePronoun: {
        flexDirection: 'row', // 'row' for horizontal layout
        justifyContent: 'space-between', // Space between items
        alignItems: 'center', // Align items to the center
        height: 'auto', // Flexible height (defaults to content)
        width: '75%', // 75% of the parent width
        gap: 10, // Spacing between elements (use in React Native as margin)
        margin: 0, // No margin
        padding: 8, // Equivalent to padding: 0.5rem 1rem 0.5rem 0.5rem
    },
    bioBoxRowBio: {
        flexDirection: 'row', // Flex for horizontal layout
        justifyContent: 'flex-start', // Align items to the start of the container
        alignItems: 'center', // Center items vertically
        height: 'auto', // Flexible height based on content
        width: '75%', // 75% of the parent width
        padding: 16, // Equivalent to padding: 1rem 0 1rem 2rem
        margin: 0, // No margin
    },
    bioBoxPronoun: {
        color: grayphite,
        fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
        letterSpacing: 2,
        textTransform: 'uppercase',
        fontSize: 18,
        fontWeight: 400,
        margin: 0,
        padding: 0,
    },
    bioBoxRowText: {
        fontFamily: 'Fuzzy Bubbles',
        color: grayphite,
        fontSize: 16,
        fontWeight: 400,
        margin: 0,
    },
    bioBoxRowHazel: {
        fontFamily: 'Fuzzy Bubbles',
        color: hothazel,
        fontSize: 16,
        fontWeight: 400,
        margin: 0,
    },
    slightSplitRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
        gap: 5,
        // boxSizing: 'border-box',
        marginBottom: 0,
    },
    underline: {
        height: 20,
        width: screenWidth / 2,
    },
});

export default BioBox;
