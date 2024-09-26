import React, { createContext, useContext, useState } from "react";
import CustomSnackbar from "./CustomSnackbar.jsx"; // Adjust path if necessary

// Create the Snackbar context
const SnackbarContext = createContext();

// SnackbarProvider component that provides the context value
export const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "",
    message: "",
  });

  // Function to show the Snackbar with specified severity and message
  const showSnackbar = (severity, message) => {
    setSnackbar({ open: true, severity, message });
  };

  // Function to handle closing the Snackbar
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <CustomSnackbar
        open={snackbar.open}
        severity={snackbar.severity}
        message={snackbar.message}
        onClose={handleCloseSnackbar}
      />
    </SnackbarContext.Provider>
  );
};

// Hook to use the Snackbar context
export const useSnackbar = () => {
  return useContext(SnackbarContext);
};
