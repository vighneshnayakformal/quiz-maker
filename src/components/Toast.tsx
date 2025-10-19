"use client";
import { Alert, Snackbar } from "@mui/material";
import { useContext } from "react";

import { AlertContext } from "./AlertProvider";

const Toast = () => {
  const { alert, setAlert } = useContext(AlertContext);
  const handleClose = () => setAlert(undefined);

  return (
    <Snackbar
      sx={{ zIndex: 99999 }}
      open={alert?.show}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      onClose={handleClose}
      autoHideDuration={4000}
    >
      {alert && (
        <Alert
          onClose={handleClose}
          severity={alert?.severity}
          variant="filled"
        >
          {alert?.message}
        </Alert>
      )}
    </Snackbar>
  );
};

export default Toast;
