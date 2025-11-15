import { Platform, ScrollView, Dimensions, Image, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { LockIcon, UnlockIcon } from "@/constants/Images"

interface ThoughtsLockBig {
    contSize: number,
    lockText: string,
    unlockText: string,
    imageSize: number,
    textSize: number
}

const ThoughtsLockBig: React.FC<ThoughtsLockBig> = ({
    contSize,
    lockText,
    unlockText,
    imageSize,
    textSize,
}) => {

    const isNumericLock = /^\d+$/.test(lockText); // Checks if lockText contains only digits

    return (

        <View style={[{ height: contSize, width: contSize }, styles.cont]}>

            {

                // <View style={styles.lockTextColumn}>
                //     <Image style={{ height: imageSize, width: imageSize }} source={LockIcon} />
                //     {
                //         !isNumericLock &&
                //         <Text style={[styles.text, { fontSize: textSize }]}> {lockText} </Text>
                //     }
                // </View>
            }

            <View style={[ {width: "100%" }, styles.lockTextRow]}>
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
    lockTextColumn: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
    text: {
        textAlign: 'center',
        fontFamily: "Fuzzy Bubbles",
    }
})

export default ThoughtsLockBig;