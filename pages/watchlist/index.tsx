import React from 'react';
import Header from '../../components/Header/Header';
import TableToken from '../../components/TableToken/TableToken';

const Watchlist = () => {
    return (
        <>
            <Header
                setIsShowLoginModal={function (value: React.SetStateAction<boolean>): void {
                    throw new Error('Function not implemented.');
                }}
            ></Header>
            <div className="bg_home">
                <h1 className="title-watchlist">My Watchlist </h1>
                <TableToken></TableToken>
            </div>
        </>
    );
};

export default Watchlist;
