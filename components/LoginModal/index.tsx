import React, { useState } from 'react';
import Image from 'next/image';
import email from '../../assets/icons/mail-line.svg';
import password from '../../assets/icons/door-lock-line.svg';
import close from '../../assets/icons/CloseOutlined.svg';
import axios from 'axios';

interface IProps {
    setIsShowRegisterModal: React.Dispatch<React.SetStateAction<boolean>>;
    setIsShowLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function LoginModal({ setIsShowRegisterModal, setIsShowLoginModal }: IProps) {
    const [userInput, setUserInput] = useState({
        email: '',
        password: '',
    });
    const signUpClick = () => {
        setIsShowRegisterModal(true);
        setIsShowLoginModal(false);
    };
    const handleSubmit = async () => {
        try {
            const option = {
                method: 'POST',
                url: 'http://localhost:5000/api/v1/auth/login',
                data: userInput,
            };
            const response = await axios(option);
            alert('Login successfully');
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="overlay">
            <div className="modal box">
                <Image className="modal__close" src={close} alt="" onClick={() => setIsShowLoginModal(false)}></Image>
                <div className="modal__title">Sign in</div>
                <div className="input">
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
                <div className="input">
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
                <button className="modal__button--primary" onClick={handleSubmit}>
                    Sign in
                </button>
                <span>Don’t have account?</span>
                <button className="modal__button---secondary" onClick={signUpClick}>
                    Sign up
                </button>
            </div>
        </div>
    );
}

export default LoginModal;
