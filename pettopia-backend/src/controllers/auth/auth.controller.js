const config = require("../../config/config");
const User = require("../../models/User");

const CTRL = {};

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

CTRL.login = (req, res) => {
  console.log(req.body.email)
  // User.findOne({email:req.body.email})
  // .then(user =>{
  //   console.log(`${JSON.stringify(user)}`)
  // })
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    if (!user) {
      console.log(`404 error - failing at line 24`)
      return res.status(404).json({
        ok: false,
        msg: "Username/Password invalid!",
      });
    }

    if (!bcrypt.compareSync(req.body.password, user.password)) {
      console.log(`404 error - failing at line 31`)
      return res.status(404).json({
        ok: false,
        msg: "Username/Password invalid!",
      });
    }

    let token = jwt.sign({ data: user }, config.SECRET_KEY);

    return res.status(201).json({
      ok: true,
      token,
    });
  });
};

module.exports = CTRL;
