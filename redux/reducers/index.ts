import { combineReducers } from 'redux';
import darkModeReducer from './darkModeReducer';
import currentUserReducer from './currentUserReducer';

const reducers = combineReducers({
    darkmode: darkModeReducer,
    currentUser: currentUserReducer,
});

export default reducers;
export type State = ReturnType<typeof reducers>;
