const express = require('express');
const server = express();
const postsRouter = require('./posts/posts-router')
const userRouter = require('./users/users-router')

const { logger } = require('./middleware/middleware')

server.use(express.json());
server.use('/posts', logger, postsRouter);
server.use('/user', logger, userRouter);

server.get('/', logger, (req, res) => {
  res.status(200).json({
    api: 'UP',
    environment: process.env.NODE_ENV
  })
});

module.exports = server;
