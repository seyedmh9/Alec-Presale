 const dropDownStyles = {
  sx: {
    "& .MuiSelect-icon": {
      color: "green",
    },
  },
  MenuProps: {
    PaperProps: {
      sx: {
        backgroundColor: "rgb(0, 37, 19)",
        "& .MuiMenuItem-root": {
          color: "#ccffcc",
          borderBottom: "1px solid rgb(0, 73, 37)",
          borderTop: "1px solid rgb(0, 73, 37)",
        },
        "& .MuiMenuItem-root:hover": {
          backgroundColor: "rgb(0, 100, 50)",
        },
        "& .Mui-selected": {
          backgroundColor: "rgb(0, 100, 50)",

          "&:hover": { backgroundColor: "rgb(0, 100, 50)" },
        },
      },
    },
  },
};


export default dropDownStyles