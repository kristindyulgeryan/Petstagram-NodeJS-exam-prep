import Photo from "../models/Photo.js";

export const getAll = () => Photo.find({}).populate("owner");

export  const getOne =(photoId)=> Photo.findById(photoId).populate("owner")

export const create = (photoData) =>
  Photo.create(photoData);

export const remove = (photoId)=> Photo.findByIdAndDelete(photoId)
const photoService = {
  getAll,
  getOne,
  create,
  remove,
};

export default photoService;
