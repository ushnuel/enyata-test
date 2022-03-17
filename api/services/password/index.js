const bcrypt = require('bcrypt');

const EncryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(11);
  return bcrypt.hash(password, salt);
}

const ComparePassword = async (password, encryptedPassword) => {
  return bcrypt.compare(password, encryptedPassword)
}

module.exports = { 
  EncryptPassword,
  ComparePassword
};