const ApiError = require("../api_error");

module.exports = error => {
  let { message } = error.details ? error.details[0] : error;
  message = message.replace(/"/g, "");

  throw new ApiError(message);
};
