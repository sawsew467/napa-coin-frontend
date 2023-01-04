import axios from 'axios';

export const followUser = async (userId: string | string[], followedId: any) => {
    console.log('followedId', followedId);

    const option = {
        method: 'post',
        // url: `http://localhost:5000/api/v1/follow/`,
        url: `http://172.16.6.214:5000/api/v1/follow/`,
        data: {
            type: 'follow',
            userId,
            followedId,
        },
    };
    const response = await axios(option);
    return response.data;
};
export const unfollowUser = async (userId: string | string[], followedId: any) => {
    console.log('followedId', followedId);

    const option = {
        method: 'post',
        // url: `http://localhost:5000/api/v1/follow/`,
        url: `http://172.16.6.214:5000/api/v1/follow/`,
        data: {
            type: 'unfollow',
            userId,
            followedId,
        },
    };
    const response = await axios(option);
    return response.data;
};
