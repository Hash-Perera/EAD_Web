export const getUserRole = () => {
  return localStorage.getItem("userRole");
};

export const getUserName = () => {
  return localStorage.getItem("userName");
};

export const getProfileImage = () => {
  return localStorage.getItem("profileImage");
};

export const getEmail = () => {
  return localStorage.getItem("email");
};

export const logout = () => {
  localStorage.removeItem("userName");
  localStorage.removeItem("userRole");
  localStorage.removeItem("authToken");
  localStorage.removeItem("profileImage");
  window.location.href = "/";
};
