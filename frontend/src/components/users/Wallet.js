import axios from "axios";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { compose } from "@mui/system";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const Wallet = (props) => {

    const [money,setMoney] = useState("");

    const onChangeMoney = (event) => {
        setMoney(event.target.value);
    };

    const onSubmit_Add = (event) => {
        
        event.preventDefault();
        const email = localStorage.getItem('Email');

        const newBuyer = {
          Wallet: parseInt(money),
          Email: email
        };
    
        axios
          .post("api/Buyer/wallet", newBuyer)
          .then((response) => {
            alert("Money updated to " + response.data.Buyer.Wallet);
            console.log(response.data);
          })
          .catch((error) => {
            alert("Enter valid amount to be added");
          })
          .finally(() => window.location.reload())
          
      };

    return (
        <Grid container align={"center"} spacing={2}>
            <Grid item xs={40}>
                <br></br>
                <br></br>
                <br></br>
                <TextField
                    label="Enter the amount"
                    variant="outlined"
                    value={money}
                    onChange={onChangeMoney}
                />
                <br></br>
                <br></br>
                <br></br>
                <Button variant="outlined" onClick={onSubmit_Add}>ADD</Button>
            </Grid>

        </Grid>
    );

}

export default Wallet;
