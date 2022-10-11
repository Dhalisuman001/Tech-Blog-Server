const mongoose = require("mongoose");

const DbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URl, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Db connected successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = DbConnection;
