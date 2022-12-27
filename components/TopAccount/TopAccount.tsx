import React from 'react';
import style from './top-account.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Account from './Account';

const TopAccount = () => {
    return (
        <div className={style.account__container}>
            <div className={style.account__title}>
                <h2>
                    {' '}
                    <FontAwesomeIcon className={style.star} icon={faStar} /> Top Community Accounts
                </h2>
                <div className={style.account__flex}>
                    <Account></Account>
                    <Account></Account>
                    <Account></Account>
                </div>
            </div>
        </div>
    );
};

export default TopAccount;
