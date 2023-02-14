require("dotenv").config();
const express = require("express");
const DbConnect = require("./config/db/DbConnect");
const cors = require("cors");
const { errorHandler, notFound } = require("./middleware/error/ErrorHandeler");
const userRouter = require("./routes/UserRoute");
const postRouter = require("./routes/PostRoute");
const eMassageRouter = require("./routes/eMassageRoute");
const commentRouter = require("./routes/CommentRoute");
const categoryRouter = require("./routes/CategoryRoute");
const app = express();
const v = process.env.API_VERSION;
//db connection
DbConnect();

//regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//for api documentation purpose


// user route middleware
app.use(`/api/${v}/users`, userRouter);
// post route middleware
app.use(`/api/${v}/posts`, postRouter);
// comment route middleware
app.use(`/api/${v}/comments`, commentRouter);
// email message route middleware
app.use(`/api/${v}/email`, eMassageRouter);
// category route middleware
app.use(`/api/${v}/category`, categoryRouter);

//error handler
app.use(notFound);
app.use(errorHandler);

module.exports = app;
