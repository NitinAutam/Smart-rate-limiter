const jwt = require('jsonwebtoken');

exports.decodeToken = (token) => {
  try {
    const decoded = jwt.decode(token);
    const { userId, orgId } = decoded;
    return { userId, orgId };
  } catch (err) {
    return null;
  }
};
