/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import Link from 'next/link';
import clsx from 'clsx';
import style from './style.module.scss';
import coiImg from '../../assets/img/avt.png';
import { getTokenLastest } from '../../apis/tokenApis';

interface Trending {
    id: number;
    name: string;
    cmc_rank: number;
    slug: string;
}

const Trending = () => {
    const [listTrend, setListTrend] = useState<Trending[]>([]);

    useEffect(() => {
        const listData = async () => {
            const res = await getTokenLastest();
            setListTrend(res?.data?.data.slice(0, 7));
        };
        listData();
    }, []);

    return (
        <>
            {!!listTrend.length &&
                listTrend.map(({ id, name, cmc_rank, slug }) => (
                    <Link href={`${slug}`} key={id}>
                        <div className={style[`trending`]}>
                            <div className={style[`trending__coin`]}>
                                <img
                                    src={` https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`}
                                    alt=""
                                    className={style[`symbol-image`]}
                                />
                                <h1 className={clsx(style[`symbol-name`], 'token-name')}>{name}</h1>
                            </div>
                            <div className={style[`trending__rank`]}>
                                <p className={clsx(style[`trending__rank--pos`], 'button--slate')}> # {cmc_rank}</p>
                            </div>
                        </div>
                    </Link>
                ))}
        </>
    );
};

export default Trending;
