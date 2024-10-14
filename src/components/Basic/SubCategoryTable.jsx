import React from "react";
import { Table, Button, Pagination } from "react-bootstrap";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const SubCategoryTable = ({
  subCategories,
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
            <th>Subcategory Name</th>
            <th>Category ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subCategories.map((subCategory, index) => (
            <tr key={subCategory.id}>
              <td>{(currentPage - 1) * 10 + index + 1}</td>
              <td>{subCategory.name}</td>
              <td>{subCategory.categoryId}</td>
              <td>
                {editButton && (
                  <Button
                    variant="light"
                    onClick={() => onEdit(subCategory)}
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
                    onClick={() => onDelete(subCategory.id)}
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

export default SubCategoryTable;
