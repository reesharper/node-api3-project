const express = require('express');

const Posts = require('./posts-model')
const router = express.Router();

const { validatePostId, validatePost } = require('../middleware/middleware')

router.get('/', (req, res, next) => {
  Posts.get(req.query)
    .then(posts => {
      res.status(200).json(posts)
    })
  .catch(error => {
    next(error)
  })
});

router.get('/:id', validatePostId, (req, res) => {
  res.status(200).json(req.post)
});

router.delete('/:id', validatePostId, (req, res, next) => {
  Posts.remove(req.params.id)
    .then(() => {
      res.status(200).json({ message: "the post has been deleted" })
    })
    .catch(error => {
      next(error)
    })
});

router.put('/:id', validatePostId, validatePost, (req, res, next) => {
  Posts.update(req.params.id, req.body)
    .then(() => {
      res.status(200).json(req.body)
    })
    .catch(error => {
      next(error)
    })
});

router.use((error, req, res) => {
  res.status(500).json({
    info: 'something terrible happened inside the posts router',
    message: error.message,
    stack: error.stack,
  })
})

module.exports = router;