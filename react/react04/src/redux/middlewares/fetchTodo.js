/* eslint-disable no-unused-vars */
export const fetchTodo = () => {
  return async (dispatch, getState) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos`);
    const todos = await response.json();
    dispatch({
      type: "todo/fetch",
      payload: todos,
    });
  };
};
