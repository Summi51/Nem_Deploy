const express = require("express");
const { UserModel } = require("../model/User.model");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { email, pass, name, age } = req.body;
  try {
    bcrypt.hash(pass, 5, async (err, hash) => {
      const user = new UserModel({ email, name, age, pass: hash });
      await user.save();
      res.status(200).send({ msg: "New user has benn registered" });
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  //logic
  const { email, pass } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(pass, user.pass, (err, result) => {
        if (result) {
          const token = jwt.sign({ authorID:user._id , author:user.name }, "masai");
          res.status(200).send({ msg: "Login Successful", token: token });
        } else {
          res.status(200).send({ msg: "Wrong Credentials!" });
        }
      });
    } else {
      res.status(200).send({ msg: "Wrong Credentials!" });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = {
  userRouter,
};

