const expressAsyncHandler = require("express-async-handler");
const Comment = require("../../model/comment/CommentModel");
const isBlocked = require('../../utils/isBlocked')
//----------------------------------------------------------------
//create a new comment
//----------------------------------------------------------------
exports.createComment = expressAsyncHandler(async (req, res) => {
  // 1. get the user
  const user = req.user;
   console.log(user);
  //check if the user is block
  isBlocked(user);
  // 2. get the post id
  const { postId, description } = req?.body;
  //   console.log(req.user);


  try {
    const comment = await Comment.create({
      post: postId,
      user,
      description,
    });
     console.log(comment);
    res.json(comment);
  } catch (error) {
    res.json(error);
  }
});
