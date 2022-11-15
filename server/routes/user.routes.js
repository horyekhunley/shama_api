const {
  listAllUsers,
  createNewUser,
  readUser,
  updateUser,
  deleteUser,
  userById
} = require("../controllers/user.controller");
const express = require("express");
const {
  requirelogin,
  hasAuthorization,
} = require("../controllers/auth.controller");
const router = express.Router();

router.route("/").get(listAllUsers).post(createNewUser)

router
  .route("/:userId")
  .get(requirelogin, readUser)
  .put(requirelogin, hasAuthorization, updateUser)
  .delete(requirelogin, hasAuthorization, deleteUser)

router.param('userId', userById)


module.exports = router;
