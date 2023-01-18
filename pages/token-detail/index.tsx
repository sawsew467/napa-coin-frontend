import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import axios from 'axios';

import Header from '../../components/Header/Header';
import DetailToken from '../../components/DetailToken';
import Convert from '../../components/Convert';
import Trending from '../../components/Trending';
import style from './style.module.scss';
import liveChart from '../../assets/img/live-chart.png';
import { DataType } from '../../components/TableToken/TableToken';

const TokenDetail = () => {
    return (
        <>
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
            <div className="bg_home">
                <DetailToken detailCoin={[]} isLoading></DetailToken>
                <h1 className="title-home ">BTT to USD Converter </h1>
                <div className={style[`convert-section`]}>
                    <div className={style[`chart-col`]}>
                        <div className={style[`convert-coin`]}>
                            <Convert detailCoin={[]}></Convert>
                        </div>
                        <div className={style[`live__chart`]}>
                            <Image src={liveChart} alt="" />
                        </div>
                    </div>
                    <div className={style[`trending-token`]}>
                        <h2>Trending Coins and Tokens 🔥</h2>
                        <div className={style[`trending-item`]}>
                            <Trending></Trending>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TokenDetail;
