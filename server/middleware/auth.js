
// // Middleware to protect routes

// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// export const protectRoute = async (req, res, next) => {
//     try {
//         const token = req.headers.token;
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         const user = await User.findById().select("-password");
//         if(!user){
//           return res.json({
//           success: false,
//           message:"User not found"
//         });
//         }
//         req.user = user;
//         next();
        
//     } catch (error) {
//         console.log(error.message)
//         res.json({
//           success: false,
//           message:error.message
//         });
//     }
// }

// Middleware to protect routes

import jwt from "jsonwebtoken";
import User from "../models/User.js";

// export const protectRoute = async (req, res, next) => {
//   try {
//     // Check if token exists in header
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({
//         success: false,
//         message: "JWT must be provided in Authorization header",
//       });
//     }

//     // Extract token
//     const token = authHeader.split(" ")[1];

//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Get user from token
//     const user = await User.findById(decoded.userId).select("-password");

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     // Attach user to request
//     req.user = user;
//     next();
//   } catch (error) {
//     console.log("Auth error:", error.message);
//     res.status(401).json({
//       success: false,
//       message: "Not authorized, token failed",
//     });
//   }
// };


export const protectRoute = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "JWT must be provided",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};
