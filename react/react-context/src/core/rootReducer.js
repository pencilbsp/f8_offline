export const initialState = {
  message: "Xin chào F8",
  todos: [
    { id: 1, value: "Công việc 1" },
    { id: 2, value: "Công việc 2" },
  ],
};

export const rootReducer = (state, action) => {
  switch (action.type) {
    case "todo/add":
      return { ...state, todos: [...state.todos, action.payload] };

    default:
      return state;
  }
};
