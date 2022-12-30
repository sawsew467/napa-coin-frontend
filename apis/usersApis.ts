import axios from 'axios';

export const getInfo = async (uid: string | string[]) => {
    const option = {
        method: 'get',
        // url: `http://localhost:5000/api/v1/users/${uid}`,
        url: `http://172.16.6.214:5000/api/v1/users/${uid}`,
    };
    const response = await axios(option);
    return response.data;
};
export const getAllUsers = async () => {
    const option = {
        method: 'get',
        // url: `http://localhost:5000/api/v1/users`,
        url: `http://172.16.6.214:5000/api/v1/users`,
    };
    const response = await axios(option);
    return response.data;
};
