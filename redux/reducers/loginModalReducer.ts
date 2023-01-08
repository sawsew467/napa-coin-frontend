import { ActionType } from '../action-types';
import { Action } from '../actions';

const inittialState = false;

const reducer = (state = inittialState, action: Action) => {
    switch (action.type) {
        case ActionType.SET_LOGIN_MODAL:
            return action.payload;
        default:
            return state;
    }
};

export default reducer;
