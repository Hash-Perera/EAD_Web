import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Close";

const FileUploader = ({
  onUploadComplete,
  buttonText = "Upload Files",
  initialImages = [],
}) => {
  const [previews, setPreviews] = useState([]); // Previews of selected images
  const [uploadedUrls, setUploadedUrls] = useState([]); // URLs of uploaded images

  // Populate previews and URLs with initial images if provided
  useEffect(() => {
    if (initialImages && initialImages.length > 0) {
      const initialPreviews = initialImages.map((url) => ({ url }));
      setPreviews(initialPreviews);
      setUploadedUrls(initialImages);
    }
  }, [initialImages]);

  // Handle file selection and upload
  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files);

    // Create image previews
    const filePreviews = files.map((file) => ({
      url: URL.createObjectURL(file),
      file, // Store the original file for upload
    }));
    setPreviews((prev) => [...prev, ...filePreviews]);

    // Upload each file immediately
    for (let file of files) {
      await uploadFile(file);
    }
  };

  // Function to upload a single file to Cloudinary
  const uploadFile = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "EAD_Upload");
    data.append("cloud_name", "de5srjmat");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/de5srjmat/image/upload",
        data
      );
      const newUrl = response.data.url;
      setUploadedUrls((prev) => [...prev, newUrl]); // Add the uploaded URL to the list
      if (onUploadComplete) {
        onUploadComplete([...uploadedUrls, newUrl]);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  // Function to remove an uploaded image
  const handleRemoveImage = (index) => {
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setPreviews(updatedPreviews);

    const updatedUrls = uploadedUrls.filter((_, i) => i !== index);
    setUploadedUrls(updatedUrls);

    // Pass the updated URLs to the parent component
    if (onUploadComplete) {
      onUploadComplete(updatedUrls);
    }
  };

  return (
    <Box className="file-uploader" sx={{ mt: 2 }}>
      {/* Hidden file input */}
      <input
        type="file"
        id="file-input"
        multiple
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {/* MUI Button to trigger file input */}
      <Button
        variant="outlined"
        component="label"
        htmlFor="file-input"
        size="small"
        sx={{ mb: 2 }}
      >
        {buttonText}
      </Button>

      {/* Display image previews */}
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        {previews.map((preview, index) => (
          <Box
            key={index}
            sx={{
              position: "relative",
              width: 50,
              height: 50,
              overflow: "hidden",
              borderRadius: 1,
              border: "1px solid #ddd",
            }}
          >
            <img
              src={preview.url}
              alt="preview"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <IconButton
              onClick={() => handleRemoveImage(index)}
              size="small"
              sx={{
                position: "absolute",
                top: -8,
                right: -8,
                background: "rgba(255, 255, 255, 0.7)",
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default FileUploader;
