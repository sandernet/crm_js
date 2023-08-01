const fs = require("fs");

const getMediaPath = (prefix) => {
    // if (!fs.existsSync("./media")) {
    //   fs.mkdirSync("./media");
    // }
    // if (prefix) {
    //   if (!fs.existsSync(`./media/${prefix}`)) {
    //     fs.mkdirSync(`./media/${prefix}`);
    //   }
    // }

    return prefix ? `./media/${prefix}/` : "./media/";
};

module.exports = { getMediaPath };