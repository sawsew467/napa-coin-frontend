/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faMagnifyingGlass, faSun } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

// -------------------------------- //

import sun from '../../assets/icons/sun.svg';
import styles from './header.module.scss';
import logoLight from '../../assets/img/logo-light.svg';
import logoDark from '../../assets/img/logo-dark.png';
import avatar from '../../assets/img/avt.png';
import search from '../../assets/icons/search.svg';
import { IState as AppState } from '../../pages/home';
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '../../redux';
import { AppInterface } from '../../pages/_app';
import Dropdown from '../Dropdown';
import { DataType } from '../TableToken/TableToken';
interface IProps {
    handleSearchDebound: (e: {
        target: {
            value: any;
        };
    }) => void;
    searchDebound: string;
    isSearchResult: boolean;
    searchResult: DataType[];
    setSearchDebound: React.Dispatch<React.SetStateAction<string>>;
}

const Header = ({
    handleSearchDebound,
    searchDebound,
    isSearchResult,
    searchResult,
    setSearchDebound,
}: IProps) => {
    const currentUser: AppInterface['currentUser'] = useSelector((state: State) => state.currentUser);
    const dispath = useDispatch();
    const { setDarkmode, setIsShowLoginModal } = bindActionCreators(actionCreators, dispath);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    const [isShowModal, setIsShowModal] = useState<boolean>(false);
    const [isShowMenu, setIsShowMenu] = useState<boolean>(false);

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
                            {/* <Image src={sun} alt=""></Image> */}
                            <DarkModeSwitch
                                // style={{ marginBottom: '2rem' }}
                                checked={isDarkMode}
                                onChange={toggleDarkMode}
                                size={25}
                            />
                            <div className={styles.header__search}>
                                <input
                                    placeholder="Search"
                                    value={searchDebound}
                                    onChange={handleSearchDebound}
                                ></input>
                                <Image src={search} alt=""></Image>
                            </div>
                            {isSearchResult && searchDebound !== '' ? (
                                <>
                                    <div className={styles['search-result__dropdown']}>
                                        {searchResult.map((token) => (
                                            <React.Fragment key={token.id}>
                                                <div className={styles['search-result__item']}>
                                                    <Link
                                                        href={`/token-detail/${token.slug}`}
                                                        onClick={() => setSearchDebound('')}
                                                    >
                                                        <div className={styles['token-info']}>
                                                            <img
                                                                src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${token.id}.png`}
                                                                alt=""
                                                                width={20}
                                                                height={20}
                                                            />
                                                            <p>{token.name}</p>
                                                            <small className={styles['token-symbol']}>
                                                                {token.symbol}
                                                            </small>
                                                        </div>
                                                    </Link>
                                                    <div className="token-rank">#{token.cmc_rank}</div>
                                                </div>
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </>
                            ) : null}
                            {currentUser.avatar ? (
                                <img
                                    className={styles.header__avatar}
                                    src={currentUser.avatar}
                                    alt=""
                                    onClick={() => setIsShowMenu(!isShowMenu)}
                                ></img>
                            ) : (
                                <button className={styles.header__button} onClick={() => setIsShowLoginModal(true)}>
                                    Login
                                </button>
                            )}
                            <div className={!isShowMenu ? styles['header__menu'] : styles['header__menu-active']}>
                                <Dropdown setIsShowMenu={setIsShowMenu}></Dropdown>
                            </div>
                        </div>
                    </header>
                </div>
            </div>
        </>
    );
};

export default Header;
