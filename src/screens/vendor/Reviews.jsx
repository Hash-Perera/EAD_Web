import React, { useState, useEffect } from "react";
import MainContent from "../../components/Basic/MainContent";
import { Card, Button, Table, Badge } from "react-bootstrap";
import CustomModal from "../../components/Basic/CustomModal";
import "bootstrap/dist/css/bootstrap.min.css";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import axiosInstance from "../../utils/axios";
import { getProductReviews, vendorRating } from "../../constants/BackendAPI";

const Reviews = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productData, setProductData] = useState([]);
  const [vendorRate, setVendorRating] = useState();
  const [open, setOpen] = useState(false);
  const handleShowFeedback = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  // Function to close the modal
  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  // Function to render star ratings based on the average rating
  // Function to render star ratings based on the average rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <StarIcon key={i} style={{ color: "#FFD700", marginRight: "3px" }} />
        ) : (
          <StarBorderIcon
            key={i}
            style={{ color: "#FFD700", marginRight: "3px" }}
          />
        )
      );
    }
    return stars;
  };

  /* fetching data  */
  const fetchData = async () => {
    try {
      await axiosInstance.get(getProductReviews).then((response) => {
        setProductData(response?.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchVendorRating = async () => {
    try {
      await axiosInstance.get(vendorRating).then((response) => {
        setVendorRating(response?.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchVendorRating();
  }, []);

  return (
    <>
      <MainContent>
        {vendorRate && (
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <Card className="mb-4 shadow-sm">
                  <Card.Body>
                    <Card.Title>
                      {" "}
                      {localStorage.getItem("userName")}{" "}
                    </Card.Title>
                    <Card.Text>
                      <strong>Average Rating: </strong>
                      {renderStars(vendorRate?.data)}
                      <span> ({vendorRate?.data?.toFixed(2)})</span>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        )}
        <div className="container">
          <div className="row">
            {productData?.data?.map((data) => (
              <div className="col-md-4" key={data.product.id}>
                <Card className="mb-4 shadow-sm">
                  <Card.Img
                    variant="top"
                    src={data.product.images[0]}
                    alt={data.product.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title>{data.product.name}</Card.Title>
                    <Card.Text>{data.product.description}</Card.Text>
                    <Card.Text>
                      <strong>Price:</strong> ${data.product.price.toFixed(2)}
                    </Card.Text>
                    <Card.Text>
                      <strong>Average Rating: </strong>
                      {renderStars(Math.round(data.averageRating))}
                      <span> ({data.averageRating.toFixed(2)})</span>
                    </Card.Text>
                    <Card.Text>
                      <Badge bg="info">{data.feedbacks.length} Feedbacks</Badge>
                    </Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => handleShowFeedback(data)}
                    >
                      View Feedback
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </MainContent>
      <CustomModal
        title={`${selectedProduct?.product.name} Feedbacks`}
        subTitle=""
        open={open}
        handleClose={handleClose}
      >
        {selectedProduct?.feedbacks.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Message</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {selectedProduct.feedbacks.map((feedback, index) => (
                <tr key={feedback.id}>
                  <td>{index + 1}</td>
                  <td>{feedback?.message}</td>
                  <td>{renderStars(feedback?.rating)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No feedback available for this product.</p>
        )}
      </CustomModal>
    </>
  );
};

export default Reviews;
