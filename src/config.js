const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/login");

// check databse connection
connect.then(() => {
    console.log("Database connected successfully");
})
.catch(() => {
    console.log("Database could not be connected");
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
const UserModel = new mongoose.model("users", LoginSchema);

module.exports = {UserModel,connect};