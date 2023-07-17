const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
});

const bookingSchema = new Schema({
  name: String,
  email: String,
  checkIn: Date,
  checkOut: Date,
});

locationSchema.add({
  bookings: [bookingSchema],
});

const Location = mongoose.model('Location', locationSchema);
module.exports = Location;
