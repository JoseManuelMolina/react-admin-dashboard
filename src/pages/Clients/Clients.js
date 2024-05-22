import React, { useState, useEffect } from "react";
import "./clients.scss";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const columns = [
  { id: "id", label: "ID", minWidth: 50 },
  { id: "cif", label: "CIF", minWidth: 80 },
  { id: "razonSocial", label: "Razón Social", minWidth: 80 },
  { id: "email", label: "Email", minWidth: 80 },
  { id: "personaContacto", label: "PersonaContacto", minWidth: 50 },
  { id: "direccion", label: "Dirección", minWidth: 170 },
  { id: "editar", label: "Editar", minWidth: 50, align: "center" },
  { id: "eliminar", label: "Eliminar", minWidth: "50", align: "center" },
];

const Clients = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    fetchClientes().then((data) => {
      setClientes(data);
    });
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await fetch("http://localhost:8080/clientes");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener los clientes:", error);
      return [];
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEditClick = (id) => {
    // Lógica para manejar la edición del proyecto con el ID proporcionado
    console.log('Edit',id)
  };

  const handleDeleteClick = (id) => {
    // Lógica para manejar la eliminación del proyecto con el ID proporcionado
    console.log('Delete',id)
  };


  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 530 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {clientes
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === "editar" ? (
                          <IconButton onClick={() => handleEditClick(row.id)}>
                            <EditIcon />
                          </IconButton>
                        ) : column.id === "eliminar" ? (
                          <IconButton
                            onClick={() => handleDeleteClick(row.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        ) : column.format && typeof value === "number" ? (
                          column.format(value)
                        ) : (
                          value
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={clientes.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página:"
      />
    </Paper>
  );
};

export default Clients;
