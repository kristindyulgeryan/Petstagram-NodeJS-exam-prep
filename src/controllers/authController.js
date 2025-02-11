import { Router } from "express";
import authService from "../services/authService.js";
import { AUTH_COOKIE_NAME } from "../config.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const authController = Router();

authController.get("/register", (req, res) => {
  res.render("auth/register");
});

authController.post("/register", async (req, res) => {
  const userData = req.body;
  console.log(userData);

  try {
    const token = await authService.register(userData);

    res.cookie(AUTH_COOKIE_NAME, token, { httpOnly: true });
    res.redirect("/");
  } catch (err) {
    res.render("auth/register", {
      error: getErrorMessage(err),
      user: userData,
    });
  }
});

authController.get("/login", (req, res) => {
  res.render("auth/login");
});

authController.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const token = await authService.login(username, password);

    res.cookie(AUTH_COOKIE_NAME, token, { httpOnly: true });
    res.redirect("/");
  } catch (err) {
    res.render("auth/login", {
      error: getErrorMessage(err),
      user: username,
    });
  }
});

authController.get("/logout", isAuth, (req, res) => {
  res.clearCookie(AUTH_COOKIE_NAME);
  res.redirect("/");
});

export default authController;
