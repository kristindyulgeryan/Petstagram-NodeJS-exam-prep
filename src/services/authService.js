import bcrypt from "bcrypt";
import User from "../models/User.js";
import { generateToken } from "../utils/authUtils.js";

export const register = async (userData) => {
  if (userData.password !== userData.rePassword) {
    throw new Error("Password missmatch!");
  }

  const user = await User.findOne({ email: userData.email }).select({
    _id: true,
  });

  if (user) {
    throw new Error("User already exist!");
  }

  const createdUser = await User.create(userData);

  const token = generateToken(createdUser);

  return token;
};

export const login = async (username, password) => {
  // Validate user
  const user = await User.findOne({ username });

  if (!user) {
    throw new Error("Invalid user or email");
  }

  // Validate password
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error("Invalid user or email");
  }
  const token = generateToken(user);
  return token;
};

const authService = {
  register,
  login,
};

export default authService;
