export const reducer = (state, action) => {
  switch (action.type) {
    case "counter/increment":
      return { ...state, count: state.count + action.payload };

    case "counter/decrement":
      return { ...state, count: state.count - action.payload };

    default:
      return state;
  }
};
