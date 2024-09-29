import React from "react";
import Sidebar from "../components/Basic/Sidebar";
import MainContent from "../components/Basic/MainContent";
import { Button, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import CustomModal from "../components/Basic/CustomModal";

const ProductScreen = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  function createData(name,Description, Category, Price, Quantity,Status,Action) {
    return { name, Description, Price, Quantity, Category, Status,Action };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

  const handleEdit = (name) => {
    console.log(`Edit ${name}`);
    // Add your edit logic here
  };

  const handleDelete = (name) => {
    console.log(`Delete ${name}`);
    // Add your delete logic here
  };
  return (
    <>
      <MainContent>
        <div className="d-flex justify-content-between">
        <Button variant="contained" className="mt-3" onClick={handleOpen}>
          Add Product
        </Button>
        <Button variant="contained" className="mt-3" onClick={handleOpen}>
          Notification 
          </Button>
        </div>
        <Typography variant="h6" className="text-start mt-3 mb-2">
          My Products
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Category</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right"></TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => handleEdit(row.name)}
                      aria-label="edit"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(row.name)}
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </MainContent>

      <CustomModal
        title="Add Product"
        subTitle="Add your product details"
        open={open}
        handleClose={handleClose}
        func_text="Add"
        func={handleClose}
      >
        <form action="">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input type="text" className="form-control" id="name" />
          </div>
          <div className="mb-3">
            <label htmlFor="calories" className="form-label">
              Calories
            </label>
            <input type="number" className="form-control" id="calories" />
          </div>
          <div className="mb-3">
            <label htmlFor="fat" className="form-label">
              Fat
            </label>
            <input type="number" className="form-control" id="fat" />
          </div>
          <div className="mb-3">
            <label htmlFor="carbs" className="form-label">
              Carbs
            </label>
            <input type="number" className="form-control" id="carbs" />
          </div>
          <div className="mb-3">
            <label htmlFor="protein" className="form-label">
              Protein
            </label>
            <input type="number" className="form-control" id="protein" />
          </div>
        </form>
      </CustomModal>
    </>
  );
};

export default ProductScreen;
