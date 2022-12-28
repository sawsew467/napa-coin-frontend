import React, { useState } from 'react';
import Image from 'next/image';
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
    const [isShowModal, setIsShowModal] = useState<boolean>(false);
    const dispath = useDispatch();
    const { setDarkmode } = bindActionCreators(actionCreators, dispath);
    const toggleDarkMode = (checked: boolean) => {
        isDarkMode ? setDarkmode('light') : setDarkmode('dark');
        setIsDarkMode(checked);
    };

    const toggleShowModal = () => {
        setIsShowModal(!isShowModal);
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
                            <div className={style.light__icon}>
                                <DarkModeSwitch
                                    style={{ marginBottom: '2rem', height: '20px', width: '20px' }}
                                    checked={isDarkMode}
                                    onChange={toggleDarkMode}
                                    size={120}
                                />
                            </div>
                            <div className={style.search__icon}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </div>
                            <div className={style.search__input}>
                                <input className={style.search} type="text" placeholder="Search" />
                            </div>
                            <div className={style[`button__modal--user`]}>
                                {!currentUser.email ? (
                                    <button className={style.btn__login} onClick={() => setIsShowLoginModal(true)}>
                                        Login
                                    </button>
                                ) : (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <div>
                                        <img
                                            src={currentUser.avatar}
                                            alt=""
                                            className={style.header__avatar}
                                            onClick={toggleShowModal}
                                        ></img>
                                        {isShowModal && (
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
                                                            <Link href="/profile">My Profile</Link>
                                                        </li>
                                                        <li>
                                                            <Link href="/watchlist">Watchlist</Link>
                                                        </li>
                                                        <li>
                                                            <Link href="/settings">Settings</Link>
                                                        </li>
                                                        <li>
                                                            <Link href="/">Log out</Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
