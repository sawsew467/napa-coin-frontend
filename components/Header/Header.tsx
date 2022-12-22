import React from 'react';
import Image from 'next/image';

import style from './header.module.scss';
import logo from '../../assets/img/Logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    return (
        <div className={style.header}>
            <Image src={logo} alt="Logo" style={{ backgroundColor: '#000' }} />
            <FontAwesomeIcon icon={faMoon} />
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input className={style.search} type="text" placeholder="Search" />
            <button className="btn btn-login">Login</button>
        </div>
    );
};

export default Header;
