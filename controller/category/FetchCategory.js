const expressAsyncHandler = require("express-async-handler");
const Category = require("../../model/category/Category");
exports.fetchCategoriesCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const category = await Category.find({})
      .populate("user")
      .sort("-createdAt");
    res.json(category);
  } catch (error) {
    res.json(error);
  }
});
