// <>
import { Dimensions, ScrollView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import ThreeWordsOfTheDay from './ThreeWordsOfTheDay';

// utils:
import { grayphite, hothazel } from '@/constants/Colors';

interface QuestionConcernCriticismProps {
    greatfull: any
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const QuestionConcernCriticism: React.FC<QuestionConcernCriticismProps> = ({ greatfull }) => {
    return (
        <View style={styles.concernQuestionCriticismCont}>

            <ScrollView contentContainerStyle={styles.actualTextCont}>

                <Text style={styles.actualText}>
                    {
                        greatfull?.question?.length > 1 ? greatfull.question :
                            greatfull?.criticism?.length > 1 ? greatfull.criticism :
                                greatfull?.concern?.length > 1 ? greatfull.concern : ""
                    }
                </Text>

            </ScrollView>


            <View style={styles.punctuationTextCont}>
                <Text style={styles.actualText}>
                    {
                        greatfull?.question?.length > 1 ? "?" :
                            greatfull?.concern?.length > 1 ? "." :
                                greatfull?.criticism?.length > 1 ? "!" : ""
                    }
                </Text>
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    actualTextCont: {
        justifyContent: 'flex-start',
        width: "70%",
        height: screenHeight * 0.1,
    },
    actualText: {
        color: hothazel,
        fontWeight: 500,
        fontSize: 25
    },
    punctuationTextCont: {
        justifyContent: 'center',
        // width: "50%",
        height: screenHeight * 0.2,
    },
    punctuationText: {
        color: hothazel,
        fontWeight: 500,
        fontSize: 20
    },
    concernQuestionCriticismCont: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        // borderWidth: 2,
        fontSize: 20,
        color: grayphite,
        height: screenHeight * 0.2,
        padding: 10
    },

})

export default QuestionConcernCriticism;