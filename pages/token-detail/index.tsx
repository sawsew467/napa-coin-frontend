import React from 'react';
import Header from '../../components/Header/Header';
import DetailToken from '../../components/DetailToken';
import Convert from '../../components/Convert';

const TokenDetail = () => {
    return (
        <>
            <Header></Header>
            <div className="bg_home">
                <DetailToken></DetailToken>
                <h1 className="title-home">BTT to USD Converter </h1>
                <Convert></Convert>
            </div>
        </>
    );
};

export default TokenDetail;
