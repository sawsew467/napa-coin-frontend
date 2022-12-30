import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import React from 'react';
import style from './account.module.scss';
import avtAccount from '../../assets/img/avt.png';
import Link from 'next/link';
// import { IState as IProps } from './TopAccount';

interface IProps {
    user: {
        _id: string;
        fullname: string;
        email: string;
        avatar: string;
    };
}

const Account = ({ user }: IProps) => {
    return (
        <div className={style.account}>
            <div className={style.account__flex}>
                <div className={style.accoun__item}>
                    {/* <Image src={avtAccount} alt="avt account" /> */}
                    <img src={user.avatar}></img>
                    <Link href={`/profile/${user._id}`}>
                        <p>{user.fullname}</p>
                    </Link>
                    <FontAwesomeIcon className="icon-color" icon={faCircleCheck} />
                    <small className={style.at}>{user.email}</small>
                    <button className={style.btn__follow}>+ Follow</button>
                </div>
            </div>
        </div>
    );
};

export default Account;
