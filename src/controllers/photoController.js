import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import photoService from "../services/photoService.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const photoController = Router();

photoController.get("/catalog", async (req, res) => {
  const photos = await photoService.getAll().lean();
  res.render("photos/catalog", { photos });
});

photoController.get("/create", isAuth, (req, res) => {
  res.render("photos/create");
});

photoController.post("/create", isAuth, async (req, res) => {
  const photoData = {...req.body, owner: req.user.id};
 
  try {
    await photoService.create(photoData);

    res.redirect("/photos/catalog");
  } catch (err) {
    res.render("photos/create", {
      error: getErrorMessage(err),
    });
  }
});

photoController.get('/:photoId/details', async(req, res)=>{
  const photoId = req.params.photoId;
  const photo = await photoService.getOne(photoId).populate('comments.user').lean();
  const isOwner =  req.user?.id == photo.owner._id;
  
  res.render('photos/details', {photo, isOwner})
});

photoController.get('/:photoId/delete', isAuth, async(req, res)=>{
const photoId = req.params.photoId
  try {
    await photoService.remove(photoId)

    res.redirect("/photos/catalog")
  } catch (err) {
    res.render("photos/details", {error: 'Unsuccessful deletion'})
  }
  
});

photoController.get('/:photoId/edit', isAuth, async(req, res)=>{
  const photo = await photoService.getOne(req.params.photoId).lean()
  res.render('photos/edit', {photo})
});

photoController.post('/:photoId/edit', isAuth, async(req, res)=>{
  const photoId = req.params.photoId
const photoData = req.body;
  try {
    
    await photoService.edit(photoId, photoData);
    res.redirect(`/photos/${photoId}/details`)
  } catch (err) {
    res.render('photos/edit', {error: 'Unable to update photo', ...photoData})
  }
 
});

photoController.post('/:photoId/comments', isAuth,  async(req, res)=>{
  const photoId = req.params.photoId;
 const {comment} = req.body;
 const user = req.user.id;

 await photoService.addComment(photoId, {user, comment})
  res.redirect(`/photos/${photoId}/details`)
})

export default photoController;
