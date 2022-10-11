const commentRouter = require("express").Router();
const { createComment } = require("../controller/comment/CreateComment");
const { DeleteCommentCtrl } = require("../controller/comment/DeleteComment");
const { fetchComments } = require("../controller/comment/FetchComments");
const {
  fetchSingleComment,
} = require("../controller/comment/FetchSingleComment");
const { UpdateCommentCtrl } = require("../controller/comment/UpdateComment");

const AuthHandel = require("../middleware/auth/AuthHandler");

commentRouter.route("/").post(AuthHandel, createComment);
commentRouter.route("/").get( fetchComments);
commentRouter.route("/:id").get(AuthHandel, fetchSingleComment);
commentRouter.route("/:id").put(AuthHandel, UpdateCommentCtrl);
commentRouter.route("/:id").delete(AuthHandel, DeleteCommentCtrl);

module.exports = commentRouter;
