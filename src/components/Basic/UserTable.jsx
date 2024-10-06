/* eslint-disable react/prop-types */
import React from "react";
import { Table, Button, Pagination } from "react-bootstrap";
import { FaEdit, FaTrashAlt, FaToggleOn, FaToggleOff } from "react-icons/fa";

const UserTable = ({
  users,
  onEdit,
  onDelete,
  currentPage,
  handlePageChange,
  totalPages,
  onUpdate,
  onActiveChange,
  editButton = true,
  deleteButton = true,
  activeButton = true,
}) => {
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{(currentPage - 1) * 5 + index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>

              <td>{user.active ? "Yes" : "No"}</td>
              <td>
                {editButton && (
                  <Button
                    variant="light"
                    onClick={() => onEdit(user)}
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
                    onClick={() => onDelete(user.id)}
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
                    {/* Dark red Delete Icon */}
                  </Button>
                )}

                {activeButton && (
                  <Button
                    variant="light"
                    onClick={() => onActiveChange(user.id)}
                    className="p-2"
                    style={{
                      background: user.active ? "#f9c2c2" : "#c7f5d8",
                      border: "none",
                      width: "30px",
                      height: "30px",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {user.active ? (
                      <FaToggleOff style={{ color: "#ff0000" }} />
                    ) : (
                      <FaToggleOn style={{ color: "#39e600" }} />
                    )}
                    {/* Dark red for Disable, dark green for Enable */}
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

export default UserTable;
