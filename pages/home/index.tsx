/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import TopAccount from '../../components/TopAccount/TopAccount';
import TableToken from '../../components/TableToken/TableToken';
import LoginModal from '../../components/LoginModal';
import RegisterModal from '../../components/RegisterModal';

const HomePage = () => {
    const [isShowLoginModal, setIsShowLoginModal] = useState(true);
    const [isShowRegisterModal, setIsShowRegisterModal] = useState(false);

    return (
        <>
            <Header></Header>
            <div className="bg_home">
                <TopAccount></TopAccount>
                <h1 className="title-home">Today's Cryptocurrency Prices by NAPA Coins </h1>
                <TableToken></TableToken>
            </div>
            {isShowLoginModal && (
                <LoginModal
                    setIsShowRegisterModal={setIsShowRegisterModal}
                    setIsShowLoginModal={setIsShowLoginModal}
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
