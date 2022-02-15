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
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import Food_Item_Add from "./Food_Item_Add";

const BuyerList = (props) => {
    const [user, setuser] = useState([]);
    // const [user_vendor, setuser_vendor] = useState([]);
    const [sorteduser, setSorteduser] = useState([]);
    const [sortName, setSortName] = useState(true);
    const [sortName2, setSortName2] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [form, setForm] = useState('Edit');
    const [temp_user, setTemp_user] = useState([]);
    const [addonlist, setAddonlist] = useState([]);
    const [food_price, setFood_price] = useState(0);
    const [shop_name, setshop_name] = useState("");
    const [item_name, setitem_name] = useState("");
    const [dict, setdict] = useState({});
    useEffect(() => {

        axios
            .get("api/Vendor")
            .then((response) => {
                console.log(response.data);
                // setuser_vendor(response.data);

                let temp_dict = {};
                response.data.forEach((order) => {
                    if (!(order.Shop_Name in temp_dict)) {
                        var val = shopcheck(order.Opening_Time, order.Closing_Time);
                        // dict[order.Shop_Name] = shopcheck(order.Opening_Time,order.Closing_Time);
                        temp_dict[order.Shop_Name] = val;
                    }
                    // console.log(order);
                });

                axios
                    .get("api/Food_Item")
                    .then((response) => {
                        console.log(response.data);
                        console.log(temp_dict);
                        setdict(temp_dict);
                        let open = []
                        let closed = []

                        response.data.forEach((food) => {
                            console.log(temp_dict[food.Shop_Name]);
                            if (temp_dict[food.Shop_Name]) {
                                open.push(food);
                            }
                            else {
                                closed.push(food);
                            }
                        })
                        // console.log(open,closed);
                        // console.log(open.concat(closed));
                        setuser(open.concat(closed));
                        setSorteduser(open.concat(closed));
                        setSearchText("");
                    })
                    .catch((error) => {
                        console.log(error);
                    });


            })
            .catch((error) => {
                console.log(error);
            });



    }, []);

    // sort by price
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

    // sort by rating
    const sortChange2 = () => {
        let userTemp = user;
        const flag = sortName2;
        userTemp.sort((a, b) => {
            if (a.Rating != undefined && b.Rating != undefined) {
                return (1 - flag * 2) * (new Date(a.Rating) - new Date(b.Rating));
            } else {
                return 1;
            }
        });
        setuser(userTemp);
        setSortName2(!sortName2);
    };

    const customFunction = (event) => {
        console.log(event.target.value);
        setSearchText(event.target.value);
    };


    const [addons, setAddons] = useState([]);
    const [addonsstring, setAddonsString] = useState("");
    const [Id, setId] = useState("");
    const [quantity, setquantity] = useState("");

    const onChangequantity = (event) => {
        setquantity(event.target.value);
    }

    const [open, setOpen] = useState(false);


    const handleClose = () => {
        setOpen(false);
        setFood_price(0);
        setshop_name("");
        setitem_name("");
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

    const onChangecheck = (event) => {

        const temp_addons = event.target.value
        const addon_name = temp_addons.split(',');
        console.log(addon_name[0]);

        if (event.target.checked) {
            let temp_list = [...addonlist];
            temp_list.push(addon_name[0]);
            console.log(temp_list);
            setAddonlist(temp_list);
        }
        else {
            let temp_list = [...addonlist];
            temp_list.splice(temp_list.indexOf(addon_name[0]), 1);
            console.log(temp_list);
            setAddonlist(temp_list);
        }
        // console.log(addonlist);
    }

    const shopcheck = (open, close) => {

        var ok = false;
        const opening_time = open;
        const closing_time = close;
        var d = new Date();
        var hrs = d.getHours();
        var mins = d.getMinutes();
        var secs = d.getSeconds();
        var time = "";
        if (hrs < 10)
            time = ("0" + hrs);
        else time = hrs;
        time += ":";
        if (mins < 10)
            time += ("0" + mins);
        else
            time += mins;

        if (closing_time >= opening_time) {
            if (time >= opening_time && time <= closing_time) {
                ok = true;
            }
        }
        else {
            if ((time >= opening_time && time >= closing_time) || (time <= opening_time && time <= closing_time)) {
                ok = true;
            }
        }

        return ok;
    }

    const onSubmit_Save = (event) => {
        event.preventDefault();
        // console.log(addonlist);
        var addon_price = food_price;
        // console.log(temp_user);
        for (var i = 0; i < addonlist.length; i++) {
            temp_user.forEach(element => {
                if (element.addon == addonlist[i]) {
                    addon_price = addon_price + element.price;
                }
            });
        }

        // console.log(addon_price);
        // console.log(addon_price);
        addon_price *= quantity;
        // console.log(addon_price);
        let flag = 0;

        const moneychange = {
            Email: localStorage.getItem('Email'),
            Wallet: addon_price
        }

        axios
            .post("api/Buyer/wallet_subtract", moneychange)
            .then((response) => {
                flag = 1;
                // console.log(response.data);
                // alert("Wallet Updated Successfully");
            })
            .catch((error) => {
                alert("Insufficient balance");
                console.log(error);
            })
            .finally(() => {
                var d = new Date();
                var hrs = d.getHours();
                var mins = d.getMinutes();
                var secs = d.getSeconds();
                var time = "";
                if (hrs < 10)
                    time = ("0" + hrs);
                else time = hrs;
                time += ":";
                if (mins < 10)
                    time += ("0" + mins);
                else
                    time += mins;
                time += ":";
                if (secs < 10)
                    time += ("0" + secs)
                else
                    time += secs;

                const orderinfo = {
                    Placed_Time: time,
                    Vendor_Name: shop_name,
                    Food_Item: item_name,
                    Quantity: quantity,
                    Status: "PLACED",
                    Addon: addonlist,
                    Buyer_Email: localStorage.getItem('Email'),
                    Cost: addon_price
                }
                // console.log(orderinfo);
                if (flag) {
                    axios
                        .post("api/Order/add_Order", orderinfo)
                        .then((response) => {
                            alert("Order Placed Successfully");
                        })
                        .catch((error) => {
                            alert("Error occured");
                            console.log(error);
                        })
                        .finally(() => {
                            setFood_price(0);
                            setshop_name("");
                            setitem_name("");
                            window.location.href = "/buyer_Food_Menu";
                        })
                }
            })


        // console.log(addon_price);
        setOpen(false);
    };

    const showaddons = (event) => {
        const IND = event.target.value
        setTemp_user(user[IND].Addons);
        setquantity("");
        setFood_price(user[IND].Price);
        setshop_name(user[IND].Shop_Name);
        setitem_name(user[IND].Item_Name);
        setAddonlist([]);
        let temp_dict = user[IND].Addons;
        let faltu_string = "";
        let final_dict = []
        temp_dict.forEach(element => {
            faltu_string += element.addon + ',' + element.price + ',';
        });
        faltu_string = faltu_string.slice(0, -1);
        setAddonsString(faltu_string)
        setOpen(true);
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
                                    <TableCell>Addons</TableCell>
                                    <TableCell>Shop_Name</TableCell>
                                    <TableCell>
                                        {" "}
                                        <Button onClick={sortChange2}>
                                            {sortName2 ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                                        </Button>
                                        Rating
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    user.map((Food_Item, ind) => {
                                        // if (dict[Food_Item.Shop_Name])
                                        return (<TableRow key={ind} >
                                            <TableCell >{ind + 1}</TableCell>
                                            <TableCell >{Food_Item.Price}</TableCell>
                                            <TableCell >{Food_Item.Item_Name}</TableCell>
                                            <TableCell >{Food_Item.Vegetarian == true ? "Veg" : "Non-Veg"}</TableCell>
                                            <TableCell >
                                                {Food_Item.Addons.map((varI, l) => (
                                                    <li>{varI.addon},{varI.price}</li>
                                                ))}
                                            </TableCell>
                                            <TableCell >{Food_Item.Shop_Name}</TableCell>
                                            <TableCell >
                                                {Food_Item.Rating}
                                                {console.log(dict[Food_Item.Shop_Name])}
                                            </TableCell>
                                            <Button color="secondary" variant="outlined" value={ind} onClick={showaddons} disabled={!dict[Food_Item.Shop_Name]} >Buy</Button>
                                        </TableRow>)



                                    })
                                }
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
            </Grid >
            <div>

                <Dialog open={open} onClose={handleClose}>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Quantity"
                            type="email"
                            fullWidth
                            variant="standard"
                            value={quantity}
                            onChange={onChangequantity}
                        />
                        {


                            <TableRow >
                                <TableCell>
                                    {temp_user.map((varI, l) =>
                                    (
                                        <FormGroup>
                                            <FormControlLabel onChange={onChangecheck} value={[varI.addon, varI.price]} control={<Switch />} label={varI.addon + ", Rs: " + varI.price} />
                                        </FormGroup>
                                    ))}
                                </TableCell>
                            </TableRow>

                        }
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

export default BuyerList;
