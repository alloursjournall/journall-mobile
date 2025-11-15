// top level:
import { useState, useEffect } from 'react';

// redux
import { RootState } from '@/redux/store/rootReducer';
import { useSelector, useDispatch } from 'react-redux';

//  <>
import { Dimensions, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import BallotOptionsTextEngagement from './BallotOptionsTextEngagement/BallotOptionsTextEngagement';
import UserSubmittedOptionsTextEngagement from './UserSubmittedOptionsTextEngagement/UserSubmittedOptionsTextEngagement';

// utils:
import { useContentFunction } from '@/Contexts/ContentFunctions';
import { TrashIcon, GreenForwardArrowIcon, PartyIcon } from '@/constants/Images';
import { grayphite } from '@/constants/Colors';

interface ShowEngagementProps {
    currBallot: any;
    clickedOption: any;
    showEngagementBallotOption: any;
    setShowEngagementBallotOption: any;
    day: any;
    ballotOptionsLikes: any;
    ballotOptionsStars: any;
    currVotes: any;
    allUserProfileIcons: any;
}

const ShowEngagement: React.FC<ShowEngagementProps> = ({
    currBallot,
    clickedOption,
    showEngagementBallotOption,
    setShowEngagementBallotOption,
    day,
    ballotOptionsLikes,
    ballotOptionsStars,
    currVotes,
    allUserProfileIcons,
}) => {
    const [clickedOptionIsUnApprovedVote, setClickedOptionIsUnApprovedVote] = useState(false);

    const [unApprovedVoteItem, setUnApprovedVoteItem] = useState<any | null>(null);
    const [unApprovedVoteIndex, setUnApprovedVoteIndex] = useState<number | null>(null);
    let userSubmittedOptionsUserArray = currBallot?.user_submitted_options_user_array || [];

    useEffect(() => {
        // check if it's a posting-user vote or an APPROVED user-submitted-option for vote.  !apporoved && toggle bool how to check ? UNAPPROVED OPTIONS  ballots.user_submitted_optoins_users_array i.e. [3-taquitos] split user ID out.
        userSubmittedOptionsUserArray?.forEach((item: any, index: number) => {
            // get that ex: ['3-taquitos'] item from the loop to match for string equality in <AllUserSubmittedIndexesEngagement/>
            setUnApprovedVoteItem(item);
            const [userId, vote] = item.split(/-(.+)/);
            if (clickedOption?.key?.Key.includes(vote)) {
                console.log('yuuuup');
                setClickedOptionIsUnApprovedVote(true);
                // send that index too because it'll be the index in ballots.user_submitted_options_user_array
                setUnApprovedVoteIndex(index);
            }
            console.log('item over here', item);
        });
    }, []);

    return (
        <View>
            {clickedOptionIsUnApprovedVote === true ? (
                <UserSubmittedOptionsTextEngagement
                    currBallot={currBallot}
                    clickedOption={clickedOption}
                    showEngagementBallotOption={showEngagementBallotOption}
                    setShowEngagementBallotOption={setShowEngagementBallotOption}
                    clickedOptionIsUnApprovedVote={clickedOptionIsUnApprovedVote}
                    unApprovedVoteItem={unApprovedVoteItem}
                    unApprovedVoteIndex={unApprovedVoteIndex}
                    day={day}
                    ballotOptionsStars={ballotOptionsStars}
                    ballotOptionsLikes={ballotOptionsLikes}
                    allUserProfileIcons={allUserProfileIcons}
                />
            ) : (
                <BallotOptionsTextEngagement
                    currBallot={currBallot}
                    clickedOption={clickedOption}
                    showEngagementBallotOption={showEngagementBallotOption}
                    setShowEngagementBallotOption={setShowEngagementBallotOption}
                    clickedOptionIsUnApprovedVote={clickedOptionIsUnApprovedVote}
                    setClickedOptionIsUnApprovedVote={setClickedOptionIsUnApprovedVote}
                    day={day}
                    ballotOptionsLikes={ballotOptionsLikes}
                    ballotOptionsStars={ballotOptionsStars}
                    currVotes={currVotes}
                    allUserProfileIcons={allUserProfileIcons}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({});

export default ShowEngagement;
