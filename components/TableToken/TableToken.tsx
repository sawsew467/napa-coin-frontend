/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp, faStar } from '@fortawesome/free-solid-svg-icons';
import type { ColumnsType } from 'antd/es/table';
import { Spin, Table, Tooltip } from 'antd';
import Link from 'next/link';
import CheckableTag from 'antd/lib/tag/CheckableTag';
import { useRouter } from 'next/router';

import style from './table.module.scss';
import { useSelector } from 'react-redux';
import { AppInterface } from '../../pages/_app';
import { State } from '../../redux';
import { addToWatchList, getWatchlistToken, removeFromWatchList } from '../../apis/watchlistApis';
import { getTokenCate, getTokenLastest } from '../../apis/tokenApis';

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

const TableToken: React.FC<Props> = (props) => {
    const { searchResult, isSearchResult } = props;
    const currentUser: AppInterface['currentUser'] = useSelector((state: State) => state.currentUser);

    const router = useRouter();
    const [result, setResult] = useState<DataType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [cate, setCate] = useState<CateType[]>([]);
    const [active, setActive] = useState(true);
    const [isCheck, setIsCheck] = useState<boolean>(false);
    const [isFollow, setIsFollow] = useState<boolean>(false);
    const [watchlist, setWatchlist] = useState<DataType[]>([]);

    const slug = router.pathname;

    useEffect(() => {
        const listData = async () => {
            const res = await getTokenLastest();
            const cate = await getTokenCate();
            setResult(res.data.data);
            setCate(cate.data.data);
            setIsLoading(false);
            setActive(false);
        };

        listData();
    }, []);

    useEffect(() => {
        const watchlistData = async () => {
            if (slug === '/watchlist') {
                const watchlistToken = await getWatchlistToken(currentUser._id);
                setWatchlist(watchlistToken.data.results.data);
                setIsFollow(true);
            }
        };
        watchlistData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser._id, isFollow]);

    const handleAddToWatchlist = async (id: number) => {
        try {
            await addToWatchList(currentUser._id, id);
            setIsFollow(true);
        } catch (err) {
            console.log(err);
        }
    };

    const handleRemoveWatchlist = async (id: number) => {
        try {
            await removeFromWatchList(currentUser._id, id);
            setIsFollow(false);
        } catch (err) {
            console.log(err);
        }
    };

    const tagsData = cate?.slice(5, 10).map((tag) => tag.name);
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

    const columns: ColumnsType<DataType> = [
        {
            title: '',
            render: (id) => (
                <span>
                    {isFollow ? (
                        <Tooltip title="Add this token to watchlist">
                            {' '}
                            <FontAwesomeIcon
                                className={'table-icon-follow'}
                                icon={faStar}
                                onClick={() => handleRemoveWatchlist(id)}
                            />
                        </Tooltip>
                    ) : (
                        <Tooltip title="Add this token to watchlist">
                            {' '}
                            <FontAwesomeIcon
                                className={'table-icon'}
                                icon={faStar}
                                onClick={() => handleAddToWatchlist(id)}
                            />
                        </Tooltip>
                    )}
                </span>
            ),
            dataIndex: 'id',
        },
        {
            title: '#',
            dataIndex: 'cmc_rank',
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
        },
    ];

    return (
        <div id={style.table}>
            <div className={style[`table__tag-row`]}>
                <Link href="/watchlist">
                    <button className={style[`btn--watchlist`]}>
                        <FontAwesomeIcon icon={faStar} className={style[`watchlist-icon`]} /> Watchlist
                    </button>
                </Link>
                <div className={style[`tags`]}>
                    {slug === '/watchlist'
                        ? null
                        : tagsData?.map((tag) => (
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
                    dataSource={
                        slug === '/watchlist'
                            ? watchlist
                            : isCheck
                            ? filterByTags
                            : isSearchResult
                            ? searchResult
                            : result
                    }
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
