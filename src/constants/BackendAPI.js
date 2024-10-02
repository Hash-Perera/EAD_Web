//! Write all backend API endpoints here
// const baseUrl = "http://localhost:5077/api";

export const loginAPI = "/User/login";
export const registerAPI = "/User/register";
export const getAllUser = "/User";
export const deleteUser = "/User/delete/{id}";

export const productCreate = "/Product/create";
export const productGetAll = "/Product";
export const productDelete = "/Product/delete/{id}";
export const productUpdate = "/Product/update/{id}";

export const masterDataRoles = "/MasterData/GetRoles";
export const masterDataCategories = "/MasterData/GetCategories";
export const masterDataSubCategories =
  "/MasterData/GetSubCategories/{categoryId}";
