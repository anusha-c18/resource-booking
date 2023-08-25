let axios = require("axios");

const tokenEndpoint = `https://${process.env.AUTH0_DOMAIN}/oauth/token`;

const oAuth = (req, res, next) => {
  let code = req.query.code;
  if (!code) {
    res.status(401).send("missing authorization code");
  } else {
    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("client_id", process.env.AUTH0_CLIENT_ID);
    params.append("client_secret", process.env.AUTH0_CLIENT_SECRET);
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:5173");
  }
};

module.exports = oAuth;
