import axios from 'axios';
export const registerRequest = async (userInput: any) => {
    const option = {
        method: 'POST',
        url: 'http://172.16.6.215:5000/api/v1/auth/register',
        // url: 'http://172.16.6.215:5000/api/v1/auth/register',
        data: userInput,
    };
    const response = await axios(option);
    return response;
};
export const loginRequest = async (userInput: any) => {
    const option = {
        method: 'POST',
        url: 'http://172.16.6.215:5000/api/v1/auth/login',
        // url: 'http://172.16.6.215:5000/api/v1/auth/login',
        data: userInput,
    };
    const response = await axios(option);
    return response;
};
