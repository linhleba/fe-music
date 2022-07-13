import { combineReducers, createStore } from 'redux';
import snackbarReducer from './ducks/snackbar';
import searchingReducer from './ducks/searching';
import disableReducer from './ducks/disableDelete';
import authenticateReducer from './ducks/authenticate';

const reducer = combineReducers({
  snackbar: snackbarReducer,
  searching: searchingReducer,
  disableDelete: disableReducer,
  // fetchSong: fetchSongReducer,
  authenticate: authenticateReducer,
});

const store = createStore(reducer, {});

export default store;
