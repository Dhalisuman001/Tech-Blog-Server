const expressAsyncHandler = require("express-async-handler");
const Post = require("../../model/post/PostModel");

exports.AddDislikeCtrl = expressAsyncHandler(async (req, res) => {
  //1.Find the post to be dislike
  const { postId } = req.body;
  const post = await Post.findById(postId);
  //2.find the login users
  const loginUserId = req?.user?._id;
  console.log(loginUserId);

  //3.find if the user has  disliked these post
  const isDisliked = post?.isDisliked;
  //4.find if the user has  liked these post
  const liked = post.likes.find(
    (element) => element.toString() === loginUserId.toString()
  );

  //remove the user from likes list
  if (liked) {
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
    // res.json(post);
  }
  //remove the user if he has disliked then it will toggle the
  if (isDisliked) {
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
    res.json(post);
  } else {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { dislikes: loginUserId },
        isDisliked: true,
      },
      {
        new: true,
      }
    );
    res.json(post);
  }
});
