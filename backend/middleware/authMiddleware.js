const User = require("../models/User");
const jwt = require("jsonwebtoken");
const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);
      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }
      next();
    } catch (error) {
      res.status(401).json({ message: "No token, authorization denied" });
    }
  }
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
};

// Check if user is admin
// const isAdmin = (req, res, next) => {
//   if (req.user && req.user.role === "admin") {
//     next();
//   } else {
//     res.status(403).json({ message: "Not authorized as admin" });
//   }
// };

module.exports = { protect };
