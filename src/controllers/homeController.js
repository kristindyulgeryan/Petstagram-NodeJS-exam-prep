import { Router } from "express";
import photoService from "../services/photoService.js";
import { isAuth } from "../middlewares/authMiddleware.js";

const homeController = Router();

homeController.get("/", (req, res) => {
  res.setError("Test Error");
  res.render("home");
});

homeController.get("/404", (req, res) => {
  res.render("404");
})

homeController.get('/profile', isAuth, async(req, res)=>{
  const photos = await photoService.getByOwner(req.user.id).lean()
res.render('profile', {photos, photoCount: photos.length})
})

export default homeController;
