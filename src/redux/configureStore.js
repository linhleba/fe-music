import { combineReducers, createStore } from 'redux';
import snackbarReducer from './ducks/snackbar';
import searchingReducer from './ducks/searching';
import disableReducer from './ducks/disableDelete';
import authenticateReducer from './ducks/authenticate';
import fetchSongReducer from './ducks/fetchSong';

const reducer = combineReducers({
  snackbar: snackbarReducer,
  searching: searchingReducer,
  disableDelete: disableReducer,
  // fetchSong: fetchSongReducer,
  authenticate: authenticateReducer,
  fetchSong: fetchSongReducer,
});

const store = createStore(reducer, {});

export default store;
