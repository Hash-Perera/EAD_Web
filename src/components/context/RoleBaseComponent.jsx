// RoleBasedComponent.js
import React from "react";
import { useAccessControl } from "./AccessControlContext";

const RoleBasedComponent = ({ allowedRoles, children }) => {
  const { userRole } = useAccessControl();

  // Check if the current user role is in the list of allowed roles
  if (allowedRoles.includes(userRole)) {
    return <>{children}</>; // Render children if the role matches
  }

  return null; // Render nothing if the role does not match
};

export default RoleBasedComponent;
