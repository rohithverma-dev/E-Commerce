const express = require("express");
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require("../controllers/orderController");
const { isAuthenticatedUser ,authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser ,  newOrder);    // done

router .route("/order/:id") .get(isAuthenticatedUser ,  getSingleOrder);   // done

router .route("/orders/me") .get(isAuthenticatedUser ,  myOrders);   // done

router .route("/admin/orders") .get(isAuthenticatedUser , authorizeRoles("admin") , getAllOrders);  //done
router
     .route("/admin/order/:id")
       .put(isAuthenticatedUser , authorizeRoles("admin") ,  updateOrder)     //  done
       .delete(isAuthenticatedUser , authorizeRoles("admin") ,  deleteOrder); // done


module.exports = router;


