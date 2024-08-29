const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto")
const cloudinary = require("cloudinary").v2
const fs = require('fs');
// register a user
exports.registerUser = async (req, res, next) => {
 try {          
    let user = {}
    if (req.body.avatar !== "undefined") {
        let data = req.body.avatar;
        var img = Buffer.from(data.substr(23), 'base64');
        if ((img.byteLength / 1024) < 700) {
            const myCloud = await cloudinary.uploader.upload(req.body.avatar, {
                folder: "avatars", width: 150, crop: "scale", resource_type: "image"
            }, (err, img) => {
                if (err) {
                    // console.log("OOOO err", err);
                    res.json({
                        Error_message: "Image Uploading Server error",
                    })
                    return
                }
                // console.log("OOOO image", img);
                // console.log(" OOOO image , uploaded Successfully");
            });
            const { name, email, password } = req.body
             user = await User.create({
                name,
                email,
                password,
                avatar: {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                },
            });
        }
        else {
            res.status(400).json({ 
                success: false,
                image: data,
                Error_message: "Image size should be less than 700 KB"
            })
            return;
        }
    }

    let message = "User registered Successfully"
    sendToken(user, message ,200, res)



}  catch (error) {
    if (error.message === "Plan executor error during findAndModify :: caused by :: E11000 duplicate key error collection: Ecommerce.users index: email_1 dup key: { email: \"rv171613@gmail.com\" }") {
        error.message = "this mail Id Already exists"
        res.json({
            Error_message:error.message
        })
        return
    }else{
         res.status(400).json({
            Error_message:error.message
         })
         return 
     }
     return "unhandle error"
}
};

// Login User
exports.loginUser = async (req, res, next) => {
try {



    const { email, password } = req.body;

    // checking if user has giveen email and password both
    if (!email || !password) {
        res.status(401).json({
            Error_message: "Email or Password missing ",
            success: false
        })
        return "unhandle error"
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        res.status(401).json({
            Error_message: " invalid Email",
            success: false
        })
        return "unhandle error"
    };

    const isPasswordMatched = await user.comparePassword(password);


    if (!isPasswordMatched) {
        res.status(401).json({
            Error_message: "WrongPassword  ",
            success: false
        })
        return "unhandle error"
    }
    let message = "User Loggin Successfully"
    sendToken(user, message ,200, res)



    }  catch (error) {
        if (error.message === "Plan executor error during findAndModify :: caused by :: E11000 duplicate key error collection: Ecommerce.users index: email_1 dup key: { email: \"rv171613@gmail.com\" }") {
            error.message = "this mail Id Already exists"
            res.json({
                Error_message:error.message
            })
        }else{
             res.json({
                Error_message:error.message.slice(25,100)
             })
         }
    }
}

