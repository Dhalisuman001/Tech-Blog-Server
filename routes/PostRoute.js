const postRouter = require("express").Router();
const {
  PostCreateCtrl,
  allPost,
  SinglePost,
  UpdatePost,
  DeletePost,
  AddLikeCtrl,
  AddDislikeCtrl,
} = require("../controller/post");
const AuthHandel = require("../middleware/auth/AuthHandler");
const {
  PhotoUpload,
  PostPhotoResize,
} = require("../middleware/upload/PhotoUpload");

postRouter
  .route("/create-post")
  .post(
    AuthHandel,
    PhotoUpload.single("image"),
    PostPhotoResize,
    PostCreateCtrl
  );

postRouter.route("/").get(allPost);
postRouter.route("/:id").get(SinglePost);
postRouter.route("/likes").put(AuthHandel, AddLikeCtrl);
postRouter.route("/dislikes").put(AuthHandel, AddDislikeCtrl);
postRouter.route("/:id").put(AuthHandel, UpdatePost);
postRouter.route("/:id").delete(AuthHandel, DeletePost);

module.exports = postRouter;
