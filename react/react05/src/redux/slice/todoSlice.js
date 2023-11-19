import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  posts: [],
  status: "idle",
};

export const todoSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.list.push(action.payload);
    },
    // fetchPosts: (state, action) => {
    //   state.posts.push(...action.payload);
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts.push(...action.payload);
        state.status = "success";
      })
      .addCase(fetchPosts.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.status = "error";
      });
  },
});

// Redux thunk

// export const fetchPosts = () => {
//   return async (dispath) => {
//     const response = await fetch("https://jsonplaceholder.typicode.com/posts");
//     const posts = await response.json();
//     dispath(todoSlice.actions.fetchPosts(posts));
//   };
// };

export const fetchPosts = createAsyncThunk("fetchPosts", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await response.json();
  return posts;
});
