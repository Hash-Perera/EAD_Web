import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axios";
import MainContent from "../../components/Basic/MainContent";
import { Stack, Typography, Button, Select, MenuItem } from "@mui/material";
import CustomModal from "../../components/Basic/CustomModal";
import SubCategoryTable from "../../components/Basic/SubCategoryTable"; // Use your table component here
import {
  masterDataSubCategories,
  subCategoryCreate,
  subCategoryUpdate,
  subCategoryDelete,
  masterDataCategories,
  subGetCategoriesList,
  subGetCategoriesListByCategoryId,
} from "../../constants/BackendAPI";
import { useSnackbar } from "../../components/context/CustomSnackbarContext";
import Swal from "sweetalert2";
import Loader from "../../components/Basic/Loader";

const SubCategoryList = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]); // Main categories for the dropdown
  const [selectedCategory, setSelectedCategory] = useState(""); // Selected category filter
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { showSnackbar } = useSnackbar();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleOpen = () => {
    setFormData({ name: "", categoryId: "" });
    setSelectedSubCategory(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSubCategory(null);
    setIsEditing(false);
  };

  const [formData, setFormData] = useState({ name: "", categoryId: "" });
  const [errors, setErrors] = useState({ name: "", categoryId: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = { name: "", categoryId: "" };

    if (!formData.name) {
      newErrors.name = "Name is required.";
      valid = false;
    }

    if (!formData.categoryId) {
      newErrors.categoryId = "Category is required.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      setLoading(true);

      if (selectedSubCategory) {
        await axiosInstance
          .put(
            subCategoryUpdate.replace("{id}", selectedSubCategory.id),
            formData
          )
          .then((response) => {
            showSnackbar(
              "success",
              response.data.message || "Subcategory updated successfully!"
            );
            handleClose();
            getSubCategories();
          })
          .catch((error) => {
            showSnackbar(
              "error",
              error.response?.data?.message || "Subcategory update failed."
            );
          })
          .finally(() => setLoading(false));
      } else {
        console.log(formData);
        console.log(subCategoryCreate);
        await axiosInstance
          .post(subCategoryCreate, formData)
          .then((response) => {
            showSnackbar(
              "success",
              response.data.message || "Subcategory added successfully!"
            );
            handleClose();
            getSubCategories();
          })
          .catch((error) => {
            showSnackbar(
              "error",
              error.response?.data?.message || "Subcategory addition failed."
            );
          })
          .finally(() => setLoading(false));
      }
    }
  };

  const getSubCategories = async (categoryId = "") => {
    console.log(categoryId);
    setLoading(true);

    // Fix the placeholder name to match the actual placeholder in the URL
    const url = categoryId
      ? subGetCategoriesListByCategoryId.replace("{categoryId}", categoryId) // Use {categoryId} instead of {id}
      : subGetCategoriesList;

    console.log(url);

    await axiosInstance
      .get(url)
      .then((response) => {
        console.log(response.data.data);
        setSubCategories(response.data.data);
        setTotalPages(Math.ceil(response.data.data.length / 10)); // Set total pages based on subcategory count
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
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

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosInstance
          .delete(subCategoryDelete.replace("{id}", id))
          .then((response) => {
            showSnackbar(
              "success",
              response.data.message || "Subcategory deleted successfully!"
            );
            getSubCategories(selectedCategory);
          })
          .catch((error) => {
            showSnackbar(
              "error",
              error.response?.data?.message || "Subcategory deletion failed."
            );
          });
      }
    });
  };

  const enableEdit = (subCategory) => {
    setIsEditing(true);
    setSelectedSubCategory(subCategory);
    setFormData({ name: subCategory.name, categoryId: subCategory.categoryId });
    setOpen(true);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCategoryFilterChange = (event) => {
    setSelectedCategory(event.target.value);
    getSubCategories(event.target.value); // Fetch filtered subcategories
  };

  useEffect(() => {
    getCategories();
    getSubCategories();
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
            Subcategory List
          </Typography>
          <Button variant="contained" className="mt-3" onClick={handleOpen}>
            Add Subcategory
          </Button>
        </Stack>

        {/* Filter Dropdown */}
        <Select
          value={selectedCategory}
          onChange={handleCategoryFilterChange}
          displayEmpty
          fullWidth
          sx={{ mb: 3 }}
        >
          <MenuItem value="">
            <em>All Categories</em>
          </MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>

        {/* Subcategory Table */}
        <SubCategoryTable
          subCategories={subCategories.slice(
            (currentPage - 1) * 10,
            currentPage * 10
          )} // Paginate the subcategories
          onEdit={enableEdit}
          onDelete={handleDelete}
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />

        {/* Modal for Adding/Editing Subcategories */}
        <CustomModal
          title={
            selectedSubCategory
              ? isEditing
                ? "Edit Subcategory"
                : "View Subcategory Details"
              : "Add Subcategory"
          }
          subTitle={
            selectedSubCategory
              ? isEditing
                ? "Update the subcategory details"
                : "Subcategory details"
              : "Add a new subcategory"
          }
          open={open}
          handleClose={handleClose}
          func_text={
            selectedSubCategory
              ? isEditing
                ? "Save Changes"
                : "Edit Subcategory"
              : "Add Subcategory"
          }
          func={handleSubmit}
          isEdit={isEditing || !selectedSubCategory}
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
                disabled={!isEditing && selectedSubCategory}
              />
              {errors.name && (
                <div className="text-danger mt-1">{errors.name}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="categoryId" className="form-label">
                Category
              </label>
              <select
                className="form-control"
                id="categoryId"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                disabled={!isEditing && selectedSubCategory}
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <div className="text-danger mt-1">{errors.categoryId}</div>
              )}
            </div>
          </form>
        </CustomModal>
      </MainContent>
    </>
  );
};

export default SubCategoryList;
