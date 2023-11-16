const initialState = {
  list: [],
};

export const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "todo/fetch":
      return { ...state, list: action.payload };

    case "todo/add":
      return { ...state, list: [...state.list, action.payload] };

    default:
      return state;
  }
};
