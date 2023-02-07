// register
// login
const mongoose = require("mongoose");
const { BadRequest, Unathenticated } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const userModel = require("../model/user_model");
const jwt = require("jsonwebtoken");
const Unauthenticated = require("../errors/unathenticated");
// const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  // const { name, email, password } = req.body;
  // if (!name || !email || !password) {
  //   throw new BadRequest("Please provide details");
  // }
  // const salt = await bcrypt.genSalt(10);
  // const hashPassword = await bcrypt.hash(password, salt);
  // const tempUser = { name, email, password: hashPassword };
  const user = await userModel.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ data: user.name, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequest("Please provide email and password");
  }
  const user = await userModel.findOne({ email });
  if (!user) {
    throw new Unathenticated("User is unauthenticated");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new Unathenticated("User is unauthenticated");
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = { register, login };
