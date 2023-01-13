import { combineReducers } from 'redux';
import darkModeReducer from './darkModeReducer';
import loginModalReducer from './loginModalReducer';
import currentUserReducer from './currentUserReducer';
import searchReducer from './searchReducer';

const reducers = combineReducers({
    darkmode: darkModeReducer,
    loginModal: loginModalReducer,
    currentUser: currentUserReducer,
    search: searchReducer,
});

export default reducers;
export type State = ReturnType<typeof reducers>;
