import express from 'express';
import Order from '../models/order.js';

const router = express.Router();

// Set Headers
const setHeaders = (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
    next();
}

// Get all orders
router.get('/', setHeaders, async(req, res) => {
    try {
        const orders = await Order.find();
        res.send(orders);
    }
    catch(error) {
        res.status(500).send(error.message)
    }
})

// Get orders by one user
router.get('/user/:id', setHeaders, async(req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.id });
        res.send(orders);
    }
    catch(error) {
        res.status(500).send(error.message)
    }
})

// Create new order
router.post('/', setHeaders, async(req, res) => {
    const newOrder = new Order({
        userId: req.body.userId,
        purchaseDate: req.body.purchaseDate !== null ? req.body.purchaseDate : new Date(),
        shippingHouseNumber: req.body.shippingHouseNumber,
        shippingStreetNumber: req.body.shippingStreetNumber,
        shippingCity: req.body.shippingCity,
        shippingProvince: req.body.shippingProvince,
        shippingPostalCode: req.body.shippingPostalCode,
        items: req.body.items
    });

    try {
        const addedOrder = await newOrder.save();
        res.status(201).send(addedOrder);
    }
    catch(error) {
        res.status(400).send(error.message)
    }
})

export default router;