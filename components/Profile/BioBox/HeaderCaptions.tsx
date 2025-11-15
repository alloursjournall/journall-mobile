// top level imports
import { useState, useEffect } from "react"
import axios from 'axios'

// @reduxjs/toolkit:
import { RootState } from "redux/store/rootReducer"
import { useSelector, useDispatch } from "react-redux"

// components and styleing:
import { Platform, Dimensions, TouchableOpacity, Image, ScrollView, View, Text, StyleSheet } from 'react-native';


// utils:
import { grayphite } from "@/constants/Colors"
import { DiscoBallGoldIcon, PeaceIcon, ArtSplashIcon } from '@/constants/Images'
import { useContentFunction } from "Contexts/ContentFunctions"
import { applyMiddleware } from "@reduxjs/toolkit";

interface props {
    currProfile: any
}

const HeaderCaptions: React.FC<props> = ({
    currProfile
}) => {

    const text_1_header = currProfile?.text_1_header || ''
    const text_1_caption = currProfile?.text_1_caption || ''
    const text_2_header = currProfile?.text_2_header || ''
    const text_2_caption = currProfile?.text_2_caption || ''
    const text_3_header = currProfile?.text_3_header || ''
    const text_3_caption = currProfile?.text_3_caption || ''
    const text_4_header = currProfile?.text_4_header || ''
    const text_4_caption = currProfile?.text_4_caption || ''
    const text_5_header = currProfile?.text_5_header || ''
    const text_5_caption = currProfile?.text_5_caption || ''
    const text_6_header = currProfile?.text_6_header || ''
    const text_6_caption = currProfile?.text_6_caption || ''
    const text_7_header = currProfile?.text_7_header || ''
    const text_7_caption = currProfile?.text_7_caption || ''

    return (
        <ScrollView contentContainerStyle={styles.headerCaptionBox}>
        {/* <View style={styles.headerCaptionBox}> */}

            {text_2_header &&
                <View style={styles.bioBoxRowNamePronoun}>
                    <Text style={styles.bioBoxName}> {text_2_header} </Text>
                </View>
            }

            {text_2_caption &&
                <View style={styles.bioBoxRowNamePronoun}>
                    <Text style={styles.bioBoxPronoun}> {text_2_caption} </Text>
                </View>
            }

            {text_3_header &&
                <View style={styles.bioBoxRowNamePronoun}>
                    <Text style={styles.bioBoxName}> {text_3_header} </Text>
                </View>
            }

            {text_3_caption &&
                <View style={styles.bioBoxRowNamePronoun}>
                    <Text style={styles.bioBoxPronoun}> {text_3_caption} </Text>
                </View>
            }

            {text_4_header &&
                <View style={styles.bioBoxRowNamePronoun}>
                    <Text style={styles.bioBoxName}> {text_4_header} </Text>
                </View>
            }

            {text_4_caption &&
                <View style={styles.bioBoxRowNamePronoun}>
                    <Text style={styles.bioBoxPronoun}> {text_4_caption} </Text>
                </View>
            }

            {text_5_header &&
                <View style={styles.bioBoxRowNamePronoun}>
                    <Text style={styles.bioBoxName}> {text_5_header} </Text>
                </View>
            }

            {text_5_caption &&
                <View style={styles.bioBoxRowNamePronoun}>
                    <Text style={styles.bioBoxPronoun}> {text_5_caption} </Text>
                </View>
            }

            {text_6_header &&
                <View style={styles.bioBoxRowNamePronoun}>
                    <Text style={styles.bioBoxName}> {text_6_header} </Text>
                </View>
            }

            {text_6_caption &&
                <View style={styles.bioBoxRowNamePronoun}>
                    <Text style={styles.bioBoxPronoun}> {text_6_caption} </Text>
                </View>
            }

            {text_7_header &&
                <View style={styles.bioBoxRowNamePronoun}>
                    <Text style={styles.bioBoxName}> {text_7_header} </Text>
                </View>
            }

            {text_7_caption &&
                <View style={styles.bioBoxRowNamePronoun}>
                    <Text style={styles.bioBoxPronoun}> {text_7_caption} </Text>
                </View>
            }

        </ScrollView>
        // </View>
    )
}

const styles = StyleSheet.create({
    headerCaptionBox: {
        flexDirection: 'column', // Default flex direction for grid layout
        height: 'auto', // Flexible height based on content
        maxWidth: '100%', // Full width of parent
        gap: 0, // No gap between rows (you can adjust if needed)
        overflowY: 'auto', // Make content scrollable vertically
        padding: 0, // Padding is optional; adjust if needed
        // borderWidth: 5, // Uncomment for testing
        // borderColor: 'orange', // Uncomment for testing
        // boxSizing: 'border-box' is a default in React Native
    },

    bioBoxCont: {
        display: 'flex', // Implicit in RN but keeping it for clarity
        flexDirection: 'column',
        justifyContent: 'flex-start', // Mimics `grid-template-rows: auto auto;`
        alignItems: 'stretch', // Makes rows take full width
        flexWrap: 'nowrap',
        maxWidth: '100%', // No `vw`, but this keeps it responsive
        gap: 0, // Not native, but margins/Textadding can replace it
        marginTop: 0,
        overflow: 'hidden', // No `overflow-y: auto`, but ScrollView can do that
    },

    bioBoxName: {
        color: grayphite,
        fontFamily: "Fuzzy Bubbles",
        letterSpacing: 2,
        textTransform: 'uppercase',
        fontSize: 18,
        fontWeight: 400,
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
        fontFamily: Platform.OS === "ios" ? "System" : "sans-serif",
        letterSpacing: 2,
        textTransform: 'uppercase',
        fontSize: 18,
        fontWeight: 400,
    },
    bioBoxRowText: {
        fontFamily: "Fuzzy Bubbles",
        color: grayphite,
        fontSize: 16,
        fontWeight: 400,
        margin: 0,
        lineHeight: 1
    },

    slightSplitRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
        gap: 5,
        boxSizing: 'border-box',
    },
})

export default HeaderCaptions;