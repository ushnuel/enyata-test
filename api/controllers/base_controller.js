const ApiError = require('../../api_error');
const throwParamValidationError = require('../../middleware/throw_param_validation_error');

class BaseController {
  static throwApiError(message, statusCode=400) {
    throw new ApiError(message, statusCode);
  }

  static throwParamValidationError(error) {
    throwParamValidationError(error);
  }
}

module.exports = BaseController;