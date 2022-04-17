const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Invalid token format');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    const secret = NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key';
    payload = jwt.verify(token, secret);
  } catch (err) {
    throw new UnauthorizedError('Invalid token');
  }

  req.user = payload;
  next();
};
