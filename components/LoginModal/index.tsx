import React, { useState } from 'react';
import Image from 'next/image';
import email from '../../assets/icons/mail-line.svg';
import password from '../../assets/icons/door-lock-line.svg';
import close from '../../assets/icons/CloseOutlined.svg';
import axios from 'axios';
import { IState as AppState } from '../../pages/home';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../redux';

interface IProps {
    setIsShowRegisterModal: React.Dispatch<React.SetStateAction<boolean>>;
    setIsShowLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IState {
    userInput: {
        email: string;
        password: string;
    };
}

function LoginModal({ setIsShowRegisterModal, setIsShowLoginModal }: IProps) {
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
            console.log('!!!');
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
    const dispath = useDispatch();
    const { setCurrentUser } = bindActionCreators(actionCreators, dispath);
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = async () => {
        try {
            if (!validateInput(userInput)) {
                return;
            }
            setIsLoading(true);
            const option = {
                method: 'POST',
                url: 'http://172.16.6.214:5000/api/v1/auth/login',
                data: userInput,
            };
            const response = await axios(option);
            const { token, user } = response.data.data;
            window.localStorage.setItem('token', token);
            window.localStorage.setItem('currentUser', JSON.stringify(user));
            setCurrentUser(user);
            setIsShowLoginModal(false);
            setIsLoading(false);
        } catch (err) {
            setErrorMessage('Your email or password is incorrect!');
            setIsLoading(false);
        }
    };
    return (
        <div className="overlay">
            <div className="modal box">
                <Image className="modal__close" src={close} alt="" onClick={() => setIsShowLoginModal(false)}></Image>
                <div className="modal__title">Sign in</div>
                <div className="modal__input">
                    <input
                        placeholder="Email address"
                        onChange={(e) =>
                            setUserInput({
                                ...userInput,
                                email: e.target.value,
                            })
                        }
                    ></input>
                    <Image className="icon" src={email} alt=""></Image>
                </div>
                <div className="modal__input">
                    <input
                        placeholder="Password"
                        type="password"
                        onChange={(e) =>
                            setUserInput({
                                ...userInput,
                                password: e.target.value,
                            })
                        }
                    ></input>
                    <Image className="icon" src={password} alt=""></Image>
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
