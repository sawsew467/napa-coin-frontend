import { Dispatch } from 'react';
import { AppInterface } from '../../pages/_app';
import { ActionType } from '../action-types';
import { Action } from '../actions';

export const setDarkmode = (mode: AppInterface['darkmode']) => {
    return (dispath: Dispatch<Action>) => {
        dispath({
            type: ActionType.SET_DARKMODE,
            payload: mode,
        });
    };
};

export const setCurrentUser = (user: AppInterface['currentUser']) => {
    return (dispath: Dispatch<Action>) => {
        dispath({
            type: ActionType.SET_CURRENT_USER,
            payload: user,
        });
    };
};

export const setIsShowLoginModal = (isShow: boolean) => {
    return (dispath: Dispatch<Action>) => {
        dispath({
            type: ActionType.SET_LOGIN_MODAL,
            payload: isShow,
        });
    };
};
