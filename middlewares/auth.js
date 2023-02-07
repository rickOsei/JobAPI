const jwt = require("jsonwebtoken");
const Unauthenticated = require("../errors/unathenticated");
const userModel = require("../model/user_model");

// const auth = async (req, res, next) => {
//   // Check header
//   const authHeader = req.header.authorization;
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     throw new Unauthenticated("Authentication invalid!!");
//   }
//   const token = authHeader.split(" ")[1];
//   try {
//     const payload = jwt.verify(token, process.env.JWT_SECRET);
//     // set to new property on the req object
//     // const user = userModel.findById(payload.userID).select("-password");
//     // req.user = user;
//     req.user = { userName: payload.userName, userID: payload.userID };
//     next();
//   } catch (error) {
//     throw new Unauthenticated("Authentication invalid!!");
//   }
// };

const auth = (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new Unauthenticated("Authentication invalid");
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // attach the user to the job routes
    req.user = { userId: payload.userID, name: payload.userName };
    next();
  } catch (error) {
    throw new Unauthenticated("Authentication invalid");
  }
};

module.exports = auth;
