const { expressjwt: ExpressJWT } = require("express-jwt");

const SECRETKEY = process.env.SECRET_KEY
// 

const verifyJWT = ExpressJWT({
  secret: SECRETKEY,
  algorithms: ["HS256"]
})

exports.jwtMiddleware = (req, res, next) => {
  verifyJWT(req, res, (err) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
  });
};