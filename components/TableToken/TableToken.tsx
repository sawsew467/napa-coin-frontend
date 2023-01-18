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
import { AppInterface, socket } from '../../pages/_app';
import { State } from '../../redux';
import { addToWatchList, getWatchlistToken, removeFromWatchList } from '../../apis/watchlistApis';
import { getTokenCate, getTokenLastest } from '../../apis/tokenApis';
import clsx from 'clsx';
import LoginModal from '../LoginModal';
import { setCurrentUser } from '../../redux/action-creators';

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

export interface WatchlistType {
    id: number;
    isStar: boolean;
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
    const [starList, setStarList] = useState<WatchlistType[]>([]);

    const slug = router.pathname;

    socket.on('watchlist', (socket: any) => {
        console.log('heheh');
        // listData();
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (currentUser._id === '') {
            const listData = async () => {
                const res = await getTokenLastest();
                const cate = await getTokenCate();
                setResult(res.data.data);
                setCate(cate.data.data);
                setIsLoading(false);
                setActive(false);
            };
            listData();
        } else {
            const listData = async () => {
                console.log('sas', currentUser._id);

                const res = await getTokenLastest();
                const cate = await getTokenCate();
                if (currentUser._id !== undefined) {
                    const watchlistToken = await getWatchlistToken(currentUser._id);
                    setWatchlist(watchlistToken.data.results.data);
                    setStarList(
                        res.data.data.map((item: any) => {
                            const x = watchlistToken.data.results.data.filter((token: any) => item.id === token.id);
                            if (x.length > 0) {
                                return {
                                    id: item.id,
                                    isStar: true,
                                };
                            } else {
                                return {
                                    id: item.id,
                                    isStar: false,
                                };
                            }
                        }),
                    );
                }

                setResult(res.data.data);
                setCate(cate.data.data);
                setIsLoading(false);
                setActive(false);
            };
            listData();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser._id]);

    const handleAddToWatchlist = async (id: number) => {
        try {
            if (currentUser._id) {
                await addToWatchList(currentUser._id, id);
                setStarList(
                    starList.map((item, index) => {
                        if (item.id === id) {
                            return {
                                ...item,
                                isStar: !item.isStar,
                            };
                        } else {
                            return {
                                ...item,
                            };
                        }
                    }),
                );
            } else {
                <LoginModal
                    setIsShowRegisterModal={function (value: React.SetStateAction<boolean>): void {
                        throw new Error('Function not implemented.');
                    }}
                ></LoginModal>;
            }

            socket.emit('watchlist', {
                message: 'my watchlist',
            });
        } catch (err) {
            console.log(err);
        }
    };

    const handleRemoveWatchlist = async (id: number) => {
        try {
            if (currentUser._id) {
                await removeFromWatchList(currentUser._id, id);
                setStarList(
                    starList.map((item, index) => {
                        if (item.id === id) {
                            return {
                                ...item,
                                isStar: !item.isStar,
                            };
                        } else {
                            return {
                                ...item,
                            };
                        }
                    }),
                );
            } else {
                <LoginModal
                    setIsShowRegisterModal={function (value: React.SetStateAction<boolean>): void {
                        throw new Error('Function not implemented.');
                    }}
                ></LoginModal>;
            }
            socket.emit('watchlist', {
                message: 'my watchlist',
            });
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
                    {starList.length > 0 && starList.filter((item) => item.id === id)[0].isStar ? (
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
                        <span style={{ color: '#000', cursor: 'pointer' }} className="token-name">
                            {' '}
                            {record.name}
                        </span>
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
            dataIndex: 'id, quote',
            render: (id, record) => (
                <img
                    src={`https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/${record.id}.svg`}
                    alt="chart image"
                    width={100}
                    className={record.quote.USD.percent_change_24h >= 0 ? 'chart-up' : 'chart-down'}
                />
            ),
        },
    ];
    console.log('!!!', watchlist);

    return (
        <div id={style.table} className="box">
            <div className={style[`table__tag-row`]}>
                <Link href="/watchlist">
                    <button className={clsx(style[`btn--watchlist`], 'button--slate')}>
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
                                  className="tag"
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
                        watchlist.length > 10
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
