import React, { useState } from 'react';
import Image from 'next/image';
import * as ReactDOM from 'react-dom';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faMagnifyingGlass, faSun } from '@fortawesome/free-solid-svg-icons';

import style from './header.module.scss';
import logoLight from '../../assets/img/logo-light.svg';
import logoDark from '../../assets/img/logo-dark.png';
import avatar from '../../assets/img/avt.png';
import Link from 'next/link';
import { IState as AppState } from '../../pages/home';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '../../redux';
import { AppInterface } from '../../pages/_app';

interface IProps {
    setIsShowLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ setIsShowLoginModal }: IProps) => {
    const currentUser: AppInterface['currentUser'] = useSelector((state: State) => state.currentUser);
    console.log(currentUser);
    const [isShowMenu, setIsShowMenu] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    const dispath = useDispatch();
    const { setDarkmode } = bindActionCreators(actionCreators, dispath);
    const toggleDarkMode = (checked: boolean) => {
        isDarkMode ? setDarkmode('light') : setDarkmode('dark');
        setIsDarkMode(checked);
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
                            {!currentUser.email ? (
                                <button className={style.btn__login} onClick={() => setIsShowLoginModal(true)}>
                                    Login
                                </button>
                            ) : (
                                <img
                                    src={currentUser.avatar}
                                    alt=""
                                    className={style.header__avatar}
                                    onClick={() => setIsShowMenu(!isShowMenu)}
                                ></img>
                            )}

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
