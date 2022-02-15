var express = require("express");
var router = express.Router(); // gets the router from express

// Load Order model
const Order = require("../models/Order");
const Buyer = require("../models/Buyer");

// GET request 
// Getting all the Orders of a given Vendor with a given shop name
router.post("/", function (req, res) {
    const shopname = req.body.Shop_Name;

    Order.find({Vendor_Name: shopname},function (err, order) {
        if (err) {
            res.status(400).send(err);
            console.log(err);
        } else {
            res.json(order);
        }
    })
});

router.post("/buyer_order", function (req, res) {
    const email = req.body.Buyer_Email;

    Order.find({Buyer_Email: email},function (err, order) {
        if (err) {
            res.status(400).send(err);
            console.log(err);
        } else {
            res.json(order);
        }
    })
});

router.post("/add_Order", (req, res) => {
    const newOrder = new Order({
        Placed_Time : req.body.Placed_Time,
        Vendor_Name : req.body.Vendor_Name,
        Food_Item : req.body.Food_Item,
        Quantity : req.body.Quantity,
        Status : req.body.Status,
        Addon : req.body.Addon,
        Buyer_Email : req.body.Buyer_Email,
        Cost : req.body.Cost
    });

    newOrder.save()
        .then(Order => {
            res.status(201).json({ message: "Order saved successfully!", Order: Order }); // changed by me from 200 to 201
            //console.log("Order saved successfully");
        })
        .catch(err => {
            res.status(400).send(err);
            console.log("error occured");
        });
});
// // NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// // POST request 
// // Add a Order to db
router.post("/update_status", (req, res) => {
    const _id = req.body._id;
    const status = req.body.Status;
    Order.findOne({ _id })
        .then(order => {
            if (!order) {

                return res.status(400).send("Item does not exist");
            }
            else {
                if(status=="PLACED")
                order.Status = "ACCEPTED"
                else if(status=="ACCEPTED")
                order.Status = "COOKING"
                else if(status=="COOKING")
                order.Status = "READY FOR PICKUP"

                order.save()
                .then(order => {
                    res.status(201).json(order); // changed by me from 200 to 201
                })
                .catch(err => {
                    res.status(400).send(err);
                });

                // return res.status(200).send({ message: "Order deleted successfully", Order: order });
            }
        })
        .catch(err => {
            res.status(400).send(err);
            console.log("error occured");
        });

});

router.post("/reject_status", (req, res) => {
    const _id = req.body._id;
    const Email = req.body.Buyer_Email;
    const cost = req.body.Cost;
    const quantity = req.body.Quantity;
    Order.findOne({ _id })
        .then(order => {
            if (!order) {

                return res.status(400).send("Item does not exist");
            }
            else {
                console.log(order);
                order.Status = "REJECTED"
                order.save()
                .then(ord => {
                    Buyer.findOne({Email})
                    .then(buyer => {
                        if(!buyer)
                        {
                            return res.status(400).send("Buyer does not exist");
                        }
                        else
                        {
                            buyer.Wallet = buyer.Wallet + (cost);
                            buyer.save()
                            .then(buy => {
                                res.status(201).json(buy) 
                            })
                            .catch(err => {
                                res.status(400).send(err);
                            });
                        }
                    })
                    .catch(err => {
                        res.status(400).send(err);
                    });
                    // Buyer.UpdateOne({Email},{$inc:{Wallet:cost}})
                    // .then
                    // (() => res.status(201).json(ord))
                    // .catch(err => {
                    //     res.status(400).send(err);
                    // }); // changed by me from 200 to 201
                })
                .catch(err => {
                    console.log("hi");
                    res.status(400).send(err);
                });

                // return res.status(200).send({ message: "ord deleted successfully", Order: order });
            }
        })
        .catch(err => {
            res.status(400).send(err);
            console.log("error occured");
        });

});

router.post("/completed_status", (req, res) => {
    const _id = req.body._id;
    Order.findOne({ _id })
        .then(order => {
            if (!order) {

                return res.status(400).send("Item does not exist");
            }
            else {
                order.Status = "COMPLETED"
                order.save()
                .then(order => {
                    res.status(201).json(order); // changed by me from 200 to 201
                })
                .catch(err => {
                    res.status(400).send(err);
                });

                // return res.status(200).send({ message: "Order deleted successfully", Order: order });
            }
        })
        .catch(err => {
            res.status(400).send(err);
            console.log("error occured");
        });

});
module.exports = router;

