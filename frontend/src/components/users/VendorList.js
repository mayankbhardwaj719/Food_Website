import { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { ButtonGroup } from "@mui/material";

import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import Food_Item_Add from "./Food_Item_Add";

const VendorList = (props) => {
  const [user, setuser] = useState([]);
  const [sorteduser, setSorteduser] = useState([]);
  const [sortName, setSortName] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [shopname, setshopname] = useState("");
  const [form, setForm] = useState('Edit');

  useEffect(() => {
    axios
      .get("api/Food_Item")
      .then((response) => {
        // console.log(response.data);
        setuser(response.data);
        setSorteduser(response.data);
        setSearchText("");
      })
      .catch((error) => {
        console.log(error);
      });

    const vendorInfo = {
      Email: localStorage.getItem('Email')
    }
    axios
      .post("api/Vendor/profile", vendorInfo)
      .then((response) => {
        setshopname(response.data.Vendor.Shop_Name);
      })
      .catch((error) => {
        alert("Error occured");
        console.log(error);
      })

  }, []);

  const sortChange = () => {
    let userTemp = user;
    const flag = sortName;
    userTemp.sort((a, b) => {
      if (a.Price != undefined && b.Price != undefined) {
        return (1 - flag * 2) * (new Date(a.Price) - new Date(b.Price));
      } else {
        return 1;
      }
    });
    setuser(userTemp);
    setSortName(!sortName);
  };

  const customFunction = (event) => {
    console.log(event.target.value);
    setSearchText(event.target.value);
  };


  const Food_delete = (event) => {
    event.preventDefault();
    const Id_info = {
      _id: event.target.value
    }
    console.log(Id_info);
    axios.post("api/Food_Item/Delete_Food_Item", Id_info)
      .then((response) => {
        console.log(response.data);
        alert("Deleted Successfully");
      })
      .catch((error) => {
        alert("Error occured in deletion");
        console.log(error);
      })
      .finally(() => window.location.reload())
  }

  const [Item_name, setItem_Name] = useState("");
  const [price, setPrice] = useState("");
  const [vegetarian, setVegetarian] = useState("");
  const [addons, setAddons] = useState([]);
  const [addonsstring, setAddonsString] = useState("");
  const [tags, setTags] = useState([]);
  const [tagstring, setTagString] = useState("");
  const [Id, setId] = useState("");

  const [open, setOpen] = useState(false);


  const handleClose = () => {
    setOpen(false);
  };

  const onChangeItem_Name = (event) => {
    setItem_Name(event.target.value);
  };

  const onChangePrice = (event) => {
    setPrice(event.target.value);
  };

  const onChangeVegetarian = (event) => {
    setVegetarian(event.target.value);
  };


  const onChangeAddons = (event) => {
    var addon_string = event.target.value
    // console.log(addon_string)
    let temp_addons = []
    let final_addons = []
    temp_addons = addonsstring.split(',');
    // console.log(temp_addons)
    for (var i = 0; i < temp_addons.length; i = i + 2) {
      let temp_inside = { "addon": temp_addons[i], "price": temp_addons[i + 1] }
      final_addons.push(temp_inside)
    }
    setAddonsString(event.target.value);
    setAddons(final_addons);
    // console.log(addons)
  };


  const onChangeTags = (event) => {
    var tag_string = event.target.value
    let temp_tags = []
    // console.log(tag_string)
    temp_tags = tag_string.split(',');
    setTagString(event.target.value);
    setTags(temp_tags);
    // console.log(temp_tags)
  };

  const onSubmit_Save = (event) => {
    event.preventDefault();

    let temp_addons = []
    let final_addons = []
    temp_addons = addonsstring.split(',');
    for (var i = 0; i < temp_addons.length; i = i + 2) {
      let temp_inside = { "addon": temp_addons[i], "price": temp_addons[i + 1] }
      final_addons.push(temp_inside)
    }

    const newFood_Item = {
      Item_Name: Item_name,
      Price: price,
      Vegetarian: vegetarian === 'Veg' ? true : false,
      Addons: final_addons,
      Tags: tags,
      _id: Id
    };
    // console.log(newFood_Item);
    axios
      .post("api/Food_Item/Edit_Food_Item", newFood_Item)
      .then((response) => {
        alert("Successfully Updated \t");
        console.log(response.data.Shop_Name);
      })
      .catch((error) => {
        console.log(error)
        alert("Please enter valid credentials!");
      });
    // console.log(newFood_Item);
    setOpen(false);
    window.location.href="/Food_Menu";
  };


  const Food_Edit = (event) => {

    setOpen(true);
    const IND = event.target.value
    // console.log(event.target.value);
    let temp_dict = user[IND].Addons;
    let faltu_string = "";
    let final_dict = []
    temp_dict.forEach(element => {
      faltu_string += element.addon + ',' +  element.price + ',' ;
    });
    faltu_string = faltu_string.slice(0,-1);
    setItem_Name(user[IND].Item_Name)
    setPrice(user[IND].Price)
    setVegetarian(user[IND].Vegetarian ? 'Veg' : 'Non-Veg')
    setAddonsString(faltu_string)
    setTagString(user[IND].Tags.toString())
    setTags(user[IND].Tags);
    setId(user[IND]._id)
  }


  return (
    <div>
      <Grid container>
        <Grid item xs={12} md={3} lg={3}>
          <List component="nav" aria-label="mailbox folders">
            <ListItem text>
              <h1>Filters</h1>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={9} lg={9}>
          <List component="nav" aria-label="mailbox folders">
            <TextField
              id="standard-basic"
              label="Search"
              fullWidth={true}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            // onChange={customFunction}
            />
          </List>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} md={3} lg={3}>
          <List component="nav" aria-label="mailbox folders">
            <ListItem>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  Salary
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="standard-basic"
                    label="Enter Min"
                    fullWidth={true}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="standard-basic"
                    label="Enter Max"
                    fullWidth={true}
                  />
                </Grid>
              </Grid>
            </ListItem>
            <Divider />
            <ListItem divider>
              <Autocomplete
                id="combo-box-demo"
                options={user}
                getOptionLabel={(option) => option.name}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Names"
                    variant="outlined"
                  />
                )}
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={9} lg={9}>
          <Button variant="outlined" onClick={() => { window.location.href = "/food_item_add" }}>Add Item</Button>
          <Paper>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell> Sr No.</TableCell>
                  <TableCell>
                    {" "}
                    <Button onClick={sortChange}>
                      {sortName ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                    </Button>
                    Price
                  </TableCell>
                  <TableCell>Item_Name</TableCell>
                  <TableCell>Veg/Non-Veg</TableCell>
                  <TableCell>Tags</TableCell>
                  <TableCell>Addons</TableCell>
                  <TableCell>Shop_Name</TableCell>
                  <TableCell>EDIT/DELETE</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  user.map((Food_Item, ind) => {
                    if (Food_Item.Shop_Name === shopname)
                      return (<TableRow key={ind} >
                        <TableCell>{ind}</TableCell>
                        <TableCell>{Food_Item.Price}</TableCell>
                        <TableCell>{Food_Item.Item_Name}</TableCell>
                        <TableCell>{Food_Item.Vegetarian == true ? "Veg" : "Non-Veg"}</TableCell>
                        <TableCell>{Food_Item.Tags.join(",")}</TableCell>
                        <TableCell>
                          {Food_Item.Addons.map((varI, l) => (
                            <li>{varI.addon},{varI.price}</li>
                          ))}
                        </TableCell>
                        <TableCell>{Food_Item.Shop_Name}</TableCell>
                        <TableCell>
                          <ButtonGroup>
                            <Button variant="outlined" value={ind} onClick={Food_Edit}>Edit</Button>
                            <Button variant="outlined" value={Food_Item._id} onClick={Food_delete}>Delete</Button>
                          </ButtonGroup>
                          {/* {form == 'Edit' ? <Food_Item_Edit /> : <Food_Item_Delete />} */}
                        </TableCell>
                      </TableRow>)
                  })
                }
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
      <div>

        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Item_Name"
              type="email"
              fullWidth
              variant="standard"
              value={Item_name}
              onChange={onChangeItem_Name}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Veg/Non-Veg"
              type="email"
              fullWidth
              variant="standard"
              value={vegetarian}
              onChange={onChangeVegetarian}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Tags"
              type="email"
              fullWidth
              variant="standard"
              value={tagstring}
              onChange={onChangeTags}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Addons"
              type="email"
              fullWidth
              variant="standard"
              value={addonsstring}
              onChange={onChangeAddons}
            />
              <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Price"
              type="email"
              fullWidth
              variant="standard"
              value={price}
              onChange={onChangePrice}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={onSubmit_Save}>Save</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div >

  );


};

export default VendorList;
