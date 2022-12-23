import React from 'react';
import Image from 'next/image';
import email from '../../assets/icons/mail-line.svg';
import password from '../../assets/icons/door-lock-line.svg';

function LoginModal() {
    return (
        <div className="overlay">
            <div className="modal-box">
                <div className="title">Sign in</div>
                <div className="input">
                    <input placeholder="Email address"></input>
                    <Image className="icon" src={email} alt=""></Image>
                </div>
                <div className="input">
                    <input placeholder="Password"></input>
                    <Image className="icon" src={password} alt=""></Image>
                </div>
                <button className="button-primary">Sign in</button>
                <span>Don’t have account?</span>
                <button className="button-secondary">Sign up</button>
            </div>
        </div>
    );
}

export default LoginModal;
