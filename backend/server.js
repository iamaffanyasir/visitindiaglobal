require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

// Enhanced CORS configuration for both development and production
app.use(cors({
  origin: ['https://visitindiaglobal.vercel.app', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve static files with proper CORS and caching headers
app.use('/uploads', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Cache-Control', 'public, max-age=31536000, immutable');
  express.static(path.join(__dirname, 'uploads'))(req, res, next);
});

// Multer configuration for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// Models
const Carousel = require('./models/carousel');
const FeaturedDestination = require('./models/featuredDestination');

// Health check route
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Carousel routes
app.get('/api/carousel', async (req, res) => {
  try {
    const slides = await Carousel.find().sort('order');
    res.json(slides);
  } catch (error) {
    console.error('Error fetching carousel:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/carousel', upload.single('image'), async (req, res) => {
  try {
    const { heading } = req.body;
    const locations = JSON.parse(req.body.locations || '[]');
    
    const carousel = new Carousel({
      image: `/uploads/${req.file.filename}`,
      heading,
      locations
    });
    
    await carousel.save();
    res.status(201).json(carousel);
  } catch (error) {
    console.error('Error creating carousel:', error);
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/carousel/:id', async (req, res) => {
  try {
    const carousel = await Carousel.findById(req.params.id);
    if (carousel && carousel.image) {
      const imagePath = path.join(__dirname, carousel.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    await Carousel.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting carousel:', error);
    res.status(500).json({ error: error.message });
  }
});

// Featured Destinations routes
app.get('/api/featured-destinations', async (req, res) => {
  try {
    const destinations = await FeaturedDestination.find();
    res.json(destinations);
  } catch (error) {
    console.error('Error fetching destinations:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/featured-destinations', upload.single('image'), async (req, res) => {
  try {
    const {
      heading,
      caption,
      description,
      days,
      startDate,
      endDate,
      price,
      activities
    } = req.body;

    const destination = new FeaturedDestination({
      image: `/uploads/${req.file.filename}`,
      heading,
      caption,
      description,
      days: Number(days),
      startDate,
      endDate,
      price: Number(price),
      activities: JSON.parse(activities)
    });

    await destination.save();
    res.status(201).json(destination);
  } catch (error) {
    console.error('Error creating destination:', error);
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/featured-destinations/:id', async (req, res) => {
  try {
    const destination = await FeaturedDestination.findById(req.params.id);
    if (destination && destination.image) {
      const imagePath = path.join(__dirname, destination.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    await FeaturedDestination.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting destination:', error);
    res.status(500).json({ error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'An error occurred'
  });
});

// MongoDB Connection with better error handling
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error('MONGODB_URI is not defined in environment variables');
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
