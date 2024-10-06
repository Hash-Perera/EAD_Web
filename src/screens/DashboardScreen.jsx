import React from "react";
import MainContent from "../components/Basic/MainContent.jsx";
import { Row, Col, Card } from "react-bootstrap";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaUsers,
  FaShoppingCart,
  FaChartLine,
  FaCogs,
} from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import DigitalClock from "../components/Basic/DigitalClock.jsx";

// Register chart.js components for Bar chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const cardColors = [
  "linear-gradient(135deg, #FFEB3B, #FFC107)",
  "linear-gradient(135deg, #4CAF50, #81C784)",
  "linear-gradient(135deg, #2196F3, #64B5F6)",
  "linear-gradient(135deg, #F44336, #E57373)",
];

const summaryDetails = [
  { icon: <FaTachometerAlt />, title: "Vendor Count", count: "500" },
  { icon: <FaUsers />, title: "CSR Count", count: "300" },
  { icon: <FaBoxOpen />, title: "Active Customers", count: "1200" },
  { icon: <FaShoppingCart />, title: "Inactive Customers", count: "1500" },
];

const cardDetails = [
  { icon: <FaChartLine />, title: "Revenue", count: "$120k" },
  { icon: <FaCogs />, title: "Pending Orders", count: "50" },
  { icon: <FaUsers />, title: "New Sign-ups", count: "75" },
  { icon: <FaShoppingCart />, title: "Delivered Orders", count: "980" },
  { icon: <FaBoxOpen />, title: "Products in Stock", count: "1100" },
  { icon: <FaTachometerAlt />, title: "Processing Orders", count: "25" },
];

const data = {
  labels: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
  datasets: [
    {
      label: "Orders per Day",
      data: [30, 45, 50, 40, 60, 55, 70], // Sample data
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)",
      borderWidth: 2,
    },
  ],
};

// Chart options
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Orders per Day",
    },
  },
};

const DashboardScreen = () => {
  return (
    <MainContent>
      <div className="d-flex align-items-center justify-content-between p-3">
        <DigitalClock />

        <Row>
          {summaryDetails.map((item, index) => (
            <Col xs={12} sm={6} md={3} key={index}>
              <Card
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "1rem",
                  height: "10rem",
                  background: "linear-gradient(135deg, #1e3c72, #2a5298)",
                  color: "#fff",
                  boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                  borderRadius: "10px",
                  border: "none",
                }}
              >
                <div style={{ fontSize: "40px", marginRight: "15px" }}>
                  {item.icon}
                </div>
                <div>
                  <h6>{item.title}</h6>
                  <h5 style={{ fontWeight: "bold" }}>{item.count}</h5>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <Row className="mt-5">
        <Col xs={12} md={4}>
          <Row>
            {cardDetails.map((item, index) => (
              <Col xs={12} sm={6} key={index} className="mb-4">
                <Card
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "1rem",
                    height: "8rem",
                    background: cardColors[index % cardColors.length],
                    color: "#fff",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                    borderRadius: "10px",
                    border: "none",
                  }}
                >
                  <div style={{ fontSize: "40px", marginRight: "15px" }}>
                    {item.icon}
                  </div>
                  <div>
                    <h6>{item.title}</h6>
                    <h5 style={{ fontWeight: "bold" }}>{item.count}</h5>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>

        <Col xs={12} md={8}>
          <Card style={{ padding: "1rem", height: "100%" }}>
            <Bar data={data} options={options} />
          </Card>
        </Col>
      </Row>
    </MainContent>
  );
};

export default DashboardScreen;
