const express = require("express");
<<<<<<< HEAD
const app = express();
const mongoose = require("mongoose");
const ejs = require("ejs");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// call main method for db connection
main().then(() => {
    console.log("Successfully connected to DB");
}).catch(err => {
    console.log(err);
=======
const mongoose = require("mongoose");
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate");
const path = require("path");
const Listing = require("./models/listing");

const app = express();
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// Connect to MongoDB
main().then(() => {
    console.log("Successfully connected to DB");
}).catch(err => {
    console.error("Database connection error:", err);
>>>>>>> d1d732f (Initial clean commit with .gitignore)
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

<<<<<<< HEAD
=======
// Setup
app.engine('ejs', ejsMate);
>>>>>>> d1d732f (Initial clean commit with .gitignore)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
<<<<<<< HEAD
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
    res.send("Hi ,i'm root");
});

// Index route
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
});

// New route
=======
app.use(express.static(path.join(__dirname, "/public")));

// Home Route
app.get("/", (req, res) => {
    res.render("listings/home.ejs");
});

// Index Route
app.get("/listings", async (req, res, next) => {
    try {
        const allListings = await Listing.find({});
        res.render("listings/index.ejs", { allListings });
    } catch (err) {
        next(err);
    }
});

// New Form
>>>>>>> d1d732f (Initial clean commit with .gitignore)
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});

<<<<<<< HEAD
// Show route
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
});

// Create route
app.post("/listings", async (req, res) => {
    //   let {title, description, image, price ,location ,country} = req.body;
    const newListing = new Listing(req.body.listing)
    await newListing.save();
    // console.log(newListing);
    res.redirect("/listings")
});

// Edit route
app.get("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
});

//Update Route  
app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect("/listings");
});

//Update Route  
app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect("/listings");
});

//Delete Route
app.delete("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
});


// app.get("/testListing", async (req, res) =>{
//     let sampleListing = new Listing ({
//         title : "My New Villa",
//         description : "Jumbo Paradise-Barrel Villa Luxury Suite with pool",
//         price : 1200,
//         location : "Pawna Lake, Maharashtra",
//         country :"India",
//     });

//     await sampleListing.save();
//     console.log("Sample was saved");
//     res.send("Sucessful testing");
// });



app.listen(8008, () => {
    console.log("Server running at port 8080");
});
=======
// Create Route
app.post("/listings", async (req, res, next) => {
    try {
        const newListing = new Listing(req.body.listing);
        await newListing.save();
        res.redirect("/listings");
    } catch (err) {
        next(err);
    }
});

// Show Route
app.get("/listings/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const listing = await Listing.findById(id);
        if (!listing) throw new Error("Listing not found");
        res.render("listings/show.ejs", { listing });
    } catch (err) {
        next(err);
    }
});

// Edit Form
app.get("/listings/:id/edit", async (req, res, next) => {
    try {
        const { id } = req.params;
        const listing = await Listing.findById(id);
        if (!listing) throw new Error("Listing not found");
        res.render("listings/edit.ejs", { listing });
    } catch (err) {
        next(err);
    }
});

// Update Route
app.put("/listings/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        await Listing.findByIdAndUpdate(id, req.body.listing);
        res.redirect("/listings");
    } catch (err) {
        next(err);
    }
});

// Delete Route
app.delete("/listings/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        await Listing.findByIdAndDelete(id);
        res.redirect("/listings");
    } catch (err) {
        next(err);
    }
});

// 404 Route
app.use((req, res, next) => {
    res.status(404).send("Page Not Found");
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("Error:", err.message);
    res.status(500).send("Something went wrong: " + err.message);
});

// Start Server
app.listen(8008, () => {
    console.log("Server running on http://localhost:8008");
});
>>>>>>> d1d732f (Initial clean commit with .gitignore)
