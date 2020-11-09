import express from 'express';
import Product from '../models/product.js';

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

// Get all products
router.get('/', setHeaders, async(req, res) => {
    try {

        const products = await Product.find();
        res.send(products);
    }
    catch(error) {
        res.status(500).send(error.message)
    }
})

// Create new product
router.post('/', setHeaders, async(req, res) => {
    const newProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        stockCount: req.body.stockCount,
        image: req.body.image !== null ? req.body.image : null
    });

    try {
        const addedProduct = await newProduct.save();
        res.status(201).send(addedProduct);
    }
    catch(error) {
        res.status(400).send(error.message)
    }
})

export default router;