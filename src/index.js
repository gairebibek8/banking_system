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

    // Check if the username already exists in the database
    const existingUser = await collection.findOne({ name: data.name });

    if (existingUser) {
        res.send(`<div style="font-size: 20px; text-align: center;">User already exists. Please choose a different username: <a href="/signup">Signup</a></div>`);
    } else {
        // Hash the password using bcrypt
        const saltRounds = 10; // Number of salt rounds for bcrypt
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword; // Replace the original password with the hashed one

    const userdata = await collection.insertMany(data);
    res.status(201).send(`<div style="font-size: 20px; text-align: center;">User registered successfully. <a href="/">Login here</a>.</div>`);

    console.log(userdata);

    }
});



// Login user 
app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.username });
        if (!check) {
            res.send("User name cannot found")
        }
        // Compare the hashed password from the database with the plaintext password
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if (!isPasswordMatch) {
            res.send("wrong Password");
        }
        else {
            res.render("home");
        }
    }
    catch {
        res.send("wrong Details");
    }
});


// define port connection for user
const port = 5001;
app.listen(port, () => {
    console.log(`Server running on Port: ${port}`);
})