// <>
import { Dimensions, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import FieldsLockIconText from '../FieldsLockIconText';

// utils:
import { DecideDoIcon, DecideYesIcon, DecideNoIcon, StarIcon } from '@/constants/Images';

interface DecisionFieldProps {
    day: any;
    decideDoLOCKshouldShowContent: any;
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const DecideDo: React.FC<DecisionFieldProps> = ({ day, decideDoLOCKshouldShowContent }) => {
    const dd = day?.decidedo[0] || day?.decidedo;
    const fields = day?.fields || null;

    return decideDoLOCKshouldShowContent ? (
        <View style={styles.decideDoCont}>
            <View style={styles.mapitemTopContCheckboxHeaderConstantsee}>
                <Image source={dd?.did_do_status === true ? DecideYesIcon : dd?.did_do_status === false ? DecideNoIcon : DecideDoIcon} style={styles.images} />

                <Image source={StarIcon} style={styles.images} />

                {/* <Image source={PaperBallot} /> */}
            </View>

            <Text style={styles.decideDoHeader}> {dd?.decide} </Text>
            {/*    &gt;     to flip through do_different && do_over  */}

            <View style={styles.mapitemBottomContText}>{dd?.did_do_summary && <Text style={styles.decideDoText}> {dd?.did_do_summary} </Text>}</View>
        </View>
    ) : (
        <FieldsLockIconText unlockText={fields?.lock || 'unlock'} />
    );
};

const styles = StyleSheet.create({
    decideDoCont: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        borderBottomLeftRadius: 105, // 45,
        borderBottomRightRadius: 25,
        borderColor: '#6f4f28',
        width: screenWidth / 2,
        borderWidth: 6,
        backgroundColor: 'white',
    },
    mapitemTopContCheckboxHeaderConstantsee: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    mapitemBottomContText: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    decideDoHeader: {
        fontFamily: '',
        fontSize: 20,
        lineHeight: 1,
        textAlign: 'center',
        color: '#6f4f28',
        // width: 100%;
        // text-align: center;
        // font-size: 28px;
        // line-height: 1;
    },
    decideDoText: {
        fontSize: 14,
    },
    images: {
        height: 35,
        width: 35,
    },
    actionButton: {
        height: 35,
        width: 35,
    },
});

export default DecideDo;
