export const FETCH_SONG_API = 'ADMIN_PANEL/settings/FE';
// import * as api from '../../api/index';

const initialState = {
  fetchSong: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SONG_API:
      //   const reponseData = api.getEmployee();
      return {
        ...state,
        fetchSong: state.fetchSong + 1,
      };

    default:
      return state;
  }
};

export const fetchApi = () => ({
  type: FETCH_SONG_API,
});