// LogOut User
exports.logout = async (req, res, next) => {
try {


    res.cookie("token", null, {              //when token in on browser
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: false,
        logout:true,
        user: null,
        message: "logged Out Successfully"
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

// forgot password
exports.forgotPassword = async (req, res, next) => {
try {


    // console.log(req.body);
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        res.status(404).json({
            Error_message: " User Not Found",
            success: false
        })
        return "unhandle error"
    };

    // Get ResetpasswordToken
    const resetToken = await user.getResetPasswordToken();
    
    await user.save({ validateBeforeSave: false })

    // const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`
    // const resetPasswordUrl = `${req.protocol}://localhost:3000/password/reset/${resetToken}`
    const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`
    // const resetPasswordUrl = "http://localhost:4000/api/v1/password/reset/16eb208ea56cc8aadb45337a40b70688918c8f7d"

    const message = `Your Password Reset Token is :- \n\n ${resetPasswordUrl} \n\n if you have not requested this email then , please ignore it.`

    try {
        // console.log( "email" , user.email);
        await sendEmail({
            email: user.email,
            subject: "Ecommerce Password Recovery",
            message
        });
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} Succesfully`
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined

        await user.save({ validateBeforeSave: false })
        res.status(500).json({
            success: false,
            Error_message: `Internal Server Error`
        })
        // res.send(` Forgot password ka error , 500 , ${error} `)
        return "unhandle error"
    }



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


exports.resetPassword = async (req, res, next) => {
try {


    // res.send("resetPassword")   
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex")

    console.log("resetpasswordToken  controller" , resetPasswordToken );
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })
    if (!user) {
        // console.log("Reset password Token is Invalid or has been Expired, 400");
        res.status(400).json({
            success: false,
            Error_message: `Reset password Token is Invalid or has been Expired`
        })
        // res.send("Reset password Token is Invalid or has been Expired, 400")
        return "unhandle error"
    }
    if (req.body.password !== req.body.confirmPassword) {
        res.status(400).json({
            success: false,
            Error_message: `Password Doesn't Match`
        })
        // res.send("Password Doesn't Match , 400")
        return "unhandle error"
    }
    // $2a$10$EIHzW0RNoRTwWoCJcEnbXevsy6HZH8Bss6sjIJRIypSZJfVHOSAU.
    // $2a$10$VZCZsuigEEUtQ9U9LjO7C.cTyKnfiZ7y14Acpm1kjR0KUmR4ZWFhi
    user.password = req.body.password
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined
    await user.save()
    let message = "Password Changed Successfully"
    sendToken(user, message ,200, res)


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

exports.getUserDetails = async (req, res, next) => {
try {


    let user = await User.findById(req.user.id)
    if (!user) {
        res.status(404).json({
            Error_message: " User Not Found",
            success: false
        })
        return "unhandle error"
    };
    // const email = user.email
    //  user = await User.findOne({email})
    res.status(200).json({
        success: true,
        message :`${user.name} Details`,
        user
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

exports.changePassword = async (req, res, next) => {
try {


    let user = await User.findById(req.user.id).select("+password")
  
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    console.log("isPasswordMatched", isPasswordMatched);
    if (!isPasswordMatched) {
      
            res.status(404).json({
                Error_message: "Old Password is incorrect",
                success: false
            })
            return "unhandle error"
    
       
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
        res.status(404).json({
            Error_message: "Password Doesn't Match",
            success: false
        })
        return "unhandle error"
   
    }
    user.password = req.body.newPassword
    await user.save()
    let message = "Password Changed Successfully"
    sendToken(user, message ,200, res)


}  catch (error) {
    if (error.message === "Plan executor error during findAndModify :: caused by :: E11000 duplicate key error collection: Ecommerce.users index: email_1 dup key: { email: \"rv171613@gmail.com\" }") {
        error.message = "this mail Id Already exists"
        res.json({
            Error_message:error.message
        })
    }else{
         res.json({
            Error_message:error.message.slice(25,100)
         })
     }
}
}




// update user Profile
exports.updateMyProfile = async (req, res, next) => {
try {
    
    let newUserData = {
        name: req.body.name,
        email: req.body.email
    }
    // checking if user has giveen email and name both
    if (!req.body.email || !req.body.name) {
        res.status(401).json({
            Error_message: "Email or name missing",
            success: false
        })
        return "unhandle error"
    }
    if (req.body.avatar !== "undefined") {

        let data = req.body.avatar;
        var img = Buffer.from(data.substr(23), 'base64');
        // console.log("typeof(img)", typeof(img));
     
        if ((img.byteLength / 1024) < 700) {
            let user = await User.findById(req.user.id);
            const imageId = await (user.avatar.public_id);
            const myCloud = await cloudinary.uploader.upload(req.body.avatar, {
                folder: "avatars", width: 150, crop: "scale", resource_type: "image"
            }, (err, img) => {
                if (err) {
                    // console.log("OOOO err", err);
                    res.json({
                        Error_message: "Image Uploading Server error",
                        
                    })
                    return
                }
                // console.log("OOOO image", img);
                // // console.log(" OOOO image , uploaded Successfully");
            }
            );
            const result = await cloudinary.uploader.destroy(imageId);
            const { name, email } = req.body
            newUserData = {
                name,
                email,
                avatar: {
                    public_id: await myCloud.public_id,
                    url: await myCloud.secure_url,
                },
            }
        }
        else {
            res.status(400).json({
                success: false,
                image: data,
                Error_message: "Image size should be less than 700 KB"
            })
            return;
        }
    }

        const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });
    let message = "User Updated Successfully"
    sendToken(user,message, 200, res)



      }  catch (error) {
        if (error.message === "Plan executor error during findAndModify :: caused by :: E11000 duplicate key error collection: Ecommerce.users index: email_1 dup key: { email: \"rv171613@gmail.com\" }") {
            error.message = "this mail Id Already exists"
            res.json({
                Error_message:error.message
            })
        }else{
             res.json({
                // Error_message: error.message.slice(25,100)
                Error_message: error.message
             })
         }
    }



}




// get all users (admin)
exports.getAllUsers = async (req, res, next) => {
try {
    const users = await User.find();
    res.status(200).json({
        success: true,
        message:"all Users",
        users
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

// get particular user (admin)
exports.getParticularUser = async (req, res, next) => {
try {



    const user = await User.findById(req.params.id)
    if (!user) {
        res.status(404).json({
            Error_message:`user doesnot exists with id ${req.params.id}`,
            success: false
        })
        return "unhandle error"
    };
    res.status(200).json({
        success: true,
        message:`${user.name} Details`,
        user
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

// update user role (admin/user) by admin
exports.updateUserRole = async (req, res, next) => {
try {


    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }
    // we will add cloudinary later
    // const user = await User.findById(req.params.id)
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
        message:`User (${user.name}'s) Role Updated`,
        user
    })




}  catch (error) {
    if (error.message === "Plan executor error during findAndModify :: caused by :: E11000 duplicate key error collection: Ecommerce.users index: email_1 dup key: { email: \"rv171613@gmail.com\" }") {
        error.message = "this mail Id Already exists"
        res.json({
            Error_message:error.message
        })
    }else{
         res.json({
            Error_message:error.message.slice(25,100)
         })
     }
}
}


// delete user by admin
exports.deleteUser = async (req, res, next) => {
try {


    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404).json({
            Error_message:`user doesnot exists with id ${req.params.id}`,
            success: false
        })
        return "unhandle error"
    };
    // we will add cloudinary later

    const imageId = user.avatar.public_id;

    await cloudinary.uploader.destroy(imageId);

    await user.remove()

    res.status(200).json({
        success: true,
        user,
        message: `${user.name} Deleted Successfully`,
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