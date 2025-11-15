// 🚨 🚨 mobile: no <LoginSignupInputs/>
import React, { useState } from 'react';

// redux:
import { RootState } from '@/redux/store/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import {
    SET_USERNAME_INPUT_SIGNUP,
    SET_EMAIL_INPUT_SIGNUP,
    SET_PASSWORD_INPUT_SIGNUP,
    TOGGLE_EMAIL_INPUT_FOCUSED_SIGNUP,
    TOGGLE_PASSWORD_INPUT_FOCUSED_SIGNUP,
    TOGGLE_PASSWORD_FAILS_NO_CURSES,
} from '@/redux/signup/signupSlice';

import { View, TextInput, StyleSheet, Image } from 'react-native';
import { grayphite } from '@/constants/Colors';
import { startMapper } from 'react-native-reanimated';
import { curses } from '@/utility/utilityValues';

type SignupInputProps = {
    inputType: string; // Define inputType as a string
};

const SignupInput: React.FC<SignupInputProps> = ({ inputType }) => {
    const USERNAME_INPUT_SIGNUP = useSelector((state: RootState) => state.signup.USERNAME_INPUT);
    const EMAIL_INPUT_SIGNUP = useSelector((state: RootState) => state.signup.EMAIL_INPUT);
    const PASSWORD_INPUT_SIGNUP = useSelector((state: RootState) => state.signup.PASSWORD_INPUT);

    const dispatch = useDispatch();

    const [text, setText] = useState('');

    const onChangeHandler = (text: string) => {
        console.log('text', text);

        if (text?.includes('nigger') || text === 'nigger') {
            dispatch(SET_EMAIL_INPUT_SIGNUP(''));
            dispatch(SET_PASSWORD_INPUT_SIGNUP(''));
        }
        if (inputType === 'SignupPassword') {
            dispatch(SET_PASSWORD_INPUT_SIGNUP(text));
        } else {
            if (inputType === 'SignupUsername') {
                const sanitizedText = text.replace(/[^a-zA-Z0-9]/g, '');
                dispatch(SET_USERNAME_INPUT_SIGNUP(sanitizedText));
            }
            if (inputType === 'SignupEmail') dispatch(SET_EMAIL_INPUT_SIGNUP(text));
        }
    };

    return (
        // <View style={styles.container}>
        <TextInput
            maxLength={27}
            style={styles.input}
            // placeholder="Type something..."
            value={
                inputType === 'SignupUsername'
                    ? String(USERNAME_INPUT_SIGNUP)
                    : inputType === 'SignupEmail'
                    ? String(EMAIL_INPUT_SIGNUP)
                    : inputType === 'SignupPassword'
                    ? String(PASSWORD_INPUT_SIGNUP)
                    : ''
                // inputType === "SignupUsername" ? String(USERNAME_INPUT_SIGNUP) : String(text)
            }
            onChangeText={onChangeHandler}
            // secureTextEntry={inputType === 'SignupPassword'}
        />
        // </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderColor: 'blue',
        borderWidth: 5,
        margin: 2,
        padding: 2,
    },
    input: {
        height: 20,
        borderColor: grayphite,
        borderWidth: 1,
        padding: 2,
        width: 200,
        // width: "50%",
        borderRadius: 6,
        marginTop: '2.5%',
        color: grayphite,
        textAlign: 'left',
    },
});

export default SignupInput;
