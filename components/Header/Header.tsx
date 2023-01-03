import React, { useState } from 'react';
import Image from 'next/image';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faMagnifyingGlass, faSun } from '@fortawesome/free-solid-svg-icons';
import sun from '../../assets/icons/sun.svg';
import styles from './header.module.scss';
import logoLight from '../../assets/img/logo-light.svg';
import logoDark from '../../assets/img/logo-dark.png';
import avatar from '../../assets/img/avt.png';
import Link from 'next/link';
import search from '../../assets/icons/search.svg';
import { IState as AppState } from '../../pages/home';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '../../redux';
import { AppInterface } from '../../pages/_app';
import Dropdown from '../Dropdown';
interface IProps {
    setIsShowLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ setIsShowLoginModal }: IProps) => {
    const currentUser: AppInterface['currentUser'] = useSelector((state: State) => state.currentUser);

    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    const [isShowModal, setIsShowModal] = useState<boolean>(false);
    const [isShowMenu, setIsShowMenu] = useState<boolean>(false);
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
        <>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <header className={styles.header}>
                        <Link href={'/'}>
                            <Image className={styles.header__logo} src={logoLight} alt=""></Image>
                        </Link>
                        <div className={styles.header__dropdown}>
                            <Image src={sun} alt=""></Image>
                            <div className={styles.header__search}>
                                <input placeholder="Search"></input>
                                <Image src={search} alt=""></Image>
                            </div>
                            {currentUser.avatar ? (
                                <img
                                    className={styles.header__avatar}
                                    src={currentUser.avatar}
                                    onClick={() => setIsShowMenu(!isShowMenu)}
                                ></img>
                            ) : (
                                <button className={styles.header__button} onClick={() => setIsShowLoginModal(true)}>
                                    Login
                                </button>
                            )}
                            <div className={!isShowMenu ? styles['header__menu'] : styles['header__menu-active']}>
                                <Dropdown></Dropdown>
                            </div>
                        </div>
                    </header>
                </div>
            </div>
        </>
    );
};

export default Header;
