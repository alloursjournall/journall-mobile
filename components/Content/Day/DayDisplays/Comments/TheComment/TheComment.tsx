// useState:
import { useState, useRef } from 'react';

//  <>
import { Dimensions, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import MainRootCommentsLoop from '../MainRootCommentsLoop';
import ChildCommentsLoop from '../ChildCommentsLoop';
import CheckboxContainer from './CheckboxContainer/CheckboxContainer';
import CommentBodyTop from './CommentBodyTop/CommentBodyTop';
import CommentBodyBottom from './CommentBodyBottom/CommentBodyBottom';
import StarsShowUsers from './StarsShowUsers.tsx/StarsShowUsers';

// utils:
import { grayphite } from '@/constants/Colors';
import { useContentFunction } from '@/Contexts/ContentFunctions';
import { CommentIcon, BallotIcon } from '@/constants/Images';
import { getMostRecentDayPostWithUserIdQueryStringFunc } from '@/graphql/queries';
import { createIconSetFromFontello } from '@expo/vector-icons';

interface TheCommentProps {
    mapitem: any;
    index: number;
    indentIndex: any;
    allUserProfileIcons: any;
    setAllUserProfileIcons: any;
    day: any;
    usersPassLocks: any;
    setUsersPassLocks: any;
    usersAllowedToUnlock: any;
    setUsersAllowedToUnlock: any;
    comments: any;
    setComments: any;
    commentStars: any;
    soundComments: any;
    setSoundComments: any;
    setCommentStars: any;
}

const TheComment: React.FC<TheCommentProps> = ({
    mapitem,
    index,
    indentIndex,
    allUserProfileIcons,
    setAllUserProfileIcons,
    day,
    usersPassLocks,
    setUsersPassLocks,
    usersAllowedToUnlock,
    setUsersAllowedToUnlock,
    comments,
    setComments,
    soundComments,
    setSoundComments,
    commentStars,
    setCommentStars,
}) => {
    const { submitTextComment } = useContentFunction();

    const dayCommenterCanDetermine = day?.commenter_can_determine || false;

    // comment settings when user replies.
    const [newCommentStarrable, setNewCommentStarrable] = useState('yes');
    const [newCommentThoughtsOk, setNewCommentThoughtsOk] = useState('yes');
    const [newCommentStarsShowAvg, setNewCommentStarsShowAvg] = useState(true);
    const [newCommentStarsShowUsers, setNewCommentStarsShowUsers] = useState(true);
    const [newCommentLock, setNewCommentLock] = useState('');
    const [newCommentUnlock, setNewCommentUnlock] = useState('');
    const [newCommentIsNonAnonymous, setNewCommentIsNonAnonymous] = useState('yes');
    const [anonymousCommentsOk, setAnonymousCommentsOk] = useState(true);
    const [newCommentNonAnonymous, setNewCommentNonAnonymous] = useState('yes');
    const [newCommentVoiceOk, setNewCommentVoiceOk] = useState<boolean>(true);
    const [newCommentTextOk, setNewCommentTextOk] = useState<boolean>(true);
    const [newCommentCommenterCanDetermine, setNewCommentCommenterCanDetermine] = useState(false);
    const [newCommentIcon, setNewCommentIcon] = useState<any>(null); // newCommentIcon being thoughts.commentIcon for the new, mid-made comment
    const [error, setError] = useState<boolean>(false);

    // 🚨 🚨
    const [commenterCanDetermineCheckboxCheckpoint, setCommenterCanDetermineCheckboxCheckpoint] = useState<any>(false);
    // const [commenterCanDetermineCheckboxCheckpoint, setCommenterCanDetermineCheckboxCheckpoint] = useState<any>( (day?.commenter_can_determine === true && mapitem?.commenter_can_determine === true) ? true : false);

    // webapp: COMMENTING_STARS_QUESTION_CLICK_BIN[comments.length] not global state array[i] just a local state boolean. also webapp: <Comments> not <TheComment/Comment> mobile app: <Stars> is in <TheComment/> itself not <Comments/> the outer loop.
    const [commentStarsQuestionClick, setCommentStarsQuestionClick] = useState<boolean>(false);
    // webapp: CURR_DAY_COMMENTING_USERS_SHOW_CHILD_COMMENTS_BIN
    const [showChildComments, setShowChildComments] = useState<boolean>(false);

    const [replyInputValue, setReplyInputValue] = useState(``);
    const [replyInputIsTyping, setReplyInputIsTyping] = useState(false);
    const [inputIsFocused, setInputIsFocused] = useState(false);

    // voice comment state!
    // const [stopVoiceRecording, setStopVoiceRecording] = useState<boolean>(false)         // would've used stopVoiceRecording as a boolean to be toggled within {startRecording}. think there's no need.
    const [soundCommentFile, setSoundCommentFile] = useState<Blob | null>(null);
    const [voiceCommentClick, setVoiceCommentClick] = useState<boolean>(false);
    const [newCommentIsVoice, setNewCommentIsVoice] = useState<boolean>(false);
    const [newCommentIsVideo, setNewCommentIsVideo] = useState<boolean>(false);

    const submitTextCommentClick = async () => {
        // this func is run only if newCommentCommenterCanDetermine is toggled true so submit data, no more prerequisite functionality
        const newComments = await submitTextComment(
            mapitem,
            index,
            null,
            null,
            null,
            newCommentIcon,
            commenterCanDetermineCheckboxCheckpoint,
            setCommenterCanDetermineCheckboxCheckpoint,
            replyInputValue,
            newCommentThoughtsOk,
            newCommentStarrable,
            newCommentNonAnonymous,
            newCommentStarsShowAvg,
            newCommentStarsShowUsers,
            false,
            false,
            newCommentCommenterCanDetermine,
            newCommentVoiceOk,
            newCommentTextOk,
            anonymousCommentsOk,
            newCommentLock,
            newCommentUnlock,
            day,
            setUsersPassLocks,
            setSoundCommentFile,
            setReplyInputValue,
            setComments,
            setError,
        );
    };

    return commentStarsQuestionClick ? (
        // <View style={[styles.commentCont, indentIndex === 0 ? { borderWidth: 2, borderColor: grayphite } : {}]}>
        <View style={[{ borderWidth: indentIndex === 0 ? 2 : 0, borderColor: indentIndex === 0 ? grayphite : 'transparent' }, styles.commentCont]}>
            <StarsShowUsers
                comment={mapitem}
                commentStars={commentStars}
                setCommentStars={setCommentStars}
                usersPassLocks={usersPassLocks}
                comments={comments}
                allUserProfileIcons={allUserProfileIcons}
                setCommentStarsQuestionClick={setCommentStarsQuestionClick}
            />
        </View>
    ) : commenterCanDetermineCheckboxCheckpoint ? (
        <CheckboxContainer
            comment={mapitem}
            index={index}
            indentIndex={indentIndex}
            newCommentLock={newCommentLock}
            setNewCommentLock={setNewCommentLock}
            setNewCommentUnlock={setNewCommentUnlock}
            newCommentStarrable={newCommentStarrable}
            setNewCommentStarrable={setNewCommentStarrable}
            newCommentThoughtsOk={newCommentThoughtsOk}
            setNewCommentThoughtsOk={setNewCommentThoughtsOk}
            newCommentStarsShowAvg={newCommentStarsShowAvg}
            setNewCommentStarsShowAvg={setNewCommentStarsShowAvg}
            newCommentStarsShowUsers={newCommentStarsShowUsers}
            setNewCommentStarsShowUsers={setNewCommentStarsShowUsers}
            newCommentVoiceOk={newCommentVoiceOk}
            setNewCommentVoiceOk={setNewCommentVoiceOk}
            newCommentTextOk={newCommentTextOk}
            setNewCommentTextOk={setNewCommentTextOk}
            newCommentNonAnonymous={newCommentNonAnonymous}
            setNewCommentNonAnonymous={setNewCommentNonAnonymous}
            anonymousCommentsOk={anonymousCommentsOk}
            setAnonymousCommentsOk={setAnonymousCommentsOk}
            setNewCommentCommenterCanDetermine={setNewCommentCommenterCanDetermine}
            commenterCanDetermineCheckboxCheckpoint={commenterCanDetermineCheckboxCheckpoint}
            setCommenterCanDetermineCheckboxCheckpoint={setCommenterCanDetermineCheckboxCheckpoint}
            allUserProfileIcons={allUserProfileIcons}
            newCommentCommenterCanDetermine={newCommentCommenterCanDetermine}
            replyInputValue={replyInputValue}
            newCommentUnlock={newCommentUnlock}
            newCommentIcon={newCommentIcon}
            day={day}
            usersPassLocks={usersPassLocks}
            setUsersPassLocks={setUsersPassLocks}
            soundCommentFile={soundCommentFile}
            setSoundCommentFile={setSoundCommentFile}
            soundComments={soundComments}
            setSoundComments={setSoundComments}
            setReplyInputValue={setReplyInputValue}
            comments={comments}
            setComments={setComments}
            setError={setError}
            voiceCommentClick={voiceCommentClick}
        />
    ) : (
        <View style={[{ borderWidth: indentIndex === 0 ? 2 : 0, borderColor: indentIndex === 0 ? grayphite : 'transparent' }, styles.commentCont]}>
            <CommentBodyTop
                mapitem={mapitem}
                index={index}
                indentIndex={indentIndex}
                settings={{
                    dayCommenterCanDetermine,
                    commenterCanDetermineCheckboxCheckpoint,
                    setCommenterCanDetermineCheckboxCheckpoint,
                    newCommentLock,
                    setNewCommentLock,
                    newCommentUnlock,
                    setNewCommentUnlock,
                    newCommentStarrable,
                    setNewCommentStarrable,
                    setNewCommentThoughtsOk,
                    newCommentStarsShowAvg,
                    setNewCommentStarsShowAvg,
                    newCommentStarsShowUsers,
                    setNewCommentStarsShowUsers,
                    newCommentVoiceOk,
                    setNewCommentVoiceOk,
                    newCommentTextOk,
                    setNewCommentTextOk,
                    newCommentNonAnonymous,
                    setNewCommentNonAnonymous,
                    anonymousCommentsOk,
                    setAnonymousCommentsOk,
                    newCommentCommenterCanDetermine,
                    setNewCommentCommenterCanDetermine,
                }}
                voiceCommentClick={voiceCommentClick}
                soundCommentFile={soundCommentFile}
                setSoundCommentFile={setSoundCommentFile}
                replyInputIsTyping={replyInputIsTyping}
                replyInputValue={replyInputValue}
                soundComments={soundComments}
                setSoundComments={setSoundComments}
                allUserProfileIcons={allUserProfileIcons}
                setAllUserProfileIcons={setAllUserProfileIcons}
                day={day}
                usersPassLocks={usersPassLocks}
                setUsersPassLocks={setUsersPassLocks}
                usersAllowedToUnlock={usersAllowedToUnlock}
                setUsersAllowedToUnlock={setUsersAllowedToUnlock}
                comments={comments}
                setComments={setComments}
            />

            <CommentBodyBottom
                settings={{
                    dayCommenterCanDetermine,
                    commenterCanDetermineCheckboxCheckpoint,
                    setCommenterCanDetermineCheckboxCheckpoint,
                    newCommentLock,
                    setNewCommentLock,
                    newCommentUnlock,
                    setNewCommentUnlock,
                    newCommentStarrable,
                    setNewCommentStarrable,
                    newCommentThoughtsOk,
                    setNewCommentThoughtsOk,
                    newCommentStarsShowAvg,
                    setNewCommentStarsShowAvg,
                    newCommentStarsShowUsers,
                    setNewCommentStarsShowUsers,
                    newCommentVoiceOk,
                    setNewCommentVoiceOk,
                    newCommentTextOk,
                    setNewCommentTextOk,
                    newCommentNonAnonymous,
                    setNewCommentNonAnonymous,
                    anonymousCommentsOk,
                    setAnonymousCommentsOk,
                    newCommentCommenterCanDetermine,
                    setNewCommentCommenterCanDetermine,
                    newCommentIcon,
                }}
                index={index}
                mapitem={mapitem}
                indentIndex={indentIndex}
                replyInputValue={replyInputValue}
                setReplyInputValue={setReplyInputValue}
                replyInputIsTyping={replyInputIsTyping}
                setReplyInputIsTyping={setReplyInputIsTyping}
                soundCommentFile={soundCommentFile}
                setSoundCommentFile={setSoundCommentFile}
                voiceCommentClick={voiceCommentClick}
                setVoiceCommentClick={setVoiceCommentClick}
                soundComments={soundComments}
                setSoundComments={setSoundComments}
                day={day}
                usersPassLocks={usersPassLocks}
                setUsersPassLocks={setUsersPassLocks}
                commentStars={commentStars}
                setCommentStars={setCommentStars}
                comments={comments}
                setComments={setComments}
                commentStarsQuestionClick={commentStarsQuestionClick}
                setCommentStarsQuestionClick={setCommentStarsQuestionClick}
                showChildComments={showChildComments}
                setShowChildComments={setShowChildComments}
            />

            {/* // if comments array has parent_thought_id of the current comment, and the SHOW_CHILD_COMMENTS state has [i] (mapitem) = true, then show the <ChildComments/> */}
            {showChildComments && comments?.some((comments: any) => comments?.parent_thought_id === mapitem?.id) === true && (
                <ChildCommentsLoop
                    parentThought={mapitem}
                    indentIndex={indentIndex + 1}
                    soundComments={soundComments}
                    setSoundComments={setSoundComments}
                    allUserProfileIcons={allUserProfileIcons}
                    setAllUserProfileIcons={setAllUserProfileIcons}
                    day={day}
                    usersPassLocks={usersPassLocks}
                    setUsersPassLocks={setUsersPassLocks}
                    usersAllowedToUnlock={usersAllowedToUnlock}
                    setUsersAllowedToUnlock={setUsersAllowedToUnlock}
                    comments={comments}
                    setComments={setComments}
                    commentStars={commentStars}
                    setCommentStars={setCommentStars}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    commentCont: {
        flexDirection: 'column',
        gap: 0,
        justifyContent: 'center',
        alignItems: 'flex-start',
        // borderWidth: 2,
        // borderColor: 'blue',
        // padding: 5,
        // boxSizing: "border-box",
    },

    BOBblackoutbar: {
        borderWidth: 1,
        borderColor: grayphite,
        backgroundColor: 'white',
    },
});

export default TheComment;
