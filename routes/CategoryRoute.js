const { addCategoryCtrl } = require("../controller/category/Category");
const { fetchCategoriesCtrl } = require("../controller/category/FetchCategory");
const {
  fetchSingleCategoriesCtrl,
} = require("../controller/category/FetchSingleCategory");
const { UpdateCategoryCtrl } = require("../controller/category/UpdateCategory");
const { deleteCategoryCtrl } = require("../controller/category/DeleteCategory");
const categoryRouter = require("express").Router();
const AuthHandel = require("../middleware/auth/AuthHandler");

categoryRouter.route("/").post(AuthHandel, addCategoryCtrl);
categoryRouter.route("/").get( fetchCategoriesCtrl);
categoryRouter.route("/:id").get(AuthHandel, fetchSingleCategoriesCtrl);
categoryRouter.route("/:id").put(AuthHandel, UpdateCategoryCtrl);
categoryRouter.route("/:id").delete(AuthHandel, deleteCategoryCtrl);

module.exports = categoryRouter;
