import { Dimensions, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import FieldsLockIconText from '../FieldsLockIconText';

import { grayphite } from '@/constants/Colors';

interface FieldsHeaderProps {
    fields: any,
    field: string,
    tooManyFieldsErr: any
    setTooManyFieldsErr: any
    witsFieldsAlreadyCopiedIndexArr: any
    setWitsFieldsAlreadyCopiedIndexArr: any
    witsFieldsIndex: any,
    setWitsFieldsIndex: any,
    witsFieldsIndexReadyToConfirm: any,
    setWitsFieldsIndexReadyToConfirm: any,
    headerLOCKshouldShowContent: any,
}

const FieldsHeader: React.FC<FieldsHeaderProps> = ({
    fields,
    field,
    tooManyFieldsErr,
    setTooManyFieldsErr,
    witsFieldsAlreadyCopiedIndexArr,
    setWitsFieldsAlreadyCopiedIndexArr,
    witsFieldsIndex,
    setWitsFieldsIndex,
    witsFieldsIndexReadyToConfirm,
    setWitsFieldsIndexReadyToConfirm,
    headerLOCKshouldShowContent,
}) => {
    return (
        <View>
            {
                headerLOCKshouldShowContent
                    ?
                    <Text style={styles.text}> {field} </Text>
                    :
                    <FieldsLockIconText unlockText={fields?.unlock || 'unlock'} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 35,
        fontFamily: 'Fuzzy Bubbles',
        color: grayphite,
        fontWeight: 400
    }
})

export default FieldsHeader;