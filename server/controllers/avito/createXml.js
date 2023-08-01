const fs = require('fs');
const xmlbuilder = require('xmlbuilder');
const { checkMethod } = require("@utils");


const createXml = () => {

    // Создаем новый документ XML
    // const rootAds = xmlbuilder.create('Ads', { formatVersion: "3", target: "Avito.ru" })

    // for (var i = 1; i <= 5; i++) {
    //     var item = rootAds.ele('Ad');
    //     item.ele('Id', 'Id из нашей базы'); //Уникальный идентификатор объявления в вашей базе данных – строка до 100 символов.
    //     item.ele('AdStatus', 'Free'); //Услуга продвижения
    //     item.ele('AvitoId', 'AvitoId'); //Номер объявления на Авито — целое число.
    //     item.ele('Category', 'Оборудование для бизнеса');
    //     item.ele('Condition', 'Новое');
    //     item.ele('Address', 'Тамбовская область, Моршанск, Лесная улица, 7');
    //     item.ele('Title', 'value');
    //     item.ele('Description', "<![CDATA[<p><strong>Электрический бойлерный пароконвектомат RATIO C1</strong></p><ul><li>Cool Down – быстрое охлаждение рабочей камеры.<li>Режим понижения мощности для электрических моделей (1/2 энергии).</ul>]]>");
    //     item.ele('Price', 150000);
    //     item.ele('Images')
    //         .ele('Image', { url: "http://img.test.ru/8F7B-4A4F3A0F2BA1.jpg" })
    //     item.ele('VideoURL', "http://www.youtube.com/watch?v=YKmDXNrDdBI");
    //     item.ele('ManagerName', 'Николай');
    //     item.ele('ContactPhone', '+79641147711');
    // }
    // const xml = rootAds.end({ pretty: true });

    // console.log(xml)
    const phone = '+79641147711'
    let builder = require('xmlbuilder');
    let obj = {
        Ads: {
            '@formatVersion': '3',
            '@target': 'Avito.ru',
            Ad: {
                Id: {
                    '#text': phone // text node
                },
                AdStatus: {
                    '#text': 'Free' // text node
                }
            }
        }
    }

    var xml = builder.create(obj).end({ pretty: true });
    console.log(xml);
}
// // Записываем XML-данные в файл
// fs.writeFile('example.xml', rootAds, (err) => {
//     if (err) throw err;
//     console.log('XML-документ сохранен в файле "example.xml"');
// });

module.exports = (router, moduleName) => {
    router.get("/createXml/", checkMethod(createXml, moduleName));
}