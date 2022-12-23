import React from 'react';
import Image from 'next/image';

import style from './_user-dropdown.module.scss';
import avatar from '../../assets/img/avt.png';

const UserDropdown = () => {
    return (
        <div className={style.user__container}>
            <div className={style.user__dropdown}>
                <div className={style.user__flex}>
                    <span className={style.user__avatar}>
                        <Image src={avatar} alt="avt" />
                    </span>
                    <span className={style.user__info}>
                        <h2>User</h2>
                        <small>user@gmail.com</small>
                    </span>
                </div>
                <div className={style.dropdown__list}>
                    <ul>
                        <li>
                            <a href="#">My Profile</a>
                        </li>
                        <li>
                            <a href="#">Watchlist</a>
                        </li>
                        <li>
                            <a href="#">Settings</a>
                        </li>
                        <li>
                            <a href="#">Log out</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default UserDropdown;
