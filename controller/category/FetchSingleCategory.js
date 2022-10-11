const expressAsyncHandler = require("express-async-handler");
const Category = require("../../model/category/Category");
exports.fetchSingleCategoriesCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id).populate("user");
    res.json(category);
  } catch (error) {
    res.json(error);
  }
});
