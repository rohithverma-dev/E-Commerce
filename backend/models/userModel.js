const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const userSchema = new mongoose.Schema({  
    name:{
        type: String,
        required: [true , "please Enter Your Name"],
        minLength : [4 , "Name Should have more than 4 character"],
        maxLength : [30 , "Name cannot exceed 30 characters"],
    },
    email:{
        type:String,
        required: [true , "please Enter your Email"],  
        unique:[true , "this emailId already exists"], 
        validate:[validator.isEmail , "Please Enter a valid Email"]
    },
    password : {
        type:String,
        required: [true , "please Enter your Password"],    
        minLength : [8 , "Name Should have more than 8 character"],
        select:false
    },
    avatar : {
        public_id: {  
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role : {
        type: String,
        default : "user"
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    resetPasswordToken : String,
    resetPasswordExpire : Date,
})

userSchema.pre("save" , async function  (next) {
    if (!this.isModified("password")) {
        next();  
    }
    this.password = await bcrypt.hash(this.password , 10)
} )
 
// JWT Token
userSchema.methods.getJWTToken = function (){
    return jwt.sign({_id:this._id}, process.env.JWT_SECRET , {
        expiresIn: process.env.JWT_EXPIRE,  
        // expiresIn:"1min",  
    }) ;
};


// compare password
userSchema.methods.comparePassword = async function (enteredPassword){
    // console.log("comparePassword run");
    return await bcrypt.compare(enteredPassword , this.password  )
}

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = async function (){
    // generatong Token
    const resetToken = crypto.randomBytes(20).toString("hex");
    // console.log("resetToken model " , resetToken);

    // hashing and adding resetPasswordToken to userschema
    this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex")
    // console.log("resetPasswordToken model " , this.resetPasswordToken );

    this.resetPasswordExpire = Date.now() + 5*60*1000;
    return resetToken ; 
}

module.exports = mongoose.model("User" , userSchema)  
