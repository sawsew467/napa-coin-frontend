import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import styles from './style.module.scss';
import Image from 'next/image';
import Avatar from '../../assets/img/avatar.jpeg';
import Check from '../../assets/icons/check-line.svg';
import { useSelector } from 'react-redux';
import { State } from '../../redux';
import { useDispatch } from 'react-redux';
import { actionCreators } from '../../redux';
import { bindActionCreators } from 'redux';
import { AppInterface } from '../_app';
import Link from 'next/link';
import { useRouter } from 'next/router';

function index() {
    const currentUser: AppInterface['currentUser'] = useSelector((state: State) => state.currentUser);
    const dispath = useDispatch();
    const { setCurrentUser } = bindActionCreators(actionCreators, dispath);
    const router = useRouter();
    useEffect(() => {
        if (!JSON.parse(`${window.localStorage.getItem('currentUser')}`)) {
            router.push('/home');
        }
        setCurrentUser(
            JSON.parse(`${window.localStorage.getItem('currentUser')}`) ?? {
                email: '',
                avatar: '',
                fullname: '',
                bio: '',
            },
        );
    }, []);
    return (
        <>
            <Header setIsShowLoginModal={() => {}}></Header>
            <div className="wrapper">
                <div className="container">
                    <section className={styles[`profile`]}>
                        <img src={currentUser.avatar} alt="" className={styles[`profile__image`]}></img>
                        <div className="box">
                            <p className={styles[`profile__name`]}>{currentUser.fullname}</p>
                            <p className={styles[`profile__email`]}>{currentUser.email}</p>
                            <div className={styles[`profile__follow`]}>
                                <p>
                                    <span>{currentUser?.following?.length}</span>
                                    &nbsp;following
                                </p>
                                <p>
                                    <span>{currentUser?.follower?.length}</span>
                                    &nbsp;followers
                                </p>
                            </div>
                            {currentUser.bio ? (
                                <p className={styles[`profile__bio`]}>{currentUser.bio}</p>
                            ) : (
                                <p>
                                    Your bio is empty, go to <Link href={'/settings'}>settings</Link> to update bio.
                                </p>
                            )}
                            <p className={styles[`profile__bio`]}>
                                {/* PlayDapp is a middleware blockchain solution providing companies with SDK's to integrate
                                blockchain technology and easily turn their assets into NFT's. Companies with SDK's to
                                integrate blockchain technology and easily turn their assets into NFT's. PlayDapp is
                                Solution providing companies with SDK's to integrate blockchain technology and easily
                                turn their assets into NFT's. */}
                            </p>
                            {/* {isFollowing ? (
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
                            )} */}
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}

export default index;
