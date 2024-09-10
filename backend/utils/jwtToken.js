// creating token and saving cookie  
const sendToken = (user , message , statuscode , res)=>{
    // console.log("hii 1");
    const token = user.getJWTToken();
    // options for cookie
    const options = {
        expires : new Date(
            Date.now() + process.env.COOKIE_EXPIRE*24*60*60*1000
        ),
        httpOnly:true , 
        secure:true    // In production (on Vercel), your app is likely running over HTTPS, so the secure flag must be set to true for cookies to be sent.
        // Ensure that the secure flag is set conditionally based on process.env.NODE_ENV to handle development (http) and production (https) environments correctly.
    };

    res.status(statuscode).cookie("token", token , options).json({
        success:true,
        user , 
        message,
        token
    })

}

module.exports = sendToken;  






