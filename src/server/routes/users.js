var express = require("express");
var router = express.Router();
const db = require("../modules/db.js");
var jwt = require("jsonwebtoken");

router.get("/current", function(req, res, next) {
  let token = req.headers.authorization;
  let decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decoded);

  db.db
    .collection("users")
    .findOne({ _id: db.ObjectID(decoded.id) })
    .then(user => {
      res.json(user);
    });
});

module.exports = router;
