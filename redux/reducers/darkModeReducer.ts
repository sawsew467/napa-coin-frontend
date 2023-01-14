import { AppInterface } from '../../pages/_app';
import { ActionType } from '../action-types';
import { Action } from '../actions';

const inittialState = 'light';

const reducer = (state = inittialState, action: Action) => {
    switch (action.type) {
        case ActionType.SET_DARKMODE:
            window.localStorage.setItem('darkmode', action.payload);
            return action.payload;

        default:
            return state;
    }
};

export default reducer;
