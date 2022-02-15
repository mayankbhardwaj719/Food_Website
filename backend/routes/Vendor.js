var express = require("express");
var router = express.Router(); // gets the router from express

// Load User model
const Vendor = require("../models/Vendor");

// GET request 
// Getting all the Vendors
router.get("/", function(req, res) {
    Vendor.find(function(err, Vendor) {
		if (err) {
			console.log(err);
		} else {
			res.json(Vendor);
		}
	})
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a Vendor to db
router.post("/register", (req, res) => {
    const newVendor = new Vendor({
        Manager_Name: req.body.Manager_Name,
        Email: req.body.Email,
        Contact_Number: req.body.Contact_Number,
        Age: req.body.Age,
        Shop_Name: req.body.Shop_Name,
        Opening_Time: req.body.Opening_Time,
        Closing_Time: req.body.Closing_Time,
        Password: req.body.Password
    });

    newVendor.save()
        .then(Vendor => {
           res.status(201).json({message: "Vendor saved successfully!", Vendor: Vendor}); // changed by me from 200 to 201
            //console.log("Vendor saved successfully");
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
	// Find Vendor by email
	Vendor.findOne({ Email }).then(vendor => {
		// Check if vendor email exists
		if (!vendor) {
			return res.status(404).json({
				error: "Email not found",
			});
        }
        else{
           if(vendor.Password==Password)
           {
               return res.send({message: "Vendor logged in successfully", Vendor: vendor});
           }
           else 
           {
            return res.status(404).json({
				error: "Incorrect Password",
                user: vendor
			});
           }
        }
	});
});

router.post("/profile", (req, res) => {
	const Email = req.body.Email;
	// Find Buyer by email
	Vendor.findOne({ Email }).then(vendor => {
        return res.send({message: "Vendor found successfully", Vendor: vendor});
	});
});

router.post("/Edit_profile", (req, res) => {
    const Email = req.body.Email;
    const age = req.body.Age;
    const contact_Number = req.body.Contact_Number;
    const shop_Name = req.body.Shop_Name;
    const Manager_name = req.body.Manager_Name;
    const password = req.body.Password;
    const opening_Time = req.body.Opening_Time;
    const closing_Time = req.body.Closing_Time;
    // Find Buyer by email
    Vendor.updateOne({ Email },
        {
            $set:
            {
                Age: age,
                Contact_Number: contact_Number,
                Shop_Name: shop_Name,
                Manager_Name: Manager_name,
                Password: password,
                Opening_Time : opening_Time,
                Closing_Time : closing_Time
            }
        })
        .then(vendor => {
            return res.send({ message: "Vendor credentials updated successfully", Vendor: vendor });
        });
});

module.exports = router;

