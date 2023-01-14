/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Input from 'antd/lib/input/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLeft } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import ConvertLight from '../../assets/icons/convert.svg';
import USD from '../../assets/img/USD.svg';
import style from './style.module.scss';
import { DataType, currencyFormat } from '../TableToken/TableToken';
import { useRouter } from 'next/router';

interface Props {
    detailCoin: DataType[];
}

const Convert: React.FC<Props> = (props) => {
    const { detailCoin } = props;
    const router = useRouter();
    const [valueInput, setValueInput] = useState<number>(1);
    const [exchange, setExchange] = useState<number>(1);
    const oldSlug = router.query.slug;
    const timingTimeoutRef = useRef<any>(null);

    const mapPriceToken = detailCoin.map((token) => token.quote.USD.price);

    useEffect(() => {
        if (oldSlug !== detailCoin.map((token) => token.slug)) {
            setValueInput(1);
            setExchange(1);
        }
    }, [detailCoin, oldSlug]);

    useEffect(() => {
        if (timingTimeoutRef.current) {
            clearTimeout(timingTimeoutRef.current);
        }

        timingTimeoutRef.current = setTimeout(() => {
            setExchange(valueInput * +mapPriceToken);
        }, 500);
    }, [mapPriceToken, valueInput]);

    return (
        <div className={style[`convert`]}>
            {detailCoin.map((token) => (
                <React.Fragment key={token.id}>
                    <div className={style[`convert__token`]}>
                        <div className={style[`convert_token--symbol`]}>
                            <img
                                src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${token.id}.png`}
                                alt="token image"
                                className={style[`symbol-image`]}
                            />
                            <div className={style[`convert__token--symbol`]}>
                                <span>{token.symbol}</span>
                                <p>{token.name}</p>
                            </div>
                        </div>

                        <div className={style[`value-token`]}>
                            <Input
                                value={valueInput}
                                onChange={(e) => {
                                    setValueInput(+e.target.value);
                                }}
                                style={{ border: 'none' }}
                                // type={'number'}
                                // min={1}
                            />
                        </div>
                    </div>
                    <Image src={ConvertLight} alt=""></Image>
                    {/* <div className={style[`transfer`]}>
                        <p>
                        <Image src={ConvertLight} alt=""></Image>
                        </p>
                    </div> */}
                    <div className={style[`convert__token`]}>
                        <div className={style[`convert_token--symbol`]}>
                            <Image src={USD} alt="token image" className={style[`symbol-image`]} />
                            <div className={style[`convert__token--symbol`]}>
                                <span>USD</span>
                                <p>United States Dollar</p>
                            </div>
                        </div>
                        <div className={style[`value-usd`]}>{currencyFormat(exchange)}</div>
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
};

export default Convert;
