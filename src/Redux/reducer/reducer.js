const initialState = {
  categories: [],
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CATEGORY':
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    default:
      return state;
  }
};

export default categoriesReducer;