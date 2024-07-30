const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const controller = {
  async createUser(req, res) {
    try {
      const { name, age, mobile, email, password } = req.body;

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const findExistingUser = await User.findOne({ email: email });

      if (!findExistingUser) {
        const createdUser = await User.create({
          name,
          age,
          mobile,
          email,
          password: hashedPassword,
        });

        res.status(200).json({
          status: true,
          message: "User registered Successfully",
          createdUser,
        });
      } else {
        res.status(409).json({ status: false, message: "User already exist" });
      }
    } catch (err) {
      res
        .status(500)
        .json({ status: false, message: "Something went wrong", err });
    }
  },

  async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      const findExistingUser = await User.findOne({ email: email });

      if (findExistingUser) {
        const compare = await bcrypt.compare(
          password,
          findExistingUser.password
        );

        if (compare) {
          const token = jwt.sign({ id: findExistingUser._id }, "abcefgh", {
            expiresIn: "1hr",
          });

          res
            .status(200)
            .json({ status: true, message: "Successfully login", token });
        } else {
          res.status(401).json({ status: false, message: "Invalid password" });
        }
      } else {
        res.status(404).json({
          status: false,
          message: "User Doesn't exist, So Please register",
        });
      }
    } catch (error) {
      res.status(500).json({ status: false, message: "Something went wrong" });
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

  async user(req, res) {
    try {
      const { id } = req.params;

      const userData = await User.findOne({ _id: id });

      if (userData) {
        res.status(200).json({ status: true, message: userData });
      } else {
        res.status(404).json({ status: false, message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ status: false, message: "Something went wrong" });
    }
  },

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, age, mobile, email } = req.body;

      const userData = await User.findOne({ _id: id });

      if (userData) {
        const updatedData = await User.updateOne(
          { _id: id },
          {
            $set: {
              name: name,
              age: age,
              mobile: mobile,
              email: email,
            },
          }
        );

        res.status(200).json({ status: true, message: updatedData });
      } else {
        res.status(404).json({ status: false, message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ status: false, message: "Something went wrong" });
    }
  },

  async deleteUser(req, res) {
    try {
      const { id } = req.params;

      const userData = await User.findOne({ _id: id });

      if (userData) {
        const deletedData = await User.deleteOne({ _id: id });

        res.status(200).json({ status: true, message: deletedData });
      } else {
        res.status(404).json({ status: false, message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ status: false, message: "Something went wrong" });
    }
  },
};

module.exports = controller;
