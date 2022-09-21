const jwt = require("jsonwebtoken");

// exports.createJwtToken = (payload) => {
//     const token = jwt.sign(payload, process.env.JWT_SECRET_STRING || "secret", {expiresIn: process.env.USER_EXPIRESIN });
//     return token;
// };

exports.verifyJwtToken = (token, next) => {
    try {
        const {userId} = jwt.verify(token, process.env.JWT_SECRET_STRING || "secret");
        return userId;
    } catch (err) {
        next(err);
    }
};