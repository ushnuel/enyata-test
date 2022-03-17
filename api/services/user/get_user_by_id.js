const { User } = require("../../models");
const ApiError = require('../../../api_error');

module.exports = async (userId) => {
  if (!userId) {
    throw new ApiError("user_id is required")
  }

  // do not allow float numbers or string as user id
  const userIdIsValid = parseUserId(userId)

  if (!userIdIsValid) {
    throw new ApiError("Invalid user id")
  }

  const user = await User.findByPk(userId);

  if (!user) {
    throw new ApiError(`User does not exist`);
  }

  return user
}

const parseUserId = userId => {
  const convertedUserId = Number(userId);
  const userIdIsNaN = isNaN(convertedUserId);

  const numberIsFloat = convertedUserId % 1 !== 0;

  if (userIdIsNaN || numberIsFloat) {
    return false;
  }

  return true;
};