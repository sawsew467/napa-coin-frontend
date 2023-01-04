import React, { use, useEffect, useState } from 'react';
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
import axios from 'axios';
import { Router, useRouter } from 'next/router';
import { getInfo } from '../../apis/usersApis';
import { followUser, unfollowUser } from '../../apis/followApis';

interface IState {
    user: {
        fullname: string;
        email: string;
        bio: string;
        avatar: string;
        following: string[];
        follower: string[];
    };
}

function index() {
    const currentUser: AppInterface['currentUser'] = useSelector((state: State) => state.currentUser);
    const dispath = useDispatch();
    const { setCurrentUser } = bindActionCreators(actionCreators, dispath);
    const [user, setUser] = useState<IState['user']>({
        fullname: '',
        email: '',
        bio: '',
        avatar: '',
        follower: [],
        following: [],
    });
    const [followers, setFollowers] = useState<number>(0);
    const [token, setToken] = useState<string>('');
    const router = useRouter();
    const { uid } = router.query;
    useEffect(() => {
        if (uid) {
            getInfo(uid, window.localStorage.getItem('token') ?? '')
                .then((res) => {
                    setUser(res.results);
                    setFollowers(res.results.follower.length);
                    console.log();
                })
                .catch((err) => {
                    console.log(err);
                    router.push('/home');
                });
        }
    }, [uid]);
    const [isFollowing, setIsFollowing] = useState<boolean>(false);
    useEffect(() => {
        if (!router.isReady) {
            return;
        }
        const current = JSON.parse(`${window.localStorage.getItem('currentUser')}`) ?? {
            email: '',
            avatar: '',
            fullname: '',
            bio: '',
        };
        setCurrentUser(current);
        setToken(window.localStorage.getItem('token') ?? '');
        if (typeof uid === 'string') {
            setIsFollowing(current.following?.includes(uid));
        }
    }, [router.isReady, router.query.uid]);
    const [isLoading, setIsloading] = useState<boolean>(false);
    const followHandler = async () => {
        setIsloading(true);
        followUser(currentUser._id, uid)
            .then((res) => {
                console.log('response: ' + res.status);
                setIsloading(false);
                setIsFollowing(true);
                window.localStorage.setItem(
                    'currentUser',
                    JSON.stringify({
                        ...currentUser,
                        following: [...currentUser.following, uid],
                    }),
                );
                setFollowers((pre) => pre + 1);
            })
            .catch((err) => {
                setIsloading(false);
            });
    };
    const unfollowHandler = async () => {
        setIsloading(true);
        unfollowUser(currentUser._id, uid)
            .then((res) => {
                console.log('response: ' + res.status);
                setIsloading(false);
                setIsFollowing(false);
                setFollowers((pre) => pre - 1);
            })
            .catch((err) => {
                setIsloading(false);
            });
        window.localStorage.setItem(
            'currentUser',
            JSON.stringify({
                ...currentUser,
                following: currentUser.following.filter((item) => item !== uid),
            }),
        );
    };
    return (
        <>
            <Header setIsShowLoginModal={() => {}}></Header>
            <div className="wrapper">
                <div className="container">
                    <section className={styles[`profile`]}>
                        <img src={user.avatar} alt="" className={styles[`profile__image`]}></img>
                        <div className="box">
                            <p className={styles[`profile__name`]}>{user.fullname}</p>
                            <p className={styles[`profile__email`]}>{user.email}</p>
                            <div className={styles[`profile__follow`]}>
                                <p>
                                    <span>{user.following.length}</span>
                                    &nbsp;following
                                </p>
                                <p>
                                    <span>{followers}</span>
                                    &nbsp;followers
                                </p>
                            </div>
                            {/* {user.bio ? (
                                <p className={styles[`profile__bio`]}>{user.bio}</p>
                            ) : (
                                <p>
                                    Your bio is empty, go to <Link href={'/settings'}>settings</Link> to update bio.
                                </p>
                            )} */}
                            <p className={styles[`profile__bio`]}>{user.bio}</p>
                            <p className={styles[`profile__bio`]}>
                                {/* PlayDapp is a middleware blockchain solution providing companies with SDK's to integrate
                                blockchain technology and easily turn their assets into NFT's. Companies with SDK's to
                                integrate blockchain technology and easily turn their assets into NFT's. PlayDapp is
                                Solution providing companies with SDK's to integrate blockchain technology and easily
                                turn their assets into NFT's. */}
                            </p>
                            {isFollowing ? (
                                isLoading ? (
                                    <button className={styles[`profile__button--slate`]}>Loading...</button>
                                ) : (
                                    <button className={styles[`profile__button--slate`]} onClick={unfollowHandler}>
                                        <Image src={Check} alt=""></Image>
                                        &nbsp;Following
                                    </button>
                                )
                            ) : isLoading ? (
                                <button className={styles[`profile__button--primary`]} onClick={followHandler}>
                                    Loading...
                                </button>
                            ) : (
                                <button className={styles[`profile__button--primary`]} onClick={followHandler}>
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
