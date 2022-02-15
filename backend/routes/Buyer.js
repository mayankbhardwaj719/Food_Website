var express = require("express");
var router = express.Router(); // gets the router from express

// Load User model
const Buyer = require("../models/Buyer");

// GET request 
// Getting all the Buyers
router.get("/", function (req, res) {
    Buyer.find(function (err, Buyer) {
        if (err) {
            console.log(err);
        } else {
            res.json(Buyer);
        }
    })
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a Buyer to db
router.post("/register", (req, res) => {
    const newBuyer = new Buyer({
        Name: req.body.Name,
        Email: req.body.Email,
        Contact_Number: req.body.Contact_Number,
        Age: req.body.Age,
        Batch_Name: req.body.Batch_Name,
        Password: req.body.Password
    });

    newBuyer.save()
        .then(Buyer => {
            res.status(201).json({ message: "Buyer saved successfully!", Buyer: Buyer }); // changed by me from 200 to 201
            //console.log("Buyer saved successfully");
        })
        .catch(err => {
            res.status(400).send(err);
            console.log("error occured");
        });
});

// POST request 
// Login
router.post("/login", (req, res) => {
    const Email = req.body.Email;
    const Password = req.body.Password;
    // Find Buyer by email
    Buyer.findOne({ Email }).then(buyer => {
        // Check if Buyer email exists
        if (!buyer) {
            return res.status(404).json({
                error: "Email not found",
            });
        }
        else {
            if (buyer.Password == Password) {
                return res.send({ message: "Buyer logged in successfully", Buyer: buyer });
            }
            else {
                return res.status(404).json({
                    error: "Incorrect Password",
                    user: buyer
                });
            }
        }
    });
});

router.post("/profile", (req, res) => {
    const Email = req.body.Email;
    // Find Buyer by email
    Buyer.findOne({ Email }).then(buyer => {
        return res.send({ message: "Buyer found successfully", Buyer: buyer });
    });
});

router.post("/Edit_profile", (req, res) => {
    const Email = req.body.Email;
    const age = req.body.Age;
    const contact_Number = req.body.Contact_Number;
    const batch_Name = req.body.Batch_Name;
    const name = req.body.Name;
    const password = req.body.Password;
    // Find Buyer by email
    Buyer.updateOne({ Email },
        {
            $set:
            {
                Age: age,
                Contact_Number: contact_Number,
                Batch_Name: batch_Name,
                Name: name,
                Password: password
            }
        })
        .then(buyer => {
            return res.send({ message: "Buyer credentials updated successfully", Buyer: buyer });
        });
});

router.post("/wallet", (req, res) => {
    const Added_Money = req.body.Wallet;
    const Email = req.body.Email;
    // Find Buyer by email
    Buyer.findOne({ Email }).then(buyer => {
        // Check if Buyer email exists
        if (!buyer) {
            return res.status(404).json({
                error: "Email not found",
            });
        }
        else {
            if(Added_Money>=0)
            {
                buyer.Wallet = buyer.Wallet + Added_Money;
                buyer.save()
                .then(Buyer => {
                    res.status(201).json({ message: "Money added successfully!", Buyer: Buyer }); // changed by me from 200 to 201
                    //console.log("Buyer saved successfully");
                })
                .catch(err => {
                    res.status(400).send(err);
                    console.log("error occured");
                });
            }
            else {
                return res.status(404).json({
                    error: "Enter A Positive amount to be added"
                })
            }
        }


    });
});

router.post("/wallet_subtract", (req, res) => {
    const Subtracted_Money = req.body.Wallet;
    const Email = req.body.Email;
    console.log(Subtracted_Money);
    // Find Buyer by email
    Buyer.findOne({ Email }).then(buyer => {
        // Check if Buyer email exists
        if (!buyer) {
            return res.status(404).json({
                error: "Email not found",
            });
        }
        else {
            if( (buyer.Wallet - Subtracted_Money) >=0)
            {
                buyer.Wallet = buyer.Wallet - Subtracted_Money;
                buyer.save()
                .then(Buyer => {
                    res.status(201).json({ message: "Money Subtracted successfully!", Buyer: Buyer }); // changed by me from 200 to 201
                    //console.log("Buyer saved successfully");
                })
                .catch(err => {
                    res.status(400).send(err);
                    console.log("error occured");
                });
            }
            else {
                return res.status(404).json({
                    error: "Not enough amount in the wallet",
                })
            }
        }


    });
});


module.exports = router;

