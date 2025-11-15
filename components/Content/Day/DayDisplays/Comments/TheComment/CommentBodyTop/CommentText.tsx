import { Text, ScrollView, View, StyleSheet } from 'react-native';

// utils:
import { grayphite } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';

interface CommentTextProps {
    mapitem: any;
    indentIndex: number;
}

const CommentText: React.FC<CommentTextProps> = ({ mapitem, indentIndex }) => {
    return mapitem?.thought?.includes('vcb-') ? (
        <View style={styles.voteCommentBucketDiscoSquareThoughtCont}>
            {[...Array(3)].map((_, index) => (
                <View key={`view${index}`} style={styles.voteCommentBucketDiscoSquareThoughtCont}>
                    <Text
                        key={`text${index}`}
                        style={[
                            styles.commentText,
                            {
                                color: index === 0 || index === 1 ? '#814c89' : index === 2 ? '#f85d94' : grayphite, // fallback so color is always a string
                            },
                        ]}
                    >
                        {' '}
                        {index === 0 ? 'Lets.' : index === 1 ? 'Talk.' : index === 2 && 'Votes!'}
                    </Text>
                    <LinearGradient
                        colors={['#814c89', '#f85d94']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{
                            height: 15,
                            width: 15,
                            marginHorizontal: 2,
                            transform: [{ rotate: '25deg' }],
                            borderWidth: 2,
                            borderColor: '#814c89',
                            shadowColor: '#4a4a4a',
                            shadowOffset: { width: 2, height: 2 },
                            shadowOpacity: 0.5,
                            shadowRadius: 2,
                        }}
                    />
                </View>
            ))}
        </View>
    ) : (
        <ScrollView contentContainerStyle={styles.textContScrolling}>
            <Text style={{ ...styles.commentText, position: 'relative', left: indentIndex * 20 }} key={`comment${mapitem?.thought}`}>
                {' '}
                {mapitem?.thought}{' '}
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    textContScrolling: {},

    voteCommentBucketDiscoSquareThoughtCont: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
    },

    pinkDiscoSquare: {
        borderWidth: 2,
        borderColor: '#814c89',
        backgroundColor: '#814c89', // Fallback solid color
        height: 15,
        width: 15,
        transform: [{ rotate: '25deg' }],
        shadowColor: '#555', // Replace `$grayphite` with an actual color
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 4, // Android shadow
    },
    commentText: {
        color: grayphite,
        fontFamily: 'Fuzzy Bubbles',
    },
});

export default CommentText;
