import React from 'react';
import Image from 'next/image';
import email from '../../assets/icons/mail-line.svg';
import password from '../../assets/icons/door-lock-line.svg';
import user from '../../assets/icons/user-3-line.svg';
import close from '../../assets/icons/CloseOutlined.svg';

function LoginModal() {
    return (
        <div className="overlay">
            <div className="modal-box">
                <Image className="close" src={close} alt=""></Image>

                <div className="title">Sign up</div>
                <div className="input">
                    <input placeholder="Full name"></input>
                    <Image className="icon" src={user} alt=""></Image>
                </div>
                <div className="input">
                    <input placeholder="Email address"></input>
                    <Image className="icon" src={email} alt=""></Image>
                </div>
                <div className="input">
                    <input placeholder="Password"></input>
                    <Image className="icon" src={password} alt=""></Image>
                </div>
                <button className="button-primary">Sign up</button>
                <span>You have account?</span>
                <button className="button-secondary">Sign in</button>
            </div>
        </div>
    );
}

export default LoginModal;
