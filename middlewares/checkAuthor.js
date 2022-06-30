const { Post } = require('../db/models');

async function checkAuthor(req, res, next) {
  const { id } = req.params;
  const currPost = await Post.findByPk(id); // ищет по id
  if (currPost.author === req.ip) {
    next();
  } else {
    res.status(418).json({ message: 'не твой пост, чайник' });
  }
}
module.exports = checkAuthor;
