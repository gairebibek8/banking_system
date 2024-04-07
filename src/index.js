const express = require('express');
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config");

const app = express();

// convert data into json format
app.use(express.json());


app.use(express.urlencoded({ extended: false }));

// set EJS as view engine
app.set('view engine', 'ejs');

// static file path
app.use(express.static("public"));


app.get("/", (req, res) => {
    res.render("login");
});


app.get("/signup", (req, res) => {
    res.render("signup");
});


// Register User
app.post("/signup", async (req, res) => {

    const data = {
        name: req.body.username,
        password: req.body.password
    }

    const userdata = await collection.insertOne(data);
    console.log(userdata);
});


// define port connection for user
const port = 5000;
app.listen(port, () => {
    console.log(`Server running on Port: ${port}`);
})