import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import styles from './style.module.scss';
import Image from 'next/image';
import Avatar from '../../assets/img/avatar.jpeg';
import Check from '../../assets/icons/check-line.svg';

function index() {
    const [isFollowing, setIsFollowing] = useState(false);
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
                    <section className={styles[`profile`]}>
                        <Image src={Avatar} alt="" className={styles[`profile__image`]}></Image>
                        <div className="box">
                            <p className={styles[`profile__name`]}>Tran Van Bao Thang</p>
                            <p className={styles[`profile__email`]}>bao.thang.1912@gmail.com</p>
                            <div className={styles[`profile__follow`]}>
                                <p>
                                    <span>230</span>
                                    &nbsp;following
                                </p>
                                <p>
                                    <span>3720</span>
                                    &nbsp;followers
                                </p>
                            </div>
                            <p className={styles[`profile__bio`]}>
                                PlayDapp is a middleware blockchain solution providing companies with SDK's to integrate
                                blockchain technology and easily turn their assets into NFT's. Companies with SDK's to
                                integrate blockchain technology and easily turn their assets into NFT's. PlayDapp is
                                Solution providing companies with SDK's to integrate blockchain technology and easily
                                turn their assets into NFT's.
                            </p>
                            {isFollowing ? (
                                <button
                                    className={styles[`profile__button--slate`]}
                                    onClick={() => setIsFollowing(false)}
                                >
                                    <Image src={Check} alt=""></Image>
                                    &nbsp;Following
                                </button>
                            ) : (
                                <button
                                    className={styles[`profile__button--primary`]}
                                    onClick={() => setIsFollowing(true)}
                                >
                                    + Follow
                                </button>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}

export default index;
