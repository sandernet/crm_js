const {Categories} = require("../models/models");

class CategoriesController {
    // поиск категории в таблице по названию
    async getSearchCategories(name) {
        const category = await Categories.findOne({where: { category: name }})
        return category
    }

    // добавляет новую категорию в таблицу;
    async addCategory(req) {
        const {category, description, parent_id} = req // достаем диструктуризацию массива
        const addCategory = await Categories.create({category, description, parent_id}) // создаем запись в таблице и получаем её
        return addCategory // возращаем запись
    }

    // изменяет значение категории;
    async editCategory(req, res) {
        const {id, name, description, parent_id} = req.body // достаем из тела запроса данные
        await Categories.update({name, description, parent_id},
            {
                where: {
                    id: id,
                },
            }
        )
        return res.json(category) // возращаем запись
    }

    // удаляет категорию;
    async delCategory(id) {
        const category = await Categories.destroy({where: {id: id}})
        return res.json(category)
    }

    // возвращает список с названиями категорий;
    async getCategoryList(req, res) {
        const categories = await Categories.findAll() // получим все данные из таблицы Brand
        return res.json(categories) // вернем все записи в res
    }

    // возвращает лишь список с названиями категорий;
    async getCategoryTitleList() {
    }

    // возвращает выпадающий список select с категориями;
    async getTitleCategory($array_categories) {
    }

    // строит древовидный список на основе getHierarchyCategory().
    async getCategoryTree($parent = 0) {
    }
}

// Импортируем как новый объект
module.exports = new CategoriesController()