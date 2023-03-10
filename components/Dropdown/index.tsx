/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppInterface } from '../../pages/_app';
import { State } from '../../redux';
import styles from './style.module.scss';
import Router, { useRouter } from 'next/router';
import clsx from 'clsx';

interface IProps {
    setIsShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

function index({ setIsShowMenu }: IProps) {
    const currentUser: AppInterface['currentUser'] = useSelector((state: State) => state.currentUser);
    const [isLogOut, setIsLogOut] = useState(false);
    const router = useRouter();
    const handleLogOut = () => {
        setIsLogOut(true);
        setIsShowMenu(false);
        // Router.reload();
        router.push('/home');
    };
    useEffect(() => {
        isLogOut && window.localStorage.removeItem('currentUser');
        isLogOut && window.localStorage.removeItem('token');
    }, [isLogOut]);
    return (
        <>
            <div className={clsx(styles['dropdown'], 'box')}>
                <div className={styles['dropdown__head']}>
                    <img className={styles['dropdown__avatar']} src={currentUser.avatar} alt=""></img>
                    <div className={styles['dropdown__title']}>
                        <p className={styles['dropdown__name']}>{currentUser.fullname}</p>
                        <p className={styles['dropdown__email']}>{currentUser.email}</p>
                    </div>
                </div>
                <div className={styles['dropdown__body']}>
                    <ul className={styles['dropdown__list']}>
                        <Link href="/profile">
                            <li
                                className={clsx(styles['dropdown__item'], 'dropdown__item')}
                                onClick={() => setIsShowMenu(false)}
                            >
                                My profile
                            </li>
                        </Link>
                        <Link href="/watchlist">
                            <li
                                className={clsx(styles['dropdown__item'], 'dropdown__item')}
                                onClick={() => setIsShowMenu(false)}
                            >
                                Watch list
                            </li>
                        </Link>
                        <Link href="/settings">
                            <li
                                className={clsx(styles['dropdown__item'], 'dropdown__item')}
                                onClick={() => setIsShowMenu(false)}
                            >
                                Settings
                            </li>
                        </Link>
                        <Link href="/">
                            <li className={clsx(styles['dropdown__item'], 'dropdown__item')} onClick={handleLogOut}>
                                Log out
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default index;
