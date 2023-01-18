/* eslint-disable @next/next/no-img-element */
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import style from './account.module.scss';
import Link from 'next/link';
import { AppInterface } from '../../pages/_app';
import { useSelector } from 'react-redux';
import { State } from '../../redux';
import Follow from './Follow/index';
import clsx from 'clsx';

interface IProps {
    user: {
        _id: string;
        fullname: string;
        email: string;
        avatar: string;
        follower: string[];
        following: string[];
    };
    following: boolean;
}

const Account = ({ user, following }: IProps) => {
    const currentUser: AppInterface['currentUser'] = useSelector((state: State) => state.currentUser);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isFollowing, setIsFollowing] = useState<boolean>(following);
    // useEffect(() => {
    //     // setIsFollowing(currentUser.following?.includes(user._id));
    //     setIsFollowing(user.follower.includes(currentUser._id));
    // }, []);
    // if (user._id === '63b4f3917babe40711f4c011') {
    //     console.log(isFollowing);
    //     console.log('!!!', user.follower);
    //     // console.log(user.follower.includes(currentUser._id));
    // }

    return (
        <div className={style.account}>
            <div className={style.account__flex}>
                <div className={style.account__item}>
                    <img src={user.avatar} alt=""></img>
                    <Link href={`/profile/${user._id}`}>
                        <p className={clsx(style.account__name, 'text')}>{user.fullname}</p>
                    </Link>
                    <FontAwesomeIcon className="icon-color" icon={faCircleCheck} />
                    <small className={style.at}>{user.email}</small>
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                        <Follow
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                            isFollowing={isFollowing}
                            setIsFollowing={setIsFollowing}
                            setFollowers={() => {}}
                            followedId={user._id}
                        ></Follow>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;
