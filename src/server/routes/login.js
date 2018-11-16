var express = require("express");
var router = express.Router();
const db = require("../modules/db.js");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

router.post("/", function(req, res) {
  let { email, password } = req.body;

  if (!email) {
    return res.status(422).send("Email is required");
  }

  if (!password) {
    return res.status(422).send("Password is required");
  }

  db.db
    .collection("users")
    .findOne({ email: email })
    .then(user => {
      if (!user) return res.status(400).send("User not found");
      bcrypt.compare(password, user.password, (err, isValidPassword) => {
        if (err) console.error(err);
        if (!isValidPassword) {
          return res.status(400).send("Invalid password");
        } else {
          let token = jwt.sign(user, process.env.JWT_SECRET);
          user.jwt = token;
          res.json(user);
        }
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
});

module.exports = router;
