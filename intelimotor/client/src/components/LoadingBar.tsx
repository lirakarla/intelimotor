import React from "react";
import { LinearProgress } from "@mui/material";

export default function LoadingBar(): React.ReactElement {
  return <LinearProgress className="wrapper loading-progress" />;
}
