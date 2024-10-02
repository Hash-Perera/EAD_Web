/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

const ProductCard = ({ product, onUpdate, onDelete, onViewDetails }) => {
  return (
    <div className="col-md-3">
      <div className="card mb-5 shadow" style={{ position: "relative" }}>
        <img
          src={product.images[0]}
          className="img-fluid rounded-start border"
          alt={product.name}
          style={{
            maxHeight: "200px",
            minHeight: "200px",
            objectFit: "cover",
          }}
        />
        <div className="card-body">
          <h5 className="card-title font-weight-bold">
            {" "}
            <strong>{product.name}</strong>
          </h5>
          <p className="card-text text-muted">{product.description}</p>

          <p className="card-text">
            <strong>Price:</strong> ${product.price}
          </p>
          <p className="card-text">
            <strong>Stock Count:</strong> {product.stockCount}
          </p>

          <button
            onClick={() => onViewDetails(product)}
            className="btn btn-sm text-white btn-success"
          >
            View Details
          </button>
        </div>

        {/* <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            display: "flex",
            gap: "10px",
          }}
        >
          <button
            className="btn btn-warning btn-sm text-white"
            onClick={() => onUpdate(product)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger btn-sm text-white"
            onClick={() => onDelete(product.id)}
          >
            Delete
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default ProductCard;
