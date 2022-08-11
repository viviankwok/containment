const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  console.log("auth activated");

  try {
    // check if token (with "Bearer ") is saved in env
    const token_draft = req.headers["authorization"];
    if (!token_draft) {
      console.log(
        "req.headers['authorization'] is undefined; check if access/refresh tokens are saved in .env"
      );
      return res.status(401).send({
        status: "error",
        message: "Authentification failed",
      });
    }
    const token = req.headers["authorization"].replace("Bearer ", "");
    // if got token (from header)
    if (token) {
      try {
        // if token (from header) matches token (from env/login)
        const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
        req.decoded = decoded;
        next();
      } catch (error) {
        // if tokens don't match
        return res.status(401).send({
          status: error,
          message: "Access denied. You're not authorised. Imposter.",
        });
      }
    }
    // if no token (from header)
    else {
      return res.status(403).send({
        status: "error",
        message: "Missing a token i.e. this app was not developed properly.",
      });
    }
  } catch (error) {
    console.log(error, "error: first try in auth did not work.");
    return res.status(401).send({ status: "error", message: "Unauthorised." });
  }
};

module.exports = auth;
