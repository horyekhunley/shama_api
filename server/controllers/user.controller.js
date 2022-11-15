const User = require("../models/user.model");
const extend = require("lodash/extend");

// to create a new user
exports.createNewUser = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    return res.status(201).json({
      message: "New user created",
      user,
    });
  } catch (err) {
    return res.status(400).json({
      message: "Error occurred creating user",
      err,
    });
  }
}
// to list all users
exports.listAllUsers = async (req, res) => {
  try {
    let users = await User.find({}).select("name email timestamps");
    res.json(users);
  } catch (err) {
    return res.status(400).json({
      message: "Error occurred fetching users",
      err,
    });
  }
}
exports.userById = async (req, res, next, id) => {
    try {
        let user = await User.findById(id)
        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            })
        }
            req.profile = user
            next()

    } catch (err) {
        return res.status(400).json({
            message: "Error occurred fetching user",
            err,
          })
    }
}
// get a single user
exports.readUser = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.status(200).json(req.profile);
}
// update a user
exports.updateUser = async (req, res) => {
  try {
    let user = req.profile;
    user = extend(user, req.body);
    user.updated = Date.now();
    await user.save();
    user.hashed_password = undefined;
    user.salt = undefined;
    res.status(200).json({
      message: "User updated successfully",
      user,
    });
  } catch (err) {
    return res.status(400).json({
      message: "Error occurred fetching users",
      err,
    });
  }
}
// to delete a user
exports.deleteUser = async (req, res) => {
  try {
    let user = req.profile;
    let deletedUser = await user.remove();
    deletedUser.hashed_password = undefined;
    deletedUser.salt = undefined;
    res.status(200).json({
      message: "User deleted successfully",
      deletedUser,
    });
  } catch (err) {
    return res.status(400).json({
      message: "Error occurred fetching users",
      err,
    });
  }
}
