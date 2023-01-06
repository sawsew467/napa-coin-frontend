/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp, faStar } from '@fortawesome/free-solid-svg-icons';
import type { ColumnsType } from 'antd/es/table';
import { Skeleton, Spin, Table } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import CheckableTag from 'antd/lib/tag/CheckableTag';

import style from './table.module.scss';

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
    percent_change_60d: number;
    percent_change_90d: number;
    fully_diluted_market_cap: number;
    market_cap: number;
    volume: number;
    subVolume: number;
    circulating_supply: number;
    slug: string;
    tags: string[];
}

export interface CateType {
    id: string;
    name: string;
    title: string;
}

interface Props {
    searchResult: DataType[];
    isSearchResult: boolean;
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
                    <span style={{ color: '#8c96a7', cursor: 'pointer' }}> {record.symbol}</span>
                </div>
            </Link>
        ),
        dataIndex: 'name',
        width: '20%',
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
            <span style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                {' '}
                {quote.USD.percent_change_1h > 0 ? (
                    <FontAwesomeIcon icon={faCaretUp} style={{ color: '#07EE3A' }} />
                ) : (
                    <FontAwesomeIcon icon={faCaretDown} style={{ color: '#CF1919' }} />
                )}
                {Math.abs(quote.USD.percent_change_1h.toFixed(2))} %
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
            <span style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                {quote.USD.percent_change_24h > 0 ? (
                    <FontAwesomeIcon icon={faCaretUp} style={{ color: '#07EE3A' }} />
                ) : (
                    <FontAwesomeIcon icon={faCaretDown} style={{ color: '#CF1919' }} />
                )}
                {Math.abs(quote.USD.percent_change_24h.toFixed(2))} %
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
            <span style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                {quote.USD.percent_change_7d > 0 ? (
                    <FontAwesomeIcon icon={faCaretUp} style={{ color: '#07EE3A' }} />
                ) : (
                    <FontAwesomeIcon icon={faCaretDown} style={{ color: '#CF1919' }} />
                )}
                {Math.abs(quote.USD.percent_change_7d.toFixed(2))} %
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

const TableToken: React.FC<Props> = (props) => {
    const { searchResult, isSearchResult } = props;
    const [result, setResult] = useState<DataType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [cate, setCate] = useState<CateType[]>([]);
    const [active, setActive] = useState(true);
    const [filterTags, setFilterTag] = useState<DataType[]>([]);
    const [isCheck, setIsCheck] = useState<boolean>(false);

    useEffect(() => {
        const listData = async () => {
            const res = await axios.get(`http://172.16.6.215:5000/api/v1/coin/latest`);
            const cate = await axios.get(`http://172.16.6.215:5000/api/v1/coin/categories`);

            setResult(res.data.data);
            setCate(cate.data.data);
            setIsLoading(false);
            setActive(false);
        };

        listData();
    }, []);

    const tagsData = cate.slice(5, 10).map((tag) => tag.name);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const filterByTags = isSearchResult
        ? searchResult.filter((token) => token.tags.includes('placeholder-ventures-portfolio'))
        : result.filter((token) => token.tags.includes('placeholder-ventures-portfolio'));

    const handleChange = (tag: string, checked: boolean) => {
        const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter((t: string) => t !== tag);
        setSelectedTags(nextSelectedTags);
        setIsCheck(true);
        if (nextSelectedTags.length === 0) {
            setIsCheck(false);
        }
    };

    return (
        <div id={style.table}>
            <div className={style[`table__tag-row`]}>
                <Link href="/watchlist">
                    <button className={style[`btn--watchlist`]}>
                        <FontAwesomeIcon icon={faStar} className={style[`watchlist-icon`]} /> Watchlist
                    </button>
                </Link>
                <div className={style[`tags`]}>
                    {tagsData.map((tag) => (
                        <CheckableTag
                            key={tag}
                            checked={selectedTags.indexOf(tag) > -1}
                            onChange={(checked) => handleChange(tag, checked)}
                        >
                            {tag}
                        </CheckableTag>
                    ))}
                </div>
            </div>
            {isLoading ? (
                <div className={style[`table-loading`]}>
                    <Spin />
                </div>
            ) : (
                <Table
                    columns={columns}
                    dataSource={isCheck ? filterByTags : isSearchResult ? searchResult : result}
                    rowKey="id"
                    pagination={
                        result.length > 10 || searchResult.length > 10
                            ? {
                                  defaultPageSize: 10,
                                  showSizeChanger: true,
                                  pageSizeOptions: ['10', '20', '30'],
                              }
                            : false
                    }
                />
            )}
        </div>
    );
};

export default TableToken;
