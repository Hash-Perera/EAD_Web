/* eslint-disable react/prop-types */
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// Default styles, but customizable with props
const CustomModal = ({
  title,
  subTitle,
  children,
  func_text,
  open,
  handleClose,
  func,
  buttons = true,
  width = 700, // Default width of 700px
  height = "90%", // Default height of 90%
  top = "50%",
  left = "50%",
}) => {
  // Customizable style based on passed props
  const style = {
    position: "absolute",
    top: top,
    left: left,
    transform: "translate(-50%, -50%)",
    width: width,
    height: height,
    overflowY: "auto",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          style={{ fontWeight: "bold" }}
        >
          {title}
        </Typography>
        <Typography
          id="modal-modal-description"
          style={{ marginBottom: "20px", color: "#6c757d" }}
        >
          {subTitle}
        </Typography>

        {/* Children content here */}
        {children}

        {/* Conditional rendering for buttons */}
        {buttons && (
          <div className="flex-row gap-6">
            <Button variant="contained" className="mt-3 me-2" onClick={func}>
              {func_text}
            </Button>
            <Button variant="outlined" className="mt-3" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default CustomModal;
