/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useRef, useState } from 'react';
import Header from '../../components/Header/Header';
import TopAccount from '../../components/TopAccount/TopAccount';
import TableToken, { DataType } from '../../components/TableToken/TableToken';
import LoginModal from '../../components/LoginModal';
import RegisterModal from '../../components/RegisterModal';
import { AppInterface } from '../_app';
import { useSelector } from 'react-redux';
import { State } from '../../redux';
import { useDispatch } from 'react-redux';
import { actionCreators } from '../../redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
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
    const isShowLoginModal: boolean = useSelector((state: State) => state.loginModal);
    // console.log(loginModal);

    // const [isShowLoginModal, setIsShowLoginModal] = useState(false);
    const [isShowRegisterModal, setIsShowRegisterModal] = useState(false);
    const [results, setResults] = useState<DataType[]>([]);
    const [searchDebound, setSearchDebound] = useState<string>('');
    const [searchResult, setSearchResult] = useState<DataType[]>([]);
    const [isSearchResult, setIsSearchResult] = useState<boolean>(false);
    const dispath = useDispatch();
    const { setCurrentUser, setIsShowLoginModal } = bindActionCreators(actionCreators, dispath);
    const timingTimeoutRef = useRef<any>(null);

    useEffect(() => {
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
    }, []);

    const handleSearchDebound = (e: { target: { value: any } }) => {
        const value = e.target.value;
        setSearchDebound(value);

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
            <Header
                // setIsShowLoginModal={setIsShowLoginModal}
                handleSearchDebound={handleSearchDebound}
                searchDebound={searchDebound}
            ></Header>
            <div className="bg_home">
                <TopAccount></TopAccount>
                <h1 className="title-home">Today's Cryptocurrency Prices by NAPA Coins </h1>
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
        </>
    );
};

export default HomePage;
