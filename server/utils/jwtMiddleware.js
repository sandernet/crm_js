var jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    let isError = false;
    let error;
    const jwtToken = req.headers["authorization"];
    if (jwtToken && jwtToken.includes("JWT ")) {
        jwt.verify(
            jwtToken.split(" ")[1],
            process.env["SECRET_TOKEN"],
            function (err, decoded) {
                isError = !!err;
                error = err;
                if (!err) {
                    req.user = decoded;
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