const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteProductReviews, getAdminProducts } = require("../controllers/productsController");
const { isAuthenticatedUser ,authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/products",async (req, res,next) => {
    // console.log("rohit");
    res.send("rohit")
}).get( getAllProducts)   // done   

router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);  // done
router
    .route("/admin/product/new")
    .post(isAuthenticatedUser , authorizeRoles("admin") , createProduct);   //done
router
    .route("/admin/product/:id")
    .put(isAuthenticatedUser , authorizeRoles("admin")  , updateProduct)    //done
    .delete(isAuthenticatedUser ,  authorizeRoles("admin") ,deleteProduct)  //done


router
    .route("/product/:id").get(getProductDetails);   // done               

router
    .route("/product/create-update-review").put(isAuthenticatedUser ,  createProductReview); //done
router
    .route("/get-product-reviews").get(isAuthenticatedUser , getProductReviews)    //  done                  
router
    .route("/delete-product-review") .delete(isAuthenticatedUser ,  deleteProductReviews);    // done
                  
module.exports = router;



