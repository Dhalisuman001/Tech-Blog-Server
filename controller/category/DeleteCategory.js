const expressAsyncHandler = require("express-async-handler");
const Category = require("../../model/category/Category");
exports.deleteCategoryCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByIdAndDelete(id);
    res.json(category);
  } catch (error) {
    res.json(error);
  }
});
