import axios from 'axios';
import { faker } from '@faker-js/faker';

export const getInfo = async (uid: string | string[], token: string) => {
    const option = {
        method: 'get',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        // url: `http://172.16.6.215:5000/api/v1/users/${uid}`,
        url: `http://172.16.6.215:5000/api/v1/users/${uid}`,
    };
    const response = await axios(option);
    return response.data;
};
export const getAllUsers = async () => {
    const option = {
        method: 'get',
        // url: `http://172.16.6.215:5000/api/v1/users`,
        url: `http://172.16.6.215:5000/api/v1/users`,
    };
    const response = await axios(option);
    return response.data;
};

export const changePassword = async (userId: string, token: string, oldPassword: string, newPassword: string) => {
    try {
        const option = {
            method: 'PUT',
            // url: `http://172.16.6.215:5000/api/v1/users/edit/${userId}/password`,
            url: `http://172.16.6.215:5000/api/v1/users/edit/${userId}/password`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                oldPassword,
                newPassword,
            },
        };

        const response = await axios(option);
        return response;
    } catch (error: any) {
        return error.response;
    }
};

export const editProfile = async (userId: string, token: string, userInput: any) => {
    try {
        const option = {
            method: 'PUT',
            // url: `http://172.16.6.215:5000/api/v1/users/edit/${userId}`,
            url: `http://172.16.6.215:5000/api/v1/users/edit/${userId}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                fullname: userInput.fullname,
                avatar: userInput.avatar,
                bio: userInput.bio,
            },
        };

        const response = await axios(option);
        return response.data.data;
    } catch (error: any) {
        return error.response.data.message;
    }
};
