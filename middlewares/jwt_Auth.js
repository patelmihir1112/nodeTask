var Users = require('../models/user');

const {
  AUTH_TOKEN_MISSING_ERR,
  AUTH_HEADER_MISSING_ERR,
  JWT_DECODE_ERR,
  USER_NOT_FOUND_ERR,
  USER_LOGOUT
} = require("../utils/error/errors");
const { verifyJwtToken } = require("../utils/token");
module.exports = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header) {
      next({ status: 403, message: AUTH_HEADER_MISSING_ERR });
      return;
    }
    const token = header.split("Bearer ")[1];
    if (!token) {
      next({ status: 403, message: AUTH_TOKEN_MISSING_ERR });
      return;
    }
    const userId = verifyJwtToken(token, next);
    if (!userId) {
      next({ status: 403, message: JWT_DECODE_ERR });
      return;
    }
    const user = await Users.findById(userId);

    if (!user) {
      next({ status: 404, message: USER_NOT_FOUND_ERR });
      return;
    }
    if (user.token != token) {
      next({ status: 403, message: USER_LOGOUT });
      return;
    }
    next();
  } catch (error) {
    console.log(error)
    next(error);
  }
};
