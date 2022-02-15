const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const Food_Item_Schema = new Schema({
	Item_Name: {
		type: String,
		required: true,
	},
	Price: {
		type: Number,
		required: true,
		min:0
	},
	Rating: {
		type: Number,
		required: false,
		default : 0
	},
    Vegetarian: {
		type: Boolean,
		required: true
	},
    Addons: [{"addon": String,"price": Number}],
    Tags: [String],
	Shop_Name : {
		type : String,
		required : true
	},
	Number_Reviews : {
		type : Number,
		required : false,
		default : 0
	}

});

module.exports = Food_Item = mongoose.model("Food_Item", Food_Item_Schema);
