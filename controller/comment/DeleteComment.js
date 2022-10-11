const expressAsyncHandler = require("express-async-handler");
const Comment = require("../../model/comment/CommentModel");
const isValid = require("../../utils/validUserId");
//----------------------------------------------------------------
//update comment
//----------------------------------------------------------------
exports.DeleteCommentCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  isValid(id);

  try {
    const comment = await Comment.findByIdAndDelete(id);
    res.json(comment);
  } catch (error) {
    res.json(error);
  }
});
