import React from "react";
import { useState, useEffect } from "react";
import MainContent from "../../components/Basic/MainContent";
import { Stack, Typography } from "@mui/material";
import {
  masterDataRoles,
  getCustomers,
  activeCustomers,
} from "../../constants/BackendAPI";
import axiosInstance from "../../utils/axios";
import UserTable from "../../components/Basic/UserTable";
import Swal from "sweetalert2";

const CustomerList = () => {
  const [users, setUsers] = useState([]);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    getUserRoles();
    getUserList();
  }, []);

  //! get user roles
  const getUserRoles = async () => {
    await axiosInstance
      .get(masterDataRoles)
      .then((response) => {
        setUserRoles(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    getUserList(page);
  };

  const getUserList = async () => {
    await axiosInstance
      .get(getCustomers)
      .then((response) => {
        setUsers(response.data.data);
        setTotalPages(Math.ceil(response.data.data.length / itemsPerPage));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onActiveChange = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes !",
    }).then(async (result) => {
      await axiosInstance
        .get(activeCustomers.replace("{id}", id))
        .then((response) => {
          getUserList();
          if (result.isConfirmed) {
            Swal.fire({
              title: "Done!",
              text: response.data.message,
              icon: "success",
            });
          }
        })
        .error((error) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Error !",
              text: error.message,
              icon: "fail",
            });
          }
        });
    });
  };

  return (
    <>
      <MainContent>
        <Stack
          direction="row"
          spacing={2}
          alignItems={"center"}
          justifyContent={"space-between"}
          marginBottom={2}
        >
          <Typography variant="h6" className="text-start mt-3 mb-2">
            Customer List
          </Typography>
        </Stack>
        <UserTable
          editButton={false}
          deleteButton={false}
          activeButton={true}
          users={users}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          totalPages={totalPages}
          onActiveChange={onActiveChange}
        />
      </MainContent>
    </>
  );
};

export default CustomerList;
