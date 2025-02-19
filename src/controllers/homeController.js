import { Router } from "express";
import photoService from "../services/photoService.js";

const homeController = Router();

homeController.get("/", (req, res) => {
  res.setError("Test Error");
  res.render("home");
});

homeController.get('/profile', async(req, res)=>{
  const photos = await photoService.getByOwner(req.user.id).lean()
res.render('profile', {photos, photoCount: photos.length})
})

export default homeController;
