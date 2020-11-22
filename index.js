import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

// Configure .env contents
dotenv.config();
const app = express();

// Port Number
const port = process.env.PORT || 4000;

// Connect to the database
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to the database'));

// Use JSON
app.use(express.json());

// Use CORS
app.use(cors());

// Routes

// Home Route
app.get('/', (req, res) => {
    res.send('Homepage');
})

// Products Route
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.listen(port, () => console.log('Server is running'));