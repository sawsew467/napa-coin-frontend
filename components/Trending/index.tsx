import React from 'react';
import Image from 'next/image';

import style from './style.module.scss';
import coiImg from '../../assets/img/avt.png';

const Trending = () => {
    return (
        <div className={style[`trending`]}>
            <div className={style[`trending__coin`]}>
                <Image src={coiImg} alt="" className={style[`symbol-image`]} />
                <h1 className={style[`symbol-name`]}>BitTorrent</h1>
            </div>
            <div className={style[`trending__rank`]}>
                <p className={style[`trending__rank--pos`]}># 1</p>
            </div>
        </div>
    );
};

export default Trending;
