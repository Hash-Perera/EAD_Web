// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import LoadingButton from "@mui/lab/LoadingButton";
// import SaveIcon from "@mui/icons-material/Save";
// import { useSnackbar } from "../components/context/CustomSnackbarContext.jsx";
// import axiosInstance from "../utils/axios.js";
// import {
//   loginAPI,
//   resetPasswordAPI,
//   sendOtpAPI,
// } from "../constants/BackendAPI.js"; // Assuming resetPasswordAPI and sendOtpAPI are defined in your constants

// const ResetPassword = () => {
//   const [loading, setLoading] = useState(false);
//   const [otpSent, setOtpSent] = useState(false); // Tracks if OTP has been sent
//   const navigate = useNavigate();
//   const { showSnackbar } = useSnackbar();

//   // Form state management
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     confirmPassword: "",
//     otp: "",
//   });

//   // State to store error messages
//   const [errors, setErrors] = useState({
//     email: "",
//     password: "",
//     confirmPassword: "",
//     otp: "",
//   });

//   // Function to handle input changes
//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });

//     // Clear the error message when the user starts typing
//     setErrors({
//       ...errors,
//       [name]: "",
//     });
//   };

//   // Function to validate the form inputs
//   const validateEmail = () => {
//     let valid = true;
//     let newErrors = { email: "" };

//     // Email validation
//     if (!formData.email) {
//       newErrors.email = "Email is required.";
//       valid = false;
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = "Please enter a valid email address.";
//       valid = false;
//     }

//     setErrors(newErrors);
//     return valid;
//   };

//   const validateResetPasswordForm = () => {
//     let valid = true;
//     let newErrors = { password: "", confirmPassword: "", otp: "" };

//     // Password validation
//     if (!formData.password) {
//       newErrors.password = "Password is required.";
//       valid = false;
//     } else if (formData.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters.";
//       valid = false;
//     }

//     // Confirm Password validation
//     if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match.";
//       valid = false;
//     }

//     // OTP validation
//     if (!formData.otp) {
//       newErrors.otp = "OTP is required.";
//       valid = false;
//     }

//     setErrors(newErrors);
//     return valid;
//   };

//   // Function to handle sending OTP
//   const handleSendOtp = async (event) => {
//     event.preventDefault();
//     if (validateEmail()) {
//       setLoading(true);
//       setOtpSent(true);
//       showSnackbar("success", "OTP sent to your email.");
//       setLoading(false);
//       //   await axiosInstance
//       //     .post(sendOtpAPI, { email: formData.email })
//       //     .then(() => {
//       //       showSnackbar("success", "OTP sent to your email.");
//       //       setOtpSent(true);
//       //     })
//       //     .catch((error) => {
//       //       showSnackbar(
//       //         "error",
//       //         error.response?.data?.message ||
//       //           "Failed to send OTP. Please try again."
//       //       );
//       //     })
//       //     .finally(() => {
//       //       setLoading(false);
//       //     });
//     }
//   };

//   const handleResetPassword = async (event) => {
//     event.preventDefault();
//     if (validateResetPasswordForm()) {
//       setLoading(true);

//       await axiosInstance
//         .post(resetPasswordAPI, {
//           email: formData.email,
//           password: formData.password,
//           otp: formData.otp,
//         })
//         .then(() => {
//           showSnackbar("success", "Password reset successfully!");
//           navigate("/login");
//         })
//         .catch((error) => {
//           showSnackbar(
//             "error",
//             error.response?.data?.message ||
//               "Password reset failed. Please try again."
//           );
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//     }
//   };

//   return (
//     <div
//       className="bg-light py-3 py-md-5"
//       style={{ minHeight: "100vh", display: "flex", alignItems: "center" }}
//     >
//       <div className="container">
//         <div className="row justify-content-md-center">
//           <div className="col-12 col-md-11 col-lg-8 col-xl-7 col-xxl-6">
//             <div className="bg-white p-4 p-md-5 rounded shadow-sm">
//               <div className="row">
//                 <div className="col-12">
//                   <div className="mb-5">
//                     <h3>Reset Password</h3>
//                   </div>
//                 </div>
//               </div>
//               <form onSubmit={otpSent ? handleResetPassword : handleSendOtp}>
//                 <div className="row gy-3 gy-md-4 overflow-hidden">
//                   <div className="col-12">
//                     <label htmlFor="email" className="form-label">
//                       Email <span className="text-danger">*</span>
//                     </label>
//                     <input
//                       type="email"
//                       className="form-control"
//                       name="email"
//                       id="email"
//                       placeholder="name@example.com"
//                       value={formData.email}
//                       onChange={handleChange}
//                       disabled={otpSent} // Disable email field after OTP is sent
//                     />
//                     {errors.email && (
//                       <div className="text-danger mt-1">{errors.email}</div>
//                     )}
//                   </div>

