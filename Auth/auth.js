const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const decode = jwt.verify(req.headers.authorization, "abcefgh");

      if (decode) {
        next();
      } else {
        res.status(401).json({ status: false, message: "Not allowed" });
      }
    } else {
      res.status(401).json({ status: false, message: "Not allowed" });
    }
  } catch (error) {
    res.status(401).json({ status: false, message: "Not allowed" });
  }
};

module.exports = authenticate;