const express = require('express');
const path = require("path");
const bcrypt = require("bcrypt");
const { UserModel } = require("./config");

const app = express();

// Convert data into JSON format
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set EJS as view engine
app.set('view engine', 'ejs');

// Static file path
app.use(express.static("public"));

// Route for rendering the login page
app.get("/", (req, res) => {
    res.render("login");
});

// Route for rendering the signup page
app.get("/signup", (req, res) => {
    res.render("signup");
});

// Route for handling user signup
app.post("/signup", async (req, res) => {
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        
        // Create a new user document
        const newUser = new UserModel({
            name: req.body.name,
            password: hashedPassword
        });

        // Save the new user to the database
        await newUser.save();

        res.status(201).send("User registered successfully.");
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).send("Error registering user.");
    }
});

// Route for handling user login
app.post("/login", async (req, res) => {
    try {
        const user = await UserModel.findOne({ name: req.body.name });

        // Check if user exists
        if (!user) {
            return res.status(404).send("User not found.");
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMatch) {
            return res.status(401).send("Invalid password.");
        }

        // Successful login
        res.send("Login successful.");
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).send("Error logging in.");
    }
});

const port = 5001;
app.listen(port, () => {
    console.log(`Server running on Port: ${port}`);
});
