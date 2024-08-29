const express = require("express");
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, changePassword, updateMyProfile, getAllUsers, getParticularUser, updateUserRole, deleteUser } = require("../controllers/userController");
const { isAuthenticatedUser ,authorizeRoles } = require("../middleware/auth");


const router = express.Router();  

router.route("/register").post(registerUser);   // done
router.route("/login").post(loginUser);         // done
router.route("/password/forgot").post(forgotPassword);   // done
router.route("/password/reset/:token").put(resetPassword);  //done
router.route("/logout").get(logout);            // done
router.route("/me").get(isAuthenticatedUser , getUserDetails);     // done
router.route("/password/change-update").put(isAuthenticatedUser , changePassword);      // done
router.route("/me-profile/change-update").put(isAuthenticatedUser , updateMyProfile);   // done

router.route("/admin/users")
    .get(isAuthenticatedUser ,  authorizeRoles("admin") , getAllUsers);  // done
router.route("/admin/user/:id")
    .get(isAuthenticatedUser ,  authorizeRoles("admin") , getParticularUser)  //done
    .put(isAuthenticatedUser ,  authorizeRoles("admin") , updateUserRole)   // done
    .delete(isAuthenticatedUser ,  authorizeRoles("admin") , deleteUser);  // doen


module.exports = router;
