// 🚨 🚨 mobile: no <LoginSignupInputs/>
import React, { useState } from 'react';

// redux:
import { RootState } from '@/redux/store/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import { SET_EMAIL_INPUT_LOGIN, SET_PASSWORD_INPUT_LOGIN } from '@/redux/login/loginSlice';

import { View, TextInput, StyleSheet, Image } from 'react-native';
import { grayphite } from '@/constants/Colors';
import { curses } from '@/utility/utilityValues';

type LoginInputProps = {
    inputType: string; // Define inputType as a string
    emailInputLogin: any;
    passwordInputLogin: any;
    setEmailInputLogin: any;
    setPasswordInputLogin: any;
};

const LoginInput: React.FC<LoginInputProps> = ({ inputType, emailInputLogin, passwordInputLogin, setEmailInputLogin, setPasswordInputLogin }) => {
    const EMAIL_INPUT_LOGIN = useSelector((state: RootState) => state.login.EMAIL_INPUT_LOGIN);
    const PASSWORD_INPUT_LOGIN = useSelector((state: RootState) => state.login.PASSWORD_INPUT_LOGIN);

    const dispatch = useDispatch();

    const onChangeHandler = (text: string) => {
        console.log('text', text);
        if (inputType === 'LoginEmail') {
            setEmailInputLogin(text);
            //   dispatch(SET_EMAIL_INPUT_LOGIN(text))
        } else {
            if (inputType === 'LoginPassword') {
                setPasswordInputLogin(text);
                // dispatch(SET_PASSWORD_INPUT_LOGIN(text))
            }
        }
    };

    return (
        // <View style={styles.container}>
        <TextInput
            maxLength={27}
            style={styles.input}
            // placeholder="Type something..."
            value={
                inputType === 'LoginEmail' ? String(emailInputLogin) : inputType === 'LoginPassword' ? String(passwordInputLogin) : ''
                // inputType === "SignupUsername" ? String(USERNAME_INPUT_SIGNUP) : String(text)
            }
            onChangeText={onChangeHandler}
            // secureTextEntry={true}
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

export default LoginInput;
