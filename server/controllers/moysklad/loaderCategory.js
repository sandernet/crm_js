const { getIdFormUrl } = require('./config')
const { defaultGet } = require("../../utils/db");
const models = require("../../db/models");

let model = models.category

// Параметры запроса в мой склад
const config = {
    method: 'get',
    // Добавляем фильтры ?filter=updated>=2023-03-13 21:43:42',
    url: '/entity/productfolder',
    headers: {
        "Content-Type": "application/json"
    },
}


const creatCategory = (x) => {
    return { message: 'Создаем категорию', x }
}

const getCategoty = async (url) => {

    let mes = {}
    // из url берем ID товара из url
    // Передаем в сообщение id категории 
    const idMoySklad = getIdFormUrl(url)
    const data = await defaultGet({ externalCodeId: idMoySklad }, model)

    // Проверяем есть ли в базе такой id
    if (data) {
        // возращаем сообщение с id категории
        return { idForProductCreat: idMoySklad }
    }

    // если категории нету
    if (!data) {
        await updateCategory()
        // запускаем процедуру обновления категорий

    }
    return mes
}

const updateCategory = async () => {

    // рекурсия загрузки категорий
    let category = await axiosGet(config.params =
        { filter: `updated >= 2023-03-1321:43:42` }, creatCategory)

    if (!category) {
        return messages.push({ messages: 'Rfr' })
    }

    console.log(category.x.productFolder.meta.href)
    console.log(category.x.pathName)
    await getCategoty(category.x.productFolder.meta.href, category.x.pathName)
}



module.exports = {
    getCategoty
}





// while (foundPos > 0) {
//     foundPos = pathName.indexOf('/', pos);
//     categoryName = (foundPos == -1) ? pathName.slice(pos) : pathName.slice(pos, foundPos)

//     // Ищем в базе категорию
//     foundCategory = await categoryController.getSearchCategories(categoryName)

//     if (foundPos == -1) {
//         // и это конечная категория
//         if (foundCategory != null) {
//             //если находим, то возращаем найденую
//             return foundCategory
//         } else {
//             //если НЕ находим, и это конечная категория то создаем и возращаем её
//             return await categoryController.addCategory({
//                 category: categoryName,
//                 description: '',
//                 parent_id: parent_id
//             })
//         }
//     } else {
//         if (foundCategory != null) {
//             //если находим, то возращаем найденую
//             parent_id = foundCategory.id
//         } else {
//             //если НЕ находим, и это конечная категория то создаем и возращаем её
//             foundCategory = await categoryController.addCategory({
//                 category: categoryName,
//                 description: '',
//                 parent_id: parent_id
//             })
//             parent_id = foundCategory.id
//         }
//     }
//     pos = (foundPos == -1) ? pos : foundPos + 1; // продолжаем со следующей позиции
// }