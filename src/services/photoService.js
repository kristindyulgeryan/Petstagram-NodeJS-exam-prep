import Photo from "../models/Photo.js";

export const getAll = () => Photo.find({}).populate("owner");

export  const getOne =(photoId)=> Photo.findById(photoId).populate("owner")

export const create = (photoData) =>
  Photo.create(photoData);

export const remove = (photoId)=> Photo.findByIdAndDelete(photoId);

export const edit =(photoId, photoData)=>Photo.findByIdAndUpdate(photoId, photoData);

export const addComment = async (photoId, commentData)=> {
  const photo = await Photo.findById(photoId)

  photo.comments.push(commentData)
  
  return photo.save()

}

const photoService = {
  getAll,
  getOne,
  create,
  remove,
  edit,
  addComment,
};

export default photoService;
