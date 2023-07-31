
// Создание либо обновление записи по id из внешнего источника
module.exports = async (data, options, modelBD) => {
    try {
        // Проверяем, существует ли запись согласно условию
        let existingRecord = await modelBD.findOne({ where: options })

        if (existingRecord) {
            // Если запись уже существует, выполняем обновление
            await modelBD.update(data, { where: options });
            existingRecord = await modelBD.findOne({ where: options })
            return existingRecord;
        } else {
            // Если запись не существует, выполняем добавление
            existingRecord = await modelBD.create(data);
            return existingRecord;
        }
    } catch (error) {
        throw new Error(error);
    }
};


