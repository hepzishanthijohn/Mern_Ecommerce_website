//Schema form creating Products
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    id:{
        type: Number,
        required: true
    },
    name:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    new_price:{
        type: Number,
        required: true
    },
    old_price:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    available:{
        type: Boolean,
        default: true
    }
})

const Products = mongoose.model('Products', ProductSchema);

module.exports = Products;