//! Write all backend API endpoints here
// const baseUrl = "http://localhost:5077/api";

export const loginAPI = "/User/login";
export const registerAPI = "/User/register";
export const getAllUser = "/User";
export const deleteUser = "/User/delete/{id}";
export const getCustomers = "/User/customers";
export const activeCustomers = "/User/activate/{id}";
export const resetPasswordAPI = "/User/reset-password";
export const sendOtpAPI = "/User/activate/{id}";
export const updateUser = "/User/{id}";

export const productCreate = "/Product/create";
export const productGetAll = "/Product";
export const productDelete = "/Inventory/delete/product/{id}";
export const productUpdate = "/Product/update/{id}";

export const masterDataRoles = "/MasterData/GetRoles";
export const masterDataCategories = "/MasterData/GetCategories";
export const masterDataSubCategories =
  "/MasterData/GetSubCategories/{categoryId}";
export const getProductReviews = "/Feedback/products/reviews";
export const vendorRating = "/Feedback/average/vendor";

export const orderGetAll = "/Order";
export const orderGetToCancel = "/Order/getCancell";
export const orderCancel = "/Order/cancel/{id}";

export const getCategoriesList = "/Category/categories";
export const categoryCreate = "/Category/categories/create";
export const categoryUpdate = "/Category/categories/update/{id}";
export const categoryDelete = "/Category/categories/delete/{id}";

export const subGetCategoriesList = "/Category/subcategories";
export const subGetCategoriesListByCategoryId =
  "/Category/subcategories/by-category/{categoryId}";
export const subCategoryCreate = "/Category/subcategories/create";
export const subCategoryUpdate = "/Category/subcategories/update/{id}";
export const subCategoryDelete = "/Category/subcategories/delete/{id}";
