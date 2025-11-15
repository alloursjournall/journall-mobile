import { ThoughtsIcon, MomentsIcon, FieldsIcon, GreatfullIcon, LitFireIcon, CheeseIcon2, PindropIcon, CrownIcon, HeartIcon } from '@/constants/Images';
import { Image, StyleSheet } from 'react-native';

interface CommentIconProps {
    commentIcon: string;
    indentIndex: number;
}

const CommentIcon: React.FC<CommentIconProps> = ({ commentIcon, indentIndex }) => {
    return (
        <Image
            source={
                commentIcon === 'cheese'
                    ? CheeseIcon2
                    : commentIcon === 'iconLitFire'
                    ? LitFireIcon
                    : commentIcon === 'thoughts'
                    ? ThoughtsIcon
                    : commentIcon === 'moments'
                    ? MomentsIcon
                    : commentIcon === 'fields'
                    ? FieldsIcon
                    : commentIcon === 'greatfull'
                    ? GreatfullIcon
                    : commentIcon === 'pin'
                    ? PindropIcon
                    : commentIcon === 'crown'
                    ? CrownIcon
                    : HeartIcon
            }
            style={styles.icon}
        />
    );
};

const styles = StyleSheet.create({
    icon: {
        height: 15,
        width: 15,
        borderRadius: 50,
    },
});

export default CommentIcon;
