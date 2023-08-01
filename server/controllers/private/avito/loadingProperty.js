const models = require("@models");
const { checkMethod } = require("@utils");

const { moduleName } = require("./config/config")

const { addOrUpdateRecord } = require("@utils/db");


// логирование загрузки данных
const { addSyncInfo } = require('@utils/logging/syncLogging')

let model = models.propertyMarketPlace


const loadingPropertyAvito = async (req, res) => {
  try {

    const { marketPlace = 1 } = req.query
    const fs = require('fs');


    // Чтение файла HTML
    fs.readFile("W:\\Developmen\\NodeJS\\crm_js\\uploader\\temp\\avito.html", 'utf8', (error, data) => {
      if (error) {
        console.error('Ошибка чтения файла:', error);
        return;
      }

      const regex = /window.__initialData__ = "(.*?)";/;
      const match = data.match(regex);
      if (match) {
        const result = match[1]; // Извлекаем текст внутри /window.__initialData__ = "(.*?)";/ тега
        const decodedValue = decodeURIComponent(result);
        const jsData = JSON.parse(decodedValue);

        const arrayData = jsData['@avito/frontend-autoload-documentation:1.2.1'].categoryDataCache['1196360']['excel']['field_groups']
        // console.log(arrayData);
        let items = {}
        for (let i of arrayData) {
          for (let f of i['fields']) {
            let description = '';
            let value = '';
            if (f.values_title !== undefined && f.values !== undefined) {
              value = `${f.values_title}\n\n`
              for (let v of f['values']) {
                value = value + `значение: ${v?.value} / ${v?.description ? v?.description : ''}\n`
              }
            }
            description = `${f.description} \n\n ${value}`
            addOrUpdateRecord(
              {
                name: f.description.split('\n\n')[0],
                params: f.tag,
                description: description,
                requiredField: f.required ? 1 : null,
                example: f.example,
                marketPlaceId: marketPlace
              },
              {
                params: f.tag,
                name: f.description.split('\n\n')[0],
              },
              model)
          }
        }
        addSyncInfo(`Обработан файл`, moduleName, __filename, new Date(), 1)
        res.status(200).send('Данные загружены из файла');
      } else {
        console.log(`${new Date()} Обработано ${countProduct} товаров // ${moduleName} // ${__filename}`)
        addSyncInfo(`Обработан файл`, moduleName, __filename, new Date(), 0)
        res.status(200).send('Данные в файле не найдены');
      }

    });
  } catch (error) {
    console.log(`${new Date()} Обработано ${countProduct} товаров // ${moduleName} // ${__filename}`)
    addSyncInfo(`${error}`, moduleName, __filename, new Date(), 1)
    res.status(200).send('Данные в файле не найдены');

  }

}



module.exports = (router, moduleName) => {
  router.get("/loadingpropertyavito/", checkMethod(loadingPropertyAvito, moduleName));
}