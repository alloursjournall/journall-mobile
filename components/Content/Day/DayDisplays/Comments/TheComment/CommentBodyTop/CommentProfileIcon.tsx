// <>
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

// redux:
import { RootState } from '@/redux/store/rootReducer';
import { useSelector, useDispatch, createDispatchHook } from 'react-redux';

// utils:
import { nothing } from '@/utility/utilityValues';
import { HeartIcon, MasqueradeIcon, DiscoBallPinkIcon } from '@/constants/Images';
import { useContentFunction } from '@/Contexts/ContentFunctions';

interface CommentProfileIconProps {
    mapitem: any;
    replyInputIsTyping: any;
    replyInputValue: any;
    usersPassLocks: any;
    commentProfileIconClicked: any;
    setCommentProfileIconClicked: any;
    allUserProfileIcons: any;
    indentIndex: number;
}

const CommentProfileIcon: React.FC<CommentProfileIconProps> = ({
    mapitem,
    replyInputValue,
    usersPassLocks,
    commentProfileIconClicked,
    setCommentProfileIconClicked,
    allUserProfileIcons,
    indentIndex,
}) => {
    const commentProfileIconClickShowAddDeleteBlockMenu = () => {
        setCommentProfileIconClicked(!commentProfileIconClicked);
    };

    const { returnProfileImg } = useContentFunction();

    const CURRENT_USER = useSelector((state: RootState) => state.currentUser.CURRENT_USER);

    const profileIconUri = returnProfileImg(replyInputValue?.length > 1 ? CURRENT_USER?.id : mapitem?.user_id, allUserProfileIcons);

    let iconSource: any;

    // 🔒 lock logic
    const passesLock =
        mapitem?.non_anonymous !== 'no' ||
        (mapitem?.non_anonymous === 'no' &&
            mapitem?.lock === 'non anonymous' &&
            (usersPassLocks?.some(
                (locks: any) =>
                    (locks?.pass_comment_thoughts_all === true && locks?.thought_id === mapitem?.id) ||
                    (locks?.pass_comment_thoughts === true && locks?.thought_id === mapitem?.id && CURRENT_USER?.id === locks?.user_id),
            ) ||
                CURRENT_USER?.id === mapitem?.user_id));

    if (passesLock) {
        // ✅ non-anonymous, or lock passes
        iconSource = !mapitem?.thought.includes('vcb-')
            ? profileIconUri
                ? { uri: profileIconUri } // works on web + native
                : HeartIcon // fallback
            : DiscoBallPinkIcon; // special "vcb-" case
    } else {
        // 🔒 locked profile
        iconSource = MasqueradeIcon;
    }

    return (
        <TouchableOpacity onPress={!mapitem?.thought?.includes('vcb-') ? commentProfileIconClickShowAddDeleteBlockMenu : nothing}>
            {typeof iconSource === 'object' && iconSource.uri ? (
                // Remote image - iconSource is already { uri: string }
                <Image
                    source={iconSource} // ✅ This is correct - it's already { uri: string }
                    style={{
                        ...styles.commentingProfileIcon,
                        position: 'relative',
                        left: indentIndex * 20,
                    }}
                />
            ) : (
                // Local image - iconSource is a require() or local reference
                <Image
                    source={iconSource} // ✅ This is correct for local images
                    style={{
                        ...styles.commentingProfileIcon,
                        position: 'relative',
                        left: indentIndex * 20,
                    }}
                />
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    commentingProfileIcon: {
        height: 25,
        width: 25,
        borderRadius: 50,
    },
});

export default CommentProfileIcon;
