const router = require('express').Router();
const { Post } = require('../db/models');

// /posts/
router.post('/', async (req, res) => {
  const { title, img } = req.body; // req.body={title:...,img:...}
  const newPost = await Post.create({ title, img, author: req.ip });
  res.json({ newPost });
});

router.get('/:id/delete', async (req, res) => {
  await Post.destroy({ where: { id: req.params.id } });
  res.sendStatus(200);
});

module.exports = router;
