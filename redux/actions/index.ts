import { ActionType } from './../action-types/index';
import { AppInterface } from '../../pages/_app';

interface SetDarkmode {
    type: ActionType.SET_DARKMODE;
    payload: AppInterface['darkmode'];
}
interface SetCurrentUser {
    type: ActionType.SET_CURRENT_USER;
    payload: AppInterface['currentUser'];
}

export type Action = SetDarkmode | SetCurrentUser;
