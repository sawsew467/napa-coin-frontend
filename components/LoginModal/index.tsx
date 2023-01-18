import React, { useState } from 'react';
import Image from 'next/image';
import email from '../../assets/icons/mail-line.svg';
import emailDark from '../../assets/icons/email-dark.svg';
import password from '../../assets/icons/door-lock-line.svg';
import passwordDark from '../../assets/icons/password-dark.svg';
import close from '../../assets/icons/CloseOutlined.svg';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '../../redux';
import { loginRequest } from '../../apis/authApis';
import Router, { useRouter } from 'next/router';
import { AppInterface } from '../../pages/_app';

interface IProps {
    setIsShowRegisterModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IState {
    userInput: {
        email: string;
        password: string;
    };
}

function LoginModal({ setIsShowRegisterModal }: IProps) {
    const darkMode: AppInterface['darkmode'] = useSelector((state: State) => state.darkmode);
    const dispath = useDispatch();
    const { setCurrentUser, setIsShowLoginModal } = bindActionCreators(actionCreators, dispath);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const validateInput = (userInput: IState['userInput']) => {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
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
        return true;
    };
    const [userInput, setUserInput] = useState<IState['userInput']>({
        email: '',
        password: '',
    });
    const signUpClick = () => {
        setIsShowRegisterModal(true);
        setIsShowLoginModal(false);
    };

    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = async () => {
        try {
            if (!validateInput(userInput)) {
                return;
            }
            setIsLoading(true);
            const response = await loginRequest(userInput);
            const { token, user } = response.data.data;
            window.localStorage.setItem('token', token);
            window.localStorage.setItem('currentUser', JSON.stringify(user));
            setCurrentUser(user);
            Router.reload();
            setIsShowLoginModal(false);
            setIsLoading(false);
        } catch (err) {
            setErrorMessage('Your email or password is incorrect!');
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
                <Image className="modal__close" src={close} alt="" onClick={() => setIsShowLoginModal(false)}></Image>
                <div className="modal__title">Sign in</div>
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
                        Sign in
                    </button>
                )}
                <span>Don’t have account?</span>
                <button className="modal__button modal__button---secondary" onClick={signUpClick}>
                    Sign up
                </button>
            </div>
        </div>
    );
}

export default LoginModal;
