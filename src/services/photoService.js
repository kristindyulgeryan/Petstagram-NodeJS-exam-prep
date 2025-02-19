import Photo from "../models/Photo.js";

export const getAll = () => Photo.find({}).populate("owner");

export  const getOne =(photoId)=> Photo.findById(photoId)

export const create = (photoData) =>
  Photo.create(photoData);

const photoService = {
  getAll,
  create,
};

export default photoService;
