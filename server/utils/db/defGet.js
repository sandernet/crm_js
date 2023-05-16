const { defGetFields } = require("./defFields");
const checkDataByFields = require("./checkData");


// data, 
// model
// Получение данных
// const get = (req, res) => {
const def = (fields = {}, data, model) => {

    const isArray = Array.isArray(fields);

    const check = isArray ? fields : fields?.check;
    const answer = isArray ? defGetFields : fields?.answer ?? defGetFields;

    if (check) {
        const checkData = checkDataByFields(check, data);

        if (checkData.isError) {
            throw new Error(checkData.message);
        }
    }


    const { search, id, externalCodeMS, ...other } = data;

    // указываем в каких полях нужно искать строку /model?search=<>
    const searchCaption = search
        ? {
            [Op.or]: [
                { name: { [Op.like]: `%${search}%` } },
            ],
        }
        : null;

    // поиск по id /model?id=<>
    const searchId = id ? { id } : null;

    // поиск по внешнему ключу externalCode
    const searchExternalCode = externalCodeMS ? { externalCodeMS } : null;

    const where =
        searchCaption || searchId || searchExternalCode ? { ...searchCaption, ...searchId, ...searchExternalCode } : null;
    // выполняем запрос

    return new Promise((resolve, reject) => {
        model
            .findAll({
                attributes: {
                    exclude: ["createdAt", "updatedAt", "deletedAt"],
                },
                ...other,
                where: where
            })
            .then((answerData) => {
                if (answer) {
                    let result = {};
                    answer.forEach((field) => (result[field] = answerData[field]));
                    resolve(result);
                }
                resolve(answerData);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

module.exports = def;