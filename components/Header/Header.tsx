/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useRef } from 'react';
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
import logoDark from '../../assets/img/logo-dark.svg';
import avatar from '../../assets/img/avt.png';
import searchLight from '../../assets/icons/search.svg';
import searchDark from '../../assets/icons/search-dark.svg';
import { IState as AppState } from '../../pages/home';
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '../../redux';
import { AppInterface } from '../../pages/_app';
import Dropdown from '../Dropdown';
import { DataType } from '../TableToken/TableToken';
import clsx from 'clsx';
import { setSearch } from '../../redux/action-creators';
import { useRouter } from 'next/router';

interface IProps {
    handleSearchDebound: (e: {
        target: {
            value: any;
        };
    }) => void;
    isSearchResult: boolean;
    searchResult: DataType[];
}

const Header = ({ handleSearchDebound, isSearchResult, searchResult }: IProps) => {
    const dispath = useDispatch();
    const router = useRouter();
    const currentUser: AppInterface['currentUser'] = useSelector((state: State) => state.currentUser);
    const search: AppInterface['search'] = useSelector((state: State) => state.search);
    const darkMode: AppInterface['darkmode'] = useSelector((state: State) => state.darkmode);
    const { setDarkmode, setIsShowLoginModal } = bindActionCreators(actionCreators, dispath);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(darkMode === 'dark');
    const [isShowModal, setIsShowModal] = useState<boolean>(false);
    const [isShowMenu, setIsShowMenu] = useState<boolean>(false);
    const searchRef = useRef<any>(null);

    const toggleDarkMode = (checked: boolean) => {
        isDarkMode ? setDarkmode('light') : setDarkmode('dark');
        setIsDarkMode(checked);
    };

    const toggleShowModal = () => {
        setIsShowModal(!isShowModal);
    };

    const handleClickSearchIcon = () => {
        setSearch('');

        console.log(search);
        router.push('/');
    };

    return (
        <>
            <div className={clsx(styles.wrapper, 'header__wrapper')}>
                <div className={styles.container}>
                    <header className={styles.header}>
                        <Link href={'/'}>
                            {darkMode === 'dark' ? (
                                <Image className={styles.header__logo} src={logoDark} alt=""></Image>
                            ) : (
                                <Image className={styles.header__logo} src={logoLight} alt=""></Image>
                            )}
                        </Link>
                        <div className={styles.header__dropdown}>
                            {/* <Image src={sun} alt=""></Image> */}
                            <DarkModeSwitch
                                // style={{ marginBottom: '2rem' }}
                                checked={darkMode === 'dark'}
                                onChange={toggleDarkMode}
                                size={25}
                            />
                            <div className={styles.header__search}>
                                <input
                                    placeholder="Search"
                                    value={search}
                                    onChange={handleSearchDebound}
                                    className={clsx('header__search')}
                                ></input>
                                {darkMode === 'dark' ? (
                                    <Image
                                        onClick={handleClickSearchIcon}
                                        ref={searchRef}
                                        src={searchDark}
                                        alt=""
                                    ></Image>
                                ) : (
                                    <Image
                                        onClick={handleClickSearchIcon}
                                        ref={searchRef}
                                        src={searchLight}
                                        alt=""
                                    ></Image>
                                )}
                            </div>
                            {isSearchResult && search !== '' ? (
                                <>
                                    <div className={styles['search-result__dropdown']}>
                                        {!!searchResult.length ? (
                                            searchResult.map((token) => (
                                                <React.Fragment key={token.id}>
                                                    <div className={styles['search-result__item']}>
                                                        <Link
                                                            href={`/token-detail/${token.slug}`}
                                                            onClick={() => setSearch('')}
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
                                            ))
                                        ) : (
                                            <p>
                                                We couldn&apos;t find anything matching your search. <br />
                                                Try again with a different term.
                                            </p>
                                        )}
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
