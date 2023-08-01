Promise.prototype.defAnswer = function (res, errorStatus = 500, errorMessage) {
    return this.then((data) => {
        if (typeof res?.send === "function") {
            res.send({ ...data, new: true });
        }
    }).catch((err) => {
        console.log(`\x1b[31mERROR:\x1b[0m`, err);
        if (typeof res?.status === "function") {
            res.status(errorStatus).send(errorMessage ? errorMessage : err.message);
        }
    });
};