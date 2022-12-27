import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import React from 'react';

import style from './account.module.scss';
import avtAccount from '../../assets/img/avt.png';

const Account = () => {
    return (
        <div className={style.account}>
            <div className={style.account__flex}>
                <div className={style.accoun__item}>
                    <Image src={avtAccount} alt="avt account" />
                    <p>Qtum_Foundation</p>
                    <FontAwesomeIcon className="icon-color" icon={faCircleCheck} />
                    <small className={style.at}>@Qtum_Foundation</small>
                    <button className={style.btn__follow}>+ Follow</button>
                </div>
            </div>
        </div>
    );
};

export default Account;
