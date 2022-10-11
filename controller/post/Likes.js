const expressAsyncHandler = require("express-async-handler");
const Post = require("../../model/post/PostModel");

exports.AddLikeCtrl = expressAsyncHandler(async (req, res) => {
  //Find the post data
  const { postId } = req.body;
  const post = await Post.findById(postId);
  //find the login users
  const loginUserId = req?.user?._id;

  //find if the user has liked or disliked these post
  const isLiked = post?.isLiked;
  const disliked = post?.dislikes?.find(
    (author) => author.toString() === loginUserId.toString()
  );
  console.log(post?.dislikes);
  //remove the user from dislikes list
  // console.log(disliked);
  if (disliked) {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { dislikes: loginUserId },
        isDisliked: false,
      },
      {
        new: true,
      }
    );
    // res.json(post);
  }
  //remove the user if he has liked then it will toggle the
  if (isLiked) {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      {
        new: true,
      }
    );
    res.json(post);
  } else {
    //is not liked
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { likes: loginUserId },
        isLiked: true,
      },
      {
        new: true,
      }
    );
    res.json(post);
  }
});
