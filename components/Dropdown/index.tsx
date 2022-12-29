import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppInterface } from '../../pages/_app';
import { State } from '../../redux';
import styles from './style.module.scss';
import Router, { useRouter } from 'next/router';

function index() {
    const currentUser: AppInterface['currentUser'] = useSelector((state: State) => state.currentUser);
    const [isLogOut, setIsLogOut] = useState(false);
    const router = useRouter();
    const handleLogOut = () => {
        setIsLogOut(true);
        router.push('/');
    };
    useEffect(() => {
        isLogOut && window.localStorage.removeItem('currentUser');
    }, [isLogOut]);
    return (
        <>
            <div className={styles['dropdown']}>
                <div className={styles['dropdown__head']}>
                    <img className={styles['dropdown__avatar']} src={currentUser.avatar}></img>
                    <div className={styles['dropdown__title']}>
                        <p className={styles['dropdown__name']}>{currentUser.fullname}</p>
                        <p className={styles['dropdown__email']}>{currentUser.email}</p>
                    </div>
                </div>
                <div className={styles['dropdown__body']}>
                    <ul className={styles['dropdown__list']}>
                        <li className={styles['dropdown__item']}>
                            <Link href="/profile">Your profile</Link>
                        </li>
                        <li className={styles['dropdown__item']}>
                            <Link href="/watch-list">Watch list</Link>
                        </li>
                        <li className={styles['dropdown__item']}>
                            <Link href="/settings">Settings</Link>
                        </li>
                        <li className={styles['dropdown__item']} onClick={handleLogOut}>
                            <Link href="/home">Log out</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default index;
