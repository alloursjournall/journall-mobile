import { TouchableOpacity, Image, StyleSheet } from "react-native";

// utils:
import { SoundWaveIcon, RedBackArrowIcon } from "@/constants/Images";

interface SoundIconButtonProps {
  event: any;
  commentStarsQuestionClick: any;
  setCommentStarsQuestionClick: any;
  replyInputIsTyping: boolean;
  setReplyInputIsTyping: any;
  replyInputValue: string;
  setReplyInputValue: any;
  voiceCommentClick: boolean;
  setVoiceCommentClick: any;
  leaveCommentLockShouldShowContent: boolean;
}

const SoundIconButton: React.FC<SoundIconButtonProps> = ({
  event,
  commentStarsQuestionClick,
  setCommentStarsQuestionClick,
  replyInputIsTyping,
  setReplyInputIsTyping,
  replyInputValue,
  setReplyInputValue,
  voiceCommentClick,
  setVoiceCommentClick,
  leaveCommentLockShouldShowContent,
}) => {
  const soundCommentClick = () => {
    if (replyInputIsTyping === true) setReplyInputIsTyping(false);
    if (commentStarsQuestionClick) setCommentStarsQuestionClick(false);
    // if (replyInputValue !== "") setReplyInputValue('')
    setVoiceCommentClick(true);
  };

  const goBackFromSoundCommentClick = () => {
    setVoiceCommentClick(false);
  };

  return (
    // (!day?.lock || day?.lock !== "leave replies" || (day?.lock === "leave replies" && leaveCommentLockIsUnlocked)) &&
    voiceCommentClick ? (
      <TouchableOpacity onPress={goBackFromSoundCommentClick}>
        <Image style={styles.icon} source={RedBackArrowIcon} />
      </TouchableOpacity>
    ) : (
      <TouchableOpacity onPress={soundCommentClick}>
        <Image style={styles.icon} source={SoundWaveIcon} />
      </TouchableOpacity>
    )
  );
};

const styles = StyleSheet.create({
  icon: {
    height: 20,
    width: 20,
  },
  iconSoundWave: {
    height: 25,
    width: 25,
  },
});

export default SoundIconButton;
