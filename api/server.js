const express = require('express');
const server = express();
const postsRouter = require('./posts/posts-router')
const userRouter = require('./users/users-router')

const { logger } = require('./middleware/middleware')

server.use(express.json());
server.use('/posts', logger, postsRouter);
server.use('/user', logger, userRouter);

// remember express by default cannot parse JSON in request bodies

// global middlewares and routes need to be connected here

server.get('/', logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
