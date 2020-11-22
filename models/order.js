import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    purchaseDate: {
        type: Date,
        default: new Date()
    },
    shippingHouseNumber: {
        type: String,
        required: true
    },
    shippingStreetNumber: {
        type: String,
        required: true
    },
    shippingCity: {
        type: String,
        required: true
    },
    shippingProvince: {
        type: String,
        required: true
    },
    shippingPostalCode: {
        type: String,
        required: true
    },
    items: {
        type: [],
        required: true
    }
});

const orderModel = mongoose.model('Order', orderSchema);

export default orderModel;