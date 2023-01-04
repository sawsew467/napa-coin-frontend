import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import style from './account.module.scss';
import avtAccount from '../../assets/img/avt.png';
import Link from 'next/link';
import { AppInterface } from '../../pages/_app';
import { useSelector } from 'react-redux';
import { State } from '../../redux';
import Router, { useRouter } from 'next/router';
import Check from '../../assets/icons/check-line.svg';

interface IProps {
    user: {
        _id: string;
        fullname: string;
        email: string;
        avatar: string;
    };
}

const Account = ({ user }: IProps) => {
    const currentUser: AppInterface['currentUser'] = useSelector((state: State) => state.currentUser);
    const router = useRouter();
    const [isFollowing, setIsFollowing] = useState<boolean>(false);
    useEffect(() => {
        setIsFollowing(currentUser.following?.includes(user._id));
        console.log(user.fullname, currentUser.following?.includes(user._id));
    }, []);
    return (
        <div className={style.account}>
            <div className={style.account__flex}>
                <div className={style.account__item}>
                    {/* <Image src={avtAccount} alt="avt account" /> */}
                    <img src={user.avatar}></img>
                    <Link href={`/profile/${user._id}`}>
                        <p>{user.fullname}</p>
                    </Link>
                    <FontAwesomeIcon className="icon-color" icon={faCircleCheck} />
                    <small className={style.at}>{user.email}</small>
                    {isFollowing ? (
                        <Link href={`/profile/${user._id}`}>
                            <button
                                className={style[`account__button--slate`]}
                                //  onClick={unfollowHandler}
                            >
                                <Image src={Check} alt=""></Image>
                                &nbsp;Following
                            </button>
                        </Link>
                    ) : (
                        <Link href={`/profile/${user._id}`}>
                            <button className={style[`account__button--primary`]}>+ Follow</button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Account;
