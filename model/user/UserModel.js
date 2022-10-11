const { mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

///create schema
const userSchema = mongoose.Schema(
  {
    firstname: {
      required: [true, "Please enter first name"],
      type: String,
    },
    lastname: {
      required: [true, "Please enter last name"],
      type: String,
    },
    profilePhoto: {
      type: String,
      default:
        "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png",
    },
    bio: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Please enter email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter email"],
    },
    postCount: {
      type: Number,
      default: 0,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["Admin", "Guest", "Blogger"],
    },
    isFollwing: {
      type: Boolean,
      default: false,
    },
    isUnFollwing: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: String,
    verificationTokenExpire: Date,
    
    viewedBy: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },

    followers: {
      type: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    },
    following: {
      type: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    },
    passwordChangedAt: Date,
    forgotPasswordToken: String,
    forgotPasswordTokenExpire: Date,
    active: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamp: true,
  }
);
//virtual method to populate post
userSchema.virtual("posts", {
  ref: "Post",
  foreignField: "author",
  localField: "_id",
});

//virtual method to populate accountType
userSchema.virtual("accountType", {
  ref: "Post",
  foreignField: "author",
  localField: "_id",
}).get(function(){
  const totalFollower = this.followers.length;
  return totalFollower >= 5 ? "Pro account" : "Starter account";
});



// encrypt password before save --Hooks
userSchema.pre("save", async function (next) {
  // Only run this function if password was moddified (not on other update functions)
  if (!this.isModified("password")) return next();
  // Hash password with strength of 10
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//match password
userSchema.methods.isPassword = async function (user__input__passwurd) {
  return await bcrypt.compare(user__input__passwurd, this.password);
};

//verify email
userSchema.methods.verifyEmail = async function () {
  // create token
  const verificationToken = crypto.randomBytes(32).toString("hex");
  this.verificationToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");
  this.verificationTokenExpire = Date.now() + 10 * 60 * 1000;

  return verificationToken;
};

// get password reset token
userSchema.methods.getPasswordResetToken = async function () {
  const resetPasswordToken = crypto.randomBytes(12).toString("hex");
  this.forgotPasswordToken = crypto
    .createHash("sha256")
    .update(resetPasswordToken)
    .digest("hex");
  this.forgotPasswordTokenExpire = Date.now() + 10 * 60 * 1000;

  return resetPasswordToken;
  // this.forgotPasswordToken = crypto.createHash("sha256").update()
};
//compile schema into model
const User = mongoose.model("User", userSchema);
module.exports = User;
