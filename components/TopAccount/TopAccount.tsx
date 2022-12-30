import React, { useEffect, useState } from 'react';
import style from './top-account.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Account from './Account';
import { getAllUsers } from '../../apis/usersApis';

export interface IState {
    user: {
        _id: string;
        fullname: string;
        email: string;
        avatar: string;
    };
    userList: IState['user'][];
}

const TopAccount = () => {
    const [userList, setUserList] = useState<IState['userList']>([]);
    useEffect(() => {
        getAllUsers().then((res) => {
            // console.log([1, 2, 3, 4, 5, 6, 7, 8, 9].slice(6, 9));

            setUserList(res.data.users.slice(res.data.users.length - 3, res.data.users.length).reverse());
        });
    }, []);
    return (
        <div className={style.account__container}>
            <div className={style.account__title}>
                <h2>
                    {' '}
                    <FontAwesomeIcon className={style.star} icon={faStar} /> Top Community Accounts
                </h2>
                <div className={style.account__flex}>
                    {userList.map((user) => (
                        <Account user={user}></Account>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TopAccount;
