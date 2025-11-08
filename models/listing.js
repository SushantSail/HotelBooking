const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        type: String,
        default: "https://www.spinxdigital.com/app/uploads/2022/11/image-airbnb.jpg",
        set: v => v === "" ? "https://www.spinxdigital.com/app/uploads/2022/11/image-airbnb.jpg" : v
    },
    price: Number,
    location: String,
    country: String,
    rating: Number
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
