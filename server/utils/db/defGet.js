// data, 
// model
// Плучение данных
// const get = (req, res) => {
const def = (data, model) => {
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

    // поиск по внешниму ключу externalCode
    const searchExternalCode = externalCodeMS ? { externalCodeMS } : null;

    const where =
        searchCaption || searchId || searchExternalCode ? { ...searchCaption, ...searchId, ...searchExternalCode } : null;
    // выполняем запрос


    return new Promise((resolve, reject) => {
        model
            .findOne({
                attributes: {
                    exclude: ["createdAt", "updatedAt", "deletedAt"],
                },
                ...other,
                where: where,
            })
            .then((data) => {
                resolve(data);
            }).catch(() => {
                resolve(null)
            })
            ;
    });
}

module.exports = def;