var express = require("express");
var router = express.Router(); // gets the router from express

// Load Food_Item model
const Food_Item = require("../models/Food_Item");
const Vendor = require("../models/Vendor");

// GET request 
// Getting all the Food_Items
router.get("/", function (req, res) {
    Food_Item.find(function (err, Food_Item) {
        if (err) {
            console.log(err);
        } else {
            res.json(Food_Item);
        }
    })
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a Food_Item to db
router.post("/Add_Food_Item", (req, res) => {
    const email = req.body.Email;
    var shopname = "";
    Vendor.findOne({ Email: email }).then(vendor => {
        // Check if vendor email exists
        if (!vendor) {
            res.status(404).json({
                error: "Vendor not found",
            });
        }
        else {
            shopname = vendor.Shop_Name;
            const newFood_Item = new Food_Item({
                Item_Name: req.body.Item_Name,
                Price: req.body.Price,
                Vegetarian: req.body.Vegetarian,
                Addons: req.body.Addons,
                Tags: req.body.Tags,
                Shop_Name: shopname
                // Shop_Name : req.body.Shop_Name
            });

            newFood_Item.save()
                .then(Food_Item => {
                    res.status(201).json(Food_Item); // changed by me from 200 to 201
                })
                .catch(err => {
                    res.status(400).send(err);
                });
        }
        // return res.status(201);
    });

});

// POST request 
// Login
router.post("/Edit_Food_Item", (req, res) => {

    const _id = req.body._id;

    Food_Item.findOne({ _id })
        .then(food_Item => {
            if (!food_Item) {

                return res.status(400).send("Item does not exist");
            }
            else {
                food_Item.Item_Name = req.body.Item_Name
                food_Item.Price = req.body.Price
                food_Item.Vegetarian = req.body.Vegetarian
                food_Item.Addons = req.body.Addons
                food_Item.Tags = req.body.Tags

                food_Item.save()
                    .then(food_Item => {
                        res.status(201).json(food_Item); // changed by me from 200 to 201
                    })
                    .catch(err => {
                        res.status(400).send(err);
                    });

                // return res.status(200).send({ message: "Food_Item deleted successfully", Food_Item: food_Item });
            }
        })
        .catch(err => {
            res.status(400).send(err);
            console.log("error occured");
        });

});

router.post("/Delete_Food_Item", (req, res) => {
    // const item_Name = req.body.Item_Name;
    const _id = req.body._id;
    // Find Food_Item by email
    Food_Item.findOne({ _id })
        .then(food_Item => {
            if (!food_Item) {

                return res.status(400).send("Item does not exist");
            }
            else {
                food_Item.remove();
                return res.status(200).send({ message: "Food_Item deleted successfully", Food_Item: food_Item });
            }
        })
        .catch(err => {
            res.status(400).send(err);
            console.log("error occured");
        });

});

router.post("/update_rating", (req, res) => {
    // const item_Name = req.body.Item_Name;
    const Item_Name = req.body.Item_Name;
    const avg_rating = req.body.Rating;
    const Vendor_Name = req.body.Vendor_Name;
    console.log(avg_rating);
    Food_Item.findOne({ Item_Name: Item_Name, Shop_Name: Vendor_Name }, function (err, food_Item) {
        if (err) {
            res.status(400).send("Item does not exist");
        }
        else {
            console.log(food_Item.Rating);
            food_Item.Rating = (((food_Item.Rating) * (food_Item.Number_Reviews)) + (avg_rating)) / (food_Item.Number_Reviews + 1);
            food_Item.Number_Reviews = food_Item.Number_Reviews + 1;
            food_Item.save()
                .then(food_Item => {
                    res.status(201).json(food_Item); // changed by me from 200 to 201
                })
                .catch(err => {
                    res.status(400).send(err);
                });
        }
    });

});



module.exports = router;

