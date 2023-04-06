const User = require("../models/User");
const bcrypt = require("bcrypt");

const CTRL = {};

CTRL.getUsers = (req, res) => {
  User.find({})
  .populate('role').exec((err, users) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      })
    }
    res.json({
      ok: true,
      users,
    });
  });
};

CTRL.getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
  .populate('role').exec((err, user) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      })
    }
    res.json({
      ok: true,
      user,
    });
  });
};

CTRL.createUser = async (req, res) => {
  try{
  const { email, password, username} = req.body;
  console.log(`${email}, ${password}, ${username}`);
  if (!(email && password && username)) {
      res.status(400).send("All input is required");
    }
  // check if user already exist
  // Validate if user exist in our database
  const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }
      //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);
      // Create user in our database
    const user = await User.create({
      username:username,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });
    
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err: err});
  }
  
};

CTRL.updateUser = (req, res) => {
  const { userId } = req.params;
  
  const updUser = {
    displayName: req.body.displayName,
    email: req.body.email,
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10),
    avatar: req.body.avatar,
    role: req.body.role,
    status: req.body.status
  }

  User.findByIdAndUpdate(userId, updUser, { new: true }, (err, user) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    return res.status(201).json({
      ok: true,
      user,
    });
  });
};

CTRL.deleteUser = (req, res) => {
  const { userId } = req.params;
  User.findByIdAndRemove(userId, (err, user) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    return res.status(201).json({
      ok: true,
      user,
    });
  });
};

module.exports = CTRL;
