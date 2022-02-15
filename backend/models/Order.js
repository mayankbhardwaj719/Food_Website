const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const Order_Schema = new Schema({

	Placed_Time: {
		type: String,
		required: true,
	},
	Vendor_Name: {
		type: String,
		required: true
	},
	Rating: {
		type: Number,
		required: false,
		default : 0
	},
    Food_Item: {
		type: String,
		required: true
	},
    Quantity :{
        type: Number,
        required: true,
		min:0
    } ,
    Status:{
        type: String,
        required: true
    },
    Addon:[String],
	Cost: {
		type: Number,
		required: true,
		min:0
	},
	Buyer_Email: {
		type:String,
		required: true
	}

});

module.exports = Order = mongoose.model("Order", Order_Schema);
