import React from "react";
import { Typography } from "@mui/material";

type ScreenshotProps = {
  screenshot: string;
};

export default function Screenshot({
  screenshot,
}: ScreenshotProps): React.ReactElement {
  return (
    <div className="wrapper">
      <Typography variant="h6"> Tu anuncio ha sido publicado</Typography>
      <Typography className="subtitle-text">
        Captura de pantalla del anuncio publicado:
      </Typography>
      <img
        src={`data:image/png;base64,${screenshot}`}
        alt="Anuncio"
        style={{ width: "100%", marginTop: 10 }}
      />
    </div>
  );
}
