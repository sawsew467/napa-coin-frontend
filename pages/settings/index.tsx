import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import styles from './style.module.scss';
import Image from 'next/image';
import Avatar from '../../assets/img/avatar.jpeg';
import User from '../../assets/icons/user-3-line.svg';
import Bio from '../../assets/icons/bill-line.svg';

function index() {
    return (
        <>
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                }}
            >
                <Header></Header>
            </div>
            <div className="wrapper">
                <div className="container">
                    <section className={styles[`settings`]}>
                        <div className="box">
                            <div className={styles[`settings__title`]}>Edit profile</div>
                            <div className={styles[`settings__avatar`]}>
                                <p>Your avatar</p>
                                <Image src={Avatar} alt=""></Image>
                                <button>Change</button>
                            </div>
                            <div className={styles[`settings__input`]}>
                                <span>Full name</span>
                                <div>
                                    <Image className="modal__close" src={User} alt=""></Image>
                                    <p>Tran Van Bao Thang</p>
                                </div>
                            </div>
                            <div className={styles[`settings__input`]}>
                                <span>Bio</span>
                                <div>
                                    <Image className="modal__close" src={Bio} alt=""></Image>
                                    <p>
                                        PlayDapp is a middleware blockchain solution providing companies with SDK's to
                                        integrate blockchain technology and easily turn their assets into NFT's.
                                        Companies with SDK's to
                                    </p>
                                </div>
                            </div>
                            <div className={styles[`settings__button`]}>
                                <button>Save</button>
                                <button>Change password</button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}

export default index;
