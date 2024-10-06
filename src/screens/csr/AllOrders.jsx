import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from "../../components/Basic/Sidebar";
import { Container, Row, Col, Card, Table, ListGroup } from 'react-bootstrap';
import MainContent from '../../components/Basic/MainContent.jsx';

const AllOrders = () => {
    // const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const orders = [
        {
            orderId: "66f7aef0565aa7eebaa1bdb2",
            orderNo: "ORD-SKIHV4",
            customerNo: "66f786c9375c273bbda44538",
            deliveryAddress: "934/34 Main Street, Colombo",
            orderDate: "2024-09-24T18:30:00Z",
            status: "Partially Delivered",
            orderLines: [
                {
                    orderLineNo: "66f7aef3565aa7eebaa1bdb3",
                    productName: "Toshiba TV",
                    vendorName: "Hashan Perera",
                    qty: 9,
                    unitPrice: 25.5,
                    total: 255,
                    status: "Delivered"
                },
                {
                    orderLineNo: "66f7aef3565aa7eebaa1bdb4",
                    productName: "Unknown Product",
                    vendorName: "Hashan Perera",
                    qty: 5,
                    unitPrice: 50,
                    total: 250,
                    status: "Pending"
                }
            ]
        },
        {
            orderId: "66f7ef59a66526ff5cd994a0",
            orderNo: "ORD-SKIUL5",
            customerNo: "66f786c9375c273bbda44538",
            deliveryAddress: "456 Main Street, City, Country",
            orderDate: "2024-09-24T18:30:00Z",
            status: "Pending",
            comments: "",
            orderLines: [
                {
                    orderLineNo: "66f7ef59a66526ff5cd994a1",
                    productNo: "66f78e4d35e427aa3d14b33b",
                    vendorNo: "66e97d79542535256ad264e6",
                    orderNo: "ORD-SKIUL5",
                    status: "Pending",
                    qty: 5,
                    unitPrice: 25.5,
                    total: 255,
                    productName: "Unknown Product",
                    vendorName: "Hashan Perera"
                },
                {
                    orderLineNo: "66f7ef5aa66526ff5cd994a2",
                    productNo: "66f7fbdceb0a043c84ddc602",
                    vendorNo: "66e97d79542535256ad264e6",
                    orderNo: "ORD-SKIUL5",
                    status: "Pending",
                    qty: 15,
                    unitPrice: 50,
                    total: 250,
                    productName: "Unknown Product",
                    vendorName: "Hashan Perera"
                }
            ]
        },
        {
            orderId: "66f7f120b3499e244dced75d",
            orderNo: "ORD-SKIUXS",
            customerNo: "66f786c9375c273bbda44538",
            deliveryAddress: "111 Main Street, City, Country",
            orderDate: "2024-09-24T18:30:00Z",
            status: "Pending",
            comments: "",
            orderLines: [
                {
                    orderLineNo: "66f7f123b3499e244dced75e",
                    productNo: "66f78e4d35e427aa3d14b33b",
                    vendorNo: "66e97d79542535256ad264e6",
                    orderNo: "ORD-SKIUXS",
                    status: "Pending",
                    qty: 5,
                    unitPrice: 25.5,
                    total: 255,
                    productName: "Unknown Product",
                    vendorName: "Hashan Perera"
                },
                {
                    orderLineNo: "66f7f123b3499e244dced75f",
                    productNo: "66f7fbdceb0a043c84ddc602",
                    vendorNo: "66e97d79542535256ad264e6",
                    orderNo: "ORD-SKIUXS",
                    status: "Pending",
                    qty: 15,
                    unitPrice: 50,
                    total: 250,
                    productName: "Unknown Product",
                    vendorName: "Hashan Perera"
                }
            ]
        },
        {
            orderId: "66f7aef0565aa7eebaa1bdb2",
            orderNo: "ORD-SKIHV4",
            customerNo: "66f786c9375c273bbda44538",
            deliveryAddress: "934/34 Main Street, Colombo",
            orderDate: "2024-09-24T18:30:00Z",
            status: "Partially Delivered",
            orderLines: [
                {
                    orderLineNo: "66f7aef3565aa7eebaa1bdb3",
                    productName: "Toshiba TV",
                    vendorName: "Hashan Perera",
                    qty: 9,
                    unitPrice: 25.5,
                    total: 255,
                    status: "Delivered"
                },
                {
                    orderLineNo: "66f7aef3565aa7eebaa1bdb4",
                    productName: "Unknown Product",
                    vendorName: "Hashan Perera",
                    qty: 5,
                    unitPrice: 50,
                    total: 250,
                    status: "Pending"
                }
            ]
        },
        {
            orderId: "66f7ef59a66526ff5cd994a0",
            orderNo: "ORD-SKIUL5",
            customerNo: "66f786c9375c273bbda44538",
            deliveryAddress: "456 Main Street, City, Country",
            orderDate: "2024-09-24T18:30:00Z",
            status: "Pending",
            comments: "",
            orderLines: [
                {
                    orderLineNo: "66f7ef59a66526ff5cd994a1",
                    productNo: "66f78e4d35e427aa3d14b33b",
                    vendorNo: "66e97d79542535256ad264e6",
                    orderNo: "ORD-SKIUL5",
                    status: "Pending",
                    qty: 5,
                    unitPrice: 25.5,
                    total: 255,
                    productName: "Unknown Product",
                    vendorName: "Hashan Perera"
                },
                {
                    orderLineNo: "66f7ef5aa66526ff5cd994a2",
                    productNo: "66f7fbdceb0a043c84ddc602",
                    vendorNo: "66e97d79542535256ad264e6",
                    orderNo: "ORD-SKIUL5",
                    status: "Pending",
                    qty: 15,
                    unitPrice: 50,
                    total: 250,
                    productName: "Unknown Product",
                    vendorName: "Hashan Perera"
                }
            ]
        },
        {
            orderId: "66f7f120b3499e244dced75d",
            orderNo: "ORD-SKIUXS",
            customerNo: "66f786c9375c273bbda44538",
            deliveryAddress: "111 Main Street, City, Country",
            orderDate: "2024-09-24T18:30:00Z",
            status: "Pending",
            comments: "",
            orderLines: [
                {
                    orderLineNo: "66f7f123b3499e244dced75e",
                    productNo: "66f78e4d35e427aa3d14b33b",
                    vendorNo: "66e97d79542535256ad264e6",
                    orderNo: "ORD-SKIUXS",
                    status: "Pending",
                    qty: 5,
                    unitPrice: 25.5,
                    total: 255,
                    productName: "Unknown Product",
                    vendorName: "Hashan Perera"
                },
                {
                    orderLineNo: "66f7f123b3499e244dced75f",
                    productNo: "66f7fbdceb0a043c84ddc602",
                    vendorNo: "66e97d79542535256ad264e6",
                    orderNo: "ORD-SKIUXS",
                    status: "Pending",
                    qty: 15,
                    unitPrice: 50,
                    total: 250,
                    productName: "Unknown Product",
                    vendorName: "Hashan Perera"
                }
            ]
        },
        {
            orderId: "66f7aef0565aa7eebaa1bdb2",
            orderNo: "ORD-SKIHV4",
            customerNo: "66f786c9375c273bbda44538",
            deliveryAddress: "934/34 Main Street, Colombo",
            orderDate: "2024-09-24T18:30:00Z",
            status: "Partially Delivered",
            orderLines: [
                {
                    orderLineNo: "66f7aef3565aa7eebaa1bdb3",
                    productName: "Toshiba TV",
                    vendorName: "Hashan Perera",
                    qty: 9,
                    unitPrice: 25.5,
                    total: 255,
                    status: "Delivered"
                },
                {
                    orderLineNo: "66f7aef3565aa7eebaa1bdb4",
                    productName: "Unknown Product",
                    vendorName: "Hashan Perera",
                    qty: 5,
                    unitPrice: 50,
                    total: 250,
                    status: "Pending"
                }
            ]
        },
        {
            orderId: "66f7ef59a66526ff5cd994a0",
            orderNo: "ORD-SKIUL5",
            customerNo: "66f786c9375c273bbda44538",
            deliveryAddress: "456 Main Street, City, Country",
            orderDate: "2024-09-24T18:30:00Z",
            status: "Pending",
            comments: "",
            orderLines: [
                {
                    orderLineNo: "66f7ef59a66526ff5cd994a1",
                    productNo: "66f78e4d35e427aa3d14b33b",
                    vendorNo: "66e97d79542535256ad264e6",
                    orderNo: "ORD-SKIUL5",
                    status: "Pending",
                    qty: 5,
                    unitPrice: 25.5,
                    total: 255,
                    productName: "Unknown Product",
                    vendorName: "Hashan Perera"
                },
                {
                    orderLineNo: "66f7ef5aa66526ff5cd994a2",
                    productNo: "66f7fbdceb0a043c84ddc602",
                    vendorNo: "66e97d79542535256ad264e6",
                    orderNo: "ORD-SKIUL5",
                    status: "Pending",
                    qty: 15,
                    unitPrice: 50,
                    total: 250,
                    productName: "Unknown Product",
                    vendorName: "Hashan Perera"
                }
            ]
        },
        {
            orderId: "66f7f120b3499e244dced75d",
            orderNo: "ORD-SKIUXS",
            customerNo: "66f786c9375c273bbda44538",
            deliveryAddress: "111 Main Street, City, Country",
            orderDate: "2024-09-24T18:30:00Z",
            status: "Pending",
            comments: "",
            orderLines: [
                {
                    orderLineNo: "66f7f123b3499e244dced75e",
                    productNo: "66f78e4d35e427aa3d14b33b",
                    vendorNo: "66e97d79542535256ad264e6",
                    orderNo: "ORD-SKIUXS",
                    status: "Pending",
                    qty: 5,
                    unitPrice: 25.5,
                    total: 255,
                    productName: "Unknown Product",
                    vendorName: "Hashan Perera"
                },
                {
                    orderLineNo: "66f7f123b3499e244dced75f",
                    productNo: "66f7fbdceb0a043c84ddc602",
                    vendorNo: "66e97d79542535256ad264e6",
                    orderNo: "ORD-SKIUXS",
                    status: "Pending",
                    qty: 15,
                    unitPrice: 50,
                    total: 250,
                    productName: "Unknown Product",
                    vendorName: "Hashan Perera"
                }
            ]
        },
        {
            orderId: "66f7aef0565aa7eebaa1bdb2",
            orderNo: "ORD-SKIHV4",
            customerNo: "66f786c9375c273bbda44538",
            deliveryAddress: "934/34 Main Street, Colombo",
            orderDate: "2024-09-24T18:30:00Z",
            status: "Partially Delivered",
            orderLines: [
                {
                    orderLineNo: "66f7aef3565aa7eebaa1bdb3",
                    productName: "Toshiba TV",
                    vendorName: "Hashan Perera",
                    qty: 9,
                    unitPrice: 25.5,
                    total: 255,
                    status: "Delivered"
                },
                {
                    orderLineNo: "66f7aef3565aa7eebaa1bdb4",
                    productName: "Unknown Product",
                    vendorName: "Hashan Perera",
                    qty: 5,
                    unitPrice: 50,
                    total: 250,
                    status: "Pending"
                }
            ]
        },
        {
            orderId: "66f7ef59a66526ff5cd994a0",
            orderNo: "ORD-SKIUL5",
            customerNo: "66f786c9375c273bbda44538",
            deliveryAddress: "456 Main Street, City, Country",
            orderDate: "2024-09-24T18:30:00Z",
            status: "Pending",
            comments: "",
            orderLines: [
                {
                    orderLineNo: "66f7ef59a66526ff5cd994a1",
                    productNo: "66f78e4d35e427aa3d14b33b",
                    vendorNo: "66e97d79542535256ad264e6",
                    orderNo: "ORD-SKIUL5",
                    status: "Pending",
                    qty: 5,
                    unitPrice: 25.5,
                    total: 255,
                    productName: "Unknown Product",
                    vendorName: "Hashan Perera"
                },
                {
                    orderLineNo: "66f7ef5aa66526ff5cd994a2",
                    productNo: "66f7fbdceb0a043c84ddc602",
                    vendorNo: "66e97d79542535256ad264e6",
                    orderNo: "ORD-SKIUL5",
                    status: "Pending",
                    qty: 15,
                    unitPrice: 50,
                    total: 250,
                    productName: "Unknown Product",
                    vendorName: "Hashan Perera"
                }
            ]
        },
        {
            orderId: "66f7f120b3499e244dced75d",
            orderNo: "ORD-SKIUXS",
            customerNo: "66f786c9375c273bbda44538",
            deliveryAddress: "111 Main Street, City, Country",
            orderDate: "2024-09-24T18:30:00Z",
            status: "Pending",
            comments: "",
            orderLines: [
                {
                    orderLineNo: "66f7f123b3499e244dced75e",
                    productNo: "66f78e4d35e427aa3d14b33b",
                    vendorNo: "66e97d79542535256ad264e6",
                    orderNo: "ORD-SKIUXS",
                    status: "Pending",
                    qty: 5,
                    unitPrice: 25.5,
                    total: 255,
                    productName: "Unknown Product",
                    vendorName: "Hashan Perera"
                },
                {
                    orderLineNo: "66f7f123b3499e244dced75f",
                    productNo: "66f7fbdceb0a043c84ddc602",
                    vendorNo: "66e97d79542535256ad264e6",
                    orderNo: "ORD-SKIUXS",
                    status: "Pending",
                    qty: 15,
                    unitPrice: 50,
                    total: 250,
                    productName: "Unknown Product",
                    vendorName: "Hashan Perera"
                }
            ]
        }
    ]

    // useEffect(() => {
    //     // Fetch all orders from the API
    //     axios.get('http://localhost:5077/api/Order') // Replace with your actual endpoint
    //         .then(response => {
    //             const ordersData = response.data.data; // Assuming "data" contains the array of orders
    //             setOrders(ordersData);
    //             if (ordersData.length > 0) {
    //                 setSelectedOrder(ordersData[0]); // Default to the first order
    //             }
    //         })
    //         .catch(error => console.error("There was an error fetching the orders!", error));
    // }, []);

    const handleOrderClick = (order) => {
        setSelectedOrder(order); // Update selected order when clicked in the sidebar
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
                                    active={selectedOrder && selectedOrder.orderId === order.orderId}
                                >
                                    <strong>{order.orderNo}</strong><br />
                                    <small>Status: {order.status}</small>
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
                            <Card className="mb-4">
                                <Card.Body>
                                    <Card.Title>Order #{selectedOrder.orderNo}</Card.Title>
                                    <Card.Text>
                                        <strong>Customer No:</strong> {selectedOrder.customerNo} <br />
                                        <strong>Delivery Address:</strong> {selectedOrder.deliveryAddress} <br />
                                        <strong>Order Date:</strong> {new Date(selectedOrder.orderDate).toLocaleDateString()} <br />
                                        <strong>Status:</strong> {selectedOrder.status} <br />
                                        <strong>Comments:</strong> {selectedOrder.comments || "No comments"}
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
                        <div>Select an order to view its details</div>
                    )}
                </Col>
            </Row>
        </Container>
        </MainContent>
        

        </>
        
    );
};

export default AllOrders;
