import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import TableToken, { DataType } from '../../components/TableToken/TableToken';
import axios from 'axios';
import { AppInterface } from '../_app';
import { useSelector } from 'react-redux';
import { State } from '../../redux';

const Watchlist = () => {
    const currentUser: AppInterface['currentUser'] = useSelector((state: State) => state.currentUser);
    const [watchlist, setWatchlist] = useState<DataType[]>([]);

    useEffect(() => {
        const watchlistData = async () => {
            const watchlistToken = await axios.get(`http://localhost:5000/api/v1/watchlist/${currentUser._id}`);
            setWatchlist(watchlistToken.data.results.data);
        };

        watchlistData();
    }, [currentUser._id]);

    return (
        <>
            <Header
                setIsShowLoginModal={function (value: React.SetStateAction<boolean>): void {
                    throw new Error('Function not implemented.');
                }}
                handleSearchDebound={function (e: { target: { value: any } }): void {
                    throw new Error('Function not implemented.');
                }}
                searchDebound={''}
            ></Header>
            <div className="bg_home">
                <h1 className="title-watchlist">My Watchlist </h1>
                <TableToken
                    searchResult={[]}
                    isSearchResult={false}
                    watchlist={watchlist}
                    setWatchlist={setWatchlist}
                ></TableToken>
            </div>
        </>
    );
};

export default Watchlist;
