import { useState } from "react";

// <>
import { Platform, Dimensions, Image, ScrollView, TouchableOpacity, View, Text, TextInput, StyleSheet } from 'react-native';
import UnlockNavbar from "./UnlockNavbar";
import UnlockMenu from "./UnlockMenu";

// utils: 
import { ThoughtsIcon, MomentsIcon, FieldsIcon, GreatfullIcon } from "@/constants/Images";

import { grayphite, hothazel } from '@/constants/Colors';
import { specifyStringTruncate } from "@/utility/utilityValues";

interface props {
    day: any,
    setDay: any,
    unlockUpdater: any,
    setUnlockUpdater: any,
    uploadDaySelection: any,
    setUploadDaySelection: any,
}

const SelectUnlock: React.FC<props> = ({
    day,
    setDay,
    unlockUpdater,
    setUnlockUpdater,
    uploadDaySelection,
    setUploadDaySelection,
}) => {

    const thoughts = day?.thoughts || null;
    const fields = day?.fields || null;
    

    const [lockOrUnlock, setLockOrUnlocked] = useState<any>('lock');
    const [unlockOptionSelected, setUnlockOptionSelected] = useState<any>('');

    return (

        <View style={styles.cont}>
            <UnlockNavbar
                unlockOptionSelected={unlockOptionSelected}
                setUnlockOptionSelected={setUnlockOptionSelected}
                uploadDaySelection={uploadDaySelection}
                setUploadDaySelection={setUploadDaySelection}
            />

            {
                unlockOptionSelected === "thoughts" || unlockOptionSelected === "moments" || unlockOptionSelected === "fields" || unlockOptionSelected === "greatfull" || unlockOptionSelected === "comments" || unlockOptionSelected === "votes"
                    // or just modular as <UnlockMenu table={unlockOptionSelected}/>
                    ?
                    <UnlockMenu
                        thoughts={thoughts}
                        fields={fields}
                        setDay={setDay}
                        unlockUpdater={unlockUpdater}
                        setUnlockUpdater={setUnlockUpdater}
                        setUnlockOptionSelected={setUnlockOptionSelected}
                        table={unlockOptionSelected}
                    />
                    :
                    <Text>  </Text>
            }

        </View>

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

export default SelectUnlock;