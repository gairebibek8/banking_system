const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://127.0.0.1:27017/login");


// check databse connection
connect.then(() => {
    console.log("Database connected successfully");
})
.catch((error) => {
    console.log("Database could not be connected", error);
});

// Create Schema
const LoginSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// collection part
const collection = new mongoose.model("users", LoginSchema);

module.exports = collection;