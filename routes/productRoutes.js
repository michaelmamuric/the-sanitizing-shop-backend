import express from 'express';
import Product from '../models/product.js';

const router = express.Router();

// Get all products
router.get('/', async(req, res) => {
    try {
        const products = await Product.find();
        res.send(products);
    }
    catch(error) {
        res.status(500).send(error.message)
    }
})

// Create new product
router.post('/', async(req, res) => {
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