import React from 'react';
import Image from 'next/image';

import avtCoin from '../../assets/img/avt.png';
import style from './style.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLeft } from '@fortawesome/free-solid-svg-icons';
import Input from 'antd/es/input/Input';

const Convert = () => {
    return (
        <div className={style[`convert`]}>
            <div className={style[`convert__token`]}>
                <div className={style[`convert_token--symbol`]}>
                    <Image src={avtCoin} alt="token image" className={style[`symbol-image`]} />
                    <div className={style[`convert__token--symbol`]}>
                        <span>BTT</span>
                        <p>BitTorrent</p>
                    </div>
                </div>
                <div className={style[`value-token`]}>
                    <Input defaultValue="0571" />
                </div>
            </div>
            <div className={style[`transfer`]}>
                <p>
                    <FontAwesomeIcon icon={faRightLeft} />
                </p>
            </div>
            <div className={style[`convert__token`]}>
                <div className={style[`convert_token--symbol`]}>
                    <Image src={avtCoin} alt="token image" className={style[`symbol-image`]} />
                    <div className={style[`convert__token--symbol`]}>
                        <span>BTT</span>
                        <p>BitTorrent</p>
                    </div>
                </div>
                <div className={style[`value-token`]}>2254</div>
            </div>
        </div>
    );
};

export default Convert;
