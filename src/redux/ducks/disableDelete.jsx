export const DISABLE_DELETE = 'ADMIN_PANEL/settings/DISABLE_DELETE';

const initialState = {
  disable: false,
  data: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DISABLE_DELETE:
      return {
        ...state,
        disable: action?.disable,
        data: [action?.data],
      };

    default:
      return state;
  }
};

export const disableDelete = (disable, data) => ({
  type: DISABLE_DELETE,
  disable: disable,
  data: data,
});
