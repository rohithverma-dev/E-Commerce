const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please Enter Product Name"],
        trim: true
    },
    description: {    
        type: String,
        required: [true, "please Enter Product Description"]
    },
    price: {
        type: Number,
        required: [true, "please Enter Product Price"],
        max: [70000, " price should not greater then 70000"]
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, "please Enter Produact category"],
    },
    Stock: {
        type: Number,
        required: [true, "Please Enter ProductStock"],
        max: [45, "Stock Cannot greater than 45"],
        default: 1
    },
    Num_of_reviews: {
        type: Number,
        default: 0
    },
    ratings: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'User',
                required:true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    createdAt:{
        type:Date, 
        default:Date.now
    }

})

module.exports = mongoose.model("Product" , productSchema) 