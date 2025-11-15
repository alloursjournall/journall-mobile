// <>
import { View, TouchableOpacity, Text, Image, StyleSheet, ViewStyle } from "react-native";

// utils:
import { LockIcon, UnlockIcon } from "@/constants/Images"

type JustifyContentType =
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";

interface LockUnlockInfoDisplayRowProps {
    lockText: string;
    unlockText: string;
    justifyContent: JustifyContentType;
    width: ViewStyle["width"]; // ✅ Fix: Ensures it matches React Native's expected type

    //   to set whatever state made <LockUnlockInfoDisplayRow> appear to be set false which would restore defaults.
    setState: any,
}

const LockUnlockInfoDisplayRow: React.FC<LockUnlockInfoDisplayRowProps> = ({
    lockText,
    unlockText,
    justifyContent,
    width,
    setState
}) => {

    const goBackToWhateverUserWasDoing = () => {
        setState(false);
    }

    return (
        <View style={[styles.cont, { justifyContent, width }]}>
            <View style={styles.lockImageTextCont}>
                <TouchableOpacity onPress={goBackToWhateverUserWasDoing}>
                    <Image source={LockIcon} />
                </TouchableOpacity>
                <Text>{lockText}</Text>
            </View>

            <View style={styles.lockImageTextCont}>
                <TouchableOpacity onPress={goBackToWhateverUserWasDoing}>
                    <Image source={UnlockIcon} />
                </TouchableOpacity>
                <Text>{unlockText}</Text>
            </View>
        </View>
    );
};

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
});

export default LockUnlockInfoDisplayRow;
