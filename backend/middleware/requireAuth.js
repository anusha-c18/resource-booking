const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  //verify authentication
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send("Authorization token required");
  } else {
    const token = authorization.split(" ")[1];
    try {
      const { _id } = jwt.verify(token, process.env.AUTH0_CLIENT_SECRET);
      next();
    } catch (err) {
      console.log(err);
      res.status(401).send("request is not authorized");
    }
  }
};

module.exports = requireAuth;
