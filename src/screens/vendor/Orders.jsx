import React, { useEffect, useState } from "react";
import MainContent from "../../components/Basic/MainContent";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axiosInstance from "../../utils/axios";
import { useSnackbar } from "../../components/context/CustomSnackbarContext";

const Orders = () => {
  const [open, setOpen] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [selectedOrderNo, setSelectedOrderNo] = useState(null);
  const [selectedOrderLine, setSelectedOrderLine] = useState(null);
  const [statusChanges, setStatusChanges] = useState({});
  const [orders, setOrders] = useState([]);
  const { showSnackbar } = useSnackbar();

  // Function to handle clicking an orderNo
  const handleOrderNoClick = (orderNo) => {
    setSelectedOrderNo(orderNo);
    setOpen(true);
  };

  // Filter order lines based on selected orderNo
  const filteredOrderLines =
    orders.find((order) => order.orderNo === selectedOrderNo)?.orderLines || [];

  const handleClose = () => setOpen(false);

  // Converting date to readable format
  function formatReadableDate(isoDateString) {
    const date = new Date(isoDateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  }

  // Handle the status change in the dropdown
  const handleStatusChange = (lineId, newStatus) => {
    setSelectedOrderLine(lineId); // Track the order line being changed
    setStatusChanges((prev) => ({ ...prev, [lineId]: newStatus }));
    setShowSaveModal(true);
  };

  // Confirm save changes modal
  const handleSaveChanges = async () => {
    if (!selectedOrderLine) {
      console.error("No selected order line to update");
      return;
    }

    console.log(
      "Saving changes for",
      selectedOrderLine,
      "with new status:",
      statusChanges[selectedOrderLine]
    );

    try {
      const response=await axiosInstance.put(
        `/orderLine/update/status/${selectedOrderLine}`,
        {
          status: statusChanges[selectedOrderLine],
        }
      );
      showSnackbar("success", response.data.message || "Status updated successfully!");

    } catch (error) {
      console.error("Error updating status:", error);
    }

    setShowSaveModal(false);
  };

  // Cancel the change in status
  const handleCancelChanges = () => {
    setShowSaveModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/Order/orders/");
        console.log("Orders:", response.data.data);
        setOrders(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <MainContent>
        <h1>Orders</h1>
        <div>
          <Table responsive="xl" className="overflow-x-auto">
            <thead>
              <tr>
                <th>#</th>
                <th>Order No</th>
                <th>Customer</th>
                <th>Delivery Address</th>
                <th>Order Date</th>
                <th>Comments</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order, index) => (
                <tr key={order?.orderNo}>
                  <td>{index + 1}</td>
                  <td>
                    <Button
                      variant="text"
                      className="cursor-pointer"
                      onClick={() => handleOrderNoClick(order?.orderNo)}
                    >
                      {order?.orderNo}
                    </Button>
                  </td>
                  <td>{order?.customerName}</td>
                  <td>{order?.deliveryAddress}</td>
                  <td>{formatReadableDate(order?.orderDate)}</td>
                  <td>{order?.comments}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </MainContent>

      <Modal show={open} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Order Lines for Order No: {selectedOrderNo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {filteredOrderLines?.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Qty</th>
                  <th>Unit Price</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrderLines?.map((line, index) => (
                  <tr key={line?.orderLineNo}>
                    <td>{index + 1}</td>
                    <td>{line?.productName}</td>
                    <td>{line?.qty}</td>
                    <td>{line?.unitPrice}</td>
                    <td>{line?.total}</td>
                    <td>
                      <Form.Select
                        value={statusChanges[line.orderLineNo] || line.status}
                        onChange={(e) =>
                          handleStatusChange(line.orderLineNo, e.target.value)
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </Form.Select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No order lines available for this order.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showSaveModal} onHide={handleCancelChanges}>
        <Modal.Header closeButton>
          <Modal.Title>Save Changes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="">
            <span>
              Are you sure you want to change the status of this order line to "
              {statusChanges[selectedOrderLine]}"?
            </span>
            {statusChanges[selectedOrderLine] === "Cancelled" && (
              <span>
                <span className="text-danger">Warning:</span> This action cannot
                be undone.
              </span>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelChanges}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Orders;
