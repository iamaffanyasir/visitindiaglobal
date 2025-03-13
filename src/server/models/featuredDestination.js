const mongoose = require('mongoose');

const featuredDestinationSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  days: {
    type: Number,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  activities: {
    type: [String],
    required: true
  }
});

module.exports = mongoose.model('FeaturedDestination', featuredDestinationSchema);
