// top level imports
import { useState, useEffect } from 'react';
import axios from 'axios';

// @reduxjs/toolkit:
import { RootState } from 'redux/store/rootReducer';
import { useSelector, useDispatch } from 'react-redux';

// components and styleing:
import { Platform, Dimensions, TouchableOpacity, Image, ScrollView, View, Text, StyleSheet } from 'react-native';

// utils:
import { grayphite, grayfight } from '@/constants/Colors';
import { DiscoBallGoldIcon, EyeIcon, GhostIcon, PeaceIcon } from '@/constants/Images';

import { useContentFunction } from 'Contexts/ContentFunctions';
import { specifyStringTruncate } from 'utility/utilityValues';

interface props {
    eventActivity: any;
    nextEvent: any;
    selectedEvent: any;
    setSelectedEvent: any;
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const EventPreview: React.FC<props> = ({ eventActivity, nextEvent, selectedEvent, setSelectedEvent }) => {
    const description: string = eventActivity?.description;

    const [showMoreDescription, setShowMoreDescription] = useState(false);

    const showMoreDescriptionClick = () => {
        setShowMoreDescription(!showMoreDescription);
    };

    const selectEventClick = () => {
        setSelectedEvent(eventActivity);
    };

    const test = () => {
        console.log('eventActivity', eventActivity);
    };

    return (
        <View style={styles.eventPreviewBox}>
            {/* <View style={styles.dataRowBottomToolBar}>  */}

            {/* {     🚨 🚨 check for {event.public_event} during render. if it's private, it'll show the ghost
        event?.public_event && */}

            <View style={styles.eventBoxCont}>
                <View style={styles.eventTopRow}>
                    <View style={styles.eventTopRowLeft}>
                        {eventActivity?.icon && (
                            <Image
                                style={styles.dataRowTopToolBarIcon}
                                source={
                                    eventActivity?.is_chill_event
                                        ? PeaceIcon
                                        : !eventActivity?.icon || eventActivity?.icon === 'error'
                                        ? DiscoBallGoldIcon
                                        : eventActivity?.icon
                                }
                            />
                        )}
                        <Text style={[{ color: '#D86220' }, styles.bioBoxName]}> {eventActivity?.event_name} </Text>
                        <Text style={[{ color: nextEvent ? '#D86220' : '' }, styles.bioBoxPronoun]}> {eventActivity?.start_date} </Text>

                        {!eventActivity?.public_event && <Image style={styles.dataRowTopToolBarIconMini} source={GhostIcon} />}
                    </View>

                    <View style={styles.eventTopRowRight}>
                        <TouchableOpacity onPress={selectEventClick}>
                            <Image style={styles.dataRowTopToolBarIconMini} source={EyeIcon} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.eventBottom}>
                    {description?.length >= 75 && !showMoreDescription ? (
                        <p onClick={showMoreDescriptionClick} style={styles.bioBoxPronoun}>
                            {' '}
                            {specifyStringTruncate(description, 75)}{' '}
                        </p>
                    ) : (
                        <p onClick={showMoreDescriptionClick} style={styles.bioBoxPronoun}>
                            {' '}
                            {description}{' '}
                        </p>
                    )}

                    {/*  <p style={styles.bioBoxPronoun}> {eventActivity?.description} </p> */}
                </View>
            </View>
            {/* } */}
        </View>
    );
};

const styles = StyleSheet.create({
    eventPreviewBox: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        // justifyContent: "space-around",
        paddingLeft: 5,
        borderBottomWidth: 2,
        borderBottomColor: grayphite,
        borderStyle: 'dotted',
    },

    bioBoxName: {
        color: grayphite,
        fontFamily: 'Fuzzy Bubbles',
        letterSpacing: 2,
        textTransform: 'uppercase',
        fontSize: 18,
        fontWeight: 400,
    },

    bioBoxPronoun: {
        color: grayphite,
        fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
        letterSpacing: 2,
        textTransform: 'uppercase',
        fontSize: 18,
        fontWeight: 400,
    },
    eventBoxCont: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        gap: 2.5,
        padding: 5,
        maxWidth: screenWidth,
    },

    eventTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: screenWidth * 0.8,
        gap: 10,
    },

    eventTopRowLeft: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: screenWidth * 0.5,
    },

    eventTopRowRight: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: screenWidth * 0.2,
    },

    eventBottom: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: screenWidth * 0.8,
    },

    dataRowTopToolBarIcon: {
        height: 50,
        width: 50,
    },

    dataRowTopToolBarIconMini: {
        height: 35,
        width: 35,
    },
});

export default EventPreview;
