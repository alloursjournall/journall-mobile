import { TextInput, StyleSheet } from "react-native";

//
interface CommentReplyInputProps {
  event: any;
  replyInputValue: string;
  setReplyInputValue: any;
  setReplyInputIsTyping: any;
  mapitem: any;
}

const CommentReplyInput: React.FC<CommentReplyInputProps> = ({
  // 🚨 to modulariz remove event, it's not used so this <> is agnostic to {day}| {event}
  event,
  replyInputValue,
  setReplyInputValue,
  mapitem,
  setReplyInputIsTyping,
}) => {
  const onChangeHandler = (text: string) => {
    if (replyInputValue?.includes("nigger")) {
      setReplyInputValue("...");
    }
    setReplyInputValue(text);
  };

  const inputFocus = () => {
    setReplyInputIsTyping(true);
  };

  const unFocusInput = () => {
    setReplyInputIsTyping(false);
  };

  return (
    <TextInput
      maxLength={333}
      style={styles.input}
      onFocus={inputFocus}
      // placeholder="Type something..."
      value={replyInputValue}
      onChangeText={onChangeHandler}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: 24, // equivalent of 1.5rem (assuming 1rem = 16px)
    margin: 0,
    alignSelf: "center",
    borderRadius: 50, // makes it circular
    borderTopLeftRadius: 14.5,
    borderTopRightRadius: 65.5,
    borderBottomLeftRadius: 122.5,
    borderBottomRightRadius: 30,
    color: "#444", // equivalent of $grayphite
    fontFamily: "fuzzy", // make sure the font is linked properly
    fontSize: 10, // or adjust based on design
    borderWidth: 1.5,
    borderColor: "#44454fea", // border color
  },
});

export default CommentReplyInput;
