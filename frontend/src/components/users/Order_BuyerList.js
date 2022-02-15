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


const OrderList = (props) => {

    const [user, setuser] = useState([]);
    const [sorteduser, setSorteduser] = useState([]);
    const [sortName, setSortName] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [buyeremail, setbuyeremail] = useState("");
    const [status, setStatus] = useState("");
    const [Id, setId] = useState("");
    const [orderId, setOrderId] = useState("");
    const [rating, setrating] = useState("");

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {

        // extracting shop name from vendor
        const Buyerinfo = {
            Email: localStorage.getItem('Email')
        }
        axios
            .post("api/Buyer/profile", Buyerinfo)
            .then((response) => {
                setbuyeremail(response.data.Buyer.Email);
            })
            .catch((error) => {
                alert("Error occured");
                console.log(error);
            });

        // console.log("hi");



    }, []);

    useEffect(() => {
        axios
            .post("api/Order/buyer_order", { "Buyer_Email": buyeremail })
            .then((response) => {
                console.log(response.data);
                setuser(response.data);
                setSorteduser(response.data);
                setSearchText("");
            })
            .catch((error) => {
                console.log(error);
            });
    }, [buyeremail]);

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

    const onChangerating = (event) => {
        setrating(event.target.value);
    }
    // const [Id, setId] = useState("");

    const onSubmit_Save = (event) => {

        event.preventDefault();

        const newFood_Item_rating = {
            Item_Name: user[Id].Food_Item,
            Vendor_Name: user[Id].Vendor_Name,
            Rating: parseInt(rating)
        };
        console.log(newFood_Item_rating);
        axios
            .post("api/Food_Item/update_rating", newFood_Item_rating)
            .then((response) => {
                alert("Rating Successfully Updated \t");
                // console.log(response.data.Shop_Name);

                axios
                    .post("api/Order/completed_status", { "_id": orderId })
                    .then((response) => {
                        alert("Order completed");
                        // console.log(response.data.Shop_Name);
                    })
                    .catch((error) => {
                        console.log(error)
                        alert("Error occured while Order completion");
                    })
                    .finally(() => {
                        window.location.href = "/buyer_orders";
                    })
            })
            .catch((error) => {
                console.log(error)
                alert("Error occured while rating updation");
            });
        setOpen(false);
        // console.log(newFood_Item);


    };

    
    const AcceptStatus = (event) => {

        const IND = event.target.value;
        setStatus(user[IND].Status);
        setId(IND);
        setOrderId(user[IND]._id);
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
                                        Placed_Time
                                    </TableCell>
                                    <TableCell>Food_Item</TableCell>
                                    <TableCell>Vendor Name</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Cost</TableCell>
                                    <TableCell>Rating</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    user.map((Order, ind) => {
                                        if (Order.Buyer_Email === buyeremail)
                                            return (<TableRow key={ind} >
                                                <TableCell>{ind+1}</TableCell>
                                                <TableCell>{Order.Placed_Time}</TableCell>
                                                <TableCell>{Order.Food_Item}</TableCell>
                                                <TableCell>{Order.Vendor_Name}</TableCell>
                                                <TableCell>{Order.Quantity}</TableCell>
                                                <TableCell>{Order.Status}</TableCell>
                                                <TableCell>{Order.Cost}</TableCell>
                                                <TableCell>{Order.Rating}</TableCell>
                                                <TableCell>
                                                    <ButtonGroup>
                                                        {Order.Status == "READY FOR PICKUP" ? <Button variant="outlined" value={ind} onClick={AcceptStatus} >PICKED UP</Button> : <></>}
                                                        {Order.Status == "COMPLETED" ? <TextField variant="filled" value={Order.Status} color="success" focused></TextField> : <></>}
                                                    </ButtonGroup>
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
                            label="Enter The Rating You want To give to the Food"
                            type="email"
                            fullWidth
                            variant="standard"
                            value={rating}
                            onChange={onChangerating}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={onSubmit_Save}>Save</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
};

export default OrderList;
