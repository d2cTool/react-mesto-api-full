const jwt = require('jsonwebtoken');
const NotFoundError = require('../errors/notFoundError');
const ConflictError = require('../errors/conflictError');
const UnauthorizedError = require('../errors/unauthorizedError');
const User = require('../models/user');

const { JWT_SECRET = 'top secret' } = process.env;

const getUsers = (req, res, next) => User.find({})
  .then((users) => res.send(users))
  .catch((err) => next(err));

const getUser = (req, res, next) => User.findById(req.user._id)
  .orFail(() => new NotFoundError('User is not found'))
  .then((usr) => res.send(usr))
  .catch((err) => next(err));

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  User.create({
    name, about, avatar, email, password,
  })
    .then(() => res.send({
      user: {
        name,
        about,
        avatar,
        email,
      },
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('User already exist'));
      } else {
        next(err);
      }
    });
};

const getUserById = (req, res, next) => User.findById(req.params.userId)
  .orFail(() => new NotFoundError('User is not found'))
  .then((user) => res.send(user))
  .catch((err) => next(err));

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true, runValidators: true,
    },
  )
    .orFail(() => new NotFoundError('User is not found'))
    .then((usr) => res.send(usr))
    .catch((err) => next(err));
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true, runValidators: true,
    },
  )
    .orFail(() => new NotFoundError('User is not found'))
    .then((usr) => res.send(usr))
    .catch((err) => next(err));
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUser(email, password)
    .then((usr) => {
      const token = jwt.sign({ _id: usr._id }, JWT_SECRET, { expiresIn: '7d' });
      // res.cookie('jwt', token, {
      //   maxAge: 24 * 3600 * 1000, // hours
      //   httpOnly: true,
      //   sameSite: true,
      // });
      // res.send({ message: `User with email ${email} authorized` });
      res.send({ token });
    })
    .catch((err) => next(new UnauthorizedError(err.message)));
};

module.exports = {
  createUser,
  getUsers,
  updateUser,
  updateAvatar,
  getUserById,
  login,
  getUser,
};
