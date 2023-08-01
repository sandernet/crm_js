const models = require("@models");
const { jwtCreate } = require("@utils");


//const checkJWT = require("@utils/jwtMiddleware");

// Определяем таблицу с которой будут храниться данные о пользователе
let model = models.user


// // генерирование токенов
// const tokenAuth = (user) => {
//     let access = jwt.sign(
//         { user: user },
//         process.env.SECRET_TOKEN,
//         { expiresIn: '1h' }
//     );
//     let refresh = jwt.sign(
//         { user: user },
//         process.env.SECRET_TOKEN,
//         { expiresIn: '10h' }
//     );
//     return { access, refresh };
// }

// // Поучение токена по Логину и паролю
// const authPonePassword = (req, res) => {
//     const { phone, password } = req.body;

//     //Если не введен телефон или пароль возвращаем ошибку
//     if (!phone || !password) {
//         res.status(401).send("неверно введен логин или пароль")
//         return;
//     }

//     // выполняем запрос к базе проверяем есть ли такой телефон
//     model
//         .findOne({
//             attributes: {
//                 exclude: ["createdAt", "updatedAt", "deletedAt"],
//             },
//             // проверяем телефон и что бы пользователь был активный
//             where: { phone: phone, archived: 1 }
//         })
//         .then((data) => {
//             const userPassword = data.password;
//             if (password == userPassword) {
//                 res.status(200).send(tokenAuth(data.id));
//             }
//         })
//         .catch((error) => {
//             res.status(401).send("Пользователе с таким логином не найден")
//         });
// }

const get = (req, res) => {
    const { login, password } = req.query;

    model
        .findOne({ where: { login, password }, logging: console.log })
        .then((data) => {
            if (data) {
                return {
                    token: jwtCreate({ id: data.id }),
                    userName: data.login,
                };
            }
            throw new Error("Auth error");
        })
        .defAnswer(res, 401, { msg: "Auth error" });
};


// Проверка токена активации
// const getTest = (req, res) => {
//     res.status(200).send("user auth ok!!")
// }

module.exports = (router) => {
    // авторизации
    router.get("/", get);
    // router.post("/", authPonePassword, moduleName);
    return true;
};