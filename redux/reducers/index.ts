import { combineReducers } from 'redux';
import darkModeReducer from './darkModeReducer';
import loginModalReducer from './loginModalReducer';
import currentUserReducer from './currentUserReducer';

const reducers = combineReducers({
    darkmode: darkModeReducer,
    loginModal: loginModalReducer,
    currentUser: currentUserReducer,
});

export default reducers;
export type State = ReturnType<typeof reducers>;
