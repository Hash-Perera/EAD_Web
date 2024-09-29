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
} from "../../constants/BackendAPI";
import { useSnackbar } from "../../components/context/CustomSnackbarContext";

const ProductList = () => {
  const [open, setOpen] = React.useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const { showSnackbar } = useSnackbar();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  const [loading, setLoading] = useState(false); // state for managing loading

  // Function to handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
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
      setLoading(true);
      await axiosInstance
        .post(productCreate, formData)
        .then((response) => {
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
        });

      setLoading(false);
    }
  };

  const handleUploadComplete = (uploadedFiles) => {
    formData.images = uploadedFiles;
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
    setSubCategories([]);
    await axiosInstance
      .get(masterDataSubCategories.replace("{categoryId}", categoryId))
      .then((response) => {
        setSubCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <MainContent>
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

        <CustomModal
          title="Add Product"
          subTitle="Add your product details"
          open={open}
          handleClose={handleClose}
          func_text="Add"
          func={handleSubmit}
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
              />
              {errors.stockCount && (
                <div className="text-danger mt-1">{errors.stockCount}</div>
              )}
            </div>

            <FileUploader
              onUploadComplete={handleUploadComplete}
              buttonText="Upload Product Images"
            />
          </form>
        </CustomModal>
      </MainContent>
    </>
  );
};

export default ProductList;
