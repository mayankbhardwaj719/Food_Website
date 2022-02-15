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
import emailjs from '@emailjs/browser';

const OrderList = (props) => {

    const [user, setuser] = useState([]);
    const [sorteduser, setSorteduser] = useState([]);
    const [sortName, setSortName] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [shopname, setshopname] = useState("");
    const [count, setcount] = useState("");

    useEffect(() => {

        // extracting shop name from vendor
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
            });

        // console.log("hi");



    }, []);

    useEffect(() => {
        axios
            .post("api/Order", { "Shop_Name": shopname })
            .then((response) => {
                console.log(response.data);
                setuser(response.data);
                setSorteduser(response.data);
                setSearchText("");
                var cnt=0;
                response.data.forEach((order) => {
                    if (order.Status == "ACCEPTED" || order.Status == "COOKING") {
                        cnt = cnt + 1;
                    }
                });
                setcount(cnt);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [shopname]);

    const sortChange = () => {
        let userTemp = user;
        const flag = sortName;
        userTemp.sort((a, b) => {
            if (a.Placed_Time != undefined && b.Placed_Time != undefined) {
                return (1 - flag * 2) * (new Date(a.Placed_Time) - new Date(b.Placed_Time));
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


    // const [Id, setId] = useState("");

    const ChangeStatus = (event) => {

        console.log(event.target.value);
        const IND = event.target.value;
        const Id=user[IND]._id;

        const newOrder = {
            Status: user[IND].Status,
            _id: Id
        };
        console.log(newOrder);
        if(newOrder.Status=="PLACED" && count==10)
        {
            alert("Can't accept more orders wait for some time");
        }
        else
        {
            axios
            .post("api/Order/update_status", newOrder)
            .then((response) => {
                if(user[IND].Status==="PLACED")
                {
                    emailjs.send("service_lg4ccz8", "template_hno068a", {
                        status: "Placed",
                        shop_name: shopname,
                        buyer: user[IND].Buyer_Email,
                    }, "user_VFqheCHMAXwwWYzw2BulN")
                        .then((result) => {
                            if (result.text === "OK") {
                                alert("Email sent order placed")
                                window.location.reload()
                            }
                            else {
                                console.log(result.text);
                                alert("Email sent order placed")
                                window.location.reload()
                            }
                        },(error) => {
                            alert("Error in email sending")
                            window.location.reload()
                            console.log(error.text);
                        });
                }
                console.log(response.data);
                alert("Successfully updated status");
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => window.location.reload())
        }
        

        // window.location.reload();

        // window.location.href="/orders";

    }

    const RejectStatus = (event) => {
        const IND = event.target.value;
        const Id=user[IND]._id;

        const newOrder = {
            Buyer_Email: user[IND].Buyer_Email,
            _id: Id,
            Cost : user[IND].Cost,
            Quantity : user[IND].Quantity
        }
        axios
            .post("api/Order/reject_status", newOrder)
            .then((response) => {
                console.log(response.data);
                emailjs.send("service_lg4ccz8", "template_hno068a", {
                    status: "Rejected",
                    shop_name: shopname,
                    buyer: user[IND].Buyer_Email,
                }, "user_VFqheCHMAXwwWYzw2BulN")
                    .then((result) => {
                        if (result.text === "OK") {
                            alert("Email sent order rejected")
                            window.location.reload()
                        }
                        else {
                            console.log(result.text);
                            alert("error in email sending")
                            window.location.reload()
                        }
                    },(error) => {
                        alert("Error in email sending")
                        window.location.reload()
                        console.log(error.text);
                    });
                alert("Successfully rejected");
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => window.location.reload())

        // window.location.href="/orders";
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
                                        Placed_Time
                                    </TableCell>
                                    <TableCell>Food_Item</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Addons</TableCell>
                                    <TableCell>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    user.map((Order, ind) => (
                                        // if (Order.Vendor_Name === shopname)
                                        <TableRow key={ind} >
                                            <TableCell>{ind+1}</TableCell>
                                            <TableCell>{Order.Placed_Time}</TableCell>
                                            <TableCell>{Order.Food_Item}</TableCell>
                                            <TableCell>{Order.Quantity}</TableCell>
                                            <TableCell>{Order.Addon.join(",")}</TableCell>
                                            {/* <TableCell>{Order.Status}</TableCell> */}
                                            <TableCell>
                                                <ButtonGroup>
                                                {Order.Status == "COMPLETED" ? <TextField variant="filled"  value={Order.Status} color="success" focused></TextField> : <TextField variant="outlined"  value={Order.Status}></TextField>}
                                                {Order.Status!="READY FOR PICKUP" && Order.Status!="COMPLETED" && Order.Status!="REJECTED" ? <Button variant="outlined" color="secondary" value={ind} onClick={ChangeStatus}>NEXT STAGE</Button> : <></>}
                                                {Order.Status=="PLACED" ? <Button variant="outlined" value={ind} onClick={RejectStatus} color="error">REJECT</Button> : <></>}
                                                </ButtonGroup>
                                                {/* {form == 'Edit' ? <Order_Edit /> : <Order_Delete />} */}
                                            </TableCell>
                                        </TableRow>
                                    )
                                    )
                                }
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default OrderList;
