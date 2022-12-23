import React, { useState } from 'react';
import Image from 'next/image';
import * as ReactDOM from 'react-dom';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faMagnifyingGlass, faSun } from '@fortawesome/free-solid-svg-icons';

import style from './header.module.scss';
import logoLight from '../../assets/img/logo-light.png';
import logoDark from '../../assets/img/logo-dark.png';
import UserDropdown from '../UserDropdown';

const Header = () => {
    const [isDarkMode, setDarkMode] = useState<boolean>(false);

    const toggleDarkMode = (checked: boolean) => {
        setDarkMode(checked);
    };
    return (
        <div className={style.header}>
            <div className={style.header__flex}>
                <div className={style.logo}>
                    <Image src={logoLight} alt="Logo" />
                </div>
                <div className={style.header__input}>
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
                    <button className="btn btn-login">Login</button>
                </div>
            </div>
            <div>
                <UserDropdown></UserDropdown>
            </div>
        </div>
    );
};

export default Header;
