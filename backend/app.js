const express = require('express')
const app = express();
var cors = require('cors')
const corsConfig = {
    credentials: true,     // Don't forget to specify this if you need cookies for chrome or other browser 
    origin: "http://localhost:3000",        // Don't forget to specify this if you need cookies for chrome or other browser 
};
app.use(cors(corsConfig));   

const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
const dotenv = require("dotenv");    
  
// config   
dotenv.config({path:"backend/config/config.env"})


app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(fileUpload())

// route imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");


app.use("/api/v1",product)
app.use("/api/v1",user)
app.use("/api/v1",order)
app.use("/api/v1", payment);


module.exports = app

