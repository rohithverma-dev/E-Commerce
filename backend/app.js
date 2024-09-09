const express = require('express')
const app = express();
var cors = require('cors');
const dotenv = require("dotenv");
// config   
dotenv.config({path:"./config/config.env"})
const corsConfig = {
    origin: process.env.FRONTEND_URL,               // Your frontend URL on Vercel
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
};
app.use(cors(corsConfig));

const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(fileUpload());

// route imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

app.get("/", (req, res )=>{
    res.json({
        message:"app working fine",
    })
})

app.use("/api/v1",product)
app.use("/api/v1",user)
app.use("/api/v1",order)
app.use("/api/v1", payment);


module.exports = app

