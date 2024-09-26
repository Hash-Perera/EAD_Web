// AccessControlContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { getUserRole } from "../../utils/auth";

const AccessControlContext = createContext();

export const AccessControlProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const role = getUserRole();
    setUserRole(role);
  }, []);

  return (
    <AccessControlContext.Provider value={{ userRole }}>
      {children}
    </AccessControlContext.Provider>
  );
};

export const useAccessControl = () => useContext(AccessControlContext);
