import axios from "axios";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { compose } from "@mui/system";


const Statistic = (props) => {

    const [user, setuser] = useState([]);
    const [shopname, setshopname] = useState("");
    const [Orders_Placed, setOrders_Placed] = useState(0);
    const [Pending_Orders, setPending_Orders] = useState(0);
    const [Completed_Orders, setCompleted_Orders] = useState(0);
    const [final_list, setfinal_list] = useState([]);

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
                var Placed = 0;
                var Pending = 0;
                var Completed = 0;
                response.data.forEach((order) => {
                    if (order.Status == "COMPLETED") {
                        Completed = Completed + 1;
                    }
                    else if (order.Status != "COMPLETED" && order.Status != "REJECTED") {
                        Pending = Pending + 1;
                    }
                    Placed = Placed + 1;
                });

                setfinal_list(top5(response.data));
                setOrders_Placed(Placed);
                setPending_Orders(Pending);
                setCompleted_Orders(Completed);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [shopname]);

    const top5 = (orders) => {
        let dict = {};
        orders.forEach((order) => {
            if (order.Food_Item in dict) {
                dict[order.Food_Item]++;
            }
            else {
                dict[order.Food_Item] = 1;
            }
        });
        var items = Object.keys(dict).map(function (key) {
            return [key, dict[key]];
        });

        // Sort the array based on the second element
        items.sort(function (first, second) {
            return second[1] - first[1];
        });

        // Create a new array with only the first 5 items
        console.log(items.slice(0, 5));
        let temp_list = [];
        for (var i = 0; i < 5; i++) {
            temp_list.push(items[i][0]);
        }
        return temp_list;
    }


    return (
        <Grid container align={"center"} spacing={2}>
            <Grid item xs={12}>
                <TextField
                    label="Orders_Placed"
                    variant="outlined"
                    value={Orders_Placed}
                    disabled
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Pending_Orders"
                    variant="outlined"
                    value={Pending_Orders}
                    disabled
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Completed_Orders"
                    variant="outlined"
                    value={Completed_Orders}
                    disabled
                />
            </Grid>
            <Grid item xs={12}>
                <h3>Top 5 orders</h3>
                {
                    final_list.map((Order, ind) => {
                        return (
                            <div>
                                {ind + 1 + ". " + Order}

                            </div>
                        )
                    })
                }
            </Grid>
        </Grid >
    );
}


export default Statistic;
