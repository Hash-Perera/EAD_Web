import React from "react";
import Spinner from "react-bootstrap/Spinner";
import PropTypes from "prop-types"; // To enforce type-checking

function Loader({ loading }) {
  // Only render if loading is true
  if (!loading) {
    return null;
  }

  return (
    <div style={overlayStyle}>
      <div style={spinnerContainer}>
        <Spinner animation="grow" variant="light" style={spinnerStyle} />
        <Spinner animation="grow" variant="light" style={spinnerStyle} />
        <Spinner animation="grow" variant="light" style={spinnerStyle} />
      </div>
    </div>
  );
}

// PropType validation
Loader.propTypes = {
  loading: PropTypes.bool.isRequired,
};

// Styles for overlay and spinner
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
};

const spinnerContainer = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const spinnerStyle = {
  width: "1.5rem",
  height: "1.5rem",
};

export default Loader;
