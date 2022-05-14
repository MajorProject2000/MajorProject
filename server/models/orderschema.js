const mongoose = require('mongoose');

const orderSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    serviceType:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    professionalName:{
        type:String,
        required:true
    }
})

const Order = mongoose.model('orders', orderSchema);
module.exports = Order;