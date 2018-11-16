var jwt = require("jsonwebtoken");

let requireLogin = function(req, res, next) {
  try {
    let token = req.headers.authorization;
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).send("Must be authentificated");
  }
};

exports.requireLogin = requireLogin;
