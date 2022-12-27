/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Header from '../../components/Header/Header';
// import LoginModal from '../../components/LoginModal/LoginModal';
import TopAccount from '../../components/TopAccount/TopAccount';
import TableToken from '../../components/TableToken/TableToken';

const HomePage = () => {
    return (
        <>
            <Header></Header>
            <div className="bg_home">
                <TopAccount></TopAccount>
                <h1 className="title-home">Today's Cryptocurrency Prices by NAPA Coins </h1>
                <TableToken></TableToken>
            </div>
        </>
    );
};

export default HomePage;
