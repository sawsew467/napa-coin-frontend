import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import TableToken, { DataType } from '../../components/TableToken/TableToken';
import axios from 'axios';
import { AppInterface } from '../_app';
import { useSelector } from 'react-redux';
import { State } from '../../redux';

const Watchlist = () => {
    return (
        <>
            <Header
                setIsShowLoginModal={function (value: React.SetStateAction<boolean>): void {
                    throw new Error('Function not implemented.');
                }}
            ></Header>
            <div className="bg_home">
                <h1 className="title-watchlist">My Watchlist </h1>
                <TableToken searchResult={[]} isSearchResult={false}></TableToken>
            </div>
        </>
    );
};

export default Watchlist;
