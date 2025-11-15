import { useState } from "react";

// <>
import { Platform, Dimensions, Image, ScrollView, TouchableOpacity, View, Text, TextInput, StyleSheet } from 'react-native';
import RenderLockOptionRow from "./RenderLockOptionRow";
import ThoughtsIndexRenderRow from "./ThoughtsIndexRenderRow";

// utils: 
import { ThoughtsIcon, MomentsIcon, FieldsIcon, GreatfullIcon } from "@/constants/Images";

import { grayphite, hothazel } from '@/constants/Colors';
import { specifyStringTruncate } from "@/utility/utilityValues";

interface props {
    // day.thoughts is replacing: uploadThoughtsBinObj
    // 🚨 🚨 also: might not do setDay, {lockUpdater} and {day} merge later on.
    day: any,
    setDay: any,
    // to restore defaults when lock is submitted, take user out of the menu that picks day.thoughts.lock
    setLockOptionSelected: any,
    lockUpdater: any,
    setLockUpdater: any
}

const PickThoughtsLock: React.FC<props> = ({
    day,
    setDay,
    setLockOptionSelected,
    lockUpdater,
    setLockUpdater
}) => {

    const dayThoughts: any = Array.isArray(day?.thoughts) && day?.thoughts;

    const [checkboxArray, setCheckboxArray] = useState<any>([
        { lock: "all thoughts", indexItem: '', isChecked: false },
        { lock: "soundComments", indexItem: '', isChecked: false },
        { lock: "textComments", indexItem: '', isChecked: false },
        ...dayThoughts.map((thought: any, index: number) => ({
            lock: "index", // You can customize this value as per your requirements
            index: index,
            indexItem: thought.text || thought.blob, // Using thought.text for indexItem
            isChecked: false // Initial isChecked value
        }))
    ]);

    return (
        <ScrollView contentContainerStyle={styles.cont}>

            <RenderLockOptionRow
                lock={"all thoughts"}
                table={'thoughts'}
                item={null}
                checkboxArray={checkboxArray}
                setCheckboxArray={setCheckboxArray}
                lockUpdater={lockUpdater}
                setLockUpdater={setLockUpdater}
                setLockOptionSelected={setLockOptionSelected}
            />

            <ThoughtsIndexRenderRow
                dayThoughts={dayThoughts}
                lock={"index"}
                table={'thoughts'}
                checkboxArray={checkboxArray}
                setCheckboxArray={setCheckboxArray}
                lockUpdater={lockUpdater}
                setLockUpdater={setLockUpdater}
                setLockOptionSelected={setLockOptionSelected}
            />

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    cont: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    }
})

export default PickThoughtsLock;