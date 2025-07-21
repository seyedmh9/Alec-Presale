import { Height } from "@mui/icons-material";

const textFieldStyles = {
  mb: 2,
  fontFamily: "poppins",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#4caf50",
    },
    "&:hover fieldset": {
      borderColor: "#388e3c",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1b5e20",
    },
  },
  "& .MuiInputBase-input": {
    color: "#ccffcc",
    fontFamily: "inherit",
    "@media (max-width:600px)": {
      fontSize: "0.75rem",
      paddingTop: "20px",
      height: "10px !important",
      minHeight: "0px !important",
    },
  },
  "& .MuiInputLabel-root": {
    fontFamily: "poppins",
    color: "#ccffcc",
    "@media (max-width:600px)": {
      fontSize: "0.7rem",
    },
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#4E9F3D",
  },
  "& .MuiFormHelperText-root": {
    color: "#4E9F3D",
    "@media (max-width:600px)": {
      fontSize: "0.7rem",
    },
  },
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderColor: "#1F7D53",
  },
  "& input:-webkit-autofill": {
    boxShadow: "0 0 0 1000px inherit inset",
    WebkitTextFillColor: "#ccffcc",
    transition: "background-color 9999s ease-in-out 0s",
  },
};

export { textFieldStyles };
