const jwt = require("jsonwebtoken");
require("dotenv").config();

//  this middleware will continue on if the token
//  is inside the local storage

module.exports = async (req, res, next) => {
  try {
    // get token from header
    const jwtToken = req.header("token");

    // check if not token
    if (!jwtToken) {
      return res.status(403).json({ msg: "Not Authorize" });
    }

    // its going to give the user ther user_id (user:{id: user.id})
    const payload = jwt.verify(jwtToken, process.env.jwtSecret);

    req.user = payload.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Not Authorize" });
  }
};
