const User = require("../models/User");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ users, count: users.length });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      console.log("get single user - id: ", id);
      return res.status(404).json({ msg: `Not a valid id` });
    }

    const user = await User.findOne({ _id: id });
    console.log("get single user - user:", user);

    if (!user) {
      return res.status(404).json({ msg: `No user with id: ${id}` });
    }
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

//create user
const createUser = async (req, res) => {
  const { name } = req.body;
  try {
    // if empty name
    if (!name) {
      return res.status(401).send({ msg: "Please provide credential" });
    }

    //if name is a number
    const nameValRegex = /^[a-zA-Z]*$/;

    if (!nameValRegex.test(name))
      return res.status(401).json({ msg: "Name must be a string" });

    const user = await User.create(req.body);

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

//update user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOneAndUpdate({ _id: id }, req.body);
    if (!user) {
      return res.status(404).json({ msg: `No user with id: ${id}` });
    }

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOneAndDelete({ _id: id });
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
};
