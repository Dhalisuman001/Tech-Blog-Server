const { createPostCtrl } = require("../post/PostCreate");
const { fetchPostCtrl } = require("../post/FetchPosts");
const { fetchSinglePost } = require("../post/FetchSinglePost");
const { updatePostCtrl } = require("../post/UpdatePostCtrl");
const { DeletePostCtrl } = require("../post/DeletePostCtrl");
const { AddLikeCtrl } = require("./Likes");
const { AddDislikeCtrl } = require("./Dislikes");

module.exports = {
  PostCreateCtrl: createPostCtrl,
  allPost: fetchPostCtrl,
  SinglePost: fetchSinglePost,
  UpdatePost: updatePostCtrl,
  DeletePost: DeletePostCtrl,
  AddLikeCtrl,
  AddDislikeCtrl,
};
