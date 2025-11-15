import axios from 'axios'
import { useState, useEffect } from "react";

// redux
import { RootState } from "@/redux/store/rootReducer"
import { useSelector, useDispatch, createDispatchHook } from "react-redux"
import { SET_CURRENT_USER } from "@/redux/currentUser/currentUserSlice"

import { Dimensions, TouchableOpacity, TextInput, Image, ScrollView, View, Text, StyleSheet } from 'react-native';

import { useContentFunction } from '@/Contexts/ContentFunctions';
import { ThoughtsIcon, MomentsIcon, FieldsIcon, GreatfullIcon } from '@/constants/Images';

import { grayphite } from '@/constants/Colors';

interface props {
    day: any,
    currDaySelection: string; // Replace `string` with the appropriate type for `currDaySelection`
    setCurrDaySelection: any,
}

const CurrDaySelectionEdit: React.FC<props> = ({
    day,
    currDaySelection,
    setCurrDaySelection,
}) => {

    const changeCurrDaySelectionClick = (newSelection: string) => {
        if (newSelection === 'thoughts') {
            if (!day?.thoughts) {
                // possibly delete the button? 
            }
            setCurrDaySelection(newSelection);
        }
        if (newSelection === 'moments') {
            if (!day?.moments) {
            }
            setCurrDaySelection(newSelection);
        }
        if (newSelection === 'fields') {
            if (!day?.fields) {
            }
            setCurrDaySelection(newSelection);
        }
        if (newSelection === 'greatfullagain') {
            if (!day?.greatfullagain) {
            }
            setCurrDaySelection(newSelection);
        }
    }

    return (
        <View style={styles.actions}>
            <TouchableOpacity onPress={() => changeCurrDaySelectionClick('thoughts')} style={styles.actionButton}>
                <Image
                    source={ThoughtsIcon}
                    style={styles.currDaySelectionButton}
                />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => changeCurrDaySelectionClick('moments')} style={styles.actionButton}>
                <Image
                    source={MomentsIcon}
                    style={styles.currDaySelectionButton}
                />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => changeCurrDaySelectionClick('fields')} style={styles.actionButton}>
                <Image
                    source={FieldsIcon}
                    style={styles.currDaySelectionButton}
                />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => changeCurrDaySelectionClick('greatfullagain')} style={styles.actionButton}>
                <Image
                    source={GreatfullIcon}
                    style={styles.currDaySelectionButton}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    currDaySelectionButton: {
        width: 25,
        height: 25,
        borderRadius: 25,
        marginRight: 8,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: 'center',
        marginBottom: 8,
        padding: 2,
        height: 10
    },
    actionButton: {
        marginRight: 16,
    },
});

export default CurrDaySelectionEdit;