const ApiError = require("../../../api_error");
const { User } = require("../../models");

module.exports = async (email) => {
  const user = await User.findOne({
    where: { email }
  });

  if (user) {
    throw new ApiError("This email has been used to create an existing account", 409);
  }
}