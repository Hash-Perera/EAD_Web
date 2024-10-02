//! Write all backend API endpoints here
// const baseUrl = "http://localhost:5077/api";

export const loginAPI = "/User/login";
export const registerAPI = "/User/register";

export const productCreate = "/Product/create";

export const masterDataRoles = "/MasterData/GetRoles";
export const masterDataCategories = "/MasterData/GetCategories";
export const masterDataSubCategories =
  "/MasterData/GetSubCategories/{categoryId}";
export const getProductReviews = "/Feedback/products/reviews";
export const vendorRating = "/Feedback/average/vendor";
