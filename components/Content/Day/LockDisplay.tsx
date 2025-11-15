import { Platform, ScrollView, Dimensions, Image, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { LockIcon, UnlockIcon } from "@/constants/Images"

interface LockDisplayProps {
    contSize: number,
    lockText: string,
    unlockText: string,
    imageSize: number,
    textSize: number
}

const LockDisplay: React.FC<LockDisplayProps> = ({
    contSize,
    lockText,
    unlockText,
    imageSize,
    textSize,
}) => {
    return (
        <View style={[{ height: contSize, width: contSize }, styles.cont]}>
            <View style={styles.lockTextRow}>
                <Image style={{ height: imageSize, width: imageSize }} source={LockIcon} />
                <Text style={[styles.text, { fontSize: textSize }]}> {lockText} </Text>
            </View>

            <View style={styles.lockTextRow}>
                <Image style={{ height: imageSize, width: imageSize }} source={UnlockIcon} />
                <Text style={[styles.text, { fontSize: textSize }]}> {unlockText} </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cont: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        // height: '100%',
        // width: '100%',
    },
    lockTextRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
    text: {
        textAlign: 'center',
        fontFamily: "Fuzzy Bubbles",
    }
})

export default LockDisplay;