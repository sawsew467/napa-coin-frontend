import React, { useState } from 'react';
import Image from 'next/image';
import * as ReactDOM from 'react-dom';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faMagnifyingGlass, faSun } from '@fortawesome/free-solid-svg-icons';

import style from './header.module.scss';
import logoLight from '../../assets/img/logo-light.png';
import logoDark from '../../assets/img/logo-dark.png';
import avatar from '../../assets/img/avt.png';
import Link from 'next/link';

const Header = () => {
    const [isDarkMode, setDarkMode] = useState<boolean>(false);

    const toggleDarkMode = (checked: boolean) => {
        setDarkMode(checked);
    };

    return (
        <div className={style.wrapper}>
            <div className={style.header}>
                <div className={style.header__flex}>
                    <div className={style.logo}>
                        <Link href="/">
                            <Image src={logoLight} alt="Logo" />
                        </Link>
                    </div>
                    <div className={style.header__input}>
                        <div className={style.input__flex}>
                            <span className={style.light__icon}>
                                <DarkModeSwitch
                                    style={{ marginBottom: '2rem', height: '20px', width: '20px' }}
                                    checked={isDarkMode}
                                    onChange={toggleDarkMode}
                                    size={120}
                                />
                            </span>
                            <span className={style.search__icon}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </span>
                            <input className={style.search} type="text" placeholder="Search" />
                            <button className={style.btn__login}>Login</button>
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
