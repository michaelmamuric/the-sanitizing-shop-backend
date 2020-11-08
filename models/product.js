import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stockCount: {
        type: Number,
        required: true
    },
    image: {
        type: String
    }
});

const productModel = mongoose.model('Product', productSchema);

export default productModel;