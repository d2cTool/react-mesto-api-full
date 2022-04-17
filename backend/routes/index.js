const express = require('express');
const userRouter = require('./users');
const cardRouter = require('./cards');

const NotFoundError = require('../errors/notFoundError');

const router = express.Router();

router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server ');
  }, 0);
});

router.use('/', (req, res, next) => {
  next(new NotFoundError('Something went wrong'));
});

module.exports = router;
