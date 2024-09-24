import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";

const BreadCrumb = ({ from = "Dashboard", to }) => {
  const path = window.location.pathname.split("/");
  if (path[0] === "") {
    path.shift();
  }
  return (
    <Breadcrumb>
      {path?.map((item, index) => {
        return (
          <Breadcrumb.Item key={index} href={item} active>
            {item}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default BreadCrumb;
