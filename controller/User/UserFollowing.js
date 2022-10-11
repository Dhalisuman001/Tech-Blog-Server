const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/user/UserModel");

//----------------------------------------------------------------
//Follow user controller
//----------------------------------------------------------------

exports.followingUsers = expressAsyncHandler(async (req, res) => {
  // i. Find the user you want to follow and updates it's follower
  // ii. Update your following list
  const { followId } = req.body;
  const loginUserId = req.user._id;
  //find the target user and check already in follow list
  const targetUser = await User.findById(followId);
  const alredyFollow = await targetUser?.followers?.find(
    (u) => u.toString() === loginUserId.toString()
  );
  if (alredyFollow) throw new Error(`You have already followed this user `);
  // console.log(alredyFollow);

  // task (i) is done
  await User.findByIdAndUpdate(
    followId,
    {
      $push: { followers: loginUserId },
      isFollwing: true,
    },
    { new: true }
  );
  // task (ii) is done
  await User.findByIdAndUpdate(
    loginUserId,
    {
      $push: { following: followId },
    },
    { new: true }
  );

  res.json({
    message: "You have successfully followed this user",
    followId,
    loginUserId,
  });
});

//----------------------------------------------------------------
//unfollow user controller
//----------------------------------------------------------------

exports.unFollowingUsers = expressAsyncHandler(async (req, res) => {
  // i. Find the user you want to unfollow and updates it's follower
  // ii. Update your following list
  const { unFollowId } = req.body;
  if (!unFollowId) throw ("Provide the user id")
    
  
  const loginUserId = req.user._id;

  ///unfollow the users
  await User.findByIdAndUpdate(
    unFollowId,
    {
      $pull: { followers: loginUserId },
      isFollwing: false,
    },
    {
      new: true,
    }
  );
  ///unfollow form myProfile
  await User.findByIdAndUpdate(
    loginUserId,
    {
      $pull: { following: unFollowId },
    },
    {
      new: true,
    }
  );
  res.json({
    message: "You have successfully unfollowed ",
    unFollowId,
  });
});
