const expressAsyncHandler = require("express-async-handler");
const Comment = require("../../model/comment/CommentModel");
//----------------------------------------------------------------
//fetch all comments
//----------------------------------------------------------------
exports.fetchComments = expressAsyncHandler(async (req, res) => {
  try {
    const comments = await Comment.find({}).sort("-created");
    console.log(comments);
    res.json(comments);
  } catch (error) {
    res.json(error);
  }
});
