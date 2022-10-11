const expressAsyncHandler = require("express-async-handler");
const Category = require("../../model/category/Category");
exports.UpdateCategoryCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByIdAndUpdate(
      id,
      {
        title: req.body.title,
      },
      { new: true, runValidators: true }
    );
    res.json(category);
  } catch (error) {
    res.json(error);
  }
});
