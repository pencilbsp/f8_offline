import { useState } from "react";
// import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { Droppable, Draggable } from "react-beautiful-dnd";
// @mui
import { Paper, Stack, Button } from "@mui/material";
// redux
import { useDispatch } from "@/redux/store";
import { deleteColumn, updateColumn, addTask, deleteTask, updateTask } from "@/redux/slices/kanban";
// components
import Iconify from "@/components/Iconify";
//
import KanbanAddTask from "./KanbanTaskAdd";
import KanbanTaskCard from "./KanbanTaskCard";
import KanbanColumnToolBar from "./KanbanColumnToolBar";

// ----------------------------------------------------------------------

export default function KanbanColumn({ column, index }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  // const { enqueueSnackbar } = useSnackbar();
  const { board } = useSelector((state) => state.kanban);

  const { name, taskIds, id } = column;

  const handleOpenAddTask = () => {
    setOpen((prev) => !prev);
  };

  const handleCloseAddTask = () => {
    setOpen(false);
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId, id));
  };

  const handleUpdateTask = (taskId, content) => {
    dispatch(updateTask(taskId, content));
  };

  const handleUpdateColumn = (newName) => {
    if (newName !== name) {
      dispatch(updateColumn(id, { ...column, name: newName }));
    }
  };

  const handleDeleteColumn = () => {
    dispatch(deleteColumn(id));
  };

  const handleAddTask = (task) => {
    dispatch(addTask({ task, columnId: id }));
    handleCloseAddTask();
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <Paper
          variant="outlined"
          ref={provided.innerRef}
          {...provided.draggableProps}
          sx={{ px: 2, bgcolor: "grey.5008" }}
        >
          <Stack spacing={2} {...provided.dragHandleProps}>
            <KanbanColumnToolBar
              columnName={name}
              onDelete={handleDeleteColumn}
              onUpdate={handleUpdateColumn}
            />

            <Droppable droppableId={id} type="task">
              {(provided) => (
                <Stack
                  width={1}
                  spacing={2}
                  minWidth={300}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {taskIds.map((taskId, index) => (
                    <KanbanTaskCard
                      key={taskId}
                      index={index}
                      task={board?.tasks[taskId]}
                      onDeleteTask={handleDeleteTask}
                      onUpdateTask={handleUpdateTask}
                    />
                  ))}
                  {provided.placeholder}
                </Stack>
              )}
            </Droppable>

            <Stack spacing={2} sx={{ pb: 2 }}>
              {open && (
                <KanbanAddTask onAddTask={handleAddTask} onCloseAddTask={handleCloseAddTask} />
              )}

              <Button
                fullWidth
                size="large"
                color="inherit"
                variant="outlined"
                sx={{ fontSize: 14 }}
                onClick={handleOpenAddTask}
                startIcon={<Iconify icon={"eva:plus-fill"} width={20} height={20} />}
              >
                Thêm công việc
              </Button>
            </Stack>
          </Stack>
        </Paper>
      )}
    </Draggable>
  );
}
