var express = require("express");
var router = express.Router();
const post = require('../controllers/postController');

/* GET users listing. */
router.get("/posts", post.getPosts);
router.post("/post", post.createdPost);
router.delete('/posts', post.deletePosts);
router.delete('/posts', post.deletePost);
router.patch('/post', post.modifyPost);

module.exports = router;
