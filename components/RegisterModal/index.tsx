import React from 'react';
import Image from 'next/image';
import email from '../../assets/icons/mail-line.svg';
import password from '../../assets/icons/door-lock-line.svg';
import user from '../../assets/icons/user-3-line.svg';
import close from '../../assets/icons/CloseOutlined.svg';

interface IProps {
    setIsShowRegisterModal: React.Dispatch<React.SetStateAction<boolean>>;
    setIsShowLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function LoginModal({ setIsShowRegisterModal, setIsShowLoginModal }: IProps) {
    const signInClick = () => {
        setIsShowRegisterModal(false);
        setIsShowLoginModal(true);
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
                <div className="input">
                    <input placeholder="Full name"></input>
                    <Image className="icon" src={user} alt=""></Image>
                </div>
                <div className="input">
                    <input placeholder="Email address"></input>
                    <Image className="icon" src={email} alt=""></Image>
                </div>
                <div className="input">
                    <input placeholder="Password" type="password"></input>
                    <Image className="icon" src={password} alt=""></Image>
                </div>
                <button className="modal__button--primary">Sign up</button>
                <span>You have account?</span>
                <button className="modal__button---secondary" onClick={signInClick}>
                    Sign in
                </button>
            </div>
        </div>
    );
}

export default LoginModal;
