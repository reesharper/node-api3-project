const express = require('express');

const User = require('./users-model')
const Post = require('../posts/posts-model')
const router = express.Router();

const { validateUserId, validateUser, validatePost } = require('../middleware/middleware')

router.post('/', validateUser, (req, res, next) => {
  User.insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      next(error)
    });
});

router.get('/', (req, res, next) => {
  User.get(req.query)
    .then(users => {
      res.status(200).json(users)
    })
  .catch(error => {
    next(error)
  })
});

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user)
});

router.delete('/:id', validateUserId, (req, res, next) => {
  User.remove(req.params.id)
    .then(() => {
      res.status(200).json({ message: "the user has been deleted" })
    })
    .catch(error => {
      next(error)
    })
});

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  User.update(req.params.id, req.body)
    .then(() => {
      res.status(200).json(req.body)
    })
    .catch(error => {
      next(error)
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res, next) => {
  const postInfo = { ...req.body, user_id: req.params.id };
  Post.insert(postInfo)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(error => {
      next(error)
    })
});

router.get('/:id/posts', validateUserId, (req, res, next) => {
  User.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(error => {
      next(error)
    })
});

router.use((error, req, res) => {
  res.status(500).json({
    info: 'something horrible happened inside the user router',
    message: error.message,
    stack: error.stack,
  })
})

module.exports = router;