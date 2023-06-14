const { HttpError } = require("../helpers");
const validateBody = (schema) => {
  const func = (req, res, next) => {
    if (Object.keys(req.body).length === 0 && req.method === "PUT") {
      throw HttpError(400, "Missing fields");
    } else if (Object.keys(req.body).length === 0 && req.method === "PATCH") {
      throw HttpError(400, "Missing field favorite");
    }
    const { error } = schema.validate(req.body);
    if (error) {
      console.log(error);
      next(HttpError(400, error.message));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
