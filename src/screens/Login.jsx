import React, { useState } from "react";
import { loginAPI } from "../constants/BackendAPI.js";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../components/context/CustomSnackbarContext.jsx";
import axiosInstance from "../utils/axios.js";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  //! Submit Form Functions
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // State to store error messages
  const [errors, setErrors] = useState({
    email: "",
    password: "",
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

  // Function to validate the form inputs
  const validateForm = () => {
    let valid = true;
    let newErrors = { email: "", password: "" };

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
      newErrors.password = "Password is required.";
      valid = false;
    } else if (formData.password.length < 3) {
      newErrors.password = "Password must be at least 6 characters.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    if (validateForm()) {
      setLoading(true);

      await axiosInstance
        .post(loginAPI, formData)
        .then((response) => {
          localStorage.setItem("userRole", response.data.data.role);
          localStorage.setItem("authToken", response.data.data.token);
          localStorage.setItem("userName", response.data.data.name);
          showSnackbar("success", response.data.message || "Login successful!");
          navigate("/dashboard/home");
        })
        .catch((error) => {
          console.log(error);
          showSnackbar(
            "error",
            error.response?.data?.message || "Login failed. Please try again."
          );
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  //! Rendering............................................................

  return (
    <div
      className="bg-light py-3 py-md-5"
      style={{ minHeight: "100vh", display: "flex", alignItems: "center" }}
    >
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-12 col-md-11 col-lg-8 col-xl-7 col-xxl-6">
            <div className="bg-white p-4 p-md-5 rounded shadow-sm">
              <div className="row">
                <div className="col-12">
                  <div className="mb-5">
                    <h3>Log in</h3>
                  </div>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row gy-3 gy-md-4 overflow-hidden">
                  <div className="col-12">
                    <label htmlFor="email" className="form-label">
                      Email <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      id="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <div className="text-danger mt-1">{errors.email}</div>
                    )}
                  </div>
                  <div className="col-12">
                    <label htmlFor="password" className="form-label">
                      Password <span className="text-danger">*</span>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    {errors.password && (
                      <div className="text-danger mt-1">{errors.password}</div>
                    )}
                  </div>

                  <div className="col-12">
                    <div className="d-grid">
                      <LoadingButton
                        loading={loading}
                        loadingPosition="end"
                        startIcon={<SaveIcon />}
                        variant="contained"
                        type="submit"
                      >
                        Login
                      </LoadingButton>
                    </div>
                  </div>
                </div>
              </form>
              <div className="row">
                <div className="col-12">
                  <hr className="mt-5 mb-4 border-secondary-subtle" />
                  <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-end">
                    <a
                      href="#!"
                      className="link-secondary text-decoration-none"
                    >
                      Forgot password
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
