const jwt = require("jsonwebtoken");
const config = require("@config/config.json");
const models = require("@models");
const { HasMany } = require("sequelize");

const password = config?.jwt ?? "123";

const jwtCreate = (data) => jwt.sign(data, password, { noTimestamp: true });

const jwtVal = (token) => {
  try {
    return jwt.verify(token, password);
  } catch (err) {
    console.log(err);
    return false;
  }
};

const jwtMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !jwtVal(authorization)) {
    res.status(401).send("user not found");
    return;
  }

  req.userData = await models.user.findOne({
    include: [
      {
        association: new HasMany(models.user, models.userRole, {
          sourceKey: "id",
          foreignKey: "userId",
        }),
      },
    ],
    where: { id: jwtVal(authorization)?.id },
  });

  if (req.userData?.isAdmin || req.userData?.isSuperAdmin) {
    next();
    return;
  }

  const findAccess = req.userData?.userRoles?.find(
    (item) => item.controller === req.baseUrl.replaceAll("/", "")
  );
  if (findAccess) {
    next();
    return;
  }
  res.status(401).send("user not found");
};

module.exports = { jwtCreate, jwtVal, jwtMiddleware };
