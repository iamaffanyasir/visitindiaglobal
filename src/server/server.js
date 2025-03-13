const path = require('path');
const envPath = path.join(__dirname, '../../.env');
console.log('Loading .env from:', envPath);
require('dotenv').config({ path: envPath });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');

// Log environment variables
console.log('Environment variables after loading:', {
  MONGODB_URI: process.env.MONGODB_URI ? 'Set' : 'Not set',
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  PWD: process.cwd(),
});

const app = express();

// Enhanced CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5000', 'https://visitindiaglobalv2.vercel.app'],
  credentials: true
}));

app.use(express.json());

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Backend server is running' });
});

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

// MongoDB Connection
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Models
const Carousel = require('./models/carousel');
const FeaturedDestination = require('./models/featuredDestination');

// Routes
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working' });
});

app.post('/api/carousel', upload.single('image'), async (req, res) => {
  try {
    const { heading, locations } = req.body;
    const carousel = new Carousel({
      image: `/uploads/${req.file.filename}`,
      heading,
      locations: JSON.parse(locations)
    });
    await carousel.save();
    res.status(201).json(carousel);
  } catch (error) {
    console.error('Error creating carousel:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/carousel', async (req, res) => {
  try {
    const slides = await Carousel.find().sort('order');
    res.json(slides);
  } catch (error) {
    console.error('Error fetching carousel:', error);
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/carousel/:id', async (req, res) => {
  try {
    await Carousel.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting carousel:', error);
    res.status(500).json({ error: error.message });
  }
});

// Featured Destinations Routes
app.get('/api/featured-destinations', async (req, res) => {
  try {
    const destinations = await FeaturedDestination.find().sort('heading');
    res.json(destinations);
  } catch (error) {
    console.error('Error fetching destinations:', error);
    res.status(500).json({ message: error.message });
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
      heading,
      caption,
      description,
      days: Number(days),
      startDate,
      endDate,
      price: Number(price),
      activities: JSON.parse(activities),
      image: `/uploads/${req.file.filename}`
    });

    const newDestination = await destination.save();
    res.status(201).json(newDestination);
  } catch (error) {
    console.error('Error creating destination:', error);
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/featured-destinations/:id', async (req, res) => {
  try {
    const destination = await FeaturedDestination.findById(req.params.id);
    if (destination) {
      await FeaturedDestination.findByIdAndDelete(req.params.id);
      res.json({ message: 'Destination deleted' });
    } else {
      res.status(404).json({ message: 'Destination not found' });
    }
  } catch (error) {
    console.error('Error deleting destination:', error);
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5000;

// Connect to MongoDB before starting the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Failed to start server:', err);
});

// Error handling
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  process.exit(1);
});
