import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp, faStar } from '@fortawesome/free-solid-svg-icons';
import type { ColumnsType } from 'antd/es/table';
import { Table } from 'antd';
import Image from 'next/image';

import avtCoin from '../../assets/img/avt.png';
import chartImg from '../../assets/img/Vector.png';
import style from './table.module.scss';
import TagToken from './TagToken';
import Link from 'next/link';
import axios from 'axios';

interface DataType {
    index: number;
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
}

const currencyFormat = (num: number) => {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

const columns: ColumnsType<DataType> = [
    {
        title: '',
        render: () => (
            <span className="table-icon">
                <FontAwesomeIcon icon={faStar} />
            </span>
        ),
        width: '5%',
    },
    {
        title: '#',
        dataIndex: 'id',
        width: '5%',
    },
    {
        title: 'Name',
        render: (name) => (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Image src={avtCoin} alt="logo" height="22" width="22" style={{ borderRadius: '80px' }} />
                {name}
            </div>
        ),
        dataIndex: 'name',
        width: '20%',
    },
    {
        title: 'Price',
        dataIndex: 'quote',
        render: (quote) => <span>$ {currencyFormat(quote.USD.price)}</span>,
        sorter: {
            compare: (a, b) => a.quote.USD.price - b.quote.USD.price,
        },
        width: '20%',
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
        width: '10%',
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
        width: '10%',
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
        width: '10%',
    },
    {
        title: 'MarketCap',
        dataIndex: 'quote',
        render: (quote) => <span>$ {currencyFormat(quote.USD.market_cap)}</span>,
        sorter: {
            compare: (a, b) => a.quote.USD.market_cap - b.quote.USD.market_cap,
        },
        width: '10%',
    },
    {
        title: 'Volume (24h)',
        dataIndex: 'quote',
        render: (quote) => <span>$ {currencyFormat(quote.USD.volume_24h)}</span>,
        sorter: {
            compare: (a, b) => a.quote.USD.volume_24h - b.quote.USD.volume_24h,
        },
        width: '10%',
    },
    {
        title: 'Circulating Supply',
        dataIndex: 'circulating_supply',
        render: (circulating) => <span>$ {currencyFormat(circulating)} </span>,
        sorter: {
            compare: (a, b) => a.circulating_supply - b.circulating_supply,
        },
        width: '10%',
    },
    {
        title: 'Last 7 days',
        render: () => <Image src={chartImg} alt="chart image" />,
    },
];

const TableToken: React.FC = () => {
    const [result, setResult] = useState<DataType[]>([]);

    useEffect(() => {
        const listData = async () => {
            const res = await axios.get(`http://localhost:5000/api/v1/coin/latest`);
            setResult(res.data.data);
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
            <Table
                columns={columns}
                dataSource={result}
                pagination={{
                    defaultPageSize: 10,
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '20', '30'],
                }}
            />
        </div>
    );
};

export default TableToken;
