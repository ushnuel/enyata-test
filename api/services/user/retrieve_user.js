const { User } = require("../../models");
const PasswordService = require("../password");
const ApiError = require("../../../api_error");
const serializeResponse = require("./serialize_response");

module.exports = async (email, password) => {
  if (!email) {
    throw new ApiError("email is required")
  }

  if (!password) {
    throw new ApiError("password is required")
  }

  const user = await checkIfUserExists(email, password)

  return serializeResponse(user)
};

const checkIfUserExists = async (email, password) => {
  const user = await User.findOne({
    where: { email }
  });

  if (!user) {
    throw new ApiError("User does not exist");
  }

  const passwordIsValid = await PasswordService.ComparePassword(password, user.encrypted_password);

  if (!passwordIsValid) {
    throw new ApiError("User does not exist");
  }

  return user
};
