// Проверяем является ли параметр строкой 
const isString = (param) => {
  return typeof param === "string";
};

// проверяем равны ми строки 
const compareString = (leftString, rightString) => {
  if (!isString(leftString) || !isString(rightString)) {
    return false;
  }
  return leftString.toUpperCase() === rightString.toUpperCase();
};


// Проверяем на массив и возращаем true если в массиве больше 0 значений
const compareStringInArray = (itemString, arrayItems) => {
  // не строка или не массив тогда ложь
  if (!itemString || !Array.isArray(arrayItems)) {
    return false;
  }
  let findItem = arrayItems.filter((item) => {
    return compareString(item, itemString);
  });
  return findItem.length > 0;
};

module.exports = { compareString, compareStringInArray };
