import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import clsx from 'clsx';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
    },
};

import Header from '../../components/Header/Header';
import DetailToken from '../../components/DetailToken';
import Convert from '../../components/Convert';
import Trending from '../../components/Trending';
import style from './style.module.scss';
import { DataType } from '../../components/TableToken/TableToken';
import { faker } from '@faker-js/faker';
import moment from 'moment';
import { getTokenLastest } from '../../apis/tokenApis';
import { AppInterface } from '../_app';
import { useSelector } from 'react-redux';
import { State } from '../../redux';

const TokenDetail = () => {
    const darkMode: AppInterface['darkmode'] = useSelector((state: State) => state.darkmode);
    const router = useRouter();
    const [results, setResult] = useState<DataType[]>([]);
    const [chart, setChart] = useState([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [searchDebound, setSearchDebound] = useState<string>('');
    const [searchResult, setSearchResult] = useState<DataType[]>([]);
    const [isSearchResult, setIsSearchResult] = useState<boolean>(false);
    const timingTimeoutRef = useRef<any>(null);
    const slug = router.query.slug;

    useEffect(() => {
        const listData = async () => {
            const res = await getTokenLastest();
            setResult(res.data.data);
            setIsLoading(false);
        };

        listData();
    }, []);

    useEffect(() => {
        const listDataChart = async () => {
            const dataChart = await axios.get(
                `https://api.coingecko.com/api/v3/coins/${slug}/market_chart?vs_currency=usd&days=30&interval=daily`,
            );
            setChart(dataChart.data.prices);
        };
        listDataChart();
    }, [slug]);

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

    const detailCoin = results.filter((token: any) => token.slug === slug);
    const labels = chart.map((price) => moment.unix(price[0] / 1000).format('MM-DD'));

    return (
        <>
            <div className={darkMode}>
                <Header
                    setIsShowLoginModal={() => {}}
                    handleSearchDebound={handleSearchDebound}
                    searchDebound={searchDebound}
                    searchResult={searchResult}
                    isSearchResult={isSearchResult}
                    setSearchDebound={setSearchDebound}
                ></Header>
                <div className="bg_home page-wrapper">
                    <DetailToken detailCoin={detailCoin} isLoading={isLoading}></DetailToken>
                    {detailCoin.map((token) => (
                        <h1 className="title-home" key={token.id}>
                            {`${token.name} to USD Converter`}{' '}
                        </h1>
                    ))}
                    <div className={style[`convert-section`]}>
                        <div className={style[`chart-col`]}>
                            <div className={clsx(style[`convert-coin`], 'box')}>
                                <Convert detailCoin={detailCoin}></Convert>
                            </div>
                            <div className={style[`live__chart`]}>
                                <Line
                                    options={options}
                                    data={{
                                        labels,
                                        datasets: [
                                            {
                                                label: 'Price',
                                                data: chart.map((price) => price[1]),
                                                borderColor: 'rgb(255, 99, 132)',
                                                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                            },
                                        ],
                                    }}
                                    height={250}
                                    width={800}
                                />
                            </div>
                        </div>
                        <div className={clsx(style[`trending-token`], 'box')}>
                            <h2>Trending Coins and Tokens 🔥</h2>
                            <div className={style[`trending-item`]}>
                                <Trending></Trending>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TokenDetail;
