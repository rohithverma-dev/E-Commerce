const User = require("../models/userModel");
const jwt = require("jsonwebtoken")

exports.isAuthenticatedUser =  async (req, res , next) => {
    
    const token = req.cookies.token; 

    if (!token) {
              
        res.json({
            success:false,
            Error_message:"No Token , please please login to access this resourse, 401",
            user:null
        })
     
        return "unhandle error"
    }
    // console.log("rohit verma");
    const decodeData = jwt.verify(token , process.env.JWT_SECRET             
        ,function (err , decoded) {
          if (err) {
            res.cookie("token", null, {             // if token in browser cookie
                expires: new Date(Date.now()),
                httpOnly: true,
                secure:true    // In production (on Vercel), your app is likely running over HTTPS, so the secure flag must be set to true for cookies to be sent.
            })
            res.json({
                success:false,
                Error_message:"No Token ,  please Login Again to access this resourse",
                user:null
            })
            console.log("error JWT ");
            console.log("decoded" , decoded);
         }
        //  console.log("decoded" , decoded);
         return decoded
     }   
     )

    // console.log("decodeData",decodeData);
    if (decodeData) {
        req.user = await User.findById(decodeData._id)
        next()
    }else{
        return
    }
}

exports.authorizeRoles = (...roles)=>{
    return (req , res , next )=>{
        if (!roles.includes(req.user.role)) {                      
            res.send(`Role ${req.user.role} is not allowed to acces the resourses , 403`)
            return "unhandle error"
        }
        next();
    }
}

// 63cd5320ff297e05f2185ddd
// 63cd5320ff297e05f2185ddd


