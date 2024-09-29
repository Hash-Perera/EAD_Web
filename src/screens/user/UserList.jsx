import React from "react";
import { useState, useEffect } from "react";
import MainContent from "../../components/Basic/MainContent";
import { Button, Stack, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import CustomModal from "../../components/Basic/CustomModal";
import { masterDataRoles, registerAPI } from "../../constants/BackendAPI";
import axiosInstance from "../../utils/axios";
import { useSnackbar } from "../../components/context/CustomSnackbarContext";
import FileUploader from "../../components/Basic/FileUploader";

const UserList = () => {
  const [open, setOpen] = React.useState(false);
  const [userRoles, setUserRoles] = useState([]);
  const { showSnackbar } = useSnackbar();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [loading, setLoading] = useState(false);

  //! Submit Form Functions
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

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
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
    };

    // Name validation
    if (!formData.name) {
      newErrors.name = "Name is required.";
      valid = false;
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required.";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Temporary Password is required.";
      valid = false;
    } else if (formData.password.length < 3) {
      newErrors.password = "Password must be at least 6 characters.";
      valid = false;
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your temporary password.";
      valid = false;
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match.";
      valid = false;
    }

    // Role validation
    if (!formData.role) {
      newErrors.role = "Role is required.";
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
        .post(registerAPI, formData)
        .then((response) => {
          showSnackbar(
            "success",
            response.data.message || "User added successfully!"
          );
          handleClose();
        })
        .catch((error) => {
          console.log(error);
          showSnackbar(
            "error",
            error.response?.data?.message ||
              "User addition failed. Please try again."
          );
        });

      setLoading(false);
    }
  };

  const handleUploadComplete = (uploadedFiles) => {
    console.log("Uploaded files:", uploadedFiles);
  };

  useEffect(() => {
    getUserRoles();
  }, []);

  //! get user roles
  const getUserRoles = async () => {
    await axiosInstance
      .get(masterDataRoles)
      .then((response) => {
        setUserRoles(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
            User List
          </Typography>
          <Button variant="contained" className="mt-3" onClick={handleOpen}>
            Add User
          </Button>
        </Stack>
        <Typography variant="body2" className="text-start">
          Add user list table here. Need Backend filter option with user rle and
          status. Need paginaion and search option. Need edit and delete and
          view details option.
        </Typography>

        <CustomModal
          title="Add User"
          subTitle="Add your user details"
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
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <div className="text-danger mt-1">{errors.email}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Temporary Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <div className="text-danger mt-1">{errors.password}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Temporary Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <div className="text-danger mt-1">{errors.confirmPassword}</div>
              )}
            </div>

            <FileUploader
              onUploadComplete={handleUploadComplete}
              buttonText="Profile Image"
            />

            <div className="mb-3">
              <label htmlFor="role" className="form-label">
                Role
              </label>
              <select
                className="form-control"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="">Select Role</option>
                {userRoles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
              {errors.role && (
                <div className="text-danger mt-1">{errors.role}</div>
              )}
            </div>
          </form>
        </CustomModal>
      </MainContent>
    </>
  );
};

export default UserList;
