const jwt = require("jsonwebtoken");
const models = require("../../db/models");
const { checkMethod } = require("../../utils");

// Авторизация по токену
const checkJWT = require("./jwtMiddleware");

let model = models.employee

// генерирование токенов
const tokenAuth = (user) => {
    let access = jwt.sign(
        { user: user },
        process.env.SECRET_TOKEN,
        { expiresIn: '1h' }
    );
    let refresh = jwt.sign(
        { user: user },
        process.env.SECRET_TOKEN,
        { expiresIn: '10h' }
    );
    return { access, refresh };
}




// Передаца токена акторизация
const getTest = (req, res) => {
    res.status(200).send("user auth ok")
}

// Плучение auth токена
const authPonePassword = (req, res) => {
    const { phone, password } = req.body;
  
//Если не введен телефон или пароль Возрашаем ошибку
    if (!phone || !password){
        res.status(401).send("неверно введен логин или пароль")
        return;
    }
    
    // выполняем запрос к базе проверяем есть ли такой телефон
    model
      .findOne({
        attributes: {
          exclude: ["createdAt", "updatedAt", "deletedAt"],
        },
        // проверяем телефон и что бы пользователь был активный
        where: {phone: phone, archived: 1}
      })
      .then((data) => {
        const userPassword = data.password;
        if (password == userPassword){
            res.status(200).send(tokenAuth(data.id));
        }
     })
     .catch((error) => {
        res.status(401).send("Пользователе с таким логином не найден")
    });
}

// Плучение refresh токена
const getAccessRefresh = (req, res) => {
    res.status(200).send(tokenAuth('sander'))
};


module.exports = (router, moduleName) => {

    router.get("/", checkMethod(getAccessRefresh, moduleName));
    router.get("/testAuth/", checkJWT, checkMethod(getTest, moduleName));
    router.post("/", checkMethod(authPonePassword, moduleName));
};
