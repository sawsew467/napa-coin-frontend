import axios from 'axios';

export const addToWatchList = async (userId: string, tokenId: number) => {
    const option = {
        method: 'POST',
        url: 'http://localhost:5000/api/v1/watchlist',
        data: {
            type: 'follow',
            userId,
            tokenId,
        },
    };
    const response = await axios(option);
    return response;
};

export const removeFromWatchList = async (userId: string, tokenId: number) => {
    const option = {
        method: 'POST',
        url: 'http://localhost:5000/api/v1/watchlist',
        data: {
            type: 'unfollow',
            userId,
            tokenId,
        },
    };

    const response = await axios(option);
    return response;
};

export const getWatchlistToken = async (userId: string) => {
    const option = {
        method: 'GET',
        url: `http://localhost:5000/api/v1/watchlist/${userId}`,
    };

    const response = await axios(option);
    return response;
};
