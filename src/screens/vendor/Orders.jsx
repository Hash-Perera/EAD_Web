import React, { useEffect, useState } from "react";
import MainContent from "../../components/Basic/MainContent";
import Table from "react-bootstrap/Table";
import CustomModal from "../../components/Basic/CustomModal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axiosInstance from "../../utils/axios";

const sampleOrders = [
  {
    _id: "66f7aef0565aa7eebaa1bdb2",
    orderNo: "ORD-SKIHV4",
    customer: "66f786c9375c273bbda44538",
    deliveryAddress: "934/34 Main Street, Colombo",
    orderDate: "2024-09-24T18:30:00.000Z",
    status: "Pending",
    comments: "",
  },
  {
    _id: "66f7ef59a66526ff5cd994a0",
    orderNo: "ORD-SKIUL5",
    customer: "66f786c9375c273bbda44538",
    deliveryAddress: "456 Main Street, City, Country",
    orderDate: "2024-09-24T18:30:00.000Z",
    status: "Pending",
    comments: "",
  },
  {
    _id: "66f7f120b3499e244dced75d",
    orderNo: "ORD-SKIUXS",
    customer: "66f786c9375c273bbda44538",
    deliveryAddress: "111 Main Street, City, Country",
    orderDate: "2024-09-24T18:30:00.000Z",
    status: "Pending",
    comments: "",
  },
];

const sampleOrderLines = [
  {
    _id: "66f7aef3565aa7eebaa1bdb3",
    productNo: "66f78e4d35e427aa3d14b33b",
    orderNo: "ORD-SKIHV4",
    vendorNo: "66e97d79542535256ad264e6",
    status: "Pending",
    qty: 9,
    unitPrice: 25.5,
    total: 255,
  },
  {
    _id: "66f7aef3565aa7eebaa1bdb4",
    productNo: "66f7fb7beb0a043c84ddc601",
    orderNo: "ORD-SKIHV4",
    vendorNo: "66e97d79542535256ad264e6",
    status: "Pending",
    qty: 5,
    unitPrice: 50,
    total: 250,
  },
  {
    _id: "66f7ef59a66526ff5cd994a1",
    productNo: "66f78e4d35e427aa3d14b33b",
    orderNo: "ORD-SKIUL5",
    vendorNo: "66e97d79542535256ad264e6",
    status: "Pending",
    qty: 5,
    unitPrice: 25.5,
    total: 255,
  },
  {
    _id: "66f7ef5aa66526ff5cd994a2",
    productNo: "66f7fbdceb0a043c84ddc602",
    orderNo: "ORD-SKIUL5",
    vendorNo: "66e97d79542535256ad264e6",
    status: "Pending",
    qty: 15,
    unitPrice: 50,
    total: 250,
  },
  {
    _id: "66f7f123b3499e244dced75e",
    productNo: "66f78e4d35e427aa3d14b33b",
    orderNo: "ORD-SKIUXS",
    vendorNo: "66e97d79542535256ad264e6",
    status: "Pending",
    qty: 5,
    unitPrice: 25.5,
    total: 255,
  },
  {
    _id: "66f7f123b3499e244dced75f",
    productNo: "66f7fbdceb0a043c84ddc602",
    orderNo: "ORD-SKIUXS",
    vendorNo: "66e97d79542535256ad264e6",
    status: "Pending",
    qty: 15,
    unitPrice: 50,
    total: 250,
  },
];

const orders = () => {
  const [open, setOpen] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [selectedOrderNo, setSelectedOrderNo] = useState(null); // To store selected orderNo
  const [selectedOrderLine, setSelectedOrderLine] = useState(null); // Store the selected order line for status change
  const [statusChanges, setStatusChanges] = useState({});
  const [orders, setOrders] = useState([]);
  // Function to handle clicking an orderNo
  const handleOrderNoClick = (orderNo) => {
    setSelectedOrderNo(orderNo);
    setOpen(true); // Open the modal
  };
  // Filter the order lines based on the selected orderNo
  const filteredOrderLines = sampleOrderLines?.filter(
    (line) => line?.orderNo === selectedOrderNo
  );
  

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  /* convering date  */
  function formatReadableDate(isoDateString) {
    const date = new Date(isoDateString);

    const readableDate = date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });

    return readableDate;
  }

  // Handle the status change in the dropdown
  const handleStatusChange = (lineId, newStatus) => {
    setSelectedOrderLine(lineId); // Track the order line being changed
    setStatusChanges((prev) => ({ ...prev, [lineId]: newStatus })); // Update status changes
    setShowSaveModal(true); // Open modal for confirming changes
  };

  // Confirm save changes modal
  const handleSaveChanges = () => {
    // Logic for saving changes
    console.log(
      "Saving changes for",
      selectedOrderLine,
      "with new status:",
      statusChanges[selectedOrderLine]
    );
    setShowSaveModal(false); // Close modal after saving
  };

  // Cancel the change in status
  const handleCancelChanges = () => {
    setShowSaveModal(false); // Just close the modal without saving
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/Order/vendor/");
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
          <Table responsive="xl" className=" overflow-x-auto">
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
                <tr key={order?._id}>
                  <td>{index + 1}</td>
                  <td>
                    <Button
                      variant="text"
                      className=" cursor-pointer"
                      onClick={() => handleOrderNoClick(order?.orderNo)}
                    >
                      {order?.orderNo}
                    </Button>
                  </td>
                  <td>{order?.customer}</td>
                  <td>{order?.deliveryAddress}</td>
                  <td>{formatReadableDate(order?.orderDate)} </td>
                  <td>{order?.comments}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </MainContent>
      <CustomModal
        title={`Order Lines for Order No: ${selectedOrderNo}`}
        subTitle=""
        open={open}
        handleClose={handleClose}
        func_text="Add"
        func={handleClose}
      >
        {filteredOrderLines?.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Product No</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrderLines?.map((line, index) => (
                <tr key={line?._id}>
                  <td>{index + 1}</td>
                  <td>{line?.productNo}</td>
                  <td>{line?.qty}</td>
                  <td>{line?.unitPrice}</td>
                  <td>{line?.total}</td>
                  <Form.Select
                    value={statusChanges[line._id] || line.status}
                    onChange={(e) =>
                      handleStatusChange(line._id, e.target.value)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </Form.Select>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No order lines available for this order.</p>
        )}
      </CustomModal>
      <CustomModal
        title="Save Changes"
        subTitle=""
        open={showSaveModal}
        handleClose={handleCancelChanges}
        func_text="Save"
        func={handleSaveChanges}
      >
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
      </CustomModal>
    </>
  );
};

export default orders;
