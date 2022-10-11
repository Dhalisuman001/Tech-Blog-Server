const mongoose = require("mongoose");

//valid user

const validId = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) throw new Error(`Id isn't a valid`);
};

module.exports = validId;
