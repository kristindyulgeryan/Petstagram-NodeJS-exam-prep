import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import photoService from "../services/photoService.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const photoController = Router();

photoController.get("/catalog", async (req, res) => {
  const photos = await photoService.getAll().lean();
  res.render("photos/catalog", { photos });
});

photoController.get("/create", (req, res) => {
  res.render("photos/create");
});

photoController.post("/create", isAuth, async (req, res) => {
  const photoData = req.body;
  const userId = req.user.id;
  try {
    await photoService.create(photoData, userId);

    res.redirect("/photos/catalog");
  } catch (err) {
    res.render("photos/create", {
      error: getErrorMessage(err),
      photo: photoData,
    });
  }
});

export default photoController;
