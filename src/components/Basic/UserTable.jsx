/* eslint-disable react/prop-types */
import React from "react";
import { Table, Button, Pagination } from "react-bootstrap";

const UserTable = ({
  users,
  onEdit,
  onDelete,
  currentPage,
  handlePageChange,
  totalPages,
  onUpdate,
}) => {
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th> {/* Display Role ID or Role Name if available */}
            <th>Active</th> {/* Display active status */}
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
                <Button
                  className="text-white"
                  variant="warning"
                  onClick={() => onUpdate(user)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => onDelete(user.id)}
                  className="ms-2 text-white"
                >
                  Delete
                </Button>
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
