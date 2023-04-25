const fs = require('fs');
const xmlbuilder = require('xmlbuilder');


const creatXml = () => {

    // Создаем новый документ XML
    const rootAds = xmlbuilder.create('Ads', { formatVersion: "3", target: "Avito.ru" })

    for (var i = 1; i <= 5; i++) {
        var item = rootAds.ele('Ad');
        item.ele('Id', 'Id'); //Уникальный идентификатор объявления в вашей базе данных – строка до 100 символов.
        item.ele('AdStatus', 'Free'); //Услуга продвижения
        item.ele('AvitoId', 'AvitoId'); //Номер объявления на Авито — целое число.
        item.ele('ManagerName', 'ManagerName');
        item.ele('ContactPhone', 'ContactPhone');
        item.ele('Address', 'Тамбовская область, Моршанск, Лесная улица, 7');
        item.ele('Title', 'value');
        item.ele('Description', "<![CDATA[<p><strong>Электрический бойлерный пароконвектомат RATIO C1</strong></p><ul><li>Cool Down – быстрое охлаждение рабочей камеры.<li>Режим понижения мощности для электрических моделей (1/2 энергии).</ul>]]>");
        item.ele('Price', 150000);
        item.ele('Images', "");
        item.ele('VideoURL', "VideoURL");
    }
    const xml = rootAds.end({ pretty: true });

    console.log(xml)
}
// // Записываем XML-данные в файл
// fs.writeFile('example.xml', rootAds, (err) => {
//     if (err) throw err;
//     console.log('XML-документ сохранен в файле "example.xml"');
// });

module.exports = {
    creatXml
}