const routerCheck = (router, methods = ["put", "post", "delete"]) => {
  if (Array.isArray(router?.stack)) {
    const findMethod = {};

    router.stack.forEach((item) => {
      const getExistMethods = methods.filter(
        (method) => item.route.methods[method]
      );

      getExistMethods.forEach((method) => {
        findMethod[method] = true;
      });
    });

    return Object.keys(findMethod).map((item) => item.toUpperCase());
  }

  return [];
};

module.exports = { routerCheck };
