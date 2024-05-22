import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";

const columns = [
  { id: "id", label: "ID", minWidth: 50 },
  { id: "cif", label: "CIF", minWidth: 80 },
  { id: "razonSocial", label: "Razón Social", minWidth: 80 },
  { id: "email", label: "Email", minWidth: 80 },
  { id: "personaContacto", label: "Persona de Contacto", minWidth: 50 },
  { id: "direccion", label: "Dirección", minWidth: 170 },
  { id: "editar", label: "Editar", minWidth: 50, align: "center" },
  { id: "eliminar", label: "Eliminar", minWidth: "50", align: "center" },
];

const Clients = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [clientes, setClientes] = useState([]);
  const [deleteErrorDialogOpen, setDeleteErrorDialogOpen] = useState(false);

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

  const handleEditClick = (id) => {
    // Redirigir a la página de edición del cliente con el ID correspondiente
    window.location.href = `/clientes/editar/${id}`;
  };

  const handleDeleteClick = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/clientes/borrar/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        // Eliminación exitosa
      // Actualizar la lista de clientes eliminando el cliente con el ID proporcionado
        setClientes(clientes.filter(cliente => cliente.id !== id));
        console.log("OK")
      } else if (response.status === 404) {
        // Mostrar el diálogo de error si el cliente no se encuentra
        console.log("404")
        setDeleteErrorDialogOpen(true);
      } else {
        // Otro tipo de error
        console.error("Error al intentar borrar el cliente:", response.statusText);
      }
    } catch (error) {
      console.error("Error al intentar borrar el cliente:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleCloseDeleteErrorDialog = () => {
    setDeleteErrorDialogOpen(false);
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
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.id}
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === "razonSocial" ? (
                          <Link to={`/clientes/${row.id}`}>
                            {value}
                          </Link>
                        ) : column.id === "editar" ? (
                          <IconButton onClick={() => handleEditClick(row.id)}>
                            <EditIcon />
                          </IconButton>
                        ) : column.id === "eliminar" ? (
                          <IconButton onClick={() => handleDeleteClick(row.id)}>
                            <DeleteIcon />
                          </IconButton>
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
      {/* Diálogo de error al intentar borrar */}
      <Dialog open={deleteErrorDialogOpen} onClose={handleCloseDeleteErrorDialog}>
        <DialogTitle>Error al borrar cliente</DialogTitle>
        <DialogContent>
          <DialogContentText>
            El cliente no se pudo borrar porque tiene proyectos asignados.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteErrorDialog}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default Clients;
