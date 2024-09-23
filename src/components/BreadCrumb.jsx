import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";

const BreadCrumb = ({ from = "Dashboard", to }) => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item style={{ textDecoration: "none" }}>
        {from}
      </Breadcrumb.Item>
      <Breadcrumb.Item active>{to}</Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default BreadCrumb;
