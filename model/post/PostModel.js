const mongoose = require("mongoose");

//Post schema
const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide the title."],
    },
    //post category
    category: {
      type: String,
      required: [true, "Please provide the Category."],
    },
    isLiked: {
      type: Boolean,
      default: false,
    },
    isDisliked: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: [true, "Author is required"],
    },
    description: {
      type: String,
      required: [true, "Please provide the description"],
    },
    image: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2014/05/11/11/12/mailbox-341744__340.jpg",
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);
postSchema.virtual('comments',{
  ref:"Comment",
  foreignField:"post",
  localField:"_id"
})
//compile
const Post = mongoose.model("Post", postSchema);
module.exports = Post;
