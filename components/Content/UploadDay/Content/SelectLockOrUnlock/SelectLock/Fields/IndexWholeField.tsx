import { useState, useEffect } from "react";

// styles and <>
import { Platform, Dimensions, Image, ScrollView, TouchableOpacity, View, Text, TextInput, StyleSheet } from 'react-native';

// utils:
import { GreenForwardArrowIcon, RunningIcon, DecideDoIcon, LitFireIcon, EyeIcon, StarIcon } from "@/constants/Images"
import { specifyStringTruncate } from "@/utility/utilityValues"
import { grayphite } from "@/constants/Colors";

interface props {
    field: any,
    index: any,
    uploadDayFields: any,
}

const IndexWholeField: React.FC<props> = ({
    field,
    index,
    uploadDayFields
}) => {


    return (
        <View key={`mapitemColumnCont-${field}-${index}`} style={styles.mapitemColumnCont}>
            <View key={`constantseeRow-${field}-${index}`} style={styles.constantseeRow}>
                <Image key={`shoes-${field}-${index}`} style={styles.constantseeRowIcon} source={RunningIcon} />
                <Image key={`fire-${field}-${index}`} style={styles.constantseeRowIcon} source={LitFireIcon} />
                <Image key={`eyes-${field}-${index}`} style={styles.constantseeRowIcon} source={EyeIcon} />
                <Image key={`decideDo-${field}-${index}`} style={styles.constantseeRowIcon} source={DecideDoIcon} />
            </View>

            {/* <p className={styles.grassGradientBorder} key={`header${index}`} style={styles.fieldsHeader}> {specifyStringTruncate(field, 12)} </p> */}

            <View key={`mapitemBottomContText-${field}-${index}`} style={styles.mapitemColumnCont}>
                <Text key={`text${index}`} style={styles.fieldsText}> {specifyStringTruncate(uploadDayFields?.text[index], 7)} </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mapitemColumnCont: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2.5,        
    },
    constantseeRowIcon: {
        height: 10,
        width: 10
    },
    constantseeRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fieldsText: {
        fontFamily: 'Fuzzy Bubbles',
        color: grayphite,
        fontSize: 12.5,
    }, 
    
})

export default IndexWholeField;