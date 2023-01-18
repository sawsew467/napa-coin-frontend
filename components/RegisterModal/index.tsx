import React, { useState } from 'react';
import Image from 'next/image';
import email from '../../assets/icons/mail-line.svg';
import emailDark from '../../assets/icons/email-dark.svg';
import passwordDark from '../../assets/icons/password-dark.svg';
import password from '../../assets/icons/door-lock-line.svg';
import user from '../../assets/icons/user-3-line.svg';
import userDark from '../../assets/icons/user-dark.svg';
import close from '../../assets/icons/CloseOutlined.svg';
import axios from 'axios';
import { registerRequest } from '../../apis/authApis';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '../../redux';
import { toLowerCaseNonAccentVietnamese } from '../../functions/nameValidation';
import { AppInterface } from '../../pages/_app';

interface IProps {
    setIsShowRegisterModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IState {
    userInput: {
        fullname: string;
        email: string;
        password: string;
    };
}

function LoginModal({ setIsShowRegisterModal }: IProps) {
    const darkMode: AppInterface['darkmode'] = useSelector((state: State) => state.darkmode);
    const dispath = useDispatch();
    const { setIsShowLoginModal } = bindActionCreators(actionCreators, dispath);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const validateInput = (userInput: IState['userInput']) => {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var nameformat = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
        if (!userInput.fullname) {
            setErrorMessage('Please enter your name!');
            return false;
        }
        if (!userInput.email) {
            setErrorMessage('Please enter your email address!');
            return false;
        }
        if (!userInput.password) {
            setErrorMessage('Please enter your password!');
            return false;
        }
        if (!userInput.email.match(mailformat)) {
            setErrorMessage('You have entered an invalid email address!');
            return false;
        }
        if (!toLowerCaseNonAccentVietnamese(userInput.fullname).match(nameformat)) {
            setErrorMessage('You have entered an invalid name!');
            return false;
        }
        if (userInput.password.length < 6) {
            setErrorMessage('Password must be at least 6 characters');
            return false;
        }
        return true;
    };
    const signInClick = () => {
        setIsShowRegisterModal(false);
        setIsShowLoginModal(true);
    };
    const [userInput, setUserInput] = useState<IState['userInput']>({
        fullname: '',
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = async () => {
        try {
            if (!validateInput(userInput)) {
                return;
            }
            setIsLoading(true);
            await registerRequest(userInput);
            setIsLoading(false);
            setIsShowRegisterModal(false);
            setIsShowLoginModal(true);
        } catch (err: any) {
            setErrorMessage(err.response.data.message);
            setIsLoading(false);
        }
    };
    const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };
    return (
        <div className="overlay">
            <div className="modal box">
                <Image
                    className="modal__close"
                    src={close}
                    alt=""
                    onClick={() => setIsShowRegisterModal(false)}
                ></Image>

                <div className="modal__title">Sign up</div>
                <div className="modal__input input">
                    <input
                        placeholder="Full name"
                        onChange={(e) =>
                            setUserInput({
                                ...userInput,
                                fullname: e.target.value,
                            })
                        }
                    ></input>
                    {darkMode === 'dark' ? (
                        <Image className="icon" src={userDark} alt=""></Image>
                    ) : (
                        <Image className="icon" src={user} alt=""></Image>
                    )}
                </div>
                <div className="modal__input input">
                    <input
                        placeholder="Email address"
                        onChange={(e) =>
                            setUserInput({
                                ...userInput,
                                email: e.target.value,
                            })
                        }
                    ></input>
                    {darkMode === 'dark' ? (
                        <Image className="icon" src={emailDark} alt=""></Image>
                    ) : (
                        <Image className="icon" src={email} alt=""></Image>
                    )}
                </div>
                <div className="modal__input input">
                    <input
                        placeholder="Password"
                        type="password"
                        onChange={(e) =>
                            setUserInput({
                                ...userInput,
                                password: e.target.value,
                            })
                        }
                        onKeyDown={(e) => handleEnterPress(e)}
                    ></input>
                    {darkMode === 'dark' ? (
                        <Image className="icon" src={passwordDark} alt=""></Image>
                    ) : (
                        <Image className="icon" src={password} alt=""></Image>
                    )}
                </div>
                {errorMessage ? (
                    <p className="modal__message">{errorMessage}</p>
                ) : (
                    <p className="modal__message">&nbsp;</p>
                )}

                {isLoading ? (
                    <button className="modal__button modal__button--loading" onClick={handleSubmit}>
                        Loading...
                    </button>
                ) : (
                    <button className="modal__button modal__button--primary" onClick={handleSubmit}>
                        Sign up
                    </button>
                )}

                <span>You have account?</span>
                <button className="modal__button modal__button---secondary" onClick={signInClick}>
                    Sign in
                </button>
            </div>
        </div>
    );
}

export default LoginModal;
