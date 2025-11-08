require("dotenv").config();
const mongoose = require("mongoose");
const Listing = require("../models/listing");
const initData = require("./data");

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Connected to MongoDB");
}

main()
  .then(async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("✅ Database seeded successfully!");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("❌ Error seeding database:", err);
  });
