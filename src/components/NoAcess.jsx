import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      <Link color="inherit" href="https://aexperts.com">
        Accounting Experts
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function StickyFooter() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "90vh",
      }}
    >
      <CssBaseline />
      <Container component="main" sx={{ mt: 4, mb: 2 }} maxWidth="sm">
        <Typography variant="h2" component="h1" gutterBottom>
          Sorry.
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {"You do not have permissions to view this page."}
        </Typography>
        <Typography variant="body1">
          <Link color="inherit" href="/">
            <Button>Go back</Button>
          </Link>
        </Typography>
      </Container>
      <Box
        component="footer"
        sx={{
          py: 10,
          px: 2,
          mt: "auto",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
}
