const Product = require("../models/produactModel");
const ApiFeatures = require("../utils/ApiFeatures");
const cloudinary = require("cloudinary").v2


// to get all products
exports.getAllProducts = async (req, res) => {
  try {


    const resultPerPage = 7;
    const productsCount = await Product.countDocuments();
    // console.log(req.query);
    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search() 
        .filter()
        let products = await apiFeature.query;
        let filteredProductsCount = products.length;
        apiFeature.pagination(resultPerPage);
        products = await apiFeature.query.clone(); 
    res.status(200).json({
        message: "all Products",
        success: true,
        products,
        productsCount,
        resultPerPage,
        filteredProductsCount
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

// Get All Product (Admin)
exports.getAdminProducts = async (req, res, next) => {
  try {


    const products = await Product.find();
    res.status(200).json({
      success: true,
      products,
      message:"admin all products"
    });


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
  };

// get Product all Products
exports.getProductDetails = async (req, res, next) => {
  try {


    const product = await Product.findById(req.params.id);
    if (!product) {     
      res.status(201).json({
          success: false,
          Error_message:"Product Not Found "
      })
      return "unhandle error"
  }

    res.status(201).json({
        success: true,
        message:"Product Detals",
        product,
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


// Create Products --  Only admin cn access
exports.createProduct = async (req, res, next) => {
  try {

  if (req.body.images !== "undefined") {
    let images = [];
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
    const imagesLinks = [];
    for (let i = 0; i < images.length; i++) {
        let data = images[i];
        var img = Buffer.from(data.substr(23), 'base64');
        if ((img.byteLength / 1024) < 700) {
          console.log("passes");
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
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.uploader.upload(images[i], {
        folder: "products",
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
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
    req.body.images = imagesLinks;
  }

    req.body.user = req.user.id
    const {name , price , description , category , Stock , images , user }= req.body
    // console.log(req.body);
    const product = await Product.create({
      name , 
       price ,
        description ,
         category ,
          Stock ,
           images ,
            user
    });
    res.status(201).json({
        success: true,
        message:"Your Product Has Been Created Successfully",
        product
    })



  }  catch (error) {
    if (error.message === "Plan executor error during findAndModify :: caused by :: E11000 duplicate key error collection: Ecommerce.users index: email_1 dup key: { email: \"rv171613@gmail.com\" }") {
        error.message = "this mail Id Already exists"
        res.json({
            Error_message:error.message
        })
    }else{
         res.json({
            Error_message:error.message.slice(25,200)
         })
     }
  }
}

// Update Products --  Only admin cn access
exports.updateProduct = async (req, res, next) => {
  try {


    let product = await Product.findById(req.params.id);
    // console.log(req.params);   // json given through Url
    // console.log(req.body);     // json given through body
    if (!product) {     
      res.status(201).json({
          success: false,
          Error_message:"Product Not Found "
      })
      return "unhandle error"
  }
    
  // Images Start Here
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }
  
  if (images !== undefined) {
    for (let i = 0; i < images.length; i++) {
      let data = images[i];
      var img = Buffer.from(data.substr(23), 'base64');
      if ((img.byteLength / 1024) < 700) {
        console.log("passes");
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
  
  const imagesLinks = [];
  
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.uploader.upload(images[i], {
      folder: "products",
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
    
    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  // Deleting Images From Cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.uploader.destroy(product.images[i].public_id);
  }
  
  req.body.images = imagesLinks;
  
  } 

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(201).json({
        success: true,
        message:"Your Product Has Been Updated Successfully",
        product
    })


  }  catch (error) {
    if (error.message === "Plan executor error during findAndModify :: caused by :: E11000 duplicate key error collection: Ecommerce.users index: email_1 dup key: { email: \"rv171613@gmail.com\" }") {
        error.message = "this mail Id Already exists"
        res.json({
            Error_message:error.message
        })
    }else{
         res.json({
            Error_message:error.message.slice(24,200)
         })
     }
  }
}

// Delete Products --  Only admin cn access
exports.deleteProduct = async (req, res, next) => {
  try {


    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(201).json({
            success: false,
            Error_message: "Product Not Found"
        })
        return "UnHandled Error"
    }
      // Deleting Images From Cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.uploader.destroy(product.images[i].public_id);
  }
    await product.remove()
    res.status(201).json({
        success: true,
        message:"Your Product Deleted Successfully",
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

exports.createProductReview = async (req, res, next) => {
  try {


    const { rating, comment, productId } = req.body
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    }

    const product = await Product.findById(productId)
    if (!product) {
      res.status(201).json({
          success: false,
          Error_message: "Product Not Found"
      })
      return "UnHandled Error"
  }
    const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user._id.toString())
    if (isReviewed) {
        product.reviews.forEach(rev => {
            if (rev.user.toString() === req.user._id.toString()) {
                rev.rating = rating,
                rev.comment = comment
            }
        })
    }

    else {
        product.reviews.push(review)
        product.Num_of_reviews = product.reviews.length
    }
    let avg = 0
    product.reviews.forEach(rev => {
        avg += rev.rating
    })
    product.ratings = avg / product.reviews.length

    await product.save({ validateBeforeSave: false })
    res.status(200).json({
        success: true,
        message: "Product Review Submitted ",
        product
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

// Get All Reviews of a Product
exports.getProductReviews = async (req, res, next) => {
  try {


    // console.log(req.query.id);
    // res.send("good")
    const product = await Product.findById(req.query.id)
    if (!product) {
      res.status(201).json({
          success: false,
          Error_message: "Product Not Found"
      })
      return "UnHandled Error"
  }
    res.status(200).json({
        success: true,
        message:"Product Reviews",
        reviews: product.reviews
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

// Delete Review
exports.deleteProductReviews = async (req, res, next) => {
  try {



    const product = await Product.findById(req.query.productId)
    if (!product) {
        res.status(201).json({
            success: false,
            Error_message: "Product Not Found"
        })
        return "UnHandled Error"
    }
    const reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== req.query.id.toString()
    )
    let avg = 0
    reviews.forEach(rev => {
        avg += rev.rating
    })
  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

    const Num_of_reviews = reviews.length

    await Product.findByIdAndUpdate(
        req.query.productId,
        {
            reviews,
            ratings,
            Num_of_reviews
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false
        }
    )

    res.status(200).json({
        success: true,
        message: "Review Deleted Successfully",
        reviews: reviews
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


