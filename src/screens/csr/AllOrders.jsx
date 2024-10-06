import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Table, ListGroup } from 'react-bootstrap';
import MainContent from '../../components/Basic/MainContent.jsx';
import "../../styles/order.css"
import axiosInstance from '../../utils/axios.js';
import {
    orderGetAll
} from "../../constants/BackendAPI.js"

const AllOrders = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
       getAllOrders();
    }, []);

    const getAllOrders = async () => {
        await axiosInstance
        .get(orderGetAll)
        .then((response)=>{
            setOrders(response.data.data);
            console.log(response.data.data)
        })
        .catch((error)=>{
            console.log(error);
        });
    }

    const handleOrderClick = (order) => {
        setSelectedOrder(order); // Update selected order when clicked in the sidebar
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
        <>
        <MainContent>
        <Container fluid className="my-5">
            <Row>
                {/* Sidebar - List of Orders */}
                <Col md={3} >
                    <Card>
                        <Card.Header>Orders</Card.Header>
                        <div style={{ height: '70vh', overflowY: 'auto' }}>
                        <ListGroup variant="flush">
                            {orders.map(order => (
                                <ListGroup.Item 
                                    key={order.orderId} 
                                    action 
                                    onClick={() => handleOrderClick(order)}
                                    className={selectedOrder && selectedOrder.orderId === order.orderId ? 'selected-order' : ''}
                                    
                                >
                                    <strong>{order.orderNo}</strong><br />
                                    <small>Status: 
                                    <span className={`badge ${getStatusClass(order.status)} p-1`} style={{marginLeft:'2px'}}>
                                        {order.status}
                                    </span>   
                                    </small>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                        </div>
                    </Card>
                </Col>

                {/* Main Content - Selected Order Details */}
                <Col md={9}>
                    {selectedOrder ? (
                        <>
                            {/* Order Details */}
                            <Card className="mb-4" style={{boxShadow: "0 4px 8px rgba(0,0,0,0.2)", borderRadius: "10px", border: "none",}}>
                                <Card.Body>
                                    <Card.Title>Order {selectedOrder.orderNo}</Card.Title>
                                    <Card.Text >
                                        <Row>
                                            <Col md={6} >
                                                <strong>Customer Name: </strong>{selectedOrder.customerName}
                                            </Col>
                                            <Col md={6}>
                                                <strong>Order Date:</strong> {new Date(selectedOrder.orderDate).toLocaleDateString()}
                                            </Col>
                                        </Row>
                                        <Row className='mt-2'>
                                            <Col md={6}>
                                            <strong>Delivery Address:</strong> {selectedOrder.deliveryAddress}
                                            </Col>
                                            <Col md={6}>
                                                <strong><span style={{marginRight:'5px'}}>Status:</span></strong>
                                                <span className={`badge ${getStatusClass(selectedOrder.status)} p-2`}>
                                                    {selectedOrder.status}
                                                </span>
                                            </Col>
                                        </Row>
                                        <Row className='mt-2'>
                                            <Col md={6}>
                                            <strong>Comments:</strong> {selectedOrder.comments || "No comments"}
                                            </Col>
                                        </Row>
                                    </Card.Text>
                                </Card.Body>
                            </Card>

                            {/* Orderlines Table */}
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Product Name</th>
                                        <th>Vendor Name</th>
                                        <th>Quantity</th>
                                        <th>Unit Price</th>
                                        <th>Total</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedOrder.orderLines.map((line, index) => (
                                        <tr key={line.orderLineNo}>
                                            <td>{index + 1}</td>
                                            <td>{line.productName}</td>
                                            <td>{line.vendorName}</td>
                                            <td>{line.qty}</td>
                                            <td>${line.unitPrice}</td>
                                            <td>${line.total}</td>
                                            <td>{line.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </>
                    ) : (
                        <div className="instruction-text">
                            <div className="alert alert-info text-center">
                                <strong>Please select an order from the list to view details.</strong>
                            </div>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
        </MainContent>
        

        </>
        
    );
};

export default AllOrders;
