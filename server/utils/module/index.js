const capitalizeFirstLetter = (str) => {
  if (typeof str === "string") {
    const arrStr = str.split("");
    return arrStr[0].toUpperCase() + arrStr.slice(1).join("");
  }
  return str;
};

const loader = (name, obj) => {
  if (
    typeof name === "string" &&
    typeof obj === "object" &&
    !Array.isArray(obj)
  ) {
    return Object.keys(obj).reduce((prev, item) => {
      prev[`${name}${capitalizeFirstLetter(item)}`] = obj[item];
      return prev;
    }, {});
  }
  return {};
};

module.exports = { loader };
