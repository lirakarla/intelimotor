import React, { useState } from "react";
import { TextField, Button, Typography, Snackbar } from "@mui/material";
import axios from "axios";

import LoadingBar from "./LoadingBar";
import Screenshot from "./Screenshot";

import "./../styles/AdForm.css";

export default function AdForm(): React.ReactElement {
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notificationOpen, setNotificationOpen] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>("");

  const isSubmitDisabled = !price || !description || submitted || loading;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setSubmitted(true);
    setError(null);

    setNotificationMessage("Procesando Datos...");
    setNotificationOpen(true);

    try {
      const response = await axios.post("http://localhost:4000/publishAd", {
        price,
        description,
      });

      const { message } = response.data;
      setScreenshot(message);
      setNotificationMessage("Tu anuncio se ha publicado con éxito");
    } catch (err) {
      setError("Error al enviar el anuncio, intentalo más tarde");
      setNotificationMessage("Error al enviar el anuncio");
    } finally {
      setLoading(false);
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      // Regex to validate the input only accept numbers
      setPrice(value);
      setSubmitted(false);
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
    setSubmitted(false);
  };

  const handleCloseSnackbar = () => {
    setNotificationOpen(false);
  };

  return (
    <div className="ad-form-container">
      <Typography variant="h4" gutterBottom>
        Bienvenido al portal SemiNuevos
      </Typography>
      <Typography className="subtitle-text" gutterBottom>
        Publica tu anuncio para vender tu vehiculo atraves de este sencillo
        formulario.
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Precio"
          id="price"
          variant="outlined"
          value={price}
          onChange={handlePriceChange}
          fullWidth
          margin="normal"
          required
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        />

        <TextField
          label="Descripción"
          id="description"
          variant="outlined"
          value={description}
          onChange={handleDescriptionChange}
          multiline
          rows={4}
          fullWidth
          margin="normal"
          required
        />

        <Button
          type="submit"
          variant="contained"
          className="submit-button"
          disabled={isSubmitDisabled}
          fullWidth
        >
          Publicar
        </Button>
      </form>

      {loading && (
        <>
          <p>Cargando Datos...</p>
          <LoadingBar />
        </>
      )}

      {error && (
        <Typography color="error" className="error-message">
          {error}
        </Typography>
      )}

      {screenshot && <Screenshot screenshot={screenshot} />}

      <Snackbar
        open={notificationOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        message={notificationMessage}
        className="ad-notification"
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      />
    </div>
  );
}
