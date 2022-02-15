const express = require('express');
const app = express(); // app variable to configer our server
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 8000;
const DB_NAME = "tutorial"


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connection to MongoDB
// mongoose.connect('mongodb://127.0.0.1:27017/' + DB_NAME, { useNewUrlParser: true });
// const connection = mongoose.connection;
// connection.on('error',(error) => console.error(error)) // created by me
// connection.once('open', function() {
//     console.log("MongoDB database connection established successfully !");
// })
mongoose.connect('mongodb+srv://mayank:mayankcoc@cluster0.eqbos.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.on('error',(error) => console.error(error)) // created by me
connection.once('open', function() {
    console.log("MongoDB database connection established successfully !");
})

// routes
var testAPIRouter = require("./routes/testAPI");
var UserRouter = require("./routes/Users");
var BuyerRouter = require("./routes/Buyer");
var VendorRouter = require("./routes/Vendor");
var Food_ItemRouter = require("./routes/Food_Item");
var OrderRouter = require("./routes/Order");


// setup API endpoints
app.use("/testAPI", testAPIRouter);
app.use("/Buyer", BuyerRouter);
app.use("/Vendor", VendorRouter);
app.use("/Food_Item", Food_ItemRouter);
app.use("/Order", OrderRouter);

// tells us the port we want to listen using app.listen 
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
