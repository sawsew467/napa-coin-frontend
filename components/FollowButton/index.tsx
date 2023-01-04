import React from 'react';
import Image from 'next/image';
import Check from '../../assets/icons/check-line.svg';
import styles from './style.module.scss';
import { followUser, unfollowUser } from '../../apis/followApis';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '../../redux';
import { AppInterface } from '../../pages/_app';

interface IProps {
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    isFollowing: boolean;
    setIsFollowing: React.Dispatch<React.SetStateAction<boolean>>;
    setFollowers: React.Dispatch<React.SetStateAction<number>>;
    followedId: string | string[] | undefined;
}

function index({ isLoading, setIsLoading, isFollowing, setIsFollowing, setFollowers, followedId }: IProps) {
    const currentUser: AppInterface['currentUser'] = useSelector((state: State) => state.currentUser);
    const dispath = useDispatch();
    const { setCurrentUser } = bindActionCreators(actionCreators, dispath);

    const followHandler = async () => {
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
    // console.log(followedId, ' ', isFollowing);
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
