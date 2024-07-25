const User = require("../model/userModel");

const controller = {
  async createUser(req, res) {
    try {
      const { name, age, mobile, email } = req.body;

      const createdUser = await User.create({
        name,
        age,
        mobile,
        email,
      });

      res.status(200).json({
        status: true,
        message: "User registered Successfully",
        createdUser,
      });
    } catch (err) {
      res
        .status(500)
        .json({ status: false, message: "Something went wrong", err });
    }
  },

  async users(req, res) {
    try {
      const userList = await User.find();

      res.status(200).json({ status: true, message: userList });
    } catch (err) {
      res.status(500).json({ status: false, message: "Something went wrong" });
    }
  },
};

module.exports = controller;
