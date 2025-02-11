import { JWT_SECRET } from "../config.js";
import jsonwebtoken from "../lib/jsonwebtoken.js";

export const generateToken = async (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
  };
  const token = await jsonwebtoken.sign(payload, JWT_SECRET, {
    expiresIn: "2h",
  });
  return token;
};
