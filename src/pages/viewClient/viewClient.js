import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

const ViewClient = () => {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClient(id);
  }, [id]);

  const fetchClient = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/cliente/buscar/id/${id}`);
      const data = await response.json();
      setClient(data);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener los datos del cliente:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!client) {
    return (
      <Typography variant="h6" align="center" color="error">
        No se encontraron datos para el cliente con el ID: {id}
      </Typography>
    );
  }

  return (
    <Box maxWidth={600} margin="auto" marginTop={4} textAlign="left">
      <Typography variant="h4" gutterBottom textAlign="left">
        {client.razonSocial}
      </Typography>
      <Card variant="outlined" textAlign="left">
        <CardContent>
          <Typography variant="body1">
            <strong>ID:</strong> {client.id}
          </Typography>
          <Typography variant="body1">
            <strong>CIF:</strong> {client.cif}
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong> {client.email}
          </Typography>
          <Typography variant="body1">
            <strong>Persona de Contacto:</strong> {client.personaContacto}
          </Typography>
          <Typography variant="body1">
            <strong>Dirección:</strong> {client.direccion}
          </Typography>
          {/* Agregar un botón para ir a EditClient */}
          <Box marginTop={2}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={`/clientes/editar/${id}`}
            >
              Editar Cliente
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ViewClient;
