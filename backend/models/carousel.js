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
    required: true
  },
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Carousel', carouselSchema);
