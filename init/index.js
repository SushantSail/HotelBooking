const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(() => {
    console.log("Connected to DB");
}).catch(err => {
    console.error("Connection error", err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("Database initialized with seed data.");
}

initDB();


//my predefined data in data.js is being inserted into the database, but only when i run index.js.
//node index.js This connects to MongoDB, deletes all existing listings, and re-inserts my sample listings.

