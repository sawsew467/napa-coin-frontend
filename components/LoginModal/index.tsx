import React from 'react';
import Image from 'next/image';
import email from '../../assets/icons/mail-line.svg';
import password from '../../assets/icons/door-lock-line.svg';
import close from '../../assets/icons/CloseOutlined.svg';

interface IProps {
    setIsShowRegisterModal: React.Dispatch<React.SetStateAction<boolean>>;
    setIsShowLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function LoginModal({ setIsShowRegisterModal, setIsShowLoginModal }: IProps) {
    const signUpClick = () => {
        setIsShowRegisterModal(true);
        setIsShowLoginModal(false);
    };
    return (
        <div className="overlay">
            <div className="modal box">
                <Image className="modal__close" src={close} alt="" onClick={() => setIsShowLoginModal(false)}></Image>
                <div className="modal__title">Sign in</div>
                <div className="input">
                    <input placeholder="Email address"></input>
                    <Image className="icon" src={email} alt=""></Image>
                </div>
                <div className="input">
                    <input placeholder="Password" type="password"></input>
                    <Image className="icon" src={password} alt=""></Image>
                </div>
                <button className="modal__button--primary">Sign in</button>
                <span>Don’t have account?</span>
                <button className="modal__button---secondary" onClick={signUpClick}>
                    Sign up
                </button>
            </div>
        </div>
    );
}

export default LoginModal;
