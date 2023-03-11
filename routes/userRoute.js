const express = require("express");
const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

router.route("/").get(getAllUsers);
router.route("/:id").get(getSingleUser);
router.route("/").post(createUser);
router.route("/:id").patch(updateUser);
router.route("/:id").delete(deleteUser);

module.exports = router;
