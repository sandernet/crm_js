const sequelize = require('../db')

// импортируем из модуля sequelize DataType они описывают типы данных в базе
const {DataTypes, Sequelize} = require('sequelize')

// Таблица пользователей
const Employee = sequelize.define('employee', {
    id: { // id пользователя
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    externalCode: { // Внешний код сотрудника мой склад
        type: DataTypes.STRING,
    },
    fullName: { // Полное имя
        type: DataTypes.STRING,
    },
    name: { // Краткое имя сотрудника
        type: DataTypes.STRING,
    },
    phone: { // телефон пользователя
        type: DataTypes.STRING,
    },
    position: { // Должность
        type: DataTypes.STRING,
    },
    password: { // Пароль пользователя
        type: DataTypes.STRING
    },
    archived: { // Пароль пользователя
        type: DataTypes.BOOLEAN
    },
})

// ==============================================
// Таблица Товаров
//-----------------------------------------------
const Product = sequelize.define('product', {
    id: { // id пользователя
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    externalCode: { // Внешний код товара из мой склад
        type: DataTypes.STRING,
    },
    vendorCode: { // артикул товара из мой склад
        type: DataTypes.STRING,
    },
    name: { // Наименование товара
        type: DataTypes.STRING,
    },
    description: { // Описание товара
        type: DataTypes.STRING,
    },
    archived: { // архивный
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
})

// ==============================================
//Единица измерения
//-----------------------------------------------
const UomProduct = sequelize.define('uomproduct', {
        uom: { // Единица измерение
            type: DataTypes.STRING(30),
            primaryKey: true,
            allowNull: false,
            unique: true
        }
    },
    {
        // НЕ создаем creatdt и updatedt
        timestamps: false
    }
)

// ==============================================
//Характеристики товаров
//-----------------------------------------------
const Property = sequelize.define('property', {
        name: { // Тип характеристики
            type: DataTypes.STRING(30),
            primaryKey: true,
            allowNull: false,
            unique: true
        }
    },
    {
        // НЕ создаем creatdt и updatedt
        timestamps: false
    })

//Значение характеристики товаров
const ValueProperty = sequelize.define('valueproperty', {
        id: { // id свойства товара
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        value: { // значение характеристики
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        // НЕ создаем creatdt и updatedt
        timestamps: false
    })


//Штрихкоды товаров с разных маркетплейсов товаров
// Внешний ключ маркетплейс
const Barcodes = sequelize.define('barcodes', {
        id: { // id штрихкода
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        typeBarcodes: { // Тип баркода
            type: DataTypes.STRING,
            allowNull: false
        },
        barcode: { // штрихкод
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        // НЕ создаем creatdt и updatedt
        timestamps: false
    })


// модель «Категория», таблица БД «categories»
const Categories = sequelize.define('categories', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    category: {type: DataTypes.STRING, unique: true, allowNull: false},
    description: { // Описание категории
        type: DataTypes.STRING,
    },
    parent_id: { //-номер родительской категории поумолчанию 0;
        type: DataTypes.INTEGER, defaultValue: 0,
    }
})


//Картинки товаров
// norm большая картинка
// miniature миниатюра
// tiny маленькая для списков
const ImagesProduct = sequelize.define('imagesproduct', {
        id: { // id картинки
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nameFiles: { // название файла
            type: DataTypes.STRING,
        },
        pathName: { // путь к папке
            type: DataTypes.STRING,
        },
        typeImage: {
            // Миниатюра
            type: DataTypes.STRING(4),
        }
    },
    {
        // НЕ создаем creatdt и updatedt
        timestamps: false
    })

//маркетплейсы
const Marketplaces = sequelize.define('marketplaces', {
    id: { // id штрихкода
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: { // название Маркетплейса
        type: DataTypes.STRING,
        allowNull: false
    },
    token: { // Токен авторизации
        type: DataTypes.STRING,
    },
    description: { // путь к папке
        type: DataTypes.STRING,
    }
})


// ==============================================
//Цены на товаров
//-----------------------------------------------
// Вид цены
const TypePrice = sequelize.define('typeprice', {
    title: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
})
// Цены на товар + ключи Товара и Вида цены
const Price = sequelize.define('price', {
    id: { // id цены
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
})


// Один пользователь может много раз голосовать (Один ко многим)
Product.hasMany(ImagesProduct, { // при удалении и обновлении продукта, будет удален и обновлена картинка
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
ImagesProduct.belongsTo(Product)

// ================================================
// Характеристики продукта
// Продукты могут иметь много характеристик
// Характеристики могут быть у многих продуктов
Product.hasMany(ValueProperty)
ValueProperty.belongsTo(Product)
// добавляем справочник со свойствами
Property.hasMany(ValueProperty)
ValueProperty.belongsTo(Property)
//==================================================

//=================================================
// соотношение единицы измерения к продукту 1-1
UomProduct.hasOne(Product)
Product.belongsTo(UomProduct)

// Один товар много штрихкодов (Один ко многим)
Product.hasMany(Barcodes)
Barcodes.belongsTo(Product)

// связь категории с товарами: в категории может быть несколько товаров, но
// каждый товар может принадлежать только одной категории
Categories.hasMany(Product)
Product.belongsTo(Categories)

// Один маркетплейс много штрихкодов (Один ко многим)
Marketplaces.hasMany(Barcodes, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
Barcodes.belongsTo(Marketplaces)

// ==============================================
//Цены на товаров
//-----------------------------------------------
// У одного товара много цен (Один ко многим)
Product.hasMany(Price, { // При удалении и обновлении продукта, будет удален и обновлена цена
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
Price.belongsTo(Product)

// У одного вида цены может быть много цен товара (Один ко многим)
TypePrice.hasMany(Price, { // При удалении и обновлении вида цены, будет удален и обновлена цена
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
Price.belongsTo(TypePrice)


// Экспортируем
module.exports = {
    Employee,
    Product,
    Property,
    ValueProperty,
    UomProduct,
    ImagesProduct,
    Barcodes,
    Marketplaces,
    Categories,
    TypePrice,
    Price,
}
