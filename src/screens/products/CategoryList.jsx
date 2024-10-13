import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axios";
import MainContent from "../../components/Basic/MainContent";
import { Stack, Typography, Button } from "@mui/material";
import CustomModal from "../../components/Basic/CustomModal";
import CategoryTable from "../../components/Basic/CategoryTable"; // Use your table component here
import {
  masterDataCategories,
  categoryCreate,
  categoryUpdate,
  categoryDelete,
} from "../../constants/BackendAPI";
import { useSnackbar } from "../../components/context/CustomSnackbarContext";
import Swal from "sweetalert2";
import Loader from "../../components/Basic/Loader";

const CategoryList = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { showSnackbar } = useSnackbar();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleOpen = () => {
    setFormData({ name: "" });
    setSelectedCategory(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCategory(null);
    setIsEditing(false);
  };

  const [formData, setFormData] = useState({ name: "" });
  const [errors, setErrors] = useState({ name: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = { name: "" };

    if (!formData.name) {
      newErrors.name = "Name is required.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      setLoading(true);

      if (selectedCategory) {
        await axiosInstance
          .put(categoryUpdate.replace("{id}", selectedCategory.id), formData)
          .then((response) => {
            showSnackbar(
              "success",
              response.data.message || "Category updated successfully!"
            );
            handleClose();
            getCategories();
          })
          .catch((error) => {
            showSnackbar(
              "error",
              error.response?.data?.message || "Category update failed."
            );
          })
          .finally(() => setLoading(false));
      } else {
        await axiosInstance
          .post(categoryCreate, formData)
          .then((response) => {
            showSnackbar(
              "success",
              response.data.message || "Category added successfully!"
            );
            handleClose();
            getCategories();
          })
          .catch((error) => {
            showSnackbar(
              "error",
              error.response?.data?.message || "Category addition failed."
            );
          })
          .finally(() => setLoading(false));
      }
    }
  };

  const getCategories = async () => {
    setLoading(true);
    await axiosInstance
      .get(masterDataCategories)
      .then((response) => {
        setCategories(response.data);
        setTotalPages(Math.ceil(response.data.length / 5)); // Set total pages based on category count
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
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
        console.log(id);
        await axiosInstance
          .delete(categoryDelete.replace("{id}", id))
          .then((response) => {
            showSnackbar(
              "success",
              response.data.message || "Category deleted successfully!"
            );
            getCategories();
          })
          .catch((error) => {
            showSnackbar(
              "error",
              error.response?.data?.message || "Category deletion failed."
            );
          });
      }
    });
  };

  const enableEdit = (category) => {
    setIsEditing(true);
    setSelectedCategory(category);
    setFormData({ name: category.name });
    setOpen(true);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    getCategories();
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
            Category List
          </Typography>
          <Button variant="contained" className="mt-3" onClick={handleOpen}>
            Add Category
          </Button>
        </Stack>

        {/* Category Table */}
        <CategoryTable
          categories={categories.slice(
            (currentPage - 1) * 10,
            currentPage * 10
          )} // Paginate the categories
          onEdit={enableEdit}
          onDelete={handleDelete}
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />

        {/* Modal for Adding/Editing Categories */}
        <CustomModal
          title={
            selectedCategory
              ? isEditing
                ? "Edit Category"
                : "View Category Details"
              : "Add Category"
          }
          subTitle={
            selectedCategory
              ? isEditing
                ? "Update the category details"
                : "Category details"
              : "Add a new category"
          }
          open={open}
          handleClose={handleClose}
          func_text={
            selectedCategory
              ? isEditing
                ? "Save Changes"
                : "Edit Category"
              : "Add Category"
          }
          func={handleSubmit}
          isEdit={isEditing || !selectedCategory}
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
                disabled={!isEditing && selectedCategory}
              />
              {errors.name && (
                <div className="text-danger mt-1">{errors.name}</div>
              )}
            </div>
          </form>
        </CustomModal>
      </MainContent>
    </>
  );
};

export default CategoryList;
