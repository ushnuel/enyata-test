const { User } = require("../../models");
const PasswordService = require("../password");
const checkIfParamsViolatesUniqueConstraints = require("./check_if_params_violates_unique_constraints");
const serializeResponse = require("./serialize_response");

module.exports = async (userData) => {
  await checkIfParamsViolatesUniqueConstraints(userData.email);

  userData.encrypted_password = await PasswordService.EncryptPassword(userData.password);
  userData.name = userData.name.trim();
  userData.email = userData.email.trim().toLowerCase();

  const user = await User.create({ ...userData });

  return serializeResponse(user)
};
