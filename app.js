const express = require("express");
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
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

// Setup
app.engine('ejs', ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
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
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});

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
