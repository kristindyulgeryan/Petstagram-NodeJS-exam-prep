import { Router } from "express";

const homeController = Router();

homeController.get("/", (req, res) => {
  res.setError("Test Error");
  res.render("home");
});

export default homeController;
