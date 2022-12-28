import React from 'react';
import Image from 'next/image';

import avtCoin from '../../assets/img/avt.png';
import style from './style.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

const DetailToken = () => {
    return (
        <div className={style[`detail__token`]}>
            <div className={style[`detail__token--flex`]}>
                <div className={style[`token-col-left`]}>
                    <div className={style[`token-col--img`]}>
                        <Image src={avtCoin} alt="Symbol image" className={style[`image-symbol`]} />
                        <h1>BitTorrent-New BTT</h1>
                        <span className={style[`name-symbol`]}>BTT</span>
                    </div>
                    <span className={style[`rank`]}>Rank 1</span>
                </div>
                <div className={style[`token-col-right`]}>
                    <div className={style[`token-col--info`]}>
                        <h4>BitTorrent-New BTT</h4>
                        <div className={style[`info-flex`]}>
                            <h1>$16,728.47</h1>
                            <span className={style[`caret-icon`]}>
                                <FontAwesomeIcon icon={faCaretDown} /> 0.06%
                            </span>
                        </div>
                        <div className={style[`info-flex`]}>
                            <h5>0.07089 BTC</h5>{' '}
                            <span className={style[`caret`]}>
                                <FontAwesomeIcon icon={faCaretUp} /> 0.06%
                            </span>
                        </div>
                    </div>
                    <div className={style[`stats-container`]}>
                        <div className={style[`stats-block`]}>
                            <p>MarketCap</p>
                            <h3>$321,638,707,718</h3>
                            <span className={style[`caret`]}>
                                <FontAwesomeIcon icon={faCaretUp} /> 0.06%
                            </span>

                            <div className={style[`stats-block-inner`]}>
                                <p>24h Volume / Market Cap</p>
                                <span>0.0281</span>
                            </div>
                        </div>
                        <div className={style[`stats-block`]}>
                            <p>Fully Diluted Market Cap</p>
                            <h3>$321,638,707,718</h3>
                            <span className={style[`caret`]}>
                                <FontAwesomeIcon icon={faCaretUp} /> 0.06%
                            </span>
                        </div>
                        <div className={style[`stats-block`]}>
                            <p>Volume (24h)</p>
                            <h3>$321,638,707,718</h3>
                            <span className={style[`caret`]}>
                                <FontAwesomeIcon icon={faCaretUp} /> 0.06%
                            </span>
                        </div>
                        <div className={style[`stats-block`]}>
                            <p>Circulating Supply</p>
                            <h3>$321,638,707,718</h3>
                            <span className={style[`caret`]}>
                                <FontAwesomeIcon icon={faCaretUp} /> 0.06%
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailToken;
