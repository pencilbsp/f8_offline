import { useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
// @mui
import { styled } from "@mui/material/styles";
import {
  Box,
  Paper,
  OutlinedInput,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
// hooks
import useOutsideClick from "@/hooks/useOutsideClick";
// components
import Iconify from "@/components/Iconify";

// ----------------------------------------------------------------------

const InputStyled = styled(OutlinedInput)({
  width: "100%",
  "& input": {
    padding: 0,
    border: "none",
    outline: "none",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  "& fieldset": {
    border: "none",
    outline: "none",
  },
});

export default function KanbanTaskCard({ task, index, onUpdateTask, onDeleteTask }) {
  const { id, content } = task;

  const inputRef = useRef();
  const [contextMenu, setContextMenu] = useState(null);

  const handleUpdateTask = () => {
    const value = inputRef.current.value?.trim();
    if (!value) return (inputRef.current.value = content);
    if (value !== content) onUpdateTask(id, value);
  };

  useOutsideClick(inputRef, handleUpdateTask);

  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : null
    );
  };

  const handleClose = () => setContextMenu(null);

  const handleEditTask = () => {
    handleClose();
    inputRef.current.focus();
  };

  const handleDeleteTask = () => {
    handleClose();
    onDeleteTask(id);
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onContextMenu={handleContextMenu}
        >
          <Paper
            sx={{
              width: 1,
              position: "relative",
              boxShadow: (theme) => theme.customShadows.z1,
              "&:hover": {
                boxShadow: (theme) => theme.customShadows.z16,
              },
            }}
          >
            <Box sx={{ cursor: "pointer", px: 2, py: 1.5, width: 1 }}>
              <InputStyled inputRef={inputRef} defaultValue={content} />
            </Box>
          </Paper>

          <Menu
            onClose={handleClose}
            open={contextMenu !== null}
            sx={{ "& ul": { padding: 1 } }}
            anchorReference="anchorPosition"
            anchorPosition={
              contextMenu !== null
                ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                : undefined
            }
          >
            <MenuItem sx={{ borderRadius: 0.5 }} onClick={handleEditTask}>
              <ListItemIcon>
                <Iconify icon="eva:edit-fill" width={20} height={20} />
              </ListItemIcon>
              <ListItemText>Sửa</ListItemText>
            </MenuItem>
            <MenuItem sx={{ borderRadius: 0.5 }} onClick={handleDeleteTask}>
              <ListItemIcon sx={{ color: "error.main" }}>
                <Iconify icon="eva:trash-2-fill" width={20} height={20} />
              </ListItemIcon>
              <ListItemText sx={{ color: "error.main" }}>Xoá</ListItemText>
            </MenuItem>
          </Menu>
        </div>
      )}
    </Draggable>
  );
}
