import React from "react";
import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axios";
import MainContent from "../../components/Basic/MainContent";
import { Stack, Typography, Button } from "@mui/material";
import CustomModal from "../../components/Basic/CustomModal";
import FileUploader from "../../components/Basic/FileUploader";
import {
  masterDataCategories,
  productCreate,
  masterDataSubCategories,
  productGetAll,
  productDelete,
  productUpdate,
} from "../../constants/BackendAPI";
import { useSnackbar } from "../../components/context/CustomSnackbarContext";
import ProductCard from "../../components/Basic/ProductCard";
import ImageCarousel from "../../components/Basic/ImageCarousal";
import ViewProductModal from "../../components/Basic/ViewProductModal";
import Swal from "sweetalert2";
import Loader from "../../components/Basic/Loader";

const ProductList = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const { showSnackbar } = useSnackbar();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [productViewModal, setProductViewModal] = useState(false);

  const handleOpen = () => {
    setFormData({
      name: "",
      description: "",
      category: "",
      subCategory: "",
      price: "",
      stockCount: "",
      images: [],
    });
    setSelectedProduct(null); // Clear selected product
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null); // Clear selected product
    setIsEditing(false); // Reset edit mode
  };

  const handleCloseViewModal = () => {
    setProductViewModal(false);
    setSelectedProduct(null); // Clear selected product
    setIsEditing(false); // Reset edit mode
  };

  //! Submit Form Functions
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    subCategory: "",
    price: "",
    stockCount: "",
    images: [],
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    category: "",
    subCategory: "",
    price: "",
    stockCount: "",
  });

  // Function to handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear the error message when the user starts typing
    setErrors({
      ...errors,
      [name]: "",
    });

    if (name === "category" && value) {
      getSubCategories(value);
    }
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = {
      name: "",
      description: "",
      category: "",
      subCategory: "",
      price: "",
      stockCount: "",
    };

    // Name validation
    if (!formData.name) {
      newErrors.name = "Name is required.";
      valid = false;
    }

    // Description validation
    if (!formData.description) {
      newErrors.description = "Description is required.";
      valid = false;
    }

    // Category validation
    if (!formData.category) {
      newErrors.category = "Category is required.";
      valid = false;
    }

    // Sub Category validation
    if (!formData.subCategory) {
      newErrors.subCategory = "Sub Category is required.";
      valid = false;
    }

    // Price validation
    if (!formData.price) {
      newErrors.price = "Price is required.";
      valid = false;
    } else if (isNaN(formData.price) || formData.price <= 0) {
      newErrors.price = "Price must be a positive number.";
      valid = false;
    }

    // Stock Count validation
    if (!formData.stockCount) {
      newErrors.stockCount = "Stock count is required.";
      valid = false;
    } else if (isNaN(formData.stockCount) || formData.stockCount < 0) {
      newErrors.stockCount = "Stock count must be a non-negative number.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      // setLoading(true);

      if (selectedProduct) {
        await axiosInstance
          .put(productUpdate.replace("{id}", selectedProduct.id), formData)
          .then((response) => {
            showSnackbar(
              "success",
              response.data.message || "Product updated successfully!"
            );
            handleClose();
            getProducts();
          })
          .catch((error) => {
            showSnackbar(
              "error",
              error.response?.data?.message || "Product update failed."
            );
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        await axiosInstance
          .post(productCreate, formData)
          .then((response) => {
            getProducts();
            showSnackbar(
              "success",
              response.data.message || "Product added successfully!"
            );
            handleClose();
            setFormData({
              name: "",
              description: "",
              category: "",
              subCategory: "",
              price: "",
              stockCount: "",
              images: [],
            });
          })
          .catch((error) => {
            console.log(error);
            showSnackbar(
              "error",
              error.response?.data?.message ||
                "Product addition failed. Please try again."
            );
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  };

  const handleUploadComplete = (uploadedFiles) => {
    const event = {
      target: {
        name: "images",
        value: uploadedFiles,
      },
    };
    handleChange(event);
  };

  const getCategories = async () => {
    await axiosInstance
      .get(masterDataCategories)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getSubCategories = async (categoryId) => {
    setLoading(true);
    setSubCategories([]);
    await axiosInstance
      .get(masterDataSubCategories.replace("{categoryId}", categoryId))
      .then((response) => {
        setSubCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getProducts = async () => {
    setLoading(true);
    await axiosInstance
      .get(productGetAll)
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // delete product
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes !",
    }).then(async (result) => {
      console.log(id);
      await axiosInstance
        .delete(productDelete.replace("{id}", id))
        .then((response) => {
          showSnackbar(
            "success",
            response.data.message || "Product Deleted successfully!"
          );
          getProducts();
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
          showSnackbar(
            "error",
            error.response?.data?.message ||
              "Product deletion failed. Please try again."
          );
        });

      // await axiosInstance
      //   .get(activeCustomers.replace("{id}", id))
      //   .then((response) => {
      //     getUserList();
      //     if (result.isConfirmed) {
      //       Swal.fire({
      //         title: "Done!",
      //         text: response.data.message,
      //         icon: "success",
      //       });
      //     }
      //   })
      //   .error((error) => {
      //     if (result.isConfirmed) {
      //       Swal.fire({
      //         title: "Error !",
      //         text: error.message,
      //         icon: "fail",
      //       });
      //     }
      //   });
    });
  };

  // Open the modal to view/edit product details
  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      category: product.category,
      subCategory: product.subCategory,
      price: product.price,
      stockCount: product.stockCount,
      images: product.images || [],
    });
    setIsEditing(false); // View mode initially
    setProductViewModal(true);
  };

  // Enable edit mode
  const enableEdit = (product) => {
    setIsEditing(true);

    setSelectedProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      category: product.category,
      subCategory: product.subCategory,
      price: product.price,
      stockCount: product.stockCount,
      images: product.images || [],
    });
    setOpen(true);
  };

  useEffect(() => {
    getCategories();
    getProducts();
  }, []);

  return (
    <>
      <MainContent>
        <Loader loading={loading} />
        <Stack
          direction="row"
          spacing={2}
          alignItems={"center"}
          justifyContent={"space-between"}
          marginBottom={2}
        >
          <Typography variant="h6" className="text-start mt-3 mb-2">
            Product List
          </Typography>
          <Button variant="contained" className="mt-3" onClick={handleOpen}>
            Add Product
          </Button>
        </Stack>
        <div className="row">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={handleDelete}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
        <CustomModal
          title={
            selectedProduct
              ? isEditing
                ? "Edit Product"
                : "View Product Details"
              : "Add Product"
          }
          subTitle={
            selectedProduct
              ? isEditing
                ? "Update your product details"
                : "Product details"
              : "Add your product details"
          }
          open={open}
          handleClose={handleClose}
          func_text={
            selectedProduct
              ? isEditing
                ? "Save Changes"
                : "Edit Product"
              : "Add Product"
          }
          func={handleSubmit}
          isEdit={isEditing || !selectedProduct} // Enable form inputs for adding or editing
          onEdit={enableEdit} // Allow switching to edit mode
          loading={loading}
        >
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing && selectedProduct} // Disable in view mode
              />
              {errors.name && (
                <div className="text-danger mt-1">{errors.name}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                disabled={!isEditing && selectedProduct} // Disable in view mode
              />
              {errors.description && (
                <div className="text-danger mt-1">{errors.description}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <select
                className="form-control"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                disabled={!isEditing && selectedProduct} // Disable in view mode
              >
                <option value="">Select category</option>
                {categories &&
                  categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
              </select>
              {errors.category && (
                <div className="text-danger mt-1">{errors.category}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="subCategory" className="form-label">
                Sub Category
              </label>
              <select
                className="form-control"
                id="subCategory"
                name="subCategory"
                value={formData.subCategory}
                onChange={handleChange}
                disabled={!isEditing && selectedProduct} // Disable in view mode
              >
                <option value="">Select sub category</option>
                {subCategories &&
                  subCategories.map((subCategory) => (
                    <option key={subCategory.id} value={subCategory.id}>
                      {subCategory.name}
                    </option>
                  ))}
              </select>
              {errors.subCategory && (
                <div className="text-danger mt-1">{errors.subCategory}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                disabled={!isEditing && selectedProduct} // Disable in view mode
              />
              {errors.price && (
                <div className="text-danger mt-1">{errors.price}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="stockCount" className="form-label">
                Stock Count
              </label>
              <input
                type="number"
                className="form-control"
                id="stockCount"
                name="stockCount"
                value={formData.stockCount}
                onChange={handleChange}
                disabled={!isEditing && selectedProduct} // Disable in view mode
              />
              {errors.stockCount && (
                <div className="text-danger mt-1">{errors.stockCount}</div>
              )}
            </div>

            <FileUploader
              onUploadComplete={handleUploadComplete}
              buttonText="Upload Product Images"
              initialImages={formData.images}
            />
          </form>
        </CustomModal>

        <ViewProductModal
          product={selectedProduct}
          onDelete={handleDelete}
          onUpdate={enableEdit}
          open={ViewProductModal}
          handleClose={handleCloseViewModal}
        />
      </MainContent>
    </>
  );
};

export default ProductList;
