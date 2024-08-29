const Orders = require("../models/orderModel");
const Product = require("../models/produactModel");   

// create new order 
exports.newOrder = async (req, res) => {
 try {

    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body

    const order = await Orders.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id 
    })

    res.status(201).json({
        success:true,
        message:"Your Order Has Been Created Successfully",
        order,
    })



}  catch (error) {
    if (error.message === "Plan executor error during findAndModify :: caused by :: E11000 duplicate key error collection: Ecommerce.users index: email_1 dup key: { email: \"rv171613@gmail.com\" }") {
        error.message = "this mail Id Already exists"
        res.json({
            Error_message:error.message
        })
    }else{
         res.json({
            Error_message:error.message
         })
     }
}
}

// get Single Order
exports.getSingleOrder = async (req, res) => {
try {


    const order = await Orders.findById(req.params.id).populate(
        "user",
        "name email"
    )
    if (!order) {     
        res.status(404).json({
            success: false,
            Error_message:"Order Not Found "
        })
        return "unhandle error"
    }

    res.status(200).json({
        success: true,
        message:"Order Detals",
        order
    })


}  catch (error) {
    if (error.message === "Plan executor error during findAndModify :: caused by :: E11000 duplicate key error collection: Ecommerce.users index: email_1 dup key: { email: \"rv171613@gmail.com\" }") {
        error.message = "this mail Id Already exists"
        res.json({
            Error_message:error.message
        })
    }else{
         res.json({
            Error_message:error.message
         })
     }
}
}

// get  All orders ( particular user)
exports.myOrders = async (req, res) => {
try {


    const orders = await Orders.find({user:req.user._id})
    if (!orders) {     
        res.status(404).json({
            success: false,
            Error_message:"Orders Not Found "
        })
        return "unhandle error"
    }
    res.status(200).json({
        success: true,
        message:"Your All Orders",
        orders
    })


}  catch (error) {
    if (error.message === "Plan executor error during findAndModify :: caused by :: E11000 duplicate key error collection: Ecommerce.users index: email_1 dup key: { email: \"rv171613@gmail.com\" }") {
        error.message = "this mail Id Already exists"
        res.json({
            Error_message:error.message
        })
    }else{
         res.json({
            Error_message:error.message
         })
     }
}
}

// get All orders  -- admin
exports.getAllOrders = async (req, res) => {
try {


    const orders = await Orders.find()
    if (!orders) {     
        res.status(404).json({
            success: false,
            Error_message:"Orders Not Found "
        })
        return "unhandle error"
    }
    let totalAmount =0
    orders.forEach((order)=>{
        totalAmount+=order.totalPrice
    })
    res.status(200).json({
        success: true,
        message:"all orders",
        totalAmount,
        orders
    })


}  catch (error) {
    if (error.message === "Plan executor error during findAndModify :: caused by :: E11000 duplicate key error collection: Ecommerce.users index: email_1 dup key: { email: \"rv171613@gmail.com\" }") {
        error.message = "this mail Id Already exists"
        res.json({
            Error_message:error.message
        })
    }else{
         res.json({
            Error_message:error.message
         })
     }
}
}

// update order Status  -- admin
exports.updateOrder = async (req, res) => {
try {



    const order = await Orders.findById(req.params.id)
    if (!order) {     
        res.status(404).json({
            success: false,
            Error_message:"Order Not Found "
        })
        return "unhandle error"
    }
    if (order.orderStatus==="Delivered") {
        res.status(404).json({
            success: false,
            Error_message:"you have alredy Delivered this Order"
        })
        return "unhandle error"
    }   
    if (req.body.status === "Shipped") {
        order.orderItems.forEach(async (o) => {
          await updateStock(o.product, o.quantity);
        });
      }
      order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
        order.deliverAt = Date.now()    
    }
   
    await order.save({validateBeforeSave:false})
    res.status(200).json({
        success: true,
        message:"Your Order Has Updated Successfully",
        order
    })


}  catch (error) {
    if (error.message === "Plan executor error during findAndModify :: caused by :: E11000 duplicate key error collection: Ecommerce.users index: email_1 dup key: { email: \"rv171613@gmail.com\" }") {
        error.message = "this mail Id Already exists"
        res.json({
            Error_message:error.message
        })
    }else{
         res.json({
            Error_message:error.message
         })
     }
}
}

async function updateStock(id , quantitty) {
 try {


    const product = await Product.findById(id)
    console.log(product);
    console.log("Stock" ,product.Stock);
    product.Stock  -= quantitty
    await product.save({validateBeforeSave:false})


}  catch (error) {
    if (error.message === "Plan executor error during findAndModify :: caused by :: E11000 duplicate key error collection: Ecommerce.users index: email_1 dup key: { email: \"rv171613@gmail.com\" }") {
        error.message = "this mail Id Already exists"
        res.json({
            Error_message:error.message
        })
    }else{
         res.json({
            Error_message:error.message
         })
     }
}
}

// delete Orders  -- admin
exports.deleteOrder = async (req, res) => {
try {


    const order = await Orders.findById(req.params.id)
    if (!order) {     
        res.status(404).json({
            success: false,
            Error_message:"Order Not Found "
        })
        return "unhandle error"
    }
    await order.remove()
    res.status(200).json({
        success: true,
        message:"Your Order  Deleted Successfully",
        order
    })


}  catch (error) {
    if (error.message === "Plan executor error during findAndModify :: caused by :: E11000 duplicate key error collection: Ecommerce.users index: email_1 dup key: { email: \"rv171613@gmail.com\" }") {
        error.message = "this mail Id Already exists"
        res.json({
            Error_message:error.message
        })
    }else{
         res.json({
            Error_message:error.message
         })
     }
};
};
