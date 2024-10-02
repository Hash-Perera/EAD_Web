import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Badge from "react-bootstrap/Badge";
import MainContent from "../components/Basic/MainContent";
import axiosInstance from "../utils/axios";
import { useSnackbar } from "../components/context/CustomSnackbarContext";
import { FaBell } from "react-icons/fa";

function MyProductScreen() {
  const [productData, setProductData] = useState([]);
  const [stockCount, setStockCount] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [readNotifications, setReadNotifications] = useState({});
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/Inventory/vendor/");
        setProductData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [productData]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosInstance.get("/Notification/");
        console.log("Notifications:", response.data);
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
  }, [productData, readNotifications]);

  const handlestockUpdate = async (id) => {
    const newStockCount = stockCount[id] || 0;
    try {
      await axiosInstance.put(`/Inventory/stock/update/${id}`, {
        stockCount: newStockCount,
      });
      showSnackbar("Stock Updated Successfully", "success");
      setStockCount({ ...stockCount, [id]: "" });
    } catch (error) {
      console.error("Error updating stock:", error);
      showSnackbar("Error updating stock", "error");
    }
  };

  const handleNotificationClick = () => {
    setShowModal(!showModal);
  };

  const handleMarkAsRead = async (id) => {
    try {
      await axiosInstance.put(`/Notification/${id}`);
      setTimeout(() => {
        setReadNotifications({ ...readNotifications, [id]: true });
      }, 2000);
    } catch (error) {
      console.error("Error marking as read:", error);
      showSnackbar("Error marking as read", "error");
    }
  };

  return (
    <MainContent>
      <div>
        <div
          className="d-flex justify-content-between"
          style={{ marginBottom: "20px" }}
        >
          <h2>My Stock</h2>
          <Button onClick={handleNotificationClick} style={{ position: "relative" }}>
            <FaBell />
            {notifications.length > 0 && (
              <Badge
                pill
                bg="danger"
                style={{
                  position: "absolute",
                  top: "-5px",
                  right: "-5px",
                }}
              >
                {notifications.length}
              </Badge>
            )}
          </Button>
        </div>

        <Modal show={showModal} onHide={handleNotificationClick} centered>
          <Modal.Header closeButton>
            <Modal.Title>Notifications</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "8px",
                    marginBottom: "10px",
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <span style={{ fontWeight: "500", whiteSpace: "pre-line" }}>
                    {notification.message}
                  </span>
                  <Button
                    variant={
                      readNotifications[notification.id] ? "success" : "info"
                    }
                    style={{
                      transition: "all 0.3s ease",
                      borderRadius: "20px",
                    }}
                    onClick={() => handleMarkAsRead(notification.id)}
                  >
                    {readNotifications[notification.id]
                      ? "Read"
                      : "Mark as Read"}
                  </Button>
                </div>
              ))
            ) : (
              <p style={{ textAlign: "center" }}>No new notifications</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleNotificationClick}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Table responsive="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Sub Category Name</th>
              <th>Stock Count</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(productData).map(
              ([subcategoryName, products], index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      <Accordion>
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>{subcategoryName}</Accordion.Header>
                          <Accordion.Body>
                            {products.map((product) => (
                              <Card key={product.id}>
                                <Card.Body
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <div>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>{product.description}</Card.Text>
                                    <Card.Text>
                                      Price: {product.price}
                                    </Card.Text>

                                    <Card.Text>
                                      <b>Stock Count: {product.stockCount}</b>
                                    </Card.Text>
                                    <div
                                      style={{ display: "flex", gap: "10px" }}
                                    >
                                      <input
                                        type="number"
                                        placeholder="Update Stock"
                                        style={{
                                          borderRadius: "5px",
                                          padding: "5px",
                                        }}
                                        value={stockCount[product.id] || ""}
                                        onChange={(e) =>
                                          setStockCount({
                                            ...stockCount,
                                            [product.id]: e.target.value,
                                          })
                                        }
                                      />
                                      <Button
                                        variant="primary"
                                        onClick={() =>
                                          handlestockUpdate(product.id)
                                        }
                                      >
                                        Update
                                      </Button>
                                    </div>
                                  </div>

                                  <img
                                    src={product.images}
                                    alt={product.name}
                                    style={{
                                      maxWidth: "150px",
                                      maxHeight: "150px",
                                      objectFit: "cover",
                                      marginLeft: "10px",
                                    }}
                                  />
                                </Card.Body>
                              </Card>
                            ))}
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </td>
                    <td>
                      {products.reduce(
                        (acc, product) => acc + product.stockCount,
                        0
                      )}
                    </td>
                  </tr>
                </React.Fragment>
              )
            )}
          </tbody>
        </Table>
      </div>
    </MainContent>
  );
}

export default MyProductScreen;
