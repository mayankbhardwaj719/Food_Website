import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Login = (props) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const resetInputs = () => {
    setPassword("");
    setEmail("");
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      Email: email,
      Password: password,
    };
    console.log(newUser);

    axios
      .post("api/Buyer/login", newUser)
      .then((response) => {
          alert("logged in as Buyer\t" + response.data.Buyer.Name);
          localStorage.setItem('Email',email);
          localStorage.setItem('flag','0');
          console.log(response.data);
          window.location.href="/";
      })
      .catch((error) => {
        axios
          .post("api/Vendor/login", newUser)
          .then((response) => {
              alert("logged in as Vendor\t" + response.data.Vendor.Manager_Name);
              localStorage.setItem('Email',email);
              console.log(response.data);
              localStorage.setItem('flag','1');
              window.location.href="/";
          })
          .catch((error) => {
            alert("Please enter valid credentials!");
            localStorage.setItem('flag','2');
          });
      });

    resetInputs();
  };

  return (
    <Grid container align={"center"} spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={onChangeEmail}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Password"
          input type ="password"
          variant="outlined"
          value={password}
          onChange={onChangePassword}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={onSubmit}>
          Login
        </Button>
      </Grid>
    </Grid>
  );
};

export default Login;
