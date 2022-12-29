import React from 'react';
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

interface DataType {
    key: React.Key;
    name: string;
    price: number;
    oneHour: number;
    oneDay: number;
    sevenDays: number;
    marketCap: number;
    volume: number;
    subVolume: number;
    circulating: number;
}

const columns: ColumnsType<DataType> = [
    {
        title: '',
        render: () => (
            <span className="table-icon">
                <FontAwesomeIcon icon={faStar} />
            </span>
        ),
    },
    {
        title: '#',
        dataIndex: 'key',
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
    },
    {
        title: 'Price',
        dataIndex: 'price',
        render: (price) => <span>$ {price}</span>,
        sorter: {
            compare: (a, b) => a.price - b.price,
        },
    },
    {
        title: '1h',
        dataIndex: 'oneHour',
        render: (hour) => (
            <span>
                {' '}
                <FontAwesomeIcon icon={faCaretDown} style={{ color: '#CF1919' }} /> {hour} %
            </span>
        ),
        sorter: {
            compare: (a, b) => a.oneHour - b.oneHour,
        },
    },
    {
        title: '24h',
        dataIndex: 'oneDay',
        render: (day) => (
            <span>
                <FontAwesomeIcon icon={faCaretUp} style={{ color: '#07EE3A' }} /> {day} %
            </span>
        ),
        sorter: {
            compare: (a, b) => a.oneDay - b.oneDay,
        },
    },
    {
        title: '7d',
        dataIndex: 'sevenDays',
        render: (seven) => (
            <span>
                <FontAwesomeIcon icon={faCaretDown} style={{ color: '#CF1919' }} /> {seven} %
            </span>
        ),
        sorter: {
            compare: (a, b) => a.oneDay - b.oneDay,
        },
    },
    {
        title: 'MarketCap',
        dataIndex: 'marketCap',
        render: (market) => <span>$ {market}</span>,
        sorter: {
            compare: (a, b) => a.marketCap - b.marketCap,
        },
    },
    {
        title: 'Volume (24h)',
        dataIndex: 'volume',
        render: (volume) => <span>$ {volume}</span>,
        sorter: {
            compare: (a, b) => a.volume - b.volume,
        },
    },
    {
        title: 'Circulating Supply',
        dataIndex: 'circulating',
        render: (circulating) => <span>$ {circulating} BTT</span>,
        sorter: {
            compare: (a, b) => a.circulating - b.circulating,
        },
    },
    {
        title: 'Last 7 days',
        render: () => <Image src={chartImg} alt="chart image" />,
    },
];

const data: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
        price: 6279,
        oneHour: 0.02,
        oneDay: 0.02,
        sevenDays: 6.78,
        marketCap: 595.222,
        volume: 4.692,
        subVolume: 12454,
        circulating: 947.0,
    },
    {
        key: '2',
        name: 'Jim Green',
        price: 6279,
        oneHour: 0.02,
        oneDay: 0.02,
        sevenDays: 6.78,
        marketCap: 595.222,
        volume: 4.692,
        subVolume: 12454,
        circulating: 947.0,
    },
    {
        key: '3',
        name: 'Joe Black',
        price: 6279,
        oneHour: 0.02,
        oneDay: 0.02,
        sevenDays: 6.78,
        marketCap: 595.222,
        volume: 4.692,
        subVolume: 12454,
        circulating: 947.0,
    },
    {
        key: '4',
        name: 'Jim Red',
        price: 6279,
        oneHour: 0.03,
        oneDay: 0.02,
        sevenDays: 6.78,
        marketCap: 595.222,
        volume: 4.692,
        subVolume: 12454,
        circulating: 947.0,
    },
];

const TableToken: React.FC = () => {
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
            <Table columns={columns} dataSource={data} />
        </div>
    );
};

export default TableToken;
