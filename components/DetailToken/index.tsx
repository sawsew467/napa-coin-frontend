/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

import avtCoin from '../../assets/img/avt.png';
import style from './style.module.scss';
import { DataType, currencyFormat } from '../TableToken/TableToken';
import { Spin, Tag } from 'antd';

interface Token {
    detailCoin: DataType[];
    isLoading: boolean;
}

const DetailToken: React.FC<Token> = (props) => {
    const { detailCoin, isLoading } = props;

    return (
        <>
            <div className={style[`detail__token`]}>
                {!isLoading ? (
                    <div className={style[`detail__token--flex`]}>
                        {detailCoin.map((token) => (
                            <React.Fragment key={token.id}>
                                <div className={style[`token-col-left`]}>
                                    <div className={style[`token-col--img`]}>
                                        <img
                                            src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${token.id}.png`}
                                            alt="Symbol image"
                                            className={style[`image-symbol`]}
                                        />
                                        <h1 style={{ fontWeight: '500' }}>{token.name}</h1>
                                        <span className={style[`name-symbol`]}>{token.symbol}</span>
                                    </div>
                                    <span className={style[`rank`]}>Rank {token.cmc_rank}</span>
                                    <div className={style[`tags-detail`]}>
                                        <p className={style[`tag-heading`]}>Tags:</p>
                                        {token.tags.slice(0, 10).map((tag, index) => (
                                            <Tag className={style[`tag`]} key={index}>
                                                {tag}
                                            </Tag>
                                        ))}
                                    </div>
                                </div>
                                <div className={style[`token-col-right`]}>
                                    <div className={style[`token-col--info`]}>
                                        <h4>{token.name}</h4>
                                        <div className={style[`info-flex`]}>
                                            <h1>{currencyFormat(Math.abs(token.quote.USD.price))}</h1>
                                            {token.quote.USD.percent_change_7d >= 0 ? (
                                                <span className={style[`caret-icon-up`]}>
                                                    <FontAwesomeIcon icon={faCaretUp} />{' '}
                                                    {token.quote.USD.percent_change_7d.toFixed(2)} %
                                                </span>
                                            ) : (
                                                <span className={style[`caret-icon`]}>
                                                    <FontAwesomeIcon icon={faCaretDown} />{' '}
                                                    {token.quote.USD.percent_change_7d.toFixed(2)} %
                                                </span>
                                            )}
                                        </div>
                                        <div className={style[`info-flex`]}>
                                            <h5>
                                                {token.quote.USD.percent_change_24h.toFixed(2)} {token.symbol}
                                            </h5>{' '}
                                            {token.quote.USD.percent_change_24h >= 0 ? (
                                                <span className={style[`caret`]}>
                                                    <FontAwesomeIcon icon={faCaretUp} />
                                                    {Math.abs(token.quote.USD.percent_change_24h.toFixed(2))} %
                                                </span>
                                            ) : (
                                                <span className={style[`caret-down`]}>
                                                    <FontAwesomeIcon icon={faCaretDown} />
                                                    {Math.abs(token.quote.USD.percent_change_24h.toFixed(2))} %
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className={style[`stats-container`]}>
                                        <div className={style[`stats-block`]}>
                                            <p>MarketCap</p>
                                            <h3>{currencyFormat(token.quote.USD.market_cap)}</h3>
                                            {token.quote.USD.percent_change_90d >= 0 ? (
                                                <span className={style[`caret`]}>
                                                    <FontAwesomeIcon icon={faCaretUp} />{' '}
                                                    {token.quote.USD.percent_change_90d.toFixed(2)} %
                                                </span>
                                            ) : (
                                                <span className={style[`caret-down`]}>
                                                    <FontAwesomeIcon icon={faCaretDown} />{' '}
                                                    {token.quote.USD.percent_change_90d.toFixed(2)} %
                                                </span>
                                            )}

                                            <div className={style[`stats-block-inner`]}>
                                                <p>24h Volume / Market Cap</p>
                                                <span>
                                                    {(token.quote.USD.volume_24h / token.quote.USD.market_cap).toFixed(
                                                        2,
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                        <div className={style[`stats-block`]}>
                                            <p>Fully Diluted Market Cap</p>
                                            <h3>{currencyFormat(token.quote.USD.fully_diluted_market_cap)}</h3>
                                            {token.quote.USD.percent_change_7d >= 0 ? (
                                                <span className={style[`caret`]}>
                                                    <FontAwesomeIcon icon={faCaretUp} />{' '}
                                                    {token.quote.USD.percent_change_7d.toFixed(2)} %
                                                </span>
                                            ) : (
                                                <span className={style[`caret-down`]}>
                                                    <FontAwesomeIcon icon={faCaretDown} />{' '}
                                                    {token.quote.USD.percent_change_7d.toFixed(2)} %
                                                </span>
                                            )}
                                        </div>
                                        <div className={style[`stats-block`]}>
                                            <p>Volume (24h)</p>
                                            <h3>{currencyFormat(token.quote.USD.volume_24h)}</h3>
                                            {token.quote.USD.volume_change_24h >= 0 ? (
                                                <span className={style[`caret`]}>
                                                    <FontAwesomeIcon icon={faCaretUp} />{' '}
                                                    {token.quote.USD.volume_change_24h.toFixed(2)} %
                                                </span>
                                            ) : (
                                                <span className={style[`caret-down`]}>
                                                    <FontAwesomeIcon icon={faCaretDown} />{' '}
                                                    {token.quote.USD.volume_change_24h.toFixed(2)} %
                                                </span>
                                            )}
                                        </div>
                                        <div className={style[`stats-block`]}>
                                            <p>Circulating Supply</p>
                                            <h3>{currencyFormat(token.circulating_supply)}</h3>
                                            {token.quote.USD.percent_change_60d >= 0 ? (
                                                <span className={style[`caret`]}>
                                                    <FontAwesomeIcon icon={faCaretUp} />{' '}
                                                    {token.quote.USD.percent_change_60d.toFixed(2)} %
                                                </span>
                                            ) : (
                                                <span className={style[`caret-down`]}>
                                                    <FontAwesomeIcon icon={faCaretDown} />{' '}
                                                    {token.quote.USD.percent_change_60d.toFixed(2)} %
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', marginTop: '10px' }}>
                        <Spin />
                    </div>
                )}
            </div>
        </>
    );
};

export default DetailToken;
