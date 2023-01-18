/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../../components/Header/Header';
import TopAccount from '../../components/TopAccount/TopAccount';
import TableToken, { DataType } from '../../components/TableToken/TableToken';
import { AppInterface } from '../_app';
import LoginModal from '../../components/LoginModal';
import RegisterModal from '../../components/RegisterModal';
import { State } from '../../redux';
import { actionCreators } from '../../redux';
import { bindActionCreators } from 'redux';
import { getTokenLastest } from '../../apis/tokenApis';

export interface IState {
    currentUser: {
        email: string;
        avatar: string;
        fullname: string;
    };
}

const HomePage = () => {
    const darkMode: AppInterface['darkmode'] = useSelector((state: State) => state.darkmode);
    const search: AppInterface['darkmode'] = useSelector((state: State) => state.search);
    const isShowLoginModal: boolean = useSelector((state: State) => state.loginModal);
    const dispatch = useDispatch();
    const [isShowRegisterModal, setIsShowRegisterModal] = useState(false);
    const [results, setResults] = useState<DataType[]>([]);
    const [searchResult, setSearchResult] = useState<DataType[]>([]);
    const [isSearchResult, setIsSearchResult] = useState<boolean>(false);
    const { setCurrentUser, setIsShowLoginModal, setSearch, setDarkmode } = bindActionCreators(
        actionCreators,
        dispatch,
    );
    const timingTimeoutRef = useRef<any>(null);

    useEffect(() => {
        setDarkmode(localStorage.getItem('darkmode') ?? 'light');
        setCurrentUser(
            JSON.parse(`${window.localStorage.getItem('currentUser')}`) ?? {
                email: '',
                avatar: '',
                fullname: '',
            },
        );
        const listData = async () => {
            const res = await getTokenLastest();
            setResults(res.data.data);
        };
        listData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSearchDebound = (e: { target: { value: any } }) => {
        const value = e.target.value;
        setSearch(value);

        if (timingTimeoutRef.current) {
            clearTimeout(timingTimeoutRef.current);
        }

        timingTimeoutRef.current = setTimeout(() => {
            const filterResult = results?.filter((token) => {
                return (
                    token?.name?.toLowerCase()?.includes(value.toLowerCase()) ||
                    token?.symbol?.toLowerCase()?.includes(value.toLowerCase())
                );
            });
            setSearchResult(filterResult);
            setIsSearchResult(true);
        }, 500);
    };

    return (
        <>
            <div className={darkMode}>
                <Header
                    // setIsShowLoginModal={setIsShowLoginModal}
                    handleSearchDebound={handleSearchDebound}
                    isSearchResult={false}
                    searchResult={[]}
                ></Header>
                <div className="bg_home page-wrapper">
                    <TopAccount></TopAccount>
                    <h1 className="title-home page-title">Today's Cryptocurrency Prices by NAPA Coins </h1>
                    <TableToken searchResult={searchResult} isSearchResult={isSearchResult}></TableToken>
                </div>
                {isShowLoginModal && (
                    <LoginModal
                        setIsShowRegisterModal={setIsShowRegisterModal}
                        // setIsShowLoginModal={setIsShowLoginModal}
                        // setCurrentUser={setCurrentUser}
                    ></LoginModal>
                )}
                {isShowRegisterModal && (
                    <RegisterModal
                        setIsShowRegisterModal={setIsShowRegisterModal}
                        // setIsShowLoginModal={setIsShowLoginModal}
                    ></RegisterModal>
                )}
            </div>
        </>
    );
};

export default HomePage;
