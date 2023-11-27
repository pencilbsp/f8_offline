import { toast } from "sonner";
import omit from "lodash/omit";
import { createSlice } from "@reduxjs/toolkit";
// utils
import axios from "@/utils/axios";
//
import { dispatch } from "../store";

// ----------------------------------------------------------------------

function objFromArray(array, key = "id") {
  return array.reduce((accumulator, current) => {
    accumulator[current[key]] = current;
    return accumulator;
  }, {});
}

const initialState = {
  isLoading: false,
  error: null,
  board: {
    tasks: {},
    columns: [],
  },
};

const toastId = toast("Đang đồng bộ dữ liệu...");

const slice = createSlice({
  name: "kanban",
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
      toast.loading("Đang đồng bộ dữ liệu...", { id: toastId });
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
      toast.error(state.error?.message || "Đã có lỗi xả ra", { id: toastId });
    },

    // GET BOARD
    getBoardSuccess(state, action) {
      state.isLoading = false;
      const board = action.payload;
      const columns = board.columns;
      const tasks = objFromArray(board.tasks);

      state.board = {
        tasks,
        columns,
      };
    },

    // CREATE NEW COLUMN
    createColumnSuccess(state, action) {
      const newColumn = action.payload;
      state.isLoading = false;
      state.board.columns.push(newColumn);
    },

    persistTask(state, action) {
      const [start, finish] = action.payload;
      const startIndex = state.board.columns.findIndex(({ id }) => id == start.id);
      if (startIndex > -1) state.board.columns[startIndex].taskIds = start.taskIds;

      if (finish) {
        const finishIndex = state.board.columns.findIndex(({ id }) => id == finish.id);
        if (finishIndex > -1) state.board.columns[finishIndex].taskIds = finish.taskIds;
      }

      state.isLoading = false;
    },

    persistColumn(state, action) {
      state.board.columns = action.payload;
      state.isLoading = false;
    },

    addTask(state, action) {
      const { task, columnId } = action.payload;
      const index = state.board.columns.findIndex(({ id }) => id === columnId);

      if (index > -1) {
        state.board.tasks[task.id] = task;
        state.board.columns[index].taskIds.push(task.id);
      }

      state.isLoading = false;
    },

    deleteTaskSuccess(state, action) {
      const { id: taskId, columnId } = action.payload;
      const index = state.board.columns.findIndex(({ id }) => id === columnId);

      if (index > -1) {
        const taskIds = state.board.columns[index].taskIds.filter((id) => id !== taskId);
        state.board.columns[index].taskIds = taskIds;
        state.board.tasks = omit(state.board.tasks, [taskId]);
      }

      state.isLoading = false;
    },

    updateTaskSuccess(state, action) {
      const task = action.payload;
      state.board.tasks[task.id] = task;
      state.isLoading = false;
    },

    // UPDATE COLUMN
    updateColumnSuccess(state, action) {
      const column = action.payload;
      const index = state.board.columns.findIndex(({ id }) => id === column.id);

      if (index > -1) state.board.columns[index] = column;
      state.isLoading = false;
    },

    // DELETE COLUMN
    deleteColumnSuccess(state, action) {
      const { columnId } = action.payload;

      state.isLoading = false;
      state.board.columns = state.board.columns.filter(({ id }) => id !== columnId);
    },
  },
});

// Reducer
export default slice.reducer;

export const { actions } = slice;

// ----------------------------------------------------------------------

export function getBoard() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get("/kanban/boards");
      dispatch(slice.actions.getBoardSuccess(response.data));
      toast.dismiss(toastId);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function createColumn(newColumn) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post("/kanban/columns", newColumn);
      dispatch(slice.actions.createColumnSuccess(response.data.column));
      toast.success("Dữ liệu đã được đồng bộ", { id: toastId });
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function updateColumn(id, column) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.patch("/kanban/columns", [{ id, name: column.name }]);
      dispatch(slice.actions.updateColumnSuccess(column));
      toast.success("Dữ liệu đã được đồng bộ", { id: toastId });
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function deleteColumn(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.delete("/kanban/columns", { params: { id } });
      dispatch(slice.actions.deleteColumnSuccess({ columnId: id }));
      toast.success("Dữ liệu đã được đồng bộ", { id: toastId });
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function persistColumn(newColumns, updated) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      dispatch(slice.actions.persistColumn(newColumns));
      await axios.patch("/kanban/columns", updated);
      toast.success("Dữ liệu đã được đồng bộ", { id: toastId });
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function persistTask(start, finish) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      dispatch(slice.actions.persistTask([start, finish]));
      await axios.patch("kanban/columns", finish ? [start, finish] : [start]);
      toast.success("Dữ liệu đã được đồng bộ", { id: toastId });
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function addTask({ task, columnId }) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post("kanban/tasks", { ...task, columnId });
      dispatch(slice.actions.addTask({ task: response.data.task, columnId }));
      toast.success("Dữ liệu đã được đồng bộ", { id: toastId });
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteTask(id, columnId) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.delete("kanban/tasks", { params: { id, columnId } });
      dispatch(slice.actions.deleteTaskSuccess({ id, columnId }));
      toast.success("Dữ liệu đã được đồng bộ", { id: toastId });
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateTask(id, content) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.patch("kanban/tasks", { id, content });
      dispatch(slice.actions.updateTaskSuccess(response.data.task));
      toast.success("Dữ liệu đã được đồng bộ", { id: toastId });
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
