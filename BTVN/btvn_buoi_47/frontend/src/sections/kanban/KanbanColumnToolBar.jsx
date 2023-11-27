import { useRef, useState, useEffect } from "react";
// @mui
import { styled } from "@mui/material/styles";
import { Stack, OutlinedInput, MenuItem, IconButton } from "@mui/material";
// components
import Iconify from "@/components/Iconify";
import MenuPopover from "@/components/MenuPopover";
// hooks
import useOutsideClick from "@/hooks/useOutsideClick";
import ConfirmDialog from "@/components/ConfirmDialog";

// ----------------------------------------------------------------------

const InputStyled = styled(OutlinedInput)(({ theme }) => ({
  width: "100%",
  "& .MuiOutlinedInput-notchedOutline": {
    transition: "border-color 300ms cubic-bezier(0.4, 0, 0.2, 1)",
    borderColor: "transparent",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "transparent",
  },
  "& input": {
    transition: "padding-left 300ms cubic-bezier(0.4, 0, 0.2, 1)",
    paddingLeft: 0,
    paddingRight: 0,
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    "&:focus": {
      paddingLeft: 14,
      paddingRight: 14,
      "+ .MuiOutlinedInput-notchedOutline": {
        borderWidth: 1,
        borderColor: theme.palette.primary.main,
      },
    },
  },
}));

export default function KanbanColumnToolBar({ columnName, onDelete, onUpdate }) {
  const renameRef = useRef(null);
  const [open, setOpen] = useState(null);

  useEffect(() => {
    if (open) {
      if (renameRef.current) {
        renameRef.current.focus();
      }
    }
  }, [open]);

  const handleClose = () => setOpen(null);

  const handleClickRename = () => handleClose();

  const handleOpen = (event) => setOpen(event.currentTarget);

  const handleRename = () => {
    const value = renameRef.current.value?.trim();
    if (!value) return (renameRef.current.value = columnName);
    onUpdate(value);
  };

  const hanldeDeleteColumn = () => {
    handleClose();
    onDelete();
  };

  const handleUpdateColumn = (event) => {
    if (event.key === "Enter" && renameRef.current) {
      renameRef.current.blur();
      handleRename();
    }
  };

  useOutsideClick(renameRef, handleRename);

  return (
    <>
      <Stack
        spacing={1}
        sx={{ pt: 3 }}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <InputStyled
          size="small"
          inputRef={renameRef}
          placeholder="Tên cột"
          defaultValue={columnName}
          onKeyUp={handleUpdateColumn}
          sx={{
            typography: "h5",
            fontWeight: "fontWeightBold",
          }}
        />

        <IconButton size="small" onClick={handleOpen} color={open ? "inherit" : "default"}>
          <Iconify icon={"eva:more-horizontal-fill"} width={20} height={20} />
        </IconButton>
      </Stack>

      <MenuPopover
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
        sx={{
          width: "auto",
          "& .MuiMenuItem-root": { px: 1, typography: "body2", borderRadius: 0.75 },
        }}
      >
        <ConfirmDialog
          component={MenuItem}
          button={
            <>
              <Iconify
                icon={"eva:trash-2-outline"}
                sx={{ width: 20, height: 20, flexShrink: 0, mr: 1 }}
              />
              Xoá
            </>
          }
          agreeText="Xoá"
          disagreeText="Huỷ"
          sx={{ color: "error.main" }}
          onAgree={hanldeDeleteColumn}
          title="Bạn có chắc chắn muốn xoá?"
          message="Tháo tác này sẽ xoá toàn bộ các công việc đã tạo trong cột này?"
        />

        <MenuItem onClick={handleClickRename}>
          <Iconify icon={"eva:edit-fill"} sx={{ width: 20, height: 20, flexShrink: 0, mr: 1 }} />
          Đổi tên
        </MenuItem>
      </MenuPopover>
    </>
  );
}
