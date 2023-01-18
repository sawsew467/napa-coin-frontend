import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Check from '../../assets/icons/check-line.svg';
import CheckDark from '../../assets/icons/check-dark.svg';
import styles from './style.module.scss';
import { followUser, unfollowUser } from '../../apis/followApis';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '../../redux';
import { AppInterface, socket } from '../../pages/_app';
import { io } from 'socket.io-client';
import clsx from 'clsx';
import { getInfo } from '../../apis/usersApis';

interface IProps {
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    isFollowing: boolean;
    setIsFollowing: React.Dispatch<React.SetStateAction<boolean>>;
    setFollowers: React.Dispatch<React.SetStateAction<number>>;
    followedId: string | string[] | undefined;
}

function index({ isLoading, setIsLoading, isFollowing, setIsFollowing, setFollowers, followedId }: IProps) {
    const [token, setToken] = useState<string>('');

    socket.on('followed', (socket: any) => {
        getInfo(currentUser._id, token)
            .then((res) => {
                setIsFollowing(res.results.following.includes(followedId));
            })
            .catch((err) => {
                console.log(err);
            });
    });

    useEffect(() => {
        setToken(window.localStorage.getItem('token') ?? '');
    }, []);
    const currentUser: AppInterface['currentUser'] = useSelector((state: State) => state.currentUser);
    const darkmode: AppInterface['darkmode'] = useSelector((state: State) => state.darkmode);
    const dispath = useDispatch();
    const { setIsShowLoginModal } = bindActionCreators(actionCreators, dispath);
    const unAuthorizedJHandle = () => {
        setIsShowLoginModal(true);
    };
    const followHandler = async () => {
        if (!currentUser.avatar) {
            unAuthorizedJHandle();
            return;
        }
        setIsLoading(true);
        followUser(currentUser._id, followedId)
            .then((res) => {
                setIsLoading(false);
                setIsFollowing(true);
                window.localStorage.setItem(
                    'currentUser',
                    JSON.stringify({
                        ...currentUser,
                        following: [...currentUser.following, followedId],
                    }),
                );
                setFollowers((pre) => pre + 1);
                socket.emit('follow', {
                    message: 'follow',
                });
            })
            .catch((err) => {
                setIsLoading(false);
            });
    };
    const unfollowHandler = async () => {
        setIsLoading(true);
        unfollowUser(currentUser._id, followedId)
            .then((res) => {
                setIsLoading(false);
                setIsFollowing(false);
                setFollowers((pre) => pre - 1);
                socket.emit('follow', {
                    message: 'follow',
                });
            })
            .catch((err) => {
                setIsLoading(false);
            });
        window.localStorage.setItem(
            'currentUser',
            JSON.stringify({
                ...currentUser,
                following: currentUser.following.filter((item) => item !== followedId),
            }),
        );
    };
    return (
        <>
            {isFollowing ? (
                isLoading ? (
                    <button className={clsx(styles[`button--slate`], 'button--slate')}>Loading...</button>
                ) : (
                    <button className={clsx(styles[`button--slate`], 'button--slate')} onClick={unfollowHandler}>
                        {darkmode === 'dark' ? (
                            <Image src={CheckDark} alt=""></Image>
                        ) : (
                            <Image src={Check} alt=""></Image>
                        )}
                        &nbsp;Following
                    </button>
                )
            ) : isLoading ? (
                <button className={clsx(styles[`button--primary`], 'button--primary')} onClick={followHandler}>
                    Loading...
                </button>
            ) : (
                <button className={clsx(styles[`button--primary`], 'button--primary')} onClick={followHandler}>
                    + Follow
                </button>
            )}
        </>
    );
}

export default index;
