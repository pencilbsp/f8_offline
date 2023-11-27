import { useState, Fragment } from "react";
// @mui
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

// ----------------------------------------------------------------------

export default function ConfirmDialog({
  title,
  button,
  onAgree,
  message,
  agreeText,
  disagreeText,
  component: Component,
  sx,
}) {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const handleClickOpen = () => setOpen(true);

  return (
    <Fragment>
      <Component onClick={handleClickOpen} sx={sx}>
        {button}
      </Component>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{ pt: 3 }}>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, pt: 0 }}>
          <Button
            color="error"
            variant="outlined"
            onClick={() => {
              handleClose();
              onAgree();
            }}
            autoFocus
          >
            {agreeText}
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            {disagreeText}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
