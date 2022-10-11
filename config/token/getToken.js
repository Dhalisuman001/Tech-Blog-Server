const jwt = require("jsonwebtoken");

const getToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  return token;
};

module.exports = getToken;
