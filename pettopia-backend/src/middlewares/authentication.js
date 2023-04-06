const config = require("../config/config");
const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  let token = req.get("Authorization");

  jwt.verify(token, config.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        msg: "Token invalid! Not authorized!",
      });
    }

    req.user = {
      id: user.data._id,
    	username:user.data.username, 
    	email:user.data.email
    };

    next();
  });
};

module.exports = {
  isAuth,
};
