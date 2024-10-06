//! Write all backend API endpoints here
// const baseUrl = "http://localhost:5077/api";

export const loginAPI = "/User/login";
export const registerAPI = "/User/register";
export const getAllUser = "/User";
export const deleteUser = "/User/delete/{id}";
export const getCustomers = "/User/customers";
export const activeCustomers = "/User/activate/{id}";

export const productCreate = "/Product/create";
export const productGetAll = "/Product";
export const productDelete = "/Product/delete/{id}";
export const productUpdate = "/Product/update/{id}";

export const masterDataRoles = "/MasterData/GetRoles";
export const masterDataCategories = "/MasterData/GetCategories";
export const masterDataSubCategories =
  "/MasterData/GetSubCategories/{categoryId}";
export const getProductReviews = "/Feedback/products/reviews";
export const vendorRating = "/Feedback/average/vendor";

export const orderGetAll = "/Order";