import { Link, Navigate } from "react-router-dom";

// antd
import { Button, Container, Stack, Typography } from "@mui/material";

// routes
import { PATH_AUTH, PATH_PAGE } from "../routes/paths";

// hooks
import useAuth from "../hooks/useAuth";
// ----------------------------------------------------------------------

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated)
    return (
      <Container maxWidth="lg" sx={{ height: "100vh" }}>
        <Stack spacing={2} alignItems="center" justifyContent="center" height={1}>
          <Typography component="h1" variant="h3">
            Đăng nhập để tiếp tục
          </Typography>
          <Link to={PATH_AUTH.login}>
            <Button variant="contained">Đăng nhập</Button>
          </Link>
        </Stack>
      </Container>
    );

  return <Navigate to={PATH_PAGE.kanban} />;
}
