import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import style from './style.module.scss';
import coiImg from '../../assets/img/avt.png';
import axios from 'axios';

interface Trending {
    id: number;
    name: string;
    cmc_rank: number;
}

const Trending = () => {
    const [listTrend, setListTrend] = useState<Trending[]>([]);

    useEffect(() => {
        const listData = async () => {
            const res = await axios.get(`http://localhost:5000/api/v1/coin/latest`);
            setListTrend(res?.data?.data.slice(0, 5));
        };
        listData();
    }, []);

    return (
        <>
            {!!listTrend.length &&
                listTrend.map(({ id, name, cmc_rank }) => (
                    <>
                        <div className={style[`trending`]} key={id}>
                            <div className={style[`trending__coin`]}>
                                <img
                                    src={` https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`}
                                    alt=""
                                    className={style[`symbol-image`]}
                                />
                                <h1 className={style[`symbol-name`]}>{name}</h1>
                            </div>
                            <div className={style[`trending__rank`]}>
                                <p className={style[`trending__rank--pos`]}> # {cmc_rank}</p>
                            </div>
                        </div>
                    </>
                ))}
        </>
    );
};

export default Trending;
