const router = require('express').Router();
const { Post } = require('../db/models');

router.get('/', async (req, res) => {
  const allPosts = await Post.findAll(); [{title:,img:,id:,crea}]
  res.render('main', { allPosts }); // { allPosts:allPosts }
});

module.exports = router;
