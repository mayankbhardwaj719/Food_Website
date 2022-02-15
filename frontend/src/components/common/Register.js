import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ButtonGroup } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Register_Buyer = (props) => {
  const [Buyer_name, setBuyer_Name] = useState("");
  const [email, setEmail] = useState("");
  const [Contact_number, setContact_Number] = useState("");
  const [age, setAge] = useState("");
  const [Batch_name, setBatch_Name] = useState("");
  const [password, setPassword] = useState("");

  const onChangeBuyer_Name = (event) => {
    setBuyer_Name(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangeContact_Number = (event) => {
    setContact_Number(event.target.value);
  };

  const onChangeAge = (event) => {
    setAge(event.target.value);
  };

  const handleChange = (event) => {
    setBatch_Name(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const resetInputs = () => {
    setBuyer_Name("");
    setEmail("");
    setContact_Number("");
    setAge("");
    setBatch_Name("");
    setPassword("");
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const newBuyer = {
      Name: Buyer_name,
      Email: email,
      Contact_Number: Contact_number,
      Batch_Name: Batch_name,
      Age: age,
      Password: password
    };

    axios
      .post("api/Buyer/register", newBuyer)
      .then((response) => {
        alert("Successfully registered\t" + response.data.Buyer.Name);
        console.log(response.data);
      })
      .catch((error) => {
        alert("Please enter valid credentials!");
      });

    resetInputs();
  };
  return (
    <Grid container align={"center"} spacing={2}>
      <Grid item xs={12} >
        <TextField
          label="Name"
          variant="outlined"
          value={Buyer_name}
          onChange={onChangeBuyer_Name}
        />
      </Grid>
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
          label="Contact_Number"
          variant="outlined"
          value={Contact_number}
          onChange={onChangeContact_Number}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Age"
          variant="outlined"
          value={age}
          onChange={onChangeAge}
        />
      </Grid>
      <Grid item xs={12}>
        {/* <TextField
          label="Batch_Name"
          variant="outlined"
          value={Batch_name}
          onChange={onChangeBatch_Name}
        /> */}
        <FormControl sx={{m:1,width:200}}>
          <InputLabel xs={12} >Batch_Name</InputLabel>
          <Select
            labelId="Batch_Name"
            value={Batch_name}
            label="Batch-Name"
            onChange={handleChange}
          >
            <MenuItem value={10}>UG1</MenuItem>
            <MenuItem value={20}>UG2</MenuItem>
            <MenuItem value={30}>UG3</MenuItem>
            <MenuItem value={40}>UG4</MenuItem>
            <MenuItem value={50}>UG5</MenuItem>
          </Select>
        </FormControl>

      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Password"
          input type="password"
          variant="outlined"
          value={password}
          onChange={onChangePassword}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={onSubmit}>
          Register
        </Button>
      </Grid>
    </Grid>
  );
}
const Register_Vendor = (props) => {
  const [vendor_name, setVendor_Name] = useState("");
  const [email, setEmail] = useState("");
  const [contact_number, setContact_Number] = useState("");
  const [age, setAge] = useState("");
  const [shop_name, setShop_Name] = useState("");
  const [password, setPassword] = useState("");
  const [opening_Time, setOpening_Time] = useState("");
  const [closing_Time, setClosing_Time] = useState("");

  const onChangeVendor_Name = (event) => {
    setVendor_Name(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangeContact_Number = (event) => {
    setContact_Number(event.target.value);
  };

  const onChangeAge = (event) => {
    setAge(event.target.value);
  };

  const onChangeShop_Name = (event) => {
    setShop_Name(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onChangeOpening_Time = (event) => {
    setOpening_Time(event.target.value);
  };

  const onChangeClosing_Time = (event) => {
    setClosing_Time(event.target.value);
  };

  const resetInputs = () => {
    setVendor_Name("");
    setEmail("");
    setContact_Number("");
    setAge("");
    setShop_Name("");
    setPassword("");
    setClosing_Time("");
    setOpening_Time("");
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const newVendor = {
      Manager_Name: vendor_name,
      Email: email,
      Contact_Number: contact_number,
      Shop_Name: shop_name,
      Age: age,
      Password: password,
      Opening_Time: opening_Time,
      Closing_Time: closing_Time
    };

    axios
      .post("api/Vendor/register", newVendor)
      .then((response) => {
        alert("Successfully registered\t" + response.data.Vendor.Manager_Name);
        console.log(response.data);
      })
      .catch((error) => {
        alert("Please enter valid credentials!");
      });

    resetInputs();

  };

  return (
    <Grid container align={"center"} spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Manager_Name"
          variant="outlined"
          value={vendor_name}
          onChange={onChangeVendor_Name}
        />
      </Grid>
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
          label="Contact_Number"
          variant="outlined"
          value={contact_number}
          onChange={onChangeContact_Number}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Age"
          variant="outlined"
          value={age}
          onChange={onChangeAge}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Shop_Name"
          variant="outlined"
          value={shop_name}
          onChange={onChangeShop_Name}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Password"
          input type="password"
          variant="outlined"
          value={password}
          onChange={onChangePassword}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Opening_Time"
          variant="outlined"
          value={opening_Time}
          onChange={onChangeOpening_Time}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Closing_Time"
          variant="outlined"
          value={closing_Time}
          onChange={onChangeClosing_Time}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={onSubmit}>
          Register
        </Button>
      </Grid>
    </Grid>
  );
}

const Register = () => {

  const [form, setForm] = useState('buyer');
  return (
    <Grid container align={"center"} spacing={2}>
      <Grid item xs={12}>
        <ButtonGroup disableElevation variant="contained">
          <Button variant="outlined" onClick={() => setForm('buyer')}>Buyer</Button>
          <Button variant="outlined" onClick={() => setForm('vendor')}>Vendor</Button>
        </ButtonGroup>
      </Grid>
      <Grid item xs={12}>
        {form == 'buyer' ? <Register_Buyer /> : <Register_Vendor />}
      </Grid>
    </Grid>
  );

}

export default Register;