//                   {otpSent && (
//                     <>
//                       {/* OTP field */}
//                       <div className="col-12">
//                         <label htmlFor="otp" className="form-label">
//                           OTP <span className="text-danger">*</span>
//                         </label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           name="otp"
//                           id="otp"
//                           value={formData.otp}
//                           onChange={handleChange}
//                         />
//                         {errors.otp && (
//                           <div className="text-danger mt-1">{errors.otp}</div>
//                         )}
//                       </div>

//                       {/* New Password field */}
//                       <div className="col-12">
//                         <label htmlFor="password" className="form-label">
//                           New Password <span className="text-danger">*</span>
//                         </label>
//                         <input
//                           type="password"
//                           className="form-control"
//                           name="password"
//                           id="password"
//                           value={formData.password}
//                           onChange={handleChange}
//                         />
//                         {errors.password && (
//                           <div className="text-danger mt-1">
//                             {errors.password}
//                           </div>
//                         )}
//                       </div>

//                       {/* Confirm Password field */}
//                       <div className="col-12">
//                         <label htmlFor="confirmPassword" className="form-label">
//                           Confirm Password{" "}
//                           <span className="text-danger">*</span>
//                         </label>
//                         <input
//                           type="password"
//                           className="form-control"
//                           name="confirmPassword"
//                           id="confirmPassword"
//                           value={formData.confirmPassword}
//                           onChange={handleChange}
//                         />
//                         {errors.confirmPassword && (
//                           <div className="text-danger mt-1">
//                             {errors.confirmPassword}
//                           </div>
//                         )}
//                       </div>
//                     </>
//                   )}

//                   <div className="col-12">
//                     <div className="d-grid">
//                       <LoadingButton
//                         loading={loading}
//                         loadingPosition="start"
//                         startIcon={<SaveIcon />}
//                         variant="contained"
//                         type="submit"
//                       >
//                         {otpSent ? "Reset Password" : "Send OTP"}
//                       </LoadingButton>
//                     </div>
//                   </div>
//                 </div>
//               </form>
//               <div className="row">
//                 <div className="col-12">
//                   <hr className="mt-5 mb-4 border-secondary-subtle" />
//                   <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-end">
//                     <a href="/" className="link-secondary text-decoration-none">
//                       Login
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { useSnackbar } from "../components/context/CustomSnackbarContext.jsx";
import axiosInstance from "../utils/axios.js";
import { resetPasswordAPI } from "../constants/BackendAPI.js"; // Assuming resetPasswordAPI is defined

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  // Form state management
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // State to store error messages
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
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
    let newErrors = { email: "", password: "", confirmPassword: "" };

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
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      valid = false;
    }

    // Confirm Password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Function to handle form submission for resetting password
  const handleResetPassword = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      setLoading(true);

      await axiosInstance
        .post(resetPasswordAPI, {
          email: formData.email,
          password: formData.password,
        })
        .then(() => {
          showSnackbar("success", "Password reset successfully!");
          navigate("/");
        })
        .catch((error) => {
          showSnackbar(
            "error",
            error.response?.data?.message ||
              "Password reset failed. Please try again."
          );
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

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
                    <h3>Reset Password</h3>
                  </div>
                </div>
              </div>
              <form onSubmit={handleResetPassword}>
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

                  {/* New Password field */}
                  <div className="col-12">
                    <label htmlFor="password" className="form-label">
                      New Password <span className="text-danger">*</span>
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

                  {/* Confirm Password field */}
                  <div className="col-12">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirm Password <span className="text-danger">*</span>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name="confirmPassword"
                      id="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    {errors.confirmPassword && (
                      <div className="text-danger mt-1">
                        {errors.confirmPassword}
                      </div>
                    )}
                  </div>

                  <div className="col-12">
                    <div className="d-grid">
                      <LoadingButton
                        loading={loading}
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="contained"
                        type="submit"
                      >
                        Reset Password
                      </LoadingButton>
                    </div>
                  </div>
                </div>
              </form>
              <div className="row">
                <div className="col-12">
                  <hr className="mt-5 mb-4 border-secondary-subtle" />
                  <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-end">
                    <a href="/" className="link-secondary text-decoration-none">
                      Login
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

export default ResetPassword;
