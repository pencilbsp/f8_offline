// @mui
import { Container } from "@mui/material";
// components
import LoginForm from "../../sections/auth/LoginForm";

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <Container
      maxWidth="sm"
      style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <LoginForm sx={{ maxWidth: "380px" }} />
    </Container>
  );
}
