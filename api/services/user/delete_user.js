const { User } = require("../../models");
const getUserById = require("./get_user_by_id");

module.exports = async (userId) => {
  const user = await getUserById(userId);

  await User.destroy({
    where: {
      id: user.id,
    }
  })
}