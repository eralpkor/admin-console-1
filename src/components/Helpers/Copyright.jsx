import * as React from "react";
import { Link, Typography } from "@mui/material";

export const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://aexperts.com/">
        Accounting Experts
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};
