const Joi = require("joi");
const BaseController = require("./base_controller");
const UserService = require("../services/user");

class UsersController extends BaseController {
  static async create(req, res, next) {
    try {
      const { error } = validateCreateUserParam(req.body);

      if (error) {
        super.throwParamValidationError(error);
      }

      const userData = {
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
      }

      const data = await UserService.CreateUser(userData);

      res.status(201).json({
        message: "User retrieved successfully",
        data
      });
    } catch (error) {
      next(error);
    }
  }

  static async read(req, res, next) {
    try {
      const data = await UserService.RetrieveUser(req.query.email, req.query.password);

      res.status(200).json({
        message: "User retrieved successfully",
        data
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      await UserService.DeleteUser(req.params.id);

      res.status(200).json({
        message: "User deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { error } = validateUpdateUserParam(req.body);

      if (error) {
        super.throwParamValidationError(error);
      }

      const data = await UserService.UpdateUser(req.params.id, req.body);

      res.status(200).json({
        message: "User updated successfully",
        data
      });
    } catch (error) {
      next(error);
    }
  }
}

const validateCreateUserParam = params => {
  const schema = Joi.object({
    password: Joi.string().required().min(8),
    name: Joi.string().required(),
    email: Joi.string().email().required()
  });

  return schema.validate(params);
};

const validateUpdateUserParam = params => {
  const schema = Joi.object({
    password: Joi.string().min(8),
    name: Joi.string(),
    email: Joi.string().email()
  });

  return schema.validate(params);
};

module.exports = UsersController;
