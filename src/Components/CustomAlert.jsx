import React from "react";
import { Box, Stack, Alert, Fade } from "@mui/material";

const CustomAlert = ({ showAlert }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
      }}
    >
      <Fade in={showAlert.show} timeout={{ enter: 500, exit: 500 }}>
        <Stack
          sx={{
            minWidth: "300px",
            border: showAlert.state
              ? "solid 1px rgb(44, 122, 60)"
              : "solid 1px rgb(191, 47, 47)",
            borderRadius: "12px",
          }}
          spacing={2}
        >
          <Alert
            severity={showAlert.state ? "success" : "error"}
            sx={{
              backgroundColor: showAlert.state
                ? "rgba(0, 66, 33, 0.93)"
                : "rgba(113, 3, 3, 0.91)",
              color: "#fff",
            }}
          >
            {showAlert.message
              ? showAlert.message
              : showAlert.state
              ? "Login successful."
              : "Login failed. Please check your username and password."}
          </Alert>
        </Stack>
      </Fade>
    </Box>
  );
};

export default CustomAlert;
