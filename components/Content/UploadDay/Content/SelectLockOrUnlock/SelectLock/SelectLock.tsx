import { useState } from "react";

// <>
import { Platform, Dimensions, Image, ScrollView, TouchableOpacity, View, Text, TextInput, StyleSheet } from 'react-native';
import LockNavbar from "../LockNavbar";
import PickThoughtsLock from "./Thoughts/PickThoughtsLock";
import PickMomentsLock from "./MomentsLock/PickMomentsLock";
import PickFieldsLock from "./Fields/PickFieldsLock";
import PickGreatfullLock from "./Greatfull/PickGreatfullLock";
import PickCommentsLock from "./Comments/PickCommentsLock";
import PickVotesLock from "./Votes/PickVotesLock";

// utils: 
import { ThoughtsIcon, MomentsIcon, FieldsIcon, GreatfullIcon } from "@/constants/Images";

import { grayphite, hothazel } from '@/constants/Colors';
import { specifyStringTruncate } from "@/utility/utilityValues";

interface props {
    day: any,
    setDay: any,
    lockUpdater: any,
    setLockUpdater: any,
    uploadDaySelection: any,
    setUploadDaySelection: any,
}

const SelectLock: React.FC<props> = ({
    day,
    setDay,
    lockUpdater,
    setLockUpdater,
    uploadDaySelection,
    setUploadDaySelection,
}) => {

    const [lockOrUnlock, setLockOrUnlocked] = useState<any>('lock');
    const [lockOptionSelected, setLockOptionSelected] = useState<any>('');

    return (
        <View style={styles.cont}>
            <LockNavbar
                lockOptionSelected={lockOptionSelected}
                setLockOptionSelected={setLockOptionSelected}
                uploadDaySelection={uploadDaySelection}
                setUploadDaySelection={setUploadDaySelection}
            />

            {
                lockOptionSelected === "thoughts"
                    ?
                    <PickThoughtsLock
                        day={day}
                        setDay={setDay}
                        setLockOptionSelected={setLockOptionSelected}
                        lockUpdater={lockUpdater}
                        setLockUpdater={setLockUpdater}
                    />
                    :
                    lockOptionSelected === "moments"
                        ?
                        <PickMomentsLock
                            day={day}
                            setDay={setDay}
                            setLockOptionSelected={setLockOptionSelected}
                            lockUpdater={lockUpdater}
                            setLockUpdater={setLockUpdater}
                        />
                        :
                        lockOptionSelected === "fields"
                            ?
                            <PickFieldsLock
                                day={day}
                                setDay={setDay}
                                setLockOptionSelected={setLockOptionSelected}
                                lockUpdater={lockUpdater}
                                setLockUpdater={setLockUpdater}
                            />
                            :
                            lockOptionSelected === "greatfull"
                                ?
                                <PickGreatfullLock
                                    day={day}
                                    setDay={setDay}
                                    setLockOptionSelected={setLockOptionSelected}
                                    lockUpdater={lockUpdater}
                                    setLockUpdater={setLockUpdater}
                                />
                                :
                                lockOptionSelected === "comments"
                                    ?
                                    <PickCommentsLock
                                        lockUpdater={lockUpdater}
                                        setLockUpdater={setLockUpdater}
                                        setLockOptionSelected={setLockOptionSelected}
                                    />
                                    :
                                    lockOptionSelected === "votes"
                                    &&
                                    <PickVotesLock
                                        lockUpdater={lockUpdater}
                                        setLockUpdater={setLockUpdater}
                                        setLockOptionSelected={setLockOptionSelected}
                                    />
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

export default SelectLock;