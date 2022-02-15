import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.setItem('flag','2');
    localStorage.removeItem('Email');
    window.location.href="/";
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
           VENDOR HOME
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit" onClick={() => navigate("/Food_Menu")}>
           Food Menu
          </Button>
          <Button color="inherit" onClick={() => navigate("/orders")}>
           My Orders
          </Button>
          <Button color="inherit" onClick={() => navigate("/statistic_page")}>
           Statistics
          </Button>
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
          <Button color="inherit" onClick={() => navigate("/profile")}>
            My Profile
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
