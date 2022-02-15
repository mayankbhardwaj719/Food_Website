import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import axios from "axios";
import { useEffect, useState } from "react";
const Navbar = () => {

  const [balance, setBalance] = useState("")
  const navigate = useNavigate();


  const email = localStorage.getItem('Email');
  useEffect(() => {
    const newBuyer = {
      Wallet: 0,
      Email: email
    };

    axios
      .post("api/Buyer/wallet", newBuyer)
      .then((response) => {
        setBalance(response.data.Buyer.Wallet);
      })
      .catch((error) => {
        alert("Enter valid amount to be added");
      });

    
  },[])

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
            BUYER HOME
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit" onClick={() => navigate("/buyer_Food_Menu")}>
            Food_Items
          </Button>
          <Button color="inherit" onClick={() => navigate("/buyer_orders")}>
           My Orders
          </Button>
          <button>{balance}</button>
          <AccountBalanceWalletIcon color="inherit" onClick={() => navigate("/Wallet")}/>
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
