import React from 'react';
import Header from '../../components/Header/Header';
import TableToken from '../../components/TableToken/TableToken';

const Watchlist = () => {
    return (
        <>
            <Header></Header>
            <div className="bg_home">
                <h1 className="title-watchlist">My Watchlist </h1>
                <TableToken></TableToken>
            </div>
        </>
    );
};

export default Watchlist;
