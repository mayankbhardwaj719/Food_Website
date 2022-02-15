import axios from "axios";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { compose } from "@mui/system";


const Profile = (props) => {

  // Buyer
  const [Buyer_name, setBuyer_Name] = useState("");
  const [email, setEmail] = useState("");
  const [Contact_number, setContact_Number] = useState("");
  const [age, setAge] = useState("");
  const [Batch_name, setBatch_Name] = useState("");
  const [password, setPassword] = useState("");

  // Vendor
  const [vendor_name, setVendor_Name] = useState("");
  const [email2, setEmail2] = useState("");
  const [contact_number2, setContact_Number2] = useState("");
  const [age2, setAge2] = useState("");
  const [shop_name, setShop_Name] = useState("");
  const [opening_Time, setOpening_Time] = useState("");
  const [closing_Time, setClosing_Time] = useState("");
  const [password2, setPassword2] = useState("");

  const [flg, setFlg] = useState(true);

  const newUser = {
    Email: localStorage.getItem('Email')
  }

  // buyer on-change
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

  const onChangeBatch_Name = (event) => {
    setBatch_Name(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onSave_Buyer = (event) => {
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
      .post("api/Buyer/Edit_profile", newBuyer)
      .then((response) => {
        alert("Profile Updated Successfully");
        console.log(response.data);
      })
      .catch((error) => {
        alert("Try again");
      });
    setFlg(true);
  };

  // vendor on-change
  const onChangeVendor_Name = (event) => {
    setVendor_Name(event.target.value);
  };

  const onChangeEmail2 = (event) => {
    setEmail2(event.target.value);
  };

  const onChangeContact_Number2 = (event) => {
    setContact_Number2(event.target.value);
  };

  const onChangeAge2 = (event) => {
    setAge2(event.target.value);
  };

  const onChangeShop_Name = (event) => {
    setShop_Name(event.target.value);
  };

  const onChangePassword2 = (event) => {
    setPassword2(event.target.value);
  };

  const onChangeOpening_Time = (event) => {
    setOpening_Time(event.target.value);
  };

  const onChangeClosing_Time = (event) => {
    setClosing_Time(event.target.value);
  };

  // Vendor On-save function
  const onSave_Vendor = (event) => {
    event.preventDefault();

    const newVendor = {
      Manager_Name: vendor_name,
      Email: email2,
      Contact_Number: contact_number2,
      Shop_Name: shop_name,
      Age: age2,
      Password: password2,
      Opening_Time: opening_Time,
      Closing_Time: closing_Time
    };

    axios
      .post("api/Vendor/Edit_profile", newVendor)
      .then((response) => {
        alert("Profile Updated Successfully");
        console.log(response.data);
      })
      .catch((error) => {
        alert("Try again");
      });
    setFlg(true);
  };
  useEffect(() => {
    if (localStorage.getItem('flag') === '0') {
      axios
        .post("api/Buyer/profile", newUser) // unimplemented
        .then((response) => {
          setBuyer_Name(response.data.Buyer.Name);
          setEmail(response.data.Buyer.Email);
          setContact_Number(response.data.Buyer.Contact_Number);
          setAge(response.data.Buyer.Age);
          setBatch_Name(response.data.Buyer.Batch_Name);
          setPassword(response.data.Buyer.Password);
        });
    }
    else if (localStorage.getItem('flag') === '1'){
      axios
        .post("api/Vendor/profile", newUser) // unimplemented
        .then((response) => {
          setVendor_Name(response.data.Vendor.Manager_Name);
          setEmail2(response.data.Vendor.Email);
          setContact_Number2(response.data.Vendor.Contact_Number);
          setAge2(response.data.Vendor.Age);
          setShop_Name(response.data.Vendor.Shop_Name);
          setPassword2(response.data.Vendor.Password);
          setClosing_Time(response.data.Vendor.Closing_Time);
          setOpening_Time(response.data.Vendor.Opening_Time);
        });
    }
  }, []);

  if (localStorage.getItem('flag') === '0') {
    return (
      <Grid container align={"center"} spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Name"
            disabled={flg}
            variant="outlined"
            value={Buyer_name}
            onChange={onChangeBuyer_Name}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            disabled={true}
            variant="outlined"
            value={email}
            onChange={onChangeEmail}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Contact_Number"
            disabled={flg}
            variant="outlined"
            value={Contact_number}
            onChange={onChangeContact_Number}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Age"
            disabled={flg}
            variant="outlined"
            value={age}
            onChange={onChangeAge}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Batch_Name"
            disabled={flg}
            variant="outlined"
            value={Batch_name}
            onChange={onChangeBatch_Name}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
            disabled={flg}
            variant="outlined"
            value={password}
            onChange={onChangePassword}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={() => setFlg(false)}>
            Edit Profile
          </Button>
          <Button variant="contained" onClick={onSave_Buyer} >
            Save
          </Button>
        </Grid>
      </Grid>
    );
  }

  else if (localStorage.getItem('flag') === '1'){

    return (
      <Grid container align={"center"} spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Manager_Name"
            disabled={flg}
            variant="outlined"
            value={vendor_name}
            onChange={onChangeVendor_Name}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            disabled={true}
            variant="outlined"
            value={email2}
            onChange={onChangeEmail2}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Contact_Number"
            disabled={flg}
            variant="outlined"
            value={contact_number2}
            onChange={onChangeContact_Number2}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Age"
            disabled={flg}
            variant="outlined"
            value={age2}
            onChange={onChangeAge2}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Shop_Name"
            disabled={flg}
            variant="outlined"
            value={shop_name}
            onChange={onChangeShop_Name}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Opening_Time"
            disabled={flg}
            variant="outlined"
            value={opening_Time}
            onChange={onChangeOpening_Time}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Closing_Time"
            disabled={flg}
            variant="outlined"
            value={closing_Time}
            onChange={onChangeClosing_Time}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
            disabled={flg}
            variant="outlined"
            value={password2}
            onChange={onChangePassword2}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={() => setFlg(false)}>
            Edit Profile
          </Button>
          <Button variant="contained" onClick={onSave_Vendor} >
            Save
          </Button>
        </Grid>
      </Grid>
    );
  }

}

export default Profile;
