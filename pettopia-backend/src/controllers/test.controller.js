const Test = require("../models/Test");

const CTRL = {};

CTRL.getRows = (req, res) => {
  console.log('getting test rows');
  Test.find({})
  
  .exec((err, names) => {
  	if (err) {
  		return res.status(500).json({
  		ok: false,
  		err
  		})
  	}
  	res.json({
  	ok: true,
  	names,
  	});
  });
};


module.exports = CTRL;
