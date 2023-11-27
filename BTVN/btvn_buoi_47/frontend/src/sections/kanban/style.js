// @mui
import { styled } from "@mui/material/styles";
import { OutlinedInput } from "@mui/material";

export const InputStyled = styled(OutlinedInput)(({ theme }) => ({
  width: "100%",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "transparent",
    transition: "border-color 300ms cubic-bezier(0.4, 0, 0.2, 1)",
  },
  "& input": {
    border: "none",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    "&:focus": {
      "+ .MuiOutlinedInput-notchedOutline": {
        borderWidth: 1,
        borderColor: theme.palette.primary.main,
      },
    },
    "&:hover": {
      "+ .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.primary.main,
      },
    },
  },
}));
