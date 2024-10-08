import React, { useState, useEffect }  from 'react'
import MainContent from '../../components/Basic/MainContent'
import { Table, Button, Modal, Form } from 'react-bootstrap';
import CancelIcon from '@mui/icons-material/Cancel';
import axiosInstance from '../../utils/axios';
import {
    orderGetToCancel,
    orderCancel
} from "../../constants/BackendAPI.js"

export default function ToCancell() {

    // const orders = [
    //     { id: 1, orderNo: 'ORD-001', customer: 'John Doe', status: 'Pending Cancellation' },
    //     { id: 2, orderNo: 'ORD-002', customer: 'Jane Smith', status: 'Pending Cancellation' },
    //     { id: 3, orderNo: 'ORD-003', customer: 'Michael Lee', status: 'Pending Cancellation' }
    // ];

    const [orders, setOrders] = useState([]);
    const [show, setShow] = useState(false);  // State to show/hide the modal
    const [selectedOrder, setSelectedOrder] = useState(null);  // State for selected order
    const [comment, setComment] = useState('');  // State for comment
    const [formData, setFormData] = useState({
        orderid: "",
        comments: "",
    });

    useEffect(()=>{
        getToCancellOrders();
    },[]);

    const getToCancellOrders = async () => {
        await axiosInstance
        .get(orderGetToCancel)
        .then((response)=>{
            setOrders(response.data.data);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    // Function to open the modal and set the selected order
    const handleShow = (order) => {
        setSelectedOrder(order);
        setShow(true);
    };

    // Function to close the modal
    const handleClose = () => {
        setShow(false);
        setComment('');
    };

    // Function to handle cancellation confirmation
    const handleCancelOrder = async () => {
        if (comment.trim() === '') {
            alert('Comment is required to cancel the order.');
            return;
        }

        console.log('Order canceled:', selectedOrder);
        console.log('Comment:', comment);
        const odrderCancelDto = {
            OrderId : selectedOrder.orderId,
            Comments : comment
        };

        console.log(odrderCancelDto);
        await axiosInstance
        .put(orderCancel.replace("{id}",selectedOrder.orderId), odrderCancelDto)
        .then((response)=>{
            console.log(response);
        })
        .catch((error)=>{
            console.log(error);
        })
        // Here you can send the data to your backend to cancel the order
        handleClose();
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'Canceled':
                return 'bg-danger text-white';
            case 'Pending':
                return 'bg-secondary text-white';
            case 'Delivered':
                return 'bg-success text-white';
            default:
                return 'bg-warning text-white';
        }
    };

  return (
    <MainContent>
        <div className="container my-5">
            <h3>Orders Requested for Cancellation</h3>
            {orders && orders.length > 0 ? (
            <div className='table-responsive-md'>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Order No</th>
                        <th>Customer</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.orderId}>
                            <td>{order.orderNo}</td>
                            <td>{order.customerName}</td>
                            <td>
                                <span className={`badge ${getStatusClass(order.status)} p-2`}>
                                {order.status}
                                </span>
                            </td>
                            <td className='text-center'>
                                <Button 
                                    variant="danger" 
                                    onClick={() => handleShow(order)}>
                                        <CancelIcon style={{ marginRight: '10px' }}/>
                                            Cancel
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            </div>
            ) : (
                <div className="alert alert-info text-center mt-5">
                    <strong>No orders requested to be canceled.</strong>
                </div>
            )}
            {/* Modal for adding a comment and confirming the cancellation */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cancel Order {selectedOrder?.orderNo}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formComment">
                            <Form.Label>Add a Comment (Required)</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={3} 
                                placeholder="Add a reason for cancellation"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleCancelOrder}>
                        Confirm Cancellation
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    </MainContent>
  )
}
