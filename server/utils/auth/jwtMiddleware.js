let jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let isError = false;
  let error;
  const jwtToken = req.headers["authorization"];
  // Приставка а токене
  if (jwtToken && jwtToken.includes("JWT ")) {
    jwt.verify(
      // берем без приставки
      jwtToken.split(" ")[1],
      process.env.SECRET_TOKEN,
      // функция обратного вызова
      function (err, decoded) {
        isError = !!err;
        error = err;
        if (!err) {
          // проверить пользователя в токене и запрашиваемого пользователя
          req.user = decoded.user;
          next();
        }
      }
    );
  }
  isError &&
    res
      .status(401)
      .send({
        isAuth: false,
        error: { message: error.message, code: error.code },
      });
};
