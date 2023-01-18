import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import TableToken, { DataType } from '../../components/TableToken/TableToken';
import axios from 'axios';
import { AppInterface } from '../_app';
import { useSelector } from 'react-redux';
import { State } from '../../redux';
import { Router, useRouter } from 'next/router';

const Watchlist = () => {
    const router = useRouter();
    const darkMode: AppInterface['darkmode'] = useSelector((state: State) => state.darkmode);
    const currentUser: AppInterface['currentUser'] = useSelector((state: State) => state.currentUser);

    useEffect(() => {
        if (!JSON.parse(`${window.localStorage.getItem('currentUser')}`)) {
            router.push('/home');
        }
    }, []);

    console.log(currentUser);

    return (
        <>
            <div className={darkMode}>
                <Header
                    isSearchResult={false}
                    searchResult={[]}
                    handleSearchDebound={function (e: { target: { value: any } }): void {
                        throw new Error('Function not implemented.');
                    }}
                ></Header>
                <div className="bg_home page-wrapper">
                    <h1 className="title-watchlist">My Watchlist </h1>
                    <TableToken searchResult={[]} isSearchResult={false}></TableToken>
                </div>
            </div>
        </>
    );
};

export default Watchlist;
