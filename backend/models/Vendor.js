const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const VendorSchema = new Schema({
	Manager_Name: {
		type: String,
		required: true
	},
	Email: {
		type: String,
		required: true,
		unique: true
	},
	Contact_Number:{
		type: String,
		required: true
	},
    Age:{
		type: String,
		required: true
	},
    Shop_Name:{
		type: String,
		required: true,
		unique: true
	},
    Opening_Time:
    {
        type: String,
        required: true
    },
    Closing_Time:
    {
        type: String,
        required: true
    },
	Password:
	{
		type: String,
		required: true
	}

});

module.exports = Vendor = mongoose.model("Vendor", VendorSchema);
