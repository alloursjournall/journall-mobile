import { useState } from "react";

// <>
import { View, TouchableOpacity, Text, Image, StyleSheet, ViewStyle } from "react-native";

// utils:
import { LockIcon, UnlockIcon } from "@/constants/Images"

interface props {
    unlockText: string
}

const FieldsLockIconText: React.FC<props> = ({
    unlockText
}) => {

    const [showText, setShowText] = useState<boolean>(false);

    const showTextToggle = () => {
        setShowText(!showText);
    }

    return (
        <View style={styles.cont}>

            {
                showText
                    ?
                    <TouchableOpacity onPress={showTextToggle}>
                        <Text> {unlockText || 'unlock'} </Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={showTextToggle}>
                        <Image source={UnlockIcon} />
                    </TouchableOpacity>
            }

        </View>
    )
}

const styles = StyleSheet.create({
    cont: {
        flexDirection: "row",
        // gap: 10,
    },
    lockImageTextCont: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
    },
    unlockText: {
        fontFamily: "Fuzzy Bubbles",
        fontSize: 16,
    }
});

export default FieldsLockIconText;