var User = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



exports.login = async (req, res, next) => {
    try {
        if(!req.body.email){
            return res.json({
                status: 201,
                success: false,
                msg: "Email is Require.",
              });
        }
        if(!req.body.passWord){
            return res.json({
                status: 201,
                success: false,
                msg: "Password is Require.",
              });
        }
      let password = req.body.passWord;
      let userEmail = req.body.email.trim();
      let user = await User.findOne({ email: userEmail });
      if (user) {
        if (user.Active === false) {
          return res.json({
            status: 201,
            success: false,
            msg: "Not able to login try to contact admin",
          });
        }
        console.log(password,user)
        let compare = await bcrypt.compare(password, user.passWord);
        console.log(compare)
        const token = jwt.sign({ email: userEmail, userId: user.id}, process.env.JWT_SECRET_STRING, { expiresIn: process.env.USER_EXPIRESIN })
        user.token = token;
        user.save();
        if (compare) {
          return res.json({
            status: 200,
            success: true,
            token : token,
            msg: "Login successfully",
          });
        } else {
          return res.json({
            status: 201,
            success: false,
            msg: "Invalid Password.",
          });
        }
      } else {
        return res.json({
          status: 201,
          success: false,
          msg: "Invalid Email.",
        });
      }
    } catch (error) {
      console.log(" error in login controler", error);
      next(error);
    }
}

exports.logout = async (req, res, next) => {
  try {
      if(!req.body.email){
          return res.json({
              status: 201,
              success: false,
              msg: "Email is Require.",
            });
      }
    let userEmail = req.body.email.trim();
    let user = await User.findOne({ email: userEmail });
    if (user) {
      user.token = ""
      user.save();
      return res.json({
        status: 200,
        success: true,
        msg: "logout.",
      });
    } else {
      return res.json({
        status: 201,
        success: false,
        msg: "Invalid Email.",
      });
    }
  } catch (error) {
    console.log(" error in logout controler", error);
    next(error);
  }
}