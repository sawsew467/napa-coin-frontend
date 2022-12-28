import { AppInterface } from '../../pages/_app';
import { ActionType } from '../action-types';
import { Action } from '../actions';

const inittialState = {
    email: '',
    avatar: '',
    fullname: '',
    bio: '',
};

const reducer = (state = inittialState, action: Action) => {
    switch (action.type) {
        case ActionType.SET_CURRENT_USER:
            return action.payload;
        default:
            return state;
    }
};

export default reducer;
