const mongoose = require('mongoose');

const carouselSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  heading: {
    type: String,
    required: true
  },
  locations: {
    type: [String],
    default: ['Location 1', 'Location 2', 'Location 3']
  },
  order: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Carousel', carouselSchema);
