import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import TableToken, { DataType } from '../../components/TableToken/TableToken';
import axios from 'axios';
import { AppInterface } from '../_app';
import { useSelector } from 'react-redux';
import { State } from '../../redux';

const Watchlist = () => {
    const darkMode: AppInterface['darkmode'] = useSelector((state: State) => state.darkmode);

    return (
        <>
            <div className={darkMode}>
                <Header
                    handleSearchDebound={function (e: { target: { value: any } }): void {
                        throw new Error('Function not implemented.');
                    }}
                    searchDebound={''}
                    isSearchResult={false}
                    searchResult={[]}
                    setSearchDebound={function (value: React.SetStateAction<string>): void {
                        throw new Error('Function not implemented.');
                    }}
                ></Header>
                <div className="bg_home page-wrapper">
                    <h1 className="title-watchlist section-title">My Watchlist </h1>
                    <TableToken searchResult={[]} isSearchResult={false}></TableToken>
                </div>
            </div>
        </>
    );
};

export default Watchlist;
