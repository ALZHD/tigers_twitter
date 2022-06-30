const router = require('express').Router();
const { Post } = require('../db/models');
const checkAuthor = require('../middlewares/checkAuthor');

// /posts/
router.post('/', async (req, res) => {
  const { title, img } = req.body; // req.body={title:...,img:...}
  const newPost = await Post.create({ title, img, author: req.ip }); // req.ip - это ip утройства, с которого пришёл запрос
  res.json({ newPost }); // {newPost:newPost}
});

router.get('/:id/delete', checkAuthor, async (req, res) => {
  await Post.destroy({ where: { id: req.params.id } });
  res.sendStatus(200);
});

module.exports = router;
