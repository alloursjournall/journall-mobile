import { BananaIcon } from "@/constants/Images"
import { TouchableOpacity, Dimensions, View, Image, Text, StyleSheet } from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

interface Bananas {
    size: string,
    setShowError: any,
}


const ErrorSlippedUpBanana: React.FC<Bananas> = ({ size, setShowError }) => {
    return (
        size === "mini"
            ?
            <ErrorRowMini setShowError={setShowError} />
            :
            <Text> Hey </Text>
    )
}

interface ErrorProps {
    setShowError: any
}

const ErrorRowMini: React.FC<ErrorProps> = ({ setShowError}) => {

    const acknowledgeError = () => {
        setShowError(false);
    }

    return (
        <View style={styles.errorRowMiniCont}>
            <TouchableOpacity onPress={acknowledgeError} style={styles.actionButton}>
                <Image source={BananaIcon} style={styles.errorRowMiniBanana} />
                <Text> Slipped up! </Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    errorRowMiniCont: {
        width: "100%",
        flexDirection: "row",
        height: screenHeight * 0.4
    },

    errorRowMiniBanana: {
        height: 25,
        width: 25,
    },
    errorRowMiniText: {
        fontSize: 16
    },
    actionButton: {
        marginRight: 16,
    },
})

export default ErrorSlippedUpBanana;