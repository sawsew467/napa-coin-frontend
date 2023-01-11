import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Check from '../../assets/icons/check-line.svg';
import styles from './style.module.scss';
import { followUser, unfollowUser } from '../../apis/followApis';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '../../redux';
import { AppInterface } from '../../pages/_app';
import { io } from 'socket.io-client';

interface IProps {
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    isFollowing: boolean;
    setIsFollowing: React.Dispatch<React.SetStateAction<boolean>>;
    setFollowers: React.Dispatch<React.SetStateAction<number>>;
    followedId: string | string[] | undefined;
}

interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
    hello: () => void;
}

interface InterServerEvents {
    ping: () => void;
}

interface SocketData {
    name: string;
    age: number;
}

function index({ isLoading, setIsLoading, isFollowing, setIsFollowing, setFollowers, followedId }: IProps) {
    const socket = io('http://localhost:9000', {
        withCredentials: true,
        extraHeaders: {
            'my-custom-header': 'abcd',
        },
    });
    useEffect(() => {
        socket.emit('connection', 'hello');
    }, []);
    const currentUser: AppInterface['currentUser'] = useSelector((state: State) => state.currentUser);
    const dispath = useDispatch();
    const { setIsShowLoginModal } = bindActionCreators(actionCreators, dispath);
    const unAuthorizedJHandle = () => {
        setIsShowLoginModal(true);
    };
    const followHandler = async () => {
        socket.emit('follow', {
            message: 'follow',
        });
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
                    <button className={styles[`button--slate`]}>Loading...</button>
                ) : (
                    <button className={styles[`button--slate`]} onClick={unfollowHandler}>
                        <Image src={Check} alt=""></Image>
                        &nbsp;Following
                    </button>
                )
            ) : isLoading ? (
                <button className={styles[`button--primary`]} onClick={followHandler}>
                    Loading...
                </button>
            ) : (
                <button className={styles[`button--primary`]} onClick={followHandler}>
                    + Follow
                </button>
            )}
        </>
    );
}

export default index;
