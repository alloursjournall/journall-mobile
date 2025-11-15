//  <>
import { Dimensions, ScrollView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface VoteDisplayProps {
    index: any;
    mapitem: any;
    voteType: any;
    currVotes: any;
}

const VoteDisplay: React.FC<VoteDisplayProps> = ({ index, mapitem, voteType, currVotes }) => {
    console.log('mapitem', mapitem);
    return (
        <View>
            {Array.isArray(currVotes) &&
                currVotes?.some((votes: any) => (voteType.includes('comment') ? votes?.vote_int === mapitem?.id : votes?.vote_string === mapitem)) && (
                    <Text key={`numOfVotes${index}`} style={styles.voteLengthText}>
                        {currVotes?.filter((votes: any) => (voteType.includes('comment') ? votes?.vote_int === mapitem?.id : votes?.vote_string === mapitem))?.length}
                    </Text>
                )}
        </View>
    );
};

const styles = StyleSheet.create({
    voteLengthText: {
        fontSize: 16,
        fontFamily: 'Fuzzy Bubbles',
    },
});

export default VoteDisplay;
