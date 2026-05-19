const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  register,
  login,
  profile,
  changePassword,
  forgotPassword,
  resetPassword,
} = require("../controller/authController");

router.post("/register", register);
router.post("/login", login);
router.put("/change-password", protect, changePassword);
router.get("/profile", protect, profile);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;
