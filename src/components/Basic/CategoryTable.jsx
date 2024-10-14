/* eslint-disable react/prop-types */
import React from "react";
import { Table, Button, Pagination } from "react-bootstrap";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const CategoryTable = ({
  categories,
  onEdit,
  onDelete,
  currentPage,
  handlePageChange,
  totalPages,
  editButton = true,
  deleteButton = true,
}) => {
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Category Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={category.id}>
              <td>{(currentPage - 1) * 10 + index + 1}</td>
              <td>{category.name}</td>
              <td>
                {editButton && (
                  <Button
                    variant="light"
                    onClick={() => onEdit(category)}
                    className="me-2 p-2"
                    style={{
                      background: "#a3d2ff", // Light cool blue for Edit
                      border: "none",
                      width: "30px",
                      height: "30px",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FaEdit style={{ color: "#004085" }} />
                  </Button>
                )}

                {deleteButton && (
                  <Button
                    variant="light"
                    onClick={() => onDelete(category.id)}
                    className="me-2 p-2"
                    style={{
                      background: "#f9c2c2", // Light red/pink for Delete
                      border: "none",
                      width: "30px",
                      height: "30px",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FaTrashAlt style={{ color: "#ff0000" }} />
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item
            key={index}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </>
  );
};

export default CategoryTable;
