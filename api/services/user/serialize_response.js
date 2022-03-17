module.exports = (rawSequelizeObject) => {
  const serializedResponse = JSON.parse(JSON.stringify(rawSequelizeObject));
  delete serializedResponse.encrypted_password;
  return serializedResponse
}