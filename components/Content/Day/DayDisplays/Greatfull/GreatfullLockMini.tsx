// <>
import { View, TouchableOpacity, Text, Image, StyleSheet, ViewStyle } from "react-native";

// utils:
import { LockIcon, UnlockIcon } from "@/constants/Images"

interface GreatfuillLockMiniProps {
    unlockText: string
}

const GreatfullLockMini: React.FC<GreatfuillLockMiniProps> = ({
    unlockText
}) => {
    return (
        <View style={styles.cont}>

            <View style={styles.lockImageTextCont}>
                    <Image source={UnlockIcon} />
                <Text> {unlockText || 'unlock'} </Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    cont: {
        flexDirection: "row",
        gap: 10,
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

export default GreatfullLockMini;