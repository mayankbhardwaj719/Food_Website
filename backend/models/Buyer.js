const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BuyerSchema = new Schema({
	Name: {
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
		type: Number,
		required: true,
		min: 0

	},
    Batch_Name:{
		type: String,
		required: true
	},
	Password:{
		type: String,
		required: true
	},
	Wallet:{
		type: Number,
		default: 0,
		min:0
	}

});

module.exports = Buyer = mongoose.model("Buyer", BuyerSchema);
