export const SEARCHING = 'ADMIN_PANEL/settings/searching';

const initialState = {
  keyword: '',
  data: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCHING:
      return {
        ...state,
        keyword: action?.keyword,
        data: action?.data,
      };

    default:
      return state;
  }
};

export const searching = (keyword, data) => ({
  type: SEARCHING,
  keyword: keyword,
  data: data,
});
