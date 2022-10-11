const expressAsyncHandler = require("express-async-handler");
const Comment = require("../../model/comment/CommentModel");
//----------------------------------------------------------------
//fetch all comments
//----------------------------------------------------------------
exports.fetchSingleComment = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const comment = await Comment.findById(id);
    res.json(comment);
  } catch (error) {
    res.json(error);
  }
  //   res.json("fetching single commant");
});
