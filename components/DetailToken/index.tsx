import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

import avtCoin from '../../assets/img/avt.png';
import style from './style.module.scss';
import { currencyFormat } from '../TableToken/TableToken';

interface Token {
    detailCoin: any[];
}

const DetailToken: React.FC<Token> = (props) => {
    const { detailCoin } = props;

    return (
        <div className={style[`detail__token`]}>
            {detailCoin.map((token) => (
                <div className={style[`detail__token--flex`]} key={token.id}>
                    <div className={style[`token-col-left`]}>
                        <div className={style[`token-col--img`]}>
                            <img
                                src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${token.id}.png`}
                                alt="Symbol image"
                                className={style[`image-symbol`]}
                            />
                            <h1>{token.name}</h1>
                            <span className={style[`name-symbol`]}>{token.symbol}</span>
                        </div>
                        <span className={style[`rank`]}>Rank {token.cmc_rank}</span>
                    </div>
                    <div className={style[`token-col-right`]}>
                        <div className={style[`token-col--info`]}>
                            <h4>{token.name}</h4>
                            <div className={style[`info-flex`]}>
                                <h1>{currencyFormat(token.quote.USD.price)}</h1>
                                {token.quote.USD.percent_change_7d >= 0 ? (
                                    <span className={style[`caret-icon-up`]}>
                                        <FontAwesomeIcon icon={faCaretUp} />{' '}
                                        {token.quote.USD.percent_change_7d.toFixed(2)}
                                    </span>
                                ) : (
                                    <span className={style[`caret-icon`]}>
                                        <FontAwesomeIcon icon={faCaretDown} />{' '}
                                        {token.quote.USD.percent_change_7d.toFixed(2)}
                                    </span>
                                )}
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
            ))}
        </div>
    );
};

export default DetailToken;
