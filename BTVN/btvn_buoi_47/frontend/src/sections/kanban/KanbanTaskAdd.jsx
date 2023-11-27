import { useEffect, useRef, useState } from "react";
// @mui
import { ClickAwayListener, Paper } from "@mui/material";
//
import { InputStyled } from "./style";

// ----------------------------------------------------------------------

const defaultTask = { content: "" };

export default function KanbanTaskAdd({ onAddTask, onCloseAddTask }) {
  const inputRef = useRef();

  const handleKeyUpAddTask = (event) => {
    if (event.key === "Enter") {
      const content = inputRef.current.value;
      if (content?.trim() !== "") {
        onAddTask({ ...defaultTask, content });
      }
    }
  };

  useEffect(() => {
    inputRef.current && inputRef.current.focus();
  }, []);

  return (
    <>
      <ClickAwayListener onClickAway={onCloseAddTask}>
        <Paper variant="outlined" sx={{ p: 0 }}>
          <InputStyled
            size="small"
            inputRef={inputRef}
            onKeyUp={handleKeyUpAddTask}
            placeholder="Nội dung công việc"
          />
        </Paper>
      </ClickAwayListener>
    </>
  );
}
