/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp, faStar } from '@fortawesome/free-solid-svg-icons';
import type { ColumnsType } from 'antd/es/table';
import { Skeleton, Spin, Table } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { DotChartOutlined } from '@ant-design/icons';

import avtCoin from '../../assets/img/avt.png';
import chartImg from '../../assets/img/Vector.png';
import style from './table.module.scss';
import TagToken from './TagToken';

export interface DataType {
    cmc_rank: number;
    id: number;
    name: string;
    quote: any;
    symbol: string;
    price: number;
    percent_change_1h: number;
    percent_change_24h: number;
    percent_change_7d: number;
    market_cap: number;
    volume: number;
    subVolume: number;
    circulating_supply: number;
    slug: string;
}

export const currencyFormat = (num: number) => {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

const columns: ColumnsType<DataType> = [
    {
        title: '',
        render: () => (
            <span className="table-icon">
                <FontAwesomeIcon icon={faStar} />
            </span>
        ),
        width: '1%',
    },
    {
        title: '#',
        dataIndex: 'cmc_rank',
        width: '1%',
    },
    {
        title: 'Name',
        render: (name, record) => (
            <Link href={`token-detail/${record.slug}`}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                    <img
                        src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${record.id}.png`}
                        alt="logo"
                        height="22"
                        width="22"
                        style={{ borderRadius: '80px' }}
                    />
                    <span style={{ color: '#000', cursor: 'pointer' }}> {record.name}</span>
                </div>
            </Link>
        ),
        dataIndex: ['name'],
        width: '10%',
    },
    {
        title: 'Price',
        dataIndex: 'quote',
        render: (quote) => <span>{currencyFormat(quote.USD.price)}</span>,
        sorter: {
            compare: (a, b) => a.quote.USD.price - b.quote.USD.price,
        },
        width: '15%',
    },
    {
        title: '1h',
        dataIndex: 'quote',
        render: (quote) => (
            <span>
                {' '}
                {quote.USD.percent_change_1h > 0 ? (
                    <FontAwesomeIcon icon={faCaretUp} style={{ color: '#07EE3A' }} />
                ) : (
                    <FontAwesomeIcon icon={faCaretDown} style={{ color: '#CF1919' }} />
                )}
                {quote.USD.percent_change_1h.toFixed(2)} %
            </span>
        ),
        sorter: {
            compare: (a, b) => a.quote.USD.percent_change_1h - b.quote.USD.percent_change_1h,
        },
        width: '15%',
    },
    {
        title: '24h',
        dataIndex: 'quote',
        render: (quote) => (
            <span>
                {quote.USD.percent_change_24h > 0 ? (
                    <FontAwesomeIcon icon={faCaretUp} style={{ color: '#07EE3A' }} />
                ) : (
                    <FontAwesomeIcon icon={faCaretDown} style={{ color: '#CF1919' }} />
                )}
                {quote.USD.percent_change_24h.toFixed(2)} %
            </span>
        ),
        sorter: {
            compare: (a, b) => a.quote.USD.percent_change_24h - b.quote.USD.percent_change_24h,
        },
        width: '15%',
    },
    {
        title: '7d',
        dataIndex: 'quote',
        render: (quote) => (
            <span>
                {quote.USD.percent_change_7d > 0 ? (
                    <FontAwesomeIcon icon={faCaretUp} style={{ color: '#07EE3A' }} />
                ) : (
                    <FontAwesomeIcon icon={faCaretDown} style={{ color: '#CF1919' }} />
                )}
                {quote.USD.percent_change_7d.toFixed(2)} %
            </span>
        ),
        sorter: {
            compare: (a, b) => a.quote.USD.percent_change_7d - b.quote.USD.percent_change_7d,
        },
        width: '15%',
    },
    {
        title: 'MarketCap',
        dataIndex: 'quote',
        render: (quote) => <span>{currencyFormat(quote.USD.market_cap)}</span>,
        sorter: {
            compare: (a, b) => a.quote.USD.market_cap - b.quote.USD.market_cap,
        },
    },
    {
        title: 'Volume (24h)',
        dataIndex: 'quote',
        render: (quote) => <span>{currencyFormat(quote.USD.volume_24h)}</span>,
        sorter: {
            compare: (a, b) => a.quote.USD.volume_24h - b.quote.USD.volume_24h,
        },
    },
    {
        title: 'Circulating Supply',
        dataIndex: 'circulating_supply',
        render: (circulating) => <span>{currencyFormat(circulating)} </span>,
        sorter: {
            compare: (a, b) => a.circulating_supply - b.circulating_supply,
        },
    },
    {
        title: 'Last 7 days',
        dataIndex: 'id',
        render: (id) => (
            <img
                src={`https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/${id}.svg`}
                alt="chart image"
                width={100}
            />
        ),

        width: '1%',
    },
];

const TableToken: React.FC = () => {
    const [result, setResult] = useState<DataType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [active, setActive] = useState(true);

    useEffect(() => {
        const listData = async () => {
            const res = await axios.get(`http://localhost:5000/api/v1/coin/latest`);
            setResult(res.data.data);
            setIsLoading(false);
            setActive(false);
        };

        listData();
    }, []);

    return (
        <div id={style.table}>
            <div className={style[`table__tag-row`]}>
                <Link href="/watchlist">
                    <button className={style[`btn--watchlist`]}>
                        <FontAwesomeIcon icon={faStar} className={style[`watchlist-icon`]} /> Watchlist
                    </button>
                </Link>
                <div className={style[`tags`]}>
                    <TagToken></TagToken>
                </div>
            </div>
            {isLoading ? (
                <div className={style[`table-loading`]}>
                    <Spin />
                </div>
            ) : (
                <Table
                    columns={columns}
                    dataSource={result}
                    rowKey="id"
                    pagination={{
                        defaultPageSize: 10,
                        showSizeChanger: true,
                        pageSizeOptions: ['10', '20', '30'],
                    }}
                />
            )}
        </div>
    );
};

export default TableToken;
