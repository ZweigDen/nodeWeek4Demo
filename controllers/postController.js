const Post = require('../models/postModel');
const handleSuccess = require('../service/handleSuccess');
const handleError = require('../service/handleError');

const post={
    async getPosts(req, res) {
        const allPost = await Post.find().populate({
          path:'user',
          select:"name photo"
        });
        handleSuccess(res, allPost);
    },
    async createdPost(req, res) {
        try {
          const { body } = req;
          if (!!body.content) {
            const newPost = await Post.create({
              content: body.content,
              image: body.image,
              user: body.user,
              likes: body.likes,
            });
            handleSuccess(res, newPost);
          } else {
            handleError(res);
          }
        } catch (error) {
          handleError(res, error);
        }
      },
      async deletePosts(req, res) {
        await Post.deleteMany();
        handleSuccess(res);
      },
      async deletePost(req, res) {
        const id = req.params.id;
        const isIdExist = await Post.findOne({ _id: id });
        if (isIdExist) {
          const posts = await Post.findByIdAndDelete(id);
          handleSuccess(res, posts);
        } else {
          handleError(res);
        }
      },
      async modifyPost(req, res) {
        try {
          const id = req.params.id;
          const content = req.body.content;
          const isIdExist = await Post.findOne({ _id: id });
          if (!!isIdExist && !!content) {
            await Post.findByIdAndUpdate(id, { content });
            const posts = await Post.find();
            handleSuccess(res, posts);
          } else {
            handleError(res);
          }
        } catch (error) {
          handleError(res, error);
        }
      },
}

module.exports =post;