
const User = require('../users/users-model')
const Post = require('../posts/posts-model')

function logger(req, res, next) {
  console.log(req.method)
  console.log(req.path)
  console.log(new Date())
  next()
}

async function validateUserId(req, res, next) {
  try {
    const user = await User.getById(req.params.id)
    if(user) {
      req.user = user
      next()
    } else {
      res.status(404).json(`user with id ${req.params.id} not found`)
    }
  } catch (err) {
    res.status(500).json('ERROR')
  }
}

function validateUser(req, res, next) {
  const { name } = req.body;
  if(name) {
    next()
  } else {
    res.status(400).json({ error: 'please provide a name'})
  }
}

async function validatePostId(req, res, next) {
  try {
    const post = await Post.getById(req.params.id)
    if(post) {
      req.post = post
      next()
    } else {
      res.status(404).json(`post with id ${req.params.id} not found`)
    }
  } catch (err) {
    res.status(500).json('ERROR')
  }
}

function validatePost(req, res, next) {
  const  { text } = req.body;
  if(text) {
    next()
  } else {
    res.status(400).json({ error: 'missing required text' })
  }
}

// do not forget to expose these functions to other modules

module.exports = { logger, validateUserId, validateUser, validatePostId, validatePost }