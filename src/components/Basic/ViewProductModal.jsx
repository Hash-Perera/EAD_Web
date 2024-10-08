/* eslint-disable react/prop-types */
import CustomModal from "./CustomModal";
import ImageCarousel from "./ImageCarousal";
import Modal from "@mui/material/Modal";

const ViewProductModal = ({
  open,
  handleClose,
  product,
  onDelete,
  onUpdate,
}) => {
  console.log(product);

  return (
    <>
      {product && (
        <CustomModal
          title="View Product Details"
          open={open}
          handleClose={handleClose}
          isEdit={false} // Disable form inputs for viewing only
          buttons={false} // Disable action buttons
        >
          <div className="view-product-modal">
            {/* Product Image Carousel at the Top */}
            {product.images && product.images.length > 0 && (
              <div className="product-image-section mb-3">
                <ImageCarousel images={product.images} />
              </div>
            )}

            {/* Product Details Section */}
            <div className="product-details-section mb-4">
              <h5 className="product-name mb-3">{product.name}</h5>

              <p className="product-description mb-4">{product.description}</p>

              <div className="row product-info-grid">
                <div className="col-md-6 mb-3">
                  <h6>
                    <strong> Category</strong>
                  </h6>
                  <p>{product.category}</p>
                </div>

                <div className="col-md-6 mb-3">
                  <h6>
                    <strong>Sub Category</strong>
                  </h6>
                  <p>{product.subCategory}</p>
                </div>

                <div className="col-md-6 mb-3">
                  <h6>
                    <strong>Price</strong>
                  </h6>
                  <p>${product.price}</p>
                </div>

                <div className="col-md-6 mb-3">
                  <h6>
                    {" "}
                    <strong> Stock Count</strong>
                  </h6>
                  <p>{product.stockCount}</p>
                </div>
              </div>
            </div>

            <div className="product-actions">
              <button
                onClick={() => onUpdate(product)}
                className="btn btn-warning text-white"
              >
                Edit Product
              </button>
              <button
                onClick={() => onDelete(product.id)}
                className="btn btn-danger text-white mx-2"
              >
                Delete Product
              </button>

              <button
                onClick={handleClose}
                type="button"
                className="btn btn-outline-primary"
              >
                Cancel
              </button>
            </div>
          </div>
        </CustomModal>
      )}
    </>
  );
};

export default ViewProductModal;
