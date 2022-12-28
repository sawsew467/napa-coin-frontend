/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import TopAccount from '../../components/TopAccount/TopAccount';
import TableToken from '../../components/TableToken/TableToken';
import LoginModal from '../../components/LoginModal';
import RegisterModal from '../../components/RegisterModal';
import { AppInterface } from '../_app';
import { useSelector } from 'react-redux';
import { State } from '../../redux';
import { useDispatch } from 'react-redux';
import { actionCreators } from '../../redux';
import { bindActionCreators } from 'redux';

export interface IState {
    currentUser: {
        email: string;
        avatar: string;
        fullname: string;
    };
}

const HomePage = () => {
    const darkMode: AppInterface['darkmode'] = useSelector((state: State) => state.darkmode);
    console.log('darkMode', darkMode);
    const [isShowLoginModal, setIsShowLoginModal] = useState(false);
    const [isShowRegisterModal, setIsShowRegisterModal] = useState(false);
    const dispath = useDispatch();
    const { setCurrentUser } = bindActionCreators(actionCreators, dispath);
    useEffect(() => {
        setCurrentUser(
            JSON.parse(`${window.localStorage.getItem('currentUser')}`) ?? {
                email: '',
                avatar: '',
                fullname: '',
            },
        );
    }, []);
    return (
        <>
            <Header setIsShowLoginModal={setIsShowLoginModal}></Header>
            <div className="bg_home">
                <TopAccount></TopAccount>
                <h1 className="title-home">Today's Cryptocurrency Prices by NAPA Coins </h1>
                <TableToken></TableToken>
            </div>
            {isShowLoginModal && (
                <LoginModal
                    setIsShowRegisterModal={setIsShowRegisterModal}
                    setIsShowLoginModal={setIsShowLoginModal}
                    // setCurrentUser={setCurrentUser}
                ></LoginModal>
            )}
            {isShowRegisterModal && (
                <RegisterModal
                    setIsShowRegisterModal={setIsShowRegisterModal}
                    setIsShowLoginModal={setIsShowLoginModal}
                ></RegisterModal>
            )}
        </>
    );
};

export default HomePage;
