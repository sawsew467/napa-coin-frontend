import React from 'react';

import Header from '../../components/Header/Header';
import DetailToken from '../../components/DetailToken';
import Convert from '../../components/Convert';
import Trending from '../../components/Trending';
import style from './style.module.scss';
import liveChart from '../../assets/img/live-chart.png';
import Image from 'next/image';

const TokenDetail = () => {
    return (
        <>
            <Header
                setIsShowLoginModal={function (value: React.SetStateAction<boolean>): void {
                    throw new Error('Function not implemented.');
                }}
            ></Header>
            <div className="bg_home">
                <DetailToken></DetailToken>
                <h1 className="title-home">BTT to USD Converter </h1>
                <div className={style[`convert-section`]}>
                    <div className={style[`chart-col`]}>
                        <div className={style[`convert-coin`]}>
                            <Convert></Convert>
                        </div>
                        <div className={style[`live__chart`]}>
                            <Image src={liveChart} alt="" />
                        </div>
                    </div>
                    <div className={style[`trending-token`]}>
                        <h2>Trending Coins and Tokens 🔥</h2>
                        <div className={style[`trending-item`]}>
                            <Trending></Trending>
                            <Trending></Trending>
                            <Trending></Trending>
                            <Trending></Trending>
                            <Trending></Trending>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TokenDetail;
