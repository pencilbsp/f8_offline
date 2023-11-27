import { useEffect } from "react";
// @mui
import { Container, Stack } from "@mui/material";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
// redux
import { useDispatch, useSelector } from "../redux/store";
import { getBoard, persistColumn, persistTask } from "../redux/slices/kanban";
// sections
import { KanbanColumn, KanbanColumnAdd } from "../sections/kanban";

// ----------------------------------------------------------------------

export default function Kanban() {
  const dispatch = useDispatch();
  const { board } = useSelector((state) => state.kanban);

  useEffect(() => {
    dispatch(getBoard());
  }, [dispatch]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    if (type === "column") {
      const newColumns = Array.from(board.columns);
      const draggable = newColumns.find(({ id }) => id === draggableId);

      const [startOrder, finishOrder] = [
        newColumns[source.index].order,
        newColumns[destination.index].order,
      ];

      const updated = [
        { id: newColumns[source.index].id, order: finishOrder },
        { id: newColumns[destination.index].id, order: startOrder },
      ];

      newColumns.splice(source.index, 1);
      newColumns.splice(destination.index, 0, draggable);

      dispatch(persistColumn(newColumns, updated));
      return;
    }

    const start = board.columns.find(({ id }) => id === source.droppableId);
    const finish = board.columns.find(({ id }) => id === destination.droppableId);

    if (start.id === finish.id) {
      const updatedTaskIds = [...start.taskIds];
      updatedTaskIds.splice(source.index, 1);
      updatedTaskIds.splice(destination.index, 0, draggableId);

      const updatedColumn = { id: start.id, taskIds: updatedTaskIds };

      dispatch(persistTask(updatedColumn));
      return;
    }

    const startTaskIds = [...start.taskIds];
    startTaskIds.splice(source.index, 1);
    const updatedStart = { id: start.id, taskIds: startTaskIds };

    const finishTaskIds = [...finish.taskIds];
    finishTaskIds.splice(destination.index, 0, draggableId);
    const updatedFinish = { id: finish.id, taskIds: finishTaskIds };

    dispatch(persistTask(updatedStart, updatedFinish));
  };

  return (
    <Container maxWidth={false} sx={{ height: 1, pt: 4 }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-columns" direction="horizontal" type="column">
          {(provided) => (
            <Stack
              spacing={3}
              direction="row"
              alignItems="flex-start"
              ref={provided.innerRef}
              {...provided.droppableProps}
              sx={{ height: "100%", overflowY: "hidden" }}
            >
              {board.columns.map((column, index) => (
                <KanbanColumn index={index} key={column.id} column={column} />
              ))}

              {provided.placeholder}
              <KanbanColumnAdd />
            </Stack>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
}
