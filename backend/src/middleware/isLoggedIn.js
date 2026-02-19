const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const isLoggedIn = async (req, res, next) => {
  try {
    // Support both Authorization header (SPA) and cookie (same-origin)
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.slice(7)
      : req.cookies?.token;
    
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_KEY);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: "Token expired - Please login again" });
      }
      return res.status(401).json({ message: "Invalid token" });
    }

    const user = await userModel
      .findById(decoded.id)
      .select("-password");
    
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    
    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ message: "Authentication failed" });
  }
};

module.exports = isLoggedIn;
