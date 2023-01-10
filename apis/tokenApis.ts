import axios from 'axios';

export const getTokenLastest = async () => {
    const option = {
        method: 'GET',
        url: `http://localhost:5000/api/v1/coin/latest`,
    };

    const response = await axios(option);
    return response;
};

export const getTokenCate = async () => {
    const option = {
        method: 'GET',
        url: `http://localhost:5000/api/v1/coin/categories`,
    };

    const response = await axios(option);
    return response;
};
