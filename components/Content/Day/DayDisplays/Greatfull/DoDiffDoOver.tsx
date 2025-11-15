// <>
import { Dimensions, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

// utils:
import { grayphite } from "@/constants/Colors";


interface DoDiffDoOverProps {
    day: any,
    usersPassLocks: any,
    setShowDoDiffDoOver: any,
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const DoDiffDoOver: React.FC<DoDiffDoOverProps> = ({
    day,
    usersPassLocks,
    setShowDoDiffDoOver
}) => {

    const showDoDiffDoOverToggle = () => {
        setShowDoDiffDoOver(false);
    }

    return (
        <View style={styles.cont}>

            <TouchableOpacity onPress={showDoDiffDoOverToggle}>
                <Text style={styles.text}> &lt; </Text>
            </TouchableOpacity>

            <Text style={styles.text}> {day?.zoom_in || 'zoom in' } </Text>
            <Text style={styles.text}> {day?.zoom_out || 'zoom out' } </Text>

        </View>
    )
}

const styles = StyleSheet.create({
    cont: {
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: 'center',
        height: '100%',
        // height: screenHeight * 0.4, // Ensure it matches the height of the image
        width: '100%', // Ensure it takes full width        
        padding: 0, // Add some padding to avoid content touching the edges
        gap: "20%"
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
    },
})

export default DoDiffDoOver;