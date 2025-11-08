require("dotenv").config(); // Load environment variables first
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const path = require("path");
const Listing = require("./models/listing");

const app = express();

// ✅ MongoDB Connection
const MONGO_URL = process.env.MONGO_URL;

async function main() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("✅ Successfully connected to MongoDB Atlas");
  } catch (err) {
    console.error("❌ Database connection error:", err.message);
  }
}
main();

// ✅ App Setup
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// ✅ Routes

// Home Page
app.get("/", (req, res) => {
  res.render("listings/home.ejs");
});

// Index Page – Show all listings
app.get("/listings", async (req, res, next) => {
  try {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  } catch (err) {
    next(err);
  }
});

// New Listing Form
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

// Create Listing
app.post("/listings", async (req, res, next) => {
  try {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
  } catch (err) {
    next(err);
  }
});

// Show Single Listing
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

// Update Listing
app.put("/listings/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await Listing.findByIdAndUpdate(id, req.body.listing);
    res.redirect("/listings");
  } catch (err) {
    next(err);
  }
});

// Delete Listing
app.delete("/listings/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
  } catch (err) {
    next(err);
  }
});

// 404 Page
app.use((req, res) => {
  res.status(404).send("404 - Page Not Found");
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("⚠️ Error:", err.message);
  res.status(500).send("Something went wrong: " + err.message);
});

// ✅ Start Server
const PORT = process.env.PORT || 8008;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
