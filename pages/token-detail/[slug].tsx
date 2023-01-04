import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios from 'axios';

import Header from '../../components/Header/Header';
import DetailToken from '../../components/DetailToken';
import Convert from '../../components/Convert';
import Trending from '../../components/Trending';
import style from './style.module.scss';
import liveChart from '../../assets/img/live-chart.png';

import { DataType } from '../../components/TableToken/TableToken';

const TokenDetail = () => {
    const router = useRouter();
    const [results, setResult] = useState<DataType[]>([]);
    const slug = router.query.slug;
    useEffect(() => {
        const listData = async () => {
            const res = await axios.get(`http://localhost:5000/api/v1/coin/latest`);
            setResult(res.data.data);
        };

        listData();
    }, []);

    const detailCoin = results.filter((token: any) => token.slug === slug);

    return (
        <>
            <Header
                setIsShowLoginModal={function (value: React.SetStateAction<boolean>): void {
                    throw new Error('Function not implemented.');
                }}
            ></Header>
            <div className="bg_home">
                <DetailToken detailCoin={detailCoin}></DetailToken>
                <h1 className="title-home">BTT to USD Converter </h1>
                <div className={style[`convert-section`]}>
                    <div className={style[`chart-col`]}>
                        <div className={style[`convert-coin`]}>{/* <Convert></Convert> */}</div>
                        <div className={style[`live__chart`]}></div>
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
