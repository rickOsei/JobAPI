// register
// login
const mongoose = require("mongoose");
const { BadRequest } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const userModel = require("../model/user_model");
const jwt = require("jsonwebtoken");
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
  res.status(StatusCodes.CREATED).json({ data: user, token });
};

const login = async (req, res) => {
  res.status(200).send("login user");
};

module.exports = { register, login };
