// creating token and saving cookie  
const sendToken = (user , message , statuscode , res)=>{
    // console.log("hii 1");
    const token = user.getJWTToken();
    // options for cookie
    const options = {
        expires : new Date(
            Date.now() + process.env.COOKIE_EXPIRE*24*60*60*1000
        ),
        httpOnly:true
    };

    res.status(statuscode).cookie("token", token , options).json({
        success:true,
        user , 
        message,
        token
    })

}

module.exports = sendToken;  






