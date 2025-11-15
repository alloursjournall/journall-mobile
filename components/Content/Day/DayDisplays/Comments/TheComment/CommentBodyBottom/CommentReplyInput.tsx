import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';

//

interface CommentReplyInputProps {
    day: any;
    replyInputValue: string;
    setReplyInputValue: any;
    setReplyInputIsTyping: any;
    mapitem: any;
}

const CommentReplyInput: React.FC<CommentReplyInputProps> = ({ day, replyInputValue, setReplyInputValue, mapitem, setReplyInputIsTyping }) => {
    const onChangeHandler = (text: string) => {
        if (replyInputValue?.includes('nigger')) {
            setReplyInputValue('...');
        }
        if (text?.length === 0) {
            setReplyInputValue('');
            return;
        }
        setReplyInputValue(text);
    };

    const inputFocus = () => {
        setReplyInputIsTyping(true);
    };

    const unFocusInput = () => {
        setReplyInputIsTyping(false);
    };

    const test = () => {
        console.log('replyInputValue', replyInputValue);
    };

    return (
        <TextInput
            maxLength={333}
            style={styles.input2}
            // style={styles.input}
            onFocus={inputFocus}
            // placeholder="Type something..."
            value={replyInputValue}
            onChangeText={onChangeHandler}
        />
    );
};

const styles = StyleSheet.create({
    input2: {
        width: 24, // give it realistic room for text
        maxHeight: 20, // ✅ fixes the tall-on-type issue
        // maxHeight: 30, // ✅ fixes the tall-on-type issue
        paddingVertical: 0, // remove RN’s default 5-6 px padding
        paddingHorizontal: 8,
        borderRadius: 50,
        borderTopLeftRadius: 14.5,
        borderTopRightRadius: 65.5,
        borderBottomLeftRadius: 122.5,
        borderBottomRightRadius: 30,
        color: '#444',
        fontFamily: 'fuzzy',
        fontSize: 10,
        borderWidth: 1.5,
        borderColor: '#44454fea',
        textAlignVertical: 'center', // ✅ keeps text centered on Android
    },

    input: {
        width: 24, // equivalent of 1.5rem (assuming 1rem = 16px)
        margin: 0,
        alignSelf: 'center',
        borderRadius: 50, // makes it circular
        borderTopLeftRadius: 14.5,
        borderTopRightRadius: 65.5,
        borderBottomLeftRadius: 122.5,
        borderBottomRightRadius: 30,
        color: '#444', // equivalent of $grayphite
        fontFamily: 'fuzzy', // make sure the font is linked properly
        fontSize: 10, // or adjust based on design
        borderWidth: 1.5,
        borderColor: '#44454fea', // border color
    },
});

export default CommentReplyInput;

// {
//     //  leave replies ternary is for the locks
//     (!day?.lock || day?.lock !== "leave replies" || (day?.lock === "leave replies" && leaveCommentLockIsUnlocked)) &&
//         //  this ternary accommodates comment settings.
//         mapitem?.thoughts_ok !== 'no' && mapitem?.text_comments_ok === true && day?.text_comments_ok === true && indentIndex !== 2
//         &&
//         <input
//             id="{replyInput}"
//             value={replyInputValue}
//             onFocus={() => replyInputFocus(replyInputIsTyping, setReplyInputIsTyping, replyInputValue, setReplyInputValue)}
//             onBlur={() => replyInputUnFocus(replyInputIsTyping, setReplyInputIsTyping)}
//             onChange={(event: any) => replyInputOnChange(event, soundCommentFile, setSoundCommentFile, voiceCommentClick, setVoiceCommentClick, setReplyInputValue)}
//             style={{ position: 'relative', left: `${indentIndex * 20}px` }}
//             className={styles.commentInput}
//             type="text"
//      j   />
// }
