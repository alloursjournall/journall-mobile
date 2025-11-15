import { Dimensions, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import FieldsLockIconText from '../FieldsLockIconText';

interface FieldsCaptionProps {
    fields: any,
    captionLOCKshouldShowContent: any,
    witsFieldsIndex: any;
    fieldsText: any
}

const FieldsCaption: React.FC<FieldsCaptionProps> = ({
    fields,
    captionLOCKshouldShowContent,
    witsFieldsIndex, 
    fieldsText,    
}) => {
    return (
        captionLOCKshouldShowContent
        ?
        <Text style={styles.text}> {fieldsText} </Text>       
        :
        <FieldsLockIconText unlockText={fields?.unlock}/>
    )
}

const styles = StyleSheet.create({
    text: {
        marginTop: 10,
        fontSize: 16,
    }
})

export default FieldsCaption;