const getUserById = require("./get_user_by_id");
const checkIfParamsViolatesUniqueConstraints = require("./check_if_params_violates_unique_constraints");
const PasswordService = require("../password");
const serializeResponse = require("./serialize_response");

module.exports = async (userId, requestBody) => {
  const user = await getUserById(userId);

  const data = { ...requestBody }

  const email = data.email;

  if (email && email != user.email) {
    await checkIfParamsViolatesUniqueConstraints(email);
    data.email = email.trim().toLowerCase()
  }

  if (data.password) {
    data.encrypted_password = await PasswordService.EncryptPassword(data.password);
  }
  
  await user.update(data)

  return serializeResponse(user)
};
