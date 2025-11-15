import { Platform, ScrollView, Dimensions, Image, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
// <Video> / mobile: npm i react-native-video web: npm i react-player
import Video from 'react-native-video';
import ReactPlayer from 'react-player/lazy';

interface props {
    uri: string,
    height: any,
    width: any
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const VideoPlayer: React.FC<props> = ({
    uri,
    height,
    width
}) => {
    return (
        <View style={[ { height: height, width: width }, styles.container]}>
            {Platform.OS === 'web' ? (
                <ReactPlayer url={uri} controls  />
                // <ReactPlayer url={uri} controls width="100%" height="300px" />                    
            ) : (
                <Video source={{ uri: uri }} style={styles.centerCont} controls resizeMode="contain" />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: screenHeight,
        width: screenWidth
    },
    centerCont: {
        height: screenHeight,
        width: screenWidth,
    }
})