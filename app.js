const express = require("express");
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
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
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
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});

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