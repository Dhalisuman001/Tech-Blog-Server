const expressAsyncHandler = require("express-async-handler");
const Comment = require("../../model/comment/CommentModel");
//----------------------------------------------------------------
//update comment
//----------------------------------------------------------------
exports.UpdateCommentCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const comment = await Comment.findByIdAndUpdate(
      id,
      {
        user:req?.user,
        description: req?.body?.description,
      },
      { new: true, runValidators: true }
    );
    res.json(comment);
  } catch (error) {
    res.json(error);
  }
});
